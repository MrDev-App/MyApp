import { ShlokaCategory, ShlokaSubItem, ShlokaVerse } from '@api';

export interface ShlokaCategoryBannerProps {
  slug?: string;
  description?: string;
}

export interface ShlokaCategoryCardProps {
  item: ShlokaCategory;
  index: number;
  numColumns: number;
  cardWidth: number;
  cardHeight: number;
  onPress: (item: ShlokaCategory) => void;
}

export interface ShlokaSkeletonListProps {
  count?: number;
}

export interface ShlokaSubItemCardProps {
  item: ShlokaSubItem;
  index: number;
  categoryImageUri?: string;
  onPress: (item: ShlokaSubItem) => void;
}

export interface ShlokaVerseCardProps {
  item: ShlokaVerse;
  index: number;
  isPlaying?: boolean;
  onPlayPause?: (verse: ShlokaVerse) => void;
  onCopy: (verse: ShlokaVerse) => void;
  onShare: (verse: ShlokaVerse) => void;
}
