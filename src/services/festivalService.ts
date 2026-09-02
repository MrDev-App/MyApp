import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { monthsHi } from '@constants/calendarData';
import { STORAGE_KEYS } from '@constants/storageKeys';

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
  lohri: imagePath.greeting,
  makar_sankranti: imagePath.Surya,
  vasant_panchami: imagePath.VasantPanchami,
  maha_shivratri: imagePath.MahaShivratri,
  holika_dahan: imagePath.HoliDahan,
  holi: imagePath.Holi,
  chaitra_navratri: imagePath.Navratri,
  rama_navami: imagePath.Rama,
  hanuman_jayanti: imagePath.Hanuman,
  buddha_purnima: imagePath.greeting,
  ganga_dussehra: imagePath.Gangama,
  ganga_saptami: imagePath.Gangama,
  vishwakarma_puja: imagePath.Vishwakarma,
  vishwakarma_jayanti: imagePath.Vishwakarma,
  kali_puja: imagePath.Kalima,
  nirjala_ekadashi: imagePath.Vishnu,
  jagannath_rath_yatra: imagePath.JagannathRathYatra,
  guru_purnima: imagePath.greeting,
  nag_panchami: imagePath.nagpachmi,
  raksha_bandhan: imagePath.RakshaBandhan,
  janmashtami: imagePath.dhahiHande,
  ganesh_chaturthi: imagePath.GaneshChaturthi,
  gauri_puja: imagePath.GauriPuja,
  navratri: imagePath.Navratri,
  dussehra: imagePath.Dussehra,
  karwa_chauth: imagePath.KarwaChauth,
  diwali: imagePath.Diwali,
  lakshmi_puja: imagePath.Laxmi,
  govardhan_puja: imagePath.Govardhan,
  bhai_dooj: imagePath.BhaiDooj,
};

export const mapFestivalWithImage = (fest: any): Festival => {
  const fullId = fest.id || '';
  const baseId = fullId.replace(/_\d{4}$/, '');

  let month = fest.month;
  let day = fest.day;

  if (fest.date && typeof fest.date === 'object' && fest.date.seconds) {
    const d = new Date(fest.date.seconds * 1000);
    month = d.getMonth() + 1;
    day = d.getDate();
  } else if (fest.date && typeof fest.date.toDate === 'function') {
    const d = fest.date.toDate();
    month = d.getMonth() + 1;
    day = d.getDate();
  } else if (!month || !day) {
    month = month || 1;
    day = day || 1;
  }

  const dateStrEn =
    fest.dateStrEn || `${shortMonthsEn[month - 1] || 'Jan'} ${day}`;
  const dateStrHi =
    fest.dateStrHi || `${day} ${monthsHi[month - 1] || 'जनवरी'}`;

  const image = fest.imageUrl
    ? { uri: fest.imageUrl }
    : localFestivalImageMap[baseId] ||
      localFestivalImageMap[fullId] ||
      fest.image ||
      imagePath.greeting;

  return {
    id: baseId || fullId,
    englishName: fest.englishName || fest.nameEn || '',
    hindiName: fest.hindiName || fest.nameHi || '',
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

export const getFestivalData = async (): Promise<Festival[]> => {
  try {
    const cachedData = storage.getString(FESTIVAL_DATA_CACHE_KEY);

    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      return parsed.map(mapFestivalWithImage);
    }

    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'festivals'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      storage.set(FESTIVAL_DATA_CACHE_KEY, JSON.stringify(rawList));
    }

    return rawList.map(mapFestivalWithImage);
  } catch (error) {
    console.error('Error fetching festivals from Firestore:', error);
    return [];
  }
};

export const clearFestivalDataCache = (): void => {
  storage.remove(FESTIVAL_DATA_CACHE_KEY);
};
