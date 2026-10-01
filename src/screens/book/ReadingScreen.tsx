import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import { triggerHaptic } from '@helper/helper';
import {
  fetchComicBooksFromFirestore,
  ComicBookItem,
} from '@api/comicBooksApi';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import colors from '@theme/colors';
import ReadingHeader from './components/ReadingHeader';
import ReadingFooter from './components/ReadingFooter';
import ZoomableComicPage from './components/ZoomableImage';
import { GradientBackground } from '@components';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { scale } from '@theme/sizes';

const ReadingScreen = () => {
  const route = useRoute<any>();
  const { currentLanguage: currentLang } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  const [isZoomed, setIsZoomed] = useState(false);

  const { storyId, story: passedStory } = route.params || {};
  const [story, setStory] = useState<ComicBookItem | null>(passedStory || null);

  useEffect(() => {
    if (!story && storyId) {
      fetchComicBooksFromFirestore().then(books => {
        const found = books.find(s => s.id === storyId) || books[0];
        if (found) setStory(found);
      });
    }
  }, [storyId, story]);

  const rawPages: any[] = useMemo(() => {
    if (!story) return [];
    return [
      story.image,
      ...(Array.isArray(story.imagePages) ? story.imagePages : []),
    ].filter(p => p !== undefined && p !== null && p !== '');
  }, [story]);

  const pages: any[] = useMemo(() => {
    if (rawPages.length === 0) return [imagePath.fallBackImage];
    return rawPages.map(p =>
      typeof p === 'string' && p.trim().length > 0 ? { uri: p.trim() } : p,
    );
  }, [rawPages]);

  const totalComicPages =
    story?.imagePages?.length || Math.max(pages.length - 1, 1);

  // Resume previous reading progress if available
  const initialPageIndex = useMemo(() => {
    if (!storyId) return 0;
    try {
      const raw = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
      const progressMap = JSON.parse(raw) || {};
      const saved = Number(progressMap[storyId]);
      if (saved && saved > 0 && saved < (rawPages.length || 100)) {
        return saved;
      }
    } catch {}
    return 0;
  }, [storyId, rawPages.length]);

  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [containerWidth, setContainerWidth] = useState(windowWidth);
  const flatListRef = useRef<FlatList>(null);
  const hasAppliedInitialScroll = useRef(false);

  // Auto-scroll to saved reading position on first mount once dimensions are ready
  useEffect(() => {
    if (
      !hasAppliedInitialScroll.current &&
      initialPageIndex > 0 &&
      pages.length > initialPageIndex
    ) {
      hasAppliedInitialScroll.current = true;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialPageIndex,
          animated: false,
        });
      }, 100);
    }
  }, [initialPageIndex, pages.length]);

  // Smart lookahead prefetching for the next 2 upcoming pages
  useEffect(() => {
    if (pages && pages.length > 0) {
      const nextPages = [
        pages[currentPageIndex + 1],
        pages[currentPageIndex + 2],
      ];

      nextPages.forEach(p => {
        const uri = typeof p === 'string' ? p : p?.uri;
        if (uri && typeof uri === 'string' && uri.startsWith('http')) {
          Image.prefetch(uri).catch(() => {});
        }
      });
    }
  }, [currentPageIndex, pages]);

  const handlePageChange = useCallback(
    (index: number) => {
      if (index === currentPageIndex || index < 0 || index >= pages.length) {
        return;
      }
      setCurrentPageIndex(index);
      triggerHaptic();

      // Persist reading progress
      if (storyId) {
        try {
          const raw = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
          const map = JSON.parse(raw) || {};
          map[storyId] = index;
          Storage.set(STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(map));
        } catch {}
      }
    },
    [currentPageIndex, pages.length, storyId],
  );

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const slideWidth = containerWidth > 0 ? containerWidth : windowWidth;
    const newIndex = Math.round(offsetX / slideWidth);
    if (newIndex !== currentPageIndex) {
      handlePageChange(newIndex);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      const prevIndex = currentPageIndex - 1;
      flatListRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
      handlePageChange(prevIndex);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      const nextIndex = currentPageIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      handlePageChange(nextIndex);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top', 'bottom']}>
        <ReadingHeader story={story} />

        <View
          style={styles.contentArea}
          onLayout={e => {
            const w = e.nativeEvent.layout.width;
            if (w > 0 && Math.abs(w - containerWidth) > 1) {
              setContainerWidth(w);
            }
          }}
        >
          {pages.length === 0 ? (
            <View style={styles.centerLoader}>
              <LottieView
                source={imagePath.loading}
                autoPlay
                loop
                style={styles.screenLottie}
              />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={pages}
              horizontal
              pagingEnabled
              scrollEnabled={!isZoomed}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              initialNumToRender={2}
              maxToRenderPerBatch={2}
              windowSize={5}
              keyExtractor={(_, index) => `comic_page_${index}`}
              getItemLayout={(_, index) => ({
                length: containerWidth > 0 ? containerWidth : windowWidth,
                offset:
                  (containerWidth > 0 ? containerWidth : windowWidth) * index,
                index,
              })}
              onScrollToIndexFailed={info => {
                setTimeout(() => {
                  flatListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: false,
                  });
                }, 100);
              }}
              onMomentumScrollEnd={handleScrollEnd}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.slideContainer,
                    {
                      width: containerWidth > 0 ? containerWidth : windowWidth,
                    },
                  ]}
                >
                  <ZoomableComicPage
                    source={item}
                    width={containerWidth > 0 ? containerWidth : windowWidth}
                    height="100%"
                    isZoomed={isZoomed}
                    onZoomStateChange={setIsZoomed}
                  />
                </View>
              )}
            />
          )}
        </View>

        <ReadingFooter
          currentPage={currentPageIndex}
          totalPages={totalComicPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          currentLang={currentLang}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ReadingScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentArea: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  slideContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comicPageImage: {
    width: '100%',
    height: '100%',
  },
  centerLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenLottie: {
    width: scale(80),
    height: scale(80),
  },
});
