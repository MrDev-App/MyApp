import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import {
  categoriesData,
  Category,
  CategoryItem,
} from '../../../constants/categoriesData';
import ExpandableCard, {
  ExpandableCardHandle,
} from '../../../components/ExpandableCard';
import { useExpandTrigger } from '../../../hook/useExpandTrigger';
import { Translation } from '../../../i18n/language';
import {
  AartiView,
  ShlokView,
  StoriesView,
  TemplesView,
} from '../../../components/CategoryDetailViews';

const FeaturedCategories = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

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

      <View style={styles.gridContainer}>
        {categoriesData.map(category => {
          const categoryTitle =
            currentLanguage === 'hi' ? category.titleHi : category.titleEn;
          return (
            <TouchableOpacity
              key={category.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => trigger(category.id, category)}
            >
              <View
                ref={registerRef(category.id)}
                collapsable={false}
                style={styles.iconContainer}
              >
                <Text style={styles.iconText}>{category.icon}</Text>
              </View>
              <Text style={styles.cardTitle}>{categoryTitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Category Modal */}
      <ExpandableCard<Category>
        ref={cardRef}
        imageMargin={scale(16)}
        bottomOffset={0}
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
                  <AartiView
                    items={category.items}
                    registerItemRef={registerItemRef}
                    onItemPress={triggerItem}
                  />
                )}
                {category.id === 'shlok' && (
                  <ShlokView items={category.items} />
                )}
                {category.id === 'stories' && (
                  <StoriesView items={category.items} />
                )}
                {category.id === 'temples' && (
                  <TemplesView items={category.items} />
                )}
              </ScrollView>
            </>
          );
        }}
      />

      {/* Nested Item Detail Modal for Aartis */}
      <ExpandableCard<CategoryItem>
        ref={detailCardRef}
        imageMargin={scale(0)}
        expandedHeight={scale(190)}
        getImage={(item: CategoryItem) => item.image}
        renderContent={(item, _close) => {
          return (
            <View style={styles.aartiFixedCard}>
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

export default FeaturedCategories;

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
  iconText: {
    fontSize: fs(50),
  },
  cardTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
  },
  // Modal layout details
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(4),
    width: '100%',
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
    paddingVertical: scale(4),
  },

  // Detail Modal Content
  aartiFixedCard: {
    flex: 1,
    backgroundColor: 'rgba(252, 224, 180, 0.12)',
    borderRadius: scale(8),
    padding: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.3)',
  },
  aartiDetailText: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(23),
  },
});
