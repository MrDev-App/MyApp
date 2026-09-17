import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import imagePath, { Tag, Location, Pin, FoldedHands } from '@assets/index';
import { Festival } from '@services/festivalService';
import BlurBackdrop from './BlurBackdrop';

interface FestivalModalProps {
  visible: boolean;
  festival: Festival | null;
  onClose: () => void;
}

const FestivalModal: React.FC<FestivalModalProps> = ({
  visible,
  festival,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  if (!visible || !festival) {
    return null;
  }

  const categoryText =
    currentLanguage === 'hi' && festival.categoryHi
      ? festival.categoryHi
      : festival.category || '';

  const tithiText =
    currentLanguage === 'hi' && festival.tithiHi
      ? festival.tithiHi
      : festival.tithi || '';

  const deityText =
    currentLanguage === 'hi' && festival.deityHi
      ? festival.deityHi.join(', ')
      : (festival.deity || []).join(', ');

  const regionsText =
    currentLanguage === 'hi' && festival.regionsHi
      ? festival.regionsHi.join(', ')
      : (festival.regions || []).join(', ');

  const descriptionText =
    currentLanguage === 'hi' && festival.descriptionHi
      ? festival.descriptionHi
      : festival.description || '';

  const storyText =
    currentLanguage === 'hi' && festival.storyHi
      ? festival.storyHi
      : festival.story || '';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurBackdrop blurAmount={25} blurRadius={22} />

        <View
          style={[
            styles.modalBackdrop,
            {
              paddingBottom: insets.bottom + scale(10),
            },
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.modalSheet}>
            <Image
              source={festival.image || imagePath.greeting}
              style={styles.modalImage}
            />
            <View style={styles.modalContent}>
              <Text style={styles.modalFestivalName}>
                {currentLanguage === 'hi'
                  ? festival.hindiName
                  : festival.englishName}
              </Text>

              <View style={styles.modalMetaRow}>
                <View style={styles.metaBadge}>
                  <Image
                    source={imagePath.calendar}
                    style={styles.calendarIcon}
                  />
                  <Text style={styles.metaBadgeText}>
                    {currentLanguage === 'hi'
                      ? festival.dateStrHi
                      : festival.dateStrEn}
                  </Text>
                </View>
                {categoryText ? (
                  <View style={styles.metaBadge}>
                    <Tag width={scale(10)} height={scale(10)} />
                    <Text style={styles.metaBadgeText}>{categoryText}</Text>
                  </View>
                ) : null}
              </View>

              <ScrollView
                style={styles.modalTextScroll}
                showsVerticalScrollIndicator={false}
              >
                {tithiText ? (
                  <View style={styles.sectionRow}>
                    <Pin
                      width={scale(14)}
                      height={scale(14)}
                      fill={colors.ring}
                    />
                    <Text style={styles.modalSectionLabel}>
                      {currentLanguage === 'hi'
                        ? 'तिथि / नक्षत्र: '
                        : 'Tithi / Astro: '}
                      <Text style={styles.modalSectionValue}>{tithiText}</Text>
                    </Text>
                  </View>
                ) : null}

                {deityText ? (
                  <View style={styles.sectionRow}>
                    <FoldedHands width={scale(14)} height={scale(14)} />
                    <Text style={styles.modalSectionLabel}>
                      {currentLanguage === 'hi'
                        ? 'पूज्य देवता: '
                        : 'Deities Worshipped: '}
                      <Text style={styles.modalSectionValue}>{deityText}</Text>
                    </Text>
                  </View>
                ) : null}

                {regionsText ? (
                  <View style={styles.sectionRow}>
                    <Location
                      width={scale(14)}
                      height={scale(14)}
                      fill={colors.ring}
                    />
                    <Text style={styles.modalSectionLabel}>
                      {currentLanguage === 'hi'
                        ? 'प्रमुख क्षेत्र: '
                        : 'Regions: '}
                      <Text style={styles.modalSectionValue}>
                        {regionsText}
                      </Text>
                    </Text>
                  </View>
                ) : null}

                {descriptionText ? (
                  <>
                    <Text
                      style={[
                        styles.modalSectionLabel,
                        { marginTop: scale(8) },
                      ]}
                    >
                      {currentLanguage === 'hi' ? 'विवरण:' : 'Description:'}
                    </Text>
                    <Text style={styles.modalFestivalDesc}>
                      {descriptionText}
                    </Text>
                  </>
                ) : null}

                {storyText ? (
                  <View style={styles.storyContainer}>
                    <Text style={styles.storySectionTitle}>
                      {currentLanguage === 'hi'
                        ? 'पौराणिक कथा एवं इतिहास'
                        : 'Story & Mythological Origin'}
                    </Text>
                    <Text style={styles.storyText}>{storyText}</Text>
                  </View>
                ) : null}
              </ScrollView>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>
                  {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FestivalModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
  },
  modalSheet: {
    flex: 1,
    shadowColor: colors.black,

    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalImage: {
    width: '100%',
    height: scale(200),
    borderBottomRightRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    overflow: 'hidden',
  },
  modalContent: {
    flex: 1,
    padding: scale(20),
    paddingBottom: scale(24),
    flexShrink: 1,
  },
  modalFestivalName: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
  modalMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: scale(6),
    marginBottom: scale(16),
  },
  metaBadge: {
    backgroundColor: colors.borderSubtle,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  calendarIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: 'contain',
  },
  metaBadgeText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  modalTextScroll: {
    flexShrink: 1,
    marginBottom: scale(16),
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    marginBottom: scale(10),
  },
  modalSectionLabel: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    flex: 1,
  },
  modalSectionValue: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    opacity: 0.85,
  },
  modalFestivalDesc: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    lineHeight: fs(19),
    opacity: 0.9,
    marginTop: scale(2),
  },
  storyContainer: {
    marginTop: scale(14),
    padding: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(10),
    borderLeftWidth: scale(3),
    borderLeftColor: colors.ring,
  },
  storySectionTitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginBottom: scale(6),
  },
  storyText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    lineHeight: fs(18),
    opacity: 0.92,
  },
  closeButton: {
    backgroundColor: colors.ring,
    borderRadius: scale(12),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
  },
});
