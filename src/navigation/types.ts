import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  AllFestivals: undefined;
  ReadingScreen: { storyId?: string };
  Reading?: { storyId?: string };
  Jap: undefined;
  SearchScreen: undefined;
  Search?: undefined;
  TempleScreen: { items: any[] };
  Temple?: { items: any[] };
  Notification: undefined;
  Notifications?: undefined;
  SeedScreen: undefined;
  Seed?: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Jap: undefined;
  Book: undefined;
  Profile: undefined;
};
