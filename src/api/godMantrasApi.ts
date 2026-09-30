import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';

import { God, GodMantra } from './types';

export type { God, GodMantra, NaamJapItem } from './types';

// In-memory runtime RAM cache (session-only; wiped when app is closed/killed)
let memoryGodDataCache: God[] | null = null;

export const getCachedGodData = (): God[] | null => {
  return memoryGodDataCache;
};

export const clearGodDataMemoryCache = (): void => {
  memoryGodDataCache = null;
};

export const resolveGodImage = (god: any): any => {
  if (!god) return imagePath.fallBackImage;

  const rawUrl = (god.imageUrl || god.url || '').toString().trim();
  if (rawUrl.startsWith('http')) {
    return { uri: rawUrl };
  }

  return imagePath.fallBackImage;
};

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
    imageUrl: god.imageUrl || '',
    image,
    mantras,
  };
};

export const getGodData = async (
  forceRefresh: boolean = false,
): Promise<God[]> => {
  if (!forceRefresh && memoryGodDataCache && memoryGodDataCache.length > 0) {
    return memoryGodDataCache;
  }

  try {
    const db = getFirestore();
    let snapshot = await getDocs(collection(db, 'GodMantras'));

    if (snapshot.empty) {
      snapshot = await getDocs(collection(db, 'japMantras'));
    }

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      rawList.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      const mapped = rawList.map(mapGodWithImage);
      // Store in RAM memory cache for the active session only
      memoryGodDataCache = mapped;
      return mapped;
    }

    return memoryGodDataCache || [];
  } catch (error) {
    console.error('❌ [godMantrasApi] Firestore fetch failed:', error);
    return memoryGodDataCache || [];
  }
};

export const getNaamJapData = getGodData;
export default getGodData;
