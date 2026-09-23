import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { Storage } from '@services/storageService';
import imagePath from '@assets/index';

export interface ShlokaVerse {
  id: string;
  title: string;
  titleHi?: string;
  sanskrit: string;
  transliteration?: string;
  translationEn: string;
  translationHi?: string;
  meaningEn?: string;
  meaningHi?: string;
  deity?: string;
  image?: any;
  link?: string;
}

export interface ShlokaSubItem {
  id: string;
  nameEn: string;
  nameHi: string;
  headerTitleEn: string;
  headerTitleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  sanskrit?: string;
  transliteration?: string;
  meaningHi?: string;
  meaningEn?: string;
  image?: any;
  imageUrl?: string;
  deity?: string;
  path?: string;
  verses?: ShlokaVerse[];
}

export interface ShlokaCategoryDetail {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl?: string;
  path: string;
  items: ShlokaSubItem[];
}

/**
 * Complete default data for all 8 shloka occasion categories.
 * This also serves as the Firebase Firestore JSON structure.
 */
export const STATIC_SHLOKA_CATEGORIES_DATA: Record<
  string,
  ShlokaCategoryDetail
> = {
  'through-the-day': {
    id: 'occasion-through-the-day',
    slug: 'through-the-day',
    titleEn: 'Through the Day',
    titleHi: 'दिनचर्या',
    descriptionEn:
      'The daily rhythm of devotion, from waking to sleep — rising, bathing, eating, lighting the evening lamp, and rest.',
    descriptionHi:
      'दैनिक जीवन की प्रार्थनाएं — प्रातः जागरण, स्नान, भोजन, दीप प्रज्वलन एवं शयन तक।',
    imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
    path: '/shloka/prayers/through-the-day.htm',
    items: [
      {
        id: 'on-waking',
        nameEn: 'On Waking Up',
        nameHi: 'प्रातः कर-दर्शन (हस्त दर्शन)',
        headerTitleEn: 'Shlokas for Waking Up',
        headerTitleHi: 'प्रातः जागरण श्लोक',
        subtitleEn:
          'Greeting the morning — gazing at the palms, waking the Lord, remembering Ganesha and the gods',
        subtitleHi: 'प्रातः काल कर-दर्शन, प्रभु जागरण एवं नवप्रभात प्रार्थना',
        descriptionEn:
          'The very first moment of waking is a chance to begin the day with God rather than with our worries. These verses greet the morning — gazing at the palms of the hands, waking the Lord, remembering Ganesha and the gods. Chant these prayers quietly before you rise, so the day starts in gratitude.',
        descriptionHi:
          'प्रातः जागरण का प्रथम क्षण चिंताओं के स्थान पर प्रभु स्मरण से दिन की शुरुआत करने का पावन अवसर है। शय्या त्यागने से पूर्व हथेलियों के दर्शन, प्रभु जागरण व नवप्रभात के इन श्लोकों का स्मरण कर दिन का शुभारंभ कृतज्ञता से करें।',
        deity: 'Laxmi',
        image: imagePath.Laxmi,
        path: '/shloka/prayers/on-waking.htm',
        sanskrit:
          'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
        meaningHi:
          'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य भाग में माँ सरस्वती और मूल भाग (कलाई के निकट) में भगवान श्री गोविन्द (विष्णु) का वास है। अतः प्रातःकाल उठते ही अपनी हथेलियों का दर्शन करना चाहिए।',
        meaningEn:
          'At the tip of the fingers resides Goddess Lakshmi; in the middle resides Goddess Saraswati; and at the base of the palm resides Lord Govinda. Therefore, one should behold one’s palms upon waking in the morning.',
        verses: [
          {
            id: 'karaagre-vasathe',
            title: 'Karaagre Vasathe',
            titleHi: 'कराग्रे वसते लक्ष्मीः (करदर्शनम्)',
            sanskrit:
              'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वति ।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम् ॥',
            transliteration:
              'karāgre vasate lakṣmiḥ karamadhye sarasvati\nkaramūle tu govindaḥ prabhāte karadarśanam',
            translationEn:
              "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            translationHi:
              'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य भाग में माँ सरस्वती और मूल भाग में भगवान श्री गोविन्द का वास है। अतः प्रातःकाल उठते ही दोनों हथेलियों का दर्शन करना चाहिए।',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/karaagre-vasathe.htm',
          },
          {
            id: 'gajananam-bhuthaganadhi',
            title: 'Gajananam Bhuthaganadhi',
            titleHi: 'गजाननं भूतगणादि सेवितम् (गणेश वंदना)',
            sanskrit:
              'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
            transliteration:
              'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam',
            translationEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            translationHi:
              'जो भूतगणों द्वारा पूजित हैं, कैथ और जामुन के फलों का रसपान करने वाले हैं, माता उमा (पार्वती) के पुत्र हैं तथा समस्त शोकों का नाश करने वाले हैं, उन विघ्नहर्ता भगवान गणेश के चरण कमलों में मैं प्रणाम करता हूँ।',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gajananam-bhuthaganadhi.htm',
          },
          {
            id: 'utthishto-utthishta-govinda',
            title: 'Utthishto Utthishta Govinda',
            titleHi: 'उत्तिष्ठोत्तिष्ठ गोविन्द (प्रभु जागरण)',
            sanskrit:
              'उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज ।\nउत्तिष्ठ कमलाकान्त त्रैलोक्यं मङ्गलं कुरु ॥',
            transliteration:
              'uttiṣṭhottiṣṭha govinda uttiṣṭha garuḍadhvaja\nuttiṣṭha kamalākānta trailokyaṃ maṅgalaṃ kuru',
            translationEn:
              'Arise, arise, O Govinda! Arise, O one who bears the Garuda emblem! Arise, O beloved of Lakshmi! Bring auspiciousness to the three worlds.',
            translationHi:
              'हे गोविन्द! उठिए, जागिए। हे गरुड़ध्वज! उठिए। हे कमलाकांत (माँ लक्ष्मी के प्रियतम)! उठिए और तीनों लोकों का मंगल व कल्याण कीजिए।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/utthishto-utthishta-govinda.htm',
          },
          {
            id: 'brahma-murari-tripuranatakari',
            title: 'Brahma Murari Tripuranatakari',
            titleHi: 'ब्रह्मा मुरारिः त्रिपुरांतकारी (नवग्रह सुप्रभातम्)',
            sanskrit:
              'ब्रह्मा मुरारिः त्रिपुरांतकारी\nभानुः शशी भूमिसुतो बुधश्च ।\nगुरुश्च शुक्रः शनि राहु केतवः\nकुर्वतु सर्वे मम सुप्रभातम् ॥',
            transliteration:
              'brahmā murāriḥ tripurāṃtakārī\nbhānuḥ śaśī bhūmisuto budhaśca .\nguruśca śukraḥ śani rāhu ketavaḥ\nkurvatu sarve mama suprabhātam ..',
            translationEn:
              'Brahma, Murari (Vishnu), Shiva (the destroyer of Tripura), Sun, Moon, Mars (Bhumisuta), Mercury (Budha), Jupiter (Guru), Venus (Shukra), Saturn (Shani), Rahu, and Ketu — may all of them make this a blessed and auspicious morning.',
            translationHi:
              'ब्रह्मा, मुरारि (विष्णु), त्रिपुरारि (शिव), सूर्य, चंद्रमा, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु—ये सभी देव और नवग्रह मिलकर मेरे प्रातःकाल को मंगलमय व शुभ बनाएं।',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/brahma-murari-tripuranatakari.htm',
          },
          {
            id: 'harim-haram-harishchandram',
            title: 'Harim Haram Harishchandram',
            titleHi: 'हरिं हरं हरिश्चन्द्रं (पंचहकार स्मरण)',
            sanskrit:
              'हरिं हरं हरिश्चन्द्रं हनुमन्तं हलायुधम् ।\nएतान् संस्मरतः प्रातः हानिः स्पर्शनविद्यते ॥',
            transliteration:
              'hariṃ haraṃ hariścandraṃ hanumantaṃ halāyudham .\netān saṃsmarataḥ prātaḥ hāniḥ sparśanavidyate .',
            translationEn:
              "Hari, Hara, Harischandra, Hanuman, and Halayudha (Balarama) — if these five 'Ha's are meditated upon when getting up from bed in the morning, not even a touch of harm shall come near.",
            translationHi:
              'श्री हरि (विष्णु), हर (शिव), सत्यवादी राजा हरिश्चंद्र, पवनपुत्र हनुमान और हलायुध (बलराम)—प्रातःकाल इन पाँचों का स्मरण करने से व्यक्ति को किसी भी प्रकार की हानि या अनिष्ट का स्पर्श तक नहीं होता।',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/harim-haram-harishchandram.htm',
          },
          {
            id: 'venkatesa-suprabhatam',
            title: 'Venkatesa Suprabhatam',
            titleHi: 'कौसल्या सुप्रजा राम (वेंकटेश सुप्रभातम्)',
            sanskrit:
              'कौसल्या सुप्रजा राम पूर्वासन्ध्या प्रवर्तते ।\nउत्तिष्ठ नरशार्दूल कर्त्तव्यं दैवमाह्निकम् ॥१॥',
            transliteration:
              'kausalyā suprajā rāma pūrvāsandhyā pravartate .\nuttiṣṭha naraśārdūla karttavyaṃ daivamāhnikam ..1..',
            translationEn:
              'O Rama, noble son of Kausalya! The dawn is breaking in the eastern sky; arise, O tiger among men, the sacred daily morning worship is to be performed.',
            translationHi:
              'हे माता कौसल्या के सुपुत्र श्री राम! पूर्व दिशा में प्रातः संध्या (उषाकाल) हो चुकी है। हे पुरुषश्रेष्ठ! अब जागिए, नित्य देव-पूजन एवं प्रातःकर्म संपन्न करने का समय आ गया है।',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/venkatesa-suprabhatam.htm',
          },
        ],
      },
      {
        id: 'before-stepping-on-ground',
        nameEn: 'Before Stepping on the Ground',
        nameHi: 'भूमि स्पर्श एवं पृथ्वी क्षमा याचना',
        headerTitleEn: 'Shloka Before Stepping on the Ground',
        headerTitleHi: 'भूमि स्पर्श श्लोक (पृथ्वी क्षमा याचना)',
        subtitleEn:
          'Apology to Bhumi Devi before taking your first step of the day',
        subtitleHi: 'शय्या त्यागने के बाद पृथ्वी पर प्रथम चरण रखने से पूर्व',
        descriptionEn:
          'Each day, before our feet touch the floor, we set them upon the Earth herself. This short prayer offers a small apology to Bhumi Devi, who patiently bears us. Say it as you rise from bed, before your first step of the day.',
        descriptionHi:
          'प्रत्येक दिन जब हमारे चरण भूमि पर पड़ते हैं, हम साक्षात पृथ्वी माता पर पग धरते हैं। यह पावन प्रार्थना धैर्यमयी भूदेवी से क्षमायाचना है। शय्या से उठते समय दिन का पहला कदम रखने से पूर्व इसका जाप करें।',
        deity: 'Durga',
        image: imagePath.Durga,
        path: '/shloka/prayers/before-stepping-on-the-ground.htm',
        sanskrit:
          'समुद्रवसने देवि पर्वतस्तनमण्डले ।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्वमे ॥',
        meaningHi:
          'हे समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी स्तनों (वक्षस्थल) से सुशोभित, भगवान विष्णु की अर्धांगिनी माता पृथ्वी! आपको मेरा नमस्कार है। मेरे पैरों के स्पर्श के लिए मुझे क्षमा करें।',
        meaningEn:
          'O Goddess who is clothed with the ocean and whose bosom is adorned by the mountains, wife of Lord Vishnu, I bow to you. Please forgive me for touching you with my feet.',
        verses: [
          {
            id: 'samudravasane-devi',
            title: 'Samudravasane Devi',
            titleHi: 'समुद्रवसने देवि पर्वतस्तनमण्डले',
            sanskrit:
              'समुद्रवसने देवि पर्वतस्तनमण्डले ।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्वमे ॥',
            transliteration:
              'samudravasane devi parvatastanamaṇḍale\nviṣṇupatni namastubhyaṃ pādasparśaṃ kṣamasvame',
            translationEn:
              'O Goddess who is clothed with the ocean and whose bosom is adorned by the mountains, wife of Lord Vishnu, I bow to you. Please forgive me for touching you with my feet.',
            translationHi:
              'हे समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी स्तनों (वक्षस्थल) से सुशोभित, भगवान विष्णु की अर्धांगिनी माता पृथ्वी! आपको मेरा नमस्कार है। मेरे पैरों के स्पर्श के लिए मुझे क्षमा करें।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/samudravasane-devi.htm',
          },
        ],
      },
      {
        id: 'while-bathing',
        nameEn: 'While Bathing',
        nameHi: 'पवित्र स्नान श्लोक',
        headerTitleEn: 'Shlokas for Bathing',
        headerTitleHi: 'पवित्र स्नान श्लोक',
        subtitleEn:
          'Inviting sacred rivers and remembering Govinda during bath',
        subtitleHi: 'स्नान करते समय पवित्र नदियों का आवाहन एवं प्रभु स्मरण',
        descriptionEn:
          'In our tradition a bath is not only for the body but for the mind as well. These verses invite the sacred rivers — Ganga, Yamuna and the rest — into the water, turning an everyday wash into a holy dip. Chant these prayers as you bathe, remembering the Lord with each pour of water.',
        descriptionHi:
          'सनातन परंपरा में स्नान केवल शरीर शुद्धि नहीं अपितु मन की शुद्धि भी है। ये पावन श्लोक गंगा, यमुना आदि पवित्र नदियों का जल में आवाहन कर साधारण स्नान को पावन तीर्थ स्नान बना देते हैं। प्रत्येक जलधारा के साथ प्रभु स्मरण करें।',
        deity: 'Ganga',
        image: imagePath.Ganga,
        path: '/shloka/prayers/while-bathing.htm',
        sanskrit:
          'गङ्गे च यमुने चैव गोदावरि सरस्वति ।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥',
        meaningHi:
          'हे गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु और कावेरी पवित्र नदियों! आप सभी कृपा करके इस जल में उपस्थित होकर इसे तीर्थ के समान पावन बना दें।',
        meaningEn:
          'O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri, may your sacred presence be present in this water.',
        verses: [
          {
            id: 'gange-cha-yamune',
            title: 'Gange Cha Yamune',
            titleHi: 'गङ्गे च यमुने चैव (सप्तनदी स्मरण)',
            sanskrit:
              'गङ्गे च यमुने चैव गोदावरि सरस्वति ।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥',
            transliteration:
              "gaṅge ca yamune caiva godāvari sarasvati\nnarmade sindhu kāveri jale'smin saṃnidhiṃ kuru",
            translationEn:
              'O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri, may your sacred presence be present in this water.',
            translationHi:
              'हे गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु और कावेरी! आप सभी पवित्र नदियाँ कृपा करके इस जल में उपस्थित हों और इसे तीर्थ तुल्य पावन करें।',
            deity: 'Ganga',
            image: imagePath.Ganga,
            link: 'https://shlokam.org/shloka/gange-cha-yamune.htm',
          },
          {
            id: 'govindeti-sada-snanam',
            title: 'Govindeti Sada Snanam',
            titleHi: 'गोविन्देति सदा स्नानम् (गोविन्द स्मरण)',
            sanskrit:
              'गोविन्देति सदा स्नानं गोविन्देति सदाजपं ।\nगोविन्देति सदा ध्यानं सदा गोविन्द कीर्तनम् ॥',
            transliteration:
              'govindeti sadā snānaṃ govindeti sadājapaṃ\ngovindeti sadā dhyānaṃ sadā govinda kīrtanam',
            translationEn:
              'Always remember Govinda while bathing, always chant Govinda’s name, always meditate on Govinda, and always sing praises of Govinda.',
            translationHi:
              'स्नान करते समय सदैव गोविन्द का स्मरण करें, सदैव गोविन्द नाम का जप करें, सदैव गोविन्द का ध्यान करें और निरंतर श्री गोविन्द का गुणगान व कीर्तन करें।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/govindeti-sada-snanam.htm',
          },
          {
            id: 'apavitra-pavitro',
            title: 'Apavitra Pavitro',
            titleHi: 'अपवित्रः पवित्रो वा (शुद्धि मंत्र)',
            sanskrit:
              'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा ।\nयः स्मरेत्पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः ॥',
            transliteration:
              "oṃ apavitraḥ pavitro vā sarvāvasthāṃ gato'pi vā .\nyaḥ smaretpuṇḍarīkākṣaṃ sa bāhyābhyantaraḥ śuciḥ ..",
            translationEn:
              'Om, if one is Apavitra (Impure) or Pavitra (Pure), or even in all other conditions, he who remembers Pundarikaksha (Sri Vishnu with lotus-like eyes), he becomes pure outwardly as well as inwardly.',
            translationHi:
              'मनुष्य चाहे अपवित्र हो या पवित्र, अथवा किसी भी दशा में क्यों न हो, जो कमलनयन भगवान श्री पुण्डरीकाक्ष (विष्णु) का स्मरण करता है, वह बाहर और भीतर दोनों से पूर्णतः शुद्ध एवं पवित्र हो जाता है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/apavitra-pavitro.htm',
          },
        ],
      },
      {
        id: 'on-seeing-the-sun',
        nameEn: 'On Seeing the Sun',
        nameHi: 'सूर्य दर्शन एवं अर्घ्य',
        headerTitleEn: 'Shlokas for the Sun',
        headerTitleHi: 'सूर्य देव श्लोक',
        subtitleEn:
          'Saluting Surya at dawn from Gayatri mantra to Aditya Hridayam',
        subtitleHi:
          'प्रातः काल सूर्य देव के दर्शन, गायत्री मंत्र एवं आदित्य हृदयम्',
        descriptionEn:
          'The rising Sun is the most visible form of the divine — the source of light, health and life. These verses salute Surya at dawn, from the Gayatri mantra to the Aditya Hridayam. Face the morning Sun, chant one of them, and give thanks for the new day.',
        descriptionHi:
          'उगता सूर्य ईश्वर का प्रत्यक्ष स्वरूप है — जो प्रकाश, ऊर्जा, स्वास्थ्य व जीवन का स्रोत है। प्रातःकाल सूर्य देव के सम्मुख खड़े होकर इन पावन श्लोकों का स्मरण कर नवप्रभात हेतु कृतज्ञता व्यक्त करें।',
        deity: 'Surya',
        image: imagePath.Surya,
        path: '/shloka/prayers/for-the-sun.htm',
        sanskrit:
          'आदिदेव नमस्तुभ्यं प्रसीद मम भास्कर ।\nदिवाकर नमस्तुभ्यं प्रभाकर नमोऽस्तु ते ॥१॥',
        meaningHi:
          'हे आदिदेव! आपको प्रणाम है। हे भास्कर! मुझ पर प्रसन्न होइए। हे दिवाकर! आपको नमस्कार है। हे प्रभाकर! आपको बारंबार प्रणाम है।',
        meaningEn:
          'Salutations to you O Adideva (the first god), please be gracious to me O Bhaskara (the shining one), O Divakara (the maker of the day), O Prabhakara (the maker of light), my salutations to you.',
        verses: [
          {
            id: 'surya-ashtakam',
            title: 'Surya Ashtakam',
            titleHi: 'सूर्याष्टकम् (आदिदेव नमस्तुभ्यं)',
            sanskrit:
              'आदिदेव नमस्तुभ्यं प्रसीद मम भास्कर ।\nदिवाकर नमस्तुभ्यं प्रभाकर नमोऽस्तु ते ॥१॥',
            transliteration:
              "ādideva namastubhyaṃ prasīda mama bhāskara .\ndivākara namastubhyaṃ prabhākara namo'stu te ..1..",
            translationEn:
              'Salutations to you O Adideva (the first god), please be gracious to me O Bhaskara (the shining one), O Divakara (the maker of the day), O Prabhakara (the maker of light), my salutations to you.',
            translationHi:
              'हे आदिदेव! आपको प्रणाम है। हे भास्कर! मुझ पर प्रसन्न होइए। हे दिवाकर! आपको नमस्कार है। हे प्रभाकर! आपको बारंबार प्रणाम है।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/surya-ashtakam.htm',
          },
          {
            id: 'dwadasha-aditya-dhyana-slokas',
            title: 'Dwadasha Aditya Dhyana Slokas',
            titleHi: 'द्वादश आदित्य ध्यान श्लोक (धाता)',
            sanskrit:
              'धाता कृतस्थली हेतिर्वासुकी रथकृन्मुने ।\nपुलस्त्यस्तुम्बुरुरिति मधुमासं नयन्त्यमी ॥\nधाता शुभस्य मे दाता भूयो भूयोऽपि भूयसः ।\nरश्मिजालसमाश्लिष्टः तमस्तोमविनाशनः ॥',
            transliteration:
              "dhātā kṛtasthalī hētirvāsukī rathakṛnmunē .\npulastyastumbururiti madhumāsaṃ nayantyamī ..\ndhātā śubhasya mē dātā bhūyō bhūyō'pi bhūyasaḥ .\nraśmijālasamāśliṣṭaḥ tamastōmavināśanaḥ ..",
            translationEn:
              'Dhātā (Month of Madhu / Caitra): Dhātā, Kṛtasthalī, Hēti, Vāsuki, Rathakṛt, Pulastya, and Tumburu — these seven carry the month of Madhu. Dhātā, giver of all blessings, grant me blessing abundantly, ever more. Enveloped in a net of rays, he is the destroyer of masses of darkness.',
            translationHi:
              'हे चैत्र मास के अधिष्ठाता धाता सूर्यदेव! जो किरणों के जाल से युक्त होकर अंधकार के समूह का नाश करते हैं, वे परम कल्याणकारी धाता मुझे बार-बार प्रचुर कल्याण और शुभता प्रदान करें।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/dwadasha-aditya-dhyana-slokas.htm',
          },
          {
            id: 'gayatri-mantra',
            title: 'Gayatri Mantra',
            titleHi: 'गायत्री महामंत्र',
            sanskrit:
              'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
            transliteration:
              'oṃ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṃ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
            translationEn:
              'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms (physical, astral, and celestial). May He enlighten our intellect and awaken our understanding, so that it may guide us along the righteous path.',
            translationHi:
              'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा (सूर्य) के तेज का ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/gayatri-mantra.htm',
          },
          {
            id: 'aditya-hrudayam',
            title: 'Aditya Hrudayam',
            titleHi: 'आदित्य हृदयम् स्तोत्र',
            sanskrit:
              'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥',
            transliteration:
              'tato yuddhapariśrāntaṃ samare cintayā sthitam .\nrāvaṇaṃ cāgrato dṛṣṭvā yuddhāya samupasthitam ..',
            translationEn:
              'When Rama was exhausted in battle field standing with greater sorrow and deep thought to fight against Ravana who was duly prepared for the battle, Agastya observed that.',
            translationHi:
              'रणभूमि में युद्ध से थके हुए और चिंतामग्न खड़े भगवान श्री राम को देखकर, जब सामने रावण युद्ध के लिए पुनः उपस्थित हुआ, तब महर्षि अगस्त्य ने भगवान राम के समीप आकर यह आदित्य हृदयम् उपदेश दिया।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/aditya-hrudayam.htm',
          },
        ],
      },
      {
        id: 'lighting-the-lamp',
        nameEn: 'Lighting the Lamp',
        nameHi: 'दीप दर्शन / संध्या दीप',
        headerTitleEn: 'Shlokas for Lighting the Lamp',
        headerTitleHi: 'दीप प्रज्वलन श्लोक',
        subtitleEn:
          'Welcoming light, knowledge, and auspiciousness into the home',
        subtitleHi: 'प्रातः या संध्या समय दीपक प्रज्वलन एवं शिव आराधना',
        descriptionEn:
          'The lamp we light at dawn and dusk each day stands for knowledge dispelling darkness, and for the presence of God in the home. These prayers are chanted as the deepam is lit. Say them as you light the lamp, welcoming light and auspiciousness into the house.',
        descriptionHi:
          'प्रातः व सायं प्रज्वलित किया जाने वाला दीपक अंधकार मिटाने वाले ज्ञान तथा घर में ईश्वर की उपस्थिति का प्रतीक है। दीपक प्रज्वलित करते समय इन पावन प्रार्थनाओं का उच्चारण कर घर में सुख, शांति व मांगलिकता का स्वागत करें।',
        deity: 'lamp',
        image: imagePath.lamp,
        path: '/shloka/prayers/lighting-the-lamp.htm',
        sanskrit:
          'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥\nदीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते ॥',
        meaningHi:
          'शुभ, कल्याण, उत्तम आरोग्य और धन-संपत्ति प्रदान करने वाली तथा शत्रु-बुद्धि (दुर्बुद्धि/अज्ञान) का नाश करने वाली हे दीपज्योति! आपको मेरा नमन है। दीपज्योति ही परब्रह्म है, दीपज्योति ही जनार्दन (विष्णु) हैं। हे पावन दीपक! मेरे पापों का हरण करें।',
        meaningEn:
          'Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of the intellect’s enemy (ignorance). Deepa-Jyothi is the supreme Brahman, Deepa-Jyothi is Janardhana. May the divine lamp eradicate my sins. Salutations to the divine lamp of the evening.',
        verses: [
          {
            id: 'shubham-karothi-kalyanam',
            title: 'Shubham Karothi Kalyanam',
            titleHi: 'शुभं करोति कल्याणम् (दीपज्योति वंदना)',
            sanskrit:
              'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥\nदीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते ॥',
            transliteration:
              "śubhaṃ karoti kalyāṇamārogyaṃ dhanasaṃpadā\nśatrubuddhivināśāya dīpajyotirnamo'stute\ndīpajyotiḥ parabrahma dīpajyotirjanārdanaḥ .\ndīpo haratu me pāpaṃ dīpajyotirnamo'stute ..",
            translationEn:
              'Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of the intellect’s enemy (ignorance). Deepa-Jyothi is the supreme Brahman, Deepa-Jyothi is Janardhana. May the divine lamp eradicate my sins. Salutations to the divine lamp of the evening.',
            translationHi:
              'शुभ, कल्याण, उत्तम आरोग्य और धन-संपत्ति प्रदान करने वाली तथा शत्रु-बुद्धि (दुर्बुद्धि/अज्ञान) का नाश करने वाली हे दीपज्योति! आपको मेरा नमन है। दीपज्योति ही परब्रह्म है, दीपज्योति ही जनार्दन हैं। हे पावन दीपक! मेरे पापों का हरण करें।',
            deity: 'lamp',
            image: imagePath.lamp,
            link: 'https://shlokam.org/shloka/shubham-karothi-kalyanam.htm',
          },
          {
            id: 'karpura-gauram',
            title: 'Karpura Gauram',
            titleHi: 'कर्पूरगौरं करुणावतारम् (शिव स्तुति)',
            sanskrit:
              'कर्पूरगौरं करुणावतारं\nसंसारसारम् भुजगेन्द्रहारम् ।\nसदावसन्तं हृदयारविन्दे\nभवं भवानीसहितं नमामि ॥',
            transliteration:
              'karpūragauraṃ karuṇāvatāraṃ\nsaṃsārasāram bhujagendrahāram\nsadāvasantaṃ hṛdayāravinde\nbhavaṃ bhavānīsahitaṃ namāmi',
            translationEn:
              'I offer my salutations to Lord Shiva, who is as radiant as camphor, an embodiment of compassion, the essence of the world, adorned with the serpent king as a garland, who always resides in the lotus heart of devotees, along with Goddess Bhavānī (Parvati).',
            translationHi:
              'कर्पूर के समान उज्ज्वल व श्वेत वर्ण वाले, करुणा के साक्षात अवतार, इस संसार के मूल सार, नागराज का हार धारण करने वाले, भक्तों के हृदय-कमल में सदा निवास करने वाले भगवान शिव को माता भवानी (पार्वती) सहित मैं सादर प्रणाम करता हूँ।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/karpura-gauram.htm',
          },
        ],
      },
      {
        id: 'before-eating',
        nameEn: 'Before Eating',
        nameHi: 'भोजन ग्रहण से पूर्व',
        headerTitleEn: 'Shlokas Before Eating',
        headerTitleHi: 'भोजन पूर्व श्लोक',
        subtitleEn:
          'Offering the meal to God and thanking Annapurna before the first bite',
        subtitleHi:
          'भोजन करने से पूर्व ईश्वर को भोग एवं माँ अन्नपूर्णा की वंदना',
        descriptionEn:
          'Food sustains our life, and so it is treated as sacred — first offered to God before we eat. These prayers turn the meal into an offering, remembering Annapurna, who feeds all. Chant them before your first bite, with gratitude for what is on the plate.',
        descriptionHi:
          'अन्न हमारे जीवन का आधार है, अतः यह साक्षात ब्रह्म व पवित्र माना गया है। भोजन ग्रहण करने से पूर्व अन्नपूर्णा माता व परमात्मा को भोग लगाकर कृतज्ञता पूर्वक इन श्लोकों का उच्चारण करें।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        path: '/shloka/prayers/before-eating.htm',
        sanskrit:
          'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
        meaningHi:
          'जिस यज्ञ में अर्पण ब्रह्म है, हवि (भोजन) ब्रह्म है, ब्रह्म रूपी अग्नि में ब्रह्म रूपी कर्ता द्वारा आहुति दी जाती है—उस ब्रह्म-कर्म में लीन रहने वाले व्यक्ति द्वारा प्राप्त करने योग्य फल भी ब्रह्म ही है।',
        meaningEn:
          'Brahman is the offering, Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
        verses: [
          {
            id: 'brahmarpanam-brahma-havih',
            title: 'Brahmarpanam Brahma Havih',
            titleHi: 'ब्रह्मार्पणं ब्रह्म हविः (गीता ४.२४)',
            sanskrit:
              'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
            transliteration:
              'brahmārpaṇaṃ brahma havirbrahmāgnau brahmaṇā hutam\nbrahmaiva tena gantavyaṃ brahmakarma samādhinā',
            translationEn:
              'Brahman is the offering (the ritual or act of offering), Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            translationHi:
              'जिस यज्ञ में अर्पण ब्रह्म है, हवि (भोजन) ब्रह्म है, ब्रह्म रूपी अग्नि में ब्रह्म रूपी कर्ता द्वारा आहुति दी जाती है—उस ब्रह्म-कर्म में लीन रहने वाले व्यक्ति द्वारा प्राप्त करने योग्य फल भी ब्रह्म ही है।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/brahmarpanam-brahma-havih.htm',
          },
          {
            id: 'annapurne-sadhapurne',
            title: 'Annapurne Sadhapurne',
            titleHi: 'अन्नपूर्णे सदापूर्णे (अन्नपूर्णा स्तोत्र)',
            sanskrit:
              'अन्नपूर्णे सदापूर्णे शङ्करप्राणवल्लभे ।\nज्ञान वैराग्य सिद्ध्यर्थं भिक्षां देहि च पार्वति ॥\nमाता च पार्वती देवी पिता देवो महेश्वरः ।\nबान्धवाः शिवभक्ताश्च स्वदेशो भुवनत्रयम् ॥',
            transliteration:
              'annapūrṇe sadāpūrṇe śaṅkaraprāṇavallabhe\njñāna vairāgya siddhyarthaṃ bhikṣāṃ dehi ca pārvati\nmātā ca pārvatī devī pitā devo maheśvaraḥ\nbāndhavāḥ śivabhaktāśca svadeśo bhuvanatrayam',
            translationEn:
              'O Annapūrṇa, who is ever full, beloved of Lord Śankara, grant me alms, O Pārvatī, for the attainment of knowledge and detachment. My mother is Goddess Pārvatī, father is Lord Maheśvara (Shiva). My relatives are the devotees of Shiva, and my homeland is the three worlds (heaven, earth, and the netherworld).',
            translationHi:
              'हे नित्य परिपूर्ण रहने वाली, भगवान शिव की प्राणप्रिया माता अन्नपूर्णा (पार्वती)! मुझे ज्ञान और वैराग्य की सिद्धि के लिए भिक्षा प्रदान करें। माता पार्वती मेरी माता हैं, देवाधिदेव महादेव मेरे पिता हैं, समस्त शिव भक्त मेरे बंधु-बांधव हैं और तीनों भुवन मेरा स्वदेश हैं।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/annapurne-sadhapurne.htm',
          },
          {
            id: 'aham-vaishvanaro-bhuthva',
            title: 'Aham Vaishvanaro Bhuthva',
            titleHi: 'अहं वैश्वानरो भूत्वा (गीता १५.१४)',
            sanskrit:
              'अहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः ।\nप्राणापान समायुक्तः पचाम्यन्नं चतुर्विधम् ॥',
            transliteration:
              'ahaṃ vaiśvānaro bhūtvā prāṇināṃ dehamāśritaḥ\nprāṇāpāna samāyuktaḥ pacāmyannaṃ caturvidham',
            translationEn:
              'I, having become the universal fire, residing in the bodies of living beings, and united with the inward and outward breaths, digest the four kinds of food (which is chewed, swallowed, licked and sucked).',
            translationHi:
              'मैं ही समस्त प्राणियों के शरीर में स्थित होकर वैश्वानर (जठराग्नि) रूप बनता हूँ, और प्राण तथा अपान वायु से संयुक्त होकर चार प्रकार के अन्नों (भक्ष्य, भोज्य, लेह्य, चोष्य) को पचाता हूँ।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/aham-vaishvanaro-bhuthva.htm',
          },
        ],
      },
      {
        id: 'before-new-beginning',
        nameEn: 'Before Any New Beginning',
        nameHi: 'शुभ कार्य आरम्भ से पूर्व',
        headerTitleEn: 'Shlokas for a New Beginning',
        headerTitleHi: 'नए कार्य शुभारंभ श्लोक',
        subtitleEn:
          'Invoking Ganesha and Vishnu for an auspicious, obstacle-free start',
        subtitleHi:
          'किसी भी नए कार्य, व्यापार या दिन के शुभारंभ पर विघ्न निवारण',
        descriptionEn:
          'Before we start anything important, we first ask that the way be cleared of obstacles. These verses and mantras call on Ganesha, the remover of obstacles, for an auspicious start. Chant one of them as you begin — a new task, a new venture, or simply the day ahead.',
        descriptionHi:
          'किसी भी महत्वपूर्ण कार्य के शुभारंभ से पूर्व विघ्नों के निवारण हेतु प्रार्थना की जाती है। विघ्नहर्ता भगवान श्री गणेश व भगवान विष्णु के ये पावन श्लोक हर कार्य को निर्विघ्न व मंगलमय बनाते हैं।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        path: '/shloka/prayers/before-any-new-beginning.htm',
        sanskrit:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        meaningHi:
          'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
        meaningEn:
          'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
        verses: [
          {
            id: 'vakratunda-mahakaya',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (गणेश वंदना)',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            translationHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
          },
          {
            id: 'gananamtva-ganapatim',
            title: 'Gananamtva Ganapatim',
            titleHi: 'गणानां त्वा गणपतिं (ऋग्वेद / गणपति सूक्त)',
            sanskrit:
              'ॐ गणानां त्वा गणपतिं हवामहे\nकविं कवीनामुपमश्रवस्तमम् ।\nज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत\nआ नः शृण्वन्नूतिभिः सीद सादनम् ॥',
            transliteration:
              'o-ṅga̱ṇānā̎-ntvā ga̱ṇapa̍tigṃ havāmaheka̱vi-ṅka̍vī̱nāṃ upa̱maśra̍vastavamjye̱ṣṭha̱rāja̱-mbrahma̍ṇā-mbrahmaṇaspata̱ā na̍ḥ śṛ̱ṇvannū̱tibhi̍ssīda̱ sāda̍nam',
            translationEn:
              'Among the celestial attendants (Ganas), you are the Lord (Ganapathi), We offer sacrificial oblations to you. You are the wisest among the scholars. Your wisdom is known to be highest quality and incomparable for its glory. You are the eldest of devas, the Lord of sacred prayers. O Lord, come to us hearing our hymns and be seated at this sacrificial altar.',
            translationHi:
              'समस्त गणों के स्वामी हे गणपति! हम आपका आवाहन करते हैं। आप ज्ञानियों में सर्वश्रेष्ठ ज्ञानी और अतुलनीय कीर्ति वाले हैं। हे ब्रह्म के स्वामी! आप हमारी स्तुति सुनकर अपने समस्त रक्षण-सामर्थ्य के साथ हमारे इस पावन स्थान पर विराजमान हों।',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gananamtva-ganapatim.htm',
          },
          {
            id: 'mangalam-bhagavan-vishnu',
            title: 'Mangalam Bhagavan Vishnu',
            titleHi: 'मङ्गलं भगवान् विष्णुः (मंगलाचरण)',
            sanskrit:
              'मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः ।\nमङ्गलं पुण्डरीकाक्षो मङ्गलाय तनो हरिः ॥',
            transliteration:
              'maṅgalaṃ bhagavān viṣṇuḥ maṅgalaṃ garuḍadhvajaḥ .\nmaṅgalaṃ puṇḍarīkākṣo maṅgalāya tano hariḥ ..',
            translationEn:
              'Auspicious is Lord Vishnu, auspicious is the one who has Garuda on his flag. Auspicious is the lotus-eyed one, may Lord Hari bestow auspiciousness upon us.',
            translationHi:
              'भगवान श्री विष्णु मंगल स्वरूप हैं, गरुड़ध्वज धारी प्रभु मंगल रूप हैं, कमलनयन भगवान पुण्डरीकाक्ष मंगलमय हैं; वे भगवान श्री हरि हमारे जीवन में सर्वत्र मंगल का विस्तार करें।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/mangalam-bhagavan-vishnu.htm',
          },
        ],
      },
      {
        id: 'before-studies-exams',
        nameEn: 'Before Studies & Exams',
        nameHi: 'विद्यारम्भ एवं अध्ययन पूर्व',
        headerTitleEn: 'Shlokas for Studies & Exams',
        headerTitleHi: 'विद्या व परीक्षा सफलता श्लोक',
        subtitleEn:
          'Chanted before studying and examinations for focus, memory, and success',
        subtitleHi:
          'पढ़ाई, स्वाध्याय अथवा परीक्षा से पूर्व माँ सरस्वती व हयग्रीव स्मरण',
        descriptionEn:
          'Learning asks for a calm, focused mind and a steady memory — and a little grace on the day of the test. These verses call on Saraswati and Hayagriva, who preside over knowledge, including the compact Saraswati Beeja Mantra. Chant these prayers before you sit to study, and again before an exam, to settle the mind and invite their blessing.',
        descriptionHi:
          'ज्ञानार्जन हेतु एकाग्र मन, शांत बुद्धि एवं सुदृढ़ स्मरण शक्ति की आवश्यकता होती है। विद्या की अधिष्ठात्री देवी माँ सरस्वती व भगवान हयग्रीव के ये पावन श्लोक और सरस्वती बीज मंत्र अध्ययन व परीक्षा में अपार सफलता प्रदान करते हैं।',
        deity: 'Saraswati',
        image: imagePath.Saraswati,
        path: '/shloka/prayers/for-studies-and-exams.htm',
        sanskrit:
          'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
        meaningHi:
          'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
        meaningEn:
          'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
        verses: [
          {
            id: 'sarasvati-namasthubyam',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (विद्यारम्भ श्लोक)',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
          },
          {
            id: 'yaakundhendhu-thushara-hara',
            title: 'Yaakundhendhu Thushara Hara',
            titleHi: 'या कुन्देन्दु तुषारहारधवला (सरस्वती वंदना)',
            sanskrit:
              'या कुन्देन्दु तुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।\nया ब्रह्माच्युत शङ्करप्रभृतिभिर्देवैस्सदा पूजिता\nसा मां पातु सरस्वती भगवती निश्शेषजाड्यापहा ॥',
            transliteration:
              'yā kundendu tuṣārahāradhavalā yā śubhravastrāvṛtā\nyā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā\nyā brahmācyuta śaṅkaraprabhṛtibhirdevaissadā pūjitā\nsā māṃ pātu sarasvatī bhagavatī niśśeṣajāḍyāpahā',
            translationEn:
              'May Goddess Sarasvatī, who is adorned with a garland of white flowers, dressed in pure white, and seated on a white lotus, who holds the veena and is worshipped by Brahma, Vishnu, and Shiva, protect me and remove all ignorance.',
            translationHi:
              'जो कुंद के फूल, चंद्रमा और हिम के समान श्वेत हैं, जो वीणा धारण करती हैं, जो श्वेत कमल पर विराजती हैं और समस्त देवों द्वारा पूजित हैं—वे माँ सरस्वती मेरी समस्त अज्ञानता व जड़ता का नाश करें।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/yaakundhendhu-thushara-hara.htm',
          },
          {
            id: 'sri-hayagriva-stotram',
            title: 'Sri Hayagriva Stotram',
            titleHi: 'ज्ञानानन्दमयं देवं (हयग्रीव स्तोत्र)',
            sanskrit:
              'ज्ञानानन्दमयं देवं निर्मलस्फटिकाकृतिम् ।\nआधारं सर्वविद्यानां हयग्रीवमुपास्महे ॥ १ ॥',
            transliteration:
              'jñānānandamayaṃ dēvaṃ nirmalasphaṭikākṛtiṃ\nādhāraṃ sarvavidyānāṃ hayagrīvamupāsmahē ..1..',
            translationEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            translationHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-hayagriva-stotram.htm',
          },
          {
            id: 'saraswati-beeja-mantra',
            title: 'Saraswati Beeja Mantra',
            titleHi: 'सरस्वती बीज मंत्र',
            sanskrit: 'ॐ ऐं सरस्वत्यै नमः ॥',
            transliteration: 'oṃ aiṃ sarasvatyai namaḥ ..',
            translationEn:
              'I bow down and offer my salutations to Goddess Saraswati, the embodiment of ultimate wisdom, intellect, and divine speech.',
            translationHi:
              'विद्या, बुद्धि, ज्ञान एवं वाणी की अधिष्ठात्री भगवती माँ सरस्वती को मेरा सादर नमन है।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/saraswati-beeja-mantra.htm',
          },
        ],
      },
      {
        id: 'before-sleep',
        nameEn: 'Before Sleep',
        nameHi: 'शयन एवं क्षमा प्रार्थना',
        headerTitleEn: 'Shlokas Before Sleep',
        headerTitleHi: 'रात्रि शयन श्लोक',
        subtitleEn:
          'Seeking forgiveness and nighttime protection for peaceful sleep',
        subtitleHi:
          'रात्रि में शयन से पूर्व दिनभर के कर्मों का समर्पण एवं सर्व रक्षा',
        descriptionEn:
          "At the end of a long day it helps to pause and hand the day back to God before we sleep. These prayers and stotras ask forgiveness for the day's mistakes and call on the Lord's protection for the night. Chant them in bed, and let the mind grow quiet as you rest.",
        descriptionHi:
          'दिनभर के कर्मों के उपरांत शयन से पूर्व प्रभु को दिन समर्पित कर क्षमा याचना एवं रात्रि रक्षा की प्रार्थना की जाती है। शय्या पर बैठकर इन पावन श्लोकों का स्मरण करने से मन शांत और भयमुक्त निद्रा प्राप्त होती है।',
        deity: 'Bholenath',
        image: imagePath.Bholenath,
        path: '/shloka/prayers/before-sleep.htm',
        sanskrit:
          'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधम् ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
        meaningHi:
          'हे करुणा के सागर देवाधिदेव महादेव शम्भो! मेरे हाथों, पैरों, वाणी, शरीर, कर्म, कानों, नेत्रों अथवा मन से जाने-अनजाने में हुए समस्त अपराधों को क्षमा करें। हे शम्भो! आपकी सदा जय हो।',
        meaningEn:
          'O Mahadeva Shambhu, ocean of compassion, please forgive all transgressions of hands, feet, speech, body, senses, and mind, whether in prescribed or forbidden acts. Victory to You!',
        verses: [
          {
            id: 'karacharana-kritham',
            title: 'Karacharana Kritham',
            titleHi: 'करचरण कृतं (शिव क्षमा प्रार्थना)',
            sanskrit:
              'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधम् ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
            transliteration:
              'karacaraṇa kṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādhaṃ\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
            translationEn:
              'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
            translationHi:
              'हाथों, पैरों, वाणी, शरीर, कर्म, कानों, नेत्रों अथवा मन से जाने-अनजाने में हुए समस्त अपराधों व त्रुटियों को हे करुणा के सागर देवाधिदेव महादेव शम्भो! आप क्षमा करें। हे शिव! आपकी सदा जय हो।',
            deity: 'Bholenath',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/karacharana-kritham.htm',
          },
          {
            id: 'ya-devi-sarvabhuteshu-nidra',
            title: 'Ya Devi Sarvabhuteshu Nidra-Rupena',
            titleHi: 'या देवी सर्वभूतेषु निद्रारूपेण',
            sanskrit:
              'या देवी सर्वभूतेषु निद्रारूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥ ९ ॥',
            transliteration:
              'yā dēvī sarvabhūtēṣu nidrārūpēṇa saṃsthitā .\nnamastasyai namastasyai namastasyai namō namaḥ .. 9 ..',
            translationEn:
              'The Goddess who in all beings abides in the form of Nidrā (sleep) — to her, salutation, salutation, salutation and salutation.',
            translationHi:
              'जो भगवती देवी समस्त प्राणियों में निद्रा रूप में स्थित हैं, उनको नमस्कार, उनको नमस्कार, उनको बारंबार नमस्कार है।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/devi-aparajita-stotram.htm',
          },
          {
            id: 'ramaskandham-hanumantham',
            title: 'Ramaskandham Hanumantham',
            titleHi: 'रामस्कन्धं हनुमन्तं (दुःस्वप्न नाशन)',
            sanskrit:
              'रामस्कन्धं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुःस्वप्नस्तस्य नश्यति ॥',
            transliteration:
              'rāmaskandhaṃ hanumantaṃ vainateyaṃ vṛkodaraṃ\nśayane yaḥ smarennityaṃ duḥsvapnastasya naśyati',
            translationEn:
              'Praying to Lords Rama, Skanda (Subrahmanya), Hanumantha, Vainateya (Garuda), and Bhima before going to bed daily, ensures a peaceful sleep without disturbing dreams.',
            translationHi:
              'भगवान श्री राम, स्कन्द (कार्तिकेय), हनुमान जी, वैनतेय (गरुड़) और वृकोदर (भीम)—सोते समय जो नित्य इन पाँचों का स्मरण करता है, उसके बुरे स्वप्न नष्ट हो जाते हैं।',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/ramaskandham-hanumantham.htm',
          },
          {
            id: 'sri-rama-raksha-stotram',
            title: 'Sri Rama Raksha Stotram',
            titleHi: 'श्रीरामरक्षास्तोत्रम् (विनियोग)',
            sanskrit:
              'ॐ श्रीगणेशाय नमः ॥\nअस्य श्रीरामरक्षास्तोत्रमन्त्रस्य । बुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता । अनुष्टुप् छन्दः ।\nसीता शक्तिः । श्रीमद् हनुमान कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥',
            transliteration:
              'oṃ śrīgaṇeśāya namaḥ ..\nasya śrīrāmarakṣāstotramantrasya . budhakauśika ṛṣiḥ .\nśrīsītārāmachandro devatā . anuṣṭup chandaḥ .\nsītā śaktiḥ . śrīmad hanumāna kīlakam .\nśrīrāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ ..',
            translationEn:
              'We start with salutations to Lord Ganesha. The author of this hymn seeking Lord Rama’s protection is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is Anushtup. The power is Sita, the key is Hanuman. The purpose is devotion and protection of Lord Shri Ramachandra.',
            translationHi:
              'श्री गणेशाय नमः। इस श्री राम रक्षा स्तोत्र मंत्र के ऋषि बुधकौशिक हैं, देवता श्री सीतारामचन्द्र हैं, छन्द अनुष्टुप् है, शक्ति सीता हैं, कीलक श्री हनुमान हैं और श्री रामचन्द्र जी की प्रसन्नता व सर्व रक्षा हेतु इसका पाठ किया जाता है।',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-raksha-stotram.htm',
          },
          {
            id: 'devi-aparadha-kshamapana-stotram',
            title: 'Devi Aparadha Kshamapana Stotram',
            titleHi: 'देव्यपराधक्षमापनस्तोत्रम्',
            sanskrit:
              'न मन्त्रं नो यन्त्रं तदपि च न जाने स्तुतिमहो\nन चाह्वानं ध्यानं तदपि च न जाने स्तुतिकथाः ।\nन जाने मुद्रास्ते तदपि च न जाने विलपनं\nपरं जाने मातस्त्वदनुसरणं क्लेशहरणम् ॥ १ ॥',
            transliteration:
              'na mantraṃ no yantraṃ tadapi ca na jāne stutimaho\nna cāhvānaṃ dhyānaṃ tadapi ca na jāne stutikathāḥ .\nna jāne mudrāste tadapi ca na jāne vilapanaṃ\nparaṃ jāne mātastvadanusaraṇaṃ kleśaharaṇam .. 1 ..',
            translationEn:
              '(O Mother) neither your mantra, nor yantra do I know; not even your eulogy. I do not know how to invoke you through meditation, nor how to recite your glories. I do not know your mudras, nor how to lament. However, one thing I know for certain: following You and surrendering to You takes away all afflictions.',
            translationHi:
              'हे माता! न मैं मंत्र जानता हूँ, न यंत्र, न स्तुति, न आवाहन, न ध्यान और न कथाएँ। न ही मुझे मुद्राएं ज्ञात हैं। केवल इतना जानता हूँ माँ कि आपकी शरण में आना और आपका स्मरण करना ही समस्त क्लेशों को हरने वाला है।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/devi-aparadha-kshamapana-stotram.htm',
          },
        ],
      },
    ],
  },
  'health-and-protection': {
    id: 'occasion-health-protection',
    slug: 'health-and-protection',
    titleEn: 'Health & Protection',
    titleHi: 'आरोग्य एवं रक्षा',
    descriptionEn:
      'Prayers for the body and for safety — healing from illness, recovery, and protection from harm and danger.',
    descriptionHi:
      'आरोग्य, दीर्घायु, गंभीर रोग मुक्ति, नेत्र-वाणी विकार निवारण, सुरक्षित यात्रा एवं प्राकृतिक आपदा से रक्षा हेतु श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/health-protection.jpg',
    path: '/shloka/prayers/health-and-protection.htm',
    items: [
      {
        id: 'for-serious-illness',
        nameEn: 'For Serious Illness',
        nameHi: 'गंभीर रोग निवारण (महामृत्युंजय मंत्र)',
        headerTitleEn: 'Shlokas for Serious Illness',
        headerTitleHi: 'गंभीर रोग निवारण श्लोक',
        subtitleEn:
          'Prayers to Shiva, Dhanvantari, and Vishnu for healing through critical illness',
        subtitleHi:
          'असाध्य रोगों से मुक्ति, देव-वैद्य धन्वन्तरि व महामृत्युंजय स्मरण',
        descriptionEn:
          'The body is mortal, and illness comes to everyone in time. When it turns serious, we turn to the Lord for strength, and to the divine physician for healing. Chant these mantras at the bedside with faith, as a steady prayer through the hardest days.',
        descriptionHi:
          'मानव शरीर नश्वर है और व्याधियाँ कभी भी आ सकती हैं। गंभीर अस्वस्थता के समय भगवान शिव व देव-वैद्य धन्वन्तरि के ये पावन मंत्र आरोग्य, शक्ति और जीवन रक्षा का संबल प्रदान करते हैं। कठिन समय में इनका श्रद्धापूर्वक जाप करें।',
        deity: 'Bholenath',
        image: imagePath.Bholenath,
        path: '/shloka/prayers/for-serious-illness.htm',
        sanskrit:
          'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
        meaningHi:
          'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और समस्त जीवों का पोषण करते हैं। जिस प्रकार पका हुआ फल अपनी बेल के बंधन से स्वतः मुक्त हो जाता है, उसी प्रकार हम व्याधि और मृत्यु के भय से मुक्त होकर अमरता को प्राप्त हों।',
        meaningEn:
          'We worship the three-eyed one (Lord Shiva), the sustainer who nourishes all beings. May He liberate us from disease and mortality into immortality, like a ripe fruit naturally releasing from its vine.',
        verses: [
          {
            id: 'tryambakam-yajamahe',
            title: 'Om Tryambakam Yajamahe',
            titleHi: 'महामृत्युंजय महामंत्र',
            sanskrit:
              'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
            transliteration:
              "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
            translationEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            translationHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और समस्त जीवों का पोषण करते हैं। जिस प्रकार पका हुआ खरबूजा/ककड़ी अपनी बेल के बंधन से स्वतः मुक्त हो जाता है, उसी प्रकार हम मृत्यु व व्याधि के भय से मुक्त होकर अमरता को प्राप्त हों।',
            deity: 'Bholenath',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/tryambakam-yajamahe.htm',
          },
          {
            id: 'mruthyunjayaya-rudraya',
            title: 'Mruthyunjayaya Rudraya',
            titleHi: 'मृत्युंजयाय रुद्राय (शिव स्तुति)',
            sanskrit:
              'मृत्युंजयाय रुद्राय नीलकण्ठाय शम्भवे ।\nअमृतेशाय सर्वाय महादेवाय ते नमः ॥',
            transliteration:
              'mṛtyuṃjayāya rudrāya nīlakaṇṭhāya śambhave .\namṛteśāya sarvāya mahādevāya te namaḥ ..',
            translationEn:
              'Salutation to you Mrithyunjaya, Rudra, Nilakanta, Shambhu & the lord of immortals and this great lord of all beings.',
            translationHi:
              'मृत्यु को जीतने वाले मृत्युंजय, दुःखों का नाश करने वाले रुद्र, नीलकंठ, कल्याणकारी शम्भु, अमृतेश, सर्वस्वरूप और देवाधिदेव महादेव को मेरा कोटि-कोटि प्रणाम है।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/mruthyunjayaya-rudraya.htm',
          },
          {
            id: 'dhanvantari-mantra',
            title: 'Dhanvantari Mantra',
            titleHi: 'भगवान धन्वन्तरि आरोग्य मंत्र',
            sanskrit:
              'ॐ नमो भगवते वासुदेवाय धन्वन्तरये अमृतकलश हस्ताय ।\nसर्वामय विनाशनाय त्रैलोक्यनाथाय श्री महाविष्णवे नमः ॥',
            transliteration:
              'oṃ namo bhagavate vāsudevāya dhanvantaraye amṛtakalaśa hastāya\nsarvāmaya vināśanāya trailokyanāthāya śrī mahāviṣṇave namaḥ',
            translationEn:
              'Salutations to Lord Dhanvantari, the divine healer with the pot of nectar, who removes all afflictions and diseases. I bow to Lord Vishnu, the sustainer of the three worlds.',
            translationHi:
              'हाथ में अमृत कलश धारण करने वाले, समस्त रोगों व व्याधियों का नाश करने वाले, तीनों लोकों के स्वामी भगवान धन्वन्तरि रूपी श्री महाविष्णु को मेरा सादर नमन है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/dhanvanthari-mantra.htm',
          },
          {
            id: 'roga-nivarana-achyutananta-govinda',
            title: 'Roga Nivarana (Achyutananta Govinda)',
            titleHi: 'अच्युतानन्त गोविन्द (रोग निवारण महामंत्र)',
            sanskrit:
              'अच्युतानन्त गोविन्द नामोच्चारणभेषजात् ।\nनश्यन्ति सकला रोगाः सत्यं सत्यं वदाम्यहम् ॥',
            transliteration:
              'acyutānanta govinda nāmoccāraṇabheṣajāt .\nnaśyanti sakalā rogāḥ satyaṃ satyaṃ vadāmyaham ..',
            translationEn:
              'By the medicine of uttering the names Achyuta, Ananta, Govinda, all diseases are destroyed — this is the truth, the truth I declare.',
            translationHi:
              'अच्युत, अनंत और गोविंद—इन पवित्र दिव्य नामों के उच्चारण रूपी महा-औषधि से समस्त रोग नष्ट हो जाते हैं; यह पूर्णतः सत्य है, सत्य है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/roga-nivarana-achyutananta-govinda.htm',
          },
        ],
      },
      {
        id: 'for-healing-and-recovery',
        nameEn: 'For Healing & Recovery',
        nameHi: 'शीघ्र स्वास्थ्य लाभ (धन्वन्तरि व अच्युत नाम)',
        headerTitleEn: 'Shlokas for Healing & Recovery',
        headerTitleHi: 'रोगमुक्ति एवं स्वास्थ्य लाभ श्लोक',
        subtitleEn:
          'Invoking Dhanvantari and Vaidyanatha for strength, cure, and full vitality',
        subtitleHi: 'देव-वैद्य धन्वन्तरि व वैद्यनाथ भगवान शिव द्वारा रोग शमन',
        descriptionEn:
          "Recovery takes its own time, and through it we ask for the Lord's healing hand. These mantras and stotras call on Dhanvantari and Vaidyanatha, the divine physicians who cure every ailment. Chant them daily through the illness, as a prayer for strength and a full return to health.",
        descriptionHi:
          'रोग से स्वस्थ होने में समय लगता है और इस यात्रा में ईश्वर का कृपामय हाथ हमारा संबल बनता है। देव-वैद्य धन्वन्तरि व वैद्यनाथ भगवान शिव के ये पावन श्लोक समस्त व्याधियों का शमन कर पूर्ण स्वास्थ्य व शक्ति प्रदान करते हैं।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        path: '/shloka/prayers/for-healing-and-recovery.htm',
        sanskrit:
          'अच्युतानन्त गोविन्द नामोच्चारणभेषजात् ।\nनश्यन्ति सकला रोगाः सत्यं सत्यं वदाम्यहम् ॥',
        meaningHi:
          'अच्युत, अनंत और गोविंद—इन पवित्र दिव्य नामों के उच्चारण रूपी महा-औषधि से समस्त रोग नष्ट हो जाते हैं; यह पूर्णतः सत्य है।',
        meaningEn:
          'By the supreme medicine of chanting the holy names Achyuta, Ananta, and Govinda, all diseases are destroyed. This is the truth.',
        verses: [
          {
            id: 'dhanvantari-mantra-recovery',
            title: 'Dhanvantari Mantra',
            titleHi: 'भगवान धन्वन्तरि महामंत्र',
            sanskrit:
              'ॐ नमो भगवते वासुदेवाय धन्वन्तरये अमृतकलश हस्ताय ।\nसर्वामय विनाशनाय त्रैलोक्यनाथाय श्री महाविष्णवे नमः ॥',
            transliteration:
              'oṃ namo bhagavate vāsudevāya dhanvantaraye amṛtakalaśa hastāya\nsarvāmaya vināśanāya trailokyanāthāya śrī mahāviṣṇave namaḥ',
            translationEn:
              'Salutations to Lord Dhanvantari, the divine healer with the pot of nectar, who removes all afflictions and diseases. I bow to Lord Vishnu, the sustainer of the three worlds.',
            translationHi:
              'हाथ में अमृत कलश धारण करने वाले, समस्त रोगों व व्याधियों का नाश करने वाले, तीनों लोकों के स्वामी भगवान धन्वन्तरि रूपी श्री महाविष्णु को मेरा सादर नमन है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/dhanvanthari-mantra.htm',
          },
          {
            id: 'roga-nivarana-recovery',
            title: 'Roga Nivarana (Achyutananta Govinda)',
            titleHi: 'अच्युतानन्त गोविन्द (रोग निवारण श्लोक)',
            sanskrit:
              'अच्युतानन्त गोविन्द नामोच्चारणभेषजात् ।\nनश्यन्ति सकला रोगाः सत्यं सत्यं वदाम्यहम् ॥',
            transliteration:
              'acyutānanta govinda nāmoccāraṇabheṣajāt .\nnaśyanti sakalā rogāḥ satyaṃ satyaṃ vadāmyaham ..',
            translationEn:
              'By the medicine of uttering the names Achyuta, Ananta, Govinda, all diseases are destroyed — this is the truth, the truth I declare.',
            translationHi:
              'अच्युत, अनंत और गोविंद—इन पवित्र दिव्य नामों के उच्चारण रूपी महा-औषधि से समस्त रोग नष्ट हो जाते हैं; यह पूर्णतः सत्य है, सत्य है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/roga-nivarana-achyutananta-govinda.htm',
          },
          {
            id: 'somanatha-vaidyanatha',
            title: 'Somanatha Vaidyanatha',
            titleHi: 'सोमनाथं वैद्यनाथं (सर्वव्याधि शमन)',
            sanskrit:
              'सोमनाथं वैद्यनाथं धन्वंतरिमथाश्विनौ ।\nएतान् संस्मरतः प्रातः व्याधिः स्पर्श न विद्यते ॥',
            transliteration:
              'somanāthaṃ vaidyanāthaṃ dhanvaṃtarimathāśvinau\netān saṃsmarataḥ prātaḥ vyādhiḥ sparśa na vidyate',
            translationEn:
              'One who remembers Somanātha (Lord Shiva), Vaidyanātha (the healer Shiva), Dhanvantari (the divine physician), and the twin Ashvinis (divine doctors of the Gods) every morning will not be touched by disease.',
            translationHi:
              'सोमनाथ, वैद्यनाथ (शिव), भगवान धन्वन्तरि और दोनों अश्विनीकुमारों का जो प्रातःकाल स्मरण करता है, उसे किसी भी व्याधि (रोग) का स्पर्श तक नहीं होता।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/somanatha-vaidyanatha.htm',
          },
          {
            id: 'vaidyanatha-ashtakam',
            title: 'Vaidyanatha Ashtakam',
            titleHi: 'वैद्यनाथाष्टकम् (श्रीरामसौमित्रिजटायुवेद)',
            sanskrit:
              'श्रीरामसौमित्रिजटायुवेद षडाननादित्य कुजार्चिताय ।\nश्रीनीलकण्ठाय दयामयाय श्रीवैद्यनाथाय नमः शिवाय ॥ १ ॥',
            transliteration:
              'śrīrāmasaumitrijaṭāyuvēda ṣaḍānanāditya kujārchitāya ।\nśrīnīlakaṇṭhāya dayāmayāya śrīvaidyanāthāya namaḥśivāya ॥ 1 ॥',
            translationEn:
              'Worshipped by Sri Rama, Lakshmana, Jatayu, the six-faced Kartikeya, the sun and Mars — O blue-throated, compassionate one — salutations to Sri Vaidyanatha, the Lord as Shiva.',
            translationHi:
              'श्री राम, लक्ष्मण, जटायु, वेद, षडानन (कार्तिकेय), सूर्य और मंगल द्वारा पूजित, नीलकंठ, करुणामय भगवान श्री वैद्यनाथ (शिव) को मेरा सादर प्रणाम है।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/vaidyanatha-ashtakam.htm',
          },
        ],
      },
      {
        id: 'for-long-life',
        nameEn: 'For a Long Life',
        nameHi: 'दीर्घायु एवं ओज वृद्धि',
        headerTitleEn: 'Shlokas for Long Life',
        headerTitleHi: 'दीर्घायु एवं आरोग्य श्लोक',
        subtitleEn:
          'Prayers to Shiva and Ayushya Suktam for vitality, health, and length of years',
        subtitleHi: 'शतायु जीवन, शारीरिक बल, तेज एवं महामृत्युंजय शिव आराधना',
        descriptionEn:
          'We wish for those we love — and for ourselves — a long life lived in good health. These mantras and prayers call on Shiva, who holds death at bay, for length of years and vitality. Chant them on a birthday, for an elder, or as a regular prayer for a long and healthy life.',
        descriptionHi:
          'हम अपने प्रियजनों और स्वयं के लिए उत्तम स्वास्थ्य व दीर्घायु की कामना करते हैं। मृत्युंजय भगवान शिव व आयुष्य सूक्त के ये पावन मंत्र शतायु जीवन, ओज एवं जीवन शक्ति प्रदान करते हैं। जन्मदिन पर, वृद्धजनों के लिए अथवा नित्य नियम से इनका पाठ करें।',
        deity: 'Bholenath',
        image: imagePath.Bholenath,
        path: '/shloka/prayers/for-long-life.htm',
        sanskrit:
          'चन्द्रशेखर चन्द्रशेखर चन्द्रशेखर पाहि माम् ।\nचन्द्रशेखर चन्द्रशेखर चन्द्रशेखर रक्ष माम् ॥ १ ॥',
        meaningHi:
          'हे चंद्रशेखर (शीश पर चंद्रमा धारण करने वाले भगवान शिव)! मेरी रक्षा कीजिए। हे चंद्रशेखर! मेरा कल्याण और रक्षा कीजिए।',
        meaningEn:
          'Oh Chandrashekara (The Lord whose crown is the moon), please protect me. Oh Chandrashekara, please save me.',
        verses: [
          {
            id: 'chandrashekhara-ashtakam',
            title: 'Chandrashekhara Ashtakam',
            titleHi: 'चन्द्रशेखराष्टकम् (पाहि मां रक्ष माम्)',
            sanskrit:
              'चन्द्रशेखर चन्द्रशेखर चन्द्रशेखर पाहि माम् ।\nचन्द्रशेखर चन्द्रशेखर चन्द्रशेखर रक्ष माम् ॥ १ ॥',
            transliteration:
              'candraśekhara candraśekhara candraśekhara pāhi mām .\ncandraśekhara candraśekhara candraśekhara rakṣa mām .. 1 ..',
            translationEn:
              'Oh Chandrashekara (The Lord whose crown is the moon), please protect me. Oh Chandrashekara, please save me.',
            translationHi:
              'हे चंद्रशेखर (शीश पर चंद्रमा धारण करने वाले भगवान शिव)! मेरी रक्षा कीजिए, मेरी रक्षा कीजिए। हे चंद्रशेखर! मेरा कल्याण कीजिए।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/chandrashekhara-ashtakam.htm',
          },
          {
            id: 'tryambakam-yajamahe-long-life',
            title: 'Om Tryambakam Yajamahe',
            titleHi: 'महामृत्युंजय महामंत्र (दीर्घायु कवच)',
            sanskrit:
              'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
            transliteration:
              "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
            translationEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            translationHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और समस्त जीवों का पोषण करते हैं। जिस प्रकार पका हुआ फल अपनी बेल के बंधन से स्वतः मुक्त हो जाता है, उसी प्रकार हम व्याधि और मृत्यु के भय से मुक्त होकर अमरता व पूर्णायु को प्राप्त हों।',
            deity: 'Bholenath',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/tryambakam-yajamahe.htm',
          },
          {
            id: 'ayushya-suktam',
            title: 'Ayushya Suktam',
            titleHi: 'आयुष्य सूक्तम् (दीर्घायु वैदिक मंत्र)',
            sanskrit:
              'यो ब्रह्मा ब्रह्मण उज्जहार प्राणैश्शिरः कृत्तिवासाः पिनाकी ।\nईशानो देवस्स न आयुर्दधातु तस्मै जुहोमि हविषा घृतेन ॥ १ ॥',
            transliteration:
              'yō brahmā brahmaṇa ujjahāra prāṇaiśśiraḥ kṛttivāsāḥ pinākī .\nīśānō dēvassa na āyurdadhātu tasmai juhōmi haviṣā ghṛtēna .. 1 ..',
            translationEn:
              "May Ishana, that god clad in an elephant's hide and bearing the Pinaka bow, who by the vital breaths lifted up the head of Brahma from Brahman — may that god bestow long life upon us. To him I offer this oblation with clarified butter (ghee).",
            translationHi:
              'पिनाक धनुष धारण करने वाले, मृगचर्म वस्त्रधारी, सर्वेश्वर भगवान ईशान हमें दीर्घायु और उत्तम जीवन शक्ति प्रदान करें। उन परमेश्वर के निमित्त मैं घृत (घी) की पवित्र आहुति समर्पित करता हूँ।',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/ayushya-suktam.htm',
          },
        ],
      },
      {
        id: 'for-childs-health-hp',
        nameEn: "For a Child's Health",
        nameHi: 'बाल स्वास्थ्य एवं रक्षा कवच',
        headerTitleEn: "Shlokas for a Child's Health",
        headerTitleHi: 'बाल स्वास्थ्य एवं सुरक्षा श्लोक',
        subtitleEn:
          'Prayers to Shashti Devi and Bala Mukunda for health, safety, and protection',
        subtitleHi:
          'संतान की निरोगी काया, सुरक्षा एवं षष्ठी देवी व बाल कृष्ण आराधना',
        descriptionEn:
          "A child's wellbeing is a parent's constant prayer, especially through the tender early years. These stotras call on Goddess Shashti and the infant Krishna to watch over the little one. Chant them for a child's health, safety and protection from harm.",
        descriptionHi:
          'संतान का उत्तम स्वास्थ्य व सुरक्षा प्रत्येक माता-पिता की निरंतर प्रार्थना होती है। षष्ठी देवी व बाल मुकुंद भगवान श्रीकृष्ण के ये पावन श्लोक बच्चों को रोगों व अनिष्ट से बचाकर दीर्घायु, स्वास्थ्य व सुरक्षा प्रदान करते हैं।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        path: '/shloka/prayers/for-childs-health.htm',
        sanskrit:
          'करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।\nवटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥ १ ॥',
        meaningHi:
          'जो अपने करकमलों द्वारा अपने चरणकमल को पकड़कर मुखकमल में डाल रहे हैं, और वट वृक्ष के पत्ते पर शयन कर रहे हैं—उन बाल रूप श्री मुकुन्द का मैं मन ही मन स्मरण करता हूँ।',
        meaningEn:
          'My mind remembers that beautiful Bala Mukundam, who holds His lotus foot with His lotus hands and rests on the fold of a banyan leaf.',
        verses: [
          {
            id: 'sri-shashti-devi-stotram',
            title: 'Sri Shashti Devi Stotram',
            titleHi: 'श्री षष्ठी देवी स्तोत्रम् (बाल रक्षा स्तोत्र)',
            sanskrit:
              'श्रीमन्मातरमम्बिकां विधिमनोजातां सदाभीष्टदां\nस्कन्देष्टां च जगत्प्रसूं विजयदां सत्पुत्र सौभाग्यदाम् ।\nसद्रत्नाभरणान्वितां सकरुणां शुभ्रां शुभां सुप्रभां\nषष्ठांशां प्रकृतेः परं भगवतीं श्रीदेवसेनां भजे ॥ १ ॥',
            transliteration:
              'dhyānam\nśrīmanmātaramambikāṃ vidhimanōjātāṃ sadābhīṣṭadāṃ\nskandēṣṭāṃ cha jagatprasūṃ vijayadāṃ satputra saubhāgyadām ।\nsadratnābharaṇānvitāṃ sakaruṇāṃ śubhrāṃ śubhāṃ suprabhāṃ\nṣaṣṭhāṃśāṃ prakṛtēḥ paraṃ bhagavatīṃ śrīdēvasēnāṃ bhajē ॥ 1 ॥',
            translationEn:
              'Dhyānam: I worship Śrī Dēvasēnā (Shashti Devi) — the auspicious Mother, Ambikā, born from the mind of Brahmā, ever the granter of all desires; beloved of Skanda, mother of the universe, bestower of victory, good sons, and good fortune; adorned with beautiful jeweled ornaments, compassionate, pure, radiant, and auspicious — the supreme divine Goddess.',
            translationHi:
              'ब्रह्मा जी के मानस से उत्पन्न, सर्व मनोकामना पूर्ण करने वाली, भगवान स्कन्द (कार्तिकेय) की प्रियतमा, जगतमाता, सुपुत्र व सौभाग्य प्रदायिनी, दिव्य रत्नों से विभूषित, परम करुणामयी भगवती षष्ठी देवी (देवसेना) की मैं वंदना करता हूँ।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sri-shashti-devi-stotram.htm',
          },
          {
            id: 'bala-mukundashtakam',
            title: 'Bala Mukundashtakam',
            titleHi: 'बालमुकुन्दाष्टकम् (करारविन्देन पदारविन्दम्)',
            sanskrit:
              'करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।\nवटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥ १ ॥',
            transliteration:
              'karāravindena padāravindaṃ mukhāravinde viniveśayantam .\nvaṭasya patrasya puṭe śayānaṃ bālaṃ mukundaṃ manasā smarāmi .. 1 ..',
            translationEn:
              'My mind remembers that beautiful Bala Mukundam, who with his lotus-like hands holds his lotus-like feet and puts the toe in his lotus-like mouth, resting on the fold of the banyan leaf.',
            translationHi:
              'जो अपने करकमलों द्वारा अपने चरणकमल को पकड़कर मुखकमल में डाल रहे हैं, और वट वृक्ष के पत्ते पर शयन कर रहे हैं—उन बाल रूप श्री मुकुन्द (कृष्ण) का मैं मन ही मन स्मरण व ध्यान करता हूँ।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bala-mukundashtakam.htm',
          },
        ],
      },
      {
        id: 'for-eye-problems',
        nameEn: 'For Eye Trouble',
        nameHi: 'नेत्र रोग निवारण (चाक्षुषोपनिषद् / सूर्य)',
        headerTitleEn: 'Shlokas for Eye Problems',
        headerTitleHi: 'नेत्र दोष निवारण श्लोक',
        subtitleEn:
          'Invoking the Sun God and Chakshushi Vidya for bright, healthy, and clear vision',
        subtitleHi:
          'भगवान सूर्य व चाक्षुषी विद्या द्वारा आँखों की ज्योति एवं नेत्र रोग निवारण',
        descriptionEn:
          'The eyes are precious, and their care has long been placed in the hands of the Sun, lord of light and sight. These stotras and mantras invoke Surya for the health of the eyes and clear vision. Chant them facing the morning Sun, praying for bright and healthy eyes.',
        descriptionHi:
          'नेत्र अनमोल हैं और इनकी सुरक्षा व ज्योति के अधिष्ठाता भगवान सूर्य हैं। चाक्षुषी विद्या व आदित्य हृदयम् के ये पावन मंत्र आँखों के समस्त रोगों का निवारण कर दिव्य दृष्टि व तेज प्रदान करते हैं।',
        deity: 'Surya',
        image: imagePath.Surya,
        path: '/shloka/prayers/for-eye-problems.htm',
        sanskrit:
          'ॐ चक्षुः चक्षुः चक्षुः तेजः स्थिरो भव ।\nमां पाहि पाहि । त्वरितं चक्षूरोगान् शमय शमय ॥',
        meaningHi:
          'हे नेत्र ज्योति! मेरे नेत्रों का तेज स्थिर हो, मेरी रक्षा करें। शीघ्र मेरे समस्त नेत्र रोगों का शमन कर दिव्य दृष्टि प्रदान करें।',
        meaningEn:
          'Om, sight, sight, sight; may the light be steady. Protect me and swiftly heal all eye ailments, bestowing clear and radiant vision.',
        verses: [
          {
            id: 'chakshushi-vidya',
            title: 'Chakshushi Vidya',
            titleHi: 'चाक्षुषी विद्या (नेत्र रोग नाशक महामंत्र)',
            sanskrit:
              'ॐ चक्षुः चक्षुः चक्षुः तेजः स्थिरो भव ।\nमां पाहि पाहि ।\nत्वरितं चक्षूरोगान् शमय शमय ।\nमम जातरूपं तेजो दर्शय दर्शय ।\nयथाहमन्धो न स्यां तथा कल्पय कल्पय ।\nकल्याणं कुरु कुरु ॥',
            transliteration:
              'oṃ cakṣuḥ cakṣuḥ cakṣuḥ tejaḥ sthiro bhava .\nmāṃ pāhi pāhi .\ntvaritaṃ cakṣūrogān śamaya śamaya .\nmama jātarūpaṃ tejo darśaya darśaya .\nyathāhamandho na syāṃ tathā kalpaya kalpaya .\nkalyāṇaṃ kuru kuru ..',
            translationEn:
              'Om — sight, sight, sight; may the light be steady; protect me, protect me; swiftly cure the diseases of the eyes; show me the golden radiance; let me never go blind; make it so; bring wellbeing.',
            translationHi:
              'ॐ! हे नेत्र ज्योति! मेरे नेत्रों का तेज स्थिर हो, मेरी रक्षा करें, रक्षा करें। शीघ्र मेरे नेत्र रोगों का शमन करें, शमन करें। मुझे सुवर्ण जैसा दिव्य तेज दिखाएं। मैं कभी दृष्टिहीन न होऊं, ऐसा अनुग्रह करें और मेरा परम कल्याण करें।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/chakshushi-vidya.htm',
          },
          {
            id: 'aditya-hrudayam-eyes',
            title: 'Aditya Hrudayam',
            titleHi: 'आदित्य हृदयम् स्तोत्र (नेत्र ज्योति वर्धक)',
            sanskrit:
              'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥',
            transliteration:
              'tato yuddhapariśrāntaṃ samare cintayā sthitam .\nrāvaṇaṃ cāgrato dṛṣṭvā yuddhāya samupasthitam ..',
            translationEn:
              'When Rama was exhausted in battle field standing with greater sorrow and deep thought to fight against Ravana who was duly prepared for the battle, Agastya observed that.',
            translationHi:
              'रणभूमि में युद्ध से थके हुए और चिंतामग्न खड़े भगवान श्री राम को देखकर, जब सामने रावण युद्ध के लिए पुनः उपस्थित हुआ, तब महर्षि अगस्त्य ने भगवान राम के समीप आकर यह आदित्य हृदयम् उपदेश दिया।',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/aditya-hrudayam.htm',
          },
        ],
      },
      {
        id: 'for-speech-problems',
        nameEn: 'For Speech Problems',
        nameHi: 'वाणी दोष निवारण (माँ सरस्वती)',
        headerTitleEn: 'Shlokas for Speech Problems',
        headerTitleHi: 'वाणी दोष निवारण श्लोक',
        subtitleEn:
          'Prayers to Saraswati and Hayagriva for fluent, articulate, and confident speech',
        subtitleHi:
          'वाग्वादिनी, हयग्रीव एवं माधव कृपा द्वारा वाणी की स्पष्टता व दोष निवारण',
        descriptionEn:
          "Clear speech is a gift, and its want can be a quiet burden. These mantras call on Saraswati and Hayagriva — beginning with the Vagvadini mantra — and include Mukam Karoti, the grace that can 'make the mute eloquent'. Chant them for fluent, confident speech and freedom from troubles of the tongue.",
        descriptionHi:
          'स्पष्ट, मधुर एवं प्रभावशाली वाणी ईश्वर का अनुपम वरदान है। माँ सरस्वती, वाग्वादिनी, भगवान हयग्रीव व माधव के ये पावन मंत्र वाणी के समस्त दोषों (हकलाना, संकोच, तुतलाना) का निवारण कर वाक-सिद्धि व आत्मविश्वास प्रदान करते हैं।',
        deity: 'Saraswati',
        image: imagePath.Saraswati,
        path: '/shloka/prayers/for-speech-problems.htm',
        sanskrit:
          'ऐं वद वद वाग्वादिनी स्वाहा ॥\nमूकं करोति वाचालं पङ्गुं लङ्घयते गिरिम्।\nयत्कृपा तमहं वन्दे परमानन्दमाधवम्॥',
        meaningHi:
          'हे वाग्वादिनी माँ सरस्वती! मुझे स्पष्ट और मधुर वाणी का वरदान दें। भगवान माधव की कृपा से मूक भी वाचाल हो जाता है।',
        meaningEn:
          'O Vagvadini, goddess of speech, grant eloquent expression. Salutations to Lord Madhava whose grace makes the mute eloquent.',
        verses: [
          {
            id: 'vagvadini-mantra',
            title: 'Vagvadini Mantra',
            titleHi: 'वाग्वादिनी महामंत्र (सरस्वती)',
            sanskrit: 'ऐं वद वद वाग्वादिनी स्वाहा ॥',
            transliteration: 'aiṃ vada vada vāgvādinī svāhā ..',
            translationEn:
              'Aim (the seed-syllable of Saraswati) — O Vagvadini, goddess of speech, speak, speak (grant the power of speech); svāhā.',
            translationHi:
              'ऐं (सरस्वती बीज मंत्र) — हे वाणी की अधिष्ठात्री भगवती वाग्वादिनी! मुझे स्पष्ट, मधुर और प्रभावशाली वाणी प्रदान करें; स्वाहा।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/vagvadini-mantra.htm',
          },
          {
            id: 'mukam-karoti-vachalam',
            title: 'Mukam Karoti Vachalam',
            titleHi: 'मूकं करोति वाचालं (माधव स्तुति)',
            sanskrit:
              'मूकं करोति वाचालं पङ्गुं लङ्घयते गिरिम् ।\nयत्कृपा तमहं वन्दे परमानन्दमाधवम् ॥',
            transliteration:
              'mūkaṃ karoti vācālaṃ paṃguṃ laṃghayate giri .yat kṛpā tamahaṃ vaṃde paramānaṃda mādhavam ..',
            translationEn:
              'I salute that supreme bliss, Madhava, by whose mercy the dumb become most eloquent and the lame are able to jump over the mountains.',
            translationHi:
              'जिनकी असीम कृपा से गूंगा भी वाचाल (प्रखर वक्ता) बन जाता है और पंगु (लंगड़ा) भी पर्वतों को लांघ जाता है—उन परमानंद स्वरूप भगवान श्री माधव की मैं वंदना करता हूँ।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/mukam-karoti-vachalam.htm',
          },
          {
            id: 'sarasvati-namasthubyam-speech',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (वाणी वरदान)',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या और वाणी का प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
          },
          {
            id: 'sri-hayagriva-stotram-speech',
            title: 'Sri Hayagriva Stotram',
            titleHi: 'विशेषवित्पारिषदेषु नाथ (हयग्रीव जिह्वाग्र वास)',
            sanskrit:
              'विशेषवित्पारिषदेषु नाथ\nविदग्धगोष्ठी समराङ्गणेषु ।\nजिगीषतो मे कवितार्किकेन्द्रान्\nजिह्वाग्रसिंहासनमभ्युपेयाः ॥ २८ ॥',
            transliteration:
              'viśēṣavitpāriṣadēṣu nātha\nvidagdhagōṣṭhī samarāṅgaṇēṣu\njigīṣatō mē kavitārkikēndrān\njihvāgrasiṃhāsanamabhyupēyāḥ .. 28 ..',
            translationEn:
              'O Lord, in the assemblies of connoisseurs and in the battlegrounds that are the gatherings of the learned and the clever, when I seek to conquer the foremost of poets and logicians, may You ascend the lion-throne that is the tip of my tongue.',
            translationHi:
              'हे नाथ हयग्रीव! विद्वानों की सभाओं और सभा-मध्य जब मैं प्रखर वाणी व ज्ञान की अभिलाषा करूँ, तब आप कृपा करके मेरी जिह्वा के अग्रभाग रूपी सिंहासन पर विराजमान हों।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-hayagriva-stotram.htm',
          },
        ],
      },
      {
        id: 'for-bad-dreams',
        nameEn: 'Against Bad Dreams',
        nameHi: 'दुःस्वप्न निवारण (शुभ स्वप्न)',
        headerTitleEn: 'Shlokas Against Bad Dreams',
        headerTitleHi: 'दुःस्वप्न नाशक श्लोक',
        subtitleEn:
          'Quieting nightmares and placing the night under divine protection',
        subtitleHi: 'डरावने सपनों से मुक्ति, शांत निद्रा एवं सर्व भय निवारण',
        descriptionEn:
          "Troubled dreams can unsettle the night and follow us into the morning. These stotras and prayers are chanted to quiet nightmares and place the night under the Lord's protection. Say them at bedtime, or after a bad dream, to calm the mind back into rest.",
        descriptionHi:
          'अशुभ स्वप्न मन को अशांत कर देते हैं। पंचहकार स्मरण, तांत्रोक्त रात्रि सूक्त, अच्युताष्टकम् एवं भगवती निद्रा स्तुति के ये पावन मंत्र बुरे सपनों का नाश कर भयमुक्त, शांत और सुखद निद्रा प्रदान करते हैं।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        path: '/shloka/prayers/for-bad-dreams.htm',
        sanskrit:
          'रामस्कन्धं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुःस्वप्नस्तस्य नश्यति ॥',
        meaningHi:
          'भगवान श्री राम, कार्तिकेय, हनुमान जी, गरुड़ और भीम का सोते समय स्मरण करने से बुरे स्वप्नों का नाश होता है।',
        meaningEn:
          'Praying to Lords Rama, Skanda, Hanuman, Garuda, and Bhima before sleep ensures peaceful rest without bad dreams.',
        verses: [
          {
            id: 'ramaskandham-hanumantham-dreams',
            title: 'Ramaskandham Hanumantham',
            titleHi: 'रामस्कन्धं हनुमन्तं (दुःस्वप्न नाशन)',
            sanskrit:
              'रामस्कन्धं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुःस्वप्नस्तस्य नश्यति ॥',
            transliteration:
              'rāmaskandhaṃ hanumantaṃ vainateyaṃ vṛkodaraṃ\nśayane yaḥ smarennityaṃ duḥsvapnastasya naśyati',
            translationEn:
              'Praying to Lords Rama, Skanda (Subrahmanya), Hanumantha, Vainateya (Garuda), and Bhima before going to bed daily, ensures a peaceful sleep without disturbing dreams.',
            translationHi:
              'भगवान श्री राम, स्कन्द (कार्तिकेय), हनुमान जी, वैनतेय (गरुड़) और वृकोदर (भीम)—सोते समय जो नित्य इन पाँचों का स्मरण करता है, उसके बुरे स्वप्न नष्ट हो जाते हैं।',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/ramaskandham-hanumantham.htm',
          },
          {
            id: 'tantrokta-ratri-suktam',
            title: 'Tantrokta Ratri Suktam',
            titleHi: 'तान्त्रोक्तं रात्रिसूक्तम् (योगनिद्रा स्तुति)',
            sanskrit:
              'ॐ विश्वेश्वरीं जगद्धात्रीं स्थितिसंहारकारिणीम् ।\nनिद्रां भगवतीं विष्णोरतुलां तेजसः प्रभुः ॥ १ ॥',
            transliteration:
              'oṃ viśveśvarīṃ jagaddhātrīṃ sthitisaṃhārakāriṇīm .\nnidrāṃ bhagavatīṃ viṣṇoratulāṃ tejasaḥ prabhuḥ .. 1 ..',
            translationEn:
              'Om, the goddess of the entire universe (Vishweshwari), who supports all the worlds (Jagatdhatri), who is the underlying cause behind the continuance of existence as well as withdrawing of creation, who is the goddess with unparalleled tejas and is the yoganidra of Vishnu.',
            translationHi:
              'समस्त विश्व की स्वामिनी, जगत को धारण करने वाली, स्थिति और संहार करने वाली, भगवान विष्णु की अनुपम तेजस्विनी भगवती योगनिद्रा की हम स्तुति करते हैं।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/tantrokta-ratri-suktam.htm',
          },
          {
            id: 'achyutashtakam-dreams',
            title: 'Achyutashtakam',
            titleHi: 'अच्युताष्टकम् (अच्युतं केशवं)',
            sanskrit:
              'अच्युतं केशवं रामनारायणं कृष्णदामोदरं वासुदेवं हरिम् ।\nश्रीधरं माधवं गोपिकावल्लभं जानकीनायकं रामचन्द्रं भजे ॥ १ ॥',
            transliteration:
              'acyutaṃ keśavaṃ rāmanārāyaṇaṃ kṛṣṇadāmodaraṃ vāsudevaṃ harim .\nśrīdharaṃ mādhavaṃ gopikā vallabhaṃ jānakī nāyakaṃ rāmacandraṃ bhaje .. 1 ..',
            translationEn:
              'I sing in praise of Ramachandra, Who is known as Achyuta (infallible), Keshav, Rāma, Narayana, Krishna, Damodara, Vasudeva, Hari, Shridhara (possessing Lakshmi), Madhava, Gopikavallabha, and Janakinayaka.',
            translationHi:
              'अच्युत, केशव, राम, नारायण, कृष्ण, दामोदर, वासुदेव, हरि, श्रीधर, माधव, गोपिकावल्लभ और जानकीनायक भगवान श्री रामचन्द्र जी का मैं निरंतर भजन व स्मरण करता हूँ।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/achyutashtakam.htm',
          },
          {
            id: 'ya-devi-nidra-dreams',
            title: 'Ya Devi Sarvabhuteshu Nidra-Rupena',
            titleHi: 'या देवी सर्वभूतेषु निद्रारूपेण',
            sanskrit:
              'या देवी सर्वभूतेषु निद्रारूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥ ९ ॥',
            transliteration:
              'yā dēvī sarvabhūtēṣu nidrārūpēṇa saṃsthitā .\nnamastasyai namastasyai namastasyai namō namaḥ .. 9 ..',
            translationEn:
              'The Goddess who in all beings abides in the form of Nidrā (sleep) — to her, salutation, salutation, salutation and salutation.',
            translationHi:
              'जो भगवती देवी समस्त प्राणियों में निद्रा रूप में स्थित हैं, उनको नमस्कार, उनको नमस्कार, उनको बारंबार नमस्कार है।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/devi-aparajita-stotram.htm',
          },
        ],
      },
      {
        id: 'for-protection',
        nameEn: 'For Protection from Harm',
        nameHi: 'सर्व संकट एवं अनिष्ट रक्षा',
        headerTitleEn: 'Shlokas for Protection',
        headerTitleHi: 'सर्व संकट व अनिष्ट रक्षा श्लोक',
        subtitleEn:
          'Protective stotras and armour-mantras (kavacha) of Narasimha, Hanuman, Durga, and Rama',
        subtitleHi:
          'नृसिंह, हनुमान, दुर्गा व राम रक्षा कवच द्वारा सर्व संकट निवारण',
        descriptionEn:
          "There are times we feel exposed to danger, ill will or unseen harm, and long for a shield. These are the protective stotras and armour-mantras (kavacha), calling on Narasimha, Hanuman and Rama to stand guard around us. Chant one whenever you feel unsafe, wrapping yourself in the Lord's protection.",
        descriptionHi:
          'जब भी हमें किसी संकट, नकारात्मक ऊर्जा, शत्रु-भय या अनहोनी की आशंका हो, ये पावन रक्षा कवच व स्तोत्र भगवान नृसिंह, हनुमान जी, श्री राम व भगवती दुर्गा का अभेद्य सुरक्षा घेरा हमारे चारों ओर निर्मित करते हैं।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        path: '/shloka/prayers/for-protection.htm',
        sanskrit:
          'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम् ।\nनृसिंहं भीषणं भद्रं मृत्योर् मृत्युं नमाम्यहम् ॥',
        meaningHi:
          'जो उग्र, परम वीर, सर्वव्यापी महाविष्णु, समस्त दिशाओं में प्रज्वलित तेज वाले, भय का नाश करने वाले फिर भी परम कल्याणकारी हैं—उन भगवान नृसिंह को मैं नमन करता हूँ।',
        meaningEn:
          'To that ferocious, valorous form of Maha-Vishnu blazing in all directions, terrifying to evil yet supremely auspicious, the death of death Himself, I bow down.',
        verses: [
          {
            id: 'ugram-veeram-maha-vishnum',
            title: 'Ugram Veeram Maha Vishnum',
            titleHi: 'नृसिंह महामंत्र (उग्रं वीरं)',
            sanskrit:
              'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम् ।\nनृसिंहं भीषणं भद्रं मृत्योर् मृत्युं नमाम्यहम् ॥',
            transliteration:
              'ōṁ ugraṁ vīraṁ mahāviṣṇuṁ jvalantaṁ sarvatōmukham |\nnr̥siṁhaṁ bhīṣaṇaṁ bhadraṁ mr̥tyōr mr̥tyuṁ namāmyaham ||',
            translationEn:
              'Om, To that form of Lord Maha-Vishnu; Which is Ugra (Ferocious) and Vira (Exhibiting great Prowess); And which is like a Blazing Fire facing all Directions, To that form of Lord Nrisimha, Who is Bhishana (Terrifying) but Bhadra (Auspicious); Who is the Death of Death; I Bow down to that Form.',
            translationHi:
              'जो उग्र, परम वीर, सर्वव्यापी महाविष्णु, समस्त दिशाओं में प्रज्वलित तेज वाले, भय का नाश करने वाले फिर भी परम कल्याणकारी, तथा मृत्यु की भी मृत्यु स्वरूप हैं—उन भगवान श्री नृसिंह को मैं नमन करता हूँ।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/ugram-veeram-maha-vishnum.htm',
          },
          {
            id: 'hanuman-bajrang-baan',
            title: 'Hanuman Bajrang Baan',
            titleHi: 'बजरंग बाण (अब बिलम्ब केहि कारन)',
            sanskrit:
              'अब बिलम्ब केहि कारन स्वामी । कृपा करहु उर अन्तरयामी ॥\nजय जय लखन प्रान के दाता । आतुर ह्वै दुख करहु निपाता ॥',
            transliteration:
              'aba bilamba kēhi kārana svāmī । kṛpā karahu ura antarayāmī ॥\njaya jaya lakhana prāna kē dātā । ātura hvai dukha karahu nipātā ॥',
            translationEn:
              "Why do you delay now, O Lord? Have mercy, O inner witness of the heart! Victory, victory to the giver of Lakṣmaṇa's life — swiftly come and destroy this suffering.",
            translationHi:
              'हे स्वामी! अब विलंब किस कारण से है? हे हृदय के अंतर्यामी, मुझ पर कृपा कीजिए। लक्ष्मण जी को प्राण दान देने वाले हे पवनपुत्र हनुमान! आपकी जय हो, शीघ्र पधारकर मेरे कष्टों का नाश कीजिए।',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/hanuman-bajrang-baan.htm',
          },
          {
            id: 'shulena-pahi-no-devi',
            title: 'Shulena Pahi No Devi',
            titleHi: 'शूलेन पाहि नो देवि (दुर्गा रक्षा मंत्र)',
            sanskrit:
              'शूलेन पाहि नो देवि पाहि खड्गेन चाम्बिके ।\nघण्टास्वनेन नः पाहि चापज्यानिःस्वनेन च ॥',
            transliteration:
              'śūlena pāhi no devi pāhi khaḍgena cāmbike .\nghaṇṭāsvanena naḥ pāhi cāpajyāniḥsvanena ca ..',
            translationEn:
              'Protect us with your trident, O Devi; protect us with your sword, O Ambika; protect us with the sound of your bell and with the twang of your bowstring.',
            translationHi:
              'हे देवी! अपने त्रिशूल से हमारी रक्षा करें। हे अम्बिके! अपनी तलवार से हमारी रक्षा करें। अपने घंटे की पावन ध्वनि और धनुष की प्रत्यंचा की टंकार से हमारी चारों ओर से रक्षा करें।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/shulena-pahi-no-devi.htm',
          },
          {
            id: 'sri-rama-raksha-stotram-prot',
            title: 'Sri Rama Raksha Stotram',
            titleHi: 'श्रीरामरक्षास्तोत्रम् (संकल्प व विनियोग)',
            sanskrit:
              'ॐ श्रीगणेशाय नमः ॥\nअस्य श्रीरामरक्षास्तोत्रमन्त्रस्य । बुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता । अनुष्टुप् छन्दः ।\nसीता शक्तिः । श्रीमद् हनुमान कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥',
            transliteration:
              'oṃ śrīgaṇeśāya namaḥ ..\nasya śrīrāmarakṣāstotramantrasya . budhakauśika ṛṣiḥ .\nśrīsītārāmachandro devatā . anuṣṭup chandaḥ .\nsītā śaktiḥ . śrīmad hanumāna kīlakam .\nśrīrāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ ..',
            translationEn:
              'We start with salutations to Lord Ganesha. The author of this hymn seeking Lord Rama’s protection is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is eight syllables in a quarter stanza. The power is Sita. The center is Shri Hanuman. The purpose is devotion to Lord Shri Ramachandra.',
            translationHi:
              'श्री गणेशाय नमः। इस श्री राम रक्षा स्तोत्र मंत्र के ऋषि बुधकौशिक हैं, देवता श्री सीतारामचन्द्र हैं, छन्द अनुष्टुप् है, शक्ति सीता हैं, कीलक श्री हनुमान हैं और श्री रामचन्द्र जी की प्रसन्नता व सर्व रक्षा हेतु इसका पाठ किया जाता है।',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-raksha-stotram.htm',
          },
          {
            id: 'sri-narasimha-kavacham',
            title: 'Sri Narasimha Kavacham',
            titleHi: 'श्री नृसिंह कवचम् (प्रह्लादोदित)',
            sanskrit:
              'नृसिंहकवचं वक्ष्ये प्रह्लादेनोदितं पुरा ।\nसर्वरक्षाकरं पुण्यं सर्वोपद्रवनाशनम् ॥ १ ॥',
            transliteration:
              'nr̥siṁhakavacaṁ vakṣyē prahlādēnōditaṁ purā |\nsarvarakṣākaraṁ puṇyaṁ sarvōpadravanāśanam || 1 ||',
            translationEn:
              'I shall now recite the Narasimha Kavacha, which was formerly spoken by Prahlada. It bestows complete protection, is supremely meritorious, and destroys all calamities and afflictions.',
            translationHi:
              'अब मैं उस नृसिंह कवच का वर्णन करता हूँ, जिसे पूर्वकाल में भक्त प्रह्लाद ने कहा था। यह समस्त प्रकार से रक्षा करने वाला, परम पवित्र और सभी उपद्रवों व संकटों का नाश करने वाला है।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-narasimha-kavacham.htm',
          },
          {
            id: 'hanuman-kavacham',
            title: 'Hanuman Kavacham',
            titleHi: 'श्री हनुमत् कवचम् (वसिष्ठोक्त महामंत्र)',
            sanskrit:
              'अस्य श्री हनुमत् कवचस्तोत्रमहामन्त्रस्य वसिष्ठ ऋषिः अनुष्टुप् छन्दः श्री हनुमान् देवता मारुतात्मज इति बीजं अञ्जनासूनुरिति शक्तिः वायुपुत्र इति कीलकं हनुमत्प्रसाद सिद्ध्यर्थे जपे विनियोगः ॥',
            transliteration:
              'asya śrī hanumat kavachastōtramahāmantrasya vasiṣṭha ṛṣiḥ anuṣṭup Chandaḥ śrī hanumān dēvatā mārutātmaja iti bījaṃ añjanāsūnuriti śaktiḥ vāyuputra iti kīlakaṃ hanumatprasāda siddhyarthē japē viniyōgaḥ ॥',
            translationEn:
              'Dedication (Viniyoga): Of this Śrī Hanumat Kavaca Stotram Mahāmantra: the seer is Vasiṣṭha; the metre is Anuṣṭup; the deity is Śrī Hanumān; the seed-syllable is "Mārutātmaja"; the power is "Añjanāsūnu"; the pin is "Vāyuputra". Its application is declared for the attainment of Hanumān\'s grace.',
            translationHi:
              'इस श्री हनुमत् कवच स्तोत्र महामंत्र के ऋषि वसिष्ठ हैं, छन्द अनुष्टुप् है, देवता श्री हनुमान हैं, बीज मारुतात्मज है, शक्ति अंजनासूनु है, कीलक वायुपुत्र है और हनुमान जी की कृपा व सर्व रक्षा सिद्धि हेतु इसका विनियोग किया जाता है।',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/hanuman-kavacham.htm',
          },
        ],
      },
      {
        id: 'for-safe-travel',
        nameEn: 'For Safe Travel',
        nameHi: 'सुरक्षित यात्रा (मार्गबन्धु एवं स्वस्ति मन्त्र)',
        headerTitleEn: 'Shlokas for Safe Travel',
        headerTitleHi: 'सुरक्षित यात्रा एवं सकुशल वापसी हेतु श्लोक',
        subtitleEn:
          'A journey takes us from the safety of home onto the open road. These prayers call on the Lord as guardian of the way for a safe trip and safe return.',
        subtitleHi:
          'घर से यात्रा पर निकलते समय मार्ग में रक्षा, दुर्घटना निवारण एवं सकुशल वापसी हेतु भगवान शिव, वैदिक स्वस्ति व विघ्नहर्ता गणेश के पावन श्लोक।',
        deity: 'Shiva',
        image: imagePath.shiva,
        sanskrit: 'शंभो महादेव देव शिव शंभो महादेव देवेश शंभो\nशंभो महादेव देव',
        transliteration:
          'śaṃbho mahādeva deva śiva śaṃbho mahādeva deveśa śaṃbho\nśaṃbho mahādeva deva',
        meaningEn:
          'Prostrations to He who blesses us with prosperity, Prostrations to the greatest God, Prostrations to the abode of peace, Prostrations to Him, who blesses us with riches, And Prostrations to him who is the God of Gods.',
        meaningHi:
          'कल्याण और समृद्धि प्रदान करने वाले, देवाधिदेव महादेव, शान्ति के धाम और समस्त देवताओं के ईश्वर भगवान शिव को हमारा बारम्बार प्रणाम।',
        verses: [
          {
            id: 'margabandhu-stotram',
            title: 'Margabandhu Stotram',
            titleHi: 'मार्गबन्धु स्तोत्रम् (शिव स्तुति)',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/margabandhu-stotram.htm',
            sanskrit:
              'शंभो महादेव देव शिव शंभो महादेव देवेश शंभो\nशंभो महादेव देव',
            transliteration:
              'śaṃbho mahādeva deva śiva śaṃbho mahādeva deveśa śaṃbho\nśaṃbho mahādeva deva',
            translationEn:
              'Prostrations to He who blesses us with prosperity, Prostrations to the greatest God, Prostrations to the abode of peace, Prostrations to Him, who blesses us with riches, And Prostrations to him who is the God of Gods.',
            translationHi:
              'कल्याण और समृद्धि प्रदान करने वाले, देवाधिदेव महादेव, शान्ति के धाम और समस्त देवताओं के ईश्वर भगवान शिव को हमारा बारम्बार प्रणाम।',
            meaningEn:
              'Prostrations to He who blesses us with prosperity, Prostrations to the greatest God, Prostrations to the abode of peace, Prostrations to Him, who blesses us with riches, And Prostrations to him who is the God of Gods.',
            meaningHi:
              'कल्याण और समृद्धि प्रदान करने वाले, देवाधिदेव महादेव, शान्ति के धाम और समस्त देवताओं के ईश्वर भगवान शिव को हमारा बारम्बार प्रणाम। (मार्गबन्धु रूप में शिव जी मार्ग के पथप्रदर्शक एवं रक्षक हैं।)',
          },
          {
            id: 'pathi-svasti',
            title: 'Pathi Svasti',
            titleHi: 'पथि स्वस्ति (ऋग्वैदिक यात्रा मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/pathi-svasti.htm',
            sanskrit:
              'स्वस्ति पन्थामनु चरेम सूर्याचन्द्रमसाविव ।\nपुनर्ददताघ्नता जानता सं गमेमहि ॥',
            transliteration:
              'svasti panthāmanu carema sūryācandramasāviva .\npunardadatāghnatā jānatā saṃ gamemahi ..',
            translationEn:
              'May we travel our path in well-being (svasti), like the sun and the moon who cross the sky and return; may we come together again with those who are giving, gentle (non-harming), and who know us — a prayer for a safe journey and a safe return.',
            translationHi:
              'हम सूर्य और चन्द्रमा के समान अपने मार्ग पर निर्बाध और कल्याणमय रीति से आगे बढ़ें; और हमें पुनः देने वाले, अहिंसक एवं हितैषी स्वजनों का संग प्राप्त हो — सुरक्षित यात्रा और सकुशल घर वापसी की वैदिक प्रार्थना।',
            meaningEn:
              'May we travel our path in well-being (svasti), like the sun and the moon who cross the sky and return; may we come together again with those who are giving, gentle (non-harming), and who know us — a prayer for a safe journey and a safe return.',
            meaningHi:
              'हम सूर्य और चन्द्रमा के समान अपने मार्ग पर निर्बाध और कल्याणमय रीति से आगे बढ़ें; और हमें पुनः देने वाले, अहिंसक एवं हितैषी स्वजनों का संग प्राप्त हो — सुरक्षित यात्रा और सकुशल घर वापसी की वैदिक प्रार्थना।',
          },
          {
            id: 'vakratunda-mahakaya-travel',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (विघ्न निवारण)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha .\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ..',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks and travels, always and in all undertakings.',
            translationHi:
              'हे वक्रतुण्ड (घुमावदार सूंड वाले), विशाल शरीर वाले तथा करोड़ों सूर्यों के समान तेजस्वी भगवान श्री गणेश! आप मेरी यात्रा एवं समस्त कार्यों को सदा निर्विघ्न संपन्न करें।',
            meaningEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks and travels, always and in all undertakings.',
            meaningHi:
              'हे वक्रतुण्ड (घुमावदार सूंड वाले), विशाल शरीर वाले तथा करोड़ों सूर्यों के समान तेजस्वी भगवान श्री गणेश! आप मेरी यात्रा एवं समस्त कार्यों को सदा निर्विघ्न संपन्न करें।',
          },
        ],
      },
      {
        id: 'in-a-natural-calamity',
        nameEn: 'In a Natural Calamity',
        nameHi: 'प्राकृतिक आपदा निवारण एवं शान्ति',
        headerTitleEn: 'Shlokas for a Natural Calamity',
        headerTitleHi: 'प्राकृतिक आपदा निवारण एवं विश्व शान्ति श्लोक',
        subtitleEn:
          'Sometimes danger comes suddenly and on a scale far beyond us — a storm, a flood, a calamity. In such moments we take refuge in the Lord, the remover of all calamities. Chant these stotras and prayers for protection and courage when danger strikes.',
        subtitleHi:
          'तूफान, बाढ़, भूकंप या किसी भी अप्रत्याशित संकट के समय अभय, सुरक्षा व शान्ति प्रदान करने वाले प्रभु श्री राम के आपदा नाशक एवं वैदिक शान्ति मन्त्र।',
        deity: 'Rama',
        image: imagePath.Rama,
        sanskrit:
          'आपदामपहर्तारं दातारं सर्वसम्पदाम्।\nलोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम्॥',
        transliteration:
          'āpadāmapahartāraṃ dātāraṃ sarvasampadām .\nlokābhirāmaṃ śrīrāmaṃ bhūyo bhūyo namāmyaham ..',
        meaningEn:
          'I repeatedly bow to Śrī Rāma, the remover of all difficulties and the bestower of all wealth, who is delightful to all the worlds.',
        meaningHi:
          'समस्त आपदाओं और विपत्तियों को हरने वाले, संपूर्ण संपत्तियों और अभय को प्रदान करने वाले, संपूर्ण जगत् के प्रिय भगवान श्री राम को मैं बारंबार प्रणाम करता हूँ।',
        verses: [
          {
            id: 'aapadhaam-apahartharam',
            title: 'Aapadhaam Apahartharam',
            titleHi: 'आपदामपहर्तारम् (श्री राम आपदा नाशक श्लोक)',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/aapadhaam-apahartharam.htm',
            sanskrit:
              'आपदामपहर्तारं दातारं सर्वसम्पदाम्\nलोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम्',
            transliteration:
              'āpadāmapahartāraṃ dātāraṃ sarvasampadām\nlokābhirāmaṃ śrīrāmaṃ bhūyo bhūyo namāmyaham',
            translationEn:
              'I repeatedly bow to Śrī Rāma, the remover of all difficulties and the bestower of all wealth, who is delightful to all the worlds.',
            translationHi:
              'समस्त आपदाओं और संकटों को हरने वाले, संपूर्ण सुख-समृद्धि प्रदान करने वाले, त्रिभुवन-प्रिय भगवान श्री राम को मैं बार-बार प्रणाम करता हूँ।',
            meaningEn:
              'I repeatedly bow to Śrī Rāma, the remover of all difficulties and the bestower of all wealth, who is delightful to all the worlds.',
            meaningHi:
              'समस्त आपदाओं और संकटों को हरने वाले, संपूर्ण सुख-समृद्धि प्रदान करने वाले, त्रिभुवन-प्रिय भगवान श्री राम को मैं बार-बार प्रणाम करता हूँ।',
          },
          {
            id: 'sri-rama-raksha-stotram-calamity',
            title: 'Sri Rama Raksha Stotram',
            titleHi: 'श्रीरामरक्षास्तोत्रम् (संकट निवारण)',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-raksha-stotram.htm',
            sanskrit:
              'ॐ श्रीगणेशाय नमः ॥\nअस्य श्रीरामरक्षास्तोत्रमन्त्रस्य । बुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता । अनुष्टुप् छन्दः ।\nसीता शक्तिः । श्रीमद् हनुमान कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥',
            transliteration:
              'oṃ śrīgaṇeśāya namaḥ ..\nasya śrīrāmarakṣāstotramantrasya . budhakauśika ṛṣiḥ .\nśrīsītārāmachandro devatā . anuṣṭup chandaḥ .\nsītā śaktiḥ . śrīmad hanumāna kīlakam .\nśrīrāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ ..',
            translationEn:
              'We start with the salutations to the Lord Ganesha. The author of this hymn (stotra), seeking Lord Rama’s protection, is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is eight syllables in a quarter stanza. The power (energy of mother nature) is Sita. The center is Shri Hanuman. The purpose of reciting this mantra of Ramaraksha stotram is for the devotion to Lord Shri Ramachandra.',
            translationHi:
              'श्री गणेश जी को प्रणाम। इस श्रीरामरक्षा स्तोत्र के ऋषि बुधकौशिक हैं, देवता श्री सीतारामचन्द्र हैं, अनुष्टुप् छन्द है, सीता शक्ति हैं, श्री हनुमान जी कीलक हैं और श्रीराम की कृपा प्राप्ति हेतु इसका पाठ किया जाता है।',
            meaningEn:
              'We start with the salutations to the Lord Ganesha. The author of this hymn (stotra), seeking Lord Rama’s protection, is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is eight syllables in a quarter stanza. The power (energy of mother nature) is Sita. The center is Shri Hanuman. The purpose of reciting this mantra of Ramaraksha stotram is for the devotion to Lord Shri Ramachandra.',
            meaningHi:
              'श्री गणेश जी को प्रणाम। इस श्रीरामरक्षा स्तोत्र के ऋषि बुधकौशिक हैं, देवता श्री सीतारामचन्द्र हैं, अनुष्टुप् छन्द है, सीता शक्ति हैं, श्री हनुमान जी कीलक हैं और श्रीराम की कृपा प्राप्ति हेतु इसका पाठ किया जाता है।',
          },
          {
            id: 'sarve-bhavanthu-sukhinah',
            title: 'Sarve Bhavanthu Sukhinah',
            titleHi: 'सर्वे भवन्तु सुखिनः (विश्व कल्याण मन्त्र)',
            deity: 'Universal',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/sarve-bhavanthu-sukhinah.htm',
            sanskrit:
              'ॐ सर्वे भवन्तु सुखिनः\nसर्वे सन्तु निरामयाः\nसर्वे भद्राणि पश्यन्तु\nमा कश्चिद्दुःखभाग्भवेत्\nॐ शान्तिः शान्तिः शान्तिः',
            transliteration:
              'oṃ sarve bhavantu sukhinaḥ\nsarve santu nirāmayāḥ\nsarve bhadrāṇi paśyantu\nmā kaścid duḥkha bhāgbhavet\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Oṃ, May all beings be happy, may all be free from illness, may all witness auspiciousness, may no one suffer from sorrow. Oṃ, peace, peace, peace.',
            translationHi:
              'सभी प्राणी सुखी हों, सभी रोग व संकट से मुक्त (निरोगी) हों, सभी का कल्याण हो और कोई भी दुःख का भागी न बने। ॐ शान्तिः शान्तिः शान्तिः।',
            meaningEn:
              'Oṃ, May all beings be happy, may all be free from illness, may all witness auspiciousness, may no one suffer from sorrow. Oṃ, peace, peace, peace.',
            meaningHi:
              'सभी प्राणी सुखी हों, सभी रोग व संकट से मुक्त (निरोगी) हों, सभी का कल्याण हो और कोई भी दुःख का भागी न बने। ॐ शान्तिः शान्तिः शान्तिः।',
          },
          {
            id: 'dyauh-shaantir-antarikssam',
            title: 'Dyauh Shaantir Antarikssam',
            titleHi: 'द्यौः शान्तिरन्तरिक्षं शान्तिः (वैदिक शान्ति मन्त्र)',
            deity: 'Vedic',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/dyauh-shaantir-antarikssam.htm',
            sanskrit:
              'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः\nपृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः\nसर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ dyauḥ śāntirantarikṣaṃ śāntiḥ\npṛthivī śāntirāpaḥ śāntiroṣadhayaḥ śāntiḥ .\nvanaspatayaḥ śāntirviśvedevāḥ śāntirbrahma śāntiḥ\nsarvaṃ śāntiḥ śāntireva śāntiḥ sā mā śāntiredhi ..\noṃ śāntiḥ śāntiḥ śāntiḥ ..',
            translationEn:
              'May peace radiate in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Om peace, peace, peace!',
            translationHi:
              'द्युलोक में शान्ति हो, अंतरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त विश्व-देवों में शान्ति हो, परब्रह्म में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति हमें प्राप्त हो। ॐ शान्तिः शान्तिः शान्तिः।',
            meaningEn:
              'May peace radiate in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Om peace, peace, peace!',
            meaningHi:
              'द्युलोक में शान्ति हो, अंतरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त विश्व-देवों में शान्ति हो, परब्रह्म में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति हमें प्राप्त हो। ॐ शान्तिः शान्तिः शान्तिः।',
          },
        ],
      },
    ],
  },
  'money-work-studies': {
    id: 'occasion-work-money',
    slug: 'money-work-studies',
    titleEn: 'Work & Money',
    titleHi: 'कर्म एवं धन-समृद्धि',
    descriptionEn:
      'For worldly life and effort — livelihood, wealth, relief from debt, business, and success at work.',
    descriptionHi:
      'दैनिक आजीविका, व्यापार, धन-धान्य समृद्धि, ऋणमुक्ति एवं कार्यक्षेत्र में सफलता हेतु श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/work-money.jpeg',
    path: '/shloka/prayers/money-work-studies.htm',
    items: [
      {
        id: 'for-money-problems',
        nameEn: 'For Money Troubles',
        nameHi: 'आर्थिक संकट निवारण (कुबेर व कनकधारा मन्त्र)',
        headerTitleEn: 'Shlokas for Money Problems',
        headerTitleHi: 'आर्थिक तंगी एवं धन-समृद्धि प्राप्ति श्लोक',
        subtitleEn:
          'Money worries can weigh on the mind and disturb our peace. These mantras and stotras turn to Lakshmi, Kubera, and Narasimha for steady support and abundance.',
        subtitleHi:
          'आर्थिक तंगी व चिंताओं को दूर करने और घर में स्थायी सुख-समृद्धि हेतु धन के अधिपति कुबेर, माँ कनकधारा लक्ष्मी और भगवान लक्ष्मीनृसिंह के सिद्ध मन्त्र।',
        deity: 'Laxmi',
        image: imagePath.Laxmi,
        sanskrit:
          'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
        transliteration:
          'oṃ yakṣāya kuberāya vaiśravaṇāya dhanadhānyādhipataye dhanadhānyasamṛddhiṃ me dehi dāpaya svāhā ..',
        meaningEn:
          'Om, salutations to Kubera, lord of the Yakshas, son of Vishrava, master of all wealth and grain — grant me abundance of wealth and grain; bestow it and make it flow to me. Svāhā.',
        meaningHi:
          'ॐ यक्षों के अधिपति, विश्रवा के पुत्र तथा धन-धान्य के स्वामी कुबेर को नमस्कार। हे कुबेर देव! मुझे धन और धान्य की समृद्धि प्रदान करें और उसे मेरे पास निरंतर बनाए रखें। स्वाहा।',
        verses: [
          {
            id: 'kubera-mantra',
            title: 'Kubera Mantra',
            titleHi: 'कुबेर मन्त्र (धन-धान्य समृद्धि)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/kubera-mantra.htm',
            sanskrit:
              'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
            transliteration:
              'oṃ yakṣāya kuberāya vaiśravaṇāya dhanadhānyādhipataye dhanadhānyasamṛddhiṃ me dehi dāpaya svāhā ..',
            translationEn:
              'Om, salutations to Kubera, lord of the Yakshas, son of Vishrava, master of all wealth and grain — grant me abundance of wealth and grain; bestow it and make it flow to me. Svāhā.',
            translationHi:
              'ॐ यक्षों के अधिपति, विश्रवा के पुत्र तथा धन-धान्य के स्वामी कुबेर को नमस्कार। हे कुबेर देव! मुझे धन और धान्य की समृद्धि प्रदान करें और उसे निरंतर प्रवाहित करें। स्वाहा।',
            meaningEn:
              'Om, salutations to Kubera, lord of the Yakshas, son of Vishrava, master of all wealth and grain — grant me abundance of wealth and grain; bestow it and make it flow to me. Svāhā.',
            meaningHi:
              'ॐ यक्षों के अधिपति, विश्रवा के पुत्र तथा धन-धान्य के स्वामी कुबेर को नमस्कार। हे कुबेर देव! मुझे धन और धान्य की समृद्धि प्रदान करें और उसे निरंतर प्रवाहित करें। स्वाहा।',
          },
          {
            id: 'lakshmi-narasimha-karavalambam',
            title: 'Lakshmi Narasimha Karavalambam',
            titleHi: 'लक्ष्मीनृसिंह करावलम्बम् स्तोत्रम्',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/lakshmi-narasimha-karavalambam.htm',
            sanskrit:
              'श्रीमत्पयोनिधिनिकेतन चक्रपाणे\nभोगीन्द्रभोगमणिरञ्जितपुण्यमूर्ते ।\nयोगीश शाश्वत शरण्य भवाब्धिपोत\nलक्ष्मीनृसिंह मम देहि करावलम्बम् ॥१॥',
            transliteration:
              'śrīmatpayonidhiniketana cakrapāṇe\nbhogīndrabhogamaṇirañjitapuṇyamūrte .\nyogīśa śāśvata śaraṇya bhavābdhipota\nlakṣmīnṛsiṃha mama dehi karāvalambam ..1..',
            translationEn:
              '(Salutations to Sri Lakshmi Narasimha) who resides on the ocean of milk, which is filled with Sri (beauty and auspiciousness), holding a chakra (discus) on his hand, with his divine face shining with the divine light emanating from the gems on the hoods of serpent Adi Sesha, who is the lord of yoga, and eternal, and giver of refuge to the devotees like a boat over the ocean of samsara (worldly existence), O Lakshmi Narasimha, please give me your refuge by holding me with your divine hands.',
            translationHi:
              'क्षीरसागर में निवास करने वाले, हाथों में सुदर्शन चक्र धारण करने वाले, शेषनाग के फणों की मणियों की कान्ति से सुशोभित, योगियों के स्वामी और संसार रूपी भवसागर को पार कराने वाली नौका स्वरूप हे भगवान लक्ष्मीनृसिंह! मुझे अपने कर-कमलों का आश्रय (सहारा) प्रदान कीजिए।',
            meaningEn:
              '(Salutations to Sri Lakshmi Narasimha) who resides on the ocean of milk, which is filled with Sri (beauty and auspiciousness), holding a chakra (discus) on his hand, with his divine face shining with the divine light emanating from the gems on the hoods of serpent Adi Sesha, who is the lord of yoga, and eternal, and giver of refuge to the devotees like a boat over the ocean of samsara (worldly existence), O Lakshmi Narasimha, please give me your refuge by holding me with your divine hands.',
            meaningHi:
              'क्षीरसागर में निवास करने वाले, हाथों में सुदर्शन चक्र धारण करने वाले, शेषनाग के फणों की मणियों की कान्ति से सुशोभित, योगियों के स्वामी और संसार रूपी भवसागर को पार कराने वाली नौका स्वरूप हे भगवान लक्ष्मीनृसिंह! मुझे अपने कर-कमलों का आश्रय (सहारा) प्रदान कीजिए।',
          },
          {
            id: 'kanakadhara-stotram',
            title: 'Kanakadhara Stotram',
            titleHi: 'कनकधारा स्तोत्रम् (आदि शंकराचार्य कृत)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/kanakadhara-stotram.htm',
            sanskrit:
              'अङ्गं हरेः पुलकभूषणमाश्रयन्ती\nभृङ्गाङ्गनेव मुकुलाभरणं तमालम् ।\nअङ्गीकृताखिलविभूतिरपाङ्गलीला\nमाङ्गल्यदास्तु मम मङ्गळदेवतायाः ॥ १॥',
            transliteration:
              'aṅgaṃ hareḥ pulakabhūṣaṇamāśrayantī\nbhṛṅgāṅganeva mukulābharaṇaṃ tamālam .\naṅgīkṛtākhilavibhūtirapāṅgalīlā\nmāṅgalyadāstu mama maṅgal̤adevatāyāḥ .. 1..',
            translationEn:
              'To the Hari who wears supreme happiness as ornament, the goddess Lakshmi is attracted like the black bees getting attracted to the unopened buds of black Tamala tree, let her who is the goddess of all good things, grant me a glance that will bring prosperity.',
            translationHi:
              'जिस प्रकार भ्रमरी खिले हुए तमाल वृक्ष पर मँडराती है, उसी प्रकार भगवान श्रीहरि के आनन्दमय स्वरूप की ओर आकर्षित रहने वाली और समस्त ऐश्वर्यों को देने वाली माँ महालक्ष्मी की कृपादृष्टि मेरे लिए सर्वदा मंगलकारिणी और समृद्धिदायक हो।',
            meaningEn:
              'To the Hari who wears supreme happiness as ornament, the goddess Lakshmi is attracted like the black bees getting attracted to the unopened buds of black Tamala tree, let her who is the goddess of all good things, grant me a glance that will bring prosperity.',
            meaningHi:
              'जिस प्रकार भ्रमरी खिले हुए तमाल वृक्ष पर मँडराती है, उसी प्रकार भगवान श्रीहरि के आनन्दमय स्वरूप की ओर आकर्षित रहने वाली और समस्त ऐश्वर्यों को देने वाली माँ महालक्ष्मी की कृपादृष्टि मेरे लिए सर्वदा मंगलकारिणी और समृद्धिदायक हो।',
          },
        ],
      },
      {
        id: 'for-debt-relief',
        nameEn: 'For Debt Relief',
        nameHi: 'ऋण मुक्ति (ऋणविमोचन स्तोत्र)',
        headerTitleEn: 'Shlokas for Debt Relief',
        headerTitleHi: 'ऋण एवं कर्ज मुक्ति श्लोक',
        subtitleEn:
          'The burden of debt can feel like a weight that never lifts. These are the Runa Vimochana stotras — debt-freeing prayers to Narasimha, Ganesha, and Angaraka.',
        subtitleHi:
          'कर्ज व ऋण के भारी बोझ से मुक्ति और आर्थिक स्वाधीनता हेतु भगवान नृसिंह, विघ्नहर्ता गणेश और मंगल देव के पावन ऋणविमोचन स्तोत्र।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        sanskrit:
          'देवताकार्यसिद्धयर्थं सभास्तम्भसमुद्भवम् ।\nश्रीनृसिंह महावीरं नमामि ऋणमुक्तये ॥ १॥',
        transliteration:
          'devatākāryasiddhayarthaṃ sabhāstambhasamudbhavam .\nśrīnṛsiṃha mahāvīraṃ namāmi ṛṇamuktaye ..1..',
        meaningEn:
          'I bow to Sri Narasimha, the great hero, who manifested from the pillar of the assembly hall for the accomplishment of the divine purpose, that I may be freed from all debts.',
        meaningHi:
          'देवताओं के कार्य की सिद्धि हेतु राजसभा के खंभे से प्रकट होने वाले, परम पराक्रमी भगवान श्री नृसिंह को समस्त ऋणों (कर्ज) से मुक्ति हेतु मैं प्रणाम करता हूँ।',
        verses: [
          {
            id: 'runa-vimochana-narasimha-stotram',
            title: 'Runa Vimochana Narasimha Stotram',
            titleHi: 'ऋणविमोचन नृसिंह स्तोत्रम्',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/runa-vimochana-narasimha-stotram.htm',
            sanskrit:
              'देवताकार्यसिद्धयर्थं सभास्तम्भसमुद्भवम् ।\nश्रीनृसिंह महावीरं नमामि ऋणमुक्तये ॥ १॥',
            transliteration:
              'devatākāryasiddhayarthaṃ sabhāstambhasamudbhavam .\nśrīnṛsiṃha mahāvīraṃ namāmi ṛṇamuktaye ..1..',
            translationEn:
              'I bow to Sri Narasimha, the great hero, who manifested from the pillar of the assembly hall for the accomplishment of the divine purpose, that I may be freed from all debts.',
            translationHi:
              'देवताओं के कार्य की सिद्धि हेतु राजसभा के खंभे से प्रकट होने वाले, परम पराक्रमी भगवान श्री नृसिंह को समस्त ऋणों (कर्ज) से मुक्ति हेतु मैं प्रणाम करता हूँ।',
            meaningEn:
              'I bow to Sri Narasimha, the great hero, who manifested from the pillar of the assembly hall for the accomplishment of the divine purpose, that I may be freed from all debts.',
            meaningHi:
              'देवताओं के कार्य की सिद्धि हेतु राजसभा के खंभे से प्रकट होने वाले, परम पराक्रमी भगवान श्री नृसिंह को समस्त ऋणों (कर्ज) से मुक्ति हेतु मैं प्रणाम करता हूँ।',
          },
          {
            id: 'runa-vimochana-ganapati-stotram',
            title: 'Runa Vimochana Ganapati Stotram',
            titleHi: 'ऋणविमोचन गणपति स्तोत्रम्',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/runa-vimochana-ganapati-stotram.htm',
            sanskrit:
              'सिन्दूरवर्णं द्विभुजं गणेशं\nलम्बोदरं पद्मदले निविष्टम् ।\nब्रह्मादिदेवैः परिसेव्यमानं\nसिद्धैर्युतं तं प्रणमामि देवम् ॥ १॥',
            transliteration:
              'sindūravarṇaṃ dvibhujaṃ gaṇeśaṃ\nlambodaraṃ padmadale niviṣṭam .\nbrahmādidevaiḥ parisevyamānaṃ\nsiddhairyutaṃ taṃ praṇamāmi devam ..1..',
            translationEn:
              'I bow to that divine Gaṇeśa, vermilion-hued, two-armed, with a large belly, seated upon the petals of a lotus, attended upon by Brahmā and the other gods, and surrounded by the Siddhas.',
            translationHi:
              'सिन्दूर वर्ण वाले, दो भुजाओं वाले, लम्बोदर, कमल-दल पर विराजमान, ब्रह्मादि देवताओं द्वारा सेवित और सिद्धों से घिरे हुए ऋणहर्ता भगवान गणेश को मैं प्रणाम करता हूँ।',
            meaningEn:
              'I bow to that divine Gaṇeśa, vermilion-hued, two-armed, with a large belly, seated upon the petals of a lotus, attended upon by Brahmā and the other gods, and surrounded by the Siddhas.',
            meaningHi:
              'सिन्दूर वर्ण वाले, दो भुजाओं वाले, लम्बोदर, कमल-दल पर विराजमान, ब्रह्मादि देवताओं द्वारा सेवित और सिद्धों से घिरे हुए ऋणहर्ता भगवान गणेश को मैं प्रणाम करता हूँ।',
          },
          {
            id: 'runa-vimochana-angaraka-stotram',
            title: 'Runa Vimochana Angaraka Stotram',
            titleHi: 'ऋणविमोचन अङ्गारक (मंगल) स्तोत्रम्',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/runa-vimochana-angaraka-stotram.htm',
            sanskrit: 'स्कन्द उवाच ।\nऋणग्रस्तनराणां तु ऋणमुक्तिः कथं भवेत् ।',
            transliteration:
              'skanda uvācha .\nṛṇagrastanarāṇāṃ tu ṛṇamuktiḥ kathaṃ bhavēt .',
            translationEn:
              'Skanda said: How does liberation from debt come about for men who are burdened by debt? (A prayer invoking Lord Angaraka/Mangala for freedom from all debts).',
            translationHi:
              'भगवान स्कन्द (कार्तिकेय) ने पूछा: हे देव! भारी कर्ज और ऋण के बोझ से दबे हुए मनुष्यों की ऋण से मुक्ति किस प्रकार संभव है? (ऋणहर्ता मंगल स्तोत्र)।',
            meaningEn:
              'Skanda said: How does liberation from debt come about for men who are burdened by debt? (A prayer invoking Lord Angaraka/Mangala for freedom from all debts).',
            meaningHi:
              'भगवान स्कन्द (कार्तिकेय) ने पूछा: हे देव! भारी कर्ज और ऋण के बोझ से दबे हुए मनुष्यों की ऋण से मुक्ति किस प्रकार संभव है? (ऋणहर्ता मंगल स्तोत्र)।',
          },
        ],
      },
      {
        id: 'to-remove-poverty',
        nameEn: 'For Coming Out of Poverty',
        nameHi: 'दारिद्र्य दहन (दरिद्रता नाशक स्तोत्र)',
        headerTitleEn: 'Shlokas to Remove Poverty',
        headerTitleHi: 'दारिद्र्य दुःख दहन एवं संपन्नता प्राप्ति श्लोक',
        subtitleEn:
          'Poverty is a hardship that reaches into every corner of life. These stotras — the poverty-burning hymns to Shiva, Ganesha, and Lakshmi — pray for want to be consumed at its root.',
        subtitleHi:
          'जीवन से घोर दरिद्रता, अभाव एवं कष्टों को जड़ से समाप्त करने हेतु भगवान शिव, दारिद्र्य दहन गणपति एवं माँ कनकधारा लक्ष्मी के परम कल्याणकारी स्तोत्र।',
        deity: 'Shiva',
        image: imagePath.shiva,
        sanskrit:
          'विश्वेश्वराय नरकार्णव तारणाय\nकर्णामृताय शशिशेखर धारणाय ।\nकर्पूरकान्ति धवलाय जटाधराय\nदारिद्र्यदुःख दहनाय नमश्शिवाय ॥ 1 ॥',
        transliteration:
          'viśvēśvarāya narakārṇava tāraṇāya\nkarṇāmṛtāya śaśiśēkhara dhāraṇāya .\nkarpūrakānti dhavaḻāya jaṭādharāya\ndāridryaduḥkha dahanāya namaśśivāya .. 1 ..',
        meaningEn:
          'O Lord of the universe, the ship to cross the ocean of hell, nectar to the ears, wearing the crescent moon — of camphor-white radiance, bearing matted locks — salutations to Shiva who burns the sorrow of poverty.',
        meaningHi:
          'विश्व के स्वामी, संसार-सागर से तारने वाले, कानों को अमृत के समान प्रिय, चंद्रमा को धारण करने वाले, कर्पूर के समान धवल कांति वाले तथा दारिद्र्य व दुःख को भस्म करने वाले भगवान शिव को मेरा नमस्कार है।',
        verses: [
          {
            id: 'daridrya-dahana-shiva-stotram',
            title: 'Daridrya Dahana Shiva Stotram',
            titleHi: 'दारिद्र्य दहन शिव स्तोत्रम् (वशिष्ठ रचित)',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/daridrya-dahana-shiva-stotram.htm',
            sanskrit:
              'विश्वेश्वराय नरकार्णव तारणाय\nकर्णामृताय शशिशेखर धारणाय ।\nकर्पूरकान्ति धवलाय जटाधराय\nदारिद्र्यदुःख दहनाय नमश्शिवाय ॥ 1 ॥',
            transliteration:
              'viśvēśvarāya narakārṇava tāraṇāya\nkarṇāmṛtāya śaśiśēkhara dhāraṇāya .\nkarpūrakānti dhavaḻāya jaṭādharāya\ndāridryaduḥkha dahanāya namaśśivāya .. 1 ..',
            translationEn:
              'O Lord of the universe, the ship to cross the ocean of hell, nectar to the ears, wearing the crescent moon — of camphor-white radiance, bearing matted locks — salutations to Shiva who burns the sorrow of poverty.',
            translationHi:
              'विश्व के स्वामी, नरक रूपी संसार-सागर से पार कराने वाले, कानों को अमृततुल्य प्रिय, चंद्रमा को धारण करने वाले, कर्पूर के समान धवल कांति वाले तथा दरिद्रता रूपी दुःख को भस्म करने वाले भगवान शिव को मेरा नमस्कार है।',
            meaningEn:
              'O Lord of the universe, the ship to cross the ocean of hell, nectar to the ears, wearing the crescent moon — of camphor-white radiance, bearing matted locks — salutations to Shiva who burns the sorrow of poverty.',
            meaningHi:
              'विश्व के स्वामी, नरक रूपी संसार-सागर से पार कराने वाले, कानों को अमृततुल्य प्रिय, चंद्रमा को धारण करने वाले, कर्पूर के समान धवल कांति वाले तथा दरिद्रता रूपी दुःख को भस्म करने वाले भगवान शिव को मेरा नमस्कार है।',
          },
          {
            id: 'daridrya-dahana-ganapati-stotram',
            title: 'Daridrya Dahana Ganapati Stotram',
            titleHi: 'दारिद्र्य दहन गणपति स्तोत्रम्',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/daridrya-dahana-ganapati-stotram.htm',
            sanskrit:
              'सुवर्ण वर्ण सुन्दरं सितैक दन्त-बन्धुरं\nगृहीत पाश-मङ्कुशं वरप्रदा-ऽभयप्रधम् ।\nचतुर्भुजं त्रिलोचनं भुजङ्ग-मोपवीतिनं\nप्रफुल्ल वारिजासनं भजामि सिन्धुराननम् ॥ १॥',
            transliteration:
              "suvarṇa varṇa sundaraṃ sitaika danta-bandhuraṃ\ngṛhīta pāśa-maṅkuśaṃ varapradā-'bhayapradham .\ncaturbhujaṃ trilocanaṃ bhujaṅga-mopavītinaṃ\npraphulla vārijāsanaṃ bhajāmi sindhurānanam ..1..",
            translationEn:
              'I worship the elephant-faced Lord, beautiful with the golden hue of his complexion, graceful with his single white tusk, holding the noose and the goad, bestowing boons and granting fearlessness. Four-armed and three-eyed, wearing a serpent as his sacred thread, seated upon a full-blown lotus — him I adore.',
            translationHi:
              'स्वर्ण के समान सुन्दर कांति वाले, एकदन्त से सुशोभित, पाश और अंकुश धारण करने वाले, वरदान और अभय देने वाले, चार भुजाओं और तीन नेत्रों वाले, सर्प का यज्ञोपवीत धारण करने वाले तथा खिले हुए कमल पर विराजमान गजानन भगवान श्री गणेश का मैं भजन करता हूँ।',
            meaningEn:
              'I worship the elephant-faced Lord, beautiful with the golden hue of his complexion, graceful with his single white tusk, holding the noose and the goad, bestowing boons and granting fearlessness. Four-armed and three-eyed, wearing a serpent as his sacred thread, seated upon a full-blown lotus — him I adore.',
            meaningHi:
              'स्वर्ण के समान सुन्दर कांति वाले, एकदन्त से सुशोभित, पाश और अंकुश धारण करने वाले, वरदान और अभय देने वाले, चार भुजाओं और तीन नेत्रों वाले, सर्प का यज्ञोपवीत धारण करने वाले तथा खिले हुए कमल पर विराजमान गजानन भगवान श्री गणेश का मैं भजन करता हूँ।',
          },
          {
            id: 'kanakadhara-stotram-poverty',
            title: 'Kanakadhara Stotram',
            titleHi: 'कनकधारा स्तोत्रम् (स्वर्ण वर्षा स्तुति)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/kanakadhara-stotram.htm',
            sanskrit:
              'अङ्गं हरेः पुलकभूषणमाश्रयन्ती\nभृङ्गाङ्गनेव मुकुलाभरणं तमालम् ।\nअङ्गीकृताखिलविभूतिरपाङ्गलीला\nमाङ्गल्यदास्तु मम मङ्गळदेवतायाः ॥ १॥',
            transliteration:
              'aṅgaṃ hareḥ pulakabhūṣaṇamāśrayantī\nbhṛṅgāṅganeva mukulābharaṇaṃ tamālam .\naṅgīkṛtākhilavibhūtirapāṅgalīlā\nmāṅgalyadāstu mama maṅgal̤adevatāyāḥ .. 1..',
            translationEn:
              'To the Hari who wears supreme happiness as ornament, the goddess Lakshmi is attracted like the black bees getting attracted to the unopened buds of black Tamala tree, let her who is the goddess of all good things, grant me a glance that will bring prosperity.',
            translationHi:
              'जिस प्रकार भ्रमरी खिले हुए तमाल वृक्ष की ओर आकर्षित होती है, उसी प्रकार भगवान श्रीहरि के श्रीअंग की ओर आकर्षित रहने वाली और सम्पूर्ण ऐश्वर्यों को धारण करने वाली माँ महालक्ष्मी की वह कल्याणकारी कृपादृष्टि मेरे लिए सर्वदा मंगलमयी एवं समृद्धिदायक हो।',
            meaningEn:
              'To the Hari who wears supreme happiness as ornament, the goddess Lakshmi is attracted like the black bees getting attracted to the unopened buds of black Tamala tree, let her who is the goddess of all good things, grant me a glance that will bring prosperity.',
            meaningHi:
              'जिस प्रकार भ्रमरी खिले हुए तमाल वृक्ष की ओर आकर्षित होती है, उसी प्रकार भगवान श्रीहरि के श्रीअंग की ओर आकर्षित रहने वाली और सम्पूर्ण ऐश्वर्यों को धारण करने वाली माँ महालक्ष्मी की वह कल्याणकारी कृपादृष्टि मेरे लिए सर्वदा मंगलमयी एवं समृद्धिदायक हो।',
          },
        ],
      },
      {
        id: 'for-wealth-and-prosperity',
        nameEn: 'For Attracting Wealth & Prosperity',
        nameHi: 'धन-धान्य एवं लक्ष्मी समृद्धि',
        headerTitleEn: 'Shlokas for Wealth & Prosperity',
        headerTitleHi: 'धन-धान्य, ऐश्वर्य एवं अष्टलक्ष्मी समृद्धि श्लोक',
        subtitleEn:
          'We all hope for enough — our needs met, our home secure, our work rewarded. These mantras and stotras invoke Lakshmi, goddess of wealth and good fortune, in her many forms.',
        subtitleHi:
          'घर में स्थायी सुख-समृद्धि, ऐश्वर्य, अन्न-धन की प्रचुरता एवं बरकत हेतु ऋग्वैदिक श्री सूक्तम्, माँ महालक्ष्मी अष्टकम् एवं अष्टलक्ष्मी स्तोत्र।',
        deity: 'Laxmi',
        image: imagePath.Laxmi,
        sanskrit:
          'हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥१॥',
        transliteration:
          'hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām .\ncandrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ..1..',
        meaningEn:
          'O Jatavedas (Agni), summon for me Lakshmi — golden-hued, tawny and bright, garlanded in gold and silver, moon-like and gleaming with gold.',
        meaningHi:
          'हे अग्निदेव! सुवर्ण के समान कांति वाली, सोने और चाँदी के हार धारण करने वाली, चन्द्रमा के समान प्रकाशमयी और सुवर्णमयी माँ महालक्ष्मी का मेरे लिए आह्वान कीजिए।',
        verses: [
          {
            id: 'sri-suktam',
            title: 'Sri Suktam',
            titleHi: 'ऋग्वैदिक श्री सूक्तम् (लक्ष्मी आवाहन)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/sri-suktam.htm',
            sanskrit:
              'हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥१॥',
            transliteration:
              'hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām .\ncandrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ..1..',
            translationEn:
              'O Jatavedas (Agni), summon for me Lakshmi — golden-hued, tawny and bright, garlanded in gold and silver, moon-like and gleaming with gold.',
            translationHi:
              'हे जातवेदा (अग्निदेव)! सुवर्ण के समान कांति वाली, हरिणी के सदृश चंचल, सोने और चाँदी के हार धारण करने वाली, चन्द्रमा के समान प्रकाशमयी और सुवर्णमयी माँ महालक्ष्मी का मेरे लिए आह्वान कीजिए।',
            meaningEn:
              'O Jatavedas (Agni), summon for me Lakshmi — golden-hued, tawny and bright, garlanded in gold and silver, moon-like and gleaming with gold.',
            meaningHi:
              'हे जातवेदा (अग्निदेव)! सुवर्ण के समान कांति वाली, हरिणी के सदृश चंचल, सोने और चाँदी के हार धारण करने वाली, चन्द्रमा के समान प्रकाशमयी और सुवर्णमयी माँ महालक्ष्मी का मेरे लिए आह्वान कीजिए।',
          },
          {
            id: 'mahalakshmi-ashtakam',
            title: 'Mahalakshmi Ashtakam',
            titleHi: 'महालक्ष्मी अष्टकम् (इन्द्र कृत)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/mahalakshmi-ashtakam.htm',
            sanskrit:
              'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तुते ॥१॥',
            transliteration:
              "namaste'stu mahāmāye śrīpīṭhe surapūjite .\nśaṅkhacakragadāhaste mahālakṣmi namo'stute ..1..",
            translationEn:
              'Salutations to you O great maya, one who resides in Sri Chakra and is adored by the gods, one who holds the conch-shell, the discus and the mace, I worship to thee, Sri Maha Lakshmi.',
            translationHi:
              'हे महामाये! श्रीपीठ पर विराजमान और देवताओं द्वारा पूजित, हाथों में शंख, चक्र और गदा धारण करने वाली हे भगवती महालक्ष्मी! आपको मेरा बारम्बार प्रणाम है।',
            meaningEn:
              'Salutations to you O great maya, one who resides in Sri Chakra and is adored by the gods, one who holds the conch-shell, the discus and the mace, I worship to thee, Sri Maha Lakshmi.',
            meaningHi:
              'हे महामाये! श्रीपीठ पर विराजमान और देवताओं द्वारा पूजित, हाथों में शंख, चक्र और गदा धारण करने वाली हे भगवती महालक्ष्मी! आपको मेरा बारम्बार प्रणाम है।',
          },
          {
            id: 'ashta-lakshmi-stotram',
            title: 'Ashta Lakshmi Stotram',
            titleHi: 'अष्टलक्ष्मी स्तोत्रम् (आदिलक्ष्मी स्तुति)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/ashta-lakshmi-stotram.htm',
            sanskrit:
              'आदिलक्ष्मि\nसुमनस वन्दित सुन्दरि माधवि, चन्द्र सहॊदरि हेममये\nमुनिगण वन्दित मोक्षप्रदायनि, मञ्जुल भाषिणि वेदनुते ।\nपङ्कजवासिनि देव सुपूजित, सद्गुण वर्षिणि शान्तियुते\nजय जयहे मधुसूदन कामिनि, आदिलक्ष्मि परिपालय माम् ॥ १ ॥',
            transliteration:
              'ādilakṣmi\nsumanasa vandita sundari mādhavi, chandra sahodari hēmamayē\nmunigaṇa vandita mōkṣapradāyani, mañjula bhāṣiṇi vēdanutē ।\npaṅkajavāsini dēva supūjita, sadguṇa varṣiṇi śāntiyutē\njaya jayahē madhusūdana kāmini, ādilakṣmi paripālaya mām ॥ 1 ॥',
            translationEn:
              'Adi Lakshmi: O primal Lakshmi, saluted by all the virtuous, beautiful and divine, sister of the moon, golden-formed, revered by sages, grantor of liberation, of enchanting speech, praised in the Vedas, seated upon the lotus, adored by the gods — victory to you, O beloved of Madhusudana, Adi Lakshmi, please protect and nurture me!',
            translationHi:
              'हे आदिलक्ष्मी! श्रेष्ठ जनों द्वारा वंदित, सौंदर्यमयी, माधवी, चन्द्रमा की सहोदरा, सुवर्णमयी, मुनियों द्वारा पूजित, मोक्षदायिनी, मधुरभाषिणी, वेदों द्वारा प्रशंसित और कमल पर विराजमान हे माँ! आपकी जय हो, मेरा सर्वदा पालन-पोषण कीजिए।',
            meaningEn:
              'Adi Lakshmi: O primal Lakshmi, saluted by all the virtuous, beautiful and divine, sister of the moon, golden-formed, revered by sages, grantor of liberation, of enchanting speech, praised in the Vedas, seated upon the lotus, adored by the gods — victory to you, O beloved of Madhusudana, Adi Lakshmi, please protect and nurture me!',
            meaningHi:
              'हे आदिलक्ष्मी! श्रेष्ठ जनों द्वारा वंदित, सौंदर्यमयी, माधवी, चन्द्रमा की सहोदरा, सुवर्णमयी, मुनियों द्वारा पूजित, मोक्षदायिनी, मधुरभाषिणी, वेदों द्वारा प्रशंसित और कमल पर विराजमान हे माँ! आपकी जय हो, मेरा सर्वदा पालन-पोषण कीजिए।',
          },
        ],
      },
      {
        id: 'for-success-at-work',
        nameEn: 'For Success at Work',
        nameHi: 'कार्यक्षेत्र में सफलता (कार्य सिद्धि हनुमान मन्त्र)',
        headerTitleEn: 'Shlokas for Success at Work',
        headerTitleHi: 'कार्य सिद्धि, पदोन्नति एवं बाधा निवारण श्लोक',
        subtitleEn:
          'Work brings its own pressures — deadlines, difficulties and days that test us. These prayers call on Hanuman for competence, confidence and a clear path forward.',
        subtitleHi:
          'कार्यक्षेत्र में आने वाली बाधाओं, तनाव एवं चुनौतियों को दूर कर सफलता, एकाग्रता और पदोन्नति हेतु संकटमोचन हनुमान जी के सिद्ध मन्त्र।',
        deity: 'Hanuman',
        image: imagePath.Hanuman,
        sanskrit:
          'त्वमस्मिन् कार्यनिर्योगे प्रमाणं हरिसत्तम ।\nहनुमन् यत्नमास्थाय दुःखक्षयकरो भव ॥ १ ॥\nत्वमस्मिन् कार्यनिर्योगे प्रमाणं हरिसत्तम ।\nराघवस्त्वत्समारम्भात् मयि यत्नपरो भवेत् ॥ २ ॥',
        transliteration:
          'tvamasmin kāryaniryoge pramāṇaṃ harisattama .\nhanuman yatnamāsthāya duḥkhakṣayakaro bhava .. 1 ..\ntvamasmin kāryaniryoge pramāṇaṃ harisattama .\nrāghavastvatsamārambhāt mayi yatnaparo bhavet .. 2 ..',
        meaningEn:
          'O Hanuman, best among heroes! You are the ultimate authority and capable means to execute this task. Employing your divine effort, please become the destroyer of my professional failures, barriers, and grief.',
        meaningHi:
          'हे वानरश्रेष्ठ श्रीहनुमान! इस कार्य को सफल बनाने में आप ही समर्थ प्रमाण और साधन हैं। अपना पराक्रम लगाकर मेरे समस्त विघ्नों का नाश करें और कार्य में विजय दिलाएं।',
        verses: [
          {
            id: 'karya-siddhi-hanuman-mantra',
            title: 'Karya Siddhi Hanuman Mantra',
            titleHi: 'कार्य सिद्धि हनुमान मन्त्र',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/karya-siddhi-hanuman-mantra.htm',
            sanskrit:
              'त्वमस्मिन् कार्यनिर्योगे प्रमाणं हरिसत्तम ।\nहनुमन् यत्नमास्थाय दुःखक्षयकरो भव ॥ १ ॥\nत्वमस्मिन् कार्यनिर्योगे प्रमाणं हरिसत्तम ।\nराघवस्त्वत्समारम्भात् मयि यत्नपरो भवेत् ॥ २ ॥',
            transliteration:
              'tvamasmin kāryaniryoge pramāṇaṃ harisattama .\nhanuman yatnamāsthāya duḥkhakṣayakaro bhava .. 1 ..\ntvamasmin kāryaniryoge pramāṇaṃ harisattama .\nrāghavastvatsamārambhāt mayi yatnaparo bhavet .. 2 ..',
            translationEn:
              'O Hanuman, best among heroes! You are the ultimate authority and capable means to execute this task. Employing your divine effort, please become the destroyer of my professional failures, barriers, and grief. O Hanuman, you are the prime catalyst for this entire endeavor; triggered by your action, may Lord Rama himself exert effort to bless and uplift my situation.',
            translationHi:
              'हे वानरश्रेष्ठ श्रीहनुमान! इस कार्य को सिद्ध करने में आप ही समर्थ साधन हैं। हे हनुमान! अपना पराक्रम लगाकर मेरे संकटों और बाधाओं का नाश करें। आपके उद्योग से प्रेरित होकर भगवान श्रीराम भी मेरे कार्य की सिद्धि हेतु कृपालु हों।',
            meaningEn:
              'O Hanuman, best among heroes! You are the ultimate authority and capable means to execute this task. Employing your divine effort, please become the destroyer of my professional failures, barriers, and grief. O Hanuman, you are the prime catalyst for this entire endeavor; triggered by your action, may Lord Rama himself exert effort to bless and uplift my situation.',
            meaningHi:
              'हे वानरश्रेष्ठ श्रीहनुमान! इस कार्य को सिद्ध करने में आप ही समर्थ साधन हैं। हे हनुमान! अपना पराक्रम लगाकर मेरे संकटों और बाधाओं का नाश करें। आपके उद्योग से प्रेरित होकर भगवान श्रीराम भी मेरे कार्य की सिद्धि हेतु कृपालु हों।',
          },
          {
            id: 'apaduddharaka-hanuman-stotram',
            title: 'Apaduddharaka Hanuman Stotram',
            titleHi: 'आपदुद्धारक हनुमत् स्तोत्रम् (विभीषण कृत)',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/apaduddharaka-hanuman-stotram.htm',
            sanskrit:
              'ॐ अस्य श्री आपदुद्धारक हनुमत् स्तोत्र महामन्त्र कवचस्य, विभीषण ऋषिः, हनुमान् देवता, सर्वापदुद्धारक श्रीहनुमत्प्रसादेन मम सर्वापन्निवृत्त्यर्थे, सर्वकार्यानुकूल्य सिद्ध्यर्थे जपे विनियोगः ।',
            transliteration:
              'oṃ asya śrī āpaduddhāraka hanumat stōtra mahāmantra kavachasya, vibhīṣaṇa ṛṣiḥ, hanumān dēvatā, sarvāpaduddhāraka śrīhanumatprasādēna mama sarvāpannivṛttyarthē, sarvakāryānukūlya siddhyarthē japē viniyōgaḥ .',
            translationEn:
              'Dedication (Viniyoga): Of this Śrī Āpaduddhāraka Hanumat Stōtra Mahāmantra Kavacham: the seer is Vibhīṣaṇa; the deity is Hanumān. Its application is declared for the removal of all calamities and the accomplishment of all purposes by the grace of Śrī Hanumān.',
            translationHi:
              'इस श्री आपदुद्धारक हनुमत् स्तोत्र महामन्त्र कवच के ऋषि विभीषण हैं, देवता हनुमान जी हैं। समस्त संकटों की निवृत्ति तथा सभी कार्यों में अनुकूलता व सिद्धि की प्राप्ति हेतु इसका पाठ किया जाता है।',
            meaningEn:
              'Dedication (Viniyoga): Of this Śrī Āpaduddhāraka Hanumat Stōtra Mahāmantra Kavacham: the seer is Vibhīṣaṇa; the deity is Hanumān. Its application is declared for the removal of all calamities and the accomplishment of all purposes by the grace of Śrī Hanumān.',
            meaningHi:
              'इस श्री आपदुद्धारक हनुमत् स्तोत्र महामन्त्र कवच के ऋषि विभीषण हैं, देवता हनुमान जी हैं। समस्त संकटों की निवृत्ति तथा सभी कार्यों में अनुकूलता व सिद्धि की प्राप्ति हेतु इसका पाठ किया जाता है।',
          },
        ],
      },
      {
        id: 'before-starting-a-business',
        nameEn: 'Before Starting a Business',
        nameHi: 'व्यापार प्रारंभ (श्री गणेश विघ्ननाशक श्लोक)',
        headerTitleEn: 'Shlokas Before Starting a Business',
        headerTitleHi: 'व्यापार आरम्भ एवं महागणपति कृपा श्लोक',
        subtitleEn:
          'A new venture is begun in hope, and we want it to start on the right note. These verses and mantras call on Ganesha for an auspicious, obstacle-free beginning.',
        subtitleHi:
          'दुकान, नया व्यापार, प्रतिष्ठान अथवा फर्म शुरू करते समय निर्विघ्नता, ग्राहक सद्भाव एवं स्थायी लाभ हेतु भगवान श्री महागणपति के सिद्ध मन्त्र।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        sanskrit:
          'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥',
        transliteration:
          'śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam .\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye ..',
        meaningEn:
          'I meditate upon Lord Ganesha, who wears white garments, is radiant like the moon, has four arms and a cheerful countenance, for the removal of all obstacles.',
        meaningHi:
          'श्वेत वस्त्र धारण करने वाले, सर्वव्यापक, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान श्री गणेश का मैं सभी विघ्नों के निवारण हेतु ध्यान करता हूँ।',
        verses: [
          {
            id: 'shuklambaradharam-business',
            title: 'Shuklambaradharam',
            titleHi: 'शुक्लाम्बरधरं विष्णुं (विघ्नोपशान्ति)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/shuklambaradharam.htm',
            sanskrit:
              'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥',
            transliteration:
              'śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam .\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye ..',
            translationEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a bright complexion like the moon, who has four hands, and who has a cheerful face, for the removal of all obstacles.',
            translationHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापक, चन्द्रमा के समान उज्ज्वल, चार भुजाओं वाले और सदा प्रसन्न मुख वाले भगवान श्री गणेश का हम समस्त विघ्नों के नाश के लिए ध्यान करते हैं।',
            meaningEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a bright complexion like the moon, who has four hands, and who has a cheerful face, for the removal of all obstacles.',
            meaningHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापक, चन्द्रमा के समान उज्ज्वल, चार भुजाओं वाले और सदा प्रसन्न मुख वाले भगवान श्री गणेश का हम समस्त विघ्नों के नाश के लिए ध्यान करते हैं।',
          },
          {
            id: 'sri-maha-ganapati-moola-mantra',
            title: 'Sri Maha Ganapati Moola Mantra',
            titleHi: 'श्री महागणपति मूलमन्त्रः (ऋष्यादि न्यास)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/sri-maha-ganapati-moola-mantra.htm',
            sanskrit:
              'ऋष्यादि न्यासः\nअस्य श्री महागणपति मूलमन्त्रस्य । गणक ऋषिः । निचृद्गायत्रीच्छन्दः । महागणपतिर्देवता । ग्लौं बीजं । ह्रीं शक्तिः । ग्लूं कीलकम् । श्री महागणपतिप्रसाद सिद्धयर्थे जपे विनियोगः ॥',
            transliteration:
              'Ṛṣyādi Nyāsaḥ\nasya śrī mahāgaṇapati mūlamantrasya | gaṇaka ṛṣiḥ | nicṛdgāyatrīcchandaḥ | mahāgaṇapatirdēvatā | glauṁ bījaṁ | hrīṁ śaktiḥ | glūṁ kīlakam | śrī mahāgaṇapatiprasāda siddhayarthē japē viniyōgaḥ ||',
            translationEn:
              'For this Sri Maha Ganapati Mula Mantra; Ganaka is the Seer. Nicrud-Gayatri is the metric framework. Maha Ganapati is the presiding deity. Glaum is the seed sound. Hreem is the energetic power. Gloom is the structural key pin. This japa is offered for the attainment of the grace and blessings of Sri Maha Ganapati in all ventures.',
            translationHi:
              'इस श्री महागणपति मूलमन्त्र के ऋषि गणक हैं, छन्द निचृद्गायत्री है, देवता महागणपति हैं, बीज ग्लौं, शक्ति ह्रीं, और कीलक ग्लूं है। श्री महागणपति की कृपा व व्यापारिक कार्य सिद्धि हेतु इसका पाठ किया जाता है।',
            meaningEn:
              'For this Sri Maha Ganapati Mula Mantra; Ganaka is the Seer. Nicrud-Gayatri is the metric framework. Maha Ganapati is the presiding deity. Glaum is the seed sound. Hreem is the energetic power. Gloom is the structural key pin. This japa is offered for the attainment of the grace and blessings of Sri Maha Ganapati in all ventures.',
            meaningHi:
              'इस श्री महागणपति मूलमन्त्र के ऋषि गणक हैं, छन्द निचृद्गायत्री है, देवता महागणपति हैं, बीज ग्लौं, शक्ति ह्रीं, और कीलक ग्लूं है। श्री महागणपति की कृपा व व्यापारिक कार्य सिद्धि हेतु इसका पाठ किया जाता है।',
          },
        ],
      },
      {
        id: 'before-any-new-beginning-work',
        nameEn: 'Before Any New Beginning',
        nameHi: 'शुभ कार्य आरम्भ (विघ्नहर्ता गणेश)',
        headerTitleEn: 'Shlokas for a New Beginning',
        headerTitleHi: 'शुभ कार्य आरम्भ एवं विघ्न निवारण श्लोक',
        subtitleEn:
          'Before we start anything important, we first ask that the way be cleared of obstacles. These verses and mantras call on Ganesha, the remover of obstacles, for an auspicious start.',
        subtitleHi:
          'नया कार्य, प्रोजेक्ट, व्यापार या किसी भी शुभ संकल्प का आरंभ करते समय निर्विघ्न सिद्धि हेतु प्रथम पूज्य श्री गणेश एवं भगवान विष्णु के मंगलकारी श्लोक।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        sanskrit:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        transliteration:
          'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
        meaningEn:
          'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
        meaningHi:
          'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
        verses: [
          {
            id: 'vakratunda-mahakaya-work',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (गणेश वंदना)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            translationHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
            meaningEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            meaningHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
          },
          {
            id: 'gananamtva-ganapatim-work',
            title: 'Gananamtva Ganapatim',
            titleHi: 'गणानां त्वा गणपतिं (ऋग्वेद / गणपति सूक्त)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gananamtva-ganapatim.htm',
            sanskrit:
              'ओ-ङ्ग॒णाना᳚-न्त्वा ग॒णप॑तिग्ं हवामहे\nक॒वि-ङ्क॑वी॒नां उप॒मश्र॑वस्तवम् ।\nज्ये॒ष्ठ॒राज॒-म्ब्रह्म॑णा-म्ब्रह्मणस्पत॒\nआ नः॑ शृ॒ण्वन्नू॒तिभि॑स्सीद॒ साद॑नम् ॥',
            transliteration:
              'o-ṅga̱ṇānā̎-ntvā ga̱ṇapa̍tigṃ havāmahe\nka̱vi-ṅka̍vī̱nāṃ upa̱maśra̍vastavam .\njye̱ṣṭha̱rāja̱-mbrahma̍ṇā-mbrahmaṇaspata̱\nā na̍ḥ śṛ̱ṇvannū̱tibhi̍ssīda̱ sāda̍nam ..',
            translationEn:
              'Among the celestial attendants (Ganas), you are the Lord (Ganapathi), We offer sacrificial oblations to you. You are the wisest among the scholars. Your wisdom is known to be highest quality and incomparable for its glory. You are the eldest or foremost of the kings (referring to devas), the Lord of the sacred prayers, rituals and its performers. O Lord, come to us by hearing our hymns and be seated at this sacred sacrificial altar.',
            translationHi:
              'समस्त गणों के अधिपति हे गणपति! हम आपका आवाहन करते हैं। आप विद्वानों में परम ज्ञानी और अतुलनीय कीर्ति वाले हैं। हे ब्रह्म के स्वामी! आप हमारी प्रार्थना सुनकर अपनी रक्षा व कृपा के साथ यहाँ पधारें।',
            meaningEn:
              'Among the celestial attendants (Ganas), you are the Lord (Ganapathi), We offer sacrificial oblations to you. You are the wisest among the scholars. Your wisdom is known to be highest quality and incomparable for its glory. You are the eldest or foremost of the kings (referring to devas), the Lord of the sacred prayers, rituals and its performers. O Lord, come to us by hearing our hymns and be seated at this sacred sacrificial altar.',
            meaningHi:
              'समस्त गणों के अधिपति हे गणपति! हम आपका आवाहन करते हैं। आप विद्वानों में परम ज्ञानी और अतुलनीय कीर्ति वाले हैं। हे ब्रह्म के स्वामी! आप हमारी प्रार्थना सुनकर अपनी रक्षा व कृपा के साथ यहाँ पधारें।',
          },
          {
            id: 'mangalam-bhagavan-vishnu-work',
            title: 'Mangalam Bhagavan Vishnu',
            titleHi: 'मङ्गलं भगवान् विष्णुः (मंगलाचरण)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/mangalam-bhagavan-vishnu.htm',
            sanskrit:
              'मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः।\nमङ्गलं पुण्डरीकाक्षो मङ्गलाय तनो हरिः॥',
            transliteration:
              'maṅgalaṃ bhagavān viṣṇuḥ maṅgalaṃ garuḍadhvajaḥ .\nmaṅgalaṃ puṇḍarīkākṣo maṅgalāya tano hariḥ ..',
            translationEn:
              'Auspicious is Lord Vishnu, auspicious is the one who has Garuda on his flag. Auspicious is the lotus-eyed one, may Lord Hari bestow auspiciousness upon us.',
            translationHi:
              'भगवान विष्णु सर्वमंगलमय हैं, गरुड़ध्वज धारी प्रभु मंगलकारी हैं, कमल-नयन भगवान विष्णु मंगलस्वरूप हैं और श्रीहरि हमारे लिए सर्वदा मंगल का विस्तार करें।',
            meaningEn:
              'Auspicious is Lord Vishnu, auspicious is the one who has Garuda on his flag. Auspicious is the lotus-eyed one, may Lord Hari bestow auspiciousness upon us.',
            meaningHi:
              'भगवान विष्णु सर्वमंगलमय हैं, गरुड़ध्वज धारी प्रभु मंगलकारी हैं, कमल-नयन भगवान विष्णु मंगलस्वरूप हैं और श्रीहरि हमारे लिए सर्वदा मंगल का विस्तार करें।',
          },
        ],
      },
      {
        id: 'for-court-cases',
        nameEn: 'For a Court Case',
        nameHi: 'न्याय एवं विजय (माँ दुर्गा व कालभैरव)',
        headerTitleEn: 'Shlokas for a Court Case',
        headerTitleHi: 'न्यायालयीन विवाद, सत्य एवं विजय प्राप्ति श्लोक',
        subtitleEn:
          'A legal dispute can be draining, and its outcome uncertain. These stotras call on Durga for strength, Kala Bhairava for justice, and the Sun who brings truth to light.',
        subtitleHi:
          'न्यायालयीन प्रकरण, झूठे मुकदमों व विवादों में सत्य की विजय, निर्दोष रक्षा एवं न्याय प्राप्ति हेतु माँ दुर्गा, भगवान कालभैरव एवं भगवान सूर्य के अमोघ स्तोत्र।',
        deity: 'Durga',
        image: imagePath.Durga,
        sanskrit:
          'अथ दुर्गा सूक्तम्\nओम् ॥ जा॒तवे॑दसे सुनवाम॒ सोम॑ मरातीय॒तो निद॑हाति॒ वेदः॑ ।\nस नः॑ पर्-ष॒दति॑ दु॒र्गाणि॒ विश्वा॑ ना॒वेव॒ सिन्धु॑-न्दुरि॒ता-ऽत्य॒ग्निः ॥',
        transliteration:
          "atha durgā sūktam\nōm ॥ jā̠tavē̍dasē sunavāma̠ sōma̍ marātīya̠tō nida̍hāti̠ vēda̍ḥ ।\nsa na̍ḥ par-ṣa̠dati̍ du̠rgāṇi̠ viśvā̍ nā̠vēva̠ sindhu̍-nduri̠tā-'tya̠gniḥ ॥",
        meaningEn:
          'We offer oblations of Soma unto Agni. May he burn those who are against us. May that Agni lead us beyond all difficulties, like a boat across the river, and save us from all wrongdoings.',
        meaningHi:
          'सर्वज्ञ अग्निदेव हमारे विरोधियों के दुर्भाव को भस्म करें और जिस प्रकार नौका नदी पार कराती है, उसी प्रकार हमें समस्त विपत्तियों, विवादों और संकटों से पार कराएं।',
        verses: [
          {
            id: 'durga-suktam',
            title: 'Durga Suktam',
            titleHi: 'दुर्गा सूक्तम् (संकटतारक वैदिक मन्त्र)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/durga-suktam.htm',
            sanskrit:
              'अथ दुर्गा सूक्तम्\nओम् ॥ जा॒तवे॑दसे सुनवाम॒ सोम॑ मरातीय॒तो निद॑हाति॒ वेदः॑ ।\nस नः॑ पर्-ष॒दति॑ दु॒र्गाणि॒ विश्वा॑ ना॒वेव॒ सिन्धु॑-न्दुरि॒ता-ऽत्य॒ग्निः ॥',
            transliteration:
              "atha durgā sūktam\nōm ॥ jā̠tavē̍dasē sunavāma̠ sōma̍ marātīya̠tō nida̍hāti̠ vēda̍ḥ ।\nsa na̍ḥ par-ṣa̠dati̍ du̠rgāṇi̠ viśvā̍ nā̠vēva̠ sindhu̍-nduri̠tā-'tya̠gniḥ ॥",
            translationEn:
              'We offer oblations of Soma unto Agni. May he burn those who are against us. May that Agni lead us beyond all difficulties, like a boat across the river, and save us from all wrongdoings.',
            translationHi:
              'हम सर्वज्ञ अग्निदेव (जातवेदा) के लिए सोम समर्पित करते हैं। वे हमारे शत्रुओं के अन्याय व द्वेष को भस्म करें और जैसे नाव नदी पार कराती है, वैसे ही हमें समस्त संकटों से पार ले जाएं।',
            meaningEn:
              'We offer oblations of Soma unto Agni. May he burn those who are against us. May that Agni lead us beyond all difficulties, like a boat across the river, and save us from all wrongdoings.',
            meaningHi:
              'हम सर्वज्ञ अग्निदेव (जातवेदा) के लिए सोम समर्पित करते हैं। वे हमारे शत्रुओं के अन्याय व द्वेष को भस्म करें और जैसे नाव नदी पार कराती है, वैसे ही हमें समस्त संकटों से पार ले जाएं।',
          },
          {
            id: 'sri-durga-sapta-shloki',
            title: 'Sri Durga Sapta Shloki',
            titleHi: 'श्रीदुर्गासप्तश्लोकी (सर्वकार्य सिद्धि)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sri-durga-sapta-shloki.htm',
            sanskrit:
              'शिव उवाच ।\nदेवी त्वं भक्तसुलभे सर्वकार्यविधायिनि ।\nकलौ हि कार्यसिद्ध्यर्थमुपायं ब्रूहि यत्नतः ॥',
            transliteration:
              'śiva uvācha .\ndēvī tvaṃ bhaktasulabhē sarvakāryavidhāyini .\nkalau hi kāryasiddhyarthamupāyaṃ brūhi yatnataḥ ..',
            translationEn:
              'Shiva spoke: O Goddess, You who are easily attained by devotees, O accomplisher of all tasks — in the age of Kali, please tell me with care the means by which all endeavors may be successfully fulfilled.',
            translationHi:
              'भगवान शिव ने कहा: हे भक्तों के लिए सुलभ और समस्त कार्यों की विधात्री भगवती! कलियुग में सभी कार्यों की सिद्धि एवं विजय का उपाय कृपापूर्वक बताइए।',
            meaningEn:
              'Shiva spoke: O Goddess, You who are easily attained by devotees, O accomplisher of all tasks — in the age of Kali, please tell me with care the means by which all endeavors may be successfully fulfilled.',
            meaningHi:
              'भगवान शिव ने कहा: हे भक्तों के लिए सुलभ और समस्त कार्यों की विधात्री भगवती! कलियुग में सभी कार्यों की सिद्धि एवं विजय का उपाय कृपापूर्वक बताइए।',
          },
          {
            id: 'kalabhairava-ashtakam-court',
            title: 'Kalabhairava Ashtakam',
            titleHi: 'कालभैरवाष्टकम् (न्याय व अभय)',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/kalabhairava-ashtakam.htm',
            sanskrit:
              'देवराजसेव्यमानपावनांघ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम् ।\nनारदादियोगिवृन्दवन्दितं दिगंबरं\nकाशिकापुराधिनाथकालभैरवं भजे ॥१॥',
            transliteration:
              'deva rāja sevyamāna pāvanāṅghri paṅkajaṃ\nvyāla yajña sūtramindu śekharaṃ kṛpākaram .\nnāradādi yogi vṛnda vanditaṃ digambaraṃ\nkāśikā purādhinātha kālabhairavaṃ bhaje ..1..',
            translationEn:
              'I sing praise of Kalabhairava, Who is the ruler of the City Kashi, Who is adorned by lotus-feet which is revered and served by Indra (Devaraj), Who has a Yagya-thread made up of snake, Who has the moon on His forehead, Who is the abode of mercy, Who has been sung by Narad and other celestial singers, and Whose clothes are the directions.',
            translationHi:
              'इन्द्र द्वारा पूजित पवित्र चरण-कमलों वाले, सर्प का यज्ञोपवीत धारण करने वाले, मस्तक पर चन्द्रमा से शोभित, कृपानिधान, नारदादि मुनियों द्वारा वंदित, काशी के स्वामी न्यायकर्ता कालभैरव का मैं भजन करता हूँ।',
            meaningEn:
              'I sing praise of Kalabhairava, Who is the ruler of the City Kashi, Who is adorned by lotus-feet which is revered and served by Indra (Devaraj), Who has a Yagya-thread made up of snake, Who has the moon on His forehead, Who is the abode of mercy, Who has been sung by Narad and other celestial singers, and Whose clothes are the directions.',
            meaningHi:
              'इन्द्र द्वारा पूजित पवित्र चरण-कमलों वाले, सर्प का यज्ञोपवीत धारण करने वाले, मस्तक पर चन्द्रमा से शोभित, कृपानिधान, नारदादि मुनियों द्वारा वंदित, काशी के स्वामी न्यायकर्ता कालभैरव का मैं भजन करता हूँ।',
          },
          {
            id: 'aditya-hrudayam-court',
            title: 'Aditya Hrudayam',
            titleHi: 'आदित्य हृदयम् (सत्य व धर्म की विजय)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/aditya-hrudayam.htm',
            sanskrit:
              'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥',
            transliteration:
              'tato yuddhapariśrāntaṃ samare cintayā sthitam.\nrāvaṇaṃ cāgrato dṛṣṭvā yuddhāya samupasthitam..',
            translationEn:
              'When Rama was exhausted in battle field standing with greater sorrow and deep thought to fight against Ravana who was duly prepared for the battle, Agastya observed that (and taught the Aditya Hrudayam for ultimate victory of truth).',
            translationHi:
              'युद्धभूमि में रावण को सामने उपस्थित देखकर चिंतातुर श्रीराम को देखकर महर्षि अगस्त्य ने धर्म और सत्य की विजय हेतु भगवान सूर्य के परम स्तोत्र आदित्य हृदयम् का उपदेश दिया।',
            meaningEn:
              'When Rama was exhausted in battle field standing with greater sorrow and deep thought to fight against Ravana who was duly prepared for the battle, Agastya observed that (and taught the Aditya Hrudayam for ultimate victory of truth).',
            meaningHi:
              'युद्धभूमि में रावण को सामने उपस्थित देखकर चिंतातुर श्रीराम को देखकर महर्षि अगस्त्य ने धर्म और सत्य की विजय हेतु भगवान सूर्य के परम स्तोत्र आदित्य हृदयम् का उपदेश दिया।',
          },
        ],
      },
      {
        id: 'to-find-lost-things',
        nameEn: 'For Recovering Lost Money or Belongings',
        nameHi: 'खोई वस्तु व धन की पुनः प्राप्ति',
        headerTitleEn: 'Shlokas to Recover Lost Things',
        headerTitleHi: 'खोया सामान, धन एवं वस्तु प्राप्ति श्लोक',
        subtitleEn:
          'Losing something valuable brings worry, and the anxious hope of finding it again. This is the traditional mantra for recovering what is lost or stolen.',
        subtitleHi:
          'खोई हुई या चोरी हुई वस्तु, दस्तावेज अथवा अटका हुआ धन पुनः प्राप्त करने हेतु सहस्रबाहु कार्तवीर्यार्जुन का चमत्कारी सिद्ध मन्त्र।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        sanskrit:
          'ॐ कार्तवीर्यार्जुनो नाम राजा बाहुसहस्रवान् ।\nतस्य स्मरणमात्रेण गतं नष्टं च लभ्यते ॥',
        transliteration:
          'oṃ kārtavīryārjuno nāma rājā bāhusahasravān .\ntasya smaraṇamātreṇa gataṃ naṣṭaṃ ca labhyate ..',
        meaningEn:
          'Om. The king named Kartavirya Arjuna, who had a thousand arms — by merely remembering him, what has gone and been lost is regained.',
        meaningHi:
          'सहस्र बाहुओं वाले राजा कार्तवीर्यार्जुन का श्रद्धापूर्वक स्मरण करने से खोई हुई वस्तु और अटका हुआ धन पुनः प्राप्त हो जाता है।',
        verses: [
          {
            id: 'kartavirya-arjuna-mantra',
            title: 'Kartavirya Arjuna Mantra',
            titleHi: 'कार्तवीर्यार्जुन मन्त्र (नष्ट द्रव्य पुनः प्राप्ति)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/kartavirya-arjuna-mantra.htm',
            sanskrit:
              'ॐ कार्तवीर्यार्जुनो नाम राजा बाहुसहस्रवान् ।\nतस्य स्मरणमात्रेण गतं नष्टं च लभ्यते ॥',
            transliteration:
              'oṃ kārtavīryārjuno nāma rājā bāhusahasravān .\ntasya smaraṇamātreṇa gataṃ naṣṭaṃ ca labhyate ..',
            translationEn:
              'Om. The king named Kartavirya Arjuna, who had a thousand arms — by merely remembering him, what has gone and been lost is regained.',
            translationHi:
              'सहस्र बाहुओं वाले राजा कार्तवीर्यार्जुन का केवल स्मरण करने मात्र से खोई हुई या चोरी गई वस्तु और रुका हुआ धन पुनः प्राप्त हो जाता है।',
            meaningEn:
              'Om. The king named Kartavirya Arjuna, who had a thousand arms — by merely remembering him, what has gone and been lost is regained.',
            meaningHi:
              'सहस्र बाहुओं वाले राजा कार्तवीर्यार्जुन का केवल स्मरण करने मात्र से खोई हुई या चोरी गई वस्तु और रुका हुआ धन पुनः प्राप्त हो जाता है।',
          },
        ],
      },
    ],
  },
  'study-success': {
    id: 'occasion-study-success',
    slug: 'study-success',
    titleEn: 'Study & Success',
    titleHi: 'विद्या एवं सफलता',
    descriptionEn:
      'For students and learners — success in study and exams, sharp memory and focus, and the first shlokas children learn.',
    descriptionHi:
      'विद्यार्थियों एवं साधकों के लिए — अध्ययन व परीक्षा में सफलता, तीक्ष्ण स्मृति, एकाग्रता एवं प्रारंभिक संस्कार श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/studies-success.jpeg',
    path: '/shloka/prayers/study-success.htm',
    items: [
      {
        id: 'for-studies-and-exams',
        nameEn: 'Before Studies & Exams',
        nameHi: 'अध्ययन एवं परीक्षा से पूर्व (सरस्वति नमस्तुभ्यं)',
        headerTitleEn: 'Shlokas for Studies & Exams',
        headerTitleHi: 'विद्या व परीक्षा सफलता श्लोक',
        subtitleEn:
          'Chanted before studying and examinations for focus, memory, and success',
        subtitleHi:
          'पढ़ाई, स्वाध्याय अथवा परीक्षा से पूर्व माँ सरस्वती व हयग्रीव स्मरण',
        descriptionEn:
          'Learning asks for a calm, focused mind and a steady memory — and a little grace on the day of the test. These verses call on Saraswati and Hayagriva, who preside over knowledge, including the compact Saraswati Beeja Mantra. Chant these prayers before you sit to study, and again before an exam, to settle the mind and invite their blessing.',
        descriptionHi:
          'ज्ञानार्जन हेतु एकाग्र मन, शांत बुद्धि एवं सुदृढ़ स्मरण शक्ति की आवश्यकता होती है। विद्या की अधिष्ठात्री देवी माँ सरस्वती व भगवान हयग्रीव के ये पावन श्लोक और सरस्वती बीज मंत्र अध्ययन व परीक्षा में अपार सफलता प्रदान करते हैं।',
        deity: 'Saraswati',
        image: imagePath.Saraswati,
        path: '/shloka/prayers/for-studies-and-exams.htm',
        sanskrit:
          'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
        meaningHi:
          'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
        meaningEn:
          'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
        verses: [
          {
            id: 'sarasvati-namasthubyam',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (विद्यारम्भ श्लोक)',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            meaningEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            meaningHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
          },
          {
            id: 'yaakundhendhu-thushara-hara',
            title: 'Yaakundhendhu Thushara Hara',
            titleHi: 'या कुन्देन्दु तुषारहारधवला (सरस्वती वंदना)',
            sanskrit:
              'या कुन्देन्दु तुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।\nया ब्रह्माच्युत शङ्करप्रभृतिभिर्देवैस्सदा पूजिता\nसा मां पातु सरस्वती भगवती निश्शेषजाड्यापहा ॥',
            transliteration:
              'yā kundendu tuṣārahāradhavalā yā śubhravastrāvṛtā\nyā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā\nyā brahmācyuta śaṅkaraprabhṛtibhirdevaissadā pūjitā\nsā māṃ pātu sarasvatī bhagavatī niśśeṣajāḍyāpahā',
            translationEn:
              'May Goddess Sarasvatī, who is adorned with a garland of white flowers, dressed in pure white, and seated on a white lotus, who holds the veena and is worshipped by Brahma, Vishnu, and Shiva, protect me and remove all ignorance.',
            translationHi:
              'जो कुंद के फूल, चंद्रमा और हिम के समान श्वेत हैं, जो वीणा धारण करती हैं, जो श्वेत कमल पर विराजती हैं और समस्त देवों द्वारा पूजित हैं—वे माँ सरस्वती मेरी समस्त अज्ञानता व जड़ता का नाश करें।',
            meaningEn:
              'May Goddess Sarasvatī, who is adorned with a garland of white flowers, dressed in pure white, and seated on a white lotus, who holds the veena and is worshipped by Brahma, Vishnu, and Shiva, protect me and remove all ignorance.',
            meaningHi:
              'जो कुंद के फूल, चंद्रमा और हिम के समान श्वेत हैं, जो वीणा धारण करती हैं, जो श्वेत कमल पर विराजती हैं और समस्त देवों द्वारा पूजित हैं—वे माँ सरस्वती मेरी समस्त अज्ञानता व जड़ता का नाश करें।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/yaakundhendhu-thushara-hara.htm',
          },
          {
            id: 'sri-hayagriva-stotram',
            title: 'Sri Hayagriva Stotram',
            titleHi: 'ज्ञानानन्दमयं देवं (हयग्रीव स्तोत्र)',
            sanskrit:
              'ज्ञानानन्दमयं देवं निर्मलस्फटिकाकृतिम् ।\nआधारं सर्वविद्यानां हयग्रीवमुपास्महे ॥ १ ॥',
            transliteration:
              'jñānānandamayaṃ dēvaṃ nirmalasphaṭikākṛtiṃ\nādhāraṃ sarvavidyānāṃ hayagrīvamupāsmahē ..1..',
            translationEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            translationHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
            meaningEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            meaningHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-hayagriva-stotram.htm',
          },
          {
            id: 'saraswati-beeja-mantra',
            title: 'Saraswati Beeja Mantra',
            titleHi: 'सरस्वती बीज मंत्र',
            sanskrit: 'ॐ ऐं सरस्वत्यै नमः ॥',
            transliteration: 'oṃ aiṃ sarasvatyai namaḥ ..',
            translationEn:
              'I bow down and offer my salutations to Goddess Saraswati, the embodiment of ultimate wisdom, intellect, and divine speech.',
            translationHi:
              'विद्या, बुद्धि, ज्ञान एवं वाणी की अधिष्ठात्री भगवती माँ सरस्वती को मेरा सादर नमन है।',
            meaningEn:
              'I bow down and offer my salutations to Goddess Saraswati, the embodiment of ultimate wisdom, intellect, and divine speech.',
            meaningHi:
              'विद्या, बुद्धि, ज्ञान एवं वाणी की अधिष्ठात्री भगवती माँ सरस्वती को मेरा सादर नमन है।',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/saraswati-beeja-mantra.htm',
          },
        ],
      },
      {
        id: 'for-memory-and-focus',
        nameEn: 'For Memory & Concentration',
        nameHi: 'स्मृति एवं एकाग्रता (मेधा सूक्तम् व दक्षिणामूर्ति स्तोत्र)',
        headerTitleEn: 'Shlokas for Memory & Concentration',
        headerTitleHi: 'तीक्ष्ण बुद्धि, धारणा शक्ति एवं एकाग्रता श्लोक',
        subtitleEn:
          'A good memory and steady concentration are the ground of all learning. These verses call on the grace of the Medha Suktam, Dakshinamurthy, and Hayagriva for a sharp and focused mind.',
        subtitleHi:
          'कुशाग्र बुद्धि, तीक्ष्ण स्मरण शक्ति एवं ध्यान एकाग्रता हेतु ऋग्वैदिक मेधा सूक्तम्, ज्ञानगुरु भगवान दक्षिणामूर्ति एवं हयग्रीव स्तुति।',
        deity: 'Saraswati',
        image: imagePath.Saraswati,
        sanskrit:
          'ॐ-यँश्छन्द॑सामृष॒भो वि॒श्वरू॑पः ।\nछन्दो॒भ्यो-ऽध्य॒मृता᳚थ्सम्ब॒भूव॑ ।\nस मेन्द्रो॑ मे॒धया᳚ स्पृणोतु ॥',
        transliteration:
          "ōṃ yaśChanda̍sāmṛṣa̠bhō vi̠śvarū̍paḥ ।\nChandō̠bhyō-'dhya̠mṛtā̎thsamba̠bhūva̍ ।\nsa mēndrō̍ mē̠dhayā̎ spṛṇōtu ॥",
        meaningEn:
          'Om, may that Supreme Lord, who is the essence of the Vedas and manifests in universal form, bestow upon me wisdom, intellect, and profound memory.',
        meaningHi:
          'वेदों के सार और विश्वरूप परमेश्वर हमें मेधा (तीक्ष्ण बुद्धि व धारणा शक्ति) प्रदान करें और हमारी स्मरण शक्ति को सदा जागृत रखें।',
        verses: [
          {
            id: 'medha-suktam',
            title: 'Medha Suktam',
            titleHi: 'मेधा सूक्तम् (वैदिक मेधा मन्त्र)',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/medha-suktam.htm',
            sanskrit:
              'ॐ-यँश्छन्द॑सामृष॒भो वि॒श्वरू॑पः ।\nछन्दो॒भ्यो-ऽध्य॒मृता᳚थ्सम्ब॒भूव॑ ।\nस मेन्द्रो॑ मे॒धया᳚ स्पृणोतु ।\nअ॒मृत॑स्य देव॒धार॑णो भूयासम् ।\nशरी॑र-म्मे॒ विच॑र्षणम् ।\nजि॒ह्वा मे॒ मधु॑मत्तमा ।\nकर्णा᳚भ्यां॒ भूरि॒विश्रु॑वम् ।\nब्रह्म॑णः को॒शो॑-ऽसि मे॒धया पि॑हितः ।\nश्रु॒त-म्मे॑ गोपाय ॥\nॐ शान्ति॒-श्शान्ति॒-श्शान्तिः॑ ॥',
            transliteration:
              "ōṃ yaśChanda̍sāmṛṣa̠bhō vi̠śvarū̍paḥ ।\nChandō̠bhyō-'dhya̠mṛtā̎thsamba̠bhūva̍ ।\nsa mēndrō̍ mē̠dhayā̎ spṛṇōtu ।\na̠mṛta̍sya dēva̠dhāra̍ṇō bhūyāsam ।\nśarī̍ra-mmē̠ vicha̍rṣaṇam ।\nji̠hvā mē̠ madhu̍mattamā ।\nkarṇā̎bhyāṃ̠ bhūri̠viśru̍vam ।\nbrahma̍ṇaḥ kō̠śō̍-'si mē̠dhayā pi̍hitaḥ ।\nśru̠ta-mmē̍ gōpāya ॥\nōṃ śāntiḥ śāntiḥ śāntiḥ ॥",
            translationEn:
              'Om, may that Supreme Lord, who is the essence of the Vedas and who manifests in universal form, who has emerged from the nectar of immortality, bestow upon me wisdom and intellect. May I become a bearer of divine knowledge and immortality. May my body be vigorous, my speech sweet, and my ears receptive to abundant wisdom. You, O Lord, are the treasure of Brahman and the protector of wisdom. Preserve my knowledge and what I have heard. Om, may there be peace.',
            translationHi:
              'वेदों के सार और विश्वरूप परमात्मा हमें मेधा (तीक्ष्ण बुद्धि व धारणा शक्ति) प्रदान करें। मेरा शरीर स्वस्थ व सक्षम हो, मेरी वाणी मधुरतम हो, मेरे कान प्रचुर ज्ञान का श्रवण करें। हे ब्रह्म के कोश! मेरी मेधा व सुने हुए ज्ञान की रक्षा करें। ॐ शान्तिः शान्तिः शान्तिः।',
            meaningEn:
              'Om, may that Supreme Lord, who is the essence of the Vedas and who manifests in universal form, who has emerged from the nectar of immortality, bestow upon me wisdom and intellect. May I become a bearer of divine knowledge and immortality. May my body be vigorous, my speech sweet, and my ears receptive to abundant wisdom. You, O Lord, are the treasure of Brahman and the protector of wisdom. Preserve my knowledge and what I have heard. Om, may there be peace.',
            meaningHi:
              'वेदों के सार और विश्वरूप परमात्मा हमें मेधा (तीक्ष्ण बुद्धि व धारणा शक्ति) प्रदान करें। मेरा शरीर स्वस्थ व सक्षम हो, मेरी वाणी मधुरतम हो, मेरे कान प्रचुर ज्ञान का श्रवण करें। हे ब्रह्म के कोश! मेरी मेधा व सुने हुए ज्ञान की रक्षा करें। ॐ शान्तिः शान्तिः शान्तिः।',
          },
          {
            id: 'sri-medha-dakshina-murthy-stotram',
            title: 'Sri Medha Dakshina Murthy Stotram',
            titleHi: 'श्री मेधा दक्षिणामूर्ति स्तोत्रम्',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/sri-medha-dakshina-murthy-stotram.htm',
            sanskrit:
              'ओमित्येकाक्षरं ब्रह्म व्याहरन्ति त्रयश्शिखाः ।\nतस्मैतारात्मने मेधादक्षिणामूर्तये नमः ॥ १ ॥',
            transliteration:
              'ōmityēkākṣaraṃ brahma vyāharanti trayaśśikhāḥ ।\ntasmaitārātmanē mēdhādakṣiṇāmūrtayē namaḥ ॥ 1 ॥',
            translationEn:
              'Salutations to Sri Medha Dakshinamurti, the embodiment of the sacred syllable Om (Pranava), who is the Supreme Brahman revealed through the three Vedas, the bestower of brilliant intellect and supreme comprehension.',
            translationHi:
              "'ॐ' इस एकाक्षर ब्रह्म का जो प्रतिपादन करते हैं, उन प्रणवरूप मेधा-प्रदाता भगवान मेधा दक्षिणामूर्ति को मेरा बारम्बार नमस्कार है।",
            meaningEn:
              'Salutations to Sri Medha Dakshinamurti, the embodiment of the sacred syllable Om (Pranava), who is the Supreme Brahman revealed through the three Vedas, the bestower of brilliant intellect and supreme comprehension.',
            meaningHi:
              "'ॐ' इस एकाक्षर ब्रह्म का जो प्रतिपादन करते हैं, उन प्रणवरूप मेधा-प्रदाता भगवान मेधा दक्षिणामूर्ति को मेरा बारम्बार नमस्कार है।",
          },
          {
            id: 'dakshinamurthy-stotram-focus',
            title: 'Dakshinamurthy Stotram',
            titleHi: 'दक्षिणामूर्ति स्तोत्रम् (आदि शंकराचार्य कृत)',
            deity: 'Shiva',
            image: imagePath.shiva,
            link: 'https://shlokam.org/shloka/dakshinamurthy-stotram.htm',
            sanskrit:
              'ॐ मौनव्याख्या प्रकटितपरब्रह्मतत्वं\nयुवानंवर्शिष्ठान्तेवसदृषिगणैरावृतं ब्रह्मनिष्ठैः |\nआचार्येन्द्रं करकलित चिन्मुद्रमानन्दमूर्तिं\nस्वात्मरामं मुदितवदनं दक्षिणामूर्तिमीडे ‖',
            transliteration:
              'oṃ maunavyākhyā prakaṭita parabrahmatatvaṃ yuvānaṃ\nvarśiṣṭhānte vasad ṛṣigaṇair āvṛtaṃ brahmaniṣṭhaiḥ |\nācāryendraṃ karakalita cinmudram ānandamūrtiṃ\nsvātmarāmaṃ muditavadanaṃ dakṣiṇāmūrtimīḍe ‖',
            translationEn:
              'I salute Sri Dakshinamurti, the Young Guru, who teaches the knowledge of Brahman through silence, who is surrounded by disciples who are themselves rishis and scholars in the Vedas. I worship Sri Dakshinamurti, the teacher of teachers, whose hand is held in the sign of knowledge (chin-mudra), who is bliss personified.',
            translationHi:
              'मौन व्याख्या द्वारा परब्रह्म तत्व को प्रकट करने वाले, वृद्ध ब्रह्मनिष्ठ ऋषियों से घिरे हुए, ज्ञानमुद्रा (चिन्मुद्रा) धारण करने वाले, आनन्द स्वरूप और प्रसन्न मुख वाले जगद्गुरु भगवान दक्षिणामूर्ति की मैं वंदना करता हूँ।',
            meaningEn:
              'I salute Sri Dakshinamurti, the Young Guru, who teaches the knowledge of Brahman through silence, who is surrounded by disciples who are themselves rishis and scholars in the Vedas. I worship Sri Dakshinamurti, the teacher of teachers, whose hand is held in the sign of knowledge (chin-mudra), who is bliss personified.',
            meaningHi:
              'मौन व्याख्या द्वारा परब्रह्म तत्व को प्रकट करने वाले, वृद्ध ब्रह्मनिष्ठ ऋषियों से घिरे हुए, ज्ञानमुद्रा (चिन्मुद्रा) धारण करने वाले, आनन्द स्वरूप और प्रसन्न मुख वाले जगद्गुरु भगवान दक्षिणामूर्ति की मैं वंदना करता हूँ।',
          },
          {
            id: 'sri-hayagriva-stotram-memory',
            title: 'Sri Hayagriva Stotram',
            titleHi: 'ज्ञानानन्दमयं देवं (हयग्रीव स्तुति)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-hayagriva-stotram.htm',
            sanskrit:
              'ज्ञानानन्दमयं देवं निर्मलस्फटिकाकृतिम् ।\nआधारं सर्वविद्यानां हयग्रीवमुपास्महे ॥ १ ॥',
            transliteration:
              'jñānānandamayaṃ dēvaṃ nirmalasphaṭikākṛtiṃ\nādhāraṃ sarvavidyānāṃ hayagrīvamupāsmahē .. 1 ..',
            translationEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            translationHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
            meaningEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            meaningHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
          },
        ],
      },
      {
        id: 'before-learning-new',
        nameEn: 'Before Learning Something New',
        nameHi: 'नवीन विद्या प्रारंभ (विद्यारम्भ श्लोक)',
        headerTitleEn: 'Shlokas Before Learning Something New',
        headerTitleHi: 'नवीन विद्यारम्भ एवं ज्ञान प्राप्ति श्लोक',
        subtitleEn:
          'Every new subject or skill deserves an auspicious start, and tradition marks it with Vidyarambham — the beginning of learning. These prayers call on Saraswati, Ganesha, and Hayagriva.',
        subtitleHi:
          'नया विषय, कला, संगीत अथवा कौशल सीखते समय बुद्धि की निर्मलता, एकाग्रता एवं गुरु-कृपा प्राप्ति हेतु माँ सरस्वती, विघ्नहर्ता गणेश व भगवान हयग्रीव के मंगलकारी श्लोक।',
        deity: 'Saraswati',
        image: imagePath.Saraswati,
        sanskrit:
          'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
        transliteration:
          'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
        meaningEn:
          'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
        meaningHi:
          'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
        verses: [
          {
            id: 'sarasvati-namasthubyam-learn',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (विद्यारम्भ श्लोक)',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            meaningEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            meaningHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
          },
          {
            id: 'shuklambaradharam-learn',
            title: 'Shuklambaradharam',
            titleHi: 'शुक्लाम्बरधरं विष्णुं (विघ्नोपशान्ति)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/shuklambaradharam.htm',
            sanskrit:
              'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥',
            transliteration:
              'śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam .\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye ..',
            translationEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a bright complexion like the moon, who has four hands, and who has a cheerful face, for the removal of all obstacles.',
            translationHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान श्री गणेश का मैं सभी विघ्नों के निवारण हेतु ध्यान करता हूँ।',
            meaningEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a bright complexion like the moon, who has four hands, and who has a cheerful face, for the removal of all obstacles.',
            meaningHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान श्री गणेश का मैं सभी विघ्नों के निवारण हेतु ध्यान करता हूँ।',
          },
          {
            id: 'sri-hayagriva-stotram-learn',
            title: 'Sri Hayagriva Stotram',
            titleHi: 'ज्ञानानन्दमयं देवं (हयग्रीव स्तोत्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sri-hayagriva-stotram.htm',
            sanskrit:
              'ज्ञानानन्दमयं देवं निर्मलस्फटिकाकृतिम् ।\nआधारं सर्वविद्यानां हयग्रीवमुपास्महे ॥ १ ॥',
            transliteration:
              'jñānānandamayaṃ dēvaṃ nirmalasphaṭikākṛtiṃ\nādhāraṃ sarvavidyānāṃ hayagrīvamupāsmahē .. 1 ..',
            translationEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            translationHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
            meaningEn:
              'We worship Hayagrīva, the divine Lord who is made of knowledge and bliss, whose form is like flawless crystal, and who is the foundation of all knowledge.',
            meaningHi:
              'जो ज्ञान और आनंद के साक्षात स्वरूप हैं, जिनका दिव्य विग्रह निर्मल स्फटिक मणि के समान निष्कलंक है, और जो समस्त विद्याओं के आधार हैं—उन भगवान श्री हयग्रीव की हम उपासना करते हैं।',
          },
          {
            id: 'yaakundhendhu-thushara-hara-learn',
            title: 'Yaakundhendhu Thushara Hara',
            titleHi: 'या कुन्देन्दु तुषारहारधवला (सरस्वती वंदना)',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/yaakundhendhu-thushara-hara.htm',
            sanskrit:
              'या कुन्देन्दु तुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।\nया ब्रह्माच्युत शङ्करप्रभृतिभिर्देवैस्सदा पूजिता\nसा मां पातु सरस्वती भगवती निश्शेषजाड्यापहा ॥',
            transliteration:
              'yā kundendu tuṣārahāradhavalā yā śubhravastrāvṛtā\nyā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā\nyā brahmācyuta śaṅkaraprabhṛtibhirdevaissadā pūjitā\nsā māṃ pātu sarasvatī bhagavatī niśśeṣajāḍyāpahā',
            translationEn:
              'May Goddess Sarasvatī, who is adorned with a garland of white flowers, dressed in pure white, and seated on a white lotus, who holds the veena and is worshipped by Brahma, Vishnu, and Shiva, protect me and remove all ignorance.',
            translationHi:
              'जो कुंद के फूल, चंद्रमा और हिम के समान श्वेत हैं, जो वीणा धारण करती हैं, जो श्वेत कमल पर विराजती हैं और समस्त देवों द्वारा पूजित हैं—वे माँ सरस्वती मेरी समस्त अज्ञानता व जड़ता का नाश करें।',
            meaningEn:
              'May Goddess Sarasvatī, who is adorned with a garland of white flowers, dressed in pure white, and seated on a white lotus, who holds the veena and is worshipped by Brahma, Vishnu, and Shiva, protect me and remove all ignorance.',
            meaningHi:
              'जो कुंद के फूल, चंद्रमा और हिम के समान श्वेत हैं, जो वीणा धारण करती हैं, जो श्वेत कमल पर विराजती हैं और समस्त देवों द्वारा पूजित हैं—वे माँ सरस्वती मेरी समस्त अज्ञानता व जड़ता का नाश करें।',
          },
        ],
      },
      {
        id: 'for-children-to-learn',
        nameEn: 'Simple Shlokas for Children',
        nameHi: 'बच्चों के सीखने योग्य सरल श्लोक',
        headerTitleEn: 'Simple Shlokas for Children',
        headerTitleHi: 'बच्चों के नित्य स्मरण हेतु 10 मंगलकारी श्लोक',
        subtitleEn:
          'The tradition begins in childhood, with a few short verses learned by heart. These simple shlokas to Ganesha, Saraswati, Guru, and Hanuman are the first seeds of a lifelong practice.',
        subtitleHi:
          'बाल्यकाल में संस्कार, सद्बुद्धि एवं एकाग्रता हेतु भगवान गणेश, माँ सरस्वती, गुरु व हनुमान जी के 10 सरल, सुमधुर एवं कंठस्थ करने योग्य वैदिक श्लोक।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        sanskrit:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        transliteration:
          'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
        meaningEn:
          'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
        meaningHi:
          'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
        verses: [
          {
            id: 'vakratunda-mahakaya-child',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (गणेश प्रार्थना)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            translationHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
            meaningEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            meaningHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
          },
          {
            id: 'karaagre-vasathe-child',
            title: 'Karaagre Vasathe',
            titleHi: 'कराग्रे वसते लक्ष्मीः (करदर्शनम्)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/karaagre-vasathe.htm',
            sanskrit:
              'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वति ।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम् ॥',
            transliteration:
              'karāgre vasate lakṣmīḥ karamadhye sarasvatī\nkaramūle tu govindaḥ prabhāte karadarśanam',
            translationEn:
              "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            translationHi:
              'हाथ के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल में भगवान गोविंद (विष्णु) निवास करते हैं। अतः प्रातःकाल उठकर अपनी हथेलियों के दर्शन करने चाहिए।',
            meaningEn:
              "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            meaningHi:
              'हाथ के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल में भगवान गोविंद (विष्णु) निवास करते हैं। अतः प्रातःकाल उठकर अपनी हथेलियों के दर्शन करने चाहिए।',
          },
          {
            id: 'shuklambaradharam-child',
            title: 'Shuklambaradharam',
            titleHi: 'शुक्लाम्बरधरं विष्णुं (विघ्न निवारण)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/shuklambaradharam.htm',
            sanskrit:
              'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥',
            transliteration:
              'śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam .\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye ..',
            translationEn:
              'I meditate upon Lord Ganesha / Vishnu, who wears white garments, is all-pervasive, radiant like the moon, four-armed, and smiling, for the removal of all obstacles.',
            translationHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान का मैं समस्त विघ्नों की शान्ति हेतु ध्यान करता हूँ।',
            meaningEn:
              'I meditate upon Lord Ganesha / Vishnu, who wears white garments, is all-pervasive, radiant like the moon, four-armed, and smiling, for the removal of all obstacles.',
            meaningHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान का मैं समस्त विघ्नों की शान्ति हेतु ध्यान करता हूँ।',
          },
          {
            id: 'guru-brahma-guru-vishnu-child',
            title: 'Guru Brahma Guru Vishnu',
            titleHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः (गुरु वंदना)',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/guru-brahma-guru-vishnu.htm',
            sanskrit:
              'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः ॥',
            transliteration:
              'gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ\nguruḥ sākṣāt parabrahma tasmai śrī gurave namaḥ',
            translationEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            translationHi:
              'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा प्रणाम।',
            meaningEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            meaningHi:
              'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा प्रणाम।',
          },
          {
            id: 'sarasvati-namasthubyam-child',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (विद्यारम्भ)',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            meaningEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            meaningHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
          },
          {
            id: 'shubham-karothi-kalyanam-child',
            title: 'Shubham Karothi Kalyanam',
            titleHi: 'शुभं करोति कल्याणम् (दीप स्तुति)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/shubham-karothi-kalyanam.htm',
            sanskrit:
              'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥\nदीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते ॥',
            transliteration:
              "śubhaṃ karoti kalyāṇamārogyaṃ dhanasaṃpadā .\nśatrubuddhivināśāya dīpajyotirnamo'stute ..\ndīpajyotiḥ parabrahma dīpajyotirjanārdanaḥ .\ndīpo haratu me pāpaṃ dīpajyotirnamo'stute ..",
            translationEn:
              'Salutations to the light of the lamp, which brings auspiciousness, health, and prosperity, and destroys negative intellect. Deepa-Jyothi is the supreme Brahman and Janardhana. May the divine lamp eradicate all sins.',
            translationHi:
              'शुभ, कल्याण, उत्तम आरोग्य और धन-सम्पत्ति देने वाली तथा दुर्बुद्धि का नाश करने वाली दीपक की दिव्य ज्योति को मेरा नमस्कार है।',
            meaningEn:
              'Salutations to the light of the lamp, which brings auspiciousness, health, and prosperity, and destroys negative intellect. Deepa-Jyothi is the supreme Brahman and Janardhana. May the divine lamp eradicate all sins.',
            meaningHi:
              'शुभ, कल्याण, उत्तम आरोग्य और धन-सम्पत्ति देने वाली तथा दुर्बुद्धि का नाश करने वाली दीपक की दिव्य ज्योति को मेरा नमस्कार है।',
          },
          {
            id: 'gajananam-bhuthaganadhi-child',
            title: 'Gajananam Bhuthaganadhi',
            titleHi: 'गजाननं भूतगणादि सेवितम् (विघ्नेश्वर वंदना)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gajananam-bhuthaganadhi.htm',
            sanskrit:
              'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
            transliteration:
              'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam .\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam ..',
            translationEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by celestial beings, who relishes the essence of kapittha and jambu fruits, the son of Goddess Uma, and the destroyer of all sorrow.',
            translationHi:
              'हाथी के समान मुख वाले, समस्त गणों द्वारा सेवित, कैथ और जामुन के फलों का रसपान करने वाले, माता पार्वती के पुत्र और समस्त दुःखों का नाश करने वाले विघ्नहर्ता भगवान गणेश के चरण-कमलों में मैं प्रणाम करता हूँ।',
            meaningEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by celestial beings, who relishes the essence of kapittha and jambu fruits, the son of Goddess Uma, and the destroyer of all sorrow.',
            meaningHi:
              'हाथी के समान मुख वाले, समस्त गणों द्वारा सेवित, कैथ और जामुन के फलों का रसपान करने वाले, माता पार्वती के पुत्र और समस्त दुःखों का नाश करने वाले विघ्नहर्ता भगवान गणेश के चरण-कमलों में मैं प्रणाम करता हूँ।',
          },
          {
            id: 'manojavam-maruthathulyavegam-child',
            title: 'Manojavam Maruthathulyavegam',
            titleHi: 'मनोजवं मारुततुल्यवेगम् (हनुमान स्मरण)',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/manojavam-maruthathulyavegam.htm',
            sanskrit:
              'मनोजवं मारुततुल्यवेगं\nजितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं\nश्रीरामदूतं शिरसा नमामि ॥',
            transliteration:
              'manojavaṃ mārutatulyavegaṃ\njitendriyaṃ buddhimatāṃ variṣṭham .\nvātātmajaṃ vānarayūthamukhyaṃ\nśrīrāmadūtaṃ śirasā namāmi ..',
            translationEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as fast as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vanaras.',
            translationHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
            meaningEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as fast as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vanaras.',
            meaningHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
          },
          {
            id: 'brahmarpanam-brahma-havih-child',
            title: 'Brahmarpanam Brahma Havih',
            titleHi: 'ब्रह्मार्पणं ब्रह्म हविः (भोजन मन्त्र)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/brahmarpanam-brahma-havih.htm',
            sanskrit:
              'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
            transliteration:
              'brahmārpaṇaṃ brahma havirbrahmāgnau brahmaṇā hutam .\nbrahmaiva tena gantavyaṃ brahmakarma samādhinā ..',
            translationEn:
              'Brahman is the offering, Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            translationHi:
              'अर्पण ब्रह्म है, हविष्य (अन्न) ब्रह्म है, ब्रह्म रूप कर्ता द्वारा ब्रह्म रूप जठराग्नि में आहुति दी जाती है—समस्त कर्मों में परमात्मा का दर्शन करने वाले को परमात्मा की ही प्राप्ति होती है।',
            meaningEn:
              'Brahman is the offering, Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            meaningHi:
              'अर्पण ब्रह्म है, हविष्य (अन्न) ब्रह्म है, ब्रह्म रूप कर्ता द्वारा ब्रह्म रूप जठराग्नि में आहुति दी जाती है—समस्त कर्मों में परमात्मा का दर्शन करने वाले को परमात्मा की ही प्राप्ति होती है।',
          },
          {
            id: 'gayatri-mantra-child',
            title: 'Gayatri Mantra',
            titleHi: 'गायत्री मन्त्र (महामन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/gayatri-mantra.htm',
            sanskrit:
              'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
            transliteration:
              'oṃ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṃ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ..',
            translationEn:
              'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms. May He enlighten our intellect and awaken our understanding, guiding us along the righteous path.',
            translationHi:
              'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करें।',
            meaningEn:
              'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms. May He enlighten our intellect and awaken our understanding, guiding us along the righteous path.',
            meaningHi:
              'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करें।',
          },
        ],
      },
    ],
  },
  'home-and-family': {
    id: 'occasion-home-family',
    slug: 'home-and-family',
    titleEn: 'Home & Family',
    titleHi: 'गृह एवं परिवार',
    descriptionEn:
      'For the household and its bonds — marriage, children, a happy home, and family life.',
    descriptionHi:
      'गृहस्थी एवं पारिवारिक संबंधों के लिए — विवाह, संतान सुख, सुखमय दांपत्य एवं गृह शांति हेतु श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/home-family.jpg',
    path: '/shloka/prayers/home-and-family.htm',
    items: [
      {
        id: 'for-marriage',
        nameEn: 'Before Marriage',
        nameHi:
          'विवाह पूर्व एवं सुयोग्य जीवनसाथी (स्वयंवर पार्वती व कात्यायनी)',
        headerTitleEn: 'Shlokas for Marriage',
        headerTitleHi: 'शीघ्र विवाह, सुयोग्य जीवनसाथी एवं विघ्न निवारण श्लोक',
        subtitleEn:
          'Many wait and pray for the right life-partner, and for delays in marriage to be cleared. These mantras call on Parvati and the Goddess — the Swayamvara Parvathi Maha Mantra, Katyayani, and the Patni Prapti verse from Argala — to remove obstacles and bring a suitable match. Chant them with a sincere heart, seeking a happy and timely marriage.',
        subtitleHi:
          'विवाह में आ रहे विलंब व बाधाओं को दूर करने तथा सुयोग्य, गुणवान व अनुकूल वर/वधु की प्राप्ति हेतु स्वयंवर पार्वती महामंत्र, कात्यायनी मंत्र एवं अर्गला स्तोत्र के सिद्ध श्लोक।',
        deity: 'Durga',
        image: imagePath.Durga,
        sanskrit:
          'कात्यायनि महामाये महायोगिन्यधीश्वरि ।\nनन्दगोपसुतं देवि पतिं मे कुरु ते नमः ॥',
        transliteration:
          'kātyāyani mahāmāye mahāyoginyadhīśvari .\nnandagopasutaṃ devi patiṃ me kuru te namaḥ ..',
        meaningEn:
          'O Katyayani, great Maya, great yogini, supreme ruler — O Devi, make the son of Nanda Gopa my husband; salutations to you.',
        meaningHi:
          'हे कात्यायनी! हे महामाये! हे महायोगिनी! हे सर्वेश्वरी देवी! नन्दगोप के पुत्र (भगवान श्रीकृष्ण) को मेरा पति बनाइए; आपको मेरा बारम्बार प्रणाम है।',
        verses: [
          {
            id: 'swayamvara-parvathi-maha-mantra',
            title: 'Swayamvara Parvathi Maha Mantra',
            titleHi: 'स्वयंवर पार्वती महामन्त्र (शीघ्र विवाह हेतु)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/swayamvara-parvathi-maha-mantra.htm',
            sanskrit:
              'ॐ ह्रीं योगिनि योगिनि योगेश्वरि योगभयङ्करि ।\nसकलस्थावरजङ्गमस्य मुखहृदयं मम वशमाकर्ष आकर्षय नमः ॥',
            transliteration:
              'oṃ hrīṃ yogini yogini yogeśvari yogabhayaṅkari .\nsakalasthāvarajaṅgamasya mukhahṛdayaṃ mama vaśamākarṣa ākarṣaya namaḥ ..',
            translationEn:
              'O Divine Mother Parvati, ruler of all yogic unions and destroyer of fears! Please attract and align the minds, hearts, and circumstances of all moving and unmoving creation to bring about a blessed, harmonious marital union for me. I bow down to You.',
            translationHi:
              'हे योगिनी, योगेश्वरी, योग के भय को दूर करने वाली और शुभ विवाह की अधिष्ठात्री भगवती माँ पार्वती! समस्त चराचर जगत के अनुकूल हृदय को आकर्षित कर मेरे लिए शीघ्र, सुयोग्य एवं सुखद वैवाहिक संबंध का मार्ग प्रशस्त करें।',
            meaningEn:
              'O Divine Mother Parvati, ruler of all yogic unions and destroyer of fears! Please attract and align the minds, hearts, and circumstances of all moving and unmoving creation to bring about a blessed, harmonious marital union for me. I bow down to You.',
            meaningHi:
              'हे योगिनी, योगेश्वरी, योग के भय को दूर करने वाली और शुभ विवाह की अधिष्ठात्री भगवती माँ पार्वती! समस्त चराचर जगत के अनुकूल हृदय को आकर्षित कर मेरे लिए शीघ्र, सुयोग्य एवं सुखद वैवाहिक संबंध का मार्ग प्रशस्त करें।',
          },
          {
            id: 'katyayani-mantra',
            title: 'Katyayani Mantra',
            titleHi: 'कात्यायनी मन्त्र (मनोवांछित वर प्राप्ति)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/katyayani-mantra.htm',
            sanskrit:
              'कात्यायनि महामाये महायोगिन्यधीश्वरि ।\nनन्दगोपसुतं देवि पतिं मे कुरु ते नमः ॥',
            transliteration:
              'kātyāyani mahāmāye mahāyoginyadhīśvari .\nnandagopasutaṃ devi patiṃ me kuru te namaḥ ..',
            translationEn:
              'O Katyayani, great Maya, great yogini, supreme ruler — O Devi, make the son of Nanda Gopa my husband; salutations to you.',
            translationHi:
              'हे कात्यायनी! हे महामाये! हे महायोगिनी! हे सर्वेश्वरी देवी! नन्दगोप के पुत्र (भगवान श्रीकृष्ण) को मेरा पति बनाइए; आपको मेरा बारम्बार प्रणाम है।',
            meaningEn:
              'O Katyayani, great Maya, great yogini, supreme ruler — O Devi, make the son of Nanda Gopa my husband; salutations to you.',
            meaningHi:
              'हे कात्यायनी! हे महामाये! हे महायोगिनी! हे सर्वेश्वरी देवी! नन्दगोप के पुत्र (भगवान श्रीकृष्ण) को मेरा पति बनाइए; आपको मेरा बारम्बार प्रणाम है।',
          },
          {
            id: 'patni-prapti-mantra',
            title: 'Patni Prapti Mantra',
            titleHi: 'पत्नी प्राप्ति मन्त्र (अर्गला स्तोत्र)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/patni-prapti-mantra.htm',
            sanskrit:
              'पत्नीं मनोरमां देहि मनोवृत्तानुसारिणीम् ।\nतारिणीं दुर्गसंसारसागरस्य कुलोद्भवाम् ॥',
            transliteration:
              'patnīṃ manorāmāṃ dehi manovṛttānusāriṇīm .\ntāriṇīṃ durgasaṃsārasāgarasya kulodbhavām ..',
            translationEn:
              'O Divine Mother, please grant me a wife who is beautiful in heart and mind, who naturally moves in harmony with my thoughts, and who belongs to a noble lineage—helping me gracefully navigate and cross the difficult responsibilities of this worldly life.',
            translationHi:
              'हे भगवती! मुझे मन के अनुकूल आचरण करने वाली, रूपवती व गुणवती, कुलीन तथा इस दुर्गम संसार-सागर से तारने वाली श्रेष्ठ पत्नी प्रदान कीजिए।',
            meaningEn:
              'O Divine Mother, please grant me a wife who is beautiful in heart and mind, who naturally moves in harmony with my thoughts, and who belongs to a noble lineage—helping me gracefully navigate and cross the difficult responsibilities of this worldly life.',
            meaningHi:
              'हे भगवती! मुझे मन के अनुकूल आचरण करने वाली, रूपवती व गुणवती, कुलीन तथा इस दुर्गम संसार-सागर से तारने वाली श्रेष्ठ पत्नी प्रदान कीजिए।',
          },
        ],
      },
      {
        id: 'for-a-happy-marriage',
        nameEn: 'For a Happy Marriage',
        nameHi: 'सुखमय दांपत्य जीवन (उमा महेश्वर व गौरी स्तुति)',
        headerTitleEn: 'Shlokas for a Happy Marriage',
        headerTitleHi: 'सुखमय दांपत्य, प्रेम एवं गृह-शांति श्लोक',
        subtitleEn:
          'A marriage flourishes on love, patience and understanding between husband and wife. These verses invoke Uma and Maheshwara, the divine couple, as the very model of harmony. Chant these stotras together or alone, praying for peace and lasting affection in the home.',
        subtitleHi:
          'पति-पत्नी के मध्य अटूट प्रेम, आदर, धैर्य व सामंजस्य के लिए दिव्य आदर्श स्वरूप भगवान उमा-महेश्वर एवं भगवती गौरी की स्तुति।',
        deity: 'Shiva',
        image: imagePath.Bholenath,
        sanskrit:
          'नमः शिवाभ्यां नवयौवनाभ्यां परस्पराश्लिष्टवपुर्धराभ्याम् ।\nनगेन्द्रकन्यावृषकेतनाभ्यां नमो नमः शङ्करपार्वतीभ्याम् ॥ १ ॥',
        transliteration:
          'namaḥ śivābhyāṃ navayauvanābhyāṃ parasparāśliṣṭavapurdharābhyām .\nnagēndrakanyāvṛṣakētanābhyāṃ namō namaḥ śaṅkarapārvatībhyām .. 1 ..',
        meaningEn:
          "Salutations to Shiva and Parvati — the youthful divine couple who embrace each other's forms in tender union, the daughter of the mountain-king and the bull-bannered lord. Salutations again and again to Shankara and Parvati.",
        meaningHi:
          'नवयौवन से सम्पन्न, परस्पर आलिंगनबद्ध स्वरूप धारण करने वाले, गिरिराज-नन्दिनी पार्वती और वृषभध्वज भगवान शिव — उन कल्याणस्वरूप शंकर और पार्वती को बारंबार नमस्कार है।',
        verses: [
          {
            id: 'uma-maheswara-stotram',
            title: 'Uma Maheswara Stotram',
            titleHi: 'उमा महेश्वर स्तोत्रम् (श्लोक १)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/uma-maheswara-stotram.htm',
            sanskrit:
              'नमः शिवाभ्यां नवयौवनाभ्यां परस्पराश्लिष्टवपुर्धराभ्याम् ।\nनगेन्द्रकन्यावृषकेतनाभ्यां नमो नमः शङ्करपार्वतीभ्याम् ॥ १ ॥',
            transliteration:
              'namaḥ śivābhyāṃ navayauvanābhyāṃ parasparāśliṣṭavapurdharābhyām .\nnagēndrakanyāvṛṣakētanābhyāṃ namō namaḥ śaṅkarapārvatībhyām .. 1 ..',
            translationEn:
              "Salutations to Shiva and Parvati — the youthful divine couple who embrace each other's forms in tender union, the daughter of the mountain-king and the bull-bannered lord. Salutations again and again to Shankara and Parvati.",
            translationHi:
              'नवयौवन से सम्पन्न, परस्पर आलिंगनबद्ध स्वरूप धारण करने वाले, गिरिराज-नन्दिनी पार्वती और वृषभध्वज भगवान शिव — उन कल्याणस्वरूप शंकर और पार्वती को बारंबार नमस्कार है।',
            meaningEn:
              "Salutations to Shiva and Parvati — the youthful divine couple who embrace each other's forms in tender union, the daughter of the mountain-king and the bull-bannered lord. Salutations again and again to Shankara and Parvati.",
            meaningHi:
              'नवयौवन से सम्पन्न, परस्पर आलिंगनबद्ध स्वरूप धारण करने वाले, गिरिराज-नन्दिनी पार्वती और वृषभध्वज भगवान शिव — उन कल्याणस्वरूप शंकर और पार्वती को बारंबार नमस्कार है।',
          },
          {
            id: 'gauri-dasakam',
            title: 'Gauri Dasakam',
            titleHi: 'गौरी दशकम् (श्लोक १)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/gauri-dasakam.htm',
            sanskrit:
              'लीलालब्धस्थापितलुप्ताखिललोकां\nलोकातीतैर्योगिभिरन्तश्चिरमृग्याम् ।\nबालादित्यश्रेणिसमानद्युतिपुञ्जां\nगौरीमम्बामम्बुरुहाक्षीमहमीडे ॥ १ ॥',
            transliteration:
              'līlālabdhasthāpitaluptākhilalōkāṃ\nlōkātītairyōgibhirantaśchiramṛgyām .\nbālādityaśrēṇisamānadyutipuñjāṃ\ngaurīmambāmamburuhākṣīmahamīḍē .. 1 ..',
            translationEn:
              'She who has established, by divine sport (līlā), all the worlds that had been dissolved, and who is sought inwardly for a long time by yogīs who have transcended the world — blazing with the radiance of a line of young suns — may that Golden One (Gaurī) protect us.',
            translationHi:
              'जिन्होंने अपनी दिव्य लीला से समस्त प्रलयंकारी लोकों की पुनः स्थापना की है, जिनका ध्यान लोकातीत योगीजन अंतर्मन में चिरकाल से करते हैं, जो उदित होते सूर्य-समूह के समान दीप्तिमान हैं — उन कमलनयनी जगन्माता भगवती गौरी की मैं स्तुति करता हूँ।',
            meaningEn:
              'She who has established, by divine sport (līlā), all the worlds that had been dissolved, and who is sought inwardly for a long time by yogīs who have transcended the world — blazing with the radiance of a line of young suns — may that Golden One (Gaurī) protect us.',
            meaningHi:
              'जिन्होंने अपनी दिव्य लीला से समस्त प्रलयंकारी लोकों की पुनः स्थापना की है, जिनका ध्यान लोकातीत योगीजन अंतर्मन में चिरकाल से करते हैं, जो उदित होते सूर्य-समूह के समान दीप्तिमान हैं — उन कमलनयनी जगन्माता भगवती गौरी की मैं स्तुति करता हूँ।',
          },
          {
            id: 'parvati-vallabha-ashtakam',
            title: 'Parvati Vallabha Ashtakam',
            titleHi: 'पार्वती वल्लभ अष्टकम् (श्लोक १)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/parvati-vallabha-ashtakam.htm',
            sanskrit:
              'नमो भूतनाथं नमो देवदेवं\nनमः कालकालं नमो दिव्यतेजम् ।\nनमः कामभस्मं नमः शान्तशीलं\nभजे पार्वतीवल्लभं नीलकण्ठम् ॥ १ ॥',
            transliteration:
              'namō bhūtanāthaṃ namō dēvadēvaṃ\nnamaḥ kālakālaṃ namō divyatējam .\nnamaḥ kāmabhasmaṃ namō śāntaśīlaṃ\nbhajē pārvatīvallabhaṃ nīlakaṇṭham .. 1 ..',
            translationEn:
              'Salutations to the lord of all beings — salutations to the God of gods — salutations to the death of Kāla (Kālakāla, conqueror of Death) — salutations to the divine radiance. Salutations to the one who reduced Kāma to ash — salutations to the tranquil-natured — I worship Śiva, the beloved of Pārvatī (Pārvatī-vallabha).',
            translationHi:
              'भूतनाथ को नमस्कार, देवों के देव को नमस्कार, काल के भी काल (मृत्युंजय) एवं दिव्य तेज स्वरूप को नमस्कार। कामदेव को भस्म करने वाले, परम शांत स्वभाव वाले, भगवती पार्वती के प्रियतम नीलकंठ भगवान शिव की मैं वंदना करता हूँ।',
            meaningEn:
              'Salutations to the lord of all beings — salutations to the God of gods — salutations to the death of Kāla (Kālakāla, conqueror of Death) — salutations to the divine radiance. Salutations to the one who reduced Kāma to ash — salutations to the tranquil-natured — I worship Śiva, the beloved of Pārvatī (Pārvatī-vallabha).',
            meaningHi:
              'भूतनाथ को नमस्कार, देवों के देव को नमस्कार, काल के भी काल (मृत्युंजय) एवं दिव्य तेज स्वरूप को नमस्कार। कामदेव को भस्म करने वाले, परम शांत स्वभाव वाले, भगवती पार्वती के प्रियतम नीलकंठ भगवान शिव की मैं वंदना करता हूँ।',
          },
        ],
      },
      {
        id: 'for-having-children',
        nameEn: 'For Having Children',
        nameHi: 'संतान प्राप्ति (संतान गोपाल व षष्ठी देवी)',
        headerTitleEn: 'Shlokas for Having Children',
        headerTitleHi: 'संतान प्राप्ति, षष्ठी देवी एवं बालमुकुंद श्लोक',
        subtitleEn:
          'The longing for a child is among the most tender of prayers. These verses call on Krishna as Santana Gopala, giver of progeny, and on Goddess Shashti, guardian of children. Chant these mantras with faith and patience, praying for the blessing of a child.',
        subtitleHi:
          'संतान सुख की प्राप्ति, वंश वृद्धि एवं गर्भ रक्षा हेतु भगवान श्रीकृष्ण (संतान गोपाल), षष्ठी देवी एवं बाल मुकुंद के सिद्ध मंत्र।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        sanskrit:
          'ॐ देवकीसुत गोविन्द वासुदेव जगत्पते ।\nदेहि मे तनयं कृष्ण त्वामहं शरणं गतः ॥',
        transliteration:
          'oṃ devakīsuta govinda vāsudeva jagatpate .\ndehi me tanayaṃ kṛṣṇa tvāmahaṃ śaraṇaṃ gataḥ ..',
        meaningEn:
          'O Krishna, son of Devaki, Govinda, Vasudeva, Lord of the universe — grant me a child; I take refuge in You.',
        meaningHi:
          'हे देवकीनन्दन! हे गोविन्द! हे वासुदेव! हे जगत्पते! हे श्रीकृष्ण! मुझे उत्तम संतान (पुत्र) प्रदान कीजिए, मैं आपकी शरण में आया हूँ।',
        verses: [
          {
            id: 'santana-gopala-mantra',
            title: 'Santana Gopala Mantra',
            titleHi: 'सन्तान गोपाल मन्त्र',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/santana-gopala-mantra.htm',
            sanskrit:
              'ॐ देवकीसुत गोविन्द वासुदेव जगत्पते ।\nदेहि मे तनयं कृष्ण त्वामहं शरणं गतः ॥',
            transliteration:
              'oṃ devakīsuta govinda vāsudeva jagatpate .\ndehi me tanayaṃ kṛṣṇa tvāmahaṃ śaraṇaṃ gataḥ ..',
            translationEn:
              'O Krishna, son of Devaki, Govinda, Vasudeva, Lord of the universe — grant me a child; I take refuge in You.',
            translationHi:
              'हे देवकीनन्दन! हे गोविन्द! हे वासुदेव! हे जगत्पते! हे श्रीकृष्ण! मुझे उत्तम संतान (पुत्र) प्रदान कीजिए, मैं आपकी शरण में आया हूँ।',
            meaningEn:
              'O Krishna, son of Devaki, Govinda, Vasudeva, Lord of the universe — grant me a child; I take refuge in You.',
            meaningHi:
              'हे देवकीनन्दन! हे गोविन्द! हे वासुदेव! हे जगत्पते! हे श्रीकृष्ण! मुझे उत्तम संतान (पुत्र) प्रदान कीजिए, मैं आपकी शरण में आया हूँ।',
          },
          {
            id: 'sri-shashti-devi-stotram',
            title: 'Sri Shashti Devi Stotram',
            titleHi: 'श्री षष्ठी देवी स्तोत्रम् (ध्यानम् १)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sri-shashti-devi-stotram.htm',
            sanskrit:
              'ध्यानम्\nश्रीमन्मातरमम्बिकां विधिमनोजातां सदाभीष्टदां\nस्कन्देष्टां च जगत्प्रसूं विजयदां सत्पुत्र सौभाग्यदाम् ।\nसद्रत्नाभरणान्वितां सकरुणां शुभ्रां शुभां सुप्रभां\nषष्ठांशां प्रकृतेः परं भगवतीं श्रीदेवसेनां भजे ॥ १ ॥',
            transliteration:
              'dhyānam\nśrīmanmātaramambikāṃ vidhimanōjātāṃ sadābhīṣṭadāṃ\nskandēṣṭāṃ cha jagatprasūṃ vijayadāṃ satputra saubhāgyadām .\nsadratnābharaṇānvitāṃ sakaruṇāṃ śubhrāṃ śubhāṃ suprabhāṃ\nṣaṣṭhāṃśāṃ prakṛtēḥ paraṃ bhagavatīṃ śrīdēvasēnāṃ bhajē .. 1 ..',
            translationEn:
              'Dhyānam — Meditation verse 1: I worship Śrī Dēvasēnā — the auspicious Mother, Ambikā, born from the mind of Brahmā, ever the granter of all desires; beloved of Skanda, mother of the universe, bestower of victory, good sons, and good fortune; adorned with beautiful jeweled ornaments, compassionate, pure, radiant, and auspicious — the sixth portion of Prakṛti, the supreme divine Goddess.',
            translationHi:
              'ब्रह्माजी के मन से प्रकट, सर्वमनोरथ पूर्ण करने वाली, भगवान कार्तिकेय (स्कन्द) की प्रिया, जगज्जननी, विजय, सत्पुत्र व सौभाग्य प्रदायिनी, दिव्य रत्नों से विभूषित, परम करुणामयी, शुभ्रा और प्रकृति के षष्ठ अंश से आविर्भूत परा भगवती श्रीदेवसेना (षष्ठी देवी) की मैं वंदना करता हूँ।',
            meaningEn:
              'Dhyānam — Meditation verse 1: I worship Śrī Dēvasēnā — the auspicious Mother, Ambikā, born from the mind of Brahmā, ever the granter of all desires; beloved of Skanda, mother of the universe, bestower of victory, good sons, and good fortune; adorned with beautiful jeweled ornaments, compassionate, pure, radiant, and auspicious — the sixth portion of Prakṛti, the supreme divine Goddess.',
            meaningHi:
              'ब्रह्माजी के मन से प्रकट, सर्वमनोरथ पूर्ण करने वाली, भगवान कार्तिकेय (स्कन्द) की प्रिया, जगज्जननी, विजय, सत्पुत्र व सौभाग्य प्रदायिनी, दिव्य रत्नों से विभूषित, परम करुणामयी, शुभ्रा और प्रकृति के षष्ठ अंश से आविर्भूत परा भगवती श्रीदेवसेना (षष्ठी देवी) की मैं वंदना करता हूँ।',
          },
          {
            id: 'bala-mukundashtakam',
            title: 'Bala Mukundashtakam',
            titleHi: 'बालमुकुन्दाष्टकम् (श्लोक १)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bala-mukundashtakam.htm',
            sanskrit:
              'करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।\nवटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥ १॥',
            transliteration:
              'karāravindena padāravindaṃ mukhāravinde viniveśayantam .\nvaṭasya patrasya puṭe śayānaṃ bālaṃ mukundaṃ manasā smarāmi .. 1..',
            translationEn:
              '(My mind remembers that beautiful Bala Mukundam) who with his lotus like hands holds his lotus like feet, and puts the toe in his lotus like mouth, he rests on the fold of the banyan leaf (vata), my mind remembers that beautiful Bala Mukundam.',
            translationHi:
              'जो अपने करकमलों से चरणकमल को पकड़कर मुखकमल में उसके अंगूठे को धारण करते हैं, तथा वटवृक्ष के पत्ते के दोने पर शयन करते हैं — उन मनोहर बाल मुकुंद (श्रीकृष्ण) का मैं मन से स्मरण करता हूँ।',
            meaningEn:
              '(My mind remembers that beautiful Bala Mukundam) who with his lotus like hands holds his lotus like feet, and puts the toe in his lotus like mouth, he rests on the fold of the banyan leaf (vata), my mind remembers that beautiful Bala Mukundam.',
            meaningHi:
              'जो अपने करकमलों से चरणकमल को पकड़कर मुखकमल में उसके अंगूठे को धारण करते हैं, तथा वटवृक्ष के पत्ते के दोने पर शयन करते हैं — उन मनोहर बाल मुकुंद (श्रीकृष्ण) का मैं मन से स्मरण करता हूँ।',
          },
        ],
      },
      {
        id: 'for-safe-pregnancy',
        nameEn: 'For a Safe Pregnancy',
        nameHi: 'गर्भरक्षा एवं सुरक्षित प्रसव (गर्भरक्षाम्बिका स्तुति)',
        headerTitleEn: 'Shlokas for a Safe Pregnancy',
        headerTitleHi: 'गर्भरक्षा, सुखद प्रसव एवं मातृ-शिशु रक्षा श्लोक',
        subtitleEn:
          "Expecting a child brings joy and, with it, a natural wish to keep mother and baby safe. These stotras and mantras call on Garbharakshambika, 'she who protects the womb', through all nine months. Chant them daily during pregnancy, for a safe term and a safe delivery.",
        subtitleHi:
          'गर्भावस्था के दौरान गर्भस्थ शिशु एवं माता की सुरक्षा, उत्तम स्वास्थ्य तथा निर्विघ्न प्रसव हेतु माँ गर्भरक्षाम्बिका एवं प्रजापति के सिद्ध मंत्र व स्तोत्र।',
        deity: 'Durga',
        image: imagePath.Durga,
        sanskrit:
          'ॐ गर्भरक्षाम्बिकायै च विद्महे मङ्गल देवतायै च धीमहि तन्नो देवी प्रचोदयात्',
        transliteration:
          'oṃ garbharakṣāmbikāyai ca vidmahe maṅgala devatāyai ca dhīmahitanno devī pracodayāt',
        meaningEn:
          'Om. May we know Garbharakṣāmbikā (the Mother who protects the womb); for that may we meditate upon the auspicious deity. May that Goddess impel us onward.',
        meaningHi:
          'हम गर्भ की रक्षा करने वाली भगवती गर्भरक्षाम्बिका को जानते हैं तथा समस्त मंगलों की अधिष्ठात्री देवी का ध्यान करते हैं; वे देवी हमें सन्मार्ग और कल्याण की ओर प्रेरित करें।',
        verses: [
          {
            id: 'garbha-rakshambika-gayatri-mantra',
            title: 'Garbha Rakshambika Gayatri Mantra',
            titleHi: 'गर्भरक्षाम्बिका गायत्री मन्त्र',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/garbha-rakshambika-gayatri-mantra.htm',
            sanskrit:
              'ॐ गर्भरक्षाम्बिकायै च विद्महे मङ्गल देवतायै च धीमहि तन्नो देवी प्रचोदयात्',
            transliteration:
              'oṃ garbharakṣāmbikāyai ca vidmahe maṅgala devatāyai ca dhīmahitanno devī pracodayāt',
            translationEn:
              'Om. May we know Garbharakṣāmbikā (the Mother who protects the womb); for that may we meditate upon the auspicious deity. May that Goddess impel us onward.',
            translationHi:
              'हम गर्भ की रक्षा करने वाली भगवती गर्भरक्षाम्बिका को जानते हैं तथा समस्त मंगलों की अधिष्ठात्री देवी का ध्यान करते हैं; वे देवी हमें सन्मार्ग और कल्याण की ओर प्रेरित करें।',
            meaningEn:
              'Om. May we know Garbharakṣāmbikā (the Mother who protects the womb); for that may we meditate upon the auspicious deity. May that Goddess impel us onward.',
            meaningHi:
              'हम गर्भ की रक्षा करने वाली भगवती गर्भरक्षाम्बिका को जानते हैं तथा समस्त मंगलों की अधिष्ठात्री देवी का ध्यान करते हैं; वे देवी हमें सन्मार्ग और कल्याण की ओर प्रेरित करें।',
          },
          {
            id: 'garbha-rakshambika-stotram',
            title: 'Garbha Rakshambika Stotram',
            titleHi: 'गर्भरक्षाम्बिका स्तोत्रम् (श्लोक १)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/garbha-rakshambika-stotram.htm',
            sanskrit:
              'वापीतटे वामभागे वामदेवस्य देवस्य देवी स्थिता त्वम् ।\nमान्या वरेण्या वदान्या पाहि गर्भस्थजन्तून् तथा भक्तलोकान् ।\nश्रीमाधवी-काननस्थे गर्भरक्षाम्बिके पाहि भक्तं स्तुवन्तम् ॥ १॥',
            transliteration:
              'vāpītaṭe vāmabhāge vāmadevasya devasya devī sthitā tvam .\nmānyā vareṇyā vadānyā pāhi garbhasthajantūn tathā bhaktalokān .\nśrīmādhavī-kānanasthe garbharakṣāmbike pāhi bhaktaṃ stuvantam .. 1..',
            translationEn:
              'On the bank of the tank, on the left side of the god Vāmadeva, you stand as the Goddess. Honored, most excellent, and bountiful, protect the beings dwelling in the womb, and likewise the throngs of devotees. O you who dwell in the sacred Mādhavī grove, O Garbharakṣāmbikā (Mother who guards the womb), protect this devotee who praises you.',
            translationHi:
              'सरोवर के तट पर, भगवान वामदेव के वाम भाग में विराजमान हे देवी! पूज्य, वरेण्य और उदार हृदय वाली माँ, गर्भ में स्थित जीवों तथा अपने भक्तजनों की रक्षा करें। पवित्र माधवी वन में वास करने वाली हे गर्भरक्षाम्बिके! स्तुति करने वाले इस भक्त की रक्षा कीजिए।',
            meaningEn:
              'On the bank of the tank, on the left side of the god Vāmadeva, you stand as the Goddess. Honored, most excellent, and bountiful, protect the beings dwelling in the womb, and likewise the throngs of devotees. O you who dwell in the sacred Mādhavī grove, O Garbharakṣāmbikā (Mother who guards the womb), protect this devotee who praises you.',
            meaningHi:
              'सरोवर के तट पर, भगवान वामदेव के वाम भाग में विराजमान हे देवी! पूज्य, वरेण्य और उदार हृदय वाली माँ, गर्भ में स्थित जीवों तथा अपने भक्तजनों की रक्षा करें। पवित्र माधवी वन में वास करने वाली हे गर्भरक्षाम्बिके! स्तुति करने वाले इस भक्त की रक्षा कीजिए।',
          },
          {
            id: 'garbha-rakshana-stotram',
            title: 'Garbha Rakshana Stotram',
            titleHi: 'गर्भरक्षण स्तोत्रम् (श्लोक १)',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/garbha-rakshana-stotram.htm',
            sanskrit:
              'एह्यहि भगवन् ब्रह्मन् प्रजाकर्तः प्रजापते ।\nप्रगृह्णीष्व बलिं चेमं सापत्यं रक्ष गर्भिणीम् ॥ १॥',
            transliteration:
              'ehyahi bhagavan brahman prajākartaḥ prajāpate .\npragṛhṇīṣva baliṃ cemaṃ sāpatyaṃ rakṣa garbhiṇīm .. 1..',
            translationEn:
              'Come, O come, revered Lord, O Brahman, O maker of creatures, O Prajāpati! Accept this offering, and protect this pregnant woman together with her offspring.',
            translationHi:
              'आइए, पधारिए, हे पूज्य भगवान ब्रह्मा! हे सृष्टि के रचयिता, हे प्रजापति! इस भक्तिपूर्ण अर्घ्य/नैवेद्य को स्वीकार कीजिए और इस गर्भवती माता की उसके गर्भस्थ शिशु सहित रक्षा कीजिए।',
            meaningEn:
              'Come, O come, revered Lord, O Brahman, O maker of creatures, O Prajāpati! Accept this offering, and protect this pregnant woman together with her offspring.',
            meaningHi:
              'आइए, पधारिए, हे पूज्य भगवान ब्रह्मा! हे सृष्टि के रचयिता, हे प्रजापति! इस भक्तिपूर्ण अर्घ्य/नैवेद्य को स्वीकार कीजिए और इस गर्भवती माता की उसके गर्भस्थ शिशु सहित रक्षा कीजिए।',
          },
        ],
      },
      {
        id: 'for-a-new-home',
        nameEn: 'When Moving into a New Home',
        nameHi: 'गृह प्रवेश एवं वास्तु शांति (वास्तोष्पते सूक्तम्)',
        headerTitleEn: 'Shlokas for a New Home',
        headerTitleHi:
          'गृह प्रवेश, वास्तु पुरुष प्रार्थना एवं वास्तोष्पते सूक्त',
        subtitleEn:
          'Moving into a new home is a fresh beginning, blessed at the threshold with griha pravesh. Begin with Gajananam to clear the way, then these Vastu verses — Vastu Purusha Prarthana and the Vastu Suktam (Vastoshpati) — for peace and prosperity within. Chant them as you enter, consecrating the home and all who will live in it.',
        subtitleHi:
          'नए घर में प्रवेश (गृह प्रवेश) के समय विघ्न विनाशक गणेश जी की वंदना, वास्तु पुरुष प्रार्थना तथा ऋग्वैदिक वास्तोष्पते सूक्त से घर में सुख, शांति एवं समृद्धि की स्थापना।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        sanskrit:
          'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
        transliteration:
          'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam .\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam ..',
        meaningEn:
          'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
        meaningHi:
          'जो भूतगणों द्वारा पूजित हैं, कैथ और जामुन के फलों का रसपान करते हैं, माता उमा के प्रिय पुत्र हैं और सभी दुखों का नाश करने वाले हैं — उन विघ्नेश्वर भगवान गणेश के चरण कमलों में मैं नमन करता हूँ।',
        verses: [
          {
            id: 'gajananam-bhuthaganadhi',
            title: 'Gajananam Bhuthaganadhi',
            titleHi: 'गजाननं भूतगणादि सेवितम्',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gajananam-bhuthaganadhi.htm',
            sanskrit:
              'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
            transliteration:
              'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam .\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam ..',
            translationEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            translationHi:
              'जो भूतगणों द्वारा पूजित हैं, कैथ और जामुन के फलों का रसपान करते हैं, माता पार्वती के पुत्र हैं और शोक का नाश करने वाले हैं — उन विघ्नहर्ता श्री गणेश के चरण कमलों में मेरा प्रणाम।',
            meaningEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            meaningHi:
              'जो भूतगणों द्वारा पूजित हैं, कैथ और जामुन के फलों का रसपान करते हैं, माता पार्वती के पुत्र हैं और शोक का नाश करने वाले हैं — उन विघ्नहर्ता श्री गणेश के चरण कमलों में मेरा प्रणाम।',
          },
          {
            id: 'vastu-purusha-prarthana',
            title: 'Vastu Purusha Prarthana',
            titleHi: 'वास्तु पुरुष प्रार्थना',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/vastu-purusha-prarthana.htm',
            sanskrit:
              'वास्तोष्पते नमस्तेऽस्तु भूशय्यानिरत प्रभो ।\nमद्गृहे धनधान्यादिसमृद्धिं कुरु सर्वदा ॥',
            transliteration:
              "vāstoṣpate namaste'stu bhūśayyānirata prabho .\nmadgṛhe dhanadhānyādisamṛddhiṃ kuru sarvadā ..",
            translationEn:
              'Salutations to you, O Vastu Purusha, Lord who rests upon the earth; ever make my home abound in wealth, grain, and all prosperity.',
            translationHi:
              'हे वास्तोष्पति! हे पृथ्वी पर शयन करने वाले प्रभु! आपको सादर नमस्कार है। मेरे इस घर में सदा धन, धान्य और समस्त प्रकार की समृद्धि प्रदान कीजिए।',
            meaningEn:
              'Salutations to you, O Vastu Purusha, Lord who rests upon the earth; ever make my home abound in wealth, grain, and all prosperity.',
            meaningHi:
              'हे वास्तोष्पति! हे पृथ्वी पर शयन करने वाले प्रभु! आपको सादर नमस्कार है। मेरे इस घर में सदा धन, धान्य और समस्त प्रकार की समृद्धि प्रदान कीजिए।',
          },
          {
            id: 'vastu-suktam',
            title: 'Vastu Suktam',
            titleHi: 'वास्तोष्पते सूक्तम् (ऋग्वेद)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/vastu-suktam.htm',
            sanskrit:
              'वास्तोष्पते प्रति जानीह्यस्मान्त्स्वावेशो अनमीवो भवा नः ।\nयत्त्वेमहे प्रति तन्नो जुषस्व शं नो भव द्विपदे शं चतुष्पदे ॥ १ ॥\n\nवास्तोष्पते प्रतरणो न एधि गयस्फानो गोभिरश्वेभिरिन्दो ।\nअजरासस्ते सख्ये स्याम पितेव पुत्रान्प्रति नो जुषस्व ॥ २ ॥\n\nवास्तोष्पते शग्मया संसदा ते सक्षीमहि रण्वया गातुमत्या ।\nपाहि क्षेम उत योगे वरं नो यूयं पात स्वस्तिभिः सदा नः ॥ ३ ॥\n\nअमीवहा वास्तोष्पते विश्वा रूपाण्याविशन् ।\nसखा सुशेव एधि नः ॥ ४ ॥\n\nवास्तोष्पते ध्रुवा स्थूणांसत्रं सोम्यानाम् ।\nद्रप्सो भेत्ता पुरां शश्वतीनामिन्द्रो मुनीनां सखा ॥ ५ ॥',
            transliteration:
              'vāstoṣpate prati jānīhyasmāntsvāveśo anamīvo bhavā naḥ .\nyattvemahe prati tanno juṣasva śaṃ no bhava dvipade śaṃ catuṣpade .. 1 ..\n\nvāstoṣpate prataraṇo na edhi gayasphāno gobhiraśvebhirindo .\najarāsaste sakhye syāma piteva putrānprati no juṣasva .. 2 ..\n\nvāstoṣpate śagmayā saṃsadā te sakṣīmahi raṇvayā gātumatyā .\npāhi kṣema uta yoge varaṃ no yūyaṃ pāta svastibhiḥ sadā naḥ .. 3 ..\n\namīvahā vāstoṣpate viśvā rūpāṇyāviśan .\nsakhā suśeva edhi naḥ .. 4 ..\n\nvāstoṣpate dhruvā sthūṇāṃsatraṃ somyānām .\ndrapso bhettā purāṃ śaśvatīnām indro munīnāṃ sakhā .. 5 ..',
            translationEn:
              'O Vastoshpati, guardian of the dwelling, acknowledge us; bring no disease and grant us a happy entrance. Whatever we ask of you, be pleased to grant it, and prosper our bipeds and quadrupeds.\n\nO Vastoshpati, be our promoter; increase our household with cattle and horses, O Indu. May we stay ever youthful in your friendship; favour us as a father favours his sons.\n\nO Vastoshpati, through your dear, auspicious fellowship may we be victorious. Protect our happiness in rest and in labour. Preserve us evermore, O Gods, with blessings.\n\nO Vastoshpati, remover of disease, who enter all forms — be our friend and grant us happiness.\n\nO Vastoshpati, may the house-pillar stand firm, and may there be strength for those who offer Soma. May Indra — the bright drop, destroyer of enduring cities — be the friend of the sages.',
            translationHi:
              'हे वास्तोष्पति (घर के स्वामी/वास्तुदेव)! हमें स्वीकार कीजिए; हमारे लिए यह गृह कल्याणकारी व रोगरहित बनाइए। हम जो प्रार्थना करें उसे पूर्ण करें और हमारे परिवार व पशुओं का मंगल करें।\n\nहे वास्तोष्पति! हमारे गृह की समृद्धि बढ़ाएं। पिता के समान स्नेह करें और हमें रोगमुक्त व समर्थ रखें।\n\nहे वास्तुदेव! आपके सान्निध्य में हमारी विजय हो, हमारे योग-क्षेम की रक्षा करें।\n\nहे व्याधिनाशक वास्तुदेव! आप हमारे परम कल्याणकारी मित्र बनें।\n\nहमारे घर के आधार स्तंभ दृढ़ रहें और प्रभु की कृपा सदा बनी रहे।',
            meaningEn:
              'O Vastoshpati, guardian of the dwelling, acknowledge us; bring no disease and grant us a happy entrance. Whatever we ask of you, be pleased to grant it, and prosper our bipeds and quadrupeds.',
            meaningHi:
              'हे वास्तोष्पति (वास्तुदेव)! हमें स्वीकार कीजिए; हमारे लिए यह गृह कल्याणकारी, रोगरहित एवं सुख-समृद्धि प्रदाता बनाइए।',
          },
        ],
      },
      {
        id: 'for-old-age',
        nameEn: 'In Old Age',
        nameHi: 'वृद्धावस्था एवं भगवद् स्मरण (भज गोविन्दम् व विष्णु सहस्रनाम)',
        headerTitleEn: 'Shlokas for Old Age',
        headerTitleHi: 'वृद्धावस्था, आत्म-शांति एवं भगवन्नाम स्मरण श्लोक',
        subtitleEn:
          "As the years pass and the body slows, the mind naturally turns toward God. These stotras — Bhaja Govindam's call to worship and the thousand names of Vishnu — are a comfort and a companion in old age. Chant them daily, letting the name of the Lord fill the later years with peace.",
        subtitleHi:
          "जीवन के उत्तरार्ध में आत्म-शांति, वैराग्य एवं ईश्वर-चिन्तन हेतु आदि शंकराचार्य विरचित 'भज गोविन्दम्' तथा श्री 'विष्णु सहस्रनाम' के पावन श्लोक।",
        deity: 'Krishna',
        image: imagePath.Krishna,
        sanskrit:
          'भज गोविन्दं भज गोविन्दं\nगोविन्दं भज मूढमते ।\nसम्प्राप्ते सन्निहिते काले\nनहि नहि रक्षति डुकृञ्करणे ॥ १ ॥',
        transliteration:
          'bhaja govindaṃ bhaja govindaṃ\ngovindaṃ bhaja mūḍhamate |\nsamprāpte sannihite kāle\nnahi nahi rakṣati ḍukṛñkaraṇe .. 1 ..',
        meaningEn:
          'Worship Govinda, worship Govinda, worship Govinda, O foolish mind! When the appointed time of death draws near, the rules of grammar will surely not save you.',
        meaningHi:
          'हे मूढ़ मन! गोविन्द का भजन कर, गोविन्द को भज, गोविन्द का ही नाम ले। जब अंत समय निकट आ जाएगा, तब व्याकरण के नियम अथवा सांसारिक तर्क-वितर्क तुम्हारी रक्षा नहीं करेंगे।',
        verses: [
          {
            id: 'bhaja-govindam-all-verses',
            title: 'Bhaja Govindam (Moha Mudgara)',
            titleHi: 'भज गोविन्दम् (श्लोक १)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bhaja-govindam-all-verses.htm',
            sanskrit:
              'भज गोविन्दं भज गोविन्दं\nगोविन्दं भज मूढमते ।\nसम्प्राप्ते सन्निहिते काले\nनहि नहि रक्षति डुकृञ्करणे ॥ १ ॥',
            transliteration:
              'bhaja govindaṃ bhaja govindaṃ\ngovindaṃ bhaja mūḍhamate |\nsamprāpte sannihite kāle\nnahi nahi rakṣati ḍukṛñkaraṇe .. 1 ..',
            translationEn:
              'Worship Govinda, worship Govinda, worship Govinda, O foolish mind! When the appointed time of death draws near, the rules of grammar will surely not save you.',
            translationHi:
              'हे मूढ़ मन! गोविन्द का भजन कर, गोविन्द को भज, गोविन्द का ही नाम ले। जब अंत समय निकट आ जाएगा, तब व्याकरण के नियम अथवा सांसारिक तर्क-वितर्क तुम्हारी रक्षा नहीं करेंगे।',
            meaningEn:
              'Worship Govinda, worship Govinda, worship Govinda, O foolish mind! When the appointed time of death draws near, the rules of grammar will surely not save you.',
            meaningHi:
              'हे मूढ़ मन! गोविन्द का भजन कर, गोविन्द को भज, गोविन्द का ही नाम ले। जब अंत समय निकट आ जाएगा, तब व्याकरण के नियम अथवा सांसारिक तर्क-वितर्क तुम्हारी रक्षा नहीं करेंगे।',
          },
          {
            id: 'vishnu-sahasranamam',
            title: 'Vishnu Sahasranamam (Mangalacharanam)',
            titleHi: 'विष्णु सहस्रनाम (मङ्गलाचरणम्)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/vishnu-sahasranamam.htm',
            sanskrit:
              'मङ्गलाचरणम्\nॐ शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥ १ ॥',
            transliteration:
              'maṅgalācaraṇam\nōṃ śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ chaturbhujam ।\nprasannavadanaṃ dhyāyēt sarvavighnōpaśāntayē .. 1 ..',
            translationEn:
              'I meditate upon Lord Vishnu, who wears white garments, who is of the colour of the moon, who has four arms, and who has a pleasing, smiling face. May He remove all obstacles.',
            translationHi:
              'श्वेत वस्त्र धारण करने वाले, चन्द्रमा के समान धवल कान्ति वाले, चार भुजाओं वाले तथा प्रसन्न मुख वाले भगवान श्री हरि विष्णु का मैं समस्त विघ्नों की शांति के लिए ध्यान करता हूँ।',
            meaningEn:
              'I meditate upon Lord Vishnu, who wears white garments, who is of the colour of the moon, who has four arms, and who has a pleasing, smiling face. May He remove all obstacles.',
            meaningHi:
              'श्वेत वस्त्र धारण करने वाले, चन्द्रमा के समान धवल कान्ति वाले, चार भुजाओं वाले तथा प्रसन्न मुख वाले भगवान श्री हरि विष्णु का मैं समस्त विघ्नों की शांति के लिए ध्यान करता हूँ।',
          },
        ],
      },
    ],
  },
  children: {
    id: 'occasion-children',
    slug: 'children',
    titleEn: 'For Children',
    titleHi: 'बच्चों के लिए',
    descriptionEn:
      'For the little ones — the first shlokas a child learns by heart, and prayers for their health and wellbeing.',
    descriptionHi:
      'नन्हें बच्चों के लिए — कंठस्थ करने योग्य प्रथम सरल श्लोक एवं उनके उत्तम स्वास्थ्य व रक्षा हेतु प्रार्थनाएं।',
    imageUrl: 'https://shlokam.org/assets/domains/for-children.jpeg',
    path: '/shloka/prayers/children.htm',
    items: [
      {
        id: 'for-children-to-learn',
        nameEn: 'Simple Shlokas for Children',
        nameHi: 'बच्चों के सीखने योग्य सरल श्लोक',
        headerTitleEn: 'Simple Shlokas for Children',
        headerTitleHi: 'बच्चों के नित्य स्मरण हेतु 10 मंगलकारी श्लोक',
        subtitleEn:
          'The tradition begins in childhood, with a few short verses learned by heart long before their meaning is understood. These simple shlokas — to Ganesha, Saraswati and the guru — are the first every child is taught. Teach them a line at a time, and let the child chant along each morning, the first seeds of a lifelong practice.',
        subtitleHi:
          'बाल्यकाल में संस्कार, सद्बुद्धि एवं एकाग्रता हेतु भगवान गणेश, माँ सरस्वती, गुरु व हनुमान जी के 10 सरल, सुमधुर एवं कंठस्थ करने योग्य वैदिक श्लोक।',
        deity: 'Ganesha',
        image: imagePath.Ganesha,
        sanskrit:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        transliteration:
          'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
        meaningEn:
          'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
        meaningHi:
          'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
        verses: [
          {
            id: 'vakratunda-mahakaya-child-sec',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (गणेश प्रार्थना)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            translationHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
            meaningEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            meaningHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा और सर्वदा विघ्नरहित (सफल) करें।',
          },
          {
            id: 'karaagre-vasathe-child-sec',
            title: 'Karaagre Vasathe',
            titleHi: 'कराग्रे वसते लक्ष्मीः (करदर्शनम्)',
            deity: 'Laxmi',
            image: imagePath.Laxmi,
            link: 'https://shlokam.org/shloka/karaagre-vasathe.htm',
            sanskrit:
              'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वति ।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम् ॥',
            transliteration:
              'karāgre vasate lakṣmīḥ karamadhye sarasvatī\nkaramūle tu govindaḥ prabhāte karadarśanam',
            translationEn:
              "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            translationHi:
              'हाथ के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल में भगवान गोविंद (विष्णु) निवास करते हैं। अतः प्रातःकाल उठकर अपनी हथेलियों के दर्शन करने चाहिए।',
            meaningEn:
              "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            meaningHi:
              'हाथ के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल में भगवान गोविंद (विष्णु) निवास करते हैं। अतः प्रातःकाल उठकर अपनी हथेलियों के दर्शन करने चाहिए।',
          },
          {
            id: 'shuklambaradharam-child-sec',
            title: 'Shuklambaradharam',
            titleHi: 'शुक्लाम्बरधरं विष्णुं (विघ्न निवारण)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/shuklambaradharam.htm',
            sanskrit:
              'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥',
            transliteration:
              'śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam .\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye ..',
            translationEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a (bright) complexion like the moon, who has four hands, who has a cheerful face, for the removal of all obstacles. (Alternatively) I meditate upon Lord Vishnu, who wears white garments, who is of the colour of the moon, who has four arms, and who has a pleasing, smiling face. May He remove all obstacles.',
            translationHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान का मैं समस्त विघ्नों की शान्ति हेतु ध्यान करता हूँ।',
            meaningEn:
              'I meditate upon (Lord Ganesha), the one who wears a white garment, who is all-pervasive, who has a (bright) complexion like the moon, who has four hands, who has a cheerful face, for the removal of all obstacles. (Alternatively) I meditate upon Lord Vishnu, who wears white garments, who is of the colour of the moon, who has four arms, and who has a pleasing, smiling face. May He remove all obstacles.',
            meaningHi:
              'श्वेत वस्त्र धारण करने वाले, सर्वव्यापी, चन्द्रमा के समान कांतिमान, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान का मैं समस्त विघ्नों की शान्ति हेतु ध्यान करता हूँ।',
          },
          {
            id: 'guru-brahma-guru-vishnu-child-sec',
            title: 'Guru Brahma Guru Vishnu',
            titleHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः (गुरु वंदना)',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/guru-brahma-guru-vishnu.htm',
            sanskrit:
              'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः ॥',
            transliteration:
              'gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ\nguruḥ sākṣāt parabrahma tasmai śrī gurave namaḥ',
            translationEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            translationHi:
              'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा प्रणाम।',
            meaningEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            meaningHi:
              'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा प्रणाम।',
          },
          {
            id: 'sarasvati-namasthubyam-child-sec',
            title: 'Sarasvati Namasthubyam',
            titleHi: 'सरस्वति नमस्तुभ्यं (विद्यारम्भ)',
            deity: 'Saraswati',
            image: imagePath.Saraswati,
            link: 'https://shlokam.org/shloka/sarasvati-namasthubyam.htm',
            sanskrit:
              'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
            transliteration:
              'sarasvati namastubhyaṃ varade kāmarūpiṇi\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā',
            translationEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            translationHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
            meaningEn:
              'O Sarasvatī, I bow to you, the giver of boons, who fulfills desires. I am beginning my pursuit of knowledge. May success always be mine.',
            meaningHi:
              'हे वरदायिनी और सर्व मनोकामनाएं पूर्ण करने वाली माँ सरस्वती! आपको मेरा नमस्कार है। मैं अपनी विद्या का अध्ययन प्रारंभ कर रहा हूँ, मुझे इसमें सदा सफलता व सिद्धि प्राप्त हो।',
          },
          {
            id: 'shubham-karothi-kalyanam-child-sec',
            title: 'Shubham Karothi Kalyanam',
            titleHi: 'शुभं करोति कल्याणम् (दीप स्तुति)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/shubham-karothi-kalyanam.htm',
            sanskrit:
              'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥\nदीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते ॥',
            transliteration:
              "śubhaṃ karoti kalyāṇamārogyaṃ dhanasaṃpadā .\nśatrubuddhivināśāya dīpajyotirnamo'stute ..\ndīpajyotiḥ parabrahma dīpajyotirjanārdanaḥ .\ndīpo haratu me pāpaṃ dīpajyotirnamo'stute ..",
            translationEn:
              'Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of the intellect’s enemy (ignorance). Deepa-Jyothi is the supreme Brahman, Deepa-Jyothi is Janardhana. May the divine lamp eradicate my sins. Salutations to the divine lamp of the evening.',
            translationHi:
              'शुभ, कल्याण, उत्तम आरोग्य और धन-सम्पत्ति देने वाली तथा दुर्बुद्धि का नाश करने वाली दीपक की दिव्य ज्योति को मेरा नमस्कार है। दीपक की ज्योति ही परब्रह्म और जनार्दन है।',
            meaningEn:
              'Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of the intellect’s enemy (ignorance).',
            meaningHi:
              'शुभ, कल्याण, उत्तम आरोग्य और धन-सम्पत्ति देने वाली तथा दुर्बुद्धि का नाश करने वाली दीपक की दिव्य ज्योति को मेरा नमस्कार है।',
          },
          {
            id: 'gajananam-bhuthaganadhi-child-sec',
            title: 'Gajananam Bhuthaganadhi',
            titleHi: 'गजाननं भूतगणादि सेवितम् (विघ्नेश्वर वंदना)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/gajananam-bhuthaganadhi.htm',
            sanskrit:
              'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
            transliteration:
              'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam .\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam ..',
            translationEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            translationHi:
              'हाथी के समान मुख वाले, समस्त गणों द्वारा सेवित, कैथ और जामुन के फलों का रसपान करने वाले, माता पार्वती के पुत्र और समस्त दुःखों का नाश करने वाले विघ्नहर्ता भगवान गणेश के चरण-कमलों में मैं प्रणाम करता हूँ।',
            meaningEn:
              'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            meaningHi:
              'हाथी के समान मुख वाले, समस्त गणों द्वारा सेवित, कैथ और जामुन के फलों का रसपान करने वाले, माता पार्वती के पुत्र और समस्त दुःखों का नाश करने वाले विघ्नहर्ता भगवान गणेश के चरण-कमलों में मैं प्रणाम करता हूँ।',
          },
          {
            id: 'manojavam-maruthathulyavegam-child-sec',
            title: 'Manojavam Maruthathulyavegam',
            titleHi: 'मनोजवं मारुततुल्यवेगम् (हनुमान स्मरण)',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/manojavam-maruthathulyavegam.htm',
            sanskrit:
              'मनोजवं मारुततुल्यवेगं\nजितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं\nश्रीरामदूतं शिरसा नमामि ॥',
            transliteration:
              'manojavaṃ mārutatulyavegaṃ\njitendriyaṃ buddhimatāṃ variṣṭham .\nvātātmajaṃ vānarayūthamukhyaṃ\nśrīrāmadūtaṃ śirasā namāmi ..',
            translationEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as powerful as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vānarās (monkey army).',
            translationHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
            meaningEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as powerful as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vānarās (monkey army).',
            meaningHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
          },
          {
            id: 'brahmarpanam-brahma-havih-child-sec',
            title: 'Brahmarpanam Brahma Havih',
            titleHi: 'ब्रह्मार्पणं ब्रह्म हविः (भोजन मन्त्र)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/brahmarpanam-brahma-havih.htm',
            sanskrit:
              'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
            transliteration:
              'brahmārpaṇaṃ brahma havirbrahmāgnau brahmaṇā hutam .\nbrahmaiva tena gantavyaṃ brahmakarma samādhinā ..',
            translationEn:
              'Brahman is the offering (the ritual or act of offering), Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            translationHi:
              'अर्पण ब्रह्म है, हविष्य (अन्न) ब्रह्म है, ब्रह्म रूप कर्ता द्वारा ब्रह्म रूप जठराग्नि में आहुति दी जाती है—समस्त कर्मों में परमात्मा का दर्शन करने वाले को परमात्मा की ही प्राप्ति होती है।',
            meaningEn:
              'Brahman is the offering (the ritual or act of offering), Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            meaningHi:
              'अर्पण ब्रह्म है, हविष्य (अन्न) ब्रह्म है, ब्रह्म रूप कर्ता द्वारा ब्रह्म रूप जठराग्नि में आहुति दी जाती है—समस्त कर्मों में परमात्मा का दर्शन करने वाले को परमात्मा की ही प्राप्ति होती है।',
          },
          {
            id: 'gayatri-mantra-child-sec',
            title: 'Gayatri Mantra',
            titleHi: 'गायत्री मन्त्र (महामन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/gayatri-mantra.htm',
            sanskrit:
              'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
            transliteration:
              'oṃ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṃ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ..',
            translationEn:
              'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms (physical, astral, and celestial). May He enlighten our intellect and awaken our understanding, so that it may guide us along the righteous path.',
            translationHi:
              'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करें।',
            meaningEn:
              'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms (physical, astral, and celestial). May He enlighten our intellect and awaken our understanding, so that it may guide us along the righteous path.',
            meaningHi:
              'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करें।',
          },
        ],
      },
      {
        id: 'for-childs-health',
        nameEn: "For a Child's Health",
        nameHi: 'बाल स्वास्थ्य एवं रक्षा (षष्ठी देवी व बालमुकुंद)',
        headerTitleEn: "Shlokas for a Child's Health",
        headerTitleHi: 'बाल स्वास्थ्य, सुरक्षा एवं षष्ठी देवी स्तुति',
        subtitleEn:
          "A child's wellbeing is a parent's constant prayer, especially through the tender early years. These stotras call on Goddess Shashti and the infant Krishna to watch over the little one. Chant them for a child's health, safety and protection from harm.",
        subtitleHi:
          'संतान के उत्तम स्वास्थ्य, सुरक्षा, दीर्घायु एवं अनिष्ट निवारण हेतु माँ षष्ठी देवी एवं भगवान बाल मुकुंद के सिद्ध स्तोत्र।',
        descriptionEn:
          "A child's wellbeing is a parent's constant prayer, especially through the tender early years. These stotras call on Goddess Shashti and the infant Krishna to watch over the little one. Chant them for a child's health, safety and protection from harm.",
        descriptionHi:
          'संतान का उत्तम स्वास्थ्य व सुरक्षा प्रत्येक माता-पिता की निरंतर प्रार्थना होती है। षष्ठी देवी व बाल मुकुंद भगवान श्रीकृष्ण के ये पावन श्लोक बच्चों को रोगों व अनिष्ट से बचाकर दीर्घायु, स्वास्थ्य व सुरक्षा प्रदान करते हैं।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        path: '/shloka/prayers/for-childs-health.htm',
        sanskrit:
          'करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।\nवटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥ १ ॥',
        transliteration:
          'karāravindena padāravindaṃ mukhāravinde viniveśayantam .\nvaṭasya patrasya puṭe śayānaṃ bālaṃ mukundaṃ manasā smarāmi .. 1 ..',
        meaningHi:
          'जो अपने करकमलों द्वारा अपने चरणकमल को पकड़कर मुखकमल में डाल रहे हैं, और वट वृक्ष के पत्ते पर शयन कर रहे हैं—उन बाल रूप श्री मुकुन्द का मैं मन ही मन स्मरण करता हूँ।',
        meaningEn:
          '(My mind remembers that beautiful Bala Mukundam) who with his lotus like hands holds his lotus like feet, and puts the toe in his lotus like mouth, he rests on the fold of the banyan leaf (vata), my mind remembers that beautiful Bala Mukundam.',
        verses: [
          {
            id: 'sri-shashti-devi-stotram-ch',
            title: 'Sri Shashti Devi Stotram',
            titleHi: 'श्री षष्ठी देवी स्तोत्रम् (ध्यानम् १)',
            sanskrit:
              'ध्यानम्\nश्रीमन्मातरमम्बिकां विधिमनोजातां सदाभीष्टदां\nस्कन्देष्टां च जगत्प्रसूं विजयदां सत्पुत्र सौभाग्यदाम् ।\nसद्रत्नाभरणान्वितां सकरुणां शुभ्रां शुभां सुप्रभां\nषष्ठांशां प्रकृतेः परं भगवतीं श्रीदेवसेनां भजे ॥ १ ॥',
            transliteration:
              'dhyānam\nśrīmanmātaramambikāṃ vidhimanōjātāṃ sadābhīṣṭadāṃ\nskandēṣṭāṃ cha jagatprasūṃ vijayadāṃ satputra saubhāgyadām ।\nsadratnābharaṇānvitāṃ sakaruṇāṃ śubhrāṃ śubhāṃ suprabhāṃ\nṣaṣṭhāṃśāṃ prakṛtēḥ paraṃ bhagavatīṃ śrīdēvasēnāṃ bhajē .. 1 ..',
            translationEn:
              'Dhyānam — Meditation verse 1: I worship Śrī Dēvasēnā — the auspicious Mother, Ambikā, born from the mind of Brahmā, ever the granter of all desires; beloved of Skanda, mother of the universe, bestower of victory, good sons, and good fortune; adorned with beautiful jeweled ornaments, compassionate, pure, radiant, and auspicious — the sixth portion of Prakṛti, the supreme divine Goddess.',
            translationHi:
              'ब्रह्माजी के मन से प्रकट, सर्वमनोरथ पूर्ण करने वाली, भगवान कार्तिकेय (स्कन्द) की प्रिया, जगज्जननी, विजय, सत्पुत्र व सौभाग्य प्रदायिनी, दिव्य रत्नों से विभूषित, परम करुणामयी, शुभ्रा और प्रकृति के षष्ठ अंश से आविर्भूत परा भगवती श्रीदेवसेना (षष्ठी देवी) की मैं वंदना करता हूँ।',
            meaningEn:
              'Dhyānam — Meditation verse 1: I worship Śrī Dēvasēnā — the auspicious Mother, Ambikā, born from the mind of Brahmā, ever the granter of all desires; beloved of Skanda, mother of the universe, bestower of victory, good sons, and good fortune; adorned with beautiful jeweled ornaments, compassionate, pure, radiant, and auspicious — the sixth portion of Prakṛti, the supreme divine Goddess.',
            meaningHi:
              'ब्रह्माजी के मन से प्रकट, सर्वमनोरथ पूर्ण करने वाली, भगवान कार्तिकेय (स्कन्द) की प्रिया, जगज्जननी, विजय, सत्पुत्र व सौभाग्य प्रदायिनी, दिव्य रत्नों से विभूषित, परम करुणामयी, शुभ्रा और प्रकृति के षष्ठ अंश से आविर्भूत परा भगवती श्रीदेवसेना (षष्ठी देवी) की मैं वंदना करता हूँ।',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sri-shashti-devi-stotram.htm',
          },
          {
            id: 'bala-mukundashtakam-ch',
            title: 'Bala Mukundashtakam',
            titleHi: 'बालमुकुन्दाष्टकम् (श्लोक १)',
            sanskrit:
              'करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।\nवटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥ १॥',
            transliteration:
              'karāravindena padāravindaṃ mukhāravinde viniveśayantam .\nvaṭasya patrasya puṭe śayānaṃ bālaṃ mukundaṃ manasā smarāmi .. 1..',
            translationEn:
              '(My mind remembers that beautiful Bala Mukundam) who with his lotus like hands holds his lotus like feet, and puts the toe in his lotus like mouth, he rests on the fold of the banyan leaf (vata), my mind remembers that beautiful Bala Mukundam.',
            translationHi:
              'जो अपने करकमलों से चरणकमल को पकड़कर मुखकमल में उसके अंगूठे को धारण करते हैं, तथा वटवृक्ष के पत्ते के दोने पर शयन करते हैं — उन मनोहर बाल मुकुंद (श्रीकृष्ण) का मैं मन से स्मरण करता हूँ।',
            meaningEn:
              '(My mind remembers that beautiful Bala Mukundam) who with his lotus like hands holds his lotus like feet, and puts the toe in his lotus like mouth, he rests on the fold of the banyan leaf (vata), my mind remembers that beautiful Bala Mukundam.',
            meaningHi:
              'जो अपने करकमलों से चरणकमल को पकड़कर मुखकमल में उसके अंगूठे को धारण करते हैं, तथा वटवृक्ष के पत्ते के दोने पर शयन करते हैं — उन मनोहर बाल मुकुंद (श्रीकृष्ण) का मैं मन से स्मरण करता हूँ।',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bala-mukundashtakam.htm',
          },
        ],
      },
    ],
  },
  'mind-and-heart': {
    id: 'occasion-mind-heart',
    slug: 'mind-and-heart',
    titleEn: 'Mind & Heart',
    titleHi: 'मन एवं हृदय',
    descriptionEn:
      'For the inner life — peace of mind, prayers for the wellbeing of all, calming anxiety and grief, finding courage, and everyday devotion.',
    descriptionHi:
      'आंतरिक शांति, सर्वकल्याण, भय व चिंता निवारण, आत्मबल, क्षमा एवं नित्य भक्ति हेतु श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/mind-heart.jpg',
    path: '/shloka/prayers/mind-and-heart.htm',
    items: [
      {
        id: 'for-peace-of-mind',
        nameEn: 'For Peace of Mind',
        nameHi: 'मन की शांति हेतु (दिव्य नाम एवं विष्णु स्तुति)',
        headerTitleEn: 'Shlokas for Peace of Mind',
        headerTitleHi: 'मानसिक शांति, ध्यान एवं भगवन्नाम स्मरण श्लोक',
        subtitleEn:
          'A restless, anxious mind loses its peace even when nothing is truly wrong. The simplest refuge is the holy name — Om, Om Namah Shivaya, the names of Rama and Krishna. Chant any of these quietly, breathing gently with each round, and let the worry loosen and the heart grow still.',
        subtitleHi:
          'अशांत व व्याकुल मन को शांत करने हेतु ओंकार (ॐ), ॐ नमः शिवाय, हरे कृष्ण महामंत्र, राम नाम एवं श्री शान्ताकारं विष्णु स्तुति।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        sanskrit:
          'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥',
        transliteration:
          'śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ\nviśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam\nlakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyaṃ\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham',
        meaningEn:
          'Praising Lord Vishnu, who has a tranquil form, who rests on the serpent bed, whose navel bears a lotus (the source of creation), who is the lord of the Gods, the support of the universe, vast as the sky, with a dark hue like a raincloud and auspicious limbs; who is dear to Lakshmi, has lotus-like eyes, is accessible through the meditation of yogis, and is the remover of worldly fears, the one and only lord of all worlds.',
        meaningHi:
          'जिनका स्वरूप परम शांत है, जो शेषनाग की शय्या पर शयन करते हैं, जिनकी नाभि में कमल है, जो देवताओं के स्वामी और संपूर्ण जगत के आधार हैं, आकाश के सदृश सर्वव्यापी, मेघवर्ण वाले, सुन्दर अंगों वाले, लक्ष्मीपति, कमलनयन, योगियों द्वारा ध्यानगम्य, संसार के भय को हरने वाले और समस्त लोकों के एक मात्र स्वामी भगवान श्री विष्णु की मैं वंदना करता हूँ।',
        verses: [
          {
            id: 'om',
            title: 'Om',
            titleHi: 'ॐ (प्रणव महामन्त्र)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/om.htm',
            sanskrit: 'ॐ',
            transliteration: 'Oṃ',
            translationEn:
              'The primordial sound vibration that is the supreme Reality, Brahman, the essence of the Universe.',
            translationHi:
              'परमब्रह्म परमात्मा का अनादि, एकाक्षर और सर्वव्यापी मूल नाद ॐ।',
            meaningEn:
              'The primordial sound vibration that is the supreme Reality, Brahman, the essence of the Universe.',
            meaningHi:
              'परमब्रह्म परमात्मा का अनादि, एकाक्षर और सर्वव्यापी मूल नाद ॐ।',
          },
          {
            id: 'om-namah-shivaya',
            title: 'Om Namah Shivaya',
            titleHi: 'ॐ नमः शिवाय (पञ्चाक्षर मन्त्र)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/om-namah-shivaya.htm',
            sanskrit: 'ॐ नमः शिवाय',
            transliteration: 'oṃ namaḥ śivāya',
            translationEn:
              'I bow to Lord Shiva, the auspicious one and embodiment of supreme consciousness.',
            translationHi:
              'कल्याणस्वरूप, परम चेतना एवं सर्वव्यापी भगवान शिव को मेरा बारंबार नमस्कार है।',
            meaningEn:
              'I bow to Lord Shiva, the auspicious one and embodiment of supreme consciousness.',
            meaningHi:
              'कल्याणस्वरूप, परम चेतना एवं सर्वव्यापी भगवान शिव को मेरा बारंबार नमस्कार है।',
          },
          {
            id: 'hare-rama-hare-krishna',
            title: 'Hare Rama Hare Krishna',
            titleHi: 'महामन्त्र (हरे राम हरे कृष्ण)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/hare-rama-hare-krishna.htm',
            sanskrit:
              'हरे राम हरे राम राम राम हरे हरे ।\nहरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ॥',
            transliteration:
              'hare rāma hare rāma rāma rāma hare hare\nhare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare',
            translationEn:
              'O Supreme Lord, O Rama, O Krishna, guide me toward devotion and deliverance; let my heart be purified and my soul find eternal joy through Your grace.',
            translationHi:
              'हे भगवान श्री हरि! हे आनंदस्वरूप श्री राम! हे सर्व-आकर्षक श्री कृष्ण! मुझे अपनी प्रेमा-भक्ति में लगाइए और मेरे हृदय को पावन कीजिए।',
            meaningEn:
              'O Supreme Lord, O Rama, O Krishna, guide me toward devotion and deliverance; let my heart be purified and my soul find eternal joy through Your grace.',
            meaningHi:
              'हे भगवान श्री हरि! हे आनंदस्वरूप श्री राम! हे सर्व-आकर्षक श्री कृष्ण! मुझे अपनी प्रेमा-भक्ति में लगाइए और मेरे हृदय को पावन कीजिए।',
          },
          {
            id: 'sri-rama-rama-ramethi',
            title: 'Sri Rama Rama Rameti',
            titleHi: 'श्री राम राम रामेति (विष्णु सहस्रनाम तुल्य)',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-rama-ramethi.htm',
            sanskrit:
              'श्री राम राम रामेति रमे रामे मनोरमे ।\nसहस्रनाम तत् तुल्यं रामनाम वरानने ॥',
            transliteration:
              'śrī rāma rāma rāmeti rame rāme manorame\nsahasranāma tat tulyaṃ rāmanāma varānane',
            translationEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            translationHi:
              "हे सुमुखि (पार्वती)! 'श्री राम, राम, राम' इस प्रकार मनोरम राम-नाम में मेरा मन नित्य रमण करता है। भगवान श्री राम का एक नाम ही श्री विष्णु के सहस्र (हजार) नामों के समान फलदायी है।",
            meaningEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            meaningHi:
              "हे सुमुखि (पार्वती)! 'श्री राम, राम, राम' इस प्रकार मनोरम राम-नाम में मेरा मन नित्य रमण करता है। भगवान श्री राम का एक नाम ही श्री विष्णु के सहस्र (हजार) नामों के समान फलदायी है।",
          },
          {
            id: 'shanthakaram-bhujagashayanam',
            title: 'Shanthakaram Bhujagashayanam',
            titleHi: 'शान्ताकारं भुजगशयनम् (विष्णु ध्यानम्)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/shanthakaram-bhujagashayanam.htm',
            sanskrit:
              'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥',
            transliteration:
              'śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ\nviśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam\nlakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyaṃ\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham',
            translationEn:
              'Praising Lord Vishnu, who has a tranquil form, who rests on the serpent bed, whose navel bears a lotus (the source of creation), who is the lord of the Gods, the support of the universe, vast as the sky, with a dark hue like a raincloud and auspicious limbs; who is dear to Lakshmi, has lotus-like eyes, is accessible through the meditation of yogis, and is the remover of worldly fears, the one and only lord of all worlds.',
            translationHi:
              'जिनका स्वरूप परम शांत है, जो शेषनाग की शय्या पर शयन करते हैं, जिनकी नाभि में कमल है, जो देवताओं के स्वामी और संपूर्ण जगत के आधार हैं, आकाश के समान सर्वव्यापी, मेघवर्ण वाले, लक्ष्मीपति, कमलनयन और संसार के भय को हरने वाले भगवान विष्णु को मैं प्रणाम करता हूँ।',
            meaningEn:
              'Praising Lord Vishnu, who has a tranquil form, who rests on the serpent bed, whose navel bears a lotus (the source of creation), who is the lord of the Gods, the support of the universe, vast as the sky, with a dark hue like a raincloud and auspicious limbs; who is dear to Lakshmi, has lotus-like eyes, is accessible through the meditation of yogis, and is the remover of worldly fears, the one and only lord of all worlds.',
            meaningHi:
              'जिनका स्वरूप परम शांत है, जो शेषनाग की शय्या पर शयन करते हैं, जिनकी नाभि में कमल है, जो देवताओं के स्वामी और संपूर्ण जगत के आधार हैं, आकाश के समान सर्वव्यापी, मेघवर्ण वाले, लक्ष्मीपति, कमलनयन और संसार के भय को हरने वाले भगवान विष्णु को मैं प्रणाम करता हूँ।',
          },
        ],
      },
      {
        id: 'for-the-wellbeing-of-all',
        nameEn: 'For the Wellbeing of All',
        nameHi: 'विश्व कल्याण एवं मंगल शांति प्रार्थना',
        headerTitleEn: 'Shlokas for the Wellbeing of All',
        headerTitleHi: 'सर्वकल्याण, विश्वशांति एवं ऋग्वैदिक शांति मन्त्र',
        subtitleEn:
          "Our tradition ends almost every prayer by widening it to include all beings. These verses and mantras ask not for ourselves alone but for the welfare of the whole world — 'may all the worlds be happy'. Chant them to close your prayers, offering their fruit for the good of all.",
        subtitleHi:
          'समस्त चराचर जगत, प्राणियों, प्रकृति और ब्रह्मांड के मंगल, आरोग्य, शांति एवं समृद्धि हेतु universal वैदिक शांति पाठ व प्रार्थनाएं।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        sanskrit:
          'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration:
          'oṃ sarve bhavantu sukhinaḥ\nsarve santu nirāmayāḥ\nsarve bhadrāṇi paśyantu\nmā kaścid duḥkha bhāgbhavet\noṃ śāntiḥ śāntiḥ śāntiḥ',
        meaningEn:
          'Oṃ, May all beings be happy, may all be free from illness, may all witness auspiciousness, may no one suffer from sorrow. Oṃ, peace, peace, peace.',
        meaningHi:
          'सब सुखी हों, सब निरोगी रहें, सब मंगलकारी दृश्यों को देखें और किसी को भी दुःख का भागी न बनना पड़े। ॐ शान्ति, शान्ति, शान्ति।',
        verses: [
          {
            id: 'loka-samastha-sukhino-bhavantu',
            title: 'Loka Samastha Sukhino Bhavantu',
            titleHi: 'लोकाः समस्ताः सुखिनो भवन्तु',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/loka-samastha-sukhino-bhavantu.htm',
            sanskrit:
              'ॐ लोकाः समस्ताः सुखिनो भवन्तु ।\nॐ लोकाः समस्ताः सुखिनो भवन्तु ।\nॐ लोकाः समस्ताः सुखिनो भवन्तु ॥',
            transliteration:
              'oṃ lokāḥ samastāḥ sukhino bhavantu\noṃ lokāḥ samastāḥ sukhino bhavantu\noṃ lokāḥ samastāḥ sukhino bhavantu',
            translationEn: 'Oṃ! May all beings in all the worlds be happy.',
            translationHi: 'ॐ! समस्त लोकों में सभी प्राणी सुखी और आनंदित हों।',
            meaningEn: 'Oṃ! May all beings in all the worlds be happy.',
            meaningHi: 'ॐ! समस्त लोकों में सभी प्राणी सुखी और आनंदित हों।',
          },
          {
            id: 'sarve-bhavanthu-sukhinah',
            title: 'Sarve Bhavanthu Sukhinah',
            titleHi: 'सर्वे भवन्तु सुखिनः (कल्याण मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sarve-bhavanthu-sukhinah.htm',
            sanskrit:
              'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ sarve bhavantu sukhinaḥ\nsarve santu nirāmayāḥ\nsarve bhadrāṇi paśyantu\nmā kaścid duḥkha bhāgbhavet\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Oṃ, May all beings be happy, may all be free from illness, may all witness auspiciousness, may no one suffer from sorrow. Oṃ, peace, peace, peace.',
            translationHi:
              'सब सुखी हों, सब निरोगी रहें, सब कल्याणकारी भावों को देखें और कोई भी दुखी न हो। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ, May all beings be happy, may all be free from illness, may all witness auspiciousness, may no one suffer from sorrow. Oṃ, peace, peace, peace.',
            meaningHi:
              'सब सुखी हों, सब निरोगी रहें, सब कल्याणकारी भावों को देखें और कोई भी दुखी न हो। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'svasti-prajabhyah-paripala',
            title: 'Svasti Prajabhyah Paripala',
            titleHi: 'स्वस्ति प्रजाभ्यः (राज्य व प्रजा मंगल)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/svasti-prajabhyah-paripala.htm',
            sanskrit:
              'ॐ स्वस्ति प्रजाभ्यः परिपालयन्तां\nन्यायेन मार्गेण महीं महीशाः ।\nगोब्राह्मणेभ्यश्शुभमस्तु नित्यं\nलोकास्समस्तास्सुखिनो भवन्तु ॥\n\nकाले वर्षतु पर्जन्यः पृथिवी सस्यशालिनी ।\nदेशोऽयं क्षोभरहितो ब्राह्मणाः सन्तु निर्भयाः ॥',
            transliteration:
              "oṃ svasti prajābhyaḥ paripālayantāṃ\nnyāyena mārgeṇa mahīṃ mahīśāḥ .\ngobrāhmaṇebhyaśśubhamastu nityaṃ\nlokāssamastāssukhino bhavantu ..\n\nkāle varṣatu parjanyaḥ pṛthivī sasyaśālinī .\ndeśo'yaṃ kṣobharahito brāhmaṇāḥ santu nirbhayāḥ ..",
            translationEn:
              'May there be prosperity to the subjects; may the rulers protect the world in a righteous and lawful manner. May there be eternal auspiciousness for cows and brahmanas; may all people in the world be happy. May the rains shower in proper season; may the earth be fertile with abundant crops; may this country be free from unrest; may the brahmanas be fearless.',
            translationHi:
              'प्रजा का कल्याण हो; शासक न्यायपूर्ण मार्ग से पृथ्वी का पालन करें। गौ और विद्वानों का नित्य शुभ हो; समस्त लोकों के प्राणी सुखी रहें। समय पर वर्षा हो, पृथ्वी अन्न-धान्य से परिपूर्ण रहे, देश उपद्रव-रहित हो और सज्जन निर्भय रहें।',
            meaningEn:
              'May there be prosperity to the subjects; may the rulers protect the world in a righteous and lawful manner. May there be eternal auspiciousness for cows and brahmanas; may all people in the world be happy.',
            meaningHi:
              'प्रजा का कल्याण हो; शासक न्यायपूर्ण मार्ग से पृथ्वी का पालन करें। समस्त संसार में सुख, शांति और समृद्धि व्याप्त हो।',
          },
          {
            id: 'sarvesham-svasthirbhavathu',
            title: 'Sarvesham Svasthirbhavathu',
            titleHi: 'सर्वेषां स्वस्तिर्भवतु (शान्ति पाठ)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/sarvesham-svasthirbhavathu.htm',
            sanskrit:
              'ॐ सर्वेषां स्वस्तिर्भवतु\nसर्वेषां शान्तिर्भवतु ।\nसर्वेषां पूर्णंभवतु\nसर्वेषां मङ्गलंभवतु ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ sarveṣāṃ svastirbhavatu\nsarveṣāṃ śāntirbhavatu .\nsarveṣāṃ pūrṇaṃbhavatu\nsarveṣāṃ maṅgalaṃbhavatu\noṃ śāntiḥ śāntiḥ śāntiḥ ..',
            translationEn:
              'Oṃ, may there be well-being for all, may there be peace for all, may there be fulfilment for all, may there be auspiciousness for all. Oṃ, peace, peace, peace.',
            translationHi:
              'सबका कल्याण (स्वस्ति) हो, सबको शान्ति मिले, सब पूर्णता को प्राप्त करें, और सबका मङ्गल हो। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ, may there be well-being for all, may there be peace for all, may there be fulfilment for all, may there be auspiciousness for all. Oṃ, peace, peace, peace.',
            meaningHi:
              'सबका कल्याण (स्वस्ति) हो, सबको शान्ति मिले, सब पूर्णता को प्राप्त करें, और सबका मङ्गल हो। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'dyauh-shaantir-antarikssam',
            title: 'Dyauh Shaantir Antarikssam',
            titleHi: 'द्यौः शान्तिरन्तरिक्षं शान्तिः (वैदिक शान्ति मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/dyauh-shaantir-antarikssam.htm',
            sanskrit:
              'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः\nपृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः\nसर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ dyauḥ śāntirantarikṣaṃ śāntiḥ\npṛthivī śāntirāpaḥ śāntiroṣadhayaḥ śāntiḥ .\nvanaspatayaḥ śāntirviśvedevāḥ śāntirbrahma śāntiḥ\nsarvaṃ śāntiḥ śāntireva śāntiḥ sā mā śāntiredhi ..\noṃ śāntiḥ śāntiḥ śāntiḥ ..',
            translationEn:
              'May peace radiate there in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Aum peace, peace and peace to us and all beings!',
            translationHi:
              'द्युलोक में शान्ति हो, अन्तरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त देवगणों में शान्ति हो, परब्रह्म परमात्मा में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति मुझे भी प्राप्त हो। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'May peace radiate there in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Aum peace, peace and peace to us and all beings!',
            meaningHi:
              'द्युलोक में शान्ति हो, अन्तरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त देवगणों में शान्ति हो, परब्रह्म परमात्मा में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति मुझे भी प्राप्त हो। ॐ शान्ति, शान्ति, शान्ति।',
          },
        ],
      },
      {
        id: 'for-anxiety-and-fear',
        nameEn: 'For Anxiety & Fear',
        nameHi: 'चिंता, भय एवं संकट निवारण',
        headerTitleEn: 'Shlokas for Anxiety & Fear',
        headerTitleHi: 'भय मुक्ति, अभयदान एवं संकट निवारण मन्त्र',
        subtitleEn:
          'Fear and anxiety can grip the heart and make small troubles loom large. These are short mantras to hold on to when dread rises — the name of Krishna who destroys all affliction, Narasimha and Durga who slay every fear, the death-conquering Mrityunjaya, and Hanuman who cuts through all trouble. Chant any one of them, again and again, and let the fear loosen and courage return.',
        subtitleHi:
          'मानसिक चिंता, अज्ञात भय, घबराहट व संकटों से मुक्ति हेतु भगवान श्रीकृष्ण, नृसिंह देव, महामृत्युंजय शिव, माँ दुर्गा एवं हनुमान चालीसा के सिद्ध अभय मन्त्र।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        sanskrit:
          'कृष्णाय वासुदेवाय हरये परमात्मने ।\nप्रणतः क्लेशनाशाय गोविंदाय नमो नमः ॥',
        transliteration:
          'kṛṣṇāya vāsudevāya haraye paramātmane\npraṇataḥ kleśanāśāya govindāya namo namaḥ',
        meaningEn:
          'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
        meaningHi:
          'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों व कष्टों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
        verses: [
          {
            id: 'krishnaya-vasudevaya-haraye',
            title: 'Krishnaya Vasudevaya Haraye Paramatmane',
            titleHi: 'कृष्णाय वासुदेवाय (क्लेशनाशक मन्त्र)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/krishnaya-vasudevaya-haraye.htm',
            sanskrit:
              'कृष्णाय वासुदेवाय हरये परमात्मने ।\nप्रणतः क्लेशनाशाय गोविंदाय नमो नमः ॥',
            transliteration:
              'kṛṣṇāya vāsudevāya haraye paramātmane\npraṇataḥ kleśanāśāya govindāya namo namaḥ',
            translationEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            translationHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
            meaningEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            meaningHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
          },
          {
            id: 'ugram-veeram-maha-vishnum',
            title: 'Ugram Veeram Maha Vishnum (Narasimha Maha Mantra)',
            titleHi: 'उग्रं वीरं महाविष्णुं (नृसिंह मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/ugram-veeram-maha-vishnum.htm',
            sanskrit:
              'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम् ।\nनृसिंहं भीषणं भद्रं मृत्योर् मृत्युं नमाम्यहम् ॥',
            transliteration:
              'ōṁ ugraṁ vīraṁ mahāviṣṇuṁ jvalantaṁ sarvatōmukham |\nnr̥siṁhaṁ bhīṣaṇaṁ bhadraṁ mr̥tyōr mr̥tyuṁ namāmyaham ||',
            translationEn:
              'Om, To that form of Lord Maha-Vishnu; Which is Ugra (Ferocious) and Vira (Exhibiting great Prowess); And which is like a Blazing Fire facing all Directions, To that form of Lord Nrisimha, Who is Bhishana (Terrifying) but Bhadra (Auspicious); Who is the Death of Death; I Bow down to that Form.',
            translationHi:
              'जो उग्र, वीर, महाविष्णु स्वरूप, सर्वत्र प्रज्वलित मुख वाले, भीषण किन्तु भक्तों के लिए परम कल्याणकारी और मृत्यु की भी मृत्यु हैं — उन भगवान श्री नृसिंह को मैं नमन करता हूँ।',
            meaningEn:
              'Om, To that form of Lord Maha-Vishnu; Which is Ugra (Ferocious) and Vira (Exhibiting great Prowess); And which is like a Blazing Fire facing all Directions, To that form of Lord Nrisimha, Who is Bhishana (Terrifying) but Bhadra (Auspicious); Who is the Death of Death; I Bow down to that Form.',
            meaningHi:
              'जो उग्र, वीर, महाविष्णु स्वरूप, सर्वत्र प्रज्वलित मुख वाले, भीषण किन्तु भक्तों के लिए परम कल्याणकारी और मृत्यु की भी मृत्यु हैं — उन भगवान श्री नृसिंह को मैं नमन करता हूँ।',
          },
          {
            id: 'tryambakam-yajamahe',
            title: 'Maha Mrityunjaya Mantra',
            titleHi: 'महामृत्युञ्जय मन्त्र (त्र्यम्बकं यजामहे)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/tryambakam-yajamahe.htm',
            sanskrit:
              'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
            transliteration:
              "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
            translationEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            translationHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और हमारा पोषण करते हैं। जिस प्रकार पका हुआ खरबूजा बेल के बंधन से मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय व संसार-बंधन से मुक्त हों, मोक्षामृत से कभी विमुख न हों।',
            meaningEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            meaningHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और हमारा पोषण करते हैं। जिस प्रकार पका हुआ खरबूजा बेल के बंधन से मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय व संसार-बंधन से मुक्त हों, मोक्षामृत से कभी विमुख न हों।',
          },
          {
            id: 'sri-durga-sapta-shloki-bhayebhyas',
            title: 'Sri Durga Sapta Shloki (Verse 5)',
            titleHi: 'सर्वस्वरूपे सर्वेशे (दुर्गा सप्तश्लोकी ५)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sri-durga-sapta-shloki.htm',
            sanskrit:
              'सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते ।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते ॥ ५ ॥',
            transliteration:
              "sarvasvarūpē sarvēśē sarvaśaktisamanvitē .\nbhayēbhyastrāhi nō dēvi durgē dēvi namō'stu tē .. 5 ..",
            translationEn:
              'O Goddess who embodies all forms, who is the supreme ruler of all, who is endowed with all powers — protect us from all fears, O Devi Durga. Salutations unto you.',
            translationHi:
              'हे सर्वस्वरूपा! हे सर्वेश्वरी! हे सर्वशक्तिसम्पन्न देवी माँ दुर्गे! हमें समस्त प्रकार के भयों से रक्षा प्रदान कीजिए; आपको हमारा सादर प्रणाम है।',
            meaningEn:
              'O Goddess who embodies all forms, who is the supreme ruler of all, who is endowed with all powers — protect us from all fears, O Devi Durga. Salutations unto you.',
            meaningHi:
              'हे सर्वस्वरूपा! हे सर्वेश्वरी! हे सर्वशक्तिसम्पन्न देवी माँ दुर्गे! हमें समस्त प्रकार के भयों से रक्षा प्रदान कीजिए; आपको हमारा सादर प्रणाम है।',
          },
          {
            id: 'hanuman-chalisa-sankat-katai',
            title: 'Hanuman Chalisa (Chaupai 36)',
            titleHi: 'सङ्कट कटै मिटै सब पीरा (हनुमान चालीसा ३६)',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/hanuman-chalisa.htm',
            sanskrit: 'सङ्कट कटै मिटै सब पीरा ।\nजो सुमिरै हनुमत बलबीरा ॥ ३६ ॥',
            transliteration:
              'saṅkaṭa kaṭai miṭai saba pīrā .\njo sumirai hanumata balabīrā .. 36 ..',
            translationEn:
              'All troubles cease for the one who remembers the powerful lord, Lord Hanuman and all his pains also come to an end.',
            translationHi:
              'जो महावीर बलवान श्री हनुमान जी का स्मरण व ध्यान करता है, उसके समस्त संकट कट जाते हैं और सारी पीड़ाएं नष्ट हो जाती हैं।',
            meaningEn:
              'All troubles cease for the one who remembers the powerful lord, Lord Hanuman and all his pains also come to an end.',
            meaningHi:
              'जो महावीर बलवान श्री हनुमान जी का स्मरण व ध्यान करता है, उसके समस्त संकट कट जाते हैं और सारी पीड़ाएं नष्ट हो जाती हैं।',
          },
        ],
      },
      {
        id: 'for-grief-and-loss',
        nameEn: 'For Grief & Loss',
        nameHi: 'शोक एवं विछोह निवारण (गीता उपदेश व नारायण सूक्त)',
        headerTitleEn: 'Shlokas for Grief & Loss',
        headerTitleHi: 'शोक निवारण, आत्मज्ञान एवं शांति श्लोक',
        subtitleEn:
          "Grief is love with nowhere to go, and no words fully console it. These verses offer Krishna's gentle teaching to Arjuna — that the soul is never born and never dies — and the name of the Lord who quietly dissolves all sorrow. Sit with them in your own time, letting them ease the weight of loss.",
        subtitleHi:
          'गहरे शोक व वियोग के समय भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया आत्मज्ञान (अशोच्यानन्वशोचस्त्वम्), क्लेशनाशक मन्त्र, नारायण सूक्त एवं भज गोविन्दम्।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        sanskrit:
          'श्रीभगवानुवाच ।\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥ २-११॥',
        transliteration:
          'śrībhagavānuvāca\naśocyānanvaśocastvaṃ prajñāvādāṃśca bhāṣase\ngatāsūnagatāsūṃśca nānuśocanti paṇḍitāḥ 2-11',
        meaningEn:
          'The Blessed Lord said: You have grieved for those that should not be grieved for; yet, you speak words of wisdom. The wise grieve neither for the living nor for the dead.',
        meaningHi:
          'श्रीभगवान ने कहा: हे अर्जुन! तुम न शोक करने योग्य लोगों के लिए शोक करते हो और ज्ञानियों जैसी बातें भी करते हो; किन्तु ज्ञानी पुरुष न तो जीवित व्यक्तियों के लिए शोक करते हैं और न ही मृतकों के लिए।',
        verses: [
          {
            id: '2-11-ashochyan-anvashochas',
            title: 'Bhagavad Gita 2.11',
            titleHi: 'श्रीमद्भगवद्गीता (अध्याय २, श्लोक ११)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/2-11-ashochyan-anvashochas.htm',
            sanskrit:
              'श्रीभगवानुवाच ।\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥ २-११॥',
            transliteration:
              'śrībhagavānuvāca\naśocyānanvaśocastvaṃ prajñāvādāṃśca bhāṣase\ngatāsūnagatāsūṃśca nānuśocanti paṇḍitāḥ 2-11',
            translationEn:
              'The Blessed Lord said: You have grieved for those that should not be grieved for; yet, you speak words of wisdom. The wise grieve neither for the living nor for the dead.',
            translationHi:
              'श्रीभगवान ने कहा: हे अर्जुन! तुम न शोक करने योग्य लोगों के लिए शोक करते हो और ज्ञानियों जैसी बातें भी करते हो; किन्तु ज्ञानी पुरुष न तो जीवित व्यक्तियों के लिए शोक करते हैं और न ही मृतकों के लिए।',
            meaningEn:
              'The Blessed Lord said: You have grieved for those that should not be grieved for; yet, you speak words of wisdom. The wise grieve neither for the living nor for the dead.',
            meaningHi:
              'श्रीभगवान ने कहा: हे अर्जुन! तुम न शोक करने योग्य लोगों के लिए शोक करते हो और ज्ञानियों जैसी बातें भी करते हो; किन्तु ज्ञानी पुरुष न तो जीवित व्यक्तियों के लिए शोक करते हैं और न ही मृतकों के लिए।',
          },
          {
            id: 'krishnaya-vasudevaya-haraye-grief',
            title: 'Krishnaya Vasudevaya Haraye Paramatmane',
            titleHi: 'कृष्णाय वासुदेवाय (क्लेशनाशक मन्त्र)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/krishnaya-vasudevaya-haraye.htm',
            sanskrit:
              'कृष्णाय वासुदेवाय हरये परमात्मने ।\nप्रणतः क्लेशनाशाय गोविंदाय नमो नमः ॥',
            transliteration:
              'kṛṣṇāya vāsudevāya haraye paramātmane\npraṇataḥ kleśanāśāya govindāya namo namaḥ',
            translationEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            translationHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
            meaningEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            meaningHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
          },
          {
            id: 'narayana-suktam-peace',
            title: 'Narayana Suktam (Shanti Mantra)',
            titleHi: 'नारायण सूक्तम् (सह नाववतु)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/narayana-suktam.htm',
            sanskrit:
              'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।\nतेजस्विनावधीतमस्तु मा विद्विषावहै ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'ōṃ saha nāvavatu । saha nau bhunaktu । saha vīryaṃ karavāvahai ।\ntējasvināvadhītamastu mā vidviṣāvahai ॥\nōṃ śāntiḥ śāntiḥ śāntiḥ ॥',
            translationEn:
              'May we be protected together; may we be nourished together; may we work together with great vigour. May our learning be luminous and free from conflict. Om — peace, peace, peace.',
            translationHi:
              'प्रभु हम दोनों का साथ-साथ पालन करें, हम दोनों का साथ-साथ पोषण करें, हम साथ-साथ शक्ति प्राप्त करें। हमारी विद्या तेजस्वी हो और हम आपस में कभी द्वेष न करें। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'May we be protected together; may we be nourished together; may we work together with great vigour. May our learning be luminous and free from conflict. Om — peace, peace, peace.',
            meaningHi:
              'प्रभु हम दोनों का साथ-साथ पालन करें, हम दोनों का साथ-साथ पोषण करें, हम साथ-साथ शक्ति प्राप्त करें। हमारी विद्या तेजस्वी हो और हम आपस में कभी द्वेष न करें। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'bhaja-govindam-grief',
            title: 'Bhaja Govindam All Verses',
            titleHi: 'भज गोविन्दम् (श्लोक १)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bhaja-govindam-all-verses.htm',
            sanskrit:
              'भज गोविन्दं भज गोविन्दं\nगोविन्दं भज मूढमते ।\nसम्प्राप्ते सन्निहिते काले\nनहि नहि रक्षति डुकृञ्करणे ॥ १ ॥',
            transliteration:
              'bhaja govindaṃ bhaja govindaṃ\ngovindaṃ bhaja mūḍhamate |\nsamprāpte sannihite kāle\nnahi nahi rakṣati ḍukṛñkaraṇe .. 1 ..',
            translationEn:
              'Worship Govinda, worship Govinda, worship Govinda, O foolish mind! When the appointed time of death draws near, the rules of grammar will surely not save you.',
            translationHi:
              'हे मूढ़ मन! गोविन्द का भजन कर, गोविन्द को भज, गोविन्द का ही नाम ले। जब अंत समय निकट आ जाएगा, तब व्याकरण के नियम अथवा सांसारिक तर्क-वितर्क तुम्हारी रक्षा नहीं करेंगे।',
            meaningEn:
              'Worship Govinda, worship Govinda, worship Govinda, O foolish mind! When the appointed time of death draws near, the rules of grammar will surely not save you.',
            meaningHi:
              'हे मूढ़ मन! गोविन्द का भजन कर, गोविन्द को भज, गोविन्द का ही नाम ले। जब अंत समय निकट आ जाएगा, तब व्याकरण के नियम अथवा सांसारिक तर्क-वितर्क तुम्हारी रक्षा नहीं करेंगे।',
          },
        ],
      },
      {
        id: 'for-courage-and-strength',
        nameEn: 'For Courage & Strength',
        nameHi: 'साहस एवं आत्मबल (हनुमान स्मरण व रामरक्षा)',
        headerTitleEn: 'Shlokas for Courage & Strength',
        headerTitleHi: 'साहस, आत्मबल एवं निर्भयता श्लोक',
        subtitleEn:
          'There are moments that call for more strength and steadiness than we feel we have. These stotras call on Hanuman — swift as thought, mighty as the wind — for courage, confidence and inner strength. Chant them before a hard task or a fearful hour, and take heart.',
        subtitleHi:
          'कठिन चुनौतियों व भय की घड़ी में अदम्य साहस, आत्मविश्वास व आत्मबल हेतु पवनपुत्र हनुमान जी, श्रीरामरक्षा स्तोत्र एवं हनुमान चालीसा के श्लोक।',
        deity: 'Hanuman',
        image: imagePath.Hanuman,
        sanskrit:
          'मनोजवं मारुततुल्यवेगं\nजितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं\nश्रीरामदूतं शिरसा नमामि ॥',
        transliteration:
          'manojavaṃ mārutatulyavegaṃ\njitendriyaṃ buddhimatāṃ variṣṭham\nvātātmajaṃ vānara yūtha mukhyaṃ\nśrī rāmadūtaṃ śirasā namāmi',
        meaningEn:
          'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as powerful as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vānarās (monkey army).',
        meaningHi:
          'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
        verses: [
          {
            id: 'manojavam-maruthathulyavegam-courage',
            title: 'Manojavam Maruthathulyavegam',
            titleHi: 'मनोजवं मारुततुल्यवेगम्',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/manojavam-maruthathulyavegam.htm',
            sanskrit:
              'मनोजवं मारुततुल्यवेगं\nजितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं\nश्रीरामदूतं शिरसा नमामि ॥',
            transliteration:
              'manojavaṃ mārutatulyavegaṃ\njitendriyaṃ buddhimatāṃ variṣṭham\nvātātmajaṃ vānara yūtha mukhyaṃ\nśrī rāmadūtaṃ śirasā namāmi',
            translationEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as powerful as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vānarās (monkey army).',
            translationHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
            meaningEn:
              'I bow down with my head to Hanuman, the messenger of Sri Rama, who is swift as the mind, as powerful as the wind, the conqueror of the senses, the foremost among the wise, the son of the Wind God, and the leader of the Vānarās (monkey army).',
            meaningHi:
              'मन के समान तीव्र गति वाले, वायु के समान वेगवान, इन्द्रियों को जीतने वाले, बुद्धिमानों में श्रेष्ठ, पवनपुत्र, वानर सेना के मुख्य नायक और प्रभु श्रीराम के दूत श्री हनुमान जी को मैं सिर झुकाकर प्रणाम करता हूँ।',
          },
          {
            id: 'buddhirbalam-yashodhairyam',
            title: 'Buddhirbalam Yashodhairyam',
            titleHi: 'बुद्धिर्बलं यशो धैर्यम्',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/buddhirbalam-yashodhairyam.htm',
            sanskrit:
              'बुद्धिर्बलं यशो धैर्यं निर्भयत्वं अरोगता ।\nअजाड्यं वाक्पटुत्वं च हनुमत्स्मरणाद् भवेत् ॥',
            transliteration:
              'buddhirbalaṃ yaśo dhairyaṃ nirbhayatvaṃ arogatā\najāḍyaṃ vākpaṭutvaṃ ca hanumatsmaraṇād bhavet',
            translationEn:
              'By meditating on Hanuman, one obtains intelligence, strength, fame, courage, fearlessness, health, alertness, and eloquence in speech.',
            translationHi:
              'श्री हनुमान जी का स्मरण करने से बुद्धि, बल, यश, धैर्य, निर्भयता, निरोगिता (आरोग्य), चैतन्यता (स्फूर्ति) और वाणी में निपुणता प्राप्त होती है।',
            meaningEn:
              'By meditating on Hanuman, one obtains intelligence, strength, fame, courage, fearlessness, health, alertness, and eloquence in speech.',
            meaningHi:
              'श्री हनुमान जी का स्मरण करने से बुद्धि, बल, यश, धैर्य, निर्भयता, निरोगिता (आरोग्य), चैतन्यता (स्फूर्ति) और वाणी में निपुणता प्राप्त होती है।',
          },
          {
            id: 'sri-rama-raksha-stotram-courage',
            title: 'Sri Rama Raksha Stotram (Viniyoga)',
            titleHi: 'श्रीरामरक्षास्तोत्रम् (विनियोगः)',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-raksha-stotram.htm',
            sanskrit:
              'ॐ श्रीगणेशाय नमः ॥\nअस्य श्रीरामरक्षास्तोत्रमन्त्रस्य । बुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता । अनुष्टुप् छन्दः ।\nसीता शक्तिः । श्रीमद् हनुमान कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥',
            transliteration:
              'oṃ śrīgaṇeśāya namaḥ ..\nasya śrīrāmarakṣāstotramantrasya . budhakauśika ṛṣiḥ .\nśrīsītārāmachandro devatā . anuṣṭup chandaḥ .\nsītā śaktiḥ . śrīmad hanumāna kīlakam .\nśrīrāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ ..',
            translationEn:
              'We start with the salutations to the Lord Ganesha. The author of this hymn (stotra), seeking Lord Rama’s protection, is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is eight syllables in a quarter stanza. The power (energy of mother nature) is Sita. The center is Shri Hanuman. The purpose of reciting this mantra of Ramaraksha stotram is for the devotion to Lord Shri Ramachandra.',
            translationHi:
              'गणेश जी को नमस्कार। इस श्रीरामरक्षास्तोत्र मन्त्र के ऋषि बुधकौशिक हैं, देवता श्री सीता-रामचन्द्र हैं, छन्द अनुष्टुप है, सीता शक्ति हैं, श्रीमान हनुमान जी कीलक हैं तथा भगवान श्री रामचन्द्र जी की प्रीति के लिए इस स्तोत्र के जप में विनियोग किया जाता है।',
            meaningEn:
              'We start with the salutations to the Lord Ganesha. The author of this hymn (stotra), seeking Lord Rama’s protection, is sage Budhakaushika. The deity is Shri Sita-Ramachandra. The poetic meter is eight syllables in a quarter stanza. The power (energy of mother nature) is Sita. The center is Shri Hanuman. The purpose of reciting this mantra of Ramaraksha stotram is for the devotion to Lord Shri Ramachandra.',
            meaningHi:
              'गणेश जी को नमस्कार। इस श्रीरामरक्षास्तोत्र मन्त्र के ऋषि बुधकौशिक हैं, देवता श्री सीता-रामचन्द्र हैं, छन्द अनुष्टुप है, सीता शक्ति हैं, श्रीमान हनुमान जी कीलक हैं तथा भगवान श्री रामचन्द्र जी की प्रीति के लिए इस स्तोत्र के जप में विनियोग किया जाता है।',
          },
          {
            id: 'hanuman-chalisa-doha1',
            title: 'Hanuman Chalisa (Opening Doha)',
            titleHi: 'श्रीगुरु चरन सरोज रज (हनुमान चालीसा दोहा १)',
            deity: 'Hanuman',
            image: imagePath.Hanuman,
            link: 'https://shlokam.org/shloka/hanuman-chalisa.htm',
            sanskrit:
              'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।\nबरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥',
            transliteration:
              'śrīguru carana saroja raja nija manu mukuru sudhāri .\nbaranaüm̐ raghubara bimala jasu jo dāyaku phala cāri ..',
            translationEn:
              "Having polished the mirror of my heart with the dust of my Guru's lotus feet, I recite the divine fame of the greatest king of Raghukul dynasty, which bestows the fruit of the four goals of life (dharma, artha, kama, moksha).",
            translationHi:
              'श्री गुरु महाराज के चरण-कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके, मैं श्री रघुवीर के उस निर्मल यश का वर्णन करता हूँ जो चारों फलों (धर्म, अर्थ, काम और मोक्ष) को देने वाला है।',
            meaningEn:
              "Having polished the mirror of my heart with the dust of my Guru's lotus feet, I recite the divine fame of the greatest king of Raghukul dynasty, which bestows the fruit of the four goals of life (dharma, artha, kama, moksha).",
            meaningHi:
              'श्री गुरु महाराज के चरण-कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके, मैं श्री रघुवीर के उस निर्मल यश का वर्णन करता हूँ जो चारों फलों (धर्म, अर्थ, काम और मोक्ष) को देने वाला है।',
          },
        ],
      },
      {
        id: 'for-anger',
        nameEn: 'For Anger',
        nameHi: 'क्रोध शमन एवं आत्म-नियंत्रण (क्रोध प्रशमनी मन्त्र)',
        headerTitleEn: 'Shlokas for Anger',
        headerTitleHi: 'क्रोध शमन एवं मानसिक शांति मन्त्र',
        subtitleEn:
          'Anger clouds the judgement and, once roused, is hard to undo. These mantras are for real-time pacifying — the Krodha Prashamani chant that extinguishes rising temper, and the Shanti verse that settles the mind. Chant them when anger stirs, to loosen its grip before it acts.',
        subtitleHi:
          "उफनते क्रोध, अशांति व मानसिक उत्तेजना को तुरंत शांत करने हेतु सिद्ध 'क्रोध प्रशमनी मन्त्र' एवं वैदिक शान्ति पाठ।",
        deity: 'Shiva',
        image: imagePath.Bholenath,
        sanskrit: 'ॐ शान्ते प्रशान्ते सर्वक्रोधोपशमनि स्वाहा ॥',
        transliteration: 'oṃ śānte praśānte sarvakrodhopaśamani svāhā ..',
        meaningEn:
          'Om, let supreme and absolute peace prevail. I offer all my surging anger and mental irritation into this vibration to be fully pacified, dissolved, and transformed into tranquil clarity.',
        meaningHi:
          'ॐ! परम शांति और असीम प्रशांत भाव स्थापित हो। मैं अपने समस्त क्रोध और उत्तेजना को शांत व नष्ट करने हेतु इस मंत्र का स्मरण करता हूँ।',
        verses: [
          {
            id: 'krodha-prashamani-mantra',
            title: 'Krodha Prashamani Mantra',
            titleHi: 'क्रोध प्रशमनी मन्त्र',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/krodha-prashamani-mantra.htm',
            sanskrit: 'ॐ शान्ते प्रशान्ते सर्वक्रोधोपशमनि स्वाहा ॥',
            transliteration: 'oṃ śānte praśānte sarvakrodhopaśamani svāhā ..',
            translationEn:
              'Om, let supreme and absolute peace prevail. I offer all my surging anger and mental irritation into this vibration to be fully pacified, dissolved, and transformed into tranquil clarity.',
            translationHi:
              'ॐ! परम शांति और असीम प्रशांत भाव स्थापित हो। मैं अपने समस्त क्रोध और उत्तेजना को शांत व नष्ट करने हेतु इस मंत्र का स्मरण करता हूँ।',
            meaningEn:
              'Om, let supreme and absolute peace prevail. I offer all my surging anger and mental irritation into this vibration to be fully pacified, dissolved, and transformed into tranquil clarity.',
            meaningHi:
              'ॐ! परम शांति और असीम प्रशांत भाव स्थापित हो। मैं अपने समस्त क्रोध और उत्तेजना को शांत व नष्ट करने हेतु इस मंत्र का स्मरण करता हूँ।',
          },
          {
            id: 'dyauh-shaantir-anger',
            title: 'Dyauh Shaantir Antarikssam',
            titleHi: 'द्यौः शान्तिरन्तरिक्षं शान्तिः (वैदिक शान्ति मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/dyauh-shaantir-antarikssam.htm',
            sanskrit:
              'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः\nपृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः\nसर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ dyauḥ śāntirantarikṣaṃ śāntiḥ\npṛthivī śāntirāpaḥ śāntiroṣadhayaḥ śāntiḥ .\nvanaspatayaḥ śāntirviśvedevāḥ śāntirbrahma śāntiḥ\nsarvaṃ śāntiḥ śāntireva śāntiḥ sā mā śāntiredhi ..\noṃ śāntiḥ śāntiḥ śāntiḥ ..',
            translationEn:
              'May peace radiate there in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Aum peace, peace and peace to us and all beings!',
            translationHi:
              'द्युलोक में शान्ति हो, अन्तरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त देवगणों में शान्ति हो, परब्रह्म परमात्मा में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति मुझे भी प्राप्त हो। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'May peace radiate there in the whole sky as well as in the vast ethereal space everywhere. May peace reign all over this earth, in water and in all herbs, trees and creepers. May peace flow over the whole universe. May peace be in the supreme being Brahman. And may there always exist in all peace and peace alone. Aum peace, peace and peace to us and all beings!',
            meaningHi:
              'द्युलोक में शान्ति हो, अन्तरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों और वनस्पतियों में शान्ति हो, समस्त देवगणों में शान्ति हो, परब्रह्म परमात्मा में शान्ति हो, सर्वत्र शान्ति ही शान्ति व्याप्त हो और वह शान्ति मुझे भी प्राप्त हो। ॐ शान्ति, शान्ति, शान्ति।',
          },
        ],
      },
      {
        id: 'for-forgiveness',
        nameEn: 'For Seeking Forgiveness',
        nameHi: 'क्षमा याचना एवं पाप नाश (करचरण कृतं व अघमर्षण सूक्त)',
        headerTitleEn: 'Shlokas for Forgiveness',
        headerTitleHi: 'क्षमा याचना, प्रायश्चित एवं पाप-मुक्ति श्लोक',
        subtitleEn:
          "We all stumble, and carry the quiet weight of things done wrong, knowingly or not. These stotras are prayers of kshama — asking the Lord's forgiveness for every fault. Chant them with a sincere heart, and let the burden of the mistake be set down.",
        subtitleHi:
          'जाने-अनजाने में हुए समस्त कायिक, वाचिक, मानसिक पापों व भूलों की क्षमा तथा अंतःकरण की शुद्धि हेतु सिद्ध क्षमा-प्रार्थना स्तोत्र एवं ऋग्वैदिक अघमर्षण सूक्त।',
        deity: 'Shiva',
        image: imagePath.Bholenath,
        sanskrit:
          'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधं ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
        transliteration:
          'karacaraṇa kṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādhaṃ\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
        meaningEn:
          'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
        meaningHi:
          'हे करुणा के सागर श्री महादेव शम्भो! मेरे हाथ, पैर, वाणी, शरीर, कर्म, कान, नेत्र अथवा मन द्वारा किए गए, जाने-अनजाने विहित अथवा अविहित समस्त अपराधों को क्षमा कीजिए। आपकी सदा जय हो!',
        verses: [
          {
            id: 'yani-kani-cha-papani',
            title: 'Yani Kani Cha Papani',
            titleHi: 'यानि कानि च पापानि (प्रदक्षिणा मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/yani-kani-cha-papani.htm',
            sanskrit:
              'यानि कानि च पापानि जन्मान्तरकृतानि च ।\nतानि सर्वाणि नश्यन्ति प्रदक्षिणः पदे पदे ॥',
            transliteration:
              'yāni kāni ca pāpāni janmāntarakṛtāni ca\ntāni sarvāṇi naśyanti pradakṣiṇaḥ pade pade',
            translationEn:
              'By circumambulating (pradakṣiṇa) each step, any and all sins, even those carried over from past births, are destroyed.',
            translationHi:
              'इस जन्म में अथवा पूर्व जन्मों में किए गए जो भी पाप हैं, वे भगवान की प्रदक्षिणा के एक-एक पद (कदम) के साथ विनष्ट हो जाते हैं।',
            meaningEn:
              'By circumambulating (pradakṣiṇa) each step, any and all sins, even those carried over from past births, are destroyed.',
            meaningHi:
              'इस जन्म में अथवा पूर्व जन्मों में किए गए जो भी पाप हैं, वे भगवान की प्रदक्षिणा के एक-एक पद (कदम) के साथ विनष्ट हो जाते हैं।',
          },
          {
            id: 'karacharana-kritham-forgive',
            title: 'Karacharana Kritham',
            titleHi: 'करचरण कृतं (शिव अपराध क्षमापन स्तोत्र)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/karacharana-kritham.htm',
            sanskrit:
              'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधं ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
            transliteration:
              'karacaraṇa kṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādhaṃ\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
            translationEn:
              'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
            translationHi:
              'हे करुणा के सागर श्री महादेव शम्भो! हाथ, पैर, वाणी, शरीर, कर्म, कर्ण, नेत्र अथवा मन द्वारा किए गए मेरे समस्त ज्ञात-अज्ञात अपराधों को क्षमा करें। हे शम्भो, आपकी जय हो!',
            meaningEn:
              'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
            meaningHi:
              'हे करुणा के सागर श्री महादेव शम्भो! हाथ, पैर, वाणी, शरीर, कर्म, कर्ण, नेत्र अथवा मन द्वारा किए गए मेरे समस्त ज्ञात-अज्ञात अपराधों को क्षमा करें। हे शम्भो, आपकी जय हो!',
          },
          {
            id: 'kayena-vacha-forgive',
            title: 'Kayena Vacha',
            titleHi: 'कायेन वाचा (सर्व समर्पण मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/kayena-vacha.htm',
            sanskrit:
              'कायेन वाचा मनसेन्द्रियैर्वा\nबुद्ध्यात्मना वा प्रकृतेः स्वभावात् ।\nकरोमि यद्यत् सकलं परस्मै\nनारायणायेति समर्पयामि ॥',
            transliteration:
              'kāyena vācā manasendriyairvā\nbuddhyātmanā vā prakṛteḥ svabhāvāt\nkaromi yadyat sakalaṃ parasmai\nnārāyaṇāyeti samarpayāmi',
            translationEn:
              'Whatever actions I perform with my body, speech, mind, or senses, with my intellect, self, or by my inherent nature—whatever they may be, I offer them all to the Supreme Nārāyaṇa.',
            translationHi:
              'शरीर से, वाणी से, मन से, इन्द्रियों से, बुद्धि से, आत्मा से अथवा स्वभाववश मैं जो कुछ भी कर्म करता हूँ, वह सब परम पुरुष भगवान नारायण को समर्पित करता हूँ।',
            meaningEn:
              'Whatever actions I perform with my body, speech, mind, or senses, with my intellect, self, or by my inherent nature—whatever they may be, I offer them all to the Supreme Nārāyaṇa.',
            meaningHi:
              'शरीर से, वाणी से, मन से, इन्द्रियों से, बुद्धि से, आत्मा से अथवा स्वभाववश मैं जो कुछ भी कर्म करता हूँ, वह सब परम पुरुष भगवान नारायण को समर्पित करता हूँ।',
          },
          {
            id: 'devi-kshama-prarthana-stotram',
            title: 'Devi Kshama Prarthana Stotram',
            titleHi: 'देवी क्षमा प्रार्थना (अपराधसहस्राणि)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/devi-kshama-prarthana-stotram.htm',
            sanskrit:
              'अपराधसहस्राणि क्रियन्तेऽहर्निशं मया ।\nदासोऽयमिति मां मत्वा क्षमस्व परमेश्वरि ॥ १ ॥',
            transliteration:
              "aparādhasahasrāṇi kriyante'harniśaṃ mayā .\ndāso'yamiti māṃ matvā kṣamasva parameśvari .. 1 ..",
            translationEn:
              'Thousands of offenses are committed by me day and night; considering me Your servant, O Supreme Goddess, forgive them all.',
            translationHi:
              "हे परमेश्वरि! मेरे द्वारा रात-दिन सहस्त्रों अपराध होते रहते हैं। 'यह मेरा दास है' ऐसा समझकर मेरे उन सभी अपराधों को कृपापूर्वक क्षमा करें।",
            meaningEn:
              'Thousands of offenses are committed by me day and night; considering me Your servant, O Supreme Goddess, forgive them all.',
            meaningHi:
              "हे परमेश्वरि! मेरे द्वारा रात-दिन सहस्त्रों अपराध होते रहते हैं। 'यह मेरा दास है' ऐसा समझकर मेरे उन सभी अपराधों को कृपापूर्वक क्षमा करें।",
          },
          {
            id: 'devi-aparadha-kshamapana-stotram-mind',
            title: 'Devi Aparadha Kshamapana Stotram (Verse 1)',
            titleHi: 'न मन्त्रं नो यन्त्रं (देवी अपराध क्षमापन स्तोत्र १)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/devi-aparadha-kshamapana-stotram.htm',
            sanskrit:
              'न मन्त्रं नो यन्त्रं तदपि च न जाने स्तुतिमहो\nन चाह्वानं ध्यानं तदपि च न जाने स्तुतिकथाः ।\nन जाने मुद्रास्ते तदपि च न जाने विलपनं\nपरं जाने मातस्त्वदनुसरणं क्लेशहरणम् ॥ १ ॥',
            transliteration:
              'na mantraṃ no yantraṃ tadapi ca na jāne stutimaho\nna cāhvānaṃ dhyānaṃ tadapi ca na jāne stutikathāḥ .\nna jāne mudrāste tadapi ca na jāne vilapanaṃ\nparaṃ jāne mātastvadanusaraṇaṃ kleśaharaṇam .. 1 ..',
            translationEn:
              '(O Mother) neither your mantra, nor yantra (do I know); and alas, not even I know your stutI (eulogy), I do not know how to invoke you through dhyana (meditation); (and alas), not even I know how to simply recite your glories (stuti-katha), I do not know your mudras (to contemplate on you); (and alas), not even I know how to simply cry for you, However, one thing I know (for certain); by following you (somehow through rememberance however imperfectly) will take away all my afflictions (from my mind).',
            translationHi:
              'हे माँ! न मैं मन्त्र जानता हूँ, न यन्त्र, न स्तुति, न आह्वान, न ध्यान, न कथा, न मुद्रा और न विलाप करना। केवल इतना जानता हूँ कि आपकी शरण में आने से समस्त क्लेशों का हरण हो जाता है।',
            meaningEn:
              '(O Mother) neither your mantra, nor yantra (do I know); and alas, not even I know your stuti; however, one thing I know for certain: taking refuge in You removes all afflictions.',
            meaningHi:
              'हे माँ! मैं किसी विधि-विधान को नहीं जानता, केवल आपकी शरण में आना जानता हूँ, जो समस्त क्लेशों को दूर करने वाली है।',
          },
          {
            id: 'aghamarshana-suktam',
            title: 'Aghamarshana Suktam',
            titleHi: 'अघमर्षण सूक्तम् (ऋग्वेद पाप-मोचन सूक्त)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/aghamarshana-suktam.htm',
            sanskrit:
              'हिरण्यशृङ्गं वरुणं प्रपद्ये तीर्थं मे देहि याचितः ।\nयन्मया भुक्तमसाधूनां पापेभ्यश्च प्रतिग्रहः ।\nयन्मे मनसा वाचा कर्मणा वा दुष्कृतं कृतम् ।\ntanna इन्द्रो वरुणो बृहस्पतिः सविता च पुनन्तु पुनः पुनः ॥\nनमोऽग्नयेऽप्सुमते नम इन्द्राय नमो वरुणाय नमो वारुण्यै नमोऽद्भ्यः ॥',
            transliteration:
              "hiraṇyaśr̥ṅgaṃ varuṇaṃ prapadyē tīrthaṃ mē dēhi yācitaḥ |\nyanmayā bhuktamasādhūnāṃ pāpēbhyaśca pratigrahaḥ |\nyanmē manasā vācā karmaṇā vā duṣkr̥taṃ kr̥tam |\ntanna indrō varuṇō br̥haspatiḥ savitā ca punantu punaḥ punaḥ ||\nnamō'gnayē'psumatē nama indrāya namō varuṇāya namō vāruṇyai namō'dbhyaḥ ||",
            translationEn:
              'I take refuge in Varuna, the golden-horned one. Being entreated, grant me a sacred ford for purification. Whatever I have consumed from the unrighteous, and whatever gifts I have received from sinners — whatever evil has been done by me through mind, speech, or action — may Indra, Varuna, Brihaspati, and Savita purify that, again and again. Salutations to Agni who dwells in waters, salutations to Indra, salutations to Varuna, salutations to Varuni, salutations to the Waters.',
            translationHi:
              'मैं सुवर्णशृंग वाले वरुणदेव की शरण लेता हूँ। मुझसे जाने-अनजाने जो भी अनुचित अन्न ग्रहण, अयोग्य दान या मन-वाणी-कर्म से पाप हुआ हो — उसे इंद्र, वरुण, बृहस्पति और सविता देव बारम्बार पवित्र करें।',
            meaningEn:
              'I take refuge in Varuna, the golden-horned one. Grant me purification from all misdeeds done by mind, speech, or action.',
            meaningHi:
              'हे वरुणदेव! मन, वाणी और कर्म से हुए समस्त ज्ञात-अज्ञात पापों का शमन कर मुझे परम पावन बनाएं।',
          },
        ],
      },
      {
        id: 'for-daily-devotion',
        nameEn: 'For Daily Devotion',
        nameHi: 'नित्य समर्पण एवं नित्य भक्ति श्लोक',
        headerTitleEn: 'Shlokas for Daily Devotion',
        headerTitleHi: 'नित्य स्मरण, दैनिक जप एवं समर्पण श्लोक',
        subtitleEn:
          "A little devotion each day keeps the heart turned toward God amid a busy life. Begin with Ganesha, then the names of Krishna and Rama, the Mother's blessing, and a bow to Shiva — short verses to chant every day, morning or evening. Repeat them as japa, a mala of 108 or as often as the mind returns to them through the day.",
        subtitleHi:
          'दैनिक जीवन में प्रभु से जुड़े रहने हेतु श्री गणेश, कृष्ण, माँ नारायणी, वासुदेव द्वादशाक्षर मन्त्र, राम नाम एवं महादेव के नित्य जपने योग्य पावन श्लोक।',
        deity: 'Krishna',
        image: imagePath.Krishna,
        sanskrit:
          'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥',
        transliteration:
          "sarvamaṅgalamāṅgalye śive sarvārthasādhike\nśaraṇye tryambake gauri nārāyaṇi namo'stu te",
        meaningEn:
          'O Nārāyaṇī, who is the most auspicious among all that is auspicious, who grants all desires, who offers refuge, and who is known as Tryambakā (the three-eyed Goddess) and Gaurī, I bow to you.',
        meaningHi:
          'हे नारायणी! आप सब मंगलों में मंगलमयी, कल्याणकारिणी, सब मनोरथों को सिद्ध करने वाली, शरणागतवत्सला, तीन नेत्रों वाली माँ गौरी हैं; आपको मेरा सादर प्रणाम है।',
        verses: [
          {
            id: 'vakratunda-mahakaya-daily',
            title: 'Vakratunda Mahakaya',
            titleHi: 'वक्रतुण्ड महाकाय (गणेश स्मरण)',
            deity: 'Ganesha',
            image: imagePath.Ganesha,
            link: 'https://shlokam.org/shloka/vakrathunda-mahakaya.htm',
            sanskrit:
              'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
            transliteration:
              'vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
            translationEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            translationHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा विघ्नरहित करें।',
            meaningEn:
              'O Lord with a curved trunk and a large body, whose splendour is equal to that of a million suns, remove all obstacles from my tasks, always and in all undertakings.',
            meaningHi:
              'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव श्री गणेश! मेरे सभी कार्यों को सदा विघ्नरहित करें।',
          },
          {
            id: 'krishnaya-vasudevaya-daily',
            title: 'Krishnaya Vasudevaya Haraye Paramatmane',
            titleHi: 'कृष्णाय वासुदेवाय (क्लेशनाशक मन्त्र)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/krishnaya-vasudevaya-haraye.htm',
            sanskrit:
              'कृष्णाय वासुदेवाय हरये परमात्मने ।\nप्रणतः क्लेशनाशाय गोविंदाय नमो नमः ॥',
            transliteration:
              'kṛṣṇāya vāsudevāya haraye paramātmane\npraṇataḥ kleśanāśāya govindāya namo namaḥ',
            translationEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            translationHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
            meaningEn:
              'Salutations again and again to Lord Krishna — the son of Vasudeva and the indweller of all beings — to Hari, the Supreme Soul. Salutations to Govinda, the destroyer of the sorrows of those who surrender unto Him.',
            meaningHi:
              'वासुदेवपुत्र, सर्वदुःखों को हरने वाले, परमात्मा स्वरूप भगवान श्रीकृष्ण को बारम्बार प्रणाम है। शरणागतों के समस्त क्लेशों का नाश करने वाले श्री गोविन्द को मेरा नमस्कार है।',
          },
          {
            id: 'sarva-mangala-mangalye-daily',
            title: 'Sarva Mangala Mangalye',
            titleHi: 'सर्वमङ्गलमाङ्गल्ये (नारायणी स्तुति)',
            deity: 'Durga',
            image: imagePath.Durga,
            link: 'https://shlokam.org/shloka/sarva-mangala-mangalye.htm',
            sanskrit:
              'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥',
            transliteration:
              "sarvamaṅgalamāṅgalye śive sarvārthasādhike\nśaraṇye tryambake gauri nārāyaṇi namo'stu te",
            translationEn:
              'O Nārāyaṇī, who is the most auspicious among all that is auspicious, who grants all desires, who offers refuge, and who is known as Tryambakā (the three-eyed Goddess) and Gaurī, I bow to you.',
            translationHi:
              'हे नारायणी! आप सब मंगलों में मंगलमयी, कल्याणकारिणी, सब मनोरथों को सिद्ध करने वाली, शरणागतवत्सला, तीन नेत्रों वाली माँ गौरी हैं; आपको मेरा सादर प्रणाम है।',
            meaningEn:
              'O Nārāyaṇī, who is the most auspicious among all that is auspicious, who grants all desires, who offers refuge, and who is known as Tryambakā (the three-eyed Goddess) and Gaurī, I bow to you.',
            meaningHi:
              'हे नारायणी! आप सब मंगलों में मंगलमयी, कल्याणकारिणी, सब मनोरथों को सिद्ध करने वाली, शरणागतवत्सला, तीन नेत्रों वाली माँ गौरी हैं; आपको मेरा सादर प्रणाम है।',
          },
          {
            id: 'om-namo-bhagavate-vasudevaya',
            title: 'Om Namo Bhagavate Vasudevaya',
            titleHi: 'द्वादशाक्षर मन्त्र (ॐ नमो भगवते वासुदेवाय)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/om-namo-bhagavate-vasudevaya.htm',
            sanskrit: 'ॐ नमो भगवते वासुदेवाय',
            transliteration: 'oṃ namo bhagavate vāsudevāya',
            translationEn:
              'I prostrate myself before Lord Vasudeva (Krishna - Incarnation of Lord Vishnu), the embodiment of the Supreme Divine.',
            translationHi:
              'परमब्रह्म स्वरूप, सर्वव्यापी भगवान श्री वासुदेव (कृष्ण) को मेरा कोटि-कोटि प्रणाम।',
            meaningEn:
              'I prostrate myself before Lord Vasudeva (Krishna - Incarnation of Lord Vishnu), the embodiment of the Supreme Divine.',
            meaningHi:
              'परमब्रह्म स्वरूप, सर्वव्यापी भगवान श्री वासुदेव (कृष्ण) को मेरा कोटि-कोटि प्रणाम।',
          },
          {
            id: 'sri-rama-rama-ramethi-daily',
            title: 'Sri Rama Rama Rameti',
            titleHi: 'श्री राम राम रामेति',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-rama-ramethi.htm',
            sanskrit:
              'श्री राम राम रामेति रमे रामे मनोरमे ।\nसहस्रनाम तत् तुल्यं रामनाम वरानने ॥',
            transliteration:
              'śrī rāma rāma rāmeti rame rāme manorame\nsahasranāma tat tulyaṃ rāmanāma varānane',
            translationEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            translationHi:
              "हे सुमुखि! 'श्री राम, राम, राम' इस प्रकार मनोहर राम-नाम में मेरा मन नित्य रमण करता है। राम-नाम विष्णुसहस्रनाम के समान फलदायी है।",
            meaningEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            meaningHi:
              "हे सुमुखि! 'श्री राम, राम, राम' इस प्रकार मनोहर राम-नाम में मेरा मन नित्य रमण करता है। राम-नाम विष्णुसहस्रनाम के समान फलदायी है।",
          },
          {
            id: 'namaste-astu-bhagavan',
            title: 'Namaste Astu Bhagavan',
            titleHi: 'श्री रुद्राध्याय मन्त्र (नमस्ते अस्तु भगवन्)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/namasthe-asthu-bhagavan.htm',
            sanskrit:
              'ॐ नमस्ते अस्तु भगवन्-विश्वेश्वराय महादेवाय त्र्यम्बकाय त्रिपुरान्तकाय त्रिकाग्निकालाय कालाग्निरुद्राय नीलकण्ठाय मृत्युञ्जयाय सर्वेश्वराय सदाशिवाय श्रीमन्महादेवाय नमः ॥',
            transliteration:
              'oṃ namaste astu bhagavan-viśveśvarāya mahādevāya tryambakāya tripurāntakāya trikāgnikālāya kālāgnirudrāya nīlakaṇṭhāya mṛtyuñjayāya sarveśvarāya sadāśivāya śrīmanmahādevāya namaḥ',
            translationEn:
              'Oṃ, salutations to You, O revered Lord of the Universe, the great God, the Three-eyed One, the vanquisher of Tripura, the One beyond the three aspects of time, O Rudra, the fiery embodiment of destruction and renewal, the Blue-throated One, the Conqueror of death, the Lord of all beings, the eternally auspicious one, the blessed Mahādeva.',
            translationHi:
              'हे विश्वेश्वर! हे महादेव! हे त्रिनेत्रधारी! हे त्रिपुरांतक! हे त्रिकालाग्नि स्वरूप! हे कालाग्निरुद्र! हे नीलकंठ! हे मृत्युंजय! हे सर्वेश्वर! हे सदाशिव! हे श्रीमन्महादेव! आपको मेरा बारंबार नमस्कार है।',
            meaningEn:
              'Oṃ, salutations to You, O revered Lord of the Universe, the great God, the Three-eyed One, the vanquisher of Tripura, the One beyond the three aspects of time, O Rudra, the fiery embodiment of destruction and renewal, the Blue-throated One, the Conqueror of death, the Lord of all beings, the eternally auspicious one, the blessed Mahādeva.',
            meaningHi:
              'हे विश्वेश्वर! हे महादेव! हे त्रिनेत्रधारी! हे त्रिपुरांतक! हे त्रिकालाग्नि स्वरूप! हे कालाग्निरुद्र! हे नीलकंठ! हे मृत्युंजय! हे सर्वेश्वर! हे सदाशिव! हे श्रीमन्महादेव! आपको मेरा बारंबार नमस्कार है।',
          },
        ],
      },
    ],
  },
  'spiritual-path': {
    id: 'occasion-spiritual-path',
    slug: 'spiritual-path',
    titleEn: 'The Spiritual Path',
    titleHi: 'आध्यात्मिक मार्ग',
    descriptionEn:
      "For the seeker's journey inward — the grace of the guru, inner peace, detachment, and liberation.",
    descriptionHi:
      'साधक की आंतरिक यात्रा — गुरु कृपा, आंतरिक शांति, वैराग्य, सत्य की खोज एवं मोक्ष।',
    imageUrl: 'https://shlokam.org/assets/domains/spiritual-path.jpeg',
    path: '/shloka/prayers/spiritual-path.htm',
    items: [
      {
        id: 'for-the-guru',
        nameEn: 'For the Grace of the Guru',
        nameHi: 'श्री गुरु कृपा एवं गुरु वंदना',
        headerTitleEn: 'Shlokas for the Guru',
        headerTitleHi: 'श्री गुरु स्तुति एवं पादुका वंदना श्लोक',
        subtitleEn:
          "The guru is honoured as the one who turns us from darkness toward light. These verses bow to the teacher as Brahma, Vishnu and Shiva, and to the grace that flows through the guru's feet. Chant these stotras with reverence, especially on Guru Purnima and Thursdays.",
        subtitleHi:
          'अज्ञान के अन्धकार से ज्ञान के प्रकाश की ओर ले जाने वाले श्री गुरुदेव की स्तुति, गुरु पादुका एवं दक्षिणामूर्ति स्तोत्र।',
        descriptionEn:
          "The guru is honoured as the one who turns us from darkness toward light. These verses bow to the teacher as Brahma, Vishnu and Shiva, and to the grace that flows through the guru's feet. Chant these stotras with reverence, especially on Guru Purnima and Thursdays.",
        descriptionHi:
          'अज्ञान के अन्धकार से ज्ञान के प्रकाश की ओर ले जाने वाले श्री गुरुदेव की स्तुति, गुरु पादुका एवं दक्षिणामूर्ति स्तोत्र।',
        deity: 'Brahma',
        image: imagePath.Brahma,
        path: '/shloka/prayers/for-the-guru.htm',
        sanskrit:
          'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।\nगुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥',
        transliteration:
          'gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ\nguruḥ sākṣāt paraṃ brahma tasmai śrīgurave namaḥ',
        meaningHi:
          'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं, और गुरु ही भगवान शिव महेश्वर हैं। गुरु ही साक्षात परब्रह्म हैं; ऐसे पूजनीय श्री गुरुदेव को मेरा कोटि-कोटि प्रणाम।',
        meaningEn:
          'The Guru is Brahma, the Guru is Vishnu, the Guru is Lord Shiva. The Guru is verily the Supreme Absolute. Salutations to that holy Guru.',
        verses: [
          {
            id: 'ishvaro-guru-atmeti',
            title: 'Ishvaro Guru Atmeti',
            titleHi: 'ईश्वरो गुरुरात्मेति (दक्षिणामूर्ति ध्यान)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/ishvaro-guru-atmeti.htm',
            sanskrit:
              'ईश्वरो गुरुरात्मेति मूर्तिभेदविभागिने ।\nव्योमवद् व्याप्तदेहाय दक्षिणामूर्तये नमः ॥',
            transliteration:
              'īśvaro gururātmeti mūrtibheda vibhāgine |\nvyomavad vyāptadehāya dakṣiṇāmūrtaye namaḥ ‖',
            translationEn:
              'Salutations to Lord Dakshinamurti, who is all-pervasive like space but who appears (as though) divided as Lord, Guru, and the Self.',
            translationHi:
              'जो आकाश के समान सर्वव्यापी हैं, किन्तु ईश्वर, गुरु और आत्मा—इन तीन रूपों में विभक्त प्रतीत होते हैं, उन भगवान श्री दक्षिणामूर्ति को मेरा सादर प्रणाम है।',
            meaningEn:
              'Salutations to Lord Dakshinamurti, who is all-pervasive like space but who appears (as though) divided as Lord, Guru, and the Self.',
            meaningHi:
              'जो आकाश के समान सर्वव्यापी हैं, किन्तु ईश्वर, गुरु और आत्मा—इन तीन रूपों में विभक्त प्रतीत होते हैं, उन भगवान श्री दक्षिणामूर्ति को मेरा सादर प्रणाम है।',
          },
          {
            id: 'guru-brahma-guru-vishnu',
            title: 'Guru Brahma Guru Vishnu',
            titleHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः (गुरु वन्दना)',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/guru-brahma-guru-vishnu.htm',
            sanskrit:
              'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः ॥',
            transliteration:
              'gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ\nguruḥ sākṣāt parabrahma tasmai śrī gurave namaḥ',
            translationEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            translationHi:
              'गुरु ही सृष्टि के रचयिता ब्रह्मा हैं, गुरु ही पालनकर्ता विष्णु हैं, और गुरु ही संहारकर्ता महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा बारम्बार नमस्कार है।',
            meaningEn:
              'The Guru is Brahmā, the Guru is Vishnu, the Guru is Maheśvara (Shiva). The Guru is verily the Supreme Brahman. Salutations to that revered Guru.',
            meaningHi:
              'गुरु ही सृष्टि के रचयिता ब्रह्मा हैं, गुरु ही पालनकर्ता विष्णु हैं, और गुरु ही संहारकर्ता महेश्वर (शिव) हैं। गुरु ही साक्षात् परब्रह्म हैं; उन पूज्य श्री गुरुदेव को मेरा बारम्बार नमस्कार है।',
          },
          {
            id: 'guru-paduka-stotram',
            title: 'Guru Paduka Stotram',
            titleHi: 'श्री गुरु पादुका स्तोत्रम् (श्लोक १)',
            deity: 'Brahma',
            image: imagePath.Brahma,
            link: 'https://shlokam.org/shloka/guru-paduka-stotram.htm',
            sanskrit:
              'अनन्तसंसार समुद्रतार नौकायिताभ्यां गुरुभक्तिदाभ्याम् ।\nवैराग्यसाम्राज्यदपूजनाभ्यां नमो नमः श्रीगुरुपादुकाभ्याम् ॥ १ ॥',
            transliteration:
              'anantasaṃsāra samudratāra naukāyitābhyāṃ gurubhaktidābhyām ।\nvairāgyasāmrājyadapūjanābhyāṃ namo namaḥ śrīgurupādukābhyām ॥ 1 ॥',
            translationEn:
              'Salutations to the sandals of my Guru, which is a boat that helps me cross the endless ocean of life, which endows me with the sense of devotion to my Guru, and by worship of which, I attain the dominion of renunciation.',
            translationHi:
              'जो इस अनंत भवसागर को पार कराने के लिए नौका के समान हैं, जो गुरु के प्रति अनन्य भक्ति प्रदान करने वाली हैं, और जिनकी पूजा से वैराग्य का साम्राज्य प्राप्त होता है—उन श्री गुरुदेव की पवित्र पादुकाओं को मेरा बारंबार प्रणाम है।',
            meaningEn:
              'Salutations to the sandals of my Guru, which is a boat that helps me cross the endless ocean of life, which endows me with the sense of devotion to my Guru, and by worship of which, I attain the dominion of renunciation.',
            meaningHi:
              'जो इस अनंत भवसागर को पार कराने के लिए नौका के समान हैं, जो गुरु के प्रति अनन्य भक्ति प्रदान करने वाली हैं, और जिनकी पूजा से वैराग्य का साम्राज्य प्राप्त होता है—उन श्री गुरुदेव की पवित्र पादुकाओं को मेरा बारंबार प्रणाम है।',
          },
          {
            id: 'guru-ashtakam',
            title: 'Guru Ashtakam',
            titleHi: 'श्री गुर्वष्टकम् (श्लोक १)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/guru-ashtakam.htm',
            sanskrit:
              'शरीरं सुरूपं तथा वा कलत्रं यशश्चारु चित्रं धनं मेरुतुल्यम् ।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम् ॥ १ ॥',
            transliteration:
              'śarīraṁ surūpaṁ tathā vā kalatraṁ | yaśaścāru citraṁ dhanaṁ mērutulyam |\nmanaścēnna lagnaṁ gurōraṅghripadmē | tataḥ kiṁ tataḥ kiṁ tataḥ kiṁ tataḥ kim || 1 ||',
            translationEn:
              "Even if one possesses a beautiful body, a lovely spouse, wonderful fame, and wealth equal to Mount Meru (immense wealth) - if one's mind is not devoted to the lotus feet of the Guru (spiritual teacher), then what is the use? What is the use? What is the use? What is the use?",
            translationHi:
              'यदि शरीर रूपवान हो, पत्नी सुंदर हो, कीर्ति चारों दिशाओं में फैली हो और मेरु पर्वत के समान अपार धन हो—परन्तु यदि मन गुरु के चरण-कमलों में लीन न हो, तो फिर इन सब से क्या लाभ? क्या लाभ? क्या लाभ? क्या लाभ?',
            meaningEn:
              "Even if one possesses a beautiful body, a lovely spouse, wonderful fame, and wealth equal to Mount Meru (immense wealth) - if one's mind is not devoted to the lotus feet of the Guru (spiritual teacher), then what is the use? What is the use? What is the use? What is the use?",
            meaningHi:
              'यदि शरीर रूपवान हो, पत्नी सुंदर हो, कीर्ति चारों दिशाओं में फैली हो और मेरु पर्वत के समान अपार धन हो—परन्तु यदि मन गुरु के चरण-कमलों में लीन न हो, तो फिर इन सब से क्या लाभ? क्या लाभ? क्या लाभ? क्या लाभ?',
          },
          {
            id: 'dakshinamurthy-stotram',
            title: 'Dakshinamurthy Stotram',
            titleHi: 'श्री दक्षिणामूर्ति स्तोत्रम् (मौनव्याख्या)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/dakshinamurthy-stotram.htm',
            sanskrit:
              'ॐ मौनव्याख्या प्रकटितपरब्रह्मतत्वं युवानं वर्शिष्ठान्तेवसदृषिगणैरावृतं ब्रह्मनिष्ठैः ।\nआचार्येन्द्रं करकलित चिन्मुद्रमानन्दमूर्तिं स्वात्मारामं मुदितवदनं दक्षिणामूर्तिमीडे ॥',
            transliteration:
              'oṃ maunavyākhyā prakaṭita parabrahmatatvaṃ yuvānaṃ\nvarśiṣṭhānte vasad ṛṣigaṇair āvṛtaṃ brahmaniṣṭhaiḥ |\nācāryendraṃ karakalita cinmudram ānandamūrtiṃ\nsvātmārāmaṃ muditavadanaṃ dakṣiṇāmūrtimīḍe ‖',
            translationEn:
              'I salute Sri Dakshinamurti, the Young Guru, who teaches the knowledge of Brahman through silence, who is surrounded by disciples who are themselves aged rishis and scholars in the Vedas. I worship Sri Dakshinamurti, teacher of teachers, whose hand holds the chin-mudra, who is the embodiment of supreme bliss and self-realization.',
            translationHi:
              'मौन व्याख्या द्वारा परब्रह्म तत्व को प्रकट करने वाले, परम युवा, वृद्ध ब्रह्मनिष्ठ ऋषियों से घिरे हुए, ज्ञानमुद्रा (चिन्मुद्रा) धारण किए हुए, आनंदस्वरूप, आत्माराम, प्रसन्नमुख, गुरुओं के भी गुरु भगवान दक्षिणामूर्ति की मैं स्तुति करता हूँ।',
            meaningEn:
              'I salute Sri Dakshinamurti, the Young Guru, who teaches the knowledge of Brahman through silence, who is surrounded by disciples who are themselves aged rishis and scholars in the Vedas. I worship Sri Dakshinamurti, teacher of teachers, whose hand holds the chin-mudra, who is the embodiment of supreme bliss and self-realization.',
            meaningHi:
              'मौन व्याख्या द्वारा परब्रह्म तत्व को प्रकट करने वाले, परम युवा, वृद्ध ब्रह्मनिष्ठ ऋषियों से घिरे हुए, ज्ञानमुद्रा (चिन्मुद्रा) धारण किए हुए, आनंदस्वरूप, आत्माराम, प्रसन्नमुख, गुरुओं के भी गुरु भगवान दक्षिणामूर्ति की मैं स्तुति करता हूँ।',
          },
          {
            id: 'om-namah-pranavarthaya',
            title: 'Om Namah Pranavarthaya',
            titleHi: 'ॐ नमः प्रणवार्थाय (दक्षिणामूर्ति वन्दना)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/om-namah-pranavarthaya.htm',
            sanskrit:
              'ॐ नमः प्रणवार्थाय शुद्धज्ञानैकमूर्तये ।\nनिर्मलाय प्रशान्ताय दक्षिणामूर्तये नमः ॥',
            transliteration:
              'oṃ namaḥ praṇavārthāya śuddhajñānaikamūrtaye\nnirmalāya praśāntāya dakṣiṇāmūrtaye namaḥ',
            translationEn:
              'Om, Salutations to Dakṣiṇāmūrti, the embodiment of the sacred syllable Om, the form of pure, undivided knowledge, free from impurity, tranquil, and serene.',
            translationHi:
              'प्रणव (ॐ) के अर्थ स्वरूप, विशुद्ध ज्ञान की साक्षात् मूर्ति, निर्मल एवं परम प्रशांत भगवान श्री दक्षिणामूर्ति को मेरा सादर नमस्कार है।',
            meaningEn:
              'Om, Salutations to Dakṣiṇāmūrti, the embodiment of the sacred syllable Om, the form of pure, undivided knowledge, free from impurity, tranquil, and serene.',
            meaningHi:
              'प्रणव (ॐ) के अर्थ स्वरूप, विशुद्ध ज्ञान की साक्षात् मूर्ति, निर्मल एवं परम प्रशांत भगवान श्री दक्षिणामूर्ति को मेरा सादर नमस्कार है।',
          },
        ],
      },
      {
        id: 'for-inner-peace',
        nameEn: 'For Inner Peace',
        nameHi: 'आंतरिक शांति एवं वैदिक शांति पाठ',
        headerTitleEn: 'Shlokas for Inner Peace',
        headerTitleHi: 'आंतरिक शांति, पूर्णता एवं उपनिषद शांति मन्त्र',
        subtitleEn:
          "Beneath our wants and worries lies a longing for a peace that does not depend on circumstance. These are the shanti mantras — 'may we hear only what is auspicious', 'may all be at peace', 'You alone are mother and father to me' — that open the heart to that stillness. Chant any of them slowly, and rest in the quiet they leave behind.",
        subtitleHi:
          'सांसारिक व्याकुलताओं से परे हृदय में गहरी शांति, पूर्णता (पूर्णमदः पूर्णमिदम्), भद्रं कर्णेभिः, शं नो मित्रः एवं त्वमेव माता च पिता स्तोत्र।',
        descriptionEn:
          "Beneath our wants and worries lies a longing for a peace that does not depend on circumstance. These are the shanti mantras — 'may we hear only what is auspicious', 'may all be at peace', 'You alone are mother and father to me' — that open the heart to that stillness. Chant any of them slowly, and rest in the quiet they leave behind.",
        descriptionHi:
          'सांसारिक व्याकुलताओं से परे हृदय में गहरी शांति, पूर्णता (पूर्णमदः पूर्णमिदम्), भद्रं कर्णेभिः, शं नो मित्रः एवं त्वमेव माता च पिता स्तोत्र।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        path: '/shloka/prayers/for-inner-peace.htm',
        sanskrit:
          'ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration:
          'oṃ pūrṇamadaḥ pūrṇamidaṃ pūrṇāt pūrṇamudacyate\npūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate\noṃ śāntiḥ śāntiḥ śāntiḥ',
        meaningHi:
          'वह (परब्रह्म) पूर्ण है और यह (जगत) भी पूर्ण है। पूर्ण से ही पूर्ण की उत्पत्ति होती है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्ति, शान्ति, शान्ति।',
        meaningEn:
          'Om. Wholeness is That, Wholeness is This. From the Whole, the Whole comes forth. Removing the Whole from the Whole, the Whole remains. Om, peace, peace, peace.',
        verses: [
          {
            id: 'purnamadhah-purnamidham',
            title: 'Purnamadhah Purnamidham',
            titleHi: 'ॐ पूर्णमदः पूर्णमिदम् (ईशावास्योपनिषद् शान्ति मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/purnamadhah-purnamidham.htm',
            sanskrit:
              'ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ pūrṇamadaḥ pūrṇamidaṃ pūrṇāt pūrṇamudacyate\npūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Om. Wholeness is That, Wholeness is This. From the Whole, the Whole comes forth. Removing the Whole from the Whole, the Whole remains. Om, peace, peace, peace.',
            translationHi:
              'वह (परब्रह्म) पूर्ण है, यह (दृश्यमान जगत) भी पूर्ण है। पूर्ण से ही पूर्ण का प्राकट्य होता है। पूर्ण में से पूर्ण को ले लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Om. Wholeness is That, Wholeness is This. From the Whole, the Whole comes forth. Removing the Whole from the Whole, the Whole remains. Om, peace, peace, peace.',
            meaningHi:
              'वह (परब्रह्म) पूर्ण है, यह (दृश्यमान जगत) भी पूर्ण है। पूर्ण से ही पूर्ण का प्राकट्य होता है। पूर्ण में से पूर्ण को ले लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'bhadram-karne',
            title: 'Bhadram Karne',
            titleHi: 'ॐ भद्रं कर्णेभिः (ऋग्वेद / माण्डूक्य शान्ति मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/bhadram-karne.htm',
            sanskrit:
              'ॐ भद्रं कर्णेभिः शृणुयाम देवाः भद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरङ्गैस्तुष्टुवाग्ँसस्तनूभिः व्यशेम देवहितं यदायुः ॥\nस्वस्ति न इन्द्रो वृद्धश्रवाः स्वस्ति नः पूषा विश्ववेदाः ।\nस्वस्ति नस्तार्क्ष्यो अरिष्टनेमिः स्वस्ति नो बृहस्पतिर्दधातु ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ bhadraṃ paśyemākṣabhiryajatrāḥ .\nsthirairaṅgaistuṣṭuvāgm̐sastanūbhiḥ vyaśema devahitaṃ yadāyuḥ ..\nsvasti na indro vṛddhaśravāḥ svasti naḥ pūṣā viśvavedāḥ .\nsvasti nastārkṣyo ariṣṭanemiḥ svasti no bṛhaspatirdadhātu ..\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Oṃ, O Gods, may we hear auspicious things with our ears, may we see auspicious things with our eyes, O worship-worthy ones. With strong limbs and bodies, may we spend our life praising the divine, and may we enjoy the full span of life dedicated to the service of the Gods. May Indra, Pūṣā, Tārkṣya, and Bṛhaspati grant us well-being. Oṃ, peace, peace, peace.',
            translationHi:
              'हे देवगण! हम अपने कानों से कल्याणकारी वचन सुनें, नेत्रों से शुभ व मंगल देखें। सुदृढ़ अंगों व स्वस्थ शरीर से प्रभु की स्तुति करते हुए हम ईश्वर-अर्पित आयु का उपभोग करें। देवराज इन्द्र, विश्ववेदा पूषा, अरिष्टनेमि गरुड़ और देवगुरु बृहस्पति हमारा कल्याण करें। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ, O Gods, may we hear auspicious things with our ears, may we see auspicious things with our eyes, O worship-worthy ones. With strong limbs and bodies, may we spend our life praising the divine, and may we enjoy the full span of life dedicated to the service of the Gods. May Indra, Pūṣā, Tārkṣya, and Bṛhaspati grant us well-being. Oṃ, peace, peace, peace.',
            meaningHi:
              'हे देवगण! हम अपने कानों से कल्याणकारी वचन सुनें, नेत्रों से शुभ व मंगल देखें। सुदृढ़ अंगों व स्वस्थ शरीर से प्रभु की स्तुति करते हुए हम ईश्वर-अर्पित आयु का उपभोग करें। देवराज इन्द्र, विश्ववेदा पूषा, अरिष्टनेमि गरुड़ और देवगुरु बृहस्पति हमारा कल्याण करें। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'sham-no-mithrah-sham',
            title: 'Sham No Mithrah Sham',
            titleHi: 'ॐ शं नो मित्रः (तैत्तिरीयोपनिषद् शान्ति मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/sham-no-mithrah-sham.htm',
            sanskrit:
              'ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा ।\nशं नो इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः ॥\nनमो ब्रह्मणे । नमस्ते वायो ।\nत्वमेव प्रत्यक्षं ब्रह्मासि । त्वामेव प्रत्यक्षं ब्रह्म वदिष्यामि ।\nॠतं वदिष्यामि । सत्यं वदिष्यामि ।\nतन्मामवतु । तद्वक्तारमवतु । अवतु माम् । अवतु वक्तारम् ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā |\nśaṃ no indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ ||\nnamo brahmaṇe | namaste vāyo |\ntvameva pratyakṣaṃ brahmāsi | tvāmeva pratyakṣaṃ brahma vadiṣyāmi |\nṝtaṃ vadiṣyāmi | satyaṃ vadiṣyāmi |\ntanmāmavatu | tadvaktāramavatu | avatu mām | avatu वक्तारम् ||\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Oṃ, may Mitra (the Solar deity) be good to us, may Varuṇa (the God of cosmic law) be good to us. May Aryamā be good to us, may Indra and Bṛhaspati be good to us. May Vishnu, who strides widely, be good to us. Salutations to Brahman. Salutations to Vāyu. You are the direct Brahman; I shall declare you to be the direct Brahman. I shall speak what is right; I shall speak what is true. May that protect me and the speaker. Oṃ, peace, peace, peace.',
            translationHi:
              'मित्र, वरुण, अर्यमा, इन्द्र, बृहस्पति और विशाल डग भरने वाले श्रीविष्णु हमारे लिए कल्याणकारी हों। ब्रह्म को नमस्कार, वायुदेव को नमस्कार। आप ही प्रत्यक्ष ब्रह्म हैं; मैं सत्य और ऋत का ही कथन करूँगा। वह परब्रह्म मेरी और आचार्य की रक्षा करे। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ, may Mitra, Varuṇa, Aryamā, Indra, Bṛhaspati, and the wide-striding Vishnu be auspicious to us. Salutations to Brahman and to Vāyu. You are direct Brahman; I shall speak what is right and true. May That protect me and the speaker. Oṃ, peace, peace, peace.',
            meaningHi:
              'मित्र, वरुण, अर्यमा, इन्द्र, बृहस्पति और विशाल डग भरने वाले श्रीविष्णु हमारे लिए कल्याणकारी हों। ब्रह्म को नमस्कार, वायुदेव को नमस्कार। आप ही प्रत्यक्ष ब्रह्म हैं; मैं सत्य और ऋत का ही कथन करूँगा। वह परब्रह्म मेरी और आचार्य की रक्षा करे। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'apyayantu-mamangani-peace',
            title: 'Apyayantu Mamangani',
            titleHi: 'ॐ आप्यायन्तु ममाङ्गानि (केनोपनिषद् शान्ति मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/apyayantu-mamangani.htm',
            sanskrit:
              'ॐ आप्यायन्तु ममाङ्गानि वाक्प्राणश्चक्षुःश्रोत्रमथो बलमिन्द्रियाणि च सर्वाणि ।\nसर्वं ब्रह्मौपनिषदं माऽहं ब्रह्म निराकुर्यां मा मा ब्रह्म निराकरोदनिराकरणमस्त्वनिराकरणं मेऽस्तु ।\nतदात्मनि निरते य उपनिषत्सु धर्मास्ते मयि सन्तु ते मयि सन्तु ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              "oṃ āpyāyantu mamāṅgāni vākprāṇaścakṣuḥśrotramatho balamindriyāṇi ca sarvāṇi .\nsarvaṃ brahmaupaniṣadaṃ mā'haṃ brahma nirākuryāṃ mā mā brahmanirākarodanirākaraṇamastvanirākaraṇaṃ me'stu .\ntadātmani nirate ya upaniṣatsu dharmāste mayi santu te mayi santu .\noṃ śāntiḥ śāntiḥ śāntiḥ",
            translationEn:
              'Oṃ! May my organs and limbs, my speech, my breath, my strength and my sense organs like the ear, the eyes etc., be well nourished. Everything is Brahman as propounded clearly in the Upanishads. May I never deny Brahman. May Brahman never deny me. May the virtues described in the Upanishads become part of me. Oṃ, peace, peace, peace.',
            translationHi:
              'मेरे समस्त अंग, वाणी, प्राण, चक्षु, श्रोत्र, बल एवं समस्त इन्द्रियां पुष्ट हों। उपनिषदों में प्रतिपादित सब कुछ ब्रह्म ही है। मैं कभी ब्रह्म का तिरस्कार न करूँ, ब्रह्म मुझे न त्यागे। उपनिषदों में वर्णित समस्त आध्यात्मिक धर्म मुझमें प्रतिष्ठित हों। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ! May my organs and limbs, my speech, my breath, my strength and my sense organs like the ear, the eyes etc., be well nourished. Everything is Brahman as propounded clearly in the Upanishads. May I never deny Brahman. May Brahman never deny me. May the virtues described in the Upanishads become part of me. Oṃ, peace, peace, peace.',
            meaningHi:
              'मेरे समस्त अंग, वाणी, प्राण, चक्षु, श्रोत्र, बल एवं समस्त इन्द्रियां पुष्ट हों। उपनिषदों में प्रतिपादित सब कुछ ब्रह्म ही है। मैं कभी ब्रह्म का तिरस्कार न करूँ, ब्रह्म मुझे न त्यागे। उपनिषदों में वर्णित समस्त आध्यात्मिक धर्म मुझमें प्रतिष्ठित हों। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'tvameva-matha-cha',
            title: 'Tvameva Matha Cha',
            titleHi: 'त्वमेव माता च पिता त्वमेव (आत्मसमर्पण श्लोक)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/tvameva-matha-cha.htm',
            sanskrit:
              'त्वमेव माता च पिता त्वमेव\nत्वमेव बन्धुश्च सखा त्वमेव ।\nत्वमेव विद्या द्रविणं त्वमेव\nत्वमेव सर्वं मम देव देव ॥',
            transliteration:
              'tvameva mātā ca pitā tvameva\ntvameva bandhuśca sakhā tvameva\ntvameva vidyā draviṇaṃ tvameva\ntvameva sarvaṃ mama deva deva',
            translationEn:
              'You alone are my mother, and You alone are my father. You alone are my relative and my friend. You alone are knowledge and wealth. You alone are everything to me, O Lord of Lords.',
            translationHi:
              'हे देवों के देव! आप ही मेरी माता हैं और आप ही मेरे पिता हैं। आप ही मेरे बंधु-बांधव हैं और आप ही मेरे सखा (मित्र) हैं। आप ही मेरी विद्या हैं और आप ही मेरा धन (संपदा) हैं। आप ही मेरे सर्वस्व हैं।',
            meaningEn:
              'You alone are my mother, and You alone are my father. You alone are my relative and my friend. You alone are knowledge and wealth. You alone are everything to me, O Lord of Lords.',
            meaningHi:
              'हे देवों के देव! आप ही मेरी माता हैं और आप ही मेरे पिता हैं। आप ही मेरे बंधु-बांधव हैं और आप ही मेरे सखा (मित्र) हैं। आप ही मेरी विद्या हैं और आप ही मेरा धन (संपदा) हैं। आप ही मेरे सर्वस्व हैं।',
          },
        ],
      },
      {
        id: 'for-detachment',
        nameEn: 'For Freedom from Desire',
        nameHi: 'वैराग्य एवं वासना-मुक्ति (निर्वाणषट्कम् व वैराग्य शतकम्)',
        headerTitleEn: 'Shlokas for Freedom from Desire',
        headerTitleHi: 'वैराग्य, अनासक्ति एवं निर्वाणषट्कम् श्लोक',
        subtitleEn:
          "A time comes when the heart tires of chasing what never quite satisfies. These verses — Bhaja Govindam, the Isha Upanishad's counsel to enjoy by letting go, and the songs of the renunciate — loosen the grip of craving and turn us inward. Reflect on them, letting their vision of freedom take root in the mind.",
        subtitleHi:
          'सांसारिक तृष्णाओं से मुक्ति, त्यागपूर्वक उपभोग (ईशावास्यम्), निर्वाणषट्कम् (शिवोऽहम्), कौपीन पञ्चकम् एवं वैराग्य शतकम्।',
        descriptionEn:
          "A time comes when the heart tires of chasing what never quite satisfies. These verses — Bhaja Govindam, the Isha Upanishad's counsel to enjoy by letting go, and the songs of the renunciate — loosen the grip of craving and turn us inward. Reflect on them, letting their vision of freedom take root in the mind.",
        descriptionHi:
          'सांसारिक तृष्णाओं से मुक्ति, त्यागपूर्वक उपभोग (ईशावास्यम्), निर्वाणषट्कम् (शिवोऽहम्), कौपीन पञ्चकम् एवं वैराग्य शतकम्।',
        deity: 'Shiva',
        image: imagePath.Bholenath,
        path: '/shloka/prayers/for-freedom-from-desire.htm',
        sanskrit:
          'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे ।\nन च व्योम भूमिर्न तेजो न वायुः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        transliteration:
          "manobuddhyahaṅkāra cittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre .\nna ca vyoma bhūmirna tejo na vāyuḥ cidānandarūpaḥ śivo'ham śivo'ham",
        meaningHi:
          'मैं न मन हूँ, न बुद्धि, न अहंकार, न चित्त; न कान, न जिह्वा, न नासिका और न ही नेत्र। न मैं आकाश हूँ, न पृथ्वी, न अग्नि और न ही वायु। मैं तो केवल सच्चिदानंद स्वरूप हूँ, मैं शिव हूँ, मैं शिव हूँ।',
        meaningEn:
          'I am not the mind, intellect, ego, or memory; neither ears, tongue, nose, nor eyes. I am neither ether, earth, fire, nor air. I am pure consciousness and bliss. I am Shiva, I am Shiva.',
        verses: [
          {
            id: 'bhaja-govindam-mudha-jahihi',
            title: 'Bhaja Govindam (Mudha Jahihi)',
            titleHi: 'मूढ जहीहि धनागमतृष्णां (भज गोविन्दम् श्लोक २)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bhaja-govindam-all-verses.htm',
            sanskrit:
              'मूढ जहीहि धनागमतृष्णां कुरु सद्बुद्धिम् मनसि वितृष्णाम् ।\nयल्लभसे निज कर्मोपात्तं वित्तं तेन विनोदय चित्तम् ॥ २ ॥',
            transliteration:
              'mūḍha jahīhi dhanāgamatṛṣṇāṃ kuru sadbuddhim manasi vitṛṣṇām |\nyallabhase nija karmopāttaṃ vittaṃ tena vinodaya cittam ‖ 2 ‖',
            translationEn:
              'O deluded one, abandon your thirst for the acquisition of wealth. Cultivate right understanding in a mind free from craving. With whatever wealth you obtain through your own actions, gladden your heart with that alone.',
            translationHi:
              'हे मूढ़ मन! धन संचय की अंधी तृष्णा को त्याग दो। मन को निष्काम और सन्मार्ग की ओर प्रेरित करो। अपने सत्कर्मों से जो भी धन प्राप्त हो, उसी से अपने चित्त को संतुष्ट व प्रसन्न रखो।',
            meaningEn:
              'O deluded one, abandon your thirst for the acquisition of wealth. Cultivate right understanding in a mind free from craving. With whatever wealth you obtain through your own actions, gladden your heart with that alone.',
            meaningHi:
              'हे मूढ़ मन! धन संचय की अंधी तृष्णा को त्याग दो। मन को निष्काम और सन्मार्ग की ओर प्रेरित करो। अपने सत्कर्मों से जो भी धन प्राप्त हो, उसी से अपने चित्त को संतुष्ट व प्रसन्न रखो।',
          },
          {
            id: 'ishavasyam-idam-sarvam',
            title: 'Ishavasyam Idam Sarvam',
            titleHi: 'ईशावास्यमिदं सर्वं (ईशावास्योपनिषद् मन्त्र १)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/isha-upanishad.htm',
            sanskrit:
              'ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्य स्विद्धनम् ॥ १ ॥',
            transliteration:
              'īśāvāsyamidaṃ sarvaṃ yatkiñca jagatyāṃ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya sviddhanam || 1 ||',
            translationEn:
              "All this — whatsoever moves in this universe — is enveloped and pervaded by the Lord. By renouncing attachment, enjoy and sustain yourself; do not covet anyone's wealth, for to whom does wealth truly belong?",
            translationHi:
              'इस परिवर्तनशील अखिल ब्रह्मांड में जो कुछ भी जड़-चेतन जगत है, वह सब ईश्वर से व्याप्त है। अतः त्याग भाव से उसका उपभोग करो, किसी के भी धन का लोभ मत करो।',
            meaningEn:
              "All this — whatsoever moves in this universe — is enveloped and pervaded by the Lord. By renouncing attachment, enjoy and sustain yourself; do not covet anyone's wealth, for to whom does wealth truly belong?",
            meaningHi:
              'इस परिवर्तनशील अखिल ब्रह्मांड में जो कुछ भी जड़-चेतन जगत है, वह सब ईश्वर से व्याप्त है। अतः त्याग भाव से उसका उपभोग करो, किसी के भी धन का लोभ मत करो।',
          },
          {
            id: 'bhaja-govindam-ma-kuru-dhana',
            title: 'Bhaja Govindam (Ma Kuru Dhana Jana)',
            titleHi: 'मा कुरु धनजन यौवन गर्वं (भज गोविन्दम् श्लोक ११)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/bhaja-govindam-all-verses.htm',
            sanskrit:
              'मा कुरु धनजन यौवन गर्वं हरति निमेषात् कालः सर्वम् ।\nमायामयमिदम् अखिलं हित्वा ब्रह्मपदं त्वं प्रविश विदित्वा ॥ ११ ॥',
            transliteration:
              'mā kuru dhanajana yauvana garvaṃ harati nimeṣāt-kālaḥ sarvam |\nmāyāmayamidam-akhilaṃ hitvā brahmapadaṃ tvaṃ praviśa viditvā ‖ 11 ‖',
            translationEn:
              'Do not take pride in wealth, in followers, or in youth, for Time carries all of these away in a single instant. Renounce this entire world, which is made of illusion, and having realized the truth, enter into the state of Brahman.',
            translationHi:
              'धन, परिवार और यौवन पर कभी अहंकार मत करो, क्योंकि काल एक ही क्षण में इन सबको हर लेता है। इस संपूर्ण मायामय संसार की नश्वरता को जानकर परब्रह्म परमात्मा के परम पद में प्रवेश करो।',
            meaningEn:
              'Do not take pride in wealth, in followers, or in youth, for Time carries all of these away in a single instant. Renounce this entire world, which is made of illusion, and having realized the truth, enter into the state of Brahman.',
            meaningHi:
              'धन, परिवार और यौवन पर कभी अहंकार मत करो, क्योंकि काल एक ही क्षण में इन सबको हर लेता है। इस संपूर्ण मायामय संसार की नश्वरता को जानकर परब्रह्म परमात्मा के परम पद में प्रवेश करो।',
          },
          {
            id: 'nirvana-shatakam-detachment',
            title: 'Nirvana Shatakam',
            titleHi: 'श्री निर्वाणषट्कम् (समस्त ६ श्लोक - शिवोऽहम्)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/nirvana-shatakam.htm',
            sanskrit:
              'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे ।\nन च व्योम भूमिर्न तेजो न वायुः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥१॥\n\nन च प्राणसंज्ञो न वै पञ्चवायुः न वा सप्तधातुः न वा पञ्चकोशः ।\nन वाक्पाणिपादं न चोपस्थपायु चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥२॥\n\nन मे द्वेषरागौ न मे लोभमोहौ मदो नैव मे नैव मात्सर्यभावः ।\nन धर्मो न चार्थो न कामो न मोक्षः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥३॥\n\nन पुण्यं न पापं न सौख्यं न दुःखं न मन्त्रो न तीर्थं न वेदा न यज्ञाः ।\nअहं भोजनं नैव भोज्यं न भोक्ता चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥४॥\n\nन मृत्युर्न शङ्का न मे जातिभेदः पिता नैव मे नैव माता न जन्मः ।\nन बन्धुर्न मित्रं गुरुर्नैव शिष्यं चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥५॥\n\nअहं निर्विकल्पो निराकाररूपो विभुत्वाच्च सर्वत्र सर्वेन्द्रियाणाम् ।\nन चासङ्गतं नैव मुक्तिर्न मेयः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥६॥',
            transliteration:
              "manobuddhyahaṅkāra cittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre .\nna ca vyoma bhūmirna tejo na vāyuḥ cidānandarūpaḥ śivo'ham śivo'ham ||1||\n\nna ca prāṇasaṃjño na vai pañcavāyuḥ na vā saptadhātuḥ na vā pañcakośaḥ .\nna vākpāṇipādaṃ na copasthapāyu cidānandarūpaḥ śivo'ham śivo'ham ||2||\n\nna me dveṣarāgau na me lobhamohau mado naiva me naiva mātsaryabhāvaḥ .\nna dharmo na cārtho na kāmo na mokṣaḥ cidānandarūpaḥ śivo'ham śivo'ham ||3||\n\nna puṇyaṃ na pāpaṃ na saukhyaṃ na duḥkhaṃ na mantro na tīrthaṃ na vedā na yajñāḥ .\nahaṃ bhojanaṃ naiva bhojyaṃ na bhoktā cidānandarūpaḥ śivo'ham śivo'ham ||4||\n\nna mṛtyurna śaṅkā na me jātibhedaḥ pitā naiva me naiva mātā na janmaḥ .\nna bandhurna mitraṃ gururnaiva śiṣyaṃ cidānandarūpaḥ śivo'ham śivo'ham ||5||\n\nahaṃ nirvikalpo nirākārarūpo vibhutvācca sarvatra sarvendriyāṇām .\nna cāsaṅgataṃ naiva muktirna meyaḥ cidānandarūpaḥ śivo'ham śivo'ham ||6||",
            translationEn:
              'I am neither mind, intellect, ego, nor memory; neither senses nor the elements. I am beyond life-forces, bodily constituents, and sheaths. I have no hatred, attachment, greed, delusion, pride, or envy. Neither virtue nor sin, joy nor sorrow, mantra nor sacrifice. I have no death, fear, caste, parents, friends, or guru. I am formless, changeless, and all-pervading. I am pure consciousness and absolute bliss. I am Shiva, I am Shiva.',
            translationHi:
              'मैं न मन, बुद्धि, अहंकार या चित्त हूँ; न ज्ञानेन्द्रियाँ और न पञ्चमहाभूत। न प्राण, न धातु, न कोष। मुझमें न राग-द्वेष है, न लोभ-मोह, न मद-मत्सर। न धर्म, अर्थ, काम, मोक्ष; न पुण्य-पाप, न सुख-दुःख, न मन्त्र-तीर्थ। न मृत्यु, न भय, न जाति, न माता-पिता, न गुरु-शिष्य। मैं निर्विकल्प, निराकार, सर्वव्यापी सच्चिदानंद स्वरूप हूँ। मैं शिव हूँ, मैं शिव हूँ।',
            meaningEn:
              'I am not the mind, intellect, ego, or memory; neither the senses nor the five elements. I have neither attachment nor aversion, virtue nor vice. I am eternal consciousness and bliss — I am Shiva, I am Shiva.',
            meaningHi:
              'मैं मन, बुद्धि, इन्द्रियों एवं देह के समस्त बंधनों से परे, नित्य शुद्ध, बुद्ध, मुक्त एवं सच्चिदानंद स्वरूप शिव हूँ।',
          },
          {
            id: 'kaupina-panchakam',
            title: 'Kaupina Panchakam',
            titleHi: 'कौपीन पञ्चकम् (आदिशंकराचार्य विरचितम्)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/kaupina-panchakam.htm',
            sanskrit:
              'वेदान्तवाक्येषु सदा रमन्तो भिक्षान्नमात्रेण च तुष्टिमन्तः ।\nविशोकमन्तःकरणे चरन्तः कौपीनवन्तः खलु भाग्यवन्तः ॥ १॥\n\nमूलं तरोः केवलमाश्रयन्तः पाणिद्वयं भोक्तुममन्त्रयन्तः ।\nकन्थामिव श्रीमपि कुत्सयन्तः कौपीनवन्तः खलु भाग्यवन्तः ॥ २॥\n\nस्वानन्दभावे परितुष्टिमन्तः सुशान्तसर्वेन्द्रियवृत्तिमन्तः ।\nअहर्निशं ब्रह्मसुखे रमन्तः कौपीनवन्तः खलु भाग्यवन्तः ॥ ३॥\n\nदेहादिभावं परिवर्तयन्तः स्वात्मानमात्मन्यवलोकयन्तः ।\nनान्तं न मध्यं न बहिः स्मरन्तः कौपीनवन्तः खलु भाग्यवन्तः ॥ ४॥\n\nब्रह्माक्षरं पावनमुच्चरन्तो ब्रह्माहमस्मीति विभावयन्तः ।\nभिक्षाशिनो दिक्षु परिभ्रमन्तः कौपीनवन्तः खलु भाग्यवन्तः ॥ ५॥',
            transliteration:
              'vedāntavākyeṣu sadā ramanto bhikṣānnamātreṇa ca tuṣṭimantaḥ .\nviśokamantaḥkaraṇe carantaḥ kaupīnavantaḥ khalu bhāgyavantaḥ .. 1..\n\nmūlaṃ taroḥ kevalamāśrayantaḥ pāṇidvayaṃ bhoktumamantrayantaḥ .\nkanthāmiva śrīmapi kutsayantaḥ kaupīnavantaḥ khalu bhāgyavantaḥ .. 2..\n\nsvānandabhāve parituṣṭimantaḥ suśāntasarvendriyavṛttimantaḥ .\naharniśaṃ brahmasukhe ramantaḥ kaupīnavantaḥ khalu bhāgyavantaḥ .. 3..\n\ndehādibhāvaṃ parivartayantaḥ svātmānamātmanyavalokayantaḥ .\nnāntaṃ na madhyaṃ na bahiḥ smarantaḥ kaupīnavantaḥ khalu bhāgyavantaḥ .. 4..\n\nbrahmākṣaraṃ pāvanamuccaranto brahmāhamasmīti vibhāvayantaḥ .\nbhikṣāśino dikṣu paribhramantaḥ kaupīnavantaḥ khalu bhāgyavantaḥ .. 5..',
            translationEn:
              '1. Delighting ever in the truths of Vedanta, content with simple alms, their hearts free from sorrow — blessed indeed is the ascetic who wears only a loincloth.\n2. Sheltering under the roots of trees, eating from cupped hands, viewing wealth as a torn rag — blessed indeed is the ascetic.\n3. Rejoicing in inner bliss, all senses tranquil, immersed day and night in the joy of Brahman — blessed indeed is the ascetic.\n4. Transcending identification with the body, beholding the Self within, unconcerned with outer boundaries — blessed indeed is the ascetic.\n5. Chanting the sacred syllable Om, meditating on "I am Brahman", wandering freely in all directions — blessed indeed is the ascetic.',
            translationHi:
              '१. जो वेदान्त के वचनों में रमण करते हैं, भिक्षा के थोड़े से अन्न से संतुष्ट रहते हैं और शोकरहित अंतःकरण वाले हैं—वे कौपीनधारी संन्यासी ही वास्तव में परम भाग्यशाली हैं।\n२. जो वृक्ष की जड़ का आश्रय लेते हैं, हाथों की अंजलि में भोजन करते हैं और संपदा को फटी गुदड़ी के समान तुच्छ समझते हैं—वे कौपीनधारी परम धन्य हैं।\n३. जो आत्मानंद में संतुष्ट हैं, जिनकी समस्त इन्द्रियां शांत हैं और जो दिन-रात ब्रह्मसुख में मग्न रहते हैं—वे कौपीनधारी परम भाग्यशाली हैं।\n४. जो देहाभिमान से मुक्त होकर अपने भीतर ही आत्मा का दर्शन करते हैं—वे कौपीनधारी परम धन्य हैं।\n५. जो पवित्र ॐकार का उच्चारण करते हैं, "अहं ब्रह्मास्मि" का ध्यान करते हैं और स्वच्छंद विचरण करते हैं—वे कौपीनधारी संन्यासी परम भाग्यशाली हैं।',
            meaningEn:
              'A celebration of the sublime freedom and supreme happiness of the renunciate who has transcended all material desires and rests permanently in the Self.',
            meaningHi:
              'सांसारिक प्रपंचों और तृष्णाओं का त्याग कर आत्मसुख में लीन वीतरागी संन्यासी की महिमा का वर्णन।',
          },
          {
            id: 'vairagya-shatakam',
            title: 'Vairagya Shatakam',
            titleHi: 'वैराग्य शतकम् (भर्तृहरि विरचितम्)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/vairagya-shatakam.htm',
            sanskrit:
              'भोगे रोगभयं कुले च्युतिभयं वित्ते नृपालाद्भयं\nमाने दैन्यभयं बले रिपुभयं रूपे जराया भयम् ।\nशास्त्रे वादभयं गुणे खलभयं काये कृतान्ताद्भयं\nसर्वं वस्तु भयान्वितं भुवि नृणां वैराग्यमेवाभयम् ॥',
            transliteration:
              'bhoge rogabhayaṃ kule cyutibhayaṃ vitte nṛpālādbhayaṃ .\nmāne dainyabhayaṃ bale ripubhayaṃ rūpe jarāyā bhayam .\nśāstre vādabhayaṃ guṇe khalabhayaṃ kāye kṛtāntādbhayaṃ .\nsarvaṃ vastu bhayānvitaṃ bhuvi nृणां वैराग्यमेवाभयम् ..',
            translationEn:
              'In enjoyment, fear of disease; in high birth, fear of downfall; in wealth, fear of the king; in honour, fear of humiliation; in strength, fear of enemies; in beauty, fear of old age; in learning, fear of rivals; in virtue, fear of the wicked; in the body, fear of death — everything in the world is beset with fear; only dispassion is fearless.',
            translationHi:
              'भोग में रोग का भय, कुल में पतन का भय, धन में राजा का भय, मान में अपमान का भय, बल में शत्रु का भय, रूप में वृद्धावस्था का भय, शास्त्र में विवाद का भय, गुण में दुर्जनों का भय और शरीर में मृत्यु का भय है—इस संसार की प्रत्येक वस्तु भय से भरी है, केवल वैराग्य ही सर्वथा निर्भय और अभय है।',
            meaningEn:
              'In enjoyment, fear of disease; in high birth, fear of downfall; in wealth, fear of the king; in honour, fear of humiliation; in strength, fear of enemies; in beauty, fear of old age; in learning, fear of rivals; in virtue, fear of the wicked; in the body, fear of death — everything in the world is beset with fear; only dispassion is fearless.',
            meaningHi:
              'भोग में रोग का भय, कुल में पतन का भय, धन में राजा का भय, मान में अपमान का भय, बल में शत्रु का भय, रूप में वृद्धावस्था का भय, शास्त्र में विवाद का भय, गुण में दुर्जनों का भय और शरीर में मृत्यु का भय है—इस संसार की प्रत्येक वस्तु भय से भरी है, केवल वैराग्य ही सर्वथा निर्भय और अभय है।',
          },
        ],
      },
      {
        id: 'for-self-knowledge-and-liberation',
        nameEn: 'For the Seeker of Truth',
        nameHi:
          'आत्मज्ञान एवं सत्य की खोज (असतो मा सद्गमय व माण्डूक्य उपनिषद्)',
        headerTitleEn: 'Shlokas for the Seeker of Truth',
        headerTitleHi: 'आत्मज्ञान, सत्य शोधन एवं मोक्ष प्राप्ति श्लोक',
        subtitleEn:
          "Behind every smaller wish is the deepest one of all — to know who we truly are. These are the seeker's mantras and stotras: 'lead me from the unreal to the real, from darkness to light', and Shankara's Nirvana Shatakam, 'I am pure awareness'. Sit quietly with them, and let their meaning turn the mind inward toward the Self.",
        subtitleHi:
          'पावमान मन्त्र (असतो मा सद्गमय), मेधा सूक्तम् (यश्छन्दसामृषभो), एकश्लोकी, माण्डूक्य उपनिषद् तुरीय तत्व एवं निर्वाणषट्कम्।',
        descriptionEn:
          "Behind every smaller wish is the deepest one of all — to know who we truly are. These are the seeker's mantras and stotras: 'lead me from the unreal to the real, from darkness to light', and Shankara's Nirvana Shatakam, 'I am pure awareness'. Sit quietly with them, and let their meaning turn the mind inward toward the Self.",
        descriptionHi:
          'पावमान मन्त्र (असतो मा सद्गमय), मेधा सूक्तम् (यश्छन्दसामृषभो), एकश्लोकी, माण्डूक्य उपनिषद् तुरीय तत्व एवं निर्वाणषट्कम्।',
        deity: 'Vishnu',
        image: imagePath.Vishnu,
        path: '/shloka/prayers/for-the-seeker-of-truth.htm',
        sanskrit:
          'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration:
          'oṃ asato mā sadgamaya\ntamaso mā jyotirgamaya\nmṛtyormā amṛtaṃ gamaya\noṃ śāntiḥ śāntiḥ śāntiḥ',
        meaningHi:
          'हे प्रभु! मुझे असत्य (मिथ्या संसार) से सत्य (परम सत्य) की ओर ले चलो। मुझे अज्ञान के अंधकार से ज्ञान के दिव्य प्रकाश की ओर ले चलो। मुझे मृत्यु और नश्वरता से अमरत्व (मोक्ष) की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।',
        meaningEn:
          'Om, Lead me from the unreal to the real, Lead me from darkness to light, Lead me from death to immortality. Om, may peace be, may peace be, may peace be.',
        verses: [
          {
            id: 'asato-ma-sadgamaya',
            title: 'Asato Ma Sadgamaya',
            titleHi: 'असतो मा सद्गमय (पावमान मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/asathoma-sadhgamaya.htm',
            sanskrit:
              'ॐ असतो मा सद्गमय ।\nतमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              'oṃ asato mā sadgamaya\ntamaso mā jyotirgamaya\nmṛtyormā amṛtaṃ gamaya\noṃ śāntiḥ śāntiḥ śāntiḥ',
            translationEn:
              'Om, Lead me from the unreal to the real, Lead me from darkness to light, Lead me from death to immortality. Om, peace, peace, peace.',
            translationHi:
              'हे प्रभु! मुझे असत्य (नश्वरता) से सत्य (परम सत्य) की ओर ले चलो, अज्ञान के अंधकार से आत्मज्ञान के दिव्य प्रकाश की ओर ले चलो, मृत्यु से अमरत्व (मोक्ष) की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Om, Lead me from the unreal to the real, Lead me from darkness to light, Lead me from death to immortality. Om, peace, peace, peace.',
            meaningHi:
              'हे प्रभु! मुझे असत्य (नश्वरता) से सत्य (परम सत्य) की ओर ले चलो, अज्ञान के अंधकार से आत्मज्ञान के दिव्य प्रकाश की ओर ले चलो, मृत्यु से अमरत्व (मोक्ष) की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'apyayantu-mamangani-seeker',
            title: 'Apyayantu Mamangani',
            titleHi: 'आप्यायन्तु ममाङ्गानि (केनोपनिषद् शान्ति मन्त्र)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/apyayantu-mamangani.htm',
            sanskrit:
              'ॐ आप्यायन्तु ममाङ्गानि वाक्प्राणश्चक्षुःश्रोत्रमथो बलमिन्द्रियाणि च सर्वाणि ।\nसर्वं ब्रह्मौपनिषदं माऽहं ब्रह्म निराकुर्यां मा मा ब्रह्म निराकरोदनिराकरणमस्त्वनिराकरणं मेऽस्तु ।\nतदात्मनि निरते य उपनिषत्सु धर्मास्ते मयि सन्तु ते मयि सन्तु ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              "oṃ āpyāyantu mamāṅgāni vākprāṇaścakṣuḥśrotramatho balamindriyāṇi ca sarvāṇi .\nsarvaṃ brahmaupaniṣadaṃ mā'haṃ brahma nirākuryāṃ mā mā brahmanirākarodanirāकरणमस्त्वनिराकरणं मेऽस्तु .\ntadātmani nirate ya upaniṣatsu dharmāste mayi santu te mayi santu .\noṃ śāntiḥ śāntiḥ śāntiḥ",
            translationEn:
              'Oṃ! May my organs and limbs, speech, breath, sight, hearing, and all senses be well nourished. Everything is Brahman. May I never deny Brahman, nor Brahman deny me. May the virtues in the Upanishads dwell in me. Oṃ, peace, peace, peace.',
            translationHi:
              'मेरे समस्त अंग, वाणी, प्राण, नेत्र, कान और इन्द्रियां पुष्ट हों। उपनिषदों का संपूर्ण तत्व ब्रह्म ही है। मैं ब्रह्म का त्याग न करूँ, ब्रह्म मुझे न त्यागे। उपनिषदों के समस्त दिव्य गुण मुझमें समाहित हों। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Oṃ! May my organs and limbs, speech, breath, sight, hearing, and all senses be well nourished. Everything is Brahman. May I never deny Brahman, nor Brahman deny me. May the virtues in the Upanishads dwell in me. Oṃ, peace, peace, peace.',
            meaningHi:
              'मेरे समस्त अंग, वाणी, प्राण, नेत्र, कान और इन्द्रियां पुष्ट हों। उपनिषदों का संपूर्ण तत्व ब्रह्म ही है। मैं ब्रह्म का त्याग न करूँ, ब्रह्म मुझे न त्यागे। उपनिषदों के समस्त दिव्य गुण मुझमें समाहित हों। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'yaschandasam-rishabho',
            title: 'Yaschandasam Rishabho',
            titleHi: 'यश्छन्दसामृषभो (तैत्तिरीयोपनिषद् मेधा मन्त्र)',
            deity: 'Surya',
            image: imagePath.Surya,
            link: 'https://shlokam.org/shloka/yaschandasam-rishabho.htm',
            sanskrit:
              'ॐ यश्छन्द॑सामृष॒भो वि॒श्वरू॑पः । छन्दो॒भ्योऽध्य॒मृता᳚त्सम्ब॒भूव॑ ॥\nस मेन्द्रो॑ मे॒धया᳚ स्पृणोतु । अ॒मृत॑स्य देव॒ धार॑णो भूयासम् ॥\nशरी॑रं मे॒ विच॑र्षणम् । जिह्॒वा मे॒ मधु॑मत्तमा ॥\nकर्णा᳚भ्यां॒ भूरि॒विश्रु॑वम् । ब्रह्म॑णः को॒शो॑ऽसि मे॒धया पि॑हितः । श्रु॒तं मे॑ गोपाय ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration:
              "oṃ yaśchanda̍sāmṛṣa̱bho vi̱śvarū̍paḥ | chando̱bhyo'dhya̱mṛtā̎tsamba̱bhūva̍ ||\nsa mendro̍ me̱dhayā̎ spṛṇotu | a̱mṛta̍sya deva̱ dhāra̍ṇo भूयासम् ||\nśarī̍raṃ me̱ vica̍rṣaṇam | jiẖvā me̱ madhu̍mattamā ||\nkarṇā̎bhyā̱ṃ bhūri̱viśru̍vam | brahma̍ṇaḥ ko̱śo̍'si me̱dhayā pi̍hitaḥ | śru̱taṃ me̍ gopāya ||\noṃ śāntiḥ śāntiḥ śāntiḥ",
            translationEn:
              'Om, may that Supreme Lord, who is the essence of the Vedas and who manifests in universal form, who has emerged from the nectar of immortality, bestow upon me wisdom and intellect. May I become a bearer of divine knowledge and immortality. May my body be vigorous, my speech sweet, and my ears receptive to abundant wisdom. You, O Lord, are the treasure of Brahman and the protector of wisdom. Preserve my knowledge and what I have heard. Om, may there be peace.',
            translationHi:
              'वेदों के सारभूत, विश्वरूप और अमृत से प्रादुर्भूत ओंकार स्वरूप परमात्मा मुझे उत्तम मेधा शक्ति (बुद्धि) से संपन्न करें। मैं अमृतत्व (दिव्य ज्ञान) को धारण करने वाला बनूँ। मेरा शरीर स्वस्थ व सक्रिय रहे, जिह्वा मधुरभाषिणी हो, कान प्रचुर ज्ञान श्रवण करें। हे ओंकार! आप ब्रह्म का खजाना हैं, मेरी विद्या की रक्षा करें। ॐ शान्ति, शान्ति, शान्ति।',
            meaningEn:
              'Om, may that Supreme Lord, who is the essence of the Vedas and who manifests in universal form, who has emerged from the nectar of immortality, bestow upon me wisdom and intellect. May I become a bearer of divine knowledge and immortality. May my body be vigorous, my speech sweet, and my ears receptive to abundant wisdom. You, O Lord, are the treasure of Brahman and the protector of wisdom. Preserve my knowledge and what I have heard. Om, may there be peace.',
            meaningHi:
              'वेदों के सारभूत, विश्वरूप और अमृत से प्रादुर्भूत ओंकार स्वरूप परमात्मा मुझे उत्तम मेधा शक्ति (बुद्धि) से संपन्न करें। मैं अमृतत्व (दिव्य ज्ञान) को धारण करने वाला बनूँ। मेरा शरीर स्वस्थ व सक्रिय रहे, जिह्वा मधुरभाषिणी हो, कान प्रचुर ज्ञान श्रवण करें। हे ओंकार! आप ब्रह्म का खजाना हैं, मेरी विद्या की रक्षा करें। ॐ शान्ति, शान्ति, शान्ति।',
          },
          {
            id: 'eka-shloki',
            title: 'Eka Shloki',
            titleHi: 'एकश्लोकी (आदिशंकराचार्य विरचित आत्मज्ञान संवाद)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/ekashloki.htm',
            sanskrit:
              'किं ज्योतिस्तवभानुमानहनि मे रात्रौ प्रदीपादिकं\nस्यादेवं रविदीपदर्शनविधौ किं ज्योतिराख्याहि मे ।\nचक्षुस्तस्य निमीलनादिसमये किं धीर्धियो दर्शने\nकिं तत्राहमतो भवान्परमकं ज्योतिस्तदस्मि प्रभो ॥',
            transliteration:
              'kiṃ jyotistavabhānumānahani me rātrau pradīpādikaṃ\nsyādevaṃ ravidīpadarśanavidhau kiṃ jyotirākhyāhi me .\ncakṣustasya nimīlanādisamaye kiṃ dhīrdhiyo darśane\nkiṃ tatrāhamato bhavānparamakaṃ jyotistadasmi prabho ..',
            translationEn:
              'Guru: What provides you with light? Sishya: By day, the sun, by night, a lamp. Guru: What is the light that sees these lights? Sishya: The eye. Guru: What is the light that illumines the eye? Sishya: The intellect. Guru: What is it that knows the intellect? Sishya: It is the "I". Guru: Therefore, you are the light of lights. Sishya: Truly, I am That.',
            translationHi:
              "गुरु: तुम्हें प्रकाश किससे मिलता है? शिष्य: दिन में सूर्य से, रात में दीपक से। गुरु: इन सूर्य-दीपकों को देखने वाला प्रकाश कौन है? शिष्य: नेत्र। गुरु: नेत्र बन्द होने पर कौन प्रकाशित करता है? शिष्य: बुद्धि। गुरु: बुद्धि को जानने वाला कौन है? शिष्य: वह 'मैं' (आत्मा) हूँ। गुरु: अतः तुम ही परम प्रकाश स्वरूप हो! शिष्य: हे प्रभो! निश्चय ही 'वह परम प्रकाश मैं ही हूँ'।",
            meaningEn:
              'Guru: What provides you with light? Sishya: By day, the sun, by night, a lamp. Guru: What is the light that sees these lights? Sishya: The eye. Guru: What is the light that illumines the eye? Sishya: The intellect. Guru: What is it that knows the intellect? Sishya: It is the "I". Guru: Therefore, you are the light of lights. Sishya: Truly, I am That.',
            meaningHi:
              "गुरु: तुम्हें प्रकाश किससे मिलता है? शिष्य: दिन में सूर्य से, रात में दीपक से। गुरु: इन सूर्य-दीपकों को देखने वाला प्रकाश कौन है? शिष्य: नेत्र। गुरु: नेत्र बन्द होने पर कौन प्रकाशित करता है? शिष्य: बुद्धि। गुरु: बुद्धि को जानने वाला कौन है? शिष्य: वह 'मैं' (आत्मा) हूँ। गुरु: अतः तुम ही परम प्रकाश स्वरूप हो! शिष्य: हे प्रभो! निश्चय ही 'वह परम प्रकाश मैं ही हूँ'।",
          },
          {
            id: 'nantahprajnam-mandukya',
            title: 'Nāntaḥprajñaṃ (Mandukya Upanishad)',
            titleHi:
              'नान्तःप्रज्ञं न बहिःप्रज्ञं (तुरीय आत्म स्वरूप - माण्डूक्योपनिषद् ७)',
            deity: 'Vishnu',
            image: imagePath.Vishnu,
            link: 'https://shlokam.org/shloka/mandukya-upanishad.htm',
            sanskrit:
              'नान्तःप्रज्ञं न बहिःप्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् ।\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणं अचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥ ७ ॥',
            transliteration:
              'nāntaḥprajñaṃ na bahiḥprajñaṃ nobhayataḥprajñaṃ na prajñānaghanaṃ na prajñaṃ nāprajñam |\nadṛṣṭamavyavahāryamagrāhyamalakṣaṇaṃ acintyamavyapadeśyamekātmapratyayasāraṃ prapañcopaśamaṃ śāntaṃ śivamadvaitaṃ caturthaṃ manyante sa ātmā sa vijñeyaḥ || 7 ||',
            translationEn:
              '7. Turīya is not that which is conscious of the internal world, nor conscious of the external world, nor conscious of both, nor simple consciousness, nor insentient. Unseen, beyond worldly transaction, incomprehensible, uninferable, unthinkable, indescribable, essentially of the nature of Consciousness constituting the Self alone, cessation of all phenomena, Peaceful, all Bliss and Non-dual. This is known as the fourth (Turīya). This is the Ātman and it has to be realised.',
            translationHi:
              'जो न अंतःप्रज्ञ (स्वप्न) है, न बहिःप्रज्ञ (जाग्रत) है, न दोनों की संधि है, न प्रज्ञानघन (सुषुप्ति) है, न जानने वाला है और न अज्ञानी। जो अदृश्य, अव्यवहार्य, अग्राह्य, अलक्षण, अचिन्त्य, अवर्णनीय, केवल एकात्म-प्रत्यय का सार, प्रपंच से रहित, परम शांत, शिव (कल्याणकारी) और अद्वैत है—वही चतुर्थ अवस्था (तुरीय) आत्मा है, और वही जानने योग्य है।',
            meaningEn:
              '7. Turīya is not that which is conscious of the internal world, nor conscious of the external world, nor conscious of both, nor simple consciousness, nor insentient. Unseen, beyond worldly transaction, incomprehensible, uninferable, unthinkable, indescribable, essentially of the nature of Consciousness constituting the Self alone, cessation of all phenomena, Peaceful, all Bliss and Non-dual. This is known as the fourth (Turīya). This is the Ātman and it has to be realised.',
            meaningHi:
              'जो न अंतःप्रज्ञ (स्वप्न) है, न बहिःप्रज्ञ (जाग्रत) है, न दोनों की संधि है, न प्रज्ञानघन (सुषुप्ति) है, न जानने वाला है और न अज्ञानी। जो अदृश्य, अव्यवहार्य, अग्राह्य, अलक्षण, अचिन्त्य, अवर्णनीय, केवल एकात्म-प्रत्यय का सार, प्रपंच से रहित, परम शांत, शिव (कल्याणकारी) और अद्वैत है—वही चतुर्थ अवस्था (तुरीय) आत्मा है, और वही जानने योग्य है।',
          },
          {
            id: 'nirvana-shatakam-seeker',
            title: 'Nirvana Shatakam',
            titleHi: 'श्री निर्वाणषट्कम् (चिदानन्दरूपः शिवोऽहम्)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/nirvana-shatakam.htm',
            sanskrit:
              'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे ।\nन च व्योम भूमिर्न तेजो न वायुः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥१॥\n\nन च प्राणसंज्ञो न वै पञ्चवायुः न वा सप्तधातुः न वा पञ्चकोशः ।\nन वाक्पाणिपादं न चोपस्थपायु चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥२॥\n\nन मे द्वेषरागौ न मे लोभमोहौ मदो नैव मे नैव मात्सर्यभावः ।\nन धर्मो न चार्थो न कामो न मोक्षः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥३॥\n\nन पुण्यं न पापं न सौख्यं न दुःखं न मन्त्रो न तीर्थं न वेदा न यज्ञाः ।\nअहं भोजनं नैव भोज्यं न भोक्ता चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥४॥\n\nन मृत्युर्न शङ्का न मे जातिभेदः पिता नैव मे नैव माता न जन्मः ।\nन बन्धुर्न मित्रं गुरुर्नैव शिष्यं चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥५॥\n\nअहं निर्विकल्पो निराकाररूपो विभुत्वाच्च सर्वत्र सर्वेन्द्रियाणाम् ।\nन चासङ्गतं नैव मुक्तिर्न मेयः चिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥६॥',
            transliteration:
              "manobuddhyahaṅkāra cittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre .\nna ca vyoma bhūmirna tejo na vāyuḥ cidānandarūpaḥ śivo'ham śivo'ham ||1||\n\nna ca prāṇasaṃjño na vai pañcavāyuḥ na vā saptadhātuḥ na vā पञ्चकोशः .\nna vākpāṇipādaṃ na copasthapāyu cidānandarūpaḥ śivo'ham śivo'ham ||2||\n\nna me dveṣarāgau na me lobhamohau mado naiva me naiva mātsaryabhāvaḥ .\nna dharmo na cārtho na kāmo na mokṣaḥ cidānandarūpaḥ śivo'ham śivo'ham ||3||\n\nna puṇyaṃ na pāpaṃ na saukhyaṃ na duḥkhaṃ na mantro na tīrthaṃ na vedā na yajñāḥ .\nahaṃ bhojanaṃ naiva bhojyaṃ na bhoktā cidānandarūpaḥ śivo'ham śivo'ham ||4||\n\nna mṛtyurna śaṅkā na me jātibhedaḥ pitā naiva me naiva mātā na janmaḥ .\nna bandhurna mitraṃ gururnaiva śiṣyaṃ cidānandarūpaḥ śivo'ham śivo'ham ||5||\n\nahaṃ nirvikalpo nirākārarūpo vibhutvācca sarvatra sarvendriyāṇām .\nna cāsaṅgataṃ naiva muktirna meyaḥ cidānandarūpaḥ śivo'ham śivo'ham ||6||",
            translationEn:
              'I am not the mind, intellect, ego, or memory; neither ears, tongue, nose, nor eyes. I am neither ether, earth, fire, nor air. I am beyond vital breaths, bodily constituents, and sheaths. I am free from attachment, greed, delusion, pride, righteousness, wealth, desire, and liberation. I am neither virtue nor vice, pleasure nor pain. I am beyond fear, caste, parents, and guru. I am formless, changeless, and all-pervading — the nature of consciousness and bliss. I am Shiva, I am Shiva.',
            translationHi:
              'मैं न मन, बुद्धि, अहंकार या चित्त हूँ; न कान, जीभ, नाक, आँख। न आकाश, पृथ्वी, अग्नि, वायु। न प्राण, न धातु, न पंचकोश। न राग-द्वेष, न लोभ-मोह, न मद-मत्सर। न धर्म-अर्थ-काम-मोक्ष, न पुण्य-पाप, न सुख-दुःख। न मृत्यु, न भय, न माता-पिता, न गुरु-शिष्य। मैं निर्विकल्प, निराकार, सर्वव्यापी सच्चिदानंद स्वरूप हूँ। मैं शिव हूँ, मैं शिव हूँ।',
            meaningEn:
              'I am not the mind, intellect, ego, or storehouse of memory; I am of the nature of consciousness and bliss. I am Shiva, I am Shiva.',
            meaningHi:
              'मैं समस्त भौतिक उपाधियों व मनोविकारों से परे, नित्य शुद्ध, बुद्ध, मुक्त एवं सच्चिदानंद स्वरूप शिव हूँ।',
          },
        ],
      },
      {
        id: 'at-the-time-of-death',
        nameEn: 'At the Time of Death',
        nameHi: 'देह त्याग एवं मोक्ष प्रार्थना (अनायासेन मरणं व मुकुन्दमाला)',
        headerTitleEn: 'Shlokas for the Time of Death',
        headerTitleHi: 'अंतिम समय, सुलभ देहत्याग एवं शिव-सायुज्य मन्त्र',
        subtitleEn:
          'Death is the one certainty, and our tradition meets it not with fear but with the name of God. These verses and mantras — the name of Rama, the death-conquering Mrityunjaya, and the prayer for a peaceful, painless passing — are chanted at the bedside of the dying. Say them gently, keeping the mind on the Lord.',
        subtitleHi:
          'जीवन के अंतिम क्षणों में भय-मुक्ति, अनायास कष्टहीन देहत्याग, महामृत्युंजय मन्त्र, राम-नाम एवं श्री मुकुन्दमाला स्तोत्र।',
        descriptionEn:
          'Death is the one certainty, and our tradition meets it not with fear but with the name of God. These verses and mantras — the name of Rama, the death-conquering Mrityunjaya, and the prayer for a peaceful, painless passing — are chanted at the bedside of the dying. Say them gently, keeping the mind on the Lord.',
        descriptionHi:
          'जीवन के अंतिम क्षणों में भय-मुक्ति, अनायास कष्टहीन देहत्याग, महामृत्युंजय मन्त्र, राम-नाम एवं श्री मुकुन्दमाला स्तोत्र।',
        deity: 'Shiva',
        image: imagePath.Bholenath,
        path: '/shloka/prayers/at-the-time-of-death.htm',
        sanskrit:
          'अनायासेन मरणं विनादैन्येन जीवनम् ।\nदेहान्ते तव सायुज्यं (सान्निध्यं) देहि मे परमेश्वर ॥',
        transliteration:
          'anāyāsena maraṇaṃ vinādainyena jīvanam .\ndehānte tava sāyujyaṃ (sānnidhyam) dehi me parameśvara ..',
        meaningHi:
          'हे महादेव! मुझे बिना किसी कष्ट व व्याधि के अनायास मृत्यु (सुलभ देहत्याग) दें, बिना किसी पराधीनता के जीवन दें, और जीवन के अंत में अपने चरणों में परम सायुज्य व सान्निध्य (मोक्ष) प्रदान करें।',
        meaningEn:
          'O Lord Shiva! Grant me a painless, peaceful passing, a life free from dependency or humiliation, and at the end of life, eternal union and presence with You.',
        verses: [
          {
            id: 'sri-rama-rama-rameti-death',
            title: 'Sri Rama Rama Rameti',
            titleHi: 'श्री राम राम रामेति (तारक राम मन्त्र)',
            deity: 'Rama',
            image: imagePath.Rama,
            link: 'https://shlokam.org/shloka/sri-rama-rama-ramethi.htm',
            sanskrit:
              'श्री राम राम रामेति रमे रामे मनोरमे ।\nसहस्रनाम तत् तुल्यं रामनाम वरानने ॥',
            transliteration:
              'śrī rāma rāma rāmeti rame rāme manorame\nsahasranāma tat tulyaṃ rāmanāma varānane',
            translationEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            translationHi:
              "हे सुमुखि! 'श्री राम, राम, राम' इस प्रकार मनोहर राम-नाम में मेरा मन नित्य रमण करता है। राम-नाम विष्णुसहस्रनाम के तुल्य परम पावन और मोक्षदायक है।",
            meaningEn:
              "Chanting 'Sri Rama, Rama, Rama,' captivates the mind, filling it with delight and devotion. O beautiful-faced one, the single name 'Rama' is equivalent to the thousand names (sahasranāma) of Lord Vishnu.",
            meaningHi:
              "हे सुमुखि! 'श्री राम, राम, राम' इस प्रकार मनोहर राम-नाम में मेरा मन नित्य रमण करता है। राम-नाम विष्णुसहस्रनाम के तुल्य परम पावन और मोक्षदायक है।",
          },
          {
            id: 'om-tryambakam-death',
            title: 'Om Tryambakam Yajamahe',
            titleHi: 'महामृत्युञ्जय मन्त्र (त्र्यम्बकं यजामहे)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/tryambakam-yajamahe.htm',
            sanskrit:
              'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
            transliteration:
              "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
            translationEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            translationHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित और समस्त जीवों का पोषण करने वाले हैं। जिस प्रकार पका हुआ खरबूजा बेल के बंधन से अनायास मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय व संसार के बंधनों से मुक्त होकर अमरत्व को प्राप्त हों।',
            meaningEn:
              'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death, bestowing us with the nectar of immortality.',
            meaningHi:
              'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित और समस्त जीवों का पोषण करने वाले हैं। जिस प्रकार पका हुआ खरबूजा बेल के बंधन से अनायास मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय व संसार के बंधनों से मुक्त होकर अमरत्व को प्राप्त हों।',
          },
          {
            id: 'anayasena-maranam',
            title: 'Anayasena Maranam',
            titleHi: 'अनायासेन मरणं (सुलभ देहत्याग एवं सायुज्य प्रार्थना)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/anayasena-maranam.htm',
            sanskrit:
              'अनायासेन मरणं विनादैन्येन जीवनं ।\nदेहि मे कृपया शम्भो त्वयि भक्तिं अचन्चलं ॥\n(अथवा)\nअनायासेन मरणं विनादैन्येन जीवनं ।\nदेहान्ते तव सान्निध्यम् देही मे परमेश्वरम ॥',
            transliteration:
              'anāyāsena maraṇaṃ vinādainyena jīvanaṃ .\ndehi me kṛpayā śambho tvayi bhaktiṃ acancalaṃ ..\n(or)\nanāyāsena maraṇaṃ vinādainyena jīvanaṃ .\ndehānte tava sānnidhyam dehī me parameśvarama ..',
            translationEn:
              'O Lord Shiva, please grant me a peaceful death without pain (Anasayena Maranam), a life without any trouble or dependence on others for my basic needs (Vina Dhainyena Jeevanam) and a life filled with unwavering, constant bhakti (tvayi bhaktiṃ acancalaṃ) to You dear Lord. (Or) Grant me an easy passing, a dignified life, and when my soul leaves this body, let me attain Your presence.',
            translationHi:
              'हे महादेव शम्भो! मुझे बिना किसी पीड़ा व कष्ट के अनायास मृत्यु मिले, बिना किसी पराधीनता के स्वाभिमानी जीवन मिले, और आपके चरणों में अडिग भक्ति व देहांत के समय आपकी परम सन्निधि (मोक्ष) प्राप्त हो।',
            meaningEn:
              'O Lord Shiva, please grant me a peaceful death without pain (Anasayena Maranam), a life without any trouble or dependence on others for my basic needs (Vina Dhainyena Jeevanam) and a life filled with unwavering, constant bhakti (tvayi bhaktiṃ acancalaṃ) to you dear Lord.',
            meaningHi:
              'हे महादेव शम्भो! मुझे बिना किसी पीड़ा व कष्ट के अनायास मृत्यु मिले, बिना किसी पराधीनता के स्वाभिमानी जीवन मिले, और आपके चरणों में अडिग भक्ति व देहांत के समय आपकी परम सन्निधि (मोक्ष) प्राप्त हो।',
          },
          {
            id: 'karacharana-kritham-death',
            title: 'Karacharana Kritham',
            titleHi: 'करचरण कृतं (शिव क्षमापन एवं मुक्ति स्तोत्र)',
            deity: 'Shiva',
            image: imagePath.Bholenath,
            link: 'https://shlokam.org/shloka/karacharana-kritham.htm',
            sanskrit:
              'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधं ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
            transliteration:
              'karacaraṇa kṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādhaṃ\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
            translationEn:
              'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
            translationHi:
              'हे करुणासागर श्री महादेव शम्भो! मेरे हाथ, पैर, वाणी, शरीर, कर्म, कर्ण, नेत्र अथवा मन द्वारा किए गए समस्त ज्ञात-अज्ञात पापों को क्षमा कीजिए। हे प्रभु, आपकी जय हो!',
            meaningEn:
              'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all these transgressions - those committed by hands and feet, those arising from speech and body, those born of actions, those originating from hearing and sight, and those of the mind - whether they occurred in performing prescribed duties or prohibited actions. Victory, victory to You!',
            meaningHi:
              'हे करुणासागर श्री महादेव शम्भो! मेरे हाथ, पैर, वाणी, शरीर, कर्म, कर्ण, नेत्र अथवा मन द्वारा किए गए समस्त ज्ञात-अज्ञात पापों को क्षमा कीजिए। हे प्रभु, आपकी जय हो!',
          },
          {
            id: 'mukunda-mala-stotram',
            title: 'Mukunda Mala Stotram',
            titleHi: 'कृष्ण त्वदीय पदपङ्कज (मुकुन्दमाला स्तोत्रम् श्लोक ७)',
            deity: 'Krishna',
            image: imagePath.Krishna,
            link: 'https://shlokam.org/shloka/mukunda-mala-stotram.htm',
            sanskrit:
              'कृष्ण त्वदीय पदपङ्कजपञ्जरान्तम्\nअद्यैव मे विशतु मानसराजहंसः ।\nप्राणप्रयाणसमये कफवातपित्तैः\nकण्ठावरोधनविधौ स्मरणं कुतस्ते ॥ ७॥',
            transliteration:
              'kṛṣṇa tvadīya padapaṅkajapañjarāntamadyaiva me viśatu mānasarājahaṃsaḥ .\nprāṇaprayāṇasamaye kaphavātapittaiḥkaṇṭhāvarodhanavidhau smaraṇaṃ kutaste ..7..',
            translationEn:
              'O Krishna, may the royal swan of my mind enter this very moment into the cage that is your lotus feet. For at the hour of departing life, when phlegm, wind and bile choke the throat, how could there be any remembrance of you?',
            translationHi:
              'हे श्रीकृष्ण! मेरा यह मनरूपी राजहंस आज ही आपके चरण-कमलरूपी पिंजरे में प्रविष्ट हो जाए। क्योंकि प्राण प्रयाण (मृत्यु) के समय जब कफ, वात और पित्त से गला रुंध जाएगा, तब आपका स्मरण कैसे हो सकेगा?',
            meaningEn:
              'O Krishna, may the royal swan of my mind enter this very moment into the cage that is your lotus feet. For at the hour of departing life, when phlegm, wind and bile choke the throat, how could there be any remembrance of you?',
            meaningHi:
              'हे श्रीकृष्ण! मेरा यह मनरूपी राजहंस आज ही आपके चरण-कमलरूपी पिंजरे में प्रविष्ट हो जाए। क्योंकि प्राण प्रयाण (मृत्यु) के समय जब कफ, वात और पित्त से गला रुंध जाएगा, तब आपका स्मरण कैसे हो सकेगा?',
          },
        ],
      },
    ],
  },
};

/**
 * Storage cache key prefix for category details
 */
const CACHE_KEY_PREFIX = '@shloka_category_';

/**
 * Fetches category detail (subcategories + verses) by slug or id from Firestore with instant local cache fallback.
 */
export const getShlokaCategoryDetail = async (
  slugOrId: string,
): Promise<ShlokaCategoryDetail> => {
  const cleanSlug = (slugOrId || '')
    .toLowerCase()
    .replace('occasion-', '')
    .trim();

  const cacheKey = `${CACHE_KEY_PREFIX}${cleanSlug}`;

  // 1. Check local cache
  try {
    const cached = Storage.getString(cacheKey, '');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.items && parsed.items.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[ShlokaService] Cache read error:', err);
  }

  // 2. Try fetching from Firestore collection 'shloka_categories'
  try {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'shloka_categories', cleanSlug);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as ShlokaCategoryDetail;
      if (data && data.items) {
        // Save to cache
        Storage.set(cacheKey, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn(
      '[ShlokaService] Firestore fetch error, using static fallback:',
      err,
    );
  }

  // 3. Fallback to static bundled data
  const staticData =
    STATIC_SHLOKA_CATEGORIES_DATA[cleanSlug] ||
    STATIC_SHLOKA_CATEGORIES_DATA['through-the-day'];

  return staticData;
};
