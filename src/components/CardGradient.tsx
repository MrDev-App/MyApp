import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { bannerGradients } from '@theme/colors';

export interface CardGradientProps extends Partial<LinearGradientProps> {
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  colors?: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children?: React.ReactNode;
}

const CardGradient: React.FC<CardGradientProps> = ({
  borderRadius,
  style,
  colors = bannerGradients.calendarBanner,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  pointerEvents = 'none',
  children,
  ...rest
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      pointerEvents={children ? undefined : pointerEvents}
      style={[
        children ? undefined : styles.absolute,
        borderRadius !== undefined && { borderRadius },
        style,
      ]}
      {...rest}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFill,
  },
});

export default React.memo(CardGradient);
