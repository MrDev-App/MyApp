export interface EkadashiItem {
  id?: string;
  date: string;
  day: number;
  dayOfWeek: string;
  paksha: string;
  name: string;
  month?: number;
  monthName?: string;
  year?: number;
}

export interface EkadashiMonth {
  month: number;
  monthName: string;
  ekadashis: EkadashiItem[];
}

export interface EkadashiData {
  collection: string;
  year: number;
  months: EkadashiMonth[];
}

export const ekadashi2026Data: EkadashiData = {
  collection: 'ekadashi_2026',
  year: 2026,
  months: [
    {
      month: 1,
      monthName: 'January',
      ekadashis: [
        {
          date: '2026-01-14',
          day: 14,
          dayOfWeek: 'Wednesday',
          paksha: 'Krishna Paksha',
          name: 'Shat Tila Ekadashi',
        },
        {
          date: '2026-01-29',
          day: 29,
          dayOfWeek: 'Thursday',
          paksha: 'Shukla Paksha',
          name: 'Jaya Ekadashi',
        },
      ],
    },
    {
      month: 2,
      monthName: 'February',
      ekadashis: [
        {
          date: '2026-02-13',
          day: 13,
          dayOfWeek: 'Friday',
          paksha: 'Krishna Paksha',
          name: 'Vijaya Ekadashi',
        },
        {
          date: '2026-02-27',
          day: 27,
          dayOfWeek: 'Friday',
          paksha: 'Shukla Paksha',
          name: 'Amalaki Ekadashi',
        },
      ],
    },
    {
      month: 3,
      monthName: 'March',
      ekadashis: [
        {
          date: '2026-03-15',
          day: 15,
          dayOfWeek: 'Sunday',
          paksha: 'Krishna Paksha',
          name: 'Papmochani Ekadashi',
        },
        {
          date: '2026-03-29',
          day: 29,
          dayOfWeek: 'Sunday',
          paksha: 'Shukla Paksha',
          name: 'Kamada Ekadashi',
        },
      ],
    },
    {
      month: 4,
      monthName: 'April',
      ekadashis: [
        {
          date: '2026-04-13',
          day: 13,
          dayOfWeek: 'Monday',
          paksha: 'Krishna Paksha',
          name: 'Varuthini Ekadashi',
        },
        {
          date: '2026-04-27',
          day: 27,
          dayOfWeek: 'Monday',
          paksha: 'Shukla Paksha',
          name: 'Mohini Ekadashi',
        },
      ],
    },
    {
      month: 5,
      monthName: 'May',
      ekadashis: [
        {
          date: '2026-05-13',
          day: 13,
          dayOfWeek: 'Wednesday',
          paksha: 'Krishna Paksha',
          name: 'Apara Ekadashi',
        },
        {
          date: '2026-05-27',
          day: 27,
          dayOfWeek: 'Wednesday',
          paksha: 'Shukla Paksha',
          name: 'Padmini Ekadashi',
        },
      ],
    },
    {
      month: 6,
      monthName: 'June',
      ekadashis: [
        {
          date: '2026-06-11',
          day: 11,
          dayOfWeek: 'Thursday',
          paksha: 'Krishna Paksha',
          name: 'Parama Ekadashi',
        },
        {
          date: '2026-06-25',
          day: 25,
          dayOfWeek: 'Thursday',
          paksha: 'Shukla Paksha',
          name: 'Nirjala Ekadashi',
        },
      ],
    },
    {
      month: 7,
      monthName: 'July',
      ekadashis: [
        {
          date: '2026-07-11',
          day: 11,
          dayOfWeek: 'Saturday',
          paksha: 'Krishna Paksha',
          name: 'Yogini Ekadashi',
        },
        {
          date: '2026-07-25',
          day: 25,
          dayOfWeek: 'Saturday',
          paksha: 'Shukla Paksha',
          name: 'Devshayani Ekadashi',
        },
      ],
    },
    {
      month: 8,
      monthName: 'August',
      ekadashis: [
        {
          date: '2026-08-09',
          day: 9,
          dayOfWeek: 'Sunday',
          paksha: 'Krishna Paksha',
          name: 'Kamika Ekadashi',
        },
        {
          date: '2026-08-24',
          day: 24,
          dayOfWeek: 'Monday',
          paksha: 'Shukla Paksha',
          name: 'Pavitropana Ekadashi',
        },
      ],
    },
    {
      month: 9,
      monthName: 'September',
      ekadashis: [
        {
          date: '2026-09-07',
          day: 7,
          dayOfWeek: 'Monday',
          paksha: 'Krishna Paksha',
          name: 'Aja Ekadashi',
        },
        {
          date: '2026-09-22',
          day: 22,
          dayOfWeek: 'Tuesday',
          paksha: 'Shukla Paksha',
          name: 'Parsva Ekadashi',
        },
      ],
    },
    {
      month: 10,
      monthName: 'October',
      ekadashis: [
        {
          date: '2026-10-06',
          day: 6,
          dayOfWeek: 'Tuesday',
          paksha: 'Krishna Paksha',
          name: 'Indira Ekadashi',
        },
        {
          date: '2026-10-22',
          day: 22,
          dayOfWeek: 'Thursday',
          paksha: 'Shukla Paksha',
          name: 'Papankusha Ekadashi',
        },
      ],
    },
    {
      month: 11,
      monthName: 'November',
      ekadashis: [
        {
          date: '2026-11-05',
          day: 5,
          dayOfWeek: 'Thursday',
          paksha: 'Krishna Paksha',
          name: 'Rama Ekadashi',
        },
        {
          date: '2026-11-21',
          day: 21,
          dayOfWeek: 'Saturday',
          paksha: 'Shukla Paksha',
          name: 'Devutthana Ekadashi',
        },
      ],
    },
    {
      month: 12,
      monthName: 'December',
      ekadashis: [
        {
          date: '2026-12-04',
          day: 4,
          dayOfWeek: 'Friday',
          paksha: 'Krishna Paksha',
          name: 'Utpanna Ekadashi',
        },
        {
          date: '2026-12-20',
          day: 20,
          dayOfWeek: 'Sunday',
          paksha: 'Shukla Paksha',
          name: 'Mokshada Ekadashi',
        },
      ],
    },
  ],
};
