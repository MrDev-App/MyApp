import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  AllFestivals: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Jap: undefined;
  Book: undefined;
  Profile: undefined;
};
