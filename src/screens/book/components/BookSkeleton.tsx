import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from '@components/Skeleton';
import { fs, scale } from '@theme/sizes';
import colors from '@theme/colors';

const BookSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* ── Shelf 1: Sacred Scriptures ── */}
      <View style={styles.sectionHeader}>
        <Skeleton
          width={scale(160)}
          height={fs(16)}
          borderRadius={scale(4)}
          baseColor={colors.skeletonBase}
          highlightColor={colors.skeletonHighlight}
        />
      </View>
      <View style={styles.horizontalRow}>
        {[1, 2, 3].map(item => (
          <View key={`skel_book_1_${item}`} style={styles.comicCardSkeleton}>
            <Skeleton
              width={scale(130)}
              height={scale(180)}
              borderRadius={scale(14)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
              style={styles.bookCoverSkeleton}
            />
            <Skeleton
              width={scale(110)}
              height={fs(12)}
              borderRadius={scale(3)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
              style={styles.mt4}
            />
            <Skeleton
              width={scale(70)}
              height={fs(10)}
              borderRadius={scale(3)}
              baseColor={colors.skeletonTextSubtle}
              highlightColor={colors.skeletonHighlight}
              style={styles.mt4}
            />
          </View>
        ))}
      </View>

      {/* ── Shelf 2: Illustrated Comics ── */}
      <View style={styles.sectionHeader}>
        <Skeleton
          width={scale(180)}
          height={fs(16)}
          borderRadius={scale(4)}
          baseColor={colors.skeletonBase}
          highlightColor={colors.skeletonHighlight}
        />
      </View>
      <View style={styles.horizontalRow}>
        {[1, 2, 3].map(item => (
          <View key={`skel_book_2_${item}`} style={styles.comicCardSkeleton}>
            <Skeleton
              width={scale(130)}
              height={scale(180)}
              borderRadius={scale(14)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
              style={styles.bookCoverSkeleton}
            />
            <Skeleton
              width={scale(110)}
              height={fs(12)}
              borderRadius={scale(3)}
              baseColor={colors.skeletonBase}
              highlightColor={colors.skeletonHighlight}
              style={styles.mt4}
            />
            <Skeleton
              width={scale(70)}
              height={fs(10)}
              borderRadius={scale(3)}
              baseColor={colors.skeletonTextSubtle}
              highlightColor={colors.skeletonHighlight}
              style={styles.mt4}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: scale(14),
    marginTop: scale(6),
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
    width: scale(130),
  },
  bookCoverSkeleton: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  mt4: {
    marginTop: scale(4),
  },
});

export default React.memo(BookSkeleton);

