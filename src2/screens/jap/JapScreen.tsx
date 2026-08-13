import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale, verticalScale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MANTRAS_LIST } from '../../constants/japData';
import { Translation } from '../../i18n/language';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Mala constants ────────────────────────────────────────────────────────────
const TOTAL_BEADS = 108;
const BEAD_RADIUS = scale(5); // size of each bead
const MALA_RADIUS = scale(118); // radius of the circle path
const CENTER = scale(130); // half of container size

// Pre-compute bead angles (start from top, clockwise)
const BEAD_ANGLES = Array.from({ length: TOTAL_BEADS }, (_, i) => {
  return (i / TOTAL_BEADS) * 2 * Math.PI - Math.PI / 2;
});

// ─── MalaBead component ────────────────────────────────────────────────────────
type MalaBeadProps = {
  angle: number;
  filled: boolean;
  isMarker: boolean;
  rotationOffset: number; // degrees
};

const MalaBead = React.memo(
  ({ angle, filled, isMarker, rotationOffset }: MalaBeadProps) => {
    const rad = angle + (rotationOffset * Math.PI) / 180;
    const x =
      CENTER +
      MALA_RADIUS * Math.cos(rad) -
      (isMarker ? scale(9) : BEAD_RADIUS);
    const y =
      CENTER +
      MALA_RADIUS * Math.sin(rad) -
      (isMarker ? scale(9) : BEAD_RADIUS);
    const size = isMarker ? scale(18) : BEAD_RADIUS * 2;

    if (isMarker) {
      return (
        <View
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#D4A017',
            borderWidth: 1.5,
            borderColor: '#B8860B',
            shadowColor: '#0e0e0dff',
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
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: filled ? '#6B3A2A' : 'rgba(183, 168, 151, 0.25)',
          borderWidth: filled ? 0 : 1,
          borderColor: 'rgba(183, 168, 151, 0.4)',
        }}
      />
    );
  },
);

