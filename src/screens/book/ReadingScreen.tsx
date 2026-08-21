import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  StatusBar,
  Platform,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HapticFeedback from 'react-native-haptic-feedback';

import ReadingHeader from './Components/ReadingHeader';
import ReadingFooter from './Components/ReadingFooter';
import { MahaBharatStories } from '../../constants/storiesData';
import { Storage } from '../../utile/storage';

const triggerHaptic = (type: string = 'selection') => {
  if (Platform.OS === 'android') {
    try {
      Vibration.vibrate(30);
    } catch {}
  } else {
    try {
      HapticFeedback.trigger(type as any, {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    } catch {
      Vibration.vibrate(30);
    }
  }
};

const ReadingScreen = () => {
  const route = useRoute<any>();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';
  const { width: windowWidth } = useWindowDimensions();

  // Dark / Light Mode state with MMKV persistence (default dark for immersive comic reading)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = Storage.getString('READER_THEME', 'dark');
    return saved === 'dark';
  });

  const toggleTheme = () => {
    triggerHaptic('impactLight');
    setIsDarkMode(prev => {
      const next = !prev;
      Storage.set('READER_THEME', next ? 'dark' : 'light');
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

  // Restore saved progress on mount
  useEffect(() => {
    if (!story) return;
    try {
      const rawProgress = Storage.getString('STORY_PROGRESS', '{}');
      const progressMap = JSON.parse(rawProgress);
      const savedPercent = progressMap[story.id] || 0;
      if (savedPercent > 0 && pages.length > 1) {
        const targetIndex = Math.min(
          Math.max(0, Math.round((savedPercent / 100) * (pages.length - 1))),
          pages.length - 1,
        );
        setCurrentPageIndex(targetIndex);
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: targetIndex,
            animated: false,
          });
        }, 200);
      }
    } catch {}
  }, [story, pages.length]);

  // Save progress percentage when page changes
  const handlePageChange = (index: number) => {
    if (index === currentPageIndex || index < 0 || index >= pages.length)
      return;
    setCurrentPageIndex(index);
    triggerHaptic();

    if (story && pages.length > 1) {
      try {
        const percent = Math.round((index / (pages.length - 1)) * 100);
        const rawProgress = Storage.getString('STORY_PROGRESS', '{}');
        const progressMap = JSON.parse(rawProgress) || {};
        progressMap[story.id] = percent;
        Storage.set('STORY_PROGRESS', JSON.stringify(progressMap));
      } catch {}
    }
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
