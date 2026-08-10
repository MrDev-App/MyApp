import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabParams } from './type';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home/HomeScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

const Tabs = createBottomTabNavigator<BottomTabParams>();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
