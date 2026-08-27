import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';

type ChantSphereProps = {
  onPress: () => void;
  count: number;
  target: number;
  animatedSphereStyle: any;
  chantLabel: string;
};

const ChantSphere = React.memo(({
  onPress,
  count,
  target,
  animatedSphereStyle,
  chantLabel,
}: ChantSphereProps) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{
        top: scale(25),
        bottom: scale(25),
        left: scale(25),
        right: scale(25),
      }}
    >
      <Animated.View style={[styles.chantSphere, animatedSphereStyle]}>
        <Text style={styles.chantCountText}>{count}</Text>
        <Text style={styles.chantTargetText}>/ {target}</Text>
        <Text style={styles.chantLabel}>{chantLabel}</Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  chantSphere: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: scale(2),
  },
  chantCountText: {
    fontSize: fs(50),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
    lineHeight: fs(50),
  },
  chantTargetText: {
    fontSize: fs(20),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  chantLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    letterSpacing: 2,
  },
});

export default ChantSphere;
