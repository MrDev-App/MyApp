import i18n from '@i18n/index';
import { Translation } from '@i18n/language';

export const monthTranslationKeys = [
  Translation.MONTH_JANUARY,
  Translation.MONTH_FEBRUARY,
  Translation.MONTH_MARCH,
  Translation.MONTH_APRIL,
  Translation.MONTH_MAY,
  Translation.MONTH_JUNE,
  Translation.MONTH_JULY,
  Translation.MONTH_AUGUST,
  Translation.MONTH_SEPTEMBER,
  Translation.MONTH_OCTOBER,
  Translation.MONTH_NOVEMBER,
  Translation.MONTH_DECEMBER,
];

export const shortMonthTranslationKeys = [
  Translation.MONTH_JAN_SHORT,
  Translation.MONTH_FEB_SHORT,
  Translation.MONTH_MAR_SHORT,
  Translation.MONTH_APR_SHORT,
  Translation.MONTH_MAY_SHORT,
  Translation.MONTH_JUN_SHORT,
  Translation.MONTH_JUL_SHORT,
  Translation.MONTH_AUG_SHORT,
  Translation.MONTH_SEP_SHORT,
  Translation.MONTH_OCT_SHORT,
  Translation.MONTH_NOV_SHORT,
  Translation.MONTH_DEC_SHORT,
];

export const weekdayTranslationKeys = [
  Translation.WEEKDAY_SUN_SHORT,
  Translation.WEEKDAY_MON_SHORT,
  Translation.WEEKDAY_TUE_SHORT,
  Translation.WEEKDAY_WED_SHORT,
  Translation.WEEKDAY_THU_SHORT,
  Translation.WEEKDAY_FRI_SHORT,
  Translation.WEEKDAY_SAT_SHORT,
];

export const dayNameTranslationKeys = [
  Translation.DAY_SUNDAY,
  Translation.DAY_MONDAY,
  Translation.DAY_TUESDAY,
  Translation.DAY_WEDNESDAY,
  Translation.DAY_THURSDAY,
  Translation.DAY_FRIDAY,
  Translation.DAY_SATURDAY,
];

/**
 * Get all 12 month names dynamically for any language (en, hi, gu, mr, etc.)
 */
export const getMonthsList = (lng: string = i18n.language): string[] =>
  monthTranslationKeys.map(key => i18n.t(key, { lng }));

/**
 * Get all 12 short month names dynamically for any language
 */
export const getShortMonthsList = (lng: string = i18n.language): string[] =>
  shortMonthTranslationKeys.map(key => i18n.t(key, { lng }));

/**
 * Get all 7 short weekday names dynamically for any language
 */
export const getWeekdaysList = (lng: string = i18n.language): string[] =>
  weekdayTranslationKeys.map(key => i18n.t(key, { lng }));

/**
 * Get all 7 full day names dynamically for any language
 */
export const getDayNamesList = (lng: string = i18n.language): string[] =>
  dayNameTranslationKeys.map(key => i18n.t(key, { lng }));

/**
 * Get Month Name by 1-based index (1 = Jan, 12 = Dec) for ANY language
 */
export const getMonthName = (
  monthNum: number,
  currentLanguage: string = i18n.language,
): string => {
  const index = Math.max(0, Math.min(11, monthNum - 1));
  return i18n.t(monthTranslationKeys[index], { lng: currentLanguage });
};

/**
 * Get Short Month Name by 1-based index (1 = Jan, 12 = Dec) for ANY language
 */
export const getMonthShortName = (
  monthNum: number,
  currentLanguage: string = i18n.language,
): string => {
  const index = Math.max(0, Math.min(11, monthNum - 1));
  return i18n.t(shortMonthTranslationKeys[index], { lng: currentLanguage });
};

/**
 * Get Short Weekday Name by 0-based index (0 = Sun, 6 = Sat) for ANY language
 */
export const getWeekdayName = (
  dayIndex: number,
  currentLanguage: string = i18n.language,
): string => {
  const index = Math.max(0, Math.min(6, dayIndex));
  return i18n.t(weekdayTranslationKeys[index], { lng: currentLanguage });
};

/**
 * Get Full Day Name by 0-based index (0 = Sunday, 6 = Saturday) for ANY language
 */
export const getDayFullName = (
  dayIndex: number,
  currentLanguage: string = i18n.language,
): string => {
  const index = Math.max(0, Math.min(6, dayIndex));
  return i18n.t(dayNameTranslationKeys[index], { lng: currentLanguage });
};

/**
 * Configures react-native-calendars LocaleConfig dynamically for any language code
 */
export const getCalendarLocaleConfig = (lng: string = i18n.language) => ({
  monthNames: getMonthsList(lng),
  monthNamesShort: getShortMonthsList(lng),
  dayNames: getDayNamesList(lng),
  dayNamesShort: getWeekdaysList(lng),
  today: i18n.t(Translation.TODAY, { lng }) || 'Today',
});

// Backward-compatibility exports (deprecated: prefer getMonthsList / getMonthName)
export const monthsEn = getMonthsList('en');
export const monthsHi = getMonthsList('hi');
export const weekdaysEn = getWeekdaysList('en');
export const weekdaysHi = getWeekdaysList('hi');
export const dayNamesEn = getDayNamesList('en');
export const dayNamesHi = getDayNamesList('hi');
