import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
