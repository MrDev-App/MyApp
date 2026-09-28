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
