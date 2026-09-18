import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';

export interface JapMantraItem {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
  order: number;
  isCustom: boolean;
  image?: any;
}

/**
 * Resolves local image from imagePath for Jap Mantras.
 */
export const resolveJapImage = (id: string, nameEn: string): any => {
  const rawId = (id || nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

  const deityKeywords = [
    'radha',
    'krishna',
    'gayatri',
    'mrityunjaya',
    'shiva',
    'shiv',
    'ram',
    'rama',
    'hanuman',
    'ganesh',
    'ganesha',
    'durga',
    'laxmi',
    'lakshmi',
  ];

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  return imagePath.lotus || imagePath.greeting;
};

/**
 * Maps Firestore japMantras doc to JapMantraItem.
 */
export const mapJapMantraDoc = (docId: string, data: any): JapMantraItem => {
  const id = docId || data.id || '';
  const nameEn = data.nameEn || '';
  return {
    id,
    nameEn,
    nameHi: data.nameHi || '',
    textEn: data.textEn || '',
    textHi: data.textHi || '',
    order: Number(data.order) || 0,
    isCustom: Boolean(data.isCustom),
    image: resolveJapImage(id, nameEn),
  };
};

/**
 * Fetches all Jap Mantras from Firestore collection 'japMantras'.
 */
export const getJapMantrasData = async (): Promise<JapMantraItem[]> => {
  console.log('----------------------------------------------------');
  console.log('📿 [JapService] Fetching Jap Mantras from Firestore...');

  try {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'japMantras'));

    if (!snapshot || snapshot.empty) {
      console.warn('⚠️ [JapService] No japMantras found in Firestore.');
      console.log('----------------------------------------------------');
      return [];
    }

    const list: JapMantraItem[] = snapshot.docs.map(docSnap => {
      const mapped = mapJapMantraDoc(docSnap.id, docSnap.data());
      console.log(
        `📌 [JapService] Doc [${docSnap.id}] -> ${mapped.nameEn} | ${mapped.textHi}`,
      );
      return mapped;
    });

    list.sort((a, b) => a.order - b.order);

    console.log(
      `✅ [JapService] Successfully loaded ${list.length} jap mantras.`,
    );
    console.log('----------------------------------------------------');
    return list;
  } catch (error) {
    console.error(
      '❌ [JapService] Error fetching japMantras from Firestore:',
      error,
    );
    console.log('----------------------------------------------------');
    return [];
  }
};

export default getJapMantrasData;
