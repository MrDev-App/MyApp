import { Dimensions, Platform, PixelRatio } from 'react-native';

// Standard design baseline (based on standard mobile screens e.g. iPhone X/11/13/14)
const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/**
 * Returns dynamic screen dimensions of the current window.
 */
export const getWindowDimensions = () => Dimensions.get('window');

/**
 * Returns the width of the screen.
 * NOTE: Prefer using wp() or dynamic functions if orientation changes are supported.
 */
export const screenWidth = getWindowDimensions().width;

/**
 * Returns the height of the screen.
 * NOTE: Prefer using hp() or dynamic functions if orientation changes are supported.
 */
export const screenHeight = getWindowDimensions().height;

/**
 * Sized based on width percentage of the device screen.
 * Useful for building full-width components, margins, padding, etc.
 *
 * @param percent - The percentage of screen width (e.g., 50 for 50%)
 * @returns Sized value in dp (density-independent pixels)
 */
export const wp = (percent: number): number => {
  const { width } = Dimensions.get('window');
  return (width * percent) / 100;
};

/**
 * Sized based on height percentage of the device screen.
 * Useful for building height-dependent components, safe areas, layout segments, etc.
 *
 * @param percent - The percentage of screen height (e.g., 20 for 20%)
 * @returns Sized value in dp (density-independent pixels)
 */
export const hp = (percent: number): number => {
  const { height } = Dimensions.get('window');
  return (height * percent) / 100;
};

/**
 * Linear scale based on screen width.
 * Best used for horizontal spacing, layout widths, margins, padding, etc.
 *
 * @param size - Original design size in dp
 * @returns Scaled size based on current screen width
 */
export const scale = (size: number): number => {
  const { width } = Dimensions.get('window');
  return (width / GUIDELINE_BASE_WIDTH) * size;
};

/**
 * Linear scale based on screen height.
 * Best used for vertical spacing, layout heights, margins, padding, etc.
 *
 * @param size - Original design size in dp
 * @returns Scaled size based on current screen height
 */
export const verticalScale = (size: number): number => {
  const { height } = Dimensions.get('window');
  return (height / GUIDELINE_BASE_HEIGHT) * size;
};

/**
 * Moderate scaling helper to prevent over-scaling on larger screens and tablets.
 * This is widely used for margins, paddings, sizing buttons, images, and other components
 * where linear scaling might make them too large on tablets.
 *
 * @param size - Original design size in dp
 * @param factor - Sizing constraint factor (0.5 means scale half as fast. Default is 0.5)
 * @returns Scaled size constrained by the scaling factor
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Moderate vertical scaling helper to prevent over-scaling vertically on taller/larger screens.
 *
 * @param size - Original design size in dp
 * @param factor - Sizing constraint factor (default is 0.5)
 * @returns Scaled size constrained by the scaling factor
 */
export const moderateVerticalScale = (size: number, factor = 0.5): number => {
  return size + (verticalScale(size) - size) * factor;
};

/**
 * Responsive font scale based on screen size and device accessibility font scaling.
 * Uses moderate scale to keep text readable on larger screens/tablets without looking excessively huge.
 *
 * @param size - Design font size
 * @param factor - Moderate scale factor (default is 0.5)
 * @returns Scaled font size
 */
export const fs = (size: number, factor = 0.5): number => {
  return moderateScale(size, factor);
};

/**
 * Checks if the current device is a tablet.
 *
 * @returns True if the device is a tablet, false otherwise.
 */
export const isTablet = (): boolean => {
  if (isIOS) {
    return (Platform as any).isPad;
  }
  
  const { width, height } = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  
  // Calculate screen diagonal in pixels
  const diagonalPixels = Math.sqrt(Math.pow(adjustedWidth, 2) + Math.pow(adjustedHeight, 2));
  
  // Convert pixels to inches (density-independent pixels are roughly scaled by density factor)
  // standard dpi is pixelDensity * 160.
  const diagonalInches = diagonalPixels / (pixelDensity * 160);
  
  return diagonalInches >= 7.0; // Commonly accepted threshold for tablets is >= 7 inches diagonal
};

/**
 * Checks if the screen is currently in landscape orientation.
 *
 * @returns True if landscape, false otherwise.
 */
export const isLandscape = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

/**
 * Checks if the screen is currently in portrait orientation.
 *
 * @returns True if portrait, false otherwise.
 */
export const isPortrait = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return height > width;
};

// Bundle everything into a single object for alternative default export import
const Sizes = {
  isIOS,
  isAndroid,
  screenWidth,
  screenHeight,
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  fs,
  isTablet,
  isLandscape,
  isPortrait,
  getWindowDimensions,
};

export default Sizes;
