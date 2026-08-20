import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Skeleton from '../../../components/Skeleton';
import colors from '../../../utile/colors';
import { scale } from '../../../utile/sizes';

export const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* 1. JapCard Skeleton */}
      <View style={styles.cardSection}>
        {/* Title skeleton */}
        <Skeleton width={120} height={20} style={styles.titleSkeleton} />
        {/* Card container mock */}
        <View style={styles.cardMock}>
          <View style={styles.statsRowMock}>
            <View style={styles.statItemMock}>
              <Skeleton width={80} height={12} style={styles.labelSkeleton} />
              <Skeleton width={40} height={24} style={styles.valueSkeleton} />
            </View>
            <View style={styles.dividerMock} />
            <View style={styles.statItemMock}>
              <Skeleton width={110} height={12} style={styles.labelSkeleton} />
              <Skeleton width={45} height={24} style={styles.valueSkeleton} />
            </View>
          </View>
          {/* Button skeleton */}
          <Skeleton
            width="100%"
            height={45}
            borderRadius={25}
            style={styles.buttonSkeleton}
          />
        </View>
      </View>

      {/* 2. MantrasCard Skeleton */}
      <View style={styles.cardSection}>
        <Skeleton width={160} height={20} style={styles.titleSkeleton} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListMock}
        >
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.mantraColumnMock}>
              {/* Top Deity Row */}
              <View style={styles.deityItemMock}>
                <Skeleton
                  circle
                  width={85}
                  height={85}
                  style={styles.avatarSkeleton}
                />
                <Skeleton width={60} height={10} style={styles.nameSkeleton} />
              </View>
              {/* Bottom Deity Row */}
              <View style={styles.deityItemMock}>
                <Skeleton
                  circle
                  width={85}
                  height={85}
                  style={styles.avatarSkeleton}
                />
                <Skeleton width={50} height={10} style={styles.nameSkeleton} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 3. ChallengeCard Skeleton */}
      <View style={styles.cardSection}>
        <Skeleton width={140} height={20} style={styles.titleSkeleton} />
        <View style={styles.challengeMock}>
          <View style={styles.challengeRow}>
            <Skeleton circle width={50} height={50} />
            <View style={styles.challengeTextCol}>
              <Skeleton width="70%" height={16} style={styles.textSkeleton} />
              <Skeleton width="40%" height={12} style={styles.textSkeleton} />
            </View>
          </View>
        </View>
      </View>

      {/* 4. FeaturedCategories Skeleton */}
      <View style={styles.cardSection}>
        <Skeleton width={150} height={20} style={styles.titleSkeleton} />
        <View style={styles.gridContainerMock}>
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.gridCardMock}>
              <Skeleton
                circle
                width={44}
                height={44}
                style={styles.gridIconSkeleton}
              />
              <Skeleton
                width={70}
                height={12}
                style={styles.gridTextSkeleton}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(8),
  },
  cardSection: {
    width: '100%',
    marginVertical: scale(14),
  },
  titleSkeleton: {
    marginBottom: scale(14),
    marginLeft: scale(4),
  },
  cardMock: {
    backgroundColor: colors.foreground,
    borderRadius: scale(10),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statsRowMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  statItemMock: {
    flex: 1,
    alignItems: 'center',
  },
  dividerMock: {
    width: 1,
    height: '80%',
    backgroundColor: colors.foreground,
    alignSelf: 'center',
  },
  labelSkeleton: {
    marginBottom: scale(8),
  },
  valueSkeleton: {
    marginTop: scale(2),
  },
  buttonSkeleton: {
    marginTop: scale(8),
  },
  horizontalListMock: {
    paddingHorizontal: scale(4),
  },
  mantraColumnMock: {
    flexDirection: 'column',
    marginRight: scale(14),
  },
  deityItemMock: {
    alignItems: 'center',
    width: scale(100),
    marginBottom: scale(15),
  },
  avatarSkeleton: {
    marginBottom: scale(6),
  },
  nameSkeleton: {
    marginTop: scale(4),
  },
  challengeMock: {
    backgroundColor: colors.foreground,
    borderRadius: scale(10),
    padding: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeTextCol: {
    flex: 1,
    marginLeft: scale(16),
  },
  textSkeleton: {
    marginBottom: scale(8),
  },
  gridContainerMock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(4),
  },
  gridCardMock: {
    width: '48%',
    backgroundColor: colors.foreground,
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(18),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  gridIconSkeleton: {
    marginBottom: scale(8),
  },
  gridTextSkeleton: {
    marginTop: scale(4),
  },
});

export default HomeSkeleton;
