import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import {
  CloseIcon,
  PlusIcon,
  MinusIcon,
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  RepeatIcon,
} from '@components/icons/SvgIcons';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { triggerHaptic } from '@helper/helper';
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

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 26;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_AARTI_DURATION = 240; // 4 minutes in seconds

export const ArtiScreen = () => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : scale(44);
  const safeBottom = insets.bottom > 0 ? insets.bottom : scale(16);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isHindi = currentLanguage.startsWith('hi');
  const { width: windowWidth } = useWindowDimensions();

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = Storage.getNumber(STORAGE_KEYS.AARTI_FONT_SIZE);
    return saved && saved >= MIN_FONT_SIZE && saved <= MAX_FONT_SIZE
      ? saved
      : DEFAULT_FONT_SIZE;
  });

  const initialCategory: Category =
    (route.params?.category as Category) || DEFAULT_AARTI_CATEGORY;

  const [category, setCategory] = useState<Category>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);

  // Audio Playback & Auto-scroll State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const duration = DEFAULT_AARTI_DURATION;
  const playbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const contentHeightRef = useRef(0);
  const scrollViewHeightRef = useRef(0);

  // Load fresh categories from service if available
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

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            if (isLooping) {
              return 0;
            }
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };
  }, [isPlaying, duration, isLooping]);

  // Synchronized Auto-scroll while playing
  useEffect(() => {
    if (
      isPlaying &&
      isAutoScroll &&
      contentHeightRef.current > scrollViewHeightRef.current &&
      scrollViewHeightRef.current > 0
    ) {
      const maxScroll =
        contentHeightRef.current - scrollViewHeightRef.current + scale(40);
      const progress = currentTime / duration;
      const targetY = progress * maxScroll;
      scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    }
  }, [currentTime, isPlaying, isAutoScroll, duration]);

  // Reset playback when modal is closed or opened with a new item
  const handleOpenAarti = (item: CategoryItem) => {
    triggerHaptic();
    setSelectedItem(item);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleCloseModal = () => {
    triggerHaptic();
    setIsPlaying(false);
    setCurrentTime(0);
    setSelectedItem(null);
  };

  const togglePlayPause = () => {
    triggerHaptic();
    setIsPlaying(prev => !prev);
  };

  const handleSeekBackward = () => {
    triggerHaptic();
    setCurrentTime(prev => Math.max(0, prev - 15));
  };

  const handleSeekForward = () => {
    triggerHaptic();
    setCurrentTime(prev => Math.min(duration, prev + 15));
  };

  const toggleLoop = () => {
    triggerHaptic();
    setIsLooping(prev => !prev);
  };

  const toggleAutoScroll = () => {
    triggerHaptic();
    setIsAutoScroll(prev => !prev);
  };

  const increaseFontSize = () => {
    triggerHaptic();
    setFontSize(prev => {
      const next = Math.min(MAX_FONT_SIZE, prev + 2);
      Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, next);
      return next;
    });
  };

  const decreaseFontSize = () => {
    triggerHaptic();
    setFontSize(prev => {
      const next = Math.max(MIN_FONT_SIZE, prev - 2);
      Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, next);
      return next;
    });
  };

  const resetFontSize = () => {
    triggerHaptic();
    setFontSize(DEFAULT_FONT_SIZE);
    Storage.set(STORAGE_KEYS.AARTI_FONT_SIZE, DEFAULT_FONT_SIZE);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder
      .toString()
      .padStart(2, '0')}`;
  };

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

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const renderAartiItem = ({ item }: { item: CategoryItem }) => {
    const name = isHindi ? item.nameHi : item.nameEn;
    const subtitle = isHindi ? item.subtitleHi : item.subtitleEn;

    return (
      <TouchableOpacity
        style={[styles.aartiCard, { width: cardWidth }]}
        activeOpacity={0.8}
        onPress={() => handleOpenAarti(item)}
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

      {/* Full-Screen Aarti Detail & Audio Modal */}
      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseModal}
      >
        <View style={[styles.modalFullScreen, { paddingTop: safeTop }]}>
          {selectedItem && (
            <View style={styles.modalBody}>
              {/* Top Action Bar: Font Size Adjuster (Left) & Close Button (Right) */}
              <View style={styles.modalTopBar}>
                <View style={styles.fontSizeControlPill}>
                  <TouchableOpacity
                    style={[
                      styles.fontBtn,
                      fontSize <= MIN_FONT_SIZE && styles.fontBtnDisabled,
                    ]}
                    onPress={decreaseFontSize}
                    disabled={fontSize <= MIN_FONT_SIZE}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <MinusIcon
                      size={scale(13)}
                      color={
                        fontSize <= MIN_FONT_SIZE
                          ? colors.neutralDisabled
                          : colors.ring
                      }
                      strokeWidth={2.4}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.fontSizeDisplayBtn}
                    onPress={resetFontSize}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.fontSizeLabel}>A</Text>
                    <Text style={styles.fontSizeValue}>{fontSize}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.fontBtn,
                      fontSize >= MAX_FONT_SIZE && styles.fontBtnDisabled,
                    ]}
                    onPress={increaseFontSize}
                    disabled={fontSize >= MAX_FONT_SIZE}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <PlusIcon
                      size={scale(13)}
                      color={
                        fontSize >= MAX_FONT_SIZE
                          ? colors.neutralDisabled
                          : colors.ring
                      }
                      strokeWidth={2.4}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.modalHeaderCloseBtn}
                  onPress={handleCloseModal}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <CloseIcon
                    size={scale(16)}
                    color={colors.white}
                    strokeWidth={2.4}
                  />
                </TouchableOpacity>
              </View>

              {/* Deity Showcase & Aarti Title Header */}
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

              {/* Scrollable Aarti Lyrics Card */}
              <View style={styles.lyricsCard}>
                <ScrollView
                  ref={scrollViewRef}
                  style={styles.lyricsScrollView}
                  contentContainerStyle={[
                    styles.lyricsScrollContent,
                    { paddingBottom: scale(140) },
                  ]}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={(_, h) => {
                    contentHeightRef.current = h;
                  }}
                  onLayout={e => {
                    scrollViewHeightRef.current = e.nativeEvent.layout.height;
                  }}
                >
                  <Text
                    style={[
                      styles.modalAartiLyrics,
                      {
                        fontSize: fs(fontSize),
                        lineHeight: fs(Math.round(fontSize * 1.8)),
                      },
                    ]}
                  >
                    {selectedItem.textHi || selectedItem.textEn}
                  </Text>
                </ScrollView>

                {/* Floating Bottom Audio Player Dock */}
                <View
                  style={[
                    styles.playerDock,
                    { paddingBottom: safeBottom + scale(4) },
                  ]}
                >
                  {/* Progress Bar & Timers */}
                  <View style={styles.progressContainer}>
                    <Text style={styles.timeText}>
                      {formatTime(currentTime)}
                    </Text>
                    <View style={styles.progressBarTrack}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${progressPercent}%` },
                        ]}
                      />
                      <View
                        style={[
                          styles.progressBarThumb,
                          {
                            left: `${Math.max(
                              0,
                              Math.min(97, progressPercent),
                            )}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                  </View>

                  {/* Audio Controls Row */}
                  <View style={styles.controlsRow}>
                    {/* Auto-scroll Toggle Button */}
                    <TouchableOpacity
                      style={[
                        styles.sideControlBtn,
                        isAutoScroll && styles.sideControlBtnActive,
                      ]}
                      onPress={toggleAutoScroll}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.autoScrollText,
                          isAutoScroll && styles.autoScrollTextActive,
                        ]}
                      >
                        {isHindi ? 'ऑटो' : 'Auto'}
                      </Text>
                    </TouchableOpacity>

                    {/* -15 Seconds Rewind */}
                    <TouchableOpacity
                      style={styles.seekBtn}
                      onPress={handleSeekBackward}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Rewind15Icon
                        size={scale(24)}
                        color={colors.secondary}
                        strokeWidth={2.2}
                      />
                      <Text style={styles.seekBadge}>15s</Text>
                    </TouchableOpacity>

                    {/* Play / Pause Main Button */}
                    <TouchableOpacity
                      style={styles.playPauseBtn}
                      onPress={togglePlayPause}
                      activeOpacity={0.85}
                    >
                      <View style={styles.playPauseInner}>
                        {isPlaying ? (
                          <PauseIcon size={scale(24)} color={colors.white} />
                        ) : (
                          <View style={{ marginLeft: scale(3) }}>
                            <PlayIcon size={scale(24)} color={colors.white} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>

                    {/* +15 Seconds Forward */}
                    <TouchableOpacity
                      style={styles.seekBtn}
                      onPress={handleSeekForward}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Forward15Icon
                        size={scale(24)}
                        color={colors.secondary}
                        strokeWidth={2.2}
                      />
                      <Text style={styles.seekBadge}>15s</Text>
                    </TouchableOpacity>

                    {/* Loop / Repeat Button */}
                    <TouchableOpacity
                      style={[
                        styles.sideControlBtn,
                        isLooping && styles.sideControlBtnActive,
                      ]}
                      onPress={toggleLoop}
                      activeOpacity={0.7}
                    >
                      <RepeatIcon
                        size={scale(16)}
                        color={isLooping ? colors.white : colors.secondary}
                        strokeWidth={2.2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
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
  modalTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
    paddingBottom: scale(2),
    zIndex: 100,
  },
  fontSizeControlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    borderWidth: 1.5,
    borderColor: colors.ring,
    paddingHorizontal: scale(4),
    paddingVertical: scale(2),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  fontBtn: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
  },
  fontBtnDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  fontSizeDisplayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(6),
  },
  fontSizeLabel: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  fontSizeValue: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '600',
    marginLeft: scale(2),
  },
  modalHeaderCloseBtn: {
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
    elevation: 4,
  },
  modalHeaderSection: {
    alignItems: 'center',
    paddingTop: scale(2),
    paddingBottom: scale(8),
    paddingHorizontal: scale(20),
  },
  modalImageWrapper: {
    width: scale(96),
    height: scale(96),
    borderRadius: scale(48),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    marginBottom: scale(6),
    backgroundColor: colors.primary,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  modalDeityImage: {
    width: '100%',
    height: '100%',
  },
  modalAartiTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: scale(2),
  },
  modalAartiSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
  },
  lyricsCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(-2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(8),
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  lyricsScrollView: {
    flex: 1,
  },
  lyricsScrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  modalAartiLyrics: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
  },
  playerDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  timeText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
    fontWeight: '600',
    width: scale(36),
    textAlign: 'center',
  },
  progressBarTrack: {
    flex: 1,
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: 'rgba(251, 148, 55, 0.2)',
    marginHorizontal: scale(8),
    position: 'relative',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: scale(2),
    backgroundColor: colors.ring,
  },
  progressBarThumb: {
    position: 'absolute',
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: colors.ring,
    borderWidth: 1.5,
    borderColor: colors.white,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: scale(6),
  },
  sideControlBtn: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sideControlBtnActive: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  autoScrollText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
  },
  autoScrollTextActive: {
    color: colors.white,
  },
  seekBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: scale(40),
    height: scale(40),
  },
  seekBadge: {
    position: 'absolute',
    fontSize: fs(7.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '800',
    bottom: scale(13),
  },
  playPauseBtn: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  playPauseInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
