import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  onConfigUpdate,
} from '@react-native-firebase/remote-config';
import { HomeScreenVideoConfig } from '../types/festivalVideo';

const DEFAULT_CONFIG: HomeScreenVideoConfig = {
  featureEnabled: true,
  videos: [],
  defaultAssetKey: 'default_home_video',
};

type ConfigListener = (config: HomeScreenVideoConfig) => void;
let listeners: ConfigListener[] = [];

export async function initRemoteConfig(): Promise<HomeScreenVideoConfig> {
  const rc = getRemoteConfig();

  // In development, 0ms fetch interval fetches fresh JSON on every launch
  rc.settings.minimumFetchIntervalMillis = __DEV__ ? 0 : 3600000;

  rc.defaultConfig = {
    home_screen_festivals: JSON.stringify(DEFAULT_CONFIG),
  };

  try {
    const fetched = await fetchAndActivate(rc);
    console.log(
      '[RemoteConfig] Fetched & Activated successfully, status:',
      fetched,
    );
  } catch (error) {
    console.warn('[RemoteConfig] fetchAndActivate error:', error);
  }

  // Realtime Remote Config updates listener from Firebase
  try {
    onConfigUpdate(rc, {
      next: async () => {
        console.log('[RemoteConfig] Realtime update received from Firebase!');
        await fetchAndActivate(rc);
        const freshConfig = getHomeScreenVideoConfig();
        listeners.forEach(l => l(freshConfig));
      },
      error: err => {
        console.warn('[RemoteConfig] Realtime listener error:', err);
      },
      complete: () => {},
    });
  } catch (e) {
    console.warn('[RemoteConfig] onConfigUpdate not supported:', e);
  }

  const updatedConfig = getHomeScreenVideoConfig();
  console.log(
    '[RemoteConfig] Current Active Config:',
    JSON.stringify(updatedConfig, null, 2),
  );

  listeners.forEach(listener => {
    try {
      listener(updatedConfig);
    } catch (e) {
      console.warn('[RemoteConfig] listener error:', e);
    }
  });

  return updatedConfig;
}

export function getHomeScreenVideoConfig(): HomeScreenVideoConfig {
  try {
    const rc = getRemoteConfig();
    const raw = getValue(rc, 'home_screen_festivals').asString();
    if (!raw) return DEFAULT_CONFIG;
    return JSON.parse(raw) as HomeScreenVideoConfig;
  } catch (err) {
    console.warn('[RemoteConfig] Parse error:', err);
    return DEFAULT_CONFIG;
  }
}

export function subscribeHomeScreenVideoConfig(
  listener: ConfigListener,
): () => void {
  listeners.push(listener);
  // Send current cached value immediately
  listener(getHomeScreenVideoConfig());

  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}
