#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 *  GuruVani — Production Firestore Seed Script
 *  Project: test-9656d
 * ═══════════════════════════════════════════════════════════════════
 *
 *  SETUP (one-time):
 *    cd firestore-seed
 *    npm install
 *    # Place serviceAccountKey.json here (from Firebase Console)
 *    # → Project Settings → Service Accounts → Generate New Private Key
 *
 *  USAGE:
 *    npm run seed                              → upload all categories
 *    npm run seed:dry                          → preview, no writes
 *    node index.js --category through-the-day → single category
 *    node index.js --reset                     → wipe + re-seed all
 *
 * ═══════════════════════════════════════════════════════════════════
 *
 *  FIRESTORE SCHEMA (production-grade, multilingual, scalable)
 *  ────────────────────────────────────────────────────────────────
 *
 *  shloka_categories/{categorySlug}
 *  ├─ id          : string  (e.g. "through-the-day")
 *  ├─ slug        : string
 *  ├─ order       : number  (display order)
 *  ├─ isActive    : boolean
 *  ├─ titleEn     : string  ← kept for backward compatibility with app
 *  ├─ titleHi     : string
 *  ├─ descriptionEn : string
 *  ├─ descriptionHi : string
 *  ├─ imageUrl    : string | null
 *  ├─ path        : string
 *  ├─ updatedAt   : Timestamp
 *  └─ items[]     : array of sub-categories (embedded for fast single-read)
 *      ├─ id              : string
 *      ├─ nameEn          : string
 *      ├─ nameHi          : string
 *      ├─ headerTitleEn   : string
 *      ├─ headerTitleHi   : string
 *      ├─ subtitleEn      : string
 *      ├─ subtitleHi      : string
 *      ├─ descriptionEn   : string
 *      ├─ descriptionHi   : string
 *      ├─ sanskrit        : string  (featured verse)
 *      ├─ transliteration : string
 *      ├─ meaningEn       : string
 *      ├─ meaningHi       : string
 *      ├─ deity           : string
 *      ├─ imageUrl        : string | null
 *      ├─ path            : string
 *      ├─ verseCount      : number
 *      └─ verses[]        : array of ShlokaVerse objects
 *          ├─ id              : string
 *          ├─ title           : string  (En title)
 *          ├─ titleHi         : string
 *          ├─ sanskrit        : string
 *          ├─ transliteration : string
 *          ├─ translationEn   : string
 *          ├─ translationHi   : string
 *          ├─ meaningEn       : string
 *          ├─ meaningHi       : string
 *          ├─ deity           : string
 *          └─ link            : string
 *
 *  shloka_verses/{verseId}           ← FLAT collection for flexible querying
 *  ├─ id, categorySlug, subCategoryId
 *  ├─ title, titleHi, sanskrit, transliteration
 *  ├─ translationEn, translationHi
 *  ├─ meaningEn, meaningHi
 *  ├─ deity, link, order
 *  ├─ tags[]          : for filtering by deity/category
 *  └─ updatedAt       : Timestamp
 *
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// ─── CLI Args ────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const RESET = process.argv.includes('--reset');
const CATEGORY_FILTER = (() => {
  const idx = process.argv.indexOf('--category');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ─── Firestore Collection Names ──────────────────────────────────────────────
const COL = {
  CATEGORIES: 'shloka_categories',
  VERSES: 'shloka_verses',
};

// ─── Init Firebase Admin ─────────────────────────────────────────────────────
const KEY_PATH = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(KEY_PATH)) {
  console.error(`
╔════════════════════════════════════════════════╗
║  ❌  serviceAccountKey.json NOT FOUND           ║
╠════════════════════════════════════════════════╣
║  Steps:                                        ║
║  1. Open Firebase Console                      ║
║  2. Project Settings → Service Accounts        ║
║  3. Click "Generate new private key"           ║
║  4. Save file as:                              ║
║     GuruVani/firestore-seed/serviceAccountKey  ║
║     .json                                      ║
╚════════════════════════════════════════════════╝
`);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(KEY_PATH)),
  projectId: 'test-9656d',
});

const db = admin.firestore();

// ─── COMPLETE SHLOKA DATA ────────────────────────────────────────────────────
// Extracted from src/services/firebaseServices/shlokaService.ts
// image fields removed (not serializable to Firestore)

