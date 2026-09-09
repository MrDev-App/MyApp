import imagePath from '../assets';

export type BookType = 'comic' | 'text' | 'pdf';

export interface Story {
  id: string;
  type?: BookType;
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
  pdfUrl?: string;
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
  keywords?: string;
}

export const TextBooks: Story[] = [
  {
    id: 'TextBook_GitaKarmaYoga',
    type: 'text',
    titleEn: 'Bhagavad Gita: Essence of Karma Yoga',
    titleHi: 'श्रीमद्भगवद्गीता: कर्मयोग का दिव्य संदेश',
    subtitleEn: 'Selfless Action Without Attachment',
    subtitleHi: 'अनासक्त कर्म और कर्तव्य निष्ठा',
    descriptionEn:
      'Lord Krishna explains the profound philosophy of Karma Yoga to Arjuna on the battlefield of Kurukshetra, teaching how to act without selfish desires.',
    descriptionHi:
      'कुरुक्षेत्र की रणभूमि में भगवान श्रीकृष्ण द्वारा अर्जुन को निष्काम कर्मयोग का दिव्य उपदेश, जो जीवन में कर्तव्य और शांति का मार्ग दिखाता है।',
    categoryEn: 'Sacred Scriptures',
    categoryHi: 'पवित्र धर्मग्रंथ',
    image: imagePath.Krishna,
    readingTimeMin: 5,
    sourceEn: 'Shrimad Bhagavad Gita, Chapter 2',
    sourceHi: 'श्रीमद्भगवद्गीता, द्वितीय अध्याय',
    difficultyEn: 'Intermediate',
    difficultyHi: 'मध्यम',
    shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    shlokaTranslationEn:
      'You have a right only to perform your prescribed duty, but you are never entitled to the fruits of action. Never consider yourself the cause of the results, and never be attached to inaction.',
    shlokaTranslationHi:
      'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल की इच्छा से प्रेरित न हो, और न ही कर्म न करने में तुम्हारी आसक्ति हो।',
    moralEn:
      'True peace and mastery over life come when you focus completely on giving your best effort, without being crippled by anxiety over success or failure.',
    moralHi:
      'जीवन में सच्ची शांति और सफलता तब मिलती है जब हम फल की चिंता छोड़कर पूरे समर्पण और निष्ठा के साथ अपना कर्तव्य निभाते हैं।',
    keywords:
      'gita, bhagavad gita, krishna, arjun, arjuna, karma, karma yoga, kurukshetra, duty, wisdom, shloka, गीता, भगवद्गीता, कृष्ण, अर्जुन, कर्मयोग, कुरुक्षेत्र, निष्काम कर्म',
    contentEn: `On the sacred battlefield of Kurukshetra, amidst the deafening sounds of conch shells and roaring warriors, Prince Arjuna was overcome with sudden grief and hesitation. Looking upon his teachers, cousins, and lifelong friends lined up on the opposite side, his bow, Gandiva, slipped from his trembling hands.

Seeing his beloved disciple paralyzed by sorrow, Lord Krishna smiled gently and revealed the eternal truth of human existence:

"Arjuna, you grieve for those who do not warrant grief. The truly wise lament neither for the living nor for the dead. Just as the embodied soul passes through childhood, youth, and old age in this body, it similarly passes into another body at death. The soul is eternal, unborn, imperishable, and cannot be harmed by fire, water, wind, or weapons."

Lord Krishna then introduced the timeless master-key to living with boundless energy and peace of mind — the path of Karma Yoga:

"Perform your duties steadfastly, O Arjuna, abandoning all selfish attachment to success or failure. Such equanimity of mind is called Yoga. When a person acts purely out of duty, offering every effort as an offering to the Divine, they remain untouched by sin, just as a lotus leaf is untouched by water."

The Lord explained that it is not action that binds human beings, but the anxious attachment to the fruits of action. When we let go of anxiety regarding outcomes and pour our heart into the righteous action itself, our mind becomes steady like a flame in a windless sanctuary.`,
    contentHi: `कुरुक्षेत्र की पावन रणभूमि पर, जब शंखों की गूंज और वीरों का गर्जन गूंज रहा था, महाबली अर्जुन का हृदय अचानक विषाद और संशय से भर गया। अपने सामने पूज्य गुरुजनों, भाइयों और सगे-संबंधियों को शत्रु के रूप में देखकर उनके हाथ से गांडीव धनुष फिसल गया और वे रथ के पिछले भाग में बैठ गए।

अपने प्रिय सखा और शिष्य को मोह में डूबा देखकर भगवान श्रीकृष्ण ने मुस्कुराते हुए जीवन के सर्वोच्च सत्य का उद्घाटन किया:

"हे अर्जुन! तुम उनके लिए शोक कर रहे हो जो शोक के योग्य नहीं हैं। ज्ञानी जन न तो जीवितों के लिए शोक करते हैं और न ही मृतकों के लिए। जैसे जीवात्मा इस देह में बालपन, यौवन और वृद्धावस्था को प्राप्त करती है, वैसे ही देहांत के बाद अन्य शरीर धारण करती है। आत्मा अमर, अविनाशी और शाश्वत है; इसे न शस्त्र काट सकते हैं, न अग्नि जला सकती है, न जल भिगो सकता है और न वायु सुखा सकती है।"

इसके उपरांत भगवान ने कर्मयोग का वह दिव्य रहस्य समझाया जो हर युग में मनुष्य को कर्तव्य पथ पर अग्रसर करता है:

"हे धनंजय! सफलता और असफलता में समान भाव रखकर, फल की आसक्ति त्यागकर अपने कर्तव्य कर्म में लीन हो जाओ। मन का यह समत्व भाव ही 'योग' कहलाता है। जो मनुष्य फल की कामना छोड़कर केवल कर्तव्य समझकर कर्म करता है, वह कर्म बंधनों में कभी नहीं बंधता, जैसे कमल का पत्ता जल में रहते हुए भी जल से अछूता रहता है।"

भगवान ने स्पष्ट किया कि कर्म हमें नहीं बांधते, बल्कि परिणाम की चिंता और अहंकार हमें बांधता है। जब हम प्रत्येक कर्म को ईश्वर का कार्य मानकर पूरी निष्ठा से करते हैं, तब मन निर्मल और स्थिर हो जाता है।`,
  },
  {
    id: 'TextBook_SundarkandBhakti',
    type: 'text',
    titleEn: 'Sundarkand: The Leap of Devotion',
    titleHi: 'सुंदरकांड: अगाध भक्ति और सामर्थ्य',
    subtitleEn: 'Hanumanji’s Legendary Flight to Lanka',
    subtitleHi: 'पवनपुत्र हनुमान का लंका गमन',
    descriptionEn:
      'The glorious episode of Hanumanji crossing the vast ocean through unwavering faith in Lord Rama, overcoming formidable hurdles with humility and divine strength.',
    descriptionHi:
      'श्री राम के अनन्य भक्त हनुमान जी द्वारा अगाध समुद्र को लांघकर लंका पहुंचने और माता सीता की खोज करने की अलौकिक व प्रेरणादायी कथा।',
    categoryEn: 'Ramayana',
    categoryHi: 'रामायण',
    image: imagePath.Hanuman,
    readingTimeMin: 6,
    sourceEn: 'Ramcharitmanas, Sundarkand',
    sourceHi: 'श्रीरामचरितमानस, सुंदरकांड',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    shloka: 'अतुलितबलधामं हेमशैलाभदेहं\nदनुजवनकृशानुं ज्ञानिनामग्रगण्यम्।\nसकलगुणनिधानं वानराणामधीशं\nरघुपतिप्रियभक्तं वातजातं नमामि॥',
    shlokaTranslationEn:
      'I bow to Hanuman, the abode of immeasurable strength, glowing like a mountain of gold, the foremost among the wise, the repository of all virtues, and the beloved devotee of Lord Rama.',
    shlokaTranslationHi:
      'अतुलनीय बल के धाम, स्वर्ण पर्वत के समान कांतियुक्त शरीर वाले, ज्ञानियों में सर्वश्रेष्ठ, सभी दिव्य गुणों के भंडार और श्री राम के परम प्रिय भक्त पवनपुत्र हनुमान को मैं प्रणाम करता हूँ।',
    moralEn:
      'No obstacle is insurmountable when our strength is united with selfless devotion and pure intention. Humility in triumph is the truest badge of greatness.',
    moralHi:
      'जब हमारे संकल्प में स्वार्थ के स्थान पर ईश्वर-भक्ति और समर्पण होता है, तो कोई भी बाधा असंभव नहीं रहती। विनम्रता ही सच्चे बल का आभूषण है।',
    keywords:
      'sundarkand, hanuman, rama, ram, sita, lanka, ocean, surasa, mainak, bhakti, devotion, ramcharitmanas, सुंदरकांड, हनुमान, राम, सीता, लंका, समुद्र, भक्ति, श्रीरामचरितमानस',
    contentEn: `Sitting on the shores of the southern ocean, the Vanara army looked out over the vast, roaring waters in utter despair. A hundred yojanas of surging waves separated them from Lanka, where Mother Sita was held captive. Who possessed the immense might to bridge this infinite expanse?

Then, the venerable elder Jambavan walked over to Hanuman, who was seated quietly in deep meditation, oblivious to his own boundless power. Jambavan spoke softly:

"Why are you silent, O son of the Wind? You are as swift as thought and as powerful as the tempest. There is no task in the three worlds that is difficult for you. Awake to your sacred mission for Lord Rama!"

Upon hearing the name of Rama and remembering his innate divinity, Hanuman began to expand into a magnificent, colossal form. His golden radiance illuminated the surrounding hills. Bowing deeply in reverence to Lord Rama and his elders, he declared:

"I shall leap across this ocean as effortlessly as Lord Rama's celestial arrow. Until I find Mother Sita, I shall know no rest!"

Leaping from Mount Mahendra with a thunderous roar, the very mountain sank beneath the sheer force of his departure. In mid-air, the golden mountain Mainak rose from the ocean depths to offer him rest. But Hanuman touched it tenderly with his hand and smiled: "Until Rama's work is accomplished, there can be no rest for me."

Overcoming the cunning demoness Surasa through wisdom rather than brute force, and destroying the shadow-catching Simhika, Hanuman landed gracefully on the shores of Lanka — proving that true power shines brightest when coupled with absolute surrender to the Divine.`,
    contentHi: `दक्षिण समुद्र के विशाल तट पर बैठी वानर सेना अथाह, गर्जना करती लहरों को देखकर अत्यंत निराश हो चुकी थी। सौ योजन लंबा उफनता सागर उनके और लंका के बीच दीवार बनकर खड़ा था, जहां माता सीता बंदी थीं। इतना विशाल सागर लांघने का साहस किसमें था?

तभी वयोवृद्ध जाम्बवंत जी शांत भाव से ध्यानमग्न बैठे पवनपुत्र हनुमान जी के पास पहुंचे, जो अपनी असीम शक्तियों से सर्वथा अनभिज्ञ थे। जाम्बवंत जी ने प्रेमपूर्वक स्मरण कराया:

"कवन सो काज कठिन जग माहीं। जो नहिं होइ तात तुम्ह पाहीं॥\nहे पवनपुत्र! आप पवन के समान वेगवान, बुद्धि और बल के सागर हैं। श्री राम के कार्य के लिए ही आपका यह पावन अवतार हुआ है। उठिए और अपने स्वरूप को पहचानिए!"

प्रभु श्री राम का नाम सुनते ही हनुमान जी का शरीर पर्वताकार हो गया। उनकी स्वर्णिम कांति से दसों दिशाएं आलोकित हो उठीं। उन्होंने दोनों हाथ जोड़कर श्री राम और अग्रजों को प्रणाम किया और गर्जना की:

"मैं श्री राम के बाण की गति से इस सागर को पार करूँगा और जब तक माता सीता का दर्शन नहीं कर लेता, तब तक विश्राम नहीं लूँगा!"

महेंद्र पर्वत से जब उन्होंने छलांग लगाई, तो पर्वत पाताल की ओर झुक गया। आकाश मार्ग में समुद्र से मैनाक पर्वत ने प्रकट होकर विश्राम का अनुरोध किया। हनुमान जी ने उसे हाथ जोड़कर आदरपूर्वक स्पर्श किया और कहा—"राम काज कीन्हें बिनु मोहि कहां विश्राम।"

आगे चलकर उन्होंने बुद्धि-चातुर्य से सुरसा का मान रखा और छाया पकड़ने वाली सिंहिका का वध किया। वे अत्यंत सुगमता से लंका के तट पर उतरे—यह सिद्ध करते हुए कि जहां प्रभु पर पूर्ण विश्वास हो, वहां असीम समुद्र भी गोखुर के समान लघु हो जाता है।`,
  },
  {
    id: 'TextBook_ShivaNeelkanth',
    type: 'text',
    titleEn: 'Shiva Mahapuran: The Neelkanth Mahadev',
    titleHi: 'शिव महापुराण: नीलकंठ महादेव की पावन कथा',
    subtitleEn: 'The Drinking of the World-Consuming Halahala Poison',
    subtitleHi: 'संसार की रक्षा हेतु हलाहल विष का पान',
    descriptionEn:
      'When the cosmic ocean churning released the deadly Halahala poison threatening all creation, Mahadev Lord Shiva consumed it out of boundless compassion.',
    descriptionHi:
      'समुद्र मंथन से उत्पन्न भयंकर हलाहल विष से जब समस्त ब्रह्मांड जलने लगा, तब करुणासिंधु भगवान शिव ने संसार की रक्षा के लिए उस विष को अपने कंठ में धारण किया।',
    categoryEn: 'Puranas',
    categoryHi: 'पुराण गाथा',
    image: imagePath.Bholenath,
    readingTimeMin: 5,
    sourceEn: 'Shiva Mahapurana, Rudra Samhita',
    sourceHi: 'शिव महापुराण, रुद्र संहिता',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    shloka: 'कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
    shlokaTranslationEn:
      'I bow to Lord Shiva, who is white as camphor, the embodiment of infinite compassion, the essence of the universe, garlanded by the serpent king, and forever dwelling in the lotus of the heart with Mother Bhavani.',
    shlokaTranslationHi:
      'कर्पूर के समान उज्ज्वल, करुणा के साक्षात अवतार, संसार के सारतत्व, सर्पराज का हार धारण करने वाले तथा माता भवानी सहित हृदय कमल में निवास करने वाले भगवान शिव को मैं नमन करता हूँ।',
    moralEn:
      'Greatness is not demonstrated by taking, but by fearlessly absorbing negativity and suffering so that the innocent may thrive in peace.',
    moralHi:
      'सच्ची महानता प्राप्त करने में नहीं, बल्कि संसार के कल्याण के लिए विष और कष्टों को स्वयं सहकर दूसरों को अमृत प्रदान करने में है।',
    keywords:
      'shiva, shiv, mahadev, bhole, bholenath, neelkanth, halahala, poison, samudra manthan, ocean churning, purana, shiva purana, शिव, महादेव, नीलकंठ, हलाहल, समुद्र मंथन, शिव पुराण',
    contentEn: `In ancient cosmic times, the Devas and Asuras united to churn the great Milky Ocean (Kshira Sagara) in search of Amrita, the nectar of immortality. Mount Mandara served as the churning rod, and the great serpent Vasuki acted as the churning rope.

As the mighty churning gained momentum, the deep ocean began to boil and crack. Suddenly, instead of the coveted nectar, a terrifying dark, fiery fumes billowed forth. It was Halahala — the deadliest cosmic poison in existence, capable of burning the three worlds to ashes.

The scorching fumes spread rapidly across creation. The gods and demons alike choked in agony and fled in horror. Seeing no salvation, Lord Brahma and Lord Vishnu led all beings to Mount Kailash to seek refuge at the feet of Lord Shiva.

Mahadev listened patiently to their desperate cries. He looked at Goddess Parvati with tender compassion and said: "Devi, all beings are terrified of destruction. As the protector of this cosmos, it is my duty to shelter them. I shall drink this deadly poison."

Mother Parvati, knowing the supreme divinity and immense compassion of her Lord, smiled serenely and gave her consent.

Collecting the blazing sea of Halahala in his palms, Lord Shiva drank it as if it were sweet nectar. To prevent the venom from harming the universe residing within his stomach, Goddess Parvati gently placed her hands around his throat, holding the poison right there.

The poison stained Lord Shiva's neck a magnificent divine blue, earning him the eternal name "Neelkanth" — the Blue-Throated Savior of the Universe.`,
    contentHi: `प्राचीन काल में देवों और दानवों ने अमरता का अमृत प्राप्त करने के लिए क्षीरसागर का मंथन करने का निश्चय किया। मंदराचल पर्वत को मथानी और नागराज वासुकि को नेती बनाया गया।

जैसे-जैसे मंथन की गति तीव्र हुई, सागर के गर्भ से भीषण ताप और विकराल ज्वालाएं उठने लगीं। अमृत से पूर्व सागर से निकला 'हलाहल'—वह प्रलयंकारी विष, जिसकी एक बूंद से तीनों लोकों का विनाश निश्चित था।

विष की तीक्ष्ण ज्वालाओं से संपूर्ण ब्रह्मांड जलने लगा। देव और दानव त्राहि-त्राहि करते हुए भयभीत होकर भागने लगे। जब कोई उपाय न दिखा, तो भगवान ब्रह्मा और श्री हरि विष्णु के नेतृत्व में समस्त देवता देवाधिदेव महादेव की शरण में कैलाश पर्वत पहुंचे।

महादेव ने उनकी करुण पुकार सुनी। उन्होंने माता पार्वती की ओर देखते हुए कहा: "हे भवानी! समस्त प्राणी विनाश के कगार पर हैं। संसार की रक्षा करना मेरा परम धर्म है। मैं इस विष का पान करूँगा।"

माता पार्वती ने भगवान शिव की अगाध सामर्थ्य और लोक-कल्याण की भावना को जानकर सहर्ष स्वीकृति दी।

भगवान शिव ने उस प्रलयंकारी विष को अपनी हथेलियों में समेटा और बिना किसी झिझक के उसे पी लिया। विष को उनके उदर में स्थित समस्त संसार तक पहुंचने से रोकने के लिए माता पार्वती ने उनके कंठ को थाम लिया।

उस हलाहल के प्रभाव से महादेव का कंठ नीले रंग का हो गया, और उसी दिन से वे संपूर्ण जगत में 'नीलकंठ महादेव' के पावन नाम से पूजे जाने लगे।`,
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
  return AllBooks.find(s => s.id === id);
};
