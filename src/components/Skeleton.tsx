import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@theme/colors';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface SkeletonProps {
  /** Width of the skeleton. Can be a number or percentage string (e.g. '100%') */
  width?: ViewStyle['width'];
  /** Height of the skeleton. Can be a number or percentage string */
  height?: ViewStyle['height'];
  /** Border radius of the skeleton. Defaults to 4 */
  borderRadius?: number;
  /** If true, makes the skeleton circular (borderRadius will be half of height) */
  circle?: boolean;
  /** Custom styles for the container view */
  style?: StyleProp<ViewStyle>;
  /** Base background color of the skeleton loader */
  baseColor?: string;
  /** Highlight color of the shimmer sweep (translucent white by default) */
  highlightColor?: string;
  /** Duration of the shimmer animation loop in ms. Defaults to 1500 */
  duration?: number;
  /** Children to render over the skeleton when loading is done (optional wrapper pattern) */
  children?: React.ReactNode;
  /** Controls if the skeleton is visible or if the children should be shown */
  loading?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 6,
  circle = false,
  style,
  baseColor = colors.skeletonBase,
  highlightColor = colors.skeletonHighlight,
  duration = 1500,
  children,
  loading = true,
}) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const translateX = useSharedValue(-100);

  useEffect(() => {
    if (layoutWidth > 0) {
      // Start the sweep from -layoutWidth to layoutWidth * 1.5
      translateX.value = -layoutWidth;
      translateX.value = withRepeat(
        withTiming(layoutWidth * 1.5, {
          duration: duration,
          easing: Easing.bezier(0.3, 0.0, 0.7, 1.0),
        }),
        -1, // Infinite loops
        false, // Reset to start, do not reverse direction
      );
    }
  }, [layoutWidth, duration, translateX]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width: w } = event.nativeEvent.layout;
    setLayoutWidth(w);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // If we are using the wrapper pattern and loading is false, show children
  if (children && !loading) {
    return <>{children}</>;
  }

  const containerStyle: ViewStyle = {
    width,
    height,
    borderRadius:
      circle && typeof height === 'number' ? height / 2 : borderRadius,
    backgroundColor: baseColor,
    overflow: 'hidden',
  };

  return (
    <View onLayout={onLayout} style={[containerStyle, style]}>
      {layoutWidth > 0 && (
        <AnimatedLinearGradient
          colors={['transparent', highlightColor, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFill,
            { width: layoutWidth }, // Gradient sweep matches container width
            animatedStyle,
          ]}
        />
      )}
    </View>
  );
};

export default Skeleton;
