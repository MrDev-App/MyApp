// @theme/tabBarMetrics.ts
import { Platform } from 'react-native';
import { verticalScale } from '@theme/sizes';

export const TAB_BAR_HEIGHT = verticalScale(50);

export const getTabBarBottomOffset = (safeBottomInset: number) =>
  Platform.select({
    ios: safeBottomInset > 0 ? verticalScale(18) : verticalScale(15),
    android:
      safeBottomInset > 0
        ? safeBottomInset + verticalScale(8)
        : verticalScale(20),
    default: verticalScale(20),
  }) as number;
