import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { scale } from '../utile/sizes';
import colors from '../utile/colors';



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

type Props<T> = {
  getImage?: (data: T) => ImageSourcePropType;
  renderContent: (data: T, close: () => void) => React.ReactNode;
  expandedWidth?: number;
  expandedHeight?: number;
  topOffset?: number;
  horizontalPadding?: number;
  imageMargin?: number;
};

function ExpandableCardInner<T>(
  {
    getImage,
    renderContent,

    expandedHeight = 340,
    topOffset = 60,
    horizontalPadding = scale(10),
    imageMargin = 0,
  }: Props<T>,
  ref: React.Ref<ExpandableCardHandle>,
) {
  const { width: windowWidth } = useWindowDimensions();
  const [data, setData] = useState<T | null>(null);
  const [_origin, setOrigin] = useState<ExpandOrigin>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [visible, setVisible] = useState(false);
  const progress = useSharedValue(0);

  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const originWidth = useSharedValue(0);
  const originHeight = useSharedValue(0);
  const containerWidth = useSharedValue(windowWidth);

  const handleClose = () => {
    progress.value = withTiming(
      0,
      {
        duration: 450,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
      },
      finished => {
        if (finished) {
          runOnJS(setVisible)(false);
          runOnJS(setData)(null);
        }
      },
    );
  };

  useImperativeHandle(ref, () => ({
    open: (measuredOrigin, itemData) => {
      originX.value = measuredOrigin.x;
      originY.value = measuredOrigin.y;
      originWidth.value = measuredOrigin.width;
      originHeight.value = measuredOrigin.height;
      setOrigin(measuredOrigin);
      setData(itemData);
      setVisible(true);
      progress.value = withTiming(1, {
        duration: 550,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
      });
    },
    close: handleClose,
  }));

  const scale20 = scale(20);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const targetLeft = horizontalPadding + imageMargin;
    const targetWidth = containerWidth.value - targetLeft * 2;
    const targetTop = topOffset + imageMargin;
    const targetHeight = expandedHeight - imageMargin * 2;

    const top = interpolate(progress.value, [0, 1], [originY.value, targetTop]);
    const left = interpolate(
      progress.value,
      [0, 1],
      [originX.value, targetLeft],
    );
    const width = interpolate(
      progress.value,
      [0, 1],
      [originWidth.value, targetWidth],
    );
    const height = interpolate(
      progress.value,
      [0, 1],
      [originHeight.value, targetHeight],
    );
    const borderRadius = interpolate(
      progress.value,
      [0, 1],
      [originWidth.value / 2, 0],
    );
    const borderWidth = interpolate(
      progress.value,
      [0, 1],
      [1.5, 0],
    );

    return {
      top,
      left,
      width,
      height,
      borderRadius,
      borderWidth,
      borderColor: colors.ring,
    };
  });

  const hasImage = !!getImage;

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.3, 1], [0, 1], Extrapolation.CLAMP),
    top: hasImage ? expandedHeight + topOffset + scale20 : topOffset,
    bottom: scale20,
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0.3, 1],
          [35, 0],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(
          progress.value,
          [0.3, 1],
          [0.96, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View
        style={styles.modalRoot}
        onLayout={e => {
          containerWidth.value = e.nativeEvent.layout.width;
        }}
      >
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleClose}
        />

        {data && hasImage && getImage && getImage(data) && (
          <Animated.Image
            source={getImage(data)}
            style={[styles.expandedImage, imageAnimatedStyle]}
          />
        )}

        {data && (
          <Animated.View
            style={[
              styles.expandedContent,
              contentAnimatedStyle,
              { left: horizontalPadding, right: horizontalPadding },
            ]}
          >
            {renderContent(data, handleClose)}
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}

const ExpandableCard = forwardRef(ExpandableCardInner) as <T>(
  props: Props<T> & { ref?: React.Ref<ExpandableCardHandle> },
) => React.ReactElement;

export default ExpandableCard;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
  },
  expandedImage: {
    position: 'absolute',
    resizeMode: 'contain',
    backgroundColor: colors.white,
  },
  expandedContent: {
    position: 'absolute',
  },
});
