import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import {
  templesData,
  TempleItem,
  TempleCategory,
} from '@constants/templesData';

const FIRESTORE_COLLECTION_NAME = 'temples';

/**
 * Retrieve cached temples from MMKV or fallback to static predefined dataset
 */
export const getCachedTemples = (): TempleItem[] => {
  try {
    const rawCache = Storage.getString(STORAGE_KEYS.TEMPLES_CACHE, '');
    if (rawCache) {
      const parsed: TempleItem[] = JSON.parse(rawCache);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[TempleService] Error reading cached temples:', err);
  }
  return templesData;
};

/**
 * Save temples list to persistent MMKV storage
 */
export const setCachedTemples = (temples: TempleItem[]): void => {
  try {
    Storage.set(STORAGE_KEYS.TEMPLES_CACHE, JSON.stringify(temples));
  } catch (err) {
    console.warn('[TempleService] Error caching temples:', err);
  }
};

/**
 * Map raw Firestore document data to a clean, strongly typed TempleItem
 */
export const mapFirestoreDocToTemple = (id: string, data: any): TempleItem => {
  const categories: TempleCategory[] = Array.isArray(data.categories)
    ? data.categories
    : data.category
    ? [data.category]
    : ['major'];

  return {
    id: id || data.id,
    nameHi: data.nameHi || data.name || '',
    nameEn: data.nameEn || data.englishName || '',
    locationHi: data.locationHi || '',
    locationEn: data.locationEn || '',
    stateHi: data.stateHi || '',
    stateEn: data.stateEn || '',
    deityHi: data.deityHi || '',
    deityEn: data.deityEn || '',
    image: data.imageUrl || data.image || '',
    imageUrl: data.imageUrl || (typeof data.image === 'string' ? data.image : ''),
    category: data.category || categories[0] || 'major',
    categories,
    isCharDham: !!data.isCharDham || categories.includes('chardham'),
    isJyotirlinga: !!data.isJyotirlinga || categories.includes('jyotirlinga'),
    isShaktipeeth: !!data.isShaktipeeth || categories.includes('shaktipeeth'),
    isChotaCharDham: !!data.isChotaCharDham || categories.includes('chota_chardham'),
    yugaHi: data.yugaHi,
    yugaEn: data.yugaEn,
    directionHi: data.directionHi,
    directionEn: data.directionEn,
    significanceHi: data.significanceHi || '',
    significanceEn: data.significanceEn || '',
    timingHi: data.timingHi || '',
    timingEn: data.timingEn || '',
    descriptionHi: data.descriptionHi || '',
    descriptionEn: data.descriptionEn || '',
    nearbyAttractionsHi: data.nearbyAttractionsHi || '',
    nearbyAttractionsEn: data.nearbyAttractionsEn || '',
    order: typeof data.order === 'number' ? data.order : 999,
  };
};

/**
 * Fetch all temples from Firebase Firestore, cache them locally, and fallback gracefully
 */
export const fetchTemplesFromFirestore = async (): Promise<TempleItem[]> => {
  try {
    const db = getFirestore();
    const templesRef = collection(db, FIRESTORE_COLLECTION_NAME);
    const q = query(templesRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const remoteTemples: TempleItem[] = snapshot.docs.map(docSnap =>
        mapFirestoreDocToTemple(docSnap.id, docSnap.data()),
      );

      if (remoteTemples.length > 0) {
        setCachedTemples(remoteTemples);
        return remoteTemples;
      }
    }
  } catch (error) {
    console.warn('[TempleService] Failed to fetch from Firestore, using cache/fallback:', error);
  }

  return getCachedTemples();
};

/**
 * Filter temples by category (supporting multi-category temples like Rameshwaram & Kedarnath)
 */
export const getTemplesByCategory = (
  temples: TempleItem[],
  category: TempleCategory | 'all',
): TempleItem[] => {
  if (category === 'all') return temples;

  return temples.filter(
    item =>
      (item.categories && item.categories.includes(category)) ||
      item.category === category,
  );
};

/**
 * Convenience helper to get the 4 All-India Char Dhams
 */
export const getCharDhamTemples = (temples: TempleItem[] = templesData): TempleItem[] => {
  return temples.filter(
    item => item.isCharDham || item.categories?.includes('chardham') || item.category === 'chardham',
  );
};

/**
 * Convenience helper to get the 12 Sacred Jyotirlingas
 */
export const getJyotirlingaTemples = (temples: TempleItem[] = templesData): TempleItem[] => {
  return temples.filter(
    item => item.isJyotirlinga || item.categories?.includes('jyotirlinga') || item.category === 'jyotirlinga',
  );
};

/**
 * Find single temple by its ID
 */
export const getTempleById = (
  id: string,
  temples: TempleItem[] = templesData,
): TempleItem | undefined => {
  return temples.find(item => item.id === id);
};
