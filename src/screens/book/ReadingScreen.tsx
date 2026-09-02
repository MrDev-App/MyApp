import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  StatusBar,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MahaBharatStories } from '@constants/storiesData';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import ReadingHeader from './components/ReadingHeader';
import ReadingFooter from './components/ReadingFooter';

const triggerHaptic = (_type?: string) => {
  try {
    Vibration.vibrate(30);
  } catch {}
};

const ReadingScreen = () => {
  const route = useRoute<any>();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';
  const { width: windowWidth } = useWindowDimensions();

  // Dark / Light Mode state with MMKV persistence (default dark for immersive comic reading)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = Storage.getString(STORAGE_KEYS.READER_THEME);
    return saved !== 'light';
  });

  const toggleTheme = () => {
    triggerHaptic('impactLight');
    setIsDarkMode(prev => {
      const next = !prev;
      Storage.set(STORAGE_KEYS.READER_THEME, next ? 'dark' : 'light');
      return next;
    });
  };

  const { storyId } = route.params || {};
  const story =
    MahaBharatStories.find(s => s.id === storyId) || MahaBharatStories[0];

  // All pages array: [Cover image, ...comic pages]
  const pages: any[] = story ? [story.image, ...(story.imagePages || [])] : [];
  const totalComicPages =
    story?.imagePages?.length || Math.max(pages.length - 1, 1);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(windowWidth);
  const flatListRef = useRef<FlatList>(null);

  // Page change handler - triggers haptic feedback without saving progress
  const handlePageChange = (index: number) => {
    if (index === currentPageIndex || index < 0 || index >= pages.length) {
      return;
    }
    setCurrentPageIndex(index);
    triggerHaptic();
  };

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

  const bgColor = isDarkMode ? '#121214' : '#FDFBF7';

  return (
    <SafeAreaView
      style={[styles.safeAreaContainer, { backgroundColor: bgColor }]}
      edges={['top', 'bottom']}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bgColor}
        animated={true}
      />

      {/* Header: Back | Book Title | Theme Toggle | Bookmark */}
      <ReadingHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* 1080x1920 Proportional Comic Page Viewer */}
      <View
        style={styles.contentArea}
        onLayout={e => {
          const w = e.nativeEvent.layout.width;
          if (w > 0 && Math.abs(w - containerWidth) > 1) {
            setContainerWidth(w);
          }
        }}
      >
        <FlatList
          ref={flatListRef}
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={true}
          keyExtractor={(_, index) => `comic_page_${index}`}
          getItemLayout={(_, index) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
          })}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <View
              style={[
                styles.slideContainer,
                { width: containerWidth > 0 ? containerWidth : windowWidth },
              ]}
            >
              <Image
                source={item}
                style={styles.comicPageImage}
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>

      {/* Footer: Back Page | Page Number Pill | Forward Page */}
      <ReadingFooter
        currentPage={currentPageIndex}
        totalPages={totalComicPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        currentLang={currentLang}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
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
});
