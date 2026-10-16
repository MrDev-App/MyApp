import { NativeModules } from 'react-native';
import NativeSharedStorage from '../../specs/NativeSharedStorage';
import { Storage, STORAGE_KEYS } from './storageService';
import { logChant } from './namejapService';

const MALA_BEAD_COUNT = 108;

export const setSharedItem = async (
  key: string,
  value: string,
): Promise<boolean> => {
  try {
    if (
      NativeSharedStorage &&
      typeof NativeSharedStorage.setItem === 'function'
    ) {
      return await NativeSharedStorage.setItem(key, value);
    }
  } catch (e) {}

  try {
    if (
      NativeModules.SharedStorage &&
      typeof NativeModules.SharedStorage.setItem === 'function'
    ) {
      return await NativeModules.SharedStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('[WidgetService] Failed to setSharedItem:', e);
  }
  return false;
};

export const getSharedItem = async (key: string): Promise<string | null> => {
  try {
    if (
      NativeSharedStorage &&
      typeof NativeSharedStorage.getItem === 'function'
    ) {
      return await NativeSharedStorage.getItem(key);
    }
  } catch (e) {
    // Fall back to bridge module
  }

  try {
    if (
      NativeModules.SharedStorage &&
      typeof NativeModules.SharedStorage.getItem === 'function'
    ) {
      return await NativeModules.SharedStorage.getItem(key);
    }
  } catch (e) {
    console.warn('[WidgetService] Failed to getSharedItem:', e);
  }
  return null;
};

export interface WidgetSyncResult {
  synced: boolean;
  addedChants: number;
  newBeadCount: number;
  targetMantraId: string;
}

export const syncWidgetChants = async (
  currentMantraId: string,
): Promise<WidgetSyncResult> => {
  try {
    Storage.checkAndResetTodayStats();

    const pendingStr = await getSharedItem('widgetTapsPending');
    const pendingCount = pendingStr ? parseInt(pendingStr, 10) : 0;

    const widgetCountStr = await getSharedItem('count');
    const widgetBeadCount = widgetCountStr ? parseInt(widgetCountStr, 10) : 0;
    const normalizedBeadCount = isNaN(widgetBeadCount)
      ? 0
      : widgetBeadCount % MALA_BEAD_COUNT;

    const storedMantraId = await getSharedItem('mantraId');
    const targetMantraId = storedMantraId || currentMantraId;

    if (pendingCount > 0) {
      // 1. Log all pending chants to MMKV & history
      logChant(targetMantraId, pendingCount);

      // 2. Reset pending taps in shared widget storage
      await setSharedItem('widgetTapsPending', '0');

      // 3. Keep widget today totals in sync with global totals of all mantras
      await setSharedItem(
        'todayCount',
        String(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0)),
      );
      await setSharedItem(
        'todayMala',
        String(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA, 0)),
      );

      return {
        synced: true,
        addedChants: pendingCount,
        newBeadCount: normalizedBeadCount,
        targetMantraId,
      };
    }

    return {
      synced: false,
      addedChants: 0,
      newBeadCount: normalizedBeadCount,
      targetMantraId,
    };
  } catch (err) {
    console.error('[WidgetService] Error during syncWidgetChants:', err);
    return {
      synced: false,
      addedChants: 0,
      newBeadCount: 0,
      targetMantraId: currentMantraId,
    };
  }
};
