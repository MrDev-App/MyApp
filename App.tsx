import { StatusBar, LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {
  store,
  fetchFestivals,
  fetchGodMantras,
  fetchJapMantras,
  fetchCategories,
} from './src/redux';
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
import { getUserJoinedDate } from '@services/storageService';
import { useAppOpenAd } from '@admob/useAppOpenAd';
import { isAdMobEnabled } from '@admob/adConfig';
import colors from '@theme/colors';
import NetworkBanner from '@components/NetworkBanner';

LogBox.ignoreAllLogs();

const MainApp = () => {
  useAppOpenAd(isAdMobEnabled());

  useEffect(() => {
    if (isAdMobEnabled()) {
      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          console.log('Mobile Ads SDK initialized:', adapterStatuses);
        })
        .catch(err => {
          console.warn('Mobile Ads initialization error:', err);
        });
    }

    initNotifications();
    getUserJoinedDate();

    store.dispatch(fetchFestivals());
    store.dispatch(fetchGodMantras());
    store.dispatch(fetchJapMantras());
    store.dispatch(fetchCategories());

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

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
