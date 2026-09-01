import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';
import notifee, { EventType } from '@notifee/react-native';
import {
  initNotifications,
  handleNotificationClick,
  recordDeliveredNotification,
} from './src/notifee/notifications';
import { navigationRef } from './src/navigation/navigationRef';
import ErrorBoundary from './src/components/ErrorBoundary';

import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

const App = () => {
  useEffect(() => {
    initNotifications();

    const fetchMantras = async () => {
      try {
        const db = getFirestore();
        const japMantrasSnapshot = await getDocs(collection(db, 'japMantras'));
        const japMantras = japMantrasSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        console.log(
          'Fetched Jap Mantras:',
          JSON.stringify(japMantras, null, 2),
        );
        const godMantrasSnapshot = await getDocs(collection(db, 'GodMantras'));
        const godMantras = godMantrasSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        console.log(
          'Fetched God Mantras:',
          JSON.stringify(godMantras, null, 2),
        );

        const festivalsSnapshot = await getDocs(collection(db, 'festivals'));
        const festivals = festivalsSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        console.log(
          'Fetched Festivals:',
          JSON.stringify(festivals, null, 2),
        );
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchMantras();

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
  );
};

export default App;
