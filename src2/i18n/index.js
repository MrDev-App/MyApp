import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./language";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: "en",
    // lng: I18nManager.isRTL ? 'ar' : 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
