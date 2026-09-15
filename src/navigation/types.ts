import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  AllFestivals: undefined;
  CalendarScreen: undefined;
  Calendar?: undefined;
  ReadingScreen: { storyId?: string };
  Reading?: { storyId?: string };
  TextReadingScreen: { storyId: string };
  Jap: undefined;
  SearchScreen: undefined;
  Search?: undefined;
  TempleScreen: { items: any[] };
  Temple?: { items: any[] };
  Notification: undefined;
  Notifications?: undefined;
  SeedScreen: undefined;
  Seed?: undefined;
  ProgressScreen: undefined;
  MantraScreen: { god?: any; godId?: string; allGods?: any[] };
  Mantra?: { god?: any; godId?: string; allGods?: any[] };
  ArtiScreen: { category?: any };
  ShlokScreen: { category?: any };
};

export type BottomTabParamList = {
  Home: undefined;
  Jap: undefined;
  Calendar: undefined;
  Book: undefined;
  Profile: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
