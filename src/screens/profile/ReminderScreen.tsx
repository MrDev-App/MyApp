import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import imagePath, { Back, Bell } from '@assets/index';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import colors from '@theme/colors';
import { scale, verticalScale, fs } from '@theme/sizes';
import fonts from '@theme/fonts';
import { PlusIcon, TrashIcon, ChevronRight } from '@components/icons/SvgIcons';
import GradientBackground from '@components/GradientBackground';
import TextField from '@components/TextField';
import {
  ReminderItem,
  scheduleMultipleReminders,
} from '@services/notificationService';
import { Storage, STORAGE_KEYS } from '@services/storageService';
import { triggerHaptic } from '@helper/helper';

const MAX_REMINDERS = 10;

const formatReminderTime = (hour: number, minute: number, isPm: boolean) => {
  const h12 = hour % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${
    isPm ? 'PM' : 'AM'
  }`;
};

const ReminderScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const currentLanguage = (i18n.language?.startsWith('en') ? 'en' : 'hi') as
    | 'en'
    | 'hi';

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

  // Time state for the wheel spinner
  const [selectedTime, setSelectedTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(6, 0, 0, 0);
    return d;
  });

  // Custom message inputs & error state
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subtitleError, setSubtitleError] = useState('');

  // Loading spinner state
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const saveRemindersList = useCallback(
    async (updated: ReminderItem[]) => {
      setReminders(updated);
      if (updated.length === 0) {
        Storage.delete(STORAGE_KEYS.DAILY_REMINDERS_LIST);
      } else {
        Storage.set(STORAGE_KEYS.DAILY_REMINDERS_LIST, JSON.stringify(updated));
      }
      await scheduleMultipleReminders(updated, currentLanguage);
    },
    [currentLanguage],
  );

  // ─── Add Reminder ──────────────────────────────────────────────────────────
  const handleAddReminder = (dateToAdd: Date = selectedTime) => {
    if (isLoading) return;

    const trimmedTitle = customTitle.trim();
    const trimmedSubtitle = customSubtitle.trim();

    let hasError = false;
    if (!trimmedTitle) {
      setTitleError(t(Translation.PROFILE_REMINDER_TITLE_REQUIRED));
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!trimmedSubtitle) {
      setSubtitleError(t(Translation.PROFILE_REMINDER_MSG_REQUIRED));
      hasError = true;
    } else {
      setSubtitleError('');
    }

    if (hasError) {
      triggerHaptic('light');
      return;
    }

    if (reminders.length >= MAX_REMINDERS) {
      Alert.alert(
        t(Translation.PROFILE_DAILY_NOTIFICATIONS),
        t(Translation.PROFILE_MAX_REMINDERS_REACHED, { count: MAX_REMINDERS }),
      );
      return;
    }

    const rawHours = dateToAdd.getHours();
    const minute = dateToAdd.getMinutes();
    const isPm = rawHours >= 12;
    const hour = rawHours % 12 || 12;

    const isDuplicate = reminders.some(
      r => r.hour === hour && r.minute === minute && r.isPm === isPm,
    );

    if (isDuplicate) {
      Alert.alert(
        t(Translation.PROFILE_DAILY_NOTIFICATIONS),
        t(Translation.PROFILE_REMINDER_ALREADY_ADDED, {
          time: formatReminderTime(hour, minute, isPm),
        }),
      );
      return;
    }

    triggerHaptic('light');
    setIsLoading(true);

    const newItem: ReminderItem = {
      id: `reminder_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 6)}`,
      hour,
      minute,
      isPm,
      enabled: true,
      title: trimmedTitle,
      subtitle: trimmedSubtitle,
    };

    const updated = [...reminders, newItem];
    saveRemindersList(updated);

    // Reset custom message inputs and errors
    setCustomTitle('');
    setCustomSubtitle('');
    setTitleError('');
    setSubtitleError('');

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Android time picker
  const openAndroidTimePicker = () => {
    if (isLoading) return;

    if (reminders.length >= MAX_REMINDERS) {
      Alert.alert(
        t(Translation.PROFILE_DAILY_NOTIFICATIONS),
        t(Translation.PROFILE_MAX_REMINDERS_REACHED, { count: MAX_REMINDERS }),
      );
      return;
    }

    DateTimePickerAndroid.open({
      value: selectedTime,
      mode: 'time',
      is24Hour: false,
      onChange: (event, date) => {
        if (event.type === 'set' && date) {
          setSelectedTime(date);
        }
      },
    });
  };

  const handleToggleItem = (id: string, value: boolean) => {
    triggerHaptic('light');
    const updated = reminders.map(item =>
      item.id === id ? { ...item, enabled: value } : item,
    );
    saveRemindersList(updated);
  };

  const handleDeleteItem = (id: string) => {
    triggerHaptic('light');
    const updated = reminders.filter(item => item.id !== id);
    saveRemindersList(updated);
  };

  const activeCount = reminders.filter(r => r.enabled).length;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.7}
          >
            <Back width={scale(16)} height={scale(16)} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {t(Translation.PROFILE_DAILY_NOTIFICATIONS)}
            </Text>
            <Text style={styles.headerSubTitle}>
              {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>
              {reminders.length}/{MAX_REMINDERS}
            </Text>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.flexOne}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 20 : 0}
        >
          {/* ── 1. Time Wheel & Custom Message Card ── */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>
              {t(Translation.PROFILE_REMINDER_SELECT_TIME)}
            </Text>

            {Platform.OS === 'ios' ? (
              <View style={styles.pickerWrapper}>
                <View style={styles.selectionHighlight} />
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={(_, date) => {
                    if (date) setSelectedTime(date);
                  }}
                  themeVariant="light"
                  style={styles.picker}
                />
              </View>
            ) : (
              <View style={styles.androidPickerBtnContainer}>
                <TouchableOpacity
                  style={styles.androidTimeBtn}
                  onPress={openAndroidTimePicker}
                  activeOpacity={0.8}
                >
                  <View style={styles.androidClockBadge}>
                    <Bell width={scale(22)} height={scale(22)} />
                  </View>

                  <View style={styles.androidTimeInfo}>
                    <Text style={styles.androidTimeLabel}>
                      {t(Translation.PROFILE_REMINDER_SELECTED_TIME)}
                    </Text>
                    <Text style={styles.androidTimeBtnText}>
                      {formatReminderTime(
                        selectedTime.getHours(),
                        selectedTime.getMinutes(),
                        selectedTime.getHours() >= 12,
                      )}
                    </Text>
                  </View>

                  <View style={styles.androidChangeChip}>
                    <Text style={styles.androidChangeChipText}>
                      {t(Translation.PROFILE_REMINDER_CHANGE)}
                    </Text>
                    <ChevronRight
                      size={scale(11)}
                      color={colors.white}
                      strokeWidth={2.5}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* ── Custom Message Inputs ── */}
            <View style={styles.inputSection}>
              <TextField
                label={t(Translation.PROFILE_REMINDER_TITLE_LABEL)}
                isRequired={true}
                error={titleError}
                placeholder={t(Translation.PROFILE_REMINDER_TITLE_PLACEHOLDER)}
                value={customTitle}
                onChangeText={text => {
                  setCustomTitle(text);
                  if (titleError) setTitleError('');
                }}
                maxLength={40}
                returnKeyType="next"
              />

              <TextField
                label={t(Translation.PROFILE_REMINDER_MSG_LABEL)}
                isRequired={true}
                error={subtitleError}
                placeholder={t(Translation.PROFILE_REMINDER_MSG_PLACEHOLDER)}
                value={customSubtitle}
                onChangeText={text => {
                  setCustomSubtitle(text);
                  if (subtitleError) setSubtitleError('');
                }}
                maxLength={80}
                multiline
                numberOfLines={2}
                returnKeyType="done"
              />
            </View>

            {/* ── Add This Time Button ── */}
            {reminders.length < MAX_REMINDERS ? (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddReminder(selectedTime)}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LottieView
                    source={imagePath.loading}
                    autoPlay
                    loop
                    style={styles.btnLottie}
                  />
                ) : (
                  <>
                    <PlusIcon
                      size={scale(15)}
                      color={colors.white}
                      strokeWidth={2}
                    />
                    <Text style={styles.addBtnText}>
                      {t(Translation.PROFILE_SET_REMINDER)}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <Text style={styles.maxLimitText}>
                {t(Translation.PROFILE_MAX_REMINDERS_REACHED, {
                  count: MAX_REMINDERS,
                })}
              </Text>
            )}
          </View>

          {/* ── 2. Saved Reminders Section ── */}
          <View style={styles.savedSectionHeader}>
            <Text style={styles.savedSectionTitle}>
              {t(Translation.PROFILE_SAVED_REMINDERS)}
            </Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>
                {t(Translation.PROFILE_ACTIVE_REMINDERS_COUNT, {
                  count: activeCount,
                })}
              </Text>
            </View>
          </View>
          <ScrollView
            style={styles.flexOne}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {reminders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Bell width={scale(36)} height={scale(36)} />
                <Text style={styles.emptyText}>
                  {t(Translation.PROFILE_NO_REMINDERS_YET)}
                </Text>
              </View>
            ) : (
              reminders.map((item, index) => (
                <View key={item.id || index} style={styles.reminderCard}>
                  {/* Left: Bell icon */}
                  <View style={styles.bellIconCircle}>
                    <Bell width={scale(16)} height={scale(16)} />
                  </View>

                  {/* Middle: Details */}
                  <View style={styles.reminderInfo}>
                    <Text
                      style={[
                        styles.reminderTimeText,
                        !item.enabled && styles.disabledText,
                      ]}
                    >
                      {formatReminderTime(item.hour, item.minute, item.isPm)}
                    </Text>

                    {item.title ? (
                      <Text
                        style={[
                          styles.reminderCustomTitle,
                          !item.enabled && styles.disabledText,
                        ]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                    ) : null}

                    {item.subtitle ? (
                      <Text
                        style={[
                          styles.reminderCustomSubtitle,
                          !item.enabled && styles.disabledText,
                        ]}
                        numberOfLines={2}
                      >
                        {item.subtitle}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.reminderDefaultSub,
                          !item.enabled && styles.disabledText,
                        ]}
                      >
                        {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
                      </Text>
                    )}
                  </View>

                  {/* Right: Toggle & Delete */}
                  <View style={styles.itemRightActions}>
                    <Switch
                      trackColor={{
                        false: colors.switchTrackFalse,
                        true: colors.ring,
                      }}
                      thumbColor={
                        item.enabled ? colors.white : colors.switchThumbFalse
                      }
                      onValueChange={v => handleToggleItem(item.id, v)}
                      value={item.enabled}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteItem(item.id)}
                      style={styles.deleteBtn}
                      activeOpacity={0.7}
                    >
                      <TrashIcon
                        size={scale(15)}
                        color={colors.destructive || colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            <View style={{ height: verticalScale(40) }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  backBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(30),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  headerTitle: {
    fontSize: fs(17.5),

    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
  },
  headerSubTitle: {
    fontSize: fs(11),
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
    opacity: 0.85,
  },
  countBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(9),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  countBadgeText: {
    color: colors.white,
    fontSize: fs(11.5),
    fontWeight: '700',
  },
  scrollContent: {
    padding: scale(16),
  },
  card: {
    borderRadius: scale(18),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    paddingTop: scale(8),
  },
  sectionLabel: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
  },
  pickerWrapper: {
    width: '100%',
    height: verticalScale(130),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  selectionHighlight: {
    position: 'absolute',
    width: '90%',
    height: scale(30),
    borderRadius: scale(8),
    backgroundColor: colors.ring,
    opacity: 0.85,
  },
  picker: {
    width: '100%',
    height: verticalScale(130),
  },
  androidPickerBtnContainer: {
    marginVertical: verticalScale(4),
    width: '100%',
  },
  androidTimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderWidth: 1.5,
    borderColor: 'rgba(251, 148, 55, 0.35)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  androidClockBadge: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
  },

  androidTimeInfo: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  androidTimeLabel: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    opacity: 0.75,
  },
  androidTimeBtnText: {
    fontSize: fs(19),
    fontWeight: '700',
    color: colors.black,
    fontFamily: fonts.TiroHindiRegular,
    marginTop: verticalScale(2),
  },
  androidChangeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ring,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
    gap: scale(3),
  },
  androidChangeChipText: {
    fontSize: fs(11),
    fontWeight: '700',
    color: colors.white,
  },
  inputSection: {},
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    width: '100%',
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: colors.ring,
    marginTop: verticalScale(14),
  },
  addBtnText: {
    color: colors.white,
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  btnLottie: {
    width: scale(38),
    height: scale(38),
  },
  maxLimitText: {
    color: colors.mutedForeground,
    fontSize: fs(11),
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  savedSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(4),
    marginTop: scale(14),
    paddingHorizontal: scale(16),
  },
  savedSectionTitle: {
    fontSize: fs(13),

    color: colors.black,
    fontFamily: fonts.TiroHindiRegular,
  },
  activeBadge: {
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(8),
  },
  activeBadgeText: {
    fontSize: fs(11),
    color: colors.ring,
    fontFamily: fonts.TiroHindiRegular,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(30),
    gap: verticalScale(10),
    backgroundColor: colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.2)',
  },
  emptyText: {
    fontSize: fs(12),
    color: colors.secondary,
    textAlign: 'center',
    paddingHorizontal: scale(24),
    lineHeight: fs(17),
    fontFamily: fonts.TiroHindiRegular,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: scale(10),
  },
  bellIconCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTimeText: {
    fontSize: fs(15),
    fontWeight: '700',
    color: colors.black,
  },
  reminderCustomTitle: {
    fontSize: fs(12.5),
    fontWeight: '600',
    color: colors.black,
    marginTop: verticalScale(1),
  },
  reminderCustomSubtitle: {
    fontSize: fs(11),
    color: colors.secondary,
    marginTop: verticalScale(1),
    opacity: 0.85,
  },
  reminderDefaultSub: {
    fontSize: fs(10.5),
    color: colors.secondary,
    marginTop: verticalScale(1),
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.35,
  },
  itemRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  deleteBtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReminderScreen;
