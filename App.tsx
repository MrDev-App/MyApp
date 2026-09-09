import { StatusBar } from 'react-native';
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
import { getUserJoinedDate } from '@services/storageService';
import { useAppOpenAd } from '@admob/useAppOpenAd';
import { isAdMobEnabled } from '@admob/adConfig';

const App = () => {
  // Handles foreground ads with cooldown and auto-suppression during image picker
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
