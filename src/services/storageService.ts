import { createMMKV } from 'react-native-mmkv';
import { AppState } from 'react-native';
import { STORAGE_KEYS } from '@constants/storageKeys';

const mmkvStorage = createMMKV();

/**
 * Module-level session flag — ensures the expensive getAllKeys() scan runs
 * at most ONCE per app launch, not on every Storage.get/set call.
 * Reset when the app returns to foreground so a midnight date-change is caught.
 */
let _todayResetChecked = false;

AppState.addEventListener('change', nextState => {
  if (nextState === 'active') {
    _todayResetChecked = false;
  }
});

const checkAndResetTodayStats = (): boolean => {
  if (_todayResetChecked) return false; // short-circuit after first pass per session
  _todayResetChecked = true;

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
    mmkvStorage.set(key, value);
  },

  getString: (key: string, defaultValue = ''): string => {
    return mmkvStorage.getString(key) ?? defaultValue;
  },

  getNumber: (key: string, defaultValue = 0): number => {
    return mmkvStorage.getNumber(key) ?? defaultValue;
  },

  getBoolean: (key: string, defaultValue = false): boolean => {
    return mmkvStorage.getBoolean(key) ?? defaultValue;
  },

  /**
   * Typed JSON helper. Parses stored JSON and returns it as T.
   * On corrupt/missing data: logs the error, removes the bad key, returns fallback.
   * Use this instead of raw JSON.parse(Storage.getString(...)) everywhere.
   */
  getJSON: <T>(key: string, fallback: T): T => {
    try {
      const raw = mmkvStorage.getString(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch (e) {
      console.error(`[Storage] Corrupted JSON at key "${key}" — resetting.`, e);
      mmkvStorage.remove(key);
      return fallback;
    }
  },

  /**
   * Removes a key from storage.
   * Does NOT trigger the daily reset check (intentional — use
   * Storage.checkAndResetTodayStats() explicitly when needed).
   */
  delete: (key: string): void => {
    mmkvStorage.remove(key);
  },

  /**
   * Run the date check and reset today's keys if the date has changed.
   * Returns true if today's stats were reset, false otherwise.
   * Call this explicitly at app startup and on screen focus — not on every read/write.
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

  /**
   * Get or initialize the user joined date in MMKV.
   * On first launch, saves the current ISO date and preserves it.
   */
  getUserJoinedDate: (): string => {
    let joinedDate = mmkvStorage.getString(STORAGE_KEYS.USER_JOINED_DATE);
    if (!joinedDate) {
      joinedDate = new Date().toISOString();
      mmkvStorage.set(STORAGE_KEYS.USER_JOINED_DATE, joinedDate);
    }
    return joinedDate;
  },
};

export const getUserJoinedDate = (): string => Storage.getUserJoinedDate();

export default Storage;
export { STORAGE_KEYS };
