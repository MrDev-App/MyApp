import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { AnimatedListItem } from '@components';
import { useAppLanguage } from '@hooks';
import imagePath from '@assets/index';
import { ShlokaSubItem } from '@services/firebaseServices/shlokaService';

export interface ShlokaSubItemCardProps {
  item: ShlokaSubItem;
  index: number;
  categoryImageUri?: string;
  onPress: (item: ShlokaSubItem) => void;
}

export const ShlokaSubItemCard: React.FC<ShlokaSubItemCardProps> = ({
  item,
  index,
  categoryImageUri,
  onPress,
}) => {
  const { isHindi } = useAppLanguage();
  const [imageError, setImageError] = useState(false);

  const itemName = useMemo(
    () => (isHindi ? item.nameHi : item.nameEn),
    [isHindi, item.nameHi, item.nameEn],
  );

  const imageSource = useMemo(() => {
    if (imageError) {
      return imagePath.shlok || imagePath.Vishnu;
    }
    if (categoryImageUri) {
      return { uri: categoryImageUri };
    }
    if (item.imageUrl) {
      return { uri: item.imageUrl };
    }
    if (item.image) {
      return item.image;
    }
    return imagePath.shlok || imagePath.Vishnu;
  }, [imageError, categoryImageUri, item.imageUrl, item.image]);

  const handlePress = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <AnimatedListItem index={index} delayStep={35}>
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.82}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={itemName}
      >
        {/* Left Thumbnail Image */}
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.cardThumbImage}
            resizeMode="cover"
            onError={handleImageError}
          />
        </View>

        {/* Right Subcategory Title */}
        <View style={styles.textContainer}>
          <Text style={styles.cardTitleText} numberOfLines={2}>
            {itemName}
          </Text>
        </View>
      </TouchableOpacity>
    </AnimatedListItem>
  );
};

export default React.memo(ShlokaSubItemCard);

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: scale(64),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardOverlay,
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.08,
        shadowRadius: scale(4),
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    width: scale(58),
    height: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: scale(14),
    borderBottomLeftRadius: scale(14),
    backgroundColor: colors.accentOrangeLight,
  },
  cardThumbImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(19),
  },
});
