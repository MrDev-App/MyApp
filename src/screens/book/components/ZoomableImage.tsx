import React, { useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  DimensionValue,
  LayoutChangeEvent,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

export interface ZoomableImageProps {
  source: ImageSourcePropType;
  width?: DimensionValue;
  height?: DimensionValue;
  minScale?: number;
  maxScale?: number;
  doubleTapScale?: number;
  isZoomed?: boolean;
  onZoomStateChange?: (isZoomed: boolean) => void;
}

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 150,
  mass: 0.8,
};

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  source,
  width = '100%',
  height = '100%',
  minScale = 1,
  maxScale = 4,
  doubleTapScale = 2.5,
  isZoomed = false,
  onZoomStateChange,
}) => {
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const isCurrentlyZoomed = useSharedValue(false);

  // Notify parent only when zoom state changes (avoids JS bridge thrashing)
  const notifyZoomChange = useCallback(
    (zoomed: boolean) => {
      if (onZoomStateChange) {
        onZoomStateChange(zoomed);
      }
    },
    [onZoomStateChange],
  );

  const setZoomStateWorklet = (zoomed: boolean) => {
    'worklet';
    if (isCurrentlyZoomed.value !== zoomed) {
      isCurrentlyZoomed.value = zoomed;
      if (onZoomStateChange) {
        runOnJS(notifyZoomChange)(zoomed);
      }
    }
  };

  const clampTranslation = (val: number, maxBound: number) => {
    'worklet';
    return Math.min(Math.max(val, -maxBound), maxBound);
  };

  const resetZoom = () => {
    'worklet';
    scale.value = withSpring(minScale, SPRING_CONFIG);
    savedScale.value = minScale;
    translateX.value = withSpring(0, SPRING_CONFIG);
    translateY.value = withSpring(0, SPRING_CONFIG);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    setZoomStateWorklet(false);
  };

  // Reset zoom whenever source changes (e.g. page flip in comic reader)
  useEffect(() => {
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    isCurrentlyZoomed.value = false;
  }, [
    source,
    scale,
    savedScale,
    translateX,
    translateY,
    savedTranslateX,
    savedTranslateY,
    isCurrentlyZoomed,
  ]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width: w, height: h } = e.nativeEvent.layout;
      containerWidth.value = w;
      containerHeight.value = h;
    },
    [containerWidth, containerHeight],
  );

  // 1. Pinch Gesture
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      setZoomStateWorklet(true);
    })
    .onUpdate(e => {
      const nextScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(nextScale, 0.8), maxScale + 0.5);
    })
    .onEnd(() => {
      if (scale.value <= minScale * 1.05) {
        resetZoom();
      } else {
        const targetScale = Math.min(scale.value, maxScale);
        scale.value = withSpring(targetScale, SPRING_CONFIG);
        savedScale.value = targetScale;

        // Clamp translation after pinch release
        const maxBoundX = (containerWidth.value * (targetScale - 1)) / 2;
        const maxBoundY = (containerHeight.value * (targetScale - 1)) / 2;
        const clampedX = clampTranslation(translateX.value, maxBoundX);
        const clampedY = clampTranslation(translateY.value, maxBoundY);

        translateX.value = withSpring(clampedX, SPRING_CONFIG);
        translateY.value = withSpring(clampedY, SPRING_CONFIG);
        savedTranslateX.value = clampedX;
        savedTranslateY.value = clampedY;

        setZoomStateWorklet(true);
      }
    });

  // 2. Pan Gesture (Active only when zoomed in)
  const panGesture = Gesture.Pan()
    .enabled(isZoomed || isCurrentlyZoomed.value)
    .onUpdate(e => {
      if (savedScale.value > minScale) {
        const maxBoundX = (containerWidth.value * (scale.value - 1)) / 2;
        const maxBoundY = (containerHeight.value * (scale.value - 1)) / 2;

        const nextX = savedTranslateX.value + e.translationX;
        const nextY = savedTranslateY.value + e.translationY;

        // Apply resistance rubber-banding when panning beyond boundaries
        if (Math.abs(nextX) > maxBoundX) {
          const excess = Math.abs(nextX) - maxBoundX;
          const sign = nextX > 0 ? 1 : -1;
          translateX.value = sign * (maxBoundX + Math.pow(excess, 0.7));
        } else {
          translateX.value = nextX;
        }

        if (Math.abs(nextY) > maxBoundY) {
          const excess = Math.abs(nextY) - maxBoundY;
          const sign = nextY > 0 ? 1 : -1;
          translateY.value = sign * (maxBoundY + Math.pow(excess, 0.7));
        } else {
          translateY.value = nextY;
        }
      }
    })
    .onEnd(() => {
      if (scale.value > minScale) {
        const maxBoundX = (containerWidth.value * (scale.value - 1)) / 2;
        const maxBoundY = (containerHeight.value * (scale.value - 1)) / 2;

        const clampedX = clampTranslation(translateX.value, maxBoundX);
        const clampedY = clampTranslation(translateY.value, maxBoundY);

        translateX.value = withSpring(clampedX, SPRING_CONFIG);
        translateY.value = withSpring(clampedY, SPRING_CONFIG);
        savedTranslateX.value = clampedX;
        savedTranslateY.value = clampedY;
      }
    });

  // 3. Double Tap Gesture (Toggle zoom in / out with focal alignment)
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd(e => {
      if (scale.value > minScale * 1.1) {
        resetZoom();
      } else {
        const targetScale = doubleTapScale;
        scale.value = withSpring(targetScale, SPRING_CONFIG);
        savedScale.value = targetScale;

        // Center on double-tapped focal point
        if (containerWidth.value > 0 && containerHeight.value > 0) {
          const centerX = containerWidth.value / 2;
          const centerY = containerHeight.value / 2;
          const focalDeltaX = (centerX - e.x) * (targetScale - 1);
          const focalDeltaY = (centerY - e.y) * (targetScale - 1);

          const maxBoundX = (containerWidth.value * (targetScale - 1)) / 2;
          const maxBoundY = (containerHeight.value * (targetScale - 1)) / 2;

          const clampedX = clampTranslation(focalDeltaX, maxBoundX);
          const clampedY = clampTranslation(focalDeltaY, maxBoundY);

          translateX.value = withSpring(clampedX, SPRING_CONFIG);
          translateY.value = withSpring(clampedY, SPRING_CONFIG);
          savedTranslateX.value = clampedX;
          savedTranslateY.value = clampedY;
        }

        setZoomStateWorklet(true);
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const resolvedSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <View style={[styles.container, { width, height }]} onLayout={onLayout}>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={resolvedSource}
          style={[styles.image, animatedStyle]}
          resizeMode="contain"
        />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const ZoomableComicPage = ZoomableImage;
export default React.memo(ZoomableImage);
