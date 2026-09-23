import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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
import { GradientBackground, ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import {
  CopyIcon,
  ShareIcon,
  SunriseIcon,
  OmIcon,
  ShieldCrossIcon,
  CoinsIcon,
  BookStudyIcon,
  HomeFamilyIcon,
  ChildrenIcon,
  HeartIcon,
} from '@components/icons/SvgIcons';
import {
  ShlokaSubItem,
  ShlokaVerse,
} from '@services/firebaseServices/shlokaService';
import { ShlokaCategory } from '@constants/shlokData';

export const ShlokaVerseListScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t, isHindi } = useAppLanguage();
  const { width: windowWidth } = useWindowDimensions();

  const subcategory: ShlokaSubItem = route.params?.subcategory || {
    id: 'on-waking',
    nameEn: 'Shlokas for Waking Up',
    nameHi: 'प्रातः जागरण श्लोक',
    headerTitleEn: 'Shlokas for Waking Up',
    headerTitleHi: 'प्रातः जागरण श्लोक',
    descriptionEn:
      'The very first moment of waking is a chance to begin the day with God rather than with our worries. These verses greet the morning — gazing at the palms of the hands, waking the Lord, remembering Ganesha and the gods. Chant these prayers quietly before you rise, so the day starts in gratitude.',
    descriptionHi:
      'प्रातः जागरण का प्रथम क्षण चिंताओं के स्थान पर प्रभु स्मरण से दिन की शुरुआत करने का पावन अवसर है। शय्या त्यागने से पूर्व हथेलियों के दर्शन, प्रभु जागरण व नवप्रभात के इन श्लोकों का स्मरण कर दिन का शुभारंभ कृतज्ञता से करें।',
  };

  const categoryParam: ShlokaCategory = route.params?.category || {};

  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  // If subcategory has explicit verses array, use it; otherwise fallback to single verse from subcategory
  const verses: ShlokaVerse[] =
    subcategory.verses && subcategory.verses.length > 0
      ? subcategory.verses
      : [
          {
            id: subcategory.id,
            title: subcategory.headerTitleEn || subcategory.nameEn,
            titleHi: subcategory.headerTitleHi || subcategory.nameHi,
            sanskrit: subcategory.sanskrit || '',
            meaningEn: subcategory.meaningEn || '',
            meaningHi: subcategory.meaningHi || '',
            translationEn: subcategory.meaningEn || '',
            translationHi: subcategory.meaningHi || '',
            deity: subcategory.deity,
            image: subcategory.image,
          },
        ];

  const screenTitle = isHindi
    ? subcategory.headerTitleHi || subcategory.nameHi
    : subcategory.headerTitleEn || subcategory.nameEn;

  const screenDesc = isHindi
    ? subcategory.descriptionHi || subcategory.subtitleHi
    : subcategory.descriptionEn || subcategory.subtitleEn;

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setCopiedToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setCopiedToast(null);
    }, 2200);
  };

  const handleCopyVerse = (verse: ShlokaVerse) => {
    triggerHaptic();
    showToast(t(Translation.SHLOK_COPIED_TOAST));
  };

  const handleShareVerse = async (verse: ShlokaVerse) => {
    triggerHaptic();
    const verseTitle = isHindi ? verse.titleHi || verse.title : verse.title;
    const translation = isHindi
      ? verse.translationHi || verse.meaningHi
      : verse.translationEn || verse.meaningEn;

    const fullContent = `🌸 ${verseTitle} 🌸\n\n${verse.sanskrit}\n\n${
      verse.transliteration ? `📖 ${verse.transliteration}\n\n` : ''
    }${
      translation
        ? `॥ ${t(Translation.SHLOK_MEANING_LABEL)} ॥\n${translation}\n\n`
        : ''
    }✨ Shared via GuruVani App`;

    try {
      await Share.share({
        message: fullContent,
        title: verseTitle,
      });
    } catch (err) {
      console.warn('Share error:', err);
    }
  };

  const renderCategoryIcon = () => {
    const slug = (
      categoryParam.slug ||
      categoryParam.id ||
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

  const renderVerseCard = ({
    item,
    index,
  }: {
    item: ShlokaVerse;
    index: number;
  }) => {
    const verseTitle = isHindi ? item.titleHi || item.title : item.title;
    const translation = isHindi
      ? item.translationHi || item.meaningHi
      : item.translationEn || item.meaningEn;

    return (
      <View style={styles.verseCard}>
        {/* Card Header with Verse Index & Title */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.indexBadge}>
            <Text style={styles.indexBadgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.verseTitle} numberOfLines={2}>
            {verseTitle}
          </Text>
        </View>

        {/* Sanskrit Devanagari Verses Box */}
        <View style={styles.sanskritBox}>
          <Text style={styles.sanskritText}>{item.sanskrit}</Text>
        </View>

        {/* Transliteration Box (if available) */}
        {item.transliteration ? (
          <View style={styles.transliterationBox}>
            <Text style={styles.transliterationLabel}>Transliteration</Text>
            <Text style={styles.transliterationText}>
              {item.transliteration}
            </Text>
          </View>
        ) : null}

        {/* Translation / Meaning Box */}
        {translation ? (
          <View style={styles.translationBox}>
            <View style={styles.translationBadge}>
              <Text style={styles.translationBadgeText}>
                {t(Translation.SHLOK_MEANING_LABEL)}
              </Text>
            </View>
            <Text style={styles.translationText}>{translation}</Text>
          </View>
        ) : null}

        {/* Action Buttons: Copy & Share */}
        <View style={styles.cardActionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={() => handleCopyVerse(item)}
          >
            <CopyIcon size={scale(15)} color={colors.ring} />
            <Text style={styles.actionBtnText}>
              {t(Translation.SHLOK_COPY_ACTION)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.shareBtn]}
            activeOpacity={0.8}
            onPress={() => handleShareVerse(item)}
          >
            <ShareIcon size={scale(15)} color={colors.white} />
            <Text style={[styles.actionBtnText, { color: colors.white }]}>
              {t(Translation.SHLOK_SHARE_ACTION)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeaderComponent = () => (
    <View style={styles.headerBanner}>
      <View style={styles.bannerTitleRow}>
        {renderCategoryIcon()}
        <Text style={styles.bannerTitle}>{screenTitle}</Text>
      </View>
      {screenDesc ? <Text style={styles.bannerDesc}>{screenDesc}</Text> : null}
    </View>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Navigation Screen Header */}
        <ScreenHeader title={screenTitle} />

        {/* Verses List */}
        <FlatList
          data={verses}
          renderItem={renderVerseCard}
          keyExtractor={(item, index) => item.id || `verse_${index}`}
          ListHeaderComponent={renderHeaderComponent}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: Math.max(insets.bottom, scale(16)) + scale(30),
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

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

export default ShlokaVerseListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
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
    gap: scale(10),
    marginBottom: scale(8),
  },
  bannerTitle: {
    fontSize: fs(20),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.black,
    flex: 1,
  },
  bannerDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(19),
  },
  verseCard: {
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scale(3) },
        shadowOpacity: 0.1,
        shadowRadius: scale(6),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
    gap: scale(10),
  },
  indexBadge: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexBadgeText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.ring,
  },
  verseTitle: {
    flex: 1,
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    lineHeight: fs(22),
  },
  sanskritBox: {
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: colors.ring,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(12),
  },
  sanskritText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(24),
    fontWeight: '600',
    textAlign: 'left',
  },
  transliterationBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    marginBottom: scale(12),
  },
  transliterationLabel: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.warmTaupe,
    marginBottom: scale(4),
    textTransform: 'uppercase',
  },
  transliterationText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(18),
    fontStyle: 'italic',
  },
  translationBox: {
    backgroundColor: 'rgba(247, 241, 229, 0.7)',
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  translationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 148, 55, 0.18)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(6),
    marginBottom: scale(6),
  },
  translationBadgeText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  translationText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(19),
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingTop: scale(4),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(38),
    borderRadius: scale(19),
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
    fontSize: fs(12.5),
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
