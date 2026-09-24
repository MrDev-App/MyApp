// @theme/tabBarMetrics.ts
import { Platform } from 'react-native';
import { verticalScale, scale } from '@theme/sizes';

export const TAB_BAR_HEIGHT = verticalScale(50);
export const BANNER_CONTENT_HEIGHT = scale(15);
export const BANNER_TAB_GAP = scale(5);

export const getBannerHeight = (bottomInset: number) => {
  const extraBottom =
    bottomInset > 0 ? (Platform.OS === 'ios' ? scale(10) : scale(6)) : 0;
  return BANNER_CONTENT_HEIGHT + extraBottom;
};

export const getTabBarBottomOffset = (safeBottomInset: number) =>
  Platform.select({
    ios: safeBottomInset > 0 ? verticalScale(18) : verticalScale(15),
    android:
      safeBottomInset > 0
        ? safeBottomInset + verticalScale(8)
        : verticalScale(20),
    default: verticalScale(20),
  }) as number;
