import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import GradientBackground from '../components/GradientBackground';
import colors from '../utile/colors';
import Globalstyles from '../utile/GlobalStyle';
import Animated from 'react-native-reanimated';

const SplashScreen = () => {
  return (
    <GradientBackground style={Globalstyles.container}>
      <Animated.Text style={styles.omText}>ॐ</Animated.Text>
    </GradientBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  omText: {
    fontSize: 100,
    color: colors.ring,
  },
});
