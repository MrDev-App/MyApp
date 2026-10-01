import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import colors from '@theme/colors';
import { BlurBackdropProps } from './types';

const BlurBackdrop: React.FC<BlurBackdropProps> = ({
  blurType = 'dark',
  blurAmount = 10,
  blurRadius = 8,
  overlayColor = colors.overlayModalBackdrop,
  fallbackColor = colors.overlayDarkMedium,
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
