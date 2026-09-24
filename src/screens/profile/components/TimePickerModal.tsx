import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import BlurBackdrop from '@components/BlurBackdrop';
import LottieView from 'lottie-react-native';
import imagePath, { Bell } from '@assets/index';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import colors from '@theme/colors';
import { scale, verticalScale, fs } from '@theme/sizes';
import fonts from '@theme/fonts';
import { CloseIcon, PlusIcon, TrashIcon } from '@components/icons/SvgIcons';
import { ReminderItem } from '@services/notificationService';
import { triggerHaptic } from '@helper/helper';

const MAX_REMINDERS = 10;

interface TimePickerModalProps {
  visible: boolean;
  reminders: ReminderItem[];
  onClose: () => void;
  onSave: (updatedReminders: ReminderItem[]) => void;
  title?: string;
}

const formatReminderTime = (hour: number, minute: number, isPm: boolean) => {
  const h12 = hour % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${
    isPm ? 'PM' : 'AM'
  }`;
};

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  reminders,
  onClose,
  onSave,
  title,
}) => {
  const { t } = useTranslation();
  const [list, setList] = useState<ReminderItem[]>(reminders);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevVisibleRef = useRef<boolean>(visible);

  // Active time selected on the wheel spinner
  const [selectedTime, setSelectedTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(6, 0, 0, 0);
    return d;
  });

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      // Modal just opened
      setList(reminders);
      const d = new Date();
      d.setHours(6, 0, 0, 0);
      setSelectedTime(d);
      setIsLoading(false);
    } else if (visible) {
      // Sync list without resetting isLoading
      setList(reminders);
    } else {
      setIsLoading(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
    prevVisibleRef.current = visible;
  }, [visible, reminders]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  // ─── Add Reminder from Wheel ──────────────────────────────────────────────
  const handleAddReminderFromWheel = (dateToAdd: Date = selectedTime) => {
    if (isLoading) {
      return;
    }

    if (list.length >= MAX_REMINDERS) {
      Alert.alert(
        title || t(Translation.PROFILE_DAILY_NOTIFICATIONS),
        t(Translation.PROFILE_MAX_REMINDERS_REACHED, { count: MAX_REMINDERS }),
      );
      return;
    }

    const rawHours = dateToAdd.getHours();
    const minute = dateToAdd.getMinutes();
    const isPm = rawHours >= 12;
    const hour = rawHours % 12 || 12;

    // Check if duplicate already exists
    const isDuplicate = list.some(
      r => r.hour === hour && r.minute === minute && r.isPm === isPm,
    );

    if (isDuplicate) {
      Alert.alert(
        title || t(Translation.PROFILE_DAILY_NOTIFICATIONS),
        t(Translation.PROFILE_REMINDER_ALREADY_ADDED, {
          time: formatReminderTime(hour, minute, isPm),
        }),
      );
      return;
    }

    triggerHaptic('medium');
    setIsLoading(true);

    const newItem: ReminderItem = {
      id: `reminder_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 6)}`,
      hour,
      minute,
      isPm,
      enabled: true,
    };

    const updated = [...list, newItem];
    setList(updated);
    onSave(updated);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Android imperative time picker
  const openAndroidTimePicker = () => {
    if (isLoading) {
      return;
    }
    triggerHaptic('light');
    if (list.length >= MAX_REMINDERS) {
      Alert.alert(
        title || t(Translation.PROFILE_DAILY_NOTIFICATIONS),
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
          handleAddReminderFromWheel(date);
        }
      },
    });
  };

  const handleToggleItem = (id: string, value: boolean) => {
    triggerHaptic('light');
    const updated = list.map(item =>
      item.id === id ? { ...item, enabled: value } : item,
    );
    setList(updated);
    onSave(updated);
  };

  const handleDeleteItem = (id: string) => {
    triggerHaptic('medium');
    const updated = list.filter(item => item.id !== id);
    setList(updated);
    onSave(updated);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlayContainer}>
        {/* Full-screen Dark Blur Backdrop */}
        <BlurBackdrop />

        {/* Centered Modal Card */}
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.title}>
                {title || t(Translation.PROFILE_DAILY_NOTIFICATIONS)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
            >
              <CloseIcon
                size={scale(13)}
                color={colors.white}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={styles.subTitle}>
            {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
          </Text>

          {/* ── 1. Wheel Spinner (Prominent at top) ── */}
          {Platform.OS === 'ios' ? (
            <View style={styles.wheelSection}>
              <View style={styles.pickerContainer}>
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

              {/* Add / Save Button for Wheel */}
              {list.length < MAX_REMINDERS ? (
                <TouchableOpacity
                  style={styles.addWheelBtn}
                  onPress={() => handleAddReminderFromWheel(selectedTime)}
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
                        size={scale(14)}
                        color={colors.white}
                        strokeWidth={2.5}
                      />
                      <Text style={styles.addWheelBtnText}>
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
          ) : (
            <View style={{ marginBottom: verticalScale(10) }}>
              <TouchableOpacity
                style={styles.addWheelBtn}
                onPress={openAndroidTimePicker}
                activeOpacity={0.8}
                disabled={list.length >= MAX_REMINDERS || isLoading}
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
                      size={scale(14)}
                      color={colors.white}
                      strokeWidth={2.5}
                    />
                    <Text style={styles.addWheelBtnText}>
                      {list.length >= MAX_REMINDERS
                        ? t(Translation.PROFILE_MAX_REMINDERS_REACHED, {
                            count: MAX_REMINDERS,
                          })
                        : t(Translation.PROFILE_SET_REMINDER)}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Separator */}
          <View style={styles.sectionDivider} />

          {/* ── 2. Saved Reminders List (Shown below wheel) ── */}
          <View style={styles.savedSectionHeader}>
            <Text style={styles.savedSectionTitle}>
              {t(Translation.PROFILE_SAVED_REMINDERS)}
            </Text>
            <Text style={styles.savedCountText}>
              {t(Translation.PROFILE_ACTIVE_REMINDERS_COUNT, {
                count: list.filter(r => r.enabled).length,
              })}
            </Text>
          </View>

          <ScrollView
            style={styles.listScrollView}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {list.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {t(Translation.PROFILE_NO_REMINDERS_YET)}
                </Text>
              </View>
            ) : (
              list.map((item, index) => (
                <View key={item.id || index} style={styles.reminderCard}>
                  {/* Left: Bell icon & Time */}
                  <View style={styles.timeInfoRow}>
                    <View style={styles.bellIconCircle}>
                      <Bell width={scale(15)} height={scale(15)} />
                    </View>
                    <Text
                      style={[
                        styles.reminderTimeText,
                        !item.enabled && { opacity: 0.4 },
                      ]}
                    >
                      {formatReminderTime(item.hour, item.minute, item.isPm)}
                    </Text>
                  </View>

                  {/* Right: Switch toggle & Delete */}
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
                        size={scale(14)}
                        color={colors.destructive || colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  modalCard: {
    width: '100%',
    maxWidth: scale(350),
    maxHeight: verticalScale(600),
    backgroundColor: colors.primary,
    borderRadius: scale(22),

    padding: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
    zIndex: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(6),
    borderBottomWidth: 1,
    borderBottomColor: colors.ring,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  title: {
    fontSize: fs(17),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
    letterSpacing: 0.2,
  },
  countBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderRadius: scale(10),
  },
  countBadgeText: {
    color: colors.white,
    fontSize: fs(10.5),
    fontWeight: '700',
  },
  closeBtn: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: fs(11.5),
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
    opacity: 0.8,
    marginTop: verticalScale(4),
    marginBottom: verticalScale(8),
  },
  wheelSection: {
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  pickerContainer: {
    width: '100%',
    height: verticalScale(125),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  selectionHighlight: {
    position: 'absolute',
    width: '90%',
    height: scale(28),
    borderRadius: scale(8),
    backgroundColor: colors.ring,
    opacity: 0.85,
  },
  picker: {
    width: '100%',
    height: verticalScale(125),
  },
  addWheelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    width: '100%',
    height: scale(36),
    borderRadius: scale(10),
    backgroundColor: colors.ring,
    marginTop: verticalScale(4),
  },
  addWheelBtnText: {
    color: colors.white,
    fontSize: fs(13),
    fontWeight: '700',
  },
  btnLottie: {
    width: scale(36),
    height: scale(36),
  },
  maxLimitText: {
    color: colors.mutedForeground,
    fontSize: fs(11),
    fontStyle: 'italic',
    marginTop: verticalScale(4),
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.accentOrangeMedium,
    marginVertical: verticalScale(8),
  },
  savedSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  savedSectionTitle: {
    fontSize: fs(13),
    fontWeight: '700',
    color: colors.black,
    fontFamily: fonts.TiroHindiRegular,
  },
  savedCountText: {
    fontSize: fs(11),
    color: colors.ring,
    fontWeight: '600',
  },
  listScrollView: {
    maxHeight: verticalScale(140),
  },
  listContent: {
    gap: verticalScale(6),
    paddingVertical: verticalScale(2),
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.overlayLight,
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    borderWidth: 1,
    borderColor: colors.accentOrangeBorder,
  },
  timeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flex: 1,
  },
  bellIconCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: colors.accentOrangeBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderTimeText: {
    fontSize: fs(14.5),
    fontWeight: '700',
    color: colors.black,
    letterSpacing: 0.3,
  },
  itemRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  deleteBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: colors.alertRedSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
  },
  emptyText: {
    fontSize: fs(11.5),
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
    textAlign: 'center',
    opacity: 0.7,
  },
  footerRow: {
    width: '100%',
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  cancelBtn: {
    flex: 1,
    height: scale(38),
    borderRadius: scale(10),
    backgroundColor: colors.borderClassicSubtle,
    borderWidth: 1,
    borderColor: colors.overlayDarkSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: colors.secondary,
    fontSize: fs(13),
    fontWeight: '600',
  },
  doneBtn: {
    flex: 1,
    height: scale(38),
    borderRadius: scale(10),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  doneBtnText: {
    color: colors.white,
    fontSize: fs(13),
    fontWeight: '700',
  },
});

export default TimePickerModal;
