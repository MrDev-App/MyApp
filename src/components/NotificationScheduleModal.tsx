import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import colors from '../utile/colors';
import fonts from '../utile/fonts';
import { fs, scale } from '../utile/sizes';
import { NotificationConfig } from '../notifee/notifications';

interface NotificationScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  onSchedule: (config: NotificationConfig) => void;
  initialConfig?: NotificationConfig | null;
}

import {
  MONTHS,
  HOUR_ITEMS,
  MINUTE_ITEMS,
  ITEM_HEIGHT,
} from '../constants/notificationData';

import { ScrollPicker } from '../screens/profile/components/ScrollPicker';
import GradientBackground from './GradientBackground';

export default function NotificationScheduleModal({
  visible,
  onClose,
  onSchedule,
  initialConfig,
}: NotificationScheduleModalProps) {
  // Time States
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [isPm, setIsPm] = useState(false);

  // Frequency States
  const [type, setType] = useState<'daily' | 'date' | 'weekly'>('daily');

  // Specific Date States
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Weekly Days States (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const [weekdays, setWeekdays] = useState<number[]>([1, 2, 3, 4, 5]); // Default Mon-Fri

  // Reset/Load settings on visible
  useEffect(() => {
    if (visible) {
      if (initialConfig) {
        setHour(initialConfig.hour);
        setMinute(initialConfig.minute);
        setIsPm(initialConfig.isPm);
        setType(initialConfig.type);
        if (initialConfig.dateString) {
          const parts = initialConfig.dateString.split('-');
          if (parts.length === 3) {
            setSelectedYear(parseInt(parts[0], 10));
            setSelectedMonth(parseInt(parts[1], 10) - 1);
            setSelectedDay(parseInt(parts[2], 10));
          }
        }
        if (initialConfig.weekdays) {
          setWeekdays(initialConfig.weekdays);
        }
      } else {
        // Default defaults
        const now = new Date();
        let h = now.getHours();
        const pm = h >= 12;
        if (h > 12) h -= 12;
        if (h === 0) h = 12;

        setHour(h);
        setMinute(now.getMinutes());
        setIsPm(pm);
        setType('daily');
        setSelectedMonth(now.getMonth());
        setSelectedDay(now.getDate());
        setSelectedYear(now.getFullYear());
        setWeekdays([1, 2, 3, 4, 5]);
      }
    }
  }, [visible, initialConfig]);

  const incrementDay = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    setSelectedDay(prev => (prev === daysInMonth ? 1 : prev + 1));
  };

  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  const isMonthDecrementDisabled = selectedMonth <= currentMonth;
  const isDayDecrementDisabled =
    selectedMonth === currentMonth && selectedDay <= currentDay;

  const decrementDay = () => {
    if (isDayDecrementDisabled) return;
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    setSelectedDay(prev => (prev === 1 ? daysInMonth : prev - 1));
  };

  const incrementMonth = () => {
    setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1));
  };

  const decrementMonth = () => {
    if (isMonthDecrementDisabled) return;
    setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1));
  };

  const toggleWeekday = (day: number) => {
    if (weekdays.includes(day)) {
      if (weekdays.length > 1) {
        setWeekdays(prev => prev.filter(d => d !== day));
      }
    } else {
      setWeekdays(prev => [...prev, day].sort());
    }
  };

  // Check if selected specific date/time is in the past
  const checkIsPast = () => {
    if (type !== 'date') return false;
    let triggerHour = hour;
    if (isPm && triggerHour < 12) {
      triggerHour += 12;
    } else if (!isPm && triggerHour === 12) {
      triggerHour = 0;
    }
    const targetDate = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      triggerHour,
      minute,
      0,
      0,
    );
    return targetDate.getTime() <= Date.now();
  };

  const isPast = checkIsPast();

  const handleSave = () => {
    if (isPast) return;

    let triggerHour = hour;
    if (isPm && triggerHour < 12) {
      triggerHour += 12;
    } else if (!isPm && triggerHour === 12) {
      triggerHour = 0;
    }

    // Format date string for specific date "YYYY-MM-DD"
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(selectedDay).padStart(2, '0');
    const dateString = `${selectedYear}-${monthStr}-${dayStr}`;

    onSchedule({
      type,
      hour,
      minute,
      isPm,
      dateString: type === 'date' ? dateString : undefined,
      weekdays: type === 'weekly' ? weekdays : undefined,
    });
  };

  return (
    <Modal
      visible={visible}
      // transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop (sibling behind modal card) */}
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.65)' },
          ]}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Modal Card Content Container */}
        <View style={styles.overlay} pointerEvents="box-none">
          <GradientBackground
            style={[styles.modalCard, { flex: 0, overflow: 'hidden' }]}
          >
            <Text style={styles.modalTitle}>Schedule Sadhana</Text>

            <View style={styles.scrollArea}>
              {/* 1. Time Selector */}
              <Text style={styles.sectionLabel}>Select Time</Text>
              <View style={styles.timeSelectorContainer}>
                {/* Scrollable Hours */}
                <ScrollPicker
                  items={HOUR_ITEMS}
                  selectedValue={String(hour).padStart(2, '0')}
                  onValueChange={val => setHour(parseInt(val, 10))}
                />

                <Text style={styles.colon}>:</Text>

                {/* Scrollable Minutes */}
                <ScrollPicker
                  items={MINUTE_ITEMS}
                  selectedValue={String(minute).padStart(2, '0')}
                  onValueChange={val => setMinute(parseInt(val, 10))}
                />

                {/* AM/PM Toggle */}
                <View style={styles.ampmContainer}>
                  <TouchableOpacity
                    onPress={() => setIsPm(false)}
                    style={[
                      styles.ampmButton,
                      !isPm && styles.ampmActiveButton,
                    ]}
                  >
                    <Text
                      style={[styles.ampmText, !isPm && styles.ampmActiveText]}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsPm(true)}
                    style={[styles.ampmButton, isPm && styles.ampmActiveButton]}
                  >
                    <Text
                      style={[styles.ampmText, isPm && styles.ampmActiveText]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 2. Frequency Selector */}
              <Text style={styles.sectionLabel}>Frequency</Text>
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  onPress={() => setType('daily')}
                  style={[
                    styles.tabButton,
                    type === 'daily' && styles.activeTabButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      type === 'daily' && styles.activeTabText,
                    ]}
                  >
                    Daily
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType('date')}
                  style={[
                    styles.tabButton,
                    type === 'date' && styles.activeTabButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      type === 'date' && styles.activeTabText,
                    ]}
                  >
                    Specific Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType('weekly')}
                  style={[
                    styles.tabButton,
                    type === 'weekly' && styles.activeTabButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      type === 'weekly' && styles.activeTabText,
                    ]}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 3. Conditional Options */}
              {type === 'date' && (
                <View style={styles.conditionalContainer}>
                  <Text style={styles.sectionLabel}>Select Date</Text>

                  <View style={styles.dateSelectorContainer}>
                    {/* Month */}
                    <View style={styles.dateGroup}>
                      <TouchableOpacity
                        onPress={incrementMonth}
                        style={styles.dateArrow}
                      >
                        <Text style={styles.dateArrowText}>▲</Text>
                      </TouchableOpacity>
                      <Text style={styles.dateValText}>
                        {MONTHS[selectedMonth]}
                      </Text>
                      <TouchableOpacity
                        disabled={isMonthDecrementDisabled}
                        onPress={decrementMonth}
                        style={styles.dateArrow}
                      >
                        <Text
                          style={[
                            styles.dateArrowText,
                            isMonthDecrementDisabled && { color: '#444446' },
                          ]}
                        >
                          ▼
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Day */}
                    <View style={styles.dateGroup}>
                      <TouchableOpacity
                        onPress={incrementDay}
                        style={styles.dateArrow}
                      >
                        <Text style={styles.dateArrowText}>▲</Text>
                      </TouchableOpacity>
                      <Text style={styles.dateValText}>
                        {String(selectedDay).padStart(2, '0')}
                      </Text>
                      <TouchableOpacity
                        disabled={isDayDecrementDisabled}
                        onPress={decrementDay}
                        style={styles.dateArrow}
                      >
                        <Text
                          style={[
                            styles.dateArrowText,
                            isDayDecrementDisabled && { color: '#444446' },
                          ]}
                        >
                          ▼
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {type === 'weekly' && (
                <View style={styles.conditionalContainer}>
                  <Text style={styles.sectionLabel}>Select Days</Text>
                  <View style={styles.weekdaysContainer}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, idx) => {
                      const isSelected = weekdays.includes(idx);
                      return (
                        <TouchableOpacity
                          key={`weekday_${idx}`}
                          onPress={() => toggleWeekday(idx)}
                          style={[
                            styles.dayCircle,
                            isSelected && styles.dayCircleActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayCircleText,
                              isSelected && styles.dayCircleTextActive,
                            ]}
                          >
                            {dayName}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            {isPast && (
              <Text style={styles.warningText}>
                Please select a future date and time
              </Text>
            )}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btn, styles.btnCancel]}
              >
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isPast}
                onPress={handleSave}
                style={[
                  styles.btn,
                  styles.btnSave,
                  isPast && {
                    backgroundColor: '#3A3A3E',
                    borderColor: '#3A3A3E',
                  },
                ]}
              >
                <Text
                  style={[styles.btnSaveText, isPast && { color: '#8E8E93' }]}
                >
                  Save Reminder
                </Text>
              </TouchableOpacity>
            </View>
          </GradientBackground>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modalCard: {
    width: '100%',
    maxWidth: scale(340),
    backgroundColor: 'transparent',
    borderRadius: scale(24),
    borderWidth: 1.5,
    borderColor: colors.ring,
    padding: scale(20),
    alignItems: 'center',
    maxHeight: '90%',
  },
  modalTitle: {
    fontFamily: fonts.Marcellus,
    fontSize: fs(20),
    color: colors.black,
    marginBottom: scale(15),
  },
  scrollArea: {
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: scale(15),
  },
  sectionLabel: {
    fontSize: fs(13),
    color: colors.black,
    marginBottom: scale(8),
    fontFamily: fonts.Marcellus,
    marginTop: scale(10),
  },
  timeSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: scale(16),
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
    marginBottom: scale(15),
  },
  controlGroup: {
    alignItems: 'center',
    width: scale(55),
  },
  arrowButton: {
    padding: scale(4),
  },
  arrowText: {
    fontSize: fs(10),
    color: colors.ring,
  },
  numberText: {
    fontSize: fs(28),
    fontFamily: fonts.Marcellus,
    color: colors.white,
    marginVertical: scale(2),
  },
  colon: {
    fontSize: fs(28),
    color: colors.ring,
    marginHorizontal: scale(8),
    paddingBottom: scale(4),
  },
  ampmContainer: {
    marginLeft: scale(15),
    backgroundColor: 'transparent',
    borderRadius: scale(10),
    padding: scale(3),
  },
  ampmButton: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  ampmActiveButton: {
    backgroundColor: colors.ring,
  },
  ampmText: {
    fontSize: fs(11),
    color: colors.black,
    fontWeight: 'bold',
  },
  ampmActiveText: {
    color: colors.black,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: scale(12),
    padding: scale(3),
    marginBottom: scale(15),
  },
  tabButton: {
    flex: 1,
    paddingVertical: scale(8),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.ring,
  },
  tabText: {
    fontSize: fs(11),
    color: colors.black,
    fontFamily: fonts.Marcellus,
  },
  activeTabText: {
    color: colors.white,
  },
  conditionalContainer: {
    width: '100%',
  },
  dateSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: scale(16),
    paddingVertical: scale(12),
    marginBottom: scale(10),
  },
  dateGroup: {
    alignItems: 'center',
    width: scale(75),
    marginHorizontal: scale(10),
  },
  dateArrow: {
    padding: scale(4),
  },
  dateArrowText: {
    fontSize: fs(10),
    color: colors.ring,
  },
  dateValText: {
    fontSize: fs(20),
    fontFamily: fonts.Marcellus,
    color: colors.white,
    marginVertical: scale(2),
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: '#2A2A2E',
    borderRadius: scale(16),
    padding: scale(10),
    marginBottom: scale(10),
  },
  dayCircle: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: '#1E1E22',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3E',
  },
  dayCircleActive: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  dayCircleText: {
    fontSize: fs(11),
    color: colors.white,
    fontWeight: 'bold',
  },
  dayCircleTextActive: {
    color: colors.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  btn: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ring,
  },
  btnCancel: {
    borderWidth: 1.5,
    borderColor: colors.ring,
    marginRight: scale(8),
  },
  btnCancelText: {
    color: colors.white,
    fontFamily: fonts.Marcellus,
    fontSize: fs(14),
  },
  btnSave: {
    backgroundColor: colors.ring,
    marginLeft: scale(8),
  },
  btnSaveText: {
    color: colors.white,
    fontFamily: fonts.Marcellus,
    fontSize: fs(14),
  },
  warningText: {
    color: '#FF453A',
    fontSize: fs(11),
    fontFamily: fonts.Marcellus,
    textAlign: 'center',
    marginBottom: scale(8),
  },
});
