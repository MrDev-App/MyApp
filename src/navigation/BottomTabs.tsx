import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParams } from './type';
import HomeScreen from '../screen/home/HomeScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

const Tabs = createBottomTabNavigator<BottomTabParams>();

const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
