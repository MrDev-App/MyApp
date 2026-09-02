import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Skeleton from '@components/Skeleton';
import { scale } from '@theme/sizes';

const HomeSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Jap Card Skeleton */}
      <View style={styles.cardSkeleton}>
        <View style={styles.cardHeader}>
          <Skeleton circle width={scale(44)} height={scale(44)} />
          <View style={styles.headerText}>
            <Skeleton width={140} height={16} borderRadius={4} />
            <Skeleton width={90} height={12} borderRadius={3} />
          </View>
        </View>
        <View style={styles.statsRow}>
          <Skeleton width="48%" height={scale(50)} borderRadius={8} />
          <Skeleton width="48%" height={scale(50)} borderRadius={8} />
        </View>
      </View>

      {/* Mantras Card Skeleton */}
      <View style={styles.cardSkeleton}>
        <View style={styles.cardHeader}>
          <Skeleton circle width={scale(44)} height={scale(44)} />
          <View style={styles.headerText}>
            <Skeleton width={130} height={16} borderRadius={4} />
            <Skeleton width={100} height={12} borderRadius={3} />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          scrollEnabled={false}
        >
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.mantraItem}>
              <Skeleton circle width={scale(56)} height={scale(56)} />
              <Skeleton width={50} height={10} borderRadius={3} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Challenge Card Skeleton */}
      <View style={styles.cardSkeleton}>
        <View style={styles.cardHeader}>
          <Skeleton circle width={scale(44)} height={scale(44)} />
          <View style={styles.headerText}>
            <Skeleton width={150} height={16} borderRadius={4} />
            <Skeleton width={80} height={12} borderRadius={3} />
          </View>
        </View>
        <View style={styles.progressSkeleton}>
          <Skeleton width="100%" height={scale(8)} borderRadius={4} />
        </View>
        <View style={styles.cardFooter}>
          <Skeleton width={100} height={12} borderRadius={3} />
          <Skeleton width={70} height={28} borderRadius={6} />
        </View>
      </View>

      {/* Featured Categories Skeleton */}
      <View style={styles.sectionHeader}>
        <Skeleton width={140} height={18} borderRadius={4} />
      </View>
      <View style={styles.gridSkeleton}>
        <Skeleton width="48%" height={scale(60)} borderRadius={14} />
        <Skeleton width="48%" height={scale(60)} borderRadius={14} />
        <Skeleton width="48%" height={scale(60)} borderRadius={14} />
        <Skeleton width="48%" height={scale(60)} borderRadius={14} />
      </View>

      {/* Festival Highlights Skeleton */}
      <View style={styles.sectionHeader}>
        <Skeleton width={150} height={18} borderRadius={4} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
        scrollEnabled={false}
      >
        {[1, 2, 3, 4].map(item => (
          <View key={item} style={styles.festivalCard}>
            <Skeleton
              width={scale(124)}
              height={scale(105)}
              borderRadius={14}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: scale(16),
  },
  cardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(14),
    padding: scale(14),
    gap: scale(12),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  headerText: {
    gap: scale(6),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    gap: scale(12),
    paddingVertical: scale(4),
  },
  mantraItem: {
    alignItems: 'center',
    gap: scale(6),
  },
  progressSkeleton: {
    width: '100%',
    paddingVertical: scale(4),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: scale(4),
  },
  sectionHeader: {
    paddingHorizontal: scale(4),
    paddingTop: scale(4),
  },
  gridSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  festivalCard: {
    marginRight: scale(12),
  },
});

export default React.memo(HomeSkeleton);
