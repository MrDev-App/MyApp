import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale, verticalScale } from '@theme/sizes';
import AnimatedButton from '@components/AnimatedButton';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import OverlayModal, {
  OverlayModalHandle,
} from '@components/OverlayModal';
import imagePath from '@assets/index';

const ChallengeCard = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const started = Storage.getBoolean(STORAGE_KEYS.CHALLENGE_STARTED, false);
  const todayChants = Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0);

  const baseChants = Storage.getNumber('CHALLENGE_BASE_CHANTS', 0);
  const baseDate = Storage.getString('CHALLENGE_BASE_DATE', '');
  const todayStr = new Date().toDateString();
  const challengeChantsToday =
    started && baseDate === todayStr
      ? Math.max(0, todayChants - baseChants)
      : todayChants;

  const [dailyTargetGoal, setDailyTargetGoal] = useState(() =>
    Storage.getNumber('CHALLENGE_DAILY_TARGET', 108),
  );
  const [challengeTotalDays, setChallengeTotalDays] = useState(() =>
    Storage.getNumber(STORAGE_KEYS.CHALLENGE_TOTAL_DAYS, 21),
  );

  const days = started ? Storage.getNumber('CHALLENGE_PROGRESS_DAYS', 1) : 0;
  const streak = started ? Storage.getNumber('CHALLENGE_STREAK', 1) : 0;

  const targetModalRef = useRef<OverlayModalHandle>(null);
  const [tempGoal, setTempGoal] = useState(String(dailyTargetGoal));
  const [tempDays, setTempDays] = useState(String(challengeTotalDays));

  useEffect(() => {
    if (isFocused) {
      setDailyTargetGoal(Storage.getNumber('CHALLENGE_DAILY_TARGET', 108));
      setChallengeTotalDays(Storage.getNumber(STORAGE_KEYS.CHALLENGE_TOTAL_DAYS, 21));
    }
  }, [isFocused]);

  let percentage = 0;
  let statusText = '';

  if (started) {
    if (challengeChantsToday >= dailyTargetGoal) {
      percentage = Math.round((days / challengeTotalDays) * 100);
      statusText = t(Translation.CHALLENGE_STATUS_COMPLETED);
    } else {
      percentage = Math.round(((days - 1) / challengeTotalDays) * 100);
      const chantsLeft = Math.max(0, dailyTargetGoal - challengeChantsToday);
      statusText = t(Translation.CHALLENGE_STATUS_PROGRESS, {
        count: chantsLeft,
      });
    }
  } else {
    percentage = 0;
    statusText = t(Translation.CHALLENGE_STATUS_NOT_STARTED);
  }

  percentage = Math.max(0, Math.min(100, percentage));

  const handleOpenEditModal = () => {
    setTempGoal(String(dailyTargetGoal));
    setTempDays(String(challengeTotalDays));
    targetModalRef.current?.open();
  };

  const handleSaveGoal = () => {
    let targetVal = parseInt(tempGoal, 10);
    if (isNaN(targetVal) || targetVal <= 0) {
      targetVal = 108;
    }

    let daysVal = parseInt(tempDays, 10);
    if (isNaN(daysVal) || daysVal <= 0) {
      daysVal = 21;
    }

    Storage.set('CHALLENGE_DAILY_TARGET', targetVal);
    Storage.set(STORAGE_KEYS.CHALLENGE_TOTAL_DAYS, daysVal);

    setDailyTargetGoal(targetVal);
    setChallengeTotalDays(daysVal);

    targetModalRef.current?.close();
  };

  const texts = {
    sectionTitle: t(Translation.CHALLENGE_SECTION_TITLE),
    challengeName: t(Translation.CHALLENGE_NAME, { count: challengeTotalDays }),
    streak:
      streak === 1
        ? t(Translation.CHALLENGE_STREAK_ONE, { count: streak })
        : t(Translation.CHALLENGE_STREAK_OTHER, { count: streak }),
    progress: t(Translation.CHALLENGE_PROGRESS, {
      day: days,
      total: challengeTotalDays,
    }),
    buttonStart: t(Translation.CHALLENGE_BTN_START),
    buttonView: t(Translation.CHALLENGE_BTN_VIEW),
  };

  const handlePress = () => {
    if (!started) {
      Storage.set(STORAGE_KEYS.CHALLENGE_STARTED, true);
      Storage.set('CHALLENGE_PROGRESS_DAYS', 1);
      Storage.set('CHALLENGE_STREAK', 1);
      Storage.set('CHALLENGE_BASE_CHANTS', todayChants);
      Storage.set('CHALLENGE_BASE_DATE', new Date().toDateString());
    }
    navigation.navigate('BottomTabs', { screen: 'Jap' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{texts.sectionTitle}</Text>
        {started && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>{texts.streak}</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Image source={imagePath.mala} style={styles.malaIcon} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.challengeName}>{texts.challengeName}</Text>
            <View style={styles.targetRow}>
              <Text style={styles.targetText}>
                {t(Translation.CHALLENGE_TARGET_PREFIX)}
                <Text
                  style={{
                    color: colors.ring,
                    fontFamily: fonts.PoppinsSemiBold,
                  }}
                >
                  {dailyTargetGoal}
                </Text>
                {t(Translation.CHALLENGE_TARGET_SUFFIX)}
              </Text>
              {!started && (
                <TouchableOpacity
                  style={styles.editTargetBtn}
                  onPress={handleOpenEditModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editTargetIcon}>edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>{texts.progress}</Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text
            style={[
              styles.statusText,
              !started && styles.statusTextInactive,
              started &&
                challengeChantsToday < dailyTargetGoal && {
                  color: colors.accent,
                },
            ]}
          >
            {statusText}
          </Text>
          <AnimatedButton
            style={styles.actionButton}
            onPress={handlePress}
            disabled={started && challengeChantsToday >= dailyTargetGoal}
          >
            <Text style={styles.actionButtonText}>
              {started ? texts.buttonView : texts.buttonStart}
            </Text>
          </AnimatedButton>
        </View>

        {started && (
          <Text style={styles.activeWarningText}>
            {t(Translation.CHALLENGE_ACTIVE_WARNING)}
          </Text>
        )}
      </View>

      <OverlayModal ref={targetModalRef} closeOnBackdropPress={true}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalCenterContainer}>
            <View style={[styles.modalCard, { maxHeight: verticalScale(480) }]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces={false}
              >
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => targetModalRef.current?.close()}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalCloseBtnText}>✕</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>
                  {t(Translation.CHALLENGE_EDIT_TITLE)}
                </Text>

                <Text style={styles.inputLabel}>
                  {t(Translation.CHALLENGE_EDIT_TARGET_LABEL)}
                </Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="number-pad"
                  value={tempGoal}
                  onChangeText={setTempGoal}
                  maxLength={10}
                  placeholder="108"
                  placeholderTextColor={colors.mutedForeground}
                />

                <Text style={[styles.inputLabel, { marginTop: scale(12) }]}>
                  {t(Translation.CHALLENGE_EDIT_DURATION_LABEL)}
                </Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="number-pad"
                  value={tempDays}
                  onChangeText={setTempDays}
                  maxLength={4}
                  placeholder="21"
                  placeholderTextColor={colors.mutedForeground}
                />

                <TouchableOpacity
                  style={styles.setGoalBtn}
                  onPress={handleSaveGoal}
                  activeOpacity={0.8}
                >
                  <Text style={styles.setGoalBtnText}>
                    {t(Translation.CHALLENGE_EDIT_SAVE_BTN)}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </OverlayModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
    paddingHorizontal: scale(4),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  streakBadge: {
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
  },
  streakText: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.22)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  iconContainer: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.15)',
  },
  malaIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
  },
  challengeName: {
    fontSize: fs(14.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  targetText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.accent,
    opacity: 0.8,
  },
  progressSection: {
    marginBottom: scale(12),
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  progressText: {
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  percentageText: {
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  progressBarBg: {
    width: '100%',
    height: scale(8),
    backgroundColor: '#F3EFE9',
    borderRadius: scale(4),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.ring,
    borderRadius: scale(4),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(183, 168, 151, 0.12)',
    paddingTop: scale(8),
  },
  statusText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: '#2e7d32',
  },
  statusTextInactive: {
    color: colors.mutedForeground,
  },
  actionButton: {
    backgroundColor: colors.ring,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editTargetBtn: {
    paddingHorizontal: scale(6),
  },
  editTargetIcon: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  modalCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalCard: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.25)',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(10) },
    shadowOpacity: 0.15,
    shadowRadius: scale(20),
    elevation: 6,
  },
  modalTitle: {
    fontSize: fs(15),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(16),
    paddingRight: scale(20),
  },
  inputLabel: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.accent,
    marginBottom: scale(6),
  },
  textInput: {
    width: '100%',
    height: scale(40),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.3)',
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    backgroundColor: '#FAFAF9',
  },
  setGoalBtn: {
    backgroundColor: colors.ring,
    height: scale(40),
    width: '100%',
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(18),
  },
  setGoalBtnText: {
    color: colors.white,
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalCloseBtnText: {
    fontSize: fs(16),
    color: colors.mutedForeground,
    fontWeight: 'bold',
  },
  activeWarningText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    textAlign: 'right',
    marginTop: scale(6),
  },
});

export default ChallengeCard;
