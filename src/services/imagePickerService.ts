import NativeImagePickerModule from '../../specs/NativeImagePickerModule';
import { clearAppOpenAdSuppression } from '@admob/useAppOpenAd';

export const pickImage = async (): Promise<string | null> => {
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
