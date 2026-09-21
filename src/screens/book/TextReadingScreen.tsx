import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { triggerHaptic } from '@helper/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';

import { findStoryById, TextBooks } from '@constants/storiesData';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import imagePath from '@assets/index';
import { HeartIcon, BackIcon as Back } from '@components/icons/SvgIcons';
import FlipBookCover from './components/FlipBookCover';
import { GradientBackground } from '@components';

export const TextReadingScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { currentLanguage: currentLang } = useAppLanguage();

  const { storyId } = route.params || {};
  const story = useMemo(() => {
    return findStoryById(storyId) || TextBooks[0];
  }, [storyId]);

  const [isCoverReady, setIsCoverReady] = useState<boolean>(false);
  const [fontSize] = useState<number>(15);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [_pageInfo, setPageInfo] = useState<{ current: number; total: number }>(
    {
      current: 0,
      total: story?.pages?.length || 1,
    },
  );

  const handleCoverLoaded = useCallback(() => {
    setIsCoverReady(true);
  }, []);

  useEffect(() => {
    setIsCoverReady(false);
    // Fallback safety timeout so user is never stuck if image takes unusually long
    const timer = setTimeout(() => {
      setIsCoverReady(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [story?.id]);

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

  const title = story
    ? currentLang === 'hi'
      ? story.titleHi
      : story.titleEn
    : '';

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Top Header Controls Bar */}
        <View style={[styles.headerBar, { borderBottomColor: colors.ring }]}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.ring }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitleText} numberOfLines={1}>
              {title}
            </Text>
          </View>

          {/* Bookmark Toggle Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleBookmark}
            activeOpacity={0.7}
          >
            <HeartIcon
              size={scale(16)}
              color={isBookmarked ? colors.ring : ''}
              filled={isBookmarked}
              stroke={colors.ring}
            />
          </TouchableOpacity>
        </View>

        {/* Book Area with synchronous cover mount & Lottie loader overlay */}
        <View style={styles.bookContentArea}>
          {story ? (
            <FlipBookCover
              story={story}
              currentLang={currentLang}
              fontSize={fontSize}
              onPageChange={handlePageChange}
              onCoverImageLoaded={handleCoverLoaded}
            />
          ) : null}

          {(!isCoverReady || !story) && (
            <View style={styles.centerLoaderOverlay} pointerEvents="none">
              <LottieView
                source={imagePath.loading}
                autoPlay
                loop
                style={styles.screenLottie}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
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

    gap: scale(10),
  },
  iconButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(17),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.ring,
  },
  miniButton: {
    paddingHorizontal: scale(8),
    height: scale(30),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtnText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(12),
  },
  headerTitleWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitleText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(13),
    color: colors.black,
  },
  headerProgressText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(10),
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: scale(3),
  },
  progressBar: {
    height: '100%',
  },
  bookContentArea: {
    flex: 1,
    position: 'relative',
  },
  centerLoaderOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  screenLottie: {
    width: scale(80),
    height: scale(80),
  },
});
