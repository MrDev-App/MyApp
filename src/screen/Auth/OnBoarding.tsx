import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { useAuth } from '../../navigation/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParams } from '../../navigation/type';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  illustration: () => React.JSX.Element;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to MyApp',
    subtitle:
      'Discover amazing feeds, news, and connect with people from around the globe.',
    color: '#2C8358',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#2C8358" opacity="0.1" />
        <Rect x="25" y="25" width="50" height="50" rx="10" fill="#2C8358" />
        <Circle cx="50" cy="50" r="12" fill="#ffffff" />
      </Svg>
    ),
  },
  {
    id: '2',
    title: 'Safe & Secure',
    subtitle:
      'We protect your data and logs with industry standard encryption.',
    color: '#1A535C',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#1A535C" opacity="0.1" />
        <Path
          d="M50,22 L78,32 L78,58 C78,74 50,85 50,85 C50,85 22,74 22,58 L22,32 Z"
          fill="#1A535C"
        />
        <Path d="M45,60 L35,50 L40,45 L45,50 L60,35 L65,40 Z" fill="#ffffff" />
      </Svg>
    ),
  },
  {
    id: '3',
    title: 'Personalized View',
    subtitle:
      'Customize your system preferences, themes, and navigation parameters instantly.',
    color: '#495867',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#495867" opacity="0.1" />
        <Rect x="30" y="30" width="40" height="40" rx="8" fill="#495867" />
        <Circle cx="40" cy="50" r="4" fill="#ffffff" />
        <Circle cx="50" cy="50" r="4" fill="#ffffff" />
        <Circle cx="60" cy="50" r="4" fill="#ffffff" />
      </Svg>
    ),
  },
];

const OnBoarding = () => {
  const { completeOnboarding } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthParams>>();
  const flatListRef = useRef<FlatList<Slide>>(null);
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

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
        <View style={styles.indicatorContainer}>
          {slides.map((_, i) => {
            const animatedDotStyle = useAnimatedStyle(() => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const dotWidth = interpolate(
                scrollX.value,
                inputRange,
                [8, 20, 8],
                Extrapolate.CLAMP,
              );
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.4, 1, 0.4],
                Extrapolate.CLAMP,
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
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
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
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorContainer: {
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
    backgroundColor: '#2C8358',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
