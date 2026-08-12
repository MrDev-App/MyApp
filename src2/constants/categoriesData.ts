import imagePath from '../assets';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle?: string;
  text: string;
  image: any;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  coverImage: any;
  description: string;
  items: CategoryItem[];
}

export const categoriesData: Category[] = [
  {
    id: 'aarti',
    title: 'Aarti',
    icon: '🪔',
    coverImage: imagePath.Ganesha,
    description:
      'Devotional prayers sung in praise of deities to invoke their blessings.',
    items: [
      {
        id: 'ganesha_aarti',
        name: 'Ganesha Aarti',
        subtitle: 'Jai Ganesh Deva',
        text: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva,\nMata jaki Parvati, Pita Mahadeva.\n\nEk dant, daya want, char bhuja dhari,\nMathe par tilak sohe, muse ki sawari.\n\nPan chadhe, phool chadhe, aur chadhe meva,\nLadduan ka bhog lage, sant karein seva.\n\nAndhan ko aankh det, kodhin ko kaya,\nBanjhan ko putra det, nirdhan ko maya.\n\nJai Ganesh, Jai Ganesh, Jai Ganesh Deva,\nMata jaki Parvati, Pita Mahadeva.',
        image: imagePath.Ganesha,
      },
      {
        id: 'shiva_aarti',
        name: 'Shiva Aarti',
        subtitle: 'Om Jai Shiv Omkara',
        text: 'Om Jai Shiv Omkara, Swami Har Shiv Omkara,\nBrahma, Vishnu, Sadashiv, Ardhangi Dhara.\n\nEkanan, Chaturanan, Panchanan Raje,\nHansanan, Garudasan, Vrishbahan Saje.\n\nDo Bhuj, Char Chaturbhuj, Das Bhuj Te Sohe,\nTeenon Roop Nirakhta, Tribhuvan Jan Mohe.\n\nAkshamala, Vanamala, Rundamala Dhari,\nChandan, Mrigmad Sohe, Bhale Shashi Dhari.\n\nOm Jai Shiv Omkara, Swami Har Shiv Omkara.',
        image: imagePath.Bholenath,
      },
      {
        id: 'laxmi_aarti',
        name: 'Lakshmi Aarti',
        subtitle: 'Om Jai Lakshmi Mata',
        text: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata,\nTumko Nishdin Sevat, Har Vishnu Vidhata.\n\nUma Rama Brahmani, Tum Hi Jag Mata,\nSurya Chandrama Dhyavat, Naarad Rishi Gata.\n\nDurga Roop Niranjani, Sukh Sampatti Data,\nJo Koi Tumko Dhyata, Riddhi Siddhi Pata.\n\nTum Patal Nivasini, Tum Hi Shubh Data,\nKarma Prabhav Prakashini, Bhav Nidhi Ki Trata.\n\nOm Jai Lakshmi Mata, Maiya Jai Lakshmi Mata.',
        image: imagePath.Laxmi,
      },
    ],
  },
  {
    id: 'shlok',
    title: 'Shlok',
    icon: '📜',
    coverImage: imagePath.Krishna,
    description:
      'Sacred Sanskrit verses holding spiritual wisdom and divine vibrations.',
    items: [
      {
        id: 'ganesha_shlok',
        name: 'Ganesha Shlok',
        subtitle: 'Vakratunda Mahakaya',
        text: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nTranslation:\nO Lord Ganesha, of curved trunk and massive body, whose splendor is equal to a million suns, please make all my undertakings free of obstacles, always.',
        image: imagePath.Ganesha,
      },
      {
        id: 'guru_shlok',
        name: 'Guru Shlok',
        subtitle: 'Guru Brahma Guru Vishnu',
        text: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥\n\nTranslation:\nThe Guru is Brahma, the Guru is Vishnu, the Guru is Shiva. The Guru is supreme absolute truth itself. Salutations to that revered Guru.',
        image: imagePath.Brahma,
      },
      {
        id: 'gayatri_mantra',
        name: 'Gayatri Mantra',
        subtitle: 'Om Bhur Bhuva Swaha',
        text: 'ॐ भूर्भुवः स्वः।\nतत्सवितुर्वरेण्यं।\nभर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥\n\nTranslation:\nWe meditate on the glorious splendor of the divine Vivifier (Sun). May He illuminate and inspire our minds and intellect.',
        image: imagePath.Surya,
      },
    ],
  },
  {
    id: 'stories',
    title: 'Stories',
    icon: '📖',
    coverImage: imagePath.Rama,
    description:
      'Inspiring mythological tales and moral stories from sacred scriptures.',
    items: [
      {
        id: 'ganesha_wisdom',
        name: "Ganesha's Wisdom",
        subtitle: 'The Cosmic Race',
        text: 'Once, Shiva and Parvati challenged Ganesha and Kartikeya to a race: whoever circled the universe three times first would win a divine fruit.\n\nKartikeya immediately sped away on his peacock. Ganesha, knowing his heavy body and slow vehicle (the mouse) could not compete, paused and thought.\n\nHe then walked around his parents Shiva and Parvati three times. When asked why, Ganesha replied that his parents represent the entire universe to him. Pleased with his devotion and intellect, they awarded him the fruit.',
        image: imagePath.Ganesha,
      },
      {
        id: 'ramayana_story',
        name: 'The Story of Rama',
        subtitle: 'The Victory of Dharma',
        text: 'Lord Rama, the prince of Ayodhya, was exiled to the forest for 14 years. Accompanied by his wife Sita and brother Lakshmana, he faced many hardships.\n\nDuring exile, the demon king Ravana abducted Sita. Rama mobilized an army of vanaras, crossed the ocean, defeated Ravana, and rescued Sita. His return to Ayodhya is celebrated as Diwali, symbolizing the victory of light over darkness and dharma over adharma.',
        image: imagePath.Rama,
      },
      {
        id: 'gita_story',
        name: 'Bhagavad Gita Wisdom',
        subtitle: 'Arjuna & Krishna',
        text: 'On the battlefield of Kurukshetra, prince Arjuna was overwhelmed with grief and doubt about fighting his own kin.\n\nLord Krishna, acting as his charioteer, delivered the spiritual discourse of the Bhagavad Gita. He taught Arjuna about karma yoga (duty without attachment), the eternal nature of the soul, and faith in the supreme. Guided by this wisdom, Arjuna performed his righteous duty.',
        image: imagePath.Krishna,
      },
    ],
  },
  {
    id: 'temples',
    title: 'Temples',
    icon: '🛕',
    coverImage: imagePath.Bholenath,
    description:
      'Renowned pilgrimage sites and historically rich temples across India.',
    items: [
      {
        id: 'kedarnath',
        name: 'Kedarnath Temple',
        subtitle: 'Garhwal Himalayas, Uttarakhand',
        text: 'Located at 11,755 ft near Mandakini river, Kedarnath is one of the most sacred Shiva temples and part of Chhota Char Dham.\n\nBelieved to be originally built by the Pandavas, the current structure is attributed to Adi Shankara. It stands strong against extreme weather, representing absolute resilience and faith.',
        image: imagePath.Bholenath,
      },
      {
        id: 'somnath',
        name: 'Somnath Temple',
        subtitle: 'Prabhas Patan, Gujarat',
        text: 'Somnath is the first of the twelve sacred Jyotirlinga shrines of Lord Shiva.\n\nReconstructed several times in history, the modern temple is built in Chalukya style. It symbolizes the eternal triumph of creation over destruction.',
        image: imagePath.Vishnu,
      },
      {
        id: 'bankey_bihari',
        name: 'Bankey Bihari Temple',
        subtitle: 'Vrindavan, Uttar Pradesh',
        text: 'Dedicated to Lord Krishna (Bankey Bihari), this temple is one of the most famous shrines in Vrindavan.\n\nThe deity here was worshiped by the saint-musician Swami Haridas. The unique style of worship includes frequent curtain pulls so that devotees do not gaze continuously, preserving a loving, playful connection.',
        image: imagePath.SriRadha,
      },
    ],
  },
];
