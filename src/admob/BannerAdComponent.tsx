import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import { isAdMobEnabled } from './adConfig';

interface BannerAdComponentProps {
  unitId: string;
  size?: BannerAdSize;
  style?: ViewStyle;
  useTestAd?: boolean;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
}

export default function BannerAdComponent({
  unitId,
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  style,
  useTestAd,
  onAdLoaded,
  onAdFailedToLoad,
}: BannerAdComponentProps) {
  const [adLoaded, setAdLoaded] = useState(false);

  if (!isAdMobEnabled()) {
    return null;
  }

  // In development, resolve appropriate test ad ID based on requested size
  const isTest = useTestAd !== undefined ? useTestAd : __DEV__;
  const resolvedUnitId = isTest
    ? size === BannerAdSize.ANCHORED_ADAPTIVE_BANNER
      ? TestIds.ADAPTIVE_BANNER
      : TestIds.BANNER
    : unitId;

  return (
    <View
      style={[
        styles.container,
        !adLoaded && styles.hiddenContainer,
        adLoaded && styles.visibleContainer,
        adLoaded && style,
      ]}
    >
      <BannerAd
        unitId={resolvedUnitId}
        size={size}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => {
          setAdLoaded(true);
          onAdLoaded?.();
        }}
        onAdFailedToLoad={error => {
          console.warn('BannerAd failed to load:', error);
          setAdLoaded(false);
          onAdFailedToLoad?.(error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenContainer: {
    height: 0,
    width: 0,
    overflow: 'hidden',
    marginVertical: 0,
    padding: 0,
    opacity: 0,
  },
  visibleContainer: {
    width: '100%',
    marginVertical: 10,
  },
});

