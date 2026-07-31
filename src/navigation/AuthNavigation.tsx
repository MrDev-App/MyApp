import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthParams, StackNavigationProps } from './type';
import LoginScreen from '../screen/Auth/LoginScreen';
import SignupScreen from '../screen/Auth/SignupScreen';
import OnBoarding from '../screen/Auth/OnBoarding';

const Stack = createNativeStackNavigator<AuthParams>();

const AuthNavigation: React.FC<StackNavigationProps> = ({ isFirstLaunch }) => {
  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Onboarding' : 'Login'}
      screenOptions={{ headerShown: false }}
    >
      {isFirstLaunch && (
        <Stack.Screen name="Onboarding" component={OnBoarding} />
      )}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
