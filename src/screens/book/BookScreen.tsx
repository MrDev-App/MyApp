import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Vibration,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import HapticFeedback from 'react-native-haptic-feedback';

import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale, screenWidth } from '../../utile/sizes';
import { MahaBharatStories, Story } from '../../constants/storiesData';
import GradientBackground from '../../components/GradientBackground';

import { Translation } from '../../i18n/language';
import ComicShelf from './Components/ComicShelf';
import BookSkeleton from './Components/BookSkeleton';
import { SearchIcon } from '../../utile/customSVG';

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
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const labels = {
    screenTitle: t(Translation.BOOK_SCREEN_TITLE),
    screenSubtitle: t(Translation.BOOK_SCREEN_SUBTITLE),
    searchPlaceholder: t(Translation.BOOK_SEARCH_PLACEHOLDER),
    featuredTitle: t(Translation.BOOK_FEATURED_TITLE),
    readNow: t(Translation.BOOK_READ_NOW),
    myLibrary: t(Translation.BOOK_MY_LIBRARY),
    recentProgress: t(Translation.BOOK_RECENT_PROGRESS),
    allStories: t(Translation.BOOK_ALL_STORIES),
    noStoriesFound: t(Translation.BOOK_NO_STORIES_FOUND),
    moralLabel: t(Translation.BOOK_MORAL_LABEL),
    sourceLabel: t(Translation.BOOK_SOURCE_LABEL),
    difficultyLabel: t(Translation.BOOK_DIFFICULTY_LABEL),
    readingTime: t(Translation.BOOK_READING_TIME),
    bookmarkRemoved: t(Translation.BOOK_BOOKMARK_REMOVED),
    bookmarkAdded: t(Translation.BOOK_BOOKMARK_ADDED),
    parchmentTheme: t(Translation.BOOK_PARCHMENT_THEME),
    midnightTheme: t(Translation.BOOK_MIDNIGHT_THEME),
    classicTheme: t(Translation.BOOK_CLASSIC_THEME),
    fontSizeLabel: t(Translation.BOOK_FONT_SIZE_LABEL),
    shareWisdom: t(Translation.BOOK_SHARE_WISDOM),
    closeReader: t(Translation.BOOK_CLOSE_READER),
    copiedToClipboard: t(Translation.BOOK_COPIED_TO_CLIPBOARD),
    shareTitle: t(Translation.BOOK_SHARE_TITLE),
    wisdomCardHeader: t(Translation.BOOK_WISDOM_CARD_HEADER),
    wisdomClose: t(Translation.BOOK_WISDOM_CLOSE),
    illustratedComics: t(Translation.BOOK_ILLUSTRATED_COMICS),
    popularStories: t(Translation.BOOK_POPULAR_STORIES),
    storiesFromMahabharat: t(Translation.BOOK_STORIES_FROM_MAHABHARAT),
    storiesFromRamayan: t(Translation.BOOK_STORIES_FROM_RAMAYAN),
  };

  // Helper: Open Reader
  const openStoryReader = (story: Story) => {
    triggerHaptic('impactHeavy');
    navigation.navigate('ReadingScreen', { storyId: story.id });
  };

  return (
    <GradientBackground style={styles.containerFull}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>
              {labels.screenSubtitle.toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>{labels.screenTitle}</Text>
          </View>
        </View>

        {/* Search Bar Button Trigger */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => {
            triggerHaptic('impactLight');
            navigation.navigate('SearchScreen');
          }}
          activeOpacity={0.9}
        >
          <View style={styles.searchBar}>
            <SearchIcon size={scale(18)} color={colors.ring} />
            <Text
              style={[
                styles.searchInput,
                {
                  color: colors.neutralDisabled,
                },
              ]}
            >
              {labels.searchPlaceholder}
            </Text>
          </View>
        </TouchableOpacity>

        {loading ? (
          <BookSkeleton />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Comics Shelf List */}
            <ComicShelf
              title={labels.storiesFromMahabharat}
              data={MahaBharatStories}
              onPressBook={openStoryReader}
              currentLang={currentLang}
            />
            <ComicShelf
              title={labels.storiesFromMahabharat}
              data={MahaBharatStories}
              onPressBook={openStoryReader}
              currentLang={currentLang}
            />
            <ComicShelf
              title={labels.storiesFromMahabharat}
              data={MahaBharatStories}
              onPressBook={openStoryReader}
              currentLang={currentLang}
            />
            <ComicShelf
              title={labels.storiesFromMahabharat}
              data={MahaBharatStories}
              onPressBook={openStoryReader}
              currentLang={currentLang}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  comicsSection: {
    width: '100%',
    marginTop: scale(15),
  },
  comicsScroll: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  comicCard: {
    width: scale(130),
    marginRight: scale(16),
  },
  comicImageContainer: {
    width: '100%',
    height: scale(180),
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
  comicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  comicBookmarkBadge: {
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
  comicBookmarkBadgeText: {
    fontSize: fs(11),
  },
  comicProgressOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayDarkMedium,
    paddingVertical: scale(2),
    alignItems: 'center',
  },
  comicProgressOverlayText: {
    color: colors.white,
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
  },
  comicCardTitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginTop: scale(2),
  },
  comicCardMeta: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
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

  searchInput: {
    flex: 1,
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(14),
    color: colors.secondary,
    marginHorizontal: scale(10),
  },
  clearIcon: {
    fontSize: fs(14),
    color: colors.mutedForeground,
    paddingHorizontal: scale(4),
  },
  scrollContent: {
    paddingBottom: scale(110), // ensures content is scrollable past bottom tabs
  },
  categoriesContainer: {},
  categoriesScroll: {
    paddingHorizontal: scale(20),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLightBgMedium,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
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
