import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '@theme/colors';

const SeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SeedScreen</Text>
    </View>
  );
};

export default SeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.secondary,
  },
});
