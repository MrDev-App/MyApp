import imagePath from '@assets/index';

export interface GodMantra {
  nameEn: string;
  nameHi: string;
  mantra: string;
}

export interface NaamJapItem {
  id: string;
  englishName: string;
  hindiName: string;
  mantra: string;
  image: any;
  imageUrl?: string;
  mantras: GodMantra[];
}

// Backward-compatibility type
export type God = NaamJapItem;

export const naamJapData: NaamJapItem[] = [
  // Pair 1
  {
    id: 'shiva',
    englishName: 'Shiva',
    hindiName: 'शिव',
    mantra: 'ॐ नमः शिवाय',
    image: imagePath.Bholenath,
    mantras: [
      {
        nameEn: 'Maha Mrityunjaya Mantra',
        nameHi: 'महामृत्युंजय मंत्र',
        mantra:
          'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
      },
      {
        nameEn: 'Shiva Panchakshari Mantra',
        nameHi: 'शिव पंचाक्षरी मंत्र',
        mantra: 'ॐ नमः शिवाय',
      },
      {
        nameEn: 'Rudra Mantra',
        nameHi: 'रुद्र मंत्र',
        mantra: 'ॐ नमो भगवते रुद्राय',
      },
    ],
  },
  {
    id: 'vishnu',
    englishName: 'Vishnu',
    hindiName: 'विष्णु',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    image: imagePath.Vishnu,
    mantras: [
      {
        nameEn: 'Vishnu Mool Mantra',
        nameHi: 'विष्णु मूल मंत्र',
        mantra: 'ॐ नमो भगवते वासुदेवाय',
      },
      {
        nameEn: 'Vishnu Gayatri Mantra',
        nameHi: 'विष्णु गायत्री मंत्र',
        mantra:
          'ॐ नारायणाय विद्महे वासुदेवाय धीमहि तन्नो विष्णुः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 2
  {
    id: 'brahma',
    englishName: 'Brahma',
    hindiName: 'ब्रह्मा',
    mantra: 'ॐ ब्रह्मणे नमः',
    image: imagePath.Brahma,
    mantras: [
      {
        nameEn: 'Brahma Mantra',
        nameHi: 'ब्रह्म मंत्र',
        mantra: 'ॐ ब्रह्मणे नमः',
      },
      {
        nameEn: 'Brahma Gayatri Mantra',
        nameHi: 'ब्रह्मा गायत्री मंत्र',
        mantra:
          'ॐ वेदात्मने विद्महे हिरण्यगर्भाय धीमहि तन्नो ब्रह्मा प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'saraswati',
    englishName: 'Saraswati',
    hindiName: 'सरस्वती',
    mantra: 'ॐ ऐं सरस्वत्यै नमः',
    image: imagePath.Saraswati,
    mantras: [
      {
        nameEn: 'Saraswati Vidya Mantra',
        nameHi: 'सरस्वती विद्या मंत्र',
        mantra: 'ॐ ऐं सरस्वत्यै नमः',
      },
      {
        nameEn: 'Saraswati Vandana',
        nameHi: 'सरस्वती वंदना',
        mantra:
          'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना। या ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा वन्दिता सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा॥',
      },
    ],
  },
  // Pair 3
  {
    id: 'lakshmi',
    englishName: 'Lakshmi',
    hindiName: 'लक्ष्मी',
    mantra: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
    image: imagePath.Laxmi,
    mantras: [
      {
        nameEn: 'Mahalaxmi Mantra',
        nameHi: 'महालक्ष्मी मंत्र',
        mantra:
          'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥',
      },
      {
        nameEn: 'Lakshmi Beej Mantra',
        nameHi: 'लक्ष्मी बीज मंत्र',
        mantra: 'ॐ श्रीं श्रियै नमः',
      },
    ],
  },
  {
    id: 'rama',
    englishName: 'Rama',
    hindiName: 'राम',
    mantra: 'ॐ श्री रामाय नमः',
    image: imagePath.Rama,
    mantras: [
      {
        nameEn: 'Ram Taraka Mantra',
        nameHi: 'राम तारक मंत्र',
        mantra: 'श्री राम जय राम जय जय राम',
      },
      {
        nameEn: 'Rama Gayatri Mantra',
        nameHi: 'राम गायत्री मंत्र',
        mantra:
          'ॐ दाशरथये विद्महे सीतावल्लभाय धीमहि तन्नो रामः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 4
  {
    id: 'krishna',
    englishName: 'Krishna',
    hindiName: 'कृष्ण',
    mantra:
      'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे',
    image: imagePath.Krishna,
    mantras: [
      {
        nameEn: 'Hare Krishna Mahamantra',
        nameHi: 'महामंत्र',
        mantra:
          'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे',
      },
      {
        nameEn: 'Krishna Mool Mantra',
        nameHi: 'कृष्ण मूल मंत्र',
        mantra: 'ॐ क्लीं कृष्णाय नमः',
      },
    ],
  },
  {
    id: 'ganesha',
    englishName: 'Ganesha',
    hindiName: 'गणेश',
    mantra: 'ॐ गं गणपतये नमः',
    image: imagePath.Ganesha,
    mantras: [
      {
        nameEn: 'Vakratunda Mahakaya',
        nameHi: 'वक्रतुण्ड महाकाय मंत्र',
        mantra:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      },
      {
        nameEn: 'Ganesh Beej Mantra',
        nameHi: 'गणेश बीज मंत्र',
        mantra: 'ॐ गं गणपतये नमः',
      },
    ],
  },
  // Pair 5
  {
    id: 'hanuman',
    englishName: 'Hanuman',
    hindiName: 'हनुमान',
    mantra: 'ॐ हनुमते नमः',
    image: imagePath.Hanuman,
    mantras: [
      {
        nameEn: 'Hanuman Mool Mantra',
        nameHi: 'हनुमान मूल मंत्र',
        mantra: 'ॐ हं हनुमते रुद्रात्मकाय हुं फट्',
      },
      {
        nameEn: 'Marut Nandan Mantra',
        nameHi: 'मनोजवं मारुततुल्यवेगं',
        mantra:
          'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
      },
    ],
  },
  {
    id: 'surya',
    englishName: 'Surya',
    hindiName: 'सूर्य',
    mantra: 'ॐ सूर्याय नमः',
    image: imagePath.Surya,
    mantras: [
      {
        nameEn: 'Surya Namaskar Mantra',
        nameHi: 'सूर्य नमस्कार मंत्र',
        mantra: 'ॐ सूर्याय नमः',
      },
      {
        nameEn: 'Gayatri Mantra',
        nameHi: 'गायत्री मंत्र',
        mantra:
          'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 6
  {
    id: 'durga',
    englishName: 'Durga',
    hindiName: 'दुर्गा',
    mantra: 'ॐ दुं दुर्गायै नमः',
    image: imagePath.Durga,
    mantras: [
      {
        nameEn: 'Durga Navarna Mantra',
        nameHi: 'दुर्गा नवार्ण मंत्र',
        mantra: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
      },
      {
        nameEn: 'Sarva Mangala Mangalye',
        nameHi: 'सर्वमङ्गलमाङ्गल्ये',
        mantra:
          'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
      },
    ],
  },
  {
    id: 'kubera',
    englishName: 'Lord Kubera',
    hindiName: 'कुबेर देव',
    mantra:
      'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
    image: imagePath.Kubera,
    mantras: [
      {
        nameEn: 'Kuber Dhana Mantra',
        nameHi: 'कुबेर धन प्राप्ति मंत्र',
        mantra:
          'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
      },
      {
        nameEn: 'Kuber Beej Mantra',
        nameHi: 'कुबेर बीज मंत्र',
        mantra: 'ॐ ह्रीं श्रीं क्रीं कुबेराय नमः',
      },
    ],
  },
  // Pair 7
  {
    id: 'shani',
    englishName: 'Shani Dev',
    hindiName: 'शनि देव',
    mantra: 'ॐ शं शनैश्चराय नमः',
    image: imagePath.ShaniDev,
    mantras: [
      {
        nameEn: 'Shani Beej Mantra',
        nameHi: 'शनि बीज मंत्र',
        mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
      },
      {
        nameEn: 'Shani Gayatri Mantra',
        nameHi: 'शनि गायत्री मंत्र',
        mantra:
          'ॐ काकध्वजाय विद्महे खड्गहस्ताय धीमहि तन्नो मन्दः प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'radha',
    englishName: 'Sri Radha',
    hindiName: 'श्री राधा',
    mantra: 'राधे राधे',
    image: imagePath.SriRadha,
    mantras: [
      {
        nameEn: 'Radhe Radhe',
        nameHi: 'राधे राधे संकीर्तन',
        mantra: 'राधे राधे गोविंद गोविंद राधे',
      },
      {
        nameEn: 'Radha Gayatri Mantra',
        nameHi: 'श्री राधा गायत्री मंत्र',
        mantra:
          'ॐ वृषभानुजायै विद्महे कृष्णप्रियायै धीमहि तन्नो राधा प्रचोदयात्॥',
      },
    ],
  },
];

// Backward-compatibility alias
export const godData = naamJapData;
