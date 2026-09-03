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
  {
    id: 'MahaBharatStory2',
    titleEn: 'Abhimanyu and the Chakravyuh',
    titleHi: 'अभिमन्यु और चक्रव्यूह',
    subtitleEn: 'The Brave Young Warrior',
    subtitleHi: 'वीर युवा योद्धा',
    descriptionEn:
      'The heroic story of young Abhimanyu who fought courageously inside the deadly Chakravyuh formation.',
    descriptionHi:
      'वीर अभिमन्यु की गौरवशाली कहानी, जिन्होंने चक्रव्यूह के भीतर असाधारण वीरता से युद्ध किया।',
    categoryEn: 'MahaBharat',
    categoryHi: 'महाभारत',
    image: imagePath.AbhimanyuBookCover,
    imagePages: imagePath.AbhimanyuPages,
    readingTimeMin: 6,
    sourceEn: 'MahaBharat',
    sourceHi: 'महाभारत',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    keywords:
      'abhimanyu, chakravyuh, arjuna, subhadra, mahabharat, kurukshetra, warrior, pandava, kaurava, arjun, veer, drona, loop, formation, अभिमन्यु, चक्रव्यूह, अर्जुन, सुभद्रा, महाभारत, कुरुक्षेत्र, योद्धा, पाण्डव, कौरव, द्रोणाचार्य',
  },
  {
    id: 'MahaBharatStory3',
    titleEn: 'Eklavya: The Devoted Archer',
    titleHi: 'एकलव्य: निष्ठावान धनुर्धर',
    subtitleEn: 'The Ultimate Devotion & Guru Dakshina',
    subtitleHi: 'अद्वितीय गुरुभक्ति और गुरु दक्षिणा',
    descriptionEn:
      'The inspiring story of Eklavya, whose supreme dedication, practice, and devotion to Guru Dronacharya made him a legendary archer.',
    descriptionHi:
      'एकलव्य की प्रेरणादायी गाथा, जिनकी गुरु द्रोणाचार्य के प्रति अटूट निष्ठा और अनवरत अभ्यास ने उन्हें अद्वितीय धनुर्धर बनाया।',
    categoryEn: 'MahaBharat',
    categoryHi: 'महाभारत',
    image: imagePath.EklavyaCoverPage,
    imagePages: imagePath.EklavyaPages,
    readingTimeMin: 5,
    sourceEn: 'MahaBharat',
    sourceHi: 'महाभारत',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    keywords:
      'eklavya, eklavya story, drona, dronacharya, archery, archer, thumb, gurudakshina, guru, dakshina, devotion, nishada, arjuna, mahabharat, एकलव्य, द्रोणाचार्य, धनुर्विद्या, धनुर्धर, अंगूठा, गुरुदक्षिणा, गुरु, निष्ठा, निषाद, अर्जुन, महाभारत',
  },
  {
    id: 'MahaBharatStory4',
    titleEn: "Karna's Supreme Gift: Kavach & Kundal",
    titleHi: 'कर्ण का महादान : कवच और कुंडल',
    subtitleEn: 'The Immortal Sacrifice of Danveer Karna',
    subtitleHi: 'दानवीर कर्ण का अमर त्याग',
    descriptionEn:
      'The legendary tale of Danveer Karna who willingly sacrificed his divine, flesh-attached armor and earrings to Indra without hesitation.',
    descriptionHi:
      'दानवीर कर्ण की अमर गाथा, जिन्होंने देवराज इंद्र के याचना करने पर बिना किसी संकोच के अपने अभेद्य कवच और कुंडल दान कर दिए।',
    categoryEn: 'MahaBharat',
    categoryHi: 'महाभारत',
    image: imagePath.KGCoverPage,
    imagePages: imagePath.KarnGiftPages,
    readingTimeMin: 4,
    sourceEn: 'MahaBharat',
    sourceHi: 'महाभारत',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    keywords:
      "karna, karn, karn's gift, karns gift, indra, surya, kavach, kundal, danveer, gift, sacrifice, charity, suryaputra, arjuna, pandava, mahabharat, दानवीर, कर्ण, इंद्र, सूर्य, कवच, कुंडल, दान, त्याग, सूर्यपुत्र, अर्जुन, महाभारत",
  },
];
