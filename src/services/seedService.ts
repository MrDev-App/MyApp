import {
  getStorage,
  ref,
  putFile,
  getDownloadURL,
} from '@react-native-firebase/storage';
import { Image } from 'react-native';

/**
 * Uploads a local require image to Firebase Storage and returns its download URL.
 * Checks if the file already exists first; if so, returns existing URL.
 */
export const uploadLocalImage = async (
  requireSource: any,
  storagePath: string,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  const firebaseStorage = getStorage();
  const storageRef = ref(firebaseStorage, storagePath);

  // 1. Check if file already exists in Storage
  try {
    const existingUrl = await getDownloadURL(storageRef);
    if (existingUrl) {
      return existingUrl;
    }
  } catch {
    // File doesn't exist yet, proceed with upload
  }

  // 2. Resolve local file URI
  const resolved = Image.resolveAssetSource(requireSource);
  if (!resolved || !resolved.uri) {
    throw new Error(`Could not resolve asset source for: ${storagePath}`);
  }

  let uri = resolved.uri;

  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri;
  }

  // Clean file URI for Android/iOS native putFile
  if (uri.startsWith('file://')) {
    uri = uri.replace('file://', '');
  }

  // 3. Upload file
  const task = putFile(storageRef, uri);

  if (onProgress) {
    task.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    });
  }

  await task;

  // 4. Return new download URL
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};
