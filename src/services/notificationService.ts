import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import imagePath from '@assets/index';
import { navigate } from '@navigation/navigationRef';
import { Storage } from './storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';

export interface AppNotification {
  id: string;
  type: 'sadhana' | 'festival' | 'milestone' | 'wisdom';
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  timestamp: number;
  isRead: boolean;
  actionRoute?: 'Jap' | 'AllFestivals' | 'Book' | 'BottomTabs';
  actionParams?: any;
}

export interface NotificationConfig {
  type: 'daily' | 'date' | 'weekly';
  hour: number;
  minute: number;
  isPm: boolean;
  dateString?: string;
  weekdays?: number[];
}

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'sadhana',
    titleEn: 'Morning Sadhana Time 🌅',
    titleHi: 'प्रातः साधना का समय 🌅',
    messageEn: 'Begin your day with peaceful chanting and connect with the divine.',
    messageHi: 'शांतिपूर्ण नाम जप के साथ अपने दिन की शुरुआत करें और प्रभु से जुड़ें।',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    isRead: false,
    actionRoute: 'Jap',
  },
  {
    id: 'notif_2',
    type: 'festival',
    titleEn: 'Upcoming Festival: Maha Shivratri 🔱',
    titleHi: 'आगामी पर्व: महाशिवरात्रि 🔱',
    messageEn: 'Prepare for the auspicious night of Lord Shiva. Check tithi and timings in the calendar.',
    messageHi: 'भगवान शिव की पावन रात्रि की तैयारी करें। त्योहार कैलेंडर में शुभ मुहूर्त देखें।',
    timestamp: Date.now() - 22 * 60 * 60 * 1000,
    isRead: false,
    actionRoute: 'AllFestivals',
  },
  {
    id: 'notif_3',
    type: 'milestone',
    titleEn: 'Daily Sadhana Streak Active 🔥',
    titleHi: 'दैनिक साधना क्रम जारी 🔥',
    messageEn: "You've maintained your devotion consistently! Keep your Jap momentum going today.",
    messageHi: 'आपने निरंतर अपनी साधना बनाए रखी है! आज भी अपना नाम जप पूर्ण करें।',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    isRead: true,
    actionRoute: 'Jap',
  },
  {
    id: 'notif_4',
    type: 'wisdom',
    titleEn: 'New Sacred Story Available 📜',
    titleHi: 'नई पावन कथा उपलब्ध 📜',
    messageEn: 'Read the inspiring wisdom of the Mahabharat and sacred epics in the illustrated reader.',
    messageHi: 'सचित्र कॉमिक रीडर में महाभारत एवं पावन गाथाओं का दिव्य संदेश पढ़ें।',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    isRead: true,
    actionRoute: 'Book',
  },
];

export const NotificationStorage = {
  getNotifications: (): AppNotification[] => {
    try {
      const raw = Storage.getString(STORAGE_KEYS.APP_NOTIFICATION_LIST, '');
      if (!raw) {
        Storage.set(STORAGE_KEYS.APP_NOTIFICATION_LIST, JSON.stringify(DEFAULT_NOTIFICATIONS));
        return DEFAULT_NOTIFICATIONS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  saveNotifications: (list: AppNotification[]): void => {
    try {
      Storage.set(STORAGE_KEYS.APP_NOTIFICATION_LIST, JSON.stringify(list));
    } catch (e) {
      console.log('[NotificationStorage] Error saving notifications:', e);
    }
  },

  markAsRead: (id: string): AppNotification[] => {
    const list = NotificationStorage.getNotifications();
    const updated = list.map(item =>
      item.id === id ? { ...item, isRead: true } : item,
    );
    NotificationStorage.saveNotifications(updated);
    return updated;
  },

  markAllAsRead: (): AppNotification[] => {
    const list = NotificationStorage.getNotifications();
    const updated = list.map(item => ({ ...item, isRead: true }));
    NotificationStorage.saveNotifications(updated);
    return updated;
  },

  deleteNotification: (id: string): AppNotification[] => {
    const list = NotificationStorage.getNotifications();
    const updated = list.filter(item => item.id !== id);
    NotificationStorage.saveNotifications(updated);
    return updated;
  },

  clearAll: (): AppNotification[] => {
    NotificationStorage.saveNotifications([]);
    return [];
  },

  addNotification: (notif: AppNotification): AppNotification[] => {
    const list = NotificationStorage.getNotifications();
    const exists = list.some(item => item.id === notif.id);
    if (exists) {
      const updated = list.map(item =>
        item.id === notif.id ? { ...notif, isRead: false } : item,
      );
      NotificationStorage.saveNotifications(updated);
      return updated;
    }
    const updated = [notif, ...list];
    NotificationStorage.saveNotifications(updated);
    return updated;
  },

  getUnreadCount: (): number => {
    const list = NotificationStorage.getNotifications();
    return list.filter(item => !item.isRead).length;
  },
};

export async function initNotifications() {
  const settings = await notifee.requestPermission({
    sound: true,
    alert: true,
    badge: true,
  });
  if (
    settings.authorizationStatus < AuthorizationStatus.AUTHORIZED &&
    settings.authorizationStatus !== AuthorizationStatus.PROVISIONAL
  ) {
    return false;
  }
  await notifee.createChannel({
    id: 'reminders',
    name: 'Sadhana Reminders',
    importance: AndroidImportance.HIGH,
    vibration: true,
    sound: 'default',
  });
  return true;
}

export async function displayImmediateNotification({
  id = `notif_${Date.now()}`,
  title,
  body,
  actionRoute = 'Jap',
  actionParams,
  type = 'sadhana',
}: {
  id?: string;
  title: string;
  body: string;
  actionRoute?: 'Jap' | 'AllFestivals' | 'Book' | 'BottomTabs';
  actionParams?: any;
  type?: 'sadhana' | 'festival' | 'milestone' | 'wisdom';
}) {
  await notifee.displayNotification({
    id,
    title,
    body,
    data: {
      actionRoute,
      actionParams: actionParams ? JSON.stringify(actionParams) : '',
      type,
    },
    android: {
      channelId: 'reminders',
      smallIcon: 'ic_launcher',
      largeIcon: imagePath.Logo,
      pressAction: { id: 'default' },
    },
    ios: {
      sound: 'default',
    },
  });

  recordDeliveredNotification({
    id,
    title,
    body,
    data: { actionRoute, type },
  });
}

export async function scheduleReminder({
  id,
  title,
  body,
  date,
  repeatFrequency,
  actionRoute = 'Jap',
  actionParams,
  type = 'sadhana',
}: {
  id: string;
  title: string;
  body: string;
  date: Date;
  repeatFrequency?: RepeatFrequency;
  actionRoute?: 'Jap' | 'AllFestivals' | 'Book' | 'BottomTabs';
  actionParams?: any;
  type?: 'sadhana' | 'festival' | 'milestone' | 'wisdom';
}) {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    ...(repeatFrequency ? { repeatFrequency } : {}),
  };

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      data: {
        actionRoute,
        actionParams: actionParams ? JSON.stringify(actionParams) : '',
        type,
      },
      android: {
        channelId: 'reminders',
        smallIcon: 'ic_launcher',
        largeIcon: imagePath.Logo,
        pressAction: { id: 'default' },
      },
      ios: {
        sound: 'default',
      },
    },
    trigger,
  );
}

