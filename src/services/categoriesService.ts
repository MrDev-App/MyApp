import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { categoriesData } from '@constants/categoriesData';
import { STORAGE_KEYS } from '@constants/storageKeys';

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  textEn?: string;
  textHi?: string;
  image?: any;
  headerTitleEn?: string;
  headerTitleHi?: string;
  isJyotirlinga?: boolean;
}

export interface Category {
  id: string;
  titleEn: string;
  titleHi: string;
  icon?: any;
  coverImage?: any;
  descriptionEn?: string;
  descriptionHi?: string;
  items: CategoryItem[];
}

// Backward compatibility alias
export type CategoryData = Category;

const storage = createMMKV();
export const CATEGORIES_DATA_CACHE_KEY = STORAGE_KEYS.CATEGORIES_CACHE;

const categoryIconMap: Record<string, any> = {
  aarti: imagePath.lamp,
  aartis: imagePath.lamp,
  shlok: imagePath.shlok,
  shlokas: imagePath.shlok,
  stories: imagePath.books,
  temples: imagePath.temples,
};

const categoryCoverMap: Record<string, any> = {
  aarti: imagePath.greeting,
  aartis: imagePath.greeting,
  shlok: imagePath.greeting,
  shlokas: imagePath.greeting,
  stories: imagePath.greeting,
  temples: imagePath.greeting,
};

