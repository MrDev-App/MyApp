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

  return {
    currentLanguage,
    lang,
    rawLanguage,
    isHindi,
    t,
    i18n,
    changeLanguage,
  };
};

export default useAppLanguage;
