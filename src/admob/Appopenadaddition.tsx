import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import {
  AppOpenAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const appOpenAdUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-7403088686757883/2765782561';

const appOpenAd = AppOpenAd.createForAdRequest(appOpenAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

useEffect(() => {
  let isAdLoaded = false;

  const loadAd = () => appOpenAd.load();

  const unsubscribeLoaded = appOpenAd.addAdEventListener(
    AdEventType.LOADED,
    () => {
      isAdLoaded = true;
    },
  );

  const unsubscribeClosed = appOpenAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      isAdLoaded = false;
      loadAd();
    },
  );

  loadAd();

  const handleAppStateChange = (nextState: AppStateStatus) => {
    if (nextState === 'active' && isAdLoaded) {
      appOpenAd.show();
    }
  };

  const appStateSubscription = AppState.addEventListener(
    'change',
    handleAppStateChange,
  );

  return () => {
    unsubscribeLoaded();
    unsubscribeClosed();
    appStateSubscription.remove();
  };
}, []);
