import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Back } from '@assets/index';
import { CloseIcon } from '@components/icons/SvgIcons';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  Category,
  CategoryItem,
  getCategoriesData,
} from '@services/categoriesService';
import { categoriesData } from '@constants/categoriesData';

const DEFAULT_AARTI_CATEGORY: Category = (categoriesData.find(c =>
  c.id.toLowerCase().includes('aarti'),
) || categoriesData[0]) as unknown as Category;

const ArtiScreen = () => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : scale(44);
  const safeBottom = insets.bottom > 0 ? insets.bottom : scale(16);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isHindi = currentLanguage.startsWith('hi');
  const { width: windowWidth } = useWindowDimensions();

  const initialCategory: Category =
    (route.params?.category as Category) || DEFAULT_AARTI_CATEGORY;

  const [category, setCategory] = useState<Category>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadFreshCategory = async () => {
      try {
        const freshData = await getCategoriesData();
        const freshAarti = freshData.find(c =>
          c.id.toLowerCase().includes('aarti'),
        );
        if (freshAarti && isMounted) {
          setCategory(freshAarti);
        }
      } catch (e) {
        // Fallback to initial category
      }
    };
    loadFreshCategory();
    return () => {
      isMounted = false;
    };
  }, []);

  const screenTitle = isHindi ? 'आरती संग्रह' : 'Aarti Sangrah';
  const screenDesc = isHindi
    ? category.descriptionHi ||
      'देवी-देवताओं की स्तुति और आशीर्वाद प्राप्त करने के लिए पावन आरतियां।'
    : category.descriptionEn ||
      'Devotional prayers sung in praise of deities to invoke their blessings.';

  // Grid layout calculations for Aarti cards
  const padding = scale(16);
  const gap = scale(12);
  const cardWidth = (windowWidth - padding * 2 - gap) / 2;

  const renderAartiItem = ({ item }: { item: CategoryItem }) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const subtitle = isHindi ? item.subtitleHi : item.subtitleEn;

    return (
      <TouchableOpacity
        style={[styles.aartiCard, { width: cardWidth }]}
        activeOpacity={0.8}
        onPress={() => setSelectedItem(item)}
      >
        <View style={styles.aartiImageWrapper}>
          <Image
            source={item.image}
            style={styles.aartiImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.aartiName} numberOfLines={1}>
          {name}
        </Text>
        {subtitle ? (
          <Text style={styles.aartiSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
        <View style={styles.aartiCardAction}>
          <Text style={styles.aartiActionText}>
            {isHindi ? 'आरती पढ़ें →' : 'Read Aarti →'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {screenTitle}
        </Text>
        <View style={{ width: scale(34) }} />
      </View>

      {/* Description Banner */}
      {screenDesc ? (
        <View style={styles.descriptionBanner}>
          <Text style={styles.descriptionText}>{screenDesc}</Text>
        </View>
      ) : null}

      {/* Aarti Items 2-Column Grid */}
      <View style={styles.contentContainer}>
        <FlatList
          data={category.items || []}
          renderItem={renderAartiItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + scale(24) },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Full-Screen Aarti Detail Modal (Protected with SafeAreaView) */}
      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={[styles.modalFullScreen, { paddingTop: safeTop }]}>
          {selectedItem && (
            <View style={styles.modalBody}>
              {/* Fixed Close Button on top right */}
              <TouchableOpacity
                style={styles.modalHeaderCloseBtn}
                onPress={() => setSelectedItem(null)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CloseIcon
                  size={scale(16)}
                  color={colors.white}
                  strokeWidth={2.4}
                />
              </TouchableOpacity>

              {/* Fixed Deity Image & Aarti Title Header */}
              <View style={styles.modalHeaderSection}>
                {selectedItem.image && (
                  <View style={styles.modalImageWrapper}>
                    <Image
                      source={selectedItem.image}
                      style={styles.modalDeityImage}
                      resizeMode="cover"
                    />
                  </View>
                )}

                <Text style={styles.modalAartiTitle} numberOfLines={1}>
                  {isHindi
                    ? selectedItem.headerTitleHi || selectedItem.nameHi
                    : selectedItem.headerTitleEn || selectedItem.nameEn}
                </Text>

                {selectedItem.subtitleHi || selectedItem.subtitleEn ? (
                  <Text style={styles.modalAartiSubtitle} numberOfLines={1}>
                    {isHindi
                      ? selectedItem.subtitleHi || selectedItem.nameHi
                      : selectedItem.subtitleEn || selectedItem.nameEn}
                  </Text>
                ) : null}
              </View>

              {/* Scrollable Aarti Lyrics Card (Only this card scrolls) */}
              <View style={[styles.lyricsCard]}>
                <ScrollView
                  style={styles.lyricsScrollView}
                  contentContainerStyle={styles.lyricsScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.modalAartiLyrics}>
                    {selectedItem.textHi || selectedItem.textEn}
                  </Text>
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ArtiScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(8),
  },
  descriptionBanner: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  descriptionText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(17),
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    padding: scale(16),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(14),
  },
  aartiCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(6),
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  aartiImageWrapper: {
    width: scale(92),
    height: scale(92),
    borderRadius: scale(46),
    overflow: 'hidden',
    marginBottom: scale(8),
    borderWidth: 2,
    borderColor: colors.ring,
    backgroundColor: colors.primary,
  },
  aartiImage: {
    width: '100%',
    height: '100%',
  },
  aartiName: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: scale(2),
  },
  aartiSubtitle: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    marginBottom: scale(6),
  },
  aartiCardAction: {
    marginTop: scale(4),
  },
  aartiActionText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  modalFullScreen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  modalBody: {
    flex: 1,
    position: 'relative',
  },
  modalHeaderCloseBtn: {
    position: 'absolute',
    top: scale(6),
    right: scale(16),
    zIndex: 100,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  modalHeaderSection: {
    alignItems: 'center',
    paddingTop: scale(6),
    paddingBottom: scale(10),
    paddingHorizontal: scale(24),
  },
  modalImageWrapper: {
    width: scale(105),
    height: scale(105),
    borderRadius: scale(53),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    marginBottom: scale(8),
    backgroundColor: colors.primary,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modalDeityImage: {
    width: '100%',
    height: '100%',
  },
  modalAartiTitle: {
    fontSize: fs(19),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: scale(2),
  },
  modalAartiSubtitle: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
  },
  lyricsCard: {
    flex: 1,

    backgroundColor: colors.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.05,
    shadowRadius: scale(6),
    elevation: 2,
    overflow: 'hidden',
  },
  lyricsScrollView: {
    flex: 1,
  },
  lyricsScrollContent: {
    padding: scale(18),
  },
  modalAartiLyrics: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(27),
  },
  modalBottomBar: {
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    paddingBottom: scale(12),
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.primary,
  },
  modalBottomCloseBtn: {
    width: '100%',
    backgroundColor: colors.ring,
    borderRadius: scale(14),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  modalBottomCloseText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    fontWeight: '700',
  },
});
