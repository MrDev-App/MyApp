import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { scale } from '@theme/sizes';
import MalaBead from './MalaBead';

const TOTAL_BEADS = 108;
const BEAD_ANGLES = Array.from({ length: TOTAL_BEADS }, (_, i) => {
  return (i / TOTAL_BEADS) * 2 * Math.PI - Math.PI / 2;
});

const MALA_CONTAINER_SIZE = scale(270);

type MalaRingProps = {
  currentBeadIndex: number;
  animatedMalaStyle: any;
};

const MalaRing = React.memo(({ currentBeadIndex, animatedMalaStyle }: MalaRingProps) => {
  return (
    <Animated.View
      style={[styles.malaRing, animatedMalaStyle]}
      pointerEvents="none"
    >
      {BEAD_ANGLES.map((angle, i) => (
        <MalaBead
          key={i}
          angle={angle}
          filled={i < currentBeadIndex}
          isMarker={i === currentBeadIndex}
          rotationOffset={0}
        />
      ))}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  malaRing: {
    width: MALA_CONTAINER_SIZE,
    height: MALA_CONTAINER_SIZE,
    position: 'absolute',
  },
});

export default MalaRing;
