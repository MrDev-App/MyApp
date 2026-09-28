import imagePath from '@assets/index';

export type TempleCategory =
  | 'chardham'
  | 'jyotirlinga'
  | 'shaktipeeth'
  | 'major'
  | 'chota_chardham';

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface TempleTiming {
  openingTime?: string;
  closingTime?: string;
  aartiTimingsHi?: string;
  aartiTimingsEn?: string;
  bestTimeToVisitHi?: string;
  bestTimeToVisitEn?: string;
}

export interface HowToReach {
  byAirHi?: string;
  byAirEn?: string;
  byRailHi?: string;
  byRailEn?: string;
  byRoadHi?: string;
  byRoadEn?: string;
  nearestAirport?: string;
  nearestRailwayStation?: string;
}

export interface TempleFestival {
  nameHi: string;
  nameEn: string;
  dateHi?: string;
  dateEn?: string;
  descriptionHi?: string;
  descriptionEn?: string;
}

export interface TempleItem {
  id: string;
  order?: number;
  isActive?: boolean;
  updatedAt?: string;

  // ── Identity ──────────────────────────────────────────────
  nameHi: string;
  nameEn: string;
  aliasNamesHi?: string[];
  aliasNamesEn?: string[];

  // ── Location ──────────────────────────────────────────────
  locationHi: string;
  locationEn: string;
  addressHi?: string;
  addressEn?: string;
  districtHi?: string;
  districtEn?: string;
  stateHi: string;
  stateEn: string;
  countryHi?: string;
  countryEn?: string;
  pincode?: string;
  geo?: GeoLocation;

  // ── Religious details ─────────────────────────────────────
  deityHi: string;
  deityEn: string;
  otherDeitiesHi?: string[];
  otherDeitiesEn?: string[];
  yugaHi?: string;
  yugaEn?: string;
  directionHi?: string;
  directionEn?: string;
  mythologyHi?: string;
  mythologyEn?: string;

  // ── Categorization ────────────────────────────────────────
  category: TempleCategory;
  categories: TempleCategory[];
  isCharDham?: boolean;
  isJyotirlinga?: boolean;
  isShaktipeeth?: boolean;
  isChotaCharDham?: boolean;
  isDivyaDesam?: boolean;
  tags?: string[];

  // ── History & significance ────────────────────────────────
  historyHi?: string;
  historyEn?: string;
  builtCentury?: string;
  builtByHi?: string;
  builtByEn?: string;
  architectureStyleHi?: string;
  architectureStyleEn?: string;
  significanceHi: string;
  significanceEn: string;
  descriptionHi: string;
  descriptionEn: string;

  // ── Visiting info ─────────────────────────────────────────
  timing: TempleTiming;
  entryFeeHi?: string;
  entryFeeEn?: string;
  dressCodeHi?: string;
  dressCodeEn?: string;
  festivals?: TempleFestival[];

  // ── Connectivity ──────────────────────────────────────────
  howToReach?: HowToReach;
  nearbyAttractionsHi?: string;
  nearbyAttractionsEn?: string;
  nearbyTempleIds?: string[];

  // ── Media ─────────────────────────────────────────────────
  image: any;
  imageUrl?: string;
  galleryImageUrls?: string[];
  videoUrl?: string;
  aartiAudioUrl?: string;

  // ── Contact ───────────────────────────────────────────────
  officialWebsite?: string;
  contactPhone?: string;
}

