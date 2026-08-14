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
    storage.remove(STORAGE_KEYS.JAP_TODAY_MALA);
    storage.remove(STORAGE_KEYS.JAP_TODAY_COUNT);
    storage.set(STORAGE_KEYS.JAP_LAST_DATE, todayStr);
    return true;
  }
  return false;
};

export const Storage = {
  /**
   * Set a value in storage (string, number, or boolean)
   */
  set: (key: string, value: string | number | boolean): void => {
    checkAndResetTodayStats();
    storage.set(key, value);
  },

  /**
   * Get a string value with a default fallback
   */
  getString: (key: string, defaultValue = ''): string => {
    checkAndResetTodayStats();
    return storage.getString(key) ?? defaultValue;
  },

  /**
   * Get a number value with a default fallback
   */
  getNumber: (key: string, defaultValue = 0): number => {
    checkAndResetTodayStats();
    return storage.getNumber(key) ?? defaultValue;
  },

  /**
   * Get a boolean value with a default fallback
   */
  getBoolean: (key: string, defaultValue = false): boolean => {
    checkAndResetTodayStats();
    return storage.getBoolean(key) ?? defaultValue;
  },

  /**
   * Delete a key from storage
   */
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
