import React, { useEffect } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { scale } from '@theme/sizes';

const TAB_BAR_HEIGHT = Platform.select({
  ios: scale(85),
  android: scale(115),
  default: scale(100),
});

const NetworkBanner = () => {
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();

  const isOffline =
    netInfo.isConnected === false || netInfo.isInternetReachable === false;

  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isOffline) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(20, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOffline, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      pointerEvents={isOffline ? 'auto' : 'none'}
      style={[
        styles.banner,
        { bottom: TAB_BAR_HEIGHT + insets.bottom },
        animatedStyle,
      ]}
    >
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

export default NetworkBanner;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    alignItems: 'center',
    zIndex: 999,
  },
  text: { color: '#fff', fontWeight: '600' },
});
