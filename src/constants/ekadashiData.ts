export interface EkadashiItem {
  id?: string;
  date: string;
  day: number;
  dayOfWeek: string;
  dayOfWeekHi?: string;
  paksha: string;
  pakshaHi?: string;
  name: string;
  nameHi?: string;
  shortMonth?: string;
  shortMonthHi?: string;
  month?: number;
  monthName?: string;
  monthNameHi?: string;
  year?: number;
}

export interface EkadashiMonth {
  month: number;
  monthName: string;
  monthNameHi?: string;
  ekadashis: EkadashiItem[];
}

export interface EkadashiData {
  collection: string;
  year: number;
  months: EkadashiMonth[];
}

export const DAY_OF_WEEK_HI: Record<string, string> = {
  Sunday: 'रविवार',
  Monday: 'सोमवार',
  Tuesday: 'मंगलवार',
  Wednesday: 'बुधवार',
  Thursday: 'गुरुवार',
  Friday: 'शुक्रवार',
  Saturday: 'शनिवार',
};

export const ekadashi2026Data: EkadashiData = {
  collection: 'ekadashi_2026',
  year: 2026,
  months: [
    {
      month: 1,
      monthName: 'January',
      monthNameHi: 'जनवरी',
      ekadashis: [
        {
          date: '2026-01-14',
          day: 14,
          dayOfWeek: 'Wednesday',
          dayOfWeekHi: 'बुधवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Shat Tila Ekadashi',
          nameHi: 'षट्तिला एकादशी',
          shortMonth: 'Jan',
          shortMonthHi: 'जनवरी',
        },
        {
          date: '2026-01-29',
          day: 29,
          dayOfWeek: 'Thursday',
          dayOfWeekHi: 'गुरुवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Jaya Ekadashi',
          nameHi: 'जया एकादशी',
          shortMonth: 'Jan',
          shortMonthHi: 'जनवरी',
        },
      ],
    },
    {
      month: 2,
      monthName: 'February',
      monthNameHi: 'फरवरी',
      ekadashis: [
        {
          date: '2026-02-13',
          day: 13,
          dayOfWeek: 'Friday',
          dayOfWeekHi: 'शुक्रवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Vijaya Ekadashi',
          nameHi: 'विजया एकादशी',
          shortMonth: 'Feb',
          shortMonthHi: 'फरवरी',
        },
        {
          date: '2026-02-27',
          day: 27,
          dayOfWeek: 'Friday',
          dayOfWeekHi: 'शुक्रवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Amalaki Ekadashi',
          nameHi: 'आमलकी एकादशी',
          shortMonth: 'Feb',
          shortMonthHi: 'फरवरी',
        },
      ],
    },
    {
      month: 3,
      monthName: 'March',
      monthNameHi: 'मार्च',
      ekadashis: [
        {
          date: '2026-03-15',
          day: 15,
          dayOfWeek: 'Sunday',
          dayOfWeekHi: 'रविवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Papmochani Ekadashi',
          nameHi: 'पापमोचिनी एकादशी',
          shortMonth: 'Mar',
          shortMonthHi: 'मार्च',
        },
        {
          date: '2026-03-29',
          day: 29,
          dayOfWeek: 'Sunday',
          dayOfWeekHi: 'रविवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Kamada Ekadashi',
          nameHi: 'कामदा एकादशी',
          shortMonth: 'Mar',
          shortMonthHi: 'मार्च',
        },
      ],
    },
    {
      month: 4,
      monthName: 'April',
      monthNameHi: 'अप्रैल',
      ekadashis: [
        {
          date: '2026-04-13',
          day: 13,
          dayOfWeek: 'Monday',
          dayOfWeekHi: 'सोमवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Varuthini Ekadashi',
          nameHi: 'वरुथिनी एकादशी',
          shortMonth: 'Apr',
          shortMonthHi: 'अप्रैल',
        },
        {
          date: '2026-04-27',
          day: 27,
          dayOfWeek: 'Monday',
          dayOfWeekHi: 'सोमवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Mohini Ekadashi',
          nameHi: 'मोहिनी एकादशी',
          shortMonth: 'Apr',
          shortMonthHi: 'अप्रैल',
        },
      ],
    },
    {
      month: 5,
      monthName: 'May',
      monthNameHi: 'मई',
      ekadashis: [
        {
          date: '2026-05-13',
          day: 13,
          dayOfWeek: 'Wednesday',
          dayOfWeekHi: 'बुधवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Apara Ekadashi',
          nameHi: 'अपरा एकादशी',
          shortMonth: 'May',
          shortMonthHi: 'मई',
        },
        {
          date: '2026-05-27',
          day: 27,
          dayOfWeek: 'Wednesday',
          dayOfWeekHi: 'बुधवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Padmini Ekadashi',
          nameHi: 'पद्मिनी एकादशी',
          shortMonth: 'May',
          shortMonthHi: 'मई',
        },
      ],
    },
    {
      month: 6,
      monthName: 'June',
      monthNameHi: 'जून',
      ekadashis: [
        {
          date: '2026-06-11',
          day: 11,
          dayOfWeek: 'Thursday',
          dayOfWeekHi: 'गुरुवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Parama Ekadashi',
          nameHi: 'परमा एकादशी',
          shortMonth: 'Jun',
          shortMonthHi: 'जून',
        },
        {
          date: '2026-06-25',
          day: 25,
          dayOfWeek: 'Thursday',
          dayOfWeekHi: 'गुरुवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Nirjala Ekadashi',
          nameHi: 'निर्जला एकादशी',
          shortMonth: 'Jun',
          shortMonthHi: 'जून',
        },
      ],
    },
    {
      month: 7,
      monthName: 'July',
      monthNameHi: 'जुलाई',
      ekadashis: [
        {
          date: '2026-07-11',
          day: 11,
          dayOfWeek: 'Saturday',
          dayOfWeekHi: 'शनिवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Yogini Ekadashi',
          nameHi: 'योगिनी एकादशी',
          shortMonth: 'Jul',
          shortMonthHi: 'जुलाई',
        },
        {
          date: '2026-07-25',
          day: 25,
          dayOfWeek: 'Saturday',
          dayOfWeekHi: 'शनिवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Devshayani Ekadashi',
          nameHi: 'देवशयनी एकादशी',
          shortMonth: 'Jul',
          shortMonthHi: 'जुलाई',
        },
      ],
    },
    {
      month: 8,
      monthName: 'August',
      monthNameHi: 'अगस्त',
      ekadashis: [
        {
          date: '2026-08-09',
          day: 9,
          dayOfWeek: 'Sunday',
          dayOfWeekHi: 'रविवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Kamika Ekadashi',
          nameHi: 'कामिका एकादशी',
          shortMonth: 'Aug',
          shortMonthHi: 'अगस्त',
        },
        {
          date: '2026-08-24',
          day: 24,
          dayOfWeek: 'Monday',
          dayOfWeekHi: 'सोमवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Pavitropana Ekadashi',
          nameHi: 'पवित्रा एकादशी',
          shortMonth: 'Aug',
          shortMonthHi: 'अगस्त',
        },
      ],
    },
    {
      month: 9,
      monthName: 'September',
      monthNameHi: 'सितंबर',
      ekadashis: [
        {
          date: '2026-09-07',
          day: 7,
          dayOfWeek: 'Monday',
          dayOfWeekHi: 'सोमवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Aja Ekadashi',
          nameHi: 'अजा एकादशी',
          shortMonth: 'Sep',
          shortMonthHi: 'सितंबर',
        },
        {
          date: '2026-09-22',
          day: 22,
          dayOfWeek: 'Tuesday',
          dayOfWeekHi: 'मंगलवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Parsva Ekadashi',
          nameHi: 'परिवर्तिनी (पार्श्व) एकादशी',
          shortMonth: 'Sep',
          shortMonthHi: 'सितंबर',
        },
      ],
    },
    {
      month: 10,
      monthName: 'October',
      monthNameHi: 'अक्टूबर',
      ekadashis: [
        {
          date: '2026-10-06',
          day: 6,
          dayOfWeek: 'Tuesday',
          dayOfWeekHi: 'मंगलवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Indira Ekadashi',
          nameHi: 'इन्दिरा एकादशी',
          shortMonth: 'Oct',
          shortMonthHi: 'अक्टूबर',
        },
        {
          date: '2026-10-22',
          day: 22,
          dayOfWeek: 'Thursday',
          dayOfWeekHi: 'गुरुवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Papankusha Ekadashi',
          nameHi: 'पापांकुशा एकादशी',
          shortMonth: 'Oct',
          shortMonthHi: 'अक्टूबर',
        },
      ],
    },
    {
      month: 11,
      monthName: 'November',
      monthNameHi: 'नवंबर',
      ekadashis: [
        {
          date: '2026-11-05',
          day: 5,
          dayOfWeek: 'Thursday',
          dayOfWeekHi: 'गुरुवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Rama Ekadashi',
          nameHi: 'रमा एकादशी',
          shortMonth: 'Nov',
          shortMonthHi: 'नवंबर',
        },
        {
          date: '2026-11-21',
          day: 21,
          dayOfWeek: 'Saturday',
          dayOfWeekHi: 'शनिवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Devutthana Ekadashi',
          nameHi: 'देवउठनी (देवोत्थान) एकादशी',
          shortMonth: 'Nov',
          shortMonthHi: 'नवंबर',
        },
      ],
    },
    {
      month: 12,
      monthName: 'December',
      monthNameHi: 'दिसंबर',
      ekadashis: [
        {
          date: '2026-12-04',
          day: 4,
          dayOfWeek: 'Friday',
          dayOfWeekHi: 'शुक्रवार',
          paksha: 'Krishna Paksha',
          pakshaHi: 'कृष्ण पक्ष',
          name: 'Utpanna Ekadashi',
          nameHi: 'उत्पन्ना एकादशी',
          shortMonth: 'Dec',
          shortMonthHi: 'दिसंबर',
        },
        {
          date: '2026-12-20',
          day: 20,
          dayOfWeek: 'Sunday',
          dayOfWeekHi: 'रविवार',
          paksha: 'Shukla Paksha',
          pakshaHi: 'शुक्ल पक्ष',
          name: 'Mokshada Ekadashi',
          nameHi: 'मोक्षदा एकादशी',
          shortMonth: 'Dec',
          shortMonthHi: 'दिसंबर',
        },
      ],
    },
  ],
};
