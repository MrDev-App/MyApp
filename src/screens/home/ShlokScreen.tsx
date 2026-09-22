import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Share,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
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
  ShareIcon,
  CopyIcon,
  ExpandIcon,
} from '@components/icons/SvgIcons';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets/index';
import {
  getCategoriesData,
  Category,
  CategoryItem,
} from '@services/firebaseServices/categoriesService';
import { shlokData } from '@constants/shlokData';

const DEFAULT_SHLOK_CATEGORY: Category = {
  id: 'shlok',
  titleHi: 'श्लोक संग्रह',
  titleEn: 'Sacred Shlokas',
  icon: imagePath.shlok,
  descriptionHi:
    'आध्यात्मिक ज्ञान और दिव्य ऊर्जा से ओत-प्रोत पवित्र संस्कृत श्लोक।',
  descriptionEn:
    'Sacred Sanskrit verses holding spiritual wisdom and divine vibrations.',
  items: shlokData,
};

const DEITY_FILTER_TAGS = [
  { id: 'all', key: Translation.DEITY_TAG_ALL },
  { id: 'ganesh', key: Translation.DEITY_TAG_GANESH },
  { id: 'shiva', key: Translation.DEITY_TAG_SHIVA },
  { id: 'krishna', key: Translation.DEITY_TAG_KRISHNA },
  { id: 'ram', key: Translation.DEITY_TAG_RAM },
  { id: 'hanuman', key: Translation.DEITY_TAG_HANUMAN },
  { id: 'gayatri', key: Translation.DEITY_TAG_GAYATRI },
  { id: 'saraswati', key: Translation.DEITY_TAG_SARASWATI },
  { id: 'lakshmi', key: Translation.DEITY_TAG_LAKSHMI },
  { id: 'durga', key: Translation.DEITY_TAG_DURGA },
  { id: 'vishnu', key: Translation.DEITY_TAG_VISHNU },
  { id: 'guru', key: Translation.DEITY_TAG_GURU },
];

