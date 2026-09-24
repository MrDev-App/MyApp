import React, { useEffect } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { scale, fs } from '@theme/sizes';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { getBannerHeight } from '@theme/tabBarMetrics';
import { useNetworkStatus } from '@hooks';

const NetworkBanner = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const isOffline = useNetworkStatus();

  const bottomInset = insets.bottom;
  const totalBannerHeight = getBannerHeight(bottomInset);
  const extraBottom =
    bottomInset > 0 ? (Platform.OS === 'ios' ? scale(8) : scale(4)) : 0;

  const translateY = useSharedValue(totalBannerHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isOffline) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(totalBannerHeight, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOffline, translateY, opacity, totalBannerHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.banner,
        {
          height: totalBannerHeight,
          paddingBottom: extraBottom,
        },
        animatedStyle,
      ]}
    >
      <Text style={styles.text} numberOfLines={1}>
        {t(Translation.NO_INTERNET_CONNECTION)}
      </Text>
    </Animated.View>
  );
};

export default NetworkBanner;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    zIndex: 99999,
    elevation: 99999,
  },
  text: {
    color: colors.white,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
