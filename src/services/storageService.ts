import { createMMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '@constants/storageKeys';

const mmkvStorage = createMMKV();

const checkAndResetTodayStats = (): boolean => {
  const todayStr = new Date().toDateString();
  const lastSavedDate = mmkvStorage.getString(STORAGE_KEYS.JAP_LAST_DATE) || '';
  if (lastSavedDate !== todayStr) {
    const keys = mmkvStorage.getAllKeys();
    keys.forEach(key => {
      if (
        key.startsWith('JAP_TODAY_') ||
        key === STORAGE_KEYS.JAP_TODAY_MALA ||
        key === STORAGE_KEYS.JAP_TODAY_COUNT
      ) {
        mmkvStorage.remove(key);
      }
    });
    mmkvStorage.set(STORAGE_KEYS.JAP_LAST_DATE, todayStr);
    return true;
  }
  return false;
};

export const Storage = {
  set: (key: string, value: string | number | boolean): void => {
    checkAndResetTodayStats();
    mmkvStorage.set(key, value);
  },

  getString: (key: string, defaultValue = ''): string => {
    checkAndResetTodayStats();
    return mmkvStorage.getString(key) ?? defaultValue;
  },

  getNumber: (key: string, defaultValue = 0): number => {
    checkAndResetTodayStats();
    return mmkvStorage.getNumber(key) ?? defaultValue;
  },

  getBoolean: (key: string, defaultValue = false): boolean => {
    checkAndResetTodayStats();
    return mmkvStorage.getBoolean(key) ?? defaultValue;
  },

  delete: (key: string): void => {
    mmkvStorage.remove(key);
  },

  /**
   * Run the date check and reset today's keys if the date has changed.
   * Returns true if today's stats were reset, false otherwise.
   */
  checkAndResetTodayStats: (): boolean => {
    return checkAndResetTodayStats();
  },

  /**
   * Clear all values from storage
   */
  clearAll: (): void => {
    mmkvStorage.clearAll();
  },
};

export default Storage;
export { STORAGE_KEYS };