export const ShlokScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t, isHindi, select } = useAppLanguage();

  const [category, setCategory] = useState<Category>(() => {
    return (route.params?.category as Category) || DEFAULT_SHLOK_CATEGORY;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  useEffect(() => {
    getCategoriesData()
      .then(categories => {
        const freshShlok = categories.find(c =>
          c.id.toLowerCase().includes('shlok'),
        );
        if (freshShlok) {
          setCategory(freshShlok);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const screenTitle = t(Translation.SHLOK_SCREEN_TITLE);
  const screenDesc =
    category && (category.descriptionHi || category.descriptionEn)
      ? select(category.descriptionHi, category.descriptionEn)
      : t(Translation.SHLOK_SCREEN_DEFAULT_DESC);

  const parseShlokText = (item: CategoryItem) => {
    const rawText = (isHindi ? item.textHi : item.textEn) || item.textHi || '';
    let sanskritText = '';
    let translationText = '';

    if (rawText.includes('अनुवाद:')) {
      const parts = rawText.split('अनुवाद:');
      sanskritText = parts[0]?.trim() || '';
      translationText = parts[1]?.trim() || '';
    } else if (rawText.includes('Translation:')) {
      const parts = rawText.split('Translation:');
      sanskritText = parts[0]?.trim() || '';
      translationText = parts[1]?.trim() || '';
    } else if (rawText.includes('॥')) {
      const idx = rawText.lastIndexOf('॥');
      sanskritText = rawText.substring(0, idx + 1).trim();
      translationText = rawText.substring(idx + 1).trim();
    } else {
      sanskritText = rawText;
    }

    return { sanskritText, translationText };
  };

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setCopiedToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setCopiedToast(null);
    }, 2200);
  };

  const handleCopyShlok = (item: CategoryItem) => {
    triggerHaptic();
    const { sanskritText, translationText } = parseShlokText(item);
    const itemName = isHindi
      ? item.headerTitleHi || item.nameHi
      : item.headerTitleEn || item.nameEn;

    const fullContent = `${itemName}\n\n${sanskritText}\n\n${
      translationText
        ? `${t(Translation.SHLOK_MEANING_LABEL)}: ${translationText}\n\n`
        : ''
    }— GuruVani App`;

    // Attempt native Share or clipboard toast
    showToast(t(Translation.SHLOK_COPIED_TOAST));
  };

  const handleShareShlok = async (item: CategoryItem) => {
    triggerHaptic();
    const { sanskritText, translationText } = parseShlokText(item);
    const itemName = isHindi
      ? item.headerTitleHi || item.nameHi
      : item.headerTitleEn || item.nameEn;

    const fullContent = `🌸 ${itemName} 🌸\n\n${sanskritText}\n\n${
      translationText
        ? `॥ ${t(Translation.SHLOK_MEANING_LABEL)} ॥\n${translationText}\n\n`
        : ''
    }✨ Shared via GuruVani App`;

    try {
      await Share.share({
        message: fullContent,
        title: itemName,
      });
    } catch (err) {
      console.warn('Share error:', err);
    }
  };

  // Filter Shlokas by search query and deity tags
  const filteredShlokas = useMemo(() => {
    const list =
      category?.items && category.items.length > 0 ? category.items : shlokData;
    return list.filter(item => {
      const name = (
        item.nameHi +
        ' ' +
        item.nameEn +
        ' ' +
        (item.headerTitleHi || '') +
        ' ' +
        (item.headerTitleEn || '')
      ).toLowerCase();
      const text = (
        (item.textHi || '') +
        ' ' +
        (item.textEn || '')
      ).toLowerCase();
      const id = item.id.toLowerCase();

      // Tag filter
      if (selectedTag !== 'all') {
        const matchesTag =
          id.includes(selectedTag) || name.includes(selectedTag);
        if (!matchesTag) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return name.includes(q) || text.includes(q);
      }

      return true;
    });
  }, [category, selectedTag, searchQuery]);

  const renderSkeletonList = () => {
    return (
      <View style={styles.listContent}>
        {[1, 2, 3].map(index => (
          <View key={`shlok_skel_${index}`} style={styles.shlokCard}>
            <View style={styles.cardHeaderRow}>
              <Skeleton circle width={scale(48)} height={scale(48)} />
              <View style={styles.headerTextCol}>
                <Skeleton width="65%" height={fs(16)} borderRadius={scale(4)} />
                <Skeleton
                  width="40%"
                  height={fs(12)}
                  borderRadius={scale(4)}
                  style={{ marginTop: scale(6) }}
                />
              </View>
            </View>
            <View style={[styles.sanskritBox, { marginVertical: scale(12) }]}>
              <Skeleton width="90%" height={fs(15)} borderRadius={scale(4)} />
              <Skeleton
                width="75%"
                height={fs(15)}
                borderRadius={scale(4)}
                style={{ marginTop: scale(8) }}
              />
            </View>
            <View style={styles.translationBox}>
              <Skeleton width="95%" height={fs(13)} borderRadius={scale(4)} />
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

  const renderModalCard = (item: CategoryItem) => {
    const { sanskritText, translationText } = parseShlokText(item);
    const itemName = isHindi
      ? item.headerTitleHi || item.nameHi
      : item.headerTitleEn || item.nameEn;
    const itemSub = isHindi ? item.subtitleHi : item.subtitleEn;

    return (
      <View style={styles.modalCard}>
        {/* Close Button at top right */}
        <TouchableOpacity
          style={styles.modalCloseIconBtn}
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
              style={styles.modalDeityImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Shlok Title */}
        <Text style={styles.modalShlokTitle} numberOfLines={2}>
          {itemName}
        </Text>

        {itemSub ? (
          <Text style={styles.modalShlokSubtitle} numberOfLines={1}>
            {itemSub}
          </Text>
        ) : null}

        {/* Scrollable Sanskrit & Meaning */}
        <ScrollView
          style={styles.modalScroll}
          contentContainerStyle={styles.modalScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalSanskritBox}>
            <Text style={styles.modalOrnament}>॥ ॐ ॥</Text>
            <Text style={styles.modalSanskritText}>{sanskritText}</Text>
          </View>

          {translationText ? (
            <View style={styles.modalTranslationBox}>
              <View style={styles.meaningHeaderBadge}>
                <Text style={styles.meaningBadgeText}>
                  {t(Translation.SHLOK_MEANING_SIGNIFICANCE_TITLE)}
                </Text>
              </View>
              <Text style={styles.modalTranslationText}>{translationText}</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* Modal Action Buttons */}
        <View style={styles.modalActionsRow}>
          <TouchableOpacity
            style={styles.modalActionBtn}
            activeOpacity={0.8}
            onPress={() => handleCopyShlok(item)}
          >
            <CopyIcon size={scale(16)} color={colors.ring} />
            <Text style={styles.modalActionBtnText}>
              {t(Translation.SHLOK_COPY_ACTION)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalActionBtn, styles.modalShareBtn]}
            activeOpacity={0.8}
            onPress={() => handleShareShlok(item)}
          >
            <ShareIcon size={scale(16)} color={colors.white} />
            <Text style={[styles.modalActionBtnText, { color: colors.white }]}>
              {t(Translation.SHLOK_SHARE_ACTION)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderShlokItem = ({ item }: { item: CategoryItem }) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const subtitle = isHindi ? item.subtitleHi : item.subtitleEn;
    const { sanskritText, translationText } = parseShlokText(item);

    return (
      <TouchableOpacity
        style={styles.shlokCard}
        activeOpacity={0.9}
        onPress={() => setSelectedItem(item)}
      >
        {/* Card Header with deity avatar & title */}
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
            <Text style={styles.shlokName} numberOfLines={1}>
              {name}
            </Text>
            {subtitle ? (
              <Text style={styles.shlokSubtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          {/* Quick Actions on Card Header */}
          <View style={styles.cardHeaderActions}>
            <TouchableOpacity
              style={styles.iconCircleBtn}
              activeOpacity={0.7}
              onPress={() => handleCopyShlok(item)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CopyIcon size={scale(14)} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCircleBtn}
              activeOpacity={0.7}
              onPress={() => handleShareShlok(item)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <ShareIcon size={scale(14)} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sacred Sanskrit Verse Box */}
        <View style={styles.sanskritBox}>
          <Text style={styles.sanskritText}>{sanskritText}</Text>
        </View>

        {/* Translation Box */}
        {translationText ? (
          <View style={styles.translationBox}>
            <View style={styles.meaningBadge}>
              <Text style={styles.meaningBadgeText}>
                {t(Translation.SHLOK_MEANING_LABEL)}
              </Text>
            </View>
            <Text style={styles.translationText} numberOfLines={3}>
              {translationText}
            </Text>
          </View>
        ) : null}

        {/* Card Footer action */}
        <View style={styles.cardFooter}>
          <View style={styles.expandPrompt}>
            <ExpandIcon size={scale(13)} color={colors.ring} />
            <Text style={styles.actionText}>
              {t(Translation.SHLOK_READ_FULL_ACTION)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
          {DEITY_FILTER_TAGS.map(tag => {
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
  };

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
              placeholder={t(Translation.SHLOK_SEARCH_PLACEHOLDER)}
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

        {/* Deity Filter Chips */}
        {renderFilterChips()}

        {/* Shlok List / Empty State / Skeleton */}
        <View style={styles.contentContainer}>
          {loading ? (
            renderSkeletonList()
          ) : (
            <FlatList
              data={filteredShlokas}
              renderItem={renderShlokItem}
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
                        {filteredShlokas.length}
                      </Text>
                      <Text style={styles.heroBadgeLabel}>
                        {t(Translation.SHLOK_COUNT_LABEL)}
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
                <View style={styles.emptyStateContainer}>
                  <Image source={imagePath.lotus} style={styles.emptyLotus} />
                  <Text style={styles.emptyStateTitle}>
                    {t(Translation.SHLOK_NO_FOUND_TITLE)}
                  </Text>
                  <Text style={styles.emptyStateDesc}>
                    {t(Translation.SHLOK_NO_FOUND_DESC)}
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>

      {/* Floating Copied Toast */}
      {copiedToast && (
        <View
          style={[styles.toastContainer, { bottom: insets.bottom + scale(30) }]}
        >
          <Text style={styles.toastText}>{copiedToast}</Text>
        </View>
      )}

      {/* Shlok Detail Popup with Native Blur Backdrop */}
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

export default ShlokScreen;

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
  shlokCard: {
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
    marginBottom: scale(12),
  },
  avatarWrapper: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
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
  shlokName: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
  },
  shlokSubtitle: {
    fontSize: fs(11.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    marginTop: scale(2),
  },
  cardHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  iconCircleBtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: colors.accentOrangeLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sanskritBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.06)',
    borderLeftWidth: 3.5,
    borderLeftColor: colors.ring,
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(10),
  },
  sanskritText: {
    fontSize: fs(14.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(22),
    fontWeight: '600',
    textAlign: 'left',
  },
  translationBox: {
    backgroundColor: 'rgba(247, 241, 229, 0.6)',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    marginBottom: scale(8),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  meaningBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(6),
    marginBottom: scale(6),
  },
  meaningBadgeText: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  translationText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(18),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: scale(4),
  },
  expandPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  actionText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '600',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(24),
  },
  emptyLotus: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    opacity: 0.8,
    marginBottom: scale(14),
  },
  emptyStateTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: scale(4),
  },
  emptyStateDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.2,
    shadowRadius: scale(6),
    elevation: 8,
    zIndex: 99999,
  },
  toastText: {
    color: colors.white,
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(13),
    fontWeight: '600',
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
  modalCloseIconBtn: {
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
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: colors.accentOrangeLight,
    borderWidth: 2,
    borderColor: colors.ring,
    overflow: 'hidden',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  modalDeityImage: {
    width: '100%',
    height: '100%',
  },
  modalShlokTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
  modalShlokSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
    marginTop: scale(2),
    marginBottom: scale(8),
  },
  modalScroll: {
    width: '100%',
    maxHeight: scale(280),
    marginVertical: scale(8),
  },
  modalScrollContent: {
    paddingVertical: scale(4),
  },
  modalSanskritBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderRadius: scale(14),
    padding: scale(16),
    alignItems: 'center',
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: colors.accentOrangeBorder,
  },
  modalOrnament: {
    fontSize: fs(14),
    color: colors.ring,
    fontWeight: '700',
    marginBottom: scale(6),
  },
  modalSanskritText: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(25),
    textAlign: 'center',
    fontWeight: '600',
  },
  modalTranslationBox: {
    backgroundColor: 'rgba(247, 241, 229, 0.7)',
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  meaningHeaderBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  modalTranslationText: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(20),
    textAlign: 'center',
  },
  modalActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scale(12),
    gap: scale(10),
  },
  modalActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(42),
    borderRadius: scale(21),
    borderWidth: 1.5,
    borderColor: colors.ring,
    backgroundColor: colors.white,
    gap: scale(6),
  },
  modalShareBtn: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  modalActionBtnText: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '600',
    color: colors.ring,
  },
});
