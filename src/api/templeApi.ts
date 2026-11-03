import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  doc,
  getDoc,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import localTempleData from '@constants/templeData.json';
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

/**
 * Resolves remote imageUrl for temple; falls back to fallBackImage if absent
 */
export const resolveTempleImage = (_id?: string, remoteUrl?: string): any => {
  const rawUrl = (remoteUrl || '').toString().trim();
  const filename = rawUrl.split('/').pop()?.replace(/-optimized\.[^/.]+$/, '').replace(/\.[^/.]+$/, '') || '';
  if (filename && (imagePath as any)[filename]) {
    return (imagePath as any)[filename];
  }
  const cleanId = (_id || '').toLowerCase().replace(/_dham|_temple/g, '').trim();
  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawUrl.startsWith('http')) {
    return { uri: rawUrl };
  }
  return imagePath.fallBackImage;
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

export const getLocalTemples = (): TempleItem[] => {
  const values = Object.values(localTempleData) as any[];
  const list = values
    .map(data => mapFirestoreDocToTemple(data.id, data))
    .filter(item => item.isActive !== false);
  list.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
  return list;
};

export const filterLocalTemples = (
  category: string = 'all',
  searchQuery: string = '',
  limitCount: number = 10,
  lastDoc: any = null,
): FetchTemplesResult => {
  let items = getLocalTemples();

  if (category && category !== 'all') {
    items = items.filter(
      (item: TempleItem) =>
        item.category === category || item.categories?.includes(category as any),
    );
  }

  const q = searchQuery.toLowerCase().trim();
  if (q.length > 0) {
    items = items.filter((item: TempleItem) => {
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

  let startIndex = 0;
  if (lastDoc && lastDoc.id) {
    const idx = items.findIndex((i: TempleItem) => i.id === lastDoc.id);
    if (idx !== -1) {
      startIndex = idx + 1;
    }
  }

  const paged = items.slice(startIndex, startIndex + limitCount);
  const newLastDoc = paged.length > 0 ? { id: paged[paged.length - 1].id } : null;
  const hasMore = startIndex + limitCount < items.length;

  return {
    items: paged,
    lastDoc: newLastDoc,
    hasMore,
  };
};

export interface FetchTemplesOptions {
  category?: string;
  searchQuery?: string;
  limitCount?: number;
  lastDoc?: any;
}

export interface FetchTemplesResult {
  items: TempleItem[];
  lastDoc: any | null;
  hasMore: boolean;
}

/**
 * Fetch paginated temples from Firestore (default 10 per batch).
 * Uses startAfter(lastDoc) cursor so only 10 documents are downloaded at a time.
 */
export const fetchTemples = async (
  options: FetchTemplesOptions = {},
): Promise<FetchTemplesResult> => {
  const {
    category = 'all',
    searchQuery = '',
    limitCount = 10,
    lastDoc = null,
  } = options;

  try {
    console.log('  fetchTemples called:', {
      category,
      searchQuery,
      limitCount,
      isPaginating: !!lastDoc,
      startAfterDocId: lastDoc?.id || null,
    });

    const db = getFirestore();

    const templesRef = collection(db, FIRESTORE_COLLECTION_NAME);

    const constraints: any[] = [];

    if (category && category !== 'all') {
      constraints.push(where('categories', 'array-contains', category));
    }

    constraints.push(orderBy('order', 'asc'));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(limitCount));

    let snapshot;
    try {
      const q = query(templesRef, ...constraints);
      snapshot = await getDocs(q);
    } catch (orderErr) {
      console.warn(
        ' Primary query failed, using fallback query without orderBy:',
        orderErr,
      );
      const fallbackConstraints: any[] = [];
      if (category && category !== 'all') {
        fallbackConstraints.push(
          where('categories', 'array-contains', category),
        );
      }
      if (lastDoc) {
        fallbackConstraints.push(startAfter(lastDoc));
      }
      fallbackConstraints.push(limit(limitCount));
      const fallbackQ = query(templesRef, ...fallbackConstraints);
      snapshot = await getDocs(fallbackQ);
    }

    if (!snapshot || snapshot.empty) {
      console.log(' Snapshot is empty, falling back to local temples.');
      return filterLocalTemples(category, searchQuery, limitCount, lastDoc);
    }

    const docs = snapshot.docs;
    const newLastDoc = docs[docs.length - 1] || null;
    const hasMore = docs.length === limitCount;

    console.log(
      ` Fetched ${docs.length} docs from Firestore. Last doc ID: ${newLastDoc?.id}. hasMore: ${hasMore}`,
    );

    let items: TempleItem[] = docs
      .map(docSnap => mapFirestoreDocToTemple(docSnap.id, docSnap.data()))
      .filter(item => item.isActive !== false);

    const q = searchQuery.toLowerCase().trim();
    if (q.length > 0) {
      items = items.filter(item => {
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

    console.log(` Returning ${items.length} items to screen.`);

    return {
      items,
      lastDoc: newLastDoc,
      hasMore,
    };
  } catch (error) {
    console.error(' Error fetching temples page:', error);
    return filterLocalTemples(category, searchQuery, limitCount, lastDoc);
  }
};

/**
 * Fetch a single temple by its ID from Firestore server
 */
export const fetchTempleById = async (
  id: string,
): Promise<TempleItem | null> => {
  try {
    const db = getFirestore();
    const docRef = doc(db, FIRESTORE_COLLECTION_NAME, id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return mapFirestoreDocToTemple(snap.id, snap.data());
    }
  } catch (err) {
    console.warn(`[templeApi] Error fetching temple by ID (${id}):`, err);
  }

  return null;
};

export default fetchTemples;
