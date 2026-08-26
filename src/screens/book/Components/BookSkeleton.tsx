import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import colors from '../../../utile/colors';
import { scale } from '../../../utile/sizes';

export const BookSkeleton = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800 }),
        withTiming(1, { duration: 800 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderShelfPlaceholder = (key: string) => (
    <View key={key} style={styles.shelfContainer}>
      <Animated.View style={[styles.titlePlaceholder, animatedStyle]} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={false}
      >
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.cardContainer}>
            <Animated.View style={[styles.imagePlaceholder, animatedStyle]} />
            <Animated.View style={[styles.textPlaceholderShort, animatedStyle]} />
            <Animated.View style={[styles.textPlaceholderTiny, animatedStyle]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {[1, 2, 3, 4].map(shelf => renderShelfPlaceholder(String(shelf)))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(110),
  },
  shelfContainer: {
    width: '100%',
    marginTop: scale(15),
  },
  titlePlaceholder: {
    width: scale(160),
    height: scale(20),
    borderRadius: scale(6),
    backgroundColor: colors.borderMedium,
    marginHorizontal: scale(20),
    marginBottom: scale(10),
  },
  scrollContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  cardContainer: {
    width: scale(130),
    marginRight: scale(16),
  },
  imagePlaceholder: {
    width: '100%',
    height: scale(180),
    borderRadius: scale(14),
    backgroundColor: colors.borderMedium,
    marginBottom: scale(8),
  },
  textPlaceholderShort: {
    width: '80%',
    height: scale(12),
    borderRadius: scale(4),
    backgroundColor: colors.borderMedium,
    marginBottom: scale(6),
  },
  textPlaceholderTiny: {
    width: '50%',
    height: scale(10),
    borderRadius: scale(4),
    backgroundColor: colors.borderMedium,
  },
});

export default React.memo(BookSkeleton);
