import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
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
import Video from 'react-native-video';
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
} from '@assets/SvgIcons';
import { ShlokaSubItem, ShlokaVerse, ShlokaCategory } from '@api/shlokaApi';

// Sub-components
import ShlokaVerseCard from './components/ShlokaVerseCard';

const FALLBACK_SUBCATEGORY: ShlokaSubItem = {
  id: '',
  nameEn: '',
  nameHi: '',
  headerTitleEn: '',
  headerTitleHi: '',
  verses: [],
};

export const ShlokaVerseListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { t, isHindi } = useAppLanguage();

  const subcategory: ShlokaSubItem = useMemo(() => {
    return route.params?.subcategory || FALLBACK_SUBCATEGORY;
  }, [route.params?.subcategory]);

  const categoryParam: ShlokaCategory = useMemo(() => {
    return route.params?.category || { id: '', slug: '', imageUrl: '' };
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
  }, [
    isHindi,
    subcategory.headerTitleHi,
    subcategory.nameHi,
    subcategory.headerTitleEn,
    subcategory.nameEn,
  ]);

  const screenDesc = useMemo(() => {
    return isHindi
      ? subcategory.descriptionHi || subcategory.subtitleHi
      : subcategory.descriptionEn || subcategory.subtitleEn;
  }, [
    isHindi,
    subcategory.descriptionHi,
    subcategory.subtitleHi,
    subcategory.descriptionEn,
    subcategory.subtitleEn,
  ]);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setCopiedToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setCopiedToast(null);
    }, 2200);
  }, []);

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
        return (
          <ShieldCrossIcon size={iconSize} color={colors.categoryEmerald} />
        );
      case 'money-work-studies':
        return <CoinsIcon size={iconSize} color={colors.categoryBronze} />;
      case 'study-success':
        return <BookStudyIcon size={iconSize} color={colors.categoryBlue} />;
      case 'home-and-family':
        return (
          <HomeFamilyIcon size={iconSize} color={colors.categoryEmerald} />
        );
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

  const videoRef = useRef<any>(null);
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setPlayingVerseId(null);
    };
  }, []);

  const handlePlayPauseVerse = useCallback(
    (verse: ShlokaVerse) => {
      if (playingVerseId === verse.id) {
        setPlayingVerseId(null);
        return;
      }

      const audioUrl = verse.audioUrl || verse.link;
      if (!audioUrl || !audioUrl.trim()) {
        triggerHaptic();
        showToast(
          isHindi
            ? 'इस श्लोक का ऑडियो उपलब्ध नहीं है'
            : 'Audio not available for this shloka',
        );
        return;
      }

      triggerHaptic();
      videoRef.current?.seek(0);
      setPlayingVerseId(verse.id);
    },
    [playingVerseId, isHindi, showToast],
  );

  const activeAudioUrl = useMemo(() => {
    if (!playingVerseId) return '';
    const currentVerse = verses.find(v => v.id === playingVerseId);
    return currentVerse?.audioUrl || currentVerse?.link || '';
  }, [playingVerseId, verses]);

  const renderVerseCard = useCallback(
    ({ item, index }: ListRenderItemInfo<ShlokaVerse>) => (
      <ShlokaVerseCard
        item={item}
        index={index}
        isPlaying={playingVerseId === item.id}
        onPlayPause={handlePlayPauseVerse}
        onCopy={handleCopyVerse}
        onShare={handleShareVerse}
      />
    ),
    [handleCopyVerse, handleShareVerse, handlePlayPauseVerse, playingVerseId],
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
        {screenDesc ? (
          <Text style={styles.bannerDesc}>{screenDesc}</Text>
        ) : null}
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

      {/* Persistent Audio Engine */}
      {activeAudioUrl ? (
        <Video
          ref={videoRef}
          source={{ uri: activeAudioUrl }}
          paused={playingVerseId === null}
          volume={1.0}
          repeat={false}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onEnd={() => {
            setPlayingVerseId(null);
            videoRef.current?.seek(0);
          }}
          onError={error => {
            console.warn('[ShlokaAudio] Playback error:', error);
            setPlayingVerseId(null);
            showToast(
              isHindi ? 'ऑडियो चलाने में त्रुटि हुई' : 'Unable to play audio',
            );
          }}
          style={styles.hiddenAudio}
        />
      ) : null}

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
  hiddenAudio: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
});
