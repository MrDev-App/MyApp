import Translation from '@i18n/language/constantLangKeys';

export type ReminderCategoryId =
  | 'chant'
  | 'shlokas'
  | 'mantras'
  | 'arti'
  | 'books'
  | 'festivals';

export interface ReminderCategory {
  id: ReminderCategoryId;
  icon: string;
  labelKey: string;
}

export const REMINDER_CATEGORIES: ReminderCategory[] = [
  {
    id: 'chant',
    icon: '📿',
    labelKey: Translation.REMINDER_CAT_CHANT,
  },
  {
    id: 'shlokas',
    icon: '📜',
    labelKey: Translation.REMINDER_CAT_SHLOKAS,
  },
  {
    id: 'mantras',
    icon: '🕉️',
    labelKey: Translation.REMINDER_CAT_MANTRAS,
  },
  {
    id: 'arti',
    icon: '🔔',
    labelKey: Translation.REMINDER_CAT_ARTI,
  },
  {
    id: 'books',
    icon: '📚',
    labelKey: Translation.REMINDER_CAT_BOOKS,
  },
  {
    id: 'festivals',
    icon: '🪔',
    labelKey: Translation.REMINDER_CAT_FESTIVALS,
  },
];

/** Maps notification/reminder type to its display emoji icon. */
export const getNotificationIcon = (type?: string): string => {
  const category = REMINDER_CATEGORIES.find(c => c.id === type);
  if (category) return category.icon;

  const legacyIcons: Record<string, string> = {
    sadhana: '📿',
    festival: '🪔',
    milestone: '🏆',
    wisdom: '📜',
  };
  return (type && legacyIcons[type]) || '🔔';
};
