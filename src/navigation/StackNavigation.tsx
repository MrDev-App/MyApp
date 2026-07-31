import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProps, StackParams } from './type';

import Splash from '../screen/splash/Splash';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator<StackParams>();

const StackNavigation: React.FC<StackNavigationProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
