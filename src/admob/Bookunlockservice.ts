import { Storage } from '@services/storageService';
import { isAdMobEnabled } from './adConfig';

const UNLOCK_KEY_PREFIX = 'book_unlock_';

const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isBookUnlockedToday = (storyId: string): boolean => {
  // If AdMob is disabled in release, all books are unlocked automatically
  if (!isAdMobEnabled()) {
    return true;
  }
  const unlockedDate = Storage.getString(`${UNLOCK_KEY_PREFIX}${storyId}`);
  return unlockedDate === getTodayDateString();
};

export const markBookUnlockedToday = (storyId: string): void => {
  Storage.set(`${UNLOCK_KEY_PREFIX}${storyId}`, getTodayDateString());
};  



