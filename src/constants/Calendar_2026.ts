export interface Festival2026 {
  id: string;
  name: string;
  nameHi: string;
  englishName: string;
  hindiName: string;
  date: string; // ISO format: YYYY-MM-DD
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  dayOfWeekHi: string;
  dateStrEn: string;
  dateStrHi: string;
  tithi: string;
  tithiHi: string;
  description: string;
  descriptionHi: string;
  story?: string;
  storyHi?: string;
  category: string;
  categoryHi: string;
  deity?: string[];
  deityHi?: string[];
  regions?: string[];
  regionsHi?: string[];
  imageUrl: string;
  url: string;
}

export interface CalendarMonth2026 {
  month: number;
  monthName: string;
  monthNameHi: string;
  festivals: Festival2026[];
}

const MONTH_NAMES: { en: string; hi: string }[] = [
  { en: 'January', hi: 'जनवरी' },
  { en: 'February', hi: 'फरवरी' },
  { en: 'March', hi: 'मार्च' },
  { en: 'April', hi: 'अप्रैल' },
  { en: 'May', hi: 'मई' },
  { en: 'June', hi: 'जून' },
  { en: 'July', hi: 'जुलाई' },
  { en: 'August', hi: 'अगस्त' },
  { en: 'September', hi: 'सितंबर' },
  { en: 'October', hi: 'अक्टूबर' },
  { en: 'November', hi: 'नवंबर' },
  { en: 'December', hi: 'दिसंबर' },
];

