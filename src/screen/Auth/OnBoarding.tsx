import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import { useAuth } from '../../navigation/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParams } from '../../navigation/type';
import { Slide, slides } from '../../constant/data';
import { runOnJS } from 'react-native-worklets';

const { width } = Dimensions.get('window');

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const OnBoarding = () => {
  const { completeOnboarding } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthParams>>();
  const flatListRef = useRef<FlatList<Slide>>(null);
  const scrollX = useSharedValue(0);
  const btnWidth = useSharedValue(100);
  const indicatorOpacity = useSharedValue(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const animStyleNextBtn = useAnimatedStyle(() => ({
    width: btnWidth.value,
  }));

  const animStyleIndicator = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
    transform: [
      {
        translateX: withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.25, 1, 0.5, 1),
        }),
      },
    ],
  }));

  const animatedNextTextStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
  }));

  const animatedGetStartedTextStyle = useAnimatedStyle(() => ({
    opacity: 1 - indicatorOpacity.value,
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setActiveIndex)(index);
    },
  });

  const handleNext = async () => {
    if (activeIndex === slides.length - 1) {
      await completeOnboarding();
      navigation.replace('Login');
    } else {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const config = {
      duration: 350,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    };
    if (activeIndex === slides.length - 1) {
      btnWidth.value = withTiming(150, config);
      indicatorOpacity.value = withTiming(1, config);
    } else {
      btnWidth.value = withTiming(100, config);
      indicatorOpacity.value = withTiming(1, config);
    }
  }, [activeIndex, width]);

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Sliding Content */}
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.illustrationContainer}>
              {item.illustration()}
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Footer controls */}
      <View style={styles.footer}>
        {/* Pagination Pager Dots */}
        <Animated.View style={[styles.indicatorContainer, animStyleIndicator]}>
          {slides.map((_, i) => {
            const animatedDotStyle = useAnimatedStyle(() => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const dotWidth = interpolate(
                scrollX.value,
                inputRange,
                [8, 20, 8],
                Extrapolation.CLAMP,
              );
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.4, 1, 0.4],
                Extrapolation.CLAMP,
              );
              return {
                width: dotWidth,
                opacity,
              };
            });

            return (
              <Animated.View key={i} style={[styles.dot, animatedDotStyle]} />
            );
          })}
        </Animated.View>

        <AnimatedButton
          style={[styles.button, animStyleNextBtn]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Animated.Text style={[styles.buttonText, animatedNextTextStyle]}>
            Next
          </Animated.Text>
          <Animated.Text
            style={[styles.buttonText, animatedGetStartedTextStyle]}
          >
            Get Started
          </Animated.Text>
        </AnimatedButton>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 60,
  },
  skipText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    height: 90,
    paddingBottom: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  indicatorContainer: {
    position: 'absolute',
    left: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C8358',
    marginHorizontal: 4,
  },
  button: {
    position: 'absolute',
    right: 32,
    backgroundColor: '#2C8358',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
  },
});
