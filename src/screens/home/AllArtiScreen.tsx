import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Back } from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  Category,
  CategoryItem,
  getCategoriesData,
} from '@services/categoriesService';
import { categoriesData } from '@constants/categoriesData';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { RootNavigationProp } from '@navigation/types';

const DEFAULT_AARTI_CATEGORY: Category = (categoriesData.find(c =>
  c.id.toLowerCase().includes('aarti'),
) || categoriesData[0]) as unknown as Category;

export const AllArtiScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<RootNavigationProp>();
  const { t, select } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  const initialCategory: Category =
    (route.params?.category as Category) || DEFAULT_AARTI_CATEGORY;

  const [category, setCategory] = useState<Category>(initialCategory);

  // Load fresh categories from service if available
  useEffect(() => {
    let isMounted = true;
    const loadFreshCategory = async () => {
      try {
        const freshData = await getCategoriesData();
        const freshAarti = freshData.find(c =>
          c.id.toLowerCase().includes('aarti'),
        );
        if (freshAarti && isMounted) {
          setCategory(freshAarti);
        }
      } catch {
        // Fallback to initial category
      }
    };
    loadFreshCategory();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenAarti = (item: CategoryItem) => {
    navigation.navigate('ArtiScreen', { arti: item });
  };

  const screenTitle =
    select(category.titleHi, category.titleEn) ||
    t(Translation.AARTI_SANGRAH_TITLE);
  const screenDesc =
    select(category.descriptionHi, category.descriptionEn) ||
    t(Translation.AARTI_SANGRAH_DEFAULT_DESC);

  // Grid layout calculations for Aarti cards
  const padding = scale(16);
  const gap = scale(12);
  const cardWidth = (windowWidth - padding * 2 - gap) / 2;

  const renderAartiItem = ({ item }: { item: CategoryItem }) => {
    const name = select(item.nameHi, item.nameEn);
    const subtitle = select(item.subtitleHi, item.subtitleEn);

    return (
      <TouchableOpacity
        style={[styles.aartiCard, { width: cardWidth }]}
        activeOpacity={0.8}
        onPress={() => handleOpenAarti(item)}
      >
        <View style={styles.aartiImageWrapper}>
          <Image
            source={item.image}
            style={styles.aartiImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.aartiName} numberOfLines={1}>
          {name}
        </Text>
        {subtitle ? (
          <Text style={styles.aartiSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
        <View style={styles.aartiCardAction}>
          <Text style={styles.aartiActionText}>
            {t(Translation.READ_AARTI_ACTION)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {screenTitle}
        </Text>
        <View style={{ width: scale(34) }} />
      </View>

      {/* Description Banner */}
      {screenDesc ? (
        <View style={styles.descriptionBanner}>
          <Text style={styles.descriptionText}>{screenDesc}</Text>
        </View>
      ) : null}

      {/* Aarti Items 2-Column Grid */}
      <View style={styles.contentContainer}>
        <FlatList
          data={category.items || []}
          renderItem={renderAartiItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + scale(24) },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllArtiScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(8),
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
    padding: scale(16),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(14),
  },
  aartiCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(6),
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  aartiImageWrapper: {
    width: scale(92),
    height: scale(92),
    borderRadius: scale(46),
    overflow: 'hidden',
    marginBottom: scale(8),
    borderWidth: 2,
    borderColor: colors.ring,
    backgroundColor: colors.primary,
  },
  aartiImage: {
    width: '100%',
    height: '100%',
  },
  aartiName: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: scale(2),
  },
  aartiSubtitle: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    marginBottom: scale(6),
  },
  aartiCardAction: {
    marginTop: scale(4),
  },
  aartiActionText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
});
