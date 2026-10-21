import { Platform } from 'react-native';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from '@react-native-firebase/remote-config';

export type UpdateInfo = {
  message?: string;
  storeUrl?: string;
  latestVersion?: string;
};

type RemoteConfigUpdateData = {
  forceUpdate?: boolean;
  minVersion?: string;
  latestVersion?: string;
  message?: string;
  storeUrl?: string;
};

const getAppVersion = (): string => {
  try {
    const DeviceInfo = require('react-native-device-info');
    if (DeviceInfo && typeof DeviceInfo.getVersion === 'function') {
      const v = DeviceInfo.getVersion();
      if (v) return v;
    }
  } catch {}

  return '0.0.1';
};

const isOutdated = (current: string, min: string): boolean => {
  const c = current.split('.').map(Number);
  const m = min.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((c[i] || 0) < (m[i] || 0)) return true;
    if ((c[i] || 0) > (m[i] || 0)) return false;
  }
  return false;
};

const parseRemoteConfig = (
  platform: 'ios' | 'android',
): RemoteConfigUpdateData => {
  const rc = getRemoteConfig();
  const rawJson = getValue(rc, 'force_update_config').asString();

  if (!rawJson) return {};

  try {
    const data = JSON.parse(rawJson);

    const minVersion =
      platform === 'ios' ? data.ios_min_version : data.android_min_version;

    const latestVersion =
      platform === 'ios'
        ? data.ios_latest_version || data.current_ios_version || minVersion
        : data.android_latest_version ||
          data.current_android_version ||
          minVersion;

    const forceUpdate = Boolean(data.force_update_enabled);

    const message = data.update_description || data.update_message;

    const storeUrl =
      platform === 'ios' ? data.ios_store_url : data.android_store_url;

    return {
      forceUpdate,
      minVersion: minVersion ? String(minVersion) : undefined,
      latestVersion: latestVersion ? String(latestVersion) : undefined,
      message: message ? String(message) : undefined,
      storeUrl: storeUrl ? String(storeUrl) : undefined,
    };
  } catch (e) {
    console.warn('[RemoteConfig] JSON parse error for force_update_config:', e);
    return {};
  }
};

const TEST_FORCE_UPDATE = false;

export async function checkForceUpdate(): Promise<{
  blocked: boolean;
  info: UpdateInfo;
}> {
  if (TEST_FORCE_UPDATE) {
    return {
      blocked: true,
      info: {
        message: 'आगे बढ़ने के लिए कृपया ऐप का नया Version इंस्टॉल करें।',
        latestVersion: '0.0.2',
        storeUrl: 'https://apps.apple.com',
      },
    };
  }

  const platform = Platform.OS === 'ios' ? 'ios' : 'android';

  try {
    const rc = getRemoteConfig();
    rc.settings.minimumFetchIntervalMillis = __DEV__ ? 0 : 3600000;
    await fetchAndActivate(rc);
  } catch (err) {
    console.warn('[RemoteConfig] fetch error in checkForceUpdate:', err);
  }

  const cfg = parseRemoteConfig(platform);
  if (!cfg) return { blocked: false, info: {} };

  const current = getAppVersion();
  const minVersion = cfg.minVersion || '0.0.1';
  const blocked = !!cfg.forceUpdate && isOutdated(current, minVersion);

  const defaultStoreUrl =
    platform === 'ios'
      ? 'https://apps.apple.com'
      : 'https://play.google.com/store/apps/details?id=com.app.guruvani';

  return {
    blocked,
    info: {
      message: cfg.message,
      storeUrl: cfg.storeUrl || defaultStoreUrl,
      latestVersion: cfg.latestVersion || minVersion,
    },
  };
}
