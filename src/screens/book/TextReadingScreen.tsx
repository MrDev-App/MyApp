import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Vibration,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import AnimatedButton from '@components/AnimatedButton';

type ReaderTheme = 'sepia' | 'dark' | 'light';

const THEME_CONFIGS = {
  sepia: {
    bg: '#FAF5EC',
    surface: '#F3EAD7',
    surfaceSubtle: '#EDE2CC',
    text: '#2C1D11',
    textSecondary: '#6E5D4F',
    accent: '#B87A24',
    border: '#E2D5BE',
    cardBorder: '#D8C7AA',
    tagBg: '#EFE3CE',
    tagText: '#995B16',
    statusBar: 'dark-content' as const,
  },
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
  },
};

const triggerHaptic = () => {
  try {
    Vibration.vibrate(25);
  } catch {}
};

export const TextReadingScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';

  const { storyId } = route.params || {};
  const story = useMemo(() => {
    return findStoryById(storyId) || TextBooks[0];
  }, [storyId]);

  // Theme State (sepia -> dark -> light)
  const [themeMode, setThemeMode] = useState<ReaderTheme>(() => {
    const saved = Storage.getString(STORAGE_KEYS.READER_THEME, 'sepia');
    if (saved === 'dark' || saved === 'light' || saved === 'sepia') {
      return saved;
    }
    return 'sepia';
  });

  // Font Size Scale State (14 to 22)
  const [fontSize, setFontSize] = useState<number>(16);

  // Favorite / Bookmark State
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Reading Progress State (0 to 100%)
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const theme = THEME_CONFIGS[themeMode];

  // Load Initial Bookmark & Progress State
  useEffect(() => {
    if (!story?.id) return;
    try {
      const rawBookmarks = Storage.getString(STORAGE_KEYS.STORY_BOOKMARKS, '[]');
      const bookmarks = JSON.parse(rawBookmarks);
      if (Array.isArray(bookmarks)) {
        setIsBookmarked(bookmarks.includes(story.id));
      }

      const rawProgress = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
      const progressMap = JSON.parse(rawProgress);
      if (progressMap && typeof progressMap[story.id] === 'number') {
        setReadingProgress(progressMap[story.id]);
      }
    } catch {}
  }, [story?.id]);

  // Toggle Theme
  const cycleTheme = () => {
    triggerHaptic();
    const next: ReaderTheme =
      themeMode === 'sepia' ? 'dark' : themeMode === 'dark' ? 'light' : 'sepia';
    setThemeMode(next);
    Storage.set(STORAGE_KEYS.READER_THEME, next);
  };

  // Adjust Font Size
  const increaseFontSize = () => {
    if (fontSize < 22) {
      triggerHaptic();
      setFontSize(prev => prev + 1.5);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 13.5) {
      triggerHaptic();
      setFontSize(prev => prev - 1.5);
    }
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

  // Track Reading Progress on Scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const totalHeight = contentSize.height - layoutMeasurement.height;
    if (totalHeight > 0) {
      const current = Math.min(
        100,
        Math.max(0, Math.round((contentOffset.y / totalHeight) * 100)),
      );
      setReadingProgress(current);

      if (story?.id) {
        try {
          const raw = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
          const map = JSON.parse(raw) || {};
          map[story.id] = current;
          Storage.set(STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(map));
        } catch {}
      }
    }
  };

  // Share Wisdom
  const handleShareWisdom = async () => {
    triggerHaptic();
    if (!story) return;

    const title = currentLang === 'hi' ? story.titleHi : story.titleEn;
    const quote =
      currentLang === 'hi'
        ? story.moralHi || story.descriptionHi
        : story.moralEn || story.descriptionEn;

    const message = `✨ ${title} ✨\n\n"${quote}"\n\nRead more divine wisdom on GuruVani 🙏`;
    try {
      await Share.share({ message, title });
    } catch {}
  };

  if (!story) {
    return null;
  }

  const title = currentLang === 'hi' ? story.titleHi : story.titleEn;
  const subtitle = currentLang === 'hi' ? story.subtitleHi : story.subtitleEn;
  const category = currentLang === 'hi' ? story.categoryHi : story.categoryEn;
  const source = currentLang === 'hi' ? story.sourceHi : story.sourceEn;
  const difficulty =
    currentLang === 'hi' ? story.difficultyHi : story.difficultyEn;
  const content = currentLang === 'hi' ? story.contentHi : story.contentEn;
  const shlokaTranslation =
    currentLang === 'hi'
      ? story.shlokaTranslationHi
      : story.shlokaTranslationEn;
  const moral = currentLang === 'hi' ? story.moralHi : story.moralEn;

  // Split narrative into readable paragraphs
  const paragraphs = (content || '')
    .split('\n\n')
    .filter(p => p.trim().length > 0);

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
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Back width={scale(14)} height={scale(14)} stroke={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text
            style={[styles.headerTitleText, { color: theme.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={[styles.headerProgressText, { color: theme.textSecondary }]}
          >
            {readingProgress}% {currentLang === 'hi' ? 'पढ़ा गया' : 'Read'}
          </Text>
        </View>

        <View style={styles.headerRightActions}>
          {/* Font Size Decrement */}
          <TouchableOpacity
            style={[styles.miniButton, { backgroundColor: theme.surface }]}
            onPress={decreaseFontSize}
            activeOpacity={0.7}
          >
            <Text style={[styles.fontBtnText, { color: theme.text }]}>A-</Text>
          </TouchableOpacity>

          {/* Font Size Increment */}
          <TouchableOpacity
            style={[styles.miniButton, { backgroundColor: theme.surface }]}
            onPress={increaseFontSize}
            activeOpacity={0.7}
          >
            <Text style={[styles.fontBtnText, { color: theme.text }]}>A+</Text>
          </TouchableOpacity>

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

      {/* Subtle Progress Bar */}
      <View style={[styles.progressTrack, { backgroundColor: theme.surfaceSubtle }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${readingProgress}%`,
              backgroundColor: theme.accent,
            },
          ]}
        />
      </View>

      {/* Main Reading Scroll Content */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollBody,
          { paddingBottom: insets.bottom + scale(60) },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero Card with Cover & Meta */}
        <View style={[styles.heroCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          {story.image && (
            <Image source={story.image} style={styles.coverThumbnail} />
          )}

          <View style={styles.heroDetails}>
            <View style={[styles.categoryPill, { backgroundColor: theme.tagBg }]}>
              <Text style={[styles.categoryText, { color: theme.tagText }]}>
                {category}
              </Text>
            </View>

            <Text style={[styles.bookTitle, { color: theme.text }]}>
              {title}
            </Text>

            {subtitle ? (
              <Text style={[styles.bookSubtitle, { color: theme.textSecondary }]}>
                {subtitle}
              </Text>
            ) : null}

            <View style={styles.metaRow}>
              <Text style={[styles.metaItem, { color: theme.textSecondary }]}>
                ⏱ {story.readingTimeMin} {currentLang === 'hi' ? 'मिनट' : 'Min'}
              </Text>
              <Text style={[styles.metaItem, { color: theme.textSecondary }]}>
                • {source}
              </Text>
              <Text style={[styles.metaItem, { color: theme.textSecondary }]}>
                • {difficulty}
              </Text>
            </View>
          </View>
        </View>

        {/* Sacred Sanskrit Shloka Box (if available) */}
        {story.shloka ? (
          <View
            style={[
              styles.shlokaBox,
              {
                backgroundColor: theme.surface,
                borderColor: theme.accent,
              },
            ]}
          >
            <View style={styles.shlokaHeaderRow}>
              <Text style={[styles.shlokaTag, { color: theme.accent }]}>
                ✦ {currentLang === 'hi' ? 'दिव्य श्लोक' : 'SACRED SHLOKA'} ✦
              </Text>
            </View>

            <Text style={[styles.shlokaText, { color: theme.text }]}>
              {story.shloka}
            </Text>

            {shlokaTranslation ? (
              <View style={[styles.shlokaMeaningBox, { borderTopColor: theme.border }]}>
                <Text style={[styles.meaningTitle, { color: theme.accent }]}>
                  {currentLang === 'hi' ? 'भावार्थ:' : 'Meaning:'}
                </Text>
                <Text style={[styles.meaningText, { color: theme.textSecondary }]}>
                  {shlokaTranslation}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {/* Narrative Paragraphs */}
        <View style={styles.textContainer}>
          {paragraphs.map((paragraph, index) => (
            <Text
              key={`p_${index}`}
              style={[
                styles.paragraph,
                {
                  color: theme.text,
                  fontSize: fs(fontSize),
                  lineHeight: fs(fontSize * 1.65),
                },
              ]}
            >
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Moral of the Story / Wisdom Card */}
        {moral ? (
          <View
            style={[
              styles.moralCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.accent,
              },
            ]}
          >
            <Text style={[styles.moralHeader, { color: theme.accent }]}>
              💡 {currentLang === 'hi' ? 'सच्ची सीख एवं प्रेरणा' : 'Moral Wisdom'}
            </Text>
            <Text style={[styles.moralContent, { color: theme.text }]}>
              "{moral}"
            </Text>
          </View>
        ) : null}

        {/* Share Wisdom Action Button */}
        <AnimatedButton
          style={[styles.shareBtn, { backgroundColor: theme.accent }]}
          onPress={handleShareWisdom}
        >
          <Text style={styles.shareBtnText}>
            ✨ {currentLang === 'hi' ? 'दिव्य सुविचार साझा करें' : 'Share Divine Wisdom'}
          </Text>
        </AnimatedButton>
      </ScrollView>
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
  scrollBody: {
    paddingHorizontal: scale(18),
    paddingTop: scale(16),
  },
  heroCard: {
    flexDirection: 'row',
    padding: scale(14),
    borderRadius: scale(16),
    borderWidth: 1,
    marginBottom: scale(18),
    gap: scale(14),
    alignItems: 'center',
  },
  coverThumbnail: {
    width: scale(80),
    height: scale(105),
    borderRadius: scale(10),
    resizeMode: 'cover',
  },
  heroDetails: {
    flex: 1,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(6),
    marginBottom: scale(6),
  },
  categoryText: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsSemiBold,
  },
  bookTitle: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    lineHeight: fs(21),
    marginBottom: scale(2),
  },
  bookSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    marginBottom: scale(6),
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
  },
  metaItem: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
  },
  shlokaBox: {
    borderRadius: scale(14),
    borderWidth: 1.5,
    padding: scale(16),
    marginBottom: scale(20),
  },
  shlokaHeaderRow: {
    alignItems: 'center',
    marginBottom: scale(8),
  },
  shlokaTag: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsBold,
    letterSpacing: 1.5,
  },
  shlokaText: {
    fontFamily: fonts.Marcellus,
    fontSize: fs(16),
    lineHeight: fs(25),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shlokaMeaningBox: {
    marginTop: scale(12),
    paddingTop: scale(10),
    borderTopWidth: 1,
  },
  meaningTitle: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(11),
    marginBottom: scale(2),
  },
  meaningText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(12.5),
    lineHeight: fs(18),
  },
  textContainer: {
    marginBottom: scale(20),
  },
  paragraph: {
    fontFamily: fonts.PoppinsRegular,
    marginBottom: scale(16),
    letterSpacing: 0.2,
  },
  moralCard: {
    borderRadius: scale(14),
    borderWidth: 1.5,
    padding: scale(16),
    marginBottom: scale(24),
  },
  moralHeader: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(13),
    marginBottom: scale(6),
  },
  moralContent: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontStyle: 'italic',
  },
  shareBtn: {
    paddingVertical: scale(12),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(20),
  },
  shareBtnText: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(13),
  },
});
