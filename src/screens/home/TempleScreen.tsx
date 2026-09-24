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
  ListRenderItemInfo,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { SearchIcon, CloseIcon } from '@components/icons/SvgIcons';
import imagePath from '@assets/index';
import { TempleItem, TempleCategory } from '@constants/templesData';
import {
  getCachedTemples,
  fetchTemplesFromFirestore,
} from '@services/firebaseServices/templeService';

// Extracted sub-components
import TempleCard from './components/TempleCard';
import TempleSkeletonList from './components/TempleSkeletonList';
import TempleFilterChips from './components/TempleFilterChips';

export const TempleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useAppLanguage();

  const [templesList, setTemplesList] = useState<TempleItem[]>(() =>
    getCachedTemples(),
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    fetchTemplesFromFirestore()
      .then(data => {
        if (isMounted && data && data.length > 0) {
          setTemplesList(data);
        }
      })
      .catch(err => {
        console.warn('[TempleScreen] Error loading remote temples:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const screenTitle = useMemo(
    () => t(Translation.TEMPLE_SCREEN_TITLE),
    [t],
  );

  const filteredTemples = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return templesList.filter(item => {
      // Multi-category tag filter
      if (selectedTag !== 'all') {
        const inCategories =
          item.categories &&
          item.categories.includes(selectedTag as TempleCategory);
        const isPrimary = item.category === selectedTag;
        if (!inCategories && !isPrimary) return false;
      }

      // Search filter
      if (q.length > 0) {
        const name = (item.nameHi + ' ' + item.nameEn).toLowerCase();
        const location = (
          item.locationHi +
          ' ' +
          item.locationEn +
          ' ' +
          item.stateHi +
          ' ' +
          item.stateEn
        ).toLowerCase();
        const deity = (item.deityHi + ' ' + item.deityEn).toLowerCase();

        return name.includes(q) || location.includes(q) || deity.includes(q);
      }

      return true;
    });
  }, [templesList, selectedTag, searchQuery]);

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

  const keyExtractor = useCallback((item: TempleItem) => item.id, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title={screenTitle} />

        {/* Search Bar */}
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

        {/* Filter Chips */}
        <TempleFilterChips
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {/* Temples List / Skeleton */}
        <View style={styles.contentContainer}>
          {loading ? (
            <TempleSkeletonList count={3} />
          ) : (
            <FlatList
              data={filteredTemples}
              renderItem={renderTempleCard}
              keyExtractor={keyExtractor}
              contentContainerStyle={[
                styles.listContent,
                { paddingBottom: insets.bottom + scale(40) },
              ]}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              windowSize={5}
              removeClippedSubviews={Platform.OS === 'android'}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Image source={imagePath.lotus} style={styles.emptyImage} />
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
