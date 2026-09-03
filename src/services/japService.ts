import { createMMKV } from 'react-native-mmkv';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { Storage } from './storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';

export interface MantraSelectorItem {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
  isCustom?: boolean;
  order?: number;
}

export const DEFAULT_MANTRA: MantraSelectorItem = {
  id: 'Radha',
  nameEn: 'Radha Mantra',
  nameHi: 'राधा मंत्र',
  textEn: 'राधा',
  textHi: 'राधा',
};

const storage = createMMKV();
export const JAP_MANTRAS_CACHE_KEY = STORAGE_KEYS.JAP_MANTRAS_CACHE;

export const mapMantraItem = (item: any, index = 0): MantraSelectorItem => {
  return {
    id: item.id || '',
    nameEn: item.nameEn || '',
    nameHi: item.nameHi || '',
    textEn: item.textEn || '',
    textHi: item.textHi || '',
    isCustom: item.isCustom ?? false,
    order: item.order ?? index,
  };
};

export const getJapMantrasData = async (): Promise<MantraSelectorItem[]> => {
  try {
    const cachedData = storage.getString(JAP_MANTRAS_CACHE_KEY);

    if (cachedData) {
      const parsed: any[] = JSON.parse(cachedData);
      return parsed.map(mapMantraItem);
    }

    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'japMantras'));

    let rawList: any[] = [];
    if (!snapshot.empty) {
      rawList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    }

    if (rawList.length > 0) {
      storage.set(JAP_MANTRAS_CACHE_KEY, JSON.stringify(rawList));
    }

    return rawList.map(mapMantraItem);
  } catch (error) {
    console.error('Error fetching japMantras from Firestore:', error);
    return [DEFAULT_MANTRA];
  }
};

export const clearJapMantrasCache = (): void => {
  storage.remove(JAP_MANTRAS_CACHE_KEY);
};

export interface MantraRecord {
  count: number;
  mala: number;
}

export interface DayLog {
  totalCount: number;
  totalMala: number;
  mantras: {
    [mantraId: string]: MantraRecord;
  };
}

export interface JapaHistory {
  [dateStr: string]: DayLog;
}

export interface CustomMantra {
  id: string;
  nameEn: string;
  nameHi: string;
  textEn: string;
  textHi: string;
  isCustom: boolean;
}

export const logChant = (mantraId: string, increment = 1) => {
  const isoDateStr = new Date().toISOString().split('T')[0];

  const currentGlobalToday = Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0);
  Storage.set(STORAGE_KEYS.JAP_TODAY_COUNT, currentGlobalToday + increment);

  const currentGlobalTotal = Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT, 0);
  Storage.set(STORAGE_KEYS.JAP_TOTAL_COUNT, currentGlobalTotal + increment);

  const globalTodayMala = Math.floor((currentGlobalToday + increment) / 108);
  Storage.set(STORAGE_KEYS.JAP_TODAY_MALA, globalTodayMala);

  const globalTotalMala = Math.floor((currentGlobalTotal + increment) / 108);
  Storage.set(STORAGE_KEYS.JAP_TOTAL_MALA, globalTotalMala);

  const currentMantraToday = Storage.getNumber(
    `JAP_TODAY_COUNT_${mantraId}`,
    0,
  );
  Storage.set(`JAP_TODAY_COUNT_${mantraId}`, currentMantraToday + increment);

  const currentMantraTotal = Storage.getNumber(
    `JAP_TOTAL_COUNT_${mantraId}`,
    0,
  );
  Storage.set(`JAP_TOTAL_COUNT_${mantraId}`, currentMantraTotal + increment);

  const mantraTodayMala = Math.floor((currentMantraToday + increment) / 108);
  Storage.set(`JAP_TODAY_MALA_${mantraId}`, mantraTodayMala);

  const mantraTotalMala = Math.floor((currentMantraTotal + increment) / 108);
  Storage.set(`JAP_TOTAL_MALA_${mantraId}`, mantraTotalMala);

  try {
    const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
    const history: JapaHistory = JSON.parse(rawHistory);

    if (!history[isoDateStr]) {
      history[isoDateStr] = { totalCount: 0, totalMala: 0, mantras: {} };
    }

    history[isoDateStr].totalCount += increment;
    history[isoDateStr].totalMala = Math.floor(
      history[isoDateStr].totalCount / 108,
    );

    if (!history[isoDateStr].mantras[mantraId]) {
      history[isoDateStr].mantras[mantraId] = { count: 0, mala: 0 };
    }
    history[isoDateStr].mantras[mantraId].count += increment;
    history[isoDateStr].mantras[mantraId].mala = Math.floor(
      history[isoDateStr].mantras[mantraId].count / 108,
    );

    Storage.set(STORAGE_KEYS.JAP_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to log Japa history:', error);
  }
};

export const getDayWiseStats = (mantraId?: string) => {
  try {
    const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
    const history: JapaHistory = JSON.parse(rawHistory);
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const log = history[dateStr];

      let count = 0;
      let mala = 0;
      if (log) {
        if (mantraId) {
          count = log.mantras[mantraId]?.count || 0;
          mala = log.mantras[mantraId]?.mala || 0;
        } else {
          count = log.totalCount;
          mala = log.totalMala;
        }
      }

      data.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: count,
        mala: mala,
        date: dateStr,
      });
    }
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getWeekWiseStats = (mantraId?: string) => {
  try {
    const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
    const history: JapaHistory = JSON.parse(rawHistory);
    const weeks = [];

    for (let i = 3; i >= 0; i--) {
      let weekCount = 0;
      let weekMala = 0;
      for (let d = 0; d < 7; d++) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 7 + d));
        const dateStr = date.toISOString().split('T')[0];
        const log = history[dateStr];
        if (log) {
          if (mantraId) {
            weekCount += log.mantras[mantraId]?.count || 0;
            weekMala += log.mantras[mantraId]?.mala || 0;
          } else {
            weekCount += log.totalCount;
            weekMala += log.totalMala;
          }
        }
      }
      weeks.push({
        label: i === 0 ? 'This Wk' : `${i}w ago`,
        value: weekCount,
        mala: weekMala,
      });
    }
    return weeks;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getMonthWiseStats = (mantraId?: string) => {
  try {
    const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
    const history: JapaHistory = JSON.parse(rawHistory);
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}`;

      let count = 0;
      let mala = 0;
      Object.keys(history).forEach(dateKey => {
        if (dateKey.startsWith(yearMonth)) {
          const log = history[dateKey];
          if (mantraId) {
            count += log.mantras[mantraId]?.count || 0;
            mala += log.mantras[mantraId]?.mala || 0;
          } else {
            count += log.totalCount;
            mala += log.totalMala;
          }
        }
      });

      months.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        value: count,
        mala: mala,
      });
    }
    return months;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getYearWiseStats = (mantraId?: string) => {
  try {
    const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
    const history: JapaHistory = JSON.parse(rawHistory);
    const years = [];

    const currentYear = new Date().getFullYear();
    for (let i = 2; i >= 0; i--) {
      const year = currentYear - i;
      let count = 0;
      let mala = 0;
      Object.keys(history).forEach(dateKey => {
        if (dateKey.startsWith(String(year))) {
          const log = history[dateKey];
          if (mantraId) {
            count += log.mantras[mantraId]?.count || 0;
            mala += log.mantras[mantraId]?.mala || 0;
          } else {
            count += log.totalCount;
            mala += log.totalMala;
          }
        }
      });

      years.push({
        label: String(year),
        value: count,
        mala: mala,
      });
    }
    return years;
  } catch (e) {
    console.error(e);
    return [];
  }
};
