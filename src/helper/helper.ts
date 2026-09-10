import { Platform, Vibration } from 'react-native';

export type HapticType = 'week' | 'medium' | 'strong';

const HAPTIC_PATTERNS: Record<HapticType, number[]> = {
  week: [0, 40, 0, 0],
  medium: [0, 80, 0, 0],
  strong: [0, 150, 0, 0],
};

const isAndroid = Platform.OS === 'android';

export const triggerHaptic = (id: HapticType = 'week') => {
  try {
    if (isAndroid) {
      const vibration = HAPTIC_PATTERNS[id] || HAPTIC_PATTERNS.week;
      Vibration.vibrate(vibration);
    } else {
      Vibration.vibrate(30);
    }
  } catch {}
};

const HINDI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const toHindiNumeral = (num: number): string => {
  return num
    .toString()
    .split('')
    .map(d => HINDI_DIGITS[parseInt(d, 10)] ?? d)
    .join('');
};

export const formatPageNumber = (
  num: number,
  lang: 'en' | 'hi' = 'hi',
): string => {
  if (lang === 'en') {
    return num.toString();
  }
  return toHindiNumeral(num);
};

