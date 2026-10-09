import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import BottomNavigation from './BottomNavigation';

import '@i18n/index';
import ReadingScreen from '@screens/book/ReadingScreen';
import TextReadingScreen from '@screens/book/TextReadingScreen';
import BookListScreen from '@screens/book/BookListScreen';
import SearchScreen from '@screens/book/SearchScreen';
import NotificationScreen from '@screens/home/NotificationScreen';
import ProgressScreen from '@screens/jap/ProgressScreen';
import MantraScreen from '@screens/home/MantraScreen';

import { AllShlokasScreen } from '@screens/shlok/AllShlokasScreen';
import { ShlokaCategoryDetailScreen } from '@screens/shlok/ShlokaCategoryDetailScreen';
import { ShlokaVerseListScreen } from '@screens/shlok/ShlokaVerseListScreen';
import TempleScreen from '@screens/temple/TempleScreen';
import TempleDetailScreen from '@screens/temple/TempleDetailScreen';
import { AllArtiScreen } from '@screens/home/AllArtiScreen';
import ArtiScreen from '@screens/home/ArtiScreen';
import ReminderScreen from '@screens/profile/ReminderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />

      <Stack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TextReadingScreen"
        component={TextReadingScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BookListScreen"
        component={BookListScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MantraScreen"
        component={MantraScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="AllArtiScreen"
        component={AllArtiScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="ArtiScreen"
        component={ArtiScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="AllShlokasScreen"
        component={AllShlokasScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ShlokaCategoryDetailScreen"
        component={ShlokaCategoryDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ShlokaVerseListScreen"
        component={ShlokaVerseListScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ShlokScreen"
        component={AllShlokasScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TempleScreen"
        component={TempleScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TempleDetailScreen"
        component={TempleDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
