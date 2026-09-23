import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { God, GodMantra } from '@services/firebaseServices/godMantras';
import {
  AutoScrollFlatList,
  AutoScrollItem,
  BlurBackdrop,
  ScreenHeader,
  AnimatedListItem,
} from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';

const MantraScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { isHindi, t } = useAppLanguage();

  const initialGod: God | undefined = route.params?.god;
  const allGods: God[] =
    route.params?.allGods || (initialGod ? [initialGod] : []);

  const [selectedGod, setSelectedGod] = useState<God | undefined>(
    initialGod || allGods[0],
  );
  const [selectedMantra, setSelectedMantra] = useState<GodMantra | null>(null);

  const handleSelectGod = (item: God) => {
    setSelectedGod(item);
  };

  const currentGod = selectedGod || initialGod || allGods[0];

  const mantras: GodMantra[] = useMemo(() => {
    if (!currentGod) return [];
    if (currentGod.mantras && currentGod.mantras.length > 0) {
      return currentGod.mantras;
    }
    return [
      {
        nameHi: currentGod.hindiName,
        nameEn: currentGod.englishName,
        mantra: currentGod.mantra,
      },
    ];
  }, [currentGod]);

  const godName = currentGod
    ? isHindi
      ? currentGod.hindiName
      : currentGod.englishName
    : '';

  const handleStartJap = (_mantraItem: GodMantra) => {
    setSelectedMantra(null);
    navigation.navigate('BottomTabs', { screen: 'Jap' });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScreenHeader
          title={
            godName
              ? `${godName} ${t(Translation.MANTRA_HEADER_SUFFIX)}`
              : t(Translation.MANTRA_COLLECTION_TITLE)
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(24) },
          ]}
        >
          {/* Deity Showcase Card with large clear image */}
          {currentGod && (
            <View style={styles.showcaseCard}>
              <View style={styles.avatarGlowContainer}>
                <View style={styles.avatarBorder}>
                  <Image
                    source={currentGod.image}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.showcaseTitle}>{godName}</Text>
              {currentGod.mantra ? (
                <Text style={styles.showcaseMoolMantra}>
                  {`॥ ${currentGod.mantra} ॥`}
                </Text>
              ) : null}
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {`${mantras.length} ${t(Translation.SACRED_MANTRAS_COUNT)}`}
                </Text>
              </View>
            </View>
          )}

          {/* Horizontal Deity Selector */}
          {allGods.length > 1 && (
            <View style={styles.deitiesSelectorSection}>
              <Text style={styles.sectionSubtitle}>
                {t(Translation.MANTRA_SELECT_DEITY)}
              </Text>
              <AutoScrollFlatList
                data={allGods}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.deitiesListContent}
                isExternalPaused={selectedMantra !== null}
                speed={32}
                resumeDelayMs={1500}
                renderItem={({ item }) => {
                  const isSelected = item.id === currentGod?.id;
                  const name = isHindi ? item.hindiName : item.englishName;
                  return (
                    <AutoScrollItem
                      style={({ pressed }) => [
                        styles.deityChip,
                        isSelected && styles.deityChipActive,
                        pressed && { opacity: 0.75 },
                      ]}
                      onPress={() => handleSelectGod(item)}
                    >
                      <Image
                        source={item.image}
                        style={styles.deityChipImage}
                        resizeMode="cover"
                      />
                      <Text
                        style={[
                          styles.deityChipName,
                          isSelected && styles.deityChipNameActive,
                        ]}
                        numberOfLines={1}
                      >
                        {name}
                      </Text>
                    </AutoScrollItem>
                  );
                }}
              />
            </View>
          )}

          {/* Mantras Section Header */}
          <View style={styles.mantrasHeaderRow}>
            <Text style={styles.mantrasSectionTitle}>
              {t(Translation.MANTRA_LIST_TITLE)}
            </Text>
            <Text style={styles.mantrasCountText}>
              {t(Translation.MANTRA_TAP_TO_READ)}
            </Text>
          </View>

          {/* Mantras List (मंत्र सूची) */}
          {mantras.map((m, index) => {
            const title = isHindi && m.nameHi ? m.nameHi : m.nameEn || m.nameHi;
            return (
              <AnimatedListItem
                key={`${currentGod?.id || 'god'}_${index}`}
                index={index}
                delayStep={40}
              >
                <View style={styles.mantraCard}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedMantra(m)}
                  >
                    <View style={styles.mantraCardTop}>
                      <View style={styles.mantraIndexBadge}>
                        <Text style={styles.mantraIndexText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.mantraCardTitle} numberOfLines={1}>
                        {title}
                      </Text>
                    </View>

                    <Text style={styles.mantraCardText} numberOfLines={2}>
                      {m.mantra}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mantraCardFooter}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() => setSelectedMantra(m)}
                  >
                    <Text style={styles.viewMoreText}>
                      {t(Translation.VIEW_FULL_MANTRA)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </AnimatedListItem>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Single Top-Level Mantra Detail Modal (Hardware Accelerated & Smooth Blur Backdrop) */}
      <Modal
        visible={selectedMantra !== null}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => setSelectedMantra(null)}
      >
        <View style={styles.modalOverlay}>
          <BlurBackdrop />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setSelectedMantra(null)}
          />
          <View
            style={[
              styles.modalBackdrop,
              {
                paddingTop: insets.top + scale(18),
                paddingBottom: insets.bottom + scale(18),
              },
            ]}
            pointerEvents="box-none"
          >
            {selectedMantra && (
              <View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                  {/* Modal Header */}
                  <View style={styles.modalHeaderRow}>
                    {currentGod?.image && (
                      <Image
                        source={currentGod.image}
                        style={styles.modalAvatar}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.modalHeaderInfo}>
                      <Text style={styles.modalTitle} numberOfLines={1}>
                        {isHindi && selectedMantra.nameHi
                          ? selectedMantra.nameHi
                          : selectedMantra.nameEn || selectedMantra.nameHi}
                      </Text>
                      <Text style={styles.modalSubtitle} numberOfLines={1}>
                        {godName}
                      </Text>
                    </View>
                  </View>

                  {/* Mantra Box */}
                  <ScrollView
                    style={styles.modalScrollView}
                    contentContainerStyle={styles.modalScrollInner}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.mantraBox}>
                      <Text style={styles.mantraBoxSymbol}>ॐ</Text>
                      <Text style={styles.mantraBoxText}>
                        {selectedMantra.mantra}
                      </Text>
                    </View>
                  </ScrollView>

                  {/* Actions */}
                  <View style={styles.modalActionsRow}>
                    <TouchableOpacity
                      style={styles.startJapBtn}
                      activeOpacity={0.7}
                      onPress={() => setSelectedMantra(null)}
                    >
                      <Text style={styles.dismissBtnText}>
                        {t(Translation.CLOSE_BTN)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MantraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(8),
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
  },
  showcaseCard: {
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(20),
    alignItems: 'center',
    marginBottom: scale(20),
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(12),
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  avatarGlowContainer: {
    padding: scale(4),
    borderRadius: scale(75),
    backgroundColor: colors.primary,
    marginBottom: scale(12),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarBorder: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(65),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    backgroundColor: colors.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  showcaseTitle: {
    fontSize: fs(24),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: scale(6),
  },
  showcaseMoolMantra: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    lineHeight: fs(22),
    marginBottom: scale(12),
    paddingHorizontal: scale(10),
  },
  badgeContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
  },
  badgeText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '600',
  },
  deitiesSelectorSection: {
    marginBottom: scale(20),
  },
  sectionSubtitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: scale(10),
    paddingHorizontal: scale(2),
  },
  deitiesListContent: {
    paddingVertical: scale(2),
    paddingHorizontal: scale(2),
  },
  deityChip: {
    alignItems: 'center',
    marginRight: scale(12),
    width: scale(68),
    padding: scale(6),
    borderRadius: scale(12),
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
  },
  deityChipActive: {
    borderColor: colors.ring,
    backgroundColor: colors.primary,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deityChipImage: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    marginBottom: scale(4),
  },
  deityChipName: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    width: '100%',
  },
  deityChipNameActive: {
    color: colors.ring,
    fontWeight: '700',
  },
  mantrasHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
    paddingHorizontal: scale(2),
  },
  mantrasSectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  mantrasCountText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  mantraCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mantraCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  mantraIndexBadge: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: colors.ring,
  },
  mantraIndexText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  mantraCardTitle: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    fontWeight: '600',
  },
  mantraCardText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(21),
    marginBottom: scale(10),
    opacity: 0.9,
  },
  mantraCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  viewMoreText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    elevation: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  modalContainer: {
    width: '100%',
    maxHeight: '85%',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: scale(24),
    padding: scale(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  modalAvatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 1.5,
    borderColor: colors.ring,
    marginRight: scale(12),
  },
  modalHeaderInfo: {
    flex: 1,
  },
  modalTitle: {
    fontSize: fs(17),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginTop: scale(2),
  },
  modalCloseButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalCloseText: {
    fontSize: fs(14),
    color: colors.secondary,
    fontWeight: '600',
  },
  modalScrollView: {
    maxHeight: scale(320),
  },
  modalScrollInner: {
    paddingVertical: scale(6),
  },
  mantraBox: {
    backgroundColor: colors.primary,
    borderRadius: scale(18),
    padding: scale(20),
    borderWidth: 1.5,
    borderColor: colors.accentOrangeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mantraBoxSymbol: {
    fontSize: fs(28),
    color: colors.ring,
    marginBottom: scale(8),
    fontFamily: fonts.TiroHindiRegular,
  },
  mantraBoxText: {
    fontSize: fs(19),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(30),
  },
  modalActionsRow: {
    marginTop: scale(16),
    gap: scale(10),
  },
  startJapBtn: {
    backgroundColor: colors.ring,
    borderRadius: scale(14),
    paddingVertical: scale(13),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  startJapBtnText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    fontWeight: '700',
  },
  dismissBtn: {
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissBtnText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
});
