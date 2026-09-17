import React, { useState, useCallback, useMemo, useRef } from 'react';
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
import MusicPlayer from '@components/MusicPlayer';
import { TempleBell } from '@components';

type ArtiScreenRouteProp = RouteProp<RootStackParamList, 'ArtiScreen'>;

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 26;
const DEFAULT_FONT_SIZE = 16;
const FONT_BTN_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
const CLOSE_BTN_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

export const ArtiScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : scale(44);
  const safeBottom = insets.bottom > 0 ? insets.bottom : scale(16);

  const route = useRoute<ArtiScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { isHindi } = useAppLanguage();
  const scrollViewRef = useRef<ScrollView>(null);

  const selectedItem = route.params?.arti;

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = Storage.getNumber(STORAGE_KEYS.AARTI_FONT_SIZE);
    return saved && saved >= MIN_FONT_SIZE && saved <= MAX_FONT_SIZE
      ? saved
      : DEFAULT_FONT_SIZE;
  });

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const onTogglePlay = useCallback(() => {
    triggerHaptic();
    setIsPlaying(prev => !prev);
  }, []);

  const handlePrevious = useCallback(() => {
    triggerHaptic();
  }, []);

  const handleNext = useCallback(() => {
    triggerHaptic();
  }, []);

  const handleToggleLoop = useCallback(() => {
    triggerHaptic();
    setIsLooping(prev => !prev);
  }, []);

  const handleToggleShuffle = useCallback(() => {
    triggerHaptic();
    setIsShuffle(prev => !prev);
  }, []);

  const handleBack = useCallback(() => {
    triggerHaptic();
    setIsPlaying(false);
    navigation.goBack();
  }, [navigation]);

  const adjustFontSize = useCallback((delta: number) => {
    triggerHaptic();
    setFontSize(prev => {
      const next = Math.min(
        MAX_FONT_SIZE,
        Math.max(MIN_FONT_SIZE, prev + delta),
      );
      Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, next);
      return next;
    });
  }, []);

  const title = useMemo(() => {
    if (!selectedItem) return '';
    return isHindi
      ? selectedItem.headerTitleHi || selectedItem.nameHi
      : selectedItem.headerTitleEn || selectedItem.nameEn;
  }, [selectedItem, isHindi]);

  const subtitle = useMemo(() => {
    if (!selectedItem) return '';
    return isHindi
      ? selectedItem.subtitleHi || selectedItem.nameHi
      : selectedItem.subtitleEn || selectedItem.nameEn;
  }, [selectedItem, isHindi]);

  const lyrics = useMemo(() => {
    if (!selectedItem) return '';
    return selectedItem.textHi || selectedItem.textEn || '';
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <View style={[styles.container, { paddingTop: safeTop }]}>
        <TouchableOpacity
          style={styles.modalHeaderCloseBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={CLOSE_BTN_HIT_SLOP}
        >
          <CloseIcon size={scale(16)} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>
        <Text style={styles.modalAartiTitle}>Aarti not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      {/* Decorative Temple Bells (Left & Right) - swings smoothly when music is playing */}
      <TempleBell
        height={scale(170)}
        swingAngle={12}
        initialDirection="left"
        isSwinging={isPlaying}
        style={styles.leftBell}
      />
      <TempleBell
        height={scale(170)}
        swingAngle={12}
        initialDirection="right"
        delay={350}
        isSwinging={isPlaying}
        style={styles.rightBell}
      />

      <View style={styles.modalBody}>
        {/* Top Action Bar: Close Button */}
        <TouchableOpacity
          style={styles.modalHeaderCloseBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={CLOSE_BTN_HIT_SLOP}
        >
          <CloseIcon size={scale(16)} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>

        {/* Deity Showcase & Aarti Title Header */}
        <View style={styles.modalHeaderSection}>
          {selectedItem.image ? (
            <View style={styles.modalImageWrapper}>
              <Image
                source={selectedItem.image}
                style={styles.modalDeityImage}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <Text style={styles.modalAartiTitle} numberOfLines={1}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.modalAartiSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Music Player & Font Size Control */}
        <View style={styles.playerWithFontRow}>
          <MusicPlayer
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isLooping={isLooping}
            onToggleLoop={handleToggleLoop}
            isShuffle={isShuffle}
            onToggleShuffle={handleToggleShuffle}
          />
          <View style={styles.fontSizeControlPill}>
            <TouchableOpacity
              style={styles.fontBtn}
              onPress={() => adjustFontSize(-2)}
              disabled={fontSize <= MIN_FONT_SIZE}
              activeOpacity={0.7}
              hitSlop={FONT_BTN_HIT_SLOP}
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
              onPress={() => adjustFontSize(2)}
              disabled={fontSize >= MAX_FONT_SIZE}
              activeOpacity={0.7}
              hitSlop={FONT_BTN_HIT_SLOP}
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
            ref={scrollViewRef}
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
              {lyrics}
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
  playerWithFontRow: {
    flexDirection: 'row',
    marginBottom: scale(5),
    gap: scale(15),
    marginLeft: scale(45),
  },
  fontSizeControlPill: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fontBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBtnDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.3,
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
    zIndex: 10,
  },
  modalHeaderSection: {
    alignItems: 'center',
    paddingTop: scale(2),
    paddingBottom: scale(4),
    paddingHorizontal: scale(20),
  },
  modalImageWrapper: {
    width: scale(96),
    height: scale(96),
    borderRadius: scale(48),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
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
  },
  modalAartiSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
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
  leftBell: {
    position: 'absolute',
    top: 0,
    left: scale(8),
    zIndex: 1,
  },
  rightBell: {
    position: 'absolute',
    top: 0,
    right: scale(8),
    zIndex: 1,
  },
});
