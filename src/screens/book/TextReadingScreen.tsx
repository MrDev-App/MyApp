import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { triggerHaptic } from '@helper/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { findStoryById, TextBooks } from '@constants/storiesData';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  HeartIcon,
  SunIcon,
  MoonIcon,
  BackIcon as Back,
} from '@components/icons/SvgIcons';
import FlipBookCover from './components/FlipBookCover';

type ReaderTheme = 'dark' | 'light';

const THEME_CONFIGS = {
  dark: {
    bg: '#121215',
    surface: '#1A1A20',
    surfaceSubtle: '#22222A',
    text: '#F1F1F5',
    textSecondary: '#A0A0B2',
    accent: '#F59E0B',
    border: '#2C2C36',
    cardBorder: '#3A3A48',
    tagBg: '#2A2A36',
    tagText: '#FBBF24',
    statusBar: 'light-content' as const,
    ring: colors.primary,
    white: colors.white,
  },
  light: {
    bg: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceSubtle: '#F1F3F5',
    text: '#1A1D20',
    textSecondary: '#6C757D',
    accent: '#D97706',
    border: '#E9ECEF',
    cardBorder: '#DEE2E6',
    tagBg: '#FEF3C7',
    tagText: '#92400E',
    statusBar: 'dark-content' as const,
    ring: colors.primary,
    white: colors.white,
  },
};

export const TextReadingScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';

  const { storyId } = route.params || {};
  const story = useMemo(() => {
    return findStoryById(storyId) || TextBooks[0];
  }, [storyId]);

  // Theme State (dark <-> light)
  const [themeMode, setThemeMode] = useState<ReaderTheme>(() => {
    const saved = Storage.getString(STORAGE_KEYS.TEXT_READER_THEME, 'dark');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'dark';
  });

  const [fontSize, setFontSize] = useState<number>(15);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [readingProgress, setReadingProgress] = useState(0);
  const [pageInfo, setPageInfo] = useState<{ current: number; total: number }>({
    current: 0,
    total: story?.pages?.length || 1,
  });

  const theme = THEME_CONFIGS[themeMode];

  useEffect(() => {
    if (!story?.id) return;
    try {
      const rawBookmarks = Storage.getString(
        STORAGE_KEYS.STORY_BOOKMARKS,
        '[]',
      );
      const bookmarks = JSON.parse(rawBookmarks);
      if (Array.isArray(bookmarks)) {
        setIsBookmarked(bookmarks.includes(story.id));
      }
    } catch {}
  }, [story?.id]);

  // Toggle Theme between dark and light
  const cycleTheme = () => {
    triggerHaptic();
    const next: ReaderTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    Storage.set(STORAGE_KEYS.TEXT_READER_THEME, next);
  };

  // Toggle Bookmark
  const toggleBookmark = () => {
    if (!story?.id) return;
    triggerHaptic();
    try {
      const raw = Storage.getString(STORAGE_KEYS.STORY_BOOKMARKS, '[]');
      let list: string[] = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];

      if (list.includes(story.id)) {
        list = list.filter(id => id !== story.id);
        setIsBookmarked(false);
      } else {
        list.push(story.id);
        setIsBookmarked(true);
      }
      Storage.set(STORAGE_KEYS.STORY_BOOKMARKS, JSON.stringify(list));
    } catch {}
  };

  // Callback when user flips pages in FlipBookCover
  const handlePageChange = useCallback(
    (pageIndex: number, total: number) => {
      setPageInfo({ current: pageIndex, total });

      if (story?.id) {
        try {
          const raw = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
          const map = JSON.parse(raw) || {};

          Storage.set(STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(map));
        } catch {}
      }
    },
    [story?.id],
  );

  if (!story) {
    return null;
  }

  const title = currentLang === 'hi' ? story.titleHi : story.titleEn;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bg }]}
      edges={['top', 'bottom']}
    >
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.bg}
        animated={true}
      />

      {/* Top Header Controls Bar */}
      <View style={[styles.headerBar, { borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.ring }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text
            style={[styles.headerTitleText, { color: theme.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View style={styles.headerRightActions}>
          {/* Theme Switcher Button */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.surface }]}
            onPress={cycleTheme}
            activeOpacity={0.7}
          >
            {themeMode === 'dark' ? (
              <SunIcon size={scale(16)} color={theme.accent} />
            ) : (
              <MoonIcon size={scale(16)} color={theme.accent} />
            )}
          </TouchableOpacity>

          {/* Bookmark Toggle Button */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.surface }]}
            onPress={toggleBookmark}
            activeOpacity={0.7}
          >
            <HeartIcon
              size={scale(16)}
              color={isBookmarked ? colors.ring : theme.textSecondary}
              filled={isBookmarked}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlipBookCover
        story={story}
        currentLang={currentLang}
        theme={theme}
        fontSize={fontSize}
        onPageChange={handlePageChange}
      />
    </SafeAreaView>
  );
};

export default TextReadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    gap: scale(10),
  },
  iconButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniButton: {
    paddingHorizontal: scale(8),
    height: scale(30),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtnText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(12),
  },
  headerTitleWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitleText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(13),
  },
  headerProgressText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(10),
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  progressTrack: {
    width: '100%',
    height: scale(3),
  },
  progressBar: {
    height: '100%',
  },
});
