import NativeImagePickerModule from '../../specs/NativeImagePickerModule';

/**
 * Invokes the native TurboModule image picker.
 * Returns the selected image file URI, or null if the user cancelled.
 */
export const pickImage = async (): Promise<string | null> => {
  try {
    const uri = await NativeImagePickerModule.pickImage();
    return uri || null;
  } catch (error: any) {
    // If the user cancelled or dismissed the picker, return null cleanly without error
    if (error?.code === 'CANCELLED') {
      return null;
    }
    console.warn('ImagePickerModule error:', error);
    return null;
  }
};
