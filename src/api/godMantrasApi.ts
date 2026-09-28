import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import imagePath from '@assets/index';

import { God, GodMantra, NaamJapItem } from './types';

export type { God, GodMantra, NaamJapItem } from './types';

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
    console.error('❌ [godMantrasApi] Error reading cached GodMantras:', err);
  }
  return null;
};

export const resolveGodImage = (god: any): any => {
  const rawId = (god.id || god.nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

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

  return god.image || imagePath.fallBackImage;
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
    image,
    mantras,
  };
};

export const getGodData = async (
  forceRefresh: boolean = false,
): Promise<God[]> => {
  if (!forceRefresh) {
    const cached = getCachedGodData();
    if (cached && cached.length > 0) {
      return cached;
    }
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

      try {
        Storage.set(STORAGE_KEYS.GOD_DATA_CACHE, JSON.stringify(rawList));
      } catch (saveErr) {
        console.error('❌ [godMantrasApi] Error saving to storage:', saveErr);
      }

      return rawList.map(mapGodWithImage);
    }

    const localCache = getCachedGodData();
    if (localCache && localCache.length > 0) {
      return localCache;
    }

    return [];
  } catch (error) {
    console.error('❌ [godMantrasApi] Firestore fetch failed:', error);
    const localCache = getCachedGodData();
    if (localCache && localCache.length > 0) {
      return localCache;
    }
    return [];
  }
};

export const getNaamJapData = getGodData;
export default getGodData;
