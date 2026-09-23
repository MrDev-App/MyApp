import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeIn,
  Layout,
} from 'react-native-reanimated';

export type AnimationType =
  | 'fadeInDown'
  | 'fadeInUp'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'fadeIn';

export interface AnimatedListItemProps {
  /** Index in the list or grid */
  index?: number;
  /** Number of grid columns. When > 1, synchronizes all cards in the same row together [1&2, 3&4, ...] */
  numColumns?: number;
  /** Explicit custom delay in milliseconds (overrides index calculation) */
  delay?: number;
  /** Base stagger step in ms per row/item (default: 50ms) */
  delayStep?: number;
  /** Max delay cap in ms so late items animate promptly (default: 350ms) */
  maxDelay?: number;
  /** Animation transition type (default: 'fadeInDown') */
  animation?: AnimationType;
  /** Whether to enable natural spring physics (default: true) */
  springify?: boolean;
  /** If true, applies flex: 1 to the animated wrapper for equal-width grid columns */
  flex?: boolean;
  /** Custom entering animation override */
  entering?: any;
  /** Custom layout animation override */
  layout?: any;
  /** Additional container style */
  style?: StyleProp<ViewStyle>;
  /** Content to animate */
  children: React.ReactNode;
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  index = 0,
  numColumns = 1,
  delay,
  delayStep = 50,
  maxDelay = 350,
  animation = 'fadeInDown',
  springify = true,
  flex = false,
  entering: customEntering,
  layout: customLayout,
  style,
  children,
}) => {
  // Calculate row-synchronized delay for grid lists
  const calculatedDelay = React.useMemo(() => {
    if (delay !== undefined) {
      return delay;
    }

    const safeIndex = Math.max(0, index);
    if (numColumns > 1) {
      // Synchronize all cards in the same row together: [1, 2], [3, 4], [5, 6]
      const row = Math.floor(safeIndex / numColumns);
      const rowDelay = row * delayStep;
      return Math.min(rowDelay, maxDelay);
    }

    return Math.min(safeIndex * delayStep, maxDelay);
  }, [index, numColumns, delay, delayStep, maxDelay]);

  const getEnteringAnimation = () => {
    if (customEntering) {
      return customEntering;
    }

    let anim;
    switch (animation) {
      case 'fadeInUp':
        anim = FadeInUp;
        break;
      case 'fadeInLeft':
        anim = FadeInLeft;
        break;
      case 'fadeInRight':
        anim = FadeInRight;
        break;
      case 'fadeIn':
        anim = FadeIn;
        break;
      case 'fadeInDown':
      default:
        anim = FadeInDown;
        break;
    }

    const withDelay = anim.delay(calculatedDelay);
    return springify ? withDelay.springify() : withDelay;
  };

  const layoutAnimation = customLayout ?? Layout.springify();

  return (
    <Animated.View
      entering={getEnteringAnimation()}
      layout={layoutAnimation}
      style={[flex && { flex: 1 }, style]}
    >
      {children}
    </Animated.View>
  );
};

export default React.memo(AnimatedListItem);
