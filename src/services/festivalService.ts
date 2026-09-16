import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { monthsHi } from '@constants/calendarData';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { CALENDAR_2026 } from '@constants/Calendar_2026';

export interface Festival {
  id: string;
  englishName: string;
  hindiName: string;
  month: number;
  day: number;
  dateStrEn: string;
  dateStrHi: string;
  deity: string[];
  deityHi?: string[];
  category: string;
  categoryHi?: string;
  tithi: string;
  tithiHi?: string;
  description: string;
  descriptionHi?: string;
  regions: string[];
  regionsHi?: string[];
  icon?: string;
  image?: any;
}

const storage = createMMKV();
export const FESTIVAL_DATA_CACHE_KEY = STORAGE_KEYS.FESTIVALS_CACHE;

const shortMonthsEn = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const localFestivalImageMap: Record<string, any> = {
  // Batch 1 & 2 Festival Artwork
  shattila_ekadashi: imagePath.ShattilaEkadashi,
  shattilaekadashi: imagePath.ShattilaEkadashi,
  shattila_ekadashi_2026_01_13: imagePath.ShattilaEkadashi,

  makara_sankranti: imagePath.MakaraSankranti,
  makar_sankranti: imagePath.MakaraSankranti,
  makarasankranti: imagePath.MakaraSankranti,
  makara_sankranti_2026_01_14: imagePath.MakaraSankranti,

  vasant_panchami: imagePath.VasantPanchami,
  vasantpanchami: imagePath.VasantPanchami,
  vasant_panchami_2026_01_23: imagePath.VasantPanchami,

  jaya_ekadashi: imagePath.JayaEkadashi,
  jayaekadashi: imagePath.JayaEkadashi,
  jaya_ekadashi_2026_01_28: imagePath.JayaEkadashi,

  vijaya_ekadashi: imagePath.VijayaEkadashi,
  vijayaekadashi: imagePath.VijayaEkadashi,
  vijaya_ekadashi_2026_02_12: imagePath.VijayaEkadashi,

  maha_shivaratri: imagePath.MahaShivaratri,
  maha_shivratri: imagePath.MahaShivaratri,
  mahashivaratri: imagePath.MahaShivaratri,
  mahashivratri: imagePath.MahaShivaratri,
  maha_shivaratri_2026_02_15: imagePath.MahaShivaratri,

  amalaki_ekadashi: imagePath.AmalakiEkadashi,
  amalakiekadashi: imagePath.AmalakiEkadashi,
  amalaki_ekadashi_2026_02_27: imagePath.AmalakiEkadashi,

  holika_dahan: imagePath.HolikaDahan,
  holikadahan: imagePath.HolikaDahan,
  holika_dahan_2026_03_02: imagePath.HolikaDahan,

  chhoti_holi: imagePath.ChhotiHoli,
  chhotiholi: imagePath.ChhotiHoli,
  chhoti_holi_2026_03_02: imagePath.ChhotiHoli,

  holi: imagePath.Holi,
  holi_2026_03_03: imagePath.Holi,

  papamochani_ekadashi: imagePath.PapamochaniEkadashi,
  papamochaniekadashi: imagePath.PapamochaniEkadashi,
  papamochani_ekadashi_2026_03_14: imagePath.PapamochaniEkadashi,

  chaitra_navratri: imagePath.ChaitraNavratri,
  chaitranavratri: imagePath.ChaitraNavratri,
  chaitra_navratri_2026_03_19: imagePath.ChaitraNavratri,

  gauri_puja: imagePath.GauriPuja,
  gauripuja: imagePath.GauriPuja,
  gauri_puja_2026_03_21: imagePath.GauriPuja,

  // General & upcoming festivals
  lohri: imagePath.greeting,
  rama_navami: imagePath.Rama,
  hanuman_jayanti: imagePath.Hanuman,
  mahavir_jayanti: imagePath.greeting,
  good_friday: imagePath.greeting,
  baisakhi: imagePath.greeting,
  buddha_purnima: imagePath.greeting,
  rath_yatra: imagePath.JagannathRath,
  guru_purnima: imagePath.greeting,
  raksha_bandhan: imagePath.RakshaBandhan,
  krishna_janmashtami: imagePath.Krishna,
  ganesh_chaturthi: imagePath.Ganesha,
  gandhi_jayanti: imagePath.greeting,
  sharad_navratri: imagePath.Durga,
  durga_puja: imagePath.Durga,
  dussehra: imagePath.Rama,
  karwa_chauth: imagePath.KarwaChauth,
  dhanteras: imagePath.greeting,
  naraka_chaturdashi: imagePath.greeting,
  diwali: imagePath.Diwali,
  govardhan_puja: imagePath.Govardhan,
  bhai_dooj: imagePath.BhaiDooj,
  chhath_puja: imagePath.Surya,
  guru_nanak_jayanti: imagePath.greeting,
  christmas: imagePath.greeting,
};

