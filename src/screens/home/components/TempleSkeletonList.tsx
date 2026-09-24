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
            <Skeleton circle width={scale(48)} height={scale(48)} />
            <View style={styles.headerTextCol}>
              <Skeleton width="65%" height={fs(16)} borderRadius={scale(4)} />
              <Skeleton
                width="45%"
                height={fs(12)}
                borderRadius={scale(4)}
                style={styles.locationSkeleton}
              />
            </View>
          </View>
          <Skeleton
            width={scale(110)}
            height={fs(18)}
            borderRadius={scale(8)}
            style={styles.deitySkeleton}
          />
          <View style={styles.significanceBox}>
            <Skeleton width="96%" height={fs(13)} borderRadius={scale(4)} />
            <Skeleton
              width="80%"
              height={fs(13)}
              borderRadius={scale(4)}
              style={styles.significanceSecondLine}
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
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 2,
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
});
