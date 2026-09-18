import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './language';
import { Storage, STORAGE_KEYS } from '@services/storageService';

const savedLanguage =
  Storage.getString(STORAGE_KEYS.APP_LANGUAGE, 'hi') || 'hi';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: savedLanguage,
  fallbackLng: 'hi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
