import React, { useState, memo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import { adConfig, isAdMobEnabled } from './adConfig';

export interface BannerAdComponentProps {
  /**
   * Ad Unit ID. Defaults to the centralized banner ID from adConfig.ts.
   * Do NOT hardcode IDs in screen components.
   */
  unitId?: string;
  size?: BannerAdSize;
  style?: ViewStyle;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
}

/**
 * Reusable Banner Ad Component.
 * - Isolated via React.memo to prevent parent re-renders from invalidating the ad view.
 * - Stays mounted on temporary load errors so AdMob can automatically retry and refresh.
 * - Collapses to 0 height when not loaded to prevent layout shift.
 */
const BannerAdComponent: React.FC<BannerAdComponentProps> = memo(({
  unitId = adConfig.adUnits.banner,
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  style,
  onAdLoaded,
  onAdFailedToLoad,
}) => {
  const [adLoaded, setAdLoaded] = useState(false);

  if (!isAdMobEnabled()) {
    return null;
  }

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
        unitId={unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          setAdLoaded(true);
          onAdLoaded?.();
        }}
        onAdFailedToLoad={error => {
          console.warn('[BannerAd] Failed to load:', error);
          setAdLoaded(false);
          onAdFailedToLoad?.(error);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    marginVertical: 8,
  },
});

export default BannerAdComponent;
