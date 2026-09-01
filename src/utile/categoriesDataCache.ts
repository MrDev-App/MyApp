import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '../assets';

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  textEn?: string;
  textHi: string;
  image: any;
  headerTitleEn?: string;
  headerTitleHi?: string;
  isJyotirlinga?: boolean;
}

export interface Category {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: any;
  coverImage?: any;
  descriptionEn: string;
  descriptionHi: string;
  items: CategoryItem[];
}

const storage = createMMKV();
export const CATEGORIES_DATA_CACHE_KEY = 'categories_data_cache';

const categoryIconMap: Record<string, any> = {
  aarti: imagePath.lamp,
  arti: imagePath.lamp,
  shlok: imagePath.shlok,
  shloka: imagePath.shlok,
  stories: imagePath.books,
  story: imagePath.books,
  books: imagePath.books,
  temples: imagePath.temples,
  temple: imagePath.temples,
};

const categoryCoverMap: Record<string, any> = {
  aarti: imagePath.Ganesha,
  arti: imagePath.Ganesha,
  shlok: imagePath.Krishna,
  shloka: imagePath.Krishna,
  stories: imagePath.Rama,
  temples: imagePath.Rama,
};

const categoryItemImageMap: Record<string, any> = {
  // Aartis
  ganesha_aarti: imagePath.Ganesha,
  ganesh_aarti: imagePath.Ganesha,
  ganeshaji_aarti: imagePath.Ganesha,
  shiva_aarti: imagePath.Bholenath,
  shiv_aarti: imagePath.Bholenath,
  shivaji_aarti: imagePath.Bholenath,
  lakshmi_aarti: imagePath.Laxmi,
  laxmi_aarti: imagePath.Laxmi,
  laxmimata_aarti: imagePath.Laxmi,
  lakshmimata_aarti: imagePath.Laxmi,
  hanuman_aarti: imagePath.Hanuman,
  hanumanji_aarti: imagePath.Hanuman,
  ram_aarti: imagePath.Rama,
  rama_aarti: imagePath.Rama,
  shriram_aarti: imagePath.Rama,
  ramji_aarti: imagePath.Rama,
  durga_aarti: imagePath.Durga,
  durgamata_aarti: imagePath.Durga,
  durgamaa_aarti: imagePath.Durga,
  vishnu_aarti: imagePath.Vishnu,
  vishnuji_aarti: imagePath.Vishnu,
  saraswati_aarti: imagePath.Saraswati,
  saraswatimata_aarti: imagePath.Saraswati,
  santoshi_aarti: imagePath.Laxmi,
  santoshimaa_aarti: imagePath.Laxmi,
  gayatri_aarti: imagePath.Saraswati,
  gayatrimaa_aarti: imagePath.Saraswati,
  krishna_aarti: imagePath.Krishna,
  krishnaji_aarti: imagePath.Krishna,
  kuber_aarti: imagePath.Kubera,
  kubera_aarti: imagePath.Kubera,
  brahma_aarti: imagePath.Brahma,
  brahmaji_aarti: imagePath.Brahma,
  kali_aarti: imagePath.Durga,
  kalimaa_aarti: imagePath.Durga,
  surya_aarti: imagePath.Surya,
  shani_aarti: imagePath.ShaniDev,

  // Shloks
  ganesha_vakratunda: imagePath.Ganesha,
  shiva_karpur: imagePath.Bholenath,
  vishnu_shantakaram: imagePath.Vishnu,

  // Stories
  samudra_manthan: imagePath.Bholenath,
  bhakt_prahlad: imagePath.Vishnu,

  // Jyotirlingas & Temples
  somnath: imagePath.Bholenath,
  mallikarjuna: imagePath.Bholenath,
  mahakaleshwar: imagePath.Bholenath,
  omkareshwar: imagePath.Bholenath,
  kedarnath: imagePath.Bholenath,
  bhimashankar: imagePath.Bholenath,
  kashi_vishwanath: imagePath.Bholenath,
  trimbakeshwar: imagePath.Bholenath,
  vaidyanath: imagePath.Bholenath,
  nageshwar: imagePath.Bholenath,
  rameshwaram: imagePath.Bholenath,
  grishneshwar: imagePath.Bholenath,
  badrinath: imagePath.Vishnu,
  jagannath_puri: imagePath.Vishnu,
  dwarkadhish: imagePath.Vishnu,
  tirupati_balaji: imagePath.Vishnu,
  vaishno_devi: imagePath.Durga,
  meenakshi: imagePath.lotus,
};

