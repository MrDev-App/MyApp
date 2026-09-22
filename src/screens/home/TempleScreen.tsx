import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
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
import { fs, scale, verticalScale } from '@theme/sizes';
import { BlurBackdrop, ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import {
  SearchIcon,
  CloseIcon,
  LocationIcon,
  TagIcon,
} from '@components/icons/SvgIcons';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets/index';
import { templesData, TempleItem } from '@constants/templesData';

const TEMPLE_CATEGORY_TAGS = [
  { id: 'all', key: Translation.TEMPLE_CATEGORY_ALL },
  { id: 'chardham', key: Translation.TEMPLE_CATEGORY_CHARDHAM },
  { id: 'jyotirlinga', key: Translation.TEMPLE_CATEGORY_JYOTIRLINGA },
  { id: 'shaktipeeth', key: Translation.TEMPLE_CATEGORY_SHAKTIPEETH },
  { id: 'major', key: Translation.TEMPLE_CATEGORY_MAJOR },
];

export const TempleScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t, isHindi, select } = useAppLanguage();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<TempleItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const screenTitle = t(Translation.TEMPLE_SCREEN_TITLE);
  const screenDesc = t(Translation.TEMPLE_SCREEN_DESC);

  const filteredTemples = useMemo(() => {
    return templesData.filter(item => {
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

      // Tag filter
      if (selectedTag !== 'all') {
        if (item.category !== selectedTag) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return name.includes(q) || location.includes(q) || deity.includes(q);
      }

      return true;
    });
  }, [selectedTag, searchQuery]);

  const renderModalCard = (item: TempleItem) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const location = isHindi ? item.locationHi : item.locationEn;
    const deity = isHindi ? item.deityHi : item.deityEn;
    const significance = isHindi ? item.significanceHi : item.significanceEn;
    const timing = isHindi ? item.timingHi : item.timingEn;
    const description = isHindi ? item.descriptionHi : item.descriptionEn;

    return (
      <View style={styles.modalCard}>
        <TouchableOpacity
          style={styles.modalCloseBtn}
          activeOpacity={0.8}
          onPress={() => setSelectedItem(null)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CloseIcon size={scale(16)} color={colors.secondary} />
        </TouchableOpacity>

        {item.image && (
          <View style={styles.modalImageWrapper}>
            <Image
              source={item.image}
              style={styles.modalImage}
              resizeMode="cover"
            />
          </View>
        )}

        <Text style={styles.modalTitle} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.modalLocationRow}>
          <LocationIcon size={scale(13)} color={colors.ring} />
          <Text style={styles.modalLocationText}>{location}</Text>
        </View>

        <ScrollView
          style={styles.modalScroll}
          contentContainerStyle={styles.modalScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Deity Section */}
          <View style={styles.modalInfoBox}>
            <Text style={styles.modalInfoLabel}>
              {t(Translation.TEMPLE_PRESIDING_DEITY_LABEL)}
            </Text>
            <Text style={styles.modalInfoValue}>{deity}</Text>
          </View>

          {/* Significance */}
          <View style={styles.modalInfoBox}>
            <Text style={styles.modalInfoLabel}>
              {t(Translation.TEMPLE_SIGNIFICANCE_LABEL)}
            </Text>
            <Text style={styles.modalInfoValue}>{significance}</Text>
          </View>

          {/* Darshan Timings */}
          <View style={styles.modalInfoBox}>
            <Text style={styles.modalInfoLabel}>
              {t(Translation.TEMPLE_DARSHAN_TIMINGS_LABEL)}
            </Text>
            <Text style={styles.modalInfoValue}>{timing}</Text>
          </View>

          {/* Description */}
          {description ? (
            <View style={[styles.modalInfoBox, { borderBottomWidth: 0 }]}>
              <Text style={styles.modalInfoLabel}>
                {t(Translation.TEMPLE_ABOUT_HISTORY_LABEL)}
              </Text>
              <Text style={styles.modalDescText}>{description}</Text>
            </View>
          ) : null}
        </ScrollView>

        <TouchableOpacity
          style={styles.modalDoneBtn}
          activeOpacity={0.8}
          onPress={() => setSelectedItem(null)}
        >
          <Text style={styles.modalDoneBtnText}>
            {t(Translation.TEMPLE_MODAL_CLOSE)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          setSelectedItem(item);
        }}
      >
        <View style={styles.cardHeaderRow}>
          {item.image && (
            <View style={styles.avatarWrapper}>
              <Image
                source={item.image}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
          )}

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
            <View style={styles.cardFooter}>
              <Skeleton width="45%" height={fs(12)} borderRadius={scale(4)} />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderFilterChips = () => (
    <View style={styles.filterSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {TEMPLE_CATEGORY_TAGS.map(tag => {
          const isSelected = selectedTag === tag.id;
          const tagName = t(tag.key);
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
                {tagName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Header */}
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
              ListHeaderComponent={
                <View style={styles.heroBanner}>
                  <View style={styles.heroContent}>
                    <View style={styles.heroTextCol}>
                      <Text style={styles.heroTitle}>{screenTitle}</Text>
                      <Text style={styles.heroDesc} numberOfLines={2}>
                        {screenDesc}
                      </Text>
                    </View>
                    <View style={styles.heroBadge}>
                      <Text style={styles.heroBadgeCount}>
                        {filteredTemples.length}
                      </Text>
                      <Text style={styles.heroBadgeLabel}>
                        {t(Translation.TEMPLE_COUNT_LABEL)}
                      </Text>
                    </View>
                  </View>
                </View>
              }
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

      {/* Temple Detail Modal with Native Blur Backdrop */}
      <Modal
        visible={selectedItem !== null}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <BlurBackdrop />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setSelectedItem(null)}
          />
          <View
            style={[
              styles.modalBackdrop,
              {
                paddingTop: insets.top + scale(24),
                paddingBottom: insets.bottom + scale(24),
              },
            ]}
            pointerEvents="box-none"
          >
            {selectedItem && renderModalCard(selectedItem)}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    width: '90%',
    maxHeight: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(24),
    padding: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(8) },
    shadowOpacity: 0.25,
    shadowRadius: scale(16),
    elevation: 10,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: scale(14),
    right: scale(14),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImageWrapper: {
    width: scale(76),
    height: scale(76),
    borderRadius: scale(38),
    backgroundColor: colors.accentOrangeLight,
    borderWidth: 2,
    borderColor: colors.ring,
    overflow: 'hidden',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
  modalLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(3),
    marginBottom: scale(10),
  },
  modalLocationText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
  },
  modalScroll: {
    width: '100%',
    maxHeight: scale(280),
    marginVertical: scale(6),
  },
  modalScrollContent: {
    paddingVertical: scale(4),
  },
  modalInfoBox: {
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  modalInfoLabel: {
    fontSize: fs(11.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
    marginBottom: scale(2),
  },
  modalInfoValue: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(19),
  },
  modalDescText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(20),
  },
  modalDoneBtn: {
    width: '100%',
    height: scale(42),
    borderRadius: scale(21),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(12),
  },
  modalDoneBtnText: {
    color: colors.white,
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(14),
    fontWeight: '600',
  },
});
