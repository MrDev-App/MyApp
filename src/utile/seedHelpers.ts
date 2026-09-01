import {
  getStorage,
  ref,
  putFile,
  uploadString,
  getDownloadURL,
} from '@react-native-firebase/storage';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from '@react-native-firebase/firestore';
import { Image } from 'react-native';

// Local image (require() se aayi hui) ko Storage pe upload karke URL return karta hai
export async function uploadLocalImage(
  imageSource: any,
  storagePath: string,
): Promise<string> {
  const resolvedSource = Image.resolveAssetSource(imageSource);
  if (!resolvedSource?.uri) {
    throw new Error('Could not resolve image asset source');
  }

  const uri = resolvedSource.uri;
  const storage = getStorage();
  const storageRef = ref(storage, storagePath);

  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    // Metro bundler dev server se asset fetch karke data_url ke through upload karo
    const response = await fetch(uri);
    const blob = await response.blob();

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = () => reject(reader.error || new Error('FileReader error'));
      reader.readAsDataURL(blob);
    });

    await new Promise((resolve, reject) => {
      const uploadTask = uploadString(storageRef, dataUrl, 'data_url');
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / (snapshot.totalBytes || 1)) * 100;
          console.log(`Upload progress for ${storagePath}: ${Math.round(progress)}%`);
        },
        error => {
          console.error(`Upload error for ${storagePath}:`, error);
          reject(error);
        },
        async () => {
          console.log(`Upload completed for ${storagePath}`);
          resolve(true);
        },
      );
    });
  } else {
    // Release APK / local file path
    await putFile(storageRef, uri);
  }

  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}

// Firestore me document save karne ka helper
export async function saveDocument(
  collectionName: string,
  docId: string,
  data: Record<string, any>,
): Promise<void> {
  const db = getFirestore();
  const docRef = doc(collection(db, collectionName), docId);
  await setDoc(docRef, data, { merge: true });
}
