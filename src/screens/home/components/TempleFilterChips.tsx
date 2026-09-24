import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';

export interface TempleCategoryTag {
  id: string;
  key: string;
}

export const TEMPLE_CATEGORY_TAGS: TempleCategoryTag[] = [
  { id: 'all', key: Translation.TEMPLE_CATEGORY_ALL },
  { id: 'chardham', key: Translation.TEMPLE_CATEGORY_CHARDHAM },
  { id: 'jyotirlinga', key: Translation.TEMPLE_CATEGORY_JYOTIRLINGA },
  { id: 'shaktipeeth', key: Translation.TEMPLE_CATEGORY_SHAKTIPEETH },
];

export interface TempleFilterChipsProps {
  selectedTag: string;
  onSelectTag: (tagId: string) => void;
  tags?: TempleCategoryTag[];
  style?: StyleProp<ViewStyle>;
}

export const TempleFilterChips: React.FC<TempleFilterChipsProps> = ({
  selectedTag,
  onSelectTag,
  tags = TEMPLE_CATEGORY_TAGS,
  style,
}) => {
  const { t } = useAppLanguage();

  const handlePress = useCallback(
    (tagId: string) => {
      triggerHaptic();
      onSelectTag(tagId);
    },
    [onSelectTag],
  );

  return (
    <View style={[styles.filterSection, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {tags.map(tag => {
          const isSelected = selectedTag === tag.id;
          return (
            <TouchableOpacity
              key={tag.id}
              style={[
                styles.filterChip,
                isSelected && styles.filterChipSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => handlePress(tag.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isSelected && styles.filterChipTextSelected,
                ]}
              >
                {t(tag.key)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(TempleFilterChips);

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: scale(8),
  },
  filterScroll: {
    paddingHorizontal: scale(16),
    gap: scale(8),
  },
  filterChip: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    backgroundColor: colors.white,
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterChipSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  filterChipText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  filterChipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
});
