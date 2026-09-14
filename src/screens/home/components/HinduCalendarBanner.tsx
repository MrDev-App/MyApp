import React, { useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
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
        withTiming(-4, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    // Aura pulse
    auraScale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Arrow nudge
    arrowX.value = withRepeat(
      withSequence(
        withTiming(4, { duration: 550, easing: Easing.out(Easing.quad) }),
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

  const todayDateStr = useMemo(() => {
    const d = new Date();
    const day = d.getDate();
    const monthsHi = [
      'जनवरी',
      'फ़रवरी',
      'मार्च',
      'अप्रैल',
      'मई',
      'जून',
      'जुलाई',
      'अगस्त',
      'सितंबर',
      'अक्टूबर',
      'नवंबर',
      'दिसंबर',
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
    try {
      navigation.navigate('Calendar');
    } catch {
      try {
        navigation.navigate('BottomTabs', { screen: 'Calendar' });
      } catch {
        navigation.navigate('CalendarScreen');
      }
    }
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.92}
        onPress={handlePress}
      >
        <View style={styles.cardContainer}>
          {/* Base Rich Saffron-Ivory Gradient */}
          <LinearGradient
            colors={['#FFFDF9', '#FFF7EA', '#FEEED6']}
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
                    ? ' तिथि, एवं वर्ष भर के संपूर्ण व्रत-पर्व'
                    : 'Tithi, & Year-round Auspicious Vrat & Festivals'}
                </Text>

                {/* Feature Chips */}
                <View style={styles.chipRow}>
                  <View style={styles.chip}>
                    <Image
                      source={imagePath.calendar}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.chipText}>
                      {isHi ? 'मासिक पंचांग' : 'Panchang'}
                    </Text>
                  </View>
                  <View style={styles.chip}>
                    <Image
                      source={imagePath.star}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.chipText}>
                      {isHi ? 'व्रत-पर्व' : 'Vrat'}
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
              <Text style={styles.footerPrompt} numberOfLines={1}>
                {isHi
                  ? 'संपूर्ण सनातन कैलेंडर एवं तिथियां देखें'
                  : 'Explore Complete Hindu Calendar'}
              </Text>

              <View style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>
                  {isHi ? 'कैलेंडर देखें' : 'View Calendar'}
                </Text>
                <Animated.View style={arrowStyle}>
                  <Forward
                    width={scale(11)}
                    height={scale(11)}
                    stroke={colors.white}
                  />
                </Animated.View>
              </View>
            </View>

            {/* Dynamic Animated Golden Shimmer Beam Overlay */}
            <Animated.View
              pointerEvents="none"
              style={[styles.shimmerContainer, shimmerStyle]}
            >
              <LinearGradient
                colors={[
                  'rgba(255, 215, 0, 0)',
                  'rgba(255, 225, 120, 0.1)',
                  'rgba(255, 255, 255, 0.25)',
                  'rgba(255, 225, 120, 0.1)',
                  'rgba(255, 215, 0, 0)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
              />
            </Animated.View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginVertical: scale(8),
  },
  touchable: {
    width: '100%',
  },
  cardContainer: {
    borderRadius: scale(14),
    backgroundColor: '#FFFDF9',

    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: colors.ring,
        shadowOffset: { width: 0, height: scale(4) },
        shadowOpacity: 0.15,
        shadowRadius: scale(8),
      },
      android: {
        elevation: 1,
      },
    }),
  },
  gradientBg: {
    borderRadius: scale(15),
    position: 'relative',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  auspiciousTag: {
    backgroundColor: 'rgba(251, 148, 55, 0.14)',
    paddingHorizontal: scale(9),
    paddingVertical: scale(3),

    borderRadius: scale(7),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.35)',
  },
  auspiciousTagText: {
    color: colors.secondary,
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    letterSpacing: 0.3,
  },
  liveDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 24, 16, 0.75)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(8),
    gap: scale(5),
  },
  liveDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#34d399',
  },
  liveDateText: {
    color: '#FFF8E7',
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
    paddingRight: scale(8),
    marginLeft: scale(10),
  },
  titleText: {
    color: colors.secondary,
    fontSize: fs(15.5),
    fontFamily: fonts.TiroHindiRegular,
    marginBottom: scale(3),
  },
  descriptionText: {
    color: colors.secondary,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    lineHeight: fs(15.5),

    opacity: 0.85,
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
    backgroundColor: 'rgba(251, 148, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
    paddingHorizontal: scale(7),
    paddingVertical: scale(2.5),
    borderRadius: scale(6),
  },
  chipIcon: {
    width: scale(11),
    height: scale(11),
  },
  chipText: {
    color: colors.secondary,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  iconColumn: {
    width: scale(68),
    height: scale(68),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: scale(15),
  },
  glowAura: {
    position: 'absolute',
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'rgba(251, 148, 55, 0.2)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calendarImage: {
    width: scale(52),
    height: scale(52),
  },
  lampImage: {
    position: 'absolute',
    bottom: -scale(4),
    right: -scale(6),
    width: scale(20),
    height: scale(20),
  },
  footerStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale(8),
    borderTopWidth: 1,
    paddingHorizontal: scale(10),
    paddingBottom: scale(10),
    borderTopColor: 'rgba(251, 148, 55, 0.18)',
  },
  footerPrompt: {
    color: colors.secondary,
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    flex: 1,
    marginRight: scale(8),
    opacity: 0.9,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ring,
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderRadius: scale(14),
    gap: scale(5),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.3,
    shadowRadius: scale(3),
    elevation: 2,
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
