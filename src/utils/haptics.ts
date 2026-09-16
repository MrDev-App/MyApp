import { Platform, Vibration } from 'react-native';

export type HapticType =
  | 'weak'
  | 'medium'
  | 'strong'
  | 'week'
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy';

const HAPTIC_PATTERNS: Record<string, number[]> = {
  weak: [0, 40, 0, 0],
  week: [0, 40, 0, 0],
  selection: [0, 25, 0, 0],
  impactLight: [0, 30, 0, 0],
  medium: [0, 80, 0, 0],
  impactMedium: [0, 80, 0, 0],
  strong: [0, 150, 0, 0],
  impactHeavy: [0, 150, 0, 0],
};

const isAndroid = Platform.OS === 'android';

export const triggerHaptic = (id: HapticType = 'weak'): void => {
  try {
    if (isAndroid) {
      const vibration = HAPTIC_PATTERNS[id] || HAPTIC_PATTERNS.weak;
      Vibration.vibrate(vibration);
    } else {
      Vibration.vibrate(30);
    }
  } catch {}
};