export const resolveCategoryItemImage = (item: any): any => {
  // If remote URL is provided and valid, use it
  if (
    item.imageUrl &&
    typeof item.imageUrl === 'string' &&
    item.imageUrl.trim().startsWith('http')
  ) {
    return { uri: item.imageUrl.trim() };
  }

  const rawId = (item.id || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (categoryItemImageMap[rawId]) return categoryItemImageMap[rawId];
  if (categoryItemImageMap[cleanId]) return categoryItemImageMap[cleanId];

  const engName = (item.nameEn || item.headerTitleEn || item.subtitleEn || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const hinName =
    item.nameHi || item.headerTitleHi || item.subtitleHi || item.textHi || '';

  // Ganesha
  if (
    cleanId.includes('ganesh') ||
    cleanId.includes('ganpati') ||
    cleanId.includes('vinayak') ||
    engName.includes('ganesh') ||
    engName.includes('ganpati') ||
    hinName.includes('गणेश') ||
    hinName.includes('गणपति')
  ) {
    return imagePath.Ganesha;
  }

  // Laxmi / Lakshmi / Santoshi
  if (
    cleanId.includes('laxmi') ||
    cleanId.includes('lakshmi') ||
    cleanId.includes('santoshi') ||
    engName.includes('laxmi') ||
    engName.includes('lakshmi') ||
    engName.includes('santoshi') ||
    hinName.includes('लक्ष्मी') ||
    hinName.includes('संतोषी')
  ) {
    return imagePath.Laxmi;
  }

  // Ram / Rama
  if (
    cleanId.includes('ram') ||
    engName.includes('ram') ||
    hinName.includes('राम')
  ) {
    return imagePath.Rama;
  }

  // Hanuman
  if (
    cleanId.includes('hanuman') ||
    cleanId.includes('bajrang') ||
    engName.includes('hanuman') ||
    engName.includes('bajrang') ||
    hinName.includes('हनुमान') ||
    hinName.includes('बजरंग')
  ) {
    return imagePath.Hanuman;
  }

  // Durga / Kali / Vaishno Devi / Ambe
  if (
    cleanId.includes('durga') ||
    cleanId.includes('kali') ||
    cleanId.includes('vaishno') ||
    cleanId.includes('ambe') ||
    engName.includes('durga') ||
    engName.includes('kali') ||
    engName.includes('vaishno') ||
    hinName.includes('दुर्गा') ||
    hinName.includes('काली') ||
    hinName.includes('वैष्णो') ||
    hinName.includes('अम्बे')
  ) {
    return imagePath.Durga;
  }

  // Saraswati / Gayatri
  if (
    cleanId.includes('saraswati') ||
    cleanId.includes('gayatri') ||
    cleanId.includes('sharda') ||
    engName.includes('saraswati') ||
    engName.includes('gayatri') ||
    hinName.includes('सरस्वती') ||
    hinName.includes('गायत्री') ||
    hinName.includes('शारदा')
  ) {
    return imagePath.Saraswati;
  }

  // Krishna / Radha
  if (
    cleanId.includes('krishna') ||
    cleanId.includes('kanha') ||
    cleanId.includes('radha') ||
    cleanId.includes('bihari') ||
    engName.includes('krishna') ||
    engName.includes('radha') ||
    engName.includes('bihari') ||
    hinName.includes('कृष्ण') ||
    hinName.includes('राधा') ||
    hinName.includes('कुंजबिहारी')
  ) {
    return imagePath.Krishna;
  }

  // Vishnu / Narayan / Jagannath / Balaji / Puri / Badrinath / Dwarka
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
    engName.includes('narayan') ||
    engName.includes('jagdish') ||
    engName.includes('jagannath') ||
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

  // Shiva / Jyotirlingas
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
    engName.includes('bhole') ||
    engName.includes('mahadev') ||
    engName.includes('somnath') ||
    engName.includes('kedar') ||
    hinName.includes('शिव') ||
    hinName.includes('भोले') ||
    hinName.includes('महादेव') ||
    hinName.includes('सोमनाथ') ||
    hinName.includes('केदारनाथ') ||
    hinName.includes('काशी')
  ) {
    return imagePath.Bholenath;
  }

  // Kubera
  if (
    cleanId.includes('kuber') ||
    engName.includes('kuber') ||
    hinName.includes('कुबेर')
  ) {
    return imagePath.Kubera;
  }

  // Brahma
  if (
    cleanId.includes('brahma') ||
    engName.includes('brahma') ||
    hinName.includes('ब्रह्मा')
  ) {
    return imagePath.Brahma;
  }

  // Surya
  if (
    cleanId.includes('surya') ||
    engName.includes('surya') ||
    hinName.includes('सूर्य')
  ) {
    return imagePath.Surya;
  }

  // Lotus / Meenakshi
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
    // 1. Check MMKV cache first
    const cachedData = storage.getString(CATEGORIES_DATA_CACHE_KEY);

    if (cachedData) {
      console.log('Loaded from MMKV cache');
      const parsed: any[] = JSON.parse(cachedData);
      console.log('Categories from cache:', parsed);
      return parsed.map(mapCategoryWithImage);
    }

    // 2. Fetch from Firestore (first time only)
    console.log('Fetching from Firestore (first time only)...');
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'categories'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }
    console.log('Categories fetched from Firestore:', rawList);

    // 3. Save as plain JSON string in MMKV
    if (rawList.length > 0) {
      storage.set(CATEGORIES_DATA_CACHE_KEY, JSON.stringify(rawList));
    }

    return rawList.map(mapCategoryWithImage);
  } catch (error) {
    console.error('Error fetching categories from Firestore:', error);
    return [];
  }
};

export const clearCategoriesDataCache = (): void => {
  storage.remove(CATEGORIES_DATA_CACHE_KEY);
};
