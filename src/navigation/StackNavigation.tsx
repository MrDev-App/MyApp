import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './type';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import BottomNavigation from './BottomNavigation';
import AllFestivalsScreen from '../screens/home/AllFestivalsScreen';
import '../i18n';
import ReadingScreen from '../screens/book/ReadingScreen';
import SearchScreen from '../screens/book/SearchScreen';
import TempleScreen from '../screens/home/TempleScreen';

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
        name="SearchScreen"
        component={SearchScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TempleScreen"
        component={TempleScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
