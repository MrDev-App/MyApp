import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParams } from './type';

import Splash from '../screen/splash/Splash';

import AuthNavigation from './AuthNavigation';
import ProfileUpdateScreen from '../screen/profile/ProfileUpdateScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<StackParams>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
