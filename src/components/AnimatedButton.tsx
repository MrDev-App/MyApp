import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  Insets,
} from 'react-native';

type AnimatedBtnProps = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
  pressDepth?: number;
  scaleDown?: number;
  enableHaptics?: boolean;
  hitSlop?: Insets;
  activeOpacity?: number;
};

const AnimatedButton: React.FC<AnimatedBtnProps> = ({
  onPress,
  children,
  style,
  disabled = false,
  hitSlop = { top: 8, bottom: 8, left: 8, right: 8 },
  activeOpacity = 0.75,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        style,
        disabled && styles.disabled,
        pressed && !disabled && { opacity: activeOpacity },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
