import { AppState, AppStateStatus, Platform } from 'react-native';
import type {
  RewardedAd,
  AppOpenAd,
} from 'react-native-google-mobile-ads';
import { adConfig, isAdMobEnabled } from './adConfig';
import { navigationRef } from '@navigation/navigationRef';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';

// Timing and Retry Constants
const AD_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours (Google AdMob expiry policy)
const APP_OPEN_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown between App Open ads
const MAX_RETRY_ATTEMPTS = 4; // Max retry attempts for exponential backoff

type RewardedListener = (isLoaded: boolean, isLoading: boolean) => void;

/**
 * Lazy helper to load react-native-google-mobile-ads on demand.
 * This prevents blocking JavaScript bundle evaluation at app launch.
 */
let googleMobileAdsModule: typeof import('react-native-google-mobile-ads') | null = null;
const getMobileAdsModule = () => {
  if (!googleMobileAdsModule) {
    googleMobileAdsModule = require('react-native-google-mobile-ads');
  }
  return googleMobileAdsModule!;
};

export class AdService {
  private static instance: AdService | null = null;

  // Initialization State
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  // Rewarded Ad State
  private rewardedAd: RewardedAd | null = null;
  private isRewardedLoaded = false;
  private isRewardedLoading = false;
  private rewardedLoadedAt = 0;
  private rewardedRetryCount = 0;
  private rewardedRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private rewardedListeners: Set<RewardedListener> = new Set();
  private onRewardCallback: (() => void) | null = null;
  private onRewardedClosedCallback: (() => void) | null = null;
  private rewardedUnsubscribers: Array<() => void> = [];

  // App Open Ad State
  private appOpenAd: AppOpenAd | null = null;
  private isAppOpenLoaded = false;
  private isAppOpenLoading = false;
  private isAppOpenShowing = false;
  private appOpenLoadedAt = 0;
  private lastAppOpenShownAt = 0;
  private appOpenRetryCount = 0;
  private appOpenRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private appOpenSuppressedUntil = 0;
  private appOpenUnsubscribers: Array<() => void> = [];
  private appStateSubscription: { remove: () => void } | null = null;
  private currentAppState: AppStateStatus = AppState.currentState;

  private constructor() {}

  public static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  // ─────────────────────────────────────────────────────────────
  // SDK INITIALIZATION & APPLE ATT FLOW
  // ─────────────────────────────────────────────────────────────

  /**
   * Initializes the Google Mobile Ads SDK once at app startup.
   * Runs in the background and does not block the initial render.
   */
  public async initialize(): Promise<void> {
    if (!isAdMobEnabled()) return;
    if (this.isInitialized) return;
    if (this.isInitializing && this.initPromise) return this.initPromise;

    this.isInitializing = true;

    this.initPromise = (async () => {
      try {
        const { default: mobileAds, AdsConsent } = getMobileAdsModule();

        // 1. Initialize Mobile Ads SDK immediately
        const adapterStatuses = await mobileAds().initialize();
        console.log('[AdService] Mobile Ads initialized successfully:', adapterStatuses);

        this.isInitialized = true;

        // 2. Preload high-intent ads in background for instant presentation
        this.preloadRewarded();
        this.preloadAppOpen();

        // 3. Apple ATT / European Consent (UMP) flow in background (non-blocking)
        if (Platform.OS === 'ios') {
          AdsConsent.requestInfoUpdate()
            .then(() => AdsConsent.loadAndShowConsentFormIfRequired())
            .catch(consentError => {
              console.warn('[AdService] Optional consent notice skipped:', consentError);
            });
        }
      } catch (error) {
        console.warn('[AdService] Mobile Ads SDK initialization error:', error);
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
  }

  // ─────────────────────────────────────────────────────────────
  // REWARDED AD MANAGEMENT (PRELOAD, SHOW, EXPONENTIAL RETRY)
  // ─────────────────────────────────────────────────────────────

  public isRewardedAdLoaded(): boolean {
    if (!this.isRewardedLoaded) return false;
    // Check 4-hour AdMob expiration rule
    if (Date.now() - this.rewardedLoadedAt > AD_EXPIRY_MS) {
      this.isRewardedLoaded = false;
      this.preloadRewarded();
      return false;
    }
    return true;
  }

  public isRewardedAdLoading(): boolean {
    return this.isRewardedLoading;
  }

  public addRewardedListener(listener: RewardedListener): () => void {
    this.rewardedListeners.add(listener);
    listener(this.isRewardedAdLoaded(), this.isRewardedLoading);
    return () => {
      this.rewardedListeners.delete(listener);
    };
  }

  private notifyRewardedListeners(isLoaded: boolean, isLoading: boolean = this.isRewardedLoading) {
    this.rewardedListeners.forEach(listener => listener(isLoaded, isLoading));
  }

  /**
   * Preloads a Rewarded Ad into memory with exponential backoff retry.
   */
  public preloadRewarded(): void {
    if (!isAdMobEnabled()) return;
    if (this.isRewardedAdLoaded() || this.isRewardedLoading) return;

    // Clean up previous listeners & timer
    this.cleanupRewardedSubscriptions();
    if (this.rewardedRetryTimer) {
      clearTimeout(this.rewardedRetryTimer);
      this.rewardedRetryTimer = null;
    }

    this.isRewardedLoading = true;
    this.notifyRewardedListeners(false, true);

    try {
      const { RewardedAd, RewardedAdEventType, AdEventType } =
        getMobileAdsModule();

      const ad = RewardedAd.createForAdRequest(adConfig.adUnits.rewarded, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubLoaded = ad.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          this.isRewardedLoaded = true;
          this.isRewardedLoading = false;
          this.rewardedLoadedAt = Date.now();
          this.rewardedRetryCount = 0;
          this.notifyRewardedListeners(true, false);
          if (__DEV__) {
            console.log('[AdService] Rewarded ad preloaded successfully');
          }
        },
      );

      let hasEarnedReward = false;

      const unsubEarned = ad.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          hasEarnedReward = true;
          if (this.onRewardCallback) {
            this.onRewardCallback();
            this.onRewardCallback = null;
          }
        },
      );

      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        this.isRewardedLoaded = false;
        this.isRewardedLoading = false;
        this.notifyRewardedListeners(false, false);

        // Suppress App Open ad after dismissing rewarded ad to prevent accidental trigger
        this.suppressAppOpenAd(20000);

        if (hasEarnedReward && this.onRewardCallback) {
          this.onRewardCallback();
          this.onRewardCallback = null;
        }

        if (this.onRewardedClosedCallback) {
          this.onRewardedClosedCallback();
          this.onRewardedClosedCallback = null;
        }

        // Immediately reload next rewarded ad so it's ready for the next book
        this.preloadRewarded();
      });

