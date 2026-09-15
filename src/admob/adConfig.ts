import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * AdMob Global Configuration
 * 
 * Set ENABLE_ADS_IN_RELEASE to false to disable all AdMob ads (App Open, Banners, Rewarded) in release builds.
 */
export const ENABLE_ADS_IN_RELEASE = false;

/**
 * Platform-specific Ad Unit IDs
 */
export const AD_UNITS = {
  REWARDED_BOOK: Platform.select({
    ios: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7403088686757883/3663931262',
    android: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7403088686757883/3663931262',
    default: TestIds.REWARDED,
  }) as string,
  BANNER_HOME: Platform.select({
    ios: __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7403088686757883/4289481752',
    android: __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7403088686757883/4289481752',
    default: TestIds.ADAPTIVE_BANNER,
  }) as string,
  APP_OPEN: Platform.select({
    ios: __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-7403088686757883/2765782561',
    android: __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-7403088686757883/2765782561',
    default: TestIds.APP_OPEN,
  }) as string,
};

/**
 * Returns whether AdMob ads should be initialized, loaded, and displayed.
 */
export const isAdMobEnabled = (): boolean => {
  if (__DEV__) {
    return true; // Test ads enabled in development
  }
  return ENABLE_ADS_IN_RELEASE; // Disabled in release builds
};

