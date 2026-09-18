import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import i18n from '@i18n/index';
import { Translation } from '@i18n/language';
import {
  monthTranslationKeys,
  dayNameTranslationKeys,
} from '@constants/calendarData';

export interface FestivalTranslation {
  name: string;
  tithi?: string;
  description?: string;
  story?: string;
  deity?: string[];
}

export interface VratDetails {
  paranTime?: string | null;
  fastingRule?: string | null;
}

export interface Festival {
  id: string;
  slug?: string;
  eventKey?: string;
  type?: 'festival' | 'ekadashi' | 'vrat' | 'other' | string;
  categoryKey?: string;
  isMajor?: boolean;
  name: string;
  nameHi?: string;
  englishName: string;
  hindiName: string;
  date: string; // e.g. "2026-09-18"
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  dayOfWeekHi?: string;
  dayOfWeekNum?: number;
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
  vratDetails?: VratDetails | null;
  imageUrl?: string;
  url?: string;
  sourceUrl?: string;
  image?: any;
  translations?: {
    en?: FestivalTranslation;
    hi?: FestivalTranslation;
  };
}

// In-memory cache to prevent redundant Firestore queries
let festivalCache: Festival[] | null = null;

const REGION_TRANSLATION_KEYS: Record<string, string> = {
  ALL_INDIA: Translation.REGION_ALL_INDIA,
  NORTH_INDIA: Translation.REGION_NORTH_INDIA,
  SOUTH_INDIA: Translation.REGION_SOUTH_INDIA,
  EAST_INDIA: Translation.REGION_EAST_INDIA,
  WEST_INDIA: Translation.REGION_WEST_INDIA,
  GUJARAT: Translation.REGION_GUJARAT,
  MAHARASHTRA: Translation.REGION_MAHARASHTRA,
  WORLDWIDE: Translation.REGION_WORLDWIDE,
};

/**
 * Resolves festival image directly from remote URL or local assets by ID/eventKey.
 */
export const resolveFestivalImage = (festival: any): any => {
  if (!festival) return imagePath.greeting;

  // 1. Direct remote Image URL — check 'imageUrl', 'url', or 'sourceUrl'
  const rawUrl = (festival.imageUrl || festival.url || festival.sourceUrl || '')
    .toString()
    .trim();
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

  // 3. Match keys against local assets (eventKey, slug, id, englishName)
  const keysToTry = [
    festival.eventKey,
    festival.slug,
    festival.id,
    festival.englishName,
    festival.name,
  ].filter(Boolean);

  for (const k of keysToTry) {
    const rawKey = String(k).toLowerCase().trim();
    const cleanKey = rawKey.replace(/[^a-z0-9]/g, '');
    const baseKey = rawKey
      .replace(/_202[0-9].*$/, '')
      .replace(/202[0-9].*$/, '')
      .trim();
    const cleanBaseKey = baseKey.replace(/[^a-z0-9]/g, '');

    if ((imagePath as any)[rawKey]) return (imagePath as any)[rawKey];
    if ((imagePath as any)[cleanKey]) return (imagePath as any)[cleanKey];
    if ((imagePath as any)[baseKey]) return (imagePath as any)[baseKey];
    if ((imagePath as any)[cleanBaseKey])
      return (imagePath as any)[cleanBaseKey];
  }

  // 4. Default fallback
  return imagePath.greeting;
};

/**
 * Transforms raw Firestore document (supporting both new nested schema and legacy flat schema)
 * into a strongly typed Festival object.
 */
