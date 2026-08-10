import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import colors from '../utile/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { fs, verticalScale, scale } from '../utile/sizes';
import fonts from '../utile/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const omOpacity = useSharedValue(0);
  const omScale = useSharedValue(0.4);
  const omTranslateY = useSharedValue(verticalScale(40));

  const engOpacity = useSharedValue(0);
  const engTranslateY = useSharedValue(verticalScale(25));

  const hinOpacity = useSharedValue(0);
  const hinTranslateY = useSharedValue(verticalScale(20));

  const omStyle = useAnimatedStyle(() => ({
    opacity: omOpacity.value,
    transform: [{ scale: omScale.value }, { translateY: omTranslateY.value }],
  }));

  const engStyle = useAnimatedStyle(() => ({
    opacity: engOpacity.value,
    transform: [{ translateY: engTranslateY.value }],
  }));

  const hinStyle = useAnimatedStyle(() => ({
    opacity: hinOpacity.value,
    transform: [{ translateY: hinTranslateY.value }],
  }));

  useEffect(() => {
    omOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
    omScale.value = withTiming(1.2, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
    omTranslateY.value = withTiming(0, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });

    engOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );
    engTranslateY.value = withDelay(
      500,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );

    hinOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );
    hinTranslateY.value = withDelay(
      800,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, [
    navigation,
    omOpacity,
    omScale,
    omTranslateY,
    engOpacity,
    engTranslateY,
    hinOpacity,
    hinTranslateY,
  ]);

  return (
    // <GradientBackground style={styles.container}>
    <View style={styles.contentContainer}>
      <Animated.View style={[styles.omContainer, omStyle]}>
        <Text style={styles.omText}>ॐ</Text>
      </Animated.View>

      <View style={styles.textContainer}>
        <Animated.Text style={[styles.englishText, engStyle]}>
          GuruVani
        </Animated.Text>
        <Animated.Text style={[styles.hindiText, hinStyle]}>
          गुरुवाणी
        </Animated.Text>
      </View>
    </View>
    // </GradientBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(20),
  },
  omContainer: {
    height: scale(110),
    width: scale(110),
    justifyContent: 'center',
    alignItems: 'center',
  },
  omText: {
    fontSize: fs(90),
    color: colors.ring,
    fontWeight: 'semibold',
  },
  textContainer: {
    alignItems: 'center',
  },
  englishText: {
    fontSize: fs(20),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
    letterSpacing: scale(2),
    textAlign: 'center',
  },
  hindiText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(20),
    color: colors.ring,
    letterSpacing: scale(1),
    marginTop: verticalScale(2),
    textAlign: 'center',
  },
});
