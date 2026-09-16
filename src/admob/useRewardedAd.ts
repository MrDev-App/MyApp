import { useEffect, useRef, useState, useCallback } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { isAdMobEnabled } from './adConfig';

interface UseRewardedAdResult {
  isLoaded: boolean;
  loadAd: () => void;
  show: (onReward: () => void) => void;
}

export function useRewardedAd(unitId: string): UseRewardedAdResult {
  const adEnabled = isAdMobEnabled();
  const resolvedUnitId = __DEV__ ? TestIds.REWARDED : unitId;

  const rewardedAdRef = useRef<RewardedAd | null>(
    adEnabled
      ? RewardedAd.createForAdRequest(resolvedUnitId, {
          requestNonPersonalizedAdsOnly: true,
        })
      : null,
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const onRewardCallbackRef = useRef<(() => void) | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadAd = useCallback(() => {
    if (!adEnabled) return;
    const rewardedAd = rewardedAdRef.current;
    if (rewardedAd && !rewardedAd.loaded) {
      try {
        rewardedAd.load();
      } catch (e) {
        console.warn('Error initiating RewardedAd load:', e);
      }
    }
  }, [adEnabled]);

  useEffect(() => {
    if (!adEnabled) {
      setIsLoaded(true);
      return;
    }

    const rewardedAd = rewardedAdRef.current;
    if (!rewardedAd) return;

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsLoaded(true);
      },
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        onRewardCallbackRef.current?.();
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsLoaded(false);
        onRewardCallbackRef.current = null;
        loadAd();
      },
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      error => {
        console.warn('Rewarded ad failed to load:', error);
        setIsLoaded(false);
        // Auto retry loading after 4 seconds if it failed on iOS / network
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = setTimeout(() => {
          loadAd();
        }, 4000);
      },
    );

    loadAd();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [adEnabled, loadAd]);

  const show = useCallback(
    (onReward: () => void) => {
      if (!adEnabled) {
        onReward(); // Instantly grant reward without ad
        return;
      }

      const rewardedAd = rewardedAdRef.current;
      if (!rewardedAd || !rewardedAd.loaded) {
        console.warn('Rewarded ad not loaded yet — attempting reload.');
        setIsLoaded(false);
        loadAd();
        return;
      }

      try {
        onRewardCallbackRef.current = onReward;
        rewardedAd.show();
      } catch (err) {
        console.error('Failed to show rewarded ad:', err);
        setIsLoaded(false);
        loadAd();
      }
    },
    [adEnabled, loadAd],
  );

  return { isLoaded: adEnabled ? isLoaded : true, loadAd, show };
}
