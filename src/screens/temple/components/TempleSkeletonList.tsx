import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import colors from '@theme/colors';
import { fs, scale } from '@theme/sizes';
import Skeleton from '@components/Skeleton';

export interface TempleSkeletonListProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TempleSkeletonList: React.FC<TempleSkeletonListProps> = ({
  count = 3,
  containerStyle,
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={[styles.listContent, containerStyle]}>
      {items.map(index => (
        <View key={`temple_skel_${index}`} style={styles.templeCard}>
          <View style={styles.cardHeaderRow}>
            <Skeleton
              circle
              width={scale(48)}
              height={scale(48)}
              baseColor="rgba(183, 168, 151, 0.25)"
              highlightColor="rgba(255, 255, 255, 0.7)"
            />
            <View style={styles.headerTextCol}>
              <Skeleton
                width="65%"
                height={fs(16)}
                borderRadius={scale(4)}
                baseColor="rgba(183, 168, 151, 0.25)"
                highlightColor="rgba(255, 255, 255, 0.7)"
              />
              <Skeleton
                width="45%"
                height={fs(12)}
                borderRadius={scale(4)}
                baseColor="rgba(183, 168, 151, 0.22)"
                highlightColor="rgba(255, 255, 255, 0.7)"
                style={styles.locationSkeleton}
              />
            </View>
          </View>

          <Skeleton
            width={scale(110)}
            height={fs(20)}
            borderRadius={scale(8)}
            baseColor="rgba(251, 148, 55, 0.12)"
            highlightColor="rgba(255, 255, 255, 0.7)"
            style={styles.deitySkeleton}
          />

          <View style={styles.significanceBox}>
            <Skeleton
              width="96%"
              height={fs(13)}
              borderRadius={scale(4)}
              baseColor="rgba(183, 168, 151, 0.22)"
              highlightColor="rgba(255, 255, 255, 0.7)"
            />
            <Skeleton
              width="80%"
              height={fs(13)}
              borderRadius={scale(4)}
              baseColor="rgba(183, 168, 151, 0.22)"
              highlightColor="rgba(255, 255, 255, 0.7)"
              style={styles.significanceSecondLine}
            />
          </View>

          {/* Card Footer Action Skeleton */}
          <View style={styles.cardFooter}>
            <Skeleton
              width={scale(85)}
              height={fs(12)}
              borderRadius={scale(4)}
              baseColor="rgba(251, 148, 55, 0.15)"
              highlightColor="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default React.memo(TempleSkeletonList);

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
  },
  templeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.04,
    shadowRadius: scale(4),
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  headerTextCol: {
    flex: 1,
    marginLeft: scale(12),
  },
  locationSkeleton: {
    marginTop: scale(6),
  },
  deitySkeleton: {
    marginBottom: scale(10),
  },
  significanceBox: {
    marginBottom: scale(10),
  },
  significanceSecondLine: {
    marginTop: scale(6),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
    marginTop: scale(2),
  },
});
