import { useTranslation } from 'react-i18next';
import { Storage, STORAGE_KEYS } from '@services/storageService';

export type SupportedLanguage = 'en' | 'hi';

export interface AppLanguageState {
  currentLanguage: SupportedLanguage;
  rawLanguage: string;
  isHindi: boolean;
  t: (key: string, options?: any) => string;
  i18n: any;
  changeLanguage: (lng: SupportedLanguage) => Promise<void>;
  /**
   * Helper to select value based on current active language with automatic fallback
   * @example select(item.hindiName, item.englishName)
   */
  select: <T>(hiVal: T, enVal: T) => T;
}

/**
 * Custom hook to access language state, locale flags, and translation helpers
 * eliminating repeated i18n boilerplate across screens.
 */
export const useAppLanguage = (): AppLanguageState => {
  const { t, i18n } = useTranslation();
  const rawLanguage =
    i18n.language || Storage.getString(STORAGE_KEYS.APP_LANGUAGE, 'hi') || 'hi';
  const isHindi = rawLanguage.startsWith('hi');
  const currentLanguage: SupportedLanguage = isHindi ? 'hi' : 'en';

  const changeLanguage = async (newLng: SupportedLanguage) => {
    Storage.set(STORAGE_KEYS.APP_LANGUAGE, newLng);
    await i18n.changeLanguage(newLng);
  };

  const select = <T>(hiVal: T, enVal: T): T => {
    if (isHindi) {
      return (hiVal !== undefined && hiVal !== null && hiVal !== '' ? hiVal : enVal) as T;
    }
    return (enVal !== undefined && enVal !== null && enVal !== '' ? enVal : hiVal) as T;
  };

  return {
    currentLanguage,
    rawLanguage,
    isHindi,
    t,
    i18n,
    changeLanguage,
    select,
  };
};

export default useAppLanguage;
