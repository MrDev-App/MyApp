import React, { useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { GradientBackground, ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import imagePath from '@assets/index';
import { SHLOKA_CATEGORY_SECTIONS, ShlokaCategory } from '@constants/shlokData';
import ShlokaCategoryCard from './components/ShlokaCategoryCard';

export const AllShlokasScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  // Flatten all categories across all sections
  const allCategories = useMemo(() => {
    return SHLOKA_CATEGORY_SECTIONS.flatMap(section => section.categories);
  }, []);

  // Primary section header & subtitle info
  const screenTitle = useMemo(() => {
    const primarySection = SHLOKA_CATEGORY_SECTIONS[0];
    return primarySection?.title
      ? t(primarySection.title)
      : t(Translation.SHLOK_SECTION_OCCASIONS_TITLE);
  }, [t]);

  const screenDesc = useMemo(() => {
    const primarySection = SHLOKA_CATEGORY_SECTIONS[0];
    return primarySection?.subtitle
      ? t(primarySection.subtitle)
      : t(Translation.SHLOK_SECTION_OCCASIONS_SUBTITLE);
  }, [t]);

  const handleCardPress = useCallback(
    (item: ShlokaCategory) => {
      triggerHaptic();
      navigation.navigate('ShlokaCategoryDetailScreen', { category: item });
    },
    [navigation],
  );

  // Responsive Grid Calculations (2 cols on phones, 3 cols on tablets/foldables)
  const gridDimensions = useMemo(() => {
    const isTablet = windowWidth >= 600;
    const numColumns = isTablet ? 3 : 2;
    const horizontalPadding = scale(16);
    const gap = scale(12);
    const totalGapWidth = gap * (numColumns - 1);
    const availableWidth = windowWidth - horizontalPadding * 2 - totalGapWidth;
    const cardWidth = Math.floor(availableWidth / numColumns);
    const cardHeight = Math.floor(cardWidth * 0.86);
    const rowHeight = cardHeight + gap;

    return {
      numColumns,
      horizontalPadding,
      gap,
      cardWidth,
      cardHeight,
      rowHeight,
    };
  }, [windowWidth]);

  const renderCategoryCard = useCallback(
    ({ item, index }: ListRenderItemInfo<ShlokaCategory>) => (
      <ShlokaCategoryCard
        item={item}
        index={index}
        numColumns={gridDimensions.numColumns}
        cardWidth={gridDimensions.cardWidth}
        cardHeight={gridDimensions.cardHeight}
        onPress={handleCardPress}
      />
    ),
    [gridDimensions, handleCardPress],
  );

  const keyExtractor = useCallback((item: ShlokaCategory) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: gridDimensions.rowHeight,
      offset:
        gridDimensions.rowHeight *
        Math.floor(index / gridDimensions.numColumns),
      index,
    }),
    [gridDimensions.rowHeight, gridDimensions.numColumns],
  );

  const columnWrapperStyle = useMemo(
    () => [styles.columnWrapper, { gap: gridDimensions.gap }],
    [gridDimensions.gap],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.listContent,
      {
        paddingHorizontal: gridDimensions.horizontalPadding,
        paddingBottom: Math.max(insets.bottom, scale(16)) + scale(24),
        paddingTop: scale(12),
      },
    ],
    [gridDimensions.horizontalPadding, insets.bottom],
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Header */}
        <ScreenHeader title={screenTitle} />

        {/* Subtitle / Description Banner */}
        {screenDesc ? (
          <View style={styles.descriptionBanner}>
            <Text style={styles.descriptionText}>{screenDesc}</Text>
          </View>
        ) : null}

        {/* Card Grid / Empty State */}
        <View style={styles.contentContainer}>
          {allCategories.length > 0 ? (
            <FlatList
              key={`grid_${gridDimensions.numColumns}`}
              data={allCategories}
              renderItem={renderCategoryCard}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              numColumns={gridDimensions.numColumns}
              columnWrapperStyle={columnWrapperStyle}
              contentContainerStyle={contentContainerStyle}
              showsVerticalScrollIndicator={false}
              initialNumToRender={8}
              maxToRenderPerBatch={8}
              windowSize={5}
              removeClippedSubviews={Platform.OS === 'android'}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Image source={imagePath.lotus} style={styles.emptyLotus} />
              <Text style={styles.emptyStateTitle}>
                {t(Translation.SHLOK_NO_FOUND_TITLE)}
              </Text>
              <Text style={styles.emptyStateDesc}>
                {t(Translation.SHLOK_NO_FOUND_DESC)}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default React.memo(AllShlokasScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  descriptionBanner: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    backgroundColor: colors.accentOrangeLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  descriptionText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(17),
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    marginBottom: scale(12),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(24),
  },
  emptyLotus: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    opacity: 0.8,
    marginBottom: scale(14),
  },
  emptyStateTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: scale(4),
  },
  emptyStateDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
});
