import { SharedValue } from 'react-native-reanimated';
import { Story, StoryPage } from '@constants/storiesData';

export interface FlipBookTheme {
  bg: string;
  surface: string;
  surfaceSubtle: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  tagBg: string;
  tagText: string;
  ring: string;
  white?: string;
  statusBar?: 'light-content' | 'dark-content';
}

export interface FlipBookCoverProps {
  story: Story;
  currentLang: 'en' | 'hi';
  theme: FlipBookTheme;
  fontSize?: number;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
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
  theme: FlipBookTheme;
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
}

export interface BackFaceViewProps {
  isCoverBack: boolean;
  theme: FlipBookTheme;
  source?: string;
  currentLang: 'en' | 'hi';
}
