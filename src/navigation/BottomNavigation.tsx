import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/home/HomeScreen';
import JapScreen from '@screens/jap/JapScreen';
import BookScreen from '@screens/book/BookScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import CalendarScreen from '@screens/calendar/CalendarScreen';
import { BottomTabParamList } from '@navigation/types';
import { CustomTabBar } from './BottomTabs';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jap" component={JapScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
