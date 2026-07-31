import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../navigation/type';
import { useAuth } from '../../navigation/AuthContext';
import { useStackNavigation } from '../../navigation/navigationHooks';

const CURVE_HEIGHT = 200;
const CURVE_DEPTH = 60;
const { width, height } = Dimensions.get('window');
const heightX = height / 2;
const BOX_SIZE = 60;

const coverTextScale = 3;
const fullScreenScale = (Math.max(width, height) * 1.5) / BOX_SIZE;

const Splash = () => {
  const navigation = useStackNavigation();
  const { isFirstLaunch, userToken, skipLogin, isLoading } = useAuth();

  const [animationCompleted, setAnimationCompleted] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-heightX);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const continueY = useSharedValue(200);

  const continueAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: continueY.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      scale.value,
      [1, coverTextScale],
      ['#2C8358', '#ffffff'],
    ),
  }));

  const handleContinue = async () => {
    try {
      if (isFirstLaunch) {
        navigation.replace('Auth');
      } else {
        if (!userToken) {
          await skipLogin();
        }

        navigation.replace('BottomTabs');
      }
    } catch (error) {
      console.error('[Splash] Navigation redirect failed:', error);
    }
  };

  const animate = () => {
    translateY.value = withSpring(
      0,
      { damping: 6, stiffness: 100, mass: 0.4 },
      finished => {
        if (finished) {
          scale.value = withSpring(
            coverTextScale,
            { damping: 6, stiffness: 180, mass: 0.4 },
            finished2 => {
              if (finished2) {
                scale.value = withDelay(
                  100,
                  withSpring(
                    fullScreenScale,
                    { damping: 6, stiffness: 180, mass: 0.4 },
                    finished3 => {
                      if (finished3) {
                        continueY.value = withSpring(0, {
                          damping: 10,
                          stiffness: 40,
                          mass: 0.2,
                        });
                      }
                    },
                  ),
                );
              }
            },
          );
        }
      },
    );
  };

  useEffect(() => {
    animate();
    setAnimationCompleted(true);
    setTimeout(() => {
      if (animationCompleted && !isLoading) {
        handleContinue();
      }
    }, 5000);
  }, [animationCompleted, isLoading]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Animated.Text style={[styles.text, textAnimatedStyle]}>
        Splash
      </Animated.Text>

      <Animated.View style={[styles.continueViewOuter, continueAnimatedStyle]}>
        <Svg
          width={width}
          height={CURVE_HEIGHT}
          style={StyleSheet.absoluteFill}
        >
          <Path
            d={`M0,0 Q${
              width / 2
            },${CURVE_DEPTH} ${width},0 L${width},${CURVE_HEIGHT} L0,${CURVE_HEIGHT} Z`}
            fill="#ffffff"
          />
        </Svg>

        <View
          style={{
            width: '100%',
            height: 165,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#2C8358" />
        </View>
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: '#2C8358',
    borderRadius: BOX_SIZE,
  },
  text: {
    position: 'absolute',
    color: '#2C8358',
    fontSize: 34,
    fontWeight: '900',
  },
  continueViewOuter: {
    width: '100%',
    height: 165,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
