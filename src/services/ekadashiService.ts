import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import {
  EkadashiItem,
  EkadashiMonth,
  ekadashi2026Data,
} from '@constants/ekadashiData';
import { STORAGE_KEYS } from '@constants/storageKeys';

export type { EkadashiItem, EkadashiMonth };
export { ekadashi2026Data };

const storage = createMMKV();

/**
 * Fetch all 12 months with their Ekadashis from MMKV or Firestore.
 * Falls back to local constants if Firestore is offline or empty.
 */
export const getEkadashiMonthsData = async (): Promise<EkadashiMonth[]> => {
  try {
    const cachedData = storage.getString(STORAGE_KEYS.EKADASHI_DATA_CACHE);
    if (cachedData) {
      const parsed: EkadashiMonth[] = JSON.parse(cachedData);
      const sorted = parsed.sort((a, b) => a.month - b.month);
      return sorted;
    }

    const db = getFirestore();
    const snapshot = await getDocs(collection(db, ekadashi2026Data.collection));

    let monthsList: EkadashiMonth[] = [];

    if (!snapshot.empty) {
      snapshot.docs.forEach(docSnap => {
        const data = docSnap.data();
        if (
          data &&
          typeof data.month === 'number' &&
          Array.isArray(data.ekadashis)
        ) {
          monthsList.push({
            month: data.month,
            monthName: data.monthName || `Month ${data.month}`,
            ekadashis: data.ekadashis,
          });
        }
      });

      monthsList.sort((a, b) => a.month - b.month);
    }

    if (monthsList.length > 0) {
      storage.set(STORAGE_KEYS.EKADASHI_DATA_CACHE, JSON.stringify(monthsList));
      return monthsList;
    }

    return ekadashi2026Data.months;
  } catch (error) {
    console.error('Error fetching Ekadashi from Firestore:', error);
    return ekadashi2026Data.months;
  }
};

/**
 * Get all Ekadashis for the year as a flat list (sorted by date).
 */
export const getAllEkadashisData = async (): Promise<EkadashiItem[]> => {
  const months = await getEkadashiMonthsData();
  const allEkadashis: EkadashiItem[] = [];

  months.forEach(monthItem => {
    (monthItem.ekadashis || []).forEach(e => {
      allEkadashis.push({
        ...e,
        month: monthItem.month,
        monthName: monthItem.monthName,
        year: 2026,
      });
    });
  });

  return allEkadashis.sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Get Ekadashis for a specific month (1 to 12).
 */
export const getEkadashisByMonth = async (
  monthNumber: number,
): Promise<EkadashiItem[]> => {
  const months = await getEkadashiMonthsData();
  const targetMonth = months.find(m => m.month === monthNumber);
  return targetMonth ? targetMonth.ekadashis : [];
};

/**
 * Get upcoming Ekadashis based on the current date.
 */
export const getUpcomingEkadashis = async (
  count = 3,
): Promise<EkadashiItem[]> => {
  const all = await getAllEkadashisData();
  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = all.filter(e => e.date >= todayStr);
  return upcoming.slice(0, count);
};

/**
 * Clear the Ekadashi MMKV cache to force a fresh Firestore reload next time.
 */
export const clearEkadashiDataCache = (): void => {
  storage.remove(STORAGE_KEYS.EKADASHI_DATA_CACHE);
};
