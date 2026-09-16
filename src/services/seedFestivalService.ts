import {
  getFirestore,
  doc,
  writeBatch,
  Timestamp,
} from '@react-native-firebase/firestore';
import { CALENDAR_2026, Festival2026 } from '@constants/Calendar_2026';
import { clearFestivalDataCache } from './festivalService';

export interface SeedFestivalOptions {
  onProgress?: (message: string) => void;
  collectionName?: string;
}

export interface SeedFestivalResult {
  success: boolean;
  count: number;
  collection: string;
  error?: string;
}

/**
 * Uploads all 53 Hindu festivals from CALENDAR_2026 to Firestore collection 'festivals'.
 */
export const uploadCalendar2026ToFirestore = async (
  options?: SeedFestivalOptions,
): Promise<SeedFestivalResult> => {
  const collectionName = options?.collectionName || 'festivals';
  const { onProgress } = options || {};

  const log = (msg: string) => {
    console.log(`[SeedFestival] ${msg}`);
    onProgress?.(msg);
  };

  try {
    log(
      `⏳ Preparing to upload ${CALENDAR_2026.length} festivals to Firestore collection '${collectionName}'...`,
    );

    const db = getFirestore();
    const BATCH_SIZE = 50;
    let totalCount = 0;

    for (let i = 0; i < CALENDAR_2026.length; i += BATCH_SIZE) {
      const chunk = CALENDAR_2026.slice(i, i + BATCH_SIZE);
      const batch = writeBatch(db);

      for (const item of chunk) {
        const docRef = doc(db, collectionName, item.id);
        const docData = {
          id: item.id,
          name: item.name || item.englishName,
          nameHi: item.nameHi || item.hindiName,
          englishName: item.englishName || item.name,
          hindiName: item.hindiName || item.nameHi,
          date: item.date,
          year: item.year,
          month: item.month,
          day: item.day,
          dayOfWeek: item.dayOfWeek,
          dayOfWeekHi: item.dayOfWeekHi,
          dateStrEn: item.dateStrEn,
          dateStrHi: item.dateStrHi,
          tithi: item.tithi,
          tithiHi: item.tithiHi,
          description: item.description,
          descriptionHi: item.descriptionHi,
          category: item.category,
          categoryHi: item.categoryHi,
          imageUrl: item.imageUrl || '',
          url: item.url || '',
          updatedAt: Timestamp.now(),
        };

        batch.set(docRef, docData, { merge: true });
        totalCount++;
      }

      log(
        `💾 Committing batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} items)...`,
      );
      await batch.commit();
    }

    // Invalidate local cache so the app pulls fresh data
    clearFestivalDataCache();

    log(
      `✅ Successfully uploaded all ${totalCount} festivals to Firestore collection '${collectionName}'!`,
    );

    return {
      success: true,
      count: totalCount,
      collection: collectionName,
    };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    log(`❌ Error uploading to '${collectionName}': ${errorMsg}`);
    console.error('Error in uploadCalendar2026ToFirestore:', error);
    return {
      success: false,
      count: 0,
      collection: collectionName,
      error: errorMsg,
    };
  }
};
