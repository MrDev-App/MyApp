import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import imagePath from '@assets/index';

export interface GodMantra {
  nameEn: string;
  nameHi: string;
  mantra: string;
}

export interface NaamJapItem {
  id: string;
  englishName: string;
  hindiName: string;
  mantra: string;
  image?: any;
  imageUrl?: string;
  mantras: GodMantra[];
}

export type God = NaamJapItem;

/**
 * Gets cached GodMantras data from local MMKV storage if available.
 */
export const getCachedGodData = (): God[] | null => {
  try {
    const rawCache = Storage.getString(STORAGE_KEYS.GOD_DATA_CACHE, '');
    if (rawCache) {
      const parsed = JSON.parse(rawCache);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(mapGodWithImage);
      }
    }
  } catch (err) {
    console.error('❌ [GodService] Error reading cached GodMantras:', err);
  }
  return null;
};

/**
 * Resolves local image from imagePath based on deity name / id.
 */
export const resolveGodImage = (god: any): any => {
  const rawId = (god.id || god.nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

  // Check common deity keywords
  const deityKeywords = [
    'shiva',
    'shiv',
    'bhole',
    'bholenath',
    'mahadev',
    'vishnu',
    'narayan',
    'krishna',
    'kanha',
    'radha',
    'rama',
    'ram',
    'shriram',
    'hanuman',
    'bajrangbali',
    'ganesha',
    'ganesh',
    'ganpati',
    'durga',
    'kali',
    'laxmi',
    'lakshmi',
    'saraswati',
    'gayatri',
    'surya',
    'brahma',
    'shani',
    'kubera',
    'kuber',
  ];

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  if (
    god.imageUrl &&
    typeof god.imageUrl === 'string' &&
    god.imageUrl.trim().startsWith('http')
  ) {
    return { uri: god.imageUrl.trim() };
  }

  return god.image || imagePath.greeting;
};

/**
 * Maps Firestore 'GodMantras' document to typed God/NaamJapItem.
 */
export const mapGodWithImage = (god: any): God => {
  const godId = god.id || '';
  const image = resolveGodImage(god);

  const rawMantras = Array.isArray(god.mantras) ? god.mantras : [];
  const mantras: GodMantra[] = rawMantras.map((m: any) => ({
    nameEn: m.nameEn || m.name || '',
    nameHi: m.nameHi || '',
    mantra: m.mantra || '',
  }));

  return {
    id: godId,
    englishName: god.nameEn || god.englishName || '',
    hindiName: god.nameHi || god.hindiName || '',
    mantra: god.primaryMantra || god.mantra || mantras[0]?.mantra || '',
    image,
    mantras,
  };
};

export const getGodData = async (
  forceRefresh: boolean = false,
): Promise<God[]> => {
  // If not forcing refresh, check local MMKV storage first
  if (!forceRefresh) {
    const cached = getCachedGodData();
    if (cached && cached.length > 0) {
      console.log(
        `⚡ [GodService] Returning ${cached.length} GodMantras from local persistent storage.`,
      );
      return cached;
    }
  }

  console.log('----------------------------------------------------');
  console.log(
    '🔱 [GodService] Starting fetch for GodMantras from Firestore...',
  );
  try {
    const db = getFirestore();

    // 1. Primary collection: 'GodMantras'
    console.log('🔍 [GodService] Querying collection "GodMantras"...');
    let snapshot = await getDocs(collection(db, 'GodMantras'));
    console.log(
      `📄 [GodService] 'GodMantras' collection returned ${snapshot.size} document(s).`,
    );

    // 2. Fallbacks if GodMantras is empty
    if (snapshot.empty) {
      console.log(
        '⚠️ [GodService] "GodMantras" was empty, trying fallback "japMantras"...',
      );
      snapshot = await getDocs(collection(db, 'japMantras'));
    }

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => {
        const docData = docSnap.data();
        console.log(
          `📌 [GodService] Doc [${docSnap.id}] -> ${
            docData.nameEn || docData.englishName
          } (${(docData.mantras || []).length} mantras)`,
        );
        return {
          id: docSnap.id,
          ...docData,
        };
      });
    }

    if (rawList.length > 0) {
      // Sort by order field if available
      rawList.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

      // Persist raw list to local MMKV storage
      try {
        Storage.set(STORAGE_KEYS.GOD_DATA_CACHE, JSON.stringify(rawList));
        console.log(
          '💾 [GodService] Saved GodMantras to local persistent storage (MMKV).',
        );
      } catch (saveErr) {
        console.error('❌ [GodService] Error saving to storage:', saveErr);
      }

      const mappedList = rawList.map(mapGodWithImage);
      console.log(
        `✅ [GodService] Successfully mapped ${mappedList.length} deities from Firestore.`,
      );
      console.log('----------------------------------------------------');
      return mappedList;
    }

    // If Firestore empty, try local persistent cache before static data
    const localCache = getCachedGodData();
    if (localCache && localCache.length > 0) {
      return localCache;
    }

    console.warn(
      '⚠️ [GodService] No documents found in Firestore.',
    );
    console.log('----------------------------------------------------');
    return [];
  } catch (error) {
    console.error(
      '❌ [GodService] Firestore fetch failed! Checking local persistent cache:',
      error,
    );
    const localCache = getCachedGodData();
    if (localCache && localCache.length > 0) {
      return localCache;
    }
    console.log('----------------------------------------------------');
    return [];
  }
};

export const getNaamJapData = getGodData;
export default getGodData;