      const unsubError = ad.addAdEventListener(AdEventType.ERROR, error => {
        console.warn('[AdService] Rewarded ad failed to load:', error);
        this.isRewardedLoaded = false;
        this.isRewardedLoading = false;
        this.notifyRewardedListeners(false, false);

        // Exponential backoff retry capped at MAX_RETRY_ATTEMPTS
        if (this.rewardedRetryCount < MAX_RETRY_ATTEMPTS) {
          const delay = Math.min(
            1000 * Math.pow(2, this.rewardedRetryCount),
            30000,
          );
          this.rewardedRetryCount++;
          if (__DEV__) {
            console.log(
              `[AdService] Retrying rewarded ad load in ${delay}ms (attempt ${this.rewardedRetryCount})`,
            );
          }
          this.rewardedRetryTimer = setTimeout(() => {
            this.preloadRewarded();
          }, delay);
        }
      });

      this.rewardedUnsubscribers.push(
        unsubLoaded,
        unsubEarned,
        unsubClosed,
        unsubError,
      );
      this.rewardedAd = ad;
      ad.load();
    } catch (e) {
      console.warn('[AdService] Error creating Rewarded Ad:', e);
      this.isRewardedLoading = false;
      this.notifyRewardedListeners(false, false);
    }
  }

  /**
   * Shows the preloaded Rewarded Ad.
   * If not loaded yet, initiates a preload and returns false.
   */
  public showRewarded(
    onReward: () => void,
    onClosed?: () => void,
  ): boolean {
    if (!isAdMobEnabled()) {
      onReward();
      return true;
    }

    if (!this.isRewardedAdLoaded() || !this.rewardedAd) {
      console.warn('[AdService] Rewarded ad not ready to show. Initiating preload.');
      this.preloadRewarded();
      return false;
    }

    this.onRewardCallback = onReward;
    this.onRewardedClosedCallback = onClosed || null;

    // Suppress App Open ad while user is engaged with the Rewarded video
    this.suppressAppOpenAd(120000);

    try {
      this.rewardedAd.show();
      return true;
    } catch (error) {
      console.error('[AdService] Failed to display rewarded ad:', error);
      this.preloadRewarded();
      return false;
    }
  }

  private cleanupRewardedSubscriptions() {
    this.rewardedUnsubscribers.forEach(unsub => unsub());
    this.rewardedUnsubscribers = [];
  }

  // ─────────────────────────────────────────────────────────────
  // APP OPEN AD MANAGEMENT (PRELOAD, COOLDOWN, SUPPRESSION)
  // ─────────────────────────────────────────────────────────────

  public isAppOpenAdLoaded(): boolean {
    if (!this.isAppOpenLoaded) return false;
    if (Date.now() - this.appOpenLoadedAt > AD_EXPIRY_MS) {
      this.isAppOpenLoaded = false;
      this.preloadAppOpen();
      return false;
    }
    return true;
  }

  /**
   * Preloads an App Open Ad into memory with exponential backoff retry.
   */
  public preloadAppOpen(): void {
    if (!isAdMobEnabled()) return;
    if (this.isAppOpenAdLoaded() || this.isAppOpenLoading || this.isAppOpenShowing) return;

    this.cleanupAppOpenSubscriptions();
    if (this.appOpenRetryTimer) {
      clearTimeout(this.appOpenRetryTimer);
      this.appOpenRetryTimer = null;
    }

    this.isAppOpenLoading = true;

    try {
      const { AppOpenAd, AdEventType } = getMobileAdsModule();

      const ad = AppOpenAd.createForAdRequest(adConfig.adUnits.appOpen, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
        this.isAppOpenLoaded = true;
        this.isAppOpenLoading = false;
        this.appOpenLoadedAt = Date.now();
        this.appOpenRetryCount = 0;
        if (__DEV__) {
          console.log('[AdService] App Open ad preloaded successfully');
        }
      });

      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        this.isAppOpenShowing = false;
        this.isAppOpenLoaded = false;
        this.isAppOpenLoading = false;
        this.lastAppOpenShownAt = Date.now();
        // Preload next App Open ad for subsequent foregroundings
        this.preloadAppOpen();
      });

      const unsubError = ad.addAdEventListener(AdEventType.ERROR, error => {
        console.warn('[AdService] App Open ad load failed:', error);
        this.isAppOpenLoaded = false;
        this.isAppOpenLoading = false;

        if (this.appOpenRetryCount < MAX_RETRY_ATTEMPTS) {
          const delay = Math.min(
            1000 * Math.pow(2, this.appOpenRetryCount),
            30000,
          );
          this.appOpenRetryCount++;
          this.appOpenRetryTimer = setTimeout(() => {
            this.preloadAppOpen();
          }, delay);
        }
      });

      this.appOpenUnsubscribers.push(unsubLoaded, unsubClosed, unsubError);
      this.appOpenAd = ad;
      ad.load();
    } catch (e) {
      console.warn('[AdService] Error creating App Open Ad:', e);
      this.isAppOpenLoading = false;
    }
  }

  /**
   * Displays the App Open ad if available and eligible.
   * Enforces cooldown, screen guards (never on Splash/Onboarding), and suppression.
   */
  public showAppOpenAdIfAvailable(): boolean {
    if (!isAdMobEnabled()) return false;
    if (this.isAppOpenShowing) return false;

    // 1. Check suppression (e.g. camera, image picker, native intents)
    if (Date.now() < this.appOpenSuppressedUntil) {
      return false;
    }

    // 2. Check cooldown interval
    const timeSinceLastAd = Date.now() - this.lastAppOpenShownAt;
    if (timeSinceLastAd < APP_OPEN_COOLDOWN_MS) {
      return false;
    }

    // 3. Avoid showing on first launch splash / onboarding to maintain fast app startup
    const isOnboardingDone = Storage.getBoolean(
      STORAGE_KEYS.ONBOARDING_COMPLETED,
      false,
    );
    if (!isOnboardingDone) {
      return false;
    }

    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute()?.name;
      if (currentRoute === 'Splash' || currentRoute === 'Onboarding') {
        return false;
      }
    }

    // 4. Verify ad is loaded and not expired
    if (!this.isAppOpenAdLoaded() || !this.appOpenAd) {
      this.preloadAppOpen();
      return false;
    }

    try {
      this.isAppOpenShowing = true;
      this.appOpenAd.show();
      return true;
    } catch (error) {
      console.error('[AdService] Failed to show App Open ad:', error);
      this.isAppOpenShowing = false;
      this.preloadAppOpen();
      return false;
    }
  }

  /**
   * Suppresses App Open ads for a specified duration.
   * Call before launching system pickers (e.g. ImagePicker) so returning doesn't trigger an ad.
   */
  public suppressAppOpenAd(durationMs: number = 60000): void {
    this.appOpenSuppressedUntil = Date.now() + durationMs;
  }

  public clearAppOpenAdSuppression(): void {
    this.appOpenSuppressedUntil = 0;
  }

  /**
   * Sets up background-to-foreground AppState listener to automatically trigger App Open ads.
   */
  public setupAppOpenAds(): () => void {
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const isComingFromBackground =
        this.currentAppState.match(/inactive|background/) &&
        nextAppState === 'active';

      this.currentAppState = nextAppState;

      if (isComingFromBackground) {
        this.showAppOpenAdIfAvailable();
      }
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);
    this.appStateSubscription = sub;

    return () => {
      sub.remove();
      this.appStateSubscription = null;
    };
  }

  private cleanupAppOpenSubscriptions() {
    this.appOpenUnsubscribers.forEach(unsub => unsub());
    this.appOpenUnsubscribers = [];
  }
}

export const adService = AdService.getInstance();
export default adService;

