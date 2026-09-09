/**
 * AdMob Global Configuration
 * 
 * Set ENABLE_ADS_IN_RELEASE to false to disable all AdMob ads (App Open, Banners, Rewarded) in release builds.
 */
export const ENABLE_ADS_IN_RELEASE = false;

/**
 * Returns whether AdMob ads should be initialized, loaded, and displayed.
 */
export const isAdMobEnabled = (): boolean => {
  if (__DEV__) {
    return true; // Test ads enabled in development
  }
  return ENABLE_ADS_IN_RELEASE; // Disabled in release builds
};
