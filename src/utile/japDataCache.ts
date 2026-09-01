import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

export interface MantraSelectorItem {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
  isCustom?: boolean;
  order?: number;
}

export const DEFAULT_MANTRA: MantraSelectorItem = {
  id: 'Radha',
  nameEn: 'Radha Mantra',
  nameHi: 'राधा मत्र',
  textEn: 'राधा',
  textHi: 'राधा',
};

const storage = createMMKV();
export const JAP_MANTRAS_CACHE_KEY = 'jap_mantras_cache';

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

export const getJapMantrasData = async (): Promise<MantraSelectorItem[]> => {
  try {
    // 1. Check MMKV cache first
    const cachedData = storage.getString(JAP_MANTRAS_CACHE_KEY);

    if (cachedData) {
      console.log('Loaded from MMKV cache');
      const parsed: any[] = JSON.parse(cachedData);
      console.log('Jap Mantras from cache:', parsed);
      return parsed.map(mapMantraItem);
    }

    // 2. Fetch from Firestore (first time only)
    console.log('Fetching from Firestore (first time only)...');
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'japMantras'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }
    console.log('Jap Mantras fetched from Firestore:', rawList);

    // 3. Save as plain JSON string in MMKV
    if (rawList.length > 0) {
      storage.set(JAP_MANTRAS_CACHE_KEY, JSON.stringify(rawList));
    }

    return rawList.map(mapMantraItem);
  } catch (error) {
    console.error('Error fetching japMantras from Firestore:', error);
    return [DEFAULT_MANTRA];
  }
};

export const clearJapMantrasCache = (): void => {
  storage.remove(JAP_MANTRAS_CACHE_KEY);
};
