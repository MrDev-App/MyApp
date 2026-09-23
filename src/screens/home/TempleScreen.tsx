import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
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
import { triggerHaptic } from '@helper/helper';
import {
  SearchIcon,
  CloseIcon,
  LocationIcon,
} from '@components/icons/SvgIcons';
import Skeleton from '@components/Skeleton';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { TempleItem, TempleCategory } from '@constants/templesData';
import {
  getCachedTemples,
  fetchTemplesFromFirestore,
} from '@services/firebaseServices/templeService';

const TEMPLE_CATEGORY_TAGS = [
  { id: 'all', key: Translation.TEMPLE_CATEGORY_ALL },
  { id: 'chardham', key: Translation.TEMPLE_CATEGORY_CHARDHAM },
  { id: 'jyotirlinga', key: Translation.TEMPLE_CATEGORY_JYOTIRLINGA },
  { id: 'shaktipeeth', key: Translation.TEMPLE_CATEGORY_SHAKTIPEETH },
  { id: 'major', key: Translation.TEMPLE_CATEGORY_MAJOR },
];

const TempleAvatar = ({ source }: { source: any }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.avatarWrapper}>
      {imageLoading && (
        <View style={styles.avatarLoaderWrapper}>
          <LottieView
            source={imagePath.loading}
            autoPlay
            loop
            style={styles.avatarLottie}
          />
        </View>
      )}
      <Image
        source={typeof source === 'string' ? { uri: source } : source}
        style={styles.avatarImage}
        resizeMode="cover"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
    </View>
  );
};

export const TempleScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t, isHindi } = useAppLanguage();

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

  const screenTitle = t(Translation.TEMPLE_SCREEN_TITLE);
  const screenDesc = t(Translation.TEMPLE_SCREEN_DESC);

  const filteredTemples = useMemo(() => {
    return templesList.filter(item => {
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

      // Multi-category tag filter
      if (selectedTag !== 'all') {
        const inCategories =
          item.categories &&
          item.categories.includes(selectedTag as TempleCategory);
        const isPrimary = item.category === selectedTag;
        if (!inCategories && !isPrimary) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return name.includes(q) || location.includes(q) || deity.includes(q);
      }

      return true;
    });
  }, [templesList, selectedTag, searchQuery]);

  const renderTempleCard = ({ item }: { item: TempleItem }) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const location = isHindi ? item.locationHi : item.locationEn;
    const deity = isHindi ? item.deityHi : item.deityEn;
    const significance = isHindi ? item.significanceHi : item.significanceEn;

    return (
      <TouchableOpacity
        style={styles.templeCard}
        activeOpacity={0.88}
        onPress={() => {
          triggerHaptic();
          navigation.navigate('TempleDetailScreen', { temple: item });
        }}
      >
        <View style={styles.cardHeaderRow}>
          {item.image && <TempleAvatar source={item.image} />}

          <View style={styles.headerTextCol}>
            <Text style={styles.templeName} numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.locationBadgeRow}>
              <LocationIcon size={scale(12)} color={colors.ring} />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.deityTagRow}>
          <Text style={styles.deityTagText}>
            {t(Translation.TEMPLE_DEITY_LABEL)}
            <Text style={{ color: colors.secondary, fontWeight: '700' }}>
              {deity}
            </Text>
          </Text>
        </View>

        <View style={styles.significanceBox}>
          <Text style={styles.significanceText} numberOfLines={2}>
            {significance}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>
            {t(Translation.TEMPLE_VIEW_DETAILS_ACTION)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSkeletonList = () => {
    return (
      <View style={styles.listContent}>
        {[1, 2, 3].map(index => (
          <View key={`temple_skel_${index}`} style={styles.templeCard}>
            <View style={styles.cardHeaderRow}>
              <Skeleton circle width={scale(48)} height={scale(48)} />
              <View style={styles.headerTextCol}>
                <Skeleton width="65%" height={fs(16)} borderRadius={scale(4)} />
                <Skeleton
                  width="45%"
                  height={fs(12)}
                  borderRadius={scale(4)}
                  style={{ marginTop: scale(6) }}
                />
              </View>
            </View>
            <Skeleton
              width={scale(110)}
              height={fs(18)}
              borderRadius={scale(8)}
              style={{ marginBottom: scale(10) }}
            />
            <View style={styles.significanceBox}>
              <Skeleton width="96%" height={fs(13)} borderRadius={scale(4)} />
              <Skeleton
                width="80%"
                height={fs(13)}
                borderRadius={scale(4)}
                style={{ marginTop: scale(6) }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderFilterChips = () => {
    return (
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {TEMPLE_CATEGORY_TAGS.map(tag => {
            const isSelected = selectedTag === tag.id;
            return (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  triggerHaptic();
                  setSelectedTag(tag.id);
                }}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}
                >
                  {t(tag.key)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

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
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <CloseIcon size={scale(14)} color={colors.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        {renderFilterChips()}

        {/* Temples List / Skeleton */}
        <View style={styles.contentContainer}>
          {loading ? (
            renderSkeletonList()
          ) : (
            <FlatList
              data={filteredTemples}
              renderItem={renderTempleCard}
              keyExtractor={item => item.id}
              contentContainerStyle={[
                styles.listContent,
                { paddingBottom: insets.bottom + scale(40) },
              ]}
              showsVerticalScrollIndicator={false}
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

export default TempleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  heroBanner: {
    marginTop: scale(2),
    marginBottom: scale(14),
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(4),
    elevation: 2,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextCol: {
    flex: 1,
    paddingRight: scale(12),
  },
  heroTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: scale(2),
  },
  heroDesc: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    lineHeight: fs(17),
  },
  heroBadge: {
    backgroundColor: colors.accentOrangeLight,
    borderWidth: 1,
    borderColor: colors.accentOrangeBorder,
    borderRadius: scale(12),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(64),
  },
  heroBadgeCount: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.ring,
  },
  heroBadgeLabel: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginTop: scale(-2),
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
  filterSection: {
    marginBottom: scale(8),
  },
  filterScroll: {
    paddingHorizontal: scale(16),
    gap: scale(8),
  },
  filterChip: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    backgroundColor: colors.white,
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterChipSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  filterChipText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  filterChipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
  },
  templeCard: {
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  avatarWrapper: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: colors.accentOrangeLight,
    borderWidth: 1.5,
    borderColor: colors.ring,
    overflow: 'hidden',
    marginRight: scale(12),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLoaderWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentOrangeLight,
    zIndex: 1,
  },
  avatarLottie: {
    width: scale(36),
    height: scale(36),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTextCol: {
    flex: 1,
  },
  templeName: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
  },
  locationBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(3),
    gap: scale(4),
  },
  locationText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
  },
  deityTagRow: {
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    alignSelf: 'flex-start',
    marginBottom: scale(8),
  },
  deityTagText: {
    fontSize: fs(11.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  significanceBox: {
    marginBottom: scale(10),
  },
  significanceText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(19),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  cardFooterText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '600',
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
