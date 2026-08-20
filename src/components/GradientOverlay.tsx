import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type OverlayDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-to-bottom'
  | 'bottom-to-top'
  | 'left-to-right'
  | 'right-to-left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left-to-bottom-right'
  | 'top-right-to-bottom-left'
  | 'bottom-left-to-top-right'
  | 'bottom-right-to-top-left';

interface GradientOverlayProps {
  /**
   * Colors to be used in the gradient.
   * Defaults to a vertical dark shadow fade: `['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']`.
   */
  colors?: string[];
  /**
   * Predefined directions for the gradient flow.
   * Defaults to `'top-to-bottom'`.
   */
  direction?: OverlayDirection;
  /**
   * Custom start coordinates {x, y}. Overrides direction if both start and end are provided.
   */
  start?: { x: number; y: number };
  /**
   * Custom end coordinates {x, y}. Overrides direction if both start and end are provided.
   */
  end?: { x: number; y: number };
  /**
   * Optional custom style override for the gradient container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Controls whether the overlay can be the target of touch events.
   * Defaults to `'none'`.
   */
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  /**
   * Optional React children to render inside the overlay.
   */
  children?: React.ReactNode;
}

const getCoordinates = (
  direction?: OverlayDirection,
  start?: { x: number; y: number },
  end?: { x: number; y: number },
) => {
  if (start && end) {
    return { start, end };
  }

  switch (direction) {
    case 'top':
    case 'top-to-bottom':
      return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
    case 'bottom':
    case 'bottom-to-top':
      return { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } };
    case 'left':
    case 'left-to-right':
      return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
    case 'right':
    case 'right-to-left':
      return { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } };
    case 'top-left':
    case 'top-left-to-bottom-right':
      return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    case 'top-right':
    case 'top-right-to-bottom-left':
      return { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } };
    case 'bottom-left':
    case 'bottom-left-to-top-right':
      return { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } };
    case 'bottom-right':
    case 'bottom-right-to-top-left':
      return { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } };
    default:
      return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
  }
};

const GradientOverlay: React.FC<GradientOverlayProps> = ({
  colors = ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)'],
  direction = 'top-to-bottom',
  start,
  end,
  style,
  pointerEvents = 'none',
  children,
}) => {
  const coords = getCoordinates(direction, start, end);

  return (
    <LinearGradient
      colors={colors}
      start={coords.start}
      end={coords.end}
      style={[styles.overlay, style]}
      pointerEvents={pointerEvents}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
  },
});

export default GradientOverlay;
