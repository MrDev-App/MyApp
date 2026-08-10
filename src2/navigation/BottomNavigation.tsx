import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import JapScreen from '../screens/jap/JapScreen';
import BookScreen from '../screens/book/BookScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import { BottomTabParamList } from './type';
import { CustomTabBar } from './BottomTabs';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jap" component={JapScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
