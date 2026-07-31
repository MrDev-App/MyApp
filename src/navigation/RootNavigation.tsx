import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import { RootStackParams, StackNavigationProps } from './type';
import AuthNavigation from './AuthNavigation';

const Stack = createNativeStackNavigator<RootStackParams>;

const RootNavigation = (props: StackNavigationProps) => {
  const { isFirstLaunch, userToken, userProfile } = props;

  return (
    <NavigationContainer>
      {userToken ? (
        <StackNavigation userToken={userToken} isFirstLaunch={isFirstLaunch} />
      ) : (
        <AuthNavigation isFirstLaunch={isFirstLaunch} />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
