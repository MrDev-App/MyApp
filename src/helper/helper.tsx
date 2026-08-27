// Har roz ek fixed time (hour, minute) pe schedule karne ke liye
export function getNextTriggerTime(hour: number, minute: number): Date {
  const now = new Date();
  const trigger = new Date();
  trigger.setHours(hour, minute, 0, 0);

  // Agar aaj ka time nikal chuka hai, to kal ke liye set karo
  if (trigger.getTime() <= now.getTime()) {
    trigger.setDate(trigger.getDate() + 1);
  }

  return trigger;
}
