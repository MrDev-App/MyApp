const HINDI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

/**
 * Converts western arabic numbers to Hindi/Devanagari numerals.
 */
export const toHindiNumeral = (num: number): string => {
  return num
    .toString()
    .split('')
    .map(d => HINDI_DIGITS[parseInt(d, 10)] ?? d)
    .join('');
};

/**
 * Formats a page number localized according to language preference.
 */
export const formatPageNumber = (
  num: number,
  lang: 'en' | 'hi' = 'hi',
): string => {
  if (lang === 'en') {
    return num.toString();
  }
  return toHindiNumeral(num);
};
