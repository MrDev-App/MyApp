import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useAnimatedReaction,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

import { BookSheetProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { BOOK_WIDTH } from './FlipBookCover.constants';

export const BookSheet: React.FC<BookSheetProps> = React.memo(
  ({
    index,
    totalSheets,
    progress,
    frontContent,
    backContent,
    onHalfwayChange,
    bookWidth = BOOK_WIDTH,
  }) => {
    // Dynamic on-demand rasterization during flip transition only
    const [isRasterizing, setIsRasterizing] = useState(false);

    useAnimatedReaction(
      () => progress.value > 0.01 && progress.value < 0.99,
      (isTurning, wasTurning) => {
        if (isTurning !== wasTurning) {
          runOnJS(setIsRasterizing)(isTurning);
        }
      },
      [],
    );

    // Synchronously report halfway crossing (0.5 progress) to update page numbers instantly
    useAnimatedReaction(
      () => progress.value >= 0.5,
      (isPastHalf, wasPastHalf) => {
        if (wasPastHalf !== null && isPastHalf !== wasPastHalf) {
          const targetPage = isPastHalf ? index + 1 : index;
          runOnJS(onHalfwayChange)(targetPage);
        }
      },
      [index, onHalfwayChange],
    );

    const leafAnimatedStyle = useAnimatedStyle(() => {
      const rotateY = interpolate(
        progress.value,
        [0, 1],
        [0, -180],
        Extrapolation.CLAMP,
      );

      let zIndex =
        rotateY > -90 ? (totalSheets - index) * 10 : (index + 1) * 10;
      if (progress.value > 0.005 && progress.value < 0.995) {
        zIndex = 1000 + (totalSheets - index);
      }

      return {
        zIndex,
        transform: [
          { perspective: 1400 },
          { translateX: -bookWidth / 2 },
          { rotateY: `${rotateY}deg` },
          { translateX: bookWidth / 2 },
        ],
      };
    });

    const frontFaceStyle = useAnimatedStyle(() => {
      return {
        opacity: progress.value < 0.5 ? 1 : 0,
        zIndex: progress.value < 0.5 ? 2 : 0,
      };
    });

    const backFaceStyle = useAnimatedStyle(() => {
      return {
        opacity: progress.value >= 0.5 ? 1 : 0,
        zIndex: progress.value >= 0.5 ? 2 : 0,
      };
    });

    const curlShadowStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        progress.value,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 0.35, 0.5, 0.2, 0],
        Extrapolation.CLAMP,
      );
      return { opacity };
    });

    return (
      <Animated.View style={[styles.turningLeaf, leafAnimatedStyle]}>
        {/* FRONT FACE (Visible 0deg to -90deg) */}
        <Animated.View
          style={[styles.coverFaceFront, frontFaceStyle]}
          renderToHardwareTextureAndroid={isRasterizing}
          shouldRasterizeIOS={isRasterizing}
        >
          {frontContent}
          <Animated.View style={[styles.curlShadowOverlay, curlShadowStyle]} />
        </Animated.View>

        {/* BACK FACE (Visible -90deg to -180deg) */}
        <Animated.View
          style={[styles.coverFaceBackWrap, backFaceStyle]}
          renderToHardwareTextureAndroid={isRasterizing}
          shouldRasterizeIOS={isRasterizing}
        >
          {backContent}
        </Animated.View>
      </Animated.View>
    );
  },
);

export default BookSheet;
