import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { AnimatedListItemProps } from './types';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeIn,
  Layout,
} from 'react-native-reanimated';

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
