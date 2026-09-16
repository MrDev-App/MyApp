import imagePath from '@assets';
import React, { useEffect } from 'react';
import { Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface TempleBellProps {
  style?: StyleProp<ViewStyle>;
}

const TempleBell: React.FC<TempleBellProps> = ({ style }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(6, { duration: 900, easing: Easing.inOut(Easing.sin) }),
        withTiming(-6, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.bellWrapper, animatedStyle, style]}>
      <Image
        source={imagePath.temple_bell}
        style={styles.bellImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bellWrapper: {
    width: 60,
    height: 100,
    transformOrigin: 'top',
  },
  bellImage: {
    width: '100%',
    height: '100%',
  },
});

export default TempleBell;
