import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

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

  // In development, resolve appropriate test ad ID based on requested size
  const isTest = useTestAd !== undefined ? useTestAd : __DEV__;
  const resolvedUnitId = isTest
    ? size === BannerAdSize.ANCHORED_ADAPTIVE_BANNER
      ? TestIds.ADAPTIVE_BANNER
      : TestIds.BANNER
    : unitId;

  return (
    <View style={[styles.container, style]}>
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
    width: '100%',
    marginVertical: 10,
    minHeight: 50,
  },
});

