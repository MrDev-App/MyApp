import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Share,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { GradientBackground, ScreenHeader } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import {
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

// Sub-components
import ShlokaVerseCard from './components/ShlokaVerseCard';

export const ShlokaVerseListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { t, isHindi } = useAppLanguage();

  const subcategory: ShlokaSubItem = useMemo(() => {
    return (
      route.params?.subcategory || {
        id: 'on-waking',
        nameEn: 'Shlokas for Waking Up',
        nameHi: 'प्रातः जागरण श्लोक',
        headerTitleEn: 'Shlokas for Waking Up',
        headerTitleHi: 'प्रातः जागरण श्लोक',
        descriptionEn:
          'The very first moment of waking is a chance to begin the day with God rather than with our worries. These verses greet the morning — gazing at the palms of the hands, waking the Lord, remembering Ganesha and the gods. Chant these prayers quietly before you rise, so the day starts in gratitude.',
        descriptionHi:
          'प्रातः जागरण का प्रथम क्षण चिंताओं के स्थान पर प्रभु स्मरण से दिन की शुरुआत करने का पावन अवसर है। शय्या त्यागने से पूर्व हथेलियों के दर्शन, प्रभु जागरण व नवप्रभात के इन श्लोकों का स्मरण कर दिन का शुभारंभ कृतज्ञता से करें।',
      }
    );
  }, [route.params?.subcategory]);

  const categoryParam: ShlokaCategory = useMemo(() => {
    return route.params?.category || {};
  }, [route.params?.category]);

  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // If subcategory has explicit verses array, use it; otherwise fallback to single verse from subcategory
  const verses: ShlokaVerse[] = useMemo(() => {
    if (subcategory.verses && subcategory.verses.length > 0) {
      return subcategory.verses;
    }
    return [
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
  }, [subcategory]);

  const screenTitle = useMemo(() => {
    return isHindi
      ? subcategory.headerTitleHi || subcategory.nameHi
      : subcategory.headerTitleEn || subcategory.nameEn;
  }, [isHindi, subcategory.headerTitleHi, subcategory.nameHi, subcategory.headerTitleEn, subcategory.nameEn]);

  const screenDesc = useMemo(() => {
    return isHindi
      ? subcategory.descriptionHi || subcategory.subtitleHi
      : subcategory.descriptionEn || subcategory.subtitleEn;
  }, [isHindi, subcategory.descriptionHi, subcategory.subtitleHi, subcategory.descriptionEn, subcategory.subtitleEn]);

  const showToast = useCallback(
    (message: string) => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setCopiedToast(message);
      toastTimeoutRef.current = setTimeout(() => {
        setCopiedToast(null);
      }, 2200);
    },
    [],
  );

  const handleCopyVerse = useCallback(
    (_: ShlokaVerse) => {
      triggerHaptic();
      showToast(t(Translation.SHLOK_COPIED_TOAST));
    },
    [showToast, t],
  );

  const handleShareVerse = useCallback(
    async (verse: ShlokaVerse) => {
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
    },
    [isHindi, t],
  );

  const categoryIcon = useMemo(() => {
    const slug = (
      categoryParam.slug ||
      categoryParam.id ||
      'through-the-day'
    ).replace('occasion-', '');
    const iconSize = scale(24);

    switch (slug) {
      case 'through-the-day':
        return <SunriseIcon size={iconSize} color={colors.categoryAmber} />;
      case 'health-and-protection':
        return <ShieldCrossIcon size={iconSize} color={colors.categoryEmerald} />;
      case 'money-work-studies':
        return <CoinsIcon size={iconSize} color={colors.categoryBronze} />;
      case 'study-success':
        return <BookStudyIcon size={iconSize} color={colors.categoryBlue} />;
      case 'home-and-family':
        return <HomeFamilyIcon size={iconSize} color={colors.categoryEmerald} />;
      case 'children':
        return <ChildrenIcon size={iconSize} color={colors.categoryBrown} />;
      case 'mind-and-heart':
        return <HeartIcon size={iconSize} color={colors.categoryRed} />;
      case 'spiritual-path':
        return <OmIcon size={iconSize} color={colors.categoryBronze} />;
      default:
        return <SunriseIcon size={iconSize} color={colors.categoryAmber} />;
    }
  }, [categoryParam.slug, categoryParam.id]);

  const renderVerseCard = useCallback(
    ({ item, index }: ListRenderItemInfo<ShlokaVerse>) => (
      <ShlokaVerseCard
        item={item}
        index={index}
        onCopy={handleCopyVerse}
        onShare={handleShareVerse}
      />
    ),
    [handleCopyVerse, handleShareVerse],
  );

  const keyExtractor = useCallback(
    (item: ShlokaVerse, index: number) => item.id || `verse_${index}`,
    [],
  );

  const listHeaderComponent = useMemo(
    () => (
      <View style={styles.headerBanner}>
        <View style={styles.bannerTitleRow}>
          {categoryIcon}
          <Text style={styles.bannerTitle}>{screenTitle}</Text>
        </View>
        {screenDesc ? <Text style={styles.bannerDesc}>{screenDesc}</Text> : null}
      </View>
    ),
    [categoryIcon, screenTitle, screenDesc],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.listContent,
      {
        paddingBottom: Math.max(insets.bottom, scale(16)) + scale(30),
      },
    ],
    [insets.bottom],
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
          keyExtractor={keyExtractor}
          ListHeaderComponent={listHeaderComponent}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
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

export default React.memo(ShlokaVerseListScreen);

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
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.toastBg,
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.toastBorder,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
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
