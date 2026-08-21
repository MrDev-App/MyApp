import React, { useState, useRef, useEffect } from 'react';
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
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import imagePath from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { favStoriesData, profileLabels } from '../../constants/profileData';
import OverlayModal, {
  OverlayModalHandle,
} from '../../components/OverlayModal';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage, STORAGE_KEYS } from '../../utile/storage';
import HapticFeedback from 'react-native-haptic-feedback';

const ProfileScreen = () => {
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';
  const labels = profileLabels[currentLanguage] || profileLabels.en;

  const navigation = useNavigation<any>();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const overlayRef = useRef<OverlayModalHandle>(null);

  const isFocused = useIsFocused();
  const [totalCount, setTotalCount] = useState(0);
  const [totalMala, setTotalMala] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeTotalDays, setChallengeTotalDays] = useState(21);

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
    }
  }, [isFocused]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleStoryPress = () => {
    overlayRef.current?.open();
  };

  const handleGiveUpChallenge = () => {
    const title =
      currentLanguage === 'hi' ? 'संकल्प रद्द करें?' : 'Abandon Challenge?';
    const message =
      currentLanguage === 'hi'
        ? 'क्या आप निश्चित रूप से वर्तमान जाप संकल्प को छोड़ना चाहते हैं? आपकी प्रगति हटा दी जाएगी।'
        : 'Are you sure you want to abandon the current Japa challenge? Your progress will be lost.';
    const cancelText = currentLanguage === 'hi' ? 'नहीं' : 'Cancel';
    const confirmText =
      currentLanguage === 'hi' ? 'हाँ, रद्द करें' : 'Yes, Abandon';

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
          <Text style={styles.headerTitle}>{labels.myProfile}</Text>
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
              <Text style={styles.userName}>{labels.devotee}</Text>
              <Text style={styles.userJoined}>{labels.joinedSince}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.7}
              onPress={() => overlayRef.current?.open()}
            >
              <Image source={imagePath.pencil} style={styles.editIconImage} />
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Grid */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{labels.totalStats}</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {totalCount.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>{labels.totalChants}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalMala}</Text>
                <Text style={styles.statLabel}>{labels.malasDone}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{todayCount}</Text>
                <Text style={styles.statLabel}>{labels.todayJap}</Text>
              </View>
            </View>
          </View>

          {/* Favorite Stories Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.rowTitle}>{labels.favStories}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.favStoriesScroll}
            >
              {favStoriesData.map(story => {
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
                    onPress={handleStoryPress}
                    activeOpacity={0.85}
                  >
                    <View style={styles.bookCoverContainer}>
                      <Image
                        source={story.image}
                        style={styles.bookCoverImage}
                      />
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{category}</Text>
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

          {/* Settings Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{labels.settings}</Text>

            {/* Language Switch Row */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{labels.changeLanguage}</Text>
                <Text style={styles.settingSubLabel}>
                  {labels.appMainLanguage}
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
                  {labels.dailyNotifications}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {labels.dailySadhanaReminders}
                </Text>
              </View>
              <Switch
                trackColor={{ false: colors.switchTrackFalse, true: colors.ring }}
                thumbColor={notificationsEnabled ? colors.white : colors.switchThumbFalse}
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            </View>

            {challengeStarted && (
              <>
                <View style={styles.separator} />
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>
                      {currentLanguage === 'hi'
                        ? 'संकल्प रद्द करें'
                        : 'Give Up Challenge'}
                    </Text>
                    <Text style={styles.settingSubLabel}>
                      {currentLanguage === 'hi'
                        ? `${challengeTotalDays} दिवसीय जाप संकल्प की प्रगति को छोड़ें`
                        : `Abandon the active ${challengeTotalDays} Days Japa Challenge`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.giveUpButton}
                    onPress={handleGiveUpChallenge}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.giveUpButtonText}>
                      {currentLanguage === 'hi' ? 'रद्द करें' : 'Abandon'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* Danger Zone Section */}
          <View style={[styles.sectionCard, styles.dangerZoneCard]}>
            <Text style={[styles.sectionTitle, { color: colors.danger }]}>
              {currentLanguage === 'hi'
                ? 'संवेदनशील क्षेत्र (Danger Zone)'
                : 'Danger Zone'}
            </Text>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {currentLanguage === 'hi'
                    ? 'सभी डेटा रीसेट करें'
                    : 'Reset All App Data'}
                </Text>
                <Text style={styles.settingSubLabel}>
                  {currentLanguage === 'hi'
                    ? 'अपने संपूर्ण आंकड़े, संकल्प प्रगति और सहेजे गए कहानियों को स्थायी रूप से हटाएं'
                    : 'Permanently wipe all stats, active challenges, and bookmarks'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleOpenResetModal}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>
                  {currentLanguage === 'hi' ? 'रीसेट' : 'Reset'}
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
              ⚠️{' '}
              {currentLanguage === 'hi'
                ? 'डेटा स्थायी रूप से हटाएं?'
                : 'Wipe All Data Permanently?'}
            </Text>

            <Text style={styles.modalDescription}>
              {currentLanguage === 'hi'
                ? 'यह आपके सभी आंकड़े, जाप की गिनती, सक्रिय चुनौतियां और सहेजी गई कहानियों को हटा देगा। यह कार्रवाई अपरिवर्तनीय है।'
                : 'This will wipe all your stats, japa counts, active challenges, and bookmarked stories. This action cannot be undone.'}
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
                {currentLanguage === 'hi'
                  ? 'हाँ, मैं अपना कुल जाप इतिहास और आंकड़े खोने को तैयार हूँ।'
                  : 'I understand I will lose my entire japa history and stats.'}
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
                {currentLanguage === 'hi'
                  ? 'हाँ, मैं सक्रिय संकल्प की प्रगति को हटाने के लिए सहमत हूँ।'
                  : 'I understand my active challenge streak will be reset.'}
              </Text>
            </TouchableOpacity>

            {/* Step 2 Typing code confirmation */}
            <Text style={styles.resetConfirmLabel}>
              {currentLanguage === 'hi'
                ? 'पुष्टि करने के लिए नीचे "RESET" टाइप करें:'
                : 'Type "RESET" below to confirm:'}
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
                  {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
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
                  {currentLanguage === 'hi' ? 'रीसेट करें' : 'Confirm Reset'}
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
    width: '90%',
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
});

export default ProfileScreen;
