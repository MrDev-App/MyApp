import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

export interface ShlokaCategory {
  id: string;
  slug: string;
  title?: string;
  titleEn?: string;
  titleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  imageUrl: string;
}

export interface ShlokaVerse {
  id: string;
  title: string;
  titleHi?: string;
  sanskrit: string;
  transliteration?: string;
  translationEn: string;
  translationHi?: string;
  meaningEn?: string;
  meaningHi?: string;
  deity?: string;
  image?: any;
  audioUrl?: string;
  link?: string;
}

export interface ShlokaSubItem {
  id: string;
  nameEn: string;
  nameHi: string;
  headerTitleEn: string;
  headerTitleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  sanskrit?: string;
  transliteration?: string;
  meaningHi?: string;
  meaningEn?: string;
  image?: any;
  imageUrl?: string;
  audioUrl?: string;
  deity?: string;
  path?: string;
  verses?: ShlokaVerse[];
}

export interface ShlokaCategoryDetail {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl?: string;
  path?: string;
  items: ShlokaSubItem[];
}

// In-memory runtime cache for detail & all categories (cleared on app kill)
const memoryCategoryCache = new Map<string, ShlokaCategoryDetail>();
let memoryAllCategoriesCache: ShlokaCategory[] | null = null;

export const getShlokaCategoryDetail = async (
  slugOrId: string,
): Promise<ShlokaCategoryDetail | null> => {
  const cleanSlug = (slugOrId || '')
    .toLowerCase()
    .replace('occasion-', '')
    .trim();

  // Check in-memory session cache (active only until app is killed)
  if (memoryCategoryCache.has(cleanSlug)) {
    return memoryCategoryCache.get(cleanSlug)!;
  }

  // Fetch directly from Firestore subcollection: categories > shlokas > shlokcategory > {slug}
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
      '[ShlokaService] Firestore fetch error from categories/shlokas/shlokcategory:',
      err,
    );
  }

  // Fallback to 'shloka_categories/{slug}' collection in Firestore
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
      '[ShlokaService] Firestore fetch error from shloka_categories:',
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

  //  Try reading the single consolidated doc 'allshloakcategories'
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
      '[ShlokaService] Firestore fetch error from allshloakcategories doc:',
      err,
    );
  }

  // Fallback: Query all category documents in subcollection (excluding allshloakcategories doc itself)
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
      '[ShlokaService] Firestore fetch error from categories/shlokas/shlokcategory:',
      err,
    );
  }

  return [];
};
