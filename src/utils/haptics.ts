import { Platform, Vibration } from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

export type HapticType =
  | 'weak'
  | 'medium'
  | 'strong'
  | 'week'
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'light'
  | 'soft'
  | 'rigid'
  | 'error'
  | 'warning'
  | 'success';

const ANDROID_PATTERNS: Record<string, number[]> = {
  weak: [0, 40, 0, 0],
  week: [0, 40, 0, 0],
  selection: [0, 25, 0, 0],
  impactLight: [0, 30, 0, 0],
  light: [0, 30, 0, 0],
  soft: [0, 25, 0, 0],
  medium: [0, 80, 0, 0],
  impactMedium: [0, 80, 0, 0],
  rigid: [0, 60, 0, 0],
  strong: [0, 150, 0, 0],
  impactHeavy: [0, 150, 0, 0],
  error: [0, 100, 50, 100],
  warning: [0, 80, 40, 80],
  success: [0, 40, 30, 40],
};

const IOS_HAPTIC_MAP: Record<string, HapticFeedbackTypes> = {
  weak: HapticFeedbackTypes.impactLight,
  week: HapticFeedbackTypes.impactLight,
  light: HapticFeedbackTypes.impactLight,
  selection: HapticFeedbackTypes.selection,
  impactLight: HapticFeedbackTypes.impactLight,
  soft: HapticFeedbackTypes.soft,
  medium: HapticFeedbackTypes.impactMedium,
  impactMedium: HapticFeedbackTypes.impactMedium,
  rigid: HapticFeedbackTypes.rigid,
  strong: HapticFeedbackTypes.impactHeavy,
  impactHeavy: HapticFeedbackTypes.impactHeavy,
  error: HapticFeedbackTypes.notificationError,
  warning: HapticFeedbackTypes.notificationWarning,
  success: HapticFeedbackTypes.notificationSuccess,
};

const defaultIosOptions: HapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

const isAndroid = Platform.OS === 'android';

export const triggerHaptic = (
  id: HapticType = 'weak',
  options?: HapticOptions,
): void => {
  try {
    if (isAndroid) {
      const pattern = ANDROID_PATTERNS[id] || ANDROID_PATTERNS.weak;
      Vibration.vibrate(pattern);
    } else {
      const iosFeedbackType =
        IOS_HAPTIC_MAP[id] || HapticFeedbackTypes.impactLight;
      ReactNativeHapticFeedback.trigger(iosFeedbackType, {
        ...defaultIosOptions,
        ...options,
      });
    }
  } catch {}
};

export { ReactNativeHapticFeedback, HapticFeedbackTypes };
