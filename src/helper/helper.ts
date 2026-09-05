import { Platform, Vibration } from 'react-native';

export const triggerHaptic = () => {
  try {
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 40, 0, 0]);
    } else {
      Vibration.vibrate(30);
    }
  } catch {}
};
