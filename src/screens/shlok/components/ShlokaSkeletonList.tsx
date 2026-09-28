import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '@theme/colors';
import { fs, scale } from '@theme/sizes';
import Skeleton from '@components/Skeleton';

export interface ShlokaSkeletonListProps {
  count?: number;
}

export const ShlokaSkeletonList: React.FC<ShlokaSkeletonListProps> = ({
  count = 6,
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={styles.skeletonList}>
      {items.map(index => (
        <View key={`shlok_skel_${index}`} style={styles.cardContainer}>
          <Skeleton width={scale(58)} height="100%" borderRadius={0} />
          <View style={styles.textContainer}>
            <Skeleton
              width="70%"
              height={fs(14)}
              borderRadius={scale(4)}
              style={styles.titleSkeleton}
            />
            <Skeleton width="45%" height={fs(10)} borderRadius={scale(3)} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default React.memo(ShlokaSkeletonList);

const styles = StyleSheet.create({
  skeletonList: {
    gap: scale(10),
  },
  cardContainer: {
    width: '100%',
    height: scale(64),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: scale(14),
    justifyContent: 'center',
  },
  titleSkeleton: {
    marginBottom: scale(6),
  },
});
