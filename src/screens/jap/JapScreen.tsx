import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LayoutAnimation,
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
  withSequence,
} from 'react-native-reanimated';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import GradientBackground from '@components/GradientBackground';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  getJapMantrasData,
  MantraSelectorItem,
  DEFAULT_MANTRA,
  logChant,
  CustomMantra,
} from '@services/japService';
import { Translation } from '@i18n/language';
import imagePath from '@assets/index';

import SwitchMantraModal from './components/SwitchMantraModal';
import MalaRing from './components/MalaRing';
import ChantSphere from './components/ChantSphere';

import { Storage, STORAGE_KEYS } from '@services/storageService';
import { useIsFocused } from '@react-navigation/native';

const triggerHaptic = () => {
  try {
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 40, 0, 0]);
    } else {
      Vibration.vibrate(30);
    }
  } catch {}
};

const TOTAL_BEADS = 108;

const JapScreen = () => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const [defaultMantras, setDefaultMantras] = useState<MantraSelectorItem[]>([
    DEFAULT_MANTRA,
  ]);
  const [selectedMantra, setSelectedMantra] =
    useState<MantraSelectorItem>(DEFAULT_MANTRA);
  const [displayedMantra, setDisplayedMantra] =
    useState<MantraSelectorItem>(DEFAULT_MANTRA);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, _setTarget] = useState(108);
  const [isHapticOn, setIsHapticOn] = useState(true);
  const isHapticOnRef = useRef(isHapticOn);
  const isFocused = useIsFocused();

  // Custom Mantras State
  const [customMantras, setCustomMantras] = useState<CustomMantra[]>([]);

  // Load mantras
  useEffect(() => {
    if (isFocused) {
      let isMounted = true;
      const loadMantras = async () => {
        try {
          const list = await getJapMantrasData();
          if (isMounted && list.length > 0) {
            setDefaultMantras(list);
          }

          const raw = Storage.getString('CUSTOM_MANTRAS', '[]');
          const parsed: CustomMantra[] = JSON.parse(raw);
          if (isMounted) {
            setCustomMantras(parsed);
          }

          const allMantras = [...list, ...parsed];
          const selectedStillExists = allMantras.some(
            m => m.id === selectedMantra.id,
          );
          if (!selectedStillExists && list.length > 0) {
            setSelectedMantra(list[0]);
            setDisplayedMantra(list[0]);

            const firstMantraId = list[0].id;
            setTotalCount(
              Storage.getNumber(
                `${STORAGE_KEYS.JAP_TOTAL_COUNT}_${firstMantraId}`,
              ) || 0,
            );
            setTodayCount(
              Storage.getNumber(
                `${STORAGE_KEYS.JAP_TODAY_COUNT}_${firstMantraId}`,
              ) || 0,
            );
            setTodayMala(
              Storage.getNumber(
                `${STORAGE_KEYS.JAP_TODAY_MALA}_${firstMantraId}`,
              ) || 0,
            );
          }
        } catch (e) {
          console.error('Failed to load mantras in JapScreen', e);
        }
      };

      loadMantras();
      return () => {
        isMounted = false;
      };
    }
  }, [isFocused, selectedMantra.id]);

  useEffect(() => {
    isHapticOnRef.current = isHapticOn;
  }, [isHapticOn]);

  const [totalCount, setTotalCount] = useState(() => {
    const mantraId = DEFAULT_MANTRA.id;
    return (
      Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`) || 0
    );
  });
  const [_totalMala, setTotalMala] = useState(() => {
    const mantraId = DEFAULT_MANTRA.id;
    return Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`) || 0;
  });
  const [todayCount, setTodayCount] = useState(() => {
    Storage.checkAndResetTodayStats();
    const mantraId = DEFAULT_MANTRA.id;
    return (
      Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`) || 0
    );
  });
  const [todayMala, setTodayMala] = useState(() => {
    Storage.checkAndResetTodayStats();
    const mantraId = DEFAULT_MANTRA.id;
    return Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`) || 0;
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

  useEffect(() => {
    handleDateCheck();
    const mantraId = selectedMantra.id;
    setTodayCount(
      Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`, 0),
    );
    setTodayMala(
      Storage.getNumber(`${STORAGE_KEYS.JAP_TODAY_MALA}_${mantraId}`, 0),
    );
    setTotalCount(
      Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`, 0),
    );
    setTotalMala(
      Storage.getNumber(`${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`, 0),
    );
  }, [selectedMantra, handleDateCheck]);

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
  }, [selectedMantra, displayedMantra.id, textOpacity, textTranslateY]);

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

    const mantraId = selectedMantra.id;

    logChant(mantraId, 1);

    // 2. Sync React states
    const nextTodayCount = Storage.getNumber(
      `${STORAGE_KEYS.JAP_TODAY_COUNT}_${mantraId}`,
      0,
    );
    const nextTotalCount = Storage.getNumber(
      `${STORAGE_KEYS.JAP_TOTAL_COUNT}_${mantraId}`,
      0,
    );
    setTodayCount(nextTodayCount);
    setTotalCount(nextTotalCount);

    if (isMalaCompleted) {
      const nextTodayMala = Storage.getNumber(`JAP_TODAY_MALA_${mantraId}`, 0);
      const nextTotalMala = Storage.getNumber(
        `${STORAGE_KEYS.JAP_TOTAL_MALA}_${mantraId}`,
        0,
      );
      setTodayMala(nextTodayMala);
      setTotalMala(nextTotalMala);
    }

    // Rotation step calculation
    const step = 360 / TOTAL_BEADS;
    const targetRotation = nextCount === 0 ? 0 : -(nextCount * step);
    malaRotation.value = withTiming(targetRotation, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });

    sphereScale.value = withSequence(
      withSpring(0.94, { damping: 14, stiffness: 200 }),
      withSpring(1, { damping: 14, stiffness: 200 }),
    );

    if (isHapticOnRef.current) {
      triggerHaptic();
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
    selectedMantra,
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
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
                  triggerHaptic();
                }
              }}
              activeOpacity={0.7}
            >
              {isHapticOn ? (
                <Image
                  source={imagePath.Vibration}
                  style={{
                    width: scale(18),
                    height: scale(18),
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={imagePath.VibrationOff}
                  style={{
                    width: scale(18),
                    height: scale(18),
                  }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
        >
          <View style={styles.selectorSection}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[...defaultMantras, ...customMantras]}
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

          {/* Stats Bar: TODAY JAP | TOTAL MALA | TOTAL CHANTS */}
          <View style={styles.statsBar}>
            {/* Today Jap Card */}
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>⚡</Text>
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TODAY_JAP)}
              </Text>
              <Animated.Text style={[styles.statChipValue, animatedTextStyle]}>
                {todayCount}
              </Animated.Text>
            </View>
            <View style={styles.statDivider} />

            {/* Today Mala Card */}
            <View style={styles.statChip}>
              <Image source={imagePath.mala} style={styles.malaIcon} />
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TOTAL_MALA)}
              </Text>
              <Animated.Text style={[styles.statChipValue, animatedTextStyle]}>
                {todayMala}
              </Animated.Text>
            </View>
            <View style={styles.statDivider} />

            {/* Total Chants Card */}
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>📊</Text>
              <Text style={styles.statChipLabel}>
                {t(Translation.JAP_TOTAL_CHANTS)}
              </Text>
              <Animated.Text style={[styles.statChipValue, animatedTextStyle]}>
                {' '}
                {totalCount}
              </Animated.Text>
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
            <MalaRing
              currentBeadIndex={currentBeadIndex}
              animatedMalaStyle={animatedMalaStyle}
            />

            <ChantSphere
              onPress={handleChantPress}
              count={count}
              target={target}
              animatedSphereStyle={animatedSphereStyle}
              chantLabel={t(Translation.JAP_CHANT_LABEL)}
            />
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
  malaIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  statChipIcon: { fontSize: fs(14) },
  statChipLabel: {
    fontSize: fs(10),
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
    marginBottom: scale(10),
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

  // Mala
  malaContainer: {
    width: MALA_CONTAINER_SIZE,
    height: MALA_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),
    position: 'relative',
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
    paddingVertical: scale(10),
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

  addCustomSelectorItem: {
    backgroundColor: colors.borderSubtle2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  addCustomSelectorText: {
    color: colors.ring,
  },
});

export default JapScreen;