export const mapFestivalDoc = (doc: any): Festival => {
  const data = typeof doc.data === 'function' ? doc.data() : doc;
  const id = doc.id || data.slug || data.id || '';

  const transEn = data.translations?.en || {};
  const transHi = data.translations?.hi || {};

  // Names
  const englishName = transEn.name || data.englishName || data.name || '';
  const hindiName =
    transHi.name || data.hindiName || data.nameHi || englishName;
  const name = englishName || hindiName;
  const nameHi = hindiName || englishName;

  // Date parsing
  const rawDate = data.date || '';
  let year = Number(data.year);
  let month = Number(data.month);
  let day = Number(data.day);

  if ((!year || !month || !day) && rawDate) {
    const parts = rawDate.split('-');
    if (parts.length === 3) {
      year = year || parseInt(parts[0], 10) || 2026;
      month = month || parseInt(parts[1], 10) || 1;
      day = day || parseInt(parts[2], 10) || 1;
    }
  }
  year = year || 2026;
  month = month || 1;
  day = day || 1;

  // Day of week calculation via i18n
  let dayOfWeekNum: number = 0;

  if (typeof data.dayOfWeek === 'number') {
    dayOfWeekNum = Math.max(0, Math.min(6, data.dayOfWeek));
  } else if (typeof data.dayOfWeek === 'string' && data.dayOfWeek.trim()) {
    const parsedDate = new Date(year, month - 1, day);
    dayOfWeekNum = !isNaN(parsedDate.getDay()) ? parsedDate.getDay() : 0;
  } else {
    const parsedDate = new Date(year, month - 1, day);
    dayOfWeekNum = !isNaN(parsedDate.getDay()) ? parsedDate.getDay() : 0;
  }

  const dayKey = dayNameTranslationKeys[dayOfWeekNum] || Translation.DAY_SUNDAY;
  const dayOfWeekStrEn = i18n.t(dayKey, { lng: 'en' });
  const dayOfWeekStrHi = data.dayOfWeekHi || i18n.t(dayKey, { lng: 'hi' });

  // Formatted Date Strings via i18n
  const monthKey = monthTranslationKeys[Math.max(0, Math.min(11, month - 1))];
  const monthNameEn = i18n.t(monthKey, { lng: 'en' });
  const monthNameHi = i18n.t(monthKey, { lng: 'hi' });

  const dateStrEn =
    data.dateStrEn || `${day} ${monthNameEn}, ${dayOfWeekStrEn}`.trim();
  const dateStrHi =
    data.dateStrHi || `${day} ${monthNameHi}, ${dayOfWeekStrHi}`.trim();

  // Tithi, Description, Story
  const tithi = transEn.tithi || data.tithi || '';
  const tithiHi = transHi.tithi || data.tithiHi || tithi;
  const description = transEn.description || data.description || '';
  const descriptionHi =
    transHi.description || data.descriptionHi || description;
  const story = transEn.story || data.story || '';
  const storyHi = transHi.story || data.storyHi || story;

  // Deity
  const deityEn =
    transEn.deity ||
    (Array.isArray(data.deity) ? data.deity : data.deity ? [data.deity] : []);
  const deityHi =
    transHi.deity ||
    (Array.isArray(data.deityHi)
      ? data.deityHi
      : data.deityHi
      ? [data.deityHi]
      : deityEn);

  // Regions translated via i18n
  const rawRegions: string[] = Array.isArray(data.regions)
    ? data.regions
    : data.regions
    ? [data.regions]
    : [];
  const regionsHi: string[] =
    data.regionsHi ||
    rawRegions.map(r =>
      REGION_TRANSLATION_KEYS[r]
        ? i18n.t(REGION_TRANSLATION_KEYS[r], { lng: 'hi' })
        : r,
    );

  // Category
  const categoryKey = data.categoryKey || data.category || data.type || '';
  const category = data.category || categoryKey;
  const categoryHi = data.categoryHi || category;

  // URLs
  const imageUrl = data.imageUrl || data.url || '';
  const url = data.url || data.imageUrl || '';

  const resolvedImage = resolveFestivalImage({
    ...data,
    id,
    slug: data.slug,
    eventKey: data.eventKey,
    englishName,
    imageUrl,
    url,
  });

  return {
    id,
    slug: data.slug || id,
    eventKey: data.eventKey || '',
    type: data.type || 'festival',
    categoryKey,
    isMajor: Boolean(data.isMajor),
    name,
    nameHi,
    englishName,
    hindiName,
    date:
      rawDate ||
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0',
      )}`,
    year,
    month,
    day,
    dayOfWeek: dayOfWeekStrEn,
    dayOfWeekHi: dayOfWeekStrHi,
    dayOfWeekNum,
    dateStrEn,
    dateStrHi,
    tithi,
    tithiHi,
    description,
    descriptionHi,
    story,
    storyHi,
    deity: deityEn,
    deityHi,
    regions: rawRegions,
    regionsHi,
    category,
    categoryHi,
    vratDetails: data.vratDetails || null,
    imageUrl,
    url,
    sourceUrl: data.sourceUrl || '',
    image: resolvedImage,
    translations: data.translations,
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
