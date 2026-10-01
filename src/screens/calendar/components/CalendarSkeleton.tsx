import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from '@components/Skeleton';
import { fs, scale } from '@theme/sizes';
import colors from '@theme/colors';

export const CalendarSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* ── Calendar Grid Skeleton Container ── */}
      <View style={styles.calendarCard}>
        {/* Days of week header row */}
        <View style={styles.weekHeaderRow}>
          {Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton
              key={`day_header_${idx}`}
              width={scale(32)}
              height={fs(12)}
              borderRadius={scale(4)}
            />
          ))}
        </View>

        {/* 5 Weeks of Calendar Days Grid */}
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <View key={`week_row_${rowIdx}`} style={styles.weekRow}>
            {Array.from({ length: 7 }).map((_, colIdx) => (
              <Skeleton
                key={`day_dot_${rowIdx}_${colIdx}`}
                circle
                width={scale(32)}
                height={scale(32)}
              />
            ))}
          </View>
        ))}
      </View>

      {/* ── Festivals List Section Skeleton ── */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <Skeleton
            width={scale(180)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>

        {/* Festival Cards Skeletons */}
        {[1, 2, 3].map(item => (
          <View key={`skel_fest_${item}`} style={styles.festivalCardSkeleton}>
            <Skeleton
              width="100%"
              height={scale(120)}
              borderRadius={scale(16)}
              style={styles.cardSkeletonInner}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(CalendarSkeleton);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    gap: scale(16),
  },
  calendarCard: {
    borderRadius: scale(16),
    padding: scale(12),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: scale(14),
  },
  weekHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: scale(6),
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: scale(8),
  },
  sectionHeaderRow: {
    marginBottom: scale(12),
  },
  festivalCardSkeleton: {
    marginBottom: scale(12),
  },
  cardSkeletonInner: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
});
