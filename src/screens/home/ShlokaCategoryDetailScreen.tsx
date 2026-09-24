import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { GradientBackground, ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import imagePath from '@assets/index';
import {
  getShlokaCategoryDetail,
  ShlokaCategoryDetail,
  ShlokaSubItem,
  STATIC_SHLOKA_CATEGORIES_DATA,
} from '@services/firebaseServices/shlokaService';
import { ShlokaCategory } from '@constants/shlokData';

// Sub-components
import ShlokaSubItemCard from './components/ShlokaSubItemCard';
import ShlokaCategoryBanner from './components/ShlokaCategoryBanner';
import ShlokaSkeletonList from './components/ShlokaSkeletonList';

const CARD_TOTAL_HEIGHT = scale(74); // scale(64) card height + scale(10) margin

export const ShlokaCategoryDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t, isHindi } = useAppLanguage();

  const categoryParam: ShlokaCategory = useMemo(() => {
    return (
      route.params?.category || {
        id: 'occasion-through-the-day',
        slug: 'through-the-day',
        title: Translation.SHLOK_CAT_THROUGH_THE_DAY,
        imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
        path: '/shloka/prayers/through-the-day.htm',
      }
    );
  }, [route.params?.category]);

  const slug = useMemo(() => {
    return (
      categoryParam.slug ||
      categoryParam.id ||
      'through-the-day'
    ).replace('occasion-', '');
  }, [categoryParam]);

  const [categoryData, setCategoryData] = useState<ShlokaCategoryDetail>(() => {
    return (
      STATIC_SHLOKA_CATEGORIES_DATA[slug] ||
      STATIC_SHLOKA_CATEGORIES_DATA['through-the-day']
    );
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getShlokaCategoryDetail(slug)
      .then(data => {
        if (isMounted && data) {
          setCategoryData(data);
        }
      })
      .catch(err => {
        console.warn(
          '[ShlokaCategoryDetailScreen] Error fetching category detail:',
          err,
        );
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const screenTitle = useMemo(() => {
    if (categoryParam.title) {
      return t(categoryParam.title);
    }
    return isHindi ? categoryData.titleHi : categoryData.titleEn;
  }, [
    categoryParam.title,
    categoryData.titleHi,
    categoryData.titleEn,
    isHindi,
    t,
  ]);

  const screenDesc = useMemo(() => {
    return isHindi ? categoryData.descriptionHi : categoryData.descriptionEn;
  }, [categoryData.descriptionHi, categoryData.descriptionEn, isHindi]);

  const categoryImageUri = useMemo(() => {
    return categoryParam.imageUrl || categoryData.imageUrl;
  }, [categoryParam.imageUrl, categoryData.imageUrl]);

  const handleCardPress = useCallback(
    (item: ShlokaSubItem) => {
      triggerHaptic();
      navigation.navigate('ShlokaVerseListScreen', {
        subcategory: item,
        category: categoryParam,
      });
    },
    [navigation, categoryParam],
  );

  const renderSubItemCard = useCallback(
    ({ item, index }: ListRenderItemInfo<ShlokaSubItem>) => (
      <ShlokaSubItemCard
        item={item}
        index={index}
        categoryImageUri={categoryImageUri}
        onPress={handleCardPress}
      />
    ),
    [categoryImageUri, handleCardPress],
  );

  const keyExtractor = useCallback((item: ShlokaSubItem) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_TOTAL_HEIGHT,
      offset: CARD_TOTAL_HEIGHT * index,
      index,
    }),
    [],
  );

  const listHeaderComponent = useMemo(
    () => <ShlokaCategoryBanner slug={slug} description={screenDesc} />,
    [slug, screenDesc],
  );

  const listEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyStateContainer}>
        <Image source={imagePath.lotus} style={styles.emptyLotus} />
        <Text style={styles.emptyStateTitle}>
          {t(Translation.SHLOK_NO_FOUND_TITLE)}
        </Text>
        <Text style={styles.emptyStateDesc}>
          {t(Translation.SHLOK_NO_FOUND_DESC)}
        </Text>
      </View>
    ),
    [t],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.scrollContent,
      {
        paddingBottom: Math.max(insets.bottom, scale(16)) + scale(30),
      },
    ],
    [insets.bottom],
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Navigation Screen Header */}
        <ScreenHeader title={screenTitle} />

        {loading ? (
          <View style={styles.scrollContent}>
            {listHeaderComponent}
            <ShlokaSkeletonList count={6} />
          </View>
        ) : (
          <FlatList
            data={categoryData?.items || []}
            renderItem={renderSubItemCard}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            ListHeaderComponent={listHeaderComponent}
            ListEmptyComponent={listEmptyComponent}
            contentContainerStyle={contentContainerStyle}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews={Platform.OS === 'android'}
          />
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default React.memo(ShlokaCategoryDetailScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    flexGrow: 1,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
  },
  emptyLotus: {
    width: scale(70),
    height: scale(70),
    opacity: 0.6,
    marginBottom: scale(12),
  },
  emptyStateTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: scale(4),
  },
  emptyStateDesc: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
});
