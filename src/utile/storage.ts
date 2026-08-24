import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

export const STORAGE_KEYS = {
  JAP_TOTAL_MALA: 'JAP_TOTAL_MALA',
  JAP_TOTAL_COUNT: 'JAP_TOTAL_COUNT',
  JAP_TODAY_MALA: 'JAP_TODAY_MALA',
  JAP_TODAY_COUNT: 'JAP_TODAY_COUNT',
  JAP_LAST_DATE: 'JAP_LAST_DATE',
};

const checkAndResetTodayStats = (): boolean => {
  const todayStr = new Date().toDateString();
  const lastSavedDate = storage.getString(STORAGE_KEYS.JAP_LAST_DATE) || '';
  if (lastSavedDate !== todayStr) {
    const keys = storage.getAllKeys();
    keys.forEach(key => {
      if (
        key.startsWith('JAP_TODAY_') ||
        key === STORAGE_KEYS.JAP_TODAY_MALA ||
        key === STORAGE_KEYS.JAP_TODAY_COUNT
      ) {
        storage.remove(key);
      }
    });
    storage.set(STORAGE_KEYS.JAP_LAST_DATE, todayStr);
    return true;
  }
  return false;
};

export const Storage = {
  set: (key: string, value: string | number | boolean): void => {
    checkAndResetTodayStats();
    storage.set(key, value);
  },

  getString: (key: string, defaultValue = ''): string => {
    checkAndResetTodayStats();
    return storage.getString(key) ?? defaultValue;
  },

  getNumber: (key: string, defaultValue = 0): number => {
    checkAndResetTodayStats();
    return storage.getNumber(key) ?? defaultValue;
  },

  getBoolean: (key: string, defaultValue = false): boolean => {
    checkAndResetTodayStats();
    return storage.getBoolean(key) ?? defaultValue;
  },

  delete: (key: string): void => {
    storage.remove(key);
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
    storage.clearAll();
  },
};
