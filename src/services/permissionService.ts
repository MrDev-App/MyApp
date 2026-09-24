import { Platform, PermissionsAndroid, Permission } from 'react-native';
import i18n from 'i18next';
import { Translation } from '@i18n/language';

export interface PermissionDialogOptions {
  title?: string;
  message?: string;
  buttonNeutral?: string;
  buttonNegative?: string;
  buttonPositive?: string;
}

/**
 * Request camera access on Android (no-op on iOS, handled by Info.plist)
 */
export const requestCameraPermission = async (
  customOptions?: PermissionDialogOptions,
): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title:
          customOptions?.title || i18n.t(Translation.PERMISSION_CAMERA_TITLE),
        message:
          customOptions?.message ||
          i18n.t(Translation.PERMISSION_CAMERA_MESSAGE),
        buttonNeutral:
          customOptions?.buttonNeutral ||
          i18n.t(Translation.PERMISSION_ASK_LATER),
        buttonNegative:
          customOptions?.buttonNegative || i18n.t(Translation.PERMISSION_CANCEL),
        buttonPositive:
          customOptions?.buttonPositive || i18n.t(Translation.PERMISSION_ALLOW),
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn('[PermissionService] requestCameraPermission error:', error);
    return false;
  }
};

/**
 * Check if camera permission is already granted on Android
 */
export const checkCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
};

/**
 * Request media/photo storage access on Android
 */
export const requestMediaPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    // Android 13+ (API 33+) uses READ_MEDIA_IMAGES
    if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      );
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.warn('[PermissionService] requestMediaPermission error:', error);
    return false;
  }
};

/**
 * Generic Android permission requester with optional rationale dialog
 */
export const requestPermission = async (
  permission: Permission,
  dialogOptions?: PermissionDialogOptions,
): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      permission,
      dialogOptions
        ? {
            title:
              dialogOptions.title ||
              i18n.t(Translation.PERMISSION_REQUIRED_TITLE),
            message:
              dialogOptions.message ||
              i18n.t(Translation.PERMISSION_REQUIRED_MESSAGE),
            buttonNeutral:
              dialogOptions.buttonNeutral ||
              i18n.t(Translation.PERMISSION_ASK_LATER),
            buttonNegative:
              dialogOptions.buttonNegative ||
              i18n.t(Translation.PERMISSION_CANCEL),
            buttonPositive:
              dialogOptions.buttonPositive ||
              i18n.t(Translation.PERMISSION_ALLOW),
          }
        : undefined,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn(
      `[PermissionService] requestPermission error for ${permission}:`,
      error,
    );
    return false;
  }
};

export default {
  requestCameraPermission,
  checkCameraPermission,
  requestMediaPermission,
  requestPermission,
};
