import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import AnimatedButton from '../../../components/AnimatedButton';
import { Storage, STORAGE_KEYS } from '../../../utile/storage';
import OverlayModal, {
  OverlayModalHandle,
} from '../../../components/OverlayModal';
import imagePath from '../../../assets';

const ChallengeCard = () => {
  const { i18n, t } = useTranslation();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused(); // Forces re-render on tab focus to sync MMKV stats

  const currentLanguage = i18n.language || 'en';

  const started = Storage.getBoolean('CHALLENGE_STARTED', false);
  const todayChants = Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0);
  const [dailyTargetGoal, setDailyTargetGoal] = useState(() =>
    Storage.getNumber('CHALLENGE_DAILY_TARGET', 108),
  );
  const [challengeTotalDays, setChallengeTotalDays] = useState(() =>
    Storage.getNumber('CHALLENGE_TOTAL_DAYS', 21),
  );

  const days = started ? Storage.getNumber('CHALLENGE_PROGRESS_DAYS', 1) : 0;
  const streak = started ? Storage.getNumber('CHALLENGE_STREAK', 1) : 0;

  const targetModalRef = useRef<OverlayModalHandle>(null);
  const [tempGoal, setTempGoal] = useState(String(dailyTargetGoal));
  const [tempDays, setTempDays] = useState(String(challengeTotalDays));

  useEffect(() => {
    if (isFocused) {
      setDailyTargetGoal(Storage.getNumber('CHALLENGE_DAILY_TARGET', 108));
      setChallengeTotalDays(Storage.getNumber('CHALLENGE_TOTAL_DAYS', 21));
    }
  }, [isFocused]);

  let percentage = 0;
  let statusText = '';

  if (started) {
    if (todayChants >= dailyTargetGoal) {
      percentage = Math.round((days / challengeTotalDays) * 100);
      statusText =
        currentLanguage === 'hi'
          ? 'आज का संकल्प पूर्ण! ✨'
          : "Today's goal completed! ✨";
    } else {
      percentage = Math.round(((days - 1) / challengeTotalDays) * 100);
      statusText =
        currentLanguage === 'hi'
          ? `आज: ${todayChants} / ${dailyTargetGoal} जाप`
          : `Today: ${todayChants} / ${dailyTargetGoal} chants`;
    }
  } else {
    percentage = 0;
    statusText =
      currentLanguage === 'hi'
        ? 'संकल्प अभी शुरू नहीं हुआ है'
        : 'Challenge not started yet';
  }

  // Clip percentage between 0 and 100
  percentage = Math.max(0, Math.min(100, percentage));

  const handleOpenEditModal = () => {
    setTempGoal(String(dailyTargetGoal));
    setTempDays(String(challengeTotalDays));
    targetModalRef.current?.open();
  };

  const handleSaveGoal = () => {
    // Parse target goal - fallback to 108 if 0 or empty
    let targetVal = parseInt(tempGoal, 10);
    if (isNaN(targetVal) || targetVal <= 0) {
      targetVal = 108;
    }

    // Parse challenge days - fallback to 21 if 0 or empty
    let daysVal = parseInt(tempDays, 10);
    if (isNaN(daysVal) || daysVal <= 0) {
      daysVal = 21;
    }

    // Update MMKV storage
    Storage.set('CHALLENGE_DAILY_TARGET', targetVal);
    Storage.set('CHALLENGE_TOTAL_DAYS', daysVal);

    // Update local React component state
    setDailyTargetGoal(targetVal);
    setChallengeTotalDays(daysVal);

    targetModalRef.current?.close();
  };

  const texts = {
    en: {
      sectionTitle: 'Bhakti Challenges',
      challengeName: `${challengeTotalDays} Days Japa Challenge`,
      streak: `🔥 ${streak} Days Streak`,
      target: `Goal: ${dailyTargetGoal} chants daily`,
      progress: `Day ${days} of ${challengeTotalDays}`,
      buttonStart: 'Start Challenge',
      buttonView: 'Start Chant',
    },
    hi: {
      sectionTitle: 'भक्ति संकल्प (चैलेंज)',
      challengeName: `${challengeTotalDays} दिवसीय जाप संकल्प`,
      streak: `🔥 ${streak} दिनों का क्रम`,
      target: `लक्ष्य: ${dailyTargetGoal} जाप प्रतिदिन`,
      progress: `${challengeTotalDays} में से ${days}वां दिन`,
      buttonStart: 'शूरू करे संकल्प',
      buttonView: 'जाप शुरू करें',
    },
  };

  const currentText = currentLanguage === 'hi' ? texts.hi : texts.en;

  const handlePress = () => {
    if (!started) {
      Storage.set('CHALLENGE_STARTED', true);
      Storage.set('CHALLENGE_PROGRESS_DAYS', 1);
      Storage.set('CHALLENGE_STREAK', 1);
    }
    navigation.navigate('BottomTabs', { screen: 'Jap' });
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{currentText.sectionTitle}</Text>
        {started && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>{currentText.streak}</Text>
          </View>
        )}
      </View>

      {/* Main Premium Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>📿</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.challengeName}>
              {currentText.challengeName}
            </Text>
            <View style={styles.targetRow}>
              <Text style={styles.targetText}>{currentText.target}</Text>
              {!started && (
                <TouchableOpacity
                  style={styles.editTargetBtn}
                  onPress={handleOpenEditModal}
                  activeOpacity={0.7}
                >
                  <Image
                    source={imagePath.pencil}
                    style={styles.editTargetIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>{currentText.progress}</Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
        </View>

        {/* Footer Info & Action Button */}
        <View style={styles.footer}>
          <Text
            style={[styles.statusText, !started && styles.statusTextInactive]}
          >
            {statusText}
          </Text>
          <AnimatedButton style={styles.actionButton} onPress={handlePress}>
            <Text style={styles.actionButtonText}>
              {started ? currentText.buttonView : currentText.buttonStart}
            </Text>
          </AnimatedButton>
        </View>

        {started && (
          <Text style={styles.activeWarningText}>
            {currentLanguage === 'hi'
              ? '* संकल्प पहले से ही सक्रिय है'
              : '* Challenge already active'}
          </Text>
        )}
      </View>

      {/* Edit Target Modal */}
      <OverlayModal ref={targetModalRef} closeOnBackdropPress={true}>
        <View style={styles.modalCenterContainer}>
          <View style={styles.modalCard}>
            {/* Close button top right */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => targetModalRef.current?.close()}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {currentLanguage === 'hi'
                ? 'संकल्प सेटिंग्स बदलें'
                : 'Edit Challenge Settings'}
            </Text>

            {/* Input 1: Daily Target Chants */}
            <Text style={styles.inputLabel}>
              {currentLanguage === 'hi'
                ? 'दैनिक जाप लक्ष्य'
                : 'Daily Chants Target'}
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

            {/* Input 2: Challenge Duration Days */}
            <Text style={[styles.inputLabel, { marginTop: scale(12) }]}>
              {currentLanguage === 'hi'
                ? 'संकल्प अवधि (दिन)'
                : 'Challenge Duration (Days)'}
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

            {/* Save Settings Button */}
            <TouchableOpacity
              style={styles.setGoalBtn}
              onPress={handleSaveGoal}
              activeOpacity={0.8}
            >
              <Text style={styles.setGoalBtnText}>
                {currentLanguage === 'hi' ? 'सहेजें (Save)' : 'Save Settings'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: scale(16),
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
    marginBottom: scale(16),
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
  iconText: {
    fontSize: fs(20),
  },
  titleContainer: {
    flex: 1,
  },
  challengeName: {
    fontSize: fs(14.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    marginBottom: scale(2),
  },
  targetText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.accent,
    opacity: 0.8,
  },
  progressSection: {
    marginBottom: scale(16),
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
    paddingTop: scale(12),
  },
  statusText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: '#2e7d32', // Completed/active green status
  },
  statusTextInactive: {
    color: colors.mutedForeground, // Inactive status color when not started
  },
  actionButton: {
    backgroundColor: colors.ring,
    borderRadius: scale(8),
    paddingHorizontal: scale(14),
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
    marginTop: scale(2),
  },
  editTargetBtn: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginLeft: scale(2),
  },
  editTargetIcon: {
    width: scale(11),
    height: scale(11),
    resizeMode: 'contain',
    tintColor: colors.ring,
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
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
