import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * AdMob Configuration
 * Central single source of truth for AdMob App ID and Ad Unit IDs.
 * Automatically switches between official Google test IDs in development (__DEV__ === true)
 * and verified live AdMob account IDs in production/release builds.
 *
 * No ad unit ID should be hardcoded anywhere else in the codebase.
 */

// Production Ad Unit IDs (iOS)
const PROD_IOS_APP_ID = 'ca-app-pub-9244116749074778~8122134149';
const PROD_IOS_BANNER_ID = 'ca-app-pub-9244116749074778/5117531009';
const PROD_IOS_REWARDED_ID = 'ca-app-pub-9244116749074778/6314016428';
const PROD_IOS_APP_OPEN_ID = 'ca-app-pub-9244116749074778/6170546193';

// Official Google iOS Test IDs (from Google AdMob Test Ads documentation)
const TEST_IOS_APP_ID = 'ca-app-pub-3940256099942544~1458002511';
const TEST_IOS_BANNER_ID = TestIds.ADAPTIVE_BANNER; // ca-app-pub-3940256099942544/2435281174
const TEST_IOS_REWARDED_ID = TestIds.REWARDED; // ca-app-pub-3940256099942544/1712485313
const TEST_IOS_APP_OPEN_ID = TestIds.APP_OPEN; // ca-app-pub-3940256099942544/5575463023

// Android configuration (fallback support)
const ANDROID_CONFIG = {
  appId: __DEV__
    ? 'ca-app-pub-3940256099942544~3347511713'
    : 'ca-app-pub-7403088686757883~8803441837',
  banner: __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-7403088686757883/4289481752',
  rewarded: __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-7403088686757883/3663931262',
  appOpen: __DEV__
    ? TestIds.APP_OPEN
    : 'ca-app-pub-7403088686757883/2765782561',
};

const isDev = __DEV__;

export const adConfig = {
  isDev,
  appId: Platform.select({
    ios: isDev ? TEST_IOS_APP_ID : PROD_IOS_APP_ID,
    android: ANDROID_CONFIG.appId,
    default: TEST_IOS_APP_ID,
  }) as string,
  adUnits: {
    banner: Platform.select({
      ios: isDev ? TEST_IOS_BANNER_ID : PROD_IOS_BANNER_ID,
      android: ANDROID_CONFIG.banner,
      default: TEST_IOS_BANNER_ID,
    }) as string,
    rewarded: Platform.select({
      ios: isDev ? TEST_IOS_REWARDED_ID : PROD_IOS_REWARDED_ID,
      android: ANDROID_CONFIG.rewarded,
      default: TEST_IOS_REWARDED_ID,
    }) as string,
    appOpen: Platform.select({
      ios: isDev ? TEST_IOS_APP_OPEN_ID : PROD_IOS_APP_OPEN_ID,
      android: ANDROID_CONFIG.appOpen,
      default: TEST_IOS_APP_OPEN_ID,
    }) as string,
  },
};

/**
 * Standard centralized export for ad unit IDs across all app screens
 */
export const AD_UNITS = {
  BANNER: adConfig.adUnits.banner,
  BANNER_HOME: adConfig.adUnits.banner,
  REWARDED: adConfig.adUnits.rewarded,
  REWARDED_BOOK: adConfig.adUnits.rewarded,
  APP_OPEN: adConfig.adUnits.appOpen,
};

/**
 * Global kill-switch / status checker.
 * Returns true in both dev and production by default.
 */
export const ENABLE_ADS_IN_RELEASE = true;
export const isAdMobEnabled = (): boolean => true;

export default adConfig;
