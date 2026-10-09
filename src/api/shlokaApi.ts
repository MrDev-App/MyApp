import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { ShlokaCategory, ShlokaCategoryDetail, ShlokaSubItem } from './types';

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

/**
 * Comprehensive keyword dictionary for all 8 Shloka categories.
 */
const SHLOKA_CATEGORY_KEYWORDS: Record<string, string[]> = {
  'through-the-day': [
    'day',
    'daily',
    'thought',
    'thoughts',
    'morning',
    'waking',
    'wake',
    'sleep',
    'night',
    'evening',
    'routine',
    'life',
    'eating',
    'food',
    'bathing',
    'bath',
    'sun',
    'lamp',
    'dinacharya',
    'sunrise',
    'sunset',
    'दिनचर्या',
    'दैनिक',
    'सुबह',
    'प्रातः',
    'रात',
    'भोजन',
    'सूर्य',
    'स्नान',
    'दीप',
    'शयन',
  ],
  'health-protection': [
    'health',
    'protection',
    'protect',
    'healing',
    'immunity',
    'disease',
    'safety',
    'body',
    'cure',
    'strength',
    'shield',
    'arogya',
    'swasthya',
    'raksha',
    'सुरक्षा',
    'स्वास्थ्य',
    'आरोग्य',
    'रोग',
    'रक्षा',
    'कवच',
    'बल',
  ],
  'work-money': [
    'work',
    'money',
    'wealth',
    'finance',
    'business',
    'job',
    'career',
    'office',
    'laxmi',
    'lakshmi',
    'dhan',
    'samriddhi',
    'vyapar',
    'labh',
    'kuber',
    'धन',
    'व्यापार',
    'नौकरी',
    'कार्य',
    'लक्ष्मी',
    'समृद्धि',
    'लाभ',
    'कुबेर',
    'अर्थ',
  ],
  'study-success': [
    'study',
    'studies',
    'success',
    'exam',
    'exams',
    'education',
    'school',
    'college',
    'student',
    'knowledge',
    'saraswati',
    'vidya',
    'safalta',
    'shiksha',
    'memory',
    'concentration',
    'विद्या',
    'सफलता',
    'पढ़ाई',
    'परीक्षा',
    'ज्ञान',
    'सरस्वती',
    'शिक्षा',
    'स्मृति',
    'एकाग्रता',
  ],
  'home-family': [
    'home',
    'family',
    'house',
    'relatives',
    'parents',
    'griha',
    'parivar',
    'shanti',
    'vastu',
    'ghar',
    'makan',
    'घर',
    'परिवार',
    'गृह',
    'वास्तु',
    'माता',
    'पिता',
    'शांति',
  ],
  'for-children': [
    'children',
    'child',
    'kids',
    'kid',
    'baby',
    'son',
    'daughter',
    'santan',
    'bachhe',
    'balak',
    'shishu',
    'sanskara',
    'बच्चे',
    'संतान',
    'बालक',
    'बाल',
    'शिशु',
    'संस्कार',
  ],
  'mind-heart': [
    'mind',
    'heart',
    'peace',
    'mental',
    'calm',
    'anxiety',
    'stress',
    'fear',
    'grief',
    'anger',
    'forgiveness',
    'courage',
    'inner',
    'man',
    'shanti',
    'hridaya',
    'sukha',
    'dukkha',
    'मन',
    'शांति',
    'हृदय',
    'तनाव',
    'चिंता',
    'क्रोध',
    'क्षमा',
    'भय',
    'दुख',
  ],
  'the-spiritual-path': [
    'spiritual',
    'spirituality',
    'path',
    'god',
    'divine',
    'meditation',
    'moksha',
    'liberation',
    'soul',
    'guru',
    'sadhana',
    'adhyatma',
    'bhakti',
    'dhyan',
    'atman',
    'brahman',
    'मार्ग',
    'अध्यात्म',
    'साधना',
    'भक्ति',
    'मोक्ष',
    'ध्यान',
    'गुरु',
    'आत्मा',
    'ईश्वर',
  ],
};

