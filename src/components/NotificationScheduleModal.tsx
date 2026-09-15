import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale, verticalScale } from '@theme/sizes';
import { NotificationConfig } from '@services/notificationService';
import { HOUR_ITEMS, MINUTE_ITEMS } from '@constants/notificationData';
import { ScrollPicker } from '@screens/profile/components/ScrollPicker';
import BlurBackdrop from '@components/BlurBackdrop';

interface NotificationScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  onSchedule: (config: NotificationConfig) => void;
  initialConfig?: NotificationConfig | null;
}

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

  // Reset/Load settings on visible
  useEffect(() => {
    if (visible) {
      if (initialConfig) {
        setHour(initialConfig.hour);
        setMinute(initialConfig.minute);
        setIsPm(initialConfig.isPm);
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
      }
    }
  }, [visible, initialConfig]);

  const handleSave = () => {
    onSchedule({
      type: 'daily',
      hour,
      minute,
      isPm,
    });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <BlurBackdrop />
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Schedule Sadhana</Text>

              <View style={styles.scrollArea}>
                <Text style={styles.sectionLabel}>Select Time</Text>
                <View style={styles.timeSelectorContainer}>
                  {/* Scrollable Hours */}
                  <ScrollPicker
                    items={HOUR_ITEMS}
                    selectedValue={String(hour)}
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
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.ampmText,
                          !isPm && styles.ampmActiveText,
                        ]}
                      >
                        AM
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setIsPm(true)}
                      style={[
                        styles.ampmButton,
                        isPm && styles.ampmActiveButton,
                      ]}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[styles.ampmText, isPm && styles.ampmActiveText]}
                      >
                        PM
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.btnCancel}
                  activeOpacity={0.7}
                >
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.btnSave}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnSaveText}>Save Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  modalCard: {
    width: '100%',
    maxWidth: scale(340),
    backgroundColor: colors.white,
    borderRadius: scale(22),
    borderWidth: 1.5,
    borderColor: colors.accentOrangeMedium,
    padding: scale(22),
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(6) },
    shadowOpacity: 0.18,
    shadowRadius: scale(14),
    elevation: 8,
  },
  modalTitle: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(20),
    color: colors.secondary,
    marginBottom: verticalScale(12),
  },
  scrollArea: {
    width: '100%',
    marginBottom: verticalScale(16),
  },
  sectionLabel: {
    fontSize: fs(13),
    color: colors.mutedForeground,
    marginBottom: verticalScale(8),
    fontFamily: fonts.TiroHindiRegular,
  },
  timeSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentOrangeSubtle,
    borderRadius: scale(16),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    width: '100%',
    borderWidth: 1,
    borderColor: colors.accentOrangeMedium,
  },
  colon: {
    fontSize: fs(24),
    fontWeight: 'bold',
    color: colors.secondary,
    marginHorizontal: scale(8),
    alignSelf: 'center',
  },
  ampmContainer: {
    marginLeft: scale(14),
    backgroundColor: colors.white,
    borderRadius: scale(10),
    padding: scale(3),
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  ampmButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    marginVertical: scale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ampmActiveButton: {
    backgroundColor: colors.ring,
  },
  ampmText: {
    fontSize: fs(12),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  ampmActiveText: {
    color: colors.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: scale(10),
    marginTop: verticalScale(4),
  },
  btnCancel: {
    flex: 1,
    paddingVertical: verticalScale(11),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.borderSubtle2,
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  btnCancelText: {
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(14),
  },
  btnSave: {
    flex: 1.2,
    paddingVertical: verticalScale(11),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ring,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.25,
    shadowRadius: scale(6),
    elevation: 3,
  },
  btnSaveText: {
    color: colors.white,
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(14),
    fontWeight: '600',
  },
});
