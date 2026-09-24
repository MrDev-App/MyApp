import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { AnimatedListItem } from '@components';
import Skeleton from '@components/Skeleton';
import { useAppLanguage } from '@hooks';
import imagePath from '@assets/index';
import { ShlokaCategory } from '@constants/shlokData';

const loadedImageCache = new Set<string>();

export interface ShlokaCategoryCardProps {
  item: ShlokaCategory;
  index: number;
  numColumns: number;
  cardWidth: number;
  cardHeight: number;
  onPress: (item: ShlokaCategory) => void;
}

export const ShlokaCategoryCard: React.FC<ShlokaCategoryCardProps> = ({
  item,
  index,
  numColumns,
  cardWidth,
  cardHeight,
  onPress,
}) => {
  const { t } = useAppLanguage();
  const [hasError, setHasError] = useState<boolean>(false);

  const isInitiallyLoaded = useMemo(() => {
    return !item.imageUrl || loadedImageCache.has(item.imageUrl);
  }, [item.imageUrl]);

  const [imageLoading, setImageLoading] = useState<boolean>(!isInitiallyLoaded);

  const imageSource = useMemo(() => {
    if (!hasError && item.imageUrl) {
      return { uri: item.imageUrl };
    }
    return imagePath.shlokasFallback;
  }, [hasError, item.imageUrl]);

  const handleImageLoaded = useCallback(() => {
    if (item.imageUrl) {
      loadedImageCache.add(item.imageUrl);
    }
    setImageLoading(false);
  }, [item.imageUrl]);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setImageLoading(false);
  }, []);

  const handlePress = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const title = useMemo(() => {
    return item.title ? t(item.title) : item.title;
  }, [item.title, t]);

  return (
    <AnimatedListItem index={index} numColumns={numColumns} delayStep={45}>
      <TouchableOpacity
        style={[styles.cardContainer, { width: cardWidth, height: cardHeight }]}
        activeOpacity={0.88}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={
          typeof title === 'string' ? title : 'Shloka Category'
        }
      >
        <View style={styles.cardInner}>
          {/* Full Bleed Background Image */}
          <Image
            source={imageSource}
            resizeMode="cover"
            onLoad={handleImageLoaded}
            onLoadEnd={handleImageLoaded}
            onError={handleImageError}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Ambient Dark Gradient Overlay - shown once image is ready */}
          {!imageLoading && (
            <LinearGradient
              colors={[
                'transparent',
                'rgba(0, 0, 0, 0.3)',
                'rgba(0, 0, 0, 0.75)',
              ]}
              locations={[0, 0.35, 1]}
              style={styles.gradientOverlay}
            >
              <Text
                style={styles.cardTitle}
                numberOfLines={2}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.82}
              >
                {title}
              </Text>
            </LinearGradient>
          )}

          {/* Skeleton Shimmer matching BookScreen color */}
          {imageLoading && (
            <Skeleton
              width="100%"
              height="100%"
              borderRadius={scale(18)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
              style={StyleSheet.absoluteFill}
            />
          )}
        </View>
      </TouchableOpacity>
    </AnimatedListItem>
  );
};

export default React.memo(ShlokaCategoryCard);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: scale(18),
    backgroundColor: colors.charcoal,

    borderColor: colors.borderSubtle,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardOverlay,
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.08,
        shadowRadius: scale(5),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardInner: {
    ...StyleSheet.absoluteFill,
    borderRadius: scale(18),
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.15,
    textShadowColor: colors.overlayDarkStrong,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: scale(12),
  },
});
