import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Vibration,
  Dimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Story } from '@constants/storiesData';
import { runOnJS } from 'react-native-worklets';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOOK_WIDTH = Math.min(SCREEN_WIDTH - scale(30), scale(370));
const BOOK_HEIGHT = scale(600);

const GOLD_ACCENT = colors.goldBead;
const GOLD_BORDER = colors.goldBeadBorder;

// Haptic feedback trigger
const triggerHaptic = () => {
  if (Platform.OS === 'android') {
    try {
      const HapticFeedback = require('native-haptic-feedback').default;
      HapticFeedback.trigger('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch {
      Vibration.vibrate(12);
    }
  } else {
    Vibration.vibrate(10);
  }
};

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 120,
  mass: 0.9,
};

interface FlipBookCoverProps {
  story: Story;
  currentLang: 'en' | 'hi';
  theme: {
    bg: string;
    surface: string;
    surfaceSubtle: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
    tagBg: string;
    tagText: string;
  };
}

export const FlipBookCover: React.FC<FlipBookCoverProps> = ({
  story,
  currentLang,
  theme,
}) => {
  // 0 = Fully Closed (Cover visible)
  // 1 = Fully Open (Inside page visible)
  const flipProgress = useSharedValue(0);
  const [isOpenState, setIsOpenState] = useState(false);

  const title = currentLang === 'hi' ? story.titleHi : story.titleEn;
  const subtitle = currentLang === 'hi' ? story.subtitleHi : story.subtitleEn;
  const category = currentLang === 'hi' ? story.categoryHi : story.categoryEn;
  const source = currentLang === 'hi' ? story.sourceHi : story.sourceEn;
  const shloka = story.shloka;
  const shlokaTranslation =
    currentLang === 'hi'
      ? story.shlokaTranslationHi
      : story.shlokaTranslationEn;
  const excerpt =
    currentLang === 'hi'
      ? story.descriptionHi || story.moralHi
      : story.descriptionEn || story.moralEn;

  const onFlipEnd = useCallback((open: boolean) => {
    setIsOpenState(open);
    triggerHaptic();
  }, []);

  // Tap handler to toggle flip
  const handleToggleFlip = useCallback(() => {
    'worklet';
    const target = flipProgress.value > 0.5 ? 0 : 1;
    flipProgress.value = withSpring(target, SPRING_CONFIG, finished => {
      if (finished) {
        runOnJS(onFlipEnd)(target === 1);
      }
    });
  }, [flipProgress, onFlipEnd]);

  // Pan gesture for interactive swipe flip
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate(event => {
      // Swiping left (negative translationX) opens the book
      // Swiping right (positive translationX) closes the book
      const delta = -event.translationX / BOOK_WIDTH;
      const base = isOpenState ? 1 : 0;
      const current = Math.min(1, Math.max(0, base + delta));
      flipProgress.value = current;
    })
    .onEnd(event => {
      // If flicked with velocity or dragged past threshold
      const velocityThreshold = 400;
      let target = flipProgress.value > 0.4 ? 1 : 0;

      if (event.velocityX < -velocityThreshold) {
        target = 1;
      } else if (event.velocityX > velocityThreshold) {
        target = 0;
      }

      flipProgress.value = withSpring(target, SPRING_CONFIG, finished => {
        if (finished) {
          runOnJS(onFlipEnd)(target === 1);
        }
      });
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    handleToggleFlip();
  });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  // Animated style for the Turning Leaf (anchored on left edge)
  const leafAnimatedStyle = useAnimatedStyle(() => {
    // Rotate from 0deg (closed) to -180deg (open)
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [0, -180],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { perspective: 1400 },
        { translateX: -BOOK_WIDTH / 2 },
        { rotateY: `${rotateY}deg` },
        { translateX: BOOK_WIDTH / 2 },
      ],
    };
  });

  // Front Cover visibility (visible when 0deg to -90deg)
  const frontCoverStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.48, 0.5, 1],
      [1, 1, 0, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      zIndex: flipProgress.value < 0.5 ? 10 : 0,
    };
  });

  // Back of Cover visibility (visible when -90deg to -180deg)
  const backCoverStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.5, 0.52, 1],
      [0, 0, 1, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      zIndex: flipProgress.value >= 0.5 ? 10 : 0,
    };
  });

  // Dynamic spine shadow overlay on the turning page
  const curlShadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, 0.45, 0.6, 0.3, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  // Underneath page shadow (cast onto the right page while turning)
  const underPageShadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.2, 0.7, 1],
      [0.65, 0.4, 0.1, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  return (
    <View style={styles.outerContainer}>
      {/* 3D Stacked Book Container */}
      <GestureDetector gesture={composedGesture}>
        <View style={styles.bookWrapper}>
          {/* Multiple Page Layer Shadows on Right & Bottom to simulate 3D book thickness */}
          <View
            style={[
              styles.paperPageLayer2,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
          />
          <View
            style={[
              styles.paperPageLayer1,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
          />

          {/* Book Spine (Left Stitched Leather Border) */}
          {/* <View style={styles.spineHinge}>
            <LinearGradient
              colors={['#3D1E06', '#663309', '#2E1503']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.spineGradient}
            >
              <View style={styles.spineRibbonStitch} />
              <View style={styles.spineRibbonStitch} />
              <View style={styles.spineRibbonStitch} />
            </LinearGradient>
          </View> */}

          {/* ============================================================ */}
          {/* LAYER 1: BASE INSIDE RIGHT PAGE (Revealed when cover flips) */}
          {/* ============================================================ */}
          <View
            style={[
              styles.insidePageContainer,
              {
                backgroundColor:
                  theme.bg === colors.black
                    ? '#161922'
                    : theme.bg === '#F4E8D1'
                    ? '#F9F1E2'
                    : '#FFFDF9',
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* Ornate Golden Inner Margin Frame */}
            <View style={[styles.ornateBorder, { borderColor: GOLD_BORDER }]}>
              {/* Corner Ornaments */}
              <Text style={[styles.cornerFlourish, styles.flourishTL]}>✦</Text>
              <Text style={[styles.cornerFlourish, styles.flourishTR]}>✦</Text>
              <Text style={[styles.cornerFlourish, styles.flourishBL]}>✦</Text>
              <Text style={[styles.cornerFlourish, styles.flourishBR]}>✦</Text>

              {/* Inside Page Header */}
              <View style={styles.insideHeader}>
                <Text
                  style={[styles.insidePrologueLabel, { color: theme.accent }]}
                >
                  {currentLang === 'hi'
                    ? '✦ प्रस्तावना • अध्याय १ ✦'
                    : '✦ PROLOGUE • CHAPTER I ✦'}
                </Text>
                <Text
                  style={[styles.insideTitle, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {title}
                </Text>
                {subtitle ? (
                  <Text
                    style={[
                      styles.insideSubtitle,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {subtitle}
                  </Text>
                ) : null}
              </View>

              {/* Sacred Shloka Card if available */}
              {shloka ? (
                <View
                  style={[
                    styles.insideShlokaBox,
                    {
                      backgroundColor:
                        theme.bg === '#0D0E12'
                          ? '#1E2330'
                          : theme.bg === '#F4E8D1'
                          ? '#EDE0C8'
                          : '#FBF5EB',
                      borderColor: GOLD_BORDER,
                    },
                  ]}
                >
                  <Text
                    style={[styles.insideShlokaVerse, { color: theme.text }]}
                    numberOfLines={3}
                  >
                    {shloka}
                  </Text>
                  {shlokaTranslation ? (
                    <Text
                      style={[
                        styles.insideShlokaMeaning,
                        { color: theme.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {shlokaTranslation}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <Text
                  style={[styles.insideExcerptText, { color: theme.text }]}
                  numberOfLines={6}
                >
                  {excerpt}
                </Text>
              )}

              {/* Meta information tags */}
              <View style={styles.insideFooterRow}>
                <View
                  style={[styles.insideTag, { backgroundColor: theme.tagBg }]}
                >
                  <Text
                    style={[styles.insideTagText, { color: theme.tagText }]}
                  >
                    {category}
                  </Text>
                </View>
                <Text
                  style={[styles.insideSource, { color: theme.textSecondary }]}
                >
                  {source}
                </Text>
              </View>

              {/* Flip back instruction hint */}
              <View style={styles.flipBackHintRow}>
                <Text
                  style={[styles.flipBackHintText, { color: theme.accent }]}
                >
                  {currentLang === 'hi'
                    ? '↩ मुखपृष्ठ बंद करें'
                    : '↩ Tap to Close Cover'}
                </Text>
              </View>
            </View>

            {/* Dynamic Shadow Cast by turning leaf */}
            <Animated.View
              style={[styles.underPageShadow, underPageShadowStyle]}
            />
          </View>

          {/* ============================================================ */}
          {/* LAYER 2: THE TURNING LEAF (Animated 3D Page Flip) */}
          {/* ============================================================ */}
          <Animated.View style={[styles.turningLeaf, leafAnimatedStyle]}>
            {/* FRONT FACE: Book Cover Image & Embossed Title */}
            <Animated.View style={[styles.coverFaceFront, frontCoverStyle]}>
              {story.image ? (
                <Image
                  source={story.image}
                  style={styles.coverImage}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    styles.coverPlaceholder,
                    { backgroundColor: colors.ring },
                  ]}
                />
              )}

              {/* Rich Vignette Gradient */}
              <LinearGradient
                colors={[
                  'rgba(0,0,0,0.1)',
                  'rgba(0,0,0,0.3)',
                  'rgba(0,0,0,0.85)',
                ]}
                style={styles.coverGradient}
              >
                {/* Top Badge: Category */}
                <View style={styles.topBadgeRow}>
                  <View style={styles.categoryGlassBadge}>
                    <Text style={styles.categoryGlassBadgeText}>
                      {category}
                    </Text>
                  </View>
                </View>

                {/* Bottom Cover Title & Open Prompt */}
                <View style={styles.coverBottomInfo}>
                  <Text style={styles.coverTitleText} numberOfLines={2}>
                    {title}
                  </Text>
                  {subtitle ? (
                    <Text style={styles.coverSubtitleText} numberOfLines={1}>
                      {subtitle}
                    </Text>
                  ) : null}
                </View>
              </LinearGradient>

              {/* Dynamic Page Curl Shadow Overlay */}
              <Animated.View
                style={[styles.curlShadowOverlay, curlShadowStyle]}
              />
            </Animated.View>

            {/* Golden Ribbon Marker - attached to cover page so it moves with the 3D flip */}
            <Animated.View style={[styles.ribbonBookmark, frontCoverStyle]}>
              <View style={styles.ribbonTail} />
            </Animated.View>

            {/* BACK FACE: Inside Left Page (Ex Libris / Dedication) */}
            <Animated.View
              style={[
                styles.coverFaceBack,
                backCoverStyle,
                {
                  backgroundColor:
                    theme.bg === '#0D0E12'
                      ? '#191C26'
                      : theme.bg === '#F4E8D1'
                      ? '#F2E6D0'
                      : '#FDFBF7',
                },
              ]}
            >
              <View
                style={[
                  styles.backFaceInnerBorder,
                  { borderColor: GOLD_BORDER },
                ]}
              >
                <Text style={styles.backFaceOm}>ॐ</Text>
                <Text style={[styles.backFaceMantra, { color: theme.accent }]}>
                  {currentLang === 'hi'
                    ? '॥ श्री गुरुभ्यो नमः ॥'
                    : '॥ Om Namo Bhagavate Vasudevaya ॥'}
                </Text>

                <View style={styles.backFaceDivider} />

                <Text
                  style={[
                    styles.backFaceDedicationTitle,
                    { color: theme.text },
                  ]}
                >
                  {currentLang === 'hi'
                    ? 'ज्ञानं परमं ध्येयम्'
                    : 'Sacred Wisdom'}
                </Text>
                <Text
                  style={[
                    styles.backFaceDedicationBody,
                    { color: theme.textSecondary },
                  ]}
                  numberOfLines={4}
                >
                  {currentLang === 'hi'
                    ? 'यह दिव्य गाथा आत्म-ज्ञान, धर्म और सत्य के मार्ग को प्रकाशित करती है।'
                    : 'This sacred narrative illuminates the path of Dharma, righteous action, and spiritual clarity.'}
                </Text>

                <View style={styles.backFaceDivider} />

                <Text
                  style={[
                    styles.backFaceSourceNote,
                    { color: theme.textSecondary },
                  ]}
                >
                  {source}
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

export default FlipBookCover;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginVertical: scale(14),
  },
  bookWrapper: {
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    position: 'relative',
    borderRadius: scale(14),
    // borderColor: colors.ring,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
  },

  // Simulated stacked paper thickness under the book
  paperPageLayer1: {
    position: 'absolute',
    top: scale(4),
    left: scale(4),
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1,
    zIndex: 1,
  },
  paperPageLayer2: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1,
    zIndex: 0,
  },

  // Left spine hinge band
  spineHinge: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -scale(4),
    width: scale(16),
    zIndex: 25,
    borderTopLeftRadius: scale(14),
    borderBottomLeftRadius: scale(14),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  spineGradient: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  spineRibbonStitch: {
    width: scale(8),
    height: scale(2),
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
    borderRadius: 1,
  },

  ribbonBookmark: {
    position: 'absolute',
    top: -scale(6),
    right: scale(36),
    width: scale(14),
    height: scale(30),
    backgroundColor: colors.ring,
    zIndex: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  ribbonTail: {
    position: 'absolute',
    bottom: -scale(4),
    left: 0,
    right: 0,
    borderLeftWidth: scale(7),
    borderRightWidth: scale(7),
    borderBottomWidth: scale(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  // BASE RIGHT INSIDE PAGE
  insidePageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1.5,
    padding: scale(14),
    paddingLeft: scale(22),
    zIndex: 2,
    overflow: 'hidden',
  },
  ornateBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    justifyContent: 'space-between',
    position: 'relative',
  },
  cornerFlourish: {
    position: 'absolute',
    fontSize: fs(12),
    color: GOLD_ACCENT,
    fontWeight: 'bold',
  },
  flourishTL: { top: scale(3), left: scale(4) },
  flourishTR: { top: scale(3), right: scale(4) },
  flourishBL: { bottom: scale(3), left: scale(4) },
  flourishBR: { bottom: scale(3), right: scale(4) },

  insideHeader: {
    alignItems: 'center',
    marginTop: scale(2),
  },
  insidePrologueLabel: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9),
    letterSpacing: 1.2,
    marginBottom: scale(3),
  },
  insideTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(15),
    textAlign: 'center',
    lineHeight: fs(20),
  },
  insideSubtitle: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(10),
    textAlign: 'center',
    marginTop: scale(2),
  },

  insideShlokaBox: {
    marginVertical: scale(8),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
  },
  insideShlokaVerse: {
    fontFamily: fonts.Marcellus,
    fontSize: fs(12),
    lineHeight: fs(18),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  insideShlokaMeaning: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(9.5),
    lineHeight: fs(14),
    textAlign: 'center',
    marginTop: scale(4),
  },
  insideExcerptText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(11),
    lineHeight: fs(17),
    textAlign: 'justify',
    marginVertical: scale(8),
  },

  insideFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
  },
  insideTag: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2.5),
    borderRadius: scale(6),
  },
  insideTagText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(9),
  },
  insideSource: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(9),
  },
  flipBackHintRow: {
    alignItems: 'center',
    marginTop: scale(6),
    paddingTop: scale(4),
  },
  flipBackHintText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(10),
    letterSpacing: 0.5,
  },
  underPageShadow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    pointerEvents: 'none',
  },

  // THE TURNING LEAF
  turningLeaf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    zIndex: 15,
  },
  coverFaceFront: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    overflow: 'hidden',
    borderColor: '#1E1E1E',
    borderLeftWidth: 8,
    // backgroundColor: '#1E1E1E',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: scale(14),
    paddingLeft: scale(22),
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryGlassBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderColor: 'rgba(255, 215, 0, 0.5)',
    borderWidth: 1,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(8),
  },
  categoryGlassBadgeText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9.5),
    color: '#FFD700',
  },
  readingTimeGlassBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(8),
  },
  readingTimeGlassBadgeText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(9.5),
    color: '#FFF',
  },
  coverBottomInfo: {
    marginBottom: scale(4),
  },
  coverTitleText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(18),
    color: '#FFF',
    lineHeight: fs(24),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
  },
  coverSubtitleText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(11),
    color: '#E0E0E0',
    marginTop: scale(2),
    marginBottom: scale(10),
  },
  openBookPromptBadge: {
    backgroundColor: colors.ring,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  openBookPromptText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(10.5),
    color: '#FFF',
  },
  curlShadowOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    pointerEvents: 'none',
  },

  // BACK FACE (shown when flipped 180deg)
  coverFaceBack: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    padding: scale(16),
    paddingRight: scale(22),
    transform: [{ scaleX: -1 }], // flips content so it reads naturally when page is turned over
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
  },
  backFaceInnerBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backFaceOm: {
    fontSize: fs(26),
    color: GOLD_ACCENT,
    fontFamily: fonts.Marcellus,
  },
  backFaceMantra: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(10),
    letterSpacing: 0.8,
    marginTop: scale(4),
  },
  backFaceDivider: {
    width: scale(80),
    height: 1,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.4,
    marginVertical: scale(10),
  },
  backFaceDedicationTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(13),
  },
  backFaceDedicationBody: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(10),
    lineHeight: fs(15),
    textAlign: 'center',
    marginTop: scale(4),
  },
  backFaceSourceNote: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(9),
    fontStyle: 'italic',
  },

  // Bottom helper text
  indicatorRow: {
    marginTop: scale(6),
    alignItems: 'center',
  },
  indicatorText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(10),
    textAlign: 'center',
  },
});
