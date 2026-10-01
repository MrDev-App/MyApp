import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Skeleton from '@components/Skeleton';
import { fs, scale } from '@theme/sizes';
import colors from '@theme/colors';

const HomeSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* ── 1. Jap Card Skeleton ── */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Skeleton
            width={scale(100)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>
        <View style={styles.cardSkeleton}>
          <View style={styles.japStatsRow}>
            <View style={styles.japStatCol}>
              <Skeleton
                width={scale(80)}
                height={fs(10)}
                borderRadius={scale(3)}
                style={styles.mb6}
              />
              <Skeleton
                width={scale(45)}
                height={fs(18)}
                borderRadius={scale(4)}
              />
            </View>
            <View style={styles.japDivider} />
            <View style={styles.japStatCol}>
              <Skeleton
                width={scale(80)}
                height={fs(10)}
                borderRadius={scale(3)}
                style={styles.mb6}
              />
              <Skeleton
                width={scale(45)}
                height={fs(18)}
                borderRadius={scale(4)}
              />
            </View>
          </View>
          <Skeleton width="100%" height={scale(46)} borderRadius={scale(10)} />
        </View>
      </View>

      {/* ── 2. Mantras by Deities Skeleton ── */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Skeleton
            width={scale(160)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          scrollEnabled={false}
        >
          {[1, 2, 3, 4].map(item => (
            <View key={`mantra_col_${item}`} style={styles.mantraColumn}>
              <View style={styles.mantraItem}>
                <Skeleton circle width={scale(80)} height={scale(80)} />
                <Skeleton
                  width={scale(65)}
                  height={fs(11)}
                  borderRadius={scale(3)}
                  style={styles.mt4}
                />
              </View>
              <View style={styles.mantraItem}>
                <Skeleton circle width={scale(80)} height={scale(80)} />
                <Skeleton
                  width={scale(65)}
                  height={fs(11)}
                  borderRadius={scale(3)}
                  style={styles.mt4}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ── 3. Hindu Calendar Banner Skeleton ── */}
      <View style={styles.calendarBannerSkeleton}>
        <View style={styles.bannerHeaderRow}>
          <Skeleton
            width={scale(110)}
            height={scale(20)}
            borderRadius={scale(7)}
          />
          <Skeleton
            width={scale(85)}
            height={scale(20)}
            borderRadius={scale(8)}
          />
        </View>
        <View style={styles.bannerContentRow}>
          <View style={styles.bannerTextCol}>
            <Skeleton
              width="75%"
              height={fs(15)}
              borderRadius={scale(4)}
              style={styles.mb6}
            />
            <Skeleton
              width="90%"
              height={fs(11)}
              borderRadius={scale(3)}
              style={styles.mb8}
            />
            <View style={styles.bannerChipsRow}>
              <Skeleton
                width={scale(60)}
                height={scale(20)}
                borderRadius={scale(6)}
              />
              <Skeleton
                width={scale(60)}
                height={scale(20)}
                borderRadius={scale(6)}
              />
            </View>
          </View>
          <Skeleton circle width={scale(56)} height={scale(56)} />
        </View>
        <View style={styles.bannerFooterRow}>
          <Skeleton
            width={scale(140)}
            height={fs(11)}
            borderRadius={scale(3)}
          />
          <Skeleton
            width={scale(75)}
            height={scale(26)}
            borderRadius={scale(14)}
          />
        </View>
      </View>

      {/* ── 4. Challenge Card Skeleton ── */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Skeleton
            width={scale(110)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>
        <View style={styles.cardSkeleton}>
          <View style={styles.challengeHeader}>
            <Skeleton circle width={scale(44)} height={scale(44)} />
            <View style={styles.challengeHeaderText}>
              <Skeleton
                width={scale(140)}
                height={fs(15)}
                borderRadius={scale(4)}
              />
              <Skeleton
                width={scale(90)}
                height={fs(11)}
                borderRadius={scale(3)}
                style={styles.mt4}
              />
            </View>
          </View>
          <View style={styles.progressSection}>
            <Skeleton width="100%" height={scale(8)} borderRadius={scale(4)} />
          </View>
          <View style={styles.challengeFooter}>
            <Skeleton
              width={scale(100)}
              height={fs(11)}
              borderRadius={scale(3)}
            />
            <Skeleton
              width={scale(75)}
              height={scale(30)}
              borderRadius={scale(8)}
            />
          </View>
        </View>
      </View>

      {/* ── 5. Featured Categories Skeleton ── */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Skeleton
            width={scale(130)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>
        <View style={styles.gridSkeleton}>
          <Skeleton
            width="48%"
            height={scale(62)}
            borderRadius={scale(14)}
            style={styles.gridItemSkeleton}
          />
          <Skeleton
            width="48%"
            height={scale(62)}
            borderRadius={scale(14)}
            style={styles.gridItemSkeleton}
          />
          <Skeleton
            width="48%"
            height={scale(62)}
            borderRadius={scale(14)}
            style={styles.gridItemSkeleton}
          />
          <Skeleton
            width="48%"
            height={scale(62)}
            borderRadius={scale(14)}
            style={styles.gridItemSkeleton}
          />
        </View>
      </View>

      {/* ── 6. Festival Highlights Skeleton ── */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Skeleton
            width={scale(140)}
            height={fs(16)}
            borderRadius={scale(4)}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          scrollEnabled={false}
        >
          {[1, 2, 3, 4].map(item => (
            <View key={`fest_skel_${item}`} style={styles.festivalCardSkeleton}>
              <Skeleton
                width={scale(130)}
                height={scale(120)}
                borderRadius={scale(15)}
                style={styles.festivalSkeletonInner}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: scale(16),
  },
  sectionWrapper: {
    width: '100%',
  },
  sectionHeader: {
    paddingHorizontal: scale(4),
    marginBottom: scale(10),
  },
  cardSkeleton: {
    // backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.04,
    shadowRadius: scale(4),
  },
  japStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: scale(14),
  },
  japStatCol: {
    alignItems: 'center',
    width: '45%',
  },
  japDivider: {
    width: 1,
    height: scale(32),
    backgroundColor: colors.borderSubtle,
  },
  horizontalScroll: {
    paddingHorizontal: scale(4),
    gap: scale(12),
  },
  mantraColumn: {
    flexDirection: 'column',
    gap: scale(12),
    marginRight: scale(6),
  },
  mantraItem: {
    alignItems: 'center',
    width: scale(88),
  },
  calendarBannerSkeleton: {
    // backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: scale(14),
    padding: scale(12),
    borderWidth: 1,
    borderColor: colors.bannerBorderOrangeLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.04,
    shadowRadius: scale(4),
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  bannerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  bannerTextCol: {
    flex: 1,
    paddingRight: scale(10),
  },
  bannerChipsRow: {
    flexDirection: 'row',
    gap: scale(6),
  },
  bannerFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  challengeHeaderText: {
    marginLeft: scale(12),
    flex: 1,
  },
  progressSection: {
    width: '100%',
    marginBottom: scale(10),
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  gridSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  gridItemSkeleton: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  festivalCardSkeleton: {
    marginRight: scale(4),
  },
  festivalSkeletonInner: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  mb6: {
    marginBottom: scale(6),
  },
  mb8: {
    marginBottom: scale(8),
  },
  mt4: {
    marginTop: scale(4),
  },
});

export default React.memo(HomeSkeleton);
