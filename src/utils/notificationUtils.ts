import { Alert } from 'react-native';
import { Storage, STORAGE_KEYS } from '@services/storageService';
import {
  initNotifications,
  cancelAllReminders,
} from '@services/notificationService';
import { triggerHaptic } from '@helper/helper';
import { suppressNextAppOpenAd } from '@admob/useAppOpenAd';

export interface ToggleNotificationOptions {
  value: boolean;
  currentLanguage: 'en' | 'hi' | string;
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
  onDisabled?: () => void;
}

export const toggleNotificationReminder = async ({
  value,
  currentLanguage,
  onPermissionGranted,
  onPermissionDenied,
  onDisabled,
}: ToggleNotificationOptions): Promise<boolean> => {
  triggerHaptic('light');
  suppressNextAppOpenAd(60000);

  if (value) {
    const granted = await initNotifications();
    if (granted) {
      onPermissionGranted?.();
      return true;
    } else {
      Storage.set(STORAGE_KEYS.DAILY_REMINDER_ENABLED, false);
      onPermissionDenied?.();
      Alert.alert(
        currentLanguage === 'hi' ? 'अनुमति आवश्यक है' : 'Permission Required',
        currentLanguage === 'hi'
          ? 'सूचनाएं प्राप्त करने के लिए कृपया फ़ोन सेटिंग्स में जाकर नोटिफिकेशन की अनुमति दें।'
          : 'Please enable notification permissions in your device settings to receive daily sadhana alerts.',
      );
      return false;
    }
  } else {
    Storage.set(STORAGE_KEYS.DAILY_REMINDER_ENABLED, false);
    await cancelAllReminders();
    onDisabled?.();
    return false;
  }
};
