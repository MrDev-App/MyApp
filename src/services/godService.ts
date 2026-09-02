import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { STORAGE_KEYS } from '@constants/storageKeys';

export interface GodMantra {
  nameEn: string;
  nameHi: string;
  mantra: string;
}

export interface God {
  id: string;
  englishName: string;
  hindiName: string;
  mantra: string;
  image: any;
  mantras: GodMantra[];
}

const storage = createMMKV();
export const GOD_DATA_CACHE_KEY = STORAGE_KEYS.GOD_DATA_CACHE;

const localImageMap: Record<string, any> = {
  shiv: imagePath.Bholenath,
  shiva: imagePath.Bholenath,
  bhole: imagePath.Bholenath,
  bholenath: imagePath.Bholenath,
  mahadev: imagePath.Bholenath,
  shivji: imagePath.Bholenath,

  vishnu: imagePath.Vishnu,
  narayan: imagePath.Vishnu,
  vishnuji: imagePath.Vishnu,

  krishna: imagePath.Krishna,
  kanha: imagePath.Krishna,
  krishnaji: imagePath.Krishna,

  ram: imagePath.Rama,
  rama: imagePath.Rama,
  ramji: imagePath.Rama,
  shriram: imagePath.Rama,
  shri_ram: imagePath.Rama,

  hanuman: imagePath.Hanuman,
  hanumanji: imagePath.Hanuman,
  bajrangbali: imagePath.Hanuman,

  ganesha: imagePath.Ganesha,
  ganesh: imagePath.Ganesha,
  ganpati: imagePath.Ganesha,
  ganeshji: imagePath.Ganesha,

  durga: imagePath.Durga,
  durgamata: imagePath.Durga,
  durgamaa: imagePath.Durga,

  ganga: imagePath.Gangama,
  gangama: imagePath.Gangama,
  gangamaa: imagePath.Gangama,
  gangamata: imagePath.Gangama,
  gangaji: imagePath.Gangama,

  vishwakarma: imagePath.Vishwakarma,
  viswakarma: imagePath.Vishwakarma,
  vishwakarmaji: imagePath.Vishwakarma,

  kali: imagePath.Kalima,
  kalima: imagePath.Kalima,
  kalimaa: imagePath.Kalima,
  kalimata: imagePath.Kalima,
  maakali: imagePath.Kalima,

  laxmi: imagePath.Laxmi,
  lakshmi: imagePath.Laxmi,
  laxmimata: imagePath.Laxmi,
  lakshmimata: imagePath.Laxmi,
  laxmiji: imagePath.Laxmi,
  lakshmiji: imagePath.Laxmi,
  mahalaxmi: imagePath.Laxmi,
  mahalakshmi: imagePath.Laxmi,

  saraswati: imagePath.Saraswati,
  saraswatimata: imagePath.Saraswati,
  sharda: imagePath.Saraswati,

  surya: imagePath.Surya,
  suryadev: imagePath.Surya,

  brahma: imagePath.Brahma,
  brahmaji: imagePath.Brahma,

  shani: imagePath.ShaniDev,
  shanidev: imagePath.ShaniDev,

  kubera: imagePath.Kubera,
  kuber: imagePath.Kubera,
  kuberji: imagePath.Kubera,

  radha: imagePath.SriRadha,
  radhaji: imagePath.SriRadha,
  sriradha: imagePath.SriRadha,
  shriradha: imagePath.SriRadha,
};