const SHLOKA_DATA = [
  // ── 1. THROUGH THE DAY ───────────────────────────────────────────────────
  {
    id: 'occasion-through-the-day',
    slug: 'through-the-day',
    order: 1,
    isActive: true,
    titleEn: 'Through the Day',
    titleHi: 'दिनचर्या',
    descriptionEn: 'The daily rhythm of devotion, from waking to sleep — rising, bathing, eating, lighting the evening lamp, and rest.',
    descriptionHi: 'दैनिक जीवन की प्रार्थनाएं — प्रातः जागरण, स्नान, भोजन, दीप प्रज्वलन एवं शयन तक।',
    imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
    path: '/shloka/prayers/through-the-day.htm',
    items: [
      {
        id: 'on-waking',
        nameEn: 'On Waking Up',
        nameHi: 'प्रातः कर-दर्शन (हस्त दर्शन)',
        headerTitleEn: 'Shlokas for Waking Up',
        headerTitleHi: 'प्रातः जागरण श्लोक',
        subtitleEn: 'Greeting the morning — gazing at the palms, waking the Lord, remembering Ganesha and the gods',
        subtitleHi: 'प्रातः काल कर-दर्शन, प्रभु जागरण एवं नवप्रभात प्रार्थना',
        descriptionEn: 'The very first moment of waking is a chance to begin the day with God rather than with our worries. These verses greet the morning — gazing at the palms of the hands, waking the Lord, remembering Ganesha and the gods. Chant these prayers quietly before you rise, so the day starts in gratitude.',
        descriptionHi: 'प्रातः जागरण का प्रथम क्षण चिंताओं के स्थान पर प्रभु स्मरण से दिन की शुरुआत करने का पावन अवसर है। शय्या त्यागने से पूर्व हथेलियों के दर्शन, प्रभु जागरण व नवप्रभात के इन श्लोकों का स्मरण कर दिन का शुभारंभ कृतज्ञता से करें।',
        deity: 'Laxmi',
        imageUrl: null,
        path: '/shloka/prayers/on-waking.htm',
        sanskrit: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
        transliteration: null,
        meaningEn: 'At the tip of the fingers resides Goddess Lakshmi; in the middle resides Goddess Saraswati; and at the base of the palm resides Lord Govinda. Therefore, one should behold one\'s palms upon waking in the morning.',
        meaningHi: 'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य भाग में माँ सरस्वती और मूल भाग (कलाई के निकट) में भगवान श्री गोविन्द (विष्णु) का वास है। अतः प्रातःकाल उठते ही अपनी हथेलियों का दर्शन करना चाहिए।',
        verses: [
          {
            id: 'karaagre-vasathe',
            title: 'Karaagre Vasathe',
            titleHi: 'कराग्रे वसते लक्ष्मीः (करदर्शनम्)',
            sanskrit: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वति ।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम् ॥',
            transliteration: 'karāgre vasate lakṣmiḥ karamadhye sarasvati\nkaramūle tu govindaḥ prabhāte karadarśanam',
            translationEn: "On the tip of the hands resides Lakṣmī (the Goddess of Wealth), in the middle of the hands resides Sarasvatī (the Goddess of Knowledge), and at the base of the hands resides Govinda (Lord Vishnu). Therefore, one should look at one's hands in the morning.",
            translationHi: 'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य भाग में माँ सरस्वती और मूल भाग में भगवान श्री गोविन्द का वास है। अतः प्रातःकाल उठते ही दोनों हथेलियों का दर्शन करना चाहिए।',
            meaningEn: "At the tip of the fingers resides Goddess Lakshmi; in the middle resides Goddess Saraswati; and at the base of the palm resides Lord Govinda.",
            meaningHi: 'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल में भगवान गोविन्द का वास है।',
            deity: 'Laxmi',
            link: 'https://shlokam.org/shloka/karaagre-vasathe.htm',
          },
          {
            id: 'gajananam-bhuthaganadhi',
            title: 'Gajananam Bhuthaganadhi',
            titleHi: 'गजाननं भूतगणादि सेवितम् (गणेश वंदना)',
            sanskrit: 'गजाननं भूतगणादि सेवितं\nकपित्थजम्बूफलसार भक्षितम् ।\nउमासुतं शोकविनाशकारणं\nनमामि विघ्नेश्वर पादपङ्कजम् ॥',
            transliteration: 'gajānanaṃ bhūtagaṇādi sevitaṃ\nkapitthajambūphalasāra bhakṣitam\numāsutaṃ śokavināśakāraṇaṃ\nnamāmi vighneśvara pādapaṅkajam',
            translationEn: 'I bow to the lotus feet of Lord Vighneshwara (the remover of obstacles), who is served by the celestial beings and other devotees, who relishes the essence of kapittha and jambu fruits, who is the son of Goddess Uma (Parvati), and who is the cause of the destruction of sorrow.',
            translationHi: 'जो भूतगणों द्वारा पूजित हैं, कैथ और जामुन के फलों का रसपान करने वाले हैं, माता उमा (पार्वती) के पुत्र हैं तथा समस्त शोकों का नाश करने वाले हैं, उन विघ्नहर्ता भगवान गणेश के चरण कमलों में मैं प्रणाम करता हूँ।',
            meaningEn: 'Salutations to the lotus feet of Lord Ganesha, who removes all obstacles.',
            meaningHi: 'विघ्नहर्ता भगवान गणेश के चरण कमलों में प्रणाम।',
            deity: 'Ganesha',
            link: 'https://shlokam.org/shloka/gajananam-bhuthaganadhi.htm',
          },
          {
            id: 'utthishto-utthishta-govinda',
            title: 'Utthishto Utthishta Govinda',
            titleHi: 'उत्तिष्ठोत्तिष्ठ गोविन्द (प्रभु जागरण)',
            sanskrit: 'उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज ।\nउत्तिष्ठ कमलाकान्त त्रैलोक्यं मङ्गलं कुरु ॥',
            transliteration: 'uttiṣṭhottiṣṭha govinda uttiṣṭha garuḍadhvaja\nuttiṣṭha kamalākānta trailokyaṃ maṅgalaṃ kuru',
            translationEn: 'Arise, arise, O Govinda! Arise, O one who bears the Garuda emblem! Arise, O beloved of Lakshmi! Bring auspiciousness to the three worlds.',
            translationHi: 'हे गोविन्द! उठिए, जागिए। हे गरुड़ध्वज! उठिए। हे कमलाकांत (माँ लक्ष्मी के प्रियतम)! उठिए और तीनों लोकों का मंगल व कल्याण कीजिए।',
            meaningEn: 'A morning prayer to awaken Lord Vishnu to bless all three worlds.',
            meaningHi: 'भगवान विष्णु को जगाने की प्रातःकालीन प्रार्थना।',
            deity: 'Vishnu',
            link: 'https://shlokam.org/shloka/utthishto-utthishta-govinda.htm',
          },
          {
            id: 'brahma-murari-tripuranatakari',
            title: 'Brahma Murari Tripuranatakari',
            titleHi: 'ब्रह्मा मुरारिः त्रिपुरांतकारी (नवग्रह सुप्रभातम्)',
            sanskrit: 'ब्रह्मा मुरारिः त्रिपुरांतकारी\nभानुः शशी भूमिसुतो बुधश्च ।\nगुरुश्च शुक्रः शनि राहु केतवः\nकुर्वतु सर्वे मम सुप्रभातम् ॥',
            transliteration: 'brahmā murāriḥ tripurāṃtakārī\nbhānuḥ śaśī bhūmisuto budhaśca\nguruśca śukraḥ śani rāhu ketavaḥ\nkurvatu sarve mama suprabhātam',
            translationEn: 'Brahma, Murari (Vishnu), Shiva (the destroyer of Tripura), Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — may all of them make this a blessed and auspicious morning.',
            translationHi: 'ब्रह्मा, मुरारि, त्रिपुरारि, नवग्रह आदि समस्त देव मिलकर मेरे प्रातःकाल को मंगलमय बनाएं।',
            meaningEn: 'A prayer invoking all planets and deities to bless the morning.',
            meaningHi: 'समस्त देव और नवग्रहों से प्रातःकाल मंगलमय बनाने की प्रार्थना।',
            deity: 'Brahma',
            link: 'https://shlokam.org/shloka/brahma-murari-tripuranatakari.htm',
          },
          {
            id: 'harim-haram-harishchandram',
            title: 'Harim Haram Harishchandram',
            titleHi: 'हरिं हरं हरिश्चन्द्रं (पंचहकार स्मरण)',
            sanskrit: 'हरिं हरं हरिश्चन्द्रं हनुमन्तं हलायुधम् ।\nएतान् संस्मरतः प्रातः हानिः स्पर्शनविद्यते ॥',
            transliteration: 'hariṃ haraṃ hariścandraṃ hanumantaṃ halāyudham\netān saṃsmarataḥ prātaḥ hāniḥ sparśanavidyate',
            translationEn: "Hari, Hara, Harischandra, Hanuman, and Halayudha (Balarama) — if these five 'Ha's are meditated upon when getting up from bed in the morning, not even a touch of harm shall come near.",
            translationHi: 'श्री हरि, हर, सत्यवादी हरिश्चंद्र, पवनपुत्र हनुमान और हलायुध—प्रातःकाल इन पाँचों का स्मरण करने से किसी भी प्रकार की हानि नहीं होती।',
            meaningEn: 'Meditation on five divine beings starting with \'Ha\' at dawn keeps all harm away.',
            meaningHi: 'पाँच "ह" नामों का प्रातः स्मरण करने से समस्त अनिष्ट दूर होते हैं।',
            deity: 'Hanuman',
            link: 'https://shlokam.org/shloka/harim-haram-harishchandram.htm',
          },
          {
            id: 'venkatesa-suprabhatam',
            title: 'Venkatesa Suprabhatam',
            titleHi: 'कौसल्या सुप्रजा राम (वेंकटेश सुप्रभातम्)',
            sanskrit: 'कौसल्या सुप्रजा राम पूर्वासन्ध्या प्रवर्तते ।\nउत्तिष्ठ नरशार्दूल कर्त्तव्यं दैवमाह्निकम् ॥१॥',
            transliteration: 'kausalyā suprajā rāma pūrvāsandhyā pravartate\nuttiṣṭha naraśārdūla karttavyaṃ daivamāhnikam',
            translationEn: 'O Rama, noble son of Kausalya! The dawn is breaking in the eastern sky; arise, O tiger among men, the sacred daily morning worship is to be performed.',
            translationHi: 'हे माता कौसल्या के सुपुत्र श्री राम! पूर्व दिशा में प्रातः संध्या हो चुकी है। हे पुरुषश्रेष्ठ! अब जागिए।',
            meaningEn: 'The first verse of Venkatesa Suprabhatam — a morning wake-up prayer to Lord Rama.',
            meaningHi: 'वेंकटेश सुप्रभातम् का प्रथम श्लोक—भगवान राम को जगाने की प्रार्थना।',
            deity: 'Rama',
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
        subtitleEn: 'Apology to Bhumi Devi before taking your first step of the day',
        subtitleHi: 'शय्या त्यागने के बाद पृथ्वी पर प्रथम चरण रखने से पूर्व',
        descriptionEn: 'Each day, before our feet touch the floor, we set them upon the Earth herself. This short prayer offers a small apology to Bhumi Devi, who patiently bears us.',
        descriptionHi: 'प्रत्येक दिन जब हमारे चरण भूमि पर पड़ते हैं, हम साक्षात पृथ्वी माता पर पग धरते हैं। यह पावन प्रार्थना धैर्यमयी भूदेवी से क्षमायाचना है।',
        deity: 'Durga',
        imageUrl: null,
        path: '/shloka/prayers/before-stepping-on-the-ground.htm',
        sanskrit: 'समुद्रवसने देवि पर्वतस्तनमण्डले ।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्वमे ॥',
        transliteration: null,
        meaningEn: 'O Goddess who is clothed with the ocean and whose bosom is adorned by the mountains, wife of Lord Vishnu, I bow to you. Please forgive me for touching you with my feet.',
        meaningHi: 'हे समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी स्तनों से सुशोभित, भगवान विष्णु की अर्धांगिनी माता पृथ्वी! मेरे पैरों के स्पर्श के लिए क्षमा करें।',
        verses: [
          {
            id: 'samudravasane-devi',
            title: 'Samudravasane Devi',
            titleHi: 'समुद्रवसने देवि पर्वतस्तनमण्डले',
            sanskrit: 'समुद्रवसने देवि पर्वतस्तनमण्डले ।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्वमे ॥',
            transliteration: 'samudravasane devi parvatastanamaṇḍale\nviṣṇupatni namastubhyaṃ pādasparśaṃ kṣamasvame',
            translationEn: 'O Goddess who is clothed with the ocean and whose bosom is adorned by the mountains, wife of Lord Vishnu, I bow to you. Please forgive me for touching you with my feet.',
            translationHi: 'हे समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी स्तनों से सुशोभित, भगवान विष्णु की अर्धांगिनी माता पृथ्वी! मेरे पैरों के स्पर्श के लिए क्षमा करें।',
            meaningEn: 'A humble prayer to Mother Earth before stepping on her at the start of the day.',
            meaningHi: 'पृथ्वी माता से क्षमायाचना — दिन के प्रथम चरण से पूर्व।',
            deity: 'Durga',
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
        subtitleEn: 'Inviting sacred rivers and remembering Govinda during bath',
        subtitleHi: 'स्नान करते समय पवित्र नदियों का आवाहन एवं प्रभु स्मरण',
        descriptionEn: 'In our tradition a bath is not only for the body but for the mind as well. These verses invite the sacred rivers — Ganga, Yamuna and the rest — into the water, turning an everyday wash into a holy dip.',
        descriptionHi: 'सनातन परंपरा में स्नान केवल शरीर शुद्धि नहीं अपितु मन की शुद्धि भी है। ये पावन श्लोक गंगा, यमुना आदि नदियों का जल में आवाहन कर स्नान को पावन तीर्थ स्नान बना देते हैं।',
        deity: 'Ganga',
        imageUrl: null,
        path: '/shloka/prayers/while-bathing.htm',
        sanskrit: 'गङ्गे च यमुने चैव गोदावरि सरस्वति ।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥',
        transliteration: null,
        meaningEn: 'O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri, may your sacred presence be present in this water.',
        meaningHi: 'हे गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु और कावेरी! आप सभी इस जल में उपस्थित होकर इसे पावन बना दें।',
        verses: [
          {
            id: 'gange-cha-yamune',
            title: 'Gange Cha Yamune',
            titleHi: 'गङ्गे च यमुने चैव (सप्तनदी स्मरण)',
            sanskrit: 'गङ्गे च यमुने चैव गोदावरि सरस्वति ।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥',
            transliteration: "gaṅge ca yamune caiva godāvari sarasvati\nnarmade sindhu kāveri jale'smin saṃnidhiṃ kuru",
            translationEn: 'O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, and Kaveri, may your sacred presence be present in this water.',
            translationHi: 'हे गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु और कावेरी! आप सभी पवित्र नदियाँ इस जल में उपस्थित हों।',
            meaningEn: 'Invocation of seven sacred rivers into the bathing water.',
            meaningHi: 'सप्त पवित्र नदियों का स्नान जल में आवाहन।',
            deity: 'Ganga',
            link: 'https://shlokam.org/shloka/gange-cha-yamune.htm',
          },
          {
            id: 'govindeti-sada-snanam',
            title: 'Govindeti Sada Snanam',
            titleHi: 'गोविन्देति सदा स्नानम् (गोविन्द स्मरण)',
            sanskrit: 'गोविन्देति सदा स्नानं गोविन्देति सदाजपं ।\nगोविन्देति सदा ध्यानं सदा गोविन्द कीर्तनम् ॥',
            transliteration: 'govindeti sadā snānaṃ govindeti sadājapaṃ\ngovindeti sadā dhyānaṃ sadā govinda kīrtanam',
            translationEn: 'Always remember Govinda while bathing, always chant Govinda\'s name, always meditate on Govinda, and always sing praises of Govinda.',
            translationHi: 'स्नान करते समय सदैव गोविन्द का स्मरण करें, सदैव गोविन्द नाम का जप करें, सदैव गोविन्द का ध्यान करें।',
            meaningEn: 'A reminder to keep the mind on Lord Govinda (Vishnu) through all daily activities.',
            meaningHi: 'स्नान सहित समस्त दैनिक क्रियाओं में गोविन्द का स्मरण करने का उपदेश।',
            deity: 'Vishnu',
            link: 'https://shlokam.org/shloka/govindeti-sada-snanam.htm',
          },
          {
            id: 'apavitra-pavitro',
            title: 'Apavitra Pavitro',
            titleHi: 'अपवित्रः पवित्रो वा (शुद्धि मंत्र)',
            sanskrit: 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा ।\nयः स्मरेत्पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः ॥',
            transliteration: "oṃ apavitraḥ pavitro vā sarvāvasthāṃ gato'pi vā\nyaḥ smaretpuṇḍarīkākṣaṃ sa bāhyābhyantaraḥ śuciḥ",
            translationEn: 'Om, if one is impure or pure, or even in all other conditions, he who remembers Pundarikaksha (Sri Vishnu with lotus-like eyes), he becomes pure outwardly as well as inwardly.',
            translationHi: 'मनुष्य चाहे अपवित्र हो या पवित्र, जो कमलनयन भगवान श्री पुण्डरीकाक्ष का स्मरण करता है, वह बाहर और भीतर दोनों से पूर्णतः शुद्ध हो जाता है।',
            meaningEn: 'Whoever remembers Lord Vishnu in any state becomes pure inside and out.',
            meaningHi: 'जो भगवान पुण्डरीकाक्ष का स्मरण करता है, वह बाहर-भीतर से शुद्ध हो जाता है।',
            deity: 'Vishnu',
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
        subtitleEn: 'Saluting Surya at dawn from Gayatri mantra to Aditya Hridayam',
        subtitleHi: 'प्रातः काल सूर्य देव के दर्शन, गायत्री मंत्र एवं आदित्य हृदयम्',
        descriptionEn: 'The rising Sun is the most visible form of the divine — the source of light, health and life. These verses salute Surya at dawn.',
        descriptionHi: 'उगता सूर्य ईश्वर का प्रत्यक्ष स्वरूप है। प्रातःकाल सूर्य देव के सम्मुख खड़े होकर इन पावन श्लोकों का स्मरण करें।',
        deity: 'Surya',
        imageUrl: null,
        path: '/shloka/prayers/for-the-sun.htm',
        sanskrit: 'आदिदेव नमस्तुभ्यं प्रसीद मम भास्कर ।\nदिवाकर नमस्तुभ्यं प्रभाकर नमोऽस्तु ते ॥१॥',
        transliteration: null,
        meaningEn: 'Salutations to you O Adideva (the first god), please be gracious to me O Bhaskara.',
        meaningHi: 'हे आदिदेव! आपको प्रणाम है। हे भास्कर! मुझ पर प्रसन्न होइए।',
        verses: [
          {
            id: 'surya-ashtakam',
            title: 'Surya Ashtakam',
            titleHi: 'सूर्याष्टकम् (आदिदेव नमस्तुभ्यं)',
            sanskrit: 'आदिदेव नमस्तुभ्यं प्रसीद मम भास्कर ।\nदिवाकर नमस्तुभ्यं प्रभाकर नमोऽस्तु ते ॥१॥',
            transliteration: "ādideva namastubhyaṃ prasīda mama bhāskara\ndivākara namastubhyaṃ prabhākara namo'stu te",
            translationEn: 'Salutations to you O Adideva (the first god), please be gracious to me O Bhaskara (the shining one), O Divakara (the maker of the day), O Prabhakara (the maker of light), my salutations to you.',
            translationHi: 'हे आदिदेव! आपको प्रणाम है। हे भास्कर! मुझ पर प्रसन्न होइए। हे दिवाकर! आपको नमस्कार है।',
            meaningEn: 'Opening verse of Surya Ashtakam — eight verses of praise to the Sun God.',
            meaningHi: 'सूर्याष्टकम् का प्रथम श्लोक—सूर्य देव की अष्टक वंदना।',
            deity: 'Surya',
            link: 'https://shlokam.org/shloka/surya-ashtakam.htm',
          },
          {
            id: 'gayatri-mantra',
            title: 'Gayatri Mantra',
            titleHi: 'गायत्री महामंत्र',
            sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
            transliteration: 'oṃ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṃ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
            translationEn: 'We meditate upon the divine light of that adorable Sun (the Supreme Truth), who illuminates all three realms. May He enlighten our intellect and awaken our understanding.',
            translationHi: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा के तेज का ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
            meaningEn: 'The most sacred Vedic mantra — a meditation on the divine light of the Sun God to illuminate the intellect.',
            meaningHi: 'सर्वाधिक पवित्र वैदिक मंत्र — बुद्धि को प्रेरित करने की सूर्य देव से प्रार्थना।',
            deity: 'Surya',
            link: 'https://shlokam.org/shloka/gayatri-mantra.htm',
          },
          {
            id: 'aditya-hrudayam',
            title: 'Aditya Hrudayam',
            titleHi: 'आदित्य हृदयम् स्तोत्र',
            sanskrit: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥',
            transliteration: 'tato yuddhapariśrāntaṃ samare cintayā sthitam\nrāvaṇaṃ cāgrato dṛṣṭvā yuddhāya samupasthitam',
            translationEn: 'When Rama was exhausted in the battlefield standing with greater sorrow and deep thought to fight against Ravana who was duly prepared for the battle, Agastya observed that.',
            translationHi: 'रणभूमि में युद्ध से थके और चिंतामग्न भगवान श्री राम को देखकर, जब सामने रावण पुनः उपस्थित हुआ, तब महर्षि अगस्त्य ने आदित्य हृदयम् उपदेश दिया।',
            meaningEn: 'Opening verse of Aditya Hridayam — the heart of the Sun God, taught by Sage Agastya to Lord Rama.',
            meaningHi: 'आदित्य हृदयम् का प्रथम श्लोक — महर्षि अगस्त्य द्वारा भगवान राम को दिया गया उपदेश।',
            deity: 'Surya',
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
        subtitleEn: 'Welcoming light, knowledge, and auspiciousness into the home',
        subtitleHi: 'प्रातः या संध्या समय दीपक प्रज्वलन एवं शिव आराधना',
        descriptionEn: 'The lamp we light at dawn and dusk each day stands for knowledge dispelling darkness, and for the presence of God in the home.',
        descriptionHi: 'प्रातः व सायं प्रज्वलित किया जाने वाला दीपक अंधकार मिटाने वाले ज्ञान तथा घर में ईश्वर की उपस्थिति का प्रतीक है।',
        deity: 'Shiva',
        imageUrl: null,
        path: '/shloka/prayers/lighting-the-lamp.htm',
        sanskrit: 'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥',
        transliteration: null,
        meaningEn: 'Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of ignorance.',
        meaningHi: 'शुभ, कल्याण, आरोग्य और धन-संपत्ति प्रदान करने वाली तथा दुर्बुद्धि का नाश करने वाली दीपज्योति को नमन।',
        verses: [
          {
            id: 'shubham-karothi-kalyanam',
            title: 'Shubham Karothi Kalyanam',
            titleHi: 'शुभं करोति कल्याणम् (दीपज्योति वंदना)',
            sanskrit: 'शुभं करोति कल्याणमारोग्यं धनसंपदा ।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥\nदीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते ॥',
            transliteration: "śubhaṃ karoti kalyāṇamārogyaṃ dhanasaṃpadā\nśatrubuddhivināśāya dīpajyotirnamo'stute\ndīpajyotiḥ parabrahma dīpajyotirjanārdanaḥ\ndīpo haratu me pāpaṃ dīpajyotirnamo'stute",
            translationEn: "Salutations to the light of the lamp, which brings auspiciousness, prosperity, good health, abundance of wealth, and the destruction of the intellect's enemy (ignorance). Deepa-Jyothi is the supreme Brahman, Deepa-Jyothi is Janardhana. May the divine lamp eradicate my sins.",
            translationHi: 'शुभ, कल्याण, आरोग्य और धन-संपत्ति प्रदान करने वाली तथा शत्रु-बुद्धि का नाश करने वाली दीपज्योति को नमन। दीपज्योति ही परब्रह्म है, दीपज्योति ही जनार्दन हैं। हे दीपक! मेरे पापों का हरण करें।',
            meaningEn: 'The lamp represents divine light that removes ignorance and blesses the home with health and prosperity.',
            meaningHi: 'दीपक ज्ञान का प्रतीक है जो अज्ञान-अंधकार को मिटाता है।',
            deity: 'Vishnu',
            link: 'https://shlokam.org/shloka/shubham-karothi-kalyanam.htm',
          },
          {
            id: 'karpura-gauram',
            title: 'Karpura Gauram',
            titleHi: 'कर्पूरगौरं करुणावतारम् (शिव स्तुति)',
            sanskrit: 'कर्पूरगौरं करुणावतारं\nसंसारसारम् भुजगेन्द्रहारम् ।\nसदावसन्तं हृदयारविन्दे\nभवं भवानीसहितं नमामि ॥',
            transliteration: 'karpūragauraṃ karuṇāvatāraṃ\nsaṃsārasāram bhujagendrahāram\nsadāvasantaṃ hṛdayāravinde\nbhavaṃ bhavānīsahitaṃ namāmi',
            translationEn: 'I offer my salutations to Lord Shiva, who is as radiant as camphor, an embodiment of compassion, the essence of the world, adorned with the serpent king as a garland, who always resides in the lotus heart of devotees, along with Goddess Bhavānī (Parvati).',
            translationHi: 'कर्पूर के समान उज्ज्वल, करुणा के साक्षात अवतार, नागराज का हार धारण करने वाले, भक्तों के हृदय-कमल में निवास करने वाले भगवान शिव को माता भवानी सहित प्रणाम।',
            meaningEn: 'A popular lamp-lighting prayer to Lord Shiva — sung at aarti before the flame.',
            meaningHi: 'दीप प्रज्वलन एवं आरती के समय गाई जाने वाली शिव वंदना।',
            deity: 'Shiva',
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
        subtitleEn: 'Offering the meal to God and thanking Annapurna before the first bite',
        subtitleHi: 'भोजन करने से पूर्व ईश्वर को भोग एवं माँ अन्नपूर्णा की वंदना',
        descriptionEn: 'Food sustains our life, and so it is treated as sacred — first offered to God before we eat.',
        descriptionHi: 'अन्न हमारे जीवन का आधार है, अतः यह साक्षात ब्रह्म माना गया है। भोजन ग्रहण करने से पूर्व कृतज्ञता पूर्वक इन श्लोकों का उच्चारण करें।',
        deity: 'Krishna',
        imageUrl: null,
        path: '/shloka/prayers/before-eating.htm',
        sanskrit: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
        transliteration: null,
        meaningEn: 'Brahman is the offering, Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire.',
        meaningHi: 'जिस यज्ञ में अर्पण ब्रह्म है, हवि ब्रह्म है, ब्रह्म रूपी अग्नि में ब्रह्म रूपी कर्ता द्वारा आहुति दी जाती है।',
        verses: [
          {
            id: 'brahmarpanam-brahma-havih',
            title: 'Brahmarpanam Brahma Havih',
            titleHi: 'ब्रह्मार्पणं ब्रह्म हविः (गीता ४.२४)',
            sanskrit: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्म समाधिना ॥',
            transliteration: 'brahmārpaṇaṃ brahma havirbrahmāgnau brahmaṇā hutam\nbrahmaiva tena gantavyaṃ brahmakarma samādhinā',
            translationEn: 'Brahman is the offering (the ritual or act of offering), Brahman is the clarified butter, Brahman is the sacrificial fire, and Brahman is the one offering to the fire. By realising Brahman in action, one reaches Brahman alone.',
            translationHi: 'जिस यज्ञ में अर्पण ब्रह्म है, हवि ब्रह्म है, ब्रह्म रूपी अग्नि में ब्रह्म रूपी कर्ता द्वारा आहुति दी जाती है — उस ब्रह्म-कर्म में लीन रहने वाले व्यक्ति द्वारा प्राप्त करने योग्य फल भी ब्रह्म ही है।',
            meaningEn: 'Bhagavad Gita 4.24 — the verse that transforms eating into a sacred yajna (offering).',
            meaningHi: 'भगवद्गीता ४.२४ — भोजन को यज्ञ रूपांतरित करने वाला श्लोक।',
            deity: 'Krishna',
            link: 'https://shlokam.org/shloka/brahmarpanam-brahma-havih.htm',
          },
        ],
      },
      {
        id: 'before-sleep',
        nameEn: 'Before Sleep',
        nameHi: 'शयन प्रार्थना',
        headerTitleEn: 'Shlokas Before Sleep',
        headerTitleHi: 'शयन प्रार्थना श्लोक',
        subtitleEn: 'Surrendering the day to God before rest',
        subtitleHi: 'रात्रि विश्राम से पूर्व प्रभु को दिन समर्पित करना',
        descriptionEn: 'As the day closes, these verses offer the acts of the day back to God and seek peaceful rest. Chant them as you lay down, releasing the day\'s burdens.',
        descriptionHi: 'दिन के अंत में इन पावन श्लोकों के माध्यम से समस्त कर्मों को प्रभु को समर्पित करें और शांतिपूर्ण विश्राम की प्रार्थना करें।',
        deity: 'Vishnu',
        imageUrl: null,
        path: '/shloka/prayers/before-sleep.htm',
        sanskrit: 'रामं स्कंदं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुःस्वप्नं तस्य नश्यति ॥',
        transliteration: null,
        meaningEn: 'Those who remember Rama, Skanda, Hanuman, Garuda, and Bhima while lying down shall be freed from nightmares.',
        meaningHi: 'जो व्यक्ति शयन के समय राम, स्कन्द, हनुमान, गरुड़ और भीम का स्मरण करता है, उसके दुःस्वप्न नष्ट हो जाते हैं।',
        verses: [
          {
            id: 'ramam-skandam-hanumantam',
            title: 'Ramam Skandam Hanumantam',
            titleHi: 'रामं स्कंदं हनुमन्तम् (शयन प्रार्थना)',
            sanskrit: 'रामं स्कंदं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुःस्वप्नं तस्य नश्यति ॥',
            transliteration: 'rāmaṃ skandaṃ hanumantaṃ vainateyaṃ vṛkodaram\nśayane yaḥ smarenityaṃ duḥsvapnaṃ tasya naśyati',
            translationEn: 'Those who remember Rama, Skanda (Kartikeya), Hanuman, Vainateya (Garuda), and Vrikodara (Bhima) every night before sleeping shall be freed from nightmares.',
            translationHi: 'जो व्यक्ति प्रतिदिन रात्रि शयन से पूर्व राम, स्कन्द, हनुमान, वैनतेय (गरुड़) और वृकोदर (भीम) का स्मरण करता है, उसके दुःस्वप्न नष्ट हो जाते हैं।',
            meaningEn: 'Remembering five powerful divine beings before sleep destroys nightmares and grants peaceful rest.',
            meaningHi: 'शयन से पूर्व पाँच महाशक्तिशाली देवों का स्मरण दुःस्वप्न नाशक है।',
            deity: 'Rama',
            link: 'https://shlokam.org/shloka/ramam-skandam-hanumantam.htm',
          },
          {
            id: 'karacharana-kritham',
            title: 'Karacharana Kritham',
            titleHi: 'करचरण कृतं (क्षमापन एवं शयन प्रार्थना)',
            sanskrit: 'करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधं ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥',
            transliteration: 'karacaraṇa kṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādhaṃ\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
            translationEn: 'O Mahadeva Shambhu (Lord Shiva), who is an ocean of compassion, please forgive all transgressions committed by hands and feet, those arising from speech and body, born of actions, originating from hearing and sight, and those of the mind.',
            translationHi: 'हे करुणासागर श्री महादेव शम्भो! मेरे हाथ, पैर, वाणी, शरीर, कर्म, कर्ण, नेत्र अथवा मन द्वारा किए गए समस्त पापों को क्षमा कीजिए।',
            meaningEn: 'An evening prayer seeking forgiveness from Lord Shiva for all wrongdoings of the day.',
            meaningHi: 'दिनभर के समस्त जाने-अनजाने पापों के लिए भगवान शिव से क्षमायाचना।',
            deity: 'Shiva',
            link: 'https://shlokam.org/shloka/karacharana-kritham.htm',
          },
        ],
      },
    ],
  },

  // ── 2. HEALTH & PROTECTION ───────────────────────────────────────────────
  {
    id: 'occasion-health-and-protection',
    slug: 'health-and-protection',
    order: 2,
    isActive: true,
    titleEn: 'Health & Protection',
    titleHi: 'आरोग्य एवं रक्षा',
    descriptionEn: 'Prayers for the body and for safety — healing from illness, recovery, and protection from harm.',
    descriptionHi: 'आरोग्य, दीर्घायु, गंभीर रोग मुक्ति एवं सुरक्षा हेतु श्लोक।',
    imageUrl: 'https://shlokam.org/assets/domains/health-protection.jpg',
    path: '/shloka/prayers/health-and-protection.htm',
    items: [
      {
        id: 'for-serious-illness',
        nameEn: 'For Serious Illness',
        nameHi: 'गंभीर रोग निवारण',
        headerTitleEn: 'Shlokas for Serious Illness',
        headerTitleHi: 'गंभीर रोग निवारण श्लोक',
        subtitleEn: 'Sacred verses for healing in times of serious sickness',
        subtitleHi: 'गंभीर रोग के समय पाठ किए जाने वाले पवित्र श्लोक',
        descriptionEn: 'When illness is grave, these powerful mantras bring divine healing energy. The Mrityunjaya mantra in particular is widely chanted for life-threatening conditions.',
        descriptionHi: 'जब रोग अत्यंत गंभीर हो, तब इन शक्तिशाली मंत्रों का जाप दिव्य उपचार ऊर्जा प्रदान करता है। महामृत्युंजय मंत्र का विशेष महत्त्व है।',
        deity: 'Shiva',
        imageUrl: null,
        path: '/shloka/prayers/for-serious-illness.htm',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
        transliteration: null,
        meaningEn: 'We bow to the three-eyed one (Lord Shiva). May he liberate us from the bondage of death.',
        meaningHi: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं। वे हमें मृत्यु के भय से मुक्त करें।',
        verses: [
          {
            id: 'om-tryambakam',
            title: 'Om Tryambakam Yajamahe (Mahamrityunjaya)',
            titleHi: 'महामृत्युञ्जय मन्त्र (त्र्यम्बकं यजामहे)',
            sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
            transliteration: "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt",
            translationEn: 'We bow to the three-eyed one (Lord Shiva), the sustainer of all, who nourishes and nurtures all beings. Like the ripe cucumber that effortlessly releases from the vine, may he liberate us from the bondage of worldly attachments and the cycle of birth and death.',
            translationHi: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित और समस्त जीवों का पोषण करने वाले हैं। जिस प्रकार पका हुआ खरबूजा बेल के बंधन से अनायास मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय व संसार के बंधनों से मुक्त हों।',
            meaningEn: 'The Mahamrityunjaya Mantra — the most powerful mantra for overcoming death and disease, addressed to Lord Shiva.',
            meaningHi: 'महामृत्युंजय मंत्र — रोग, मृत्यु भय और संकट निवारण का सर्वश्रेष्ठ मंत्र।',
            deity: 'Shiva',
            link: 'https://shlokam.org/shloka/tryambakam-yajamahe.htm',
          },
          {
            id: 'dhanvantari-mantra',
            title: 'Dhanvantari Mantra',
            titleHi: 'धन्वन्तरि मंत्र (आरोग्य प्रदाता)',
            sanskrit: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये ।\nअमृतकलश हस्ताय सर्वभय विनाशाय सर्वरोग निवारणाय ।\nत्रिलोकपथाय त्रिलोकनाथाय श्री महाविष्णुस्वरूप श्री धन्वन्तरि स्वरूप श्री श्री श्री औषधचक्र नारायणाय नमः ॥',
            transliteration: 'oṃ namo bhagavate mahāsudarśanāya vāsudevāya dhanvantaraye\namṛtakalaśa hastāya sarvabhaya vināśāya sarvaroga nivāraṇāya\ntrilokāpathāya trilokanāthāya śrī mahāviṣṇusvarūpa śrī dhanvantari svarūpa śrī śrī śrī auṣadhacakra nārāyaṇāya namaḥ',
            translationEn: 'Om, salutations to Lord Dhanvantari, who is Vasudeva, bearer of the pot of nectar, destroyer of all fears and diseases, the path and lord of all three worlds, the form of Maha-Vishnu, the divine physician Dhanvantari, the Narayana of medicine.',
            translationHi: 'ॐ भगवान धन्वन्तरि को प्रणाम, जो अमृत कलश धारण करने वाले, समस्त भय व रोगों के नाशक, त्रिलोकनाथ, श्री महाविष्णु के स्वरूप और औषधि के अधिपति हैं।',
            meaningEn: 'Prayer to Lord Dhanvantari, the divine physician and god of medicine, for healing and health.',
            meaningHi: 'दिव्य वैद्य भगवान धन्वन्तरि से आरोग्य और उपचार की प्रार्थना।',
            deity: 'Vishnu',
            link: 'https://shlokam.org/shloka/dhanvantari-mantra.htm',
          },
        ],
      },
      {
        id: 'for-protection',
        nameEn: 'For Protection from Harm',
        nameHi: 'सर्व संकट रक्षा',
        headerTitleEn: 'Shlokas for Protection',
        headerTitleHi: 'रक्षा कवच श्लोक',
        subtitleEn: 'Divine armor mantras for daily protection and safety',
        subtitleHi: 'दैनिक सुरक्षा और कल्याण हेतु रक्षा कवच मंत्र',
        descriptionEn: 'These powerful mantras act as a divine shield. Chant them daily for protection from all forms of harm — physical, mental, and spiritual.',
        descriptionHi: 'ये शक्तिशाली मंत्र दिव्य कवच का कार्य करते हैं। शारीरिक, मानसिक और आत्मिक समस्त अनिष्टों से सुरक्षा हेतु इनका नित्य पाठ करें।',
        deity: 'Vishnu',
        imageUrl: null,
        path: '/shloka/prayers/for-protection.htm',
        sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम् ।\nविश्वाधारं गगनसदृशं मेघवर्ण शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यम् ।\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥',
        transliteration: null,
        meaningEn: 'I bow to Lord Vishnu, who has a peaceful form, rests on the serpent, is the lord of the universe, and removes all fears.',
        meaningHi: 'शान्त स्वरूप, शेषशायी, पद्मनाभ, विश्व के आधार, मेघवर्ण, लक्ष्मीपति, कमलनयन, योगियों द्वारा ध्यानगम्य, भव-भय हरण करने वाले सर्वलोकनाथ भगवान विष्णु को प्रणाम।',
        verses: [
          {
            id: 'vishnu-sharana-mantra',
            title: 'Shantakaram Bhujagashayanam',
            titleHi: 'शान्ताकारं भुजगशयनम् (विष्णु शरण)',
            sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम् ।\nविश्वाधारं গগनसदृशं मेघवर्ण शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यम् ।\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥',
            transliteration: 'śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśam\nviśvādhāraṃ gaganasadṛśaṃ meghavaraṇa śubhāṅgam\nlakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyam\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanatham',
            translationEn: 'I bow to Lord Vishnu, who is peaceful in form, who rests on the serpent, who has a lotus on his navel, who is the lord of gods, who is the foundation of the universe, who is like the sky in vastness, who has the complexion of clouds, who has auspicious limbs, who is the beloved of Lakshmi, who has lotus-like eyes, who is accessible to yogis through meditation, who removes the fear of worldly existence, and who is the sole master of all worlds.',
            translationHi: 'जो शान्त स्वरूप हैं, शेषनाग पर शयन करने वाले हैं, नाभि में कमल धारण करने वाले देवेश हैं, जो विश्व के आधार हैं, आकाश के समान व्यापक हैं, मेघ के समान वर्ण वाले हैं, लक्ष्मी के प्रियतम हैं, कमल के समान नेत्र वाले हैं — उन सर्वलोकनाथ भगवान विष्णु को प्रणाम।',
            meaningEn: 'A majestic description and prayer to Lord Vishnu — the sustainer and protector of all creation.',
            meaningHi: 'भगवान विष्णु का दिव्य रूप वर्णन और उनसे शरण की प्रार्थना।',
            deity: 'Vishnu',
            link: 'https://shlokam.org/shloka/vishnu-slokam.htm',
          },
        ],
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  const time = new Date().toLocaleTimeString('en-IN');
  console.log(`[${time}] ${msg}`);
}

function buildVerseDoc(verse, categorySlug, subCategoryId, order) {
  return {
    id: verse.id,
    categorySlug,
    subCategoryId,
    order,
    // ── Multilingual (backward-compatible with existing app interfaces)
    title: verse.title,
    titleHi: verse.titleHi || verse.title,
    sanskrit: verse.sanskrit,
    transliteration: verse.transliteration || null,
    translationEn: verse.translationEn,
    translationHi: verse.translationHi || verse.translationEn,
    meaningEn: verse.meaningEn || null,
    meaningHi: verse.meaningHi || verse.meaningEn || null,
    // ── Meta
    deity: verse.deity || null,
    link: verse.link || null,
    // ── Filtering & Search
    tags: [categorySlug, subCategoryId, verse.deity].filter(Boolean).map(t => t.toLowerCase()),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

// ─── Delete Collection ────────────────────────────────────────────────────────

async function deleteCollection(collectionPath) {
  const snap = await db.collection(collectionPath).limit(100).get();
  if (snap.empty) return 0;
  const batch = db.batch();
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
  const remaining = await db.collection(collectionPath).limit(1).get();
  if (!remaining.empty) return snap.size + (await deleteCollection(collectionPath));
  return snap.size;
}

// ─── Upload One Category ──────────────────────────────────────────────────────

async function uploadCategory(cat) {
  const slug = cat.slug;

  // Build the items array (strip image field, add verseCount)
  const itemsForFirestore = (cat.items || []).map(item => {
    const { image, ...rest } = item; // strip local image
    return {
      ...rest,
      imageUrl: item.imageUrl || null,
      verseCount: (item.verses || []).length,
    };
  });

  const categoryDoc = {
    id: cat.id,
    slug: cat.slug,
    order: cat.order,
    isActive: cat.isActive,
    // Backward-compatible fields (matches existing ShlokaCategoryDetail interface)
    titleEn: cat.titleEn,
    titleHi: cat.titleHi,
    descriptionEn: cat.descriptionEn,
    descriptionHi: cat.descriptionHi,
    imageUrl: cat.imageUrl || null,
    path: cat.path,
    items: itemsForFirestore,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (DRY_RUN) {
    log(`[DRY-RUN] Would write: ${COL.CATEGORIES}/${slug}`);
    log(`  items: ${itemsForFirestore.length} sub-categories`);
    let totalVerses = 0;
    itemsForFirestore.forEach(i => { totalVerses += i.verseCount; });
    log(`  verses: ${totalVerses} total`);
    return;
  }

  await db.collection(COL.CATEGORIES).doc(slug).set(categoryDoc, { merge: true });
  log(`✅ Category saved: ${COL.CATEGORIES}/${slug}`);

  // Also write flat verse docs to shloka_verses/{verseId}
  let batch = db.batch();
  let batchCount = 0;
  let verseTotal = 0;

  for (const item of cat.items) {
    for (let i = 0; i < (item.verses || []).length; i++) {
      const verse = item.verses[i];
      const verseDoc = buildVerseDoc(verse, slug, item.id, i + 1);
      const ref = db.collection(COL.VERSES).doc(verse.id);
      batch.set(ref, verseDoc, { merge: true });
      batchCount++;
      verseTotal++;

      if (batchCount >= 400) {
        await batch.commit();
        log(`  💾 Committed batch of ${batchCount} verse docs`);
        batch = db.batch();
        batchCount = 0;
      }
    }
  }

  if (batchCount > 0) {
    await batch.commit();
    log(`  💾 Committed final batch of ${batchCount} verse docs`);
  }

  log(`  📜 Flat verses written: ${verseTotal} → ${COL.VERSES}/`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════╗
║      GuruVani — Firestore Shloka Seed Script      ║
║      Project: test-9656d                          ║
╠═══════════════════════════════════════════════════╣
║  Collection: ${COL.CATEGORIES.padEnd(35)}║
║  Verses:     ${COL.VERSES.padEnd(35)}║
╠═══════════════════════════════════════════════════╣
║  Mode: ${(DRY_RUN ? '🔍 DRY-RUN (no writes)' : RESET ? '🔄 RESET + Seed' : '📤 Seed (merge)').padEnd(41)}║
${CATEGORY_FILTER ? `║  Filter: --category ${CATEGORY_FILTER.padEnd(29)}║\n` : ''}╚═══════════════════════════════════════════════════╝
`);

  if (RESET && !DRY_RUN) {
    log('🗑  Deleting existing data...');
    const catCount = await deleteCollection(COL.CATEGORIES);
    const verseCount = await deleteCollection(COL.VERSES);
    log(`   Deleted ${catCount} category docs, ${verseCount} verse docs`);
  }

  const toProcess = CATEGORY_FILTER
    ? SHLOKA_DATA.filter(c => c.slug === CATEGORY_FILTER)
    : SHLOKA_DATA;

  if (CATEGORY_FILTER && toProcess.length === 0) {
    console.error(`❌ Category "${CATEGORY_FILTER}" not found.`);
    console.error('   Available:', SHLOKA_DATA.map(c => c.slug).join(', '));
    process.exit(1);
  }

  for (const cat of toProcess) {
    console.log('');
    log(`🔷 Processing: ${cat.slug}`);
    await uploadCategory(cat);
  }

  console.log(`
╔═══════════════════════════════════════════════════╗
║  ✅  Seed complete!                                ║
╠═══════════════════════════════════════════════════╣
║  Next: open Firebase Console and verify data       ║
║  App will auto-fetch from Firestore on tap         ║
╚═══════════════════════════════════════════════════╝
`);

  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
