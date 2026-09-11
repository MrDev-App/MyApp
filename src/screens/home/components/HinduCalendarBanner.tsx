import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import imagePath, { Forward } from '@assets/index';
import AnimatedButton from '@components/AnimatedButton';

const HinduCalendarBanner: React.FC = () => {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const isHi = (i18n.language || 'en').startsWith('hi');

  // 1. Shimmer sweep animation across the card
  const shimmerProgress = useSharedValue(-1);

  // 2. Floating & Breathing aura for the calendar badge/icon
  const floatY = useSharedValue(0);
  const auraScale = useSharedValue(1);

  // 3. Arrow nudge animation on the CTA button
  const arrowX = useSharedValue(0);

  // 4. Live indicator dot pulse
  const dotOpacity = useSharedValue(0.4);

  useEffect(() => {
    // Shimmer sweep every 2s
    shimmerProgress.value = withRepeat(
      withSequence(
        withTiming(1.6, { duration: 1500, easing: Easing.inOut(Easing.cubic) }),
        withTiming(-1, { duration: 0 }),
        withTiming(-1, { duration: 500 }), // pause
      ),
      -1,
      false,
    );

    // Floating calendar icon
    floatY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    // Aura pulse
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.22, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Arrow nudge
    arrowX.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 550, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 550, easing: Easing.in(Easing.quad) }),
        withTiming(0, { duration: 900 }),
      ),
      -1,
      false,
    );

    // Live dot
    dotOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 750 }),
        withTiming(0.3, { duration: 750 }),
      ),
      -1,
      true,
    );
  }, [shimmerProgress, floatY, auraScale, arrowX, dotOpacity]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(shimmerProgress.value, [-1, 1.6], [-250, 480]),
      },
    ],
  }));

  const floatingIconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const auraStyle = useAnimatedStyle(() => ({
    transform: [{ scale: auraScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowX.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  // Format today's date
  const todayDateStr = useMemo(() => {
    const d = new Date();
    const day = d.getDate();
    const monthsHi = [
      'जनवरी',
      'फरवरी',
      'मार्च',
      'अप्रैल',
      'मई',
      'जून',
      'जुलाई',
      'अगस्त',
      'सितम्बर',
      'अक्टूबर',
      'नवम्बर',
      'दिसम्बर',
    ];
    const monthsEn = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return isHi
      ? `${day} ${monthsHi[d.getMonth()]}`
      : `${monthsEn[d.getMonth()]} ${day}`;
  }, [isHi]);

  const handlePress = () => {
    navigation.navigate('AllFestivals');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.touchable}>
        <View style={styles.cardContainer}>
          {/* Base Rich Saffron-Terracotta Gradient */}
          <LinearGradient
            colors={[
              colors.primary2,
              colors.primary2,
              colors.primary,
              colors.primary,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBg}
          >
            {/* Top Row: Tag + Live Date indicator */}
            <View style={styles.headerRow}>
              <View style={styles.auspiciousTag}>
                <Text style={styles.auspiciousTagText}>
                  {isHi ? 'सनातन हिंदू कैलेंडर' : 'Sanatan Hindu Calendar'}
                </Text>
              </View>

              <View style={styles.liveDateContainer}>
                <Animated.View style={[styles.liveDot, dotStyle]} />
                <Text style={styles.liveDateText}>
                  {isHi ? `आज: ${todayDateStr}` : `Today: ${todayDateStr}`}
                </Text>
              </View>
            </View>

            {/* Main Content Row */}
            <View style={styles.contentRow}>
              {/* Left Details */}
              <View style={styles.textColumn}>
                <Text style={styles.titleText}>
                  {isHi
                    ? 'दैनिक पंचांग एवं व्रत त्यौहार'
                    : 'Daily Panchang & Festivals'}
                </Text>

                <Text style={styles.descriptionText}>
                  {isHi
                    ? 'शुभ मुहूर्त, तिथि, नक्षत्र, राहुकाल एवं वर्ष भर के संपूर्ण व्रत-पर्व देखें'
                    : 'Muhurat, Tithi, Nakshatra & Year-round Auspicious Vrat & Festivals'}
                </Text>

                {/* Feature Chips */}
                <View style={styles.chipRow}>
                  <View style={styles.chip}>
                    <Image
                      source={imagePath.lamp}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.chipText}>
                      {isHi ? 'शुभ मुहूर्त' : 'Muhurat'}
                    </Text>
                  </View>
                  <View style={styles.chip}>
                    <Image
                      source={imagePath.calendar}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.chipText}>
                      {isHi ? 'मासिक पंचांग' : 'Calendar'}
                    </Text>
                  </View>
                  <View style={styles.chip}>
                    <Image
                      source={imagePath.star}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.chipText}>
                      {isHi ? 'व्रत कथा' : 'Vrat'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Right Animated Graphic: Calendar & Glowing Diya */}
              <View style={styles.iconColumn}>
                {/* Glowing breathing aura */}
                <Animated.View style={[styles.glowAura, auraStyle]} />

                <Animated.View style={[styles.iconWrapper, floatingIconStyle]}>
                  <Image
                    source={imagePath.calendar}
                    style={styles.calendarImage}
                    resizeMode="contain"
                  />
                  {imagePath.lamp && (
                    <Image
                      source={imagePath.lamp}
                      style={styles.lampImage}
                      resizeMode="contain"
                    />
                  )}
                </Animated.View>
              </View>
            </View>

            {/* Bottom CTA Action Strip */}
            <View style={styles.footerStrip}>
              <Text style={styles.footerPrompt}>
                {isHi
                  ? 'संपूर्ण सनातन कैलेंडर एवं तिथियां देखें'
                  : 'Explore Complete Hindu Calendar'}
              </Text>

              <AnimatedButton style={styles.ctaButton} onPress={handlePress}>
                <Text style={styles.ctaButtonText}>
                  {isHi ? 'कैलेंडर देखें' : 'Open Calendar'}
                </Text>
                <Animated.View style={arrowStyle}>
                  <Forward
                    width={scale(11)}
                    height={scale(11)}
                    stroke={colors.white}
                  />
                </Animated.View>
              </AnimatedButton>
            </View>

            {/* Dynamic Animated Golden Shimmer Beam Overlay */}
            <Animated.View
              pointerEvents="none"
              style={[styles.shimmerContainer, shimmerStyle]}
            >
              <LinearGradient
                colors={[
                  'rgba(255, 215, 0, 0)',
                  'rgba(255, 225, 120, 0.12)',
                  'rgba(255, 255, 255, 0.28)',
                  'rgba(255, 225, 120, 0.12)',
                  'rgba(255, 215, 0, 0)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
              />
            </Animated.View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: scale(2),
  },
  touchable: {
    width: '100%',
  },
  cardContainer: {
    borderRadius: scale(18),
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: 'rgba(251, 148, 55, 0.45)',
    ...Platform.select({
      ios: {
        shadowColor: colors.ring,
        shadowOffset: { width: 0, height: scale(4) },
        shadowOpacity: 0.25,
        shadowRadius: scale(10),
      },
      android: {
        elevation: 2,
      },
    }),
  },
  gradientBg: {
    paddingHorizontal: scale(16),
    paddingTop: scale(14),
    paddingBottom: scale(12),
    position: 'relative',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  auspiciousTag: {
    backgroundColor: 'rgba(251, 148, 55, 0.22)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(3.5),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.5)',
  },
  auspiciousTagText: {
    color: colors.black,
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    letterSpacing: 0.3,
  },
  liveDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3.5),
    borderRadius: scale(10),
    gap: scale(5),
  },
  liveDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#38ef7d',
  },
  liveDateText: {
    color: 'rgba(255, 246, 224, 0.9)',
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  textColumn: {
    flex: 1,
    paddingRight: scale(10),
  },
  titleText: {
    color: colors.black,
    fontSize: fs(16.5),
    fontFamily: fonts.TiroHindiRegular,
    marginBottom: scale(4),
  },
  descriptionText: {
    color: colors.black,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    lineHeight: fs(16),
    marginBottom: scale(8),
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: scale(6),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: scale(7),
    paddingVertical: scale(2.5),
    borderRadius: scale(8),
  },
  chipIcon: {
    width: scale(11),
    height: scale(11),
  },
  chipText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  iconColumn: {
    width: scale(72),
    height: scale(72),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowAura: {
    position: 'absolute',
    width: scale(68),
    height: scale(68),
    borderRadius: scale(34),
    backgroundColor: 'rgba(251, 148, 55, 0.22)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calendarImage: {
    width: scale(54),
    height: scale(54),
  },
  lampImage: {
    position: 'absolute',
    bottom: -scale(4),
    right: -scale(6),
    width: scale(22),
    height: scale(22),
  },
  footerStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale(9),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  footerPrompt: {
    color: colors.black,
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    flex: 1,
    marginRight: scale(8),
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ring,
    paddingHorizontal: scale(11),
    paddingVertical: scale(5),
    borderRadius: scale(14),
    gap: scale(5),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.35,
    shadowRadius: scale(4),
    elevation: 3,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: scale(120),
    transform: [{ skewX: '-20deg' }],
  },
  shimmerGradient: {
    flex: 1,
    width: '100%',
  },
});

export default React.memo(HinduCalendarBanner);
