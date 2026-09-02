import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Translation } from '@i18n/language';
import GradientBackground from '@components/GradientBackground';
import OverlayModal from '@components/OverlayModal';
import NotificationScheduleModal from '@components/NotificationScheduleModal';
import imagePath from '@assets/index';
import colors from '@theme/colors';
import { ChevronRight } from '@components/icons/SvgIcons';
import { scale } from '@theme/sizes';

import { useProfileData } from './hooks/useProfileData';
import profileStyles from './styles/profileStyles';
import StatsCard from './components/StatsCard';
import FavoriteStoriesSection from './components/FavoriteStoriesSection';
import ResetModal from './components/ResetModal';
import SadhanaCalendarCard from './components/SadhanaCalendarCard';
import SelectedDayBreakdownCard from './components/SelectedDayBreakdownCard';
import ManageCustomMantrasModal from './components/ManageCustomMantrasModal';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const {
    t,
    currentLanguage,
    changeLanguage,
    overlayRef,
    customMantrasModalRef,
    resetModalRef,
    notificationsEnabled,
    scheduleModalVisible,
    setScheduleModalVisible,
    reminderConfig,
    handleSaveSchedule,
    handleToggleNotifications,
    totalCount,
    totalMala,
    todayCount,
    challengeStarted,
    challengeTotalDays,
    selectedDate,
    setSelectedDate,
    customMantras,
    markedDates,
    selectedDayRecord,
    getMantraName,
    favoriteStories,
    handleRemoveFavorite,
    handleGiveUpChallenge,
    handleDeleteCustomMantra,
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
  } = useProfileData();

  const insets = useSafeAreaInsets();
  const [showJapHistory, setShowJapHistory] = React.useState(false);

  return (
    <GradientBackground>
      <SafeAreaView style={profileStyles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            profileStyles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
        >
          {/* ── User Profile Card ─────────────────────────────────── */}
          <View style={profileStyles.profileCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SeedScreen')}
              style={profileStyles.avatarBorder}
            >
              <Image
                source={imagePath.Krishna}
                style={profileStyles.avatarImage}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, marginTop: scale(10), flexShrink: 1 }}>
              <Text style={profileStyles.userName}>
                {t(Translation.PROFILE_DEVOTEE)}
              </Text>
              <Text style={profileStyles.userJoined}>
                {t(Translation.PROFILE_JOINED_SINCE)}
              </Text>
            </View>
          </View>

          {/* ── Statistics ────────────────────────────────────────── */}
          <StatsCard
            totalCount={totalCount}
            totalMala={totalMala}
            todayCount={todayCount}
            showHistory={showJapHistory}
            onHistoryPress={() => setShowJapHistory(prev => !prev)}
          />

          {/* ── Sadhana Calendar (revealed by History button) ────────── */}
          {showJapHistory && (
            <Animated.View
              style={{
                width: '100%',
              }}
              entering={FadeInDown.duration(400).springify()}
            >
              <SadhanaCalendarCard
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                markedDates={markedDates}
                currentLanguage={currentLanguage}
              />

              {/* ── Selected Day Breakdown ────────────────────────────── */}
              {selectedDate && (
                <Animated.View
                  entering={FadeInDown.duration(350).delay(60).springify()}
                >
                  <SelectedDayBreakdownCard
                    selectedDate={selectedDate}
                    selectedDayRecord={selectedDayRecord}
                    getMantraName={getMantraName}
                    currentLanguage={currentLanguage}
                  />
                </Animated.View>
              )}
            </Animated.View>
          )}

          {/* ── Favourite Stories ─────────────────────────────────── */}
          <FavoriteStoriesSection
            stories={favoriteStories}
            currentLanguage={currentLanguage}
            onRemove={handleRemoveFavorite}
            onPress={storyId =>
              navigation.navigate('ReadingScreen', { storyId })
            }
          />

          {/* ── Settings Card ─────────────────────────────────────── */}
          <View style={profileStyles.sectionCard}>
            <Text style={profileStyles.sectionTitle}>
              {t(Translation.PROFILE_SETTINGS)}
            </Text>

            {/* Language toggle */}
            <View style={profileStyles.settingRow}>
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.PROFILE_CHANGE_LANGUAGE)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.PROFILE_APP_MAIN_LANGUAGE)}
                </Text>
              </View>
              <View style={profileStyles.languageToggleContainer}>
                <TouchableOpacity
                  style={[
                    profileStyles.langButton,
                    currentLanguage === 'en' && profileStyles.langButtonActive,
                  ]}
                  onPress={() => changeLanguage('en')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      profileStyles.langButtonText,
                      currentLanguage === 'en' &&
                        profileStyles.langButtonTextActive,
                    ]}
                  >
                    EN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    profileStyles.langButton,
                    currentLanguage === 'hi' && profileStyles.langButtonActive,
                  ]}
                  onPress={() => changeLanguage('hi')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      profileStyles.langButtonText,
                      currentLanguage === 'hi' &&
                        profileStyles.langButtonTextActive,
                    ]}
                  >
                    हिन्दी
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={profileStyles.separator} />

            {/* Notifications row */}
            <TouchableOpacity
              activeOpacity={notificationsEnabled ? 0.7 : 1}
              onPress={() => {
                if (notificationsEnabled) {
                  setScheduleModalVisible(true);
                }
              }}
              style={profileStyles.settingRow}
            >
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.PROFILE_DAILY_NOTIFICATIONS)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.PROFILE_DAILY_SADHANA_REMINDERS)}
                </Text>
                {notificationsEnabled && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(3),
                      gap: scale(4),
                    }}
                  >
                    <Image
                      source={imagePath.clock}
                      style={{
                        width: scale(13),
                        height: scale(13),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        profileStyles.settingSubLabel,
                        { color: colors.ring },
                      ]}
                    >
                      {reminderConfig
                        ? `${String(reminderConfig.hour).padStart(
                            2,
                            '0',
                          )}:${String(reminderConfig.minute).padStart(2, '0')} ${
                            reminderConfig.isPm ? 'PM' : 'AM'
                          }`
                        : '06:00 AM'}
                    </Text>
                  </View>
                )}
              </View>
              <Switch
                trackColor={{
                  false: colors.switchTrackFalse,
                  true: colors.ring,
                }}
                thumbColor={
                  notificationsEnabled ? colors.white : colors.switchThumbFalse
                }
                onValueChange={handleToggleNotifications}
                value={notificationsEnabled}
              />
            </TouchableOpacity>

            <View style={profileStyles.separator} />

            {/* Manage custom mantras row */}
            <TouchableOpacity
              style={profileStyles.settingRow}
              onPress={() => customMantrasModalRef.current?.open()}
              activeOpacity={0.8}
            >
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.PROFILE_DELETE_CUSTOM_MANTRAS)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.PROFILE_DELETE_CUSTOM_MANTRAS_DESC)}
                </Text>
              </View>
              <ChevronRight size={scale(16)} color={colors.ring} />
            </TouchableOpacity>

            {/* Give up challenge row (conditional) */}
            {challengeStarted && (
              <>
                <View style={profileStyles.separator} />
                <View style={profileStyles.settingRow}>
                  <View style={profileStyles.settingInfo}>
                    <Text style={profileStyles.settingLabel}>
                      {t(Translation.CHALLENGE_GIVE_UP)}
                    </Text>
                    <Text style={profileStyles.settingSubLabel}>
                      {t(Translation.CHALLENGE_ABANDON_DESC, {
                        count: challengeTotalDays,
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={profileStyles.giveUpButton}
                    onPress={handleGiveUpChallenge}
                    activeOpacity={0.8}
                  >
                    <Text style={profileStyles.giveUpButtonText}>
                      {t(Translation.CHALLENGE_ABANDON_BTN)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* ── Danger Zone Card ──────────────────────────────────── */}
          <View
            style={[profileStyles.sectionCard, profileStyles.dangerZoneCard]}
          >
            <Text
              style={[profileStyles.sectionTitle, { color: colors.danger }]}
            >
              {t(Translation.DANGER_ZONE_TITLE)}
            </Text>
            <View style={profileStyles.settingRow}>
              <View style={profileStyles.settingInfo}>
                <Text style={profileStyles.settingLabel}>
                  {t(Translation.RESET_ALL_DATA_TITLE)}
                </Text>
                <Text style={profileStyles.settingSubLabel}>
                  {t(Translation.RESET_ALL_DATA_DESC)}
                </Text>
              </View>
              <TouchableOpacity
                style={profileStyles.resetButton}
                onPress={handleOpenResetModal}
                activeOpacity={0.8}
              >
                <Text style={profileStyles.resetButtonText}>
                  {t(Translation.RESET_LABEL)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ── Notification Schedule Modal ──────────────────────────── */}
      <NotificationScheduleModal
        visible={scheduleModalVisible}
        onClose={() => setScheduleModalVisible(false)}
        onSchedule={handleSaveSchedule}
        initialConfig={reminderConfig}
      />

      {/* ── Coming Soon Modal ────────────────────────────────────── */}
      <OverlayModal ref={overlayRef} closeOnBackdropPress={true}>
        <View style={profileStyles.modalCenterContainer}>
          <View style={profileStyles.modalCard}>
            <Text style={profileStyles.modalIcon}>✨</Text>
            <Text style={profileStyles.modalTitle}>
              {t(Translation.PROFILE_COMING_SOON)}
            </Text>
            <Text style={profileStyles.modalMessage}>
              {t(Translation.PROFILE_COMING_SOON_DESC)}
            </Text>
            <TouchableOpacity
              style={profileStyles.modalButton}
              onPress={() => overlayRef.current?.close()}
              activeOpacity={0.8}
            >
              <Text style={profileStyles.modalButtonText}>
                {t(Translation.PROFILE_OKAY)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </OverlayModal>

      {/* ── Manage Custom Mantras Modal ──────────────────────────── */}
      <ManageCustomMantrasModal
        modalRef={customMantrasModalRef}
        customMantras={customMantras}
        onDeleteCustomMantra={handleDeleteCustomMantra}
        currentLanguage={currentLanguage}
      />

      {/* ── Destructive Reset Modal ──────────────────────────────── */}
      <ResetModal
        modalRef={resetModalRef}
        checkedChants={checkedChants}
        setCheckedChants={setCheckedChants}
        checkedChallenge={checkedChallenge}
        setCheckedChallenge={setCheckedChallenge}
        resetCode={resetCode}
        setResetCode={setResetCode}
        isResetEnabled={isResetEnabled}
        onClose={handleCloseResetModal}
        onExecute={handleExecuteReset}
      />
    </GradientBackground>
  );
};

export default ProfileScreen;
