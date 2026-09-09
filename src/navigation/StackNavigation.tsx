import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import BottomNavigation from './BottomNavigation';
import AllFestivalsScreen from '@screens/home/AllFestivalsScreen';
import '@i18n/index';
import ReadingScreen from '@screens/book/ReadingScreen';
import TextReadingScreen from '@screens/book/TextReadingScreen';
import SearchScreen from '@screens/book/SearchScreen';
import TempleScreen from '@screens/home/TempleScreen';
import NotificationScreen from '@screens/home/NotificationScreen';
import SeedScreen from '@screens/SeedScreen';
import ProgressScreen from '@screens/jap/ProgressScreen';

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
        name="AllFestivals"
        component={AllFestivalsScreen}
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
        name="TempleScreen"
        component={TempleScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SeedScreen"
        component={SeedScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
