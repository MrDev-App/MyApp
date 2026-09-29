import React, { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import colors from '@theme/colors';
import { fs, scale } from '@theme/sizes';
import Skeleton from '@components/Skeleton';

export interface ShlokaGridSkeletonProps {
  count?: number;
  horizontalPadding?: number;
  gap?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export const ShlokaGridSkeleton: React.FC<ShlokaGridSkeletonProps> = ({
  count = 8,
  horizontalPadding: customPadding,
  gap: customGap,
  cardWidth: customCardWidth,
  cardHeight: customCardHeight,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const dimensions = useMemo(() => {
    const isTablet = windowWidth >= 600;
    const numColumns = isTablet ? 3 : 2;
    const hPadding = customPadding !== undefined ? customPadding : scale(16);
    const g = customGap !== undefined ? customGap : scale(12);
    const totalGapWidth = g * (numColumns - 1);
    const availableWidth = windowWidth - hPadding * 2 - totalGapWidth;
    const cWidth = customCardWidth !== undefined ? customCardWidth : Math.floor(availableWidth / numColumns);
    const cHeight = customCardHeight !== undefined ? customCardHeight : Math.floor(cWidth * 0.86);

    return {
      horizontalPadding: hPadding,
      gap: g,
      cardWidth: cWidth,
      cardHeight: cHeight,
    };
  }, [windowWidth, customPadding, customGap, customCardWidth, customCardHeight]);

  return (
    <View
      style={[
        styles.listContent,
        {
          paddingHorizontal: dimensions.horizontalPadding,
          paddingTop: scale(12),
        },
      ]}
    >
      <View style={styles.skeletonGridWrapper}>
        {Array.from({ length: count }).map((_, idx) => (
          <View
            key={`skel_${idx}`}
            style={[
              styles.categoryCardSkeleton,
              {
                width: dimensions.cardWidth,
                height: dimensions.cardHeight,
                marginBottom: dimensions.gap,
              },
            ]}
          >
            <Skeleton
              width="100%"
              height="100%"
              borderRadius={scale(18)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
            />
            <View style={styles.categorySkeletonOverlay}>
              <Skeleton
                width="70%"
                height={fs(13)}
                borderRadius={scale(4)}
                baseColor="rgba(255, 255, 255, 0.35)"
                highlightColor="rgba(255, 255, 255, 0.8)"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(ShlokaGridSkeleton);

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  skeletonGridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCardSkeleton: {
    borderRadius: scale(18),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    position: 'relative',
  },
  categorySkeletonOverlay: {
    position: 'absolute',
    bottom: scale(12),
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
