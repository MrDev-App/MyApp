import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleNetInfoChange = (state: NetInfoState) => {
      // isConnected is false when network is turned off
      const offline = state.isConnected === false;
      setIsOffline(offline);
    };

    // Initial check
    NetInfo.fetch().then(handleNetInfoChange);

    // Native event listener
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

  // While offline, poll NetInfo every 1.5s to immediately detect when internet is restored on iOS
  useEffect(() => {
    if (!isOffline) return;

    const interval = setInterval(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected === true) {
          setIsOffline(false);
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isOffline]);

  return isOffline;
};

export default useNetworkStatus;
