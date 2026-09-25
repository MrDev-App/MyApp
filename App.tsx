import { StatusBar, LogBox, InteractionManager } from 'react-native';
import React, { useEffect, useRef } from 'react';
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
import colors from '@theme/colors';
import NetworkBanner from '@components/NetworkBanner';
import { getFestivalData } from '@services/firebaseServices/getFestivalData';
import { getGodData } from '@services/firebaseServices/godMantras';
import { initRemoteConfig } from '@services/remoteConfigService';

import { getApp } from '@react-native-firebase/app';
import { getAnalytics, logScreenView } from '@react-native-firebase/analytics';

LogBox.ignoreAllLogs();

const App = () => {
  useAppOpenAd(isAdMobEnabled());
  const routeNameRef = useRef<string | undefined>(undefined);
  const analyticsInstance = useRef(getAnalytics(getApp())).current;

  useEffect(() => {
    initRemoteConfig().catch(err => {
      console.warn('Remote Config init error:', err);
    });

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

    return () => {
      interactionPromise.cancel();
      unsubscribe();
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
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.getCurrentRoute()?.name;

              if (previousRouteName !== currentRouteName && currentRouteName) {
                await logScreenView(analyticsInstance, {
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
                routeNameRef.current = currentRouteName;
              }
            }}
          >
            <StackNavigation />
            <NetworkBanner />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
