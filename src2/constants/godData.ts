import imagePath from '../assets';

export interface God {
  id: string;
  englishName: string;
  hindiName: string;
  mantraEn: string;
  mantraHi: string;
  image: any;
}

export const godData: God[] = [
  // Pair 1 (Column 1 on screen)
  {
    id: 'shiva',
    englishName: 'Shiva',
    hindiName: 'शिव',
    mantraEn: 'Om Namah Shivaya',
    mantraHi: 'ॐ नमः शिवाय',
    image: imagePath.Bholenath,
  },
  {
    id: 'vishnu',
    englishName: 'Vishnu',
    hindiName: 'विष्णु',
    mantraEn: 'Om Namo Bhagavate Vasudevaya',
    mantraHi: 'ॐ नमो भगवते वासुदेवाय',
    image: imagePath.Vishnu,
  },
  // Pair 2 (Column 2 on screen)
  {
    id: 'brahma',
    englishName: 'Brahma',
    hindiName: 'ब्रह्मा',
    mantraEn: 'Om Brahmaye Namaha',
    mantraHi: 'ॐ ब्रह्मणे नमः',
    image: imagePath.Brahma,
  },
  {
    id: 'saraswati',
    englishName: 'Saraswati',
    hindiName: 'सरस्वती',
    mantraEn: 'Om Aing Saraswathye Namah',
    mantraHi: 'ॐ ऐं सरस्वत्यै नमः',
    image: imagePath.Saraswati,
  },
  // Pair 3 (Column 3 on screen)
  {
    id: 'lakshmi',
    englishName: 'Lakshmi',
    hindiName: 'लक्ष्मी',
    mantraEn: 'Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed',
    mantraHi: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
    image: imagePath.Laxmi,
  },
  {
    id: 'rama',
    englishName: 'Rama',
    hindiName: 'राम',
    mantraEn: 'Om Sri Ram Jaya Ram Jaya Jaya Ram',
    mantraHi: 'ॐ श्री रामाय नमः',
    image: imagePath.Rama,
  },
  // Pair 4 (Column 4 on screen)
  {
    id: 'krishna',
    englishName: 'Krishna',
    hindiName: 'कृष्ण',
    mantraEn: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
    mantraHi: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    image: imagePath.Krishna,
  },
  {
    id: 'ganesha',
    englishName: 'Ganesha',
    hindiName: 'गणेश',
    mantraEn: 'Om Gan Ganapataye Namah',
    mantraHi: 'ॐ गं गणपतये नमः',
    image: imagePath.Ganesha,
  },
  // Pair 5 (Column 5 on screen)
  {
    id: 'hanuman',
    englishName: 'Hanuman',
    hindiName: 'हनुमान',
    mantraEn: 'Om Hanumate Namah',
    mantraHi: 'ॐ हनुमते नमः',
    image: imagePath.Hanuman,
  },
  {
    id: 'surya',
    englishName: 'Surya',
    hindiName: 'सूर्य',
    mantraEn: 'Om Suryaya Namaha',
    mantraHi: 'ॐ सूर्याय नमः',
    image: imagePath.Surya,
  },
  // Pair 6 (Column 6 on screen)
  {
    id: 'durga',
    englishName: 'Durga',
    hindiName: 'दुर्गा',
    mantraEn: 'Om Dum Durgayei Namaha',
    mantraHi: 'ॐ दुं दुर्गायै नमः',
    image: imagePath.Durga,
  },
  {
    id: 'kubera',
    englishName: 'Lord Kubera',
    hindiName: 'कुबेर देव',
    mantraEn: 'Om Kuberaya Namaha',
    mantraHi: 'ॐ कुबेराय नमः',
    image: imagePath.Kubera,
  },
  // Pair 7 (Column 7 on screen)
  {
    id: 'shani',
    englishName: 'Shani Dev',
    hindiName: 'शनि देव',
    mantraEn: 'Om Sham Shanaishcharaya Namah',
    mantraHi: 'ॐ शं शनैश्चराय नमः',
    image: imagePath.ShaniDev,
  },
  {
    id: 'radha',
    englishName: 'Sri Radha',
    hindiName: 'श्री राधा',
    mantraEn: 'Radhe Radhe',
    mantraHi: 'राधे राधे',
    image: imagePath.SriRadha,
  },
];
