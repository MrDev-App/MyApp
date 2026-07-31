// navigationHooks.ts

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  AuthParams,
  BottomTabParams,
  RootStackParams,
  StackParams,
} from './type';

export const useRootNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

export const useStackNavigation = () =>
  useNavigation<NativeStackNavigationProp<StackParams>>();

export const useAuthNavigation = () =>
  useNavigation<NativeStackNavigationProp<AuthParams>>();

export const useBottomTabNavigation = () =>
  useNavigation<BottomTabNavigationProp<BottomTabParams>>();
