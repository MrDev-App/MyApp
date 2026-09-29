import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { ScreenHeader } from '@components';
import Skeleton from '@components/Skeleton';
import { useAppLanguage, useNetworkStatus } from '@hooks';
import { Translation } from '@i18n/language';
import { SearchIcon, CloseIcon } from '@assets/SvgIcons';
import imagePath from '@assets/index';
import { TempleItem, TempleCategory, fetchTemples } from '@api/templeApi';

// Extracted sub-components
import TempleCard from './components/TempleCard';
import TempleSkeletonList from './components/TempleSkeletonList';
import TempleFilterChips from './components/TempleFilterChips';

const PAGE_SIZE = 10;

export const TempleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useAppLanguage();
  const isOffline = useNetworkStatus();

  const [allTemples, setAllTemples] = useState<TempleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadTemples = useCallback(
    (force = false) => {
      let isMounted = true;
      if (allTemples.length === 0) {
        setLoading(true);
      }

      fetchTemples({
        category: selectedTag,
        searchQuery,
        limitCount: PAGE_SIZE,
        forceRefresh: force,
      })
        .then(data => {
          console.log('Dataaaa=>', data);
          if (isMounted) {
            const list = data || [];
            setAllTemples(list);
            setHasMore(list.length >= PAGE_SIZE);
          }
        })
        .catch(err => {
          console.warn(
            '[TempleScreen] Error fetching temples from Firebase:',
            err,
          );
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    },
    [selectedTag, searchQuery, allTemples.length],
  );

  // Fetch / filter dynamically on tag / search change
  useEffect(() => {
    setHasMore(true);
    const cleanup = loadTemples();
    return cleanup;
  }, [selectedTag, searchQuery]);

  // Auto-fetch when internet is restored if list is empty
  useEffect(() => {
    if (!isOffline && allTemples.length === 0) {
      loadTemples(true);
    }
  }, [isOffline, allTemples.length, loadTemples]);

  // Refetch when screen comes into focus ONLY if list is empty
  useFocusEffect(
    useCallback(() => {
      if (allTemples.length === 0) {
        loadTemples(true);
      }
    }, [allTemples.length, loadTemples]),
  );

  const handleEndReached = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextLimit = allTemples.length + PAGE_SIZE;

    fetchTemples({
      category: selectedTag,
      searchQuery,
      limitCount: nextLimit,
    })
      .then(data => {
        const list = data || [];
        if (list.length === allTemples.length) {
          setHasMore(false);
        } else {
          setAllTemples(list);
          setHasMore(list.length >= nextLimit);
        }
      })
      .catch(err => {
        console.warn('[TempleScreen] Error loading more temples:', err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [
    loading,
    loadingMore,
    hasMore,
    allTemples.length,
    selectedTag,
    searchQuery,
  ]);

  const screenTitle = useMemo(() => t(Translation.TEMPLE_SCREEN_TITLE), [t]);

  const handleTemplePress = useCallback(
    (temple: TempleItem) => {
      navigation.navigate('TempleDetailScreen', { temple });
    },
    [navigation],
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const renderTempleCard = useCallback(
    ({ item, index }: ListRenderItemInfo<TempleItem>) => (
      <TempleCard item={item} index={index} onPress={handleTemplePress} />
    ),
    [handleTemplePress],
  );

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.ring} />
      </View>
    );
  }, [loadingMore]);

  const keyExtractor = useCallback((item: TempleItem) => item.id, []);

  const showSkeleton =
    (loading && allTemples.length === 0) ||
    (isOffline && allTemples.length === 0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title={screenTitle} />

        {/* Search Bar / Skeleton */}
        {showSkeleton ? (
          <View style={styles.searchBarWrapper}>
            <Skeleton
              width="100%"
              height={scale(42)}
              borderRadius={scale(12)}
              baseColor="rgba(183, 168, 151, 0.25)"
              highlightColor="rgba(255, 255, 255, 0.7)"
              style={styles.searchBarSkeleton}
            />
          </View>
        ) : (
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchBar}>
              <SearchIcon size={scale(16)} color={colors.ring} />
              <TextInput
                style={styles.searchInput}
                placeholder={t(Translation.TEMPLE_SEARCH_PLACEHOLDER)}
                placeholderTextColor={colors.warmTaupe}
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
                autoCorrect={false}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                >
                  <CloseIcon size={scale(14)} color={colors.secondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Filter Chips / Skeleton */}
        {showSkeleton ? (
          <View style={styles.chipsSkeletonRow}>
            {[scale(74), scale(70), scale(82), scale(76)].map((w, idx) => (
              <Skeleton
                key={`chip_skel_${idx}`}
                width={w}
                height={scale(32)}
                borderRadius={scale(20)}
                baseColor="rgba(183, 168, 151, 0.25)"
                highlightColor="rgba(255, 255, 255, 0.7)"
                style={styles.chipSkeleton}
              />
            ))}
          </View>
        ) : (
          <TempleFilterChips
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        )}

        {/* Temples List / Skeleton */}
        <View style={styles.contentContainer}>
          {showSkeleton ? (
            <TempleSkeletonList count={3} />
          ) : (
            <FlatList
              data={allTemples}
              renderItem={renderTempleCard}
              keyExtractor={keyExtractor}
              contentContainerStyle={[
                styles.listContent,
                { paddingBottom: insets.bottom + scale(40) },
              ]}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              initialNumToRender={PAGE_SIZE}
              maxToRenderPerBatch={PAGE_SIZE}
              windowSize={5}
              removeClippedSubviews={Platform.OS === 'android'}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.4}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Image
                    source={imagePath.fallBackImage}
                    style={styles.emptyImage}
                  />
                  <Text style={styles.emptyTitle}>
                    {t(Translation.TEMPLE_NO_FOUND_TITLE)}
                  </Text>
                  <Text style={styles.emptyDesc}>
                    {t(Translation.TEMPLE_NO_FOUND_DESC)}
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(TempleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  searchBarWrapper: {
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  chipsSkeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  searchBarSkeleton: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  chipSkeleton: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: scale(42),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  searchInput: {
    flex: 1,
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    paddingHorizontal: scale(8),
    height: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
  },
  footerLoader: {
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(24),
  },
  emptyImage: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    opacity: 0.8,
    marginBottom: scale(14),
  },
  emptyTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: scale(4),
  },
  emptyDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
});
