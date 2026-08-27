import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  Insets,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

type AnimatedBtnProps = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
  pressDepth?: number;
  scaleDown?: number;
  elnableHaptics?: boolean;
  hitSlop?: Insets;
};
const AnimatedButton = ({
  onPress,
  children,
  style,
  disabled = false,
  scaleDown = 0.9,
  hitSlop,
}: AnimatedBtnProps) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(scaleDown, { duration: 80 });
    shadowOpacity.value = withTiming(0, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 150 });
    shadowOpacity.value = withTiming(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
      shadowOpacity: shadowOpacity.value,
    };
  });

  // Extract layout properties to apply to the outer TouchableOpacity
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    position,
    top,
    bottom,
    left,
    right,
    flex,
    width,
    alignSelf,
    ...buttonStyle
  } = flattenedStyle;

  const layoutStyle = {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    position,
    top,
    bottom,
    left,
    right,
    flex,
    width,
    alignSelf,
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={layoutStyle}
      hitSlop={hitSlop}
    >
      <Animated.View
        style={[
          styles.base,
          buttonStyle,
          disabled && styles.disabled,
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