export const templesData: TempleItem[] = [
  // =========================================================================
  // 1. THE 4 SACRED ALL-INDIA CHAR DHAMS (चार महाधाम)
  // =========================================================================
  {
    id: 'badrinath_dham',
    order: 1,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'बद्रीनाथ धाम (उत्तर धाम - सत्ययुग)',
    nameEn: 'Badrinath Dham (North Dham - Satya Yuga)',
    aliasNamesHi: ['बद्रीनारायण मंदिर', 'विशाल बद्री'],
    aliasNamesEn: ['Badrinarayan Temple', 'Vishal Badri'],
    locationHi: 'चमोली, उत्तराखण्ड (अलकनंदा नदी तट)',
    locationEn: 'Chamoli District, Uttarakhand (Banks of Alaknanda River)',
    addressHi: 'बद्रीनाथ धाम, चमोली, उत्तराखण्ड - 246422',
    addressEn: 'Badrinath Dham, Chamoli, Uttarakhand - 246422',
    districtHi: 'चमोली',
    districtEn: 'Chamoli',
    stateHi: 'उत्तराखण्ड',
    stateEn: 'Uttarakhand',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '246422',
    geo: {
      latitude: 30.7447,
      longitude: 79.4912,
    },
    deityHi: 'भगवान विष्णु (बद्रीनारायण / नर-नारायण)',
    deityEn: 'Lord Vishnu (Badrinarayan / Nara-Narayana)',
    otherDeitiesHi: [
      'माँ लक्ष्मी',
      'गरुड़ जी',
      'कुबेर जी',
      'नारद मुनि',
      'उद्धव जी',
    ],
    otherDeitiesEn: [
      'Goddess Lakshmi',
      'Garuda',
      'Kubera',
      'Narada',
      'Uddhava',
    ],
    yugaHi: 'सत्ययुग',
    yugaEn: 'Satya Yuga',
    directionHi: 'उत्तर (North)',
    directionEn: 'North',
    mythologyHi:
      'जब भगवान विष्णु यहाँ कठोर तपस्या कर रहे थे, तब माँ लक्ष्मी ने बेर (बदरी) का वृक्ष बनकर उन्हें धूप और हिम से बचाया था। अतः इसका नाम बद्रीनाथ पड़ा।',
    mythologyEn:
      'When Lord Vishnu performed intense penance here, Goddess Lakshmi sheltered Him by turning into a Badri (jujube) tree, shielding Him from rain and snow.',
    category: 'chardham',
    categories: ['chardham', 'chota_chardham', 'major'],
    isCharDham: true,
    isChotaCharDham: true,
    isDivyaDesam: true,
    tags: ['chardham', 'vishnu', 'himalayas', 'uttarakhand', 'satya-yuga'],
    historyHi:
      'आठवीं शताब्दी में आद्य शंकराचार्य जी ने नारद कुंड से शालिग्राम विग्रह निकालकर मंदिर में पुनः प्रतिष्ठित किया था।',
    historyEn:
      'In the 8th century CE, Adi Shankaracharya retrieved the self-manifested black Shaligram deity from Narad Kund and enshrined it in the temple.',
    builtCentury: '8th Century CE',
    builtByHi: 'आद्य जगद्गुरु शंकराचार्य',
    builtByEn: 'Adi Shankaracharya',
    architectureStyleHi: 'पारंपरिक गढ़वाली काष्ठ-पाषाण शैली एवं शंकु शिखर',
    architectureStyleEn:
      'Traditional Garhwali stone and wood Himalayan style with conical roof',
    significanceHi:
      'सत्ययुग का पावन उत्तर धाम, 108 दिव्य देशम में सर्वोपरि तथा चार महाधाम एवं छोटा चार धाम दोनों का अभिन्न पावन केंद्र। नर और नारायण पर्वतों के मध्य अलकनंदा तट पर स्थित।',
    significanceEn:
      'The Satya Yuga northern Dham, supreme among 108 Divya Desams, and an integral shrine in both Maha Char Dham and Chota Char Dham circuits.',
    descriptionHi:
      'समुद्र तल से 3,133 मीटर की ऊँचाई पर स्थित बद्रीनाथ धाम में भगवान बद्रीनारायण पद्मासन मुद्रा में ध्यानमग्न विराजमान हैं। मंदिर के कपाट प्रत्येक वर्ष अक्षय तृतीया के निकट खुलते हैं और भाई दूज पर शीतकाल हेतु बंद होते हैं। मंदिर के समीप स्थित तप्त कुण्ड का प्राकृतिक गर्म जल गंधकयुक्त व औषधीय गुणों से परिपूर्ण है।',
    descriptionEn:
      'Perched at an altitude of 3,133 meters in the Garhwal Himalayas, Badrinath enshrines a 1-meter black stone statue of Lord Vishnu in padmasana pose. Opens annually around Akshaya Tritiya (April/May) and closes on Bhai Dooj for winter.',
    timing: {
      openingTime: '04:30 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'महाभिषेक: प्रातः 04:30 | गीता पाठ: सायं 06:00 | शयन आरती: रात्रि 08:30',
      aartiTimingsEn:
        'Maha Abhishek: 04:30 AM | Geeta Path: 06:00 PM | Shayan Aarti: 08:30 PM',
      bestTimeToVisitHi:
        'मई से जून एवं सितम्बर से अक्टूबर (शीतकाल में कपाट बंद रहते हैं)',
      bestTimeToVisitEn:
        'May to June and September to October (temple remains closed in winter)',
    },
    entryFeeHi: 'निःशुल्क दर्शन (विशेष पूजा एवं अभिषेक हेतु आधिकारिक टोकन)',
    entryFeeEn:
      'Free General Darshan (official tokens for special Pujas and Abhishekams)',
    dressCodeHi:
      'पारंपरिक भारतीय मर्यादित वस्त्र (धोती-कुर्ता / साड़ी / सलवार सूट)',
    dressCodeEn:
      'Modest traditional Indian attire (Dhoti-Kurta, Saree, Salwar)',
    festivals: [
      {
        nameHi: 'बद्री-केदार उत्सव',
        nameEn: 'Badri-Kedar Festival',
        dateHi: 'जून माह',
        dateEn: 'June',
        descriptionHi:
          'उत्तराखण्ड की समृद्ध लोक संस्कृति और भक्ति गीतों का महाउत्सव।',
        descriptionEn:
          'Grand cultural celebration of Uttarakhand spiritual heritage and music.',
      },
      {
        nameHi: 'जन्माष्टमी एवं माता मूर्ति मेला',
        nameEn: 'Janmashtami & Mata Murti Mela',
        dateHi: 'भाद्रपद मास (अगस्त/सितम्बर)',
        dateEn: 'August / September',
        descriptionHi:
          'भगवान श्री कृष्ण का जन्मोत्सव एवं माता मूर्ति का पावन पूजनोत्सव।',
        descriptionEn:
          'Celebration of Lord Krishna birth and worshipping Mother Murti.',
      },
    ],
    howToReach: {
      byAirHi:
        'जॉली ग्रांट हवाई अड्डा, देहरादून (लगभग 314 किमी) से टैक्सी या हेलिकॉप्टर सेवा।',
      byAirEn:
        'Jolly Grant Airport, Dehradun (approx 314 km) followed by taxi or helicopter.',
      byRailHi: 'निकटतम रेलवे स्टेशन ऋषिकेश (295 किमी) व योगनगरी ऋषिकेश।',
      byRailEn:
        'Nearest major railway stations: Rishikesh (295 km) & Yog Nagari Rishikesh.',
      byRoadHi:
        'हरिद्वार, ऋषिकेश, जोशीमठ से राष्ट्रीय राजमार्ग 7 (NH-7) द्वारा सुगम सड़क मार्ग।',
      byRoadEn:
        'Connected via all-weather NH-7 passing through Rishikesh, Devprayag, and Joshimath.',
      nearestAirport: 'Jolly Grant Airport, Dehradun (DED)',
      nearestRailwayStation: 'Rishikesh Railway Station (RKSH) / Haridwar (HW)',
    },
    nearbyAttractionsHi:
      'तप्त कुण्ड, माणा गाँव (भारत का प्रथम गाँव), वसुधारा जलप्रपात, भीम पुल, व्यास गुफा, गणेश गुफा',
    nearbyAttractionsEn:
      'Tapt Kund, Mana Village (First Indian Village), Vasudhara Falls, Bhim Pul, Vyas Gufa, Ganesh Gufa',
    image: imagePath.badrinathDham,
  },
  {
    id: 'rameshwaram_dham',
    order: 2,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'रामेश्वरम धाम (दक्षिण धाम - त्रेतायुग)',
    nameEn: 'Rameshwaram Dham (South Dham - Treta Yuga)',
    aliasNamesHi: ['श्री रामनाथस्वामी मंदिर', 'सेतु माधव मंदिर'],
    aliasNamesEn: ['Sri Ramanathaswamy Temple', 'Sethu Madhava Temple'],
    locationHi: 'रामनाथपुरम, तमिलनाडु (पाम्बन द्वीप)',
    locationEn: 'Ramanathapuram District, Tamil Nadu (Pamban Island)',
    addressHi: 'श्री रामनाथस्वामी मंदिर, रामेश्वरम, तमिलनाडु - 623526',
    addressEn: 'Sri Ramanathaswamy Temple, Rameswaram, Tamil Nadu - 623526',
    districtHi: 'रामनाथपुरम',
    districtEn: 'Ramanathapuram',
    stateHi: 'तमिलनाडु',
    stateEn: 'Tamil Nadu',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '623526',
    geo: {
      latitude: 9.2881,
      longitude: 79.3174,
    },
    deityHi: 'भगवान शिव (रामनाथस्वामी ज्योतिर्लिंग)',
    deityEn: 'Lord Shiva (Ramanathaswamy Jyotirlinga)',
    otherDeitiesHi: [
      'माता पर्वतावर्धिनी',
      'भगवान सेतुमाधव (विष्णु)',
      'हनुमान जी',
    ],
    otherDeitiesEn: [
      'Goddess Parvathavarthini',
      'Lord Sethu Madhava (Vishnu)',
      'Lord Hanuman',
    ],
    yugaHi: 'त्रेतायुग',
    yugaEn: 'Treta Yuga',
    directionHi: 'दक्षिण (South)',
    directionEn: 'South',
    mythologyHi:
      'लंका विजय एवं रावण वध के पश्चात ब्रह्महत्या दोष निवारण हेतु मर्यादा पुरुषोत्तम भगवान श्री राम ने माता सीता द्वारा बालू से निर्मित शिवलिंग की विधिवत प्रतिष्ठा की थी।',
    mythologyEn:
      'Lord Rama consecrated the sand Lingam fashioned by Sita Devi to absolve the sin of killing Ravana before crossing the Ram Setu to Sri Lanka.',
    category: 'chardham',
    categories: ['chardham', 'jyotirlinga', 'major'],
    isCharDham: true,
    isJyotirlinga: true,
    tags: [
      'chardham',
      'jyotirlinga',
      'shiva',
      'rameshwaram',
      'treta-yuga',
      'tamil-nadu',
    ],
    historyHi:
      'मंदिर के वर्तमान भव्य स्वरूप और विश्वप्रसिद्ध तीसरे गलियारे का निर्माण 12वीं से 18वीं शताब्दी में पाण्ड्य और सेतुपति राजाओं द्वारा कराया गया था।',
    historyEn:
      'Extensively expanded in the 12th-18th centuries by Pandya kings and the Sethupathi rulers of Ramanathapuram.',
    builtCentury: '12th – 18th Century CE',
    builtByHi: 'पाण्ड्य राजवंश एवं सेतुपति नरेश',
    builtByEn: 'Pandya Dynasty & Sethupathi Rulers',
    architectureStyleHi:
      'विशाल द्रविड़ियन शैली, भव्य गोपुरम एवं 1212 नक्काशीदार स्तंभों वाला गलियारा',
    architectureStyleEn:
      'Dravidian temple architecture with towering Gopurams and longest pillared corridor (1212 pillars)',
    significanceHi:
      'त्रेतायुग से संबंधित पावन दक्षिण धाम, 12 ज्योतिर्लिंगों में एकादश ज्योतिर्लिंग तथा काशी यात्रा की पूर्णता का पावन तीर्थ। मंदिर परिसर में 22 पवित्र तीर्थ (कुण्ड) विद्यमान हैं।',
    significanceEn:
      'The Treta Yuga Southern Dham, 11th Jyotirlinga, and culmination point of Kashi Yatra. Houses 22 sacred Theerthams (wells).',
    descriptionHi:
      'पाम्बन द्वीप पर स्थित रामेश्वरम मंदिर का गलियारा (Corridor) विश्व का सबसे लंबा मंदिर गलियारा है जिसकी लंबाई 1,220 मीटर है। दर्शन से पूर्व अग्नि तीर्थम (समुद्र) और परिसर के 22 पवित्र कुओं के जल से स्नान करने की पावन परंपरा है।',
    descriptionEn:
      'Home to the world’s longest temple corridor measuring 1,220 meters with 1,212 intricately sculpted granite pillars. Devotees take holy bath in Agni Theertham and 22 sacred wells inside the temple.',
    timing: {
      openingTime: '05:00 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'स्पटिक लिंग दर्शन: प्रातः 05:00 | उच्छिकाल पूजा: दोपहर 12:00 | सायं पूजा: 06:00 | शयन पूजा: रात्रि 08:45',
      aartiTimingsEn:
        'Spatika Linga Darshan: 05:00 AM | Uchikala Puja: 12:00 PM | Sayaratchai: 06:00 PM | Arthajama: 08:45 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (सुखद एवं शीतल मौसम)',
      bestTimeToVisitEn: 'October to March (pleasant coastal climate)',
    },
    entryFeeHi:
      'निःशुल्क सामान्य दर्शन (22 कुण्ड स्नान हेतु ₹25 का आधिकारिक टिकट)',
    entryFeeEn:
      'Free general Darshan (nominal ₹25 ticket for 22 Theertham holy baths)',
    dressCodeHi:
      'पारंपरिक भारतीय परिधान (पुरुषों हेतु धोती/अंगवस्त्रम अनिवार्य, महिलाओं हेतु साड़ी/सूट)',
    dressCodeEn:
      'Strict traditional dress code: Dhoti/Veshti for men, Saree/Salwar for women',
    festivals: [
      {
        nameHi: 'महाशिवरात्रि',
        nameEn: 'Maha Shivaratri',
        dateHi: 'फाल्गुन मास (फरवरी/मार्च)',
        dateEn: 'February / March',
        descriptionHi:
          '10 दिवसीय ब्रह्मोत्सव एवं भगवान रामनाथस्वामी व देवी का दिव्य कल्याणम्।',
        descriptionEn:
          '10-day grand Brahmotsavam and divine wedding ceremony of Shiva & Parvathi.',
      },
      {
        nameHi: 'रामलिंग प्रतिष्टा उत्सव',
        nameEn: 'Ramalinga Pratishtha Utsavam',
        dateHi: 'ज्येष्ठ मास (जून)',
        dateEn: 'June',
        descriptionHi:
          'श्री राम द्वारा शिवलिंग प्रतिष्ठा की स्मृति का पावन उत्सव।',
        descriptionEn:
          'Annual festival celebrating the consecration of the Lingam by Lord Rama.',
      },
    ],
    howToReach: {
      byAirHi:
        'मदुरै अंतर्राष्ट्रीय हवाई अड्डा (लगभग 175 किमी) से नियमित टैक्सी व बस सेवा।',
      byAirEn:
        'Madurai International Airport (approx 175 km) is the nearest airport.',
      byRailHi:
        'रामेश्वरम रेलवे स्टेशन (RMM) पाम्बन रेल पुल द्वारा भारत के प्रमुख नगरों से जुड़ा है।',
      byRailEn:
        'Rameswaram Railway Station (RMM) connected via the historic Pamban Sea Bridge.',
      byRoadHi:
        'राष्ट्रीय राजमार्ग 87 (NH-87) और पाम्बन सड़क पुल (अन्नाई इंदिरा गांधी सेतु) द्वारा उत्कृष्ट सड़क कनेक्टिविटी।',
      byRoadEn:
        'Connected via NH-87 over the Annai Indira Gandhi Road Bridge over the ocean.',
      nearestAirport: 'Madurai International Airport (IXM)',
      nearestRailwayStation: 'Rameswaram Railway Station (RMM)',
    },
    nearbyAttractionsHi:
      'धनुषकोडि (भूतहा शहर व रामसेतु बिंदु), पाम्बन ब्रिज, अग्नि तीर्थम, एपीजे अब्दुल कलाम मेमोरियल, पंचमुखी हनुमान मंदिर',
    nearbyAttractionsEn:
      'Dhanushkodi & Ram Setu Point, Pamban Sea Bridge, Agni Theertham, Dr. APJ Abdul Kalam National Memorial, Panchamukhi Hanuman Temple',
    image: imagePath.rameshwaramJyotirlinga,
  },
  {
    id: 'dwarkadhish_dham',
    order: 3,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'द्वारकाधीश धाम (पश्चिम धाम - द्वापरयुग)',
    nameEn: 'Dwarkadhish Dham (West Dham - Dvapara Yuga)',
    aliasNamesHi: ['जगत मंदिर', 'त्रिलोक सुंदर मंदिर'],
    aliasNamesEn: ['Jagat Mandir', 'Trilok Sunder Temple'],
    locationHi: 'देवभूमि द्वारका, गुजरात (गोमती नदी व अरब सागर संगम)',
    locationEn:
      'Devbhumi Dwarka, Gujarat (Confluence of Gomti River & Arabian Sea)',
    addressHi: 'द्वारकाधीश जगत मंदिर, द्वारका, गुजरात - 361335',
    addressEn: 'Dwarkadhish Jagat Mandir, Dwarka, Gujarat - 361335',
    districtHi: 'देवभूमि द्वारका',
    districtEn: 'Devbhumi Dwarka',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '361335',
    geo: {
      latitude: 22.2376,
      longitude: 68.9678,
    },
    deityHi: 'भगवान श्री कृष्ण (द्वारकाधीश / राजाधिराज)',
    deityEn: 'Lord Krishna (Dwarkadhish / King of Dwarka)',
    otherDeitiesHi: [
      'माता रुक्मिणी',
      'बलराम जी',
      'प्रद्युम्न जी',
      'अनिरुद्ध जी',
      'माता देवकी',
    ],
    otherDeitiesEn: [
      'Goddess Rukmini',
      'Balarama',
      'Pradyumna',
      'Aniruddha',
      'Devaki',
    ],
    yugaHi: 'द्वापरयुग',
    yugaEn: 'Dvapara Yuga',
    directionHi: 'पश्चिम (West)',
    directionEn: 'West',
    mythologyHi:
      'मथुरा त्याग के उपरांत भगवान श्री कृष्ण ने समुद्र देव से 12 योजन भूमि लेकर विश्वकर्मा द्वारा इस भव्य स्वर्ण नगरी की रचना कराई थी। यहाँ आद्य शंकराचार्य द्वारा स्थापित पश्चिमी शारदा पीठ स्थित है।',
    mythologyEn:
      'Lord Krishna founded His golden capital here on 12 yojanas of reclaimed sea land. Houses the western Sharada Peetham established by Adi Shankaracharya.',
    category: 'chardham',
    categories: ['chardham', 'major'],
    isCharDham: true,
    isDivyaDesam: true,
    tags: [
      'chardham',
      'krishna',
      'gujarat',
      'dvapara-yuga',
      'dwarka',
      'divya-desam',
    ],
    historyHi:
      'मूल हरि-गृह पर मंदिर का निर्माण भगवान कृष्ण के प्रपौत्र वज्रनाभ द्वारा कराया गया था। वर्तमान 5-मंजिला 72-स्तंभों वाला मंदिर 16वीं शताब्दी में निर्मित है।',
    historyEn:
      'Originally built by Vajranabh (great-grandson of Lord Krishna) over Hari Griha. Present 5-story 72-pillar temple structure dates to 16th century CE.',
    builtCentury: '16th Century CE (Current structure)',
    builtByHi: 'वज्रनाभ (मूल) एवं चालुक्य-सोलंकी राजा',
    builtByEn: 'Vajranabh (Original) & Chalukya/Solanki Rulers',
    architectureStyleHi:
      'चालुक्य-सोलंकी नागर वास्तु शैली, 72 नक्काशीदार पाषाण स्तंभ एवं 52 गज की धर्मध्वजा',
    architectureStyleEn:
      'Chalukya-Solanki Nagara architectural style with 72 carved sandstone pillars and 52-yard sacred flag',
    significanceHi:
      'द्वापरयुग से संबंधित पश्चिम महाधाम, सप्त मोक्षदायिनी पुरियों में प्रमुख। मंदिर के 51 मीटर ऊंचे शिखर पर दिन में 5 बार 52 गज की दिव्य धर्मध्वजा बदली जाती है।',
    significanceEn:
      'The Dvapara Yuga Western Dham, one of the 7 Moksha-granting holy cities (Sapta Puri). Its 51m spire hosts the daily changing of the 52-yard sacred flag.',
    descriptionHi:
      'अरब सागर और गोमती नदी के संगम पर स्थित यह 5-मंजिला जगत मंदिर 72 भव्य नक्काशीदार स्तंभों पर टिका है। मंदिर के दो प्रमुख द्वार हैं — "मोक्ष द्वार" (प्रवेश) और "स्वर्ग द्वार" (गोमती घाट की ओर 56 सीढ़ियों वाला निकास)।',
    descriptionEn:
      'Located on the confluence of Gomti river and the Arabian Sea, this 5-story spire stands on 72 limestone pillars. Features two sacred portals: Moksha Dwar (Entrance) and Swarga Dwar (56 steps leading to Gomti Ghat).',
    timing: {
      openingTime: '06:30 AM',
      closingTime: '09:30 PM',
      aartiTimingsHi:
        'मंगला आरती: 06:30 AM | श्रृंगार: 10:30 AM | संध्या आरती: 07:30 PM | शयन आरती: 08:30 PM',
      aartiTimingsEn:
        'Mangala Aarti: 06:30 AM | Shringar: 10:30 AM | Sandhya Aarti: 07:30 PM | Shayan Aarti: 08:30 PM',
      bestTimeToVisitHi:
        'अक्टूबर से मार्च (एवं भाद्रपद में श्रीकृष्ण जन्माष्टमी)',
      bestTimeToVisitEn:
        'October to March (and during Krishna Janmashtami in Aug/Sep)',
    },
    entryFeeHi:
      'निःशुल्क दर्शन (ध्वजारोहण एवं विशेष भोग हेतु देवस्थान समिति में अग्रिम बुकिंग)',
    entryFeeEn:
      'Free general entry (prior registration for Dhwajarohan flag hoisting)',
    dressCodeHi:
      'पारंपरिक शालीन वस्त्र (धोती-कुर्ता, कुर्ता-पायजामा, साड़ी, सूट)',
    dressCodeEn:
      'Decent traditional Indian clothing (Dhoti, Kurta-Pyjama, Saree, Salwar)',
    festivals: [
      {
        nameHi: 'श्रीकृष्ण जन्माष्टमी',
        nameEn: 'Krishna Janmashtami',
        dateHi: 'भाद्रपद कृष्ण अष्टमी (अगस्त/सितम्बर)',
        dateEn: 'August / September',
        descriptionHi:
          'द्वारका का सबसे भव्य उत्सव जिसमें लाखों श्रद्धालु कान्हा के जन्मोत्सव के साक्षी बनते हैं।',
        descriptionEn:
          'The biggest annual festival celebrating the birth of Lord Krishna with midnight aarti and royal shringar.',
      },
      {
        nameHi: 'होली / डोल उत्सव',
        nameEn: 'Holi / Dolo Utsav',
        dateHi: 'फाल्गुन पूर्णिमा (मार्च)',
        dateEn: 'March',
        descriptionHi: 'ठाकुर जी के संग गुलाल और फूलों की दिव्य होली का उत्सव।',
        descriptionEn:
          'Celebration of colors and flower Holi with Lord Dwarkadhish.',
      },
    ],
    howToReach: {
      byAirHi:
        'जामनगर हवाई अड्डा (137 किमी) अथवा पोरबंदर हवाई अड्डा (105 किमी) से टैक्सी।',
      byAirEn:
        'Jamnagar Airport (137 km) or Porbandar Airport (105 km) with direct taxi/bus services.',
      byRailHi:
        'द्वारका रेलवे स्टेशन (DWK) अहमदाबाद, राजकोट, मुंबई, दिल्ली से सीधे जुड़ा है।',
      byRailEn:
        'Dwarka Railway Station (DWK) has direct trains from Mumbai, Delhi, Ahmedabad, Kolkata.',
      byRoadHi:
        'राजकोट (225 किमी) और जामनगर (135 किमी) से 4-लेन राष्ट्रीय राजमार्ग।',
      byRoadEn:
        'Well connected via state and national highways with regular AC/sleeper bus services.',
      nearestAirport: 'Jamnagar Airport (JGA) / Rajkot Airport (RAJ)',
      nearestRailwayStation: 'Dwarka Railway Station (DWK)',
    },
    nearbyAttractionsHi:
      'बेट द्वारका (नाव द्वारा), रुक्मिणी देवी मंदिर, गोमती घाट, नागेश्वर ज्योतिर्लिंग, सुदामा सेतु, शिवराजपुर ब्लू-फ्लैग बीच',
    nearbyAttractionsEn:
      'Beyt Dwarka (Island by ferry), Rukmini Devi Temple, Gomti Ghat, Nageshwar Jyotirlinga, Sudama Setu, Shivrajpur Blue Flag Beach',
    image: imagePath.dwarkadhishDham,
  },
  {
    id: 'jagannath_puri',
    order: 4,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'श्री जगन्नाथ पुरी धाम (पूर्व धाम - कलियुग)',
    nameEn: 'Shri Jagannath Puri Dham (East Dham - Kali Yuga)',
    aliasNamesHi: ['श्रीक्षेत्र', 'पुरुषोत्तम क्षेत्र', 'नीलांचल'],
    aliasNamesEn: ['Srikshetra', 'Purushottama Kshetra', 'Nilachala'],
    locationHi: 'पुरी, ओडिशा (बंगाल की खाड़ी तट)',
    locationEn: 'Puri, Odisha (Eastern Coast on Bay of Bengal)',
    addressHi: 'श्री जगन्नाथ मंदिर, ग्रैंड रोड, पुरी, ओडिशा - 752001',
    addressEn: 'Shree Jagannatha Temple, Grand Road, Puri, Odisha - 752001',
    districtHi: 'पुरी',
    districtEn: 'Puri',
    stateHi: 'ओडिशा',
    stateEn: 'Odisha',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '752001',
    geo: {
      latitude: 19.8049,
      longitude: 85.8179,
    },
    deityHi: 'भगवान जगन्नाथ (श्रीकृष्ण), बलभद्र व देवी सुभद्रा',
    deityEn: 'Lord Jagannath (Krishna), Balabhadra & Goddess Subhadra',
    otherDeitiesHi: ['सुदर्शन चक्र', 'माता विमला (शक्तिपीठ)', 'महालक्ष्मी जी'],
    otherDeitiesEn: [
      'Sudarshana Chakra',
      'Maa Vimala (Shaktipeeth)',
      'Maha Lakshmi',
    ],
    yugaHi: 'कलियुग',
    yugaEn: 'Kali Yuga',
    directionHi: 'पूर्व (East)',
    directionEn: 'East',
    mythologyHi:
      'राजा इंद्रद्युम्न को भगवान विष्णु ने स्वप्न में दर्शन देकर समुद्र में तैरते नीम के काष्ठ से विग्रह निर्माण का आदेश दिया था। स्वयं विश्वकर्मा ने बढ़ई रूप में विग्रह गढ़े।',
    mythologyEn:
      'King Indradyumna was commanded by Lord Vishnu in a dream to carve deities from a fragrant neem log washed ashore by the ocean.',
    category: 'chardham',
    categories: ['chardham', 'shaktipeeth', 'major'],
    isCharDham: true,
    isShaktipeeth: true,
    isDivyaDesam: true,
    tags: [
      'chardham',
      'jagannath',
      'puri',
      'odisha',
      'rath-yatra',
      'kali-yuga',
      'shaktipeeth',
    ],
    historyHi:
      'वर्तमान 65 मीटर ऊंचे भव्य कलिंग शैली मंदिर का निर्माण 12वीं शताब्दी में पूर्वी गंग वंश के प्रतापी राजा अनंतवर्मन चोडगंग देव द्वारा कराया गया था।',
    historyEn:
      'Present 65-meter temple was commissioned in the 12th century CE by King Anantavarman Chodaganga Deva of the Eastern Ganga Dynasty.',
    builtCentury: '12th Century CE (1161 CE)',
    builtByHi: 'अनंतवर्मन चोडगंग देव (पूर्वी गंग राजवंश)',
    builtByEn: 'King Anantavarman Chodaganga Deva',
    architectureStyleHi:
      'कलिंग वास्तुकला (रेखा देउल व पीढ़ा देउल), नीलकंठ चक्र एवं महाप्रसाद रोषघर',
    architectureStyleEn:
      'Kalinga temple architecture with Rekha Deula vimana, Jagamohana, and world largest traditional kitchen',
    significanceHi:
      'कलियुग का प्रधान पूर्व महाधाम तथा विश्वप्रसिद्ध वार्षिक "रथयात्रा" का पावन केंद्र। यहाँ का "महाप्रसाद" विश्व का सबसे बड़ा पावन अन्नक्षेत्र है जिसे 56 भोग कहा जाता है।',
    significanceEn:
      'The Kali Yuga Eastern Dham and home of the world-renowned annual Ratha Yatra. Features the world largest temple kitchen preparing 56 Bhogas cooked on clay pots over wood fire.',
    descriptionHi:
      'पुरी का जगन्नाथ मंदिर कई चमत्कारों का केंद्र है — मंदिर के शिखर का ध्वज सदा वायु की विपरीत दिशा में लहराता है, इसके ऊपर कोई पक्षी नहीं उड़ता, और प्रवेश करते ही सिंहद्वार पर समुद्र की ध्वनि शांत हो जाती है।',
    descriptionEn:
      'Famous for unique mystical phenomena: the top flag always flutters against the wind direction, no birds fly over the dome, and the sound of the ocean vanishes the moment one steps inside Singhadwara.',
    timing: {
      openingTime: '05:30 AM',
      closingTime: '10:00 PM',
      aartiTimingsHi:
        'द्वारफिटा: प्रातः 05:30 | मंगला आरती: 06:00 | संध्या धूप: सायं 07:00 | बड़शृंगार आरती: रात्रि 10:00',
      aartiTimingsEn:
        'Dwaraphita: 05:30 AM | Mangala Aarti: 06:00 AM | Sandhya Dhupa: 07:00 PM | Badasinghar: 10:00 PM',
      bestTimeToVisitHi:
        'अक्टूबर से मार्च (तथा आषाढ़ मास में जगन्नाथ रथयात्रा)',
      bestTimeToVisitEn:
        'October to March (and during June/July Ratha Yatra festival)',
    },
    entryFeeHi:
      'निःशुल्क सामान्य दर्शन (केवल सनातनी हिंदुओं हेतु प्रवेश परंपरा)',
    entryFeeEn:
      'Free entry (traditional entry policy adhering to ancient temple customs)',
    dressCodeHi:
      'पारंपरिक भारतीय मर्यादित पोशाक (धोती-कुर्ता, साड़ी, सलवार सूट)',
    dressCodeEn:
      'Traditional conservative clothing (Dhoti, Kurta, Saree, Salwar Kameez)',
    festivals: [
      {
        nameHi: 'श्री जगन्नाथ रथयात्रा',
        nameEn: 'Puri Jagannath Ratha Yatra',
        dateHi: 'आषाढ़ शुक्ल द्वितीया (जून/जुलाई)',
        dateEn: 'June / July',
        descriptionHi:
          'भगवान जगन्नाथ, बलभद्र व सुभद्रा का तीन विशाल रथों पर गुंडिचा मंदिर का 9 दिवसीय नगर भ्रमण।',
        descriptionEn:
          'Grand 9-day chariot festival where deities travel to Gundicha Temple on massive wooden chariots pulled by millions.',
      },
      {
        nameHi: 'चंदन यात्रा व नवकलेवर',
        nameEn: 'Chandan Yatra & Nabakalebara',
        dateHi: 'अक्षय तृतीया (वैशाख) / अधिक मास',
        dateEn: 'April-May / Lunar cycle',
        descriptionHi:
          '42 दिवसीय जलक्रीड़ा उत्सव तथा 12-19 वर्षों में विग्रहों का पावन काष्ठ नवीनीकरण (नवकलेवर)।',
        descriptionEn:
          '42-day water sports festival and sacred periodic rebirth/renewal of the wooden deities.',
      },
    ],
    howToReach: {
      byAirHi:
        'बीजू पटनायक अंतर्राष्ट्रीय हवाई अड्डा, भुवनेश्वर (लगभग 60 किमी) से राष्ट्रीय राजमार्ग द्वारा 1 घंटा।',
      byAirEn:
        'Biju Patnaik International Airport, Bhubaneswar (60 km) with NH316 highway connection.',
      byRailHi:
        'पुरी रेलवे स्टेशन (PURI) भारत के सभी प्रमुख महानगरों से सीधे जुड़ा हुआ है।',
      byRailEn:
        'Puri Railway Station (PURI) is a major terminus connected directly to all Indian metros.',
      byRoadHi:
        'भुवनेश्वर-पुरी 4-लेन नेशनल हाईवे (NH-316) द्वारा निरंतर बस व कैब सेवाएं।',
      byRoadEn:
        'NH-316 4-lane expressway connects Bhubaneswar to Puri with frequent bus and taxi services.',
      nearestAirport: 'Biju Patnaik International Airport, Bhubaneswar (BBI)',
      nearestRailwayStation: 'Puri Railway Station (PURI)',
    },
    nearbyAttractionsHi:
      'कोणार्क सूर्य मंदिर (यूनेस्को धरोहर), पुरी गोल्डन बीच, चिल्का झील (डॉल्फिन अभयारण्य), गुंडिचा मंदिर, साक्षी गोपाल',
    nearbyAttractionsEn:
      'Konark Sun Temple (UNESCO), Puri Golden Beach (Blue Flag), Chilika Lake, Gundicha Temple, Sakshi Gopal Temple',
    image: imagePath.jagannathPuriDham,
  },

  {
    id: 'somnath_jyotirlinga',
    order: 5,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'सोमनाथ ज्योतिर्लिंग (प्रथम ज्योतिर्लिंग)',
    nameEn: 'Somnath Jyotirlinga (First Jyotirlinga)',
    aliasNamesHi: ['प्रभात पाटन', 'सोमेश्वर महादेव'],
    aliasNamesEn: ['Prabhas Patan', 'Someshwar Mahadev'],
    locationHi: 'प्रभास पाटन, वेरावल, गुजरात (अरब सागर तट)',
    locationEn: 'Prabhas Patan, Veraval, Gujarat (Coast of Arabian Sea)',
    addressHi: 'सोमनाथ मंदिर, प्रभास पाटन, वेरावल, गुजरात - 362268',
    addressEn: 'Somnath Temple, Prabhas Patan, Veraval, Gujarat - 362268',
    districtHi: 'गिर सोमनाथ',
    districtEn: 'Gir Somnath',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '362268',
    geo: {
      latitude: 20.888,
      longitude: 70.4012,
    },
    deityHi: 'भगवान शिव (सोमनाथ महादेव)',
    deityEn: 'Lord Shiva (Somnath Mahadev)',
    otherDeitiesHi: ['माता पार्वती', 'भगवान गणेश', 'कार्तिकेय जी'],
    otherDeitiesEn: ['Goddess Parvati', 'Lord Ganesha', 'Kartikeya'],
    directionHi: 'पश्चिम (West)',
    directionEn: 'West',
    mythologyHi:
      'प्रजापति दक्ष के शाप से क्षय रोग ग्रस्त चंद्रदेव (सोम) ने यहाँ भगवान शिव की कठोर तपस्या कर शापमुक्ति पाई थी और स्वर्ण का मूल मंदिर बनवाया था।',
    mythologyEn:
      'Chandra Dev (Moon God) was cured of consumption caused by Daksha curse after worshiping Shiva here, and built the first golden temple.',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: ['jyotirlinga', 'shiva', 'somnath', 'gujarat', 'first-jyotirlinga'],
    historyHi:
      'अनेकों बार विध्वंस के बाद सरदार वल्लभभाई पटेल के संकल्प से 1951 में आधुनिक भारत में मंदिर का भव्य पुनर्निर्माण हुआ।',
    historyEn:
      'Reconstructed multiple times throughout history; final modern reconstruction was initiated by Sardar Vallabhbhai Patel in 1951.',
    builtCentury: '1951 CE (Modern Reconstruction)',
    builtByHi: 'सरदार वल्लभभाई पटेल एवं के.एम. मुंशी',
    builtByEn: 'Sardar Vallabhbhai Patel & K. M. Munshi',
    architectureStyleHi: 'चालुक्य-कैलाश महामेरु प्रासाद नागर शैली',
    architectureStyleEn:
      'Chalukya Kailash Mahameru Prasad Nagara architectural style',
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में सर्वप्राचीन "प्रथम ज्योतिर्लिंग"। मंदिर प्रांगण में स्थित बाणस्तंभ यह प्रमाणित करता है कि यहाँ से अंटार्कटिका (दक्षिणी ध्रुव) तक समुद्र में कोई भूभाग नहीं है।',
    significanceEn:
      'First of the 12 Jyotirlingas. Features the historic Baan Stambh (Arrow Pillar) indicating an unobstructed sea line directly to Antarctica.',
    descriptionHi:
      'अरब सागर की गर्जना करती लहरों के किनारे स्थित यह भव्य पाषाण मंदिर सनातन आस्था के अमरत्व का जीवंत प्रतीक है। सायं काल मंदिर में "ध्वनि एवं प्रकाश" (Sound & Light) शो आयोजित होता है।',
    descriptionEn:
      'Perched on the roaring shores of Arabian Sea, Somnath stands as an eternal symbol of resilience. Hosts nightly Sound & Light show (Jay Somnath).',
    timing: {
      openingTime: '06:00 AM',
      closingTime: '10:00 PM',
      aartiTimingsHi:
        'प्रातः आरती: 07:00 | मध्याह्न आरती: 12:00 | सायं आरती: 07:00 | लाइट एंड साउंड शो: रात्रि 08:00',
      aartiTimingsEn:
        'Morning Aarti: 07:00 AM | Noon Aarti: 12:00 PM | Evening Aarti: 07:00 PM | Light & Sound: 08:00 PM',
      bestTimeToVisitHi:
        'अक्टूबर से मार्च (कार्तिक पूर्णिमा मेला एवं महाशिवरात्रि)',
      bestTimeToVisitEn:
        'October to March (Kartik Purnima Fair and Maha Shivaratri)',
    },
    entryFeeHi: 'निःशुल्क दर्शन (लाइट एंड साउंड शो ₹30/₹50)',
    entryFeeEn: 'Free entry (nominal ticket for Sound & Light Show)',
    dressCodeHi: 'पारंपरिक मर्यादित परिधान (जींस/शॉर्ट्स प्रतिबंधित)',
    dressCodeEn:
      'Traditional Indian attire (shorts, sleeveless clothes not permitted)',
    festivals: [
      {
        nameHi: 'महाशिवरात्रि महोत्सव',
        nameEn: 'Maha Shivaratri Mahotsav',
        dateHi: 'फाल्गुन कृष्ण त्रयोदशी',
        dateEn: 'February / March',
        descriptionHi: '4 दिवसीय भव्य शिव उत्सव व पालकी यात्रा।',
        descriptionEn:
          '4-day grand festival with continuous Vedic recitations and palanquin procession.',
      },
    ],
    howToReach: {
      byAirHi: 'दीव हवाई अड्डा (85 किमी) अथवा राजकोट (195 किमी) से टैक्सी।',
      byAirEn: 'Diu Airport (85 km) or Rajkot International Airport (195 km).',
      byRailHi: 'वेरावल जंक्शन (VRL) मंदिर से मात्र 6 किमी दूर है।',
      byRailEn: 'Veraval Junction (VRL) is just 6 km from the temple.',
      byRoadHi: 'अहमदाबाद, जूनागढ़ और पोरबंदर से सुगम 4-लेन राजमार्ग।',
      byRoadEn:
        'State highway network connects directly to Ahmedabad (410 km) and Rajkot (195 km).',
      nearestAirport: 'Diu Airport (DIU) / Rajkot Airport (HSR)',
      nearestRailwayStation: 'Veraval Railway Station (VRL)',
    },
    nearbyAttractionsHi:
      'भालका तीर्थ (श्रीकृष्ण देहोत्सर्ग स्थल), त्रिवेणी संगम (हिरण, कपिला, सरस्वती), गीता मंदिर, गिर राष्ट्रीय उद्यान (एशियाई शेर)',
    nearbyAttractionsEn:
      'Bhalka Tirth (Lord Krishna departure site), Triveni Sangam, Gita Mandir, Gir National Park (Asiatic Lions)',
    image: imagePath.somnathJyotirlinga,
  },
  {
    id: 'mallikarjuna_jyotirlinga',
    order: 6,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'मल्लिकार्जुन ज्योतिर्लिंग (श्रीशैलम)',
    nameEn: 'Mallikarjuna Jyotirlinga (Srisailam)',
    aliasNamesHi: ['श्रीशैलम मंदिर', 'दक्षिण का कैलास'],
    aliasNamesEn: ['Srisailam Temple', 'Kailash of the South'],
    locationHi: 'नंद्याल जिला, आन्ध्र प्रदेश (कृष्णा नदी व नल्लामल्ला वन)',
    locationEn:
      'Nandyal District, Andhra Pradesh (Banks of Krishna River, Nallamala Hills)',
    addressHi:
      'श्री भ्रामराम्बा मल्लिकार्जुन स्वामी मंदिर, श्रीशैलम, आन्ध्र प्रदेश - 518101',
    addressEn:
      'Sri Bhramaramba Mallikarjuna Swamy Temple, Srisailam, Andhra Pradesh - 518101',
    districtHi: 'नंद्याल',
    districtEn: 'Nandyal',
    stateHi: 'आन्ध्र प्रदेश',
    stateEn: 'Andhra Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '518101',
    geo: {
      latitude: 16.074,
      longitude: 78.868,
    },
    deityHi: 'भगवान शिव (मल्लिकार्जुन) व माता भ्रामराम्बा',
    deityEn: 'Lord Shiva (Mallikarjuna) & Goddess Bhramaramba Devi',
    yugaHi: 'सत्ययुग / त्रेतायुग',
    yugaEn: 'Satya / Treta Yuga',
    directionHi: 'दक्षिण (South)',
    directionEn: 'South',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'shaktipeeth', 'major'],
    isJyotirlinga: true,
    isShaktipeeth: true,
    tags: [
      'jyotirlinga',
      'shaktipeeth',
      'srisailam',
      'andhra-pradesh',
      'shiva',
    ],
    historyHi:
      'सातवाहन, इक्ष्वाकु, काकतीय और विजयनगर सम्राट श्री कृष्णदेवराय द्वारा मंदिर का विस्तार कराया गया था।',
    historyEn:
      'Patronized by Satavahanas, Kakatiyas, and expanded by Vijayanagara Emperor Sri Krishnadevaraya in 1516 CE.',
    builtCentury: '6th – 16th Century CE',
    builtByHi: 'सातवाहन एवं विजयनगर साम्राज्य',
    builtByEn: 'Satavahana & Vijayanagara Dynasties',
    architectureStyleHi:
      'विजयनगर एवं द्रविड़ियन वास्तु शैली, उत्तुंग गोपुरम व प्राचीर',
    architectureStyleEn:
      'Dravidian and Vijayanagara architectural style with towering Gopurams and sculpted battlements',
    significanceHi:
      'भारत का एकमात्र ऐसा दुर्लभ पवित्र तीर्थ जहाँ "द्वादश ज्योतिर्लिंग" तथा "अष्टादश महाशक्तिपीठ" (माँ भ्रामराम्बा) एक ही परिसर में एक साथ विद्यमान हैं।',
    significanceEn:
      'The only divine shrine in India that is simultaneously one of the 12 Jyotirlingas and one of the 18 Maha Shakti Peethas (Bhramaramba Devi).',
    descriptionHi:
      'नल्लामल्ला पहाड़ियों में कृष्णा नदी (पाताल गंगा) के तट पर स्थित यह धाम "दक्षिण का कैलास" कहलाता है। आदि शंकराचार्य जी ने यहाँ "शिवानंद लहरी" स्तोत्र की रचना की थी।',
    descriptionEn:
      'Nestled in Nallamala dense forests overlooking Krishna river (Patalganga). Adi Shankara composed his famous Sivananda Lahari here.',
    timing: {
      openingTime: '04:30 AM',
      closingTime: '10:00 PM',
      aartiTimingsHi:
        'सुप्रभातम्: 04:30 | महामंगल आरती: 05:30 | स्पर्श दर्शन: प्रातः 06:00 | शयन आरती: 09:30',
      aartiTimingsEn:
        'Suprabhatam: 04:30 AM | Mangala Aarti: 05:30 AM | Sparsha Darshan: 06:00 AM | Ekantha Seva: 09:30 PM',
      bestTimeToVisitHi: 'सितम्बर से मार्च',
      bestTimeToVisitEn: 'September to March',
    },
    howToReach: {
      byAirHi:
        'राजीव गांधी अंतर्राष्ट्रीय हवाई अड्डा, हैदराबाद (लगभग 200 किमी)।',
      byAirEn: 'Rajiv Gandhi International Airport, Hyderabad (approx 200 km).',
      byRailHi: 'मरकापुर रोड रेलवे स्टेशन (85 किमी) अथवा कुरनूल/हैदराबाद।',
      byRailEn: 'Markapur Road Railway Station (85 km) or Nandyal / Kurnool.',
      byRoadHi: 'हैदराबाद, विजयवाड़ा और तिरुपति से सीधी बस सेवाएं।',
      byRoadEn:
        'Regular state buses connecting through forest ghat roads from Hyderabad and Vijayawada.',
      nearestAirport: 'Hyderabad International Airport (HYD)',
      nearestRailwayStation: 'Markapur Road (MRK) / Kurnool (KRNT)',
    },
    nearbyAttractionsHi:
      'पाताल गंगा (रोपवे व नौकायन), श्रीशैलम बाँध, साक्षी गणपति, पालधारा पंचधारा, इष्टकामेश्वरी मंदिर',
    nearbyAttractionsEn:
      'Patalganga & Ropeway, Srisailam Dam, Sakshi Ganapathi, Phaladhara Panchadhara, Ishtakameshwari Temple',
    image: imagePath.mallikarjunaJyotirlinga,
  },
  {
    id: 'mahakaleshwar_jyotirlinga',
    order: 7,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'महाकालेश्वर ज्योतिर्लिंग (उज्जैन)',
    nameEn: 'Mahakaleshwar Jyotirlinga (Ujjain)',
    aliasNamesHi: ['महाकाल', 'काल के काल महाकाल', 'अवंतिका नाथ'],
    aliasNamesEn: ['Mahakal', 'Avantika Nath', 'Lord of Time and Death'],
    locationHi: 'उज्जैन, मध्य प्रदेश (क्षिप्रा नदी तट)',
    locationEn: 'Ujjain, Madhya Pradesh (Banks of Holy Shipra River)',
    addressHi:
      'श्री महाकालेश्वर मंदिर, जयसिंहपुरा, उज्जैन, मध्य प्रदेश - 456001',
    addressEn:
      'Shri Mahakaleshwar Temple, Jaisinghpura, Ujjain, Madhya Pradesh - 456001',
    districtHi: 'उज्जैन',
    districtEn: 'Ujjain',
    stateHi: 'मध्य प्रदेश',
    stateEn: 'Madhya Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '456001',
    geo: {
      latitude: 23.1827,
      longitude: 75.7682,
    },
    deityHi: 'भगवान शिव (दक्षिणमुखी महाकाल ज्योतिर्लिंग)',
    deityEn: 'Lord Shiva (Dakshinmukhi Mahakaleshwar Jyotirlinga)',
    otherDeitiesHi: [
      'नागचंद्रेश्वर (तीसरी मंजिल)',
      'माता हरसिद्धि (शक्तिपीठ)',
      'काल भैरव',
    ],
    otherDeitiesEn: [
      'Nagchandreshwar (Top Floor)',
      'Maa Harsiddhi',
      'Kal Bhairav',
    ],
    directionHi: 'दक्षिणमुखी (South-facing)',
    directionEn: 'South-facing',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: [
      'jyotirlinga',
      'mahakal',
      'ujjain',
      'bhasma-aarti',
      'kumbh-mela',
      'madhya-pradesh',
    ],
    historyHi:
      'राजा भोज और विक्रमादित्य काल के उपरांत मराठा जनरल राणोजी शिंदे द्वारा 1734 ई. में वर्तमान मंदिर का जीर्णोद्धार कराया गया।',
    historyEn:
      'Rebuilt by Maratha general Ranoji Shinde in 1734 CE following historical destructions in ancient Ujjayini.',
    builtCentury: '18th Century CE (Current structure)',
    builtByHi: 'राणोजी शिंदे (मराठा साम्राज्य)',
    builtByEn: 'Ranoji Shinde',
    architectureStyleHi:
      'मराठा, भूमिजा एवं चालुक्य मिश्रित नागर शैली, विशाल महाकाल लोक कॉरिडोर',
    architectureStyleEn:
      'Bhumija, Chalukya and Maratha Nagara style with the modern Shri Mahakal Lok corridor',
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में एकमात्र स्वयंभू "दक्षिणमुखी ज्योतिर्लिंग" तथा विश्वप्रसिद्ध प्रातःकालीन "भस्म आरती" का अलौकिक धाम। काल चक्र के अधिष्ठाता महाकाल।',
    significanceEn:
      'The only South-facing (Dakshinmukhi) self-manifested Jyotirlinga, famous worldwide for the pre-dawn Bhasma Aarti (Sacred Ash Ritual).',
    descriptionHi:
      'रुद्रसागर झील के समीप स्थित यह 3-मंजिला मंदिर भूमिगत ओंकारेश्वर और शीर्ष पर नागचंद्रेश्वर (जो केवल नागपंचमी पर खुलता है) से सुशोभित है। हाल ही में निर्मित "श्री महाकाल लोक" कॉरिडोर 900 मीटर लंबा भव्य सांस्कृतिक गलियारा है।',
    descriptionEn:
      'Three-story temple with Mahakal on lowest level, Omkareshwar in middle, and Nagchandreshwar on top (opened only on Nag Panchami). Adjoined by the majestic Shri Mahakal Lok corridor.',
    timing: {
      openingTime: '04:00 AM',
      closingTime: '11:00 PM',
      aartiTimingsHi:
        'भस्म आरती: प्रातः 04:00 से 06:00 (अग्रिम बुकिंग) | भोग आरती: 10:30 AM | सायन आरती: 07:00 PM | शयन आरती: रात्रि 10:30',
      aartiTimingsEn:
        'Bhasma Aarti: 04:00 AM – 06:00 AM (Prior Booking) | Bhog Aarti: 10:30 AM | Sandhya: 07:00 PM | Shayan: 10:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (एवं सावन मास महाकाल सवारी)',
      bestTimeToVisitEn:
        'October to March (and Shravan Month Royal Processions)',
    },
    entryFeeHi:
      'सामान्य दर्शन निःशुल्क (भस्म आरती ऑनलाइन अनुमति व प्रोटोकॉल दर्शन शुल्क)',
    entryFeeEn:
      'Free general Darshan (Advance registration for Bhasma Aarti & VIP protocols)',
    dressCodeHi:
      'भस्म आरती हेतु पुरुषों हेतु धोती-सोला एवं महिलाओं हेतु साड़ी अनिवार्य',
    dressCodeEn:
      'Bhasma Aarti strictly requires unstitched Dhoti-Sola for men and Saree for women',
    festivals: [
      {
        nameHi: 'महाशिवरात्रि एवं शिव नवरात्रि',
        nameEn: 'Maha Shivaratri & Shiva Navratri',
        dateHi: 'फाल्गुन मास',
        dateEn: 'February / March',
        descriptionHi:
          '9 दिवसीय शिव नवरात्रि उत्सव जिसमें बाबा महाकाल का प्रतिदिन नवरूपों में अलौकिक श्रृंगार होता है।',
        descriptionEn:
          '9-day Shiva Navratri where Mahakal is adorned in 9 divine forms concluding in grand Maha Shivaratri sehra.',
      },
      {
        nameHi: 'श्रावण सोमवार महाकाल सवारी',
        nameEn: 'Shravan Somwar Mahakal Sawari',
        dateHi: 'श्रावण-भाद्रपद मास',
        dateEn: 'July - September',
        descriptionHi:
          'राजाधिराज महाकाल की नगर प्रजा का हाल जानने हेतु रजत पालकी में भव्य राजसी सवारी।',
        descriptionEn:
          'Royal ceremonial palanquin procession where Lord Mahakal inspects His city.',
      },
    ],
    howToReach: {
      byAirHi:
        'देवी अहिल्याबाई होल्कर अंतर्राष्ट्रीय हवाई अड्डा, इंदौर (लगभग 55 किमी) से 1 घंटा एक्सप्रेसवे मार्ग।',
      byAirEn:
        'Devi Ahilyabai Holkar International Airport, Indore (55 km) connected by 4-lane expressway.',
      byRailHi:
        'उज्जैन जंक्शन (UJN) भारत के सभी प्रमुख रेलवे नेटवर्कों से सीधे जुड़ा है।',
      byRailEn: 'Ujjain Junction (UJN) is a major A-category railway junction.',
      byRoadHi:
        'इंदौर-उज्जैन 4-लेन सुपर कॉरिडोर द्वारा 45 मिनट में सुगम यात्रा।',
      byRoadEn:
        'Indore-Ujjain 4-lane highway with 24x7 bus and private cab services.',
      nearestAirport: 'Indore Airport (IDR)',
      nearestRailwayStation: 'Ujjain Junction (UJN)',
    },
    nearbyAttractionsHi:
      'श्री महाकाल लोक, हरसिद्धि माता शक्तिपीठ, काल भैरव मंदिर, मंगलनाथ (मंगल ग्रह जन्मस्थान), रामघाट क्षिप्रा, सांदीपनि आश्रम',
    nearbyAttractionsEn:
      'Shri Mahakal Lok, Harsiddhi Shaktipeeth, Kaal Bhairav Temple, Mangalnath Temple, Ram Ghat Shipra, Sandipani Ashram',
    image: imagePath.mahakaleshwarJyotirlinga,
  },
  {
    id: 'omkareshwar_jyotirlinga',
    order: 8,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'ओंकारेश्वर ज्योतिर्लिंग (मांधाता)',
    nameEn: 'Omkareshwar Jyotirlinga (Mandhata)',
    aliasNamesHi: ['अमलेश्वर', 'ममलेश्वर', 'मांधाता द्वीप'],
    aliasNamesEn: ['Amaleshwar', 'Mamleshwar', 'Shivpuri Island'],
    locationHi: 'खंडवा जिला, मध्य प्रदेश (नर्मदा नदी के ॐ आकार द्वीप)',
    locationEn:
      'Khandwa District, Madhya Pradesh (Om-shaped Island in Narmada River)',
    addressHi:
      'श्री ओंकारेश्वर ज्योतिर्लिंग मंदिर, मांधाता, खंडवा, मध्य प्रदेश - 450595',
    addressEn:
      'Shri Omkareshwar Jyotirlinga, Mandhata Island, Khandwa, Madhya Pradesh - 450595',
    districtHi: 'खंडवा',
    districtEn: 'Khandwa',
    stateHi: 'मध्य प्रदेश',
    stateEn: 'Madhya Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '450595',
    geo: {
      latitude: 22.2464,
      longitude: 76.1517,
    },
    deityHi: 'भगवान शिव (ओंकारेश्वर एवं ममलेश्वर)',
    deityEn: 'Lord Shiva (Omkareshwar & Mamleshwar)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: ['jyotirlinga', 'narmada', 'omkareshwar', 'madhya-pradesh', 'shiva'],
    architectureStyleHi:
      'प्राचीन नागर शैली एवं नक्काशीदार बलुआ पत्थर के विशाल स्तंभ',
    architectureStyleEn:
      'Ancient Nagara sandstone architecture with intricately carved multi-tiered shikharas',
    significanceHi:
      'नर्मदा नदी के मध्य "ॐ" (प्रणव) आकार वाले मांधाता पर्वत पर स्थित चतुर्थ ज्योतिर्लिंग। यहाँ भगवान शिव प्रतिदिन शयन हेतु पधारते हैं और चौपड़-पासे खेलते हैं।',
    significanceEn:
      '4th Jyotirlinga located on an Om-shaped river island in the Narmada. Tradition holds that Lord Shiva visits here daily for evening rest and games of chaupar.',
    descriptionHi:
      'ओंकारेश्वर दर्शन ममलेश्वर (अमलेश्वर) ज्योतिर्लिंग के दर्शन के बिना अधूरा माना जाता है। यहाँ हाल ही में 108 फीट ऊंची "स्टैच्यू ऑफ वननेस" (आदि शंकराचार्य प्रतिमा) और एकात्म धाम का निर्माण हुआ है।',
    descriptionEn:
      'Comprises two interconnected temples: Omkareshwar on Mandhata island and Mamleshwar on the south bank. Nearby stands the 108-ft Statue of Oneness (Adi Shankara).',
    timing: {
      openingTime: '05:00 AM',
      closingTime: '09:30 PM',
      aartiTimingsHi:
        'मंगला आरती: प्रातः 05:00 | मध्याह्न भोग: 12:00 | शयन आरती व चौपड़: रात्रि 08:30',
      aartiTimingsEn:
        'Mangala Aarti: 05:00 AM | Madhyahna Bhog: 12:00 PM | Shayan Aarti: 08:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च',
      bestTimeToVisitEn: 'October to March',
    },
    howToReach: {
      byAirHi: 'इंदौर हवाई अड्डा (लगभग 80 किमी) से टैक्सी सेवा।',
      byAirEn: 'Indore International Airport (approx 80 km).',
      byRailHi:
        'ओंकारेश्वर रोड रेलवे स्टेशन (12 किमी) अथवा खंडवा (70 किमी)/इंदौर।',
      byRailEn: 'Omkareshwar Road Station (12 km) or Khandwa / Indore.',
      byRoadHi: 'इंदौर और उज्जैन से सीधी बस व टैक्सी सेवा।',
      byRoadEn:
        'Well paved road connection from Indore (80 km) and Ujjain (135 km).',
      nearestAirport: 'Indore Airport (IDR)',
      nearestRailwayStation: 'Omkareshwar Road (OM) / Khandwa (KNW)',
    },
    nearbyAttractionsHi:
      'ममलेश्वर मंदिर, 108 फीट आदि शंकराचार्य प्रतिमा (स्टैच्यू ऑफ वननेस), ओंकारेश्वर बाँध, नर्मदा परिक्रमा संगम घाट',
    nearbyAttractionsEn:
      'Mamleshwar Temple, Statue of Oneness (Adi Shankara 108ft), Omkareshwar Dam, Sangam Ghat',
    image: imagePath.omkareshwarJyotirlinga,
  },
  {
    id: 'kedarnath_dham',
    order: 9,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'केदारनाथ धाम (रुद्रप्रयाग - पंच केदार)',
    nameEn: 'Kedarnath Dham (Rudraprayag - Panch Kedar)',
    aliasNamesHi: ['केदारेश्वर ज्योतिर्लिंग', 'केदार खंड'],
    aliasNamesEn: ['Kedareshwar Jyotirlinga', 'Kedar Khand'],
    locationHi: 'रुद्रप्रयाग, उत्तराखण्ड (मंदाकिनी नदी तट, गढ़वाल हिमालय)',
    locationEn:
      'Rudraprayag District, Uttarakhand (Banks of Mandakini River, Garhwal Himalayas)',
    addressHi: 'केदारनाथ धाम, रुद्रप्रयाग, उत्तराखण्ड - 246445',
    addressEn: 'Kedarnath Dham, Rudraprayag District, Uttarakhand - 246445',
    districtHi: 'रुद्रप्रयाग',
    districtEn: 'Rudraprayag',
    stateHi: 'उत्तराखण्ड',
    stateEn: 'Uttarakhand',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '246445',
    geo: {
      latitude: 30.7352,
      longitude: 79.0669,
    },
    deityHi: 'भगवान शिव (सदाशिव / त्रिकोणीय स्वयंभू ज्योतिर्लिंग)',
    deityEn: 'Lord Shiva (Sadashiva / Triangular Self-manifested Jyotirlinga)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'chota_chardham', 'major'],
    isJyotirlinga: true,
    isChotaCharDham: true,
    tags: [
      'jyotirlinga',
      'kedarnath',
      'himalayas',
      'chota-chardham',
      'shiva',
      'uttarakhand',
    ],
    builtCentury: '8th Century CE (Adi Shankara Reconstruction)',
    builtByHi: 'पाण्डव (मूल) एवं आद्य शंकराचार्य',
    builtByEn: 'Pandavas (Original) & Adi Shankaracharya (Reconstruction)',
    architectureStyleHi:
      'कत्युरी हिमालयी महापाषाण शैली (बिना गारे के इंटरलॉकिंग ग्रेनाइट शिलाएं)',
    architectureStyleEn:
      'Katyuri style monolithic Himalayan granite interlocking without mortar',
    significanceHi:
      'समुद्र तल से 3,584 मीटर की ऊँचाई पर 12 ज्योतिर्लिंगों में सर्वोच्च स्थान पर स्थित पंच केदारों में अग्रणी ज्योतिर्लिंग धाम। महाभारत युद्ध के उपरांत पाण्डवों को पापमुक्ति हेतु यहाँ शिव के पृष्ठ भाग के दर्शन हुए थे।',
    significanceEn:
      'Highest of all 12 Jyotirlingas at 3,584m altitude. Pandavas sought Shiva here for redemption after the Kurukshetra war; Lord Shiva appeared in the form of a celestial hump.',
    descriptionHi:
      'बर्फ से ढकी केदारनाथ पर्वत श्रृंखलाओं और मंदाकिनी नदी के उद्गम के निकट स्थित यह पाषाण मंदिर 2013 की भीषण प्रलयंकारी बाढ़ में "भीम शिला" के चमत्कारिक रक्षण से अक्षुण्ण रहा। शीतकाल में भगवान की पूजा उखीमठ में होती है।',
    descriptionEn:
      'Surrounded by majestic snow-clad peaks, this ancient temple miraculously survived the catastrophic 2013 floods protected by the massive Bhim Shila boulder. In winter, deity resides at Ukhimath.',
    timing: {
      openingTime: '04:00 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'महाभिषेक: प्रातः 04:00 | सामान्य दर्शन: 06:00 AM से 03:00 PM | सायं आरती: 06:30 PM | शयन आरती: 08:30 PM',
      aartiTimingsEn:
        'Maha Abhishek: 04:00 AM | Public Darshan: 06:00 AM – 03:00 PM | Evening Aarti: 06:30 PM | Shayan: 08:30 PM',
      bestTimeToVisitHi:
        'मई से जून तथा सितम्बर से अक्टूबर (शीतकाल में कपाट बंद)',
      bestTimeToVisitEn:
        'May to June and September to October (closed in freezing winter)',
    },
    howToReach: {
      byAirHi:
        'जॉली ग्रांट एयरपोर्ट, देहरादून से फाटा/गुप्तकाशी/सिरसी तक हेलिकॉप्टर सेवा।',
      byAirEn:
        'Jolly Grant Airport Dehradun, then helicopter from Phata, Guptkashi, or Sirsi.',
      byRailHi:
        'ऋषिकेश/हरिद्वार रेलवे स्टेशन से गौरीकुंड (सड़क मार्ग) फिर 16 किमी पैदल ट्रेक।',
      byRailEn:
        'Rishikesh Railway Station (216 km) to Gaurikund, followed by 16 km mountain trek.',
      byRoadHi:
        'हरिद्वार/ऋषिकेश से रुद्रप्रयाग, गुप्तकाशी होते हुए गौरीकुंड तक पक्की सड़क।',
      byRoadEn:
        'NH-107 connects to base camp Gaurikund, followed by walking/pony/palki trek.',
      nearestAirport: 'Jolly Grant Airport, Dehradun (DED)',
      nearestRailwayStation: 'Rishikesh (RKSH) / Haridwar (HW)',
    },
    nearbyAttractionsHi:
      'भीम शिला, भैरवनाथ मंदिर (केदारनाथ रक्षक), गांधी सरोवर (चोराबाड़ी ताल), वासुकी ताल, त्रिजुगीनारायण (शिव-पार्वती विवाह स्थल)',
    nearbyAttractionsEn:
      'Bhim Shila, Bhairavnath Temple, Gandhi Sarovar (Chorabari Lake), Vasuki Tal, Triyuginarayan Temple',
    image: imagePath.kedarnathJyotirlinga,
  },
  {
    id: 'bhimashankar_jyotirlinga',
    order: 10,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'भीमाशंकर ज्योतिर्लिंग (महाराष्ट्र)',
    nameEn: 'Bhimashankar Jyotirlinga (Maharashtra)',
    aliasNamesHi: ['डाकिनी भीमाशंकर', 'भीमा नदी उद्गम'],
    aliasNamesEn: ['Dakini Bhimashankar', 'Source of Bhima River'],
    locationHi: 'पुणे जिला, महाराष्ट्र (सह्याद्रि पर्वतमाला, भीमा नदी उद्गम)',
    locationEn:
      'Pune District, Maharashtra (Sahyadri Range, Source of Bhima River)',
    addressHi: 'भीमाशंकर मंदिर, भोरगिरी, खेड़, पुणे, महाराष्ट्र - 410509',
    addressEn:
      'Bhimashankar Temple, Bhorgiri, Khed, Pune, Maharashtra - 410509',
    districtHi: 'पुणे',
    districtEn: 'Pune',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '410509',
    geo: {
      latitude: 19.0722,
      longitude: 73.5358,
    },
    deityHi: 'भगवान शिव (भीमाशंकर ज्योतिर्लिंग)',
    deityEn: 'Lord Shiva (Bhimashankar Jyotirlinga)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: ['jyotirlinga', 'maharashtra', 'pune', 'sahyadri', 'shiva'],
    builtCentury: '13th & 18th Century CE (Nana Phadnavis)',
    builtByHi: 'नाना फडणवीस (मराठा साम्राज्य)',
    builtByEn: 'Nana Phadnavis (Peshwa Minister)',
    architectureStyleHi: 'प्राचीन नागर एवं हेमदपंथी पाषाण वास्तु शैली',
    architectureStyleEn: 'Nagara and Hemadpanthi stone architectural style',
    significanceHi:
      'सह्याद्रि की सुरम्य वादियों में स्थित षष्ठम ज्योतिर्लिंग जहाँ भगवान शिव ने त्रिपुरासुर के पुत्र महाअसुर भीम का वध कर धर्म की रक्षा की थी। भीमा नदी का पावन उद्गम स्थल।',
    significanceEn:
      '6th Jyotirlinga in the Sahyadri mountains. Legend holds that Lord Shiva vanquished the demon Bhima (son of Kumbhakarna) here. Source of holy Bhima River.',
    descriptionHi:
      'भीमाशंकर वन्यजीव अभयारण्य (विशालकाय शेकरू गिलहरी का प्राकृतिक वास) के घने जंगलों में स्थित यह मंदिर अद्भुत नक्काशी और शांत प्राकृतिक आभा से ओतप्रोत है।',
    descriptionEn:
      'Located inside Bhimashankar Wildlife Sanctuary (home of the Giant Flying Squirrel Shekru). Dense mist and green hills envelop the ancient sanctum.',
    timing: {
      openingTime: '04:30 AM',
      closingTime: '09:30 PM',
      aartiTimingsHi:
        'काकड़ आरती: प्रातः 04:30 | महापूजा: दोपहर 12:00 | सायं आरती: 07:30',
      aartiTimingsEn:
        'Kakad Aarti: 04:30 AM | Mahapuja: 12:00 PM | Sandhya Aarti: 07:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (तथा मानसून में सावन मास)',
      bestTimeToVisitEn: 'October to March (and monsoon for lush scenery)',
    },
    howToReach: {
      byAirHi:
        'पुणे हवाई अड्डा (लगभग 125 किमी) अथवा मुंबई छत्रपति शिवाजी महाराज हवाई अड्डा (220 किमी)।',
      byAirEn: 'Pune Airport (approx 125 km) or Mumbai Airport (220 km).',
      byRailHi: 'पुणे रेलवे स्टेशन (110 किमी) अथवा मंचर/कल्याण।',
      byRailEn: 'Pune Railway Station (110 km) or Kalyan (130 km).',
      byRoadHi: 'पुणे से मंचर-घोड़ेगांव होते हुए सीधी राज्य परिवहन बसें।',
      byRoadEn:
        'Connected by scenic ghat roads from Pune (110 km) and Mumbai (220 km).',
      nearestAirport: 'Pune Airport (PNQ)',
      nearestRailwayStation: 'Pune Junction (PUNE)',
    },
    nearbyAttractionsHi:
      'भीमाशंकर वन्यजीव अभयारण्य (शेकरू गिलहरी), गुप्त भीमाशंकर, हनुमान झील, नागफणी व्यू पॉइंट, बॉम्बे पॉइंट',
    nearbyAttractionsEn:
      'Bhimashankar Wildlife Sanctuary, Gupt Bhimashankar, Hanuman Lake, Nagphani Viewpoint',
    image: imagePath.bhimashankarJyotirlinga,
  },
  {
    id: 'kashi_vishwanath_jyotirlinga',
    order: 11,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'काशी विश्वनाथ ज्योतिर्लिंग (वाराणसी)',
    nameEn: 'Kashi Vishwanath Jyotirlinga (Varanasi)',
    aliasNamesHi: [
      'विश्वेश्वर महादेव',
      'अविमुक्त क्षेत्र',
      'स्वर्ण मंदिर काशी',
    ],
    aliasNamesEn: [
      'Vishweshwar Mahadev',
      'Avimukta Kshetra',
      'Golden Temple of Kashi',
    ],
    locationHi: 'वाराणसी, उत्तर प्रदेश (पवित्र गंगा नदी तट)',
    locationEn: 'Varanasi, Uttar Pradesh (Banks of Holy Ganges River)',
    addressHi:
      'श्री काशी विश्वनाथ मंदिर, लाहौरी टोला, वाराणसी, उत्तर प्रदेश - 221001',
    addressEn:
      'Shri Kashi Vishwanath Temple, Lahori Tola, Varanasi, UP - 221001',
    districtHi: 'वाराणसी',
    districtEn: 'Varanasi',
    stateHi: 'उत्तर प्रदेश',
    stateEn: 'Uttar Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '221001',
    geo: {
      latitude: 25.3109,
      longitude: 83.0107,
    },
    deityHi: 'भगवान शिव (काशी विश्वनाथ / विश्वेश्वर)',
    deityEn: 'Lord Shiva (Kashi Vishwanath / Vishweshwara)',
    otherDeitiesHi: [
      'माता अन्नपूर्णा',
      'काल भैरव (काशी के कोतवाल)',
      'माता विशालाक्षी (शक्तिपीठ)',
    ],
    otherDeitiesEn: [
      'Maa Annapurna',
      'Kaal Bhairav',
      'Maa Vishalakshi (Shaktipeeth)',
    ],
    directionHi: 'उत्तर (North)',
    directionEn: 'North',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: [
      'jyotirlinga',
      'kashi',
      'varanasi',
      'ganga',
      'shiva',
      'uttar-pradesh',
    ],
    historyHi:
      '1780 ई. में इंदौर की पुण्यश्लोका महारानी अहिल्याबाई होल्कर ने वर्तमान मंदिर का पुनर्निर्माण कराया और पंजाब केसरी महाराजा रणजीत सिंह ने शिखर पर स्वर्ण पत्र मढ़वाए।',
    historyEn:
      'Rebuilt in 1780 CE by Maharani Ahilyabai Holkar of Indore; golden spire donated by Maharaja Ranjit Singh of Punjab in 1835.',
    builtCentury: '1780 CE (Modern Corridor 2021)',
    builtByHi: 'महारानी अहिल्याबाई होल्कर एवं महाराजा रणजीत सिंह',
    builtByEn: 'Maharani Ahilyabai Holkar & Maharaja Ranjit Singh',
    architectureStyleHi:
      'नागर शैली, 15.5 मीटर ऊंचा स्वर्ण शिखर एवं अत्याधुनिक काशी विश्वनाथ धाम कॉरिडोर',
    architectureStyleEn:
      'Traditional Nagara spire overlaid with 1 tonne gold dome and modern 50,000 sq m Corridor to Ganga',
    significanceHi:
      'सप्तम ज्योतिर्लिंग तथा सनातन धर्म का सर्वोच्च मोक्ष तीर्थ। मान्यता है कि काशी भगवान शिव के त्रिशूल पर टिकी है और यहाँ प्राण त्यागने वाले को साक्षात शिव तारक मंत्र देकर मोक्ष प्रदान करते हैं।',
    significanceEn:
      '7th Jyotirlinga and supreme spiritual capital of Hinduism. Believed to stand on Shiva’s Trishul where Lord Shiva Himself whispers the Taraka Mantra to dying souls for instant Moksha.',
    descriptionHi:
      'गंगा तट से मंदिर तक सीधा 50,000 वर्ग मीटर में फैला "श्री काशी विश्वनाथ धाम" कॉरिडोर श्रद्धालुओं को गंगा स्नान के उपरांत सीधे गर्भगृह दर्शन की सुगम अनुभूति कराता है।',
    descriptionEn:
      'The newly inaugurated 50,000 sqm Kashi Vishwanath Dham directly connects Manikarnika and Lalita Ghats on the Ganges to the inner sanctum.',
    timing: {
      openingTime: '03:00 AM',
      closingTime: '11:00 PM',
      aartiTimingsHi:
        'मंगला आरती: 03:00 AM | भोग आरती: 11:15 AM | सप्तऋषि आरती: सायं 07:00 | शृंगार/भोग: 09:00 PM | शयन आरती: 10:30 PM',
      aartiTimingsEn:
        'Mangala Aarti: 03:00 AM | Bhog: 11:15 AM | Saptarishi Aarti: 07:00 PM | Shringar: 09:00 PM | Shayan: 10:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (देव दीपावली एवं महाशिवरात्रि)',
      bestTimeToVisitEn:
        'October to March (Dev Deepawali in Kartik and Maha Shivaratri)',
    },
    howToReach: {
      byAirHi:
        'लाल बहादुर शास्त्री अंतर्राष्ट्रीय हवाई अड्डा, बाबतपुर वाराणसी (लगभग 24 किमी)।',
      byAirEn: 'Lal Bahadur Shastri International Airport, Babatpur (24 km).',
      byRailHi:
        'वाराणसी जंक्शन (कैंट), बनारस (मंडुआडीह) व पंडित दीनदयाल उपाध्याय जंक्शन।',
      byRailEn:
        'Varanasi Junction (BSB), Banaras (BSBS), and Pt. Deen Dayal Upadhyay (DDU).',
      byRoadHi:
        'प्रयागराज (125 किमी), लखनऊ (300 किमी), गोरखपुर और पटना से राष्ट्रीय राजमार्ग।',
      byRoadEn: 'Expressway access from Lucknow, Prayagraj, and Patna.',
      nearestAirport: 'Varanasi Airport (VNS)',
      nearestRailwayStation: 'Varanasi Junction (BSB) / Banaras (BSBS)',
    },
    nearbyAttractionsHi:
      'दशाश्वमेध घाट (विश्वप्रसिद्ध महाआरती), मणिकर्णिका घाट, अन्नपूर्णा मंदिर, काल भैरव, सारनाथ (बौद्ध महातीर्थ), संकट मोचन',
    nearbyAttractionsEn:
      'Dashashwamedh Ghat (Ganga Aarti), Manikarnika Ghat, Annapurna Temple, Kaal Bhairav, Sarnath, Sankat Mochan',
    image: imagePath.kashiVishwanathJyotirlinga,
  },
  {
    id: 'trimbakeshwar_jyotirlinga',
    order: 12,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'त्र्यंबकेश्वर ज्योतिर्लिंग (नासिक)',
    nameEn: 'Trimbakeshwar Jyotirlinga (Nashik)',
    aliasNamesHi: ['त्रिनेत्रेश्वर', 'गोदावरी उद्गम तीर्थ'],
    aliasNamesEn: ['Trinetreshwar', 'Source of Godavari'],
    locationHi:
      'त्र्यंबक, नासिक जिला, महाराष्ट्र (ब्रह्मगिरि पर्वत, गोदावरी उद्गम)',
    locationEn:
      'Trimbak, Nashik District, Maharashtra (Brahmagiri Hills, Godavari Origin)',
    addressHi:
      'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर, त्र्यंबक, नासिक, महाराष्ट्र - 422212',
    addressEn:
      'Shri Trimbakeshwar Shiva Temple, Trimbak, Nashik, Maharashtra - 422212',
    districtHi: 'नासिक',
    districtEn: 'Nashik',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '422212',
    geo: {
      latitude: 19.9322,
      longitude: 73.5307,
    },
    deityHi: 'भगवान शिव (त्रिदेव रूपी ज्योतिर्लिंग - ब्रह्मा, विष्णु, महेश)',
    deityEn: 'Lord Shiva (Tridev Jyotirlinga - Brahma, Vishnu, Shiva)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: [
      'jyotirlinga',
      'maharashtra',
      'nashik',
      'godavari',
      'kumbh-mela',
      'shiva',
    ],
    historyHi:
      'वर्तमान भव्य काले पाषाण मंदिर का निर्माण 1755-1786 ई. में तीसरे पेशवा बालाजी बाजीराव (नाना साहेब) द्वारा कराया गया।',
    historyEn:
      'Current black stone temple was built between 1755 and 1786 CE by Peshwa Balaji Baji Rao (Nana Saheb).',
    builtCentury: '18th Century CE (1786 CE)',
    builtByHi: 'पेशवा बालाजी बाजीराव (नाना साहेब)',
    builtByEn: 'Peshwa Balaji Baji Rao',
    architectureStyleHi:
      'काले बसाल्ट पाषाण से निर्मित उत्कृष्ट हेमदपंथी नागर शैली',
    architectureStyleEn:
      'Hemadpanthi black basalt stone architecture adorned with intricate sculptures',
    significanceHi:
      'अष्टम ज्योतिर्लिंग जहाँ गर्भगृह के लिंगम में ब्रह्मा, विष्णु और महेश तीनों देवों के तीन मुख (पिंडी) संयुक्त रूप से प्रतिष्ठित हैं। दक्षिण गंगा गोदावरी का पावन उद्गम।',
    significanceEn:
      '8th Jyotirlinga unique for housing a three-faced lingam embodying the holy Trinity: Brahma, Vishnu, and Shiva. Origin of sacred Godavari River.',
    descriptionHi:
      'ब्रह्मगिरि पर्वत की तलहटी में स्थित इस मंदिर में कुशावर्त तीर्थ (कुण्ड) स्थित है जहाँ प्रत्येक 12 वर्ष में नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला आयोजित होता है। कालसर्प दोष व नारायण नागबली पूजा का प्रमुख केंद्र।',
    descriptionEn:
      'Site of the legendary Kushavarta Kund and the Nashik-Trimbakeshwar Simhastha Kumbh Mela. Foremost center for Kalsarp Dosh and Narayan Nagbali rituals.',
    timing: {
      openingTime: '05:30 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'काकड़ आरती: 05:30 AM | मध्याह्न महापूजा: 12:00 PM | सायं आरती: 07:00 PM',
      aartiTimingsEn:
        'Kakad Aarti: 05:30 AM | Madhyahna Puja: 12:00 PM | Sandhya Aarti: 07:00 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च',
      bestTimeToVisitEn: 'October to March',
    },
    howToReach: {
      byAirHi: 'नासिक हवाई अड्डा ओझर (लगभग 50 किमी) अथवा मुंबई (175 किमी)।',
      byAirEn:
        'Nashik Ozar Airport (50 km) or Mumbai Chhatrapati Shivaji Airport (175 km).',
      byRailHi: 'नासिक रोड रेलवे स्टेशन (NK) से मंदिर 36 किमी दूर है।',
      byRailEn:
        'Nashik Road Railway Station (36 km) with frequent bus/taxi connectivity.',
      byRoadHi: 'नासिक सेंट्रल बस स्टैंड से प्रत्येक 15 मिनट में बसें उपलब्ध।',
      byRoadEn:
        'Regular state transport buses every 15 mins from Nashik CBS (28 km).',
      nearestAirport: 'Nashik Airport (ISK) / Mumbai (BOM)',
      nearestRailwayStation: 'Nashik Road Railway Station (NK)',
    },
    nearbyAttractionsHi:
      'कुशावर्त तीर्थ, ब्रह्मगिरि पर्वत ट्रेक (गोदावरी उद्गम), गंगाद्वार, संत निवृत्तिनाथ समाधि, पंचवटी नासिक',
    nearbyAttractionsEn:
      'Kushavarta Theertham, Brahmagiri Trek, Gangadwar, Sant Nivruttinath Samadhi, Panchavati Nashik',
    image: imagePath.trimbakeshwarJyotirlinga,
  },
  {
    id: 'vaidyanath_jyotirlinga',
    order: 13,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'वैद्यनाथ ज्योतिर्लिंग (देवघर)',
    nameEn: 'Vaidyanath Jyotirlinga (Deoghar)',
    aliasNamesHi: ['बाबा बैद्यनाथ धाम', 'कामना लिंग'],
    aliasNamesEn: ['Baidyanath Dham', 'Kamana Linga', 'Lord of Physicians'],
    locationHi: 'देवघर जिला, झारखण्ड (संथाल परगना)',
    locationEn: 'Deoghar District, Jharkhand (Santhal Parganas)',
    addressHi: 'बाबा बैद्यनाथ धाम मंदिर, देवघर, झारखण्ड - 814112',
    addressEn: 'Baba Baidyanath Temple, Deoghar, Jharkhand - 814112',
    districtHi: 'देवघर',
    districtEn: 'Deoghar',
    stateHi: 'झारखण्ड',
    stateEn: 'Jharkhand',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '814112',
    geo: {
      latitude: 24.4925,
      longitude: 86.7001,
    },
    deityHi: 'भगवान शिव (वैद्यनाथ महादेव) व माता पार्वती (शक्तिपीठ)',
    deityEn: 'Lord Shiva (Baidyanath Mahadev) & Goddess Parvati',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'shaktipeeth', 'major'],
    isJyotirlinga: true,
    isShaktipeeth: true,
    tags: [
      'jyotirlinga',
      'shaktipeeth',
      'baidyanath',
      'kanwar-yatra',
      'jharkhand',
      'shiva',
    ],
    architectureStyleHi:
      'पारंपरिक मध्ययुगीन नागर शैली, 72 फीट ऊंचा शिखर एवं स्वर्ण कलश',
    architectureStyleEn:
      'Nagara stone shikhara rising 72 ft with gold kalash and sacred red cloth connecting Shiva & Parvati temples',
    significanceHi:
      'नवम ज्योतिर्लिंग एवं 51 शक्तिपीठों में एक (माँ जयदुर्गा)। रावण द्वारा लंका ले जाते समय स्थापित स्वयंभू "कामना लिंग"। यहाँ विश्व का सबसे लंबा 105 किमी का "श्रावणी कांवड़ मेला" आयोजित होता है।',
    significanceEn:
      '9th Jyotirlinga and Shaktipeeth. Ravana grounded the Shiva Lingam here. Hosts the world largest uninterrupted pilgrimage — the 105 km Shravani Kanwar Mela from Sultanganj.',
    descriptionHi:
      'बाबा मंदिर और माता पार्वती मंदिर के शिखरों को लाल रेशमी वस्त्र (गठबंधन) से आपस में बांधने की अलौकिक परंपरा है। सावन में लाखों कांवड़िये सुल्तानगंज (गंगा) से 105 किमी पैदल जल लेकर आते हैं।',
    descriptionEn:
      'Features a red ribbon (Gathbandhan) physically tying the spires of Shiva and Parvati temples together. Over 5 million Kanwariyas walk 105 km barefoot carrying holy Ganga water during Shravan.',
    timing: {
      openingTime: '04:00 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'प्रातः सरकारी पूजा: 04:00 AM | विश्राम: 03:30 से 06:00 PM | सायं शृंगार आरती: 07:30 PM',
      aartiTimingsEn:
        'Morning Puja: 04:00 AM | Afternoon Rest: 03:30 – 06:00 PM | Shringar Aarti: 07:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (तथा सावन मास)',
      bestTimeToVisitEn: 'October to March (and Shravan Month)',
    },
    howToReach: {
      byAirHi:
        'देवघर अंतर्राष्ट्रीय हवाई अड्डा (DGH) मंदिर से मात्र 8 किमी दूर है।',
      byAirEn:
        'Deoghar International Airport (DGH) is just 8 km from the temple.',
      byRailHi:
        'जसीडीह जंक्शन (10 किमी) दिल्ली-कोलकाता मुख्य रेल लाइन पर स्थित है।',
      byRailEn:
        'Jasidih Junction (JSME) is 10 km away on the Delhi-Howrah mainline.',
      byRoadHi:
        'रांची (250 किमी), पटना (250 किमी) और भागलपुर से सीधी बस सेवाएं।',
      byRoadEn:
        'Direct bus and taxi connectivity from Patna, Ranchi, and Kolkata.',
      nearestAirport: 'Deoghar Airport (DGH)',
      nearestRailwayStation: 'Jasidih Junction (JSME) / Deoghar (DGHR)',
    },
    nearbyAttractionsHi:
      'तपोवन गुफाएं, त्रिकूट पर्वत (रोपवे), बासुकीनाथ मंदिर (42 किमी), नौलखा मंदिर, नंदन पहाड़',
    nearbyAttractionsEn:
      'Trikut Pahar (Ropeway), Basukinath Temple (42 km), Tapovan Caves, Naulakha Temple, Nandan Pahar',
    image: imagePath.vaidyanathJyotirlinga,
  },
  {
    id: 'nageshwar_jyotirlinga',
    order: 14,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'नागेश्वर ज्योतिर्लिंग (दारुकावन)',
    nameEn: 'Nageshwar Jyotirlinga (Darukavanam)',
    aliasNamesHi: ['नागेश महादेव', 'दारुकावन ज्योतिर्लिंग'],
    aliasNamesEn: ['Nagesh Mahadev', 'Darukavanam'],
    locationHi: 'दारुकावन, देवभूमि द्वारका, गुजरात (द्वारका से 16 किमी)',
    locationEn: 'Darukavanam, Devbhumi Dwarka, Gujarat (16 km from Dwarka)',
    addressHi:
      'श्री नागेश्वर ज्योतिर्लिंग मंदिर, दारुकावन, द्वारका, गुजरात - 361345',
    addressEn:
      'Shri Nageshwar Jyotirlinga, Darukavanam, Dwarka, Gujarat - 361345',
    districtHi: 'देवभूमि द्वारका',
    districtEn: 'Devbhumi Dwarka',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '361345',
    geo: {
      latitude: 22.3346,
      longitude: 68.9959,
    },
    deityHi: 'भगवान शिव (नागेश्वर महादेव - सर्पों के अधिपति)',
    deityEn: 'Lord Shiva (Nageshwar Mahadev - Lord of Serpents)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: ['jyotirlinga', 'nageshwar', 'dwarka', 'gujarat', 'shiva'],
    significanceHi:
      'दशम ज्योतिर्लिंग जो समस्त प्रकार के विष, सर्पभय और नकारात्मक शक्तियों से रक्षण प्रदान करता है। मंदिर परिसर में भगवान शिव की 85 फीट ऊंची ध्यानमग्न विशाल प्रतिमा स्थित है।',
    significanceEn:
      '10th Jyotirlinga granting immunity from poisons, serpent fears, and worldly evils. Features an imposing 85-foot giant meditative statue of Lord Shiva.',
    descriptionHi:
      'रुद्र संहिता के अनुसार शिवभक्त सुप्रिय को दारुक राक्षस के कारागार से मुक्त कराने हेतु भगवान शिव ज्योति रूप में प्रकट हुए थे। यहाँ स्थापित त्रिमूर्तिक लिंगम दक्षिण-पश्चिम मुखी है।',
    descriptionEn:
      'According to Shiva Purana, Lord Shiva manifested here to protect His ardent devotee Supriya from the demon Daruka. The sanctum houses a triangular self-manifested stone lingam.',
    timing: {
      openingTime: '06:00 AM',
      closingTime: '09:00 PM',
      aartiTimingsHi:
        'मंगला आरती: प्रातः 06:00 | मध्याह्न भोग: 12:00 | संध्या आरती: 07:00 PM',
      aartiTimingsEn:
        'Mangala Aarti: 06:00 AM | Noon Bhog: 12:00 PM | Sandhya Aarti: 07:00 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च',
      bestTimeToVisitEn: 'October to March',
    },
    howToReach: {
      byAirHi: 'जामनगर हवाई अड्डा (130 किमी) अथवा पोरबंदर (110 किमी)।',
      byAirEn: 'Jamnagar Airport (130 km) or Porbandar Airport (110 km).',
      byRailHi: 'द्वारका रेलवे स्टेशन (DWK) से मात्र 16 किमी।',
      byRailEn: 'Dwarka Railway Station (16 km) with auto/taxi access.',
      byRoadHi: 'द्वारका से बेट द्वारका मार्ग पर नियमित बसें व टैक्सियां।',
      byRoadEn: 'Located on the main highway between Dwarka and Beyt Dwarka.',
      nearestAirport: 'Jamnagar Airport (JGA)',
      nearestRailwayStation: 'Dwarka Railway Station (DWK)',
    },
    nearbyAttractionsHi:
      '85 फीट शिव प्रतिमा, द्वारकाधीश जगत मंदिर, बेट द्वारका, गोपी तालाब (गोपी चंदन तीर्थ), रुक्मिणी मंदिर',
    nearbyAttractionsEn:
      '85-ft Shiva Statue, Dwarkadhish Temple, Beyt Dwarka, Gopi Talav, Rukmini Temple',
    image: imagePath.nageshwarJyotirlinga,
  },
  {
    id: 'grishneshwar_jyotirlinga',
    order: 15,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'घृष्णेश्वर ज्योतिर्लिंग (एलोरा)',
    nameEn: 'Grishneshwar Jyotirlinga (Ellora)',
    aliasNamesHi: ['घुश्मेश्वर', 'कुंकुमेश्वर'],
    aliasNamesEn: ['Ghushmeshwar', 'Grushneshwar'],
    locationHi: 'एलोरा, छत्रपति संभाजीनगर (औरंगाबाद), महाराष्ट्र',
    locationEn: 'Ellora, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra',
    addressHi:
      'श्री घृष्णेश्वर ज्योतिर्लिंग मंदिर, एलोरा, संभाजीनगर, महाराष्ट्र - 431102',
    addressEn: 'Shri Grishneshwar Jyotirlinga, Ellora, Maharashtra - 431102',
    districtHi: 'छत्रपति संभाजीनगर',
    districtEn: 'Chhatrapati Sambhajinagar',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '431102',
    geo: {
      latitude: 20.0249,
      longitude: 75.1708,
    },
    deityHi: 'भगवान शिव (घृष्णेश्वर महादेव)',
    deityEn: 'Lord Shiva (Grishneshwar Mahadev)',
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    tags: ['jyotirlinga', 'ellora', 'maharashtra', 'unesco', 'shiva'],
    historyHi:
      '18वीं शताब्दी में महारानी अहिल्याबाई होल्कर द्वारा लाल बलुआ पत्थर से पुनर्निर्मित।',
    historyEn:
      'Reconstructed in the 18th century CE by Queen Ahilyabai Holkar of Indore.',
    builtCentury: '18th Century CE',
    builtByHi: 'महारानी अहिल्याबाई होल्कर एवं मालोजी भोसले',
    builtByEn: 'Maharani Ahilyabai Holkar & Maloji Bhosale',
    architectureStyleHi:
      'दक्षिण भारतीय शैली से प्रभावित 5-स्तरीय लाल पाषाण नागर शिखर',
    architectureStyleEn:
      '5-tiered red basalt stone shikhara in South Indian influenced Nagara style',
    significanceHi:
      'द्वादश ज्योतिर्लिंगों की पवित्र शृंखला का पावन "द्वादश (12वां) अंतिम ज्योतिर्लिंग"। शिवभक्त घुश्मा की अनन्य भक्ति से प्रसन्न होकर शिव यहाँ नित्य वास करते हैं।',
    significanceEn:
      'The 12th and final Jyotirlinga. Manifested for the ardent devotee Ghushma whose drowned son was miraculously brought back to life by Shiva.',
    descriptionHi:
      'यूनेस्को विश्व धरोहर "एलोरा की गुफाओं" (कैलाश मंदिर) से मात्र 1 किमी की दूरी पर स्थित यह शांत मंदिर अपनी उत्कृष्ट नक्काशी और आध्यात्मिक शांति हेतु विख्यात है।',
    descriptionEn:
      'Located just 1 km from the world-famous UNESCO World Heritage Ellora Caves (Kailasa Monolithic Temple). Built using vibrant red basalt stone.',
    timing: {
      openingTime: '05:30 AM',
      closingTime: '09:30 PM',
      aartiTimingsHi:
        'मंगला आरती: प्रातः 05:30 | मध्याह्न भोग: 12:00 | संध्या आरती: 07:30 PM',
      aartiTimingsEn:
        'Mangala: 05:30 AM | Noon Bhog: 12:00 PM | Sandhya Aarti: 07:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च',
      bestTimeToVisitEn: 'October to March',
    },
    howToReach: {
      byAirHi: 'औरंगाबाद हवाई अड्डा (लगभग 35 किमी)।',
      byAirEn: 'Chhatrapati Sambhajinagar Airport (approx 35 km).',
      byRailHi: 'औरंगाबाद रेलवे स्टेशन (30 किमी)।',
      byRailEn: 'Aurangabad Railway Station (AWB) (30 km).',
      byRoadHi: 'औरंगाबाद से एलोरा हेतु निरंतर बस व टैक्सी सेवा।',
      byRoadEn:
        'Well connected via state highway from Aurangabad (30 km) and Shirdi (105 km).',
      nearestAirport: 'Aurangabad Airport (IXU)',
      nearestRailwayStation: 'Aurangabad Railway Station (AWB)',
    },
    nearbyAttractionsHi:
      'एलोरा गुफाएं (कैलाश मंदिर - विश्व धरोहर), दौलताबाद किला, बीबी का मकबरा, भद्रा मारुति (शयन मुद्रा हनुमान जी)',
    nearbyAttractionsEn:
      'Ellora Caves (Kailasa Temple), Daulatabad Fort, Bibi Ka Maqbara, Bhadra Maruti Temple',
    image: imagePath.grishneshwarJyotirlinga,
  },

  // =========================================================================
  // 3. MAJOR HISTORIC & SACRED PILGRIMAGE TEMPLES (प्रमुख महातीर्थ)
  // =========================================================================
  {
    id: 'ram_mandir_ayodhya',
    order: 16,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'श्री राम जन्मभूमि मंदिर (अयोध्या)',
    nameEn: 'Shri Ram Janmabhoomi Mandir (Ayodhya)',
    aliasNamesHi: ['राम लला मंदिर', 'अयोध्या धाम'],
    aliasNamesEn: ['Ram Mandir', 'Ayodhya Dham', 'Ram Lalla Virajman'],
    locationHi: 'अयोध्या धाम, उत्तर प्रदेश (सरयू नदी तट)',
    locationEn: 'Ayodhya Dham, Uttar Pradesh (Banks of Holy Saryu River)',
    addressHi:
      'श्री राम जन्मभूमि तीर्थ क्षेत्र, अयोध्या, उत्तर प्रदेश - 224123',
    addressEn: 'Shri Ram Janmabhoomi Teerth Kshetra, Ayodhya, UP - 224123',
    districtHi: 'अयोध्या',
    districtEn: 'Ayodhya',
    stateHi: 'उत्तर प्रदेश',
    stateEn: 'Uttar Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '224123',
    geo: {
      latitude: 26.7956,
      longitude: 82.1943,
    },
    deityHi: 'भगवान श्री राम लला (बालक रूप)',
    deityEn: 'Bhagwan Shri Ram Lalla (Child Form of Lord Rama)',
    otherDeitiesHi: [
      'माता सीता',
      'लक्ष्मण जी',
      'भरत जी',
      'शत्रुघ्न जी',
      'हनुमान जी',
    ],
    otherDeitiesEn: [
      'Mata Sita',
      'Lakshmana',
      'Bharata',
      'Shatrughna',
      'Hanuman',
    ],
    yugaHi: 'त्रेतायुग',
    yugaEn: 'Treta Yuga',
    directionHi: 'पूर्व (East)',
    directionEn: 'East',
    category: 'major',
    categories: ['major'],
    tags: [
      'ram-mandir',
      'ayodhya',
      'saryu',
      'treta-yuga',
      'rama',
      'uttar-pradesh',
    ],
    historyHi:
      '500 वर्षों के संघर्ष के पश्चात 22 जनवरी 2024 को ऐतिहासिक प्राण-प्रतिष्ठा महोत्सव संपन्न हुआ।',
    historyEn:
      'Concluded 500 years of cultural anticipation with the historic consecration (Pran Pratishtha) on 22 January 2024.',
    builtCentury: '2024 CE',
    builtByHi:
      'श्री राम जन्मभूमि तीर्थ क्षेत्र ट्रस्ट (वास्तुकार: चंद्रकांत सोमपुरा परिवार)',
    builtByEn:
      'Shri Ram Janmabhoomi Teerth Kshetra Trust (Architect: Chandrakant Sompura)',
    architectureStyleHi:
      'पारंपरिक नागर वास्तु शैली, बंसी पहाड़पुर के गुलाबी बलुआ पत्थर, बिना लोहे के 1000 वर्ष आयु संरचना',
    architectureStyleEn:
      'Traditional Nagara temple architecture built with pink Bansi Paharpur stone without iron/steel',
    significanceHi:
      'मर्यादा पुरुषोत्तम भगवान श्री राम की पावन जन्मस्थली तथा भारत की सांस्कृतिक चेतना का सर्वोच्च केंद्र। 3-मंजिला 161 फीट ऊंचा भव्य मंदिर।',
    significanceEn:
      'The sacred birthplace of Lord Rama. Spanning 3 stories and 161 ft height with 392 pillars, built to endure over 1,000 years.',
    descriptionHi:
      '380 फीट लंबाई, 250 फीट चौड़ाई और 161 फीट ऊंचाई वाले इस महामंदिर में 5 भव्य मंडप हैं। गर्भगृह में 51 इंच के श्याम शिला विग्रह रूप में प्रभु श्री राम लला कमल दल पर धनुष-बाण संग बाल रूप में सुशोभित हैं।',
    descriptionEn:
      'Houses the 51-inch black Shaligram stone idol of 5-year-old Ram Lalla holding a golden bow. Features 5 iconic pavilions (Mandapas).',
    timing: {
      openingTime: '06:30 AM',
      closingTime: '09:30 PM',
      aartiTimingsHi:
        'मंगला आरती: प्रातः 04:30 | शृंगार आरती: 06:30 AM | भोग आरती: दोपहर 12:00 | संध्या आरती: सायं 07:30 | शयन आरती: 09:30 PM',
      aartiTimingsEn:
        'Mangala: 04:30 AM | Shringar: 06:30 AM | Bhog: 12:00 PM | Sandhya: 07:30 PM | Shayan: 09:30 PM',
      bestTimeToVisitHi: 'अक्टूबर से मार्च (तथा चैत्र रामनवमी व दीपोत्सव)',
      bestTimeToVisitEn: 'October to March (and during Ram Navami & Deepotsav)',
    },
    howToReach: {
      byAirHi:
        'महर्षि वाल्मीकि अंतर्राष्ट्रीय हवाई अड्डा, अयोध्या (AYJ) मंदिर से मात्र 10 किमी दूर।',
      byAirEn:
        'Maharishi Valmiki International Airport, Ayodhya (AYJ) (10 km).',
      byRailHi: 'अयोध्या धाम जंक्शन (AY) एवं अयोध्या कैंट स्टेशन (AYC)।',
      byRailEn:
        'Ayodhya Dham Junction (AY) and Ayodhya Cantt (AYC) connected with Vande Bharat trains.',
      byRoadHi:
        'लखनऊ (135 किमी) और गोरखपुर से 4-लेन राष्ट्रीय राजमार्ग (NH-27)।',
      byRoadEn:
        'NH-27 connecting from Lucknow (135 km), Varanasi (200 km), and Gorakhpur (140 km).',
      nearestAirport: 'Ayodhya Airport (AYJ) / Lucknow (LKO)',
      nearestRailwayStation: 'Ayodhya Dham Junction (AY)',
    },
    nearbyAttractionsHi:
      'हनुमान गढ़ी, कनक भवन, सरयू घाट व राम की पैड़ी, नागेश्वरनाथ मंदिर, दशरथ महल, सूर्य कुंड',
    nearbyAttractionsEn:
      'Hanuman Garhi, Kanak Bhawan, Saryu Ghat & Ram Ki Paidi, Nageshwarnath Temple, Surya Kund',
    image: imagePath.Rama,
  },
  {
    id: 'tirupati_balaji',
    order: 17,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'तिरुपति बालाजी (श्री वेंकटेश्वर स्वामी)',
    nameEn: 'Tirupati Balaji (Sri Venkateswara Swamy)',
    aliasNamesHi: ['तिरुमाला मंदिर', 'गोविंदा', 'सात पहाड़ियों के स्वामी'],
    aliasNamesEn: ['Tirumala Temple', 'Lord of Seven Hills', 'Govinda'],
    locationHi: 'तिरुमाला, तिरुपति जिला, आन्ध्र प्रदेश (शेषाचलम पर्वतमाला)',
    locationEn:
      'Tirumala, Tirupati District, Andhra Pradesh (Seshachalam Hills)',
    addressHi:
      'श्री वेंकटेश्वर मंदिर, तिरुमाला, तिरुपति, आन्ध्र प्रदेश - 517504',
    addressEn:
      'Sri Venkateswara Temple, Tirumala, Tirupati, Andhra Pradesh - 517504',
    districtHi: 'तिरुपति',
    districtEn: 'Tirupati',
    stateHi: 'आन्ध्र प्रदेश',
    stateEn: 'Andhra Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '517504',
    geo: {
      latitude: 13.6833,
      longitude: 79.3472,
    },
    deityHi: 'भगवान विष्णु (श्री वेंकटेश्वर / बालाजी / श्रीनिवास)',
    deityEn: 'Lord Vishnu (Sri Venkateswara / Balaji / Srinivasa)',
    otherDeitiesHi: ['माता पद्मावती (अलमेलु मंगम्मा) तिरुचानूर'],
    otherDeitiesEn: ['Goddess Padmavathi (Tiruchanur)'],
    category: 'major',
    categories: ['major'],
    isDivyaDesam: true,
    tags: [
      'tirupati',
      'balaji',
      'venkateswara',
      'andhra-pradesh',
      'divya-desam',
      'laddu-prasadam',
    ],
    builtCentury: '9th Century CE onwards',
    builtByHi: 'पल्लव, चोल, पाण्ड्य एवं विजयनगर सम्राट श्री कृष्णदेवराय',
    builtByEn: 'Pallavas, Cholas, Pandyas & Sri Krishnadevaraya',
    architectureStyleHi:
      'उत्कृष्ट द्रविड़ियन वास्तु शैली, आनन्द निलयम स्वर्ण विमान',
    architectureStyleEn:
      'Dravidian temple architecture with Ananda Nilayam pure gold-plated vimana',
    significanceHi:
      'कलियुग में साक्षात वैकुंठ स्वरूप "कलियुग प्रत्यक्ष दैवम्" तिरुपति बालाजी। विश्व का सर्वाधिक दर्शनार्थी व सर्वाधिक दान प्राप्त करने वाला पावन तीर्थ। जीआई-टैग प्राप्त प्रसिद्ध "तिरुमाला लड्‌डू प्रसादम"।',
    significanceEn:
      'Revered as Kali Yuga Vaikuntham and the richest spiritual institution in the world. Famous for the sacred GI-tagged Tirupati Laddu Prasadam.',
    descriptionHi:
      'शेषाचलम पर्वत की सात पहाड़ियों (सप्तगिरि) पर स्थित यह मंदिर भगवान श्रीनिवास के दिव्य विग्रह को समर्पित है। प्रतिदिन 70,000 से अधिक श्रद्धालु यहाँ दर्शन व केश दान (मुंडन) अर्पण करते हैं।',
    descriptionEn:
      'Located on Venkatadri, the 7th peak of Seshachalam Hills. Welcomes over 70,000 pilgrims daily who offer hair tonsure and worship the 8-ft self-manifested idol.',
    timing: {
      openingTime: '03:00 AM',
      closingTime: '01:30 AM (Next day)',
      aartiTimingsHi:
        'सुप्रभातम्: 03:00 AM | तोमाला सेवा: 03:30 AM | सहस्रनामार्चना: 04:45 AM | एकान्त सेवा: रात्रि 01:30 AM',
      aartiTimingsEn:
        'Suprabhatam: 03:00 AM | Thomala Seva: 03:30 AM | Archana: 04:45 AM | Ekantha Seva: 01:30 AM',
      bestTimeToVisitHi: 'सितम्बर से फरवरी (ब्रह्मोत्सव पर्व)',
      bestTimeToVisitEn: 'September to February (Srivari Brahmotsavam)',
    },
    howToReach: {
      byAirHi:
        'तिरुपति हवाई अड्डा (रेनिगुंटा) 35 किमी अथवा चेन्नई अंतर्राष्ट्रीय हवाई अड्डा (140 किमी)।',
      byAirEn:
        'Tirupati Airport (35 km) or Chennai International Airport (140 km).',
      byRailHi: 'तिरुपति रेलवे स्टेशन (TPTY) एवं रेनिगुंटा जंक्शन (RU)।',
      byRailEn:
        'Tirupati Main (TPTY) and Renigunta (RU) connect all major Indian cities.',
      byRoadHi: 'तिरुमाला तिरुपति देवस्थानम (TTD) की 24x7 घाट रोड बसें उपलब्ध।',
      byRoadEn: 'Two twin-ghat roads connect Tirupati city to Tirumala hills.',
      nearestAirport: 'Tirupati Airport (TIR) / Chennai (MAA)',
      nearestRailwayStation: 'Tirupati Railway Station (TPTY)',
    },
    nearbyAttractionsHi:
      'पद्मावती अम्मावरु मंदिर (तिरुचानूर), श्री कालहस्ती (राहु-केतु पूजा), कपिला तीर्थम, शिला तोरणम्, श्री वराहस्वामी मंदिर',
    nearbyAttractionsEn:
      'Padmavathi Temple Tiruchanur, Srikalahasti Temple, Kapila Theertham, Natural Arch (Silathoranam), Sri Varahaswamy Temple',
    image: imagePath.Vishnu,
  },
  {
    id: 'meenakshi_amman',
    order: 18,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'मीनाक्षी अम्मन मंदिर (मदुरै)',
    nameEn: 'Meenakshi Amman Temple (Madurai)',
    aliasNamesHi: ['मीनाक्षी सुंदरेश्वरर', 'मदुरै मीनाक्षी'],
    aliasNamesEn: ['Meenakshi Sundareswarar', 'Madurai Meenakshi'],
    locationHi: 'मदुरै, तमिलनाडु (वैगई नदी तट)',
    locationEn: 'Madurai, Tamil Nadu (Banks of Vaigai River)',
    addressHi: 'मीनाक्षी अम्मन मंदिर, मदुरै, तमिलनाडु - 625001',
    addressEn: 'Madurai Meenakshi Amman Temple, Madurai, Tamil Nadu - 625001',
    districtHi: 'मदुरै',
    districtEn: 'Madurai',
    stateHi: 'तमिलनाडु',
    stateEn: 'Tamil Nadu',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '625001',
    geo: {
      latitude: 9.9195,
      longitude: 78.1193,
    },
    deityHi: 'देवी मीनाक्षी (पार्वती) एवं भगवान सुंदरेश्वरर (शिव)',
    deityEn: 'Goddess Meenakshi (Parvati) & Lord Sundareswarar (Shiva)',
    category: 'major',
    categories: ['major', 'shaktipeeth'],
    isShaktipeeth: true,
    tags: ['meenakshi', 'madurai', 'tamil-nadu', 'dravidian', 'shaktipeeth'],
    historyHi:
      '2500 वर्ष प्राचीन इतिहास; वर्तमान 14 भव्य गोपुरमों वाले स्वरूप का निर्माण 16वीं-17वीं शताब्दी में नायक राजाओं द्वारा कराया गया।',
    historyEn:
      'Rebuilt and expanded in 1623–1655 CE by King Tirumala Nayaka of the Nayak Dynasty.',
    builtCentury: '17th Century CE (Nayak Era)',
    builtByHi: 'तिरुमलाई नायक (नायक राजवंश)',
    builtByEn: 'King Tirumala Nayaka',
    architectureStyleHi:
      'सर्वोत्कृष्ट द्रविड़ियन वास्तुकला, 14 विशाल बहुरंगी गोपुरम एवं 1000 स्तंभों वाला हॉल',
    architectureStyleEn:
      'Peak Dravidian architecture with 14 multi-tiered polychrome gopurams and Thousand Pillar Hall',
    significanceHi:
      'सनातन वास्तुकला का विश्वप्रसिद्ध आश्चर्य। 14 गगनचुम्बी गोपुरमों पर 33,000 से अधिक बारीक नक्काशीदार रंगीन देव प्रतिमाएं सुशोभित हैं।',
    significanceEn:
      'Architectural masterpiece featuring 14 magnificent gopurams adorned with over 33,000 colorful mythological sculptures.',
    descriptionHi:
      'मदुरै नगर इस मंदिर के चारों ओर कमल के फूलों के चक्रव्यूह के आकार में बसा है। मंदिर का "हॉल ऑफ थाउजेंड पिलर्स" (सहस्र स्तंभ मंडप) ध्वनि तरंगें उत्पन्न करने वाले संगीत स्तंभों (Musical Pillars) से युक्त है।',
    descriptionEn:
      'Centerpiece of the ancient lotus-shaped city of Madurai. Houses the legendary 985-carved pillar hall with musical resonance stones.',
    timing: {
      openingTime: '05:00 AM',
      closingTime: '10:00 PM',
      aartiTimingsHi:
        'प्रातः दर्शन: 05:00 AM – 12:30 PM | सायं दर्शन: 04:00 PM – 10:00 PM | शयन आरती व पल्लीअरै: 09:30 PM',
      aartiTimingsEn:
        'Morning: 05:00 AM – 12:30 PM | Evening: 04:00 PM – 10:00 PM | Palliyarai Seva: 09:30 PM',
      bestTimeToVisitHi:
        'अक्टूबर से मार्च (तथा अप्रैल में चित्तिरै ब्रह्मोत्सव)',
      bestTimeToVisitEn:
        'October to March (and Chithirai Festival in April/May)',
    },
    howToReach: {
      byAirHi: 'मदुरै अंतर्राष्ट्रीय हवाई अड्डा (IXM) मंदिर से 12 किमी।',
      byAirEn: 'Madurai International Airport (IXM) is 12 km from the temple.',
      byRailHi: 'मदुरै जंक्शन (MDU) मात्र 2 किमी दूर है।',
      byRailEn: 'Madurai Junction (MDU) is 2 km away.',
      byRoadHi: 'चेन्नई, त्रिची, कोयंबटूर व कन्याकुमारी से 4-लेन राजमार्ग।',
      byRoadEn: 'Major hub with 24x7 highway connectivity across South India.',
      nearestAirport: 'Madurai Airport (IXM)',
      nearestRailwayStation: 'Madurai Junction (MDU)',
    },
    nearbyAttractionsHi:
      'तिरुमलाई नायक महल, तेप्पकुलम मरिअम्मन कुण्ड, गांधी मेमोरियल म्यूजियम, अलगर कोविल',
    nearbyAttractionsEn:
      'Thirumalai Nayakkar Palace, Vandiyur Mariamman Teppakulam, Alagar Kovil, Gandhi Memorial Museum',
    image: imagePath.Durga,
  },
  {
    id: 'vaishno_devi',
    order: 19,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'माँ वैष्णो देवी धाम (कटरा - त्रिकूट पर्वत)',
    nameEn: 'Maa Vaishno Devi Dham (Katra - Trikuta Hills)',
    aliasNamesHi: ['माता रानी', 'त्रिकूट सुंदरी', 'वैष्णवी माता'],
    aliasNamesEn: ['Mata Rani', 'Trikuta Devi', 'Vaishnavi'],
    locationHi: 'कटरा, रियासी जिला, जम्मू एवं कश्मीर (त्रिकूट पर्वत गुफा)',
    locationEn:
      'Katra, Reasi District, Jammu & Kashmir (Holy Trikuta Mountain Cave)',
    addressHi:
      'श्री माता वैष्णो देवी श्राइन बोर्ड, कटरा, जम्मू एवं कश्मीर - 182301',
    addressEn: 'Shri Mata Vaishno Devi Shrine Board, Katra, J&K - 182301',
    districtHi: 'रियासी',
    districtEn: 'Reasi',
    stateHi: 'जम्मू एवं कश्मीर',
    stateEn: 'Jammu & Kashmir',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '182301',
    geo: {
      latitude: 33.0308,
      longitude: 74.949,
    },
    deityHi:
      'माँ वैष्णो देवी (तीन पावन पिण्डी रूप — महाकाली, महालक्ष्मी, महासरस्वती)',
    deityEn:
      'Maa Vaishno Devi (Holy Pindis of Mahakali, Mahalakshmi, Mahasaraswati)',
    category: 'shaktipeeth',
    categories: ['shaktipeeth', 'major'],
    isShaktipeeth: true,
    tags: [
      'vaishno-devi',
      'katra',
      'jammu-kashmir',
      'shaktipeeth',
      'himalayas',
      'navratri',
    ],
    significanceHi:
      'त्रिकूट पर्वत की पवित्र गुफा में माँ वैष्णो देवी तीन प्राकृतिक पाषाण पिण्डियों (महाकाली, महालक्ष्मी व महासरस्वती) के रूप में जागृत रूप में विराजमान हैं। "जय माता दी" के उद्घोष से गुंजायमान 12 किमी का पावन ट्रेक।',
    significanceEn:
      'Sacred cave shrine housing three self-manifested natural rock Pindis (Mahakali, Mahalakshmi, Mahasaraswati). Pilgrimage spans a scenic 12 km mountain trek from Katra.',
    descriptionHi:
      'समुद्र तल से 5,200 फीट की ऊँचाई पर स्थित इस पावन धाम में वर्षभर लाखों भक्त दर्शन हेतु पधारते हैं। यात्रा बाणगंगा, चरण पादुका, अर्धकुंवारी (गर्भजून गुफा) से होते हुए मुख्य भवन तक पहुँचती है। भैरों घाटी दर्शन के बिना यात्रा पूर्ण नहीं मानी जाती।',
    descriptionEn:
      'Situated at 5,200 ft in Trikuta hills. Trail passes Ban Ganga, Charan Paduka, Ardhkuwari (Garbhjun Cave), and culminates at Bhawan. Pilgrimage is completed after visiting Bhairon Ghati.',
    timing: {
      openingTime: '05:00 AM (24x7 Open except daily aartis)',
      closingTime: '10:00 PM',
      aartiTimingsHi:
        'प्रातः दिव्य आरती: 06:00 से 08:00 AM | सायं दिव्य आरती: 06:00 से 08:00 PM',
      aartiTimingsEn:
        'Morning Divya Aarti: 06:00 – 08:00 AM | Evening Divya Aarti: 06:00 – 08:00 PM',
      bestTimeToVisitHi: 'मार्च से नवम्बर (तथा चैत्र व शारदीय नवरात्रि)',
      bestTimeToVisitEn: 'March to November (and Navratri festivals)',
    },
    howToReach: {
      byAirHi:
        'जम्मू हवाई अड्डा (IXJ) से कटरा 50 किमी (कार/टैक्सी द्वारा 1.5 घंटा)।',
      byAirEn: 'Jammu Airport (IXJ) is 50 km from Katra base camp.',
      byRailHi:
        'श्री माता वैष्णो देवी कटरा रेलवे स्टेशन (SVDK) से वंदे भारत व सुपरफास्ट ट्रेनें।',
      byRailEn:
        'Shri Mata Vaishno Devi Katra (SVDK) station with direct Vande Bharat trains from Delhi.',
      byRoadHi:
        'जम्मू-कटरा 4-लेन राजमार्ग, कटरा से भवन हेतु हेलिकॉप्टर, बैटरी कार व रोपवे उपलब्ध।',
      byRoadEn:
        'NH-44 connected to Katra; helicopter, battery cars, and ropeway from Bhawan to Bhairon Ghati.',
      nearestAirport: 'Jammu Airport (IXJ)',
      nearestRailwayStation: 'SMVD Katra Railway Station (SVDK)',
    },
    nearbyAttractionsHi:
      'अर्धकुंवारी गुफा, भैरों नाथ मंदिर (रोपवे द्वारा), बाणगंगा, चरण पादुका, शिव खोड़ी गुफा (75 किमी)',
    nearbyAttractionsEn:
      'Ardhkuwari Cave, Bhairon Ghati (Ropeway), Ban Ganga, Charan Paduka, Shiv Khori Cave (75 km)',
    image: imagePath.Durga,
  },
  {
    id: 'siddhivinayak_mumbai',
    order: 20,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'श्री सिद्धिविनायक मंदिर (मुंबई)',
    nameEn: 'Shri Siddhivinayak Temple (Mumbai)',
    aliasNamesHi: ['नवसाचा गणपती', 'सिद्धिविनायक गणपति'],
    aliasNamesEn: ['Navasacha Ganapati', 'Siddhivinayak Ganapati'],
    locationHi: 'प्रभादेवी, मुंबई, महाराष्ट्र',
    locationEn: 'Prabhadevi, Mumbai, Maharashtra',
    addressHi:
      'श्री सिद्धिविनायक मंदिर, एसके बोले मार्ग, प्रभादेवी, मुंबई - 400028',
    addressEn:
      'Shree Siddhivinayak Temple, SK Bole Marg, Prabhadevi, Mumbai - 400028',
    districtHi: 'मुंबई शहर',
    districtEn: 'Mumbai City',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '400028',
    geo: {
      latitude: 19.0169,
      longitude: 72.8304,
    },
    deityHi: 'भगवान श्री गणेश (दाहिनी ओर मुड़ी सूंड वाले सिद्धिविनायक)',
    deityEn: 'Lord Ganesha (Siddhivinayak - Right-turned Trunk)',
    otherDeitiesHi: ['माता रिद्धि व माता सिद्धि'],
    otherDeitiesEn: ['Goddess Riddhi & Goddess Siddhi'],
    category: 'major',
    categories: ['major'],
    tags: ['ganesha', 'siddhivinayak', 'mumbai', 'maharashtra', 'major'],
    historyHi:
      '19 नवंबर 1801 को लक्ष्मण विथु और देउबाई पाटिल द्वारा इस पावन मंदिर की स्थापना की गई थी।',
    historyEn:
      'Originally consecrated on 19 November 1801 by Laxman Vithu and Deubai Patil.',
    builtCentury: '1801 CE',
    builtByHi: 'लक्ष्मण विथु एवं देउबाई पाटिल',
    builtByEn: 'Laxman Vithu & Deubai Patil',
    architectureStyleHi:
      'बहुमंजिला अष्टकोणीय स्वर्ण शिखर युक्त आधुनिक मंदिर शैली',
    architectureStyleEn: 'Multi-tiered octagonal dome plated with pure gold',
    significanceHi:
      'मनोकामनाएं पूर्ण करने वाले "नवसाचा गणपती"। यहाँ भगवान गणेश की सूंड दाहिनी ओर (पिंगला नाड़ी स्वरूपा) मुड़ी है जो सिद्धि व पराक्रम की प्रतीक है।',
    significanceEn:
      'Revered as "Navasacha Ganapati" (the wish-fulfiller). The deity’s trunk turns to the right representing the active Pingala energy.',
    descriptionHi:
      'काले पाषाण के एक ही शिलाखंड से निर्मित 2.5 फीट ऊंचे गणेश विग्रह के मस्तक पर तीसरी आँख और दोनों ओर रिद्धि-सिद्धि विराजित हैं। गर्भगृह का आंतरिक भाग शुद्ध स्वर्ण पत्थरों से अलंकृत है।',
    descriptionEn:
      'Enshrines a 2.5 ft black monolithic stone idol flanked by Riddhi and Siddhi. The sanctum dome is plated in pure gold.',
    timing: {
      openingTime: '05:30 AM',
      closingTime: '10:00 PM (मंगलवार को 03:15 AM से रात्रि 10:30 PM)',
      aartiTimingsHi:
        'काकड़ आरती: 05:30 AM | श्री दर्शन: 06:00 AM | नैवेद्य: 12:05 PM | सायं आरती: 07:30 PM | शेजारती: 09:50 PM',
      aartiTimingsEn:
        'Kakad Aarti: 05:30 AM | Darshan: 06:00 AM | Naivedya: 12:05 PM | Sandhya: 07:30 PM | Shejaarti: 09:50 PM',
      bestTimeToVisitHi:
        'वर्षभर (विशेषकर मंगलवार एवं गणेश चतुर्थी/अंगारकी संकष्टी)',
      bestTimeToVisitEn:
        'Year-round (especially Tuesdays, Ganesh Chaturthi & Angaraki Chaturthi)',
    },
    howToReach: {
      byAirHi:
        'छत्रपति शिवाजी महाराज अंतर्राष्ट्रीय हवाई अड्डा, मुंबई (लगभग 12 किमी)।',
      byAirEn: 'Chhatrapati Shivaji Maharaj International Airport (12 km).',
      byRailHi: 'दादर रेलवे स्टेशन (मध्य व पश्चिम लाइन) मात्र 1.5 किमी।',
      byRailEn:
        'Dadar Railway Station (1.5 km) connects central and western lines.',
      byRoadHi:
        'लोकल टैक्सी, बेस्ट बसें और मुंबई मेट्रो लाइन 3 द्वारा अत्यंत सुलभ।',
      byRoadEn:
        'Accessible via Western Express Highway, Sea Link, and Mumbai Metro.',
      nearestAirport: 'Mumbai Airport (BOM)',
      nearestRailwayStation: 'Dadar Railway Station (DR / DDR)',
    },
    nearbyAttractionsHi:
      'शिवाजी पार्क, दादर चौपाटी, महालक्ष्मी मंदिर, हाजी अली दरगाह, मरीन ड्राइव',
    nearbyAttractionsEn:
      'Shivaji Park, Dadar Chowpatty, Mahalaxmi Temple, Haji Ali, Marine Drive',
    image: imagePath.Ganesha,
  },
  {
    id: 'kamakhya_temple',
    order: 21,
    isActive: true,
    updatedAt: '2026-09-28T00:00:00.000Z',
    nameHi: 'माँ कामाख्या मंदिर (नीलांचल पर्वत - गुवाहाटी)',
    nameEn: 'Maa Kamakhya Temple (Nilachal Hills - Guwahati)',
    aliasNamesHi: ['कामगिरि पीठ', 'योनि पीठ', 'महापीठ कामाख्या'],
    aliasNamesEn: ['Kamagiri Peeth', 'Yoni Peeth', 'Maha Shaktipeeth Kamakhya'],
    locationHi: 'नीलांचल पर्वत, गुवाहाटी, असम (ब्रह्मपुत्र नदी तट)',
    locationEn: 'Nilachal Hills, Guwahati, Assam (Banks of Brahmaputra River)',
    addressHi: 'माँ कामाख्या देवालय, नीलांचल हिल्स, गुवाहाटी, असम - 781010',
    addressEn:
      'Maa Kamakhya Devalaya, Nilachal Hills, Guwahati, Assam - 781010',
    districtHi: 'कामरूप मेट्रोपॉलिटन',
    districtEn: 'Kamrup Metropolitan',
    stateHi: 'असम',
    stateEn: 'Assam',
    countryHi: 'भारत',
    countryEn: 'India',
    pincode: '781010',
    geo: {
      latitude: 26.1664,
      longitude: 91.7054,
    },
    deityHi: 'माँ कामाख्या (महामाया / आद्य शक्ति)',
    deityEn: 'Maa Kamakhya (Mahamaya / Supreme Mother Goddess)',
    otherDeitiesHi: [
      'दस महाविद्याएं (काली, तारा, षोडशी, भुवनेश्वरी, भैरवी, छिन्नमस्ता, धूमावती, बगलामुखी, मातंगी, कमला)',
    ],
    otherDeitiesEn: [
      '10 Mahavidyas (Kali, Tara, Shodashi, Bhuvaneshwari, Bhairavi, Chhinnamasta, Dhumavati, Bagalamukhi, Matangi, Kamala)',
    ],
    category: 'shaktipeeth',
    categories: ['shaktipeeth', 'major'],
    isShaktipeeth: true,
    tags: [
      'kamakhya',
      'shaktipeeth',
      'tantra',
      'guwahati',
      'assam',
      'ambubachi-mela',
    ],
    historyHi:
      '1565 ई. में कोच राजवंश के महान राजा नरनारायण और सेनापति चिलाराय द्वारा मंदिर का भव्य पुनर्निर्माण कराया गया।',
    historyEn:
      'Reconstructed in 1565 CE by King Naranarayan and his general Chilarai of the Koch Dynasty.',
    builtCentury: '1565 CE (Koch Dynasty)',
    builtByHi: 'राजा नरनारायण एवं चिलाराय (कोच राजवंश)',
    builtByEn: 'King Naranarayan & General Chilarai',
    architectureStyleHi:
      'असमिया नीलांचल शैली (मधुमक्खी के छत्ते सदृश अष्टकोणीय शिखर व बलुआ पत्थर)',
    architectureStyleEn:
      'Nilachal style with beehive-shaped bulbous dome over a cruciform base',
    significanceHi:
      '51 महाशक्तिपीठों में सर्वोपरि "महापीठ" जहाँ माता सती का "योनि भाग" गिरा था। तंत्र साधना का विश्वप्रसिद्ध केंद्र एवं वार्षिक "अंबुवाची मेला" का पावन तीर्थ।',
    significanceEn:
      'Foremost of the 51 Shakti Peethas where the Yoni (source of cosmic creation) of Goddess Sati fell. Supreme center of Kulachara Tantra and the annual Ambubachi Mela.',
    descriptionHi:
      'गर्भगृह में कोई मूर्ति नहीं है, अपितु प्राकृतिक भूमिगत जलधारा से सिंचित एक पाषाण योनि शिला विराजित है। अंबुवाची पर्व (आषाढ़) में तीन दिन मंदिर बंद रहता है जब माँ धरती रजस्वला होती हैं।',
    descriptionEn:
      'The sanctum contains no idol but a natural spring-fed rock fissure worshipped as the creative womb of the cosmos. Closed for 3 days during Ambubachi when Mother Earth undergoes annual fertility cycle.',
    timing: {
      openingTime: '05:30 AM',
      closingTime: '08:00 PM',
      aartiTimingsHi:
        'स्नान व द्वारोद्घाटन: प्रातः 05:30 | मध्याह्न भोग व विश्राम: 01:00 से 02:30 PM | संध्या आरती: सायं 07:00',
      aartiTimingsEn:
        'Opening & Snan: 05:30 AM | Afternoon Rest: 01:00 – 02:30 PM | Sandhya Aarti: 07:00 PM',
      bestTimeToVisitHi:
        'अक्टूबर से अप्रैल (तथा जून में अंबुवाची मेला व नवरात्रि)',
      bestTimeToVisitEn: 'October to April (and Ambubachi Mela in June)',
    },
    howToReach: {
      byAirHi:
        'लोकप्रिय गोपीनाथ बोरदोलोई अंतर्राष्ट्रीय हवाई अड्डा, गुवाहाटी (लगभग 20 किमी)।',
      byAirEn:
        'Lokpriya Gopinath Bordoloi International Airport, Guwahati (20 km).',
      byRailHi:
        'कामाख्या जंक्शन (KYQ) मात्र 3 किमी अथवा गुवाहाटी रेलवे स्टेशन (6 किमी)।',
      byRailEn:
        'Kamakhya Junction (KYQ - 3 km) or Guwahati Station (GHY - 6 km).',
      byRoadHi: 'गुवाहाटी शहर से नीलांचल हिल्स हेतु नियमित कैब, ऑटो व बस सेवा।',
      byRoadEn:
        'Frequent public and private road transport from Guwahati city.',
      nearestAirport: 'Guwahati Airport (GAU)',
      nearestRailwayStation: 'Kamakhya Junction (KYQ) / Guwahati (GHY)',
    },
    nearbyAttractionsHi:
      'भुवनेश्वरी मंदिर (नीलांचल शिखर), उमानंद द्वीप मंदिर (ब्रह्मपुत्र नदी), नवग्रह मंदिर, ब्रह्मपुत्र रिवर क्रूज',
    nearbyAttractionsEn:
      'Bhuvaneshwari Temple, Umananda Island Temple (Peacock Island), Navagraha Temple, Brahmaputra River Cruise',
    image: imagePath.Kali,
  },
];
