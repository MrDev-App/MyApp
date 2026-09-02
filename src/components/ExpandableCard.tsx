import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  useWindowDimensions,
  Text,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, fs } from '@theme/sizes';
import colors from '@theme/colors';

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
  bottomOffset?: number;
  horizontalPadding?: number;
  imageMargin?: number;
  onOpen?: () => void;
  onClose?: () => void;
};

function ExpandableCardInner<T>(
  {
    getImage,
    renderContent,

    expandedHeight = 340,
    topOffset,
    bottomOffset,
    horizontalPadding = scale(10),
    imageMargin = 0,
    onOpen,
    onClose,
  }: Props<T>,
  ref: React.Ref<ExpandableCardHandle>,
) {
  const insets = useSafeAreaInsets();
  const effectiveTop =
    topOffset !== undefined
      ? Math.max(topOffset, insets.top + scale(10))
      : insets.top + scale(10);
  const effectiveBottom =
    bottomOffset !== undefined && bottomOffset > 0
      ? bottomOffset
      : insets.bottom + scale(0);

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
    if (onClose) {
      onClose();
    }
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
      if (onOpen) {
        onOpen();
      }
      progress.value = withTiming(1, {
        duration: 550,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
      });
    },
    close: handleClose,
  }));

  const scale20 = scale(0);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const targetLeft = horizontalPadding + imageMargin;
    const targetWidth = containerWidth.value - targetLeft * 2;
    const targetTop = effectiveTop;
    const targetHeight = expandedHeight;

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
    const borderWidth = interpolate(progress.value, [0, 1], [1.5, 0]);

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
    top: hasImage ? expandedHeight + effectiveTop + scale20 : effectiveTop,

    bottom: effectiveBottom,
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

        {data && hasImage && getImage && getImage(data) && (
          <Animated.Image
            source={getImage(data)}
            style={[styles.expandedImage, imageAnimatedStyle]}
          />
        )}

        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleClose}
        />

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

        <Animated.View
          style={[
            styles.closeButton,
            { top: effectiveTop, right: scale(20), zIndex: 100 },
            backdropAnimatedStyle,
          ]}
        >
          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.8}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
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
  },
  expandedContent: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    width: scale(30),
    height: scale(30),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontWeight: '600',
  },
});