// ─── Main Screen ────────────────────────────────────────────────────────────────
const JapScreen = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const [selectedMantra, setSelectedMantra] = useState(MANTRAS_LIST[0]);
  const [displayedMantra, setDisplayedMantra] = useState(MANTRAS_LIST[0]);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, setTarget] = useState(108);

  // Mala rotation shared value (in degrees)
  const malaRotation = useSharedValue(0);
  // Sphere press scale
  const sphereScale = useSharedValue(1);
  // Ripple opacity
  const rippleScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(0);

  // Text animation
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

  const animatedRippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
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
      LayoutAnimation.configureNext({
        duration: 280,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: { type: LayoutAnimation.Types.easeInEaseOut },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
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
    let nextCount = 0;
    setCount(prev => {
      const next = prev + 1;
      if (next >= target) {
        setRounds(r => r + 1);
        nextCount = 0;
        return 0;
      }
      nextCount = next;
      return next;
    });

    // Rotate mala anti-clockwise by one bead step
    const step = 360 / TOTAL_BEADS;
    const targetRotation = nextCount === 0 ? 0 : -(nextCount * step);
    malaRotation.value = withTiming(targetRotation, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });

    // Sphere press animation
    sphereScale.value = withSpring(0.94, { damping: 14, stiffness: 200 });
    setTimeout(() => {
      sphereScale.value = withSpring(1, { damping: 14, stiffness: 200 });
    }, 120);

    // Ripple
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
  }, [target, malaRotation, sphereScale, rippleScale, rippleOpacity]);

  const handleReset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCount(0);
    setRounds(0);
    malaRotation.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  };

  const currentBeadIndex =
    Math.round((count / target) * TOTAL_BEADS) % TOTAL_BEADS;
  const totalChants = rounds * target + count;
  const mantraText =
    currentLanguage === 'hi' ? displayedMantra.textHi : displayedMantra.textEn;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t(Translation.JAP_CHANTING)}</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>
              🔥 {rounds} {currentLanguage === 'hi' ? 'माला' : 'Mala'}
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Mantra Selector ── */}
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
                    onPress={() => {
                      setSelectedMantra(item);
                      setCount(0);
                    }}
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

          {/* ── Stats Bar: JAP | MALA | TOTAL ── */}
          <View style={styles.statsBar}>
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>🔵</Text>
              <Text style={styles.statChipLabel}>
                {currentLanguage === 'hi' ? 'जाप' : 'JAP'}
              </Text>
              <Text style={styles.statChipValue}>{count}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>📿</Text>
              <Text style={styles.statChipLabel}>
                {currentLanguage === 'hi' ? 'माला' : 'MALA'}
              </Text>
              <Text style={styles.statChipValue}>
                {rounds} / {Math.floor(totalChants / target)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>📊</Text>
              <Text style={styles.statChipLabel}>
                {currentLanguage === 'hi' ? 'कुल' : 'TOTAL'}
              </Text>
              <Text style={styles.statChipValue}>{totalChants}</Text>
            </View>
          </View>

          {/* ── Mantra Text Card ── */}
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
            <Animated.View style={[styles.malaRing, animatedMalaStyle]}>
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

            {/* Ripple ring */}
            <Animated.View style={[styles.rippleRing, animatedRippleStyle]} />

            {/* Center tap sphere */}
            <Pressable onPress={handleChantPress}>
              <Animated.View style={[styles.chantSphere, animatedSphereStyle]}>
                <Text style={styles.chantCountText}>{count}</Text>
                <Text style={styles.chantTargetText}>{target}</Text>
                <Text style={styles.chantLabel}>
                  {currentLanguage === 'hi' ? 'जाप' : 'CHANT'}
                </Text>
              </Animated.View>
            </Pressable>
          </View>

          {/* ── Bottom Buttons ── */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <Text style={styles.actionBtnIcon}>▶</Text>
              <Text style={styles.actionBtnLabel}>
                {currentLanguage === 'hi' ? 'ऑटो' : 'Auto'}
              </Text>
              <Text style={styles.actionBtnSub}>
                {currentLanguage === 'hi' ? 'जाप' : 'CHANT'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.resetBtn]}
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnIcon}>↺</Text>
              <Text style={[styles.actionBtnLabel, styles.resetBtnText]}>
                {currentLanguage === 'hi' ? 'रीसेट' : 'Reset'}
              </Text>
              <Text style={[styles.actionBtnSub, styles.resetBtnText]}>
                {currentLanguage === 'hi' ? 'काउंटर' : 'Counter'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────────
const MALA_CONTAINER_SIZE = scale(260);

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
    borderBottomColor: 'rgba(183, 168, 151, 0.1)',
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  streakBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
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
    backgroundColor: 'rgba(252, 224, 180, 0.15)',
    marginRight: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.12)',
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
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.15)',
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
    height: scale(32),
    backgroundColor: 'rgba(183, 168, 151, 0.2)',
  },

  // Mantra card
  mantraCard: {
    flexDirection: 'row',
    width: '92%',
    backgroundColor: colors.white,
    borderRadius: scale(10),
    padding: scale(12),
    gap: scale(12),
    marginTop: scale(14),
    marginBottom: verticalScale(10),

    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.2)',
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
    backgroundColor: 'rgba(252, 224, 180, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.15)',
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
  rippleRing: {
    position: 'absolute',
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    borderWidth: 3,
    borderColor: 'rgba(251, 148, 55, 0.35)',
    backgroundColor: 'rgba(251, 148, 55, 0.06)',
  },
  chantSphere: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    // backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: colors.ring,
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.12,
    // shadowRadius: 14,
    // elevation: 6,
    gap: scale(2),
  },
  chantCountText: {
    fontSize: fs(44),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    lineHeight: fs(50),
  },
  chantTargetText: {
    fontSize: fs(15),
    fontFamily: fonts.Marcellus,
    color: colors.ring,
  },
  chantLabel: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    letterSpacing: 1.5,
  },

  // Bottom buttons
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '92%',
    marginTop: scale(24),
    gap: scale(16),
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scale(12),
    borderRadius: scale(14),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    gap: scale(2),
  },
  resetBtn: {
    backgroundColor: 'rgba(235, 87, 87, 0.05)',
    borderColor: 'rgba(235, 87, 87, 0.15)',
  },
  actionBtnIcon: {
    fontSize: fs(18),
    color: colors.ring,
  },
  actionBtnLabel: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  actionBtnSub: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    letterSpacing: 0.8,
  },
  resetBtnText: { color: '#EB5757' },
});

export default JapScreen;
