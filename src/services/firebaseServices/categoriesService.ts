import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import {
  categoriesData as localCategories,
  Category,
  CategoryItem,
} from '@constants/categoriesData';

export type { Category, CategoryItem };

/**
 * Resolves a local image from imagePath for an aarti or category item.
 * Strictly uses local bundled images as requested.
 */
export const resolveLocalAartiImage = (item: any): any => {
  const rawId = (item.id || item.nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  // 1. Direct match with id
  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }

  // 2. Extract deity prefix (e.g., 'ganesha_aarti' -> 'ganesha')
  const deityKey = rawId.replace(/_aarti|_chalisa|_shlok|_mantra|_stotram/g, '').trim();
  const cleanDeityKey = deityKey.replace(/[^a-z0-9]/g, '');

  if (cleanDeityKey && (imagePath as any)[cleanDeityKey]) {
    return (imagePath as any)[cleanDeityKey];
  }

  // 3. Match known deity keywords in the ID or name
  const deityKeywords = [
    'ganesha', 'ganesh', 'ganpati',
    'shiva', 'shiv', 'bholenath', 'bhole', 'mahadev',
    'hanuman', 'bajrangbali',
    'krishna', 'kanha', 'radha', 'kunjbihari',
    'rama', 'ram', 'shriram',
    'durga', 'kali', 'kalimaa',
    'laxmi', 'lakshmi',
    'saraswati', 'gayatri',
    'surya', 'suryadev',
    'vishnu', 'narayan', 'jagdish', 'satyanarayan',
    'shani', 'shanidev',
    'brahma', 'kubera', 'kuber',
    'ganga', 'vishwakarma',
  ];

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  // 4. Fallback to local default image
  return imagePath.Ganesha || imagePath.greeting;
};

/**
 * Resolves icon or cover for the whole category.
 */
export const resolveCategoryCover = (catId: string): any => {
  const id = catId.toLowerCase();
  if (id.includes('aarti')) return imagePath.Ganesha;
  if (id.includes('shlok')) return imagePath.Vishnu;
  return imagePath.greeting;
};

/**
 * Maps Firestore category document to typed Category with local images.
 */
export const mapCategoryDoc = (docId: string, data: any): Category => {
  const id = (docId || data.id || '').toLowerCase();
  
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const items: CategoryItem[] = rawItems.map((item: any, index: number) => ({
    id: item.id || `${id}_item_${index}`,
    nameEn: item.nameEn || item.name || '',
    nameHi: item.nameHi || '',
    subtitleEn: item.subtitleEn || '',
    subtitleHi: item.subtitleHi || '',
    textEn: item.textEn || '',
    textHi: item.textHi || item.text || '',
    headerTitleEn: item.headerTitleEn || '',
    headerTitleHi: item.headerTitleHi || '',
    isJyotirlinga: Boolean(item.isJyotirlinga),
    // Use local bundled image for Aarti and other items
    image: resolveLocalAartiImage(item),
  }));

  return {
    id,
    titleEn: data.titleEn || data.nameEn || (id === 'aarti' ? 'Aarti' : id === 'shlok' ? 'Shlok' : id),
    titleHi: data.titleHi || data.nameHi || (id === 'aarti' ? 'आरती' : id === 'shlok' ? 'श्लोक' : id),
    icon: imagePath.lamp,
    coverImage: resolveCategoryCover(id),
    descriptionEn: data.descriptionEn || '',
    descriptionHi: data.descriptionHi || '',
    items,
  };
};

/**
 * Fetches all categories from Firestore collection 'categories'
 */
export const getCategoriesData = async (): Promise<Category[]> => {
  console.log('----------------------------------------------------');
  console.log('🌸 [CategoriesService] Fetching categories from Firestore...');

  try {
    const db = getFirestore();
    const categoriesRef = collection(db, 'categories');

    let snapshot = await getDocs(categoriesRef);

    if (!snapshot || snapshot.empty) {
      console.warn('⚠️ [CategoriesService] No categories found in Firestore, using localCategories.');
      console.log('----------------------------------------------------');
      return localCategories;
    }

    const categories: Category[] = snapshot.docs.map(docSnap => {
      const mapped = mapCategoryDoc(docSnap.id, docSnap.data());
      console.log(`📌 [CategoriesService] Category [${docSnap.id}] -> ${mapped.titleEn} (${mapped.items.length} items, all with local images)`);
      return mapped;
    });

    console.log(`✅ [CategoriesService] Successfully loaded ${categories.length} categories.`);
    console.log('----------------------------------------------------');
    return categories;
  } catch (error) {
    console.error('❌ [CategoriesService] Firestore fetch failed! Falling back to localCategories:', error);
    console.log('----------------------------------------------------');
    return localCategories;
  }
};

export default getCategoriesData;
