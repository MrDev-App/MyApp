import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let timer: any = null;

    const verifyOnline = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);
        const res = await fetch('https://clients3.google.com/generate_204', {
          method: 'HEAD',
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (res.status >= 200 && res.status < 400) {
          setIsOffline(false);
          return true;
        }
      } catch {
        // still offline
      }
      return false;
    };

    const handleNetInfoChange = async (state: NetInfoState) => {
      if (state.isConnected === true) {
        setIsOffline(false);
      } else if (state.isConnected === false) {
        // Verify with actual probe to prevent simulator / stale cache false negatives
        const actuallyOnline = await verifyOnline();
        if (!actuallyOnline) {
          setIsOffline(true);
        }
      }
    };

    // Initial check
    NetInfo.fetch().then(handleNetInfoChange);

    // Native event listener (OS pushes network changes with zero polling overhead)
    const unsubscribe = NetInfo.addEventListener(handleNetInfoChange);

    // Check on app coming to foreground
    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          NetInfo.fetch().then(handleNetInfoChange);
        }
      },
    );

    return () => {
      unsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  return isOffline;
};

export default useNetworkStatus;
