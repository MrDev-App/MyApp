import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import colors, { cardGradients } from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { GradientBackground, ScreenHeader } from '@components';
import Skeleton from '@components/Skeleton';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import imagePath from '@assets/index';
import { SHLOKA_CATEGORY_SECTIONS, ShlokaCategory } from '@constants/shlokData';

interface ShlokaCategoryCardProps {
  item: ShlokaCategory;
  cardWidth: number;
  cardHeight: number;
  onPress: (item: ShlokaCategory) => void;
  t: (key: any) => string;
}

const loadedImageCache = new Set<string>();

const ShlokaCategoryCard: React.FC<ShlokaCategoryCardProps> = ({
  item,
  cardWidth,
  cardHeight,
  onPress,
  t,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const isInitiallyLoaded =
    !item.imageUrl || loadedImageCache.has(item.imageUrl);
  const [imageLoading, setImageLoading] = useState<boolean>(!isInitiallyLoaded);

  const imageSource =
    !hasError && item.imageUrl
      ? { uri: item.imageUrl }
      : imagePath.shlok || imagePath.Vishnu;

  const handleImageLoaded = () => {
    if (item.imageUrl) {
      loadedImageCache.add(item.imageUrl);
    }
    setImageLoading(false);
  };

  const title = item.title ? t(item.title) : item.title;

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { width: cardWidth, height: cardHeight }]}
      activeOpacity={0.88}
      onPress={() => onPress(item)}
    >
      <View style={styles.cardInner}>
        {/* Full Bleed Background Image */}
        <Image
          source={imageSource}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoad={handleImageLoaded}
          onLoadEnd={handleImageLoaded}
          onError={() => {
            setHasError(true);
            setImageLoading(false);
          }}
        />

        {/* Ambient Dark Gradient Overlay - shown once image is ready */}
        {!imageLoading && (
          <LinearGradient
            colors={cardGradients.festivalCard}
            locations={[0, 0.52, 1]}
            style={styles.gradientOverlay}
          >
            <Text
              style={styles.cardTitle}
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.82}
            >
              {title}
            </Text>
          </LinearGradient>
        )}

        {/* Skeleton Shimmer matching BookScreen color */}
        {imageLoading && (
          <Skeleton
            width="100%"
            height="100%"
            borderRadius={scale(18)}
            baseColor={colors.skeletonBase}
            highlightColor={colors.skeletonHighlight}
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export const AllShlokasScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  // Flatten all categories across all sections
  const allCategories = useMemo(() => {
    return SHLOKA_CATEGORY_SECTIONS.flatMap(section => section.categories);
  }, []);

  // Primary section header & subtitle info
  const primarySection = SHLOKA_CATEGORY_SECTIONS[0];
  const screenTitle = primarySection?.title
    ? t(primarySection.title)
    : t(Translation.SHLOK_SECTION_OCCASIONS_TITLE);
  const screenDesc = primarySection?.subtitle
    ? t(primarySection.subtitle)
    : t(Translation.SHLOK_SECTION_OCCASIONS_SUBTITLE);

  const handleCardPress = (item: ShlokaCategory) => {
    triggerHaptic();
    navigation.navigate('ShlokaCategoryDetailScreen', { category: item });
  };

  // Responsive Grid Calculations (2 cols on phones, 3 cols on tablets/foldables)
  const isTablet = windowWidth >= 600;
  const numColumns = isTablet ? 3 : 2;
  const horizontalPadding = scale(16);
  const gap = scale(12);
  const totalGapWidth = gap * (numColumns - 1);
  const availableWidth = windowWidth - horizontalPadding * 2 - totalGapWidth;
  const cardWidth = Math.floor(availableWidth / numColumns);
  const cardHeight = Math.floor(cardWidth * 0.86);

  const renderCategoryCard = ({ item }: { item: ShlokaCategory }) => {
    return (
      <ShlokaCategoryCard
        item={item}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        onPress={handleCardPress}
        t={t}
      />
    );
  };

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
              key={`grid_${numColumns}`}
              data={allCategories}
              renderItem={renderCategoryCard}
              keyExtractor={item => item.id}
              numColumns={numColumns}
              columnWrapperStyle={[styles.columnWrapper, { gap: gap }]}
              contentContainerStyle={[
                styles.listContent,
                {
                  paddingHorizontal: horizontalPadding,
                  paddingBottom: Math.max(insets.bottom, scale(16)) + scale(24),
                  paddingTop: scale(12),
                },
              ]}
              showsVerticalScrollIndicator={false}
              initialNumToRender={8}
              maxToRenderPerBatch={10}
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

export default AllShlokasScreen;

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
  cardContainer: {
    borderRadius: scale(18),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardOverlay,
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.08,
        shadowRadius: scale(5),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardInner: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(18),
    overflow: 'hidden',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.15,
    textShadowColor: colors.overlayDarkStrong,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: scale(14),
    paddingHorizontal: scale(2),
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
