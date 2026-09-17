import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { getCategoriesData, Category } from '@services/categoriesService';
import { categoriesData } from '@constants/categoriesData';
import { Translation } from '@i18n/language';
import AnimatedButton from '@components/AnimatedButton';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { RootNavigationProp } from '@navigation/types';

const ALLOWED_CATEGORY_IDS = new Set(['aarti', 'aartis', 'shlok', 'shlokas']);

const FeaturedCategories = () => {
  const { t, currentLanguage } = useAppLanguage();
  const navigation = useNavigation<RootNavigationProp>();

  const [categories, setCategories] = useState<Category[]>(() => {
    return (categoriesData as Category[]).filter(cat =>
      ALLOWED_CATEGORY_IDS.has(cat.id.toLowerCase()),
    );
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesData();
        if (isMounted) {
          let filtered = data.filter(cat =>
            ALLOWED_CATEGORY_IDS.has(cat.id.toLowerCase()),
          );
          if (filtered.length > 0) {
            setCategories(filtered);
          }
        }
      } catch (error) {
        console.error(
          'Error fetching categories in FeaturedCategories:',
          error,
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryPress = (category: Category) => {
    const catId = category.id.toLowerCase();
    if (catId.includes('aarti') || catId.includes('arti')) {
      navigation.navigate('AllArtiScreen', { category });
    }
    if (catId.includes('shlok')) {
      navigation.navigate('ShlokScreen', { category });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.FEATURED_CATEGORIES)}</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.ring} />
        </View>
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
                  {category.id.toLowerCase() === 'aarti' ||
                  category.id.toLowerCase() === 'aartis' ? (
                    <LottieView
                      source={imagePath.lampLottie}
                      autoPlay
                      loop
                      style={{ height: scale(65), width: scale(65) }}
                    />
                  ) : (
                    <Image
                      source={category.icon}
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
