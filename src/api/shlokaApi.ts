import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { ShlokaCategory, ShlokaCategoryDetail } from './types';

export type {
  ShlokaCategory,
  ShlokaCategoryDetail,
  ShlokaSubItem,
  ShlokaVerse,
} from './types';

// In-memory runtime cache for detail & all categories
const memoryCategoryCache = new Map<string, ShlokaCategoryDetail>();
let memoryAllCategoriesCache: ShlokaCategory[] | null = null;

export const getShlokaCategoryDetail = async (
  slugOrId: string,
): Promise<ShlokaCategoryDetail | null> => {
  const cleanSlug = (slugOrId || '')
    .toLowerCase()
    .replace('occasion-', '')
    .trim();

  if (memoryCategoryCache.has(cleanSlug)) {
    return memoryCategoryCache.get(cleanSlug)!;
  }

  try {
    const firestore = getFirestore();
    const subDocRef = doc(
      firestore,
      'categories',
      'shlokas',
      'shlokcategory',
      cleanSlug,
    );
    const snap = await getDoc(subDocRef);

    if (snap.exists()) {
      const data = snap.data() as ShlokaCategoryDetail;
      if (data && data.items && data.items.length > 0) {
        memoryCategoryCache.set(cleanSlug, data);
        return data;
      }
    }
  } catch (err) {
    console.warn(
      '[shlokaApi] Firestore fetch error from categories/shlokas/shlokcategory:',
      err,
    );
  }

  try {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'shloka_categories', cleanSlug);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as ShlokaCategoryDetail;
      if (data && data.items && data.items.length > 0) {
        memoryCategoryCache.set(cleanSlug, data);
        return data;
      }
    }
  } catch (err) {
    console.warn(
      '[shlokaApi] Firestore fetch error from shloka_categories:',
      err,
    );
  }

  return null;
};

export const getAllShlokaCategoriesFromFirebase = async (): Promise<
  ShlokaCategory[]
> => {
  if (memoryAllCategoriesCache && memoryAllCategoriesCache.length > 0) {
    return memoryAllCategoriesCache;
  }

  try {
    const firestore = getFirestore();
    const docRef = doc(
      firestore,
      'categories',
      'shlokas',
      'shlokcategory',
      'allshloakcategories',
    );
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      const list = data?.categories || data?.items || data?.shlokData;
      if (Array.isArray(list) && list.length > 0) {
        memoryAllCategoriesCache = list;
        return list;
      }
    }
  } catch (err) {
    console.warn(
      '[shlokaApi] Firestore fetch error from allshloakcategories doc:',
      err,
    );
  }

  try {
    const firestore = getFirestore();
    const categoriesColRef = collection(
      firestore,
      'categories',
      'shlokas',
      'shlokcategory',
    );
    const snap = await getDocs(categoriesColRef);

    if (!snap.empty) {
      const list: ShlokaCategory[] = snap.docs
        .filter(docSnap => docSnap.id !== 'allshloakcategories')
        .map(docSnap => {
          const data = docSnap.data();
          return {
            id: data.id || `occasion-${docSnap.id}`,
            slug: data.slug || docSnap.id,
            titleEn: data.titleEn || '',
            titleHi: data.titleHi || '',
            descriptionEn: data.descriptionEn || '',
            descriptionHi: data.descriptionHi || '',
            imageUrl: data.imageUrl || '',
          };
        });

      if (list.length > 0) {
        memoryAllCategoriesCache = list;
        return list;
      }
    }
  } catch (err) {
    console.warn(
      '[shlokaApi] Firestore fetch error from categories/shlokas/shlokcategory:',
      err,
    );
  }

  return [];
};

export default getAllShlokaCategoriesFromFirebase;
