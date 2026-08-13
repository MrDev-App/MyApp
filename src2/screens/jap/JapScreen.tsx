import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MANTRAS_LIST } from '../../constants/japData';
import { Translation } from '../../i18n/language';

const TARGET_PRESETS = [11, 21, 51, 108];

const JapScreen = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';

  const [selectedMantra, setSelectedMantra] = useState(MANTRAS_LIST[0]);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, setTarget] = useState(108);

  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0);

  const animatedRingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ringScale.value }],
      opacity: ringOpacity.value,
    };
  });

  const handleChantPress = () => {
    setCount(prev => {
      const next = prev + 1;
      if (next >= target) {
        setRounds(r => r + 1);
        return 0;
      }
      return next;
    });

    ringScale.value = 1;
    ringOpacity.value = 0.7;

    ringScale.value = withTiming(1.6, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
    ringOpacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
  };

  const handleReset = () => {
    setCount(0);
    setRounds(0);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t(Translation.JAP_CHANTING)}</Text>
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
                const mantraName =
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
                      {mantraName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Large Mantra Display Card */}
          <View style={styles.mantraCard}>
            <View style={styles.mantraAccentBar} />
            <Text style={styles.mantraDisplayText}>
              {currentLanguage === 'hi'
                ? selectedMantra.textHi
                : selectedMantra.textEn}
            </Text>
          </View>

          {/* Central Interactive Chanting Sphere */}
          <View style={styles.circleContainer}>
            {/* Animated pulsing ring */}
            <Animated.View style={[styles.rippleRing, animatedRingStyle]} />

            {/* Tap sphere */}
            <TouchableOpacity
              style={styles.chantSphere}
              onPress={handleChantPress}
              activeOpacity={0.9}
            >
              <Text style={styles.chantCountText}>{count}</Text>
              <Text style={styles.chantTotalText}>/ {target}</Text>
              <Text style={styles.tapToChantText}>
                {t(Translation.JAP_TAP_TO_CHANT)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stats Summary Rows */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                {t(Translation.JAP_MALA_COMPLETED)}
              </Text>
              <Text style={styles.statValue}>{rounds}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                {t(Translation.JAP_TOTAL_CHANTS)}
              </Text>
              <Text style={styles.statValue}>{rounds * target + count}</Text>
            </View>
          </View>

          {/* Reset Buttons */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>
              {t(Translation.JAP_RESET_COUNTERS)}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(183, 168, 151, 0.1)',
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(251, 148, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  backButtonText: {
    color: colors.ring,
    fontSize: fs(20),
    lineHeight: fs(22),
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
  selectorSection: {
    width: '100%',
    marginTop: scale(16),
  },
  sectionLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  selectorList: {
    paddingHorizontal: scale(16),
  },
  selectorItem: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    backgroundColor: 'rgba(252, 224, 180, 0.15)',
    marginRight: scale(10),
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
  selectorTextSelected: {
    color: colors.white,
  },
  mantraCard: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: scale(12),
    gap: scale(12),
    marginVertical: scale(20),
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.2)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  mantraAccentBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: scale(4),
    backgroundColor: colors.ring,
    minHeight: scale(20),
  },
  mantraDisplayText: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    letterSpacing: 2,
    lineHeight: fs(24),
  },
  targetSection: {
    width: '90%',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  presetButton: {
    width: scale(64),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(252, 224, 180, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.12)',
  },
  presetButtonSelected: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  presetText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  presetTextSelected: {
    color: colors.white,
  },
  circleContainer: {
    width: scale(230),
    height: scale(230),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(16),
    position: 'relative',
  },
  rippleRing: {
    position: 'absolute',
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    borderWidth: 4,
    borderColor: 'rgba(251, 148, 55, 0.4)',
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
  },
  chantSphere: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: colors.ring,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  chantCountText: {
    fontSize: fs(38),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  chantTotalText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginTop: scale(2),
  },
  tapToChantText: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    letterSpacing: 1.5,
    marginTop: scale(10),
    opacity: 0.8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: scale(16),
  },
  statBox: {
    width: '47%',
    backgroundColor: 'rgba(252, 224, 180, 0.1)',
    borderRadius: scale(16),
    padding: scale(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.1)',
  },
  statLabel: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginBottom: scale(4),
    textAlign: 'center',
  },
  statValue: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  resetButton: {
    marginTop: scale(24),
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    backgroundColor: 'rgba(235, 87, 87, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(235, 87, 87, 0.2)',
  },
  resetButtonText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: '#EB5757',
  },
});

export default JapScreen;
