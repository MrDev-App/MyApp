import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Vibration,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withSpring,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { runOnJS } from 'react-native-worklets';

import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Story, StoryPage } from '@constants/storiesData';
import { Back } from '@assets/index';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOOK_WIDTH = Math.min(SCREEN_WIDTH - scale(28), scale(380));
// Golden-ratio page height that fits comfortably on all devices
const BOOK_HEIGHT = Math.min(scale(560), SCREEN_HEIGHT - scale(150));

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
      Vibration.vibrate(15);
    }
  } else {
    Vibration.vibrate(12);
  }
};

const SPRING_CONFIG = {
  damping: 22,
  stiffness: 150,
  mass: 0.8,
};

const QUEUED_SPRING_CONFIG = {
  damping: 24,
  stiffness: 220,
  mass: 0.6,
};

// Hindi numeral converter
const toHindiNumeral = (num: number): string => {
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .split('')
    .map(d => hindiDigits[parseInt(d, 10)] ?? d)
    .join('');
};

interface BookSheetProps {
  index: number;
  totalSheets: number;
  progress: SharedValue<number>;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onHalfwayChange: (targetPage: number) => void;
}

// Dedicated Stacked Book Sheet Component - Memoized, Hardware-Accelerated, Zero-Flicker
const BookSheet: React.FC<BookSheetProps> = React.memo(
  ({
    index,
    totalSheets,
    progress,
    frontContent,
    backContent,
    onHalfwayChange,
  }) => {
    // Synchronously report halfway crossing (0.5 progress) to update page number instantly
    useAnimatedReaction(
      () => progress.value >= 0.5,
      (isPastHalf, wasPastHalf) => {
        if (wasPastHalf !== null && isPastHalf !== wasPastHalf) {
          const targetPage = isPastHalf ? index + 1 : index;
          runOnJS(onHalfwayChange)(targetPage);
        }
      },
      [index, onHalfwayChange],
    );

    const leafAnimatedStyle = useAnimatedStyle(() => {
      const rotateY = interpolate(
        progress.value,
        [0, 1],
        [0, -180],
        Extrapolation.CLAMP,
      );

      let zIndex =
        rotateY > -90 ? (totalSheets - index) * 10 : (index + 1) * 10;
      if (progress.value > 0.005 && progress.value < 0.995) {
        zIndex = 1000 + (totalSheets - index);
      }

      return {
        zIndex,
        transform: [
          { perspective: 1400 },
          { translateX: -BOOK_WIDTH / 2 },
          { rotateY: `${rotateY}deg` },
          { translateX: BOOK_WIDTH / 2 },
        ],
      };
    });

    const frontFaceStyle = useAnimatedStyle(() => {
      return {
        opacity: progress.value < 0.5 ? 1 : 0,
        zIndex: progress.value < 0.5 ? 2 : 0,
      };
    });

    const backFaceStyle = useAnimatedStyle(() => {
      return {
        opacity: progress.value >= 0.5 ? 1 : 0,
        zIndex: progress.value >= 0.5 ? 2 : 0,
      };
    });

    const curlShadowStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        progress.value,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 0.35, 0.5, 0.2, 0],
        Extrapolation.CLAMP,
      );
      return { opacity };
    });

    return (
      <Animated.View style={[styles.turningLeaf, leafAnimatedStyle]}>
        {/* FRONT FACE (Visible 0deg to -90deg) */}
        <Animated.View
          style={[styles.coverFaceFront, frontFaceStyle]}
          renderToHardwareTextureAndroid={true}
          shouldRasterizeIOS={true}
        >
          {frontContent}
          <Animated.View style={[styles.curlShadowOverlay, curlShadowStyle]} />
        </Animated.View>

        {/* BACK FACE (Visible -90deg to -180deg) */}
        <Animated.View
          style={[styles.coverFaceBackWrap, backFaceStyle]}
          renderToHardwareTextureAndroid={true}
          shouldRasterizeIOS={true}
        >
          {backContent}
        </Animated.View>
      </Animated.View>
    );
  },
);

interface StoryPageViewProps {
  pageData: StoryPage;
  theme: any;
  fontSize: number;
  category?: string;
  source?: string;
  isInteractive: boolean;
}

