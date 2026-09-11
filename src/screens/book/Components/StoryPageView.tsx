import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '@theme/colors';
import { fs, scale } from '@theme/sizes';
import imagePath from '@assets/index';
import { formatPageNumber, triggerHaptic } from '@helper/helper';
import { ZoomableImage } from './ZoomableImage';
import { StoryPageViewProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { GOLD_BORDER } from './FlipBookCover.constants';
import { getStrings } from './FlipBookCover.strings';

export const StoryPageView: React.FC<StoryPageViewProps> = React.memo(
  ({
    pageData,
    theme,
    fontSize,
    category,
    source,
    currentLang = 'hi',
    isInteractive,
    totalPages,
  }) => {
    const strings = getStrings(currentLang);
    const insets = useSafeAreaInsets();
    const { width: windowWidth } = useWindowDimensions();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
      null,
    );
    const [isZoomed, setIsZoomed] = useState<boolean>(false);

    const isDark =
      theme.bg === '#121215' ||
      theme.bg === colors.black ||
      theme.statusBar === 'light-content';

    const isEn = currentLang === 'en';
    const pageSource = isEn
      ? pageData.sourceEn || pageData.sourceHi || source
      : pageData.sourceHi || source;
    const pageContent = isEn
      ? pageData.contentEn || pageData.contentHi
      : pageData.contentHi;
    const pageShloka = pageData.shloka;
    const pageShlokaTrans = isEn
      ? pageData.shlokaTranslationEn || pageData.shlokaTranslationHi
      : pageData.shlokaTranslationHi;
    const pageMoral = isEn
      ? pageData.moralEn || pageData.moralHi
      : pageData.moralHi;

    // Normalize all illustrations on this page
    const allPageImages: any[] = useMemo(() => {
      if (
        pageData.imagePages &&
        Array.isArray(pageData.imagePages) &&
        pageData.imagePages.length > 0
      ) {
        return pageData.imagePages;
      }
      if (Array.isArray(pageData.image) && pageData.image.length > 0) {
        return pageData.image;
      }
      if (pageData.image) {
        return [pageData.image];
      }
      return [];
    }, [pageData.image, pageData.imagePages]);

    const handleOpenFullscreen = useCallback((idx: number) => {
      triggerHaptic('week');
      setSelectedImageIndex(idx);
      setIsZoomed(false);
    }, []);

    const handleCloseFullscreen = useCallback(() => {
      triggerHaptic('week');
      setSelectedImageIndex(null);
      setIsZoomed(false);
    }, []);

    const handlePrevImage = useCallback(() => {
      triggerHaptic('week');
      setSelectedImageIndex(prev =>
        prev !== null && prev > 0 ? prev - 1 : prev,
      );
      setIsZoomed(false);
    }, []);

    const handleNextImage = useCallback(() => {
      triggerHaptic('week');
      setSelectedImageIndex(prev =>
        prev !== null && prev < allPageImages.length - 1 ? prev + 1 : prev,
      );
      setIsZoomed(false);
    }, [allPageImages.length]);

    const paragraphs = useMemo(() => {
      return (pageContent || '').split('\n\n').filter(p => p.trim().length > 0);
    }, [pageContent]);

    const pageNumber = pageData?.page || 1;
    const totalCount = totalPages || pageNumber;

    return (
      <View
        style={[
          styles.insidePageContainer,
          {
            backgroundColor: isDark ? '#1A1D27' : '#FFFDF9',
            borderColor: theme.cardBorder,
          },
        ]}
      >
        {/* Ornate Golden Inner Margin Frame */}
        <View style={[styles.ornateBorder, { borderColor: GOLD_BORDER }]}>
          {/* Page Top Header Bar */}
          <View style={styles.insideHeaderBar}>
            <View
              style={[styles.pageSourceBadge, { backgroundColor: theme.tagBg }]}
            >
              <Image
                source={imagePath.lotus}
                style={[styles.headerBadgeIcon, { tintColor: theme.tagText }]}
                resizeMode="contain"
              />
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
            {/* Page Illustrations with Tap to Fullscreen & Zoom */}
            {allPageImages.length > 0 ? (
              <View style={styles.pageImagesContainer}>
                {allPageImages.map((imgSrc: any, imgIdx: number) => (
                  <TouchableOpacity
                    key={`page-img-${imgIdx}`}
                    style={styles.pageImageCard}
                    activeOpacity={0.88}
                    disabled={!isInteractive}
                    onPress={() => handleOpenFullscreen(imgIdx)}
                  >
                    <Image
                      source={imgSrc}
                      style={styles.pageImage}
                      resizeMode="contain"
                    />
                    <View style={styles.imageZoomBadge}>
                      <Text style={styles.imageZoomText}>[]</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}

            {/* Holy Shloka Card */}
            {pageShloka ? (
              <View
                style={[
                  styles.shlokaBox,
                  {
                    backgroundColor: isDark ? '#222533' : '#F9F5EC',
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.shlokaHeaderPill}>
                  <Text style={[styles.shlokaTagText, { color: theme.accent }]}>
                    ✦ {strings.shlokaTranslationHeader} ✦
                  </Text>
                </View>
                <Text
                  style={[
                    styles.shlokaVerseText,
                    {
                      color: theme.text,
                      fontSize: fs(fontSize + 0.5),
                    },
                  ]}
                >
                  {pageShloka}
                </Text>

                {pageShlokaTrans ? (
                  <View
                    style={[
                      styles.shlokaDivider,
                      { borderTopColor: theme.cardBorder },
                    ]}
                  >
                    <Text
                      style={[
                        styles.shlokaMeaningText,
                        {
                          color: theme.textSecondary,
                          fontSize: fs(fontSize - 1.5),
                        },
                      ]}
                    >
                      {pageShlokaTrans}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Narrative Paragraphs & Dynamic Visual Cards */}
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              const isSectionHeader =
                trimmed.length <= 70 &&
                !trimmed.startsWith('"') &&
                !trimmed.startsWith('“') &&
                (trimmed.includes(':') ||
                  /^(?:[०-९\d]+\.|अध्याय|भाग|Table of Contents)/i.test(
                    trimmed,
                  ));

              if (isSectionHeader) {
                return (
                  <View
                    key={`para-header-${pIdx}`}
                    style={[styles.sectionHeaderCard]}
                  >
                    <Text
                      style={[
                        styles.sectionHeaderText,
                        {
                          color: theme.accent,
                          fontSize: fs(fontSize),
                          lineHeight: fs(fontSize * 1.45),
                        },
                      ]}
                    >
                      {p}
                    </Text>
                  </View>
                );
              }

              const isQuote =
                trimmed.startsWith('"') ||
                trimmed.startsWith('“') ||
                trimmed.startsWith('”') ||
                trimmed.startsWith("'");

              if (isQuote) {
                return (
                  <View
                    key={`para-quote-${pIdx}`}
                    style={[
                      styles.quoteCalloutCard,
                      {
                        backgroundColor: isDark ? '#24222E' : '#FFFBF2',
                        borderLeftColor: theme.accent,
                      },
                    ]}
                  >
                    <View style={styles.quoteIconWrap}>
                      <Text
                        style={[styles.quoteIconText, { color: theme.accent }]}
                      >
                        ❝
                      </Text>
                    </View>
                    <Text
                      style={[styles.quoteTagText, { color: theme.accent }]}
                    >
                      ⚜ {isEn ? 'DIVINE SPEECH / PROPHECY' : 'दिव्य वाणी / कथन'}{' '}
                      ⚜
                    </Text>
                    <Text
                      style={[
                        styles.quoteParagraphText,
                        {
                          color: theme.text,
                          fontSize: fs(fontSize + 0.2),
                          lineHeight: fs((fontSize + 0.2) * 1.68),
                        },
                      ]}
                    >
                      {p}
                    </Text>
                  </View>
                );
              }

              return (
                <Text
                  key={`para-${pIdx}`}
                  style={[
                    styles.narrativeParagraph,
                    {
                      color: theme.text,
                      fontSize: fs(fontSize),
                      lineHeight: fs(fontSize * 1.68),
                    },
                  ]}
                >
                  {p}
                </Text>
              );
            })}

            {/* Moral / Education Box */}
            {pageMoral ? (
              <View
                style={[
                  styles.moralCard,
                  {
                    backgroundColor: isDark ? '#262018' : '#FEF9EE',
                    borderColor: theme.accent,
                  },
                ]}
              >
                <Text style={[styles.moralCardHeader, { color: theme.accent }]}>
                  ⚜ {strings.moralHeader} ⚜
                </Text>
                <Text
                  style={[
                    styles.moralCardText,
                    {
                      color: theme.text,
                      fontSize: fs(fontSize - 1),
                      lineHeight: fs((fontSize - 1) * 1.5),
                    },
                  ]}
                >
                  {pageMoral}
                </Text>
              </View>
            ) : null}

            {/* Decorative Page End Flourish */}
            <View style={styles.pageEndFlourish}>
              <Text style={[styles.flourishLineText, { color: theme.accent }]}>
                ─────────
              </Text>
              <Image
                source={imagePath.lotus}
                style={[styles.flourishMiniIcon, { tintColor: theme.accent }]}
                resizeMode="contain"
              />
              <Text style={[styles.flourishLineText, { color: theme.accent }]}>
                ─────────
              </Text>
            </View>
          </ScrollView>

          {/* Page Footer Row */}
        </View>

        {/* Fullscreen Interactive Zoom Modal */}
        <Modal
          visible={selectedImageIndex !== null}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
          onRequestClose={handleCloseFullscreen}
        >
          <GestureHandlerRootView style={styles.fullscreenModalRoot}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent={true}
            />
            <View style={styles.fullscreenModalBackdrop}>
              {/* Header Bar with Title and Close Button */}
              <View
                style={[
                  styles.fullscreenHeaderBar,
                  { paddingTop: Math.max(insets.top, scale(16)) + scale(8) },
                ]}
              >
                <View style={styles.fullscreenTitleWrap}>
                  <Text style={styles.fullscreenTitleText} numberOfLines={1}>
                    {pageSource ||
                      category ||
                      (isEn ? 'Sacred Artwork' : 'पवित्र चित्र')}
                  </Text>
                  <Text style={styles.fullscreenSubtitleText} numberOfLines={1}>
                    ✦ {isEn ? 'Page' : 'पृष्ठ'}{' '}
                    {formatPageNumber(pageNumber, currentLang)}
                    {allPageImages.length > 1 && selectedImageIndex !== null
                      ? ` • ${formatPageNumber(
                          selectedImageIndex + 1,
                          currentLang,
                        )}/${formatPageNumber(
                          allPageImages.length,
                          currentLang,
                        )}`
                      : ''}{' '}
                    ✦
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.fullscreenCloseBtn}
                  onPress={handleCloseFullscreen}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.fullscreenCloseIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Main Fullscreen Zoomable Image */}
              <View style={styles.fullscreenImageArea}>
                {selectedImageIndex !== null &&
                  allPageImages[selectedImageIndex] && (
                    <ZoomableImage
                      key={`fullscreen-zoom-${selectedImageIndex}`}
                      source={allPageImages[selectedImageIndex]}
                      width={windowWidth}
                      height="100%"
                      isZoomed={isZoomed}
                      onZoomStateChange={setIsZoomed}
                    />
                  )}

                {/* Left Navigation Arrow for multiple images */}
                {allPageImages.length > 1 &&
                  selectedImageIndex !== null &&
                  selectedImageIndex > 0 && (
                    <TouchableOpacity
                      style={[
                        styles.fullscreenNavBtn,
                        styles.fullscreenNavBtnLeft,
                      ]}
                      onPress={handlePrevImage}
                      activeOpacity={0.7}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <Text style={styles.fullscreenNavBtnText}>‹</Text>
                    </TouchableOpacity>
                  )}

                {/* Right Navigation Arrow for multiple images */}
                {allPageImages.length > 1 &&
                  selectedImageIndex !== null &&
                  selectedImageIndex < allPageImages.length - 1 && (
                    <TouchableOpacity
                      style={[
                        styles.fullscreenNavBtn,
                        styles.fullscreenNavBtnRight,
                      ]}
                      onPress={handleNextImage}
                      activeOpacity={0.7}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <Text style={styles.fullscreenNavBtnText}>›</Text>
                    </TouchableOpacity>
                  )}
              </View>

              {/* Bottom Hint Pill */}
              <View
                style={[
                  styles.fullscreenBottomBar,
                  {
                    paddingBottom:
                      Math.max(insets.bottom, scale(16)) + scale(10),
                  },
                ]}
              ></View>
            </View>
          </GestureHandlerRootView>
        </Modal>
      </View>
    );
  },
);

export default StoryPageView;
