import NativeImagePickerModule from '../../specs/NativeImagePickerModule';
import {
  suppressNextAppOpenAd,
  clearAppOpenAdSuppression,
} from '@admob/useAppOpenAd';

export const pickImage = async (): Promise<string | null> => {
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
    setTimeout(() => {
      clearAppOpenAdSuppression();
    }, 3000);
  }
};