const StoryPageView: React.FC<StoryPageViewProps> = React.memo(
  ({ pageData, theme, fontSize, category, source, isInteractive }) => {
    const pageSource = pageData.sourceHi || source;
    const pageContent = pageData.contentHi;
    const pageShloka = pageData.shloka;
    const pageShlokaTrans = pageData.shlokaTranslationHi;
    const pageMoral = pageData.moralHi;

    const paragraphs = useMemo(() => {
      return (pageContent || '').split('\n\n').filter(p => p.trim().length > 0);
    }, [pageContent]);

    return (
      <View
        style={[
          styles.insidePageContainer,
          {
            backgroundColor:
              theme.bg === '#121215' || theme.bg === colors.black
                ? '#1A1D27'
                : theme.bg === '#FAF5EC'
                ? '#FAF3E3'
                : '#FFFDF9',
            borderColor: theme.cardBorder,
          },
        ]}
      >
        {/* Ornate Golden Inner Margin Frame */}
        <View style={[styles.ornateBorder, { borderColor: GOLD_BORDER }]}>
          {/* Corner Flourishes */}
          <Text style={[styles.cornerFlourish, styles.flourishTL]}>✦</Text>
          <Text style={[styles.cornerFlourish, styles.flourishTR]}>✦</Text>
          <Text style={[styles.cornerFlourish, styles.flourishBL]}>✦</Text>
          <Text style={[styles.cornerFlourish, styles.flourishBR]}>✦</Text>

          {/* Page Top Header Bar */}
          <View style={styles.insideHeaderBar}>
            <View
              style={[styles.pageSourceBadge, { backgroundColor: theme.tagBg }]}
            >
              <Text
                style={[styles.pageSourceText, { color: theme.tagText }]}
                numberOfLines={1}
              >
                {pageSource || category}
              </Text>
            </View>
          </View>

          {/* Scrollable Page Body */}
          <ScrollView
            style={styles.pageScrollView}
            contentContainerStyle={styles.pageScrollContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isInteractive}
            bounces={false}
          >
            {/* Page Illustrations from imagePages / image */}
            {pageData.imagePages && pageData.imagePages.length > 0 ? (
              <View style={styles.pageImagesContainer}>
                {pageData.imagePages.map((imgSrc: any, imgIdx: number) => (
                  <View key={`page-img-${imgIdx}`} style={styles.pageImageCard}>
                    <Image
                      source={imgSrc}
                      style={styles.pageImage}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>
            ) : Array.isArray(pageData.image) && pageData.image.length > 0 ? (
              <View style={styles.pageImagesContainer}>
                {pageData.image.map((imgSrc: any, imgIdx: number) => (
                  <View
                    key={`page-img-arr-${imgIdx}`}
                    style={styles.pageImageCard}
                  >
                    <Image
                      source={imgSrc}
                      style={styles.pageImage}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>
            ) : pageData.image ? (
              <View style={styles.pageImageCard}>
                <Image
                  source={pageData.image}
                  style={styles.pageImage}
                  resizeMode="contain"
                />
              </View>
            ) : null}

            {/* Holy Shloka Card */}
            {pageShloka ? (
              <View
                style={[
                  styles.shlokaBox,
                  {
                    backgroundColor:
                      theme.bg === '#121215' || theme.bg === colors.black
                        ? '#222736'
                        : theme.bg === '#FAF5EC'
                        ? '#F1E6D0'
                        : '#FCF7EC',
                    borderColor: GOLD_BORDER,
                  },
                ]}
              >
                <View style={styles.shlokaHeaderPill}>
                  <Text style={[styles.shlokaTagText, { color: GOLD_ACCENT }]}>
                    ✦ पावन श्लोक ✦
                  </Text>
                </View>
                <Text
                  style={[
                    styles.shlokaVerseText,
                    {
                      color: theme.text,
                      fontSize: fs(Math.max(12, fontSize - 1.5)),
                    },
                  ]}
                >
                  {pageShloka}
                </Text>
                {pageShlokaTrans ? (
                  <View
                    style={[styles.shlokaDivider, { borderColor: GOLD_BORDER }]}
                  >
                    <Text
                      style={[
                        styles.shlokaMeaningText,
                        {
                          color: theme.textSecondary,
                          fontSize: fs(Math.max(10.5, fontSize - 3)),
                        },
                      ]}
                    >
                      {pageShlokaTrans}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Narrative Content */}
            {paragraphs.map((para, idx) => (
              <Text
                key={`p-${idx}`}
                style={[
                  styles.narrativeParagraph,
                  {
                    color: theme.text,
                    fontSize: fs(fontSize),
                    lineHeight: fs(fontSize * 1.55),
                  },
                ]}
              >
                {para}
              </Text>
            ))}

            {/* Moral Wisdom Card */}
            {pageMoral ? (
              <View
                style={[
                  styles.moralCard,
                  {
                    backgroundColor:
                      theme.bg === '#121215' || theme.bg === colors.black
                        ? '#202638'
                        : theme.bg === '#FAF5EC'
                        ? '#EFE2C6'
                        : '#FEF8EB',
                    borderColor: GOLD_ACCENT,
                  },
                ]}
              >
                <Text style={[styles.moralCardHeader, { color: theme.accent }]}>
                  ✦ दिव्य सीख ✦
                </Text>
                <Text
                  style={[
                    styles.moralCardText,
                    {
                      color: theme.text,
                      fontSize: fs(Math.max(11.5, fontSize - 2)),
                      lineHeight: fs(fontSize * 1.45),
                    },
                  ]}
                >
                  {pageMoral}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    );
  },
);

// Memoized Front Cover View
interface CoverFrontViewProps {
  story: Story;
  title: string;
  subtitle?: string;
  category?: string;
  onOpenBook: () => void;
}

const CoverFrontView: React.FC<CoverFrontViewProps> = React.memo(
  ({ story, title, subtitle, category, onOpenBook }) => (
    <View style={styles.coverFaceContainer}>
      {story.image ? (
        <Image
          source={Array.isArray(story.image) ? story.image[0] : story.image}
          style={styles.coverImage}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[styles.coverPlaceholder, { backgroundColor: colors.ring }]}
        />
      )}

      {/* Rich Vignette Gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
        style={styles.coverGradient}
      >
        {/* Top Category Badge */}
        <View style={styles.topBadgeRow}>
          <View style={styles.categoryGlassBadge}>
            <Text style={styles.categoryGlassBadgeText}>{category}</Text>
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

      {/* Golden Ribbon Bookmark */}
      <View style={styles.ribbonBookmark}>
        <View style={styles.ribbonTail} />
      </View>
    </View>
  ),
);

// Memoized Back Face View
interface BackFaceViewProps {
  isCoverBack: boolean;
  theme: any;
  source?: string;
}

const BackFaceView: React.FC<BackFaceViewProps> = React.memo(
  ({ isCoverBack, theme, source }) => (
    <View
      style={[
        styles.coverFaceBack,
        {
          backgroundColor:
            theme.bg === '#121215' || theme.bg === colors.black
              ? '#161922'
              : theme.bg === '#FAF5EC'
              ? '#F4ECE0'
              : '#FBF8F2',
        },
      ]}
    >
      <View style={[styles.backFaceInnerBorder, { borderColor: GOLD_BORDER }]}>
        <Text style={styles.backFaceOm}>ॐ</Text>
        <Text style={[styles.backFaceMantra, { color: theme.accent }]}>
          ॥ श्री गुरुभ्यो नमः ॥
        </Text>

        <View style={styles.backFaceDivider} />

        <Text style={[styles.backFaceDedicationTitle, { color: theme.text }]}>
          {isCoverBack ? 'ज्ञानं परमं ध्येयम्' : 'पवित्र गाथा'}
        </Text>

        <Text
          style={[
            styles.backFaceDedicationBody,
            { color: theme.textSecondary },
          ]}
          numberOfLines={4}
        >
          {isCoverBack
            ? 'यह दिव्य गाथा आत्म-ज्ञान, धर्म और सत्य के मार्ग को प्रकाशित करती है।'
            : 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — कर्तव्य ही पूजा है।'}
        </Text>

        <View style={styles.backFaceDivider} />

        {source ? (
          <Text
            style={[styles.backFaceSourceNote, { color: theme.textSecondary }]}
          >
            {source}
          </Text>
        ) : null}
      </View>
    </View>
  ),
);

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
    ring: string;
  };
  fontSize?: number;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
}

export const FlipBookCover: React.FC<FlipBookCoverProps> = ({
  story,
  currentLang,
  theme,
  fontSize = 15,
  onPageChange,
}) => {
  // Preload and memoize all story pages
  const pages: StoryPage[] = useMemo(() => {
    if (story?.pages && story.pages.length > 0) {
      return story.pages;
    }
    return [
      {
        page: 1,
        sourceHi: story?.sourceHi,
        contentHi: story?.contentHi || story?.descriptionHi,
        shloka: story?.shloka,
        shlokaTranslationHi: story?.shlokaTranslationHi,
        moralHi: story?.moralHi,
        imagePages: story.imagePages,
        image: story.image,
      },
    ];
  }, [story]);

  const totalPages = pages.length;

  // Discrete shared values for each sheet in the book stack
  const sheetProgress0 = useSharedValue(0);
  const sheetProgress1 = useSharedValue(0);
  const sheetProgress2 = useSharedValue(0);
  const sheetProgress3 = useSharedValue(0);
  const sheetProgress4 = useSharedValue(0);
  const sheetProgress5 = useSharedValue(0);
  const sheetProgress6 = useSharedValue(0);
  const sheetProgress7 = useSharedValue(0);

  const sheetProgressList = useMemo(() => {
    return [
      sheetProgress0,
      sheetProgress1,
      sheetProgress2,
      sheetProgress3,
      sheetProgress4,
      sheetProgress5,
      sheetProgress6,
      sheetProgress7,
    ];
  }, [
    sheetProgress0,
    sheetProgress1,
    sheetProgress2,
    sheetProgress3,
    sheetProgress4,
    sheetProgress5,
    sheetProgress6,
    sheetProgress7,
  ]);

  // UI-thread shared values for coordination & gesture boundaries
  const activeSheetIdx = useSharedValue<number>(0);
  const gestureDir = useSharedValue<'forward' | 'backward'>('forward');
  const isGestureActive = useSharedValue<boolean>(false);
  const isAnimatingShared = useSharedValue<boolean>(false);
  const currentPageShared = useSharedValue<number>(0);

  // Synchronous JS-thread state tracking (prevents React state tick desync)
  const currentPageRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isJumpingRef = useRef<boolean>(false);
  const actionQueueRef = useRef<Array<'next' | 'prev'>>([]);

  // React state for UI rendering only
  const [displayPage, setDisplayPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [activeFlipDir, setActiveFlipDir] = useState<
    'forward' | 'backward' | null
  >(null);
  const [queueLength, setQueueLength] = useState<number>(0);

  const title = story.titleHi;
  const subtitle = story.subtitleHi;
  const category = story.categoryHi;
  const source = story.sourceHi;

  // Refs to break circular callback dependencies cleanly
  const processNextQueueRef = useRef<() => void>(() => {});
  const executeForwardFlipRef = useRef<
    (fromPage: number, isQueued?: boolean) => void
  >(() => {});
  const executeBackwardFlipRef = useRef<
    (fromPage: number, isQueued?: boolean) => void
  >(() => {});

  // Complete turn callbacks
  const onForwardTurnFinish = useCallback(
    (sheetIdx: number) => {
      const nextPage = sheetIdx + 1;
      currentPageRef.current = nextPage;
      currentPageShared.value = nextPage;
      setDisplayPage(nextPage);
      onPageChange?.(nextPage, totalPages);

      processNextQueueRef.current();
    },
    [totalPages, onPageChange, currentPageShared],
  );

  const onBackwardTurnFinish = useCallback(
    (sheetIdx: number) => {
      const prevPage = sheetIdx;
      currentPageRef.current = prevPage;
      currentPageShared.value = prevPage;
      setDisplayPage(prevPage);
      onPageChange?.(prevPage, totalPages);

      processNextQueueRef.current();
    },
    [totalPages, onPageChange, currentPageShared],
  );

  const onFlipCancel = useCallback(
    (sheetIdx: number, wasTurningForward: boolean) => {
      const originalPage = wasTurningForward ? sheetIdx : sheetIdx + 1;
      currentPageRef.current = originalPage;
      currentPageShared.value = originalPage;
      setDisplayPage(originalPage);
      onPageChange?.(originalPage, totalPages);

      actionQueueRef.current = [];
      setQueueLength(0);
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);
    },
    [totalPages, onPageChange, currentPageShared],
  );

  // Midway crossing callback: fired by useAnimatedReaction when progress crosses 0.5
  const handleHalfwayChange = useCallback(
    (targetPage: number) => {
      if (isJumpingRef.current) return;
      if (currentPageRef.current === targetPage) return;
      currentPageRef.current = targetPage;
      currentPageShared.value = targetPage;
      setDisplayPage(targetPage);
      triggerHaptic();
      onPageChange?.(targetPage, totalPages);
    },
    [totalPages, onPageChange, currentPageShared],
  );

  // Core Forward Flip Execution
  const executeForwardFlip = useCallback(
    (fromPage: number, isQueued: boolean = false) => {
      if (fromPage >= totalPages) {
        processNextQueueRef.current();
        return;
      }
      const targetSheet = fromPage;
      const progressVal = sheetProgressList[targetSheet];
      if (!progressVal) {
        processNextQueueRef.current();
        return;
      }

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      setIsFlipping(true);
      setActiveFlipDir('forward');

      const config = isQueued ? QUEUED_SPRING_CONFIG : SPRING_CONFIG;
      progressVal.value = withSpring(1, config, finished => {
        if (finished) {
          runOnJS(onForwardTurnFinish)(targetSheet);
        }
      });
    },
    [totalPages, sheetProgressList, onForwardTurnFinish, isAnimatingShared],
  );
  executeForwardFlipRef.current = executeForwardFlip;

  // Core Backward Flip Execution
  const executeBackwardFlip = useCallback(
    (fromPage: number, isQueued: boolean = false) => {
      if (fromPage <= 0) {
        processNextQueueRef.current();
        return;
      }
      const targetSheet = fromPage - 1;
      const progressVal = sheetProgressList[targetSheet];
      if (!progressVal) {
        processNextQueueRef.current();
        return;
      }

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      setIsFlipping(true);
      setActiveFlipDir('backward');

      const config = isQueued ? QUEUED_SPRING_CONFIG : SPRING_CONFIG;
      progressVal.value = withSpring(0, config, finished => {
        if (finished) {
          runOnJS(onBackwardTurnFinish)(targetSheet);
        }
      });
    },
    [sheetProgressList, onBackwardTurnFinish, isAnimatingShared],
  );
  executeBackwardFlipRef.current = executeBackwardFlip;

  // Process next action in the multi-tap queue with smooth pacing
  const processNextQueue = useCallback(() => {
    if (actionQueueRef.current.length === 0) {
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);
      setQueueLength(0);
      return;
    }

    const nextAction = actionQueueRef.current.shift()!;
    setQueueLength(actionQueueRef.current.length);

    const cur = currentPageRef.current;
    if (nextAction === 'next') {
      if (cur < totalPages) {
        setActiveFlipDir('forward');
        executeForwardFlipRef.current(cur, true);
      } else {
        processNextQueue();
      }
    } else {
      if (cur > 0) {
        setActiveFlipDir('backward');
        executeBackwardFlipRef.current(cur, true);
      } else {
        processNextQueue();
      }
    }
  }, [totalPages, isAnimatingShared]);
  processNextQueueRef.current = processNextQueue;

  // Programmatic forward flip with multi-tap queueing
  const handleNextPage = useCallback(() => {
    const cur = currentPageRef.current;
    if (cur >= totalPages) return;

    if (isAnimatingRef.current) {
      if (actionQueueRef.current.length < 10) {
        actionQueueRef.current.push('next');
        setQueueLength(actionQueueRef.current.length);
      }
      return;
    }

    executeForwardFlip(cur, false);
  }, [totalPages, executeForwardFlip]);

  // Programmatic backward flip with multi-tap queueing
  const handlePrevPage = useCallback(() => {
    const cur = currentPageRef.current;
    if (cur <= 0) return;

    if (isAnimatingRef.current) {
      if (actionQueueRef.current.length < 10) {
        actionQueueRef.current.push('prev');
        setQueueLength(actionQueueRef.current.length);
      }
      return;
    }

    executeBackwardFlip(cur, false);
  }, [executeBackwardFlip]);

  // Stable callback when jump animation finishes
  const onJumpSettled = useCallback(
    (targetPage: number) => {
      isJumpingRef.current = false;
      currentPageRef.current = targetPage;
      currentPageShared.value = targetPage;
      setDisplayPage(targetPage);
      onPageChange?.(targetPage, totalPages);
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);
    },
    [totalPages, onPageChange, currentPageShared, isAnimatingShared],
  );

  // Jump to specific page via dots - Smooth, crash-proof multi-sheet transition
  const handleJumpToPage = useCallback(
    (targetPage: number) => {
      if (
        isAnimatingRef.current ||
        targetPage === currentPageRef.current ||
        targetPage < 0 ||
        targetPage > totalPages
      ) {
        return;
      }
      triggerHaptic();

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      isJumpingRef.current = true;
      setIsFlipping(true);
      actionQueueRef.current = [];
      setQueueLength(0);

      const fromPage = currentPageRef.current;
      const isForward = targetPage > fromPage;
      setActiveFlipDir(isForward ? 'forward' : 'backward');
      setDisplayPage(targetPage);

      if (isForward) {
        const finalSheetIdx = targetPage - 1;
        for (let i = fromPage; i < targetPage; i++) {
          const progressVal = sheetProgressList[i];
          if (progressVal) {
            if (i === finalSheetIdx) {
              progressVal.value = withSpring(
                1,
                QUEUED_SPRING_CONFIG,
                finished => {
                  if (finished) {
                    runOnJS(onJumpSettled)(targetPage);
                  }
                },
              );
            } else {
              progressVal.value = withSpring(1, QUEUED_SPRING_CONFIG);
            }
          }
        }
      } else {
        const finalSheetIdx = targetPage;
        for (let i = fromPage - 1; i >= targetPage; i--) {
          const progressVal = sheetProgressList[i];
          if (progressVal) {
            if (i === finalSheetIdx) {
              progressVal.value = withSpring(
                0,
                QUEUED_SPRING_CONFIG,
                finished => {
                  if (finished) {
                    runOnJS(onJumpSettled)(targetPage);
                  }
                },
              );
            } else {
              progressVal.value = withSpring(0, QUEUED_SPRING_CONFIG);
            }
          }
        }
      }
    },
    [totalPages, sheetProgressList, onJumpSettled, isAnimatingShared],
  );

  const notifyPanAnimationStart = useCallback(() => {
    isAnimatingRef.current = true;
    setIsFlipping(true);
  }, []);

  // Stable, memoized Pan Gesture with UI-thread worklets
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onStart(event => {
        'worklet';
        // Reject pan if any programmatic or queued flip is animating
        if (isAnimatingShared.value) {
          isGestureActive.value = false;
          return;
        }
        const curPage = currentPageShared.value;

        if (event.velocityX < 0) {
          // Swiping left -> Turn forward
          if (curPage >= totalPages) return;
          activeSheetIdx.value = curPage;
          gestureDir.value = 'forward';
          isGestureActive.value = true;
        } else if (event.velocityX > 0) {
          // Swiping right -> Turn backward
          if (curPage <= 0) return;
          activeSheetIdx.value = curPage - 1;
          gestureDir.value = 'backward';
          isGestureActive.value = true;
        }
      })
      .onUpdate(event => {
        'worklet';
        if (!isGestureActive.value) return;
        const sheetIdx = activeSheetIdx.value;
        if (sheetIdx < 0 || sheetIdx >= totalPages) return;

        const progressVal = sheetProgressList[sheetIdx];
        if (!progressVal) return;

        if (gestureDir.value === 'forward') {
          const progress = Math.min(
            1,
            Math.max(0, -event.translationX / BOOK_WIDTH),
          );
          progressVal.value = progress;
        } else {
          const progress = Math.min(
            1,
            Math.max(0, 1 - event.translationX / BOOK_WIDTH),
          );
          progressVal.value = progress;
        }
      })
      .onEnd(event => {
        'worklet';
        if (!isGestureActive.value) return;
        isGestureActive.value = false;

        const sheetIdx = activeSheetIdx.value;
        if (sheetIdx < 0 || sheetIdx >= totalPages) return;

        const progressVal = sheetProgressList[sheetIdx];
        if (!progressVal) return;

        isAnimatingShared.value = true;
        runOnJS(notifyPanAnimationStart)();

        const velocityThreshold = 250;
        if (gestureDir.value === 'forward') {
          const shouldTurn =
            progressVal.value > 0.35 || event.velocityX < -velocityThreshold;
          if (shouldTurn) {
            progressVal.value = withSpring(1, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onForwardTurnFinish)(sheetIdx);
              }
            });
          } else {
            progressVal.value = withSpring(0, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onFlipCancel)(sheetIdx, true);
              }
            });
          }
        } else {
          const shouldTurn =
            progressVal.value < 0.65 || event.velocityX > velocityThreshold;
          if (shouldTurn) {
            progressVal.value = withSpring(0, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onBackwardTurnFinish)(sheetIdx);
              }
            });
          } else {
            progressVal.value = withSpring(1, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onFlipCancel)(sheetIdx, false);
              }
            });
          }
        }
      });
  }, [
    totalPages,
    sheetProgressList,
    currentPageShared,
    isAnimatingShared,
    activeSheetIdx,
    gestureDir,
    isGestureActive,
    notifyPanAnimationStart,
    onForwardTurnFinish,
    onBackwardTurnFinish,
    onFlipCancel,
  ]);

  // Memoized Content Elements
  const coverFrontElement = useMemo(
    () => (
      <CoverFrontView
        story={story}
        title={title}
        subtitle={subtitle}
        category={category}
        onOpenBook={handleNextPage}
      />
    ),
    [story, title, subtitle, category, handleNextPage],
  );

  const coverBackElement = useMemo(
    () => <BackFaceView isCoverBack={true} theme={theme} source={source} />,
    [theme, source],
  );

  const pageBackElement = useMemo(
    () => <BackFaceView isCoverBack={false} theme={theme} source={source} />,
    [theme, source],
  );

  const lastPageData = pages[totalPages - 1] || pages[0];

  return (
    <View style={styles.outerContainer}>
      {/* 3D Stacked Book Container */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.bookWrapper}>
          {/* Multiple Page Layer Shadows */}
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

          {/* ============================================================ */}
          {/* BASE UNDERNEATH PAGE: Last Page in stack                     */}
          {/* ============================================================ */}
          <StoryPageView
            pageData={lastPageData}
            theme={theme}
            fontSize={fontSize}
            category={category}
            source={source}
            isInteractive={displayPage === totalPages}
          />

          {/* ============================================================ */}
          {/* STACKED ANIMATED SHEETS (Cover + Pages)                       */}
          {/* ============================================================ */}

          {/* Sheet 0: Cover (Turns to reveal Page 1) */}
          <BookSheet
            index={0}
            totalSheets={totalPages}
            progress={sheetProgress0}
            frontContent={coverFrontElement}
            backContent={coverBackElement}
            onHalfwayChange={handleHalfwayChange}
          />

          {/* Sheets 1 to totalPages-1: Story Pages */}
          {pages.slice(0, totalPages - 1).map((pageItem, idx) => {
            const sheetIdx = idx + 1;
            const progressSharedVal = sheetProgressList[sheetIdx];
            if (!progressSharedVal) return null;

            return (
              <BookSheet
                key={`sheet-${sheetIdx}`}
                index={sheetIdx}
                totalSheets={totalPages}
                progress={progressSharedVal}
                frontContent={
                  <StoryPageView
                    pageData={pageItem}
                    theme={theme}
                    fontSize={fontSize}
                    category={category}
                    source={source}
                    isInteractive={displayPage === sheetIdx}
                  />
                }
                backContent={pageBackElement}
                onHalfwayChange={handleHalfwayChange}
              />
            );
          })}

          {/* Floating Page-Turning Status Indicator with Queue Backlog Counter */}
          {isFlipping && (
            <View style={styles.loadingOverlay} pointerEvents="none">
              <View
                style={[
                  styles.loadingPill,
                  {
                    backgroundColor: 'rgba(18, 18, 23, 0.88)',
                    borderColor: GOLD_BORDER,
                  },
                ]}
              >
                <ActivityIndicator
                  size="small"
                  color={GOLD_ACCENT}
                  style={styles.loadingSpinner}
                />
                <Text style={styles.loadingText}>
                  {queueLength >= 2
                    ? `पृष्ठ पलट रहे हैं (+${queueLength})...`
                    : 'कृपया प्रतीक्षा करें...'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </GestureDetector>

      {/* ============================================================ */}
      {/* BOTTOM BOOK NAVIGATION CONTROLS BAR                         */}
      {/* ============================================================ */}
      <View style={styles.bottomNavBar}>
        {/* Previous Button */}
        <TouchableOpacity
          style={[
            styles.navPageBtn,

            // (displayPage === 0 || isFlipping) && styles.navBtnDisabled,
          ]}
          onPress={handlePrevPage}
          disabled={displayPage === 0 || isFlipping}
          activeOpacity={0.7}
        >
          {isFlipping && activeFlipDir === 'backward' ? (
            <ActivityIndicator size={scale(14)} color={colors.white} />
          ) : (
            <Back width={scale(14)} height={scale(14)} />
          )}
        </TouchableOpacity>

        {/* Page Dots & Jumper */}
        <View style={styles.pageDotsContainer}>
          <TouchableOpacity
            onPress={() => handleJumpToPage(0)}
            disabled={isFlipping}
            style={[
              styles.pageDot,
              displayPage === 0
                ? [styles.pageDotActive, { backgroundColor: colors.ring }]
                : { backgroundColor: theme.surfaceSubtle },
            ]}
          >
            <Text
              style={[
                styles.dotLabel,
                {
                  color: displayPage === 0 ? colors.white : theme.textSecondary,
                },
              ]}
            >
              मुख
            </Text>
          </TouchableOpacity>

          {pages.map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = displayPage === pageNum;
            return (
              <TouchableOpacity
                key={`dot-${pageNum}`}
                onPress={() => handleJumpToPage(pageNum)}
                disabled={isFlipping}
                style={[
                  styles.pageDot,
                  isActive
                    ? [styles.pageDotActive, { backgroundColor: colors.ring }]
                    : { backgroundColor: theme.surfaceSubtle },
                ]}
              >
                <Text
                  style={[
                    styles.dotLabel,
                    { color: isActive ? colors.white : theme.textSecondary },
                  ]}
                >
                  {toHindiNumeral(pageNum)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.navPageBtn,

            // (displayPage === totalPages || isFlipping) && styles.navBtnDisabled,
          ]}
          onPress={handleNextPage}
          disabled={displayPage === totalPages || isFlipping}
          activeOpacity={0.7}
        >
          {isFlipping && activeFlipDir === 'forward' ? (
            <ActivityIndicator size={scale(14)} color={colors.white} />
          ) : (
            <View style={styles.forwardIconWrap}>
              <Back width={scale(14)} height={scale(14)} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlipBookCover;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginVertical: scale(8),
    flex: 1,
    justifyContent: 'center',
  },
  bookWrapper: {
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    position: 'relative',
    borderRadius: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
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

  // BASE RIGHT INSIDE PAGE
  insidePageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1.5,
    padding: scale(10),
    paddingLeft: scale(14),
    zIndex: 2,
    overflow: 'hidden',
  },
  ornateBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(10),
    justifyContent: 'space-between',
    position: 'relative',
  },
  cornerFlourish: {
    position: 'absolute',
    fontSize: fs(11),
    color: GOLD_ACCENT,
    fontWeight: 'bold',
  },
  flourishTL: { top: scale(3), left: scale(4) },
  flourishTR: { top: scale(3), right: scale(4) },
  flourishBL: { bottom: scale(3), left: scale(4) },
  flourishBR: { bottom: scale(3), right: scale(4) },

  insideHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(6),
    paddingHorizontal: scale(4),
  },
  pageSourceBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(2.5),
    borderRadius: scale(6),
  },
  pageSourceText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9),
  },

  pageScrollView: {
    flex: 1,
    marginVertical: scale(2),
  },
  pageScrollContent: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(2),
  },
  pageImagesContainer: {
    width: '100%',
    gap: scale(8),
    marginBottom: scale(8),
  },
  pageImageCard: {
    width: '100%',
    height: scale(160),
    borderRadius: scale(8),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GOLD_BORDER,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    marginVertical: scale(4),
  },
  pageImage: {
    width: '100%',
    height: '100%',
  },

  shlokaBox: {
    marginVertical: scale(6),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
  },
  shlokaHeaderPill: {
    alignItems: 'center',
    marginBottom: scale(4),
  },
  shlokaTagText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(9),
    letterSpacing: 1,
  },
  shlokaVerseText: {
    fontFamily: fonts.Marcellus,
    lineHeight: fs(19),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shlokaDivider: {
    borderTopWidth: 0.8,
    marginTop: scale(6),
    paddingTop: scale(4),
  },
  shlokaMeaningText: {
    fontFamily: fonts.PoppinsRegular,
    lineHeight: fs(15),
    textAlign: 'center',
  },

  narrativeParagraph: {
    fontFamily: fonts.PoppinsRegular,
    marginBottom: scale(10),
    letterSpacing: 0.2,
    textAlign: 'justify',
  },

  moralCard: {
    marginVertical: scale(8),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
  },
  moralCardHeader: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(10),
    marginBottom: scale(3),
    textAlign: 'center',
  },
  moralCardText: {
    fontFamily: fonts.PoppinsMedium,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  insideFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
    paddingHorizontal: scale(4),
  },
  footerCategoryText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(8.5),
  },

  // THE TURNING LEAF
  turningLeaf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
  },
  coverFaceFront: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    overflow: 'hidden',
    borderColor: '#1E1E1E',
    borderLeftWidth: 6,
  },
  coverFaceContainer: {
    flex: 1,
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
    paddingLeft: scale(20),
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

  ribbonBookmark: {
    position: 'absolute',
    top: -scale(6),
    right: scale(32),
    width: scale(14),
    height: scale(28),
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

  curlShadowOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    pointerEvents: 'none',
  },

  // BACK FACE
  coverFaceBackWrap: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  coverFaceBack: {
    flex: 1,
    borderRadius: scale(14),
    padding: scale(14),
    paddingRight: scale(18),
    transform: [{ scaleX: -1 }],
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
  },
  backFaceInnerBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backFaceOm: {
    fontSize: fs(24),
    color: GOLD_ACCENT,
    fontFamily: fonts.Marcellus,
  },
  backFaceMantra: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(9.5),
    letterSpacing: 0.8,
    marginTop: scale(3),
  },
  backFaceDivider: {
    width: scale(70),
    height: 1,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.4,
    marginVertical: scale(8),
  },
  backFaceDedicationTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(12),
  },
  backFaceDedicationBody: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(9.5),
    lineHeight: fs(14),
    textAlign: 'center',
    marginTop: scale(3),
  },
  backFaceSourceNote: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(8.5),
    fontStyle: 'italic',
  },

  // Bottom Nav Bar
  bottomNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: BOOK_WIDTH,
    marginTop: scale(40),
    paddingHorizontal: scale(4),
  },
  navPageBtn: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: scale(8),

    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(38),
    minHeight: scale(30),
    backgroundColor: colors.ring,
  },
  forwardIconWrap: {
    transform: [{ scaleX: -1 }],
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(11),
  },
  pageDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  pageDot: {
    paddingHorizontal: scale(7),
    paddingVertical: scale(3),
    borderRadius: scale(6),
  },
  pageDotActive: {
    borderRadius: scale(6),
  },
  dotLabel: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(9),
  },

  // Loading Status Pill Overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 10,
    gap: scale(8),
  },
  loadingSpinner: {
    marginRight: scale(2),
  },
  loadingText: {
    color: '#FFF',
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(11),
  },
});
