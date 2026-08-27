export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const HOUR_ITEMS = [
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '',
];

export const MINUTE_ITEMS = [
  '',
  ...Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
  '',
];

export const ITEM_HEIGHT = 44;
