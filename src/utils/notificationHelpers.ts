import { AppNotification } from '@services/notificationService';
import colors from '@theme/colors';

/** Maps notification type to its display emoji icon. Pure function — lives outside component. */
export const getNotificationIcon = (type: AppNotification['type']): string => {
  const icons: Record<AppNotification['type'], string> = {
    sadhana: '⚡',
    festival: '🪔',
    milestone: '🏆',
    wisdom: '📜',
  };
  return icons[type] ?? '🔔';
};

/** Maps notification type to its badge background color. Pure function — lives outside component. */
export const getNotificationBadgeBg = (type: AppNotification['type']): string => {
  const bgs: Record<AppNotification['type'], string> = {
    sadhana: colors.accentOrangeBg,
    festival: colors.notificationTagOrange,
    milestone: colors.notificationTagAmber,
    wisdom: colors.notificationTagBrown,
  };
  return bgs[type] ?? colors.borderSubtle2;
};
