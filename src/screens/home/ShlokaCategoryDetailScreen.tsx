import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Share,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors, { cardGradients } from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  GradientBackground,
  ScreenHeader,
  BlurBackdrop,
  AnimatedListItem,
} from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import {
  CloseIcon,
  CopyIcon,
  ShareIcon,
  SunriseIcon,
  ShieldCrossIcon,
  CoinsIcon,
  BookStudyIcon,
  HomeFamilyIcon,
  ChildrenIcon,
  LotusSpiritualIcon,
  OmIcon,
  HeartIcon,
  SunIcon,
} from '@components/icons/SvgIcons';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets/index';
import {
  getShlokaCategoryDetail,
  ShlokaCategoryDetail,
  ShlokaSubItem,
  STATIC_SHLOKA_CATEGORIES_DATA,
} from '@services/firebaseServices/shlokaService';
import { ShlokaCategory } from '@constants/shlokData';

export const ShlokaCategoryDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t, isHindi } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  const categoryParam: ShlokaCategory = route.params?.category || {
    id: 'occasion-through-the-day',
    slug: 'through-the-day',
    title: Translation.SHLOK_CAT_THROUGH_THE_DAY,
    imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
    path: '/shloka/prayers/through-the-day.htm',
  };

  const [categoryData, setCategoryData] = useState<ShlokaCategoryDetail>(() => {
    const slug = (categoryParam.slug || 'through-the-day').replace(
      'occasion-',
      '',
    );
    return (
      STATIC_SHLOKA_CATEGORIES_DATA[slug] ||
      STATIC_SHLOKA_CATEGORIES_DATA['through-the-day']
    );
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ShlokaSubItem | null>(null);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const slug = categoryParam.slug || categoryParam.id || 'through-the-day';
    getShlokaCategoryDetail(slug)
      .then(data => {
        if (data) {
          setCategoryData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [categoryParam]);

  const screenTitle = categoryParam.title
    ? t(categoryParam.title)
    : isHindi
    ? categoryData.titleHi
    : categoryData.titleEn;

  const screenDesc = isHindi
    ? categoryData.descriptionHi
    : categoryData.descriptionEn;

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setCopiedToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setCopiedToast(null);
    }, 2200);
  };

  const handleCopyShlok = (item: ShlokaSubItem) => {
    triggerHaptic();
    showToast(t(Translation.SHLOK_COPIED_TOAST));
  };

  const handleShareShlok = async (item: ShlokaSubItem) => {
    triggerHaptic();
    const itemName = isHindi
      ? item.headerTitleHi || item.nameHi
      : item.headerTitleEn || item.nameEn;
    const meaning = isHindi ? item.meaningHi : item.meaningEn;

    const fullContent = `🌸 ${itemName} 🌸\n\n${item.sanskrit}\n\n${
      meaning ? `॥ ${t(Translation.SHLOK_MEANING_LABEL)} ॥\n${meaning}\n\n` : ''
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

  const handleCardPress = (item: ShlokaSubItem) => {
    triggerHaptic();
    navigation.navigate('ShlokaVerseListScreen', {
      subcategory: item,
      category: categoryParam,
    });
  };

  // Responsive Grid Calculations (2 cols on phones, 3 cols on tablets)
  const isTablet = windowWidth >= 600;
  const numColumns = isTablet ? 3 : 2;
  const horizontalPadding = scale(16);
  const gap = scale(10);
  const totalGapWidth = gap * (numColumns - 1);
  const availableWidth = windowWidth - horizontalPadding * 2 - totalGapWidth;
  const cardWidth = Math.floor(availableWidth / numColumns);
  const cardHeight = scale(62);
  const imageWidth = scale(58);

  const categoryImageUri = categoryParam.imageUrl || categoryData.imageUrl;
  const categoryImageSource = categoryImageUri
    ? { uri: categoryImageUri }
    : imagePath.shlok || imagePath.Vishnu;

  const renderCategoryIcon = () => {
    const slug = (
      categoryParam.slug ||
      categoryData.slug ||
      'through-the-day'
    ).replace('occasion-', '');
    const iconSize = scale(24);

    switch (slug) {
      case 'through-the-day':
        return <SunriseIcon size={iconSize} color="#F59E0B" />;
      case 'health-and-protection':
        return <ShieldCrossIcon size={iconSize} color="#10B981" />;
      case 'money-work-studies':
        return <CoinsIcon size={iconSize} color="#D97706" />;
      case 'study-success':
        return <BookStudyIcon size={iconSize} color="#3B82F6" />;
      case 'home-and-family':
        return <HomeFamilyIcon size={iconSize} color="#10B981" />;
      case 'children':
        return <ChildrenIcon size={iconSize} color="#B45309" />;
      case 'mind-and-heart':
        return <HeartIcon size={iconSize} color="#EF4444" />;
      case 'spiritual-path':
        return <OmIcon size={iconSize} color="#D97706" />;
      default:
        return <SunriseIcon size={iconSize} color="#F59E0B" />;
    }
  };

  const renderSubItemCard = ({
    item,
    index,
  }: {
    item: ShlokaSubItem;
    index: number;
  }) => {
    const itemName = isHindi ? item.nameHi : item.nameEn;
    const hasError = imageErrors[item.id];
    const imageSource =
      !hasError && categoryImageUri
        ? { uri: categoryImageUri }
        : item.imageUrl
        ? { uri: item.imageUrl }
        : item.image
        ? item.image
        : categoryImageSource;

    return (
      <AnimatedListItem index={index} delayStep={35}>
        <TouchableOpacity
          style={styles.cardContainer}
          activeOpacity={0.82}
          onPress={() => handleCardPress(item)}
        >
          {/* Left Thumbnail Image */}
          <View style={[styles.imageContainer, { width: imageWidth }]}>
            <Image
              source={imageSource}
              style={styles.cardThumbImage}
              resizeMode="cover"
              onError={() => handleImageError(item.id)}
            />
          </View>

          {/* Right Subcategory Title */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitleText} numberOfLines={2}>
              {itemName}
            </Text>
          </View>
        </TouchableOpacity>
      </AnimatedListItem>
    );
  };

  const renderSkeletonList = () => {
    return (
      <View style={styles.skeletonList}>
        {[1, 2, 3, 4, 5, 6].map(index => (
          <View key={`shlok_skel_${index}`} style={styles.cardContainer}>
            <Skeleton width={imageWidth} height="100%" borderRadius={0} />
            <View
              style={[styles.textContainer, { paddingHorizontal: scale(14) }]}
            >
              <Skeleton
                width="70%"
                height={fs(14)}
                borderRadius={scale(4)}
                style={{ marginBottom: scale(6) }}
              />
              <Skeleton width="45%" height={fs(10)} borderRadius={scale(3)} />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Navigation Screen Header */}
        <ScreenHeader title={screenTitle} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: Math.max(insets.bottom, scale(16)) + scale(30),
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Banner with Category Svg Icon & Description */}
          <View style={styles.headerBanner}>
            <View style={styles.bannerTitleRow}>
              {renderCategoryIcon()}
              {/* <Text style={styles.bannerTitle}>{screenTitle}</Text> */}
            </View>
            {screenDesc ? (
              <Text style={styles.bannerDesc}>{screenDesc}</Text>
            ) : null}
          </View>

          {/* Subcategories Vertical List */}
          {loading ? (
            renderSkeletonList()
          ) : categoryData?.items && categoryData.items.length > 0 ? (
            <FlatList
              data={categoryData.items}
              renderItem={renderSubItemCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Image source={imagePath.lotus} style={styles.emptyLotus} />
              <Text style={styles.emptyStateTitle}>
                {t(Translation.SHLOK_NO_FOUND_TITLE)}
              </Text>
              <Text style={styles.emptyStateDesc}>
                {t(Translation.SHLOK_NO_FOUND_DESC)}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Full Shlok Detail Modal */}
      {selectedItem && (
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedItem(null)}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setSelectedItem(null)}
          >
            <BlurBackdrop />
          </TouchableOpacity>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalCard,
                {
                  maxHeight: '82%',
                  paddingBottom: Math.max(insets.bottom, scale(16)),
                },
              ]}
            >
              {/* Modal Header */}
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalHeaderTitleCol}>
                  <Text style={styles.modalItemTitle} numberOfLines={2}>
                    {isHindi
                      ? selectedItem.headerTitleHi || selectedItem.nameHi
                      : selectedItem.headerTitleEn || selectedItem.nameEn}
                  </Text>
                  {(selectedItem.subtitleHi || selectedItem.subtitleEn) && (
                    <Text style={styles.modalItemSubtitle} numberOfLines={2}>
                      {isHindi
                        ? selectedItem.subtitleHi
                        : selectedItem.subtitleEn}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  activeOpacity={0.7}
                  onPress={() => setSelectedItem(null)}
                >
                  <CloseIcon size={scale(18)} color={colors.secondary} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScrollView}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Sanskrit Verses Box */}
                <View style={styles.sanskritBox}>
                  <Text style={styles.sanskritText}>
                    {selectedItem.sanskrit}
                  </Text>
                </View>

                {/* Meaning Box */}
                <View style={styles.meaningBox}>
                  <View style={styles.meaningBadge}>
                    <Text style={styles.meaningBadgeText}>
                      {t(Translation.SHLOK_MEANING_LABEL)}
                    </Text>
                  </View>
                  <Text style={styles.meaningText}>
                    {isHindi ? selectedItem.meaningHi : selectedItem.meaningEn}
                  </Text>
                </View>

                {/* Actions Row */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    activeOpacity={0.8}
                    onPress={() => handleCopyShlok(selectedItem)}
                  >
                    <CopyIcon size={scale(16)} color={colors.ring} />
                    <Text style={styles.actionBtnText}>
                      {t(Translation.SHLOK_COPY_ACTION)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, styles.shareBtn]}
                    activeOpacity={0.8}
                    onPress={() => handleShareShlok(selectedItem)}
                  >
                    <ShareIcon size={scale(16)} color={colors.white} />
                    <Text
                      style={[styles.actionBtnText, { color: colors.white }]}
                    >
                      {t(Translation.SHLOK_SHARE_ACTION)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Floating Copied Toast */}
      {copiedToast && (
        <View
          style={[styles.toastContainer, { bottom: insets.bottom + scale(30) }]}
        >
          <Text style={styles.toastText}>{copiedToast}</Text>
        </View>
      )}
    </GradientBackground>
  );
};

export default ShlokaCategoryDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  headerBanner: {
    paddingVertical: scale(12),
    marginBottom: scale(14),
  },
  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(6),
  },
  bannerTitle: {
    fontSize: fs(20),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.black,
  },
  bannerDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
    lineHeight: fs(18),
  },
  cardContainer: {
    width: '100%',
    height: scale(64),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardOverlay,
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.08,
        shadowRadius: scale(4),
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    height: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: scale(14),
    borderBottomLeftRadius: scale(14),
  },
  cardThumbImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,

    color: colors.secondary,
    lineHeight: fs(19),
  },
  skeletonList: {
    gap: scale(10),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
  },
  emptyLotus: {
    width: scale(70),
    height: scale(70),
    opacity: 0.6,
    marginBottom: scale(12),
  },
  emptyStateTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: scale(4),
  },
  emptyStateDesc: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    paddingHorizontal: scale(18),
    paddingTop: scale(18),
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: scale(12),
    paddingBottom: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalHeaderTitleCol: {
    flex: 1,
    paddingRight: scale(10),
  },
  modalItemTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    lineHeight: fs(21),
  },
  modalItemSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
    marginTop: scale(2),
  },
  modalCloseBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.accentOrangeLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScrollView: {
    marginTop: scale(4),
  },
  modalScrollContent: {
    paddingBottom: scale(12),
  },
  sanskritBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: colors.ring,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(14),
    marginBottom: scale(14),
  },
  sanskritText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(24),
    fontWeight: '600',
    textAlign: 'left',
  },
  meaningBox: {
    backgroundColor: 'rgba(247, 241, 229, 0.7)',
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  meaningBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 148, 55, 0.18)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(6),
    marginBottom: scale(6),
  },
  meaningBadgeText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  meaningText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(19),
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingTop: scale(6),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(40),
    borderRadius: scale(20),
    borderWidth: 1.5,
    borderColor: colors.ring,
    backgroundColor: colors.white,
    gap: scale(6),
  },
  shareBtn: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  actionBtnText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '600',
    color: colors.ring,
  },
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(30, 27, 24, 0.94)',
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scale(4) },
        shadowOpacity: 0.3,
        shadowRadius: scale(6),
      },
      android: {
        elevation: 6,
      },
    }),
  },
  toastText: {
    color: colors.white,
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '600',
  },
});
