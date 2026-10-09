import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

let pendingNavigation: { name: keyof RootStackParamList; params?: any } | null =
  null;

function performNavigate(name: keyof RootStackParamList, params?: any) {
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
      // Ensure tab navigator activates the target screen
      if (params?.screen) {
        setTimeout(() => {
          try {
            if (navigationRef.isReady()) {
              navigationRef.navigate('BottomTabs', params);
            }
          } catch {}
        }, 50);
      }
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

export function onNavigationReady() {
  if (pendingNavigation) {
    const target = pendingNavigation;
    pendingNavigation = null;
    performNavigate(target.name, target.params);
  }
}

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (!navigationRef.isReady()) {
    console.log(
      `[Navigation] NavigationContainer not ready yet, queuing navigation to ${String(
        name,
      )}`,
    );
    pendingNavigation = { name, params };

    // Safety polling in case onReady callback was delayed
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (navigationRef.isReady()) {
        clearInterval(interval);
        if (pendingNavigation) {
          const target = pendingNavigation;
          pendingNavigation = null;
          performNavigate(target.name, target.params);
        }
      } else if (attempts >= 60) {
        clearInterval(interval);
      }
    }, 50);
    return;
  }

  performNavigate(name, params);
}


