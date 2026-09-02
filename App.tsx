import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from '@navigation/StackNavigation';
import notifee, { EventType } from '@notifee/react-native';
import {
  initNotifications,
  handleNotificationClick,
  recordDeliveredNotification,
} from '@services/notificationService';
import { navigationRef } from '@navigation/navigationRef';
import ErrorBoundary from '@components/ErrorBoundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
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
