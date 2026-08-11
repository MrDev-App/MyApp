import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';
import Images from '../assets';
import colors from '../utile/colors';
import fonts from '../utile/fonts';
import { fs, moderateScale, verticalScale, scale } from '../utile/sizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../components/GradientBackground';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import imagePath from '../assets';

import { useTranslation } from 'react-i18next';
import { Translation } from '../i18n/language';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const slideKeys = [
  Translation.SLIDE_TEXT_1,
  Translation.SLIDE_TEXT_2,
  Translation.SLIDE_TEXT_3,
];

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = useState(0);

  const [displayTextKey, setDisplayTextKey] = useState<string>(slideKeys[0]);

  // Pre-calculate scaled constants on the JS thread
  const stepScale = scale(10);
  const buttonMinWidth = scale(88);
  const buttonMaxWidth = scale(148);

  const scrollX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const animatedSubtitleStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedActiveDotStyle = useAnimatedStyle(() => {
    const translateX = (scrollX.value / screenWidth) * stepScale;
    return {
      transform: [{ translateX }],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const lastIndex = Images.OnBoarding.length - 1;
    const startRange = screenWidth * (lastIndex - 1);
    const endRange = screenWidth * lastIndex;

    const widthVal = interpolate(
      scrollX.value,
      [startRange, endRange],
      [buttonMinWidth, buttonMaxWidth],
      'clamp',
    );

    const backgroundColorVal = interpolateColor(
      scrollX.value,
      [startRange, endRange],
      [colors.secondary, colors.ring],
    );

    return {
      width: widthVal,
      backgroundColor: backgroundColorVal,
    };
  });

  const handleGetStarted = () => {
    navigation.replace('BottomTabs', { screen: 'Home' });
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  React.useEffect(() => {
    opacity.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(setDisplayTextKey)(slideKeys[activeIndex] || slideKeys[0]);
      translateY.value = 8;
      opacity.value = withTiming(1, { duration: 250 });
      translateY.value = withTiming(0, { duration: 250 });
    });
  }, [activeIndex, opacity, translateY]);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={Images.OnBoarding}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          return (
            <GradientBackground style={styles.slide}>
              <View style={styles.imageWrapper}>
                <Image source={item as any} style={styles.centerImage} />
              </View>
            </GradientBackground>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Animated Tagline Header */}
      <View style={styles.headerContainer}>
        <Animated.Text style={[styles.headerSubtitle, animatedSubtitleStyle]}>
          {t(displayTextKey)}
        </Animated.Text>
      </View>

      {/* Floating Bottom UI */}
      <SafeAreaView style={styles.overlayContainer}>
        <View style={styles.bottomRow}>
          {/* Pagination Indicators */}
          <View style={styles.indicatorContainer}>
            {imagePath.OnBoarding.map((_, index) => (
              <View key={index} style={styles.inactiveDot} />
            ))}
            <Animated.View style={[styles.activeDot, animatedActiveDotStyle]} />
          </View>

          {/* Action Button */}
          <AnimatedTouchableOpacity
            style={[styles.actionButton, animatedButtonStyle]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {activeIndex === Images.OnBoarding.length - 1
                ? 'Get Started'
                : 'Skip'}
            </Text>
          </AnimatedTouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    width: '100%',
    height: verticalScale(550),
    borderWidth: 1,
    borderColor: colors.white,
  },
  centerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    position: 'absolute',
    bottom: verticalScale(150),
    left: moderateScale(24),
    right: moderateScale(24),
    zIndex: 10,
  },
  headerSubtitle: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: fs(16),
    color: colors.secondary,
    marginTop: verticalScale(6),
    letterSpacing: scale(0.5),
  },
  overlayContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: moderateScale(24),
    right: moderateScale(24),
    zIndex: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inactiveDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: colors.ring,
    opacity: 0.35,
    marginHorizontal: scale(3),
  },
  activeDot: {
    position: 'absolute',
    left: scale(2),
    top: scale(-1),
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: colors.ring,
  },
  actionButton: {
    height: verticalScale(34),
    borderRadius: verticalScale(24),
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(6),
    elevation: 3,
  },
  actionButtonText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(14),
    color: colors.white,
    textAlign: 'center',
  },
});
