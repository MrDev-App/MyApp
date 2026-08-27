import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Platform, Vibration, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Storage, STORAGE_KEYS } from '../../../utile/storage';
import { MahaBharatStories, Story } from '../../../constants/storiesData';
import { MANTRAS_LIST } from '../../../constants/japData';
import {
  initNotifications,
  scheduleCustomReminder,
  cancelAllReminders,
  NotificationConfig,
} from '../../../notifee/notifications';
import { OverlayModalHandle } from '../../../components/OverlayModal';
import colors from '../../../utile/colors';

/** Trigger haptic / vibration feedback safely. */
const triggerHaptic = (style: 'light' | 'medium' | 'error') => {
  if (Platform.OS === 'android') {
    try { Vibration.vibrate(style === 'error' ? 200 : 30); } catch {}
  } else {
    const map = { light: 'impactLight', medium: 'impactMedium', error: 'notificationError' } as const;
    try {
      HapticFeedback.trigger(map[style], {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    } catch {}
  }
};

export const useProfileData = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  // ─── Refs ─────────────────────────────────────────────────────────────────
  const overlayRef = useRef<OverlayModalHandle>(null);
  const customMantrasModalRef = useRef<OverlayModalHandle>(null);
  const resetModalRef = useRef<OverlayModalHandle>(null);

  // ─── Notification state ───────────────────────────────────────────────────
  const [notificationsEnabled, setNotificationsEnabled] = useState(() =>
    Storage.getBoolean('DAILY_REMINDER_ENABLED', true),
  );
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [reminderConfig, setReminderConfig] = useState<NotificationConfig | null>(() => {
    try {
      const raw = Storage.getString('REMINDER_CONFIG', '');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // ─── Statistics state ─────────────────────────────────────────────────────
  const [totalCount, setTotalCount] = useState(0);
  const [totalMala, setTotalMala] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeTotalDays, setChallengeTotalDays] = useState(21);

  // ─── Calendar / history state ─────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split('T')[0],
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
    checkedChants && checkedChallenge && resetCode.trim().toUpperCase() === 'RESET';

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
      const defaultMantra = MANTRAS_LIST.find(m => m.id === id);
      if (defaultMantra) {
        return currentLanguage === 'hi' ? defaultMantra.nameHi : defaultMantra.nameEn;
      }
      const customMantra = customMantras.find(m => m.id === id);
      if (customMantra) {
        return currentLanguage === 'hi' ? customMantra.nameHi : customMantra.nameEn;
      }
      return id;
    },
    [customMantras, currentLanguage],
  );

  // ─── Load data on focus ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isFocused) { return; }

    Storage.checkAndResetTodayStats();
    setTotalCount(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT, 0));
    setTotalMala(Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA, 0));
    setTodayCount(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0));
    setChallengeStarted(Storage.getBoolean('CHALLENGE_STARTED', false));
    setChallengeTotalDays(Storage.getNumber('CHALLENGE_TOTAL_DAYS', 21));

    try {
      setJapaHistory(JSON.parse(Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}')));
    } catch {
      setJapaHistory({});
    }

    try {
      setCustomMantras(JSON.parse(Storage.getString(STORAGE_KEYS.CUSTOM_MANTRAS, '[]')));
    } catch {
      setCustomMantras([]);
    }

    try {
      const bookmarkedIds: string[] = JSON.parse(
        Storage.getString('STORY_BOOKMARKS', '[]'),
      );
      setFavoriteStories(
        Array.isArray(bookmarkedIds)
          ? MahaBharatStories.filter(s => bookmarkedIds.includes(s.id))
          : [],
      );
    } catch {
      setFavoriteStories([]);
    }
  }, [isFocused]);

  // ─── Notification handlers ─────────────────────────────────────────────────
  const handleSaveSchedule = useCallback(
    async (config: NotificationConfig) => {
      setScheduleModalVisible(false);
      setReminderConfig(config);
      Storage.set('REMINDER_CONFIG', JSON.stringify(config));
      setNotificationsEnabled(true);
      Storage.set('DAILY_REMINDER_ENABLED', true);
      await scheduleCustomReminder(config, currentLanguage);
    },
    [currentLanguage],
  );

  const handleToggleNotifications = useCallback(async (value: boolean) => {
    if (value) {
      const granted = await initNotifications();
      if (granted) {
        setScheduleModalVisible(true);
      } else {
        setNotificationsEnabled(false);
        Storage.set('DAILY_REMINDER_ENABLED', false);
      }
    } else {
      setNotificationsEnabled(false);
      Storage.set('DAILY_REMINDER_ENABLED', false);
      await cancelAllReminders();
    }
  }, []);

  // ─── Custom mantra handlers ───────────────────────────────────────────────
  const handleDeleteCustomMantra = useCallback(
    (mantraId: string, mantraName: string) => {
      Alert.alert(
        t(Translation.PROFILE_DELETE_MANTRA_CONFIRM_TITLE),
        t(Translation.PROFILE_DELETE_MANTRA_CONFIRM_MSG, { mantraName }),
        [
          { text: t(Translation.RESET_CANCEL_BTN), style: 'cancel' },
          {
            text: t(Translation.DELETE_LABEL),
            style: 'destructive',
            onPress: () => {
              triggerHaptic('medium');

              const updated = customMantras.filter(m => m.id !== mantraId);
              setCustomMantras(updated);
              Storage.set(STORAGE_KEYS.CUSTOM_MANTRAS, JSON.stringify(updated));

              const customTotalCount = Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`, 0);
              const customTotalMala = Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`, 0);
              const customTodayCount = Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`, 0);
              const customTodayMala = Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`, 0);

              const globalTotalCount = Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT, 0);
              const globalTotalMala = Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA, 0);
              const globalTodayCount = Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0);
              const globalTodayMala = Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA, 0);

              Storage.set(STORAGE_KEYS.JAP_TOTAL_COUNT, Math.max(0, globalTotalCount - customTotalCount));
              Storage.set(STORAGE_KEYS.JAP_TOTAL_MALA, Math.max(0, globalTotalMala - customTotalMala));
              Storage.set(STORAGE_KEYS.JAP_TODAY_COUNT, Math.max(0, globalTodayCount - customTodayCount));
              Storage.set(STORAGE_KEYS.JAP_TODAY_MALA, Math.max(0, globalTodayMala - customTodayMala));

              setTotalCount(prev => Math.max(0, prev - customTotalCount));
              setTotalMala(prev => Math.max(0, prev - customTotalMala));
              setTodayCount(prev => Math.max(0, prev - customTodayCount));

              Storage.delete(`${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`);
              Storage.delete(`${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`);
              Storage.delete(`${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`);
              Storage.delete(`${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`);
              Storage.delete(`JAP_TODAY_MALA_${mantraId}`);
              Storage.delete(`JAP_TODAY_COUNT_${mantraId}`);

              try {
                const rawHistory = Storage.getString(STORAGE_KEYS.JAP_HISTORY, '{}');
                const history = JSON.parse(rawHistory);
                let historyChanged = false;
                Object.keys(history).forEach(dateKey => {
                  const dayRecord = history[dateKey];
                  if (dayRecord?.mantras?.[mantraId]) {
                    const record = dayRecord.mantras[mantraId];
                    dayRecord.totalCount = Math.max(0, dayRecord.totalCount - record.count);
                    dayRecord.totalMala = Math.max(0, dayRecord.totalMala - record.mala);
                    delete dayRecord.mantras[mantraId];
                    if (dayRecord.totalCount <= 0 || Object.keys(dayRecord.mantras).length === 0) {
                      delete history[dateKey];
                    }
                    historyChanged = true;
                  }
                });
                if (historyChanged) {
                  Storage.set(STORAGE_KEYS.JAP_HISTORY, JSON.stringify(history));
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
    },
    [customMantras, t],
  );

  // ─── Favourite story handlers ─────────────────────────────────────────────
  const handleRemoveFavorite = useCallback((storyId: string) => {
    triggerHaptic('light');
    try {
      const raw = Storage.getString('STORY_BOOKMARKS', '[]');
      let list: string[] = JSON.parse(raw);
      if (Array.isArray(list)) {
        list = list.filter(id => id !== storyId);
        Storage.set('STORY_BOOKMARKS', JSON.stringify(list));
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

  return {
    // i18n
    t,
    currentLanguage,
    changeLanguage: (lng: string) => i18n.changeLanguage(lng),
    // refs
    overlayRef,
    customMantrasModalRef,
    resetModalRef,
    // notification
    notificationsEnabled,
    scheduleModalVisible,
    setScheduleModalVisible,
    reminderConfig,
    handleSaveSchedule,
    handleToggleNotifications,
    // stats
    totalCount,
    totalMala,
    todayCount,
    challengeStarted,
    challengeTotalDays,
    // calendar
    selectedDate,
    setSelectedDate,
    customMantras,
    markedDates,
    selectedDayRecord,
    getMantraName,
    // favourites
    favoriteStories,
    handleRemoveFavorite,
    // challenge
    handleGiveUpChallenge,
    // delete mantra
    handleDeleteCustomMantra,
    // reset modal
    checkedChants,
    setCheckedChants,
    checkedChallenge,
    setCheckedChallenge,
    resetCode,
    setResetCode,
    isResetEnabled,
    handleOpenResetModal,
    handleCloseResetModal,
    handleExecuteReset,
  };
};
