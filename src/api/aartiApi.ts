import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import imagePath from '@assets/index';
import { Category, CategoryItem, deityKeywords } from './types';

/**
 * Resolves a local image from imagePath for an aarti item.
 * Matches deity keywords and exact image keys.
 */
export const resolveLocalAartiImage = (item: any): any => {
  const rawId = (item.id || item.nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }

  const deityKey = rawId
    .replace(/_aarti|_chalisa|_shlok|_mantra|_stotram/g, '')
    .trim();
  const cleanDeityKey = deityKey.replace(/[^a-z0-9]/g, '');

  if (cleanDeityKey && (imagePath as any)[cleanDeityKey]) {
    return (imagePath as any)[cleanDeityKey];
  }

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  return imagePath.Ganesha || imagePath.greeting;
};

/**
 * Maps Firestore document data to a typed Category object with resolved local images.
 */
export const mapAartiDoc = (docId: string, data: any): Category => {
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const items: CategoryItem[] = rawItems.map((item: any, index: number) => ({
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
    image: resolveLocalAartiImage(item),
  }));

  return {
    id: docId || 'aarti',
    titleEn: data.titleEn || data.nameEn || 'Aarti Sangrah',
    titleHi: data.titleHi || data.nameHi || 'आरती संग्रह',
    icon: imagePath.lamp,
    coverImage: imagePath.Ganesha,
    descriptionEn: data.descriptionEn || '',
    descriptionHi: data.descriptionHi || '',
    items,
  };
};

/**
 * Returns cached Aarti data from local MMKV storage if available.
 */
export const getCachedAartiCategory = (): Category | null => {
  try {
    const rawCache = Storage.getString(STORAGE_KEYS.AARTI_DATA_CACHE, '');
    if (rawCache) {
      const parsed = JSON.parse(rawCache);
      if (parsed && typeof parsed === 'object') {
        return mapAartiDoc('aarti', parsed);
      }
    }
  } catch (err) {
    console.error('❌ [aartiApi] Error reading cached Aarti:', err);
  }
  return null;
};

/**
 * Fetches the Aarti category document from Firestore ('categories/aarti').
 * Only called when the user opens/clicks the Aarti screen.
 * Persists the result into local storage for offline access and instant subsequent loads.
 */
export const getAartiCategoryData = async (
  forceRefresh: boolean = false,
): Promise<Category | null> => {
  if (!forceRefresh) {
    const cached = getCachedAartiCategory();
    if (cached && cached.items && cached.items.length > 0) {
      return cached;
    }
  }

  try {
    const db = getFirestore();
    const docRef = doc(db, 'categories', 'aarti');
    const docSnap = await getDoc(docRef);

    if (docSnap && docSnap.exists()) {
      const docData = docSnap.data();

      try {
        Storage.set(
          STORAGE_KEYS.AARTI_DATA_CACHE,
          JSON.stringify({ ...docData, id: docSnap.id }),
        );
      } catch (saveErr) {
        console.error('❌ [aartiApi] Failed to cache Aarti:', saveErr);
      }

      return mapAartiDoc(docSnap.id, docData);
    }

    return getCachedAartiCategory();
  } catch (error) {
    console.error('❌ [aartiApi] Error fetching Aarti from Firestore:', error);
    return getCachedAartiCategory();
  }
};

export default getAartiCategoryData;
