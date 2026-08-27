import React from 'react';
import { View, Image } from 'react-native';
import colors from '../../../utile/colors';
import { scale } from '../../../utile/sizes';
import imagePath from '../../../assets';

const BEAD_RADIUS = scale(7); // size of each bead
const MALA_RADIUS = scale(122); // radius of the circle path
const CENTER = scale(135); // half of container size

type MalaBeadProps = {
  angle: number;
  filled: boolean;
  isMarker: boolean;
  rotationOffset: number; // degrees
};

const MalaBead = React.memo(
  ({ angle, filled, isMarker, rotationOffset }: MalaBeadProps) => {
    const rad = angle + (rotationOffset * Math.PI) / 180;
    const beadRadius = isMarker ? scale(6) : BEAD_RADIUS;
    const size = beadRadius * 2;
    const x = CENTER + MALA_RADIUS * Math.cos(rad) - beadRadius;
    const y = CENTER + MALA_RADIUS * Math.sin(rad) - beadRadius;

    const renderSize = isMarker ? size * 0.9 : size * 0.7;
    const offset = (size - renderSize) / 2;
    const renderX = x + offset;
    const renderY = y + offset;

    if (isMarker) {
      return (
        <View
          style={{
            position: 'absolute',
            left: renderX,
            top: renderY,
            width: renderSize,
            height: renderSize,
            borderRadius: renderSize / 2,
            backgroundColor: colors.goldBead,
            borderWidth: 1.5,
            borderColor: colors.goldBeadBorder,
            shadowColor: colors.beadShadow,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 4,
          }}
        />
      );
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: renderX,
          top: renderY,
          width: renderSize,
          height: renderSize,
          borderRadius: renderSize / 2,
          backgroundColor: colors.borderMedium,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.borderStronger,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {filled && (
          <Image
            source={imagePath.MalaMoti}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        )}
      </View>
    );
  },
);

export default MalaBead;
