import AsyncStorage from '@react-native-async-storage/async-storage';
export const KEY = {
  USER_TOKEN: 'USER_TOKEN',
  THEME: 'THEME',
  IS_FIRST_LAUNCH: 'IS_FIRST_LAUNCH',
  USER_PROFILE: 'USER_PROFILE',
} as const;

export interface StorageKeysMap {
  [KEY.USER_TOKEN]: string;
  [KEY.THEME]: 'light' | 'dark';
  [KEY.IS_FIRST_LAUNCH]: boolean;
  [KEY.USER_PROFILE]: { id: number; name: string };
}

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (error) {
    console.error(
      `[Storage Utils] Error getting item for key "${key}":`,
      error,
    );
    return null;
  }
};

export const setItem = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(
      `[Storage Utils] Error setting item for key "${key}":`,
      error,
    );
    return false;
  }
};

export const updateItem = async <T>(
  key: string,
  value: Partial<T> | ((prev: T | null) => T),
): Promise<boolean> => {
  try {
    const existingValue = await getItem<T>(key);
    let newValue: T;

    if (typeof value === 'function') {
      newValue = (value as (prev: T | null) => T)(existingValue);
    } else if (
      existingValue &&
      typeof existingValue === 'object' &&
      !Array.isArray(existingValue) &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      newValue = { ...existingValue, ...value } as T;
    } else {
      newValue = value as T;
    }

    return await setItem(key, newValue);
  } catch (error) {
    console.error(
      `[Storage Utils] Error updating item for key "${key}":`,
      error,
    );
    return false;
  }
};

export const deleteItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(
      `[Storage Utils] Error deleting item for key "${key}":`,
      error,
    );
    return false;
  }
};

const storage = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};

export default storage;