export function handleNotificationClick(notification: any) {
  if (!notification) return;
  const data = notification.data || {};
  const actionRoute = data.actionRoute;

  if (actionRoute === 'Jap') {
    navigate('BottomTabs', { screen: 'Jap' });
  } else if (actionRoute === 'Book') {
    navigate('BottomTabs', { screen: 'Book' });
  } else if (actionRoute === 'AllFestivals') {
    navigate('AllFestivals');
  } else if (actionRoute === 'BottomTabs') {
    navigate('BottomTabs', { screen: 'Home' });
  } else {
    navigate('Notification');
  }
}

export function recordDeliveredNotification(notification: any) {
  if (!notification) return;
  const data = notification.data || {};
  NotificationStorage.addNotification({
    id: notification.id || `notif_${Date.now()}`,
    type: data.type || 'sadhana',
    titleEn: notification.title || 'Sadhana Reminder',
    titleHi: notification.title || 'साधना रिमाइंडर',
    messageEn: notification.body || '',
    messageHi: notification.body || '',
    timestamp: Date.now(),
    isRead: false,
    actionRoute: data.actionRoute || 'Jap',
  });
}

export async function cancelReminder(id: string) {
  await notifee.cancelTriggerNotification(id);
}

export async function cancelAllReminders() {
  await notifee.cancelTriggerNotification('daily_sadhana_daily');
  await notifee.cancelTriggerNotification('daily_sadhana_date');
  for (let i = 0; i < 7; i++) {
    await notifee.cancelTriggerNotification(`daily_sadhana_weekly_${i}`);
  }
}

export async function scheduleCustomReminder(
  config: NotificationConfig,
  currentLanguage: 'en' | 'hi',
) {
  await cancelAllReminders();

  const title =
    currentLanguage === 'hi' ? 'साधना रिमाइंडर' : 'Sadhana Reminder';
  const body =
    currentLanguage === 'hi'
      ? 'आपके दैनिक साधना का समय हो गया है। आइए जप करें!'
      : "It's time for your daily sadhana. Let's do some chanting!";

  let triggerHour = config.hour;
  if (config.isPm && triggerHour < 12) {
    triggerHour += 12;
  } else if (!config.isPm && triggerHour === 12) {
    triggerHour = 0;
  }

  const triggerMinute = config.minute;

  if (config.type === 'daily') {
    const reminderDate = new Date();
    reminderDate.setHours(triggerHour, triggerMinute, 0, 0);
    if (reminderDate.getTime() <= Date.now()) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }

    await scheduleReminder({
      id: 'daily_sadhana_daily',
      title,
      body,
      date: reminderDate,
      repeatFrequency: RepeatFrequency.DAILY,
    });
  } else if (config.type === 'date' && config.dateString) {
    const parts = config.dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const reminderDate = new Date(
      year,
      month,
      day,
      triggerHour,
      triggerMinute,
      0,
      0,
    );

    if (reminderDate.getTime() > Date.now()) {
      await scheduleReminder({
        id: 'daily_sadhana_date',
        title,
        body,
        date: reminderDate,
      });
    }
  } else if (
    config.type === 'weekly' &&
    config.weekdays &&
    config.weekdays.length > 0
  ) {
    for (const dayOfWeek of config.weekdays) {
      const now = new Date();
      const reminderDate = new Date();
      reminderDate.setHours(triggerHour, triggerMinute, 0, 0);

      let daysDifference = dayOfWeek - now.getDay();
      if (
        daysDifference < 0 ||
        (daysDifference === 0 && reminderDate.getTime() <= now.getTime())
      ) {
        daysDifference += 7;
      }
      reminderDate.setDate(now.getDate() + daysDifference);

      await scheduleReminder({
        id: `daily_sadhana_weekly_${dayOfWeek}`,
        title,
        body,
        date: reminderDate,
        repeatFrequency: RepeatFrequency.WEEKLY,
      });
    }
  }
}
