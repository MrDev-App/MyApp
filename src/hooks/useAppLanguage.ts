import { useTranslation } from 'react-i18next';

export type SupportedLanguage = 'en' | 'hi';

export interface AppLanguageState {
  currentLanguage: SupportedLanguage;
  lang: SupportedLanguage;
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
  const rawLanguage = i18n.language || 'en';
  const isHindi = rawLanguage.startsWith('hi');
  const currentLanguage: SupportedLanguage = isHindi ? 'hi' : 'en';
  const lang = currentLanguage;

  const changeLanguage = async (newLng: SupportedLanguage) => {
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
    lang,
    rawLanguage,
    isHindi,
    t,
    i18n,
    changeLanguage,
    select,
  };
};

export default useAppLanguage;
