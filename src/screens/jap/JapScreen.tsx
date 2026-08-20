import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LayoutAnimation,
  Pressable,
  Image,
  Vibration,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale, verticalScale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MANTRAS_LIST, MantraSelectorItem } from '../../constants/japData';
import { Translation } from '../../i18n/language';
import imagePath from '../../assets';

import SwitchMantraModal from './component/SwitchMantraModal';
import HapticFeedback from 'react-native-haptic-feedback';
import { Storage, STORAGE_KEYS } from '../../utile/storage';

const TriggerHaptic = () => {
  if (Platform.OS === 'android') {
    try {
      console.log('[Haptic] Triggering vibration on Android...');
      Vibration.vibrate([0, 40, 0, 0]);
    } catch (error) {
      console.log('[Haptic] Android vibration failed:', error);
    }
  } else {
    // iOS: Use native Taptic engine
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    };
    try {
      console.log('[Haptic] Triggering impactHeavy haptic feedback on iOS...');
      HapticFeedback.trigger('impactHeavy', options);
    } catch (error) {
      console.log(
        '[Haptic] Failed to trigger haptics, falling back to Vibration:',
        error,
      );
      Vibration.vibrate(30);
    }
  }
};

const TOTAL_BEADS = 108;
const BEAD_RADIUS = scale(7); // size of each bead
const MALA_RADIUS = scale(122); // radius of the circle path
const CENTER = scale(135); // half of container size

const BEAD_ANGLES = Array.from({ length: TOTAL_BEADS }, (_, i) => {
  return (i / TOTAL_BEADS) * 2 * Math.PI - Math.PI / 2;
});

type MalaBeadProps = {
  angle: number;
  filled: boolean;
  isMarker: boolean;
  rotationOffset: number; // degrees
};

const MalaBead = React.memo(
  ({ angle, filled, isMarker, rotationOffset }: MalaBeadProps) => {
    const rad = angle + (rotationOffset * Math.PI) / 180;
    const beadRadius = isMarker ? scale(6) : BEAD_RADIUS;
    const size = beadRadius * 2;
    const x = CENTER + MALA_RADIUS * Math.cos(rad) - beadRadius;
    const y = CENTER + MALA_RADIUS * Math.sin(rad) - beadRadius;

    const renderSize = isMarker ? size * 0.9 : size * 0.7;
    const offset = (size - renderSize) / 2;
    const renderX = x + offset;
    const renderY = y + offset;

    if (isMarker) {
      return (
        <View
          style={{
            position: 'absolute',
            left: renderX,
            top: renderY,
            width: renderSize,
            height: renderSize,
            borderRadius: renderSize / 2,
            backgroundColor: colors.goldBead,
            borderWidth: 1.5,
            borderColor: colors.goldBeadBorder,
            shadowColor: colors.beadShadow,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 4,
          }}
        />
      );
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: renderX,
          top: renderY,
          width: renderSize,
          height: renderSize,
          borderRadius: renderSize / 2,
          backgroundColor: colors.borderMedium,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.borderStronger,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {filled && (
          <Image
            source={imagePath.MalaMoti}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        )}
      </View>
    );
  },
);

