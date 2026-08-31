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
import colors from '../utile/colors';
import fonts from '../utile/fonts';
import { fs, scale } from '../utile/sizes';
import imagePath, { Tag, Location, Pin, FoldedHands } from '../assets';
import { Festival } from '../constants/festivalData';

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

  const categoryText = festival
    ? currentLanguage === 'hi' && festival.categoryHi
      ? festival.categoryHi
      : festival.category
    : '';

  const tithiText = festival
    ? currentLanguage === 'hi' && festival.tithiHi
      ? festival.tithiHi
      : festival.tithi
    : '';

  const deityText = festival
    ? currentLanguage === 'hi' && festival.deityHi
      ? festival.deityHi.join(', ')
      : festival.deity.join(', ')
    : '';

  const regionsText = festival
    ? currentLanguage === 'hi' && festival.regionsHi
      ? festival.regionsHi.join(', ')
      : festival.regions.join(', ')
    : '';

  const descriptionText = festival
    ? currentLanguage === 'hi' && festival.descriptionHi
      ? festival.descriptionHi
      : festival.description
    : '';

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalDismissArea}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalSheet}>
          {festival && (
            <>
              <Image
                source={festival.image || imagePath.greeting}
                style={styles.modalImage}
              />
              <View
                style={[
                  styles.modalContent,
                  { paddingBottom: insets.bottom + scale(16) },
                ]}
              >
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
                      <Text style={styles.metaBadgeText}>
                        {categoryText}
                      </Text>
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
                        <Text style={styles.modalSectionValue}>
                          {tithiText}
                        </Text>
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
                        <Text style={styles.modalSectionValue}>
                          {deityText}
                        </Text>
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

                  <Text
                    style={[styles.modalSectionLabel, { marginTop: scale(8) }]}
                  >
                    {currentLanguage === 'hi' ? 'विवरण:' : 'Description:'}
                  </Text>
                  <Text style={styles.modalFestivalDesc}>
                    {descriptionText}
                  </Text>
                </ScrollView>

                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>
                    {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FestivalModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: scale(200),
  },
  modalContent: {
    padding: scale(20),
    paddingBottom: scale(32),
    flexShrink: 1,
  },
  modalFestivalName: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  modalMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: scale(6),
    marginBottom: scale(16),
  },
  metaBadge: {
    backgroundColor: 'rgba(183, 168, 151, 0.15)',
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
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  modalTextScroll: {
    flexShrink: 1,
    marginBottom: scale(20),
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    marginBottom: scale(10),
  },
  modalSectionLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    flex: 1,
  },
  modalSectionValue: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    opacity: 0.85,
  },
  modalFestivalDesc: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(19),
    opacity: 0.9,
    marginTop: scale(2),
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
    fontFamily: fonts.PoppinsMedium,
  },
});
