import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Story } from '@api/types';
import {
  ComicBookItem,
  fetchComicBooksFromFirestore,
} from '@api/comicBooksApi';
import {
  fetchTextBooksFromFirestore,
  filterKrishnaStories,
  filterHanumanStories,
  getLoadedBooks,
} from '@api/textBooksApi';
import { GradientBackground, ScreenHeader } from '@components';
import AnimatedButton from '@components/AnimatedButton';
import Loader from '@components/Loader';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import {
  useRewardedAd,
  AD_UNITS,
  isBookUnlockedToday,
  markBookUnlockedToday,
  UnlockAdModal,
} from '@admob';
import { triggerHaptic } from '@helper/helper';
import { RootNavigationProp } from '@navigation/types';

export const BookListScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<RootNavigationProp>();
  const { t, select, currentLanguage: currentLang } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  const title = route.params?.title || t(Translation.BOOK_ALL_STORIES);
  const shelfType = route.params?.shelfType || 'all';
  const initialBooks: (Story | ComicBookItem)[] =
    route.params?.initialBooks || [];

  const [books, setBooks] =
    useState<(Story | ComicBookItem)[]>(initialBooks);
  const [loading, setLoading] = useState<boolean>(initialBooks.length === 0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [pendingStory, setPendingStory] = useState<
    Story | ComicBookItem | null
  >(null);
  const [openingStory, setOpeningStory] = useState<
    Story | ComicBookItem | null
  >(null);

  const {
    isLoaded: isRewardedLoaded,
    loadAd: loadRewardedAd,
    show: showRewardedAd,
  } = useRewardedAd(AD_UNITS.REWARDED_BOOK);

  const cardWidth = useMemo(() => {
    // 2 columns with paddingHorizontal 16 and gap 14
    return (windowWidth - scale(32) - scale(14)) / 2;
  }, [windowWidth]);

  const loadBooksData = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else if (books.length === 0) {
        setLoading(true);
      }

      try {
        if (shelfType === 'comic') {
          const fetchedComics = await fetchComicBooksFromFirestore(isRefresh);
          setBooks(fetchedComics);
        } else if (shelfType === 'krishna') {
          const res = await fetchTextBooksFromFirestore({ limitCount: 100 });
          const allText =
            res.items.length > 0 ? res.items : getLoadedBooks();
          setBooks(filterKrishnaStories(allText));
        } else if (shelfType === 'hanuman') {
          const res = await fetchTextBooksFromFirestore({ limitCount: 100 });
          const allText =
            res.items.length > 0 ? res.items : getLoadedBooks();
          setBooks(filterHanumanStories(allText));
        } else if (shelfType === 'text') {
          const res = await fetchTextBooksFromFirestore({ limitCount: 100 });
          setBooks(res.items.length > 0 ? res.items : getLoadedBooks());
        } else {
          // 'all'
          const res = await fetchTextBooksFromFirestore({ limitCount: 100 });
          const comics = await fetchComicBooksFromFirestore(isRefresh);
          const all = [...(res.items || []), ...(comics || [])];
          setBooks(all);
        }
      } catch (error) {
        console.warn('[BookListScreen] Error loading books:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [shelfType, books.length],
  );

  useEffect(() => {
    if (initialBooks.length === 0) {
      loadBooksData();
    }
  }, [initialBooks.length, loadBooksData]);

  // Reset opening book loading state and reload ad when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setOpeningStory(null);
      loadRewardedAd();
    }, [loadRewardedAd]),
  );

  const handleOpenBook = (story: Story | ComicBookItem) => {
    if (isBookUnlockedToday(story.id)) {
      triggerHaptic();
      setOpeningStory(story);
      setTimeout(() => {
        setOpeningStory(null);
        if (story.type === 'text') {
          navigation.navigate('TextReadingScreen', {
            storyId: story.id,
            story: story as Story,
          });
        } else {
          navigation.navigate('ReadingScreen', {
            storyId: story.id,
            story,
          });
        }
      }, 550);
      return;
    }
    // Ad consent flow
    loadRewardedAd();
    setPendingStory(story);
  };

  const handleCancelUnlock = () => setPendingStory(null);

  const handleWatchAd = () => {
    if (!pendingStory) return;

    const storyToUnlock = pendingStory;
    setPendingStory(null);

    const proceedToUnlock = () => {
      markBookUnlockedToday(storyToUnlock.id);
      triggerHaptic();
      setOpeningStory(storyToUnlock);
      setTimeout(() => {
        setOpeningStory(null);
        if (storyToUnlock.type === 'text') {
          navigation.navigate('TextReadingScreen', {
            storyId: storyToUnlock.id,
            story: storyToUnlock as Story,
          });
        } else {
          navigation.navigate('ReadingScreen', {
            storyId: storyToUnlock.id,
            story: storyToUnlock,
          });
        }
      }, 550);
    };

    if (isRewardedLoaded) {
      setTimeout(() => {
        showRewardedAd(() => {
          proceedToUnlock();
        });
      }, 100);
    } else {
      proceedToUnlock();
    }
  };

  const renderGridItem = ({ item }: { item: Story | ComicBookItem }) => {
    const isLoadingThis = openingStory?.id === item.id;
    const rawStoryImage =
      (item as any).CoverPage || (item as any).coverPage || item.image;
    const imageSource =
      typeof rawStoryImage === 'string' && rawStoryImage.trim().length > 0
        ? rawStoryImage.trim().startsWith('http://') ||
          rawStoryImage.trim().startsWith('https://')
          ? { uri: rawStoryImage.trim() }
          : (imagePath as any)[rawStoryImage.trim()] ||
            imagePath.fallBackImage
        : typeof rawStoryImage === 'number' ||
          (rawStoryImage &&
            typeof rawStoryImage === 'object' &&
            rawStoryImage.uri)
        ? rawStoryImage
        : imagePath.fallBackImage;

    return (
      <AnimatedButton
        style={[styles.gridCard, { width: cardWidth }]}
        onPress={() => handleOpenBook(item)}
      >
        <View style={styles.gridImageContainer}>
          <Animated.Image
            source={imageSource}
            style={styles.gridImage}
            sharedTransitionTag={`story_image_grid_${item.id}`}
          />
          <Loader visible={isLoadingThis} />
        </View>

        <Text style={styles.gridCardTitle} numberOfLines={2}>
          {select(item.titleHi, item.titleEn)}
        </Text>

        <Text style={styles.gridCardMeta} numberOfLines={1}>
          {select(item.sourceHi, item.sourceEn) ||
            select(item.categoryHi, item.categoryEn)}
        </Text>
      </AnimatedButton>
    );
  };

  const renderSkeletonGrid = () => (
    <View style={styles.skeletonGrid}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <View
          key={`skel_grid_${i}`}
          style={[styles.gridCard, { width: cardWidth }]}
        >
          <Skeleton
            width="100%"
            height={scale(210)}
            borderRadius={scale(14)}
            baseColor={colors.skeletonBase}
            highlightColor={colors.skeletonHighlight}
            style={styles.skeletonCard}
          />
          <Skeleton
            width="85%"
            height={fs(13)}
            borderRadius={scale(3)}
            baseColor={colors.skeletonBase}
            highlightColor={colors.skeletonHighlight}
            style={styles.mt6}
          />
          <Skeleton
            width="55%"
            height={fs(10)}
            borderRadius={scale(3)}
            baseColor={colors.skeletonAccentBase}
            highlightColor={colors.skeletonHighlight}
            style={styles.mt4}
          />
        </View>
      ))}
    </View>
  );

  return (
    <GradientBackground style={styles.containerFull}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Navigation Screen Header */}
        <ScreenHeader
          title={title}
          onBack={() => navigation.goBack()}
          backIconStroke={colors.white}
          numberOfLines={1}
        />

        {/* Main Grid View / Skeleton */}
        {loading ? (
          renderSkeletonGrid()
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + scale(24) },
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={renderGridItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadBooksData(true)}
                tintColor={colors.ring}
                colors={[colors.ring]}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  {t(Translation.BOOK_NO_STORIES_FOUND)}
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>

      <UnlockAdModal
        visible={!!pendingStory}
        bookTitle={
          pendingStory ? select(pendingStory.titleHi, pendingStory.titleEn) : ''
        }
        isAdLoading={!isRewardedLoaded}
        onCancel={handleCancelUnlock}
        onWatchAd={handleWatchAd}
      />
    </GradientBackground>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  gridCard: {
    marginBottom: scale(4),
  },
  gridImageContainer: {
    width: '100%',
    height: scale(210),
    borderRadius: scale(14),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.white,
    position: 'relative',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: scale(6),
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridCardTitle: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(17),
    marginBottom: scale(2),
  },
  gridCardMeta: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  skeletonCard: {
    borderWidth: 1,
    borderColor: colors.skeletonBase,
  },
  mt6: {
    marginTop: scale(6),
  },
  mt4: {
    marginTop: scale(4),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(20),
  },
  emptyStateText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(14),
    color: colors.neutralDisabled,
    textAlign: 'center',
  },
});
