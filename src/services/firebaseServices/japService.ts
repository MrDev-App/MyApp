import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import imagePath from '@assets/index';

export interface JapMantraItem {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
  order: number;
  isCustom: boolean;
  image?: any;
}

/**
 * Gets cached Jap Mantras from local MMKV storage if available.
 */
export const getCachedJapMantrasData = (): JapMantraItem[] | null => {
  try {
    const rawCache = Storage.getString(STORAGE_KEYS.JAP_MANTRAS_CACHE, '');
    if (rawCache) {
      const parsed = JSON.parse(rawCache);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(item => mapJapMantraDoc(item.id, item));
      }
    }
  } catch (err) {
    console.error('❌ [JapService] Error reading cached JapMantras:', err);
  }
  return null;
};

/**
 * Resolves local image from imagePath for Jap Mantras.
 */
export const resolveJapImage = (id: string, nameEn: string): any => {
  const rawId = (id || nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

  const deityKeywords = [
    'radha',
    'krishna',
    'gayatri',
    'mrityunjaya',
    'shiva',
    'shiv',
    'ram',
    'rama',
    'hanuman',
    'ganesh',
    'ganesha',
    'durga',
    'laxmi',
    'lakshmi',
  ];

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  return imagePath.lotus || imagePath.greeting;
};

/**
 * Maps Firestore japMantras doc to JapMantraItem.
 */
export const mapJapMantraDoc = (docId: string, data: any): JapMantraItem => {
  const id = docId || data.id || '';
  const nameEn = data.nameEn || '';
  return {
    id,
    nameEn,
    nameHi: data.nameHi || '',
    textEn: data.textEn || '',
    textHi: data.textHi || '',
    order: Number(data.order) || 0,
    isCustom: Boolean(data.isCustom),
    image: resolveJapImage(id, nameEn),
  };
};

/**
 * Fetches all Jap Mantras from Firestore collection 'japMantras'.
 */
export const getJapMantrasData = async (
  forceRefresh: boolean = false,
): Promise<JapMantraItem[]> => {
  // If not forcing refresh, return local MMKV cache immediately
  if (!forceRefresh) {
    const cached = getCachedJapMantrasData();
    if (cached && cached.length > 0) {
      console.log(
        `⚡ [JapService] Returning ${cached.length} JapMantras from local persistent storage.`,
      );
      return cached;
    }
  }

  console.log('----------------------------------------------------');
  console.log('📿 [JapService] Fetching Jap Mantras from Firestore...');

  try {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'japMantras'));

    if (!snapshot || snapshot.empty) {
      console.warn('⚠️ [JapService] No japMantras found in Firestore.');
      const localCache = getCachedJapMantrasData();
      if (localCache && localCache.length > 0) return localCache;
      console.log('----------------------------------------------------');
      return [];
    }

    const rawList = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    // Persist to local MMKV storage
    try {
      Storage.set(STORAGE_KEYS.JAP_MANTRAS_CACHE, JSON.stringify(rawList));
      console.log(
        '💾 [JapService] Saved JapMantras to local persistent storage (MMKV).',
      );
    } catch (saveErr) {
      console.error('❌ [JapService] Error saving to storage:', saveErr);
    }

    const list: JapMantraItem[] = rawList.map(item =>
      mapJapMantraDoc(item.id, item),
    );

    list.sort((a, b) => a.order - b.order);

    console.log(
      `✅ [JapService] Successfully loaded ${list.length} jap mantras.`,
    );
    console.log('----------------------------------------------------');
    return list;
  } catch (error) {
    console.error(
      '❌ [JapService] Error fetching japMantras from Firestore! Checking local cache:',
      error,
    );
    const localCache = getCachedJapMantrasData();
    if (localCache && localCache.length > 0) {
      return localCache;
    }
    console.log('----------------------------------------------------');
    return [];
  }
};

export default getJapMantrasData;
