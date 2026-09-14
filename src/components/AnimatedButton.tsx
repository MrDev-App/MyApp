import React from 'react';
import {
  TouchableOpacity,
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
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      style={[style, disabled && styles.disabled]}
      hitSlop={hitSlop}
    >
      {children}
    </TouchableOpacity>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
