export type GameCategoryType =
  | 'all'
  | 'classic'
  | 'trivia'
  | 'puzzle'
  | 'memory'
  | 'kids';

export interface GameItem {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  category: GameCategoryType;
  categoryLabelHi: string;
  categoryLabelEn: string;
  playersHi: string;
  playersEn: string;
  difficultyHi: string;
  difficultyEn: string;
  badgeHi?: string;
  badgeEn?: string;
  rating: number;
  playedCount: string;
  rulesHi: string[];
  rulesEn: string[];
  spiritualMeaningHi: string;
  spiritualMeaningEn: string;
  gradientColors: string[];
  accentColor: string;
  status: 'available' | 'coming_soon';
  iconType: 'dice' | 'quiz' | 'puzzle' | 'cards' | 'om' | 'lotus';
  estimatedMinutes: number;
}

export interface GameCategoryItem {
  id: GameCategoryType;
  nameHi: string;
  nameEn: string;
}
