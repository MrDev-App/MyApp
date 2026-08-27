import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import { initNotifications } from './src/notifee/notifications';

const App = () => {
  useEffect(() => {
    initNotifications();

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Foreground tap:', detail.notification?.id);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
