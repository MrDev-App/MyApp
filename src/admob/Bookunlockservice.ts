import { Storage } from '@services/storageService';

const UNLOCK_KEY_PREFIX = 'book_unlock_';

const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isBookUnlockedToday = (storyId: string): boolean => {
  const unlockedDate = Storage.getString(`${UNLOCK_KEY_PREFIX}${storyId}`);
  return unlockedDate === getTodayDateString();
};

export const markBookUnlockedToday = (storyId: string): void => {
  Storage.set(`${UNLOCK_KEY_PREFIX}${storyId}`, getTodayDateString());
};
