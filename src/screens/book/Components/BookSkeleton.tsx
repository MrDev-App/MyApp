import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from '@components/Skeleton';
import { scale } from '@theme/sizes';

const BookSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Featured Banner Skeleton */}
      <View style={styles.featuredSkeleton}>
        <Skeleton width="100%" height={scale(200)} borderRadius={scale(16)} />
      </View>

      {/* Row 1 Section */}
      <View style={styles.sectionHeader}>
        <Skeleton width={140} height={18} borderRadius={4} />
      </View>
      <View style={styles.horizontalRow}>
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.comicCardSkeleton}>
            <Skeleton
              width={scale(130)}
              height={scale(180)}
              borderRadius={scale(14)}
            />
            <Skeleton width={110} height={14} borderRadius={3} />
            <Skeleton width={70} height={10} borderRadius={3} />
          </View>
        ))}
      </View>

      {/* Row 2 Section */}
      <View style={styles.sectionHeader}>
        <Skeleton width={160} height={18} borderRadius={4} />
      </View>
      <View style={styles.horizontalRow}>
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.comicCardSkeleton}>
            <Skeleton
              width={scale(130)}
              height={scale(180)}
              borderRadius={scale(14)}
            />
            <Skeleton width={110} height={14} borderRadius={3} />
            <Skeleton width={70} height={10} borderRadius={3} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: scale(16),
  },
  featuredSkeleton: {
    paddingHorizontal: scale(20),
  },
  sectionHeader: {
    paddingHorizontal: scale(20),
    paddingTop: scale(4),
  },
  horizontalRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    gap: scale(16),
  },
  comicCardSkeleton: {
    gap: scale(6),
  },
});

export default React.memo(BookSkeleton);
