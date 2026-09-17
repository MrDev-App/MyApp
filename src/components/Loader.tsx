import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  EntryExitAnimationFunction,
} from 'react-native-reanimated';
import { BlurView, BlurViewProps } from '@react-native-community/blur';
import LottieView, { AnimationObject } from 'lottie-react-native';
import imagePath from '@assets/index';
import { fs, scale } from '@theme/sizes';
import fonts from '@theme/fonts';
import colors from '@theme/colors';
import { useAppLanguage } from '@hooks';

export interface LoaderProps {
  /**
   * Whether the loader is visible.
   * @default true
   */
  visible?: boolean;

  /**
   * If true, covers entire screen with absoluteFill and high zIndex.
   * @default false
   */
  fullscreen?: boolean;

  /**
   * Explicit width for loader container.
   */
  width?: DimensionValue;

  /**
   * Explicit height for loader container.
   */
  height?: DimensionValue;

  /**
   * Border radius for the container wrap.
   * @default scale(14)
   */
  borderRadius?: number;

  /**
   * Container custom style overrides.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * zIndex of container.
   * @default 10
   */
  zIndex?: number;

  // --- Blur Options ---
  /**
   * Whether to show blur backdrop.
   * @default true
   */
  showBlur?: boolean;

  /**
   * Blur effect type.
   * @default 'dark'
   */
  blurType?: BlurViewProps['blurType'];

  /**
   * Blur intensity amount.
   * @default 6
   */
  blurAmount?: number;

  /**
   * Overlay tint color on top of blur.
   * @default 'rgba(0, 0, 0, 0.35)'
   */
  overlayColor?: string;

  /**
   * Fallback background color when reduced transparency is active.
   * @default 'rgba(0, 0, 0, 0.35)'
   */
  reducedTransparencyFallbackColor?: string;

  /**
   * Blur view style overrides.
   */
  blurStyle?: StyleProp<ViewStyle>;

  // --- Lottie Options ---
  /**
   * Lottie source animation.
   * @default imagePath.loading
   */
  source?: string | AnimationObject | { uri: string };

  /**
   * Size (width & height) of the lottie animation.
   * @default scale(55)
   */
  lottieSize?: number;

  /**
   * Explicit lottie width override.
   */
  lottieWidth?: DimensionValue;

  /**
   * Explicit lottie height override.
   */
  lottieHeight?: DimensionValue;

  /**
   * Lottie style overrides.
   */
  lottieStyle?: StyleProp<ViewStyle>;

  /**
   * Whether lottie autoplays.
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Whether lottie loops.
   * @default true
   */
  loop?: boolean;

  /**
   * Speed of lottie animation.
   * @default 1
   */
  speed?: number;

  // --- Text Options ---
  /**
   * Explicit custom text string. If provided, overrides textHi/textEn.
   */
  text?: string;

  /**
   * Hindi text fallback.
   * @default 'कृपया प्रतीक्षा करें...'
   */
  textHi?: string;

  /**
   * English text fallback.
   * @default 'Please wait...'
   */
  textEn?: string;

  /**
   * Whether to render loading text.
   * @default true
   */
  showText?: boolean;

  /**
   * Text color override.
   * @default colors.white
   */
  textColor?: string;

  /**
   * Font size override.
   * @default fs(9.5)
   */
  fontSize?: number;

  /**
   * Custom text style overrides.
   */
  textStyle?: StyleProp<TextStyle>;

  // --- Reanimated Animations ---
  /**
   * Entering animation for the loader container.
   * @default FadeIn.duration(200)
   */
  entering?: any;

  /**
   * Exiting animation for the loader container.
   * @default FadeOut.duration(200)
   */
  exiting?: any;

  /**
   * Entering animation for the loading text.
   * @default FadeInDown.duration(350).springify().damping(100).stiffness(120)
   */
  textEntering?: any;
}

export const Loader: React.FC<LoaderProps> = ({
  visible = true,
  fullscreen = false,
  width,
  height,
  borderRadius = scale(14),
  style,
  zIndex = 10,

  showBlur = true,
  blurType = 'dark',
  blurAmount = 6,
  overlayColor = 'rgba(0, 0, 0, 0.35)',
  reducedTransparencyFallbackColor = 'rgba(0, 0, 0, 0.35)',
  blurStyle,

  source = imagePath.loading,
  lottieSize = scale(55),
  lottieWidth,
  lottieHeight,
  lottieStyle,
  autoPlay = true,
  loop = true,
  speed = 1,

  text,
  textHi = 'कृपया प्रतीक्षा करें...',
  textEn = 'Please wait...',
  showText = true,
  textColor = colors.white,
  fontSize = fs(9.5),
  textStyle,

  entering = FadeIn.duration(200),
  exiting = FadeOut.duration(200),
  textEntering = FadeInDown.duration(350)
    .springify()
    .damping(100)
    .stiffness(120),
}) => {
  const { select } = useAppLanguage();

  if (!visible) {
    return null;
  }

  const resolvedText = text ?? select(textHi, textEn);

  const containerDynamicStyle: StyleProp<ViewStyle> = [
    fullscreen ? styles.fullscreen : styles.absoluteContainer,
    {
      borderRadius,
      zIndex,
    },
    width !== undefined && { width },
    height !== undefined && { height },
    style,
  ];

  const resolvedLottieWidth = lottieWidth ?? lottieSize;
  const resolvedLottieHeight = lottieHeight ?? lottieSize;

  return (
    <Animated.View
      style={containerDynamicStyle}
      entering={entering}
      exiting={exiting}
      pointerEvents={fullscreen ? 'auto' : 'none'}
    >
      {showBlur ? (
        <BlurView
          style={[StyleSheet.absoluteFill, blurStyle]}
          blurType={blurType}
          blurAmount={blurAmount}
          overlayColor={overlayColor}
          reducedTransparencyFallbackColor={reducedTransparencyFallbackColor}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: overlayColor },
            blurStyle,
          ]}
        />
      )}

      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        style={[
          {
            width: resolvedLottieWidth,
            height: resolvedLottieHeight,
          },
          lottieStyle,
        ]}
      />

      {showText && !!resolvedText && (
        <Animated.Text
          style={[
            styles.loadingText,
            {
              color: textColor,
              fontSize,
            },
            textStyle,
          ]}
          entering={textEntering}
        >
          {resolvedText}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  loadingText: {
    fontFamily: fonts.TiroHindiRegular,
    marginTop: scale(2),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
