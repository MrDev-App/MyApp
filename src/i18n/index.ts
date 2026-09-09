import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './language';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'hi',
  fallbackLng: 'hi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
