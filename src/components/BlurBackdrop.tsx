import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface BlurBackdropProps {
  /** Blur type: 'dark', 'light', 'xlight', etc. Default: 'dark' */
  blurType?: 'dark' | 'light' | 'xlight' | 'prominent' | 'regular';
  /** Blur intensity. Default: 12 */
  blurAmount?: number;
  /** Blur radius (Android). Default: 8 */
  blurRadius?: number;
  /** Overlay color. Default: 'rgba(0, 0, 0, 0.45)' */
  overlayColor?: string;
  /** Fallback color when reduced transparency is on. Default: 'rgba(0, 0, 0, 0.65)' */
  fallbackColor?: string;
  /** Optional extra style */
  style?: StyleProp<ViewStyle>;
}

const BlurBackdrop: React.FC<BlurBackdropProps> = ({
  blurType = 'dark',
  blurAmount = 10,
  blurRadius = 8,

  overlayColor = 'rgba(0, 0, 0, 0.45)',
  fallbackColor = 'rgba(0, 0, 0, 0.65)',
  style,
}) => (
  <BlurView
    style={[StyleSheet.absoluteFill, style]}
    blurType={blurType}
    blurAmount={blurAmount}
    blurRadius={blurRadius}
    overlayColor={overlayColor}
    reducedTransparencyFallbackColor={fallbackColor}
  />
);

export default BlurBackdrop;
