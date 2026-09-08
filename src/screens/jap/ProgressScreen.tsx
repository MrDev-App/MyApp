import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@components/GradientBackground';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import { Storage, STORAGE_KEYS } from '@services/storageService';
import { JAP_LEVELS, getUserLevel, JapLevel } from '@constants/japLevels';
import PathJourney from './components/PathJourney';
import { CloseIcon } from '@components/icons/SvgIcons';
import { Back } from '@assets/index';

export const ProgressScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledRef = useRef(false);

  const [totalMala, setTotalMala] = useState(0);

  const [selectedLevelModal, setSelectedLevelModal] = useState<JapLevel | null>(
    null,
  );

  useEffect(() => {
    Storage.checkAndResetTodayStats();
    const tMala = Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA, 0);
    setTotalMala(tMala);
  }, []);

  const { currentLevel } = useMemo(() => {
    return getUserLevel(totalMala);
  }, [totalMala]);

  return (
    <GradientBackground>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + scale(60) },
        ]}
        onContentSizeChange={(_w, h) => {
          if (!hasScrolledRef.current && h > 0) {
            hasScrolledRef.current = true;
            scrollViewRef.current?.scrollToEnd({ animated: false });
          }
        }}
      >
        {/* ── Candy Crush Style Serpentine Journey Path ── */}
        <PathJourney
          levels={JAP_LEVELS}
          currentLevel={currentLevel}
          totalMalas={totalMala}
          currentLanguage={currentLanguage}
          onSelectLevel={lvl => setSelectedLevelModal(lvl)}
        />
        <View style={styles.pathHeaderSection}>
          <Text style={styles.pathHeadingTitle}>
            {t(Translation.MY_JOURNEY)}
          </Text>
          <Text style={styles.pathHeadingDesc}>
            {t(Translation.TAP_TO_INSPECT)}
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedLevelModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedLevelModal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selectedLevelModal && (
              <>
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.modalIconBox,
                      { backgroundColor: selectedLevelModal.badgeColor },
                    ]}
                  >
                    <Text style={styles.modalIconText}>
                      {selectedLevelModal.icon}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedLevelModal(null)}
                    activeOpacity={0.7}
                  >
                    <CloseIcon size={scale(18)} color={colors.ring} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalLevelTitle}>
                  {t(Translation.LEVEL_NUM)} {selectedLevelModal.level}:{' '}
                  {currentLanguage === 'hi'
                    ? selectedLevelModal.nameHi
                    : selectedLevelModal.nameEn}
                </Text>
                <Text style={styles.modalLevelSubtitle}>
                  {currentLanguage === 'hi'
                    ? selectedLevelModal.titleHi
                    : selectedLevelModal.titleEn}
                </Text>

                {/* Requirements Box */}
                <View style={styles.requirementsBox}>
                  <View style={styles.reqRow}>
                    <Text style={styles.reqLabel}>
                      {t(Translation.REQUIRED_MALAS)}:
                    </Text>
                    <Text style={styles.reqValue}>
                      {selectedLevelModal.requiredMalas}{' '}
                      {currentLanguage === 'hi' ? 'माला' : 'Malas'}
                    </Text>
                  </View>
                  <View style={styles.reqRow}>
                    <Text style={styles.reqLabel}>
                      {t(Translation.REQUIRED_CHANTS)}:
                    </Text>
                    <Text style={styles.reqValue}>
                      {selectedLevelModal.requiredChants}{' '}
                      {currentLanguage === 'hi' ? 'जाप' : 'Chants'}
                    </Text>
                  </View>
                  <View style={styles.reqRow}>
                    <Text style={styles.reqLabel}>Status:</Text>
                    <Text
                      style={[
                        styles.reqValue,
                        selectedLevelModal.level < currentLevel.level &&
                          styles.statusCompleted,
                        selectedLevelModal.level === currentLevel.level &&
                          styles.statusCurrent,
                        selectedLevelModal.level > currentLevel.level &&
                          styles.statusLocked,
                      ]}
                    >
                      {selectedLevelModal.level < currentLevel.level
                        ? '✓ Completed'
                        : selectedLevelModal.level === currentLevel.level
                        ? '★ Current Level'
                        : '🔒 Locked'}
                    </Text>
                  </View>
                </View>

                {/* Blessing Quote Card */}
                <View style={styles.blessingBox}>
                  <Text style={styles.blessingTitle}>
                    {t(Translation.MILESTONE_BLESSING)}
                  </Text>
                  <Text style={styles.blessingText}>
                    "
                    {currentLanguage === 'hi'
                      ? selectedLevelModal.blessingHi
                      : selectedLevelModal.blessingEn}
                    "
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalOkBtn}
                  onPress={() => setSelectedLevelModal(null)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalOkBtnText}>
                    {t(Translation.PROFILE_OKAY)}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  backBtn: {
    position: 'absolute',
    width: scale(32),
    height: scale(32),
    top: 50,
    left: 16,
    zIndex: 1,
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
  },
  levelBadgeHeader: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(16),
    backgroundColor: colors.accentOrangeSubtle,
    borderWidth: 1,
    borderColor: colors.accentOrangeBorder,
  },
  levelBadgeHeaderText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  pathHeaderSection: {
    alignItems: 'center',
    marginBottom: scale(8),
  },
  pathHeadingTitle: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
  },
  pathHeadingDesc: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.charcoal,
    marginTop: scale(2),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlayModalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(24),
    padding: scale(22),
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: scale(12),
  },
  modalIconBox: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  modalIconText: {
    fontSize: fs(32),
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: scale(6),
  },
  modalLevelTitle: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
    textAlign: 'center',
  },
  modalLevelSubtitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: scale(2),
    marginBottom: scale(14),
  },
  requirementsBox: {
    width: '100%',
    backgroundColor: colors.inputBgLight,
    borderRadius: scale(12),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: scale(14),
  },
  reqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(3),
  },
  reqLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.charcoal,
  },
  reqValue: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
  },
  statusCompleted: {
    color: colors.levelCompletedBg,
  },
  statusCurrent: {
    color: colors.pathActiveLine,
  },
  statusLocked: {
    color: colors.charcoal,
  },
  blessingBox: {
    width: '100%',
    backgroundColor: colors.accentOrangeLight,
    borderRadius: scale(12),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.accentBorderVerySubtle,
    marginBottom: scale(18),
  },
  blessingTitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
    marginBottom: scale(4),
  },
  blessingText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    lineHeight: fs(18),
    fontStyle: 'italic',
  },
  modalOkBtn: {
    width: '100%',
    backgroundColor: colors.pathActiveLine,
    paddingVertical: scale(12),
    borderRadius: scale(14),
    alignItems: 'center',
  },
  modalOkBtnText: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(14),
  },
});

export default ProgressScreen;