export const CALENDAR_2026: Festival2026[] = [
  {
    id: 'shattila_ekadashi_2026_01_13',
    name: 'Shattila Ekadashi',
    nameHi: 'षट्तिला एकादशी',
    englishName: 'Shattila Ekadashi',
    hindiName: 'षट्तिला एकादशी',
    date: '2026-01-13',
    year: 2026,
    month: 1,
    day: 13,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'January 13, 2026, Tuesday',
    dateStrHi: 'जनवरी 13, 2026, मंगलवार',
    tithi: 'Magha, Krishna Ekadashi',
    tithiHi: 'माघ, कृष्ण एकादशी',
    description:
      'Sacred fast involving 6 distinct uses of sesame seeds (Til) for physical purity and spiritual merit.',
    descriptionHi:
      'माघ मास के कृष्ण पक्ष की एकादशी, जिसमें तिल के 6 रूपों में उपयोग से पापों का नाश और पुण्य प्राप्त होता है।',
    story:
      'According to the Bhavishyottara Purana, Lord Krishna narrated this story to Sage Dalbhya. Once, a wealthy Brahmin woman performed severe austerities and charity, but never donated food or grains to the needy or Brahmins. To teach her the value of Annadanam (food donation), Lord Vishnu visited her in the disguise of a mendicant asking for alms. Instead of food, she arrogantly dropped a lump of clay into His begging bowl. When she eventually died and ascended to heaven, she received a grand palace, but it was completely empty of food and wealth. Distressed, she prayed to Lord Vishnu, who advised her to observe Shattila Ekadashi when celestial maidens visit her. She followed the ritual—using sesame seeds in six sacred ways (bathing, paste, yajna, water oblation, donation, and consumption). As a result, her home was filled with divine nourishment, prosperity, and spiritual liberation.',
    storyHi:
      'भविष्योत्तर पुराण के अनुसार, भगवान श्रीकृष्ण ने महर्षि दालभ्य को इस एकादशी की कथा सुनाई थी। एक समय एक धर्मपरायण ब्राह्मणी ने बहुत दान-पुण्य और तप किया, परंतु उसने कभी अन्न का दान नहीं किया। उसकी परीक्षा लेने हेतु भगवान विष्णु भिक्षुक रूप में पधारे और भिक्षा मांगी। ब्राह्मणी ने क्रोध में आकर भगवान के पात्र में मिट्टी का ढेला डाल दिया। देहावसान के बाद जब वह वैकुंठ पहुंची, तो उसे एक सुंदर महल मिला परंतु वह अन्न और धन से पूरी तरह रिक्त था। उसने व्याकुल होकर श्रीहरि की प्रार्थना की। भगवान ने उसे देवकन्याओं से षट्तिला एकादशी व्रत की विधि जानकर व्रत करने का निर्देश दिया। उसने तिल के 6 रूपों (तिल स्नान, तिल उबटन, तिल हवन, तिल तर्पण, तिल दान और तिल भोजन) से यह व्रत पूर्ण किया, जिससे उसका भवन समस्त सुख-समृद्धि और दिव्य अन्न से भर गया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu'],
    deityHi: ['भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/shattila/shattila-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'makara_sankranti_2026_01_14',
    name: 'Makara Sankranti',
    nameHi: 'मकर संक्रांति',
    englishName: 'Makara Sankranti',
    hindiName: 'मकर संक्रांति',
    date: '2026-01-14',
    year: 2026,
    month: 1,
    day: 14,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'January 14, 2026, Wednesday',
    dateStrHi: 'जनवरी 14, 2026, बुधवार',
    tithi: 'Dhanu to Makara transit of Sun',
    tithiHi: 'सूर्य का धनु से मकर राशि में प्रवेश',
    description:
      'Celebration of the Sun God’s northward celestial journey (Uttarayan) into Capricorn.',
    descriptionHi:
      'सूर्य देव के मकर राशि में प्रवेश और उत्तरायण काल के शुभारंभ का पावन पर्व।',
    story:
      'According to Vedic scriptures and the Puranas, on Makara Sankranti the Sun God (Surya) enters the zodiac sign of Capricorn (Makara), which is ruled by His son Saturn (Lord Shani). Despite differences between father and son, Surya Deva visits Shani on this day for a month, symbolizing the triumph of love, forgiveness, and family harmony. In the Mahabharata, the patriarch Bhishma, blessed with the boon of Iccha-Mrityu (death at will), waited on the bed of arrows (Shara-shayya) until the auspicious onset of Uttarayan on Makara Sankranti to leave his mortal body and attain liberation. It is also believed that on this sacred day, Goddess Ganga followed King Bhagiratha and merged with the ocean at Gangasagar to liberate the 60,000 sons of King Sagara.',
    storyHi:
      'पौराणिक मान्यताओं के अनुसार, मकर संक्रांति के दिन सूर्य देव अपने पुत्र शनि देव की राशि मकर में प्रवेश करते हैं। पिता-पुत्र के मध्य वैचारिक मतभेद होने के बावजूद सूर्य देव इस दिन स्वयं शनि के घर पधारते हैं, जो कटुता भुलाकर संबंधों में प्रेम व क्षमा का संदेश देता है। महाभारत काल में भीष्म पितामह ने इच्छा मृत्यु के वरदान से बाणों की शय्या पर रहते हुए अपने प्राण त्यागने के लिए उत्तरायण और मकर संक्रांति की प्रतीक्षा की थी। इसी दिन महाराज भगीरथ के पीछे-पीछे मां गंगा कपिल मुनि के आश्रम से होते हुए सागर में मिली थीं और राजा सगर के साठ हजार पुत्रों को मोक्ष प्रदान किया था। इसलिए इस दिन गंगा स्नान और तिल-गुड़ दान का विशेष महत्व है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Surya', 'Lord Shani'],
    deityHi: ['सूर्य देव', 'शनि देव'],
    regions: [
      'All India',
      'North India',
      'Maharashtra',
      'Gujarat',
      'South India (Pongal)',
    ],
    regionsHi: [
      'समग्र भारत',
      'उत्तर भारत',
      'महाराष्ट्र',
      'गुजरात',
      'दक्षिण भारत (पोंगल)',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/sankranti/makar-sankranti-date-time.html?year=2026',
  },
  {
    id: 'vasant_panchami_2026_01_23',
    name: 'Vasant Panchami',
    nameHi: 'वसन्त पञ्चमी',
    englishName: 'Vasant Panchami',
    hindiName: 'वसन्त पञ्चमी',
    date: '2026-01-23',
    year: 2026,
    month: 1,
    day: 23,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'January 23, 2026, Friday',
    dateStrHi: 'जनवरी 23, 2026, शुक्रवार',
    tithi: 'Magha, Shukla Panchami',
    tithiHi: 'माघ, शुक्ल पञ्चमी',
    description:
      'Appearance day of Goddess Saraswati, patron of wisdom, arts, music, and learning.',
    descriptionHi:
      'विद्या, बुद्धि, वाणी और संगीत की अधिष्ठात्री देवी मां सरस्वती के प्राकट्य का पावन उत्सव।',
    story:
      'According to the Matsya Purana and Brahma Vaivarta Purana, after creating the universe, trees, animals, and humans, Lord Brahma felt the creation was silent and devoid of joy and sound. Brahma sprinkled sacred water from his Kamandalu into the air. From the divine mist emerged Goddess Saraswati holding a Veena, rosary (Akshamala), and sacred scriptures, radiating pure white light. As She played the celestial Veena, all elements of creation received voice, music, wisdom, and rhythm. Thus, Magha Shukla Panchami came to be celebrated as Saraswati Jayanti and Vasant Panchami, marking the advent of spring and worship of books and learning instruments (Akshar Abhyasam).',
    storyHi:
      'पुराणों के अनुसार सृष्टि की रचना के बाद ब्रह्मा जी ने देखा कि संसार बिल्कुल शांत और नीरस है, किसी जीव में वाणी नहीं थी। तब ब्रह्मा जी ने अपने कमंडल से जल छिड़का। उस जलकण से एक दिव्य चतुर्भुजी देवी प्रकट हुईं, जिनके हाथों में वीणा, वरद मुद्रा, पुस्तक और स्फटिक माला थी। जब देवी ने अपनी वीणा के तारों को झंकृत किया, तो समस्त चराचर जगत को मधुर वाणी, संगीत और ज्ञान प्राप्त हुआ। ब्रह्मा जी ने उन्हें वाणी की देवी सरस्वती नाम दिया। जिस दिन मां सरस्वती का प्राकट्य हुआ, वह माघ शुक्ल पंचमी थी। इसलिए इस दिन वसंत पंचमी पर मां सरस्वती का पूजन व विद्यारंभ संस्कार किया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Saraswati'],
    deityHi: ['मां सरस्वती'],
    regions: ['All India', 'West Bengal', 'Bihar', 'Uttar Pradesh', 'Punjab'],
    regionsHi: ['समग्र भारत', 'पश्चिम बंगाल', 'बिहार', 'उत्तर प्रदेश', 'पंजाब'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/vasant-panchami/vasant-panchami-date-time.html?year=2026',
  },
  {
    id: 'jaya_ekadashi_2026_01_28',
    name: 'Jaya Ekadashi',
    nameHi: 'जया एकादशी',
    englishName: 'Jaya Ekadashi',
    hindiName: 'जया एकादशी',
    date: '2026-01-28',
    year: 2026,
    month: 1,
    day: 28,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'January 28, 2026, Wednesday',
    dateStrHi: 'जनवरी 28, 2026, बुधवार',
    tithi: 'Magha, Shukla Ekadashi',
    tithiHi: 'माघ, शुक्ल एकादशी',
    description:
      'Auspicious Ekadashi that absolves severe curses and frees souls from ghostly realms.',
    descriptionHi:
      'माघ शुक्ल पक्ष की एकादशी जो सभी पापों से मुक्ति और पिशाच योनि से उद्धार दिलाने वाली है।',
    story:
      'In the Padma Purana, Lord Krishna narrates the legend of Jaya Ekadashi to King Yudhishthira. In the celestial court of Lord Indra (Nandanvan), a Gandharva named Malyavan and an Apsara named Pushyavati were enchanted by each other and lost rhythm during an auspicious dance performance. Enraged by their insolence, Indra cursed them to fall from heaven and take birth in the freezing Himalayas as miserable Pisachas (ghosts/demons). Suffering immense agony and hunger in the cold mountains, they unknowingly observed a complete fast on Magha Shukla Ekadashi and stayed awake all night in repentance under a Peepal tree. Pleased by their austere fasting, Lord Vishnu redeemed them from the curse, restored their celestial Gandharva forms, and welcomed them back to the heavens.',
    storyHi:
      'पद्म पुराण में वर्णित कथा के अनुसार, इंद्र की सभा में गंधर्व माल्यवान और नृत्यांगना पुष्पवती एक-दूसरे पर मोहित होकर संगीत की ताल और मर्यादा भूल गए। इस अनुशासनहीनता से क्रोधित होकर देवराज इंद्र ने दोनों को स्वर्ग से निष्कासित कर पिशाच योनि में भटकने का शाप दे दिया। वे दोनों हिमालय के दुर्गम व शीत प्रदेश में भयानक कष्ट भोगने लगे। माघ मास के शुक्ल पक्ष की एकादशी के दिन ठंड और दुख के कारण उन्होंने पूरे दिन निराहार रहकर रात भर जागरण किया। अनजाने में उनसे जया एकादशी का पूर्ण व्रत संपन्न हो गया। इस पुण्य प्रभाव से भगवान विष्णु ने उन्हें पिशाच योनि से मुक्त कर पुनः दिव्य रूप प्रदान किया और स्वर्ग में उनका स्थान लौटा दिया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu'],
    deityHi: ['भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/jaya/jaya-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'vijaya_ekadashi_2026_02_12',
    name: 'Vijaya Ekadashi',
    nameHi: 'विजया एकादशी',
    englishName: 'Vijaya Ekadashi',
    hindiName: 'विजया एकादशी',
    date: '2026-02-12',
    year: 2026,
    month: 2,
    day: 12,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'February 12, 2026, Thursday',
    dateStrHi: 'फरवरी 12, 2026, गुरुवार',
    tithi: 'Phalguna, Krishna Ekadashi',
    tithiHi: 'फाल्गुन, कृष्ण एकादशी',
    description:
      'Bestower of victory over fierce obstacles, battles, and adversities in life.',
    descriptionHi:
      'फाल्गुन कृष्ण पक्ष की एकादशी, जो कठिन परिस्थितियों और शत्रुओं पर विजय दिलाने वाली मानी जाती है।',
    story:
      'According to the Skanda Purana, when Lord Rama was planning to cross the vast ocean to Lanka to rescue Mother Sita, Lakshmana advised Him to consult Sage Bakadalbhya. Lord Rama visited the sage’s hermitage on the seashore and asked how the Vanara army could cross the turbulent ocean and vanquish Ravana. Sage Bakadalbhya instructed Lord Rama to observe the sacred fast of Vijaya Ekadashi along with his army by establishing a sacred Kumbha (pot) filled with water, barley, and gold, worshiping Lord Narayana throughout the night. Lord Rama duly performed the fast and rituals. By its grace, the path over the ocean was bridged (Ram Setu) and Lord Rama achieved absolute victory over Ravana.',
    storyHi:
      'स्कन्द पुराण की कथा के अनुसार, जब मर्यादा पुरुषोत्तम भगवान श्रीराम माता सीता की खोज में लंका पर चढ़ाई करने समुद्र तट पहुंचे, तो विशाल सागर पार करना अत्यंत कठिन लग रहा था। तब लक्ष्मण जी के सुझाव पर श्रीराम महर्षि बकदालभ्य के आश्रम गए। महर्षि ने उन्हें फाल्गुन मास के कृष्ण पक्ष की विजया एकादशी का सविधि व्रत करने का मार्ग बताया। उन्होंने सात धान्य पर कलश स्थापित कर भगवान नारायण का पूजन और रात्रि जागरण करने का विधान बताया। श्रीराम ने अपनी वानर सेना सहित यह पावन व्रत किया, जिसके प्रभाव से समुद्र पर सेतु निर्माण संभव हुआ और श्रीराम ने लंकापति रावण पर ऐतिहासिक विजय प्राप्त की।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Rama', 'Lord Vishnu'],
    deityHi: ['भगवान श्रीराम', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/vijaya/vijaya-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'maha_shivaratri_2026_02_15',
    name: 'Maha Shivaratri',
    nameHi: 'महाशिवरात्रि',
    englishName: 'Maha Shivaratri',
    hindiName: 'महाशिवरात्रि',
    date: '2026-02-15',
    year: 2026,
    month: 2,
    day: 15,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'February 15, 2026, Sunday',
    dateStrHi: 'फरवरी 15, 2026, रविवार',
    tithi: 'Phalguna, Krishna Chaturdashi',
    tithiHi: 'फाल्गुन, कृष्ण चतुर्दशी',
    description:
      'The Great Night of Lord Shiva commemorating His cosmic wedding with Parvati and the manifestation of the Jyotirlinga.',
    descriptionHi:
      'भगवान शिव और माता पार्वती के दिव्य विवाह तथा ज्योतिर्लिंग प्राकट्य का महान रात्रि महोत्सव।',
    story:
      'Maha Shivaratri holds profound scriptural significance described across the Shiva Purana and Linga Purana. Primarily, this is the auspicious night when Lord Shiva married Goddess Parvati, uniting the masculine (Purusha) and feminine (Prakriti) energies of the cosmos. On this midnight (Nishita Kala), Lord Shiva also manifested as the infinite pillar of radiant fire (Jyotirlinga) to resolve the cosmic dispute between Brahma and Vishnu. Additionally, during the churning of the cosmic ocean (Samudra Manthan), deadly poison (Halahala) emerged threatening to consume creation; Lord Shiva compassionately drank the venom, holding it in His throat, turning it blue (Neelkantha) and saving all worlds.',
    storyHi:
      'शिवपुराण के अनुसार महाशिवरात्रि के दिन भगवान शिव और माता पार्वती का शुभ विवाह संपन्न हुआ था, जो शिव और शक्ति के दिव्य मिलन का प्रतीक है। इसी रात्रि को निशीथ काल में भगवान शिव ज्योतिर्लिंग के रूप में प्रकट हुए थे, जिसका न कोई आदि था न अंत। इसके अतिरिक्त, समुद्र मंथन के समय जब हलाहल विष निकला और सृष्टि जलने लगी, तब भगवान शिव ने संसार की रक्षा के लिए वह विष अपने कंठ में धारण किया, जिससे उनका कंठ नीला पड़ गया और वे ‘नीलकंठ’ कहलाए। देवताओं ने विष के ताप को शांत करने के लिए रात्रि भर जल व बेलपत्र अर्पित कर शिवजी का अभिषेक व जागरण किया था।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Shiva', 'Goddess Parvati'],
    deityHi: ['भगवान शिव', 'माता पार्वती'],
    regions: ['All India', 'Varanasi', 'Ujjain', 'Haridwar', 'South India'],
    regionsHi: ['समग्र भारत', 'वाराणसी', 'उज्जैन', 'हरिद्वार', 'दक्षिण भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/maha-shivratri/maha-shivratri-date-time.html?year=2026',
  },
  {
    id: 'amalaki_ekadashi_2026_02_27',
    name: 'Amalaki Ekadashi',
    nameHi: 'आमलकी एकादशी',
    englishName: 'Amalaki Ekadashi',
    hindiName: 'आमलकी एकादशी',
    date: '2026-02-27',
    year: 2026,
    month: 2,
    day: 27,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'February 27, 2026, Friday',
    dateStrHi: 'फरवरी 27, 2026, शुक्रवार',
    tithi: 'Phalguna, Shukla Ekadashi',
    tithiHi: 'फाल्गुन, शुक्ल एकादशी',
    description:
      'Worship of the sacred Amla (Indian Gooseberry) tree embodying Lord Vishnu.',
    descriptionHi:
      'भगवान विष्णु के अंश स्वरूप पवित्र आंवले के वृक्ष के पूजन और मोक्षदायिनी एकादशी का व्रत।',
    story:
      'According to the Brahmanda Purana, the sacred Amla (Amalaki) tree was born directly from the drops of tears of joy shed by Lord Vishnu during cosmic meditation. In ancient times, King Chitrasena of Vaidisha ruled a kingdom where everyone observed Amalaki Ekadashi. Once while hunting in deep forest, the King was surrounded and attacked by fierce forest tribes. As the enemies tried to kill him, a blinding divine fire burst forth from the King’s body, destroying the attackers. When Chitrasena regained consciousness, a celestial voice revealed that this divine protection was the reward for his lifelong devotion to Amalaki Ekadashi. Furthermore, a hunter who spent the night watching the ritual under an Amla tree was reborn as the pious King Vasuratha.',
    storyHi:
      'ब्रह्मांड पुराण के अनुसार, सृष्टि के आरंभ में भगवान विष्णु की तपस्या और आनंद के आंसुओं से आंवले (आमलकी) वृक्ष की उत्पत्ति हुई थी, जिसमें श्रीहरि का वास माना जाता है। वैदिक काल में राजा चित्रसेन अपनी प्रजा सहित इस व्रत का पालन करते थे। एक बार शिकार करते समय डाकुओं और जंगली सैनिकों ने राजा को घेर लिया। जब वे राजा पर प्रहार करने लगे, तभी राजा के शरीर से एक दिव्य शक्ति प्रकट हुई जिसने सभी आतताइयों का संहार कर दिया। आकाशवाणी ने बताया कि यह शक्ति राजा के आमलकी एकादशी व्रत के प्रभाव से उत्पन्न हुई थी। इस दिन आंवले के पेड़ के नीचे बैठकर भगवान विष्णु की पूजा और दीपदान करने से जीवन के सभी पाप धुल जाते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu', 'Amla Tree'],
    deityHi: ['भगवान विष्णु', 'आंवला वृक्ष'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/amalaki/amalaki-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'chhoti_holi_2026_03_02',
    name: 'Chhoti Holi',
    nameHi: 'छोटी होली',
    englishName: 'Chhoti Holi',
    hindiName: 'छोटी होली',
    date: '2026-03-02',
    year: 2026,
    month: 3,
    day: 2,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'March 02, 2026, Monday',
    dateStrHi: 'मार्च 02, 2026, सोमवार',
    tithi: 'Phalguna, Purnima',
    tithiHi: 'फाल्गुन, पूर्णिमा',
    description:
      'Eve of Holi celebrated with prayers, family gatherings, and preparation for Holika Dahan.',
    descriptionHi:
      'होलिका दहन की पूर्व संध्या, जिसमें बुराई के अंत और शुभता के आगमन की मंगलकामना की जाती है।',
    story:
      'Chhoti Holi marks the sacred eve of the grand festival of colors. It commemorates the preparation of the bonfire symbolizing the immolation of demonic pride and negative tendencies. In ancient traditions, households gather dried twigs, wood, and cow-dung cakes (Uple) around the Prahlada pole. It represents the triumph of pure devotion (Bhakti) exemplified by Child Prahlada over tyrannical oppression, preparing the heart and society for celebratory renewal.',
    storyHi:
      'छोटी होली, जिसे होलिका दहन की संध्या भी कहा जाता है, फाल्गुन पूर्णिमा के दिन श्रद्धा और उल्लास से मनाई जाती है। यह दिन भक्त प्रह्लाद की अटूट भक्ति और ईश्वर पर अटूट विश्वास की विजय का साक्षी है। लोग अपने घरों की नकारात्मक ऊर्जा और बुराइयों को अग्नि में भस्म करने के लिए चौराहे पर होलिका तैयार करते हैं और सामूहिक रूप से पूजन कर अगले दिन रंगों की होली के स्वागत की तैयारी करते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu', 'Bhakta Prahlada'],
    deityHi: ['भगवान विष्णु', 'भक्त प्रह्लाद'],
    regions: ['North India', 'Central India', 'West India'],
    regionsHi: ['उत्तर भारत', 'मध्य भारत', 'पश्चिम भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/holi/chhoti-holi-date-time.html?year=2026',
  },
  {
    id: 'holika_dahan_2026_03_02',
    name: 'Holika Dahan',
    nameHi: 'होलिका दहन',
    englishName: 'Holika Dahan',
    hindiName: 'होलिका दहन',
    date: '2026-03-02',
    year: 2026,
    month: 3,
    day: 2,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'March 02, 2026, Monday',
    dateStrHi: 'मार्च 02, 2026, सोमवार',
    tithi: 'Phalguna, Purnima',
    tithiHi: 'फाल्गुन, पूर्णिमा',
    description:
      'Burning of the effigy of Holika, symbolizing the eternal victory of good over evil.',
    descriptionHi:
      'अग्नि में होलिका के भस्म होने और भक्त प्रह्लाद की रक्षा की स्मृति में होलिका दहन का पर्व।',
    story:
      'The timeless legend of Holika Dahan is chronicled in the Vishnu Purana and Bhagavata Purana. The demon king Hiranyakashipu demanded to be worshiped as the supreme God, but his young son Prahlada remained an unyielding devotee of Lord Vishnu (Narayana). Unable to kill Prahlada through poison, snakes, and wild elephants, Hiranyakashipu asked his sister Holika, who possessed a divine boon granting her immunity from fire, to sit in a blazing pyre holding Prahlada in her lap. As the fire raged, Prahlada chanted the name of Lord Narayana; by divine will, the fireproof shawl flew from Holika and wrapped around Prahlada. Holika was burned to ashes for abusing her boon, while Prahlada emerged unhurt.',
    storyHi:
      'विष्णु पुराण और श्रीमद्भागवत के अनुसार, दैत्यराज हिरण्यकश्यप ने स्वयं को भगवान घोषित कर दिया था, किंतु उसका पुत्र प्रह्लाद श्रीहरि विष्णु का अनन्य भक्त था। अनेक यातनाओं के बाद भी जब प्रह्लाद की भक्ति नहीं डिगी, तो हिरण्यकश्यप ने अपनी बहन होलिका (जिसे अग्नि में न जलने का वरदान प्राप्त था) की गोद में प्रह्लाद को बैठाकर चिता में अग्नि लगवा दी। प्रह्लाद निरंतर ‘ॐ नमो भगवते वासुदेवाय’ का जप करते रहे। प्रभु कृपा से वह अग्नि-रोधी वस्त्र उड़कर प्रह्लाद पर आ गया और होलिका जलकर भस्म हो गई, जबकि प्रह्लाद सकुशल बाहर आ गए। तभी से असत्य पर सत्य की विजय के रूप में होलिका दहन किया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Narasimha', 'Bhakta Prahlada'],
    deityHi: ['भगवान नृसिंह', 'भक्त प्रह्लाद'],
    regions: ['All India', 'North India', 'Maharashtra', 'Gujarat'],
    regionsHi: ['समग्र भारत', 'उत्तर भारत', 'महाराष्ट्र', 'गुजरात'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/holi/holika-dahan-date-time.html?year=2026',
  },
  {
    id: 'holi_2026_03_03',
    name: 'Holi',
    nameHi: 'होली',
    englishName: 'Holi',
    hindiName: 'होली',
    date: '2026-03-03',
    year: 2026,
    month: 3,
    day: 3,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'March 03, 2026, Tuesday',
    dateStrHi: 'मार्च 03, 2026, मंगलवार',
    tithi: 'Chaitra, Krishna Pratipada',
    tithiHi: 'चैत्र, कृष्ण प्रतिपदा',
    description:
      'Joyous festival of colors, celebrating divine love of Radha-Krishna and the spring harvest.',
    descriptionHi:
      'रंगों, उल्लास, सामाजिक समरसता और राधा-कृष्ण के दिव्य प्रेम का महापर्व।',
    story:
      'Holi is deeply rooted in the eternal love of Lord Krishna and Radha Rani in Braj Dham (Vrindavan, Mathura, Barsana). In his childhood, Krishna playfully complained to Yashoda about Radha’s fair complexion compared to his dark skin. Mother Yashoda smilingly suggested he smear colored powder onto Radha’s face. Krishna and the Gopis played with natural herbal colors, originating the vibrant tradition of Rangotsav. Holi also celebrates the blossoming of spring (Vasantotsav) and the renewal of friendships, dissolving all societal barriers in joy.',
    storyHi:
      'होली का उत्सव ब्रजमंडल में भगवान श्रीकृष्ण और श्री राधा रानी के अलौकिक प्रेम से जुड़ा है। बाल्यकाल में कान्हा ने माता यशोदा से अपने सांवले और राधा जी के गोरे रंग की शिकायत की। यशोदा मैया ने हंसकर कहा कि तुम जो रंग चाहो राधा के चेहरे पर लगा दो। कन्हैया ने ग्वाल-बालों और गोपियों के साथ मिलकर राधा रानी पर रंग डाला, जिससे यह प्रेम और रंगों का उत्सव ‘रंगपंचमी’ व ‘धुलेंडी’ के रूप में पूरे संसार में फैल गया। यह वसंत ऋतु के आगमन, फसल कटाई की खुशी और आपसी वैर भुलाकर गले मिलने का पर्व है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Krishna', 'Radha Rani'],
    deityHi: ['भगवान श्रीकृष्ण', 'श्री राधा रानी'],
    regions: ['All India', 'Braj (Mathura, Vrindavan)', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'ब्रज (मथुरा, वृन्दावन)', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/holi/holi-date-time.html?year=2026',
  },
  {
    id: 'papamochani_ekadashi_2026_03_14',
    name: 'Papamochani Ekadashi',
    nameHi: 'पापमोचिनी एकादशी',
    englishName: 'Papamochani Ekadashi',
    hindiName: 'पापमोचिनी एकादशी',
    date: '2026-03-14',
    year: 2026,
    month: 3,
    day: 14,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'March 14, 2026, Saturday',
    dateStrHi: 'मार्च 14, 2026, शनिवार',
    tithi: 'Chaitra, Krishna Ekadashi',
    tithiHi: 'चैत्र, कृष्ण एकादशी',
    description:
      'The sin-destroying Ekadashi that cleanses all past transgressions and bestows purity.',
    descriptionHi:
      'चैत्र कृष्ण पक्ष की एकादशी, जो जाने-अनजाने हुए बड़े से बड़े पापों का प्रायश्चित कर मुक्ति देती है।',
    story:
      'In the Bhavishyottara Purana, Sage Lomasha narrates the origin of Papamochani Ekadashi to King Mandhata. In Chaitraratha forest, Sage Medhavi, son of Sage Chyavana, was performing rigorous meditation. Lord Indra sent the celestial Apsara Manjughosha to distract him. Charmed by her beauty, Medhavi lost track of time and spent many years in her company. Realizing his spiritual downfall, he was filled with remorse and initially cursed Manjughosha. When she pleaded for mercy, Medhavi instructed her to observe Papamochani Ekadashi. Medhavi also observed this fast sincerely on his father’s counsel. By observing this fast with deep repentance, both were completely cleansed of their sins and regained their divine brilliance.',
    storyHi:
      'भविष्योत्तर पुराण में महर्षि लोमश ने राजा मान्धाता को पापमोचिनी एकादशी की कथा सुनाई थी। चैत्ररथ वन में च्यवन ऋषि के तेजस्वी पुत्र मेधावी ऋषि तपस्या कर रहे थे। देवराज इंद्र ने उनकी तपस्या भंग करने के लिए अप्सरा मंजुघोषा को भेजा। मुनि मोहित हो गए और वर्षों का समय बीत गया। जब मुनि को अपनी भूल और तपोभंग का बोध हुआ, तो उन्होंने पश्चाताप किया। मंजुघोषा के क्षमा मांगने पर उन्होंने उसे और स्वयं को चैत्र कृष्ण पक्ष की पापमोचिनी एकादशी का व्रत करने का विधान बताया। दोनों ने निष्ठापूर्वक यह व्रत रखा, जिससे उनके समस्त पाप नष्ट हो गए और वे पुनः अपने दिव्य तेज को प्राप्त हुए।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu'],
    deityHi: ['भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/papamochani/papamochani-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'chaitra_navratri_2026_03_19',
    name: 'Chaitra Navratri',
    nameHi: 'चैत्र नवरात्रि',
    englishName: 'Chaitra Navratri',
    hindiName: 'चैत्र नवरात्रि',
    date: '2026-03-19',
    year: 2026,
    month: 3,
    day: 19,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'March 19, 2026, Thursday',
    dateStrHi: 'मार्च 19, 2026, गुरुवार',
    tithi: 'Chaitra, Shukla Pratipada (Ghatasthapana)',
    tithiHi: 'चैत्र, शुक्ल प्रतिपदा (घटस्थापना)',
    description:
      'Beginning of the Hindu New Year (Nav Samvatsar) and nine nights of worshipping the nine forms of Maa Durga.',
    descriptionHi:
      'हिन्दू नववर्ष (नव संवत्सर) का शुभारंभ और मां दुर्गा के नौ दिव्य स्वरूपों (नवदुर्गा) की आराधना।',
    story:
      'According to the Brahma Purana, Lord Brahma began the creation of the universe and cosmic time on Chaitra Shukla Pratipada. In the Devi Bhagavata Purana, this nine-day festival honors Maa Shakti who manifested the cosmos. Lord Rama performed Chaitra Navratri worship along with Sage Vashistha’s guidance before embarking on auspicious endeavors. In Maharashtra, this day is celebrated with great pomp as Gudi Padwa, and in Karnataka, Andhra Pradesh, and Telangana as Ugadi, celebrating renewal, hope, and the victory of light.',
    storyHi:
      'ब्रह्म पुराण के अनुसार ब्रह्मा जी ने चैत्र मास के शुक्ल पक्ष की प्रतिपदा तिथि को ही संपूर्ण सृष्टि की रचना का प्रारंभ किया था। इसी दिन से हिंदू नववर्ष (विक्रम संवत) प्रारंभ होता है। देवी भागवत के अनुसार इन नौ दिनों में देवी शक्ति के नौ रूपों (शैलपुत्री से सिद्धिदात्री तक) की पूजा की जाती है। मर्यादा पुरुषोत्तम श्रीराम ने भी चैत्र नवरात्रि में शक्ति की उपासना की थी। महाराष्ट्र में इसे गुड़ी पड़वा और दक्षिण भारत में उगादी के रूप में नए पंचांग के श्रवण और नीम-गुड़ के प्रसाद के साथ मनाया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Durga (Navadurga)', 'Lord Brahma'],
    deityHi: ['मां दुर्गा (नवदुर्गा)', 'ब्रह्मा जी'],
    regions: [
      'All India',
      'Maharashtra (Gudi Padwa)',
      'Andhra/Karnataka (Ugadi)',
      'North India',
    ],
    regionsHi: [
      'समग्र भारत',
      'महाराष्ट्र (गुड़ी पड़वा)',
      'आंध्र/कर्नाटक (उगादी)',
      'उत्तर भारत',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/navratri/chaitra-navratri-dates.html?year=2026',
  },
  {
    id: 'gauri_puja_2026_03_21',
    name: 'Gauri Puja',
    nameHi: 'गौरी पूजा',
    englishName: 'Gauri Puja',
    hindiName: 'गौरी पूजा',
    date: '2026-03-21',
    year: 2026,
    month: 3,
    day: 21,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'March 21, 2026, Saturday',
    dateStrHi: 'मार्च 21, 2026, शनिवार',
    tithi: 'Chaitra, Shukla Tritiya (Gangaur)',
    tithiHi: 'चैत्र, शुक्ल तृतीया (गणगौर)',
    description:
      'Gangaur festival celebrating marital devotion, fidelity, and Goddess Gauri’s blessing of Saubhagya.',
    descriptionHi:
      'माता पार्वती (गौरी) और भगवान शिव (ईसर जी) के अखंड सौभाग्य और दांपत्य प्रेम का पावन उत्सव।',
    story:
      'Gangaur (Gauri Tritiya) celebrates Goddess Parvati’s return to her parental home and the bestowal of eternal marital bliss (Akhand Saubhagya). According to legend, Lord Shiva and Goddess Parvati visited a forest near a city where noble and peasant women gathered to welcome them. Goddess Parvati sprinkled Suhag water upon all women, blessing them with everlasting marital happiness. Women shape clay idols of Shiva (Isar) and Parvati (Gauri), dressing them in bridal attire and singing festive folk hymns for family welfare.',
    storyHi:
      'गणगौर का पर्व भगवान शिव (गण) और माता पार्वती (गौर) के अमर प्रेम का प्रतीक है। पौराणिक कथा के अनुसार चैत्र शुक्ल तृतीया के दिन माता पार्वती अपने मायके पधारी थीं और उन्होंने सभी व्रती महिलाओं को अखंड सौभाग्य का वरदान दिया था। जब भगवान शिव उन्हें लेने आए, तो महिलाओं ने भव्य विदाई दी। राजस्थान और मध्य भारत में महिलाएं मिट्टी के ईसर-गौरी बनाकर सोलह दिनों तक पूजा करती हैं और सुहाग सामग्री अर्पित कर परिवार की सुख-समृद्धि की कामना करती हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Gauri (Parvati)', 'Lord Shiva (Isar)'],
    deityHi: ['माता गौरी (पार्वती)', 'भगवान शिव (ईसर)'],
    regions: ['Rajasthan', 'Madhya Pradesh', 'Gujarat', 'Uttar Pradesh'],
    regionsHi: ['राजस्थान', 'मध्य प्रदेश', 'गुजरात', 'उत्तर प्रदेश'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/gangaur/gangaur-date-time.html?year=2026',
  },
  {
    id: 'rama_navami_2026_03_26',
    name: 'Rama Navami',
    nameHi: 'राम नवमी',
    englishName: 'Rama Navami',
    hindiName: 'राम नवमी',
    date: '2026-03-26',
    year: 2026,
    month: 3,
    day: 26,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'March 26, 2026, Thursday',
    dateStrHi: 'मार्च 26, 2026, गुरुवार',
    tithi: 'Chaitra, Shukla Navami',
    tithiHi: 'चैत्र, शुक्ल नवमी',
    description:
      'Birth anniversary of Maryada Purushottama Lord Sri Rama in Ayodhya.',
    descriptionHi:
      'मर्यादा पुरुषोत्तम भगवान श्री रामचंद्र जी के अयोध्या में पावन अवतरण का जन्मोत्सव।',
    story:
      'Described in the Valmiki Ramayana and Ramcharitmanas, King Dasharatha of Ayodhya, having no heir, performed the sacred Putrakameshti Yajna under the guidance of Sage Rishyashringa. Lord Agni emerged from the sacrificial fire carrying divine Payasam (Kheer). King Dasharatha distributed it to his queens Kaushalya, Kaikeyi, and Sumitra. On Chaitra Shukla Navami at midday (Abhijit Muhurta), under the Punarvasu Nakshatra, the Supreme Lord Vishnu incarnated as Sri Rama to Queen Kaushalya to establish Dharma and vanquish demonic forces across the earth.',
    storyHi:
      'वाल्मीकि रामायण और रामचरितमानस के अनुसार, अयोध्या के राजा दशरथ ने संतान प्राप्ति हेतु महर्षि ऋष्यशृंग के सानिध्य में पुत्रकामेष्टि यज्ञ कराया। यज्ञ की अग्नि से अग्निदेव ने दिव्य खीर का पात्र प्रदान किया, जिसे राजा ने कौशल्या, कैकेयी और सुमित्रा में वितरित किया। चैत्र मास के शुक्ल पक्ष की नवमी तिथि को दोपहर 12 बजे अभिजित मुहूर्त और पुनर्वसु नक्षत्र में जगतपालक भगवान विष्णु ने माता कौशल्या के गर्भ से श्रीराम के रूप में अवतार लिया। इस दिन अयोध्या सहित संपूर्ण विश्व में रामलला के जन्मोत्सव का शंखनाद और जन्मोत्सव कीर्तन किया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Sri Rama', 'Mata Sita'],
    deityHi: ['भगवान श्रीराम', 'माता सीता'],
    regions: ['All India', 'Ayodhya', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'अयोध्या', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/ram-navami/ram-navami-date-time.html?year=2026',
  },
  {
    id: 'kamada_ekadashi_2026_03_28',
    name: 'Kamada Ekadashi',
    nameHi: 'कामदा एकादशी',
    englishName: 'Kamada Ekadashi',
    hindiName: 'कामदा एकादशी',
    date: '2026-03-28',
    year: 2026,
    month: 3,
    day: 28,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'March 28, 2026, Saturday',
    dateStrHi: 'मार्च 28, 2026, शनिवार',
    tithi: 'Chaitra, Shukla Ekadashi',
    tithiHi: 'चैत्र, शुक्ल एकादशी',
    description:
      'Fulfiller of all pure desires and liberator from severe curses and sins.',
    descriptionHi:
      'चैत्र शुक्ल पक्ष की एकादशी जो भक्तों की समस्त मनोकामनाएं पूर्ण कर शाप और कष्टों से मुक्ति दिलाती है।',
    story:
      'In the Varaha Purana, Lord Krishna relates the legend of Kamada Ekadashi to King Yudhishthira. In the golden city of Ratnapura ruled by King Pundarika, lived a celestial singer Gandharva named Lalit and his devoted wife Lalita. One day, while singing in the royal court, Lalit’s mind wandered to his beloved wife, causing a flaw in his musical performance. The enraged king cursed him to become a ferocious cannibalistic demon (Rakshasa). Wandering the forests in sorrow, Lalita reached the hermitage of Sage Shringi. The compassionate sage advised her to observe the fast of Chaitra Shukla Kamada Ekadashi and offer its merit to her husband. Lalita faithfully performed the vow, instantly restoring Lalit to his celestial form and bringing them back to heavenly bliss.',
    storyHi:
      'वराह पुराण में भगवान श्रीकृष्ण ने धर्मराज युधिष्ठिर को कामदा एकादशी का महत्व बताया है। रत्नपुर नगर में राजा पुण्डरीक के दरबार में ललित नाम का गंधर्व और उसकी पत्नी ललिता रहते थे। एक दिन गायन के दौरान ललित का ध्यान अपनी पत्नी में भटक गया और सुर बिगड़ गया। क्रुद्ध राजा ने उसे नरभक्षी राक्षस बनने का शाप दे दिया। पति के उद्धार के लिए विलाप करती ललिता विंध्याचल पर्वत पर शृंगी ऋषि के आश्रम पहुंची। ऋषि ने उसे चैत्र शुक्ल कामदा एकादशी का व्रत कर उसका पुण्य पति को अर्पित करने का उपाय बताया। ललिता ने निष्ठा से व्रत किया, जिससे ललित तुरंत राक्षस योनि से मुक्त होकर पुनः सुंदर गंधर्व बन गया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu'],
    deityHi: ['भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/kamada/kamada-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'hanuman_jayanti_2026_04_01',
    name: 'Hanuman Jayanti',
    nameHi: 'हनुमान जयंती',
    englishName: 'Hanuman Jayanti',
    hindiName: 'हनुमान जयंती',
    date: '2026-04-01',
    year: 2026,
    month: 4,
    day: 1,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'April 01, 2026, Wednesday',
    dateStrHi: 'अप्रैल 01, 2026, बुधवार',
    tithi: 'Chaitra, Purnima',
    tithiHi: 'चैत्र, पूर्णिमा',
    description:
      'Birth anniversary of Lord Hanuman, the 11th Rudra avatar and supreme devotee of Sri Rama.',
    descriptionHi:
      'श्रीरामदूत, संकटमोचन, 11वें रुद्रावतार भगवान श्री हनुमान जी का पावन प्राकट्योत्सव।',
    story:
      'Chronicled in the Valmiki Ramayana, Shiva Purana, and Hanuman Chalisa, Lord Hanuman was born on Chaitra Purnima to Mata Anjana and King Kesari through the divine grace and wind-breath of Vayu Deva. When Lord Shiva decided to assist Lord Vishnu in His Rama avatar, He chose to incarnate as the 11th Rudra (Hanuman), possessing unmatched strength, immortality (Chiranjivi), supreme intellect, and unwavering devotion. From leaping to catch the sun in childhood to crossing the ocean to find Sita and carrying the Sanjeevani mountain, Lord Hanuman remains the embodiment of selfless service and courage.',
    storyHi:
      'वाल्मीकि रामायण और शिवपुराण के अनुसार, चैत्र पूर्णिमा के दिन माता अंजना और वानरराज केसरी के यहां भगवान शिव के 11वें रुद्रावतार के रूप में पवनपुत्र हनुमान जी का प्राकट्य हुआ। जब भगवान विष्णु ने श्रीराम अवतार लिया, तो उनकी सेवा और धर्म की स्थापना में सहयोग हेतु शिवजी ने हनुमान रूप धारण किया। वायुदेव के माध्यम से दिव्य ऊर्जा माता अंजना तक पहुंची थी, इसलिए वे मारुतिनंदन भी कहलाते हैं। अतुलित बल, बुद्धि, विद्या और प्रभु श्रीराम के प्रति अनन्य निष्ठा के कारण हनुमान जी कलयुग में भी जाग्रत और संकटमोचन माने जाते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Hanuman', 'Lord Sri Rama'],
    deityHi: ['भगवान हनुमान', 'भगवान श्रीराम'],
    regions: ['All India', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/hanuman-jayanti/hanuman-jayanti-date-time.html?year=2026',
  },
  {
    id: 'varuthini_ekadashi_2026_04_13',
    name: 'Varuthini Ekadashi',
    nameHi: 'वरूथिनी एकादशी',
    englishName: 'Varuthini Ekadashi',
    hindiName: 'वरूथिनी एकादशी',
    date: '2026-04-13',
    year: 2026,
    month: 4,
    day: 13,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'April 13, 2026, Monday',
    dateStrHi: 'अप्रैल 13, 2026, सोमवार',
    tithi: 'Vaishakha, Krishna Ekadashi',
    tithiHi: 'वैशाख, कृष्ण एकादशी',
    description:
      'The protective shield Ekadashi bringing fortune, health, and liberation from misfortune.',
    descriptionHi:
      'वैशाख कृष्ण पक्ष की एकादशी, जो रक्षा कवच बनकर जीवन के दुखों और दरिद्रता का नाश करती है।',
    story:
      'According to the Bhavishyottara Purana, Lord Krishna explained to King Yudhishthira that Varuthini Ekadashi acts as a divine armor (Varutha) protecting devotees from all calamities in this world and the next. In ancient times, King Mandhata observed this fast on the banks of the Narmada River and achieved supreme spiritual elevation. It is also believed that King Dhundhumara was liberated from a debilitating curse by Lord Shiva after observing Varuthini Ekadashi. Observing this fast yields the merit equivalent to performing intense austerities for ten thousand years and donating gold during a solar eclipse.',
    storyHi:
      'भविष्योत्तर पुराण में भगवान श्रीकृष्ण ने युधिष्ठिर को बताया कि ‘वरूथिनी’ का अर्थ ‘रक्षा कवच’ होता है। यह एकादशी भक्त की हर संकट से रक्षा करती है। प्राचीन काल में नर्मदा तट पर तपस्या कर रहे राजा मान्धाता ने इस एकादशी का व्रत कर मोक्ष प्राप्त किया था। इसी व्रत के प्रभाव से राजा धुंधुमार को महर्षि के शाप से मुक्ति मिली थी। शास्त्रों के अनुसार, वरूथिनी एकादशी का फल दस हजार वर्षों की तपस्या और सूर्य ग्रहण के समय स्वर्ण दान करने के समान पुण्य फलदायी माना गया है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vamana', 'Lord Vishnu'],
    deityHi: ['भगवान वामन', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/varuthini/varuthini-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'mohini_ekadashi_2026_04_27',
    name: 'Mohini Ekadashi',
    nameHi: 'मोहिनी एकादशी',
    englishName: 'Mohini Ekadashi',
    hindiName: 'मोहिनी एकादशी',
    date: '2026-04-27',
    year: 2026,
    month: 4,
    day: 27,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'April 27, 2026, Monday',
    dateStrHi: 'अप्रैल 27, 2026, सोमवार',
    tithi: 'Vaishakha, Shukla Ekadashi',
    tithiHi: 'वैशाख, शुक्ल एकादशी',
    description:
      'Celebrates Lord Vishnu’s Mohini avatar who served Amrita to the Devas, dissolving all illusions.',
    descriptionHi:
      'वैशाख शुक्ल एकादशी, जिस दिन भगवान विष्णु ने मोहिनी रूप धारण कर देवताओं को अमृत पान कराया था।',
    story:
      'During the churning of the cosmic ocean (Samudra Manthan), when the divine nectar of immortality (Amrita) emerged, the Asuras seized the pot. To protect the cosmos and restore Dharma, Lord Vishnu assumed the mesmerizing form of the celestial enchantress Mohini. Enchanted by Her supreme beauty, the Asuras handed over the Amrita Kalash, which She distributed to the Devas on Vaishakha Shukla Ekadashi. In the Shiva Purana and Surya Purana, Sage Kaundinya advised Dhrishtabuddhi, the wayward son of a virtuous merchant Dhanapala, to observe Mohini Ekadashi, completely purifying his karmas and granting him Vaikuntha.',
    storyHi:
      'समुद्र मंथन के समय जब अमृत कलश प्रकट हुआ, तो असुरों ने उस पर अधिकार कर लिया। तब भगवान विष्णु ने वैशाख शुक्ल एकादशी के दिन अत्यंत मनमोहक ‘मोहिनी’ रूप धारण किया। असुर मोहिनी के रूप-सौंदर्य पर मुग्ध हो गए और उन्होंने अमृत वितरण का दायित्व मोहिनी को सौंप दिया। भगवान ने समस्त अमृत देवताओं को पान कराकर उन्हें अमर कर दिया। इसके अतिरिक्त महर्षि कौण्डिन्य के उपदेश से धनपाल वैश्य के पापी पुत्र धृष्टबुद्धि ने यह व्रत करके अपने समस्त पापों से मुक्ति पाई और दिव्य धाम को प्राप्त हुआ।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu (Mohini Avatar)'],
    deityHi: ['भगवान विष्णु (मोहिनी स्वरूप)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/mohini/mohini-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'apara_ekadashi_2026_05_12',
    name: 'Apara Ekadashi',
    nameHi: 'अपरा एकादशी',
    englishName: 'Apara Ekadashi',
    hindiName: 'अपरा एकादशी',
    date: '2026-05-12',
    year: 2026,
    month: 5,
    day: 12,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'May 12, 2026, Tuesday',
    dateStrHi: 'मई 12, 2026, मंगलवार',
    tithi: 'Jyeshtha, Krishna Ekadashi',
    tithiHi: 'ज्येष्ठ, कृष्ण एकादशी',
    description:
      'The giver of boundless (Apara) spiritual wealth, reputation, and forgiveness.',
    descriptionHi:
      'ज्येष्ठ कृष्ण पक्ष की एकादशी जो अपार धन, कीर्ति और जाने-अनजाने हुए बड़े पापों से मुक्ति प्रदान करती है।',
    story:
      'In the Brahmanda Purana, Lord Krishna tells King Yudhishthira that Apara Ekadashi grants limitless (Apara) blessings and erases the deepest guilts. In ancient times, a righteous king named Mahidhwaja had an envious younger brother Vajradhwaja, who murdered him in secret and buried his body under a Peepal tree. Mahidhwaja became an unsettled spirit (Pretatma) causing disturbances. Sage Dhaumya passed by, used his yogic vision to perceive the truth, and compassionately observed Apara Ekadashi on the spirit’s behalf, dedicating all the spiritual merit to him. As a result, Mahidhwaja was instantly liberated from the spirit realm and ascended to heaven in a celestial chariot.',
    storyHi:
      'ब्रह्मांड पुराण के अनुसार, अपरा एकादशी का व्रत करने से मनुष्य को अपार पुण्य और यश की प्राप्ति होती है। प्राचीन समय में धर्मात्मा राजा महीध्वज की उसके छोटे भाई वज्रध्वज ने हत्या कर शव को पीपल के नीचे गाड़ दिया। अकाल मृत्यु के कारण राजा की आत्मा प्रेत बनकर भटकने लगी। एक दिन धौम्य ऋषि वहां से गुजरे और उन्होंने तपोबल से प्रेत बने राजा का कष्ट जाना। ऋषि ने स्वयं ज्येष्ठ कृष्ण एकादशी (अपरा एकादशी) का व्रत किया और उसका संपूर्ण पुण्य राजा को समर्पित कर दिया। पुण्य प्रभाव से राजा प्रेत योनि से मुक्त होकर दिव्य विमान से स्वर्ग चले गए।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Trivikrama', 'Lord Vishnu'],
    deityHi: ['भगवान त्रिविक्रम', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/apara/apara-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'padmini_ekadashi_2026_05_26',
    name: 'Padmini Ekadashi',
    nameHi: 'पद्मिनी एकादशी',
    englishName: 'Padmini Ekadashi',
    hindiName: 'पद्मिनी एकादशी',
    date: '2026-05-26',
    year: 2026,
    month: 5,
    day: 26,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'May 26, 2026, Tuesday',
    dateStrHi: 'मई 26, 2026, मंगलवार',
    tithi: 'Adhika Jyeshtha, Shukla Ekadashi',
    tithiHi: 'अधिक ज्येष्ठ, शुक्ल एकादशी',
    description:
      'Rare Adhik Maas (Purushottama Month) Shukla Ekadashi bestowing invincible progeny and divine grace.',
    descriptionHi:
      'अधिक मास (पुरुषोत्तम मास) के शुक्ल पक्ष की दुर्लभ एकादशी, जो निष्काम भक्ति और मनोवांछित फल देती है।',
    story:
      'Padmini Ekadashi occurs exclusively during the intercalary leap month (Adhik Maas / Mal Maas), dedicated to Lord Purushottama. In the Treta Yuga, King Kritavirya of the Haihaya dynasty had no son despite many marriages. His devoted Queen Padmini, daughter of King Harishchandra, accompanied him to Mount Gandhamadana for penance. Seeing her exhaustion, Sage Atri’s wife Anusuya instructed Queen Padmini to observe the sacred Ekadashi of the Shukla Paksha of Mal Maas. Lord Vishnu, pleased by her penance, granted them a son named Kartavirya Arjuna (Sahasrabahu Arjuna), who became an invincible warrior blessed with unmatched valor across the three worlds.',
    storyHi:
      'पद्मिनी एकादशी केवल अधिक मास (पुरुषोत्तम मास) के शुक्ल पक्ष में आती है। त्रेतायुग में हैहय वंश के राजा कृतवीर्य की कोई संतान नहीं थी। उनकी पटरानी पद्मिनी ने संतान प्राप्ति के लिए गंधमादन पर्वत पर घोर तप किया। माता अनुसूया ने रानी पद्मिनी को मलमास के शुक्ल पक्ष की एकादशी का विधिपूर्वक व्रत करने की प्रेरणा दी। भगवान पुरुषोत्तम ने प्रसन्न होकर उन्हें साक्षात दर्शन दिए और एक पराक्रमी पुत्र का वरदान दिया। इस व्रत के फलस्वरूप महारानी पद्मिनी के गर्भ से महाप्रतापी और सहस्रबाहु कार्तवीर्य अर्जुन का जन्म हुआ।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Purushottama (Vishnu)'],
    deityHi: ['भगवान पुरुषोत्तम (विष्णु)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/padmini/padmini-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'parama_ekadashi_2026_06_11',
    name: 'Parama Ekadashi',
    nameHi: 'परमा एकादशी',
    englishName: 'Parama Ekadashi',
    hindiName: 'परमा एकादशी',
    date: '2026-06-11',
    year: 2026,
    month: 6,
    day: 11,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'June 11, 2026, Thursday',
    dateStrHi: 'जून 11, 2026, गुरुवार',
    tithi: 'Adhika Jyeshtha, Krishna Ekadashi',
    tithiHi: 'अधिक ज्येष्ठ, कृष्ण एकादशी',
    description:
      'Adhik Maas Krishna Ekadashi that eradicates poverty and bestows supreme prosperity and spiritual merit.',
    descriptionHi:
      'अधिक मास के कृष्ण पक्ष की परम कल्याणकारी एकादशी जो दरिद्रता का नाश कर कुबेर जैसा ऐश्वर्य देती है।',
    story:
      'Occurring in the Krishna Paksha of Adhik Maas, Parama Ekadashi is celebrated as the bestower of supreme (Parama) prosperity. In the city of Kampilya lived an impoverished yet extremely virtuous Brahmin named Sumedha and his devoted wife Pavitra. Despite extreme hunger, Pavitra would offer whatever food they had to visiting guests while remaining hungry herself. When Sage Kaundinya visited their hut, he observed their deep devotion and advised Pavitra and Sumedha to observe the fast of Parama Ekadashi along with five days of holy water ablutions. By the grace of Lord Vishnu, their poverty was transformed into wealth, and a prince gifted them a golden mansion and cattle.',
    storyHi:
      'अधिक मास के कृष्ण पक्ष की एकादशी को परमा एकादशी कहते हैं। कांपिल्य नगर में सुमेधा नामक एक अत्यंत निर्धन किंतु ज्ञानी ब्राह्मण अपनी पतिव्रता पत्नी पवित्रा के साथ रहते थे। वे इतने गरीब थे कि कई दिन भूखे रहते, किंतु अतिथि को कभी खाली हाथ नहीं लौटाते थे। एक दिन महर्षि कौण्डिन्य उनके यहां पधारे। ब्राह्मण दंपत्ति की सेवा से संतुष्ट होकर ऋषि ने उन्हें अधिक मास की परमा एकादशी का व्रत और पंचरात्रि पूजा करने का उपाय बताया। इस व्रत के प्रभाव से भगवान विष्णु ने उनकी दरिद्रता दूर कर दी और राजा ने उन्हें अपार धन-धान्य और भवन दान किया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu', 'Lord Kubera'],
    deityHi: ['भगवान विष्णु', 'कुबेर देव'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/parama/parama-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'nirjala_ekadashi_2026_06_25',
    name: 'Nirjala Ekadashi',
    nameHi: 'निर्जला एकादशी',
    englishName: 'Nirjala Ekadashi',
    hindiName: 'निर्जला एकादशी',
    date: '2026-06-25',
    year: 2026,
    month: 6,
    day: 25,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'June 25, 2026, Thursday',
    dateStrHi: 'जून 25, 2026, गुरुवार',
    tithi: 'Jyeshtha, Shukla Ekadashi',
    tithiHi: 'ज्येष्ठ, शुक्ल एकादशी',
    description:
      'The most austere waterless Ekadashi (Bhimseni Ekadashi), granting the merit of all 24 Ekadashis.',
    descriptionHi:
      'भीमसेनी एकादशी, जिसमें बिना जल ग्रहण किए व्रत रखने से वर्ष की सभी 24 एकादशियों का पुण्य फल प्राप्त होता है।',
    story:
      'In the Mahabharata and Padma Purana, Bhima, the second Pandava brother, possessed an immense digestive fire known as Vrikodara and found it impossible to fast twice a month like his brothers and Draupadi. Distressed that he was missing out on the spiritual merits of Ekadashi, Bhima approached Sage Vedavyasa for guidance. Maharishi Vyasa instructed Bhima that if he observed a complete, strict fast without consuming a single drop of water (Nirjala) on Jyeshtha Shukla Ekadashi from sunrise to next day sunrise, he would gain the collective spiritual merit of all 24 Ekadashis of the year. Bhima undertook this rigorous fast with supreme devotion, and hence this day is also celebrated as Bhima Ekadashi and Pandava Nirjala Ekadashi.',
    storyHi:
      'महाभारत के अनुसार, पाण्डु पुत्र भीमसेन को बहुत अधिक भूख लगती थी क्योंकि उनके उदर में ‘वृक’ नामक अग्नि प्रज्वलित रहती थी। इस कारण वे महीने में दो बार पड़ने वाली एकादशी का व्रत रखने में असमर्थ थे। जब उन्होंने महर्षि वेदव्यास जी से इसका समाधान पूछा, तो व्यास जी ने कहा कि ज्येष्ठ मास के शुक्ल पक्ष की एकादशी को सूर्योदय से लेकर द्वादशी के सूर्योदय तक बिना जल ग्रहण किए (निर्जला) व्रत रखो। इससे वर्ष भर की संपूर्ण 24 एकादशियों का पुण्य एक साथ प्राप्त हो जाएगा। भीमसेन ने अत्यंत साहस से यह निर्जल व्रत पूर्ण किया, इसलिए इसे ‘भीमसेनी एकादशी’ या ‘पांडव एकादशी’ भी कहा जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu', 'Bhimasena'],
    deityHi: ['भगवान विष्णु', 'भीमसेन'],
    regions: ['All India', 'North India', 'Gujarat', 'Maharashtra'],
    regionsHi: ['समग्र भारत', 'उत्तर भारत', 'गुजरात', 'महाराष्ट्र'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/nirjala/nirjala-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'jagannath_rathyatra_2026_07_15',
    name: 'Jagannath Rathyatra',
    nameHi: 'जगन्नाथ रथयात्रा',
    englishName: 'Jagannath Rathyatra',
    hindiName: 'जगन्नाथ रथयात्रा',
    date: '2026-07-15',
    year: 2026,
    month: 7,
    day: 15,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'July 15, 2026, Wednesday',
    dateStrHi: 'जुलाई 15, 2026, बुधवार',
    tithi: 'Ashadha, Shukla Dwitiya',
    tithiHi: 'आषाढ़, शुक्ल द्वितीया',
    description:
      'Grand chariot procession of Lord Jagannath, Balabhadra, and Subhadra to the Gundicha Temple in Puri.',
    descriptionHi:
      'पुरी में भगवान जगन्नाथ, भाई बलभद्र और बहन सुभद्रा की भव्य रथयात्रा एवं गुंडिचा मंदिर प्रस्थान का पावन महोत्सव।',
    story:
      'According to the Skanda Purana and Brahma Purana, Lord Jagannath (Lord Krishna, Lord of the Universe), along with His elder brother Balabhadra and sister Subhadra, rides magnificent wooden chariots (Nandighosha, Taladhwaja, and Darpadalana) from the main Jagannath temple to the Gundicha Temple, representing their maternal aunt’s home. It commemorates Subhadra’s desire to tour the city of Dwarka and Krishna’s affectionate compliance. During this festival, the Lord of the Universe steps out of His sanctum sanctorum onto the streets so that all devotees, regardless of caste, creed, or nationality, can behold and pull His sacred chariot and receive liberation (Moksha).',
    storyHi:
      'स्कन्द पुराण और ब्रह्म पुराण के अनुसार, आषाढ़ मास के शुक्ल पक्ष की द्वितीया को भगवान जगन्नाथ, उनके बड़े भाई बलभद्र और बहन सुभद्रा तीन विशाल रथों (नंदीघोष, तालध्वज और दर्पदलन) पर सवार होकर अपनी मौसी के घर गुंडिचा मंदिर जाते हैं। यह यात्रा भगवान के अपने भक्तों को साक्षात दर्शन देने के लिए मंदिर के गर्भगृह से बाहर आने का प्रतीक है। रथ के रस्सों को खींचने मात्र से मोक्ष की प्राप्ति मानी जाती है। पुरी के गजपति महाराज द्वारा सोने की झाड़ू से रथ के आगे मार्ग साफ करने (छेरा पहंरा) की परंपरा सामाजिक समानता का अनुपम संदेश देती है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Jagannath', 'Lord Balabhadra', 'Goddess Subhadra'],
    deityHi: ['भगवान जगन्नाथ', 'बलभद्र जी', 'देवी सुभद्रा'],
    regions: ['Odisha (Puri)', 'Gujarat (Ahmedabad)', 'All India', 'Worldwide'],
    regionsHi: [
      'ओडिशा (पुरी)',
      'गुजरात (अहमदाबाद)',
      'समग्र भारत',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/rathyatra/rathyatra-date-time.html?year=2026',
  },
  {
    id: 'devshayani_ekadashi_2026_07_24',
    name: 'Devshayani Ekadashi',
    nameHi: 'देवशयनी एकादशी',
    englishName: 'Devshayani Ekadashi',
    hindiName: 'देवशयनी एकादशी',
    date: '2026-07-24',
    year: 2026,
    month: 7,
    day: 24,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'July 24, 2026, Friday',
    dateStrHi: 'जुलाई 24, 2026, शुक्रवार',
    tithi: 'Ashadha, Shukla Ekadashi',
    tithiHi: 'आषाढ़, शुक्ल एकादशी',
    description:
      'Lord Vishnu enters the four-month cosmic yogic slumber (Chaturmas); commencement of spiritual discipline.',
    descriptionHi:
      'श्रीहरि विष्णु का क्षीरसागर में चार मास के लिए योगनिद्रा में शयन; चातुर्मास और जप-तप का पावन शुभारंभ।',
    story:
      'Described in the Bhavishyottara Purana, Devshayani (or Harishayani) Ekadashi marks the day when Lord Vishnu enters cosmic yogic sleep (Yoga Nidra) on Sheshanaga in the Kshirasagara for four months (Chaturmas) until Devutthana Ekadashi. During this time, auspicious ceremonies like weddings pause while devotees focus on prayer, fasting, and spiritual reflection. In the legend, when Lord Vamana stepped across the three worlds and sent the generous King Bali to the netherworld (Sutala), Lord Vishnu, pleased by Bali’s surrender, granted him the boon that He would reside in Sutala as Bali’s guardian for four months every year.',
    storyHi:
      'भविष्योत्तर पुराण के अनुसार, आषाढ़ शुक्ल एकादशी से भगवान श्रीहरि विष्णु क्षीरसागर में शेषनाग की शैय्या पर चार माह के लिए योगनिद्रा में शयन करते हैं। इन चार महीनों को ‘चातुर्मास’ कहा जाता है, जिसमें विवाह आदि मांगलिक कार्य रोककर केवल ध्यान, तप, स्वाध्याय और साधना की जाती है। वामन अवतार की कथा के अनुसार, जब भगवान ने राजा बलि के तीन पग में त्रिलोकी नाप ली और बलि ने अपना शीश समर्पित कर दिया, तो भगवान ने प्रसन्न होकर बलि के पाताल लोक की रक्षा का वचन दिया। भगवान विष्णु इसी दिन से चार माह पाताल में बलि के द्वार पर निवास करते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu', 'King Bali'],
    deityHi: ['भगवान विष्णु', 'राजा बलि'],
    regions: ['All India', 'Pandharpur (Maharashtra Wari)'],
    regionsHi: ['समग्र भारत', 'पंढरपुर (महाराष्ट्र वारी)'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/ashadha-shukla/devshayani-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'kamika_ekadashi_2026_08_08',
    name: 'Kamika Ekadashi',
    nameHi: 'कामिका एकादशी',
    englishName: 'Kamika Ekadashi',
    hindiName: 'कामिका एकादशी',
    date: '2026-08-08',
    year: 2026,
    month: 8,
    day: 8,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'August 08, 2026, Saturday',
    dateStrHi: 'अगस्त 08, 2026, शनिवार',
    tithi: 'Shravana, Krishna Ekadashi',
    tithiHi: 'श्रावण, कृष्ण एकादशी',
    description:
      'First Ekadashi of holy Shravana month; worship of Lord Vishnu with Tulsi leaves granting the merit of Ashwamedha Yajna.',
    descriptionHi:
      'पवित्र सावन मास की पहली एकादशी, जिसमें तुलसी दल से भगवान विष्णु की पूजा करने से अश्वमेध यज्ञ का फल मिलता है।',
    story:
      'In the Brahma Vaivarta Purana, Lord Brahma narrated the greatness of Kamika Ekadashi to Sage Narada. Observing this fast during the holy month of Shravana yields the divine merit of bathing in all holy rivers (Ganga, Yamuna, Godavari, Kashi) and performing an Ashwamedha Yajna. In ancient times, a landowner accidentally killed a pious Brahmin during a sudden dispute. Tormented by the sin of Brahma-hatya, he sought counsel from sages, who instructed him to worship Lord Sridhara on Kamika Ekadashi with sacred Tulsi leaves and observe a strict vigil. The Lord forgave his unintentional sin and granted him spiritual peace.',
    storyHi:
      'ब्रह्मवैवर्त पुराण में ब्रह्मा जी ने देवर्षि नारद को बताया कि सावन के पवित्र महीने में कामिका एकादशी का व्रत करने से भगवान विष्णु के श्रीधर रूप का विशेष आशीर्वाद प्राप्त होता है। इस दिन तुलसी पत्र से श्रीहरि का पूजन करने का फल गंगा स्नान और अश्वमेध यज्ञ के समान है। प्राचीन काल में एक क्षत्रिय जमींदार से अनजाने में एक ब्राह्मण की हत्या हो गई थी। ब्रह्महत्या के पाप से मुक्ति पाने के लिए उसने ऋषियों की आज्ञा से कामिका एकादशी का सविधि व्रत और रात्रि जागरण किया। भगवान विष्णु ने उसकी निष्कपट भक्ति से प्रसन्न होकर उसे पापमुक्त किया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Sridhara (Vishnu)'],
    deityHi: ['भगवान श्रीधर (विष्णु)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/kamika/kamika-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'hariyali_teej_2026_08_15',
    name: 'Hariyali Teej',
    nameHi: 'हरियाली तीज',
    englishName: 'Hariyali Teej',
    hindiName: 'हरियाली तीज',
    date: '2026-08-15',
    year: 2026,
    month: 8,
    day: 15,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'August 15, 2026, Saturday',
    dateStrHi: 'अगस्त 15, 2026, शनिवार',
    tithi: 'Shravana, Shukla Tritiya',
    tithiHi: 'श्रावण, शुक्ल तृतीया',
    description:
      'Celebrates the divine reunion of Goddess Parvati and Lord Shiva after 108 births of penance.',
    descriptionHi:
      'मां पार्वती और भगवान शिव के अलौकिक पुनर्मिलन और प्रकृति के हरियाली रूप का आनंदमयी उत्सव।',
    story:
      'According to Hindu scriptures and folk lore, Goddess Parvati underwent severe penance across 107 rebirths desiring Lord Shiva as her husband. In her 108th birth as the daughter of the King of the Himalayas (Himavan), She meditated on the banks of the river during Shravana and molded a Shiva Linga out of sand. Pleased by Her unyielding love and devotion on Shravana Shukla Tritiya, Lord Shiva accepted Her as His divine consort. Women celebrate this day wearing green attire, riding decorated swings, singing folk melodies, and praying for harmony in marriage.',
    storyHi:
      'शिवपुराण के अनुसार, माता पार्वती ने भगवान शिव को पति रूप में पाने के लिए 107 जन्मों तक कठोर तपस्या की थी। 108वें जन्म में हिमालय पुत्री के रूप में उन्होंने सावन के महीने में रेत का शिवलिंग बनाकर कठोर तप और व्रत किया। उनकी अनन्य निष्ठा से प्रसन्न होकर श्रावण शुक्ल तृतीया को भगवान शिव ने माता पार्वती को अपनी अर्धांगिनी के रूप में स्वीकार किया। प्रकृति के हरे-भरे सौंदर्य, झूलों और मेंहदी के साथ महिलाएं सुखी दांपत्य जीवन के लिए यह पावन व्रत रखती हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Parvati', 'Lord Shiva'],
    deityHi: ['माता पार्वती', 'भगवान शिव'],
    regions: ['North India', 'Rajasthan', 'Uttar Pradesh', 'Haryana', 'Bihar'],
    regionsHi: ['उत्तर भारत', 'राजस्थान', 'उत्तर प्रदेश', 'हरियाणा', 'बिहार'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/teej/hariyali-teej-date-time.html?year=2026',
  },
  {
    id: 'nag_panchami_2026_08_16',
    name: 'Nag Panchami',
    nameHi: 'नाग पंचमी',
    englishName: 'Nag Panchami',
    hindiName: 'नाग पंचमी',
    date: '2026-08-16',
    year: 2026,
    month: 8,
    day: 16,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'August 16, 2026, Sunday',
    dateStrHi: 'अगस्त 16, 2026, रविवार',
    tithi: 'Shravana, Shukla Panchami',
    tithiHi: 'श्रावण, शुक्ल पञ्चमी',
    description:
      'Traditional worship of serpent deities (Nagas) seeking protection from snakebites and planetary afflictions.',
    descriptionHi:
      'नाग देवताओं (अनंत, वासुकि, तक्षक आदि) की पूजा और कालसर्प दोष व भय निवारण का पावन पर्व।',
    story:
      'In the Mahabharata (Adi Parva), King Janamejaya performed a massive snake sacrifice (Sarpa Satra Yajna) to avenge the death of his father King Parikshit, who died of a bite by the serpent king Takshaka. The sacrifice was so potent that serpents from all realms were being drawn into the sacrificial flames. To save the serpent species from total extinction, the young Sage Astika intervened on Shravana Shukla Panchami and convinced King Janamejaya through profound wisdom to halt the Yajna. Nagas were thus saved and blessed. It is also celebrated as the day Lord Krishna subdued the venomous serpent Kaliya in the Yamuna River without taking his life.',
    storyHi:
      'महाभारत के अनुसार, राजा परीक्षित की तक्षक नाग के काटने से मृत्यु के बाद उनके पुत्र राजा जनमेजय ने पृथ्वी से सर्पों के संहार के लिए महाविनाशकारी ‘सर्प सत्र यज्ञ’ शुरू किया। यज्ञ की शक्ति से सभी नाग आहुति बनकर जलने लगे। तब आस्तीक मुनि ने श्रावण शुक्ल पंचमी के दिन राजा जनमेजय की सभा में पहुंचकर अपने ज्ञान से यज्ञ को रुकवाया और नाग जाति की रक्षा की। इसी दिन भगवान श्रीकृष्ण ने भी यमुना नदी में कालिया नाग के फन पर नृत्य कर उसका मान मर्दन किया था और ब्रजवासियों को विष के भय से मुक्ति दिलाई थी।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Nag Devatas (Vasuki, Shesha, Takshaka)', 'Lord Shiva'],
    deityHi: ['नाग देवता (वासुकि, शेषनाग, तक्षक)', 'भगवान शिव'],
    regions: ['All India', 'Maharashtra', 'Karnataka', 'North India'],
    regionsHi: ['समग्र भारत', 'महाराष्ट्र', 'कर्नाटक', 'उत्तर भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/nag-panchami/nag-panchami-date-time.html?year=2026',
  },
  {
    id: 'shravana_putrada_ekadashi_2026_08_23',
    name: 'Shravana Putrada Ekadashi',
    nameHi: 'श्रावण पुत्रदा एकादशी',
    englishName: 'Shravana Putrada Ekadashi',
    hindiName: 'श्रावण पुत्रदा एकादशी',
    date: '2026-08-23',
    year: 2026,
    month: 8,
    day: 23,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'August 23, 2026, Sunday',
    dateStrHi: 'अगस्त 23, 2026, रविवार',
    tithi: 'Shravana, Shukla Ekadashi',
    tithiHi: 'श्रावण, शुक्ल एकादशी',
    description:
      'Auspicious Ekadashi bestowing virtuous offspring and spiritual fulfillment to childless couples.',
    descriptionHi:
      'श्रावण शुक्ल पक्ष की एकादशी जो सुयोग्य संतान की प्राप्ति और पितरों के उद्धार का वरदान देती है।',
    story:
      'In the Bhavishya Purana, Lord Krishna narrates the history of Shravana Putrada Ekadashi to King Yudhishthira. In ancient times, King Suketuman ruled the kingdom of Bhadravati with righteousness, yet he and his Queen Shaibya remained childless and despondent about their ancestral lineage (Pitr-Rina). Leaving his kingdom, the King wandered into the forest on Shravana Shukla Ekadashi and encountered enlightened sages meditating near a sacred lake. The sages instructed the King to observe the fast of Shravana Putrada Ekadashi with full faith. The King returned and observed the fast with his Queen; soon after, they were blessed with a noble and virtuous prince who brought joy to the kingdom.',
    storyHi:
      'भविष्य पुराण के अनुसार, भद्रावती नगरी के धर्मात्मा राजा सुकेतुमान और उनकी रानी शैव्या संतानहीन होने के कारण अत्यंत दुखी रहते थे। एक दिन राजा वन में भ्रमण करते हुए संतों के आश्रम पहुंचे। महर्षियों ने राजा को श्रावण मास के शुक्ल पक्ष की पुत्रदा एकादशी का व्रत रखने का परामर्श दिया। राजा ने अपनी रानी के साथ विधि-विधान से यह व्रत रखा। इस व्रत के पुण्य प्रभाव से रानी गर्भवती हुईं और उन्होंने एक तेजस्वी और धर्मनिष्ठ पुत्र को जन्म दिया, जिसने अपने वंश का नाम उज्ज्वल किया।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu'],
    deityHi: ['भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/shravana-putrada/shravana-putrada-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'raksha_bandhan_2026_08_27',
    name: 'Raksha Bandhan',
    nameHi: 'रक्षा बंधन',
    englishName: 'Raksha Bandhan',
    hindiName: 'रक्षा बंधन',
    date: '2026-08-27',
    year: 2026,
    month: 8,
    day: 27,
    dayOfWeek: 'Thursday',
    dayOfWeekHi: 'गुरुवार',
    dateStrEn: 'August 27, 2026, Thursday',
    dateStrHi: 'अगस्त 27, 2026, गुरुवार',
    tithi: 'Shravana, Purnima',
    tithiHi: 'श्रावण, पूर्णिमा',
    description:
      'Sacred bond of protection and unconditional love between brothers and sisters.',
    descriptionHi:
      'भाई-बहन के अटूट स्नेह, रक्षा के संकल्प और पवित्र धागे (राखी) का पावन पर्व।',
    story:
      'Raksha Bandhan finds rich origins across the Mahabharata and Bhagavata Purana. When Lord Krishna cut His index finger while slaying Shishupala with the Sudarshana Chakra, Queen Draupadi immediately tore a piece of her silk sari and tied it around His bleeding finger. Touched by her love, Krishna pledged to protect her dignity across all times, fulfilling His promise during the vastraharan in the Kaurava court. In another tradition, Goddess Lakshmi tied a sacred protective thread on demon king Bali’s wrist to liberate Lord Vishnu from His guard duties in Sutala, establishing the holy Raksha Bandhan covenant.',
    storyHi:
      'महाभारत के अनुसार, जब शिशुपाल वध के समय सुदर्शन चक्र से भगवान श्रीकृष्ण की उंगली में चोट लग गई और रक्त बहने लगा, तो द्रौपदी ने बिना पल गंवाए अपनी रेशमी साड़ी का पल्लू फाड़कर प्रभु की उंगली पर बांध दिया। श्रीकृष्ण ने द्रौपदी को अपनी बहन मानकर संकट के समय रक्षा का वचन दिया और चीरहरण के समय अनंत वस्त्र प्रदान कर लाज बचाई। भागवत कथा में भी माता लक्ष्मी ने राजा बलि को रक्षासूत्र बांधकर भाई बनाया था और उपहार स्वरूप भगवान विष्णु को पाताल से वैकुंठ लौटाने का वरदान मांगा था। तभी से श्रावण पूर्णिमा पर रक्षाबंधन मनाया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Krishna', 'Mata Draupadi', 'Goddess Lakshmi'],
    deityHi: ['भगवान श्रीकृष्ण', 'माता द्रौपदी', 'मां लक्ष्मी'],
    regions: ['All India', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/raksha-bandhan/raksha-bandhan-date-time.html?year=2026',
  },
  {
    id: 'aja_ekadashi_2026_09_06',
    name: 'Aja Ekadashi',
    nameHi: 'अजा एकादशी',
    englishName: 'Aja Ekadashi',
    hindiName: 'अजा एकादशी',
    date: '2026-09-06',
    year: 2026,
    month: 9,
    day: 6,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'September 06, 2026, Sunday',
    dateStrHi: 'सितंबर 06, 2026, रविवार',
    tithi: 'Bhadrapada, Krishna Ekadashi',
    tithiHi: 'भाद्रपद, कृष्ण एकादशी',
    description:
      'Restores lost kingdom, family honor, and righteousness through truth and devotion.',
    descriptionHi:
      'भाद्रपद कृष्ण पक्ष की एकादशी, जिसके प्रभाव से सत्यवादी राजा हरिश्चंद्र को उनका खोया हुआ राज्य व परिवार पुनः प्राप्त हुआ।',
    story:
      'In the Brahma Vaivarta Purana, Lord Krishna narrates the uplifting story of King Harishchandra of Ayodhya to King Yudhishthira. To uphold the sanctity of truth (Satya), King Harishchandra gave away his entire kingdom, sold himself to a cremation ground master (Chandala), and was separated from his wife Taramati and son Rohitashva. One day, Sage Gautama visited him in Kashi and advised him to observe the sacred fast of Bhadrapada Krishna Aja Ekadashi with full devotion. The King observed the fast with night-long prayers. Through its supreme spiritual merit, his son was brought back to life, his kingdom was restored, and his family attained heavenly realms.',
    storyHi:
      'ब्रह्मवैवर्त पुराण के अनुसार, सत्यवादी राजा हरिश्चंद्र ने सत्य की रक्षा के लिए अपना संपूर्ण राजपाट दान कर दिया और स्वयं को काशी के श्मशान में चांडाल के हाथों बेच दिया। उनकी पत्नी और पुत्र भी अलग-अलग बिक गए। उनके कष्टों को देखकर महर्षि गौतम ने उन्हें भाद्रपद कृष्ण एकादशी (अजा एकादशी) का विधिपूर्वक व्रत और जागरण करने को कहा। राजा हरिश्चंद्र ने निष्ठा से यह व्रत पूर्ण किया। व्रत के प्रभाव से उनके मृत पुत्र को जीवनदान मिला, पत्नी और राजपाट वापस प्राप्त हुआ और अंत में वे सपरिवार वैकुंठ धाम को पधारे।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Hrishikesha (Vishnu)'],
    deityHi: ['भगवान हृषीकेश (विष्णु)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/aja/aja-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'gauna_aja_ekadashi_2026_09_07',
    name: 'Gauna Aja Ekadashi',
    nameHi: 'गौण अजा एकादशी',
    englishName: 'Gauna Aja Ekadashi',
    hindiName: 'गौण अजा एकादशी',
    date: '2026-09-07',
    year: 2026,
    month: 9,
    day: 7,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'September 07, 2026, Monday',
    dateStrHi: 'सितंबर 07, 2026, सोमवार',
    tithi: 'Bhadrapada, Krishna Ekadashi',
    tithiHi: 'भाद्रपद, कृष्ण एकादशी',
    description:
      'Vaishnava and ascetic observance of Aja Ekadashi based on Arunodaya and Smartha-Vaishnava calculation.',
    descriptionHi:
      'वैष्णव संप्रदाय एवं सन्यासियों द्वारा अजा एकादशी का विशेष व्रत एवं भगवान हृषीकेश की आराधना।',
    story:
      'Gauna Aja Ekadashi is the second day observance of Aja Ekadashi, observed especially by Vaishnava devotees, saints, and Sanyasis when the Ekadashi tithi overlaps across two solar dawns (Arunodaya). It follows the same sacred legend of King Harishchandra’s unwavering commitment to Truth and Lord Vishnu’s redemption, focusing on intense Harinaam Sankirtan, meditation, and total surrender to the lotus feet of Sri Hari.',
    storyHi:
      'जब एकादशी तिथि दो दिनों तक व्याप्त होती है, तो वैष्णव संप्रदाय, संत और सन्यासी दूसरे दिन गौण अजा एकादशी का व्रत रखते हैं। यह व्रत सत्य, तप और भगवान श्रीहरि के प्रति अनन्य समर्पण का दिन है। इसमें भक्तजन सत्यवादी राजा हरिश्चंद्र की कथा का श्रवण करते हैं और भगवान विष्णु के हृषीकेश स्वरूप की आराधना कर हरि नाम संकीर्तन में लीन रहते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Hrishikesha (Vishnu)'],
    deityHi: ['भगवान हृषीकेश (विष्णु)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/aja/aja-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'ganesh_chaturthi_2026_09_14',
    name: 'Ganesh Chaturthi',
    nameHi: 'गणेश चतुर्थी',
    englishName: 'Ganesh Chaturthi',
    hindiName: 'गणेश चतुर्थी',
    date: '2026-09-14',
    year: 2026,
    month: 9,
    day: 14,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'September 14, 2026, Monday',
    dateStrHi: 'सितंबर 14, 2026, सोमवार',
    tithi: 'Bhadrapada, Shukla Chaturthi',
    tithiHi: 'भाद्रपद, शुक्ल चतुर्थी',
    description:
      'Grand arrival and birth celebration of Lord Ganesha, the remover of all obstacles (Vighnaharta).',
    descriptionHi:
      'विघ्नहर्ता, प्रथम पूज्य भगवान श्री गणेश जी के जन्मोत्सव और गणेशोत्सव का भव्य शुभारंभ।',
    story:
      'Chronicled in the Shiva Purana and Ganesha Purana, Goddess Parvati created young Ganesha from turmeric and sandalwood paste before taking Her bath and breathed life into him, appointing him as Her guardian. When Lord Shiva returned, Ganesha dutifully stopped Him from entering. In the ensuing clash, Shiva severed the boy’s head with His Trishula. Seeing Parvati’s intense grief, Shiva sent His Ganas to bring the head of the first living creature facing north, which was a noble elephant (Gajaraj). Shiva attached the elephant head, breathed life into the child, named him Ganapati (Lord of Ganas), and blessed him to be worshiped first before all gods in every ritual.',
    storyHi:
      'शिवपुराण और गणेश पुराण के अनुसार, माता पार्वती ने अपने उबटन से एक बालक की मूर्ति बनाकर उसमें प्राण फूंक दिए और स्नान करते समय उसे द्वारपाल नियुक्त किया। जब भगवान शिव आए, तो बालक ने उन्हें अंदर जाने से रोक दिया। अनजाने में शिवजी के त्रिशूल से बालक का मस्तक कट गया। माता पार्वती के विलाप और क्रोध को शांत करने के लिए शिवजी ने उत्तर दिशा में मिले पहले प्राणी (हाथी) का शीश बालक के धड़ पर स्थापित कर दिया। शिवजी ने उन्हें ‘गणपति’ नाम दिया और वरदान दिया कि किसी भी शुभ कार्य में सर्वप्रथम गणेश जी की ही पूजा होगी।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Ganesha', 'Goddess Parvati', 'Lord Shiva'],
    deityHi: ['भगवान श्री गणेश', 'माता पार्वती', 'भगवान शिव'],
    regions: ['Maharashtra', 'All India', 'Goa', 'Karnataka', 'Worldwide'],
    regionsHi: [
      'महाराष्ट्र',
      'समग्र भारत',
      'गोवा',
      'कर्नाटक',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/ganesh-chaturthi/ganesh-chaturthi-date-time.html?year=2026',
  },
  {
    id: 'vishwakarma_puja_2026_09_16',
    name: 'Vishwakarma Puja',
    nameHi: 'विश्वकर्मा पूजा',
    englishName: 'Vishwakarma Puja',
    hindiName: 'विश्वकर्मा पूजा',
    date: '2026-09-16',
    year: 2026,
    month: 9,
    day: 16,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'September 16, 2026, Wednesday',
    dateStrHi: 'सितंबर 16, 2026, बुधवार',
    tithi: 'on Kanya Sankranti day',
    tithiHi: 'कन्या संक्रान्ति के दिन',
    description:
      'Worship of the divine architect and engineer of the universe, blessing artisans, machines, and tools.',
    descriptionHi:
      'देवताओं के दिव्य शिल्पकार, वास्तुकार और शिल्पकला के अधिष्ठाता भगवान विश्वकर्मा का पूजन।',
    story:
      'In the Rigveda, Mahabharata, and Vishwakarma Purana, Lord Vishwakarma is hailed as the ultimate master of arts, architecture, engineering, and metallurgy. He created the celestial realms including Svarga (heaven), the golden city of Lanka for Ravana, the magnificent coastal city of Dwarka for Lord Krishna, and Indraprastha for the Pandavas. He also forged the divine weapons—Lord Shiva’s Trishula, Lord Vishnu’s Sudarshana Chakra, and Indra’s Vajra. On Kanya Sankranti, engineers, craftspeople, factory workers, and artisans worship their tools and machines in homage to Vishwakarma.',
    storyHi:
      'ऋग्वेद और विश्वकर्मा पुराण के अनुसार भगवान विश्वकर्मा इस ब्रह्मांड के प्रथम वास्तुकार, अभियंता और दिव्य शिल्पकार हैं। उन्होंने ही स्वर्गलोक, सोने की लंका, द्वारका नगरी, इंद्रप्रस्थ और हस्तिनापुर का निर्माण किया था। देवताओं के अस्त्र-शस्त्र—भगवान शिव का त्रिशूल, श्रीकृष्ण का सुदर्शन चक्र, यमराज का कालदंड और इंद्र का वज्र—भी विश्वकर्मा जी ने ही गढ़े थे। कन्या संक्रांति के दिन कारखानों, उद्योगों और तकनीकी संस्थानों में औजारों, मशीनों और शिल्प कौशल की पूजा की जाती है ताकि कार्य में कुशलता और उन्नति प्राप्त हो।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishwakarma'],
    deityHi: ['भगवान विश्वकर्मा'],
    regions: [
      'West Bengal',
      'Bihar',
      'Jharkhand',
      'Uttar Pradesh',
      'All India',
    ],
    regionsHi: [
      'पश्चिम बंगाल',
      'बिहार',
      'झारखंड',
      'उत्तर प्रदेश',
      'समग्र भारत',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/sankranti/vishwakarma-puja-date-time.html?year=2026',
  },
  {
    id: 'radha_ashtami_2026_09_18',
    name: 'Radha Ashtami',
    nameHi: 'राधा अष्टमी',
    englishName: 'Radha Ashtami',
    hindiName: 'राधा अष्टमी',
    date: '2026-09-18',
    year: 2026,
    month: 9,
    day: 18,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'September 18, 2026, Friday',
    dateStrHi: 'सितंबर 18, 2026, शुक्रवार',
    tithi: 'Bhadrapada, Shukla Ashtami',
    tithiHi: 'भाद्रपद, शुक्ल अष्टमी',
    description:
      'Divine appearance day of Sri Radha Rani, the soul of Lord Krishna and queen of Barsana.',
    descriptionHi:
      'श्रीकृष्ण की आह्लादिनी शक्ति, रासेश्वरी श्री राधा रानी जी का बरसाना में पावन प्राकट्योत्सव।',
    story:
      'According to the Padma Purana and Brahma Vaivarta Purana, Sri Radha Rani appeared on Bhadrapada Shukla Ashtami in Rawal and was lovingly brought to Barsana by King Vrishabhanu and Queen Kirtida. She was found resting on a divine golden lotus floating in a sacred pond. Legend holds that the divine baby kept Her eyes closed until Lord Krishna, an infant in Gokul, came before Her, opening Her eyes only to behold Her beloved Krishna as the first sight in creation. Radha Rani represents Hladini Shakti—the internal potency of pure divine love through which Lord Krishna is attained.',
    storyHi:
      'पद्म पुराण और ब्रह्मवैवर्त पुराण के अनुसार, भाद्रपद मास के शुक्ल पक्ष की अष्टमी को बरसाना के निकट रावल ग्राम में वृषभानु जी और माता कीर्तिदा को सरोवर में सुनहरे कमल पर श्री राधा रानी जी का प्राकट्य हुआ। मान्यता है कि जन्म के बाद राधा जी ने अपनी आंखें तब तक नहीं खोलीं जब तक बालकृष्ण उनके समक्ष नहीं पधारे। उन्होंने सृष्टि में सबसे पहले अपने प्राणप्रिय श्रीकृष्ण के ही दर्शन किए। राधा रानी भगवान श्रीकृष्ण की आह्लादिनी शक्ति हैं, जिनकी कृपा के बिना कृष्ण प्रेम और भक्ति असंभव मानी जाती है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Sri Radha Rani', 'Lord Sri Krishna'],
    deityHi: ['श्री राधा रानी', 'भगवान श्रीकृष्ण'],
    regions: ['Barsana', 'Mathura', 'Vrindavan', 'All India'],
    regionsHi: ['बरसाना', 'मथुरा', 'वृन्दावन', 'समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/radha-ashtami/radha-ashtami-date-time.html?year=2026',
  },
  {
    id: 'parsva_ekadashi_2026_09_22',
    name: 'Parsva Ekadashi',
    nameHi: 'पार्श्व एकादशी',
    englishName: 'Parsva Ekadashi',
    hindiName: 'पार्श्व एकादशी',
    date: '2026-09-22',
    year: 2026,
    month: 9,
    day: 22,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'September 22, 2026, Tuesday',
    dateStrHi: 'सितंबर 22, 2026, मंगलवार',
    tithi: 'Bhadrapada, Shukla Ekadashi',
    tithiHi: 'भाद्रपद, शुक्ल एकादशी',
    description:
      'Lord Vishnu turns onto His other side (Parivartana) during Yoga Nidra; worship of Lord Vamana.',
    descriptionHi:
      'भगवान विष्णु क्षीरसागर में शयन करते हुए करवट बदलते हैं (परिवर्तिनी एकादशी); वामन अवतार का पावन पूजन।',
    story:
      'In the Brahma Vaivarta Purana, Lord Krishna explains that on Bhadrapada Shukla Ekadashi, Lord Vishnu turns from His left side to His right side while resting in cosmic Yoga Nidra, which is why it is celebrated as Parivartini or Parsva Ekadashi. On this day, Lord Vishnu assumed the Vamana avatar as a dwarf Brahmin boy and visited King Bali’s grand Ashwamedha Yajna. Asking for only three paces of land, Lord Vamana expanded into the cosmic Trivikrama form—covering the earth in the first step and the heavens in the second. King Bali humbly offered his own head for the third step, earning Lord Vishnu’s eternal grace.',
    storyHi:
      'ब्रह्मवैवर्त पुराण में श्रीकृष्ण ने बताया कि भाद्रपद शुक्ल एकादशी के दिन योगनिद्रा में शयन कर रहे श्रीहरि विष्णु करवट बदलते हैं, इसलिए इसे ‘परिवर्तिनी एकादशी’ या ‘पार्श्व एकादशी’ कहा जाता है। इसी पावन तिथि पर भगवान विष्णु ने वामन अवतार लिया था और राजा बलि के यज्ञ में जाकर तीन पग भूमि दान में मांगी थी। भगवान ने दो पगों में पृथ्वी और स्वर्ग को नाप लिया और तीसरे पग के लिए राजा बलि ने अपना मस्तक समर्पित कर दिया। इस दिन भगवान वामन की पूजा करने से तीनों लोकों के दान का पुण्य प्राप्त होता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vamana', 'Lord Vishnu'],
    deityHi: ['भगवान वामन', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/parsva/parsva-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'ganesh_visarjan_2026_09_25',
    name: 'Ganesh Visarjan',
    nameHi: 'गणेश विसर्जन',
    englishName: 'Ganesh Visarjan',
    hindiName: 'गणेश विसर्जन',
    date: '2026-09-25',
    year: 2026,
    month: 9,
    day: 25,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'September 25, 2026, Friday',
    dateStrHi: 'सितंबर 25, 2026, शुक्रवार',
    tithi: 'Bhadrapada, Shukla Chaturdashi (Anant Chaturdashi)',
    tithiHi: 'भाद्रपद, शुक्ल चतुर्दशी (अनन्त चतुर्दशी)',
    description:
      'Immersion of Lord Ganesha with chants of "Ganpati Bappa Morya", signifying His journey back to Mount Kailash.',
    descriptionHi:
      'अनंत चतुर्दशी पर बाप्पा की भावभीनी विदाई एवं जल में विसर्जन, कैलाश पर्वत प्रस्थान का प्रतीक।',
    story:
      'Ganesh Visarjan takes place on Anant Chaturdashi, concluding the 10-day Ganeshotsav. According to sacred lore, Sage Vedavyasa began dictating the epic Mahabharata to Lord Ganesha on Ganesh Chaturthi. Ganesha wrote continuously for 10 days without a pause, causing His divine body temperature to rise intensely. On the 10th day (Anant Chaturdashi), Vyasa bathed Ganesha in a holy river and applied cooling clay to soothe His body. Visarjan symbolizes the eternal cycle of form emerging from the formless clay and returning to the cosmic waters, promising a swift return the next year ("Pudhchya Varshi Laukariya").',
    storyHi:
      'गणेश विसर्जन का इतिहास महाभारत लेखन से जुड़ा है। महर्षि वेदव्यास जी ने भाद्रपद शुक्ल चतुर्थी से भगवान गणेश को महाभारत की कथा सुनानी शुरू की और गणेश जी ने बिना रुके 10 दिनों तक निरंतर लिखा। लगातार लिखने से गणेश जी के शरीर का तापमान बहुत बढ़ गया। 10वें दिन (अनंत चतुर्दशी) को वेदव्यास जी ने उन्हें शीतल जल के सरोवर में स्नान कराया। मिट्टी की प्रतिमा का जल में विसर्जन यह सिखाता है कि हर रूप अंततः निराकार परमात्मा में विलीन हो जाता है। भक्त अश्रुपूर्ण नेत्रों से ‘अगले बरस तू जल्दी आ’ का जयघोष कर बाप्पा को विदा करते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Ganesha', 'Lord Ananta (Vishnu)'],
    deityHi: ['भगवान गणेश', 'भगवान अनंत (विष्णु)'],
    regions: ['Maharashtra (Mumbai, Pune)', 'All India', 'Worldwide'],
    regionsHi: ['महाराष्ट्र (मुंबई, पुणे)', 'समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/ganesh-chaturthi/ganesh-visarjan-date-time.html?year=2026',
  },
  {
    id: 'indira_ekadashi_2026_10_06',
    name: 'Indira Ekadashi',
    nameHi: 'इन्दिरा एकादशी',
    englishName: 'Indira Ekadashi',
    hindiName: 'इन्दिरा एकादशी',
    date: '2026-10-06',
    year: 2026,
    month: 10,
    day: 6,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'October 06, 2026, Tuesday',
    dateStrHi: 'अक्टूबर 06, 2026, मंगलवार',
    tithi: 'Ashwina, Krishna Ekadashi (Pitru Paksha)',
    tithiHi: 'अश्विन, कृष्ण एकादशी (पितृ पक्ष)',
    description:
      'Observed during Pitru Paksha to liberate ancestors from Yamaloka and grant them salvation in Vaikuntha.',
    descriptionHi:
      'पितृ पक्ष में पड़ने वाली मोक्षदायिनी एकादशी, जिससे पितरों को यमलोक की यातनाओं से मुक्ति और वैकुंठ प्राप्त होता है।',
    story:
      'In the Brahmavaivarta Purana, Lord Krishna narrates the legend of Indira Ekadashi to King Yudhishthira. In the city of Mahishmati, King Indrasena was a pious ruler. One day, Devarshi Narada visited him carrying a message from Indrasena’s deceased father in Yamaloka. His father had incurred a past sin that prevented him from entering higher realms. Narada advised King Indrasena to observe the fast of Ashwina Krishna Indira Ekadashi during Pitru Paksha and dedicate all its spiritual merits to his father. Indrasena faithfully observed the vow with Shraddha rituals; celestial flowers showered, and his father was instantly elevated to Vaikuntha.',
    storyHi:
      'ब्रह्मवैवर्त पुराण के अनुसार, महिष्मती नगरी के धर्मात्मा राजा इंद्रसेन के पास देवर्षि नारद पधारे और बताया कि उनके पिता पूर्व जन्म की भूल के कारण यमलोक में कष्ट भोग रहे हैं। उन्होंने राजा से अपने उद्धार के लिए प्रार्थना की है। नारद जी ने राजा इंद्रसेन को पितृ पक्ष में पड़ने वाली आश्विन कृष्ण इंदिरा एकादशी का व्रत सविधि करने और उसका पुण्य पिता को अर्पित करने का मार्ग बताया। राजा ने पूरे विधि-विधान से व्रत और तर्पण किया। इस पुण्य से उनके पिता यमलोक के कष्टों से मुक्त होकर दिव्य विमान से सीधे वैकुंठ धाम को प्रस्थान कर गए।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Shaligram (Vishnu)', 'Ancestors (Pitras)'],
    deityHi: ['भगवान शालिग्राम (विष्णु)', 'पितृ देव'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/indira/indira-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'navratri_begins_2026_10_11',
    name: 'Navratri Begins',
    nameHi: 'शारदीय नवरात्रि प्रारंभ',
    englishName: 'Navratri Begins',
    hindiName: 'शारदीय नवरात्रि प्रारंभ',
    date: '2026-10-11',
    year: 2026,
    month: 10,
    day: 11,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'October 11, 2026, Sunday',
    dateStrHi: 'अक्टूबर 11, 2026, रविवार',
    tithi: 'Ashwina, Shukla Pratipada (Ghatasthapana)',
    tithiHi: 'अश्विन, शुक्ल प्रतिपदा (घटस्थापना)',
    description:
      'Beginning of the grand Sharad Navratri and invocation of Goddess Durga to vanquish evil.',
    descriptionHi:
      'शारदीय नवरात्रि का पावन शुभारंभ, घटस्थापना और महिषासुरमर्दिनी मां दुर्गा के नौ रूपों की आराधना।',
    story:
      'Described in the Devi Mahatmya (Markandeya Purana), the buffalo demon Mahishasura obtained a boon that no man or god could slay him, and he unleashed terror across the three worlds. The Holy Trinity—Brahma, Vishnu, and Shiva—along with all Devas united their divine radiant energies (Tejas), manifesting the supreme warrior Goddess Durga on Ashwina Shukla Pratipada. Armed with divine weapons gifted by each deity, Mother Durga engaged in a fierce battle lasting nine days and nights, ultimately slaying Mahishasura on Vijayadashami. In the Ramayana, Lord Rama also performed the Sharadiya Chandi Puja before launching His final assault on Lanka.',
    storyHi:
      'देवी महात्म्य (मार्कंडेय पुराण) के अनुसार, जब महिषासुर के अत्याचारों से तीनों लोकों में हाहाकार मच गया और देवता पराजित हो गए, तब ब्रह्मा, विष्णु और महेश सहित समस्त देवों के तेज से मां भगवती दुर्गा का प्राकट्य हुआ। आश्विन शुक्ल प्रतिपदा से मां दुर्गा ने महिषासुर की दानवी सेना के विरुद्ध युद्ध आरंभ किया जो नौ दिनों तक चला। नौवें दिन मां ने महिषासुर का वध कर दिया (महिषासुरमर्दिनी)। रामायण में मर्यादा पुरुषोत्तम भगवान श्रीराम ने भी रावण वध से पूर्व आश्विन नवरात्रि में नौ दिनों तक मां चंडी की गुप्त आराधना की थी और विजय का वरदान प्राप्त किया था।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Maa Durga (Navadurga)', 'Lord Rama'],
    deityHi: ['मां दुर्गा (नवदुर्गा)', 'भगवान श्रीराम'],
    regions: [
      'All India',
      'West Bengal (Durga Puja)',
      'Gujarat (Garba)',
      'Worldwide',
    ],
    regionsHi: [
      'समग्र भारत',
      'पश्चिम बंगाल (दुर्गा पूजा)',
      'गुजरात (गरबा)',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/navratri/sharad-navratri-dates.html?year=2026',
  },
  {
    id: 'dussehra_2026_10_20',
    name: 'Dussehra',
    nameHi: 'दशहरा',
    englishName: 'Dussehra',
    hindiName: 'दशहरा',
    date: '2026-10-20',
    year: 2026,
    month: 10,
    day: 20,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'October 20, 2026, Tuesday',
    dateStrHi: 'अक्टूबर 20, 2026, मंगलवार',
    tithi: 'Ashwina, Shukla Dashami (Vijayadashami)',
    tithiHi: 'अश्विन, शुक्ल दशमी (विजयादशमी)',
    description:
      'Vijayadashami celebrating Lord Rama’s victory over Ravana and Goddess Durga’s slaying of Mahishasura.',
    descriptionHi:
      'बुराई पर अच्छाई और अधर्म पर धर्म की शाश्वत विजय का महापर्व—श्रीराम द्वारा रावण वध एवं मां दुर्गा द्वारा महिषासुर संहार।',
    story:
      'Vijayadashami (Dussehra) marks two monumental victories recorded in Hindu scriptures. In the Valmiki Ramayana, after a fierce battle in Lanka, Lord Sri Rama shot the divine Brahmastra arrow at the ten-headed demon king Ravana on this day, vanquishing his ego, adharma, and freeing Mother Sita. In the Devi Bhagavata, Goddess Durga decapitated the shape-shifting demon Mahishasura after a 9-day battle, earning the title Mahishasuramardini. In the Mahabharata, the Pandavas retrieved their divine weapons from the sacred Shami tree on Vijayadashami after their year in incognito exile (Agyatvas) and defeated the Kaurava army.',
    storyHi:
      'विजयादशमी सनातन संस्कृति में अधर्म पर धर्म और अहंकार पर सत्य की विजय का प्रतीक है। वाल्मीकि रामायण के अनुसार, इसी दिन भगवान श्रीराम ने दस शीश वाले रावण का वध कर लंका पर विजय प्राप्त की थी और माता सीता को मुक्त कराया था। देवी भागवत के अनुसार, इसी दशमी तिथि को मां दुर्गा ने महिषासुर का वध कर देवताओं को भयमुक्त किया था। महाभारत में पांडवों ने अपने एक वर्ष के अज्ञातवास की समाप्ति पर शमी वृक्ष से अपने अस्त्र-शस्त्र पुनः प्राप्त कर कौरव सेना को पराजित किया था। इसलिए इस दिन रावण दहन, शस्त्र पूजन और शमी पत्र के आदान-प्रदान की परंपरा है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Sri Rama', 'Maa Durga'],
    deityHi: ['भगवान श्रीराम', 'मां दुर्गा'],
    regions: ['All India', 'Mysuru', 'Kullu', 'North India', 'Worldwide'],
    regionsHi: [
      'समग्र भारत',
      'मैसूरु',
      'कुल्लू',
      'उत्तर भारत',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/dussehra/dussehra-date-time.html?year=2026',
  },
  {
    id: 'papankusha_ekadashi_2026_10_21',
    name: 'Papankusha Ekadashi',
    nameHi: 'पापांकुशा एकादशी',
    englishName: 'Papankusha Ekadashi',
    hindiName: 'पापांकुशा एकादशी',
    date: '2026-10-21',
    year: 2026,
    month: 10,
    day: 21,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'October 21, 2026, Wednesday',
    dateStrHi: 'अक्टूबर 21, 2026, बुधवार',
    tithi: 'Ashwina, Shukla Ekadashi',
    tithiHi: 'अश्विन, शुक्ल एकादशी',
    description:
      'Acts as an Ankusha (goad) controlling and destroying wild sins; worship of Lord Padmanabha.',
    descriptionHi:
      'अश्विन शुक्ल पक्ष की एकादशी, जो हाथी पर अंकुश की भांति पापों पर नियंत्रण कर मोक्ष प्रदान करती है।',
    story:
      'In the Brahma Vaivarta Purana, Lord Krishna tells King Yudhishthira that Papankusha Ekadashi controls sins just as an Ankusha (sharp goad) controls a rogue elephant. In ancient times, a cruel hunter named Krodhana lived on the Vindhyachal mountains, spending his life in sinful activities. In his old age, gripped by the terror of death and Yamadutas, he approached the hermitage of Sage Angira weeping for salvation. Sage Angira compassionately instructed him to observe the fast of Ashwina Shukla Papankusha Ekadashi with pure repentance. Krodhana observed the fast, worshiping Lord Padmanabha; he was cleansed of all past sins and ascended to Vaikuntha.',
    storyHi:
      'ब्रह्मवैवर्त पुराण में भगवान श्रीकृष्ण ने बताया कि जिस प्रकार अंकुश अनियंत्रित हाथी को वश में करता है, उसी प्रकार ‘पापांकुशा एकादशी’ मनुष्य के समस्त पापों को नष्ट कर देती है। विंध्याचल पर्वत पर क्रोधन नाम का एक क्रूर बहेलिया रहता था, जिसने जीवन भर पाप कर्म किए। वृद्धावस्था में जब यमराज के दूतों का भय सताने लगा, तो वह रोते हुए महर्षि अंगिरा के आश्रम पहुंचा। महर्षि ने दया करके उसे आश्विन शुक्ल पापांकुशा एकादशी का व्रत और भगवान पद्मनाभ की पूजा करने का उपदेश दिया। उस बहेलिये ने निष्ठा से व्रत किया और समस्त पापों से मुक्त होकर दिव्य धाम को प्राप्त हुआ।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Padmanabha (Vishnu)'],
    deityHi: ['भगवान पद्मनाभ (विष्णु)'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/papankusha/papankusha-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'karwa_chauth_2026_10_28',
    name: 'Karwa Chauth',
    nameHi: 'करवा चौथ',
    englishName: 'Karwa Chauth',
    hindiName: 'करवा चौथ',
    date: '2026-10-28',
    year: 2026,
    month: 10,
    day: 28,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'October 28, 2026, Wednesday',
    dateStrHi: 'अक्टूबर 28, 2026, बुधवार',
    tithi: 'Kartika, Krishna Chaturthi',
    tithiHi: 'कार्तिक, कृष्ण चतुर्थी',
    description:
      'Nirjala fast observed by married women for the longevity, health, and prosperity of their husbands.',
    descriptionHi:
      'सुहागिन महिलाओं द्वारा पति की दीर्घायु, स्वास्थ्य और अखंड सौभाग्य के लिए रखा जाने वाला निर्जला व्रत।',
    story:
      'In the Mahabharata, when Arjuna went to the Nilgiri mountains for penance and the Pandavas faced adversity, Draupadi sought Lord Krishna’s guidance. Krishna narrated the ancient legend of Queen Veeravati. Veeravati observed Karwa Chauth at her parents’ home; seeing her faint from hunger, her affectionate brothers created a false moon using a mirror behind a tree fire. Breaking her fast upon seeing the illusion, her husband fell grievously ill. In deep penance, Veeravati observed the fast with complete devotion the following year, worshiping Goddess Parvati and Lord Shiva with clay Karwas (pots). Pleased by her fidelity, Goddess Parvati revived her husband. Women break their day-long fast only after viewing the rising moon through a sieve and making water offerings (Arghya).',
    storyHi:
      'महाभारत के अनुसार, जब पांडवों पर विपत्ति आई तो द्रौपदी ने भगवान श्रीकृष्ण से उपाय पूछा। श्रीकृष्ण ने उन्हें रानी वीरवती की कथा सुनाई। वीरवती ने विवाह के बाद पहली बार मायके में करवा चौथ का व्रत रखा। भूख-प्यास से व्याकुल बहन को देखकर भाइयों ने धोखे से पेड़ के पीछे छलनी में दीपक जलाकर नकली चंद्रमा दिखा दिया। व्रत तोड़ते ही वीरवती के पति की मृत्यु हो गई। रानी ने पूरे वर्ष पति के शव की सेवा की और अगले वर्ष विधिपूर्वक करवा चौथ का निर्जल व्रत रखा। माता पार्वती और भगवान शिव ने प्रसन्न होकर उसके पति को पुनः जीवित कर दिया। सुहागिनें छलनी से चंद्र दर्शन और अर्घ्य देकर यह व्रत पूर्ण करती हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Parvati (Chauth Mata)', 'Lord Shiva', 'Chandra Deva'],
    deityHi: ['चौथ माता (पार्वती)', 'भगवान शिव', 'चंद्र देव'],
    regions: [
      'North India',
      'Punjab',
      'Rajasthan',
      'Uttar Pradesh',
      'Worldwide',
    ],
    regionsHi: [
      'उत्तर भारत',
      'पंजाब',
      'राजस्थान',
      'उत्तर प्रदेश',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/karwa-chauth/karwa-chauth-date-time.html?year=2026',
  },
  {
    id: 'rama_ekadashi_2026_11_04',
    name: 'Rama Ekadashi',
    nameHi: 'रमा एकादशी',
    englishName: 'Rama Ekadashi',
    hindiName: 'रमा एकादशी',
    date: '2026-11-04',
    year: 2026,
    month: 11,
    day: 4,
    dayOfWeek: 'Wednesday',
    dayOfWeekHi: 'बुधवार',
    dateStrEn: 'November 04, 2026, Wednesday',
    dateStrHi: 'नवंबर 04, 2026, बुधवार',
    tithi: 'Kartika, Krishna Ekadashi',
    tithiHi: 'कार्तिक, कृष्ण एकादशी',
    description:
      'Sacred Ekadashi before Diwali honoring Goddess Lakshmi (Rama) and Lord Vishnu.',
    descriptionHi:
      'दीपावली से पूर्व कार्तिक कृष्ण पक्ष की एकादशी, जो मां लक्ष्मी (रमा) और भगवान विष्णु की कृपा से सुख-समृद्धि देती है।',
    story:
      'In the Brahma Vaivarta Purana, Lord Krishna relates the legend of Rama Ekadashi named after Goddess Rama (Lakshmi). In ancient times, King Muchukunda ruled with piety, mandating all citizens to fast on Ekadashi. His daughter Chandrabhaga was married to Prince Shobhana, son of King Chandrasena. Shobhana was physically weak and could not bear hunger, but upon visiting his in-laws during Kartika Krishna Ekadashi, he observed the fast to honor the kingdom’s code and passed away during the night. Due to the spiritual merit of Rama Ekadashi, Shobhana was reborn as the ruler of a magnificent celestial city on Mount Mandara. When Chandrabhaga joined him and transferred her lifelong Ekadashi merits, his kingdom was made permanent and eternal.',
    storyHi:
      'ब्रह्मवैवर्त पुराण के अनुसार, रमा एकादशी का नाम मां लक्ष्मी के ‘रमा’ स्वरूप पर आधारित है। राजा मुचुकुंद की पुत्री चंद्रभागा का विवाह राजा चंद्रसेन के पुत्र शोभन से हुआ था। शोभन शारीरिक रूप से दुर्बल था और भूख सहन नहीं कर पाता था। ससुराल में कार्तिक कृष्ण एकादशी के दिन उसने कठोर व्रत रखा, किंतु रात में भूख के कारण उसके प्राण निकल गए। एकादशी व्रत के महान पुण्य से शोभन को मंदराचल पर्वत पर एक अलौकिक देवपुरी का राज्य मिला। जब चंद्रभागा ने अपने जीवन भर के एकादशी व्रतों का पुण्य पति को समर्पित किया, तो वह देवपुरी चिरस्थाई और दिव्य ऐश्वर्य से संपन्न हो गई।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Lakshmi (Rama)', 'Lord Vishnu'],
    deityHi: ['मां लक्ष्मी (रमा)', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/rama/rama-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'dhanteras_2026_11_06',
    name: 'Dhanteras',
    nameHi: 'धनतेरस',
    englishName: 'Dhanteras',
    hindiName: 'धनतेरस',
    date: '2026-11-06',
    year: 2026,
    month: 11,
    day: 6,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'November 06, 2026, Friday',
    dateStrHi: 'नवंबर 06, 2026, शुक्रवार',
    tithi: 'Kartika, Krishna Trayodashi (Dhanatrayodashi)',
    tithiHi: 'कार्तिक, कृष्ण त्रयोदशी (धनत्रयोदशी)',
    description:
      'Appearance day of Lord Dhanvantari (God of Ayurveda) holding the Amrita Kalash; worship of Kubera and Lakshmi.',
    descriptionHi:
      'आयुर्वेद के जनक भगवान धन्वन्तरि का अमृत कलश सहित प्राकट्य दिवस; कुबेर देव और मां लक्ष्मी का पूजन।',
    story:
      'Described in the Bhagavata Purana, on Kartika Krishna Trayodashi during the churning of the cosmic ocean (Samudra Manthan), Lord Dhanvantari—an avatar of Lord Vishnu and physician of the gods—emerged holding a sacred Kalash filled with the nectar of immortality (Amrita) and texts of Ayurveda. Hence, this day is celebrated as Dhanvantari Jayanti (National Ayurveda Day) and Dhanteras. In another legend, the clever young wife of King Hima’s son saved her husband from the prophesied snakebite of Lord Yama by laying out shimmering gold and brass vessels and lighting lamps (Yama Deepam), blinding the serpent and protecting her husband’s life.',
    storyHi:
      'श्रीमद्भागवत के अनुसार, समुद्र मंथन के समय कार्तिक कृष्ण त्रयोदशी के दिन भगवान धन्वन्तरि (विष्णु के अंशावतार) अपने हाथों में अमृत कलश और आयुर्वेद ग्रंथ लेकर प्रकट हुए थे। इसलिए इस दिन को धन्वन्तरि जयंती और धनतेरस के रूप में मनाया जाता है। इस दिन बर्तन, सोना, चांदी और झाड़ू खरीदना अत्यंत शुभ माना जाता है। एक अन्य पौराणिक कथा के अनुसार, राजा हिम के 16 वर्षीय पुत्र को सर्पदंश से बचाने के लिए उसकी पत्नी ने शयनकक्ष के द्वार पर सोने-चांदी के आभूषणों का ढेर लगाकर दीपक जलाए थे, जिससे यमराज सर्प रूप में आकर भी प्रवेश नहीं कर सके और राजकुमार की जान बच गई।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Dhanvantari', 'Lord Kubera', 'Goddess Lakshmi', 'Lord Yama'],
    deityHi: ['भगवान धन्वन्तरि', 'कुबेर देव', 'मां लक्ष्मी', 'यमराज'],
    regions: ['All India', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/dhanteras/dhanteras-date-time.html?year=2026',
  },
  {
    id: 'diwali_2026_11_08',
    name: 'Diwali',
    nameHi: 'दीपावली',
    englishName: 'Diwali',
    hindiName: 'दीपावली',
    date: '2026-11-08',
    year: 2026,
    month: 11,
    day: 8,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'November 08, 2026, Sunday',
    dateStrHi: 'नवंबर 08, 2026, रविवार',
    tithi: 'Kartika, Amavasya (Lakshmi Puja)',
    tithiHi: 'कार्तिक, अमावस्या (लक्ष्मी पूजा)',
    description:
      'Festival of Lights celebrating Lord Rama’s return to Ayodhya and the emergence of Goddess Lakshmi.',
    descriptionHi:
      'प्रकाश, समृद्धि और आनंद का महापर्व—श्रीराम का 14 वर्ष बाद अयोध्या आगमन एवं मां लक्ष्मी-गणेश पूजन।',
    story:
      'Diwali holds multiple sacred origins in Hindu tradition. In the Ramayana, on the dark night of Kartika Amavasya, Lord Sri Rama, Mata Sita, and Lakshmana returned to Ayodhya after completing 14 years of exile and defeating Ravana. The overjoyed citizens illuminated every street and home of Ayodhya with rows of earthen oil lamps (Deepavali), welcoming their righteous king. In the Puranas, Goddess Lakshmi emerged on this day from the churning of the cosmic ocean (Samudra Manthan) and chose Lord Vishnu as Her consort. Devotees worship Goddess Lakshmi and Lord Ganesha on Diwali evening for prosperity, wisdom, and the inner illumination of the soul.',
    storyHi:
      'दीपावली सनातन धर्म का सबसे बड़ा प्रकाश पर्व है। रामायण के अनुसार, कार्तिक अमावस्या की घोर अंधेरी रात में मर्यादा पुरुषोत्तम भगवान श्रीराम, माता सीता और लक्ष्मण जी 14 वर्ष के वनवास और रावण वध के पश्चात अयोध्या लौटे थे। अयोध्यावासियों ने अपने प्रभु के स्वागत में पूरी नगरी को घी के दीयों की पंक्तियों (दीप+आवली) से जगमग कर दिया था। इसके अतिरिक्त इसी दिन समुद्र मंथन से धन, ऐश्वर्य और सौभाग्य की अधिष्ठात्री मां लक्ष्मी जी का प्राकट्य हुआ था और उन्होंने श्रीहरि का वरण किया था। इस रात मां लक्ष्मी और गणेश जी की पूजा कर सुख-समृद्धि की कामना की जाती है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Lakshmi', 'Lord Ganesha', 'Lord Sri Rama', 'Mata Sita'],
    deityHi: ['मां लक्ष्मी', 'भगवान गणेश', 'भगवान श्रीराम', 'माता सीता'],
    regions: ['All India', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/diwali/diwali-date-time.html?year=2026',
  },
  {
    id: 'govardhan_puja_2026_11_09',
    name: 'Govardhan Puja',
    nameHi: 'गोवर्धन पूजा',
    englishName: 'Govardhan Puja',
    hindiName: 'गोवर्धन पूजा',
    date: '2026-11-09',
    year: 2026,
    month: 11,
    day: 9,
    dayOfWeek: 'Monday',
    dayOfWeekHi: 'सोमवार',
    dateStrEn: 'November 09, 2026, Monday',
    dateStrHi: 'नवंबर 09, 2026, सोमवार',
    tithi: 'Kartika, Shukla Pratipada (Annakut)',
    tithiHi: 'कार्तिक, शुक्ल प्रतिपदा (अन्नकूट)',
    description:
      'Lord Krishna lifting Govardhan Hill on His little finger to protect Vrajavasis; Annakut offering.',
    descriptionHi:
      'भगवान श्रीकृष्ण द्वारा इंद्र का मान मर्दन कर कनिष्ठिका उंगली पर गोवर्धन पर्वत धारण करने का महोत्सव।',
    story:
      'Described in the Bhagavata Purana and Vishnu Purana, the people of Braj were preparing a lavish sacrifice to Lord Indra for rains. Young Krishna advised them that it is Mount Govardhan, nature, and sacred cows who nourish them, not Indra’s pride. When the Vrajavasis worshiped Mount Govardhan instead, an enraged Indra unleashed torrential storms and deluges upon Braj. Krishna lifted the colossal Govardhan Hill on the little finger of His left hand for seven continuous days, sheltering all living beings and cattle safely underneath. Humbled, Indra surrendered and anointed Krishna as "Govinda" (protector of cows). Devotees prepare 56 delicacies (Chhappan Bhog) and Annakut on this day in devotion.',
    storyHi:
      'श्रीमद्भागवत के अनुसार, ब्रजवासी वर्षा के लिए देवराज इंद्र की पूजा की तैयारी कर रहे थे। बालकृष्ण ने उन्हें समझाया कि हमारा पालन-पोषण गोवर्धन पर्वत, प्रकृति और गौमाता करती हैं, अतः हमें गोवर्धन की पूजा करनी चाहिए। क्रोधित होकर इंद्र ने ब्रजमंडल पर मूसलाधार प्रलयकारी वर्षा कर दी। तब श्रीकृष्ण ने अपनी बाईं हाथ की छोटी उंगली पर विशाल गोवर्धन पर्वत को 7 दिनों तक छत्र की भांति उठाए रखा और सभी ब्रजवासियों व पशुओं की रक्षा की। अंततः इंद्र का अहंकार टूटा और उन्होंने श्रीकृष्ण से क्षमा मांगी। इस दिन गाय के गोबर से गोवर्धन पर्वत बनाकर 56 भोग (अन्नकूट) अर्पित किया जाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Krishna (Giridhari)', 'Govardhan Parvat', 'Gau Mata'],
    deityHi: ['भगवान श्रीकृष्ण (गिरिधारी)', 'गोवर्धन पर्वत', 'गौ माता'],
    regions: ['Braj (Mathura, Vrindavan)', 'All India', 'Worldwide'],
    regionsHi: ['ब्रज (मथुरा, वृन्दावन)', 'समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/govardhan-puja/govardhan-puja-date-time.html?year=2026',
  },
  {
    id: 'bhaiya_dooj_2026_11_10',
    name: 'Bhaiya Dooj',
    nameHi: 'भैया दूज',
    englishName: 'Bhaiya Dooj',
    hindiName: 'भैया दूज',
    date: '2026-11-10',
    year: 2026,
    month: 11,
    day: 10,
    dayOfWeek: 'Tuesday',
    dayOfWeekHi: 'मंगलवार',
    dateStrEn: 'November 10, 2026, Tuesday',
    dateStrHi: 'नवंबर 10, 2026, मंगलवार',
    tithi: 'Kartika, Shukla Dwitiya (Yama Dwitiya)',
    tithiHi: 'कार्तिक, शुक्ल द्वितीया (यम द्वितीया)',
    description:
      'Celebrating the sacred bond between brothers and sisters; sisters apply Tilak wishing longevity.',
    descriptionHi:
      'यमराज और यमुना जी के पावन भ्रातृ-स्नेह का प्रतीक पर्व; बहनें भाई को तिलक कर दीर्घायु का आशीर्वाद देती हैं।',
    story:
      'In the Skanda Purana and Padma Purana, Yamuna (Yami) repeatedly invited her busy brother Yama (God of Death) for a meal. On Kartika Shukla Dwitiya, Yama finally visited Yamuna’s home. Overjoyed, Yamuna prepared a sumptuous feast, applied a protective vermilion Tilak on his forehead, and prayed for his eternal well-being. Deeply moved, Lord Yama granted her a boon: any brother who visits his sister on this day, accepts her hospitality, and receives her Tilak will be spared premature death and protected from the fear of Yamaloka. Another tradition recounts Lord Krishna visiting His sister Subhadra after slaying the demon Narakasura, where Subhadra welcomed Him with Tilak and sweets.',
    storyHi:
      'स्कन्द पुराण के अनुसार, मृत्यु के देवता यमराज अपनी बहन यमुना के बार-बार बुलाने पर कार्तिक शुक्ल द्वितीया के दिन उनके घर भोजन करने पहुंचे। यमुना जी ने अत्यंत आदर-सत्कार से भाई को स्वादिष्ट भोजन कराया और मस्तक पर मंगल तिलक लगाकर उनकी दीर्घायु की प्रार्थना की। प्रसन्न होकर यमराज ने वरदान दिया कि जो भाई इस दिन अपनी बहन के घर जाकर उसका आतिथ्य स्वीकार करेगा और तिलक करवाएगा, उसे अकाल मृत्यु और यमलोक का भय नहीं सताएगा। इसी दिन भगवान श्रीकृष्ण भी नरकासुर का वध करने के बाद बहन सुभद्रा के घर पधारे थे, जहां सुभद्रा ने आरती उतारकर उनका स्वागत किया था।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Yama', 'Goddess Yamuna', 'Lord Krishna', 'Subhadra'],
    deityHi: ['यमराज', 'यमुना जी', 'भगवान श्रीकृष्ण', 'सुभद्रा'],
    regions: [
      'All India',
      'North India',
      'Maharashtra (Bhav Bij)',
      'Bengal (Bhai Phonta)',
    ],
    regionsHi: [
      'समग्र भारत',
      'उत्तर भारत',
      'महाराष्ट्र (भाऊ बीज)',
      'बंगाल (भाई फोंटा)',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/bhai-dooj/bhai-dooj-date-time.html?year=2026',
  },
  {
    id: 'chhath_puja_2026_11_15',
    name: 'Chhath Puja',
    nameHi: 'छठ पूजा',
    englishName: 'Chhath Puja',
    hindiName: 'छठ पूजा',
    date: '2026-11-15',
    year: 2026,
    month: 11,
    day: 15,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'November 15, 2026, Sunday',
    dateStrHi: 'नवंबर 15, 2026, रविवार',
    tithi: 'Kartika, Shukla Shashthi (Surya Shashthi)',
    tithiHi: 'कार्तिक, शुक्ल षष्ठी (सूर्य षष्ठी)',
    description:
      'Vedic festival dedicated to Surya Deva (Sun God) and Chhathi Maiya, standing in holy waters offering Arghya.',
    descriptionHi:
      'सूर्य देव और छठी मइया की उपासना का महापर्व; 36 घंटे का निर्जला व्रत और अस्ताचलगामी व उदीयमान सूर्य को अर्घ्य।',
    story:
      'Chhath Puja has ancient roots spanning the Rigveda, Mahabharata, and Ramayana. In the Mahabharata, Suryaputra Karna stood in holy river waters daily at waist height, offering prayers and Arghya to his divine father Surya Deva, which blessed him with invincibility and charitable renown. During their exile, Queen Draupadi and the Pandavas, on the counsel of Sage Dhaumya, observed the strict 4-day Chhath fast, regaining their lost kingdom and prosperity. In the Ramayana, Lord Rama and Mata Sita observed Surya Shashthi fasting upon their return to Ayodhya, establishing Ramrajya. Chhath honors the setting sun (gratitude) as well as the rising sun (new hope).',
    storyHi:
      'छठ महापर्व की परंपरा ऋग्वैदिक काल से चली आ रही है। महाभारत काल में सूर्यपुत्र दानवीर कर्ण प्रतिदिन घंटों कमर तक गंगा जल में खड़े रहकर सूर्य देव की उपासना करते थे और अर्घ्य देते थे, जिससे उन्हें अजेय कवच-कुंडल और यश प्राप्त हुआ। वनवास के दौरान पांडवों के कष्ट दूर करने के लिए महर्षि धौम्य के निर्देश पर द्रौपदी ने छठ का कठिन निर्जला व्रत किया, जिसके प्रभाव से पांडवों को उनका राजपाट वापस मिला। रामायण में श्रीराम और सीता जी ने भी अयोध्या लौटने पर कार्तिक शुक्ल षष्ठी को सूर्योपासना कर कुलदेवता का आभार व्यक्त किया था। यह पर्व अस्त होते और उगते दोनों सूर्य की वंदना सिखाता है।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Surya Deva (Sun God)', 'Chhathi Maiya (Usha & Pratyusha)'],
    deityHi: ['सूर्य देव', 'छठी मइया (उषा व प्रत्युषा)'],
    regions: [
      'Bihar',
      'Jharkhand',
      'Eastern Uttar Pradesh',
      'All India',
      'Worldwide',
    ],
    regionsHi: [
      'बिहार',
      'झारखंड',
      'पूर्वी उत्तर प्रदेश',
      'समग्र भारत',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/festivals/chhath-puja/chhath-puja-date-time.html?year=2026',
  },
  {
    id: 'devutthana_ekadashi_2026_11_20',
    name: 'Devutthana Ekadashi',
    nameHi: 'देवउठनी एकादशी',
    englishName: 'Devutthana Ekadashi',
    hindiName: 'देवउठनी एकादशी',
    date: '2026-11-20',
    year: 2026,
    month: 11,
    day: 20,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'November 20, 2026, Friday',
    dateStrHi: 'नवंबर 20, 2026, शुक्रवार',
    tithi: 'Kartika, Shukla Ekadashi (Prabodhini / Tulsi Vivah)',
    tithiHi: 'कार्तिक, शुक्ल एकादशी (प्रबोधिनी / तुलसी विवाह)',
    description:
      'Lord Vishnu awakens from four-month Yoga Nidra, marking the resumption of all auspicious ceremonies and Tulsi Vivah.',
    descriptionHi:
      'श्रीहरि विष्णु का चार मास की योगनिद्रा से जागरण; चातुर्मास का समापन, तुलसी विवाह और मांगलिक कार्यों का शुभारंभ।',
    story:
      'According to the Padma Purana and Skanda Purana, Devutthana (Prabodhini) Ekadashi is the joyous day when Lord Vishnu awakens from His four-month cosmic slumber (Yoga Nidra), concluding the Chaturmas period. On this day, Lord Vishnu in His sacred Shaligram form marries the sacred plant Tulsi (Mata Vrinda). Vrinda’s pure devotion and austerity transformed her into the sacred Tulsi plant, without which no offering to Lord Vishnu is complete. Performing Tulsi Vivah on Devutthana Ekadashi bestows the spiritual merit of performing Kanyadaan, and all sacred ceremonies like weddings resume across the land.',
    storyHi:
      'पद्म पुराण और स्कन्द पुराण के अनुसार, आषाढ़ मास से शयन कर रहे जगतपालक भगवान विष्णु कार्तिक शुक्ल एकादशी को जागते हैं, इसलिए इसे ‘देवउठनी’ या ‘प्रबोधिनी एकादशी’ कहा जाता है। इसी पावन तिथि पर भगवान विष्णु के शालिग्राम स्वरूप का विवाह पवित्र तुलसी जी (माता वृंदा) के साथ संपन्न कराया जाता है। तुलसी विवाह का आयोजन करने से कन्यादान के समान महान पुण्य की प्राप्ति होती है। इसी दिन से चातुर्मास समाप्त होता है और विवाह, गृह प्रवेश आदि समस्त मांगलिक कार्य प्रारंभ हो जाते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Vishnu (Shaligram)', 'Mata Tulsi (Vrinda)'],
    deityHi: ['भगवान विष्णु (शालिग्राम)', 'माता तुलसी (वृंदा)'],
    regions: ['All India', 'North India', 'Gujarat', 'Maharashtra'],
    regionsHi: ['समग्र भारत', 'उत्तर भारत', 'गुजरात', 'महाराष्ट्र'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/prabodhini/prabodhini-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'utpanna_ekadashi_2026_12_04',
    name: 'Utpanna Ekadashi',
    nameHi: 'उत्पन्ना एकादशी',
    englishName: 'Utpanna Ekadashi',
    hindiName: 'उत्पन्ना एकादशी',
    date: '2026-12-04',
    year: 2026,
    month: 12,
    day: 4,
    dayOfWeek: 'Friday',
    dayOfWeekHi: 'शुक्रवार',
    dateStrEn: 'December 04, 2026, Friday',
    dateStrHi: 'दिसंबर 04, 2026, शुक्रवार',
    tithi: 'Margashirsha, Krishna Ekadashi',
    tithiHi: 'मार्गशीर्ष, कृष्ण एकादशी',
    description:
      'The divine manifestation day of Goddess Ekadashi from the radiant light of Lord Vishnu to vanquish demon Mura.',
    descriptionHi:
      'भगवान विष्णु के दिव्य तेज से एकादशी देवी के प्राकट्य और राक्षस मुर के संहार का पावन दिवस।',
    story:
      'In the Bhavishyottara Purana, Lord Krishna narrates the celestial origin of all Ekadashis to King Yudhishthira. In the Satya Yuga, a fierce demon named Mura defeated the Devas and drove Indra from heaven. Lord Vishnu fought Mura for a thousand years. Resting in a cave named Himavati in Badrikashrama, Vishnu entered Yoga Nidra. As Mura raised his weapon to strike the sleeping Lord, a brilliant, radiant Goddess manifested from Lord Vishnu’s effulgence with celestial weapons and incinerated Mura to ashes. Lord Vishnu awakened, named Her "Ekadashi" (since She appeared on the 11th tithi), and blessed Her that anyone who fasts on Ekadashi will have all sins destroyed and attain Vaikuntha.',
    storyHi:
      'भविष्योत्तर पुराण में भगवान श्रीकृष्ण ने बताया कि सतयुग में ‘मुर’ नामक महाबलशाली दैत्य ने देवताओं को पराजित कर स्वर्ग पर कब्जा कर लिया था। भगवान विष्णु ने मुर के साथ सैकड़ों वर्षों तक युद्ध किया। युद्ध के बाद भगवान बदरिकाश्रम की हिमावती गुफा में विश्राम कर रहे थे। जब मुर ने निद्रामग्न भगवान पर प्रहार करना चाहा, तभी भगवान के शरीर के दिव्य तेज से एक परम सुंदरी और शस्त्रों से सुसज्जित देवी प्रकट हुईं। देवी ने हुंकार भरकर दैत्य मुर का वध कर दिया। भगवान ने प्रसन्न होकर उस एकादशी तिथि को प्रकट होने वाली शक्ति को ‘एकादशी देवी’ नाम दिया और वरदान दिया कि जो भी इस दिन व्रत रखेगा, वह समस्त पापों से मुक्त होकर मोक्ष प्राप्त करेगा।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Goddess Ekadashi', 'Lord Vishnu'],
    deityHi: ['एकादशी देवी', 'भगवान विष्णु'],
    regions: ['All India'],
    regionsHi: ['समग्र भारत'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/utpanna/utpanna-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'mokshada_ekadashi_2026_12_19',
    name: 'Mokshada Ekadashi',
    nameHi: 'मोक्षदा एकादशी',
    englishName: 'Mokshada Ekadashi',
    hindiName: 'मोक्षदा एकादशी',
    date: '2026-12-19',
    year: 2026,
    month: 12,
    day: 19,
    dayOfWeek: 'Saturday',
    dayOfWeekHi: 'शनिवार',
    dateStrEn: 'December 19, 2026, Saturday',
    dateStrHi: 'दिसंबर 19, 2026, शनिवार',
    tithi: 'Margashirsha, Shukla Ekadashi (Gita Jayanti)',
    tithiHi: 'मार्गशीर्ष, शुक्ल एकादशी (गीता जयंती / वैकुंठ एकादशी)',
    description:
      'Gita Jayanti day when Lord Krishna delivered the Bhagavad Gita to Arjuna at Kurukshetra; bestower of ultimate liberation (Moksha).',
    descriptionHi:
      'कुरुक्षेत्र के मैदान में भगवान श्रीकृष्ण द्वारा अर्जुन को श्रीमद्भगवद्गीता के उपदेश का पावन दिवस (गीता जयंती व मोक्षदा एकादशी)।',
    story:
      'Mokshada Ekadashi is celebrated as one of the most sacred days in Sanatan Dharma, coinciding with Gita Jayanti and Vaikuntha Ekadashi. On this day on the battlefield of Kurukshetra, when Arjuna was overwhelmed by dejection, Lord Sri Krishna imparted the immortal wisdom of the Srimad Bhagavad Gita, awakening Arjuna to his supreme duty. In the Brahmanda Purana, King Vaikhanasa of Champakanagar learned that his deceased father was suffering in hell due to past sins. Under the guidance of Sage Parvata, the King and his royal family observed Mokshada Ekadashi with pure devotion and transferred the merit to his father, who was instantly released and ascended to Vaikuntha.',
    storyHi:
      'मार्गशीर्ष शुक्ल एकादशी का सनातन धर्म में सर्वोच्च स्थान है क्योंकि इसी दिन महाभारत के कुरुक्षेत्र में भगवान श्रीकृष्ण ने विषादग्रस्त अर्जुन को ‘श्रीमद्भगवद्गीता’ का अमर उपदेश दिया था, इसलिए इसे ‘गीता जयंती’ भी कहा जाता है। इसके अतिरिक्त ब्रह्मांड पुराण के अनुसार, चंपक नगरी के राजा वैखानस ने अपने पूर्वजों को नरक की यातनाओं से मुक्त कराने के लिए पर्वत मुनि के परामर्श पर मोक्षदा एकादशी का व्रत किया था। व्रत का पुण्य समर्पित करते ही उनके पिता को मोक्ष की प्राप्ति हुई और वे वैकुंठ पधारे। दक्षिण भारत में इस दिन वैकुंठ के द्वार (वैकुंठ द्वारम) खुलते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Sri Krishna (Geeta Updeshak)', 'Lord Damodara (Vishnu)'],
    deityHi: ['भगवान श्रीकृष्ण (गीता उपदेशक)', 'भगवान दामोदर (विष्णु)'],
    regions: [
      'All India',
      'Kurukshetra',
      'South India (Vaikuntha Ekadashi)',
      'Worldwide',
    ],
    regionsHi: [
      'समग्र भारत',
      'कुरुक्षेत्र',
      'दक्षिण भारत (वैकुंठ एकादशी)',
      'वैश्विक स्तर पर',
    ],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/mokshada/mokshada-ekadashi-date-time.html?year=2026',
  },
  {
    id: 'gauna_mokshada_ekadashi_2026_12_20',
    name: 'Gauna Mokshada Ekadashi',
    nameHi: 'गौण मोक्षदा एकादशी',
    englishName: 'Gauna Mokshada Ekadashi',
    hindiName: 'गौण मोक्षदा एकादशी',
    date: '2026-12-20',
    year: 2026,
    month: 12,
    day: 20,
    dayOfWeek: 'Sunday',
    dayOfWeekHi: 'रविवार',
    dateStrEn: 'December 20, 2026, Sunday',
    dateStrHi: 'दिसंबर 20, 2026, रविवार',
    tithi: 'Margashirsha, Shukla Ekadashi',
    tithiHi: 'मार्गशीर्ष, शुक्ल एकादशी',
    description:
      'Vaishnava observance of Mokshada Ekadashi dedicated to Gita recitation and entering Vaikuntha Dwara.',
    descriptionHi:
      'वैष्णव संप्रदाय द्वारा मोक्षदा एकादशी का विशेष व्रत, गीता पाठ एवं वैकुंठ द्वार दर्शन।',
    story:
      'Gauna Mokshada Ekadashi is the second-day observance of Mokshada Ekadashi followed by Vaishnavas and hermits. It celebrates the same divine glories of the Bhagavad Gita’s revelation and the opening of the Vaikuntha gates (Vaikuntha Dwara). Devotees spend the day in complete fasting, continuous recitation of the 700 verses of the Bhagavad Gita, and chanting the sacred Maha-Mantra, seeking ultimate union with the Supreme Personality of Godhead, Lord Sri Krishna.',
    storyHi:
      'वैष्णव संप्रदाय में जब तिथि गणना के अनुसार द्वादशी युक्त एकादशी आती है, तो उसे गौण मोक्षदा एकादशी के रूप में मनाया जाता है। यह दिन श्रीमद्भगवद्गीता के 18 अध्यायों के सामूहिक पाठ, हरिनाम संकीर्तन और वैकुंठ द्वार दर्शन के लिए समर्पित होता है। भक्तजन इस दिन प्रभु श्रीहरि और गीता माता का पूजन कर मोक्ष और भगवत-भक्ति की प्रार्थना करते हैं।',
    category: 'Hindu Festivals & Others',
    categoryHi: 'हिन्दू त्यौहार एवं अन्य',
    deity: ['Lord Sri Krishna', 'Lord Vishnu'],
    deityHi: ['भगवान श्रीकृष्ण', 'भगवान विष्णु'],
    regions: ['All India', 'Worldwide'],
    regionsHi: ['समग्र भारत', 'वैश्विक स्तर पर'],
    imageUrl:
      'https://www.drikpanchang.com/images/festivals/270x180/puja_thali.jpg',
    url: 'https://www.drikpanchang.com/ekadashis/mokshada/mokshada-ekadashi-date-time.html?year=2026',
  },
];

