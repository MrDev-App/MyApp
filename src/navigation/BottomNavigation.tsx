import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/home/HomeScreen';
import JapScreen from '@screens/jap/JapScreen';
import BookScreen from '@screens/book/BookScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';

import { BottomTabParamList } from '@navigation/types';
import { CustomTabBar } from './BottomTabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TabScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const isFocused = useIsFocused();
  const translateX = useSharedValue(SCREEN_WIDTH);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      // Set to off-screen right and invisible, then animate in
      translateX.value = SCREEN_WIDTH;
      opacity.value = 0;

      translateX.value = withTiming(0, {
        duration: 320,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      // Move back immediately when focus is lost
      translateX.value = SCREEN_WIDTH;
      opacity.value = 0;
    }
  }, [isFocused, translateX, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home">
        {() => (
          <TabScreenWrapper>
            <HomeScreen />
          </TabScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Jap">
        {() => (
          <TabScreenWrapper>
            <JapScreen />
          </TabScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Book">
        {() => (
          <TabScreenWrapper>
            <BookScreen />
          </TabScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => (
          <TabScreenWrapper>
            <ProfileScreen />
          </TabScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigation;
