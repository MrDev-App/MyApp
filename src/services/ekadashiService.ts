import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { CALENDAR_2026 } from '@constants/Calendar_2026';
import { getMonthName } from '@constants/calendarData';

export interface EkadashiItem {
  id?: string;
  date: string;
  day: number;
  dayOfWeek: string;
  dayOfWeekHi?: string;
  paksha: string;
  pakshaHi?: string;
  name: string;
  nameHi?: string;
  shortMonth?: string;
  shortMonthHi?: string;
  month?: number;
  monthName?: string;
  monthNameHi?: string;
  year?: number;
}

export interface EkadashiMonth {
  month: number;
  monthName: string;
  monthNameHi?: string;
  ekadashis: EkadashiItem[];
}

export interface EkadashiData {
  collection: string;
  year: number;
  months: EkadashiMonth[];
}

const buildEkadashi2026Data = (): EkadashiData => {
  const ekadashiFestivals = CALENDAR_2026.filter(
    f =>
      (f.category && f.category.toLowerCase().includes('ekadashi')) ||
      (f.englishName && f.englishName.toLowerCase().includes('ekadashi')),
  );

  const months: EkadashiMonth[] = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    const monthName = getMonthName(monthNum, 'en');
    const monthNameHi = getMonthName(monthNum, 'hi');

    const monthEkadashis: EkadashiItem[] = ekadashiFestivals
      .filter(f => f.month === monthNum)
      .sort((a, b) => a.day - b.day)
      .map(f => {
        const mm = String(f.month).padStart(2, '0');
        const dd = String(f.day).padStart(2, '0');
        const dateStr = `2026-${mm}-${dd}`;
        const dateObj = new Date(2026, f.month - 1, f.day);
        const dayOfWeek = dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
        });

        return {
          id: f.id,
          date: dateStr,
          day: f.day,
          dayOfWeek,
          paksha: f.tithi || '',
          pakshaHi: f.tithiHi || '',
          name: f.englishName || f.name,
          nameHi: f.hindiName || '',
          month: f.month,
          monthName,
          monthNameHi,
          year: 2026,
        };
      });

    return {
      month: monthNum,
      monthName,
      monthNameHi,
      ekadashis: monthEkadashis,
    };
  });

  return {
    collection: 'ekadashi_2026',
    year: 2026,
    months,
  };
};

export const ekadashi2026Data = buildEkadashi2026Data();

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
      const hasHindiSupport = parsed.some(m =>
        m.ekadashis?.some(e => !!e.nameHi),
      );
      if (hasHindiSupport) {
        const sorted = parsed.sort((a, b) => a.month - b.month);
        return sorted;
      }
      storage.remove(STORAGE_KEYS.EKADASHI_DATA_CACHE);
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
            monthNameHi: data.monthNameHi,
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
    console.warn(
      'Notice: Firestore unavailable, using local Ekadashi data:',
      error,
    );
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
