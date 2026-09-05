import { useEffect, useRef, useState, useCallback } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

interface UseRewardedAdResult {
  isLoaded: boolean;
  /** Shows the ad if loaded. Calls onReward when the user earns the reward. */
  show: (onReward: () => void) => void;
}

export function useRewardedAd(unitId: string): UseRewardedAdResult {
  const resolvedUnitId = __DEV__ ? TestIds.REWARDED : unitId;

  // useRef so the ad instance is created once and persists across re-renders
  const rewardedAdRef = useRef(
    RewardedAd.createForAdRequest(resolvedUnitId, {
      requestNonPersonalizedAdsOnly: true,
    }),
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const onRewardCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const rewardedAd = rewardedAdRef.current;

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
  }, []);

  const show = useCallback(
    (onReward: () => void) => {
      const rewardedAd = rewardedAdRef.current;
      if (!isLoaded) {
        console.warn('Rewarded ad not loaded yet — try again in a moment.');
        return;
      }
      onRewardCallbackRef.current = onReward;
      rewardedAd.show();
    },
    [isLoaded],
  );

  return { isLoaded, show };
}
