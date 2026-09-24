import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import GradientBackground from '@components/GradientBackground';
import { OverlayModalHandle } from '@components/OverlayModal';
import imagePath, { Bell } from '@assets/index';
import colors from '@theme/colors';
import { CameraIcon, ChevronRight } from '@components/icons/SvgIcons';
import { scale } from '@theme/sizes';
import {
  Storage,
  STORAGE_KEYS,
  getUserJoinedDate,
} from '@services/storageService';
import { AllBooks, findStoryById, Story } from '@constants/storiesData';
import { getJapMantrasData, MantraSelectorItem } from '@services/japService';
import {
  scheduleMultipleReminders,
  cancelAllReminders,
  ReminderItem,
} from '@services/notificationService';
import { triggerHaptic } from '@helper/helper';
import Animated, { FadeInDown } from 'react-native-reanimated';

import profileStyles from './styles/profileStyles';
import StatsCard from './components/StatsCard';
import FavoriteStoriesSection from './components/FavoriteStoriesSection';
import ResetModal from './components/ResetModal';
import SadhanaCalendarCard from './components/SadhanaCalendarCard';
import SelectedDayBreakdownCard from './components/SelectedDayBreakdownCard';
import LanguageLoadingModal from './components/LanguageLoadingModal';
import ComingSoonModal from './components/ComingSoonModal';
import ImagePickerModal from './components/ImagePickerModal';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language?.startsWith('en') ? 'en' : 'hi') as
    | 'en'
    | 'hi';
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  // ─── Refs ─────────────────────────────────────────────────────────────────
  const overlayRef = useRef<OverlayModalHandle>(null);
  const customMantrasModalRef = useRef<OverlayModalHandle>(null);
  const resetModalRef = useRef<OverlayModalHandle>(null);
  const imagePickerModalRef = useRef<OverlayModalHandle>(null);

  // ──────────────────────────────────────────────
  // MULTIPLE DAILY REMINDERS
  // ──────────────────────────────────────────────
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      const rawList = Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '');
      if (rawList) {
        const parsed = JSON.parse(rawList);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {}
    return [];
  });

  const formattedReminderSummary = useMemo(() => {
    const activeReminders = reminders.filter(r => r.enabled);
    if (activeReminders.length === 0) {
      return t(Translation.PROFILE_REMINDERS_NONE_ACTIVE);
    }
    if (activeReminders.length === 1) {
      const r = activeReminders[0];
      const h12 = r.hour % 12 || 12;
      return `${String(h12).padStart(2, '0')}:${String(r.minute).padStart(
        2,
        '0',
      )} ${r.isPm ? 'PM' : 'AM'}`;
    }
    return t(Translation.PROFILE_REMINDERS_COUNT_ACTIVE, {
      count: activeReminders.length,
    });
  }, [reminders, t]);

  // ─── UI & Local State ─────────────────────────────────────────────────────
  const [showJapHistory, setShowJapHistory] = useState(false);
  const [isLangChanging, setIsLangChanging] = useState(false);

  // ─── Statistics state ─────────────────────────────────────────────────────
  const [totalCount, setTotalCount] = useState(0);
  const [totalMala, setTotalMala] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeTotalDays, setChallengeTotalDays] = useState(21);

  // ─── Profile image ────────────────────────────────────────────────────────
  const [profileImageUri, setProfileImageUri] = useState<string | null>(() => {
    return Storage.getString(STORAGE_KEYS.PROFILE_IMAGE_URI, '') || null;
  });

  const handlePickProfileImage = useCallback(() => {
    imagePickerModalRef.current?.open();
  }, []);

  const handleImageSelected = useCallback((uri: string) => {
    setProfileImageUri(uri);
    Storage.set(STORAGE_KEYS.PROFILE_IMAGE_URI, uri);
  }, []);

  const handleRemoveProfileImage = useCallback(() => {
    setProfileImageUri(null);
    Storage.delete(STORAGE_KEYS.PROFILE_IMAGE_URI);
  }, []);

  const userJoinedDate = useMemo(() => {
    const rawDate = getUserJoinedDate();
    const date = new Date(rawDate);
    return date.toLocaleDateString(
      currentLanguage === 'hi' ? 'hi-IN' : 'en-US',
      {
        month: 'short',
        year: 'numeric',
      },
    );
  }, [currentLanguage]);

  // ─── Calendar / history state ─────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split('T')[0],
  );
  const [defaultMantras, setDefaultMantras] = useState<MantraSelectorItem[]>(
    [],
  );
  const [customMantras, setCustomMantras] = useState<any[]>([]);
  const [japaHistory, setJapaHistory] = useState<any>(() => {
    try {
      return JSON.parse(Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}'));
    } catch {
      return {};
    }
  });
  const [favoriteStories, setFavoriteStories] = useState<Story[]>([]);

  // ─── Reset modal state ────────────────────────────────────────────────────
  const [checkedChants, setCheckedChants] = useState(false);
  const [checkedChallenge, setCheckedChallenge] = useState(false);
  const [resetCode, setResetCode] = useState('');

  // ─── Derived values ───────────────────────────────────────────────────────
  const isResetEnabled =
    checkedChants &&
    checkedChallenge &&
    resetCode.trim().toUpperCase() === 'RESET';

  const markedDates = useMemo(() => {
    try {
      const marked: any = {};
      Object.keys(japaHistory).forEach(dateKey => {
        if (japaHistory[dateKey]?.totalCount > 0) {
          marked[dateKey] = { marked: true, dotColor: colors.ring };
        }
      });
      if (selectedDate) {
        marked[selectedDate] = {
          ...marked[selectedDate],
          selected: true,
          selectedColor: colors.ring,
          selectedTextColor: colors.white,
        };
      }
      return marked;
    } catch {
      return {};
    }
  }, [selectedDate, japaHistory]);

  const selectedDayRecord = useMemo(
    () => japaHistory[selectedDate] || null,
    [selectedDate, japaHistory],
  );

  const getMantraName = useCallback(
    (id: string) => {
      const defaultMantra = defaultMantras.find(m => m.id === id);
      if (defaultMantra) {
        return currentLanguage === 'hi'
          ? defaultMantra.nameHi
          : defaultMantra.nameEn;
      }
      return id;
    },
    [defaultMantras, currentLanguage],
  );

  // ─── Load data on focus ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let isMounted = true;
    getJapMantrasData().then(data => {
      if (isMounted) {
        setDefaultMantras(data);
      }
    });

    Storage.checkAndResetTodayStats();
    setTotalCount(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT, 0));
    setTotalMala(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA, 0));
    setTodayCount(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0));
    setChallengeStarted(Storage.getBoolean('CHALLENGE_STARTED', false));
    setChallengeTotalDays(Storage.getNumber('CHALLENGE_TOTAL_DAYS', 21));

    try {
      setJapaHistory(
        JSON.parse(Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}')),
      );
    } catch {
      setJapaHistory({});
    }

    try {
      setCustomMantras(
        JSON.parse(Storage.getString(STORAGE_KEYS.CUSTOM_MANTRAS, '[]')),
      );
    } catch {
      setCustomMantras([]);
    }

    try {
      const rawReminders = Storage.getString(
        STORAGE_KEYS.DAILY_REMINDERS_LIST,
        '',
      );
      if (rawReminders) {
        const parsedReminders = JSON.parse(rawReminders);
        if (Array.isArray(parsedReminders)) {
          setReminders(parsedReminders);
        } else {
          setReminders([]);
        }
      } else {
        setReminders([]);
      }
    } catch {
      setReminders([]);
    }

    try {
      const bookmarkedIds: string[] = JSON.parse(
        Storage.getString(STORAGE_KEYS.STORY_BOOKMARKS, '[]'),
      );
      setFavoriteStories(
        Array.isArray(bookmarkedIds)
          ? AllBooks.filter(s => bookmarkedIds.includes(s.id))
          : [],
      );
    } catch {
      setFavoriteStories([]);
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  // ─── Favourite story handlers ─────────────────────────────────────────────
  const handleRemoveFavorite = useCallback((storyId: string) => {
    triggerHaptic('light');
    try {
      const raw = Storage.getString(STORAGE_KEYS.STORY_BOOKMARKS, '[]');
      let list: string[] = JSON.parse(raw);
      if (Array.isArray(list)) {
        list = list.filter(id => id !== storyId);
        Storage.set(STORAGE_KEYS.STORY_BOOKMARKS, JSON.stringify(list));
        setFavoriteStories(prev => prev.filter(s => s.id !== storyId));
      }
    } catch {}
  }, []);

  // ─── Challenge handlers ───────────────────────────────────────────────────
  const handleGiveUpChallenge = useCallback(() => {
    Alert.alert(
      t(Translation.CHALLENGE_ABANDON_ALERT_TITLE),
      t(Translation.CHALLENGE_ABANDON_ALERT_MSG),
      [
        { text: t(Translation.CANCEL_LABEL), style: 'cancel' },
        {
          text: t(Translation.CHALLENGE_ABANDON_CONFIRM),
          style: 'destructive',
          onPress: () => {
            Storage.delete('CHALLENGE_STARTED');
            Storage.delete('CHALLENGE_PROGRESS_DAYS');
            Storage.delete('CHALLENGE_STREAK');
            Storage.delete('CHALLENGE_DAILY_TARGET');
            Storage.delete('CHALLENGE_TOTAL_DAYS');
            Storage.delete('CHALLENGE_BASE_CHANTS');
            Storage.delete('CHALLENGE_BASE_DATE');
            setChallengeStarted(false);
            setChallengeTotalDays(21);
          },
        },
      ],
      { cancelable: true },
    );
  }, [t]);

  // ─── Reset modal handlers ─────────────────────────────────────────────────
  const handleOpenResetModal = useCallback(() => {
    setCheckedChants(false);
    setCheckedChallenge(false);
    setResetCode('');
    resetModalRef.current?.open();
  }, []);

  const handleCloseResetModal = useCallback(() => {
    resetModalRef.current?.close();
  }, []);

  const handleExecuteReset = useCallback(() => {
    triggerHaptic('error');
    Storage.clearAll();
    setTotalCount(0);
    setTotalMala(0);
    setTodayCount(0);
    setChallengeStarted(false);
    setChallengeTotalDays(21);
    handleCloseResetModal();
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  }, [handleCloseResetModal, navigation]);

  // ─── Language change handler ──────────────────────────────────────────────
  const handleLanguageChange = useCallback(
    (newLang: 'en' | 'hi') => {
      if (newLang === currentLanguage || isLangChanging) return;
      setIsLangChanging(true);

      setTimeout(() => {
        Storage.set(STORAGE_KEYS.APP_LANGUAGE, newLang);
        i18n.changeLanguage(newLang);
      }, 500);

      setTimeout(() => {
        setIsLangChanging(false);
      }, 2000);
    },
    [currentLanguage, isLangChanging, i18n],
  );

  return (
    <GradientBackground>
      <SafeAreaView style={profileStyles.safeArea} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            profileStyles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
        >
          {/* ── User Profile Card ─────────────────────────────────── */}
          <View style={profileStyles.profileCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickProfileImage}
              style={profileStyles.avatarContainer}
            >
              <View style={profileStyles.avatarBorder}>
                <Image
                  source={
                    profileImageUri
                      ? { uri: profileImageUri }
                      : imagePath.Krishna
                  }
                  style={profileStyles.avatarImage}
                />
              </View>
              <View style={profileStyles.cameraBadge}>
                <CameraIcon size={scale(11)} color={colors.white} />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, marginTop: scale(10), flexShrink: 1 }}>
              <Text style={profileStyles.userName}>
                {t(Translation.PROFILE_DEVOTEE)}
              </Text>
              <Text style={profileStyles.userJoined}>
                {t(Translation.PROFILE_JOINED_SINCE, { date: userJoinedDate })}
              </Text>
            </View>
          </View>

          {/* ── Statistics ────────────────────────────────────────── */}
          <StatsCard
            totalCount={totalCount}
            totalMala={totalMala}
            todayCount={todayCount}
            showHistory={showJapHistory}
            onHistoryPress={() => setShowJapHistory(prev => !prev)}
          />

          {/* ── Sadhana Calendar (revealed by History button) ────────── */}
          {showJapHistory && (
            <Animated.View
              style={{
                width: '100%',
              }}
              entering={FadeInDown.duration(400).springify()}
            >
              <SadhanaCalendarCard
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                markedDates={markedDates}
                currentLanguage={currentLanguage}
              />

              {/* ── Selected Day Breakdown ────────────────────────────── */}
              {selectedDate && (
                <Animated.View
                  entering={FadeInDown.duration(350).delay(60).springify()}
                >
                  <SelectedDayBreakdownCard
                    selectedDate={selectedDate}
                    selectedDayRecord={selectedDayRecord}
                    getMantraName={getMantraName}
                    currentLanguage={currentLanguage}
                  />
                </Animated.View>
              )}
            </Animated.View>
          )}

          {/* ── Favourite Stories ─────────────────────────────────── */}
          <FavoriteStoriesSection
            stories={favoriteStories}
            currentLanguage={currentLanguage}
            onRemove={handleRemoveFavorite}
            onPress={storyId => {
              triggerHaptic('light');
              const book = findStoryById(storyId);
              if (book?.type === 'text') {
                navigation.navigate('TextReadingScreen', { storyId });
              } else {
                navigation.navigate('ReadingScreen', { storyId });
              }
            }}
          />

          {/* ── Settings Card ─────────────────────────────────────── */}
          <View style={profileStyles.sectionCard}>
            <Text style={profileStyles.sectionTitle}>
              {t(Translation.PROFILE_SETTINGS)}
            </Text>

            {/* Language toggle */}
            <View style={profileStyles.settingRow}>
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.PROFILE_CHANGE_LANGUAGE)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.PROFILE_APP_MAIN_LANGUAGE)}
                </Text>
              </View>
              <View style={profileStyles.languageToggleContainer}>
                <TouchableOpacity
                  style={[
                    profileStyles.langButton,
                    currentLanguage === 'en' && profileStyles.langButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('en')}
                  disabled={isLangChanging}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      profileStyles.langButtonText,
                      currentLanguage === 'en' &&
                        profileStyles.langButtonTextActive,
                    ]}
                  >
                    EN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    profileStyles.langButton,
                    currentLanguage === 'hi' && profileStyles.langButtonActive,
                  ]}
                  onPress={() => handleLanguageChange('hi')}
                  disabled={isLangChanging}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      profileStyles.langButtonText,
                      currentLanguage === 'hi' &&
                        profileStyles.langButtonTextActive,
                    ]}
                  >
                    हिन्दी
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={profileStyles.separator} />

            {/* Reminder row */}
            <TouchableOpacity
              style={profileStyles.settingRow}
              onPress={() => {
                triggerHaptic('light');
                navigation.navigate('ReminderScreen');
              }}
              activeOpacity={0.7}
            >
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.PROFILE_DAILY_NOTIFICATIONS)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(4),
                    gap: scale(4),
                  }}
                >
                  <Bell width={scale(13)} height={scale(13)} />
                  <Text
                    style={[
                      profileStyles.settingSubLabel,
                      { color: colors.ring, fontWeight: '600' },
                    ]}
                  >
                    {formattedReminderSummary}
                  </Text>
                </View>
              </View>

              <ChevronRight
                size={scale(18)}
                color={colors.ring}
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <View style={profileStyles.separator} />

            {challengeStarted && (
              <>
                <View style={profileStyles.separator} />
                <View style={profileStyles.settingRow}>
                  <View style={profileStyles.settingInfo}>
                    <Text style={profileStyles.settingLabel}>
                      {t(Translation.CHALLENGE_GIVE_UP)}
                    </Text>
                    <Text style={profileStyles.settingSubLabel}>
                      {t(Translation.CHALLENGE_ABANDON_DESC, {
                        count: challengeTotalDays,
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={profileStyles.giveUpButton}
                    onPress={handleGiveUpChallenge}
                    activeOpacity={0.8}
                  >
                    <Text style={profileStyles.giveUpButtonText}>
                      {t(Translation.CHALLENGE_ABANDON_BTN)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* ── Danger Zone Card ──────────────────────────────────── */}
          <View
            style={[profileStyles.sectionCard, profileStyles.dangerZoneCard]}
          >
            <Text
              style={[profileStyles.sectionTitle, { color: colors.danger }]}
            >
              {t(Translation.DANGER_ZONE_TITLE)}
            </Text>
            <View style={profileStyles.settingRow}>
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.RESET_ALL_DATA_TITLE)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.RESET_ALL_DATA_DESC)}
                </Text>
              </View>
              <TouchableOpacity
                style={profileStyles.resetButton}
                onPress={handleOpenResetModal}
                activeOpacity={0.8}
              >
                <Text style={profileStyles.resetButtonText}>
                  {t(Translation.RESET_LABEL)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ── Coming Soon Modal ────────────────────────────────────── */}
      <ComingSoonModal modalRef={overlayRef} />

      {/* ── Destructive Reset Modal ──────────────────────────────── */}
      <ResetModal
        modalRef={resetModalRef}
        checkedChants={checkedChants}
        setCheckedChants={setCheckedChants}
        checkedChallenge={checkedChallenge}
        setCheckedChallenge={setCheckedChallenge}
        resetCode={resetCode}
        setResetCode={setResetCode}
        isResetEnabled={isResetEnabled}
        onClose={handleCloseResetModal}
        onExecute={handleExecuteReset}
      />

      {/* ── Image Picker Modal ────────────────────────────────────── */}
      <ImagePickerModal
        modalRef={imagePickerModalRef}
        hasExistingImage={Boolean(profileImageUri)}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemoveProfileImage}
      />

      {/* ── Language Change Dim Loading Overlay ── */}
      <LanguageLoadingModal visible={isLangChanging} />
    </GradientBackground>
  );
};

export default ProfileScreen;
