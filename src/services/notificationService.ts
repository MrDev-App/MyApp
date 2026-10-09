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

export type NotificationType =
  | 'chant'
  | 'shlokas'
  | 'mantras'
  | 'arti'
  | 'books'
  | 'festivals'
  | 'sadhana'
  | 'festival'
  | 'milestone'
  | 'wisdom'
  | string;

export interface AppNotification {
  id: string;
  type: NotificationType;
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  timestamp: number;
  isRead: boolean;
  actionRoute?: string;
  actionParams?: any;
}

export interface NotificationConfig {
  type: 'daily' | 'date' | 'weekly';
  hour: number;
  minute: number;
  isPm: boolean;
  dateString?: string;
  weekdays?: number[];
  title?: string;
  body?: string;
}

export interface ReminderItem {
  id: string;
  hour: number;
  minute: number;
  isPm: boolean;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  category?: string;
  actionRoute?: string;
  actionParams?: any;
}

export const NotificationStorage = {
  getNotifications: (): AppNotification[] => {
    try {
      const raw = Storage.getString(STORAGE_KEYS.APP_NOTIFICATION_LIST, '');
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
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
  type = 'chant',
}: {
  id?: string;
  title: string;
  body: string;
  actionRoute?: string;
  actionParams?: any;
  type?: NotificationType;
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
  type = 'chant',
}: {
  id: string;
  title: string;
  body: string;
  date: Date;
  repeatFrequency?: RepeatFrequency;
  actionRoute?: string;
  actionParams?: any;
  type?: NotificationType;
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

export async function handleNotificationNavigation(
  actionRoute?: string,
  actionParams?: any,
  title?: string,
  subtitle?: string,
) {
  let params: any = {};
  try {
    params =
      typeof actionParams === 'string' && actionParams
        ? JSON.parse(actionParams)
        : actionParams || {};
  } catch {}

  const category = params.category;
  const titleText = (params.title || title || '').trim();
  const subtitleText = (params.subtitle || subtitle || '').trim();
  const query = subtitleText
    ? `${titleText} ${subtitleText}`.trim()
    : titleText;

  // 1. Shlokas Category Navigation
  if (category === 'shlokas' || actionRoute === 'AllShlokasScreen') {
    if (query) {
      try {
        const { findShlokaCategoryOrSubcategory } = await import(
          '@api/shlokaApi'
        );
        const match = await findShlokaCategoryOrSubcategory(query);
        if (match?.category) {
          navigate('ShlokaCategoryDetailScreen', { category: match.category });
          return;
        }
      } catch (err) {
        console.warn('[Notification] Shloka resolution error:', err);
      }
    }
    navigate('AllShlokasScreen');
    return;
  }

  // 2. Chant / Jap Category Navigation
  if (category === 'chant' || actionRoute === 'Jap') {
    navigate('BottomTabs', { screen: 'Jap' });
    return;
  }

  // 3. Mantras Category Navigation
  if (category === 'mantras' || actionRoute === 'MantraScreen') {
    try {
      const { getGodData } = await import('@api/godMantrasApi');
      const gods = await getGodData();
      if (gods && gods.length > 0) {
        if (query) {
          const q = query.toLowerCase();
          const matchedGod = gods.find(
            g =>
              (g.englishName && g.englishName.toLowerCase().includes(q)) ||
              (g.hindiName && g.hindiName.toLowerCase().includes(q)) ||
              q.includes(g.englishName?.toLowerCase() || '') ||
              q.includes(g.hindiName?.toLowerCase() || ''),
          );
          if (matchedGod) {
            navigate('MantraScreen', { god: matchedGod, allGods: gods });
            return;
          }
        }
        navigate('MantraScreen', { god: gods[0], allGods: gods });
        return;
      }
    } catch {}
    navigate('MantraScreen', {});
    return;
  }

  // 4. Books Category Navigation
  if (category === 'books' || actionRoute === 'Book') {
    navigate('BottomTabs', { screen: 'Book' });
    return;
  }

  // 5. Festivals Category Navigation
  if (
    category === 'festivals' ||
    actionRoute === 'CalendarScreen' ||
    actionRoute === 'AllFestivals'
  ) {
    navigate('CalendarScreen');
    return;
  }

  // 6. Aarti Category Navigation
  if (
    category === 'arti' ||
    actionRoute === 'AllArtiScreen' ||
    actionRoute === 'ArtiScreen'
  ) {
    if (query) {
      try {
        const { findAartiByQuery } = await import('@api/aartiApi');
        const matchedArti = await findAartiByQuery(query);
        if (matchedArti) {
          navigate('ArtiScreen', { arti: matchedArti, autoPlay: true });
          return;
        }
      } catch (err) {
        console.warn('[Notification] Aarti resolution error:', err);
      }
    }
    navigate('AllArtiScreen');
    return;
  }

  // Fallbacks
  if (actionRoute === 'BottomTabs') {
    navigate('BottomTabs', { screen: 'Home' });
  } else {
    navigate('Notification');
  }
}

export function handleNotificationClick(notification: any) {
  if (!notification) return;
  const data = notification.data || {};
  const actionRoute = data.actionRoute;
  const actionParams = data.actionParams;
  const title = notification.title || '';
  const subtitle = notification.body || '';

  handleNotificationNavigation(actionRoute, actionParams, title, subtitle);
}

export function recordDeliveredNotification(notification: any) {
  if (!notification) return;
  const data = notification.data || {};
  let actionParams: any = undefined;
  try {
    actionParams =
      typeof data.actionParams === 'string' && data.actionParams
        ? JSON.parse(data.actionParams)
        : data.actionParams;
  } catch {}

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
    actionParams,
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
  for (let i = 0; i < 10; i++) {
    await notifee.cancelTriggerNotification(`daily_reminder_${i}`);
  }
}

export async function scheduleMultipleReminders(
  reminders: ReminderItem[],
  _currentLanguage: 'en' | 'hi' = 'en',
) {
  await cancelAllReminders();

  for (let i = 0; i < Math.min(reminders.length, 10); i++) {
    const item = reminders[i];
    if (!item.enabled) continue;

    let triggerHour = item.hour;
    if (item.isPm && triggerHour < 12) {
      triggerHour += 12;
    } else if (!item.isPm && triggerHour === 12) {
      triggerHour = 0;
    }

    const reminderDate = new Date();
    reminderDate.setHours(triggerHour, item.minute, 0, 0);
    if (reminderDate.getTime() <= Date.now()) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }

    const itemTitle = item.title?.trim() || '';
    const itemBody = item.subtitle?.trim() || '';
    const category = item.category || 'chant';

    let actionRoute = item.actionRoute || 'Jap';
    if (category === 'shlokas') actionRoute = 'AllShlokasScreen';
    else if (category === 'books') actionRoute = 'Book';
    else if (category === 'mantras') actionRoute = 'MantraScreen';
    else if (category === 'festivals') actionRoute = 'CalendarScreen';
    else if (category === 'arti') actionRoute = 'AllArtiScreen';

    const actionParams = {
      category,
      title: item.title || '',
      subtitle: item.subtitle || '',
      ...(item.actionParams || {}),
    };

    await scheduleReminder({
      id: `daily_reminder_${i}`,
      title: itemTitle,
      body: itemBody,
      date: reminderDate,
      repeatFrequency: RepeatFrequency.DAILY,
      actionRoute: actionRoute as any,
      actionParams,
      type: 'sadhana',
    });
  }
}

export async function scheduleCustomReminder(
  config: NotificationConfig,
  _currentLanguage?: 'en' | 'hi',
) {
  await cancelAllReminders();

  const title = config.title || '';
  const body = config.body || '';

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
