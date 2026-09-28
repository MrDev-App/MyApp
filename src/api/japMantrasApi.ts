import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import {
  DEFAULT_MANTRA,
  JAP_MANTRAS_CACHE_KEY,
  MantraSelectorItem,
} from './types';

export const mapMantraItem = (item: any, index = 0): MantraSelectorItem => {
  return {
    id: item.id || '',
    nameEn: item.nameEn || '',
    nameHi: item.nameHi || '',
    textEn: item.textEn || '',
    textHi: item.textHi || '',
    isCustom: item.isCustom ?? false,
    order: item.order ?? index,
  };
};

let hasFetchedJapMantrasThisSession = false;

export const getCachedJapMantrasData = (): MantraSelectorItem[] | null => {
  try {
    const cachedData = Storage.getString(JAP_MANTRAS_CACHE_KEY);
    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const list = parsed.map(mapMantraItem);
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        return list;
      }
    }
  } catch (err) {
    console.error('❌ [japMantrasApi] Error reading cached JapMantras:', err);
  }
  return null;
};

export const getJapMantrasData = async (
  forceRefresh: boolean = false,
): Promise<MantraSelectorItem[]> => {
  if (!forceRefresh && hasFetchedJapMantrasThisSession) {
    const cached = getCachedJapMantrasData();
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  try {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'japMantras'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      try {
        Storage.set(JAP_MANTRAS_CACHE_KEY, JSON.stringify(rawList));
      } catch (saveErr) {
        console.error('❌ [japMantrasApi] Error saving to MMKV:', saveErr);
      }

      hasFetchedJapMantrasThisSession = true;
      const list = rawList.map(mapMantraItem);
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return list;
    }

    const cached = getCachedJapMantrasData();
    if (cached && cached.length > 0) return cached;
    return [DEFAULT_MANTRA];
  } catch (error) {
    console.warn(
      '⚠️ [japMantrasApi] Firestore unavailable, using local jap data:',
      error,
    );
    const cached = getCachedJapMantrasData();
    if (cached && cached.length > 0) {
      return cached;
    }
    return [DEFAULT_MANTRA];
  }
};

export const clearJapMantrasCache = (): void => {
  Storage.delete(JAP_MANTRAS_CACHE_KEY);
};

export default getJapMantrasData;
