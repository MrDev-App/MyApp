import NativeImagePickerModule from '../../specs/NativeImagePickerModule';
import {
  suppressNextAppOpenAd,
  clearAppOpenAdSuppression,
} from '@admob/useAppOpenAd';

/**
 * Invokes the native TurboModule image picker.
 * Automatically suppresses App Open Ads while the user is choosing an image,
 * ensuring no ad pops up when returning from the photo picker.
 */
export const pickImage = async (): Promise<string | null> => {
  // Suppress App Open Ads for up to 60s while the user is selecting a photo
  suppressNextAppOpenAd(60000);

  try {
    const uri = await NativeImagePickerModule.pickImage();
    return uri || null;
  } catch (error: any) {
    if (error?.code === 'CANCELLED') {
      return null;
    }
    console.warn('ImagePickerModule error:', error);
    return null;
  } finally {
    // Keep suppressed for 3 seconds after returning to let AppState settle back to 'active'
    setTimeout(() => {
      clearAppOpenAdSuppression();
    }, 3000);
  }
};
