import {
  getFirestore,
  collection,
  getDocsFromServer,
  query,
  orderBy,
  limit,
  doc,
  getDocFromServer,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { TempleCategory, TempleItem } from './types';

export type {
  TempleCategory,
  TempleItem,
  GeoLocation,
  TempleTiming,
  HowToReach,
  TempleFestival,
} from './types';

export const FIRESTORE_COLLECTION_NAME = 'templeData';

// In-memory runtime session cache for temples (stored in RAM only; not saved in device storage/SQLite; wiped when app is closed/killed)
let memoryAllTemplesCache: TempleItem[] | null = null;

/**
 * Resolves local image asset fallback if remote imageUrl is not available
 */
const resolveTempleImage = (id: string, remoteUrl?: string): any => {
  if (
    remoteUrl &&
    typeof remoteUrl === 'string' &&
    remoteUrl.trim().length > 0
  ) {
    return remoteUrl;
  }
  const imageMap: Record<string, any> = {
    badrinath_dham: imagePath.badrinathDham,
    dwarkadhish_dham: imagePath.dwarkadhishDham,
    jagannath_puri_dham: imagePath.jagannathPuriDham,
    rameshwaram_dham: imagePath.rameshwaramJyotirlinga,
    somnath_jyotirlinga: imagePath.somnathJyotirlinga,
    mallikarjuna_jyotirlinga: imagePath.mallikarjunaJyotirlinga,
    mahakaleshwar_jyotirlinga: imagePath.mahakaleshwarJyotirlinga,
    omkareshwar_jyotirlinga: imagePath.omkareshwarJyotirlinga,
    kedarnath_jyotirlinga: imagePath.kedarnathJyotirlinga,
    bhimashankar_jyotirlinga: imagePath.bhimashankarJyotirlinga,
    kashi_vishwanath_jyotirlinga: imagePath.kashiVishwanathJyotirlinga,
    trimbakeshwar_jyotirlinga: imagePath.trimbakeshwarJyotirlinga,
    vaidyanath_jyotirlinga: imagePath.vaidyanathJyotirlinga,
    nageshwar_jyotirlinga: imagePath.nageshwarJyotirlinga,
    rameshwaram_jyotirlinga: imagePath.rameshwaramJyotirlinga,
    grishneshwar_jyotirlinga: imagePath.grishneshwarJyotirlinga,
    ram_mandir_ayodhya: imagePath.Rama,
    tirupati_balaji: imagePath.Vishnu,
    meenakshi_amman: imagePath.Durga,
    vaishno_devi: imagePath.Durga,
    siddhivinayak_mumbai: imagePath.Ganesha,
    kamakhya_temple: imagePath.Kali,
  };
  return imageMap[id] || imagePath.fallBackImage;
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

  const imgUrl =
    data.imageUrl || (typeof data.image === 'string' ? data.image : '');

  return {
    id: id || data.id,
    order: typeof data.order === 'number' ? data.order : 999,
    isActive: data.isActive !== undefined ? data.isActive : true,
    updatedAt: data.updatedAt,
    nameHi: data.nameHi || data.name || '',
    nameEn: data.nameEn || data.englishName || '',
    aliasNamesHi: data.aliasNamesHi || [],
    aliasNamesEn: data.aliasNamesEn || [],
    locationHi: data.locationHi || '',
    locationEn: data.locationEn || '',
    addressHi: data.addressHi || '',
    addressEn: data.addressEn || '',
    districtHi: data.districtHi || '',
    districtEn: data.districtEn || '',
    stateHi: data.stateHi || '',
    stateEn: data.stateEn || '',
    countryHi: data.countryHi || 'भारत',
    countryEn: data.countryEn || 'India',
    pincode: data.pincode || '',
    geo: data.geo || undefined,
    deityHi: data.deityHi || '',
    deityEn: data.deityEn || '',
    otherDeitiesHi: data.otherDeitiesHi || [],
    otherDeitiesEn: data.otherDeitiesEn || [],
    yugaHi: data.yugaHi || '',
    yugaEn: data.yugaEn || '',
    directionHi: data.directionHi || '',
    directionEn: data.directionEn || '',
    mythologyHi: data.mythologyHi || '',
    mythologyEn: data.mythologyEn || '',
    image: resolveTempleImage(id || data.id, imgUrl),
    imageUrl: imgUrl,
    galleryImageUrls: data.galleryImageUrls || [],
    videoUrl: data.videoUrl || '',
    aartiAudioUrl: data.aartiAudioUrl || '',
    category: data.category || categories[0] || 'major',
    categories,
    isCharDham: !!data.isCharDham || categories.includes('chardham'),
    isJyotirlinga: !!data.isJyotirlinga || categories.includes('jyotirlinga'),
    isShaktipeeth: !!data.isShaktipeeth || categories.includes('shaktipeeth'),
    isChotaCharDham:
      !!data.isChotaCharDham || categories.includes('chota_chardham'),
    isDivyaDesam: !!data.isDivyaDesam,
    tags: data.tags || [],
    historyHi: data.historyHi || '',
    historyEn: data.historyEn || '',
    builtCentury: data.builtCentury || '',
    builtByHi: data.builtByHi || '',
    builtByEn: data.builtByEn || '',
    architectureStyleHi: data.architectureStyleHi || '',
    architectureStyleEn: data.architectureStyleEn || '',
    significanceHi: data.significanceHi || '',
    significanceEn: data.significanceEn || '',
    descriptionHi: data.descriptionHi || '',
    descriptionEn: data.descriptionEn || '',
    timing:
      data.timing && typeof data.timing === 'object'
        ? data.timing
        : {
            openingTime: data.timingEn || data.timingHi || '',
            closingTime: '',
            aartiTimingsHi: '',
            aartiTimingsEn: '',
            bestTimeToVisitHi: '',
            bestTimeToVisitEn: '',
          },
    entryFeeHi: data.entryFeeHi || '',
    entryFeeEn: data.entryFeeEn || '',
    dressCodeHi: data.dressCodeHi || '',
    dressCodeEn: data.dressCodeEn || '',
    festivals: Array.isArray(data.festivals) ? data.festivals : [],
    howToReach: data.howToReach || undefined,
    nearbyAttractionsHi: data.nearbyAttractionsHi || '',
    nearbyAttractionsEn: data.nearbyAttractionsEn || '',
    nearbyTempleIds: data.nearbyTempleIds || [],
    officialWebsite: data.officialWebsite || '',
    contactPhone: data.contactPhone || '',
  };
};

export interface FetchTemplesOptions {
  category?: string;
  searchQuery?: string;
  limitCount?: number;
  forceRefresh?: boolean;
}

/**
 * Fetch temples strictly from Firestore server over network with limit (default 10).
 * If offline or no internet, it fails/returns empty array to allow skeleton loading.
 * Stores strictly in RAM memory during runtime.
 */
export const fetchAllTemplesFromFirestore = async (
  limitCount?: number,
  forceRefresh = false,
): Promise<TempleItem[]> => {
  if (
    !forceRefresh &&
    memoryAllTemplesCache &&
    memoryAllTemplesCache.length > 0
  ) {
    if (typeof limitCount === 'number' && limitCount > 0) {
      if (memoryAllTemplesCache.length >= limitCount) {
        return memoryAllTemplesCache.slice(0, limitCount);
      }
    } else {
      return memoryAllTemplesCache;
    }
  }

  try {
    const db = getFirestore();
    const templesRef = collection(db, FIRESTORE_COLLECTION_NAME);
    let snapshot;

    try {
      const q =
        typeof limitCount === 'number' && limitCount > 0
          ? query(templesRef, orderBy('order', 'asc'), limit(limitCount))
          : query(templesRef, orderBy('order', 'asc'));
      snapshot = await getDocsFromServer(q);
    } catch {
      const q =
        typeof limitCount === 'number' && limitCount > 0
          ? query(templesRef, limit(limitCount))
          : templesRef;
      snapshot = await getDocsFromServer(q as any);
    }

    if (snapshot && !snapshot.empty) {
      const items: TempleItem[] = snapshot.docs
        .map(docSnap => mapFirestoreDocToTemple(docSnap.id, docSnap.data()))
        .filter(item => item.isActive !== false)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      if (items.length > 0) {
        if (memoryAllTemplesCache && memoryAllTemplesCache.length > 0) {
          const idMap = new Map<string, TempleItem>();
          memoryAllTemplesCache.forEach(t => idMap.set(t.id, t));
          items.forEach(t => idMap.set(t.id, t));
          memoryAllTemplesCache = Array.from(idMap.values()).sort(
            (a, b) => (a.order ?? 999) - (b.order ?? 999),
          );
        } else {
          memoryAllTemplesCache = items;
        }

        return typeof limitCount === 'number' && limitCount > 0
          ? items.slice(0, limitCount)
          : items;
      }
    }
  } catch (error) {
    console.warn(
      `⚠️ [templeApi] Offline/Server error fetching from '${FIRESTORE_COLLECTION_NAME}':`,
      error,
    );
  }

  if (
    typeof limitCount === 'number' &&
    limitCount > 0 &&
    memoryAllTemplesCache
  ) {
    return memoryAllTemplesCache.slice(0, limitCount);
  }

  return memoryAllTemplesCache || [];
};

/**
 * Fetch temples by Category and/or Search Query with optional limit (e.g. initial 10 items).
 * Does not store searches or data in device persistent storage, only in RAM.
 */
export const fetchTemples = async (
  options: FetchTemplesOptions = {},
): Promise<TempleItem[]> => {
  const {
    category = 'all',
    searchQuery = '',
    limitCount = 10,
    forceRefresh = false,
  } = options;

  const all = await fetchAllTemplesFromFirestore(limitCount, forceRefresh);

  if (all.length === 0) {
    return [];
  }

  let list: TempleItem[] = [];

  if (category === 'all') {
    list = all;
  } else {
    list = all.filter(item => {
      const inCategories =
        item.categories && item.categories.includes(category as TempleCategory);
      const isPrimary = item.category === category;
      const isFlagMatch =
        (category === 'chardham' && item.isCharDham) ||
        (category === 'jyotirlinga' && item.isJyotirlinga) ||
        (category === 'shaktipeeth' && item.isShaktipeeth);

      return inCategories || isPrimary || isFlagMatch;
    });
  }

  const q = searchQuery.toLowerCase().trim();
  if (q.length > 0) {
    list = list.filter(item => {
      const name = (item.nameHi + ' ' + item.nameEn).toLowerCase();
      const location = (
        item.locationHi +
        ' ' +
        item.locationEn +
        ' ' +
        item.stateHi +
        ' ' +
        item.stateEn
      ).toLowerCase();
      const deity = (item.deityHi + ' ' + item.deityEn).toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();

      return (
        name.includes(q) ||
        location.includes(q) ||
        deity.includes(q) ||
        tags.includes(q)
      );
    });
  }

  if (typeof limitCount === 'number' && limitCount > 0) {
    return list.slice(0, limitCount);
  }

  return list;
};

/**
 * Fetch a single temple by its ID from Firestore server
 */
export const fetchTempleById = async (
  id: string,
): Promise<TempleItem | null> => {
  if (memoryAllTemplesCache) {
    const found = memoryAllTemplesCache.find(t => t.id === id);
    if (found) return found;
  }

  try {
    const db = getFirestore();
    const docRef = doc(db, FIRESTORE_COLLECTION_NAME, id);
    const snap = await getDocFromServer(docRef);

    if (snap.exists()) {
      return mapFirestoreDocToTemple(snap.id, snap.data());
    }
  } catch (err) {
    console.warn(`[templeApi] Error fetching temple by ID (${id}):`, err);
  }

  return null;
};

export default fetchTemples;
