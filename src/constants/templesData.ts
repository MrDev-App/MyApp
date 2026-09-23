import imagePath from '@assets/index';

export type TempleCategory =
  | 'chardham'
  | 'jyotirlinga'
  | 'shaktipeeth'
  | 'major'
  | 'chota_chardham';

export interface TempleItem {
  id: string;
  nameHi: string;
  nameEn: string;
  locationHi: string;
  locationEn: string;
  stateHi: string;
  stateEn: string;
  deityHi: string;
  deityEn: string;
  image: any;
  imageUrl?: string;
  category: TempleCategory;
  categories: TempleCategory[];
  isCharDham?: boolean;
  isJyotirlinga?: boolean;
  isShaktipeeth?: boolean;
  isChotaCharDham?: boolean;
  yugaHi?: string;
  yugaEn?: string;
  directionHi?: string;
  directionEn?: string;
  significanceHi: string;
  significanceEn: string;
  timingHi: string;
  timingEn: string;
  descriptionHi: string;
  descriptionEn: string;
  nearbyAttractionsHi?: string;
  nearbyAttractionsEn?: string;
  order?: number;
}

export const templesData: TempleItem[] = [
  // =========================================================================
  // 1. THE 4 SACRED ALL-INDIA CHAR DHAMS (चार महाधाम - सत्य, त्रेता, द्वापर, कलि)
  // =========================================================================
  {
    id: 'badrinath_dham',
    nameHi: 'बद्रीनाथ धाम (उत्तर धाम - सत्ययुग)',
    nameEn: 'Badrinath Dham (North Dham - Satya Yuga)',
    locationHi: 'चमोली, उत्तराखण्ड (अलकनंदा नदी तट)',
    locationEn: 'Chamoli District, Uttarakhand (Banks of Alaknanda River)',
    stateHi: 'उत्तराखण्ड',
    stateEn: 'Uttarakhand',
    deityHi: 'भगवान विष्णु (बद्रीनारायण / नर-नारायण)',
    deityEn: 'Lord Vishnu (Badrinarayan / Nara-Narayana)',
    image: imagePath.badrinathDham,
    category: 'chardham',
    categories: ['chardham', 'chota_chardham', 'major'],
    isCharDham: true,
    isChotaCharDham: true,
    yugaHi: 'सत्ययुग',
    yugaEn: 'Satya Yuga',
    directionHi: 'उत्तर (North)',
    directionEn: 'North',
    order: 1,
    significanceHi:
      'सत्ययुग से संबंधित प्रथम महाधाम एवं तपस्या का सर्वोच्च केंद्र। यहाँ भगवान विष्णु नर-नारायण स्वरूप में विश्वकल्याण हेतु निरंतर ध्यानमग्न हैं। माता लक्ष्मी ने भीषण हिमपात में नारायण की रक्षा हेतु विशाल बद्री (बेर) वृक्ष का रूप धारण किया था। यह आद्य शंकराचार्य द्वारा स्थापित चार प्रमुख मठों में से ज्योतिर्मठ (जोशीमठ) का पावन क्षेत्र है।',
    significanceEn:
      'Associated with Satya Yuga, Badrinath is the supreme domain of penance (tapas). Twin sages Nara and Narayana meditated here for cosmic balance. Goddess Lakshmi manifested as a Badari (berry) tree to shield Narayana. Part of the cardinal mathas established by Adi Shankaracharya (Jyotirmath).',
    timingHi:
      'प्रातः 04:30 से दोपहर 01:00, सायं 04:00 से रात्रि 09:00 (अक्षय तृतीया से भाईदूज / ग्रीष्मकालीन)',
    timingEn:
      '04:30 AM – 01:00 PM, 04:00 PM – 09:00 PM (May to November / Seasonal)',
    descriptionHi:
      'नर और नारायण पर्वत श्रृंखलाओं के मध्य अलकनंदा नदी के पावन तट पर स्थित। ८वीं शताब्दी में आद्य जगद्गुरु शंकराचार्य जी ने नारद कुण्ड से शालिग्राम विग्रह को निकालकर तप्त कुण्ड के समीप स्थापित किया था। पौराणिक मान्यता है कि कलियुग के अंत में जब जय-विजय पर्वत आपस में मिल जाएंगे, तब बद्रीनाथ जी का प्राकट्य भविष्य बद्री में होगा।',
    descriptionEn:
      'Nestled between the Nar and Narayana ranges on the Alaknanda river. In the 8th century, Adi Shankaracharya recovered the sacred Saligram idol from Narad Kund and consecrated it. Puranic prophecy states that when the mountains of Jay and Vijay close, the deity will manifest at Bhavishya Badri.',
    nearbyAttractionsHi:
      'तप्त कुण्ड, माणा गाँव (भारत का प्रथम गाँव), वसुधारा जलप्रपात, व्यास गुफा, गणेश गुफा, चरणपादुका',
    nearbyAttractionsEn:
      'Tapt Kund (hot sulfur spring), Mana Village, Vasudhara Falls, Vyas Gufa, Ganesh Gufa, Charanpaduka',
  },
  {
    id: 'rameshwaram_dham',
    nameHi: 'रामेश्वरम धाम एवं ज्योतिर्लिंग (दक्षिण धाम - त्रेतायुग)',
    nameEn: 'Rameswaram Dham & Jyotirlinga (South Dham - Treta Yuga)',
    locationHi: 'रामेश्वरम द्वीप, रामनाथपुरम, तमिलनाडु',
    locationEn: 'Rameswaram Island, Tamil Nadu',
    stateHi: 'तमिलनाडु',
    stateEn: 'Tamil Nadu',
    deityHi: 'भगवान शिव (रामनाथस्वामी / रामलिंगम व विश्वलिंगम)',
    deityEn: 'Lord Shiva (Ramanathaswamy - Ramalingam & Viswalingam)',
    image: imagePath.rameshwaramJyotirlinga,
    category: 'chardham',
    categories: ['chardham', 'jyotirlinga', 'major'],
    isCharDham: true,
    isJyotirlinga: true,
    yugaHi: 'त्रेतायुग',
    yugaEn: 'Treta Yuga',
    directionHi: 'दक्षिण (South)',
    directionEn: 'South',
    order: 2,
    significanceHi:
      'त्रेतायुग से संबंधित दक्षिण धाम एवं द्वादश ज्योतिर्लिंग, जो शैव और वैष्णव मतों का परम संगम है। लंका विजय व रावण वध के पश्चात ब्रह्म-हत्या दोष से मुक्ति हेतु भगवान श्री राम ने यहाँ महादेव की प्रतिष्ठा की थी। आदि शंकराचार्य ने यहाँ शृंगेरी शारदा पीठ से संबंधित दक्षिण पीठ की स्थापना की थी।',
    significanceEn:
      'Associated with Treta Yuga, Rameswaram bridges Shaivism and Vaishnavism as both a Char Dham and a Jyotirlinga. Lord Rama consecrated the Shiva Lingam here to atone for slaying Ravana before building the bridge to Lanka. Connected to Adi Shankaracharya’s Southern monastic tradition.',
    timingHi:
      'प्रातः 05:00 से दोपहर 01:00, दोपहर 03:00 से रात्रि 09:00 (स्फटिक लिंग दर्शन: प्रातः 05:00 से 06:00)',
    timingEn:
      '05:00 AM – 01:00 PM, 03:00 PM – 09:00 PM (Spadika Linga Darshan: 05:00 AM – 06:00 AM)',
    descriptionHi:
      'गर्भगृह में दो दिव्य शिवलिंग प्रतिष्ठित हैं—माता सीता द्वारा रेत से निर्मित "रामलिंगम" और कैलाश से हनुमान जी द्वारा लाया गया "विश्वलिंगम"। श्री राम के आदेशानुसार आज भी पहले विश्वलिंगम की पूजा होती है। मंदिर परिसर में श्री राम के बाणों से निर्मित २२ पवित्र कुण्ड (तीर्थ) हैं, जिनमें स्नान से समस्त पाप व रोग नष्ट होते हैं।',
    descriptionEn:
      'Houses two sacred lingams: Ramalingam (sculpted from sand by Sita) and Viswalingam (brought from Kailash by Hanuman, worshipped first as per Rama’s decree). Pilgrims bathe in 22 holy wells (Theerthams) created by Rama’s arrows, possessing therapeutic and purifying powers.',
    nearbyAttractionsHi:
      'धनुषकोडी, राम सेतु बिंदु, पंचमुखी हनुमान मंदिर (तैरते पत्थर), अग्नि तीर्थम, एपीजे अब्दुल कलाम मेमोरियल',
    nearbyAttractionsEn:
      'Dhanushkodi, Ram Setu Point, Panchmukhi Hanuman Temple (Floating Stones), Agni Tirtham, APJ Abdul Kalam Memorial',
  },
  {
    id: 'dwarkadhish_dham',
    nameHi: 'द्वारकाधीश धाम (पश्चिम धाम - द्वापरयुग)',
    nameEn: 'Dwarkadhish Dham (West Dham - Dvapara Yuga)',
    locationHi: 'द्वारका, सौराष्ट्र, गुजरात (गोमती नदी संगम, अरब सागर)',
    locationEn: 'Dwarka, Gujarat (Confluence of Gomti River & Arabian Sea)',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    deityHi: 'भगवान श्री कृष्ण (द्वारकाधीश / त्रिलोक सुंदर)',
    deityEn: 'Lord Krishna (Dwarkadhish / King of Dwarka)',
    image: imagePath.dwarkadhishDham,
    category: 'chardham',
    categories: ['chardham', 'major'],
    isCharDham: true,
    yugaHi: 'द्वापरयुग',
    yugaEn: 'Dvapara Yuga',
    directionHi: 'पश्चिम (West)',
    directionEn: 'West',
    order: 3,
    significanceHi:
      'द्वापरयुग से संबंधित पश्चिम धाम एवं सप्त पुरियों में मोक्षदायिनी पुरी। मथुरा त्याग के उपरांत भगवान श्री कृष्ण ने समुद्र देव से १२ योजन भूमि लेकर विश्वकर्मा द्वारा इस भव्य स्वर्ण नगरी की रचना कराई थी। यहाँ आद्य शंकराचार्य द्वारा स्थापित पश्चिमी द्वारका शारदा पीठ (कालिका मठ) स्थित है।',
    significanceEn:
      'Associated with Dvapara Yuga and one of the Sapta Puris (Mokshada Puri). Lord Krishna established his residential capital here over 12 yojanas of reclaimed sea land built by Vishwakarma. Site of the western Dvaraka Sharada Peetham established by Adi Shankara.',
    timingHi:
      'प्रातः 06:30 से दोपहर 01:00, सायं 05:00 से रात्रि 09:30 (ध्वजारोहण: प्रातः, दोपहर, सायं)',
    timingEn:
      '06:30 AM – 01:00 PM, 05:00 PM – 09:30 PM (Daily 5 Sacred Flag Hoistings)',
    descriptionHi:
      'महाभारत युद्ध के ३६ वर्ष पश्चात गांधारी के शाप व यदुवंश के उपशम के साथ मूल द्वारका नगरी समुद्र में समाहित हो गई थी। वर्तमान ५-मंजिला जगत मंदिर का निर्माण भगवान कृष्ण के प्रपौत्र वज्रनाभ द्वारा मूल "हरि गृह" पर कराया गया था। समुद्री पुरातत्व उत्खनन में जलमग्न पाषाण स्तंभ और प्राचीन प्राचीर मिले हैं जो पौराणिक इतिहास को प्रमाणित करते हैं।',
    descriptionEn:
      'Following Queen Gandhari’s curse, the original golden city submerged into the Arabian Sea 36 years after the Mahabharata war. The present 5-story Jagat Mandir was built by Krishna’s great-grandson Vajranabh over the original palace (Hari Griha). Marine excavations have verified these submerged ancient structures.',
    nearbyAttractionsHi:
      'बेट द्वारका, रुक्मिणी देवी मंदिर, गोमती घाट, नागेश्वर ज्योतिर्लिंग, सुदामा सेतु',
    nearbyAttractionsEn:
      'Beyt Dwarka, Rukmini Devi Temple, Gomti Ghat, Nageshwar Jyotirlinga, Sudama Setu',
  },
  {
    id: 'jagannath_puri',
    nameHi: 'श्री जगन्नाथ पुरी धाम (पूर्व धाम - कलियुग)',
    nameEn: 'Shri Jagannath Puri Dham (East Dham - Kali Yuga)',
    locationHi: 'पुरी, ओडिशा (बंगाल की खाड़ी तट)',
    locationEn: 'Puri, Odisha (Eastern Coast on Bay of Bengal)',
    stateHi: 'ओडिशा',
    stateEn: 'Odisha',
    deityHi: 'भगवान जगन्नाथ (श्रीकृष्ण), बलभद्र व देवी सुभद्रा',
    deityEn: 'Lord Jagannath (Krishna), Balabhadra & Goddess Subhadra',
    image: imagePath.jagannathPuriDham,
    category: 'chardham',
    categories: ['chardham', 'major'],
    isCharDham: true,
    yugaHi: 'कलियुग',
    yugaEn: 'Kali Yuga',
    directionHi: 'पूर्व (East)',
    directionEn: 'East',
    order: 4,
    significanceHi:
      'कलियुग का परम मोक्षधाम एवं शंख क्षेत्र (पुरुषोत्तम धाम)। यह भारत का एकमात्र ऐसा पवित्र तीर्थ है जहाँ भगवान श्री कृष्ण (जगन्नाथ) के साथ उनके बड़े भाई बलभद्र और बहन सुभद्रा की एक साथ पूजा की जाती है। यह आद्य शंकराचार्य द्वारा स्थापित चार प्रमुख मठों में से गोवर्धन मठ का पावन स्थल है।',
    significanceEn:
      'Associated with Kali Yuga and located on the coast of the Bay of Bengal in Odisha. It is the only shrine in India where Goddess Subhadra, sister of Krishna, is worshipped together with her brothers Jagannatha and Balabhadra. Puri is also the site of the sacred Govardhana Matha, one of the four cardinal mathas established by Adi Shankara.',
    timingHi: 'प्रातः 05:30 से रात्रि 11:00 (दैनिक महाप्रसाद एवं संध्या आरती)',
    timingEn: '05:30 AM – 11:00 PM (Daily Mahaprasad Offering & Sandhya Aarti)',
    descriptionHi:
      'मंदिर अभिलेखों के अनुसार अवंती के राजा इंद्रद्युम्न ने पुरी में मूल जगन्नाथ मंदिर का निर्माण कराया था। १०वीं शताब्दी से पूर्वी गंगा राजवंश के प्रथम राजा अनंतवर्मन चोडगंग देव ने वर्तमान भव्य कलिंग शैली मंदिर का पुनर्निर्माण कराया। दारु (पवित्र नीम काष्ठ) से निर्मित विग्रहों में हर ८-१९ वर्ष में "नव कलेवर" के दौरान गुप्त रूप से "ब्रह्म पदार्थ" स्थानांतरित किया जाता है।',
    descriptionEn:
      'As per temple records, King Indradyumna of Avanti built the original temple of Jagannath at Puri. Starting in the tenth century, the first king of the Eastern Ganga dynasty, Anantavarman Chodaganga, rebuilt the present grand temple compound in traditional Kalinga architecture. Deities are carved from sacred neem logs (Daru), with the secret divine Brahma Padartha transferred during the sacred Nabakalebara ritual.',
    nearbyAttractionsHi:
      'गोवर्धन मठ, पुरी समुद्र तट (गोल्डन बीच), गुंडिचा मंदिर, कोणार्क सूर्य मंदिर, चिल्का झील, साक्षी गोपाल मंदिर',
    nearbyAttractionsEn:
      'Govardhana Matha, Puri Golden Beach, Gundicha Temple, Konark Sun Temple, Chilika Lake, Sakshi Gopal Temple',
  },

  // =========================================================================
  // 2. THE 12 SACRED JYOTIRLINGAS (द्वादश ज्योतिर्लिंग)
  // =========================================================================
  {
    id: 'somnath_jyotirlinga',
    nameHi: 'सोमनाथ ज्योतिर्लिंग',
    nameEn: 'Somnath Jyotirlinga',
    locationHi: 'प्रभास पाटन, वेरावल, गुजरात',
    locationEn: 'Prabhas Patan, near Veraval, Gujarat',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    deityHi: 'भगवान शिव (सोमनाथ)',
    deityEn: 'Lord Shiva (Somnath)',
    image: imagePath.somnathJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 5,
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में सर्वप्रथम ज्योतिर्लिंग, जिसका निर्माण दक्ष प्रजापति के शाप से मुक्ति पाने पर स्वयं चंद्रदेव ने स्वर्ण से कराया था। यह सनातन आस्था और अटूट आत्मबल का अमर प्रतीक है।',
    significanceEn:
      'The oldest and first among the 12 Jyotirlingas, built in gold by Moon God (Chandra) in gratitude to Lord Shiva for curing Daksha’s curse. An eternal emblem of strength, faith, and devotion.',
    timingHi:
      'प्रातः 06:00 से रात्रि 10:00 (आरती: प्रातः 07:00, दोपहर 12:00, सायं 07:00; लाइट एंड साउंड शो: रात्रि 08:00)',
    timingEn:
      '06:00 AM – 10:00 PM (Aarti: 07:00 AM, 12:00 PM, 07:00 PM; Light & Sound Show: 08:00 PM)',
    descriptionHi:
      'अरब सागर के सुरम्य तट पर स्थित सोमनाथ मंदिर का इतिहास भक्ति व पुनर्निर्माण की अमर गाथा है। निकटवर्ती प्रमुख दर्शनीय स्थलों में त्रिवेणी संगम (हिरण, कपिला व सरस्वती नदी संगम), भालका तीर्थ (जहाँ श्रीकृष्ण ने देहोत्सर्ग किया) एवं सोमनाथ समुद्र तट शामिल हैं।',
    descriptionEn:
      'Located along the Arabian Sea coast in Prabhas Patan, Somnath has stood resilient through centuries. Nearby attractions include Triveni Sangam (confluence of Hiran, Kapila, and Saraswati rivers), Bhalka Tirth (where Lord Krishna ascended to his divine abode), and Somnath Beach.',
    nearbyAttractionsHi:
      'त्रिवेणी संगम, भालका तीर्थ, सोमनाथ बीच, गीता मंदिर, प्रभास पाटन संग्रहालय',
    nearbyAttractionsEn:
      'Triveni Sangam, Bhalka Tirth, Somnath Beach, Gita Mandir, Prabhas Patan Museum',
  },
  {
    id: 'mallikarjuna_jyotirlinga',
    nameHi: 'मल्लिकार्जुन ज्योतिर्लिंग',
    nameEn: 'Mallikarjuna Jyotirlinga',
    locationHi: 'श्रीशैलम, आन्ध्र प्रदेश',
    locationEn: 'Srisailam, Andhra Pradesh',
    stateHi: 'आन्ध्र प्रदेश',
    stateEn: 'Andhra Pradesh',
    deityHi: 'भगवान शिव (मल्लिकार्जुन) व माँ पार्वती (भ्रमराम्बा)',
    deityEn: 'Lord Shiva (Mallikarjuna) & Goddess Parvati (Bhramaramba)',
    image: imagePath.mallikarjunaJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'shaktipeeth', 'major'],
    isJyotirlinga: true,
    isShaktipeeth: true,
    order: 6,
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में एकमात्र ऐसा दिव्य धाम जहाँ भगवान शिव (मल्लिकार्जुन ज्योतिर्लिंग) और माँ पार्वती (भ्रमराम्बा शक्तिपीठ) दोनों एक साथ साक्षात रूप में पूजे जाते हैं।',
    significanceEn:
      'The sole temple among the 12 Jyotirlingas where both Lord Shiva (Mallikarjuna) and Goddess Parvati (Bhramaramba Shaktipeeth) are revered together.',
    timingHi: 'प्रातः 04:30 से दोपहर 03:30, सायं 06:00 से रात्रि 10:00',
    timingEn: '04:30 AM – 03:30 PM, 06:00 PM – 10:00 PM',
    descriptionHi:
      'नल्लामलाई पर्वतमाला पर कृष्णा नदी के तट पर स्थित। पौराणिक मान्यता है कि जब भगवान कार्तिकेय क्रौंच पर्वत गए, तब शिव-पार्वती ने यहाँ मल्लिकार्जुन व भ्रमराम्बा रूप में निवास किया। निकटवर्ती प्रमुख स्थलों में कृष्णा नदी पर श्रीशैलम बाँध, अक्कमहादेवी गुफाएं एवं पाताल गंगा तीर्थ शामिल हैं।',
    descriptionEn:
      'Nestled atop the Nallamala Hills in Srisailam along the Krishna river. Legend says when Kartikeya went to Krauncha Mountain, Shiva and Parvati stayed here in the form of Mallikarjuna and Bhramaramba. Nearby attractions include Srisailam Dam, Akkamahadevi natural rock caves, and Pathala Ganga sacred ghat.',
    nearbyAttractionsHi:
      'श्रीशैलम बाँध, अक्कमहादेवी गुफाएं, पाताल गंगा, साक्षी गणपति मंदिर',
    nearbyAttractionsEn:
      'Srisailam Dam, Akkamahadevi Caves, Pathala Ganga, Sakshi Ganapathi Temple',
  },
  {
    id: 'mahakaleshwar_jyotirlinga',
    nameHi: 'महाकालेश्वर ज्योतिर्लिंग',
    nameEn: 'Mahakaleshwar Jyotirlinga',
    locationHi: 'उज्जैन, मध्य प्रदेश',
    locationEn: 'Ujjain, Madhya Pradesh',
    stateHi: 'मध्य प्रदेश',
    stateEn: 'Madhya Pradesh',
    deityHi: 'भगवान शिव (महाकालेश्वर / महाकाल)',
    deityEn: 'Lord Shiva (Mahakal)',
    image: imagePath.mahakaleshwarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 7,
    significanceHi:
      'एकमात्र स्वयंभू दक्षिणमुखी ज्योतिर्लिंग, जो काल और मृत्यु के संहारक महाकाल स्वरूप को दर्शाता है। यह ब्रह्ममुहूर्त की अलौकिक भस्म आरती के लिए विश्वप्रसिद्ध है।',
    significanceEn:
      'One of the most distinctive Jyotirlingas with a south-facing lingam representing Mahakaal, destroyer of time and death. World-renowned for its sacred morning Bhasma Aarti.',
    timingHi: 'प्रातः 04:00 से रात्रि 11:00 (भस्म आरती: प्रातः 04:00 से 06:00)',
    timingEn: '04:00 AM – 11:00 PM (Bhasma Aarti: 04:00 AM – 06:00 AM)',
    descriptionHi:
      'पवित्र क्षिप्रा नदी के तट पर स्थित प्राचीन अवंतिका नगरी में काल के स्वामी भगवान महाकाल का दिव्य दरबार। निकटवर्ती प्रमुख आकर्षणों में माँ हरसिद्धि शक्तिपीठ, शिप्रा नदी का रामघाट, मंगलनाथ मंदिर एवं काल भैरव मंदिर शामिल हैं।',
    descriptionEn:
      'Situated in the holy city of Ujjain along the sacred Shipra river. Nearby places of interest include Harsiddhi Temple (Shaktipeeth), Ram Ghat (Shipra River), Mangalnath Temple, and the ancient Kal Bhairav Temple.',
    nearbyAttractionsHi:
      'माँ हरसिद्धि शक्तिपीठ, रामघाट (शिप्रा नदी), काल भैरव मंदिर, मंगलनाथ मंदिर',
    nearbyAttractionsEn:
      'Harsiddhi Temple (Shaktipeeth), Ram Ghat (Shipra River), Kal Bhairav Temple, Mangalnath Temple',
  },
  {
    id: 'omkareshwar_jyotirlinga',
    nameHi: 'ओंकारेश्वर ज्योतिर्लिंग',
    nameEn: 'Omkareshwar Jyotirlinga',
    locationHi: 'मांधाता द्वीप, नर्मदा नदी, खंडवा, मध्य प्रदेश',
    locationEn: 'Mandhata Island, Narmada River, Khandwa, Madhya Pradesh',
    stateHi: 'मध्य प्रदेश',
    stateEn: 'Madhya Pradesh',
    deityHi: 'भगवान शिव (ओंकारेश्वर व अमलेश्वर)',
    deityEn: 'Lord Shiva (Omkareshwar & Mamleshwar)',
    image: imagePath.omkareshwarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 8,
    significanceHi:
      'नर्मदा नदी के मध्य पवित्र ॐ (प्रणव) आकार के मांधाता द्वीप पर स्थित। देवासुर संग्राम में देवताओं की रक्षा हेतु भगवान शिव ने यहाँ साक्षात ज्योति स्वरूप प्रकट किया था।',
    significanceEn:
      'Enshrined on a sacred island naturally shaped like the holy symbol "ॐ" (Om) in the Narmada River. Shiva manifested here to bless the Devas during battle with demons.',
    timingHi: 'प्रातः 05:00 से रात्रि 09:30 (शयन आरती: रात्रि 08:30)',
    timingEn: '05:00 AM – 09:30 PM (Shayan Aarti: 08:30 PM)',
    descriptionHi:
      'नर्मदा और कावेरी (नर्मदा की उपधारा) के संगम पर स्थित यह द्वीप अत्यंत शांत व ऊर्जावान है। यहाँ ओंकारेश्वर और ममलेश्वर दोनों के दर्शन से ज्योतिर्लिंग यात्रा पूर्ण होती है। प्रमुख स्थलों में ममलेश्वर मंदिर, अहिल्या घाट एवं नर्मदा परिक्रमा का आरंभ स्थल शामिल हैं।',
    descriptionEn:
      'Perched on Mandhata island surrounded by the serene Narmada river. Both Omkareshwar and Mamleshwar temples are revered together. Nearby attractions include Mamleshwar Temple, Ahilya Ghat, and the revered Narmada Parikrama starting point.',
    nearbyAttractionsHi:
      'ममलेश्वर मंदिर, अहिल्या घाट, नर्मदा परिक्रमा स्थल, सिद्धनाथ मंदिर',
    nearbyAttractionsEn:
      'Mamleshwar Temple, Ahilya Ghat, Narmada Parikrama Point, Siddhanath Temple',
  },
  {
    id: 'kedarnath_dham',
    nameHi: 'केदारनाथ ज्योतिर्लिंग धाम',
    nameEn: 'Kedarnath Jyotirlinga Dham',
    locationHi: 'केदारनाथ, रुद्रप्रयाग, उत्तराखण्ड',
    locationEn: 'Kedarnath, Rudraprayag, Uttarakhand',
    stateHi: 'उत्तराखण्ड',
    stateEn: 'Uttarakhand',
    deityHi: 'भगवान शिव (केदारनाथ / सदाशिव)',
    deityEn: 'Lord Shiva (Kedarnath / Sadashiva)',
    image: imagePath.kedarnathJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'chota_chardham', 'major'],
    isJyotirlinga: true,
    isChotaCharDham: true,
    order: 9,
    significanceHi:
      'हिमालय की गोद में 3,583 मीटर की ऊंचाई पर स्थित सर्वोच्च ज्योतिर्लिंग एवं छोटा चार धाम का प्रमुख अंग। महाभारत युद्ध के बाद पांडवों को गोत्र-हत्या दोष से मुक्त करने हेतु भगवान शिव ने यहाँ बैल रूप में दर्शन दिए थे।',
    significanceEn:
      'Situated in the Garhwal Himalayas at 3,583m, Kedarnath is one of the highest Jyotirlingas and part of Chota Char Dham. Shiva manifested as a celestial bull leaving His hump to absolve the Pandavas.',
    timingHi:
      'प्रातः 05:00 से दोपहर 01:30, सायं 05:00 से रात्रि 09:00 (अक्षय तृतीया से भाईदूज / ग्रीष्मकालीन)',
    timingEn:
      '05:00 AM – 01:30 PM, 05:00 PM – 09:00 PM (Seasonal / May to Nov)',
    descriptionHi:
      'मंदाकिनी नदी के उद्गम के समीप स्थित केदारनाथ धाम पंच केदार व छोटा चार धाम का मुख्य अंग है। निकटवर्ती दर्शनीय स्थलों में क्षेत्ररक्षक भैरवनाथ मंदिर, वासुकी ताल (हिमानी झील), गांधी सरोवर (चोराबाड़ी ताल) एवं शंकराचार्य समाधि शामिल हैं।',
    descriptionEn:
      'Encircled by snow-clad Himalayan peaks near the Mandakini river. Part of both Panch Kedar and Chota Char Dham. Nearby attractions include Bhairavnath Temple, Vasuki Tal glacial lake, Gandhi Sarovar (Chorabari Tal), and Adi Shankaracharya Samadhi.',
    nearbyAttractionsHi:
      'भैरवनाथ मंदिर, वासुकी ताल, गांधी सरोवर (चोराबाड़ी ताल), शंकराचार्य समाधि, गौरीकुण्ड',
    nearbyAttractionsEn:
      'Bhairavnath Temple, Vasuki Tal, Gandhi Sarovar (Chorabari Tal), Shankaracharya Samadhi, Gaurikund',
  },
  {
    id: 'bhimashankar_jyotirlinga',
    nameHi: 'भीमाशंकर ज्योतिर्लिंग',
    nameEn: 'Bhimashankar Jyotirlinga',
    locationHi: 'खेड़ (पुणे के समीप), सह्याद्रि पर्वत, महाराष्ट्र',
    locationEn: 'Khed (near Pune), Sahyadri Hills, Maharashtra',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    deityHi: 'भगवान शिव (भीमाशंकर)',
    deityEn: 'Lord Shiva (Bhimashankar)',
    image: imagePath.bhimashankarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 10,
    significanceHi:
      'सह्याद्रि पर्वतमाला के सघन वनों में स्थित, जहाँ भगवान शिव ने कुंभकर्ण के पुत्र असुर भीम का संहार कर धर्म की रक्षा की थी। यहाँ से पवित्र भीमा (चंद्रभागा) नदी का उद्गम होता है।',
    significanceEn:
      'Set in dense Sahyadri forests, this Jyotirlinga marks the spot where Shiva vanquished the demon Bhima (son of Kumbhakarna) to protect sages. Origin point of the holy Bhima River.',
    timingHi: 'प्रातः 04:30 से दोपहर 03:00, सायं 04:00 से रात्रि 09:30',
    timingEn: '04:30 AM – 03:00 PM, 04:00 PM – 09:30 PM',
    descriptionHi:
      'नागर शैली की उत्कृष्ट वास्तुकला से सज्जित यह मंदिर भीमाशंकर वन्यजीव अभयारण्य (भारतीय विशाल गिलहरी / शेकरू का घर) के भीतर स्थित है। निकटवर्ती स्थलों में गुप्त भीमाशंकर (भीमा नदी उद्गम), हनुमान झील एवं नागफनी व्यू प्वाइंट शामिल हैं।',
    descriptionEn:
      'Built in Nagara architectural style within the lush Bhimashankar Wildlife Sanctuary (home to the Giant Flying Squirrel / Shekru). Nearby attractions include Gupt Bhimashankar, Hanuman Lake, and Nagphani Viewpoint.',
    nearbyAttractionsHi:
      'भीमाशंकर वन्यजीव अभयारण्य, गुप्त भीमाशंकर, हनुमान झील, नागफनी शिखर',
    nearbyAttractionsEn:
      'Bhimashankar Wildlife Sanctuary, Gupt Bhimashankar, Hanuman Lake, Nagphani Point',
  },
  {
    id: 'kashi_vishwanath_jyotirlinga',
    nameHi: 'काशी विश्वनाथ ज्योतिर्लिंग',
    nameEn: 'Kashi Vishwanath Jyotirlinga',
    locationHi: 'वाराणसी (काशी), उत्तर प्रदेश',
    locationEn: 'Varanasi (Kashi), Uttar Pradesh',
    stateHi: 'उत्तर प्रदेश',
    stateEn: 'Uttar Pradesh',
    deityHi: 'भगवान शिव (विश्वनाथ / विश्वेश्वर)',
    deityEn: 'Lord Shiva (Vishwa-nath / Lord of the Universe)',
    image: imagePath.kashiVishwanathJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 11,
    significanceHi:
      'विश्व की प्राचीनतम जीवित नगरी काशी में स्थित मोक्ष प्रदायक ज्योतिर्लिंग। मान्यता है कि काशी भगवान शिव के त्रिशूल पर टिकी है और यहाँ प्राण त्यागने वाले को साक्षात तारक मंत्र व मोक्ष प्राप्त होता है।',
    significanceEn:
      'The supreme abode of liberation in Varanasi, the world’s oldest living city. Legend holds that Kashi rests on Shiva’s trident and grants ultimate Moksha to all seekers.',
    timingHi: 'प्रातः 03:00 से रात्रि 11:00 (मंगला आरती: प्रातः 03:00 से 04:00)',
    timingEn: '03:00 AM – 11:00 PM (Mangla Aarti: 03:00 AM – 04:00 AM)',
    descriptionHi:
      'पवित्र गंगा नदी के तट पर स्थित नव-निर्मित भव्य काशी विश्वनाथ धाम कॉरिडोर सीधे गंगा घाटों से मंदिर को जोड़ता है। निकटवर्ती प्रमुख स्थलों में माँ अन्नपूर्णा मंदिर, दशाश्वमेध घाट (विश्वप्रसिद्ध सांध्य गंगा आरती), मणिकर्णिका घाट एवं काल भैरव मंदिर शामिल हैं।',
    descriptionEn:
      'Standing proudly along the sacred Ganges with the grand Kashi Vishwanath Corridor. Nearby attractions include Annapurna Temple, Dashashwamedh Ghat (famous Evening Ganga Aarti), Manikarnika Ghat, and Kal Bhairav Temple.',
    nearbyAttractionsHi:
      'दशाश्वमेध घाट (गंगा आरती), माँ अन्नपूर्णा मंदिर, काल भैरव मंदिर, मणिकर्णिका घाट, सारनाथ',
    nearbyAttractionsEn:
      'Dashashwamedh Ghat (Ganga Aarti), Annapurna Temple, Kal Bhairav Temple, Manikarnika Ghat, Sarnath',
  },
  {
    id: 'trimbakeshwar_jyotirlinga',
    nameHi: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
    nameEn: 'Trimbakeshwar Jyotirlinga',
    locationHi: 'त्र्यंबक, नासिक, महाराष्ट्र',
    locationEn: 'Trimbak, near Nashik, Maharashtra',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    deityHi: 'भगवान शिव (त्र्यंबकेश्वर - ब्रह्मा, विष्णु, महेश त्रिदेव स्वरूप)',
    deityEn: 'Lord Shiva (Trimbakeshwar - Trimurti Embodiment)',
    image: imagePath.trimbakeshwarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 12,
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में अद्वितीय ज्योतिर्लिंग, जहाँ लिंगम में त्रिदेव—ब्रह्मा, विष्णु और महेश के तीन मुख विद्यमान हैं। पितृदोष व कालसर्प दोष निवारण हेतु नारायण नागबलि पूजा का यह मुख्य केंद्र है।',
    significanceEn:
      'Distinct among all 12 Jyotirlingas as its lingam symbolizes the Trimurti — Brahma, Vishnu, and Mahesh. Highly revered for performing Narayan Nagbali rituals to alleviate ancestral doshas.',
    timingHi:
      'प्रातः 05:30 से रात्रि 09:00 (रुद्राभिषेक: प्रातः 05:30 से 09:00)',
    timingEn: '05:30 AM – 09:00 PM (Rudrabhishek: 05:30 AM – 09:00 AM)',
    descriptionHi:
      'ब्रह्मगिरि पर्वत की तलहटी में स्थित, जहाँ से दक्षिण गंगा गोदावरी नदी का उद्गम होता है। प्रमुख दर्शनीय स्थलों में ब्रह्मगिरि पर्वत, अंजनेरी पहाड़ी (श्री हनुमान जी की जन्मस्थली) एवं कुशावर्त कुण्ड शामिल हैं।',
    descriptionEn:
      'Located at the foothills of Brahmagiri mountain, the source of sacred river Godavari. Nearby attractions include Brahmagiri Hill trek, Anjaneri Hills (birthplace of Lord Hanuman), and Kushavarta Kund.',
    nearbyAttractionsHi:
      'ब्रह्मगिरि पर्वत, अंजनेरी हिल्स (हनुमान जन्मस्थली), कुशावर्त कुण्ड, गोदावरी उद्गम स्थल',
    nearbyAttractionsEn:
      'Brahmagiri Hills, Anjaneri Hills (Birthplace of Hanuman), Kushavarta Kund, Godavari River Source',
  },
  {
    id: 'vaidyanath_jyotirlinga',
    nameHi: 'वैद्यनाथ ज्योतिर्लिंग (बाबा धाम)',
    nameEn: 'Vaidyanath Jyotirlinga (Baba Baidyanath)',
    locationHi: 'देवघर, संथाल परगना, झारखण्ड',
    locationEn: 'Deoghar, Santhal Parganas, Jharkhand',
    stateHi: 'झारखण्ड',
    stateEn: 'Jharkhand',
    deityHi: 'भगवान शिव (वैद्यनाथ / कामेश्वर महादेव)',
    deityEn: 'Lord Shiva (Vaidyanath / Kamna Lingam)',
    image: imagePath.vaidyanathJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'shaktipeeth', 'major'],
    isJyotirlinga: true,
    isShaktipeeth: true,
    order: 13,
    significanceHi:
      'भगवान शिव को "परम वैद्य" (आरोग्य प्रदाता) के रूप में पूजा जाता है। रावण ने अपनी तपस्या में दस शीश काटकर अर्पित किए थे, जिसके पश्चात शिवजी ने वैद्य बनकर उसके शीश पुनः जोड़े और यहाँ कामना लिंग स्थापित किया।',
    significanceEn:
      'Celebrated as the "Divine Physician" who heals all physical and spiritual ailments. Demon king Ravana offered his ten heads in penance; pleased Shiva healed him and consecrated this Kamna Lingam.',
    timingHi:
      'प्रातः 04:00 से दोपहर 03:30, सायं 06:00 से रात्रि 09:00 (श्रावण मास में विशेष निरंतर दर्शन)',
    timingEn:
      '04:00 AM – 03:30 PM, 06:00 PM – 09:00 PM (Continuous Darshan during Shravan)',
    descriptionHi:
      'वार्षिक विश्वप्रसिद्ध श्रावणी मेले का केंद्र जहाँ लाखों कांवड़िए सुल्तानगंज से 108 किमी गंगाजल लाकर जलाभिषेक करते हैं। निकटवर्ती प्रमुख स्थलों में बासुकीनाथ मंदिर, त्रिकूट पर्वत (रोपवे व तपस्या गुफाएं) एवं नवलखा मंदिर दर्शनीय हैं।',
    descriptionEn:
      'Center of the world-famous month-long Shravani Mela where millions of Kanwariyas offer holy Ganga water. Nearby attractions include Basukinath Temple, Trikuta Hills (caves and ropeway), and Naulakha Mandir.',
    nearbyAttractionsHi:
      'बासुकीनाथ मंदिर, त्रिकूट पर्वत, नवलखा मंदिर, तपोवन, नंदन पहाड़',
    nearbyAttractionsEn:
      'Basukinath Temple, Trikuta Hills, Naulakha Mandir, Tapovan, Nandan Pahar',
  },
  {
    id: 'nageshwar_jyotirlinga',
    nameHi: 'नागेश्वर ज्योतिर्लिंग',
    nameEn: 'Nageshwar Jyotirlinga',
    locationHi: 'द्वारका के समीप, दारुकावन, गुजरात',
    locationEn: 'Near Dwarka, Saurashtra, Gujarat',
    stateHi: 'गुजरात',
    stateEn: 'Gujarat',
    deityHi: 'भगवान शिव (नागेश्वर)',
    deityEn: 'Lord Shiva (Nageshwar)',
    image: imagePath.nageshwarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 14,
    significanceHi:
      'समस्त विष, भय, पाप और नकारात्मक शक्तियों से सुरक्षा प्रदान करने वाले प्रथम नागेश्वर ज्योतिर्लिंग। भगवान शिव ने अपने अनन्य भक्त सुप्रिय की रक्षा हेतु दारुका नामक असुर का संहार किया था।',
    significanceEn:
      'Represents divine protection from all evils and poisons. Legend says the Lord appeared and vanquished demon Daaruka to protect His devotee Supriya.',
    timingHi: 'प्रातः 06:00 से दोपहर 12:30, सायं 05:00 से रात्रि 09:30',
    timingEn: '06:00 AM – 12:30 PM, 05:00 PM – 09:30 PM',
    descriptionHi:
      'प्राचीन दारुकावन क्षेत्र में द्वारका व बेट द्वारका के मध्य अरब सागर के समीप स्थित। मंदिर परिसर में भगवान शिव की विशालकाय ८० फीट ऊंची पद्मासन प्रतिमा अत्यंत भव्य है। निकटवर्ती स्थलों में द्वारकाधीश मंदिर, रुक्मिणी देवी मंदिर व गोमती घाट शामिल हैं।',
    descriptionEn:
      'Located in ancient Darukavana forest near Dwarka by the Arabian Sea, featuring a magnificent 80-foot giant seated statue of Lord Shiva. Nearby attractions include Dwarkadhish Temple, Rukmini Devi Temple, and Gomti Ghat.',
    nearbyAttractionsHi:
      'द्वारकाधीश मंदिर, रुक्मिणी देवी मंदिर, गोमती घाट, बेट द्वारका',
    nearbyAttractionsEn:
      'Dwarkadhish Temple, Rukmini Devi Temple, Gomti Ghat, Beyt Dwarka',
  },
  {
    id: 'grishneshwar_jyotirlinga',
    nameHi: 'घृष्णेश्वर ज्योतिर्लिंग',
    nameEn: 'Grishneshwar Jyotirlinga',
    locationHi: 'वेरुल / एलोरा, छत्रपति संभाजीनगर, महाराष्ट्र',
    locationEn: 'Ellora, near Aurangabad, Maharashtra',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    deityHi: 'भगवान शिव (घृष्णेश्वर / घुश्मेश्वर)',
    deityEn: 'Lord Shiva (Grishneshwar / Ghushmeshwar)',
    image: imagePath.grishneshwarJyotirlinga,
    category: 'jyotirlinga',
    categories: ['jyotirlinga', 'major'],
    isJyotirlinga: true,
    order: 15,
    significanceHi:
      'द्वादश ज्योतिर्लिंगों में बारहवाँ व अंतिम ज्योतिर्लिंग, जिसे "परम करुणा के स्वामी" कहा जाता है। अनन्य शिवभक्त घुश्मा (कुसुमा) की भक्ति से प्रसन्न होकर भगवान शिव ने उनके मृत पुत्र को पुनर्जीवित किया था।',
    significanceEn:
      'The 12th and concluding Jyotirlinga, known as the "Lord of Compassion". Pious devotee Kusuma’s (Ghushma) unwavering devotion brought her murdered son back to life by Shiva’s grace.',
    timingHi:
      'प्रातः 05:30 से रात्रि 09:30 (श्रावण मास में प्रातः 03:00 से रात्रि 11:00)',
    timingEn: '05:30 AM – 09:30 PM (Shravan month: 03:00 AM – 11:00 PM)',
    descriptionHi:
      'रानी अहिल्याबाई होल्कर द्वारा लाल बलुआ पत्थर से पुनर्निर्मित भव्य मंदिर। यह यूनेस्को विश्व धरोहर एलोरा गुफाओं (कैलाश मंदिर) के ठीक समीप स्थित है। निकटवर्ती स्थलों में एलोरा गुफाएं, देवगिरि / दौलताबाद किला एवं बीबी का मक़बरा प्रमुख हैं।',
    descriptionEn:
      'Constructed with red sandstone in South Indian style by Ahilyabai Holkar. Located right near the iconic UNESCO World Heritage Ellora Caves (Kailasa Temple). Nearby attractions include Ellora Caves, Daulatabad Fort, and Bibi Ka Maqbara.',
    nearbyAttractionsHi:
      'एलोरा गुफाएं (कैलाश मंदिर), दौलताबाद किला, बीबी का मक़बरा, घृष्णेश्वर कुण्ड',
    nearbyAttractionsEn:
      'Ellora Caves (Kailash Temple), Daulatabad Fort, Bibi Ka Maqbara, Grishneshwar Kund',
  },

  // =========================================================================
  // 3. OTHER ICONIC PILGRIMAGE TEMPLES & SHAKTIPEETHS OF INDIA
  // =========================================================================
  {
    id: 'ram_mandir_ayodhya',
    nameHi: 'श्री राम जन्मभूमि मंदिर',
    nameEn: 'Shri Ram Janmabhoomi Mandir',
    locationHi: 'अयोध्या, उत्तर प्रदेश',
    locationEn: 'Ayodhya, Uttar Pradesh',
    stateHi: 'उत्तर प्रदेश',
    stateEn: 'Uttar Pradesh',
    deityHi: 'भगवान श्री राम (राम लला)',
    deityEn: 'Lord Rama (Ram Lalla)',
    image: imagePath.Rama,
    category: 'major',
    categories: ['major'],
    order: 16,
    significanceHi:
      'भगवान श्री राम की पावन जन्मस्थली एवं विश्वभर के सनातनियों का परम आस्था केंद्र।',
    significanceEn:
      'The sacred birthplace of Lord Shri Rama and a premier global spiritual pilgrimage.',
    timingHi: 'प्रातः 06:30 से दोपहर 12:00, सायं 02:00 से रात्रि 10:00',
    timingEn: '06:30 AM – 12:00 PM, 02:00 PM – 10:00 PM',
    descriptionHi:
      'अयोध्या में सरयू नदी के तट पर स्थित भव्य श्री राम जन्मभूमि मंदिर भारतीय संस्कृति और आस्था का अनुपम प्रतीक है।',
    descriptionEn:
      'Located on the banks of the sacred Saryu river in Ayodhya, this grand temple stands as an epitome of devotion and heritage.',
    nearbyAttractionsHi: 'हनुमान गढ़ी, कनक भवन, सरयू घाट, गुप्तार घाट',
    nearbyAttractionsEn: 'Hanuman Garhi, Kanak Bhawan, Saryu Ghat, Guptar Ghat',
  },
  {
    id: 'tirupati_balaji',
    nameHi: 'तिरुपति बालाजी (वेंकटेश्वर मंदिर)',
    nameEn: 'Tirupati Balaji (Venkateswara Temple)',
    locationHi: 'तिरुमाला, आन्ध्र प्रदेश',
    locationEn: 'Tirumala, Andhra Pradesh',
    stateHi: 'आन्ध्र प्रदेश',
    stateEn: 'Andhra Pradesh',
    deityHi: 'भगवान वेंकटेश्वर (बालाजी/श्रीनिवास)',
    deityEn: 'Lord Venkateswara (Balaji/Srinivasa)',
    image: imagePath.Vishnu,
    category: 'major',
    categories: ['major'],
    order: 17,
    significanceHi:
      'कलियुग में प्रत्यक्ष फल देने वाले भगवान वेंकटेश्वर का विश्व प्रसिद्ध पावन तीर्थ।',
    significanceEn:
      'One of the most visited and revered Vaishnavite shrines globally, known as the abode of Kaliyuga Varada.',
    timingHi: 'प्रातः 03:00 से रात्रि 01:30 (सार्वजनिक दर्शन समय अनुसार)',
    timingEn: '03:00 AM – 01:30 AM (Subject to darshan slots)',
    descriptionHi:
      'सप्तगिरि (सात पहाड़ियों) पर स्थित यह भव्य मंदिर अद्वितीय वास्तुकला और असीम भक्ति का केंद्र है।',
    descriptionEn:
      'Perched on the Seshachalam hills in Tirumala, this temple represents profound bhakti and heritage.',
    nearbyAttractionsHi:
      'पद्मावती अम्मावरि मंदिर, कपिला तीर्थम, श्री कालहस्ती मंदिर',
    nearbyAttractionsEn:
      'Padmavathi Ammavari Temple, Kapila Theertham, Sri Kalahasti Temple',
  },
  {
    id: 'meenakshi_amman',
    nameHi: 'मीनाक्षी अम्मन मंदिर',
    nameEn: 'Meenakshi Amman Temple',
    locationHi: 'मदुरै, तमिलनाडु',
    locationEn: 'Madurai, Tamil Nadu',
    stateHi: 'तमिलनाडु',
    stateEn: 'Tamil Nadu',
    deityHi: 'देवी मीनाक्षी (पार्वती) व सुंदरेश्वर (शिव)',
    deityEn: 'Goddess Meenakshi & Sundareswarar',
    image: imagePath.Durga,
    category: 'shaktipeeth',
    categories: ['shaktipeeth', 'major'],
    isShaktipeeth: true,
    order: 18,
    significanceHi:
      'द्रविड़ वास्तुकला का अनुपम चमत्कार, भव्य गोपुरम और 1000 स्तंभों का अलौकिक मंडप।',
    significanceEn:
      'A masterpiece of Dravidian architecture with towering sculptured gopurams and the famous Hall of 1000 Pillars.',
    timingHi: 'प्रातः 05:00 से दोपहर 12:30, सायं 04:00 से रात्रि 10:00',
    timingEn: '05:00 AM – 12:30 PM, 04:00 PM – 10:00 PM',
    descriptionHi:
      'वैगई नदी के तट पर स्थित मदुरै का यह ऐतिहासिक मंदिर देवी शक्ति और भगवान शिव के पावन विवाह का साक्षी है।',
    descriptionEn:
      'A historic temple on the banks of Vaigai river celebrating the divine union of Goddess Meenakshi and Lord Shiva.',
    nearbyAttractionsHi:
      'तिरुमलाई नायक पैलेस, गांधी मेमोरियल म्यूजियम, अलागर कोविल',
    nearbyAttractionsEn:
      'Thirumalai Nayakkar Palace, Gandhi Memorial Museum, Alagar Kovil',
  },
  {
    id: 'vaishno_devi',
    nameHi: 'माँ वैष्णो देवी धाम',
    nameEn: 'Maa Vaishno Devi Dham',
    locationHi: 'कटरा, जम्मू और कश्मीर',
    locationEn: 'Katra, Jammu & Kashmir',
    stateHi: 'जम्मू और कश्मीर',
    stateEn: 'Jammu & Kashmir',
    deityHi: 'माँ वैष्णो देवी (महाकाली, महालक्ष्मी, महासरस्वती)',
    deityEn: 'Maa Vaishno Devi (Mahakali, Mahalakshmi, Mahasaraswati)',
    image: imagePath.Durga,
    category: 'shaktipeeth',
    categories: ['shaktipeeth', 'major'],
    isShaktipeeth: true,
    order: 19,
    significanceHi:
      'त्रिकूटा पर्वत की पवित्र गुफा में तीन प्राकृतिक पिंडी स्वरूपों का पावन संगम।',
    significanceEn:
      'The revered mountain cave shrine on Trikuta hills enshrining the three holy natural Pindis.',
    timingHi: '24 घंटे खुला रहता है (दैनिक आरती समय: प्रातः 06:00, सायं 07:00)',
    timingEn: 'Open 24 Hours (Daily Aarti: 06:00 AM & 07:00 PM)',
    descriptionHi:
      'भक्तों की मनोकामना पूर्ण करने वाली माँ वैष्णो देवी का त्रिकूट पर्वत पर स्थित पावन धाम।',
    descriptionEn:
      'Millions of pilgrims trek each year to seek the divine blessings of Mother Vaishno Devi.',
    nearbyAttractionsHi: 'भैरवनाथ मंदिर, बाणगंगा, अर्धकुंवारी गुफा, चरण पादुका',
    nearbyAttractionsEn:
      'Bhairavnath Temple, Ban Ganga, Ardhkuwari Cave, Charan Paduka',
  },
  {
    id: 'siddhivinayak_mumbai',
    nameHi: 'श्री सिद्धिविनायक मंदिर',
    nameEn: 'Shri Siddhivinayak Temple',
    locationHi: 'प्रभादेवी, मुंबई, महाराष्ट्र',
    locationEn: 'Prabhadevi, Mumbai, Maharashtra',
    stateHi: 'महाराष्ट्र',
    stateEn: 'Maharashtra',
    deityHi: 'भगवान श्री गणेश (सिद्धिविनायक)',
    deityEn: 'Lord Ganesha (Siddhivinayak)',
    image: imagePath.Ganesha,
    category: 'major',
    categories: ['major'],
    order: 20,
    significanceHi:
      'मनोकामना पूर्ण करने वाले सिद्धिविनायक गणपति, जिनकी सूंड दाहिनी ओर मुड़ी है।',
    significanceEn:
      'A globally renowned Ganesha temple with right-turned trunk (Siddhi Vinayaka), fulfilling desires of all seekers.',
    timingHi: 'प्रातः 05:30 से रात्रि 10:00 (मंगलवार विशेष दर्शन)',
    timingEn: '05:30 AM – 10:00 PM (Special Tuesday Darshan)',
    descriptionHi:
      'मुंबई के केंद्र में स्थित यह मंदिर सभी शुभ कार्यों में विघ्नहर्ता गणेश जी की कृपा प्राप्ति का पावन स्थल है।',
    descriptionEn:
      'Located in Mumbai, devotees throng here to seek obstacles-free success and blessings from Lord Ganesha.',
    nearbyAttractionsHi: 'महालक्ष्मी मंदिर, हाजी अली दरगाह, शिवाजी पार्क',
    nearbyAttractionsEn: 'Mahalaxmi Temple, Haji Ali Dargah, Shivaji Park',
  },
  {
    id: 'kamakhya_temple',
    nameHi: 'कामाख्या देवी मंदिर',
    nameEn: 'Kamakhya Temple',
    locationHi: 'गुवाहाटी, असम',
    locationEn: 'Guwahati, Assam',
    stateHi: 'असम',
    stateEn: 'Assam',
    deityHi: 'माँ कामाख्या (शक्तिपीठ)',
    deityEn: 'Maa Kamakhya (Shakti Peeth)',
    image: imagePath.Durga,
    category: 'shaktipeeth',
    categories: ['shaktipeeth'],
    isShaktipeeth: true,
    order: 21,
    significanceHi:
      '51 शक्तिपीठों में सर्वोच्च तांत्रिक शक्तिपीठ, अम्बुबाची मेले के लिए प्रसिद्ध।',
    significanceEn:
      'The supreme center of Tantric Shaktism among the 51 Shakti Peethas, famous for the Ambubachi Mela.',
    timingHi: 'प्रातः 05:30 से दोपहर 01:00, सायं 02:30 से सायं 05:30',
    timingEn: '05:30 AM – 01:00 PM, 02:30 PM – 05:30 PM',
    descriptionHi:
      'नीलांचल पर्वत पर स्थित यह रहस्यमयी और जागृत शक्तिपीठ संपूर्ण सृष्टि की जननी देवी कामाख्या को समर्पित है।',
    descriptionEn:
      'Situated on the Nilachal hill in Guwahati, revered as the ultimate source of cosmic creation and divine Shakti.',
    nearbyAttractionsHi: 'उमानंद मंदिर, ब्रह्मपुत्र नदी क्रूज, नवग्रह मंदिर',
    nearbyAttractionsEn:
      'Umananda Temple, Brahmaputra River Cruise, Navagraha Temple',
  },
];
