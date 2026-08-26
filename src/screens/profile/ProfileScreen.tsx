import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
  TextInput,
  Platform,
  Vibration,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../i18n/language';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import imagePath from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MahaBharatStories, Story } from '../../constants/storiesData';
import OverlayModal, {
  OverlayModalHandle,
} from '../../components/OverlayModal';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage, STORAGE_KEYS } from '../../utile/storage';
import HapticFeedback from 'react-native-haptic-feedback';
import { MANTRAS_LIST } from '../../constants/japData';
import SadhanaCalendarCard from './components/SadhanaCalendarCard';
import SelectedDayBreakdownCard from './components/SelectedDayBreakdownCard';
import ManageCustomMantrasModal from './components/ManageCustomMantrasModal';
const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const navigation = useNavigation<any>();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const overlayRef = useRef<OverlayModalHandle>(null);
  const customMantrasModalRef = useRef<OverlayModalHandle>(null);

  const isFocused = useIsFocused();
  const [favoriteStories, setFavoriteStories] = useState<Story[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalMala, setTotalMala] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeTotalDays, setChallengeTotalDays] = useState(21);

  // Japa Statistics Chart States

  // Japa Calendar History States
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  });
  const [customMantras, setCustomMantras] = useState<any[]>([]);
  const [japaHistory, setJapaHistory] = useState<any>(() => {
    try {
      const rawHistory = Storage.getString('JAP_HISTORY', '{}');
      return JSON.parse(rawHistory);
    } catch {
      return {};
    }
  });

  // Build the markedDates configuration for react-native-calendars
  const markedDates = useMemo(() => {
    try {
      const marked: any = {};

      Object.keys(japaHistory).forEach(dateKey => {
        if (japaHistory[dateKey] && japaHistory[dateKey].totalCount > 0) {
          marked[dateKey] = {
            marked: true,
            dotColor: colors.ring,
          };
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

  // Retrieve selected date record details
  const selectedDayRecord = useMemo(() => {
    return japaHistory[selectedDate] || null;
  }, [selectedDate, japaHistory]);

  // Helper to map mantra ID to English/Hindi display name
  const getMantraName = useCallback(
    (id: string) => {
      const defaultMantra = MANTRAS_LIST.find(m => m.id === id);
      if (defaultMantra) {
        return currentLanguage === 'hi'
          ? defaultMantra.nameHi
          : defaultMantra.nameEn;
      }
      const customMantra = customMantras.find(m => m.id === id);
      if (customMantra) {
        return currentLanguage === 'hi'
          ? customMantra.nameHi
          : customMantra.nameEn;
      }
      return id;
    },
    [customMantras, currentLanguage],
  );

  // Reset Modal States
  const resetModalRef = useRef<OverlayModalHandle>(null);
  const [checkedChants, setCheckedChants] = useState(false);
  const [checkedChallenge, setCheckedChallenge] = useState(false);
  const [resetCode, setResetCode] = useState('');

  const isResetEnabled =
    checkedChants &&
    checkedChallenge &&
    resetCode.trim().toUpperCase() === 'RESET';

  const handleOpenResetModal = () => {
    setCheckedChants(false);
    setCheckedChallenge(false);
    setResetCode('');
    resetModalRef.current?.open();
  };

  const handleCloseResetModal = () => {
    resetModalRef.current?.close();
  };

  const handleExecuteReset = () => {
    // Trigger haptic / vibration feedback
    if (Platform.OS === 'android') {
      Vibration.vibrate(200);
    } else {
      HapticFeedback.trigger('notificationError', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    }

    // Clear MMKV completely
    Storage.clearAll();

    // Reset local state to default values
    setTotalCount(0);
    setTotalMala(0);
    setTodayCount(0);
    setChallengeStarted(false);
    setChallengeTotalDays(21);

    handleCloseResetModal();

    // Reset navigation stack to onboarding
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  useEffect(() => {
    if (isFocused) {
      Storage.checkAndResetTodayStats();
      setTotalCount(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT, 0));
      setTotalMala(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA, 0));
      setTodayCount(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0));
      setChallengeStarted(Storage.getBoolean('CHALLENGE_STARTED', false));
      setChallengeTotalDays(Storage.getNumber('CHALLENGE_TOTAL_DAYS', 21));

      // Load Japa history from storage
      try {
        const rawHistory = Storage.getString('JAP_HISTORY', '{}');
        setJapaHistory(JSON.parse(rawHistory));
      } catch {
        setJapaHistory({});
      }

      // Load custom mantras list to resolve names
      try {
        const rawCustom = Storage.getString('CUSTOM_MANTRAS', '[]');
        setCustomMantras(JSON.parse(rawCustom));
      } catch {
        setCustomMantras([]);
      }

      // Load favorite stories from storage
      try {
        const raw = Storage.getString('STORY_BOOKMARKS', '[]');
        const bookmarkedIds: string[] = JSON.parse(raw);
        if (Array.isArray(bookmarkedIds)) {
          const favs = MahaBharatStories.filter(story =>
            bookmarkedIds.includes(story.id),
          );
          setFavoriteStories(favs);
        } else {
          setFavoriteStories([]);
        }
      } catch {
        setFavoriteStories([]);
      }
    }
  }, [isFocused]);

  const handleDeleteCustomMantra = (mantraId: string, mantraName: string) => {
    Alert.alert(
      currentLanguage === 'hi' ? 'कस्टम मंत्र हटाएं?' : 'Delete Custom Mantra?',
      currentLanguage === 'hi'
        ? `क्या आप निश्चित रूप से "${mantraName}" मंत्र को हटाना चाहते हैं?`
        : `Are you sure you want to delete the mantra "${mantraName}"?`,
      [
        {
          text: currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel',
          style: 'cancel',
        },
        {
          text: currentLanguage === 'hi' ? 'हटाएं' : 'Delete',
          style: 'destructive',
          onPress: () => {
            // Haptic feedback
            if (Platform.OS === 'android') {
              try {
                Vibration.vibrate(30);
              } catch {}
            } else {
              try {
                HapticFeedback.trigger('impactMedium', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: true,
                });
              } catch {}
            }

            const updated = customMantras.filter(m => m.id !== mantraId);
            setCustomMantras(updated);
            Storage.set('CUSTOM_MANTRAS', JSON.stringify(updated));

            const customTotalCount = Storage.getNumber(
              `${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`,
              0,
            );
            const customTotalMala = Storage.getNumber(
              `${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`,
              0,
            );
            const customTodayCount = Storage.getNumber(
              `${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`,
              0,
            );
            const customTodayMala = Storage.getNumber(
              `${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`,
              0,
            );

            // Subtract from global totals stored in MMKV
            const globalTotalCount = Storage.getNumber(
              STORAGE_KEYS.JAP_TOTAL_COUNT,
              0,
            );
            const globalTotalMala = Storage.getNumber(
              STORAGE_KEYS.JAP_TOTAL_MALA,
              0,
            );
            const globalTodayCount = Storage.getNumber(
              STORAGE_KEYS.JAP_TODAY_COUNT,
              0,
            );
            const globalTodayMala = Storage.getNumber(
              STORAGE_KEYS.JAP_TODAY_MALA,
              0,
            );

            Storage.set(
              STORAGE_KEYS.JAP_TOTAL_COUNT,
              Math.max(0, globalTotalCount - customTotalCount),
            );
            Storage.set(
              STORAGE_KEYS.JAP_TOTAL_MALA,
              Math.max(0, globalTotalMala - customTotalMala),
            );
            Storage.set(
              STORAGE_KEYS.JAP_TODAY_COUNT,
              Math.max(0, globalTodayCount - customTodayCount),
            );
            Storage.set(
              STORAGE_KEYS.JAP_TODAY_MALA,
              Math.max(0, globalTodayMala - customTodayMala),
            );

            // Update React state hooks dynamically
            setTotalCount(prev => Math.max(0, prev - customTotalCount));
            setTotalMala(prev => Math.max(0, prev - customTotalMala));
            setTodayCount(prev => Math.max(0, prev - customTodayCount));

            // Clean up other stats keys
            Storage.delete(`${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`);
            Storage.delete(`${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`);
            Storage.delete(`${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`);
            Storage.delete(`${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`);
            Storage.delete(`JAP_TODAY_MALA_${mantraId}`);
            Storage.delete(`JAP_TODAY_COUNT_${mantraId}`);

            // Sanitize JAP_HISTORY from the deleted mantra ID
            try {
              const rawHistory = Storage.getString('JAP_HISTORY', '{}');
              const history = JSON.parse(rawHistory);
              let historyChanged = false;

              Object.keys(history).forEach(dateKey => {
                const dayRecord = history[dateKey];
                if (
                  dayRecord &&
                  dayRecord.mantras &&
                  dayRecord.mantras[mantraId]
                ) {
                  const record = dayRecord.mantras[mantraId];
                  dayRecord.totalCount = Math.max(
                    0,
                    dayRecord.totalCount - record.count,
                  );
                  dayRecord.totalMala = Math.max(
                    0,
                    dayRecord.totalMala - record.mala,
                  );
                  delete dayRecord.mantras[mantraId];

                  // If no records left for this date, delete the date from history completely
                  if (
                    dayRecord.totalCount <= 0 ||
                    Object.keys(dayRecord.mantras).length === 0
                  ) {
                    delete history[dateKey];
                  }
                  historyChanged = true;
                }
              });

              if (historyChanged) {
                Storage.set('JAP_HISTORY', JSON.stringify(history));
                setJapaHistory(history);
              } else {
                setJapaHistory({ ...history });
              }
            } catch (e) {
              console.error('Failed to clean history for custom mantra delete', e);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleRemoveFavorite = (storyId: string) => {
    // Confirmation haptic feedback
    if (Platform.OS === 'android') {
      try {
        Vibration.vibrate(30);
      } catch {}
    } else {
      try {
        HapticFeedback.trigger('impactLight', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: true,
        });
      } catch {}
    }

    try {
      const raw = Storage.getString('STORY_BOOKMARKS', '[]');
      let list: string[] = JSON.parse(raw);
      if (Array.isArray(list)) {
        list = list.filter(id => id !== storyId);
        Storage.set('STORY_BOOKMARKS', JSON.stringify(list));
        setFavoriteStories(prev => prev.filter(story => story.id !== storyId));
      }
    } catch {}
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleGiveUpChallenge = () => {
    const title = t(Translation.CHALLENGE_ABANDON_ALERT_TITLE);
    const message = t(Translation.CHALLENGE_ABANDON_ALERT_MSG);
    const cancelText = t(Translation.CANCEL_LABEL);
    const confirmText = t(Translation.CHALLENGE_ABANDON_CONFIRM);

    Alert.alert(
      title,
      message,
      [
        { text: cancelText, style: 'cancel' },
        {
          text: confirmText,
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
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header */}
        {/* <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t(Translation.PROFILE_TITLE)}</Text>
        </View> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarBorder}>
              <Image source={imagePath.Krishna} style={styles.avatarImage} />
            </View>
            <View style={{ flex: 1, marginTop: scale(10) }}>
              <Text style={styles.userName}>
                {t(Translation.PROFILE_DEVOTEE)}
              </Text>
              <Text style={styles.userJoined}>
                {t(Translation.PROFILE_JOINED_SINCE)}
              </Text>
            </View>
          </View>

          {/* Statistics Grid */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              {t(Translation.PROFILE_TOTAL_STATS)}
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {totalCount.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>
                  {t(Translation.PROFILE_TOTAL_CHANTS)}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalMala}</Text>
                <Text style={styles.statLabel}>
                  {t(Translation.PROFILE_MALAS_DONE)}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{todayCount}</Text>
                <Text style={styles.statLabel}>
                  {t(Translation.PROFILE_TODAY_JAP)}
                </Text>
              </View>
            </View>
          </View>

          {/* Calendar History View Card */}
          <SadhanaCalendarCard
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            markedDates={markedDates}
            currentLanguage={currentLanguage}
          />

          {/* Selected Date breakdown section */}
          {selectedDate && (
            <SelectedDayBreakdownCard
              selectedDate={selectedDate}
              selectedDayRecord={selectedDayRecord}
              getMantraName={getMantraName}
              currentLanguage={currentLanguage}
            />
          )}

          {/* Favorite Stories Section */}
          {favoriteStories.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.rowTitle}>
                {t(Translation.PROFILE_FAV_STORIES)}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.favStoriesScroll}
              >
                {favoriteStories.map(story => {
                  const title =
                    currentLanguage === 'hi' ? story.titleHi : story.titleEn;
                  const category =
                    currentLanguage === 'hi'
                      ? story.categoryHi
                      : story.categoryEn;
                  return (
                    <TouchableOpacity
                      key={story.id}
                      style={styles.storyBookCard}
                      onPress={() =>
                        navigation.navigate('ReadingScreen', {
                          storyId: story.id,
                        })
                      }
                      activeOpacity={0.85}
                    >
                      <View style={styles.bookCoverContainer}>
                        <TouchableOpacity
                          style={styles.removeFavoriteBadge}
                          onPress={() => handleRemoveFavorite(story.id)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.removeFavoriteText}>×</Text>
                        </TouchableOpacity>
                        <Image
                          source={story.image}
                          style={styles.bookCoverImage}
                        />
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>
                            {category}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.storyBookTitle} numberOfLines={1}>
                        {title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Settings Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              {t(Translation.PROFILE_SETTINGS)}
            </Text>

            {/* Language Switch Row */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {t(Translation.PROFILE_CHANGE_LANGUAGE)}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {t(Translation.PROFILE_APP_MAIN_LANGUAGE)}
                </Text>
              </View>
              <View style={styles.languageToggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.langButton,
                    currentLanguage === 'en' && styles.langButtonActive,
                  ]}
                  onPress={() => changeLanguage('en')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.langButtonText,
                      currentLanguage === 'en' && styles.langButtonTextActive,
                    ]}
                  >
                    EN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.langButton,
                    currentLanguage === 'hi' && styles.langButtonActive,
                  ]}
                  onPress={() => changeLanguage('hi')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.langButtonText,
                      currentLanguage === 'hi' && styles.langButtonTextActive,
                    ]}
                  >
                    हिन्दी
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Notifications Switch Row */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {t(Translation.PROFILE_DAILY_NOTIFICATIONS)}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.switchTrackFalse,
                  true: colors.ring,
                }}
                thumbColor={
                  notificationsEnabled ? colors.white : colors.switchThumbFalse
                }
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            </View>

            <View style={styles.separator} />

            {/* Manage Custom Mantras Row */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => customMantrasModalRef.current?.open()}
              activeOpacity={0.8}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {currentLanguage === 'hi'
                    ? 'कस्टम मंत्र हटाएं'
                    : 'Delete Custom Mantras'}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {currentLanguage === 'hi'
                    ? 'अपने बनाए गए कस्टम मंत्रों को हटाएं'
                    : 'Manage and remove your custom created mantras'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: fs(18),
                  color: colors.ring,
                  paddingRight: scale(4),
                }}
              >
                ›
              </Text>
            </TouchableOpacity>

            {challengeStarted && (
              <>
                <View style={styles.separator} />
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>
                      {t(Translation.CHALLENGE_GIVE_UP)}
                    </Text>
                    <Text style={styles.settingSubLabel}>
                      {t(Translation.CHALLENGE_ABANDON_DESC, {
                        count: challengeTotalDays,
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.giveUpButton}
                    onPress={handleGiveUpChallenge}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.giveUpButtonText}>
                      {t(Translation.CHALLENGE_ABANDON_BTN)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* Danger Zone Section */}
          <View style={[styles.sectionCard, styles.dangerZoneCard]}>
            <Text style={[styles.sectionTitle, { color: colors.danger }]}>
              {t(Translation.DANGER_ZONE_TITLE)}
            </Text>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {t(Translation.RESET_ALL_DATA_TITLE)}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {t(Translation.RESET_ALL_DATA_DESC)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleOpenResetModal}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>
                  {t(Translation.RESET_LABEL)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <OverlayModal ref={overlayRef} closeOnBackdropPress={true}>
        <View style={styles.modalCenterContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>✨</Text>
            <Text style={styles.modalTitle}>
              {currentLanguage === 'hi' ? 'जल्द आ रहा है' : 'Coming Soon'}
            </Text>
            <Text style={styles.modalMessage}>
              {currentLanguage === 'hi'
                ? 'यह कहानी जल्द ही उपलब्ध होगी। हम आपके लिए सुंदर भक्ति अनुभव तैयार कर रहे हैं!'
                : 'This story is coming soon. We are building a beautiful devotional experience for you!'}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => overlayRef.current?.close()}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>
                {currentLanguage === 'hi' ? 'ठीक है' : 'Okay'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </OverlayModal>

      {/* OverlayModal to Manage/Delete Custom Mantras */}
      <ManageCustomMantrasModal
        modalRef={customMantrasModalRef}
        customMantras={customMantras}
        onDeleteCustomMantra={handleDeleteCustomMantra}
        currentLanguage={currentLanguage}
      />

      {/* Step-by-step Destructive Reset Modal */}
      <OverlayModal ref={resetModalRef} closeOnBackdropPress={true}>
        <View style={styles.modalCenterContainer}>
          <View style={styles.modalCard}>
            {/* Close button top right */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={handleCloseResetModal}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitleDestructive}>
              ⚠️ {t(Translation.RESET_MODAL_TITLE)}
            </Text>

            <Text style={styles.modalDescription}>
              {t(Translation.RESET_MODAL_DESC)}
            </Text>

            {/* Step 1 Checkbox 1 */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setCheckedChants(!checkedChants)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  checkedChants && styles.checkboxActive,
                ]}
              >
                {checkedChants && <Text style={styles.checkboxTick}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                {t(Translation.RESET_CONFIRM_LBL1)}
              </Text>
            </TouchableOpacity>

            {/* Step 1 Checkbox 2 */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setCheckedChallenge(!checkedChallenge)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  checkedChallenge && styles.checkboxActive,
                ]}
              >
                {checkedChallenge && <Text style={styles.checkboxTick}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                {t(Translation.RESET_CONFIRM_LBL2)}
              </Text>
            </TouchableOpacity>

            {/* Step 2 Typing code confirmation */}
            <Text style={styles.resetConfirmLabel}>
              {t(Translation.RESET_CONFIRM_TYPE)}
            </Text>
            <TextInput
              style={styles.resetTextInput}
              value={resetCode}
              onChangeText={setResetCode}
              placeholder="RESET"
              placeholderTextColor={colors.neutralDisabled}
              autoCapitalize="characters"
            />

            {/* Action buttons */}
            <View style={styles.resetActionRow}>
              <TouchableOpacity
                style={styles.resetCancelBtn}
                onPress={handleCloseResetModal}
                activeOpacity={0.8}
              >
                <Text style={styles.resetCancelText}>
                  {t(Translation.RESET_CANCEL_BTN)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.resetConfirmBtn,
                  !isResetEnabled && styles.resetConfirmBtnDisabled,
                ]}
                onPress={handleExecuteReset}
                disabled={!isResetEnabled}
                activeOpacity={0.8}
              >
                <Text style={styles.resetConfirmText}>
                  {t(Translation.RESET_CONFIRM_BTN)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </OverlayModal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderVerySubtle,
  },
  headerTitle: {
    fontSize: fs(20),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  scrollContent: {
    paddingBottom: scale(100),
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    width: '90%',

    gap: scale(10),
  },
  avatarBorder: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(45),
    borderWidth: 3,
    borderColor: colors.ring,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(14),
    backgroundColor: colors.profileEditBgSubtle,
  },
  avatarImage: {
    width: '90%',
    height: '90%',
    borderRadius: scale(40),
    resizeMode: 'cover',
  },
  userName: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  userJoined: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.accent,
    opacity: 0.8,
  },
  sectionCard: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(18),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(14),
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statDivider: {
    width: 1,
    height: scale(28),
    backgroundColor: colors.borderMedium,
  },
  statValue: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    marginBottom: scale(2),
  },
  statLabel: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    opacity: 0.75,
    textAlign: 'center',
  },
  sectionContainer: {
    width: '100%',
    marginVertical: scale(8),
  },
  rowTitle: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    paddingHorizontal: scale(20),
    marginBottom: scale(12),
  },
  favStoriesScroll: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(6),
  },
  storyBookCard: {
    width: scale(130),
    marginRight: scale(14),
  },
  bookCoverContainer: {
    width: '100%',
    height: scale(160),
    borderRadius: scale(12),
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderMedium,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    marginBottom: scale(8),
  },
  bookCoverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: scale(8),
    left: scale(8),
    backgroundColor: colors.profileEditBgActive,
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
  },
  categoryBadgeText: {
    fontSize: fs(8),
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
    textTransform: 'uppercase',
  },
  storyBookTitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    paddingHorizontal: scale(2),
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
  },
  settingInfo: {
    flex: 1,
    marginRight: scale(10),
  },
  settingLabel: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  settingSubLabel: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    marginTop: scale(1),
  },
  languageToggleContainer: {
    flexDirection: 'row',
    borderRadius: scale(16),
    backgroundColor: colors.accentLightBg,
    padding: scale(3),
    borderWidth: 1,
    borderColor: colors.accentBorderSubtle,
  },
  langButton: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(14),
  },
  langButtonActive: {
    backgroundColor: colors.ring,
  },
  langButtonText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  langButtonTextActive: {
    color: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: scale(10),
  },
  modalCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlayBackdrop,
  },
  modalCard: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(24),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderMedium,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  modalIcon: {
    fontSize: fs(36),
    marginBottom: scale(12),
  },
  modalTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(8),
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: scale(18),
    marginBottom: scale(20),
  },
  modalButton: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(28),
    paddingVertical: scale(10),
    borderRadius: scale(12),
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: colors.white,
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
  },
  editButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    marginTop: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconImage: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    // tintColor: colors.ring,
  },
  editButtonText: {
    color: colors.ring,
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
  },
  giveUpButton: {
    backgroundColor: colors.dangerSubtle,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(8),
  },
  giveUpButtonText: {
    color: colors.profileGiveUpText,
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsMedium,
  },
  dangerZoneCard: {
    borderColor: colors.profileDangerZoneBorder,
    borderWidth: 1,
    marginTop: scale(16),
  },
  resetButton: {
    backgroundColor: colors.dangerSubtle,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(8),
  },
  resetButtonText: {
    color: colors.danger,
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsMedium,
  },
  modalTitleDestructive: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.danger,
    marginBottom: scale(8),
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: scale(17),
    marginBottom: scale(16),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(6),
    alignSelf: 'stretch',
  },
  checkbox: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(4),
    borderWidth: 1.5,
    borderColor: colors.mutedForeground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  checkboxActive: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSubtle,
  },
  checkboxTick: {
    color: colors.danger,
    fontSize: fs(11),
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
  },
  resetConfirmLabel: {
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    alignSelf: 'flex-start',
    marginTop: scale(14),
    marginBottom: scale(6),
  },
  resetTextInput: {
    width: '100%',
    height: scale(38),
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: scale(8),
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    color: colors.danger,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fs(13),
    textAlign: 'center',
  },
  resetActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scale(16),
  },
  resetCancelBtn: {
    flex: 1,
    marginRight: scale(6),
    height: scale(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  resetCancelText: {
    color: colors.secondary,
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(12),
  },
  resetConfirmBtn: {
    flex: 1,
    marginLeft: scale(6),
    height: scale(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    backgroundColor: colors.danger,
  },
  resetConfirmBtnDisabled: {
    backgroundColor: colors.neutralDisabled,
    opacity: 0.4,
  },
  resetConfirmText: {
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(12),
  },
  modalCloseBtn: {
    position: 'absolute',
    top: scale(14),
    right: scale(14),
    zIndex: 10,
    padding: scale(4),
  },
  modalCloseBtnText: {
    fontSize: fs(14),
    color: colors.mutedForeground,
    fontFamily: fonts.PoppinsRegular,
  },
  emptyFavoritesContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFavoritesText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    opacity: 0.6,
  },
  removeFavoriteBadge: {
    position: 'absolute',
    top: scale(6),
    right: scale(6),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  removeFavoriteText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.PoppinsBold,
    lineHeight: fs(15),
    textAlign: 'center',
  },

  // Japa Charts Styles
  metricContainer: {
    flexDirection: 'row',
    backgroundColor: colors.borderSubtle2,
    borderRadius: scale(8),
    padding: scale(2),
    marginBottom: scale(12),
    marginTop: scale(4),
  },
  metricTab: {
    flex: 1,
    paddingVertical: scale(6),
    alignItems: 'center',
    borderRadius: scale(6),
  },
  metricTabActive: {
    backgroundColor: colors.white,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  metricTabText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
  },
  metricTabTextActive: {
    color: colors.secondary,
    fontFamily: fonts.PoppinsSemiBold,
  },
  periodFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(14),
    gap: scale(4),
  },
  periodPill: {
    flex: 1,
    paddingVertical: scale(5),
    alignItems: 'center',
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  periodPillActive: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  periodPillText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
  },
  periodPillTextActive: {
    color: colors.white,
    fontFamily: fonts.PoppinsSemiBold,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(6),
  },
  emptyChartBox: {
    height: scale(120),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  emptyChartText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
  },
});

export default ProfileScreen;
