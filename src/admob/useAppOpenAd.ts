import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import {
  AppOpenAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import { isAdMobEnabled } from './adConfig';

const AD_UNIT_ID = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-7403088686757883/2765782561';

// ⏱️ CONFIGURATION
const COOLDOWN_TIME_MS = 60 * 1000; // 1 minute cooldown between ads on app minimize/resume
const AD_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours (Google AdMob expiry policy)

// Global state
let suppressedUntil = 0;
let isAdShowing = false;

/**
 * Suppress App Open Ad for a given duration (default 60s).
 * Call this before opening ImagePicker or system intents so returning to app does not trigger an ad.
 */
export const suppressNextAppOpenAd = (durationMs: number = 60000) => {
  suppressedUntil = Date.now() + durationMs;
};

/**
 * Clear the suppression manually once the user has finished their native action.
 */
export const clearAppOpenAdSuppression = () => {
  suppressedUntil = 0;
};

export const useAppOpenAd = (enabled: boolean = true) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const appOpenAdRef = useRef<AppOpenAd | null>(null);
  const isLoadedRef = useRef<boolean>(false);
  const loadTimeRef = useRef<number>(0);
  const lastShownTimeRef = useRef<number>(0);

  const loadAd = () => {
    if (isAdShowing || !isAdMobEnabled()) return;

    try {
      const ad = AppOpenAd.createForAdRequest(AD_UNIT_ID, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
        isLoadedRef.current = true;
        loadTimeRef.current = Date.now();
      });

      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        isAdShowing = false;
        isLoadedRef.current = false;
        lastShownTimeRef.current = Date.now();
        // Preload next ad
        loadAd();
      });

      const unsubError = ad.addAdEventListener(AdEventType.ERROR, error => {
        console.warn('AppOpenAd error:', error);
        isLoadedRef.current = false;
      });

      appOpenAdRef.current = ad;
      ad.load();

      return () => {
        unsubLoaded();
        unsubClosed();
        unsubError();
      };
    } catch (e) {
      console.warn('AppOpenAd creation failed:', e);
    }
  };

  useEffect(() => {
    if (!enabled || !isAdMobEnabled()) return;

    const cleanupListeners = loadAd();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const isComingFromBackground =
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active';

      appState.current = nextAppState;

      if (!isComingFromBackground) return;

      // 1. Check if suppressed by ImagePicker or native activities
      if (Date.now() < suppressedUntil) {
        return;
      }

      // 2. Check cooldown interval
      const now = Date.now();
      const timeSinceLastAd = now - lastShownTimeRef.current;
      if (timeSinceLastAd < COOLDOWN_TIME_MS) {
        return;
      }

      // 3. Check ad expiry (Google 4-hour rule)
      const isExpired = now - loadTimeRef.current > AD_EXPIRY_MS;
      if (isExpired) {
        loadAd();
        return;
      }

      if (isLoadedRef.current && appOpenAdRef.current && !isAdShowing) {
        isAdShowing = true;
        appOpenAdRef.current.show();
      } else {
        loadAd();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
      cleanupListeners?.();
    };
  }, [enabled]);
};
