import { Dimensions, Platform, PixelRatio } from 'react-native';

const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getWindowDimensions = () => Dimensions.get('window');

export const screenWidth = getWindowDimensions().width;

export const screenHeight = getWindowDimensions().height;

export const wp = (percent: number): number => {
  const { width } = Dimensions.get('window');
  return (width * percent) / 100;
};

export const hp = (percent: number): number => {
  const { height } = Dimensions.get('window');
  return (height * percent) / 100;
};

export const scale = (size: number): number => {
  const { width } = Dimensions.get('window');
  return (width / GUIDELINE_BASE_WIDTH) * size;
};

export const verticalScale = (size: number): number => {
  const { height } = Dimensions.get('window');
  return (height / GUIDELINE_BASE_HEIGHT) * size;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

export const moderateVerticalScale = (size: number, factor = 0.5): number => {
  return size + (verticalScale(size) - size) * factor;
};

export const fs = (size: number, factor = 0.5): number => {
  return moderateScale(size, factor);
};

export const isTablet = (): boolean => {
  if (isIOS) {
    return (Platform as any).isPad;
  }

  const { width, height } = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  const diagonalPixels = Math.sqrt(
    Math.pow(adjustedWidth, 2) + Math.pow(adjustedHeight, 2),
  );

  const diagonalInches = diagonalPixels / (pixelDensity * 160);

  return diagonalInches >= 7.0;
};

export const isLandscape = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

export const isPortrait = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return height > width;
};

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
