import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  Insets,
  ImageSourcePropType,
} from 'react-native';

export type AnimatedBtnProps = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
  pressDepth?: number;
  scaleDown?: number;
  enableHaptics?: boolean;
  hitSlop?: Insets;
  activeOpacity?: number;
  testID?: string;
};

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

export interface BlurBackdropProps {
  /** Blur type: 'dark', 'light', 'xlight', etc. Default: 'dark' */
  blurType?: 'dark' | 'light' | 'xlight' | 'prominent' | 'regular';
  /** Blur intensity. Default: 12 */
  blurAmount?: number;
  /** Blur radius (Android). Default: 8 */
  blurRadius?: number;
  /** Overlay color. Default: colors.overlayModalBackdrop */
  overlayColor?: string;
  /** Fallback color when reduced transparency is on. Default: colors.overlayDarkMedium */
  fallbackColor?: string;
  /** Optional extra style */
  style?: StyleProp<ViewStyle>;
}

export interface State {
  hasError: boolean;
  error: Error | null;
}

export type ExpandOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ExpandableCardHandle = {
  open: (origin: ExpandOrigin, data: any) => void;
  close: () => void;
};

export type Props<T> = {
  getImage?: (data: T) => ImageSourcePropType;
  renderContent: (data: T, close: () => void) => React.ReactNode;
  expandedWidth?: number;
  expandedHeight?: number;
  topOffset?: number;
  bottomOffset?: number;
  horizontalPadding?: number;
  imageMargin?: number;
  onOpen?: () => void;
  onClose?: () => void;
};