export const resolveGodImage = (god: any): any => {
  if (
    god.imageUrl &&
    typeof god.imageUrl === 'string' &&
    god.imageUrl.trim().startsWith('http')
  ) {
    return { uri: god.imageUrl.trim() };
  }

  const rawId = (god.id || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');
  if (localImageMap[rawId]) return localImageMap[rawId];
  if (localImageMap[cleanId]) return localImageMap[cleanId];

  const engName = (god.englishName || god.nameEn || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const hinName = god.hindiName || god.nameHi || '';

  if (
    cleanId.includes('laxmi') ||
    cleanId.includes('lakshmi') ||
    engName.includes('laxmi') ||
    engName.includes('lakshmi') ||
    hinName.includes('लक्ष्मी') ||
    hinName.includes('लक्समी')
  ) {
    return imagePath.Laxmi;
  }

  if (
    cleanId.includes('ram') ||
    engName.includes('ram') ||
    hinName.includes('राम')
  ) {
    return imagePath.Rama;
  }

  if (
    cleanId.includes('shiv') ||
    cleanId.includes('bhole') ||
    cleanId.includes('mahadev') ||
    engName.includes('shiv') ||
    hinName.includes('शिव') ||
    hinName.includes('भोले')
  ) {
    return imagePath.Bholenath;
  }

  if (
    cleanId.includes('vishnu') ||
    cleanId.includes('narayan') ||
    engName.includes('vishnu') ||
    engName.includes('narayan') ||
    hinName.includes('विष्णु') ||
    hinName.includes('नारायण')
  ) {
    return imagePath.Vishnu;
  }

  if (
    cleanId.includes('krishna') ||
    cleanId.includes('kanha') ||
    engName.includes('krishna') ||
    hinName.includes('कृष्ण') ||
    hinName.includes('कान्हा')
  ) {
    return imagePath.Krishna;
  }

  if (
    cleanId.includes('hanuman') ||
    cleanId.includes('bajrang') ||
    engName.includes('hanuman') ||
    hinName.includes('हनुमान') ||
    hinName.includes('बजरंग')
  ) {
    return imagePath.Hanuman;
  }

  if (
    cleanId.includes('ganesh') ||
    cleanId.includes('ganpati') ||
    engName.includes('ganesh') ||
    hinName.includes('गणेश') ||
    hinName.includes('गणपति')
  ) {
    return imagePath.Ganesha;
  }

  if (
    cleanId.includes('kali') ||
    cleanId.includes('kalika') ||
    engName.includes('kali') ||
    engName.includes('kalika') ||
    hinName.includes('काली') ||
    hinName.includes('कालिका')
  ) {
    return imagePath.Kalima;
  }

  if (
    cleanId.includes('ganga') ||
    cleanId.includes('gange') ||
    engName.includes('ganga') ||
    hinName.includes('गंगा') ||
    hinName.includes('गंगे')
  ) {
    return imagePath.Gangama;
  }

  if (
    cleanId.includes('vishwakarma') ||
    cleanId.includes('viswakarma') ||
    cleanId.includes('vishvakarma') ||
    engName.includes('vishwakarma') ||
    hinName.includes('विश्वकर्मा')
  ) {
    return imagePath.Vishwakarma;
  }

  if (
    cleanId.includes('durga') ||
    cleanId.includes('ambe') ||
    engName.includes('durga') ||
    hinName.includes('दुर्गा') ||
    hinName.includes('अम्बे')
  ) {
    return imagePath.Durga;
  }

  if (
    cleanId.includes('saraswati') ||
    cleanId.includes('sharda') ||
    engName.includes('saraswati') ||
    hinName.includes('सरस्वती') ||
    hinName.includes('शारदा')
  ) {
    return imagePath.Saraswati;
  }

  if (
    cleanId.includes('surya') ||
    cleanId.includes('sun') ||
    engName.includes('surya') ||
    hinName.includes('सूर्य')
  ) {
    return imagePath.Surya;
  }

  if (
    cleanId.includes('brahma') ||
    engName.includes('brahma') ||
    hinName.includes('ब्रह्मा')
  ) {
    return imagePath.Brahma;
  }

  if (
    cleanId.includes('shani') ||
    engName.includes('shani') ||
    hinName.includes('शनि')
  ) {
    return imagePath.ShaniDev;
  }

  if (
    cleanId.includes('kuber') ||
    engName.includes('kuber') ||
    hinName.includes('कुबेर')
  ) {
    return imagePath.Kubera;
  }

  if (
    cleanId.includes('radha') ||
    engName.includes('radha') ||
    hinName.includes('राधा')
  ) {
    return imagePath.SriRadha;
  }

  return god.image || imagePath.greeting;
};

export const mapGodWithImage = (god: any): God => {
  const godId = god.id || '';
  const image = resolveGodImage(god);

  return {
    id: godId,
    englishName: god.englishName || god.nameEn || '',
    hindiName: god.hindiName || god.nameHi || '',
    mantra: god.mantra || god.primaryMantra || '',
    image,
    mantras: (god.mantras || []).map((m: any) => ({
      nameEn: m.nameEn || m.name || '',
      nameHi: m.nameHi || '',
      mantra: m.mantra || '',
    })),
  };
};

export const getGodData = async (): Promise<God[]> => {
  try {
    const cachedData = storage.getString(GOD_DATA_CACHE_KEY);

    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      return parsed.map(mapGodWithImage);
    }

    const db = getFirestore();
    let snapshot = await getDocs(collection(db, 'godData'));

    if (snapshot.empty) {
      snapshot = await getDocs(collection(db, 'GodMantras'));
    }

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      storage.set(GOD_DATA_CACHE_KEY, JSON.stringify(rawList));
    }

    return rawList.map(mapGodWithImage);
  } catch (error) {
    console.error('Error fetching godData from Firestore:', error);
    return [];
  }
};

export const clearGodDataCache = (): void => {
  storage.remove(GOD_DATA_CACHE_KEY);
};
