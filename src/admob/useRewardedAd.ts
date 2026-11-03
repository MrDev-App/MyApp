import { useState, useEffect, useRef, useCallback } from 'react';
import { adService } from './AdService';

export interface UseRewardedAdResult {
  isLoaded: boolean;
  isLoading: boolean;
  loadAd: () => void;
  show: (onReward: () => void, onClosed?: () => void) => boolean;
}

export function useRewardedAd(_unitId?: string): UseRewardedAdResult {
  const [isLoaded, setIsLoaded] = useState<boolean>(() =>
    adService.isRewardedAdLoaded(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(() =>
    adService.isRewardedAdLoading(),
  );

  // Store active callbacks in ref to avoid re-subscription cycles
  const onRewardRef = useRef<(() => void) | null>(null);
  const onClosedRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Sync current singleton state
    setIsLoaded(adService.isRewardedAdLoaded());
    setIsLoading(adService.isRewardedAdLoading());

    // Subscribe to AdService status transitions
    const unsubscribe = adService.addRewardedListener((loaded, loading) => {
      setIsLoaded(loaded);
      setIsLoading(loading);
    });

    // Ensure ad is ready in memory
    if (!adService.isRewardedAdLoaded() && !adService.isRewardedAdLoading()) {
      adService.preloadRewarded();
    }

    return () => {
      unsubscribe();
      onRewardRef.current = null;
      onClosedRef.current = null;
    };
  }, []);

  const loadAd = useCallback(() => {
    adService.preloadRewarded();
  }, []);

  const show = useCallback(
    (onReward: () => void, onClosed?: () => void): boolean => {
      onRewardRef.current = onReward;
      onClosedRef.current = onClosed || null;

      return adService.showRewarded(
        () => {
          onRewardRef.current?.();
        },
        () => {
          onClosedRef.current?.();
        },
      );
    },
    [],
  );

  return { isLoaded, isLoading, loadAd, show };
}

export default useRewardedAd;
