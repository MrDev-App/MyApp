import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { Category, CategoryItem } from './types';

export type { Category, CategoryItem, AartiItem, AartiCategory } from './types';

let memoryAartiCache: Category | null = null;

export const resolveAartiImage = (item: any): any => {
  if (item?.imageUrl) {
    return { uri: item.imageUrl };
  }
  return imagePath.fallBackImage;
};

export const mapAartiDoc = (docId: string, data: any): Category => {
  const rawItems = Array.isArray(data.items) ? data.items : [];

  const items: CategoryItem[] = rawItems.map((item: any, index: number) => {
    return {
      id: item.id || `aarti_item_${index}`,
      nameEn: item.nameEn || item.name || '',
      nameHi: item.nameHi || '',
      subtitleEn: item.subtitleEn || '',
      subtitleHi: item.subtitleHi || '',
      textEn: item.textEn || '',
      textHi: item.textHi || item.text || '',
      headerTitleEn: item.headerTitleEn || '',
      headerTitleHi: item.headerTitleHi || '',
      isJyotirlinga: Boolean(item.isJyotirlinga),
      order: typeof item.order === 'number' ? item.order : index,
      audioUrl: item.audioUrl || '',
      image: resolveAartiImage(item),
    };
  });

  // Sort items by order if defined
  items.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 0;
    const orderB = typeof b.order === 'number' ? b.order : 0;
    return orderA - orderB;
  });

  return {
    id: docId || 'aarti',
    titleEn: data.titleEn || data.nameEn || 'Aarti Sangrah',
    titleHi: data.titleHi || data.nameHi || 'आरती संग्रह',
    icon: imagePath.lamp,
    coverImage:
      data.coverImageUrl || data.imageUrl
        ? { uri: data.coverImageUrl || data.imageUrl }
        : imagePath.fallBackImage,
    descriptionEn: data.descriptionEn || '',
    descriptionHi: data.descriptionHi || '',
    items,
  };
};

/**
 * Returns in-memory cached Aarti data from RAM if available during the current app session.
 */
export const getCachedAartiCategory = (): Category | null => {
  return memoryAartiCache;
};

/**
 * Clears the in-memory Aarti cache.
 */
export const clearAartiMemoryCache = (): void => {
  memoryAartiCache = null;
};

/**
 * Fetches the Aarti category document from Firestore ('categories/aarti').
 * - Only called when the user opens/clicks the Aarti screen.
 * - Keeps data in RAM only during the current app session (not persisted in MMKV).
 * - When the app is closed/killed, RAM is cleared.
 */
export const getAartiCategoryData = async (
  forceRefresh: boolean = false,
): Promise<Category | null> => {
  if (
    !forceRefresh &&
    memoryAartiCache &&
    memoryAartiCache.items &&
    memoryAartiCache.items.length > 0
  ) {
    return memoryAartiCache;
  }

  try {
    const db = getFirestore();
    const docRef = doc(db, 'categories', 'aarti');
    const docSnap = await getDoc(docRef);

    if (docSnap && docSnap.exists()) {
      const docData = docSnap.data();
      const mapped = mapAartiDoc(docSnap.id, docData);

      // Store strictly in RAM memory cache for the active session
      memoryAartiCache = mapped;
      return mapped;
    }

    return memoryAartiCache;
  } catch (error) {
    console.error('❌ [aartiApi] Error fetching Aarti from Firestore:', error);
    return memoryAartiCache;
  }
};

export default getAartiCategoryData;
