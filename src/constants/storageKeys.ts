/**
 * Centralized MMKV Storage and Cache Keys
 * All keys stored in persistent storage or cache must be defined here.
 */
export const STORAGE_KEYS = {
  // App & Preferences
  ONBOARDING_COMPLETED: 'ONBOARDING_COMPLETED',
  APP_LANGUAGE: 'APP_LANGUAGE',
  HAPTICS_ENABLED: 'HAPTICS_ENABLED',
  DAILY_REMINDER_ENABLED: 'DAILY_REMINDER_ENABLED',
  REMINDER_CONFIG: 'REMINDER_CONFIG',

  // Sadhana & Japa
  JAP_TOTAL_MALA: 'JAP_TOTAL_MALA',
  JAP_TOTAL_COUNT: 'JAP_TOTAL_COUNT',
  JAP_TODAY_MALA: 'JAP_TODAY_MALA',
  JAP_TODAY_COUNT: 'JAP_TODAY_COUNT',
  JAP_LAST_DATE: 'JAP_LAST_DATE',
  JAP_HISTORY: 'JAP_HISTORY',
  CUSTOM_MANTRAS: 'CUSTOM_MANTRAS',
  CHALLENGE_STARTED: 'CHALLENGE_STARTED',
  CHALLENGE_TOTAL_DAYS: 'CHALLENGE_TOTAL_DAYS',

  // Reader & Stories
  STORY_BOOKMARKS: 'STORY_BOOKMARKS',
  STORY_PROGRESS: 'STORY_PROGRESS',
  READER_THEME: 'READER_THEME',

  // Notifications
  APP_NOTIFICATION_LIST: 'APP_NOTIFICATION_LIST',

  // Remote Data Caches (Firestore mirrors)
  EKADASHI_DATA_CACHE: 'ekadashi_2026_data_cache',
  JAP_MANTRAS_CACHE: 'jap_mantras_data_cache',
  GOD_DATA_CACHE: 'god_data_cache',
  FESTIVALS_CACHE: 'festivals_data_cache',
  CATEGORIES_CACHE: 'categories_data_cache',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
