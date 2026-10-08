import { Dimensions } from 'react-native';
import colors from '@theme/colors';
import { scale } from '@theme/sizes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BOOK_WIDTH = Math.min(SCREEN_WIDTH - scale(28), scale(380));
export const BOOK_HEIGHT = Math.min(scale(560), SCREEN_HEIGHT - scale(150));

export const getBookDimensions = (
  windowWidth: number,
  windowHeight: number,
) => ({
  bookWidth: Math.min(windowWidth - scale(28), scale(380)),
  bookHeight: Math.min(scale(560), windowHeight - scale(150)),
});

export const GOLD_ACCENT = colors.goldBead;
export const GOLD_BORDER = colors.goldBeadBorder;

export const SPRING_CONFIG = {
  damping: 20,
  stiffness: 180,
  mass: 0.6,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const QUEUED_SPRING_CONFIG = {
  damping: 24,
  stiffness: 240,
  mass: 0.5,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};