const normalizeCategorySlug = (raw: string): string => {
  const s = (raw || '')
    .toLowerCase()
    .replace('occasion-', '')
    .replace(/_/g, '-')
    .trim();
  if (s.includes('day') || s.includes('daily')) return 'through-the-day';
  if (s.includes('health') || s.includes('protection')) return 'health-protection';
  if (s.includes('work') || s.includes('money')) return 'work-money';
  if (s.includes('study') || s.includes('success')) return 'study-success';
  if (s.includes('home') || s.includes('family')) return 'home-family';
  if (s.includes('child')) return 'for-children';
  if (s.includes('mind') || s.includes('heart')) return 'mind-heart';
  if (s.includes('spirit') || s.includes('path')) return 'the-spiritual-path';
  return s;
};

/**
 * Match a reminder title or subtitle against shloka categories and subcategories.
 * Returns the best-matching category using a scored priority algorithm.
 */
export const findShlokaCategoryOrSubcategory = async (
  queryText: string,
): Promise<{
  category?: ShlokaCategory;
  subcategory?: ShlokaSubItem;
} | null> => {
  if (!queryText || !queryText.trim()) return null;
  const q = queryText.toLowerCase().trim();
  const queryWords = q
    .split(/[\s,.-]+/)
    .map(w => w.trim())
    .filter(w => w.length > 1);

  const categories = await getAllShlokaCategoriesFromFirebase();
  if (!categories || categories.length === 0) return null;

  let bestCategory: ShlokaCategory | null = null;
  let bestScore = 0;

  for (const cat of categories) {
    let score = 0;
    const catEn = (cat.titleEn || '').toLowerCase();
    const catHi = (cat.titleHi || '').toLowerCase();
    const cleanSlug = normalizeCategorySlug(cat.slug || cat.id || '');
    const descEn = (cat.descriptionEn || '').toLowerCase();
    const descHi = (cat.descriptionHi || '').toLowerCase();

    // 1. Direct Category Title / Slug Match (Highest priority)
    if (catEn && (q === catEn || catEn === q)) {
      score += 200;
    } else if (catHi && (q === catHi || catHi === q)) {
      score += 200;
    } else if (cleanSlug && q === cleanSlug) {
      score += 200;
    }

    // Word match in Category Title
    queryWords.forEach(w => {
      if (catEn.split(/[\s&,-]+/).some(cw => cw.toLowerCase() === w)) {
        score += 100;
      } else if (catEn.includes(w)) {
        score += 60;
      }
      if (catHi.split(/[\s&,-]+/).some(cw => cw.toLowerCase() === w)) {
        score += 100;
      } else if (catHi.includes(w)) {
        score += 60;
      }
      if (cleanSlug.split('-').some(cw => cw === w)) {
        score += 80;
      }
    });

    // 2. Exact Keyword Dictionary Match
    const catKeywords = SHLOKA_CATEGORY_KEYWORDS[cleanSlug] || [];
    queryWords.forEach(w => {
      if (catKeywords.includes(w)) {
        score += 70;
      }
    });
    if (catKeywords.some(kw => q === kw)) {
      score += 120;
    } else if (catKeywords.some(kw => q.includes(kw))) {
      score += 50;
    }

    // 3. Subcategories title matching for this category
    const detail = await getShlokaCategoryDetail(cat.slug || cat.id);
    if (detail && detail.items && detail.items.length > 0) {
      for (const item of detail.items) {
        const itemEn = (item.nameEn || item.headerTitleEn || '').toLowerCase();
        const itemHi = (item.nameHi || item.headerTitleHi || '').toLowerCase();

        if (itemEn && (q === itemEn || itemEn === q)) {
          score += 90;
        } else if (itemHi && (q === itemHi || itemHi === q)) {
          score += 90;
        } else {
          queryWords.forEach(w => {
            if (itemEn.split(/[\s&,-]+/).some(iw => iw === w)) {
              score += 40;
            }
            if (itemHi.split(/[\s&,-]+/).some(iw => iw === w)) {
              score += 40;
            }
          });
        }
      }
    }

    // 4. Description Word Match (Lowest priority, whole words only)
    queryWords.forEach(w => {
      if (w.length >= 4) {
        const descWordsEn = descEn.split(/[\s,.-]+/);
        const descWordsHi = descHi.split(/[\s,.-]+/);
        if (descWordsEn.includes(w) || descWordsHi.includes(w)) {
          score += 15;
        }
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }

  if (bestCategory && bestScore > 0) {
    return { category: bestCategory };
  }

  return null;
};

export default getAllShlokaCategoriesFromFirebase;
