import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import BottomNavigation from './BottomNavigation';
import CalendarScreen from '@screens/calendar/CalendarScreen';
import '@i18n/index';
import ReadingScreen from '@screens/book/ReadingScreen';
import TextReadingScreen from '@screens/book/TextReadingScreen';
import SearchScreen from '@screens/book/SearchScreen';
import NotificationScreen from '@screens/home/NotificationScreen';
// import SeedScreen from '@screens/SeedScreen';
import ProgressScreen from '@screens/jap/ProgressScreen';
import MantraScreen from '@screens/home/MantraScreen';

import ShlokScreen from '@screens/home/ShlokScreen';
import { AllArtiScreen } from '@screens/home/AllArtiScreen';
import ArtiScreen from '@screens/home/ArtiScreen';

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
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ animation: 'slide_from_right' }}
      />
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
        name="SearchScreen"
        component={SearchScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ animation: 'slide_from_right' }}
      />
      {/* <Stack.Screen
        name="SeedScreen"
        component={SeedScreen}
        options={{ animation: 'slide_from_right' }}
      /> */}
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
        name="ShlokScreen"
        component={ShlokScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
