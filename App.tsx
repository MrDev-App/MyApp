import { AppStateStatus, StatusBar, AppState } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from '@navigation/StackNavigation';
import mobileAds from 'react-native-google-mobile-ads';
import notifee, { EventType } from '@notifee/react-native';
import {
  initNotifications,
  handleNotificationClick,
  recordDeliveredNotification,
} from '@services/notificationService';
import { navigationRef } from '@navigation/navigationRef';
import ErrorBoundary from '@components/ErrorBoundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  AppOpenAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const appOpenAdUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-7403088686757883/2765782561';

const App = () => {
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
        loadAd(); // reload immediately so next foreground has an ad ready
      },
    );

    loadAd(); // initial load on cold start (don't show yet, just preload)

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

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Mobile Ads SDK initialized:', adapterStatuses);
      })
      .catch(err => {
        console.warn('Mobile Ads initialization error:', err);
      });

    initNotifications();

    notifee.getInitialNotification().then(initial => {
      if (initial && initial.notification) {
        handleNotificationClick(initial.notification);
      }
    });

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) {
        handleNotificationClick(detail.notification);
      } else if (type === EventType.DELIVERED && detail.notification) {
        recordDeliveredNotification(detail.notification);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
            <StackNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
