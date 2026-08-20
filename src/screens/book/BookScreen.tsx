import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Share,
  Platform,
  Vibration,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import {
  fs,
  scale,
  verticalScale,
  screenWidth,
  screenHeight,
} from '../../utile/sizes';
import { Storage } from '../../utile/storage';
import { mythologyStories, Story } from '../../constants/storiesData';
import GradientBackground from '../../components/GradientBackground';

// Localized strings following the ProfileScreen pattern
const bookLabels = {
  en: {
    screenTitle: 'Sacred Scriptures',
    screenSubtitle: 'Dive into timeless tales of wisdom',
    searchPlaceholder: 'Search stories, epics, deities...',
    featuredTitle: 'STORY OF THE DAY',
    readNow: 'Read Now',
    myLibrary: 'My Library / In Progress',
    recentProgress: '{{progress}}% Read',
    allStories: 'Explore All Stories',
    noStoriesFound: 'No stories found matching search',
    moralLabel: 'Moral Wisdom',
    sourceLabel: 'Scripture Source',
    difficultyLabel: 'Difficulty',
    readingTime: '{{time}} Min Read',
    bookmarkRemoved: 'Removed from library',
    bookmarkAdded: 'Saved to library',
    parchmentTheme: 'Parchment',
    midnightTheme: 'Midnight',
    classicTheme: 'Classic',
    fontSizeLabel: 'Font Size',
    shareWisdom: 'Share Wisdom',
    closeReader: 'Close Reader',
    copiedToClipboard: 'Copied wisdom to clipboard!',
    shareTitle: 'Divine Wisdom from GuruVani',
    wisdomCardHeader: 'DIVINE WISDOM',
    wisdomClose: 'Okay',
    resumeReading: 'Resume Reading',
  },
  hi: {
    screenTitle: 'पौराणिक गाथाएं',
    screenSubtitle: 'सत्य और ज्ञान की अमर आध्यात्मिक कथाएं',
    searchPlaceholder: 'कहानियां, ग्रंथ या देवी-देवता खोजें...',
    featuredTitle: 'आज की विशेष कथा',
    readNow: 'अभी पढ़ें',
    myLibrary: 'मेरा पुस्तकालय / निरंतर पठन',
    recentProgress: '{{progress}}% पढ़ा गया',
    allStories: 'सभी कथाएं खोजें',
    noStoriesFound: 'खोज के अनुकूल कोई कहानी नहीं मिली',
    moralLabel: 'सच्ची सीख (नैतिकता)',
    sourceLabel: 'धर्मग्रंथ स्रोत',
    difficultyLabel: 'स्तर',
    readingTime: '{{time}} मिनट पठन',
    bookmarkRemoved: 'पुस्तकालय से हटाया गया',
    bookmarkAdded: 'पुस्तकालय में सहेजा गया',
    parchmentTheme: 'ताम्रपत्र',
    midnightTheme: 'मध्यरात्रि',
    classicTheme: 'क्लासिक',
    fontSizeLabel: 'अक्षर का आकार',
    shareWisdom: 'सुविचार साझा करें',
    closeReader: 'पठन बंद करें',
    copiedToClipboard: 'सुविचार क्लिपबोर्ड पर सहेजा गया!',
    shareTitle: 'गुरुवाणी से दिव्य सुविचार',
    wisdomCardHeader: 'दिव्य सुविचार',
    wisdomClose: 'ठीक है',
    resumeReading: 'पुनः पढ़ें',
  },
};

