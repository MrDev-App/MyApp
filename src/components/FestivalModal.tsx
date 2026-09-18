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
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import imagePath, { FoldedHands } from '@assets/index';
import {
  TagIcon,
  LocationIcon,
  PinIcon,
  CloseIcon,
} from '@components/icons/SvgIcons';
import { Festival } from '../redux';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import BlurBackdrop from './BlurBackdrop';

interface FestivalModalProps {
  visible: boolean;
  festival: Festival | null;
  onClose: () => void;
}

const CLOSE_BTN_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const FestivalModal: React.FC<FestivalModalProps> = ({
  visible,
  festival,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { t, select } = useAppLanguage();

  if (!visible || !festival) {
    return null;
  }

  const festivalName = select(festival.hindiName, festival.englishName);
  const dateStr = select(festival.dateStrHi, festival.dateStrEn);

  const categoryText =
    select(
      festival.categoryHi || festival.category,
      festival.category || festival.categoryHi,
    ) || '';

  const tithiText =
    select(
      festival.tithiHi || festival.tithi,
      festival.tithi || festival.tithiHi,
    ) || '';

  const rawDeities = select(
    festival.deityHi || festival.deity,
    festival.deity || festival.deityHi,
  );
  const deityText = Array.isArray(rawDeities)
    ? rawDeities.join(', ')
    : rawDeities || '';

  const rawRegions = select(
    festival.regionsHi || festival.regions,
    festival.regions || festival.regionsHi,
  );
  const regionsText = Array.isArray(rawRegions)
    ? rawRegions.join(', ')
    : rawRegions || '';

  const descriptionText =
    select(
      festival.descriptionHi || festival.description,
      festival.description || festival.descriptionHi,
    ) || '';

  const storyText =
    select(
      festival.storyHi || festival.story,
      festival.story || festival.storyHi,
    ) || '';

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
        <BlurBackdrop blurAmount={15} blurRadius={15} />

        {/* Top-Right Close Button */}
        <TouchableOpacity
          style={[
            styles.modalTopCloseBtn,
            { top: insets.top > 0 ? insets.top + scale(8) : scale(16) },
          ]}
          onPress={onClose}
          activeOpacity={0.7}
          hitSlop={CLOSE_BTN_HIT_SLOP}
        >
          <CloseIcon size={scale(16)} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>

        <Image
          source={festival.image || imagePath.greeting}
          style={styles.modalImage}
        />

        <ScrollView
          style={styles.modalScrollView}
          contentContainerStyle={[
            styles.modalScrollContent,
            { paddingBottom: insets.bottom + scale(24) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalFestivalName}>{festivalName}</Text>

          <View style={styles.modalMetaRow}>
            <View style={styles.metaBadge}>
              <Image source={imagePath.calendar} style={styles.calendarIcon} />
              <Text style={styles.metaBadgeText}>{dateStr}</Text>
            </View>
            {categoryText ? (
              <View style={styles.metaBadge}>
                <TagIcon size={scale(10)} color={colors.ring} />
                <Text style={styles.metaBadgeText}>{categoryText}</Text>
              </View>
            ) : null}
          </View>

          {tithiText ? (
            <View style={styles.sectionRow}>
              <PinIcon size={scale(14)} color={colors.ring} />
              <Text style={styles.modalSectionLabel}>
                {t(Translation.FESTIVAL_TITHI_LABEL)}
                <Text style={styles.modalSectionValue}>{tithiText}</Text>
              </Text>
            </View>
          ) : null}

          {deityText ? (
            <View style={styles.sectionRow}>
              <FoldedHands width={scale(14)} height={scale(14)} />
              <Text style={styles.modalSectionLabel}>
                {t(Translation.FESTIVAL_DEITY_LABEL)}
                <Text style={styles.modalSectionValue}>{deityText}</Text>
              </Text>
            </View>
          ) : null}

          {regionsText ? (
            <View style={styles.sectionRow}>
              <LocationIcon size={scale(14)} color={colors.ring} />
              <Text style={styles.modalSectionLabel}>
                {t(Translation.FESTIVAL_REGIONS_LABEL)}
                <Text style={styles.modalSectionValue}>{regionsText}</Text>
              </Text>
            </View>
          ) : null}

          {festival.vratDetails?.paranTime ? (
            <View style={styles.sectionRow}>
              <Text style={styles.modalSectionLabel}>
                {t(Translation.FESTIVAL_PARAN_TIME_LABEL)}
                <Text style={styles.modalSectionValue}>
                  {festival.vratDetails.paranTime}
                </Text>
              </Text>
            </View>
          ) : null}

          {festival.vratDetails?.fastingRule ? (
            <View style={styles.sectionRow}>
              <Text style={styles.modalSectionLabel}>
                {t(Translation.FESTIVAL_FASTING_RULE_LABEL)}
                <Text style={styles.modalSectionValue}>
                  {festival.vratDetails.fastingRule}
                </Text>
              </Text>
            </View>
          ) : null}

          {descriptionText ? (
            <>
              <Text style={[styles.modalSectionLabel, { marginTop: scale(8) }]}>
                {t(Translation.FESTIVAL_DESCRIPTION_LABEL)}
              </Text>
              <Text style={styles.modalFestivalDesc}>{descriptionText}</Text>
            </>
          ) : null}

          {storyText ? (
            <View style={styles.storyContainer}>
              <Text style={styles.storySectionTitle}>
                {t(Translation.FESTIVAL_STORY_TITLE)}
              </Text>
              <Text style={styles.storyText}>{storyText}</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FestivalModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalTopCloseBtn: {
    position: 'absolute',
    right: scale(16),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalImage: {
    width: '100%',
    height: scale(300),
    borderBottomRightRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    overflow: 'hidden',
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    padding: scale(20),
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
    color: colors.white,
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
    marginTop: scale(20),
  },
  closeButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
  },
});
