import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
} from '@react-native-firebase/firestore';
import { JapLevel } from './types';

export const FIRESTORE_JAP_LEVELS_COLLECTION = 'japLevels';

let memoryJapLevelsCache: JapLevel[] | null = null;

/**
 * Upload an array of Jap Levels directly into the Firestore 'japLevels' collection
 */
export const uploadAllJapLevelsToFirestore = async (
  levelsList: JapLevel[],
): Promise<{
  success: boolean;
  count: number;
  message: string;
}> => {
  try {
    const db = getFirestore();
    let count = 0;

    for (const item of levelsList) {
      const docRef = doc(db, FIRESTORE_JAP_LEVELS_COLLECTION, `level_${item.level}`);
      await setDoc(
        docRef,
        {
          level: item.level,
          nameEn: item.nameEn,
          nameHi: item.nameHi,
          titleEn: item.titleEn,
          titleHi: item.titleHi,
          requiredMalas: item.requiredMalas,
          requiredChants: item.requiredChants,
          icon: item.icon,
          badgeColor: item.badgeColor,
          blessingEn: item.blessingEn,
          blessingHi: item.blessingHi,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
      count++;
    }

    return {
      success: true,
      count,
      message: `Successfully uploaded ${count} jap levels to '${FIRESTORE_JAP_LEVELS_COLLECTION}'`,
    };
  } catch (error: any) {
    console.error(
      `❌ [japLevelsApi] Error uploading jap levels to '${FIRESTORE_JAP_LEVELS_COLLECTION}':`,
      error,
    );
    return {
      success: false,
      count: 0,
      message: error?.message || 'Failed to upload jap levels data',
    };
  }
};

/**
 * Fetch Jap Levels from Firestore with limit (default 10).
 * Uses in-memory session cache.
 */
export const fetchJapLevelsFromFirestore = async (
  limitCount: number = 10,
  forceRefresh: boolean = false,
): Promise<JapLevel[]> => {
  if (!forceRefresh && memoryJapLevelsCache && memoryJapLevelsCache.length > 0) {
    return memoryJapLevelsCache.slice(0, limitCount);
  }

  try {
    const db = getFirestore();
    const levelsRef = collection(db, FIRESTORE_JAP_LEVELS_COLLECTION);
    let snapshot;

    try {
      const q = query(levelsRef, orderBy('level', 'asc'), limit(limitCount));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(levelsRef);
    }

    if (snapshot && !snapshot.empty) {
      const items: JapLevel[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          level: Number(data.level) || 1,
          nameEn: data.nameEn || '',
          nameHi: data.nameHi || '',
          titleEn: data.titleEn || '',
          titleHi: data.titleHi || '',
          requiredMalas: Number(data.requiredMalas) || 0,
          requiredChants: Number(data.requiredChants) || 0,
          icon: data.icon || '🌱',
          badgeColor: data.badgeColor || '#4CAF50',
          blessingEn: data.blessingEn || '',
          blessingHi: data.blessingHi || '',
        };
      });

      items.sort((a, b) => a.level - b.level);

      if (items.length > 0) {
        memoryJapLevelsCache = items;
        return items.slice(0, limitCount);
      }
    }
  } catch (error) {
    console.warn('[japLevelsApi] Error fetching jap levels from Firestore:', error);
  }

  return memoryJapLevelsCache || [];
};

export default fetchJapLevelsFromFirestore;

