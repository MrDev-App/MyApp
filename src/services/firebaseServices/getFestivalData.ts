import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';

export interface Festival {
  id: string;
  name: string;
  nameHi?: string;
  englishName: string;
  hindiName: string;
  date: string; // e.g. "2026-09-06"
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  dayOfWeekHi?: string;
  dateStrEn: string;
  dateStrHi?: string;
  tithi?: string;
  tithiHi?: string;
  description?: string;
  descriptionHi?: string;
  story?: string;
  storyHi?: string;
  deity?: string[];
  deityHi?: string[];
  regions?: string[];
  regionsHi?: string[];
  category?: string;
  categoryHi?: string;
  imageUrl?: string;
  url?: string;
  image?: any;
}

// In-memory cache to prevent redundant Firestore queries
let festivalCache: Festival[] | null = null;

/**
 * Resolves festival image directly from remote URL or local assets by ID.
 */
export const resolveFestivalImage = (festival: any): any => {
  if (!festival) return imagePath.greeting;

  // 1. Direct remote Image URL — check 'url' first (custom image), then 'imageUrl' as fallback
  const rawUrl = (festival.url || festival.imageUrl || '').toString().trim();
  if (rawUrl.startsWith('http')) {
    return { uri: rawUrl };
  }

  // 2. If already a resolved local require() number or object with uri
  if (
    typeof festival.image === 'number' ||
    (festival.image && typeof festival.image === 'object' && festival.image.uri)
  ) {
    return festival.image;
  }

  // 3. Direct ID match from local image assets
  const rawId = (festival.id || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

  // 4. Base ID match (stripping year/date suffixes like '_2026_09_18')
  const baseId = rawId
    .replace(/_202[0-9].*$/, '')
    .replace(/202[0-9].*$/, '')
    .trim();
  const cleanBaseId = baseId.replace(/[^a-z0-9]/g, '');

  if (baseId && (imagePath as any)[baseId]) {
    return (imagePath as any)[baseId];
  }
  if (cleanBaseId && (imagePath as any)[cleanBaseId]) {
    return (imagePath as any)[cleanBaseId];
  }

  // 5. Default fallback
  return imagePath.greeting;
};

/**
 * Transforms raw Firestore document into a typed Festival object.
 */
export const mapFestivalDoc = (doc: any): Festival => {
  const data = typeof doc.data === 'function' ? doc.data() : doc;
  const id = doc.id || data.id || '';

  return {
    id,
    name: data.name || data.englishName || '',
    nameHi: data.nameHi || data.hindiName || '',
    englishName: data.englishName || data.name || '',
    hindiName: data.hindiName || data.nameHi || '',
    date: data.date || '',
    year: Number(data.year) || 2026,
    month: Number(data.month) || 1,
    day: Number(data.day) || 1,
    dayOfWeek: data.dayOfWeek || '',
    dayOfWeekHi: data.dayOfWeekHi || '',
    dateStrEn: data.dateStrEn || '',
    dateStrHi: data.dateStrHi || '',
    tithi: data.tithi || '',
    tithiHi: data.tithiHi || '',
    description: data.description || '',
    descriptionHi: data.descriptionHi || '',
    story: data.story || '',
    storyHi: data.storyHi || '',
    deity: Array.isArray(data.deity)
      ? data.deity
      : data.deity
      ? [data.deity]
      : [],
    deityHi: Array.isArray(data.deityHi)
      ? data.deityHi
      : data.deityHi
      ? [data.deityHi]
      : [],
    regions: Array.isArray(data.regions)
      ? data.regions
      : data.regions
      ? [data.regions]
      : [],
    regionsHi: Array.isArray(data.regionsHi)
      ? data.regionsHi
      : data.regionsHi
      ? [data.regionsHi]
      : [],
    category: data.category || '',
    categoryHi: data.categoryHi || '',
    imageUrl: data.imageUrl || '',
    url: data.url || '',
    image: resolveFestivalImage({ ...data, id }),
  };
};

/**
 * Clears the in-memory festival data cache.
 */
export const clearFestivalDataCache = (): void => {
  festivalCache = null;
};

/**
 * Fetches all festivals from the Firestore 'festivals' collection.
 * Uses in-memory caching to avoid duplicate reads.
 *
 * @param forceRefresh - If true, bypasses the cache and fetches fresh data from Firestore.
 */
export const getFestivalData = async (
  forceRefresh: boolean = false,
): Promise<Festival[]> => {
  console.log('----------------------------------------------------');
  console.log(
    `🎉 [FestivalService] Fetching festivals (forceRefresh: ${forceRefresh})...`,
  );

  try {
    if (!forceRefresh && festivalCache && festivalCache.length > 0) {
      console.log(
        `⚡ [FestivalService] Returning ${festivalCache.length} festivals from memory cache.`,
      );
      console.log('----------------------------------------------------');
      return festivalCache;
    }

    const db = getFirestore();
    const festivalsRef = collection(db, 'festivals');

    // Attempt sorted query by date
    console.log(
      '🔍 [FestivalService] Querying Firestore collection "festivals"...',
    );
    let snapshot;
    try {
      const q = query(festivalsRef, orderBy('date', 'asc'));
      snapshot = await getDocs(q);
      console.log(
        `📄 [FestivalService] Ordered query succeeded with ${snapshot.size} doc(s).`,
      );
    } catch (queryErr) {
      console.log(
        '⚠️ [FestivalService] Ordered query failed (index pending?), falling back to basic getDocs:',
        queryErr,
      );
      snapshot = await getDocs(festivalsRef);
      console.log(
        `📄 [FestivalService] Basic query returned ${snapshot.size} doc(s).`,
      );
    }

    if (!snapshot || snapshot.empty) {
      console.warn(
        '⚠️ [FestivalService] No festival documents found in Firestore.',
      );
      console.log('----------------------------------------------------');
      return [];
    }

    const festivals: Festival[] = snapshot.docs.map(docSnap => {
      const docData = docSnap.data();
      const mapped = mapFestivalDoc({ id: docSnap.id, ...docData });
      // Full raw data from Firestore
      console.log(
        `📌 [FestivalService] Raw Doc [${docSnap.id}]`,
        JSON.stringify({
          id: docSnap.id,
          url: docData.url || '❌ EMPTY',
          imageUrl: docData.imageUrl || '❌ EMPTY',
          englishName: docData.englishName || docData.name,
          date: docData.date,
          resolvedImage: mapped.image,
        }),
      );
      return mapped;
    });

    // Ensure sorted chronologically (by month, then day)
    festivals.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });

    festivalCache = festivals;
    console.log(
      `✅ [FestivalService] Successfully loaded & sorted ${festivals.length} festivals into memory.`,
    );
    // Summary table: id -> imageUrl
    console.log('📋 [FestivalService] ALL festival imageUrls:');
    festivals.forEach(f => {
      console.log(
        `  [${f.id}] imageUrl=${
          f.imageUrl || '❌ EMPTY'
        } | resolvedImage type=${
          typeof f.image === 'number'
            ? 'local-require'
            : f.image && f.image.uri
            ? `uri:${f.image.uri}`
            : 'unknown'
        }`,
      );
    });
    console.log('----------------------------------------------------');
    return festivals;
  } catch (error) {
    console.error(
      '❌ [FestivalService] Error fetching festival data from Firebase Firestore:',
      error,
    );
    console.log('----------------------------------------------------');
    return festivalCache || [];
  }
};

/**
 * Fetches festivals filtered by month (1 = Jan, 12 = Dec).
 */
export const getFestivalsByMonth = async (
  month: number,
): Promise<Festival[]> => {
  const allFestivals = await getFestivalData();
  return allFestivals.filter(item => item.month === month);
};

/**
 * Fetches upcoming festivals from today onwards.
 */
export const getUpcomingFestivals = async (
  limitCount: number = 10,
): Promise<Festival[]> => {
  const allFestivals = await getFestivalData();
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  const upcoming = allFestivals.filter(item => {
    const festivalDate = new Date(
      item.year || today.getFullYear(),
      item.month - 1,
      item.day,
    ).getTime();
    return festivalDate >= todayStart;
  });

  return (upcoming.length > 0 ? upcoming : allFestivals).slice(0, limitCount);
};

export default getFestivalData;
