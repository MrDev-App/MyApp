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
      audioUrl: item.audioUrl || item.audio || item.audio_url || '',
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

/**
 * Match a reminder query (e.g. God name or Aarti title) against Aarti items.
 * Returns the matching CategoryItem if found, otherwise null.
 */
export const findAartiByQuery = async (
  queryText: string,
): Promise<CategoryItem | null> => {
  if (!queryText || !queryText.trim()) return null;
  const q = queryText.toLowerCase().trim();
  const words = q
    .split(/[\s,.-]+/)
    .map(w => w.trim())
    .filter(w => w.length > 1);

  const categoryData = await getAartiCategoryData();
  if (!categoryData || !categoryData.items || categoryData.items.length === 0) {
    return null;
  }

  const items = categoryData.items;

  // 1. Direct title / header match
  for (const item of items) {
    const nEn = (item.nameEn || item.headerTitleEn || '').toLowerCase();
    const nHi = (item.nameHi || item.headerTitleHi || '').toLowerCase();
    if (
      (nEn && (q.includes(nEn) || nEn.includes(q))) ||
      (nHi && (q.includes(nHi) || nHi.includes(q)))
    ) {
      return item;
    }
  }

  // 2. Deity keyword matching
  const GOD_AARTI_KEYWORDS: Record<string, string[]> = {
    ganesh: ['ganesh', 'ganpati', 'vinayak', 'gajanand', 'गणेश', 'गणपति', 'विनायक', 'गजानन'],
    shiv: ['shiv', 'shiva', 'bhole', 'bholenath', 'mahadev', 'shankara', 'omkara', 'शिव', 'भोलेनाथ', 'महादेव', 'शंकर', 'ॐकार'],
    hanuman: ['hanuman', 'bajrang', 'bajrangbali', 'maruti', 'pavanputra', 'sankatmochan', 'हनुमान', 'बजरंग', 'बजरंगबली', 'मारुति'],
    krishna: ['krishna', 'kanha', 'kunj', 'bihari', 'gopal', 'govind', 'radha', 'banke bihari', 'कृष्ण', 'कान्हा', 'कुंज बिहारी', 'गोविंद'],
    ram: ['ram', 'shree ram', 'raghunath', 'raghupati', 'siya ram', 'chandra', 'राम', 'श्री राम', 'रघुनाथ', 'रघुपति'],
    lakshmi: ['lakshmi', 'laxmi', 'dhan', 'samriddhi', 'deepawali', 'diwali', 'लक्ष्मी', 'महालक्ष्मी'],
    durga: ['durga', 'ambe', 'jagdambe', 'navratri', 'chandi', 'mata', 'sherawali', 'दुर्गा', 'अम्बे', 'जगदम्बे', 'माता', 'शेरावाली'],
    saraswati: ['saraswati', 'sharda', 'vidya', 'veena', 'सरस्वती', 'शारदा'],
    vishnu: ['vishnu', 'jagdish', 'narayan', 'hari', 'विष्णु', 'जगदीश', 'नारायण', 'हरि'],
    sai: ['sai', 'saibaba', 'shirdi', 'साईं', 'साई'],
    surya: ['surya', 'sun', 'aditya', 'bhaskar', 'ravivar', 'सूर्य', 'भास्कर', 'आदित्य'],
  };

  for (const item of items) {
    const textToMatch = `${item.nameEn} ${item.nameHi} ${item.headerTitleEn || ''} ${item.headerTitleHi || ''} ${item.subtitleEn || ''} ${item.subtitleHi || ''}`.toLowerCase();

    for (const [_key, keywords] of Object.entries(GOD_AARTI_KEYWORDS)) {
      const userMatched = keywords.some(kw => q.includes(kw) || words.includes(kw));
      if (userMatched) {
        const itemMatches = keywords.some(kw => textToMatch.includes(kw));
        if (itemMatches) {
          return item;
        }
      }
    }
  }

  // 3. Word overlap match
  for (const item of items) {
    const textToMatch = `${item.nameEn} ${item.nameHi} ${item.headerTitleEn || ''} ${item.headerTitleHi || ''}`.toLowerCase();
    const matches = words.filter(w => textToMatch.includes(w));
    if (matches.length >= 1) {
      return item;
    }
  }

  return null;
};

export default getAartiCategoryData;
