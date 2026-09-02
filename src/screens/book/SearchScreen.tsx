import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Keyboard,
  Image,
} from 'react-native';
import imagePath from '@assets/index';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { MahaBharatStories } from '@constants/storiesData';
import GradientBackground from '@components/GradientBackground';
import { Translation } from '@i18n/language';
import { SearchIcon, HeartIcon, BackIcon as Back } from '@components/icons/SvgIcons';

// Localization

// Haptic feedback helper
const triggerHaptic = (type: string = 'impactLight') => {
  if (Platform.OS === 'android') {
    try {
      const HapticFeedback = require('native-haptic-feedback').default;
      HapticFeedback.trigger(type, {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (e) {
      console.log('Haptic error:', e);
    }
  } else {
    // iOS vibration
    if (type === 'impactHeavy') {
      const Vibration = require('react-native').Vibration;
      Vibration.vibrate(40);
    } else {
      const Vibration = require('react-native').Vibration;
      Vibration.vibrate(10);
    }
  }
};

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';
  const labels = {
    searchPlaceholder: t(Translation.BOOK_SEARCH_PLACEHOLDER),
    noResults: t(Translation.BOOK_NO_STORIES_FOUND),
    readingTime: t(Translation.BOOK_READING_TIME),
    recentProgress: t(Translation.BOOK_RECENT_PROGRESS),
    emptyState: t(Translation.BOOK_SEARCH_EMPTY_STATE),
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const inputRef = useRef<TextInput>(null);

  // Load storage maps
  useEffect(() => {
    try {
      const savedBookmarksStr = Storage.getString(STORAGE_KEYS.STORY_BOOKMARKS, '[]');
      const savedBookmarks = JSON.parse(savedBookmarksStr);
      if (Array.isArray(savedBookmarks)) {
        setBookmarks(savedBookmarks);
      }

      const savedProgressStr = Storage.getString(STORAGE_KEYS.STORY_PROGRESS, '{}');
      const savedProgress = JSON.parse(savedProgressStr);
      if (savedProgress && typeof savedProgress === 'object') {
        setProgressMap(savedProgress);
      }
    } catch (error) {
      console.log('[Storage] Error loading search storage:', error);
    }

    // Auto focus search input on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredStories = MahaBharatStories.filter(story => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;

    const searchTarget = [
      story.titleEn,
      story.titleHi,
      story.subtitleEn,
      story.subtitleHi,
      story.descriptionEn,
      story.descriptionHi,
      story.categoryEn,
      story.categoryHi,
      story.sourceEn,
      story.sourceHi,
      story.keywords || '',
    ]
      .join(' ')
      .toLowerCase();

    return searchTarget.includes(q);
  });

  return (
    <GradientBackground style={styles.containerFull}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header Search Bar Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              triggerHaptic('selection');
              navigation.goBack();
            }}
          >
            <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <SearchIcon size={scale(18)} color={colors.ring} />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder={labels.searchPlaceholder}
              placeholderTextColor={colors.neutralDisabled}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={Keyboard.dismiss}
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

        {/* Results List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(20) },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {searchQuery.trim() === '' ? (
            // Empty Search State
            <View style={styles.emptyStateContainer}>
              <Image source={imagePath.star} style={styles.emptyStateStar} />
              <Text style={styles.emptyStateText}>{labels.emptyState}</Text>
            </View>
          ) : filteredStories.length === 0 ? (
            // No Results State
            <View style={styles.noResultsCard}>
              <View style={styles.noResultsContainer}>
                <Image source={imagePath.star} style={styles.noResultsStar} />
                <Text style={styles.noResultsText}>{labels.noResults}</Text>
                <Image source={imagePath.star} style={styles.noResultsStar} />
              </View>
            </View>
          ) : (
            // Matching Results list
            filteredStories.map(story => {
              const progress = progressMap[story.id] || 0;
              const isFav = bookmarks.includes(story.id);
              return (
                <TouchableOpacity
                  key={story.id}
                  style={styles.searchCard}
                  onPress={() => {
                    triggerHaptic('impactHeavy');
                    navigation.navigate('ReadingScreen', { storyId: story.id });
                  }}
                  activeOpacity={0.8}
                >
                  <Animated.Image
                    source={story.image}
                    style={styles.searchCardImage}
                    sharedTransitionTag={`story_image_${story.id}`}
                  />
                  <View style={styles.searchCardContent}>
                    <View style={styles.searchCardHeader}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>
                          {currentLang === 'hi'
                            ? story.categoryHi
                            : story.categoryEn}
                        </Text>
                      </View>
                      <Text style={styles.searchCardTime}>
                        {labels.readingTime.replace(
                          '{{time}}',
                          String(story.readingTimeMin),
                        )}
                      </Text>
                    </View>
                    <Text style={styles.searchCardTitle} numberOfLines={1}>
                      {currentLang === 'hi' ? story.titleHi : story.titleEn}
                    </Text>
                    <Text style={styles.searchCardDesc} numberOfLines={2}>
                      {currentLang === 'hi'
                        ? story.descriptionHi
                        : story.descriptionEn}
                    </Text>
                    <View style={styles.searchCardFooter}>
                      <Text style={styles.searchCardSource}>
                        📜{' '}
                        {currentLang === 'hi' ? story.sourceHi : story.sourceEn}
                      </Text>
                      {progress > 0 && (
                        <Text style={styles.searchCardProgress}>
                          {labels.recentProgress.replace(
                            '{{progress}}',
                            String(progress),
                          )}
                        </Text>
                      )}
                    </View>
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
                  </View>
                  {isFav && (
                    <View style={styles.favoriteBadge}>
                      <HeartIcon
                        size={scale(12)}
                        color={colors.ring}
                        filled={true}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  backButton: {
    marginRight: scale(10),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: fs(20),
    color: colors.secondary,
    lineHeight: scale(22),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(14),
    paddingHorizontal: scale(10),
    height: scale(38),
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: fs(16),
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: fonts.PoppinsRegular,
    fontSize: fs(14),
    color: colors.secondary,
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: fs(14),
    color: colors.neutralDisabled,
    padding: scale(6),
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(100),
  },
  emptyStateStar: {
    width: scale(48),
    height: scale(48),
    marginBottom: scale(12),
  },
  emptyStateText: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
    textAlign: 'center',
  },
  noResultsCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(30),
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    marginTop: scale(40),
  },
  noResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noResultsStar: {
    width: scale(16),
    height: scale(16),
    marginHorizontal: scale(8),
  },
  noResultsText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
    textAlign: 'center',
    flexShrink: 1,
  },
  searchCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    padding: scale(12),
    marginBottom: scale(16),
    position: 'relative',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchCardImage: {
    width: scale(85),
    height: scale(115),
    borderRadius: scale(10),
    backgroundColor: colors.borderLight,
    resizeMode: 'cover',
  },
  searchCardContent: {
    flex: 1,
    paddingLeft: scale(12),
    justifyContent: 'space-between',
  },
  searchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.borderMedium,
    borderWidth: 1,
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
  },
  categoryBadgeText: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDark,
  },
  searchCardTime: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
  searchCardTitle: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginTop: scale(4),
  },
  searchCardDesc: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
    marginTop: scale(2),
    lineHeight: fs(16),
  },
  searchCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(6),
  },
  searchCardSource: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
  searchCardProgress: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  progressBarBg: {
    height: scale(3),
    backgroundColor: colors.borderLight,
    borderRadius: scale(2),
    marginTop: scale(6),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.ring,
  },
  favoriteBadge: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    backgroundColor: colors.overlayStrong,
    borderRadius: scale(20),
    width: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  favoriteBadgeText: {
    fontSize: fs(10),
  },
});