const JapScreen = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const [selectedMantra, setSelectedMantra] = useState(MANTRAS_LIST[0]);
  const [displayedMantra, setDisplayedMantra] = useState(MANTRAS_LIST[0]);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, _setTarget] = useState(108);
  const [isHapticOn, setIsHapticOn] = useState(true);
  const isHapticOnRef = useRef(isHapticOn);

  useEffect(() => {
    isHapticOnRef.current = isHapticOn;
  }, [isHapticOn]);

  // Persistent States
  const [totalCount, setTotalCount] = useState(
    () => Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT) || 0,
  );
  const [_totalMala, setTotalMala] = useState(
    () => Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA) || 0,
  );
  const [todayCount, setTodayCount] = useState(() => {
    Storage.checkAndResetTodayStats();
    return Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT) || 0;
  });
  const [todayMala, setTodayMala] = useState(() => {
    Storage.checkAndResetTodayStats();
    return Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA) || 0;
  });

  const handleDateCheck = useCallback(() => {
    const wasReset = Storage.checkAndResetTodayStats();
    if (wasReset) {
      setTodayCount(0);
      setTodayMala(0);
    }
  }, []);

  useEffect(() => {
    handleDateCheck();
  }, [handleDateCheck]);

  const [pendingMantra, setPendingMantra] = useState<MantraSelectorItem | null>(
    null,
  );
  const [isSwitchModalVisible, setIsSwitchModalVisible] = useState(false);

  const malaRotation = useSharedValue(0);

  const sphereScale = useSharedValue(1);

  const rippleScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(0);

  const textOpacity = useSharedValue(1);
  const textTranslateY = useSharedValue(0);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const animatedMalaStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${malaRotation.value}deg` }],
  }));

  const animatedSphereStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sphereScale.value }],
  }));

  // Mantra text swap animation
  useEffect(() => {
    if (selectedMantra.id === displayedMantra.id) return;
    const FADE_OUT_MS = 160;

    textOpacity.value = withTiming(0, {
      duration: FADE_OUT_MS,
      easing: Easing.in(Easing.quad),
    });
    textTranslateY.value = withTiming(8, {
      duration: FADE_OUT_MS,
      easing: Easing.in(Easing.quad),
    });

    const timer = setTimeout(() => {
      setDisplayedMantra(selectedMantra);
      textTranslateY.value = 12;
      textOpacity.value = 0;
      textOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      textTranslateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }, FADE_OUT_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMantra]);

  const handleChantPress = useCallback(() => {
    handleDateCheck();

    let nextCount = 0;
    let isMalaCompleted = false;
    setCount(prev => {
      const next = prev + 1;
      if (next >= target) {
        setRounds(r => r + 1);
        nextCount = 0;
        isMalaCompleted = true;
        return 0;
      }
      nextCount = next;
      return next;
    });

    // Persistent Tap Stats
    const currentTotalCount =
      Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_COUNT) || 0;
    const currentTodayCount =
      Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT) || 0;
    const nextTotalCount = currentTotalCount + 1;
    const nextTodayCount = currentTodayCount + 1;

    Storage.set(STORAGE_KEYS.JAP_TOTAL_COUNT, nextTotalCount);
    Storage.set(STORAGE_KEYS.JAP_TODAY_COUNT, nextTodayCount);
    setTotalCount(nextTotalCount);
    setTodayCount(nextTodayCount);

    // Persistent Mala Stats
    if (isMalaCompleted) {
      const currentTotalMala =
        Storage.getNumber(STORAGE_KEYS.JAP_TOTAL_MALA) || 0;
      const currentTodayMala =
        Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA) || 0;
      const nextTotalMala = currentTotalMala + 1;
      const nextTodayMala = currentTodayMala + 1;

      Storage.set(STORAGE_KEYS.JAP_TOTAL_MALA, nextTotalMala);
      Storage.set(STORAGE_KEYS.JAP_TODAY_MALA, nextTodayMala);
      setTotalMala(nextTotalMala);
      setTodayMala(nextTodayMala);
    }

    const step = 360 / TOTAL_BEADS;
    const targetRotation = nextCount === 0 ? 0 : -(nextCount * step);
    malaRotation.value = withTiming(targetRotation, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });

    sphereScale.value = withSpring(0.94, { damping: 14, stiffness: 200 });
    setTimeout(() => {
      sphereScale.value = withSpring(1, { damping: 14, stiffness: 200 });
    }, 120);

    if (isHapticOnRef.current) {
      TriggerHaptic();
    }

    rippleScale.value = 1;
    rippleOpacity.value = 0.6;
    rippleScale.value = withTiming(1.5, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
    rippleOpacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
  }, [
    target,
    malaRotation,
    sphereScale,
    rippleScale,
    rippleOpacity,
    handleDateCheck,
  ]);

  const handleReset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCount(0);
    setRounds(0);
    malaRotation.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  };

  const handleMantraSelect = (item: MantraSelectorItem) => {
    if (item.id === selectedMantra.id) return;

    if (count > 0 || rounds > 0) {
      setPendingMantra(item);
      setIsSwitchModalVisible(true);
    } else {
      setSelectedMantra(item);
    }
  };

  const handleConfirmSwitch = () => {
    if (pendingMantra) {
      setSelectedMantra(pendingMantra);
      setCount(0);
      setRounds(0);
      malaRotation.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    }
    setIsSwitchModalVisible(false);
    setPendingMantra(null);
  };

  const handleCancelSwitch = () => {
    setIsSwitchModalVisible(false);
    setPendingMantra(null);
  };

  const currentBeadIndex =
    Math.round((count / target) * TOTAL_BEADS) % TOTAL_BEADS;
  const mantraText =
    currentLanguage === 'hi' ? displayedMantra.textHi : displayedMantra.textEn;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t(Translation.JAP_CHANTING)}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.hapticBtn, isHapticOn && styles.hapticBtnActive]}
              onPress={() => {
                const next = !isHapticOn;
                console.log('[Haptic] Toggled haptics state to:', next);
                setIsHapticOn(next);
                isHapticOnRef.current = next;
                if (next) {
                  TriggerHaptic();
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.hapticBtnIcon}>
                {isHapticOn ? '📳' : '🔕'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.selectorSection}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={MANTRAS_LIST}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.selectorList}
              renderItem={({ item }) => {
                const isSelected = selectedMantra.id === item.id;
                const name =
                  currentLanguage === 'hi' ? item.nameHi : item.nameEn;
                return (
                  <TouchableOpacity
                    style={[
                      styles.selectorItem,
                      isSelected && styles.selectorItemSelected,
                    ]}
                    onPress={() => handleMantraSelect(item)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.selectorText,
                        isSelected && styles.selectorTextSelected,
                      ]}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Stats Bar: TODAY JAP | TODAY MALA | TOTAL CHANTS */}
          <View style={styles.statsBar}>
            {/* Today Jap Card */}
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>⚡</Text>
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TODAY_JAP)}
              </Text>
              <Text style={styles.statChipValue}>{todayCount}</Text>
            </View>
            <View style={styles.statDivider} />

            {/* Today Mala Card */}
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>📿</Text>
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TODAY_MALA)}
              </Text>
              <Text style={styles.statChipValue}>{todayMala}</Text>
            </View>
            <View style={styles.statDivider} />

            {/* Total Chants Card */}
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>📊</Text>
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TOTAL_CHANTS)}
              </Text>
              <Text style={styles.statChipValue}>{totalCount}</Text>
            </View>
          </View>

          {/*  Mantra Text Card */}
          <View style={styles.mantraCard}>
            <View style={styles.mantraAccentBar} />
            <Animated.Text
              style={[styles.mantraDisplayText, animatedTextStyle]}
            >
              {mantraText}
            </Animated.Text>
          </View>

          {/* ── Mala Circle + Tap Sphere ── */}
          <View style={styles.malaContainer}>
            {/* Rotating bead ring */}
            <Animated.View
              style={[styles.malaRing, animatedMalaStyle]}
              pointerEvents="none"
            >
              {BEAD_ANGLES.map((angle, i) => (
                <MalaBead
                  key={i}
                  angle={angle}
                  filled={i < currentBeadIndex}
                  isMarker={i === currentBeadIndex}
                  rotationOffset={0}
                />
              ))}
            </Animated.View>

            {/* Center tap sphere */}
            <Pressable
              onPress={handleChantPress}
              hitSlop={{
                top: scale(25),
                bottom: scale(25),
                left: scale(25),
                right: scale(25),
              }}
            >
              <Animated.View style={[styles.chantSphere, animatedSphereStyle]}>
                <Text style={styles.chantCountText}>{count}</Text>
                <Text style={styles.chantTargetText}>/ {target}</Text>
                <Text style={styles.chantLabel}>
                  {t(Translation.JAP_CHANT_LABEL)}
                </Text>
              </Animated.View>
            </Pressable>
          </View>

          {/* ── Bottom Buttons ── */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.resetBtn]}
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnIcon}>↺</Text>
              <Text style={[styles.actionBtnLabel, styles.resetBtnText]}>
                {t(Translation.RESET_LABEL)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ── Switch Mantra Confirmation Modal ── */}
        <SwitchMantraModal
          visible={isSwitchModalVisible}
          targetMantraName={
            pendingMantra
              ? currentLanguage === 'hi'
                ? pendingMantra.nameHi
                : pendingMantra.nameEn
              : ''
          }
          currentLanguage={currentLanguage}
          onCancel={handleCancelSwitch}
          onConfirm={handleConfirmSwitch}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

const MALA_CONTAINER_SIZE = scale(270);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    paddingBottom: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderVerySubtle,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  hapticBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.borderSubtle2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  hapticBtnActive: {
    backgroundColor: colors.accentOrangeBg,
    borderColor: colors.accentOrangeBorder,
  },
  hapticBtnIcon: {
    fontSize: fs(14),
  },
  streakBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    backgroundColor: colors.accentBorderSubtle,
    borderWidth: 1,
    borderColor: colors.accentOrangeMedium,
  },
  streakText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },

  scrollContent: {
    alignItems: 'center',
    paddingBottom: scale(40),
  },

  // Selector
  selectorSection: { width: '100%', marginTop: scale(14) },
  selectorList: { paddingHorizontal: scale(16) },
  selectorItem: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    backgroundColor: colors.accentLightBg,
    marginRight: scale(8),
    borderWidth: 1,
    borderColor: colors.accentBorderSubtle,
  },
  selectorItemSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  selectorText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  selectorTextSelected: { color: colors.white },

  // Stats bar
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(14),
    marginHorizontal: scale(16),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    paddingVertical: scale(10),
    paddingHorizontal: scale(8),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '92%',
  },
  statChip: {
    flex: 1,
    alignItems: 'center',
    gap: scale(1),
  },
  ringDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: colors.ring,
    marginVertical: scale(2),
  },
  statChipIcon: { fontSize: fs(14) },
  statChipLabel: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    letterSpacing: 0.8,
  },
  statChipValue: {
    fontSize: fs(15),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  statDivider: {
    width: 1,
    height: scale(42),
    backgroundColor: colors.borderLight,
  },
  statChipSubValue: {
    fontSize: fs(8.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    opacity: 0.8,
    marginTop: scale(1),
  },

  // Mantra card
  mantraCard: {
    flexDirection: 'row',
    width: '92%',
    minHeight: scale(76),
    backgroundColor: colors.white,
    borderRadius: scale(10),
    padding: scale(12),
    gap: scale(12),
    marginTop: scale(14),
    marginBottom: verticalScale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mantraAccentBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: scale(4),
    backgroundColor: colors.ring,
    minHeight: scale(18),
  },
  mantraDisplayText: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    letterSpacing: 1,
    lineHeight: fs(24),
  },

  // Target row
  targetRow: {
    flexDirection: 'row',
    gap: scale(8),
    marginTop: scale(14),
  },
  targetBtn: {
    width: scale(56),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.accentLightBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
  },
  targetBtnSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  targetBtnText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  targetBtnTextSelected: { color: colors.white },

  // Mala
  malaContainer: {
    width: MALA_CONTAINER_SIZE,
    height: MALA_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),
    position: 'relative',
  },
  malaRing: {
    width: MALA_CONTAINER_SIZE,
    height: MALA_CONTAINER_SIZE,
    position: 'absolute',
  },

  chantSphere: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
    gap: scale(2),
  },
  chantCountText: {
    fontSize: fs(50),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
    lineHeight: fs(50),
  },
  chantTargetText: {
    fontSize: fs(20),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  chantLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    letterSpacing: 2,
  },

  // Bottom buttons
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '92%',
    marginTop: scale(20),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    borderRadius: scale(12),
    gap: scale(8),
  },
  resetBtn: {
    backgroundColor: colors.alertRedSubtle,
    borderWidth: 1,
    borderColor: colors.alertRedBorder,
  },
  actionBtnIcon: {
    fontSize: fs(18),
    lineHeight: fs(22),
    color: colors.alertRed,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  actionBtnLabel: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    lineHeight: fs(20),
    color: colors.secondary,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  resetBtnText: {
    color: colors.alertRed,
  },
});

export default JapScreen;

{
  /* <View style={styles.imageContainer}>
        <Image source={imagePath.greeting} style={styles.greetingImage} />

        <GradientOverlay
          colors={[colors.gradientStart, colors.primary]}
          direction="bottom-to-top"
        />
      </View> */
}
