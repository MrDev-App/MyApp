import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';

export type TempleCategory =
  | 'chardham'
  | 'jyotirlinga'
  | 'shaktipeeth'
  | 'major'
  | 'chota_chardham';

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface TempleTiming {
  openingTime?: string;
  closingTime?: string;
  aartiTimingsHi?: string;
  aartiTimingsEn?: string;
  bestTimeToVisitHi?: string;
  bestTimeToVisitEn?: string;
}

export interface HowToReach {
  byAirHi?: string;
  byAirEn?: string;
  byRailHi?: string;
  byRailEn?: string;
  byRoadHi?: string;
  byRoadEn?: string;
  nearestAirport?: string;
  nearestRailwayStation?: string;
}

export interface TempleFestival {
  nameHi: string;
  nameEn: string;
  dateHi?: string;
  dateEn?: string;
  descriptionHi?: string;
  descriptionEn?: string;
}

export interface TempleItem {
  id: string;
  order?: number;
  isActive?: boolean;
  updatedAt?: string;

  // ── Identity ──────────────────────────────────────────────
  nameHi: string;
  nameEn: string;
  aliasNamesHi?: string[];
  aliasNamesEn?: string[];

  // ── Location ──────────────────────────────────────────────
  locationHi: string;
  locationEn: string;
  addressHi?: string;
  addressEn?: string;
  districtHi?: string;
  districtEn?: string;
  stateHi: string;
  stateEn: string;
  countryHi?: string;
  countryEn?: string;
  pincode?: string;
  geo?: GeoLocation;

  // ── Religious details ─────────────────────────────────────
  deityHi: string;
  deityEn: string;
  otherDeitiesHi?: string[];
  otherDeitiesEn?: string[];
  yugaHi?: string;
  yugaEn?: string;
  directionHi?: string;
  directionEn?: string;
  mythologyHi?: string;
  mythologyEn?: string;

  // ── Categorization ────────────────────────────────────────
  category: TempleCategory;
  categories: TempleCategory[];
  isCharDham?: boolean;
  isJyotirlinga?: boolean;
  isShaktipeeth?: boolean;
  isChotaCharDham?: boolean;
  isDivyaDesam?: boolean;
  tags?: string[];

  // ── History & significance ────────────────────────────────
  historyHi?: string;
  historyEn?: string;
  builtCentury?: string;
  builtByHi?: string;
  builtByEn?: string;
  architectureStyleHi?: string;
  architectureStyleEn?: string;
  significanceHi: string;
  significanceEn: string;
  descriptionHi: string;
  descriptionEn: string;

  // ── Visiting info ─────────────────────────────────────────
  timing: TempleTiming;
  entryFeeHi?: string;
  entryFeeEn?: string;
  dressCodeHi?: string;
  dressCodeEn?: string;
  festivals?: TempleFestival[];

  // ── Connectivity ──────────────────────────────────────────
  howToReach?: HowToReach;
  nearbyAttractionsHi?: string;
  nearbyAttractionsEn?: string;
  nearbyTempleIds?: string[];

  // ── Media ─────────────────────────────────────────────────
  image: any;
  imageUrl?: string;
  galleryImageUrls?: string[];
  videoUrl?: string;
  aartiAudioUrl?: string;

  // ── Contact ───────────────────────────────────────────────
  officialWebsite?: string;
  contactPhone?: string;
}

export const FIRESTORE_COLLECTION_NAME = 'templeData';

// In-memory runtime cache for temples (active only until app is killed)
const memoryTemplesCategoryCache = new Map<string, TempleItem[]>();
let memoryAllTemplesCache: TempleItem[] | null = null;

/**
 * Resolves local image asset fallback if remote imageUrl is not available
 */
const resolveTempleImage = (id: string, remoteUrl?: string): any => {
  if (remoteUrl && typeof remoteUrl === 'string' && remoteUrl.trim().length > 0) {
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
  return imageMap[id] || imagePath.templeBell || imagePath.lotus;
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

  const imgUrl = data.imageUrl || (typeof data.image === 'string' ? data.image : '');

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
    isChotaCharDham: !!data.isChotaCharDham || categories.includes('chota_chardham'),
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
 * Fetch all temples from Firestore `templeData` collection.
 * Uses in-memory caching to prevent duplicate network calls during app session.
 */
export const fetchAllTemplesFromFirestore = async (
  forceRefresh = false,
): Promise<TempleItem[]> => {
  if (!forceRefresh && memoryAllTemplesCache && memoryAllTemplesCache.length > 0) {
    return memoryAllTemplesCache;
  }

  try {
    const db = getFirestore();
    const templesRef = collection(db, FIRESTORE_COLLECTION_NAME);
    let snapshot;

    try {
      const q = query(templesRef, orderBy('order', 'asc'));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(templesRef);
    }

    if (!snapshot.empty) {
      const items: TempleItem[] = snapshot.docs
        .map(docSnap => mapFirestoreDocToTemple(docSnap.id, docSnap.data()))
        .filter(item => item.isActive !== false)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      if (items.length > 0) {
        memoryAllTemplesCache = items;
        return items;
      }
    }
  } catch (error) {
    console.warn('[TempleService] Error fetching all temples from Firestore:', error);
  }

  return memoryAllTemplesCache || [];
};

/**
 * Fetch temples by Category and/or Search Query with optional limit (e.g. limit 10).
 * Handles category chips: 'all', 'chardham', 'jyotirlinga', 'shaktipeeth', 'major'
 */
export const fetchTemples = async (
  options: FetchTemplesOptions = {},
): Promise<TempleItem[]> => {
  const { category = 'all', searchQuery = '', limitCount, forceRefresh = false } = options;
  const cacheKey = `cat:${category}`;

  let list: TempleItem[] = [];

  // Check in-memory category cache
  if (!forceRefresh && memoryTemplesCategoryCache.has(cacheKey)) {
    list = memoryTemplesCategoryCache.get(cacheKey)!;
  } else {
    const all = await fetchAllTemplesFromFirestore(forceRefresh);

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

    memoryTemplesCategoryCache.set(cacheKey, list);
  }

  // Filter by Search Query if present
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

  // Apply Limit if requested (e.g. limit 10)
  if (typeof limitCount === 'number' && limitCount > 0) {
    return list.slice(0, limitCount);
  }

  return list;
};

/**
 * Fetch a single temple by its ID from Firestore
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
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return mapFirestoreDocToTemple(snap.id, snap.data());
    }
  } catch (err) {
    console.warn(`[TempleService] Error fetching temple by ID (${id}):`, err);
  }

  return null;
};


