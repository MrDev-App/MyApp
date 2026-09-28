import { STORAGE_KEYS } from '@constants/storageKeys';

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  textEn?: string;
  textHi?: string;
  image: any;
  headerTitleEn?: string;
  headerTitleHi?: string;
  isJyotirlinga?: boolean;
}

export interface Category {
  id: string;
  titleEn: string;
  titleHi: string;
  icon?: any;
  coverImage?: any;
  descriptionEn: string;
  descriptionHi: string;
  items: CategoryItem[];
}

export type TempleCategory =
  | 'chardham'
  | 'jyotirlinga'
  | 'shaktipeeth'
  | 'major'
  | 'chota_chardham';

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface TempleTiming {
  openingTime?: string;
  closingTime?: string;
  aartiTimingsHi?: string;
  aartiTimingsEn?: string;
  bestTimeToVisitHi?: string;
  bestTimeToVisitEn?: string;
}

export interface HowToReach {
  byAirHi?: string;
  byAirEn?: string;
  byRailHi?: string;
  byRailEn?: string;
  byRoadHi?: string;
  byRoadEn?: string;
  nearestAirport?: string;
  nearestRailwayStation?: string;
}

export interface TempleFestival {
  nameHi: string;
  nameEn: string;
  dateHi?: string;
  dateEn?: string;
  descriptionHi?: string;
  descriptionEn?: string;
}

export interface TempleItem {
  id: string;
  order?: number;
  isActive?: boolean;
  updatedAt?: string;

  // ── Identity ──────────────────────────────────────────────
  nameHi: string;
  nameEn: string;
  aliasNamesHi?: string[];
  aliasNamesEn?: string[];

  // ── Location ──────────────────────────────────────────────
  locationHi: string;
  locationEn: string;
  addressHi?: string;
  addressEn?: string;
  districtHi?: string;
  districtEn?: string;
  stateHi: string;
  stateEn: string;
  countryHi?: string;
  countryEn?: string;
  pincode?: string;
  geo?: GeoLocation;

  // ── Religious details ─────────────────────────────────────
  deityHi: string;
  deityEn: string;
  otherDeitiesHi?: string[];
  otherDeitiesEn?: string[];
  yugaHi?: string;
  yugaEn?: string;
  directionHi?: string;
  directionEn?: string;
  mythologyHi?: string;
  mythologyEn?: string;

  // ── Categorization ────────────────────────────────────────
  category: TempleCategory;
  categories: TempleCategory[];
  isCharDham?: boolean;
  isJyotirlinga?: boolean;
  isShaktipeeth?: boolean;
  isChotaCharDham?: boolean;
  isDivyaDesam?: boolean;
  tags?: string[];

  // ── History & significance ────────────────────────────────
  historyHi?: string;
  historyEn?: string;
  builtCentury?: string;
  builtByHi?: string;
  builtByEn?: string;
  architectureStyleHi?: string;
  architectureStyleEn?: string;
  significanceHi: string;
  significanceEn: string;
  descriptionHi: string;
  descriptionEn: string;

  // ── Visiting info ─────────────────────────────────────────
  timing: TempleTiming;
  entryFeeHi?: string;
  entryFeeEn?: string;
  dressCodeHi?: string;
  dressCodeEn?: string;
  festivals?: TempleFestival[];

  // ── Connectivity ──────────────────────────────────────────
  howToReach?: HowToReach;
  nearbyAttractionsHi?: string;
  nearbyAttractionsEn?: string;
  nearbyTempleIds?: string[];

  // ── Media ─────────────────────────────────────────────────
  image: any;
  imageUrl?: string;
  galleryImageUrls?: string[];
  videoUrl?: string;
  aartiAudioUrl?: string;

  // ── Contact ───────────────────────────────────────────────
  officialWebsite?: string;
  contactPhone?: string;
}

export interface ShlokaCategory {
  id: string;
  slug: string;
  title?: string;
  titleEn?: string;
  titleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  imageUrl: string;
}

export interface ShlokaVerse {
  id: string;
  title: string;
  titleHi?: string;
  sanskrit: string;
  transliteration?: string;
  translationEn: string;
  translationHi?: string;
  meaningEn?: string;
  meaningHi?: string;
  deity?: string;
  image?: any;
  audioUrl?: string;
  link?: string;
}

export interface ShlokaSubItem {
  id: string;
  nameEn: string;
  nameHi: string;
  headerTitleEn: string;
  headerTitleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  sanskrit?: string;
  transliteration?: string;
  meaningHi?: string;
  meaningEn?: string;
  image?: any;
  imageUrl?: string;
  audioUrl?: string;
  deity?: string;
  path?: string;
  verses?: ShlokaVerse[];
}

export interface ShlokaCategoryDetail {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl?: string;
  path?: string;
  items: ShlokaSubItem[];
}

//japMantrasApi.ts
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
  nameHi: 'राधा',
  textEn: 'राधा',
  textHi: 'राधा',
};

//godMantrasApi.ts
export interface GodMantra {
  nameEn: string;
  nameHi: string;
  mantra: string;
}

export interface NaamJapItem {
  id: string;
  englishName: string;
  hindiName: string;
  mantra: string;
  image?: any;
  imageUrl?: string;
  mantras: GodMantra[];
}

//FestivalApi.ts
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
  date: string;
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

export const JAP_MANTRAS_CACHE_KEY = STORAGE_KEYS.JAP_MANTRAS_CACHE;

export type AartiItem = CategoryItem;
export type AartiCategory = Category;
export type God = NaamJapItem;

export const deityKeywords = [
  'ganesha',
  'ganesh',
  'ganpati',
  'shiva',
  'shiv',
  'bholenath',
  'bhole',
  'mahadev',
  'hanuman',
  'bajrangbali',
  'krishna',
  'kanha',
  'radha',
  'kunjbihari',
  'rama',
  'ram',
  'shriram',
  'durga',
  'kali',
  'kalimaa',
  'laxmi',
  'lakshmi',
  'saraswati',
  'gayatri',
  'surya',
  'suryadev',
  'vishnu',
  'narayan',
  'jagdish',
  'satyanarayan',
  'shani',
  'shanidev',
  'brahma',
  'kubera',
  'kuber',
  'ganga',
  'vishwakarma',
];
