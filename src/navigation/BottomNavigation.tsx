import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/home/HomeScreen';
import JapScreen from '@screens/jap/JapScreen';
import BookScreen from '@screens/book/BookScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import GameScreen from '@screens/game/GameScreen';
import { BottomTabParamList } from '@navigation/types';
import { CustomTabBar } from './BottomTabs';
import { consumePendingDeepLink } from '@services/deepLinkService';
import { InteractionManager } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

const BottomNavigation = () => {
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      consumePendingDeepLink();
    });
    return () => task.cancel();
  }, []);

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
      <Tab.Screen name="Game" component={GameScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