export const resolveCategoryItemImage = (item: any): any => {
  if (
    item.imageUrl &&
    typeof item.imageUrl === 'string' &&
    item.imageUrl.trim().startsWith('http')
  ) {
    return { uri: item.imageUrl.trim() };
  }

  const rawId = (item.id || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');
  const engName = (item.nameEn || item.name || '').toLowerCase();
  const hinName = item.nameHi || '';

  if (
    cleanId.includes('ganesh') ||
    cleanId.includes('ganpati') ||
    engName.includes('ganesh') ||
    hinName.includes('गणेश') ||
    hinName.includes('गणपति')
  ) {
    return imagePath.Ganesha;
  }

  if (
    cleanId.includes('hanuman') ||
    cleanId.includes('bajrang') ||
    engName.includes('hanuman') ||
    hinName.includes('हनुमान') ||
    hinName.includes('बजरंग')
  ) {
    return imagePath.Hanuman;
  }

  if (
    cleanId.includes('ram') ||
    cleanId.includes('raghupati') ||
    engName.includes('ram') ||
    hinName.includes('राम') ||
    hinName.includes('रघुपति')
  ) {
    return imagePath.Rama;
  }

  if (
    cleanId.includes('laxmi') ||
    cleanId.includes('lakshmi') ||
    engName.includes('laxmi') ||
    engName.includes('lakshmi') ||
    hinName.includes('लक्ष्मी') ||
    hinName.includes('लक्समी')
  ) {
    return imagePath.Laxmi;
  }

  if (
    cleanId.includes('ganga') ||
    cleanId.includes('gange') ||
    engName.includes('ganga') ||
    hinName.includes('गंगा') ||
    hinName.includes('गंगे')
  ) {
    return imagePath.Gangama;
  }

  if (
    cleanId.includes('vishwakarma') ||
    cleanId.includes('viswakarma') ||
    cleanId.includes('vishvakarma') ||
    engName.includes('vishwakarma') ||
    hinName.includes('विश्वकर्मा')
  ) {
    return imagePath.Vishwakarma;
  }

  if (
    cleanId.includes('durga') ||
    cleanId.includes('vaishno') ||
    cleanId.includes('ambe') ||
    engName.includes('durga') ||
    hinName.includes('दुर्गा') ||
    hinName.includes('वैष्णो') ||
    hinName.includes('अम्बे')
  ) {
    return imagePath.Durga;
  }

  if (
    cleanId.includes('saraswati') ||
    cleanId.includes('gayatri') ||
    cleanId.includes('sharda') ||
    engName.includes('saraswati') ||
    hinName.includes('सरस्वती') ||
    hinName.includes('गायत्री') ||
    hinName.includes('शारदा')
  ) {
    return imagePath.Saraswati;
  }

  if (
    cleanId.includes('krishna') ||
    cleanId.includes('kanha') ||
    cleanId.includes('radha') ||
    cleanId.includes('bihari') ||
    engName.includes('krishna') ||
    hinName.includes('कृष्ण') ||
    hinName.includes('राधा') ||
    hinName.includes('कुंजबिहारी')
  ) {
    return imagePath.Krishna;
  }

  if (
    cleanId.includes('vishnu') ||
    cleanId.includes('narayan') ||
    cleanId.includes('jagdish') ||
    cleanId.includes('jagannath') ||
    cleanId.includes('badrinath') ||
    cleanId.includes('dwarkadhish') ||
    cleanId.includes('balaji') ||
    cleanId.includes('prahlad') ||
    engName.includes('vishnu') ||
    hinName.includes('विष्णु') ||
    hinName.includes('नारायण') ||
    hinName.includes('जगदीश') ||
    hinName.includes('जगन्नाथ') ||
    hinName.includes('बद्रीनाथ') ||
    hinName.includes('द्वारकाधीश') ||
    hinName.includes('बालाजी')
  ) {
    return imagePath.Vishnu;
  }

  if (
    cleanId.includes('shiv') ||
    cleanId.includes('bhole') ||
    cleanId.includes('mahadev') ||
    cleanId.includes('omkara') ||
    cleanId.includes('somnath') ||
    cleanId.includes('kedar') ||
    cleanId.includes('kashi') ||
    cleanId.includes('rameshwaram') ||
    cleanId.includes('mahakal') ||
    engName.includes('shiv') ||
    hinName.includes('शिव') ||
    hinName.includes('भोले') ||
    hinName.includes('महादेव') ||
    hinName.includes('सोमनाथ') ||
    hinName.includes('केदारनाथ') ||
    hinName.includes('काशी')
  ) {
    return imagePath.Bholenath;
  }

  if (
    cleanId.includes('kuber') ||
    engName.includes('kuber') ||
    hinName.includes('कुबेर')
  ) {
    return imagePath.Kubera;
  }

  if (
    cleanId.includes('brahma') ||
    engName.includes('brahma') ||
    hinName.includes('ब्रह्मा')
  ) {
    return imagePath.Brahma;
  }

  if (
    cleanId.includes('surya') ||
    engName.includes('surya') ||
    hinName.includes('सूर्य')
  ) {
    return imagePath.Surya;
  }

  if (
    cleanId.includes('meenakshi') ||
    cleanId.includes('lotus') ||
    engName.includes('meenakshi') ||
    hinName.includes('मीनाक्षी')
  ) {
    return imagePath.lotus;
  }

  return item.image || imagePath.greeting;
};

export const mapCategoryItemWithImage = (item: any): CategoryItem => {
  const itemId = item.id || '';
  const image = resolveCategoryItemImage(item);

  return {
    id: itemId,
    nameEn: item.nameEn || '',
    nameHi: item.nameHi || '',
    subtitleEn: item.subtitleEn || '',
    subtitleHi: item.subtitleHi || '',
    textEn: item.textEn || '',
    textHi: item.textHi || '',
    image,
    headerTitleEn: item.headerTitleEn || '',
    headerTitleHi: item.headerTitleHi || '',
    isJyotirlinga: item.isJyotirlinga ?? false,
  };
};

export const resolveCategoryIcon = (category: any): any => {
  if (
    category.iconUrl &&
    typeof category.iconUrl === 'string' &&
    category.iconUrl.trim().startsWith('http')
  ) {
    return { uri: category.iconUrl.trim() };
  }

  const catId = (category.id || '').toLowerCase().trim();
  const cleanId = catId.replace(/[^a-z0-9]/g, '');

  if (categoryIconMap[catId]) return categoryIconMap[catId];
  if (categoryIconMap[cleanId]) return categoryIconMap[cleanId];

  const title = (category.titleEn || '').toLowerCase();
  const titleHi = category.titleHi || '';

  if (title.includes('aarti') || title.includes('arti') || titleHi.includes('आरती')) {
    return imagePath.lamp;
  }
  if (title.includes('shlok') || titleHi.includes('श्लोक')) {
    return imagePath.shlok;
  }
  if (title.includes('stori') || title.includes('katha') || titleHi.includes('कथा')) {
    return imagePath.books;
  }
  if (title.includes('temple') || titleHi.includes('मंदिर')) {
    return imagePath.temples;
  }

  return category.icon || imagePath.lamp;
};

export const resolveCategoryCover = (category: any): any => {
  if (
    category.coverImageUrl &&
    typeof category.coverImageUrl === 'string' &&
    category.coverImageUrl.trim().startsWith('http')
  ) {
    return { uri: category.coverImageUrl.trim() };
  }

  const catId = (category.id || '').toLowerCase().trim();
  const cleanId = catId.replace(/[^a-z0-9]/g, '');

  if (categoryCoverMap[catId]) return categoryCoverMap[catId];
  if (categoryCoverMap[cleanId]) return categoryCoverMap[cleanId];

  return category.coverImage || imagePath.greeting;
};

export const mapCategoryWithImage = (category: any): Category => {
  const catId = category.id || '';
  const icon = resolveCategoryIcon(category);
  const coverImage = resolveCategoryCover(category);
  const items = (category.items || []).map(mapCategoryItemWithImage);

  return {
    id: catId,
    titleEn: category.titleEn || '',
    titleHi: category.titleHi || '',
    icon,
    coverImage,
    descriptionEn: category.descriptionEn || '',
    descriptionHi: category.descriptionHi || '',
    items,
  };
};

export const getCategoriesData = async (): Promise<Category[]> => {
  try {
    const cachedData = storage.getString(CATEGORIES_DATA_CACHE_KEY);

    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      return parsed.map(mapCategoryWithImage);
    }

    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'categories'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      storage.set(CATEGORIES_DATA_CACHE_KEY, JSON.stringify(rawList));
      return rawList.map(mapCategoryWithImage);
    }

    return categoriesData;
  } catch (error) {
    console.error('Error fetching categories from Firestore:', error);
    return categoriesData;
  }
};

export const clearCategoriesDataCache = (): void => {
  storage.remove(CATEGORIES_DATA_CACHE_KEY);
};
