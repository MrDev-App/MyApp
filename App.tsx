import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Splash from './src/screen/splash/Splash';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom', 'right']}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <Splash />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
