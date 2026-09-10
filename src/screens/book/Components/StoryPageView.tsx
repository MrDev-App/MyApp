import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import colors from '@theme/colors';
import { fs } from '@theme/sizes';
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

    const paragraphs = useMemo(() => {
      return (pageContent || '')
        .split('\n\n')
        .filter(p => p.trim().length > 0);
    }, [pageContent]);

    const pageNumber = pageData?.page || 1;
    const totalCount = totalPages || pageNumber;

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
                        ? '#222533'
                        : theme.bg === '#FAF5EC'
                        ? '#F4E9D5'
                        : '#F9F5EC',
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.shlokaHeaderPill}>
                  <Text
                    style={[styles.shlokaTagText, { color: theme.accent }]}
                  >
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

            {/* Narrative Paragraphs */}
            {paragraphs.map((p, pIdx) => (
              <Text
                key={`para-${pIdx}`}
                style={[
                  styles.narrativeParagraph,
                  {
                    color: theme.text,
                    fontSize: fs(fontSize),
                    lineHeight: fs(fontSize * 1.62),
                  },
                ]}
              >
                {p}
              </Text>
            ))}

            {/* Moral / Education Box */}
            {pageMoral ? (
              <View
                style={[
                  styles.moralCard,
                  {
                    backgroundColor:
                      theme.bg === '#121215' || theme.bg === colors.black
                        ? '#262018'
                        : theme.bg === '#FAF5EC'
                        ? '#F9EDD6'
                        : '#FEF9EE',
                    borderColor: theme.accent,
                  },
                ]}
              >
                <Text
                  style={[styles.moralCardHeader, { color: theme.accent }]}
                >
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
          </ScrollView>

          {/* Page Footer Row */}
          <View style={styles.insideFooterRow}>
            <Text
              style={[
                styles.footerCategoryText,
                { color: theme.textSecondary },
              ]}
            >
              {category}
            </Text>
            <Text
              style={[
                styles.footerCategoryText,
                { color: theme.textSecondary },
              ]}
            >
              {strings.pageOf(pageNumber, totalCount)}
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

export default StoryPageView;
