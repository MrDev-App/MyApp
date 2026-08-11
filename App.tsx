import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src2/navigation/StackNavigation';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <StackNavigation />
    </NavigationContainer>
    // <RootNavigation />
  );
};

export default App;
