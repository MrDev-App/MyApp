import { StatusBar, LogBox, InteractionManager } from 'react-native';
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
import { navigationRef, onNavigationReady } from '@navigation/navigationRef';
import ErrorBoundary from '@components/ErrorBoundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  getUserJoinedDate,
  Storage,
  STORAGE_KEYS,
} from '@services/storageService';
import { setSharedItem } from '@services/widgetService';
import { syncDailyQuoteToWidget } from '@services/quoteService';
import { useAppOpenAd } from '@admob/useAppOpenAd';
import { isAdMobEnabled } from '@admob/adConfig';
import colors from '@theme/colors';
import NetworkBanner from '@components/NetworkBanner';
import { getFestivalData, initFestivalBackgroundSync } from '@api/festivalApi';
import { getGodData } from '@api/godMantrasApi';
import { initRemoteConfig } from '@services/remoteConfigService';
import { initDeepLinks } from '@services/deepLinkService';

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    const stopDeepLinks = initDeepLinks();

    Storage.checkAndResetTodayStats();
    const savedLang =
      Storage.getString(STORAGE_KEYS.APP_LANGUAGE, 'hi') || 'hi';
    setSharedItem('appLanguage', savedLang);
    setSharedItem(
      'todayCount',
      String(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0)),
    );
    setSharedItem(
      'todayMala',
      String(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA, 0)),
    );
    syncDailyQuoteToWidget(savedLang);

    initRemoteConfig().catch(err => {
      console.warn('Remote Config init error:', err);
    });

    if (isAdMobEnabled()) {
      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          if (__DEV__) {
            console.log('Mobile Ads SDK initialized:', adapterStatuses);
          }
        })
        .catch(err => {
          console.warn('Mobile Ads initialization error:', err);
        });
    }

    initNotifications();
    getUserJoinedDate();

    // Fetch and persist from Firestore in the background after initial UI interactions/animations finish
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      getFestivalData();
      getGodData();
    });

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

    // Controlled background sync with 5-min cooldown (C1 fix)
    const stopFestivalSync = initFestivalBackgroundSync();

    return () => {
      interactionPromise.cancel();
      unsubscribe();
      stopFestivalSync();
      stopDeepLinks();
    };
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.primary }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ErrorBoundary>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StackNavigation />
            <NetworkBanner />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
