import { useEffect } from 'react';
import { adService } from './AdService';

/**
 * Suppress App Open Ad for a given duration (default 60s).
 * Call this before launching ImagePicker or system dialogs so returning does not trigger an ad.
 */
export const suppressNextAppOpenAd = (durationMs: number = 60000): void => {
  adService.suppressAppOpenAd(durationMs);
};

/**
 * Clear the suppression manually once the native action finishes.
 */
export const clearAppOpenAdSuppression = (): void => {
  adService.clearAppOpenAdSuppression();
};

/**
 * Hook to register App Open Ad handling on app foregrounding.
 */
export const useAppOpenAd = (enabled: boolean = true): void => {
  useEffect(() => {
    if (!enabled) return;
    const unsubscribe = adService.setupAppOpenAds();
    return () => {
      unsubscribe();
    };
  }, [enabled]);
};

export default useAppOpenAd;
