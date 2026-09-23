import { CategoryItem } from '@services/firebaseServices/categoriesService';
import { TempleItem } from '@constants/templesData';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  CalendarScreen: undefined;
  Calendar?: undefined;
  ReadingScreen: { storyId?: string };
  Reading?: { storyId?: string };
  TextReadingScreen: { storyId: string };
  SearchScreen: undefined;
  Search?: undefined;
  Notification: undefined;
  Notifications?: undefined;
  SeedScreen: undefined;
  Seed?: undefined;
  ProgressScreen: undefined;
  MantraScreen: { god?: any; godId?: string; allGods?: any[] };
  ArtiScreen: { arti: CategoryItem };
  AllArtiScreen: { category?: any };
  AllShlokasScreen: { category?: any };
  ShlokaCategoryDetailScreen: { category?: any };
  ShlokaVerseListScreen: { subcategory?: any; category?: any };
  ShlokScreen?: { category?: any };
  TempleScreen: undefined;
  TempleDetailScreen: { temple: TempleItem };
  ReminderScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Jap: undefined;
  Calendar: undefined;
  Book: undefined;
  Profile: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
