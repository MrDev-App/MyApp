import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { categoriesData } from '@constants/categoriesData';
import { Translation } from '@i18n/language';
import AnimatedButton from '@components/AnimatedButton';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { RootNavigationProp } from '@navigation/types';
import Skeleton from '@components/Skeleton';
import {
  useAppDispatch,
  useAppSelector,
  fetchCategories,
  RootState,
  Category,
} from '../../../redux';

const ALLOWED_CATEGORY_IDS = new Set(['aarti', 'aartis', 'shlok', 'shlokas']);

const FeaturedCategories = () => {
  const { t, currentLanguage } = useAppLanguage();
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useAppDispatch();

  // Read categories from Redux
  const { categories: reduxCategories, loading } = useAppSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    if (!reduxCategories || reduxCategories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, reduxCategories]);

  const categories = React.useMemo(() => {
    const list =
      reduxCategories.length > 0
        ? reduxCategories
        : (categoriesData as Category[]);
    return list.filter(cat => ALLOWED_CATEGORY_IDS.has(cat.id.toLowerCase()));
  }, [reduxCategories]);

  const handleCategoryPress = (category: Category) => {
    const catId = category.id.toLowerCase();
    if (catId.includes('aarti') || catId.includes('arti')) {
      navigation.navigate('AllArtiScreen', { category });
    }
    if (catId.includes('shlok')) {
      navigation.navigate('ShlokScreen', { category });
    }
  };

  const renderSkeleton = () => (
    <View style={styles.gridContainer}>
      <View style={styles.skeletonWrapper}>
        <Skeleton
          width="100%"
          height={scale(120)}
          borderRadius={scale(15)}
        />
      </View>
      <View style={styles.skeletonWrapper}>
        <Skeleton
          width="100%"
          height={scale(120)}
          borderRadius={scale(15)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.FEATURED_CATEGORIES)}</Text>

      {loading && reduxCategories.length === 0 ? (
        renderSkeleton()
      ) : (
        <View style={styles.gridContainer}>
          {categories.map(category => {
            const categoryTitle =
              currentLanguage === 'hi' ? category.titleHi : category.titleEn;
            return (
              <AnimatedButton
                activeOpacity={0.8}
                key={category.id}
                style={styles.card}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={styles.iconContainer} pointerEvents="none">
                  {category.id.toLowerCase().includes('aarti') ||
                  category.id.toLowerCase().includes('arti') ? (
                    <LottieView
                      source={imagePath.lampLottie}
                      autoPlay
                      loop
                      resizeMode="contain"
                      style={{ height: scale(65), width: scale(65) }}
                    />
                  ) : category.id.toLowerCase().includes('shlok') ? (
                    <Image
                      source={imagePath.shlok}
                      style={{ height: scale(60), width: scale(60) }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={category.icon || imagePath.lamp}
                      style={{ height: scale(60), width: scale(60) }}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text style={styles.cardTitle} pointerEvents="none">
                  {categoryTitle}
                </Text>
              </AnimatedButton>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default React.memo(FeaturedCategories);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  title: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: scale(16),
    paddingHorizontal: scale(4),
  },
  loadingContainer: {
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(4),
  },
  skeletonWrapper: {
    width: '48%',
    marginBottom: scale(14),
  },
  card: {
    width: '48%',
    backgroundColor: colors.primary,
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(14),
    marginBottom: scale(14),
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    width: scale(56),
    height: scale(65),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(5),
  },
  cardTitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
  },
});
