import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { categoriesData, Category } from '../../../constants/categoriesData';
import ExpandableCard, {
  ExpandableCardHandle,
} from '../../../components/ExpandableCard';
import { useExpandTrigger } from '../../../hook/useExpandTrigger';

const FeaturedCategories = () => {
  const { t } = useTranslation();

  const cardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef, trigger } = useExpandTrigger<Category>(cardRef);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Categories</Text>

      <View style={styles.gridContainer}>
        {categoriesData.map(category => (
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
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ExpandableCard
        ref={cardRef}
        imageMargin={scale(16)}
        getImage={(category: Category) => category.coverImage}
        renderContent={(category: Category, close) => (
          <>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{category.title}</Text>
              <Text style={styles.modalDesc}>{category.description}</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollList}
              contentContainerStyle={styles.scrollListContent}
            >
              {category.items.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemHeaderText}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      {item.subtitle && (
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
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
    backgroundColor: colors.white,
    borderRadius: scale(24),
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
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
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
  },
  iconText: {
    fontSize: fs(24),
  },
  cardTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
  },
  // Modal layout details
  modalContent: {
    flex: 1,
    paddingTop: scale(20),
  },
  modalHeader: {
    marginBottom: scale(16),
  },
  modalTitle: {
    fontSize: fs(24),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(6),
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
  scrollListContent: {},
  itemCard: {
    backgroundColor: 'rgba(252, 224, 180, 0.2)',
    borderRadius: scale(16),
    padding: scale(14),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.15)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  itemImage: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    marginRight: scale(12),
  },
  itemHeaderText: {
    flex: 1,
  },
  itemName: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  itemSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(2),
  },
  itemText: {
    fontSize: fs(12.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(18.5),
  },
  backButton: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderRadius: scale(25),
    backgroundColor: colors.ring,
    marginBottom: scale(20),
  },
  backButtonText: {
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(14),
  },
});
