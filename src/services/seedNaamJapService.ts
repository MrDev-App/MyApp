import {
  getFirestore,
  doc,
  writeBatch,
  Timestamp,
} from '@react-native-firebase/firestore';
import { naamJapData, NaamJapItem } from '@constants/naamJapData';
import { clearNaamJapDataCache } from './godService';
import { uploadLocalImage } from './seedService';

export interface SeedNaamJapOptions {
  onProgress?: (message: string) => void;
  uploadImagesToStorage?: boolean;
}

export interface SeedResult {
  success: boolean;
  count: number;
  collection: string;
  error?: string;
}

/**
 * Uploads godData / naamJapData to Firestore collection 'naamJapData'.
 * Can optionally upload images to Firebase Storage as well.
 */
export const uploadNaamJapDataToFirestore = async (
  options?: SeedNaamJapOptions,
): Promise<SeedResult> => {
  const collectionName = 'naamJapData';
  const { onProgress, uploadImagesToStorage = false } = options || {};

  const log = (msg: string) => {
    console.log(`[SeedNaamJap] ${msg}`);
    onProgress?.(msg);
  };

  try {
    log(`⏳ Preparing to upload ${naamJapData.length} deities to '${collectionName}'...`);
    const db = getFirestore();
    const batch = writeBatch(db);

    let count = 0;
    for (const item of naamJapData) {
      log(`Processing: ${item.englishName} (${item.hindiName}) [${item.id}]`);

      let remoteUrl = item.imageUrl || '';
      if (uploadImagesToStorage && item.image) {
        try {
          remoteUrl = await uploadLocalImage(
            item.image,
            `naamJapImages/${item.id}.webp`,
          );
          log(`  ✓ Uploaded image for ${item.id}`);
        } catch (imgErr: any) {
          log(`  ⚠ Storage upload skipped for ${item.id}: ${imgErr?.message || 'Using local asset'}`);
        }
      }

      const docRef = doc(db, collectionName, item.id);
      const docData: any = {
        id: item.id,
        englishName: item.englishName,
        hindiName: item.hindiName,
        mantra: item.mantra,
        mantras: item.mantras || [],
        updatedAt: Timestamp.now(),
      };

      if (remoteUrl) {
        docData.imageUrl = remoteUrl;
      }

      batch.set(docRef, docData, { merge: true });
      count++;
    }

    log(`💾 Saving batch of ${count} documents to Firestore...`);
    await batch.commit();

    // Invalidate local cache so next fetch gets newly seeded data
    clearNaamJapDataCache();

    log(`✅ Successfully uploaded ${count} items to Firestore collection '${collectionName}'!`);
    return {
      success: true,
      count,
      collection: collectionName,
    };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    log(`❌ Error uploading to '${collectionName}': ${errorMsg}`);
    console.error('Error in uploadNaamJapDataToFirestore:', error);
    return {
      success: false,
      count: 0,
      collection: collectionName,
      error: errorMsg,
    };
  }
};

// Backward-compatibility alias
export const seedGodDataToFirestore = uploadNaamJapDataToFirestore;
