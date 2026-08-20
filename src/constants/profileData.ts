import imagePath from '../assets';

export interface FavoriteStory {
  id: string;
  titleEn: string;
  titleHi: string;
  categoryEn: string;
  categoryHi: string;
  image: any;
}

export const favStoriesData: FavoriteStory[] = [
  {
    id: 'ganesha_wisdom',
    titleEn: "Ganesha's Wisdom",
    titleHi: 'गणेश की बुद्धि',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Ganesha,
  },
  {
    id: 'story_of_rama',
    titleEn: 'The Story of Rama',
    titleHi: 'श्री राम की कहानी',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Rama,
  },
  {
    id: 'shiva_boon',
    titleEn: "Lord Shiva's Boon",
    titleHi: 'शिव जी का वरदान',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Bholenath,
  },
  {
    id: 'krishna_leela',
    titleEn: "Sri Krishna's Leela",
    titleHi: 'कृष्ण लीला',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Krishna,
  },
  {
    id: 'durga_victory',
    titleEn: "Durga Mata's Victory",
    titleHi: 'दुर्गा मां की विजय',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Durga,
  },
  {
    id: 'hanuman_devotion',
    titleEn: "Hanuman's Devotion",
    titleHi: 'हनुमान भक्ति',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Hanuman,
  },
  {
    id: 'lakshmi_blessing',
    titleEn: "Lakshmi's Blessing",
    titleHi: 'लक्ष्मी माता की कृपा',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Laxmi,
  },
  {
    id: 'vishnu_avatar',
    titleEn: "Vishnu's Avatar",
    titleHi: 'विष्णु अवतार',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Vishnu,
  },
  {
    id: 'saraswati_veena',
    titleEn: "Saraswati's Veena",
    titleHi: 'सरस्वती वीणा',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Saraswati,
  },
  {
    id: 'kubera_wealth',
    titleEn: "Kubera's Pride",
    titleHi: 'कुबेर का अहंकार',
    categoryEn: 'Story',
    categoryHi: 'कहानी',
    image: imagePath.Kubera,
  },
];

export const profileLabels = {
  en: {
    myProfile: 'My Profile',
    devotee: 'Devotee',
    joinedSince: 'Devotee since Aug 2026',
    totalStats: 'Total Statistics',
    totalChants: 'Total Chants',
    malasDone: 'Malas Done',
    todayJap: 'Today Jap',
    favStories: 'Favorite Stories',
    settings: 'Settings',
    changeLanguage: 'Change Language',
    appMainLanguage: 'App main language',
    dailyNotifications: 'Daily Notifications',
    dailySadhanaReminders: 'Daily sadhana reminders',
  },
  hi: {
    myProfile: 'मेरी प्रोफाइल',
    devotee: 'साधक',
    joinedSince: 'अगस्त २०२६ से साधक',
    totalStats: 'कुल सांख्यिकी',
    totalChants: 'कुल जाप',
    malasDone: 'माला पूर्ण',
    todayJap: 'आज जाप',
    favStories: 'पसंदीदा कहानियां',
    settings: 'सेटिंग्स',
    changeLanguage: 'भाषा बदलें',
    appMainLanguage: 'ऐप की मुख्य भाषा',
    dailyNotifications: 'दैनिक सूचनाएं',
    dailySadhanaReminders: 'दैनिक साधना अनुस्मारक',
  },
};
