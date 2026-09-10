import React, { useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';

import colors from '@theme/colors';
import { scale } from '@theme/sizes';
import { StoryPage } from '@constants/storiesData';
import { Back } from '@assets/index';
import { formatPageNumber } from '@helper/helper';

import { FlipBookCoverProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import {
  getBookDimensions,
  GOLD_ACCENT,
  GOLD_BORDER,
} from './FlipBookCover.constants';
import { getStrings } from './FlipBookCover.strings';
import { useFlipBookController } from './useFlipBookController';

import BookSheet from './BookSheet';
import StoryPageView from './StoryPageView';
import CoverFrontView from './CoverFrontView';
import BackFaceView from './BackFaceView';

export const FlipBookCover: React.FC<FlipBookCoverProps> = ({
  story,
  currentLang = 'hi',
  theme,
  fontSize = 15,
  onPageChange,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { bookWidth, bookHeight } = useMemo(
    () => getBookDimensions(windowWidth, windowHeight),
    [windowWidth, windowHeight],
  );

  const strings = getStrings(currentLang);

  // Preload and memoize all story pages safely with defensive chaining
  const pages: StoryPage[] = useMemo(() => {
    if (story?.pages && story.pages.length > 0) {
      return story.pages;
    }
    return [
      {
        page: 1,
        sourceHi: story?.sourceHi,
        contentHi: story?.contentHi || story?.descriptionHi,
        sourceEn: story?.sourceEn,
        contentEn: story?.contentEn || story?.descriptionEn,
        shloka: story?.shloka,
        shlokaTranslationHi: story?.shlokaTranslationHi,
        shlokaTranslationEn: story?.shlokaTranslationEn,
        moralHi: story?.moralHi,
        moralEn: story?.moralEn,
        imagePages: story?.imagePages,
        image: story?.image,
      },
    ];
  }, [story]);

  const totalPages = pages.length;

  const isEn = currentLang === 'en';
  const title = isEn
    ? story?.titleEn || story?.titleHi || ''
    : story?.titleHi || story?.titleEn || '';
  const subtitle = isEn
    ? story?.subtitleEn || story?.subtitleHi
    : story?.subtitleHi || story?.subtitleEn;
  const category = isEn
    ? story?.categoryEn || story?.categoryHi
    : story?.categoryHi || story?.categoryEn;
  const source = isEn
    ? story?.sourceEn || story?.sourceHi
    : story?.sourceHi || story?.sourceEn;

  // Headless Controller Engine
  const {
    sheetProgressList,
    displayPage,
    isFlipping,
    activeFlipDir,
    queueLength,
    panGesture,
    handleNextPage,
    handlePrevPage,
    handleJumpToPage,
    handleHalfwayChange,
  } = useFlipBookController({
    totalPages,
    storyId: story?.id,
    onPageChange,
    bookWidth,
  });

  const dotsScrollRef = useRef<ScrollView>(null);

  // Auto-center active page dot in the scrollable dot bar
  useEffect(() => {
    if (dotsScrollRef.current) {
      dotsScrollRef.current.scrollTo({
        x: Math.max(0, (displayPage - 2) * scale(36)),
        animated: true,
      });
    }
  }, [displayPage]);

  // Memoized Content Elements
  const coverFrontElement = useMemo(
    () => (
      <CoverFrontView
        story={story}
        title={title}
        subtitle={subtitle}
        category={category}
        currentLang={currentLang}
        onOpenBook={handleNextPage}
      />
    ),
    [story, title, subtitle, category, currentLang, handleNextPage],
  );

  const coverBackElement = useMemo(
    () => (
      <BackFaceView
        isCoverBack={true}
        theme={theme}
        source={source}
        currentLang={currentLang}
      />
    ),
    [theme, source, currentLang],
  );

  const pageBackElement = useMemo(
    () => (
      <BackFaceView
        isCoverBack={false}
        theme={theme}
        source={source}
        currentLang={currentLang}
      />
    ),
    [theme, source, currentLang],
  );

  const lastPageData = pages[totalPages - 1] || pages[0];

  const isPrevDisabled = displayPage === 0 || isFlipping;
  const isNextDisabled = displayPage === totalPages || isFlipping;

  return (
    <View style={styles.outerContainer}>
      {/* 3D Stacked Book Container */}
      <GestureDetector gesture={panGesture}>
        <View
          style={[styles.bookWrapper, { width: bookWidth, height: bookHeight }]}
        >
          {/* Multiple Page Layer Shadows */}
          <View
            style={[
              styles.paperPageLayer2,
              {
                width: bookWidth,
                height: bookHeight,
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
          />
          <View
            style={[
              styles.paperPageLayer1,
              {
                width: bookWidth,
                height: bookHeight,
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
          />

          {/* BASE UNDERNEATH PAGE: Last Page in stack */}
          <StoryPageView
            pageData={lastPageData}
            theme={theme}
            fontSize={fontSize}
            category={category}
            source={source}
            currentLang={currentLang}
            isInteractive={displayPage === totalPages}
            totalPages={totalPages}
          />

          {/* Sheet 0: Cover (Turns to reveal Page 1) */}
          {sheetProgressList[0] && (
            <BookSheet
              index={0}
              totalSheets={totalPages}
              progress={sheetProgressList[0]}
              frontContent={coverFrontElement}
              backContent={coverBackElement}
              onHalfwayChange={handleHalfwayChange}
              bookWidth={bookWidth}
            />
          )}

          {/* Sheets 1 to totalPages-1: Story Pages with Windowed Mounting */}
          {pages.slice(0, totalPages - 1).map((pageItem, idx) => {
            const sheetIdx = idx + 1;
            const progressSharedVal = sheetProgressList[sheetIdx];
            if (!progressSharedVal) return null;

            // Windowing: Only mount full content for sheets within displayPage ± 2
            const isWithinWindow = Math.abs(sheetIdx - displayPage) <= 2;

            return (
              <BookSheet
                key={`sheet-${sheetIdx}`}
                index={sheetIdx}
                totalSheets={totalPages}
                progress={progressSharedVal}
                frontContent={
                  isWithinWindow ? (
                    <StoryPageView
                      pageData={pageItem}
                      theme={theme}
                      fontSize={fontSize}
                      category={category}
                      source={source}
                      currentLang={currentLang}
                      isInteractive={displayPage === sheetIdx}
                      totalPages={totalPages}
                    />
                  ) : (
                    <View style={styles.coverFaceContainer} />
                  )
                }
                backContent={pageBackElement}
                onHalfwayChange={handleHalfwayChange}
                bookWidth={bookWidth}
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
                    ? strings.flippingPages(queueLength)
                    : strings.pleaseWait}
                </Text>
              </View>
            </View>
          )}
        </View>
      </GestureDetector>

      {/* BOTTOM BOOK NAVIGATION CONTROLS BAR */}
      <View style={[styles.bottomNavBar, { width: bookWidth }]}>
        {/* Previous Button */}
        <TouchableOpacity
          style={[styles.navPageBtn]}
          onPress={handlePrevPage}
          disabled={isPrevDisabled}
          activeOpacity={0.7}
        >
          {isFlipping && activeFlipDir === 'backward' ? (
            <ActivityIndicator size={scale(14)} color={colors.white} />
          ) : (
            <Back width={scale(14)} height={scale(14)} />
          )}
        </TouchableOpacity>

        {/* Page Dots & Jumper (Scrollable horizontally so 8, 10, 12, 14+ pages never break the layout) */}
        <View style={styles.pageDotsWrapper}>
          <ScrollView
            ref={dotsScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pageDotsScrollContent}
          >
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
                {strings.cover}
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
                    {formatPageNumber(pageNum, currentLang)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.navPageBtn]}
          onPress={handleNextPage}
          disabled={isNextDisabled}
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
