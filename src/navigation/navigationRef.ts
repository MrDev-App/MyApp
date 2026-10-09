import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (!navigationRef.isReady()) return;

  const currentRoute = navigationRef.getCurrentRoute();

  // If opening from Splash (e.g. cold-start notification), reset stack with BottomTabs at base
  // so pressing back lands on BottomTabs instead of Splash screen!
  if (currentRoute?.name === 'Splash') {
    if (name === 'BottomTabs') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BottomTabs', params }],
        }),
      );
    } else {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'BottomTabs', params: { screen: 'Home' } },
            { name: name as any, params },
          ],
        }),
      );
    }
    return;
  }

  navigationRef.navigate(name as any, params);
}

