/**
 * Date and time helper functions
 */

/**
 * Calculates the next trigger time for a given daily schedule (hour, minute).
 * If the time has already passed today, schedules for tomorrow.
 */
export function getNextTriggerTime(hour: number, minute: number): Date {
  const now = new Date();
  const trigger = new Date();
  trigger.setHours(hour, minute, 0, 0);

  if (trigger.getTime() <= now.getTime()) {
    trigger.setDate(trigger.getDate() + 1);
  }

  return trigger;
}
