import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  DimensionValue,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface ZoomableImageProps {
  source: ImageSourcePropType;
  width?: DimensionValue;
  height?: DimensionValue;
  onZoomStateChange?: (isZoomed: boolean) => void;
  isZoomed: boolean;
}

const ZoomableComicPage: React.FC<ZoomableImageProps> = ({
  source,
  width,
  height,
  onZoomStateChange,
  isZoomed,
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const resetZoom = () => {
    'worklet';
    scale.value = withSpring(1);
    savedScale.value = 1;
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      if (onZoomStateChange) runOnJS(onZoomStateChange)(true);
    })
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        resetZoom();
        if (onZoomStateChange) runOnJS(onZoomStateChange)(false);
      } else {
        savedScale.value = scale.value;
        if (scale.value <= 1.05 && onZoomStateChange) {
          runOnJS(onZoomStateChange)(false);
        }
      }
    });

  // KEY FIX: Pan sirf tab enable ho jab image already zoomed ho.
  // Isse single-finger swipe FlatList ko chala jaata hai jab zoom nahi hai.
  const panGesture = Gesture.Pan()
    .enabled(isZoomed)
    .onUpdate(e => {
      if (savedScale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        resetZoom();
        if (onZoomStateChange) runOnJS(onZoomStateChange)(false);
      } else {
        scale.value = withSpring(2);
        savedScale.value = 2;
        if (onZoomStateChange) runOnJS(onZoomStateChange)(true);
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
    <View style={{ width, height, overflow: 'hidden' }}>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={resolvedSource}
          style={[{ width: '100%', height: '100%' }, animatedStyle]}
          resizeMode="contain"
        />
      </GestureDetector>
    </View>
  );
};

export default ZoomableComicPage;
