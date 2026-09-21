import { SharedValue } from 'react-native-reanimated';
import { Story, StoryPage } from '@constants/storiesData';

export interface FlipBookCoverProps {
  story: Story;
  currentLang: 'en' | 'hi';
  fontSize?: number;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
  onCoverImageLoaded?: () => void;
}

export interface BookSheetProps {
  index: number;
  totalSheets: number;
  progress: SharedValue<number>;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onHalfwayChange: (targetPage: number) => void;
  bookWidth?: number;
}

export interface StoryPageViewProps {
  pageData: StoryPage;
  fontSize: number;
  category?: string;
  source?: string;
  currentLang: 'en' | 'hi';
  isInteractive: boolean;
  totalPages?: number;
}

export interface CoverFrontViewProps {
  story: Story;
  title: string;
  subtitle?: string;
  category?: string;
  currentLang: 'en' | 'hi';
  onOpenBook: () => void;
  onCoverImageLoaded?: () => void;
}

export interface BackFaceViewProps {
  isCoverBack: boolean;
  source?: string;
  currentLang: 'en' | 'hi';
}
