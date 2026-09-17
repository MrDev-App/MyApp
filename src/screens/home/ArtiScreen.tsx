import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';
import { CloseIcon, PlusIcon, MinusIcon } from '@components/icons/SvgIcons';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { triggerHaptic } from '@helper/helper';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { useAppLanguage } from '@hooks';

type ArtiScreenRouteProp = RouteProp<RootStackParamList, 'ArtiScreen'>;

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 26;
const DEFAULT_FONT_SIZE = 16;

export const ArtiScreen = () => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : scale(44);
  const safeBottom = insets.bottom > 0 ? insets.bottom : scale(16);

  const route = useRoute<ArtiScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { isHindi } = useAppLanguage();

  const selectedItem = route.params?.arti;

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = Storage.getNumber(STORAGE_KEYS.AARTI_FONT_SIZE);
    return saved && saved >= MIN_FONT_SIZE && saved <= MAX_FONT_SIZE
      ? saved
      : DEFAULT_FONT_SIZE;
  });

  const handleBack = () => {
    triggerHaptic();
    navigation.goBack();
  };

  const increaseFontSize = () => {
    triggerHaptic();
    setFontSize(prev => {
      const next = Math.min(MAX_FONT_SIZE, prev + 2);
      Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, next);
      return next;
    });
  };

  const decreaseFontSize = () => {
    triggerHaptic();
    setFontSize(prev => {
      const next = Math.max(MIN_FONT_SIZE, prev - 2);
      Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, next);
      return next;
    });
  };

  const resetFontSize = () => {
    triggerHaptic();
    setFontSize(DEFAULT_FONT_SIZE);
    Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, DEFAULT_FONT_SIZE);
  };

  if (!selectedItem) {
    return (
      <View style={[styles.container, { paddingTop: safeTop }]}>
        <TouchableOpacity
          style={styles.modalHeaderCloseBtn}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <CloseIcon size={scale(16)} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>
        <Text style={styles.modalAartiTitle}>Aarti not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <View style={styles.modalBody}>
        {/* Top Action Bar: Font Size Adjuster & Close Button */}
        <TouchableOpacity
          style={styles.modalHeaderCloseBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CloseIcon size={scale(16)} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>

        {/* Deity Showcase & Aarti Title Header */}
        <View style={styles.modalHeaderSection}>
          {selectedItem.image && (
            <View style={styles.modalImageWrapper}>
              <Image
                source={selectedItem.image}
                style={styles.modalDeityImage}
                resizeMode="cover"
              />
            </View>
          )}

          <Text style={styles.modalAartiTitle} numberOfLines={1}>
            {isHindi
              ? selectedItem.headerTitleHi || selectedItem.nameHi
              : selectedItem.headerTitleEn || selectedItem.nameEn}
          </Text>

          {selectedItem.subtitleHi || selectedItem.subtitleEn ? (
            <Text style={styles.modalAartiSubtitle} numberOfLines={1}>
              {isHindi
                ? selectedItem.subtitleHi || selectedItem.nameHi
                : selectedItem.subtitleEn || selectedItem.nameEn}
            </Text>
          ) : null}
        </View>

        <View style={styles.modalTopBar}>
          <View style={styles.fontSizeControlPill}>
            <TouchableOpacity
              style={[styles.fontBtn]}
              onPress={decreaseFontSize}
              disabled={fontSize <= MIN_FONT_SIZE}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MinusIcon
                size={scale(16)}
                color={
                  fontSize <= MIN_FONT_SIZE
                    ? colors.neutralDisabled
                    : colors.ring
                }
                strokeWidth={2.4}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.fontBtn,
                fontSize >= MAX_FONT_SIZE && styles.fontBtnDisabled,
              ]}
              onPress={increaseFontSize}
              disabled={fontSize >= MAX_FONT_SIZE}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <PlusIcon
                size={scale(16)}
                color={
                  fontSize >= MAX_FONT_SIZE
                    ? colors.neutralDisabled
                    : colors.ring
                }
                strokeWidth={2.4}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Aarti Lyrics Card */}
        <View style={styles.lyricsCard}>
          <ScrollView
            style={styles.lyricsScrollView}
            contentContainerStyle={[
              styles.lyricsScrollContent,
              { paddingBottom: safeBottom + scale(24) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.modalAartiLyrics,
                {
                  fontSize: fs(fontSize),
                  lineHeight: fs(Math.round(fontSize * 1.8)),
                },
              ]}
            >
              {selectedItem.textHi || selectedItem.textEn}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ArtiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  modalBody: {
    flex: 1,
  },
  modalTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
    paddingBottom: scale(2),
  },
  fontSizeControlPill: {
    alignItems: 'center',
    gap: scale(8),
  },
  fontBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBtnDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  fontSizeDisplayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(6),
  },
  fontSizeLabel: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  fontSizeValue: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '600',
    marginLeft: scale(2),
  },
  modalHeaderCloseBtn: {
    position: 'absolute',
    top: scale(12),
    right: scale(16),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  modalHeaderSection: {
    alignItems: 'center',
    paddingTop: scale(2),
    paddingBottom: scale(8),
    paddingHorizontal: scale(20),
  },
  modalImageWrapper: {
    width: scale(96),
    height: scale(96),
    borderRadius: scale(48),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    marginBottom: scale(6),
    backgroundColor: colors.primary,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  modalDeityImage: {
    width: '100%',
    height: '100%',
  },
  modalAartiTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: scale(2),
  },
  modalAartiSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
  },
  lyricsCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(-2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(8),
    elevation: 3,
    overflow: 'hidden',
  },
  lyricsScrollView: {
    flex: 1,
  },
  lyricsScrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  modalAartiLyrics: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
  },
});
