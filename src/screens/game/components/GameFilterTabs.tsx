import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { useAppLanguage } from '@hooks';
import { GameCategoryItem, GameCategoryType } from '../types';

interface GameFilterTabsProps {
  categories: GameCategoryItem[];
  selectedCategory: GameCategoryType;
  onSelectCategory: (id: GameCategoryType) => void;
}

const GameFilterTabs: React.FC<GameFilterTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { isHindi } = useAppLanguage();

  const renderTab = useCallback(
    (cat: GameCategoryItem) => {
      const isSelected = selectedCategory === cat.id;
      const label = isHindi ? cat.nameHi : cat.nameEn;

      return (
        <TouchableOpacity
          key={cat.id}
          activeOpacity={0.75}
          onPress={() => onSelectCategory(cat.id)}
          style={[styles.tab, isSelected && styles.tabSelected]}
        >
          <Text
            style={[styles.tabText, isSelected && styles.tabTextSelected]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory, isHindi, onSelectCategory],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(renderTab)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(6),
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    gap: scale(8),
  },
  tab: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(7),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(4),
    elevation: 2,
  },
  tabText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  tabTextSelected: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
  },
});

export default React.memo(GameFilterTabs);
