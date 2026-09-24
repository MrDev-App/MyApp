export interface FestivalVideoEntry {
  festivalId: string;
  festivalName: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;
  priority: number;
  type: 'bundled' | 'remote';
  videoUrl?: string; // type: 'remote' ke liye
  assetKey?: string; // type: 'bundled' ke liye
  wishText?: string; // 👈 naya
  subtitleText?: string;
}

export interface HomeScreenVideoConfig {
  featureEnabled: boolean;
  videos: FestivalVideoEntry[];
  defaultAssetKey: string;
}
