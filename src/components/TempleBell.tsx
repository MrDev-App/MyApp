import React, { useEffect } from 'react';
import { Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import imagePath from '@assets';
import { scale } from '@theme/sizes';

export interface TempleBellProps {
  style?: StyleProp<ViewStyle>;
  /** Height of the bell in density-independent pixels. Defaults to scale(100) */
  height?: number;
  /** Width of the bell in density-independent pixels. Defaults to 0.6 * height */
  width?: number;
  /** Maximum swing angle in degrees (e.g. 8, 12, 16). Defaults to 8 */
  swingAngle?: number;
  /** Duration in ms for one full oscillation cycle. Defaults to 2400 */
  duration?: number;
  /** Starting swing direction ('left' or 'right'). Defaults to 'right' */
  initialDirection?: 'left' | 'right';
  /** Optional start delay in ms before swing begins. Defaults to 0 */
  delay?: number;
  /** Whether the bell is actively swinging. Defaults to true */
  isSwinging?: boolean;
}

const TempleBellComponent: React.FC<TempleBellProps> = ({
  style,
  height = scale(100),
  width,
  swingAngle = 8,
  duration = 2400,
  initialDirection = 'right',
  delay = 0,
  isSwinging = true,
}) => {
  const rotation = useSharedValue(0);
  const bellWidth = width ?? height * 0.6;
  const dir = initialDirection === 'left' ? -1 : 1;

  useEffect(() => {
    if (!isSwinging) {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      });
      return;
    }

    const quarter = duration / 4;
    const half = duration / 2;

    const startEndlessSwing = () => {
      // 1. Initial gentle push from center (0) to peak
      // 2. Endless continuous pendulum loop between peaks without boundary jumps
      rotation.value = withSequence(
        withTiming(dir * swingAngle, {
          duration: quarter,
          easing: Easing.inOut(Easing.sin),
        }),
        withRepeat(
          withSequence(
            withTiming(-dir * swingAngle, {
              duration: half,
              easing: Easing.inOut(Easing.sin),
            }),
            withTiming(dir * swingAngle, {
              duration: half,
              easing: Easing.inOut(Easing.sin),
            }),
          ),
          -1,
          false,
        ),
      );
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    if (delay > 0) {
      timer = setTimeout(startEndlessSwing, delay);
    } else {
      startEndlessSwing();
    }

    return () => {
      if (timer) clearTimeout(timer);
      cancelAnimation(rotation);
    };
  }, [isSwinging, swingAngle, duration, dir, delay, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -height / 2 },
      { rotate: `${rotation.value}deg` },
      { translateY: height / 2 },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.bellWrapper,
        { width: bellWidth, height },
        animatedStyle,
        style,
      ]}
      pointerEvents="none"
    >
      <Image
        source={imagePath.Bell}
        style={styles.bellImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bellWrapper: {
    // Pure top pivot via transform in animatedStyle
  },
  bellImage: {
    width: '100%',
    height: '100%',
  },
});

export const TempleBell = React.memo(TempleBellComponent);
export default TempleBell;