export const CALENDAR_2026_BY_MONTH: CalendarMonth2026[] = MONTH_NAMES.map(
  (m, index) => {
    const monthNum = index + 1;
    return {
      month: monthNum,
      monthName: m.en,
      monthNameHi: m.hi,
      festivals: CALENDAR_2026.filter(f => f.month === monthNum),
    };
  },
);

export const CALENDAR_JANUARY_2026: Festival2026[] =
  CALENDAR_2026_BY_MONTH[0].festivals;

export const getFestivalsForMonth = (month: number): Festival2026[] => {
  const monthData = CALENDAR_2026_BY_MONTH[month - 1];
  return monthData ? monthData.festivals : [];
};

export const getFestivalsForDate = (dateStr: string): Festival2026[] => {
  return CALENDAR_2026.filter(f => f.date === dateStr);
};

export const getFestivalById = (id: string): Festival2026 | undefined => {
  return CALENDAR_2026.find(f => f.id === id);
};

export const searchFestivals = (
  query: string,
  lang: 'en' | 'hi' = 'en',
): Festival2026[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CALENDAR_2026.filter(f => {
    if (lang === 'hi') {
      return (
        f.nameHi.includes(query) ||
        f.tithiHi.includes(query) ||
        (f.storyHi && f.storyHi.includes(query)) ||
        f.name.toLowerCase().includes(q)
      );
    }
    return (
      f.name.toLowerCase().includes(q) ||
      f.tithi.toLowerCase().includes(q) ||
      (f.story && f.story.toLowerCase().includes(q)) ||
      f.nameHi.includes(query)
    );
  });
};

export const getLocalizedFestivalName = (
  festival: Festival2026,
  lang: string,
): string => {
  return lang.startsWith('hi')
    ? festival.nameHi || festival.name
    : festival.name;
};

export const getLocalizedDateStr = (
  festival: Festival2026,
  lang: string,
): string => {
  return lang.startsWith('hi')
    ? festival.dateStrHi || festival.dateStrEn
    : festival.dateStrEn;
};

/**
 * Get localized festival tithi based on language code ('en' or 'hi')
 */
export const getLocalizedTithi = (
  festival: Festival2026,
  lang: string,
): string => {
  return lang.startsWith('hi')
    ? festival.tithiHi || festival.tithi
    : festival.tithi;
};

export const getLocalizedCategory = (
  festival: Festival2026,
  lang: string,
): string => {
  return lang.startsWith('hi')
    ? festival.categoryHi || festival.category
    : festival.category;
};

export const getLocalizedStory = (
  festival: Festival2026,
  lang: string,
): string => {
  return lang.startsWith('hi')
    ? festival.storyHi || festival.story || ''
    : festival.story || '';
};

export default CALENDAR_2026;
