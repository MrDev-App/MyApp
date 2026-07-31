import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './AuthContext';
import StackNavigation from './StackNavigation';
import { ActivityIndicator, View } from 'react-native';

const NavigationTree = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const RootNavigation = () => {
  return (
    <AuthProvider>
      <NavigationTree />
    </AuthProvider>
  );
};

export default RootNavigation;