export const resolveFestivalImage = (fest: any): any => {
  const rawId = (fest.id || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  // 1. Direct match on localFestivalImageMap
  if (localFestivalImageMap[rawId]) return localFestivalImageMap[rawId];
  if (localFestivalImageMap[cleanId]) return localFestivalImageMap[cleanId];

  // 2. Partial key match on localFestivalImageMap
  for (const key of Object.keys(localFestivalImageMap)) {
    if (cleanId.includes(key) || rawId.includes(key)) {
      return localFestivalImageMap[key];
    }
  }

  // 3. Remote URL fallback (if not a generic drikpanchang placeholder)
  if (
    fest.imageUrl &&
    typeof fest.imageUrl === 'string' &&
    fest.imageUrl.trim().startsWith('http') &&
    !fest.imageUrl.includes('puja_thali.jpg')
  ) {
    return { uri: fest.imageUrl.trim() };
  }

  return imagePath.greeting;
};

export const mapFestivalWithImage = (fest: any): Festival => {
  const month = typeof fest.month === 'number' ? fest.month : 1;
  const day = typeof fest.day === 'number' ? fest.day : 1;

  const dateStrEn =
    fest.dateStrEn || `${shortMonthsEn[month - 1] || 'Jan'} ${day}`;
  const dateStrHi =
    fest.dateStrHi || `${day} ${monthsHi[month - 1] || 'जनवरी'}`;

  const image = resolveFestivalImage(fest);

  return {
    id: fest.id || `fest_${month}_${day}`,
    englishName: fest.englishName || fest.name || 'Festival',
    hindiName: fest.hindiName || fest.nameHi || 'त्यौहार',
    month,
    day,
    dateStrEn,
    dateStrHi,
    deity: fest.deity || [],
    deityHi: fest.deityHi || [],
    category: fest.category || '',
    categoryHi: fest.categoryHi || '',
    tithi: fest.tithi || '',
    tithiHi: fest.tithiHi || '',
    description: fest.description || fest.descriptionEn || '',
    descriptionHi: fest.descriptionHi || '',
    regions: fest.regions || [],
    regionsHi: fest.regionsHi || [],
    icon: fest.icon || '',
    image,
  };
};

export const getLocalFestivalsFallback = (): Festival[] => {
  return CALENDAR_2026.map(item =>
    mapFestivalWithImage({
      id: item.id,
      englishName: item.englishName || item.name,
      hindiName: item.hindiName || item.nameHi,
      month: item.month,
      day: item.day,
      dateStrEn: item.dateStrEn,
      dateStrHi: item.dateStrHi,
      deity: [],
      deityHi: [],
      category: item.category,
      categoryHi: item.categoryHi,
      tithi: item.tithi,
      tithiHi: item.tithiHi,
      description: item.description,
      descriptionHi: item.descriptionHi,
      regions: [],
      regionsHi: [],
      icon: '',
      imageUrl: item.imageUrl,
    }),
  );
};

export const getFestivalData = async (): Promise<Festival[]> => {
  try {
    const cachedData = storage.getString(FESTIVAL_DATA_CACHE_KEY);

    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      // Validate that cached data has the full dataset
      if (Array.isArray(parsed) && parsed.length >= CALENDAR_2026.length) {
        return parsed.map(mapFestivalWithImage);
      }
    }

    const localList = getLocalFestivalsFallback();

    try {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, 'festivals'));

      if (!snapshot.empty) {
        const firestoreMap = new Map<string, any>();
        snapshot.docs.forEach(docSnap => {
          firestoreMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
        });

        const merged = localList.map(fest => {
          const remote = firestoreMap.get(fest.id);
          if (remote) {
            firestoreMap.delete(fest.id);
            return mapFestivalWithImage(remote);
          }
          return fest;
        });

        firestoreMap.forEach(remoteDoc => {
          merged.push(mapFestivalWithImage(remoteDoc));
        });

        storage.set(FESTIVAL_DATA_CACHE_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch {}

    storage.set(FESTIVAL_DATA_CACHE_KEY, JSON.stringify(localList));
    return localList;
  } catch (error) {
    console.warn(
      'Notice: Firestore unavailable, using local festival data fallback',
    );
    return getLocalFestivalsFallback();
  }
};

export const clearFestivalDataCache = (): void => {
  storage.remove(FESTIVAL_DATA_CACHE_KEY);
};
