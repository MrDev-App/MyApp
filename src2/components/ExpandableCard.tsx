import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  getImage: (data: T) => ImageSourcePropType;
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
    horizontalPadding = scale(20),
    imageMargin = 0,
  }: Props<T>,
  ref: React.Ref<ExpandableCardHandle>,
) {
  const [data, setData] = useState<T | null>(null);
  const [origin, setOrigin] = useState<ExpandOrigin>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [visible, setVisible] = useState(false);
  const progress = useSharedValue(0);

  const handleClose = () => {
    progress.value = withTiming(
      0,
      { duration: 350, easing: Easing.in(Easing.cubic) },
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
      setOrigin(measuredOrigin);
      setData(itemData);
      setVisible(true);
      progress.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    },
    close: handleClose,
  }));

  const scale20 = scale(20);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(progress.value, [0, 1], [origin.y, topOffset]);
    const left = interpolate(
      progress.value,
      [0, 1],
      [origin.x, horizontalPadding],
    );
    const width = interpolate(
      progress.value,
      [0, 1],
      [origin.width, SCREEN_WIDTH - horizontalPadding * 2],
    );
    const height = interpolate(
      progress.value,
      [0, 1],
      [origin.height, expandedHeight],
    );
    const margin = interpolate(progress.value, [0, 1], [0, imageMargin]);

    return { top, left, width, height, margin };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.6, 1], [0, 1], Extrapolation.CLAMP),
    top: expandedHeight + topOffset + scale20,
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.6]),
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.modalRoot}>
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleClose}
        />

        {data && (
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
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
  },
  expandedImage: {
    position: 'absolute',
    resizeMode: 'contain',
    backgroundColor: colors.white,

    borderColor: colors.black,
  },
  expandedContent: {
    position: 'absolute',
  },
});
