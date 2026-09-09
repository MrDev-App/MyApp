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
  /** Shows the ad if loaded. Calls onReward when the user earns the reward. */
  show: (onReward: () => void) => void;
}

export function useRewardedAd(unitId: string): UseRewardedAdResult {
  const adEnabled = isAdMobEnabled();
  const resolvedUnitId = __DEV__ ? TestIds.REWARDED : unitId;

  // useRef so the ad instance is created once and persists across re-renders
  const rewardedAdRef = useRef<RewardedAd | null>(
    adEnabled
      ? RewardedAd.createForAdRequest(resolvedUnitId, {
          requestNonPersonalizedAdsOnly: true,
        })
      : null,
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const onRewardCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!adEnabled) {
      setIsLoaded(true);
      return;
    }

    const rewardedAd = rewardedAdRef.current;
    if (!rewardedAd) return;

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => setIsLoaded(true),
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        // User watched the full video — grant the reward here
        onRewardCallbackRef.current?.();
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsLoaded(false);
        onRewardCallbackRef.current = null;
        rewardedAd.load(); // preload the next one immediately
      },
    );

    rewardedAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, [adEnabled]);

  const show = useCallback(
    (onReward: () => void) => {
      if (!adEnabled) {
        onReward(); // Instantly grant reward without ad
        return;
      }

      const rewardedAd = rewardedAdRef.current;
      if (!isLoaded || !rewardedAd) {
        console.warn('Rewarded ad not loaded yet — try again in a moment.');
        return;
      }
      onRewardCallbackRef.current = onReward;
      rewardedAd.show();
    },
    [isLoaded, adEnabled],
  );

  return { isLoaded: adEnabled ? isLoaded : true, show };
}
