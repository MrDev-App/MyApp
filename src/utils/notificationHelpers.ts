import { AppNotification } from '@services/notificationService';
import colors from '@theme/colors';
import { getNotificationIcon } from '@constants/reminderCategories';

export { getNotificationIcon };

/** Maps notification type to its badge background color. Pure function — lives outside component. */
export const getNotificationBadgeBg = (
  type: AppNotification['type'],
): string => {
  const bgs: Record<string, string> = {
    chant: colors.accentOrangeBg,
    shlokas: colors.notificationTagBrown,
    mantras: colors.notificationTagAmber,
    arti: colors.notificationTagOrange,
    books: colors.notificationTagBrown,
    festivals: colors.notificationTagOrange,
    sadhana: colors.accentOrangeBg,
    festival: colors.notificationTagOrange,
    milestone: colors.notificationTagAmber,
    wisdom: colors.notificationTagBrown,
  };
  return bgs[type] ?? colors.borderSubtle2;
};
