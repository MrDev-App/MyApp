import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

export default function SvgPatternBackground({ children, style }: Props) {
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <Svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFill}
        viewBox="0 0 400 800"
      >
        <Defs>
          <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#F7F8FA" />
            <Stop offset="1" stopColor="#EEF0F3" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="400" height="800" fill="url(#bg)" />

        {/* Curvy decorative lines */}
        <Path
          d="M0 120 C 100 60, 180 180, 280 100 S 400 140, 400 140"
          stroke="#D6BE9B"
          strokeOpacity={0.35}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M0 320 C 120 260, 220 380, 400 300"
          stroke="#D6BE9B"
          strokeOpacity={0.3}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M0 600 C 90 540, 200 680, 400 620"
          stroke="#D6BE9B"
          strokeOpacity={0.3}
          strokeWidth={1}
          fill="none"
        />

        {/* Sparkle dots */}
        <Circle cx="340" cy="740" r="2" fill="#D6BE9B" fillOpacity={0.5} />
        <Circle cx="60" cy="420" r="1.5" fill="#D6BE9B" fillOpacity={0.5} />
      </Svg>

      {children}
    </View>
  );
}
