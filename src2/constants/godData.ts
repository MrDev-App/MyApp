import imagePath from '../assets';

export interface MantraItem {
  name: string;
  mantraHi: string;
  mantraEn?: string;
}

export interface God {
  id: string;
  englishName: string;
  hindiName: string;
  mantraEn: string;
  mantraHi: string;
  image: any;
  mantras?: MantraItem[];
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
    mantras: [
      {
        name: 'Panchakshara Mantra',
        mantraHi: 'ॐ नमः शिवाय',
        mantraEn: 'Om Namah Shivaya',
      },
      {
        name: 'Maha Mrityunjaya Mantra',
        mantraHi:
          'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय ममृतत्॥',
      },
      {
        name: 'Shiva Gayatri Mantra',
        mantraHi:
          'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि।\nतन्नो रुद्रः प्रचोदयात्॥',
      },
      {
        name: 'Rudra Mantra',
        mantraHi: 'ॐ नमो भगवते रुद्राय',
        mantraEn: 'Om Namo Bhagavate Rudraya',
      },
      {
        name: 'Shiva Dhyan Mantra',
        mantraHi: 'ॐ ध्यानं शिवं शान्तं जगन्नाथं जगद्गुरुम्।',
      },
      {
        name: 'Shiva Beej Mantra',
        mantraHi: 'ॐ हौं जूं सः',
        mantraEn: 'Om Haum Joom Sah',
      },
      {
        name: 'Shiva Mool Mantra',
        mantraHi:
          'ॐ नमः शिवाय शान्ताय कारणत्रय हेतवे।\nनिवेदयामि चात्मानं गतिस्त्वं परमेश्वर॥',
      },
      {
        name: 'Karpur Gauram Mantra',
        mantraHi:
          'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
      },
      {
        name: 'Shiva Ashtakshara Mantra',
        mantraHi: 'ॐ शिवाय नमः',
        mantraEn: 'Om Shivaya Namah',
      },
      {
        name: 'Rudra Gayatri',
        mantraHi:
          'ॐ महादेवाय विद्महे रुद्रमूर्तये धीमहि।\nतन्नो रुद्रः प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'vishnu',
    englishName: 'Vishnu',
    hindiName: 'विष्णु',
    mantraEn: 'Om Namo Bhagavate Vasudevaya',
    mantraHi: 'ॐ नमो भगवते वासुदेवाय',
    image: imagePath.Vishnu,
    mantras: [
      {
        name: 'Vishnu Mool Mantra',
        mantraHi: 'ॐ नमो भगवते वासुदेवाय',
        mantraEn: 'Om Namo Bhagavate Vasudevaya',
      },
      {
        name: 'Vishnu Gayatri Mantra',
        mantraHi:
          'ॐ नारायणाय विद्महे वासुदेवाय धीमहि तन्नो विष्णुः प्रचोदयात्॥',
        mantraEn:
          'Om Narayanaya Vidmahe Vasudevaya Dheemahi Tanno Vishnuh Prachodayat',
      },
      {
        name: 'Mangalam Bhagwan Vishnu',
        mantraHi:
          'मङ्गलम् भगवान् विष्णुः मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः॥',
      },
    ],
  },
  // Pair 2 (Column 2 on screen)
  {
    id: 'brahma',
    englishName: 'Brahma',
    hindiName: 'ब्रह्मा',
    mantraEn: 'Om Brahmaye Namaha',
    mantraHi: 'ॐ ब्रह्मणे नमः',
    image: imagePath.Brahma,
    mantras: [
      {
        name: 'Brahma Mool Mantra',
        mantraHi: 'ॐ ब्रह्मणे नमः',
        mantraEn: 'Om Brahmaye Namaha',
      },
      {
        name: 'Brahma Gayatri Mantra',
        mantraHi:
          'ॐ चतुर्मुखाय विद्महे कमण्डलुधराय धीमहि तन्नो ब्रह्मा प्रचोदयात्॥',
        mantraEn:
          'Om Chaturmukhaya Vidmahe Kamandaludharaya Dheemahi Tanno Brahma Prachodayat',
      },
    ],
  },
  {
    id: 'saraswati',
    englishName: 'Saraswati',
    hindiName: 'सरस्वती',
    mantraEn: 'Om Aing Saraswathye Namah',
    mantraHi: 'ॐ ऐं सरस्वत्यै नमः',
    image: imagePath.Saraswati,
    mantras: [
      {
        name: 'Saraswati Mool Mantra',
        mantraHi: 'ॐ ऐं सरस्वत्यै नमः',
        mantraEn: 'Om Aing Saraswathye Namah',
      },
      {
        name: 'Saraswati Gayatri',
        mantraHi:
          'ॐ सरस्वत्यै विद्महे ब्रह्मपुत्र्यै धीमहि तन्नो देवी प्रचोदयात्॥',
      },
      {
        name: 'Saraswati Vandana',
        mantraHi:
          'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥',
      },
    ],
  },
  // Pair 3 (Column 3 on screen)
  {
    id: 'lakshmi',
    englishName: 'Lakshmi',
    hindiName: 'लक्ष्मी',
    mantraEn: 'Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed',
    mantraHi: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
    image: imagePath.Laxmi,
    mantras: [
      {
        name: 'Lakshmi Beej Mantra',
        mantraHi: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
        mantraEn: 'Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed',
      },
      {
        name: 'Lakshmi Gayatri Mantra',
        mantraHi:
          'ॐ श्री महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मी प्रचोदयात्॥',
      },
      {
        name: 'Mahalakshmi Mantra',
        mantraHi:
          'ॐ सर्वाबाधा विनिर्मुक्तो, धन धान्य सुतान्वितः।\nमनुष्यो मत्प्रसादेन भविष्यति न संशयः॥',
      },
    ],
  },
  {
    id: 'rama',
    englishName: 'Rama',
    hindiName: 'राम',
    mantraEn: 'Om Sri Ram Jaya Ram Jaya Jaya Ram',
    mantraHi: 'ॐ श्री रामाय नमः',
    image: imagePath.Rama,
    mantras: [
      {
        name: 'Rama Mool Mantra',
        mantraHi: 'ॐ श्री रामाय नमः',
      },
      {
        name: 'Rama Taraka Mantra',
        mantraHi: 'श्री राम जय राम जय जय राम',
        mantraEn: 'Sri Rama Jaya Rama Jaya Jaya Rama',
      },
      {
        name: 'Rama Gayatri Mantra',
        mantraHi: 'ॐ दाशरथाय विद्महे सीतावल्लभाय धीमहि तन्नो रामः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 4 (Column 4 on screen)
  {
    id: 'krishna',
    englishName: 'Krishna',
    hindiName: 'कृष्ण',
    mantraEn: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
    mantraHi: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    image: imagePath.Krishna,
    mantras: [
      {
        name: 'Krishna Maha Mantra',
        mantraHi:
          'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
        mantraEn:
          'Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare',
      },
      {
        name: 'Krishna Gayatri Mantra',
        mantraHi:
          'ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि तन्नो कृष्णः प्रचोदयात्॥',
      },
      {
        name: 'Krishna Mool Mantra',
        mantraHi: 'ॐ कृष्णाय नमः',
        mantraEn: 'Om Krishnaya Namaha',
      },
    ],
  },
  {
    id: 'ganesha',
    englishName: 'Ganesha',
    hindiName: 'गणेश',
    mantraEn: 'Om Gan Ganapataye Namah',
    mantraHi: 'ॐ गं गणपतये नमः',
    image: imagePath.Ganesha,
    mantras: [
      {
        name: 'Ganesha Mool Mantra',
        mantraHi: 'ॐ गं गणपतये नमः',
        mantraEn: 'Om Gan Ganapataye Namah',
      },
      {
        name: 'Vakratunda Maha Mantra',
        mantraHi:
          'ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      },
      {
        name: 'Ganesha Gayatri Mantra',
        mantraHi:
          'ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्ती प्रचोदयात्॥',
      },
    ],
  },
  // Pair 5 (Column 5 on screen)
  {
    id: 'hanuman',
    englishName: 'Hanuman',
    hindiName: 'हनुमान',
    mantraEn: 'Om Hanumate Namah',
    mantraHi: 'ॐ हनुमते नमः',
    image: imagePath.Hanuman,
    mantras: [
      {
        name: 'Hanuman Mool Mantra',
        mantraHi: 'ॐ हनुमते नमः',
        mantraEn: 'Om Hanumate Namah',
      },
      {
        name: 'Hanuman Gayatri Mantra',
        mantraHi:
          'ॐ अञ्जनीसुताय विद्महे वायुपुत्राय धीमहि तन्नो हनुमान् प्रचोदयात्॥',
      },
      {
        name: 'Anjaneya Dhyan Mantra',
        mantraHi:
          'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
      },
    ],
  },
  {
    id: 'surya',
    englishName: 'Surya',
    hindiName: 'सूर्य',
    mantraEn: 'Om Suryaya Namaha',
    mantraHi: 'ॐ सूर्याय नमः',
    image: imagePath.Surya,
    mantras: [
      {
        name: 'Surya Mool Mantra',
        mantraHi: 'ॐ सूर्याय नमः',
        mantraEn: 'Om Suryaya Namaha',
      },
      {
        name: 'Surya Beej Mantra',
        mantraHi: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
      },
      {
        name: 'Surya Gayatri Mantra',
        mantraHi: 'ॐ आदित्याय विद्महे दिवाकराय धीमहि तन्नो सूर्यः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 6 (Column 6 on screen)
  {
    id: 'durga',
    englishName: 'Durga',
    hindiName: 'दुर्गा',
    mantraEn: 'Om Dum Durgayei Namaha',
    mantraHi: 'ॐ दुं दुर्गायै नमः',
    image: imagePath.Durga,
    mantras: [
      {
        name: 'Durga Mool Mantra',
        mantraHi: 'ॐ दुं दुर्गायै नमः',
        mantraEn: 'Om Dum Durgayei Namaha',
      },
      {
        name: 'Navarna Mantra',
        mantraHi: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥',
      },
      {
        name: 'Durga Gayatri Mantra',
        mantraHi:
          'ॐ गिरिजायै विद्महे शिवप्रियायै धीमहि तन्नो दुर्गा प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'kubera',
    englishName: 'Lord Kubera',
    hindiName: 'कुबेर देव',
    mantraEn: 'Om Kuberaya Namaha',
    mantraHi: 'ॐ कुबेराय नमः',
    image: imagePath.Kubera,
    mantras: [
      {
        name: 'Kubera Mool Mantra',
        mantraHi: 'ॐ कुबेराय नमः',
        mantraEn: 'Om Kuberaya Namaha',
      },
      {
        name: 'Kubera Dhana Prapti Mantra',
        mantraHi:
          'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये\nधनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
      },
      {
        name: 'Kubera Gayatri Mantra',
        mantraHi:
          'ॐ वैश्रवणाय विद्महे यक्षराजाय धीमहि तन्नो कुबेरः प्रचोदयात्॥',
      },
    ],
  },
  // Pair 7 (Column 7 on screen)
  {
    id: 'shani',
    englishName: 'Shani Dev',
    hindiName: 'शनि देव',
    mantraEn: 'Om Sham Shanaishcharaya Namah',
    mantraHi: 'ॐ शं शनैश्चराय नमः',
    image: imagePath.ShaniDev,
    mantras: [
      {
        name: 'Shani Beej Mantra',
        mantraHi: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
      },
      {
        name: 'Shani Maha Mantra',
        mantraHi:
          'ॐ नीलांजन समाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तंड संभूतं तं नमामि शनैश्चरम्॥',
      },
      {
        name: 'Shani Gayatri Mantra',
        mantraHi:
          'ॐ शनैश्चराय विद्महे सूर्यपुत्राय धीमहि तन्नो मन्दः प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'radha',
    englishName: 'Sri Radha',
    hindiName: 'श्री राधा',
    mantraEn: 'Radhe Radhe',
    mantraHi: 'राधे राधे',
    image: imagePath.SriRadha,
    mantras: [
      {
        name: 'Radha Kirtan Mantra',
        mantraHi: 'राधे राधे',
        mantraEn: 'Radhe Radhe',
      },
      {
        name: 'Radha Gayatri Mantra',
        mantraHi:
          'ॐ वृषभानुजायै विद्महे कृष्णप्रियायै धीमहि तन्नो राधा प्रचोदयात्॥',
      },
    ],
  },
];
