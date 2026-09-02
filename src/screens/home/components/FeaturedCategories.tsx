import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  getCategoriesData,
  Category,
  CategoryItem,
} from '@services/categoriesService';
import ExpandableCard, {
  ExpandableCardHandle,
} from '@components/ExpandableCard';
import { useExpandTrigger } from '@hooks/useExpandTrigger';
import { Translation } from '@i18n/language';
import {
  AartiScreen,
  ShlokScreen,
  StoriesScreen,
  TemplesScreen,
} from '../categories';
import AnimatedButton from '@components/AnimatedButton';

const FeaturedCategories = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const navigation = useNavigation<any>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesData();
        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories in FeaturedCategories:', error);
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

  // Main Category Modal
  const cardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef, trigger } = useExpandTrigger<Category>(cardRef);

  // Nested Item Detail Modal
  const detailCardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef: registerItemRef, trigger: triggerItem } =
    useExpandTrigger<CategoryItem>(detailCardRef);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.FEATURED_CATEGORIES)}</Text>

      {loading ? (
        <View style={{ height: scale(100), justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={colors.ring} />
        </View>
      ) : (
        <View style={styles.gridContainer}>
          {categories.map(category => {
            const categoryTitle =
              currentLanguage === 'hi' ? category.titleHi : category.titleEn;
            return (
              <AnimatedButton
                key={category.id}
                style={styles.card}
                onPress={() => {
                  if (category.id === 'stories') {
                    navigation.navigate('Book');
                  } else if (category.id === 'temples') {
                    navigation.navigate('TempleScreen', {
                      items: category.items,
                    });
                  } else {
                    trigger(category.id, category);
                  }
                }}
              >
                <View
                  ref={registerRef(category.id)}
                  collapsable={false}
                  style={styles.iconContainer}
                >
                  <Image
                    source={category.icon}
                    style={{ height: scale(60), width: scale(60) }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.cardTitle}>{categoryTitle}</Text>
              </AnimatedButton>
            );
          })}
        </View>
      )}

      {/* Main Category Modal */}
      <ExpandableCard<Category>
        ref={cardRef}
        imageMargin={scale(16)}
        renderContent={(category, _close) => {
          const categoryTitle =
            currentLanguage === 'hi' ? category.titleHi : category.titleEn;
          const categoryDesc =
            currentLanguage === 'hi'
              ? category.descriptionHi
              : category.descriptionEn;
          return (
            <>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalHeaderTitleCol}>
                  <Text style={styles.modalTitle}>{categoryTitle}</Text>
                  <Text style={styles.modalDesc}>{categoryDesc}</Text>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollList}
                contentContainerStyle={styles.scrollListContent}
              >
                {category.id === 'aarti' && (
                  <AartiScreen
                    items={category.items}
                    registerItemRef={registerItemRef}
                    onItemPress={triggerItem}
                  />
                )}
                {category.id === 'shlok' && (
                  <ShlokScreen items={category.items} />
                )}
                {category.id === 'stories' && (
                  <StoriesScreen items={category.items} />
                )}
                {category.id === 'temples' && (
                  <TemplesScreen items={category.items} />
                )}
              </ScrollView>
            </>
          );
        }}
      />

      {/* Nested Item Detail Modal for Aartis */}
      <ExpandableCard<CategoryItem>
        ref={detailCardRef}
        expandedHeight={scale(190)}
        getImage={(item: CategoryItem) => item.image}
        renderContent={(item, _close) => {
          return (
            <View style={styles.aartiFixedCard}>
              <Text style={styles.artiTitle}>
                {currentLanguage === 'hi'
                  ? item.headerTitleHi || item.nameHi
                  : item.headerTitleEn || item.nameEn}
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollList}
                contentContainerStyle={styles.scrollListContent}
              >
                <Text style={styles.aartiDetailText}>{item.textHi}</Text>
              </ScrollView>
            </View>
          );
        }}
      />
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
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(16),
    paddingHorizontal: scale(4),
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
    marginBottom: scale(14),
    shadowColor: '#39261b',
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
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(4),
    width: '100%',
    paddingRight: scale(45),
  },
  modalHeaderTitleCol: {
    flex: 1,
  },
  modalTitle: {
    fontSize: fs(24),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(4),
  },
  modalDesc: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    opacity: 0.7,
    lineHeight: fs(18),
  },
  scrollList: {
    flex: 1,
  },
  scrollListContent: {
    padding: scale(16),
    borderColor: 'rgba(183, 168, 151, 0.3)',
    borderRadius: scale(8),
  },
  aartiFixedCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scale(8),
  },
  aartiDetailText: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(23),
  },
  artiTitle: {
    fontFamily: fonts.Marcellus,
    textAlign: 'center',
    fontSize: fs(20),
    color: colors.secondary,
    lineHeight: fs(23),
    paddingVertical: scale(4),
    paddingHorizontal: scale(45),
  },
});
