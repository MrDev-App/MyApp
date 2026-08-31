import { Storage } from './storage';

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

const NOTIFICATIONS_STORAGE_KEY = 'APP_NOTIFICATION_LIST';

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'sadhana',
    titleEn: 'Morning Sadhana Time 🌅',
    titleHi: 'प्रातः साधना का समय 🌅',
    messageEn: 'Begin your day with peaceful chanting and connect with the divine.',
    messageHi: 'शांतिपूर्ण नाम जप के साथ अपने दिन की शुरुआत करें और प्रभु से जुड़ें।',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
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
    timestamp: Date.now() - 22 * 60 * 60 * 1000, // 22 hours ago
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
    timestamp: Date.now() - 48 * 60 * 60 * 1000, // 2 days ago
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
    timestamp: Date.now() - 72 * 60 * 60 * 1000, // 3 days ago
    isRead: true,
    actionRoute: 'Book',
  },
];

export const NotificationStorage = {
  getNotifications: (): AppNotification[] => {
    try {
      const raw = Storage.getString(NOTIFICATIONS_STORAGE_KEY, '');
      if (!raw) {
        // Initialize with default notifications if empty
        Storage.set(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
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
      Storage.set(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
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

  getUnreadCount: (): number => {
    const list = NotificationStorage.getNotifications();
    return list.filter(item => !item.isRead).length;
  },
};
