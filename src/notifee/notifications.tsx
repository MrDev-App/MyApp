import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import imagePath from '../assets';

import { navigate } from '../navigation/navigationRef';
import { NotificationStorage } from '../utile/notificationStorage';

export interface NotificationConfig {
  type: 'daily' | 'date' | 'weekly';
  hour: number;
  minute: number;
  isPm: boolean;
  dateString?: string;
  weekdays?: number[];
}

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

  // Also record in app storage
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

// Cancel single trigger
export async function cancelReminder(id: string) {
  await notifee.cancelTriggerNotification(id);
}

// Cancel all sadhana reminders
export async function cancelAllReminders() {
  await notifee.cancelTriggerNotification('daily_sadhana_daily');
  await notifee.cancelTriggerNotification('daily_sadhana_date');
  for (let i = 0; i < 7; i++) {
    await notifee.cancelTriggerNotification(`daily_sadhana_weekly_${i}`);
  }
}

// Schedule custom reminder config
export async function scheduleCustomReminder(
  config: NotificationConfig,
  currentLanguage: 'en' | 'hi',
) {
  // Clear any existing triggers first
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
    if (reminderDate.getTime() < Date.now()) {
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
