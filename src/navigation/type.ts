import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  AllFestivals: undefined;
  ReadingScreen: undefined;
  Jap: undefined;
  SearchScreen: undefined;
  TempleScreen: { items: any[] };
};

export type BottomTabParamList = {
  Home: undefined;
  Jap: undefined;
  Book: undefined;
  Profile: undefined;
};
