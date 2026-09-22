import React, { useEffect } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { scale, fs } from '@theme/sizes';
import colors from '@theme/colors';
import fonts from '@theme/fonts';

const NetworkBanner = () => {
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();

  const isOffline =
    netInfo.isConnected === false || netInfo.isInternetReachable === false;

  const translateY = useSharedValue(-90);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isOffline) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(-60, { duration: 300 });
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
      style={[styles.banner, { top: insets.top }, animatedStyle]}
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
    backgroundColor: colors.ring,
    paddingVertical: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: '#fff',
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
  },
});
