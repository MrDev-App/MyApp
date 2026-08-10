import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Images from '../assets';

export const HeartIcon = ({
  filled,
  size = 16,
}: {
  filled: boolean;
  size?: number;
}) => {
  const scale = useSharedValue(1);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (filled) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 110, easing: Easing.out(Easing.ease) }),
        withSpring(1, { damping: 50, stiffness: 300 }),
      );
    } else {
      scale.value = withSequence(
        withTiming(1.3, { duration: 110, easing: Easing.out(Easing.ease) }),
        withSpring(1, { damping: 50, stiffness: 300 }),
      );
    }
  }, [filled]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Images.svgHeartIcon width={16} height={16} fill={filled ? '#000' : ''} />
    </Animated.View>
  );
};
