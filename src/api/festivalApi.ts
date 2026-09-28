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
import { Festival } from './types';

export type { Festival, FestivalTranslation, VratDetails } from './types';

// In-memory runtime cache for festivals
let festivalCache: Festival[] | null = null;

export const getCachedFestivalData = (): Festival[] | null => {
  return festivalCache;
};

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

export const resolveFestivalImage = (festival: any): any => {
  if (!festival) return imagePath.fallBackImage;

  const rawUrl = (festival.imageUrl || festival.url || festival.sourceUrl || '')
    .toString()
    .trim();
  if (rawUrl.startsWith('http')) {
    return { uri: rawUrl };
  }

  if (
    typeof festival.image === 'number' ||
    (festival.image && typeof festival.image === 'object' && festival.image.uri)
  ) {
    return festival.image;
  }

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

  return imagePath.fallBackImage;
};

export const mapFestivalDoc = (doc: any): Festival => {
  const data = typeof doc.data === 'function' ? doc.data() : doc;
  const id = doc.id || data.slug || data.id || '';

  const transEn = data.translations?.en || {};
  const transHi = data.translations?.hi || {};

  const englishName = transEn.name || data.englishName || data.name || '';
  const hindiName =
    transHi.name || data.hindiName || data.nameHi || englishName;
  const name = englishName || hindiName;
  const nameHi = hindiName || englishName;

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

  const monthKey = monthTranslationKeys[Math.max(0, Math.min(11, month - 1))];
  const monthNameEn = i18n.t(monthKey, { lng: 'en' });
  const monthNameHi = i18n.t(monthKey, { lng: 'hi' });

  const dateStrEn =
    data.dateStrEn || `${day} ${monthNameEn}, ${dayOfWeekStrEn}`.trim();
  const dateStrHi =
    data.dateStrHi || `${day} ${monthNameHi}, ${dayOfWeekStrHi}`.trim();

  const tithi = transEn.tithi || data.tithi || '';
  const tithiHi = transHi.tithi || data.tithiHi || tithi;
  const description = transEn.description || data.description || '';
  const descriptionHi =
    transHi.description || data.descriptionHi || description;
  const story = transEn.story || data.story || '';
  const storyHi = transHi.story || data.storyHi || story;

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

  const categoryKey = data.categoryKey || data.category || data.type || '';
  const category = data.category || categoryKey;
  const categoryHi = data.categoryHi || category;

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

export const clearFestivalDataCache = (): void => {
  festivalCache = null;
};

export const getFestivalData = async (
  forceRefresh: boolean = false,
): Promise<Festival[]> => {
  if (!forceRefresh && festivalCache && festivalCache.length > 0) {
    return festivalCache;
  }

  try {
    const db = getFirestore();
    const festivalsRef = collection(db, 'festivals');

    let snapshot;
    try {
      const q = query(festivalsRef, orderBy('date', 'asc'));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(festivalsRef);
    }

    if (!snapshot || snapshot.empty) {
      return festivalCache || [];
    }

    const rawList = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    const festivals: Festival[] = rawList.map(item => mapFestivalDoc(item));

    festivals.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });

    festivalCache = festivals;
    return festivals;
  } catch (error) {
    console.error(
      '❌ [festivalApi] Error fetching festival data from Firestore:',
      error,
    );
    return festivalCache || [];
  }
};

export const getFestivalsByMonth = async (
  month: number,
): Promise<Festival[]> => {
  const allFestivals = await getFestivalData();
  return allFestivals.filter(item => item.month === month);
};

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
