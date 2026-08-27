import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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

import { HOUR_ITEMS, MINUTE_ITEMS } from '../constants/notificationData';

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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop (sibling behind modal card) */}
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.1)' },
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
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btn, styles.btnCancel]}
              >
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={[styles.btn, styles.btnSave]}
              >
                <Text style={styles.btnSaveText}>Save Reminder</Text>
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
    width: '100%',
  },
  colon: {
    fontSize: fs(24),
    fontWeight: 'bold',
    color: colors.black,
    marginHorizontal: scale(10),
    alignSelf: 'center',
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
    marginVertical: scale(2),
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
});
