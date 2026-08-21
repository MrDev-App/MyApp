import imagePath from '../assets';

export interface Story {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  contentEn?: string;
  contentHi?: string;
  categoryEn: string;
  categoryHi: string;
  image: any;
  imagePages?: any[];
  readingTimeMin: number;
  sourceEn: string;
  sourceHi: string;
  difficultyEn: string;
  difficultyHi: string;
  moralEn?: string;
  moralHi?: string;
  shloka?: string;
  shlokaTranslationEn?: string;
  shlokaTranslationHi?: string;
  keywords?: string; // Comma-separated bilingual search terms (gods, places, alternative spellings)
}

export const MahaBharatStories: Story[] = [
  {
    id: 'MahaBharatStory1',
    titleEn: "Karna's challenge to Arjuna",
    titleHi: 'कर्ण की अर्जुन को चुनौती',
    subtitleEn: 'The Archery Challenge',
    subtitleHi: 'तीरंदाजी की चुनौती',
    descriptionEn:
      'How Karna challenged Arjuna to an archery contest and proved his might.',
    descriptionHi:
      'जानिए कैसे कर्ण ने अर्जुन को तीरंदाजी प्रतियोगिता की चुनौती दी और अपनी शक्ति का प्रदर्शन किया।',
    categoryEn: 'MahaBharat',
    categoryHi: 'महाभारत',
    image: imagePath.KarnChallenge,
    imagePages: imagePath.KarnChaPages,
    readingTimeMin: 4,
    sourceEn: 'MahaBharat',
    sourceHi: 'महाभारत',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    keywords:
      'ganesha, ganesh, ganpati, kartikeya, kartikya, kailash, kailas, shiva, shiv, parvati, parvatiji, cosmos, universe, race, wisdom, parents, mouse, mushak, gold fruit, ganes, ganesa, गणेश, कार्तिकेय, शिव, पार्वती, कैलाश, ब्रह्मांड, परिक्रमा, मूषक, चूहा, बुद्धि, माता पिता',
  },
];