// Haptic feedback trigger function matching the app pattern
const triggerHaptic = (type: string = 'impactLight') => {
  if (Platform.OS === 'android') {
    try {
      Vibration.vibrate(40);
    } catch (e) {
      console.log('[Haptic] Failed', e);
    }
  } else {
    try {
      HapticFeedback.trigger(type as any, {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    } catch (e) {
      console.log('[Haptic] Failed', e);
      Vibration.vibrate(30);
    }
  }
};

const BookScreen = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';
  const labels = bookLabels[currentLang];

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Bookmarking & Progress State
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Active Story Reader State
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState(16);
  const [readerTheme, setReaderTheme] = useState<
    'parchment' | 'midnight' | 'classic'
  >('parchment');
  const [readingProgress, setReadingProgress] = useState(0);

  // Sharing Wisdom Overlay State
  const [showWisdomShare, setShowWisdomShare] = useState(false);

  // Sound visualization state (mock chanting visualizer)
  const [isChantingSoundOn, setIsChantingSoundOn] = useState(false);
  const chantAnimVal = useSharedValue(1);

  // References
  const readerScrollRef = useRef<ScrollView>(null);

  // Dynamic Categories (compiled from stories database)
  const categoriesList = [
    'All',
    'Ramayana',
    'Mahabharata',
    'Krishna Leela',
    'Shiva Purana',
    'Devi Mahatmya',
  ];

  // Sound wave animation for chanting mock visualizer
  useEffect(() => {
    if (isChantingSoundOn) {
      chantAnimVal.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 400 }),
          withTiming(0.8, { duration: 400 }),
        ),
        -1,
        true,
      );
    } else {
      chantAnimVal.value = withTiming(1, { duration: 300 });
    }
  }, [isChantingSoundOn]);

  const animatedChantStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: chantAnimVal.value }],
    };
  });

  // Load saved bookmarks and reading progress from MMKV on mount
  useEffect(() => {
    try {
      const savedBookmarksStr = Storage.getString('STORY_BOOKMARKS', '[]');
      const savedBookmarks = JSON.parse(savedBookmarksStr);
      if (Array.isArray(savedBookmarks)) {
        setBookmarks(savedBookmarks);
      }

      const savedProgressStr = Storage.getString('STORY_PROGRESS', '{}');
      const savedProgress = JSON.parse(savedProgressStr);
      if (savedProgress && typeof savedProgress === 'object') {
        setProgressMap(savedProgress);
      }
    } catch (error) {
      console.log('[Storage] Error loading books storage:', error);
    }
  }, []);

  // Filter stories based on query and selected category
  const filteredStories = mythologyStories.filter(story => {
    const q = searchQuery.toLowerCase().trim();
    if (!q)
      return (
        selectedCategory === 'All' ||
        story.categoryEn.toLowerCase() === selectedCategory.toLowerCase()
      );

    // Combine all fields in both English and Hindi for universal search
    const searchTarget = [
      story.titleEn,
      story.titleHi,
      story.subtitleEn,
      story.subtitleHi,
      story.descriptionEn,
      story.descriptionHi,
      story.categoryEn,
      story.categoryHi,
      story.contentEn,
      story.contentHi,
      story.sourceEn,
      story.sourceHi,
      story.keywords || '',
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = searchTarget.includes(q);

    const matchesCategory =
      selectedCategory === 'All' ||
      story.categoryEn.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Highlight first story as featured
  const featuredStory = mythologyStories[0];

  // Helper: toggle bookmarks
  const toggleBookmark = (storyId: string) => {
    triggerHaptic('impactMedium');
    let nextBookmarks = [...bookmarks];
    if (bookmarks.includes(storyId)) {
      nextBookmarks = nextBookmarks.filter(id => id !== storyId);
    } else {
      nextBookmarks.push(storyId);
    }
    setBookmarks(nextBookmarks);
    Storage.set('STORY_BOOKMARKS', JSON.stringify(nextBookmarks));
  };

  // Helper: Open Reader
  const openStoryReader = (story: Story) => {
    triggerHaptic('impactHeavy');
    setActiveStory(story);
    setIsChantingSoundOn(false); // Reset chanting sound when opening
    setReadingProgress(progressMap[story.id] || 0);
    setIsReaderOpen(true);

    // After modal renders, if progress exists, restore scroll position
    setTimeout(() => {
      if (progressMap[story.id] && readerScrollRef.current) {
        // approximate restoration - simple trigger to scroll to position
        // We will do dynamic scroll capture, let's keep progress saved
      }
    }, 500);
  };

  // Helper: Update reading progress during scroll
  const handleReaderScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (!activeStory) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const totalHeight = contentSize.height - layoutMeasurement.height;
    if (totalHeight <= 0) return;

    const rawProgress = Math.min(
      Math.max((contentOffset.y / totalHeight) * 100, 0),
      100,
    );
    const progress = Math.round(rawProgress);
    setReadingProgress(progress);

    // Save progress to MMKV
    const nextProgressMap = {
      ...progressMap,
      [activeStory.id]: progress,
    };
    setProgressMap(nextProgressMap);
    Storage.set('STORY_PROGRESS', JSON.stringify(nextProgressMap));
  };

  // Get active reading themes styles
  const getThemeStyles = () => {
    switch (readerTheme) {
      case 'midnight':
        return {
          background: colors.midnightDark,
          text: colors.midnightText,
          cardBg: colors.midnightCard,
          border: colors.borderMidnightSubtle,
          shlokaBg: colors.shlokaBgMidnight,
          shlokaText: colors.ring,
          quoteSymbol: colors.shlokaQuoteMidnight,
        };
      case 'classic':
        return {
          background: colors.white,
          text: colors.black,
          cardBg: colors.classicCard,
          border: colors.borderClassicSubtle,
          shlokaBg: colors.shlokaBgClassic,
          shlokaText: colors.shlokaTextClassic,
          quoteSymbol: colors.shlokaQuoteClassic,
        };
      case 'parchment':
      default:
        return {
          background: colors.parchmentLight,
          text: colors.parchmentDark,
          cardBg: colors.parchmentMedium,
          border: colors.borderStrong,
          shlokaBg: colors.shlokaBgParchment,
          shlokaText: colors.rust,
          quoteSymbol: colors.shlokaQuoteParchment,
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Share Wisdom quote generator handler
  const handleShareWisdom = async () => {
    if (!activeStory) return;
    triggerHaptic('notificationSuccess');
    const title =
      currentLang === 'hi' ? activeStory.titleHi : activeStory.titleEn;
    const moral =
      currentLang === 'hi' ? activeStory.moralHi : activeStory.moralEn;
    const shloka = activeStory.shloka ? `\n\n"${activeStory.shloka}"` : '';

    const shareText = `✨ *${labels.wisdomCardHeader}* ✨\n\nFrom Story: "${title}"\n\n"${moral}"${shloka}\n\nRead more spiritual stories on *GuruVani* app! 📿`;

    try {
      await Share.share({
        title: labels.shareTitle,
        message: shareText,
      });
    } catch (e) {
      console.log('[Share] Error sharing story:', e);
    }
  };

  // Get active bookmarked stories array
  const bookmarkedStories = mythologyStories.filter(s =>
    bookmarks.includes(s.id),
  );
  const inProgressStories = mythologyStories.filter(
    s => progressMap[s.id] && progressMap[s.id] > 0 && progressMap[s.id] < 100,
  );

  // Library composite list (unique set of in-progress or bookmarked stories)
  const libraryStories = Array.from(
    new Set([...bookmarkedStories, ...inProgressStories]),
  );

  return (
    <GradientBackground style={styles.containerFull}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>
              {labels.screenSubtitle.toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>{labels.screenTitle}</Text>
          </View>
          <View style={styles.bellIconContainer}>
            <Text style={styles.bellIcon}>📖</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder={labels.searchPlaceholder}
              placeholderTextColor={colors.neutralDisabled}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic('selection');
                  setSearchQuery('');
                }}
              >
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Categories Tab Scroll */}
          <View style={styles.categoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categoriesList.map(cat => {
                const isSelected = selectedCategory === cat;
                let displayIcon = '🌸';
                if (cat === 'Ramayana') displayIcon = '🏹';
                if (cat === 'Mahabharata') displayIcon = '🛡️';
                if (cat === 'Krishna Leela') displayIcon = '🪈';
                if (cat === 'Shiva Purana') displayIcon = '🔱';
                if (cat === 'Ganesha') displayIcon = '🐘';
                if (cat === 'Devi Mahatmya') displayIcon = '🦁';

                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.categoryChipSelected,
                    ]}
                    onPress={() => {
                      triggerHaptic('selection');
                      setSelectedCategory(cat);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.categoryChipIcon}>{displayIcon}</Text>
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Featured Card (renders only if category is All and search is empty) */}
          {selectedCategory === 'All' &&
            searchQuery === '' &&
            featuredStory && (
              <View style={styles.featuredContainer}>
                <Text style={styles.sectionTitle}>{labels.featuredTitle}</Text>
                <TouchableOpacity
                  style={styles.featuredCard}
                  onPress={() => openStoryReader(featuredStory)}
                  activeOpacity={0.9}
                >
                  <Image
                    source={featuredStory.image}
                    style={styles.featuredImage}
                  />
                  <LinearGradient
                    colors={[
                      'transparent',
                      colors.overlayBrownStart,
                      colors.overlayBrownEnd,
                    ]}
                    style={styles.featuredGradient}
                  >
                    <View style={styles.featuredTextContent}>
                      <View style={styles.featuredTagRow}>
                        <View style={styles.featuredBadge}>
                          <Text style={styles.featuredBadgeText}>
                            {currentLang === 'hi'
                              ? featuredStory.categoryHi
                              : featuredStory.categoryEn}
                          </Text>
                        </View>
                        <Text style={styles.featuredMetaText}>
                          •{' '}
                          {labels.readingTime.replace(
                            '{{time}}',
                            String(featuredStory.readingTimeMin),
                          )}
                        </Text>
                      </View>
                      <Text style={styles.featuredStoryTitle}>
                        {currentLang === 'hi'
                          ? featuredStory.titleHi
                          : featuredStory.titleEn}
                      </Text>
                      <Text style={styles.featuredStoryDesc} numberOfLines={2}>
                        {currentLang === 'hi'
                          ? featuredStory.descriptionHi
                          : featuredStory.descriptionEn}
                      </Text>
                      <View style={styles.featuredActionBtn}>
                        <Text style={styles.featuredActionBtnText}>
                          {labels.readNow}
                        </Text>
                        <Text style={styles.featuredActionBtnIcon}>➔</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

          {/* My Library / Recent reads */}
          {libraryStories.length > 0 && searchQuery === '' && (
            <View style={styles.librarySection}>
              <Text style={styles.sectionTitle}>{labels.myLibrary}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.libraryScroll}
              >
                {libraryStories.map(story => {
                  const progress = progressMap[story.id] || 0;
                  const isFav = bookmarks.includes(story.id);
                  return (
                    <TouchableOpacity
                      key={story.id}
                      style={styles.libraryCard}
                      onPress={() => openStoryReader(story)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.libraryImageContainer}>
                        <Image
                          source={story.image}
                          style={styles.libraryImage}
                        />
                        {isFav && (
                          <View style={styles.libraryBookmarkBadge}>
                            <Text style={styles.libraryBookmarkBadgeText}>
                              ❤️
                            </Text>
                          </View>
                        )}
                        {progress > 0 && (
                          <View style={styles.libraryProgressOverlay}>
                            <Text style={styles.libraryProgressOverlayText}>
                              {labels.recentProgress.replace(
                                '{{progress}}',
                                String(progress),
                              )}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.libraryCardTitle} numberOfLines={1}>
                        {currentLang === 'hi' ? story.titleHi : story.titleEn}
                      </Text>
                      <Text style={styles.libraryCardMeta}>
                        {currentLang === 'hi'
                          ? story.categoryHi
                          : story.categoryEn}
                      </Text>
                      {progress > 0 && (
                        <View style={styles.progressBarBg}>
                          <View
                            style={[
                              styles.progressBarFill,
                              { width: `${progress}%` },
                            ]}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* All Stories List */}
          <View style={styles.allStoriesSection}>
            <Text style={styles.sectionTitle}>{labels.allStories}</Text>
            {filteredStories.length === 0 ? (
              <View style={styles.noStoriesCard}>
                <Text style={styles.noStoriesText}>
                  ✨ {labels.noStoriesFound} ✨
                </Text>
              </View>
            ) : (
              filteredStories.map(story => {
                const progress = progressMap[story.id] || 0;
                const isBookmarked = bookmarks.includes(story.id);
                return (
                  <TouchableOpacity
                    key={story.id}
                    style={styles.storyCard}
                    onPress={() => openStoryReader(story)}
                    activeOpacity={0.8}
                  >
                    <Image source={story.image} style={styles.storyCardImage} />
                    <View style={styles.storyCardContent}>
                      <View style={styles.storyCardHeader}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>
                            {currentLang === 'hi'
                              ? story.categoryHi
                              : story.categoryEn}
                          </Text>
                        </View>
                        <Text style={styles.storyCardTime}>
                          {labels.readingTime.replace(
                            '{{time}}',
                            String(story.readingTimeMin),
                          )}
                        </Text>
                      </View>
                      <Text style={styles.storyCardTitle}>
                        {currentLang === 'hi' ? story.titleHi : story.titleEn}
                      </Text>
                      <Text style={styles.storyCardDesc} numberOfLines={2}>
                        {currentLang === 'hi'
                          ? story.descriptionHi
                          : story.descriptionEn}
                      </Text>
                      <View style={styles.storyCardFooter}>
                        <Text style={styles.storyCardSource}>
                          📜{' '}
                          {currentLang === 'hi'
                            ? story.sourceHi
                            : story.sourceEn}
                        </Text>
                        {progress > 0 && (
                          <Text style={styles.storyCardProgress}>
                            {progress}% Read
                          </Text>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.bookmarkButton}
                      onPress={() => toggleBookmark(story.id)}
                    >
                      <Text style={styles.bookmarkButtonIcon}>
                        {isBookmarked ? '❤️' : '🤍'}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Full Screen Animated Story Reader Modal */}
      {activeStory && (
        <Modal
          visible={isReaderOpen}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            triggerHaptic('impactLight');
            setIsReaderOpen(false);
          }}
        >
          <View
            style={[
              styles.readerContainer,
              { backgroundColor: themeStyles.background },
            ]}
          >
            {/* Top Reading Progress Bar */}
            <View style={styles.readerProgressContainer}>
              <View
                style={[
                  styles.readerProgressBarFill,
                  {
                    width: `${readingProgress}%`,
                    backgroundColor: colors.ring,
                  },
                ]}
              />
            </View>

            {/* Reader Header */}
            <SafeAreaView
              style={[
                styles.readerHeader,
                { borderBottomColor: themeStyles.border },
              ]}
              edges={['top']}
            >
              <TouchableOpacity
                style={styles.readerCloseBtn}
                onPress={() => {
                  triggerHaptic('impactLight');
                  setIsReaderOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.readerCloseBtnIcon,
                    { color: themeStyles.text },
                  ]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
              <Text
                style={[styles.readerHeaderTitle, { color: themeStyles.text }]}
                numberOfLines={1}
              >
                {currentLang === 'hi'
                  ? activeStory.titleHi
                  : activeStory.titleEn}
              </Text>
              <View style={styles.readerHeaderActions}>
                {/* Mock chanting visualizer toggle */}
                <TouchableOpacity
                  style={[
                    styles.readerActionIconBtn,
                    isChantingSoundOn && styles.chantingBtnActive,
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setIsChantingSoundOn(!isChantingSoundOn);
                  }}
                >
                  <Animated.Text
                    style={[styles.readerActionEmoji, animatedChantStyle]}
                  >
                    {isChantingSoundOn ? '📿' : '🎵'}
                  </Animated.Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.readerActionIconBtn}
                  onPress={() => toggleBookmark(activeStory.id)}
                >
                  <Text style={styles.readerActionEmoji}>
                    {bookmarks.includes(activeStory.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            {/* Main Reading Area */}
            <ScrollView
              ref={readerScrollRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.readerScrollContent}
              scrollEventThrottle={16}
              onScroll={handleReaderScroll}
            >
              {/* Cover Image Parallax-like frame */}
              <View style={styles.readerImageWrapper}>
                <Image source={activeStory.image} style={styles.readerImage} />
                <LinearGradient
                  colors={[
                    'transparent',
                    colors.overlayDarkSubtle,
                    themeStyles.background,
                  ]}
                  style={styles.readerImageGradient}
                />
              </View>

              {/* Story Context Block */}
              <View style={styles.readerContentContainer}>
                <View style={styles.readerMetaRow}>
                  <View style={styles.readerMetaTag}>
                    <Text style={styles.readerMetaTagLabel}>
                      {labels.sourceLabel}:
                    </Text>
                    <Text
                      style={[
                        styles.readerMetaTagValue,
                        { color: colors.ring },
                      ]}
                    >
                      {currentLang === 'hi'
                        ? activeStory.sourceHi
                        : activeStory.sourceEn}
                    </Text>
                  </View>
                  <View style={styles.readerMetaTag}>
                    <Text style={styles.readerMetaTagLabel}>
                      {labels.difficultyLabel}:
                    </Text>
                    <Text
                      style={[
                        styles.readerMetaTagValue,
                        { color: themeStyles.text },
                      ]}
                    >
                      {currentLang === 'hi'
                        ? activeStory.difficultyHi
                        : activeStory.difficultyEn}
                    </Text>
                  </View>
                </View>

                {/* Main Story Title */}
                <Text
                  style={[styles.readerStoryTitle, { color: themeStyles.text }]}
                >
                  {currentLang === 'hi'
                    ? activeStory.titleHi
                    : activeStory.titleEn}
                </Text>
                <Text style={styles.readerStorySubtitle}>
                  {currentLang === 'hi'
                    ? activeStory.subtitleHi
                    : activeStory.subtitleEn}
                </Text>

                <View style={styles.readerDivider}>
                  <Text
                    style={[styles.readerDividerSymbol, { color: colors.ring }]}
                  >
                    ✨ ॐ ✨
                  </Text>
                </View>

                {/* Shloka/Verse Highlight block if available */}
                {activeStory.shloka && (
                  <View
                    style={[
                      styles.shlokaBox,
                      { backgroundColor: themeStyles.shlokaBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.shlokaTextQuote,
                        { color: themeStyles.quoteSymbol },
                      ]}
                    >
                      “
                    </Text>
                    <Text
                      style={[
                        styles.shlokaTextContent,
                        { color: themeStyles.shlokaText },
                      ]}
                    >
                      {activeStory.shloka}
                    </Text>
                    {activeStory.shlokaTranslationEn && (
                      <Text
                        style={[
                          styles.shlokaTranslation,
                          { color: themeStyles.text },
                        ]}
                      >
                        {currentLang === 'hi'
                          ? activeStory.shlokaTranslationHi
                          : activeStory.shlokaTranslationEn}
                      </Text>
                    )}
                  </View>
                )}

                {/* Story Body Paragraphs */}
                <View style={styles.readerContentBody}>
                  {/* Drop-cap styled first letter if in English */}
                  {currentLang === 'en' ? (
                    <Text
                      style={[
                        styles.readerBodyText,
                        {
                          color: themeStyles.text,
                          fontSize: fs(readerFontSize),
                        },
                      ]}
                    >
                      <Text style={[styles.dropCap, { color: colors.ring }]}>
                        {activeStory.contentEn.charAt(0)}
                      </Text>
                      {activeStory.contentEn.slice(1)}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.readerBodyText,
                        {
                          color: themeStyles.text,
                          fontSize: fs(readerFontSize),
                        },
                      ]}
                    >
                      {activeStory.contentHi}
                    </Text>
                  )}
                </View>

                {/* Moral/Wisdom Lesson Card */}
                <View
                  style={[
                    styles.moralCard,
                    {
                      backgroundColor: themeStyles.cardBg,
                      borderColor: themeStyles.border,
                    },
                  ]}
                >
                  <View style={styles.moralHeader}>
                    <Text style={styles.moralHeaderIcon}>🕊️</Text>
                    <Text style={styles.moralHeaderTitle}>
                      {labels.moralLabel}
                    </Text>
                  </View>
                  <Text style={[styles.moralText, { color: themeStyles.text }]}>
                    {currentLang === 'hi'
                      ? activeStory.moralHi
                      : activeStory.moralEn}
                  </Text>
                  <TouchableOpacity
                    style={styles.shareWisdomBtn}
                    onPress={() => setShowWisdomShare(true)}
                  >
                    <Text style={styles.shareWisdomBtnText}>
                      🌟 {labels.shareWisdom}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Customization Floating Bar */}
            <View
              style={[
                styles.customizationBar,
                {
                  backgroundColor: themeStyles.background,
                  borderTopColor: themeStyles.border,
                },
              ]}
            >
              {/* Font scaling controls */}
              <View style={styles.fontSizeControls}>
                <Text
                  style={[styles.fontSizeLabel, { color: themeStyles.text }]}
                >
                  A
                </Text>
                <TouchableOpacity
                  style={[
                    styles.fontSizeBtn,
                    { borderColor: themeStyles.border },
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setReaderFontSize(Math.max(14, readerFontSize - 1));
                  }}
                >
                  <Text
                    style={[
                      styles.fontSizeBtnText,
                      { color: themeStyles.text },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[styles.fontSizeValue, { color: themeStyles.text }]}
                >
                  {readerFontSize}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.fontSizeBtn,
                    { borderColor: themeStyles.border },
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setReaderFontSize(Math.min(24, readerFontSize + 1));
                  }}
                >
                  <Text
                    style={[
                      styles.fontSizeBtnText,
                      { color: themeStyles.text },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.fontSizeLabelLarge,
                    { color: themeStyles.text },
                  ]}
                >
                  A
                </Text>
              </View>

              {/* Theme selection buttons */}
              <View style={styles.themeSelector}>
                <TouchableOpacity
                  style={[
                    styles.themeOptionBtn,
                    styles.themeOptionParchment,
                    readerTheme === 'parchment' && styles.themeOptionSelected,
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setReaderTheme('parchment');
                  }}
                >
                  <Text style={styles.themeOptionTextHi}>📜</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOptionBtn,
                    styles.themeOptionMidnight,
                    readerTheme === 'midnight' && styles.themeOptionSelected,
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setReaderTheme('midnight');
                  }}
                >
                  <Text style={styles.themeOptionTextHi}>🌑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOptionBtn,
                    styles.themeOptionClassic,
                    readerTheme === 'classic' && styles.themeOptionSelected,
                  ]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setReaderTheme('classic');
                  }}
                >
                  <Text style={styles.themeOptionTextHi}>☀️</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chanting Mock Indicator */}
            {isChantingSoundOn && (
              <View style={styles.chantingBar}>
                <Text style={styles.chantingBarText}>
                  {currentLang === 'hi'
                    ? '🌸 ओम नमो भगवते वासुदेवाय - दिव्य राग सक्रिय'
                    : '🌸 Om Namo Bhagavate Vasudevaya Chanting active'}
                </Text>
              </View>
            )}

            {/* Wisdom Share Overlay Modal */}
            <Modal
              visible={showWisdomShare}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowWisdomShare(false)}
            >
              <View style={styles.wisdomModalOverlay}>
                <View style={styles.wisdomModalCard}>
                  <Text style={styles.wisdomModalEmoji}>✨</Text>
                  <Text style={styles.wisdomModalHeader}>
                    {labels.wisdomCardHeader}
                  </Text>
                  <View style={styles.wisdomModalContentFrame}>
                    <Text style={styles.wisdomModalStoryTitle}>
                      {currentLang === 'hi'
                        ? activeStory.titleHi
                        : activeStory.titleEn}
                    </Text>
                    <View style={styles.wisdomModalDivider} />
                    <Text style={styles.wisdomModalBody}>
                      "
                      {currentLang === 'hi'
                        ? activeStory.moralHi
                        : activeStory.moralEn}
                      "
                    </Text>
                    {activeStory.shloka && (
                      <Text style={styles.wisdomModalShloka}>
                        {activeStory.shloka}
                      </Text>
                    )}
                  </View>
                  <View style={styles.wisdomModalActions}>
                    <TouchableOpacity
                      style={styles.wisdomModalCloseBtn}
                      onPress={() => setShowWisdomShare(false)}
                    >
                      <Text style={styles.wisdomModalCloseBtnText}>
                        {labels.wisdomClose}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.wisdomModalShareBtn}
                      onPress={handleShareWisdom}
                    >
                      <Text style={styles.wisdomModalShareBtnText}>
                        🔗 {labels.shareWisdom}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </Modal>
      )}
    </GradientBackground>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(6),
  },
  headerSubtitle: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: fs(24),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginTop: scale(2),
  },
  bellIconContainer: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.accentBorderMedium,
    backgroundColor: colors.overlayLight,
  },
  bellIcon: {
    fontSize: fs(18),
  },
  searchContainer: {
    paddingHorizontal: scale(20),
    marginVertical: scale(10),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    height: scale(44),
    borderWidth: 1,
    borderColor: colors.borderMedium,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: fs(15),
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(13),
    color: colors.secondary,
    padding: 0,
  },
  clearIcon: {
    fontSize: fs(14),
    color: colors.mutedForeground,
    paddingHorizontal: scale(4),
  },
  scrollContent: {
    paddingBottom: scale(110), // ensures content is scrollable past bottom tabs
  },
  categoriesContainer: {
    marginVertical: scale(6),
  },
  categoriesScroll: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(6),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLightBgMedium,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: colors.accentBorderVerySubtle,
  },
  categoryChipSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  categoryChipIcon: {
    fontSize: fs(12),
    marginRight: scale(6),
  },
  categoryChipText: {
    fontSize: fs(12.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  categoryChipTextSelected: {
    color: colors.white,
  },
  sectionTitle: {
    fontSize: fs(14.5),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginHorizontal: scale(20),
    marginBottom: scale(12),
    marginTop: scale(18),
    letterSpacing: 0.5,
  },
  featuredContainer: {
    width: '100%',
  },
  featuredCard: {
    height: scale(230),
    marginHorizontal: scale(20),
    borderRadius: scale(20),
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(18),
  },
  featuredTextContent: {
    width: '100%',
  },
  featuredTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  featuredBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(6),
    marginRight: scale(8),
  },
  featuredBadgeText: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(10),
  },
  featuredMetaText: {
    color: colors.overlayMedium,
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(11),
  },
  featuredStoryTitle: {
    color: colors.white,
    fontSize: fs(22),
    fontFamily: fonts.Marcellus,
    marginBottom: scale(4),
  },
  featuredStoryDesc: {
    color: colors.borderWhiteSubtle,
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(12),
    lineHeight: fs(16),
    marginBottom: scale(12),
  },
  featuredActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(20),
  },
  featuredActionBtnText: {
    color: colors.secondary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(11),
    marginRight: scale(4),
  },
  featuredActionBtnIcon: {
    fontSize: fs(10),
    color: colors.secondary,
  },
  librarySection: {
    width: '100%',
  },
  libraryScroll: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  libraryCard: {
    width: scale(120),
    marginRight: scale(14),
  },
  libraryImageContainer: {
    width: '100%',
    height: scale(145),
    borderRadius: scale(14),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    backgroundColor: colors.white,
    position: 'relative',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: scale(6),
  },
  libraryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  libraryBookmarkBadge: {
    position: 'absolute',
    top: scale(6),
    right: scale(6),
    backgroundColor: colors.overlayStrong,
    borderRadius: scale(20),
    width: scale(22),
    height: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryBookmarkBadgeText: {
    fontSize: fs(11),
  },
  libraryProgressOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayDarkMedium,
    paddingVertical: scale(2),
    alignItems: 'center',
  },
  libraryProgressOverlayText: {
    color: colors.white,
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
  },
  libraryCardTitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginTop: scale(2),
  },
  libraryCardMeta: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
  progressBarBg: {
    height: scale(3.5),
    backgroundColor: colors.borderLight,
    borderRadius: scale(4),
    marginTop: scale(4),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.ring,
    borderRadius: scale(4),
  },
  allStoriesSection: {
    width: '100%',
  },
  noStoriesCard: {
    marginHorizontal: scale(20),
    backgroundColor: colors.overlaySemiTransparent,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    borderRadius: scale(14),
    padding: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStoriesText: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
    fontSize: fs(13),
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: scale(20),
    marginBottom: scale(14),
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  storyCardImage: {
    width: scale(95),
    height: '100%',
    minHeight: scale(115),
    resizeMode: 'cover',
  },
  storyCardContent: {
    flex: 1,
    padding: scale(12),
    paddingRight: scale(36), // spacing for bookmark toggle
  },
  storyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  categoryBadge: {
    backgroundColor: colors.accentLightBgStrong,
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    marginRight: scale(6),
  },
  categoryBadgeText: {
    color: colors.rust,
    fontSize: fs(9),
    fontFamily: fonts.PoppinsSemiBold,
  },
  storyCardTime: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
  },
  storyCardTitle: {
    fontSize: fs(14),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(2),
  },
  storyCardDesc: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.charcoal,
    lineHeight: fs(15),
    marginBottom: scale(6),
  },
  storyCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyCardSource: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.warmTaupe,
  },
  storyCardProgress: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  bookmarkButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    width: scale(28),
    height: scale(28),
    borderRadius: scale(15),
    backgroundColor: colors.accentLightBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accentLightBgStrong,
  },
  bookmarkButtonIcon: {
    fontSize: fs(12),
  },

  // Reader Modal Styles
  readerContainer: {
    flex: 1,
  },
  readerProgressContainer: {
    height: scale(3.5),
    width: '100%',
    backgroundColor: colors.borderVerySubtle,
    zIndex: 99,
  },
  readerProgressBarFill: {
    height: '100%',
  },
  readerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(10),
    borderBottomWidth: 1,
    zIndex: 9,
  },
  readerCloseBtn: {
    padding: scale(6),
  },
  readerCloseBtnIcon: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsMedium,
  },
  readerHeaderTitle: {
    fontSize: fs(15),
    fontFamily: fonts.Marcellus,
    maxWidth: screenWidth * 0.55,
  },
  readerHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readerActionIconBtn: {
    padding: scale(6),
    marginLeft: scale(8),
    borderRadius: scale(10),
  },
  chantingBtnActive: {
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
  },
  readerActionEmoji: {
    fontSize: fs(16),
  },
  readerScrollContent: {
    paddingBottom: scale(100),
  },
  readerImageWrapper: {
    width: '100%',
    height: scale(210),
    position: 'relative',
    backgroundColor: '#000',
  },
  readerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
  readerImageGradient: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: scale(80),
  },
  readerContentContainer: {
    paddingHorizontal: scale(22),
    paddingTop: scale(4),
  },
  readerMetaRow: {
    flexDirection: 'row',
    marginBottom: scale(8),
    flexWrap: 'wrap',
  },
  readerMetaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
    marginBottom: scale(4),
  },
  readerMetaTagLabel: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: '#a39686',
    marginRight: scale(4),
  },
  readerMetaTagValue: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
  },
  readerStoryTitle: {
    fontSize: fs(24),
    fontFamily: fonts.Marcellus,
    lineHeight: fs(30),
    marginTop: scale(6),
  },
  readerStorySubtitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginTop: scale(2),
    lineHeight: fs(18),
  },
  readerDivider: {
    alignItems: 'center',
    marginVertical: scale(14),
  },
  readerDividerSymbol: {
    fontSize: fs(11),
    letterSpacing: 2,
  },
  shlokaBox: {
    borderRadius: scale(14),
    padding: scale(16),
    marginVertical: scale(12),
    borderLeftWidth: 3.5,
    borderLeftColor: colors.ring,
    position: 'relative',
    overflow: 'hidden',
  },
  shlokaTextQuote: {
    position: 'absolute',
    top: scale(-6),
    left: scale(6),
    fontSize: fs(45),
    fontFamily: fonts.Marcellus,
    height: scale(40),
  },
  shlokaTextContent: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center',
    lineHeight: fs(21),
    fontStyle: 'italic',
    paddingHorizontal: scale(12),
  },
  shlokaTranslation: {
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
    lineHeight: fs(17),
    marginTop: scale(10),
    opacity: 0.85,
    paddingHorizontal: scale(8),
  },
  readerContentBody: {
    marginVertical: scale(10),
  },
  paragraphContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropCap: {
    fontSize: fs(40),
    fontFamily: fonts.Marcellus,
    lineHeight: fs(42),
  },
  readerBodyText: {
    fontFamily: fonts.PoppinsRegular,
    lineHeight: fs(25),
    textAlign: 'justify',
  },
  moralCard: {
    borderRadius: scale(18),
    borderWidth: 1,
    padding: scale(18),
    marginTop: scale(28),
    marginBottom: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  moralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  moralHeaderIcon: {
    fontSize: fs(16),
    marginRight: scale(8),
  },
  moralHeaderTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 0.5,
  },
  moralText: {
    fontSize: fs(12.5),
    fontFamily: fonts.PoppinsMedium,
    lineHeight: fs(19),
    fontStyle: 'italic',
  },
  shareWisdomBtn: {
    marginTop: scale(16),
    backgroundColor: colors.ring,
    paddingVertical: scale(8),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  shareWisdomBtnText: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(11.5),
  },
  customizationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: Platform.OS === 'ios' ? scale(24) : scale(12),
    paddingTop: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    marginRight: scale(6),
  },
  fontSizeLabelLarge: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    marginLeft: scale(6),
  },
  fontSizeBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(6),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  fontSizeBtnText: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
  },
  fontSizeValue: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: scale(10),
  },
  themeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeOptionBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  themeOptionParchment: {
    backgroundColor: '#fcf6e8',
  },
  themeOptionMidnight: {
    backgroundColor: '#120a06',
  },
  themeOptionClassic: {
    backgroundColor: '#ffffff',
  },
  themeOptionSelected: {
    borderColor: colors.ring,
  },
  themeOptionTextHi: {
    fontSize: fs(12),
  },
  chantingBar: {
    position: 'absolute',
    bottom: scale(72),
    left: scale(20),
    right: scale(20),
    backgroundColor: 'rgba(251, 148, 55, 0.95)',
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
    alignItems: 'center',
    zIndex: 99,
  },
  chantingBarText: {
    color: colors.white,
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
  },

  // Wisdom Share Modal Overlay
  wisdomModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 17, 11, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  wisdomModalCard: {
    backgroundColor: '#fbf6ec',
    width: '100%',
    borderRadius: scale(24),
    borderWidth: 1.5,
    borderColor: '#e2d4bd',
    padding: scale(22),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  wisdomModalEmoji: {
    fontSize: fs(24),
    marginBottom: scale(4),
  },
  wisdomModalHeader: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 3,
    marginBottom: scale(14),
  },
  wisdomModalContentFrame: {
    borderWidth: 1,
    borderColor: '#e8dcbf',
    borderRadius: scale(16),
    padding: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    width: '100%',
  },
  wisdomModalStoryTitle: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#a39686',
    letterSpacing: 0.5,
  },
  wisdomModalDivider: {
    height: 1,
    width: scale(40),
    backgroundColor: colors.ring,
    marginVertical: scale(8),
  },
  wisdomModalBody: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: '#3c2c20',
    textAlign: 'center',
    lineHeight: fs(21),
    fontStyle: 'italic',
  },
  wisdomModalShloka: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    textAlign: 'center',
    lineHeight: fs(18),
    marginTop: scale(10),
  },
  wisdomModalActions: {
    flexDirection: 'row',
    marginTop: scale(20),
    justifyContent: 'space-between',
    width: '100%',
  },
  wisdomModalCloseBtn: {
    flex: 1,
    paddingVertical: scale(10),
    marginRight: scale(10),
    borderRadius: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b7a897',
  },
  wisdomModalCloseBtnText: {
    fontFamily: fonts.PoppinsSemiBold,
    color: '#3c2c20',
    fontSize: fs(12),
  },
  wisdomModalShareBtn: {
    flex: 2,
    backgroundColor: colors.ring,
    paddingVertical: scale(10),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  wisdomModalShareBtnText: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
    fontSize: fs(12),
  },
});
