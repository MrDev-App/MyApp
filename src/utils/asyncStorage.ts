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

export type StorageKey = keyof StorageKeysMap;

export const getItem = async <K extends StorageKey>(
  key: K,
): Promise<StorageKeysMap[K] | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as StorageKeysMap[K];
    } catch {
      return value as unknown as StorageKeysMap[K];
    }
  } catch (error) {
    console.error(
      `[Storage Utils] Error getting item for key "${key}":`,
      error,
    );
    return null;
  }
};

export const setItem = async <K extends StorageKey>(
  key: K,
  value: StorageKeysMap[K],
): Promise<boolean> => {
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

export const updateItem = async <K extends StorageKey>(
  key: K,
  value: Partial<StorageKeysMap[K]> | ((prev: StorageKeysMap[K] | null) => StorageKeysMap[K]),
): Promise<boolean> => {
  try {
    const existingValue = await getItem(key);
    let newValue: StorageKeysMap[K];

    if (typeof value === 'function') {
      newValue = (value as (prev: StorageKeysMap[K] | null) => StorageKeysMap[K])(existingValue);
    } else if (
      existingValue &&
      typeof existingValue === 'object' &&
      !Array.isArray(existingValue) &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      newValue = { ...(existingValue as object), ...(value as object) } as StorageKeysMap[K];
    } else {
      newValue = value as StorageKeysMap[K];
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

export const deleteItem = async (key: StorageKey): Promise<boolean> => {
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
