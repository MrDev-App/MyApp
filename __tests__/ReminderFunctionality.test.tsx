import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';
import ReminderScreen from '../src/screens/profile/ReminderScreen';
import { Storage, STORAGE_KEYS } from '../src/services/storageService';
import {
  scheduleMultipleReminders,
  cancelAllReminders,
  ReminderItem,
  NotificationStorage,
} from '../src/services/notificationService';
import { Translation } from '../src/i18n/language';

describe('Daily Reminder Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.clearAll();
    jest.spyOn(Alert, 'alert');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('1. Initial State & Storage Verification', () => {
    it('starts with an empty reminder list by default when storage is empty', async () => {
      const { getByText, queryByText } = await render(<ReminderScreen />);

      // Count badge should show 0/10
      expect(getByText('0/10')).toBeTruthy();

      // Empty state text should be visible
      expect(getByText(Translation.PROFILE_NO_REMINDERS_YET)).toBeTruthy();

      // No reminder should be stored
      expect(Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '')).toBe('');
    });

    it('loads existing reminders correctly from storage on mount', async () => {
      const mockSaved: ReminderItem[] = [
        {
          id: 'rem_1',
          hour: 7,
          minute: 30,
          isPm: false,
          enabled: true,
          title: 'Morning Sadhana',
          subtitle: 'Start your day with chanting',
        },
      ];
      Storage.set(STORAGE_KEYS.DAILY_REMINDERS_LIST, JSON.stringify(mockSaved));

      const { getByText, queryByText } = await render(<ReminderScreen />);

      expect(getByText('1/10')).toBeTruthy();
      expect(getByText('07:30 AM')).toBeTruthy();
      expect(getByText('Morning Sadhana')).toBeTruthy();
      expect(getByText('Start your day with chanting')).toBeTruthy();
      expect(queryByText(Translation.PROFILE_NO_REMINDERS_YET)).toBeNull();
    });
  });

  describe('2. Validation & Form Submission', () => {
    it('shows validation errors when title and subtitle are empty and does not add reminder', async () => {
      const { getByTestId, getByText } = await render(<ReminderScreen />);

      const setReminderBtn = getByTestId('set-reminder-btn');
      await act(async () => {
        fireEvent.press(setReminderBtn);
      });

      expect(getByText(Translation.PROFILE_REMINDER_TITLE_REQUIRED)).toBeTruthy();
      expect(getByText(Translation.PROFILE_REMINDER_MSG_REQUIRED)).toBeTruthy();

      // Storage should remain empty
      expect(Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '')).toBe('');
    });

    it('successfully adds a reminder when required fields are filled', async () => {
      const { getByTestId, getByText } = await render(<ReminderScreen />);

      const titleInput = getByTestId('reminder-title-input');
      const subtitleInput = getByTestId('reminder-subtitle-input');

      await act(async () => {
        fireEvent.changeText(titleInput, 'Evening Japa');
        fireEvent.changeText(subtitleInput, 'Peaceful meditation time');
      });

      const setReminderBtn = getByTestId('set-reminder-btn');
      await act(async () => {
        fireEvent.press(setReminderBtn);
      });

      await waitFor(() => {
        expect(getByText('Evening Japa')).toBeTruthy();
        expect(getByText('Peaceful meditation time')).toBeTruthy();
      });

      // Verify saved into Storage
      const rawStored = Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '');
      expect(rawStored).toBeTruthy();
      const parsed: ReminderItem[] = JSON.parse(rawStored);
      expect(parsed.length).toBe(1);
      expect(parsed[0].title).toBe('Evening Japa');
      expect(parsed[0].subtitle).toBe('Peaceful meditation time');
      expect(parsed[0].enabled).toBe(true);

      // Verify added to NotificationStorage
      const notifs = NotificationStorage.getNotifications();
      const matched = notifs.find(n => n.titleEn === 'Evening Japa');
      expect(matched).toBeTruthy();
      expect(matched?.type).toBe('sadhana');
    });

    it('prevents adding duplicate reminder for the exact same time', async () => {
      const existing: ReminderItem[] = [
        {
          id: 'rem_1',
          hour: 6,
          minute: 0,
          isPm: false,
          enabled: true,
          title: 'Existing Sadhana',
          subtitle: 'Daily morning chants',
        },
      ];
      Storage.set(STORAGE_KEYS.DAILY_REMINDERS_LIST, JSON.stringify(existing));

      const { getByTestId } = await render(<ReminderScreen />);

      const titleInput = getByTestId('reminder-title-input');
      const subtitleInput = getByTestId('reminder-subtitle-input');

      await act(async () => {
        fireEvent.changeText(titleInput, 'Duplicate Attempt');
        fireEvent.changeText(subtitleInput, 'Should not add');
      });

      const setReminderBtn = getByTestId('set-reminder-btn');
      await act(async () => {
        fireEvent.press(setReminderBtn);
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Translation.PROFILE_DAILY_NOTIFICATIONS,
        expect.any(String),
      );
    });
  });

  describe('3. Toggle and Deletion (Storage Key Cleanup)', () => {
    it('toggles reminder enable/disable status and updates storage', async () => {
      const saved: ReminderItem[] = [
        {
          id: 'rem_toggle_1',
          hour: 8,
          minute: 0,
          isPm: false,
          enabled: true,
          title: 'Morning Prayer',
          subtitle: 'Daily prayer',
        },
      ];
      Storage.set(STORAGE_KEYS.DAILY_REMINDERS_LIST, JSON.stringify(saved));

      const { getByTestId } = await render(<ReminderScreen />);
      const switchComponent = getByTestId('reminder-switch-rem_toggle_1');

      // Toggle to disabled
      await act(async () => {
        fireEvent(switchComponent, 'valueChange', false);
      });

      await waitFor(() => {
        const raw = Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '');
        const parsed = JSON.parse(raw);
        expect(parsed[0].enabled).toBe(false);
      });
    });

    it('deletes reminder and completely removes key from storage when list becomes empty', async () => {
      const saved: ReminderItem[] = [
        {
          id: 'rem_delete_1',
          hour: 5,
          minute: 30,
          isPm: false,
          enabled: true,
          title: 'Early Dawn',
          subtitle: 'Chant in Brahma Muhurta',
        },
      ];
      Storage.set(STORAGE_KEYS.DAILY_REMINDERS_LIST, JSON.stringify(saved));

      const { getByTestId, getByText } = await render(<ReminderScreen />);
      expect(getByText('Early Dawn')).toBeTruthy();

      const deleteBtn = getByTestId('reminder-delete-rem_delete_1');
      await act(async () => {
        fireEvent.press(deleteBtn);
      });

      await waitFor(() => {
        // Storage key must be deleted when list reaches 0
        const stored = Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '');
        expect(stored).toBe('');
        expect(
          NotificationStorage.getNotifications().some(
            n => n.id === 'rem_delete_1',
          ),
        ).toBe(false);
      });
    });
  });

  describe('4. Notification Service Unit Tests', () => {
    it('schedules notifications for active reminders and cancels all triggers on empty list', async () => {
      const remindersToSchedule: ReminderItem[] = [
        {
          id: 'rem_1',
          hour: 6,
          minute: 0,
          isPm: false,
          enabled: true,
          title: 'Divine Morning',
          subtitle: 'Start your chanting',
        },
        {
          id: 'rem_2',
          hour: 8,
          minute: 30,
          isPm: true,
          enabled: false, // Disabled should not be scheduled
          title: 'Night Meditation',
          subtitle: 'End of day reflection',
        },
      ];

      await scheduleMultipleReminders(remindersToSchedule, 'en');

      // Should cancel old reminders first
      expect(notifee.cancelTriggerNotification).toHaveBeenCalled();

      // Should create trigger notification for enabled reminder (rem_1 only)
      expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(1);
      expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'daily_reminder_0',
          title: 'Divine Morning',
          body: 'Start your chanting',
        }),
        expect.any(Object),
      );
    });

    it('cancels all triggers when empty reminder list is passed to scheduleMultipleReminders', async () => {
      await scheduleMultipleReminders([], 'en');

      expect(notifee.cancelTriggerNotification).toHaveBeenCalledWith('daily_sadhana_daily');
      expect(notifee.createTriggerNotification).not.toHaveBeenCalled();
    });

    it('cancelAllReminders cancels all daily, date, weekly, and indexed reminders', async () => {
      await cancelAllReminders();

      expect(notifee.cancelTriggerNotification).toHaveBeenCalledWith('daily_sadhana_daily');
      expect(notifee.cancelTriggerNotification).toHaveBeenCalledWith('daily_sadhana_date');
      for (let i = 0; i < 7; i++) {
        expect(notifee.cancelTriggerNotification).toHaveBeenCalledWith(`daily_sadhana_weekly_${i}`);
      }
      for (let i = 0; i < 10; i++) {
        expect(notifee.cancelTriggerNotification).toHaveBeenCalledWith(`daily_reminder_${i}`);
      }
    });
  });
});
