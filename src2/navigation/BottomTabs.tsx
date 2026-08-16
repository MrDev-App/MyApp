import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Image,
} from 'react-native';
import { fs, scale, verticalScale } from '../utile/sizes';
import colors from '../utile/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import imagePath from '../assets';

const bubbleWidth = scale(64);
const bubbleHeight = scale(36);

const getIcon = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return '🪷';
    case 'Jap':
      return '📿';
    case 'Book':
      return '📖';
    case 'Profile':
      return imagePath.user;
    default:
      return '🪷';
  }
};

interface TabIconProps {
  icon: any;
  isFocused: boolean;
}

const TabIcon = ({ icon, isFocused }: TabIconProps) => {
  const scaleVal = useSharedValue(1);

  React.useEffect(() => {
    if (isFocused) {
      scaleVal.value = withSequence(
        withSpring(1.3, { damping: 20, stiffness: 100 }),
      );
    } else {
      scaleVal.value = withTiming(1, { duration: 200 });
    }
  }, [isFocused, scaleVal]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleVal.value }],
    };
  });

  if (typeof icon !== 'string') {
    return (
      <Animated.View style={animatedStyle}>
        <Image
          source={icon}
          style={styles.iconImage}
          resizeMode="contain"
          fadeDuration={0}
        />
      </Animated.View>
    );
  }

  const isBiggerIcon = icon === '🪷' || icon === '📖';
  const customFontSize = isBiggerIcon ? fs(23) : fs(18);

  return (
    <Animated.Text
      style={[styles.iconText, { fontSize: customFontSize }, animatedStyle]}
    >
      {icon}
    </Animated.Text>
  );
};

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const buttonWidthShared = useSharedValue(0);
  const activeIndexShared = useSharedValue(state.index);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;

    buttonWidthShared.value = (width - scale(20)) / 4;
  };

  React.useEffect(() => {
    activeIndexShared.value = withTiming(state.index, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index, activeIndexShared]);

  const animatedBgStyle = useAnimatedStyle(() => {
    const bWidth = buttonWidthShared.value;
    if (bWidth === 0) {
      return {
        opacity: 0,
      };
    }
    const translateX =
      activeIndexShared.value * bWidth + (bWidth - bubbleWidth) / 2;
    return {
      opacity: 1,
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar} onLayout={onLayout}>
        {/* Smooth sliding background pill behind the icons */}
        <Animated.View style={[styles.slidingBg, animatedBgStyle]} />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const icon = getIcon(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <View style={styles.tabContent}>
                <TabIcon icon={icon} isFocused={isFocused} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: scale(20),
    right: scale(20),
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(25),
    height: verticalScale(50),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  slidingBg: {
    position: 'absolute',
    left: scale(10),
    width: bubbleWidth,
    height: bubbleHeight,
    borderRadius: 99,
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    top: (verticalScale(50) - bubbleHeight) / 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconText: {
    fontSize: fs(20),
    textAlign: 'center',
  },
  iconImage: {
    width: scale(22),
    height: scale(22),
  },
});
export default CustomTabBar;
