import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import {
  naamJapData,
  godData,
  NaamJapItem,
  God,
  GodMantra,
} from '@constants/naamJapData';

export type { NaamJapItem, God, GodMantra };
export { naamJapData, godData };

/**
 * Resolves local image from imagePath based on deity name / id.
 */
export const resolveGodImage = (god: any): any => {
  const rawId = (god.id || god.nameEn || '').toLowerCase().trim();
  const cleanId = rawId.replace(/[^a-z0-9]/g, '');

  if (cleanId && (imagePath as any)[cleanId]) {
    return (imagePath as any)[cleanId];
  }
  if (rawId && (imagePath as any)[rawId]) {
    return (imagePath as any)[rawId];
  }

  // Check common deity keywords
  const deityKeywords = [
    'shiva',
    'shiv',
    'bhole',
    'bholenath',
    'mahadev',
    'vishnu',
    'narayan',
    'krishna',
    'kanha',
    'radha',
    'rama',
    'ram',
    'shriram',
    'hanuman',
    'bajrangbali',
    'ganesha',
    'ganesh',
    'ganpati',
    'durga',
    'kali',
    'laxmi',
    'lakshmi',
    'saraswati',
    'gayatri',
    'surya',
    'brahma',
    'shani',
    'kubera',
    'kuber',
  ];

  for (const keyword of deityKeywords) {
    if (rawId.includes(keyword) && (imagePath as any)[keyword]) {
      return (imagePath as any)[keyword];
    }
  }

  if (
    god.imageUrl &&
    typeof god.imageUrl === 'string' &&
    god.imageUrl.trim().startsWith('http')
  ) {
    return { uri: god.imageUrl.trim() };
  }

  return god.image || imagePath.greeting;
};

/**
 * Maps Firestore 'GodMantras' document to typed God/NaamJapItem.
 */
export const mapGodWithImage = (god: any): God => {
  const godId = god.id || '';
  const image = resolveGodImage(god);

  const rawMantras = Array.isArray(god.mantras) ? god.mantras : [];
  const mantras: GodMantra[] = rawMantras.map((m: any) => ({
    nameEn: m.nameEn || m.name || '',
    nameHi: m.nameHi || '',
    mantra: m.mantra || '',
  }));

  return {
    id: godId,
    englishName: god.nameEn || god.englishName || '',
    hindiName: god.nameHi || god.hindiName || '',
    mantra: god.primaryMantra || god.mantra || mantras[0]?.mantra || '',
    image,
    mantras,
  };
};

export const getGodData = async (): Promise<God[]> => {
  console.log('----------------------------------------------------');
  console.log(
    '🔱 [GodService] Starting fetch for GodMantras from Firestore...',
  );
  try {
    const db = getFirestore();

    // 1. Primary collection: 'GodMantras'
    console.log('🔍 [GodService] Querying collection "GodMantras"...');
    let snapshot = await getDocs(collection(db, 'GodMantras'));
    console.log(
      `📄 [GodService] 'GodMantras' collection returned ${snapshot.size} document(s).`,
    );

    // 2. Fallbacks if GodMantras is empty
    if (snapshot.empty) {
      console.log(
        '⚠️ [GodService] "GodMantras" was empty, trying fallback "japMantras"...',
      );
      snapshot = await getDocs(collection(db, 'japMantras'));
    }

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => {
        const docData = docSnap.data();
        console.log(
          `📌 [GodService] Doc [${docSnap.id}] -> ${
            docData.nameEn || docData.englishName
          } (${(docData.mantras || []).length} mantras)`,
        );
        return {
          id: docSnap.id,
          ...docData,
        };
      });
    }

    if (rawList.length > 0) {
      // Sort by order field if available
      rawList.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

      const mappedList = rawList.map(mapGodWithImage);
      console.log(
        `✅ [GodService] Successfully mapped ${mappedList.length} deities from Firestore.`,
      );
      console.log('----------------------------------------------------');
      return mappedList;
    }

    console.warn(
      '⚠️ [GodService] No documents found in Firestore, falling back to local bundled naamJapData.',
    );
    console.log('----------------------------------------------------');
    return naamJapData;
  } catch (error) {
    console.error(
      '❌ [GodService] Firestore fetch failed! Falling back to local bundled naamJapData:',
      error,
    );
    console.log('----------------------------------------------------');
    return naamJapData;
  }
};

export const getNaamJapData = getGodData;
export default getGodData;
