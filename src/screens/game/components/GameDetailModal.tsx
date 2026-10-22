import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { BlurBackdrop, CardGradient } from '@components';
import { useAppLanguage } from '@hooks';
import { GameItem } from '../types';

interface GameDetailModalProps {
  game: GameItem | null;
  visible: boolean;
  onClose: () => void;
  onStartGame?: (game: GameItem) => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  visible,
  onClose,
  onStartGame,
}) => {
  const insets = useSafeAreaInsets();
  const { isHindi } = useAppLanguage();

  const handleStart = useCallback(() => {
    if (game && onStartGame) {
      onStartGame(game);
    }
  }, [game, onStartGame]);

  if (!game) return null;

  const title = isHindi ? game.titleHi : game.titleEn;
  const subtitle = isHindi ? game.subtitleHi : game.subtitleEn;
  const description = isHindi ? game.descriptionHi : game.descriptionEn;
  const meaning = isHindi ? game.spiritualMeaningHi : game.spiritualMeaningEn;
  const rules = isHindi ? game.rulesHi : game.rulesEn;
  const isAvailable = game.status === 'available';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurBackdrop />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={[
            styles.modalBackdrop,
            {
              paddingTop: insets.top + scale(24),
              paddingBottom: insets.bottom + scale(24),
            },
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <CardGradient borderRadius={scale(24)} />

              {/* Modal Header */}
              <View style={styles.headerRow}>
                <View style={styles.headerInfo}>
                  <Text style={styles.title} numberOfLines={1}>
                    {title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {subtitle}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  activeOpacity={0.7}
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollInner}
                showsVerticalScrollIndicator={false}
              >
                {/* Spiritual Meaning Highlight */}
                <View style={styles.meaningBox}>
                  <Text style={styles.meaningHeader}>
                    🌸 {isHindi ? 'आध्यात्मिक प्रेरणा' : 'Spiritual Wisdom'}
                  </Text>
                  <Text style={styles.meaningText}>{meaning}</Text>
                </View>

                {/* Game Overview */}
                <View style={styles.section}>
                  <Text style={styles.sectionHeading}>
                    {isHindi ? 'खेल परिचय' : 'About the Game'}
                  </Text>
                  <Text style={styles.descriptionText}>{description}</Text>
                </View>

                {/* Rules List */}
                <View style={styles.section}>
                  <Text style={styles.sectionHeading}>
                    {isHindi ? 'खेल के नियम' : 'How to Play / Rules'}
                  </Text>
                  {rules.map((rule, idx) => (
                    <View key={idx} style={styles.ruleItem}>
                      <View style={styles.ruleBullet}>
                        <Text style={styles.ruleBulletText}>{idx + 1}</Text>
                      </View>
                      <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* Actions Footer */}
              <View style={styles.footerRow}>
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    !isAvailable && styles.primaryBtnDisabled,
                  ]}
                  activeOpacity={0.8}
                  onPress={handleStart}
                  disabled={!isAvailable}
                >
                  <Text style={styles.primaryBtnText}>
                    {isAvailable
                      ? isHindi
                        ? 'खेल शुरू करें ▶'
                        : 'Start Playing ▶'
                      : isHindi
                      ? 'शीघ्र उपलब्ध होगा'
                      : 'Coming Soon'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: scale(16),
  },
  modalContainer: {
    width: '100%',
    maxHeight: '85%',
  },
  modalCard: {
    backgroundColor: 'transparent',
    borderRadius: scale(24),
    padding: scale(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: colors.accentOrangeBg,
    position: 'relative',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(14),
    paddingBottom: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  headerInfo: {
    flex: 1,
    paddingRight: scale(10),
  },
  title: {
    fontSize: fs(19),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginTop: scale(2),
  },
  closeBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(57, 38, 27, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: fs(14),
    color: colors.secondary,
    fontWeight: '700',
  },
  scrollView: {
    maxHeight: scale(360),
  },
  scrollInner: {
    paddingVertical: scale(6),
  },
  meaningBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: scale(14),
    borderLeftWidth: 3.5,
    borderLeftColor: colors.ring,
  },
  meaningHeader: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    marginBottom: scale(4),
  },
  meaningText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(19),
  },
  section: {
    marginBottom: scale(14),
  },
  sectionHeading: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(6),
  },
  descriptionText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(19),
    opacity: 0.9,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(8),
    gap: scale(10),
  },
  ruleBullet: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(2),
  },
  ruleBulletText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  ruleText: {
    flex: 1,
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(18),
  },
  footerRow: {
    marginTop: scale(12),
    paddingTop: scale(10),
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  primaryBtn: {
    backgroundColor: colors.ring,
    paddingVertical: scale(13),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.25,
    shadowRadius: scale(6),
    elevation: 4,
  },
  primaryBtnDisabled: {
    backgroundColor: colors.neutralDisabled || '#b0a498',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
});

export default React.memo(GameDetailModal);
