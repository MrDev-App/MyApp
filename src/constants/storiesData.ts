import imagePath from '../assets';

export type BookType = 'comic' | 'text' | 'pdf';

export interface StoryPage {
  page?: number;
  sourceHi?: string;
  sourceEn?: string;
  contentHi?: string;
  contentEn?: string;
  shloka?: string;
  shlokaTranslationHi?: string;
  shlokaTranslationEn?: string;
  moralHi?: string;
  moralEn?: string;
  titleHi?: string;
  titleEn?: string;
  image?: any;
  imagePages?: any[];
}

export interface Story {
  id: string;
  type?: BookType;
  titleEn: string;
  titleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  contentEn?: string;
  contentHi?: string;
  categoryEn?: string;
  categoryHi?: string;
  image?: any;
  imagePages?: any[];
  pdfUrl?: string;
  readingTimeMin?: number;
  sourceEn?: string;
  sourceHi?: string;
  difficultyEn?: string;
  difficultyHi?: string;
  moralEn?: string;
  moralHi?: string;
  shloka?: string;
  shlokaTranslationEn?: string;
  shlokaTranslationHi?: string;
  keywords?: string;
  pages?: StoryPage[];
}

export const TextBooks: Story[] = [
  {
    id: 'TextBook_GitaKarmaYoga',
    type: 'text',

    titleEn: 'Bhagavad Gita: Essence of Karma Yoga',
    titleHi: 'श्रीमद्भगवद्गीता: कर्मयोग का दिव्य संदेश',

    descriptionEn:
      'Lord Krishna explains the profound philosophy of Karma Yoga to Arjuna on the battlefield of Kurukshetra, teaching how to act without selfish desires.',

    descriptionHi:
      'कुरुक्षेत्र की रणभूमि में भगवान श्रीकृष्ण द्वारा अर्जुन को निष्काम कर्मयोग का दिव्य उपदेश, जो जीवन में कर्तव्य और शांति का मार्ग दिखाता है।',

    categoryEn: 'Sacred Scriptures',
    categoryHi: 'पवित्र धर्मग्रंथ',

    image: imagePath.Krishna,

    pages: [
      {
        page: 1,

        image: [imagePath.karm, imagePath.karm],

        sourceHi: 'श्रीमद्भगवद्गीता, द्वितीय अध्याय',

        contentHi: `कुरुक्षेत्र की पावन रणभूमि पर, जब शंखों की गूंज और वीरों का गर्जन गूंज रहा था, महाबली अर्जुन का हृदय अचानक विषाद और संशय से भर गया। अपने सामने पूज्य गुरुजनों, भाइयों और सगे-संबंधियों को शत्रु के रूप में देखकर उनके हाथ से गांडीव धनुष फिसल गया और वे रथ के पिछले भाग में बैठ गए।`,

        shloka:
          'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',

        shlokaTranslationHi:
          'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल की इच्छा से प्रेरित न हो, और न ही कर्म न करने में तुम्हारी आसक्ति हो।',
      },

      {
        page: 2,

        sourceHi: 'श्रीमद्भगवद्गीता, द्वितीय अध्याय',

        contentHi: `अपने प्रिय सखा और शिष्य को मोह में डूबा देखकर भगवान श्रीकृष्ण ने मुस्कुराते हुए जीवन के सर्वोच्च सत्य का उद्घाटन किया:

"हे अर्जुन! तुम उनके लिए शोक कर रहे हो जो शोक के योग्य नहीं हैं। ज्ञानी जन न तो जीवितों के लिए शोक करते हैं और न ही मृतकों के लिए। जैसे जीवात्मा इस देह में बालपन, यौवन और वृद्धावस्था को प्राप्त करती है, वैसे ही देहांत के बाद अन्य शरीर धारण करती है। आत्मा अमर, अविनाशी और शाश्वत है; इसे न शस्त्र काट सकते हैं, न अग्नि जला सकती है, न जल भिगो सकता है और न वायु सुखा सकती है।"`,

        shloka:
          'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',

        shlokaTranslationHi:
          'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल की इच्छा से प्रेरित न हो, और न ही कर्म न करने में तुम्हारी आसक्ति हो।',
      },

      {
        page: 3,

        sourceHi: 'श्रीमद्भगवद्गीता, द्वितीय अध्याय',

        contentHi: `इसके उपरांत भगवान ने कर्मयोग का वह दिव्य रहस्य समझाया जो हर युग में मनुष्य को कर्तव्य पथ पर अग्रसर करता है:

"हे धनंजय! सफलता और असफलता में समान भाव रखकर, फल की आसक्ति त्यागकर अपने कर्तव्य कर्म में लीन हो जाओ। मन का यह समत्व भाव ही 'योग' कहलाता है। जो मनुष्य फल की कामना छोड़कर केवल कर्तव्य समझकर कर्म करता है, वह कर्म बंधनों में कभी नहीं बंधता, जैसे कमल का पत्ता जल में रहते हुए भी जल से अछूता रहता है।"`,

        shloka:
          'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',

        shlokaTranslationHi:
          'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल की इच्छा से प्रेरित न हो, और न ही कर्म न करने में तुम्हारी आसक्ति हो।',
      },

      {
        page: 4,

        sourceHi: 'श्रीमद्भगवद्गीता, द्वितीय अध्याय',

        contentHi: `भगवान ने स्पष्ट किया कि कर्म हमें नहीं बांधते, बल्कि परिणाम की चिंता और अहंकार हमें बांधता है। जब हम प्रत्येक कर्म को ईश्वर का कार्य मानकर पूरी निष्ठा से करते हैं, तब मन निर्मल और स्थिर हो जाता है।`,

        shloka:
          'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',

        shlokaTranslationHi:
          'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल की इच्छा से प्रेरित न हो, और न ही कर्म न करने में तुम्हारी आसक्ति हो।',

        moralHi:
          'जीवन में सच्ची शांति और सफलता तब मिलती है जब हम फल की चिंता छोड़कर पूरे समर्पण और निष्ठा के साथ अपना कर्तव्य निभाते हैं।',
      },
    ],

    keywords:
      'gita, bhagavad gita, krishna, arjun, arjuna, karma, karma yoga, kurukshetra, duty, wisdom, shloka, गीता, भगवद्गीता, कृष्ण, अर्जुन, कर्मयोग, कुरुक्षेत्र, निष्काम कर्म',
  },
];
export const MahaBharatStories: Story[] = [
  {
    id: 'MahaBharatStory1',
    type: 'comic',
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
    type: 'comic',
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
    type: 'comic',
    titleEn: 'Eklavya: The Archer',
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
    type: 'comic',
    titleEn: "Karna's Kavach & Kundal",
    titleHi: 'कर्ण का कवच और कुंडल',
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

export const AllBooks: Story[] = [...TextBooks, ...MahaBharatStories];

export const findStoryById = (id: string): Story | undefined => {
  return AllBooks.find((s: Story) => s.id === id);
};
