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
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Back } from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  Category,
  CategoryItem,
  getCategoriesData,
} from '@services/categoriesService';
import { categoriesData } from '@constants/categoriesData';

const DEFAULT_SHLOK_CATEGORY: Category = (categoriesData.find(c =>
  c.id.toLowerCase().includes('shlok'),
) ||
  categoriesData[1] ||
  categoriesData[0]) as unknown as Category;

const ShlokScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isHindi = currentLanguage.startsWith('hi');

  const initialCategory: Category =
    (route.params?.category as Category) || DEFAULT_SHLOK_CATEGORY;

  const [category, setCategory] = useState<Category>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadFreshCategory = async () => {
      try {
        const freshData = await getCategoriesData();
        const freshShlok = freshData.find(c =>
          c.id.toLowerCase().includes('shlok'),
        );
        if (freshShlok && isMounted) {
          setCategory(freshShlok);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadFreshCategory();
    return () => {
      isMounted = false;
    };
  }, []);

  const screenTitle = isHindi ? 'श्लोक संग्रह' : 'Sacred Shlokas';
  const screenDesc = isHindi
    ? category.descriptionHi ||
      'आध्यात्मिक ज्ञान और दिव्य ऊर्जा से ओत-प्रोत पवित्र संस्कृत श्लोक।'
    : category.descriptionEn ||
      'Sacred Sanskrit verses holding spiritual wisdom and divine vibrations.';

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

  const renderModalCard = (item: CategoryItem) => {
    const { sanskritText, translationText } = parseShlokText(item);
    const itemName = isHindi
      ? item.headerTitleHi || item.nameHi
      : item.headerTitleEn || item.nameEn;
    const itemSub = isHindi ? item.subtitleHi : item.subtitleEn;

    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
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
          <Text style={styles.modalShlokTitle} numberOfLines={1}>
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
              <Text style={styles.modalSanskritText}>{sanskritText}</Text>
            </View>

            {translationText ? (
              <View style={styles.modalTranslationBox}>
                <Text style={styles.modalTranslationTitle}>
                  {isHindi ? '॥ भावार्थ ॥' : '॥ Meaning ॥'}
                </Text>
                <Text style={styles.modalTranslationText}>
                  {translationText}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.modalBottomCloseBtn}
            activeOpacity={0.8}
            onPress={() => setSelectedItem(null)}
          >
            <Text style={styles.modalBottomCloseText}>
              {isHindi ? 'बंद करें' : 'Close'}
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
        activeOpacity={0.88}
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
                {isHindi ? 'अर्थ / भावार्थ' : 'Meaning'}
              </Text>
            </View>
            <Text style={styles.translationText}>{translationText}</Text>
          </View>
        ) : null}

        {/* Card Footer action */}
        <View style={styles.cardFooter}>
          <Text style={styles.actionText}>
            {isHindi ? 'विस्तार से पढ़ें →' : 'Read in detail →'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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

        {/* Shlok List */}
        <View style={styles.contentContainer}>
          <FlatList
            data={category.items || []}
            renderItem={renderShlokItem}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + scale(24) },
            ]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>

      {/* Shlok Detail Popup with Native Blur Backdrop (Hardware Accelerated & Smooth on both iOS & Android) */}
      <Modal
        visible={selectedItem !== null}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={12}
            blurRadius={8}
            overlayColor="rgba(0, 0, 0, 0.45)"
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.65)"
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setSelectedItem(null)}
          />
          <View
            style={[
              styles.modalBackdrop,
              {
                paddingTop: insets.top + scale(18),
                paddingBottom: insets.bottom + scale(18),
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
  shlokCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(6),
    elevation: 2,
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
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.ring,
    backgroundColor: colors.primary,
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
    color: colors.secondary,
    fontWeight: '700',
  },
  shlokSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginTop: scale(1),
  },
  sanskritBox: {
    backgroundColor: colors.primary,
    borderRadius: scale(12),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    marginBottom: scale(10),
  },
  sanskritText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(24),
    fontWeight: '600',
  },
  translationBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.04)',
    borderRadius: scale(10),
    padding: scale(12),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: scale(8),
  },
  meaningBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentOrangeBg,
    borderRadius: scale(6),
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginBottom: scale(6),
  },
  meaningBadgeText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  translationText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(18),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scale(4),
  },
  actionText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    elevation: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  modalContainer: {
    width: '100%',
    maxHeight: '88%',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: scale(24),
    padding: scale(18),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: scale(4),
  },
  modalCloseButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalCloseText: {
    fontSize: fs(14),
    color: colors.secondary,
    fontWeight: '600',
  },
  modalImageWrapper: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    marginBottom: scale(10),
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
  modalShlokTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: scale(2),
  },
  modalShlokSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    marginBottom: scale(10),
  },
  modalScroll: {
    width: '100%',
    maxHeight: scale(300),
  },
  modalScrollContent: {
    paddingVertical: scale(4),
  },
  modalSanskritBox: {
    backgroundColor: colors.primary,
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    marginBottom: scale(12),
  },
  modalSanskritText: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(26),
    fontWeight: '600',
  },
  modalTranslationBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.05)',
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalTranslationTitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: scale(6),
  },
  modalTranslationText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(20),
    textAlign: 'center',
  },
  modalBottomCloseBtn: {
    marginTop: scale(14),
    width: '100%',
    backgroundColor: colors.ring,
    borderRadius: scale(14),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBottomCloseText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    fontWeight: '700',
  },
});
