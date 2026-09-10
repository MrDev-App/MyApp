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
    id: 'TextBook_KrishnaJanmashtami',
    type: 'text',

    titleEn: 'Krishna Janmashtami – The Struggles Before the Divine Appearance',
    titleHi: 'श्रीकृष्ण जन्माष्टमी – दिव्य अवतरण से पूर्व का संघर्ष',

    subtitleEn: 'The Struggles Before the Divine Appearance',
    subtitleHi: 'दिव्य अवतरण से पूर्व का संघर्ष',

    descriptionEn:
      'Over 5,000 years ago, Mother Earth approached Lord Brahma in distress. Discover the divine appearance of Lord Krishna, the midnight journey across the Yamuna, and the eternal message of dharma.',

    descriptionHi:
      '5,000 से अधिक वर्ष पूर्व जब पृथ्वी आसुरी राजाओं के अत्याचारों से त्रस्त थी, तब भगवान श्रीकृष्ण का पावन अवतरण हुआ। कारागार से गोकुल तक की अलौकिक यात्रा और दिव्य लीला की पावन गाथा।',

    categoryEn: 'Divine Incarnation',
    categoryHi: 'दिव्य अवतार',

    image: imagePath.krishnasBirth,

    pages: [
      {
        page: 1,

        sourceHi: 'भगवान विष्णु से हृदयस्पर्शी प्रार्थना',
        sourceEn: 'Heartfelt Prayers to Lord Vishnu',

        contentHi: `5,000 से अधिक वर्ष पूर्व, यह संसार अंधकार में डूब रहा था।  

इस पृथ्वी की अधिष्ठात्री देवी, भूमि, अब इसे और सहन नहीं कर पा रही थीं। अनगिनत आसुरी राजाओं के अत्याचारों के भार से दबकर, उन्होंने एक गाय का रूप धारण किया 🐄 और आँखों में आँसू भरकर, राहत पाने के लिए ब्रह्मांड के रचयिता भगवान ब्रह्मा के पास पहुँचीं।

भगवान विष्णु से हृदयस्पर्शी प्रार्थना: 🪷

माता पृथ्वी के कष्टों से द्रवित होकर, भगवान ब्रह्मा ने सभी देवताओं को एकत्रित किया और वे सब मिलकर क्षीरसागर पहुंचे, जहाँ भगवान विष्णु सदैव निवास करते हैं। 🌊✨

तट पर खड़े होकर, देवताओं ने हाथ जोड़े और देवाधिदेव, परम पुरुषोत्तम भगवान श्री विष्णु को प्रसन्न करने के लिए हृदयस्पर्शी प्रार्थनाएँ कीं। 

परंतु, कोई उत्तर नहीं मिला जब तक कि भगवान ब्रह्मा गहन ध्यान में लीन नहीं हुए और उन्हें भगवान विष्णु का दिव्य संदेश प्राप्त हुआ: 🧘‍♂️

"चिंता मत करो। मैं शीघ्र ही पृथ्वी पर प्रकट होऊँगा। उससे पहले, सभी देवताओं को वहाँ जन्म लेना चाहिए। मैं भक्तों की रक्षा करने, दुष्टों का संहार करने और धर्म की पुनर्स्थापना करने के लिए अपने मूल रूप में आऊँगा।" 🌟

इन वचनों को सुनकर, भूमि देवी और समस्त देवताओं को परम शांति मिली। 🕊️`,

        contentEn: `Over 5,000 years ago, the world was drowning in darkness.

Bhumi, the predominating deity of this earth, could not bear it any longer. Weighed down by the atrocities of countless demonic rulers, she took the form of a cow and, with tears in her eyes, approached Lord Brahma, the creator of the universe, seeking relief.

Heartfelt Prayers to Lord Vishnu:

Lord Brahma, moved by the suffering of Mother Earth, gathered the devatas, and together they approached the Milky Ocean, where Lord Vishnu eternally resides.

Standing on the shore, the devatas folded their hands and offered heartfelt prayers to appease the Supreme Personality of Godhead, Lord Vishnu.

But, there was no response until Lord Brahma entered deep meditation and received the divine message from Lord Vishnu:

"Do not worry. I will soon appear on Earth. Before that, all devatas should take birth there. I shall come in My original form to protect the devotees, destroy the demons, and re-establish dharma."

Hearing these words, Bhumi and the devatas were pacified.`,
      },

      {
        page: 2,

        sourceHi: 'आकाशवाणी की भविष्यवाणी',
        sourceEn: 'The Prophecy From The Sky',

        contentHi: `आकाशवाणी की भविष्यवाणी: ⚡

एक भव्य रथ में, वसुदेव अपनी नवविवाहिता पत्नी देवकी के साथ घर लौट रहे थे। देवकी का भाई कंस, अपनी बहन को प्रसन्न करने के लिए, स्वेच्छा से रथ का सारथी बना। 🛞

अचानक, आकाश से कंस के लिए एक चमत्कारिक संदेश गूंज उठा: 🌩️

"हे कंस! तेरी बहन देवकी की आठवीं संतान ही तेरी मृत्यु का कारण बनेगी।" ⚔️

कंस उस क्षेत्र के सबसे क्रूर और आसुरी राजाओं में से एक माना जाता था, और इस भविष्यवाणी को सुनते ही उसका हृदय भय से काँप उठा। क्रोध के आवेश में, उसने अपनी तलवार निकाली, देवकी के बाल पकड़े और उसका वध करने के लिए उद्यत हो गया। 🗡️

वसुदेव ने शांत और प्रिय वचनों से किसी प्रकार कंस को शांत किया। उन्होंने अपनी प्रत्येक नवजात संतान कंस को सौंपने का वचन तक दे दिया। वसुदेव के वचनों पर विश्वास करते हुए, कंस ने देवकी के प्राण बख्श दिए। 

फिर भी, भय से अंधा होकर कंस ने देवकी और उनके पति वसुदेव, दोनों को कारागार में बंदी बना लिया। ⛓️`,

        contentEn: `The Prophecy From The Sky:

In a grand chariot, Vasudeva, along with his newly wedded wife Devaki, was on his way home. Kamsa, Devaki's brother, eager to please his sister, willingly took the role of the chariot driver.

Suddenly, a miraculous message resounded for Kamsa from the sky:

"Kamsa! The eighth child of your sister Devaki will be the cause of your death."

Kamsa was known as one of the most demonic kings of the land, and upon hearing this prophecy, his heart filled with terror. In a fit of rage, he took out his sword, seized Devaki by hair, and prepared to kill her.

Vasudeva somehow managed to pacify Kamsa with calm and pleasing words. He even promised to hand over every child born to them. Trusting his word, Kamsa spared Devaki's life.

Yet, blinded by fear, Kamsa imprisoned both Devaki and her husband, Vasudeva.`,
      },

      {
        page: 3,

        image: [imagePath.krishnasBirth],

        sourceHi: 'दिव्य जन्म की पावन रात्रि',
        sourceEn: 'The Night of Divine Birth',

        contentHi: `दिव्य जन्म की पावन रात्रि: 🌙

कारागार के भीतर, वसुदेव और देवकी ने वर्ष-दर-वर्ष संतानों को जन्म दिया, और प्रत्येक संतान कंस के हाथों निर्दयता से मारी गई। 

परंतु, जब देवकी अपनी आठवीं संतान की प्रतीक्षा कर रही थीं, तब संपूर्ण मथुरा पर एक विचित्र नीरवता और शांति छा गई। मध्यरात्रि के आसपास, कारागार की कोठरी एक अलौकिक प्रकाश से आलोकित हो उठी। भगवान विष्णु अपने चतुर्भुज रूप में, शंख, चक्र, गदा और पद्म धारण किए हुए वसुदेव और देवकी के समक्ष प्रकट हुए। 🪷🐚✨

भगवान ने कहा, "मैं अपने भक्तों की रक्षा और अधर्म का नाश करने के लिए अपने दिए वचन के अनुसार आया हूँ। अब, तुम मुझे गोकुल ले जाओ और मुझे नंद तथा यशोदा के संरक्षण में सौंप दो।" 

इतना कहकर, भगवान विष्णु ने एक अति सुंदर नन्हे बालक का रूप धारण कर लिया। उसी क्षण, कारागार के सारे द्वार अपने-आप खुल गए और सभी पहरेदार गहरी निद्रा में सो गए। 🗝️`,

        contentEn: `The Night of Divine Birth:

Within the prison, Vasudeva and Devaki gave birth to a male child year after year, and every child was killed at the hands of Kamsa.

But, when Devaki was expecting her eighth child, a strange stillness covered Mathura. Around midnight, a radiant light filled the prison cell. Lord Vishnu appeared before Vasudeva and Devaki in His four-armed form, holding the conch, discus, mace, and lotus.

The Lord said, "I have come as promised to protect My devotees and destroy evil. Now, take Me to Gokul and place Me in the care of Nanda and Yashoda."

Having spoken, Lord Vishnu assumed the form of a beautiful baby boy. At that very moment, all the prison doors swung open, and the guards fell into a deep sleep.`,
      },

      {
        page: 4,

        image: [imagePath.vasudevaCarriesKrishna],

        sourceHi: 'नदी पार मध्यरात्रि की यात्रा',
        sourceEn: 'The Midnight Journey Over the River',

        contentHi: `नदी पार मध्यरात्रि की यात्रा: 🌊🌧️

वसुदेव ने उस दिव्य बालक को एक सूप (टोकरी) में रखा और उफनती हुई यमुना नदी को पार करने के लिए अपनी यात्रा आरंभ की। यमुना के जल ने उन्हें सुरक्षित मार्ग देने के लिए अपना प्रवाह बांट दिया, और दिव्य नाग शेषनाग ने तूफान और वर्षा से बालक की रक्षा के लिए अपना विशाल फण फैला दिया। 🌊🐍⛈️

गोकुल में, माता यशोदा ने ठीक उसी समय एक कन्या को जन्म दिया था। वसुदेव ने शिशुओं की अदला-बदली की, मथुरा लौटे और उस नन्हीं कन्या को देवकी के पास लिटा दिया। 🏡

जब कंस ने उस बालिका का वध करने का प्रयास किया, तो वह उसके हाथों से फिसल गई, आकाश में ऊपर उठ गई और माँ दुर्गा के दिव्य रूप में प्रकट होकर उसे चेतावनी दी: ⚡🔱

"तुम्हारा विनाश करने वाला तो पहले ही जन्म ले चुका है।" 🏹`,

        contentEn: `The Midnight Journey Over the River:

Vasudeva placed the divine child in a wicker basket and began his journey across the raging Yamuna River. The waters parted to give him safe passage, and Sheshanaga, the divine serpent, spread His hood to protect the child from the storm.

In Gokul, Mother Yashoda had just given birth to a baby girl. Vasudeva exchanged the children, returned to Mathura, and placed the baby girl beside Devaki.

When Kamsa tried to kill the child, she slipped from his hands, rose into the sky, and revealed herself as Durga Devi, warning him:

"The One who will destroy you has already been born."`,
      },

      {
        page: 5,

        sourceHi: 'भगवान श्रीकृष्ण के अवतरण का उद्देश्य',
        sourceEn: "The Purpose of Lord Krishna's Appearance",

        contentHi: `भगवान श्रीकृष्ण के अवतरण का उद्देश्य: 🦚

यद्यपि उनके अवतरण और लीलाओं के इर्द-गिर्द अनेक संघर्ष रहे, परंतु भगवान श्रीकृष्ण, परम पुरुषोत्तम भगवान होने के कारण, सदैव दिव्य और अलौकिक रहे — वे भौतिक परिस्थितियों से पूर्णतः अछूते रहे और अपने दिव्य उद्देश्य को पूर्णता के साथ पूरा किया। 🌟

जैसा कि आकाशवाणी द्वारा पहले ही कहा गया था, जब श्रीकृष्ण बड़े हुए, तो उन्होंने न केवल कंस का वध किया बल्कि संसार पर शासन करने वाले समस्त आसुरी राजाओं का भी अंत किया, जिससे अंधकार में डूबे संसार में पुनः प्रकाश फैल गया। 🪔🌅

जैसा कि श्रीकृष्ण भगवद्गीता (४.८) में घोषणा करते हैं: 📜
"साधु पुरुषों के उद्धार, दुष्टों के संहार और धर्म के सिद्धांतों की पुनः स्थापना के लिए, मैं युग-युग में स्वयं प्रकट होता हूँ।" 🕉️

अपने वचन के सच्चे, वे इस पृथ्वी पर अवतरित हुए और अपने संपूर्ण जीवन में श्रीकृष्ण उन सभी कार्यों में संलग्न रहे जिनका उद्देश्य धर्मपरायण लोगों की रक्षा करना और धर्म की पुनः प्रतिष्ठा करना था। 🛡️🕊️`,

        contentEn: `The Purpose of Lord Krishna's Appearance:

Although many struggles surrounded His appearance and pastimes, Lord Krishna, being the Supreme Personality of Godhead, was always transcendental — untouched by material circumstances, and perfectly enacting His divine mission.

As foretold by the divine voice, when Krishna grew up, He killed not only Kamsa but also all the demonic kings who ruled the world, bringing light to a world once drowned in darkness.

As Krishna declares in the Bhagavad-gita 4.8:
"In order to deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I advent Myself millennium after millennium."

True to His promise, He descended on earth and throughout His life, Krishna engaged in activities aimed at protecting the virtuous and restoring righteousness.`,

        shloka:
          'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',

        shlokaTranslationHi:
          'साधु पुरुषों के उद्धार, दुष्टों के संहार और धर्म के सिद्धांतों की पुनः स्थापना के लिए, मैं युग-युग में स्वयं प्रकट होता हूँ। (श्रीमद्भगवद्गीता ४.८)',

        shlokaTranslationEn:
          'To deliver the pious, annihilate the miscreants, and reestablish dharma, I advent Myself millennium after millennium. (Bhagavad Gita 4.8)',
      },

      {
        page: 6,

        sourceHi: 'दिव्य संदेश',
        sourceEn: 'The Divine Message',

        contentHi: `दिव्य संदेश: 📜🦚

श्रीकृष्ण ने संसार को जीवन जीने का वह धर्मसम्मत मार्ग भी दिखाया — एक ऐसा मार्ग जो किसी भी व्यक्ति को घोर संघर्षों और अंधकार से उबारकर आनंद और शांति के उज्ज्वल प्रकाश की ओर ले जा सकता है। 🌟✨

कुरुक्षेत्र की रणभूमि पर, श्रीकृष्ण ने भगवद्गीता का वह शाश्वत ज्ञान प्रदान किया, जिसने अर्जुन और संपूर्ण मानवता को यह सिखाया कि किस प्रकार विश्वास, कर्तव्य और प्रेममयी भक्ति के माध्यम से भय, भ्रम और संताप पर विजय प्राप्त की जा सकती है। 🏹📖

उनके उपदेशों का पालन करके, हम साहस, उद्देश्य और अनासक्ति के साथ जीना सीखते हैं, और अंततः अपने जीवन के परम लक्ष्य को प्राप्त करते हैं। 🌿🧘

यह दिव्य संदेश आज भी उतना ही प्रासंगिक है जितना हजारों वर्ष पूर्व था, जो लाखों-करोड़ों लोगों को धर्म के पथ पर दृढ़ता से चलने — सदाचार, उत्तरदायित्व और भक्ति का जीवन जीने — तथा सच्ची आध्यात्मिक पूर्णता प्राप्त करने की प्रेरणा देता है। 🪷🕉️`,

        contentEn: `The Divine Message:

Krishna also revealed to the world the righteous path to live—a path that can lead anyone from the darkest struggles to the brightest light of joy and peace.

On the battlefield of Kurukshetra, Krishna spoke the timeless wisdom of the Bhagavad-gita, guiding Arjuna and all humanity on how to overcome fear, confusion, and suffering through faith, duty, and loving devotion.

By following His instructions, we learn to live with courage, purpose, and detachment, ultimately realising the end goal of our life.

This divine message remains as relevant today as it was thousands of years ago, inspiring millions to firmly walk the path of dharma — living a life of virtue, responsibility, and devotion — and attain true spiritual fulfillment.`,

        moralHi:
          'सच्चा धर्म और भक्ति हमें भय और भ्रम से मुक्त कर जीवन के सर्वोच्च आनंद और शांति की ओर ले जाती है। कर्तव्य और समर्पण ही जीवन का सच्चा पथ है।',

        moralEn:
          'True dharma and loving devotion liberate us from fear and confusion, leading to spiritual fulfillment and inner peace.',
      },
    ],

    keywords:
      'krishna, janmashtami, devaki, vasudeva, kamsa, yamuna, vishnu, gokul, yashoda, krishna janmashtami, जन्माष्टमी, कृष्ण, वासुदेव, देवकी, कंस, यमुना, विष्णु, गोकुल',
  },
  {
    id: 'TextBook_Dashavatara',
    type: 'text',
    titleEn: 'The Ten Avatars of Vishnu (Dashavatara)',
    titleHi: 'भगवान विष्णु के दस दिव्य अवतार (दशावतार)',
    subtitleEn: 'The Divine Incarnations of the Preserver',
    subtitleHi: 'ब्रह्मांड के रक्षक के दिव्य अवतार',
    descriptionEn:
      'Explore the epic legends, sacred shlokas, and timeless morals behind the ten primary incarnations (Dashavatara) of Lord Vishnu.',
    descriptionHi:
      'भगवान विष्णु के दस मुख्य अवतारों (दशावतार) के पीछे की पौराणिक कहानियों, पवित्र श्लोकों और शाश्वत सीखों को जानें।',
    categoryEn: 'Mythology',
    categoryHi: 'पौराणिक कथाएँ',
    image: imagePath.dashavataraCover,
    readingTimeMin: 25,
    sourceEn: 'Dashavatara Stotra - Gita Govinda',
    sourceHi: 'दशावतार स्तोत्र - गीत गोविंद',
    keywords:
      'Vishnu, Dashavatara, Matsya, Kurma, Varaha, Narasimha, Vamana, Parashurama, Rama, Krishna, Buddha, Kalki, दशावतार, विष्णु, मत्स्य, कूर्म, वराह, नृसिंह, वामन, परशुराम, राम, कृष्ण, बुद्ध, कल्कि',
    pages: [
      {
        page: 1,
        sourceHi: 'मत्स्य अवतार - दिव्य मछली',
        sourceEn: 'Matsya - The Divine Fish',
        image: imagePath.matsyaAvatar,
        contentHi: `मत्स्य अवतार - दिव्य मछली: 🐟🌊

जब एक महाप्रलय ने पूरे ब्रह्मांड को जलमग्न करने की धमकी दी, तब भगवान विष्णु ने एक विशाल सुनहरी मछली, मत्स्य का रूप धारण किया। 🐟

उन्होंने राजा मनु, सप्तऋषियों और सभी जीवित प्राणियों के बीजों को ले जाने वाली नाव को सुरक्षित स्थान पर पहुँचाया ⛵, और राक्षस हयग्रीव से पवित्र वेदों की रक्षा की। 📜✨`,
        contentEn: `Matsya - The Divine Fish:

When a massive deluge threatened to submerge the entire universe, Lord Vishnu took the form of Matsya, a giant golden fish.

He guided the ship carrying King Manu, the seven sages (Saptarishis), and the seeds of all living beings to safety, while also rescuing the sacred Vedas from the demon Hayagriva.`,
        shloka: `प्रलयपयोधिजले धृतवानसि वेदं विहितवहित्रचरित्रमखेदम्।
केशव धृतमीनशरीर जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! प्रलय के जल में मीन रूप धारण कर आपने वेदों को नौका की तरह सहज ही थामे रखा। हे ब्रह्मांड के स्वामी जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of a fish, you easily held up the Vedas like a boat in the waters of the deluge. Victory to Lord Hari, Lord of the Universe!',
        moralHi:
          'सच्चे मार्गदर्शक घोर संकट के समय भी ज्ञान और जीवन के मूल तत्वों की रक्षा करते हैं।',
        moralEn:
          'True leaders protect wisdom and the seeds of life during times of total chaos.',
      },
      {
        page: 2,
        sourceHi: 'कूर्म अवतार - दिव्य कछुआ',
        sourceEn: 'Kurma - The Cosmic Tortoise',
        image: imagePath.kurmaAvatar,
        contentHi: `कूर्म अवतार - दिव्य कछुआ: 🐢🌊

अमृत प्राप्त करने के लिए जब देवताओं और असुरों द्वारा समुद्र मंथन किया जा रहा था, तब मंदराचल पर्वत ब्रह्मांडीय महासागर में डूबने लगा। 🌊

भगवान विष्णु ने एक विशाल कछुए, कूर्म का रूप धारण किया 🐢 और पर्वत को अपनी पीठ पर सहारा दिया, जिससे मंथन सफलतापूर्वक पूरा हो सका। 🏔️✨`,
        contentEn: `Kurma - The Cosmic Tortoise:

During the Churning of the Ocean (Samudra Manthan) to obtain the nectar of immortality, Mount Mandara began to sink into the cosmic ocean.

Lord Vishnu assumed the form of Kurma, a colossal tortoise, and supported the mountain on his back, allowing the Devas and Asuras to successfully complete the churning.`,
        shloka: `क्षितिरतिविपुलतरे तिष्ठति तव पृष्ठे धरणिधरणकिणचक्रगरिष्ठे।
केशव धृतकच्छपरूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! कच्छप रूप में आपकी विशाल पीठ पर यह संपूर्ण धरा और पर्वत सुरक्षित टिके हैं। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of a tortoise, the vast earth and mountains rest safely upon your enormous back. Victory to Lord Hari!',
        moralHi:
          'बड़ी सफलताओं के लिए अत्यधिक धैर्य, स्थिरता और एक मजबूत आधार की आवश्यकता होती है।',
        moralEn:
          'Great achievements require immense patience, stability, and a solid foundation.',
      },
      {
        page: 3,
        sourceHi: 'वराह अवतार - पराक्रमी वराह',
        sourceEn: 'Varaha - The Mighty Boar',
        image: imagePath.varahaAvatar,
        contentHi: `वराह अवतार - पराक्रमी वराह: 🐗🌍

हिरण्याक्ष नामक राक्षस ने पृथ्वी (देवी भूदेवी) को चुराकर ब्रह्मांडीय महासागर की अंधकारमय गहराइयों में छुपा दिया था। 🌊

ऋषियों की प्रार्थना पर, विष्णु ने एक विशाल वराह का रूप धारण किया। 🐗 उन्होंने पाताल में जाकर राक्षस को हराया और पृथ्वी को अपने दांतों पर उठाकर पुनः उसकी कक्षा में स्थापित किया। 🌍✨`,
        contentEn: `Varaha - The Mighty Boar:

The demon Hiranyaksha dragged the Earth (Goddess Bhudevi) into the dark depths of the cosmic ocean.

Responding to the prayers of the sages, Vishnu manifested as Varaha, a fierce giant boar. He dove into the abyss, defeated the demon in a fierce battle, and lifted the Earth back to its rightful orbit upon his tusks.`,
        shloka: `वसति दशनशिखरे धरणी तव लग्ना शशिनि कलङ्ककलेव निमग्ना।
केशव धृतशूकररूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! शूकर रूप धारण करने वाले आपके दांतों की नोक पर पृथ्वी इस तरह सुशोभित है जैसे चंद्रमा पर कोई सुंदर कला हो। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of a boar, the Earth rests on the tip of your tusk, appearing beautiful like the spot on the moon. Victory to Lord Hari!',
        moralHi:
          'संकट कितना भी गहरा क्यों न हो, धर्म हमेशा उठकर संकटग्रस्तों की रक्षा करता है।',
        moralEn:
          'No matter how deep the darkness or crisis, righteousness will always rise and rescue the fallen.',
      },
      {
        page: 4,
        sourceHi: 'नृसिंह अवतार - आधा मानव, आधा सिंह',
        sourceEn: 'Narasimha - The Half-Man, Half-Lion',
        image: imagePath.narasimhaAvatar,
        contentHi: `नृसिंह अवतार - आधा मानव, आधा सिंह: 🦁⚡

हिरण्यकशिपु ने एक ऐसा वरदान प्राप्त कर लिया था जिससे उसे मारना लगभग असंभव था—न कोई मानव न पशु, न भीतर न बाहर, न दिन में न रात में। ⚡

जब उसने अपने ही पुत्र और परम भक्त प्रह्लाद को मारने की कोशिश की, तब विष्णु एक खंभे को फाड़कर नृसिंह रूप में प्रकट हुए। 🦁 वरदान की हर शर्त को पूरा करते हुए उन्होंने गोधूलि वेला में, दहलीज पर, अपने नाखूनों से अत्याचारी का वध किया। 💥✨`,
        contentEn: `Narasimha - The Half-Man, Half-Lion:

The demon king Hiranyakashipu secured a boon making him nearly impossible to kill—neither by man nor beast, neither indoors nor outdoors, neither at day nor night.

When he attempted to murder his own son, the young devotee Prahlada, Vishnu burst forth from a pillar as Narasimha. Matching every condition of the boon, he destroyed the tyrant at twilight, on the threshold, using his claws.`,
        shloka: `तव करकमलवरे नखमद्भुतशृङ्गं दलितहिरण्यकशिपुतनुभृङ्गम्।
केशव धृतनरहरिरूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! नरहरि रूप धारण करने वाले आपके कर-कमलों के अद्भुत और तीखे नाखूनों ने हिरण्यकशिपु के शरीर रूपी भौंरे को विदीर्ण कर दिया। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of a half-man, half-lion, your wondrous sharp fingernails tore apart the wasp-like body of Hiranyakashipu. Victory to Lord Hari!',
        moralHi:
          'पूर्ण विश्वास रखने वालों की दैवीय रक्षा निश्चित है, और अहंकार का पतन अवश्यंभावी है।',
        moralEn:
          'Divine protection is guaranteed to those who hold absolute faith, and pride always meets its downfall.',
      },
      {
        page: 5,
        sourceHi: 'वामन अवतार - बौना ब्राह्मण',
        sourceEn: 'Vamana - The Dwarf Scholar',
        image: imagePath.vamanaAvatar,
        contentHi: `वामन अवतार - बौना ब्राह्मण: ☂️👣

परम दानी लेकिन महत्वाकांक्षी असुर राजा बलि ने तीनों लोकों पर विजय प्राप्त कर देवताओं को निष्कासित कर दिया था। 👑

विष्णु एक युवा बौने ब्राह्मण, वामन के रूप में बलि के यज्ञ में पहुँचे और केवल तीन पग भूमि मांगी। 🌾 बलि द्वारा वचन देने पर, वामन ने विशाल रूप धारण किया—पहले पग में पृथ्वी, दूसरे में आकाश को नाप लिया और तीसरा पग बलि के सिर पर रखकर उसे सुतल लोक का राजा बना दिया। 👣✨`,
        contentEn: `Vamana - The Dwarf Scholar:

The benevolent but ambitious Demon King Bali conquered all three worlds, displacing the gods.

Vishnu approached Bali's sacrificial altar in the form of a young Brahmin dwarf, Vamana, asking for just three paces of land. When Bali granted the wish, Vamana grew to cosmic proportions—covering the earth with his first step, the heavens with his second, and placing his third step on Bali's head to bless him.`,
        shloka: `छलयसि विक्रमणे बलिमद्भुतवामन पदनखनीरजनितजनपावन।
केशव धृतवामनरूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! अद्भुत वामन रूप धारण करके आपने राजा बलि को परास्त किया, और आपके चरणों से निकली गंगा पूरे संसार को पवित्र करती है। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! As the wondrous dwarf Vamana, you trickily outsmarted King Bali, and the water flowing from your toenails (Ganga) purifies the universe. Victory to Lord Hari!',
        moralHi:
          'सच्चे दान और समर्पण के लिए अहंकार को त्यागना और सर्वोच्च भलाई के आगे झुकना आवश्यक है।',
        moralEn:
          'True charity requires overcoming pride and surrendering completely to the supreme good.',
      },
      {
        page: 6,
        sourceHi: 'परशुराम अवतार - योद्धा ऋषि',
        sourceEn: 'Parashurama - The Warrior Sage',
        image: imagePath.parashuramaAvatar,
        contentHi: `परशुराम अवतार - योद्धा ऋषि: 🪓🛡️

जब पृथ्वी के राजा और क्षत्रिय भ्रष्ट, अत्याचारी हो गए और प्रजा का शोषण करने लगे, तब विष्णु ने परशुराम के रूप में अवतार लिया। 🛡️

भगवान शिव द्वारा दिए गए एक दिव्य परशु (कुल्हाड़ी) से लैस होकर 🪓, उन्होंने सामाजिक न्याय और धर्म की पुनर्स्थापना के लिए २१ बार अत्याचारी राजाओं का अंत किया। ⚖️✨`,
        contentEn: `Parashurama - The Warrior Sage:

When the ruling kings and Kshatriyas of the world became corrupt, tyrannical, and abandoned their duties to oppress ordinary citizens, Vishnu incarnated as Parashurama.

Armed with a divine axe given by Lord Shiva, he cleansed the earth twenty-one times of corrupt rulers to restore social justice and righteousness.`,
        shloka: `क्षत्रियरुधिरमये जगदपगतपापं स्नपयसि पयसि शमितभवतापम्।
केशव धृतभृगुपतिरूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! भृगुपति रूप धारण करने वाले आपने भ्रष्ट शासकों के पापों से पृथ्वी को मुक्त कर संसार के ताप को शांत किया। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of the Lord of Bhrigu race (Parashurama), you rid the world of the sins of corrupt rulers to calm the misery of the earth. Victory to Lord Hari!',
        moralHi:
          'बिना जवाबदेही और धर्म के शक्ति पूर्णतः भ्रष्ट हो जाती है, जिसका दमन होना आवश्यक है।',
        moralEn:
          'Power without accountability and righteousness corrupts absolutely and must be checked.',
      },
      {
        page: 7,
        sourceHi: 'राम अवतार - मर्यादा पुरुषोत्तम',
        sourceEn: 'Rama - The Ideal Human',
        image: imagePath.ramaAvatar,
        contentHi: `राम अवतार - मर्यादा पुरुषोत्तम: 🏹👑

अयोध्या के राजकुमार के रूप में जन्मे, भगवान राम ने कर्तव्य, सम्मान और सदाचार (मर्यादा) के शिखर का उदाहरण प्रस्तुत किया। 👑

उन्होंने अपने पिता के वचनों को निभाने के लिए १४ वर्ष का वनवास स्वीकार किया 🌿, और अपने भाई लक्ष्मण और हनुमान की सेना के साथ मिलकर राक्षसराज रावण को हराकर माता सीता को मुक्त कराया। 🏹✨`,
        contentEn: `Rama - The Ideal Human:

Born as the prince of Ayodhya, Lord Rama exemplified the pinnacle of duty, honor, and virtue (Maryada).

He accepted fourteen years of exile to honor his father's word, and alongside his devoted brother Lakshmana and monkey general Hanuman, built a bridge across the ocean to defeat the demon king Ravana and rescue his wife, Sita.`,
        shloka: `वितरसि दिक्षु रणे दिक्पतिकमनीयं दशमुखमौलिबलिं रमणीयम्।
केशव धृतरामशरीर जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! राम रूप धारण करने वाले आपने युद्ध में दस सिर वाले रावण के शीशों की आहुति देकर अधर्म का नाश किया। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of Rama, you offered the heads of the ten-headed Ravana as a beautiful sacrifice in battle. Victory to Lord Hari!',
        moralHi:
          'धर्म का अर्थ है भारी व्यक्तिगत त्याग के बावजूद अपने कर्तव्य और नैतिक सत्य पर अडिग रहना।',
        moralEn:
          "Righteousness means upholding one's duty and moral integrity, even in the face of profound personal sacrifice.",
      },
      {
        page: 8,
        sourceHi: 'कृष्ण अवतार - लीलाधर',
        sourceEn: 'Krishna - The Divine Statesman',
        image: imagePath.krishnaAvatar,
        contentHi: `कृष्ण अवतार - लीलाधर: 🦚🛞

अत्याचारी कंस का अंत करने के लिए कारागार में जन्मे, भगवान कृष्ण वृंदावन के प्रिय ग्वाले के रूप में पले-बढ़े और बाद में एक महान कूटनीतिज्ञ बने। 🦚

महाभारत के युद्ध में उन्होंने अर्जुन के सारथी बनकर रणभूमि में भगवद्गीता का कालजयी ज्ञान दिया और मानवता को निष्काम कर्म का पाठ पढ़ाया। 🛞✨`,
        contentEn: `Krishna - The Divine Statesman:

Born in a prison cell to defeat the tyrant Kamsa, Lord Krishna grew up as the beloved cowherd of Vrindavan before becoming a master statesman.

In the epic Mahabharata war, he served as the charioteer to Arjuna, delivering the timeless wisdom of the Bhagavad Gita on the battlefield to teach humanity how to live selflessly.`,
        shloka: `वहसि वपुषि विशदे वसनं जलदाभं वरतरुणार्करुचिं रुधिरराभम्।
केशव धृतहलधररूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! ब्रह्मांड के मार्गदर्शक कृष्ण रूप में आप दिव्य कांति से चमकते हैं और संसार से अंधकार का नाश करते हैं। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In your brilliant divine forms as the guide of the universe, you radiate cosmic light and destroy evil. Victory to Lord Hari!',
        moralHi:
          'कर्म करो और फल की चिंता में अपनी मानसिक शांति को नष्ट मत करो—निष्काम कर्म ही सर्वोपरि है।',
        moralEn:
          'Focus strictly on performing your righteous duty without clinging to the anxiety of the results.',
      },
      {
        page: 9,
        sourceHi: 'बुद्ध अवतार - शांत मुनि',
        sourceEn: 'Buddha - The Enlightened Sage',
        image: imagePath.buddhaAvatar,
        contentHi: `बुद्ध अवतार - शांत मुनि: 🧘‍♂️🕊️

अपने राजसी वैभव और महलों का त्याग कर, सिद्धार्थ गौतम ने मानव दुख के मूल कारण की खोज की। 👑

बोधि वृक्ष के नीचे ज्ञान प्राप्त कर वे बुद्ध कहलाए। 🌳 उन्होंने अहिंसा, करुणा और ध्यान की शिक्षाओं का प्रसार किया 🕊️, और मानवता को रूढ़िवादी कर्मकांडों से दूर ले जाकर आंतरिक शांति का मार्ग दिखाया। 🧘‍♂️✨`,
        contentEn: `Buddha - The Enlightened Sage:

Renouncing his royal palace and inheritance, Siddhartha Gautama sought the root cause of human suffering.

Attaining enlightenment under the Bodhi tree, he became the Buddha. He spread the teachings of Ahimsa (non-violence), deep compassion, and mindfulness, guiding humanity away from blind rituals toward inner peace.`,
        shloka: `निन्दसि यज्ञविधेरहह श्रुतिजातं सदयहृदयदर्शितपशुघातम्।
केशव धृतबुद्धशरीर जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! परम दयालु बुद्ध रूप धारण करके आपने धार्मिक अनुष्ठानों के नाम पर होने वाली क्रूर पशुबलि का विरोध किया। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of the compassionate Buddha, you spoke against the cruel animal sacrifices performed under the pretext of rituals. Victory to Lord Hari!',
        moralHi:
          'महानता किसी को ठेस न पहुँचाने, दया भाव रखने और अपने मन को शुद्ध करने में है।',
        moralEn:
          'True spirituality lies in non-violence, kindness, and purifying your own mind.',
      },
      {
        page: 10,
        sourceHi: 'कल्कि अवतार - भविष्य के रक्षक',
        sourceEn: 'Kalki - The Deliverer of the Future',
        image: imagePath.kalkiAvatar,
        contentHi: `कल्कि अवतार - भविष्य के रक्षक: 🐎⚔️

कलयुग (नैतिक पतन के वर्तमान युग) के अंतिम चरण में प्रकट होने के लिए भविष्यद्वाणी किए गए, भगवान विष्णु कल्कि के रूप में अवतरित होंगे। ⚡

देवदत्त नामक एक भव्य श्वेत घोड़े पर सवार होकर 🐎 और चमकती हुई तलवार लेकर ⚔️, वे भ्रष्टाचार और बुराई का समूल नाश करेंगे और सत्ययुग की शुरुआत करेंगे। 🌅✨`,
        contentEn: `Kalki - The Deliverer of the Future:

Prophesied to appear at the absolute end of Kali Yuga—the current dark age of moral decay—Lord Vishnu will incarnate as Kalki.

Riding a magnificent white horse named Devadatta and wielding a blazing sword of light, he will eradicate deep-rooted corruption and evil to usher in a new golden age of truth (Satya Yuga).`,
        shloka: `म्लेच्छनिवहनिधने कलयसि करवालं धूमकेतुमिव किमपि करालम्।
केशव धृतकल्किशरीर जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! भविष्य के कल्कि रूप में आप अधर्म का नाश करने के लिए धूमकेतु की तरह चमकती हुई भयानक तलवार धारण करेंगे। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the future form of Kalki, you will brandish a terrifying sword like a blazing comet to clear the world of evil. Victory to Lord Hari!',
        moralHi:
          'समय कितना भी अंधकारमय या भ्रष्ट क्यों न हो जाए, अंततः न्याय और सत्य की ही जीत होती है।',
        moralEn:
          'No matter how dark or corrupt the times become, justice and cosmic order will ultimately prevail.',
      },
    ],
  },
  {
    id: 'TextBook_GaneshaBirth',
    type: 'text',
    titleEn: "Lord Ganesha's Divine Birth",
    titleHi: 'भगवान श्री गणेश का पावन प्राकट्य',
    subtitleEn: 'The Story of Devotion, Cosmic Leela & Prathama Pujya',
    subtitleHi: 'मातृभक्ति, दिव्य लीला और प्रथम पूज्य बनने की पावन कथा',
    descriptionEn:
      'Discover the authentic scriptural account of Lord Ganesha’s birth from the Shiva Purana: from Goddess Parvati’s divine creation to Lord Shiva’s blessing of eternal worship as Vighnaharta.',
    descriptionHi:
      'शिव पुराण के अनुसार भगवान श्री गणेश के प्राकट्य की प्रमाणिक कथा: जगदम्बा पार्वती द्वारा बालक का सृजन, द्वार पर अडिग मातृभक्ति, गजमुख का प्रतिष्ठापन और प्रथम पूज्य विघ्नहर्ता बनने का दिव्य वरदान।',
    categoryEn: 'Sacred Legends',
    categoryHi: 'पौराणिक गाथाएं',
    image: imagePath.rebirthOfGanesha,
    readingTimeMin: 15,
    sourceEn: 'Shiva Purana (Rudra Samhita, Kumara Khanda)',
    sourceHi: 'शिव पुराण (रुद्र संहिता, कुमार खण्ड)',
    keywords:
      'ganesha, ganesh, ganapati, shiva, parvati, kailash, birth of ganesha, shiva purana, vighnaharta, prathama pujya, गणेश, गणपति, शिव, पार्वती, कैलाश, गणेश जन्म, शिव पुराण, प्रथम पूज्य, विघ्नहर्ता',
    pages: [
      {
        page: 1,
        sourceHi: 'माता पार्वती द्वारा बालक का सृजन',
        sourceEn: 'Creation of the Boy by Mother Parvati',
        image: imagePath.ganeshJanani,
        contentHi: `माता पार्वती द्वारा बालक का सृजन: 🪷✨

कैलाश पर्वत के दिव्य प्रांगण में, एक दिन जगदम्बा माता पार्वती स्नान की तैयारी कर रही थीं। उन्होंने विचार किया कि नंदी और अन्य सभी गण भगवान शिव के ही आज्ञाकारी हैं, उनका अपना कोई ऐसा निजी सेवक नहीं है जो केवल उनकी आज्ञा का पालन करे। 🏔️

माता ने अपने शरीर के दिव्य चंदन और हल्दी के उबटन से एक अत्यंत सुंदर, तेजस्वी और सुडौल बालक की मूर्ति बनाई। 🌿

अपनी दिव्य शक्ति और वात्सल्य से उन्होंने उस बालक में प्राणों का संचार किया (प्राण-प्रतिष्ठा)। पल भर में वह सुंदर बालक जीवित हो उठा और उसने हाथ जोड़कर माता को प्रणाम किया। 🙏

बालक ने स्नेहपूर्वक पूछा:

"हे माता! मेरे लिए क्या आज्ञा है? मैं आपकी सेवा में क्या करूँ?" 🌸

माता पार्वती ने प्रेम से उसे गले लगाया, एक मजबूत छड़ी (दण्ड) उसके हाथ में दी और कहा:

"पुत्र! तुम मेरे द्वारपाल हो। जब तक मैं भीतर स्नान कर रही हूँ, मेरी आज्ञा के बिना किसी भी व्यक्ति को भीतर प्रवेश मत करने देना।" 🛡️✨`,
        contentEn: `Creation of the Boy by Mother Parvati:

Upon the sacred heights of Mount Kailash, Goddess Parvati was preparing to take her bath. She reflected that Nandi and all the ganas were followers of Lord Shiva, and she had no personal attendant devoted solely to her commands.

From the divine sandalwood and turmeric paste of her own body, Mother Parvati lovingly fashioned the form of a radiant, handsome boy.

Infusing him with her divine life-force (Prana-Pratishtha), the boy came to life and bowed with folded hands before his mother.

The young boy asked with pure devotion:

"O Mother! What is your command for me? How may I serve you?"

Mother Parvati embraced him tenderly, handed him a staff, and gave her clear instruction:

"My son, you are the guardian of my threshold. While I bathe within, do not permit anyone to enter without my permission."`,
        shloka: `वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥`,
        shlokaTranslationHi:
          'हे वक्र सूंड वाले, विशालकाय, करोड़ों सूर्यों के समान दिव्य कांति वाले प्रभु श्री गणेश! कृपा कर मेरे समस्त कार्यों को सदा विघ्नों से रहित बनाएं।',
        shlokaTranslationEn:
          'O Lord with the curved trunk and immense radiant form, brilliant as millions of suns, please remove all obstacles from all my endeavors forever.',
        moralHi:
          'सच्चे पुत्र और सेवक का पहला धर्म माता-पिता की आज्ञा और विश्वास का निष्ठापूर्वक पालन करना है।',
        moralEn:
          'True devotion begins with unwavering loyalty and fulfilling the sacred trust placed in you.',
      },
      {
        page: 2,
        sourceHi: 'द्वार पर अडिग निष्ठा और शिव-गणों का आगमन',
        sourceEn: 'Unwavering Duty at the Gateway',
        image: imagePath.shivaParvatiGanesha,
        contentHi: `द्वार पर अडिग निष्ठा और शिव-गणों का आगमन: ⚡🛡️

बालक अपने हाथ में दण्ड लेकर माता के भवन के द्वार पर पूरी सतर्कता से पहरा देने लगा। तभी देवाधिदेव महादेव भगवान शिव वहाँ पधारे। 🔱

जैसे ही भगवान शिव भीतर जाने लगे, बालक ने अपना दण्ड आगे बढ़ाकर उन्हें रोक दिया। बालक भगवान शिव के वास्तविक स्वरूप से अनभिज्ञ था। ✋

बालक ने अत्यंत दृढ़ता और नम्रता से कहा:

"रुक जाइए! आप भीतर नहीं जा सकते। मेरी माता स्नान कर रही हैं और उनकी आज्ञा के बिना किसी का भी अंदर जाना वर्जित है।" 🛑

भगवान शिव ने मुस्कुराकर कहा:

"हे बालक! तुम नहीं जानते कि मैं कौन हूँ। मैं पार्वती का पति शिव हूँ और यह मेरा ही निवास है।" 🏔️

परंतु बालक अपनी माता की आज्ञा पर अडिग रहा:

"आप चाहे कोई भी हों, जब तक मेरी माता की अनुमति नहीं होगी, मैं आपको भीतर प्रवेश नहीं करने दूंगा।" 🛡️

भगवान शिव ने अपने गणों—नंदी, भृंगी और अन्य वीरों को बालक को समझाने भेजा। परंतु बालक ने अकेले ही सभी शिव-गणों के अहंकार को परास्त कर दिया और द्वार से एक पग भी पीछे नहीं हटा। ⚔️💥`,
        contentEn: `Unwavering Duty at the Gateway:

Standing vigilantly at the entrance with his staff, the dutiful boy guarded the threshold. Soon, Lord Shiva arrived at the entrance of the abode.

As Shiva proceeded to enter, the boy stepped forward and raised his staff, barring the way. Unaware of Shiva's identity, the boy stood firm.

The boy spoke with resolute discipline:

"Halt! You cannot enter. My mother is bathing, and by her strict command, no one may pass through this door."

Lord Shiva smiled calmly and said:

"Dear boy, do you not know who I am? I am Shiva, Parvati's consort, and this is my own home."

Yet the boy remained steadfast to his mother's word:

"Whoever you may be, without my mother's permission, I shall not allow anyone inside."

Shiva sent his trusted ganas—Nandi, Bhringi, and the warriors—to persuade the boy. But with miraculous valor, the lone boy held the threshold and pushed back all who challenged his duty.`,
        shloka: `एकदन्तं महाकायं तप्तकाञ्चनसन्निभम्।
लम्बोदरं विशालाक्षं वन्देऽहं गणनायकम्॥`,
        shlokaTranslationHi:
          'एक दांत वाले, विशाल शरीर वाले, तपे हुए सुवर्ण के समान कांतिमान, लम्बोदर और विशाल नेत्रों वाले गणों के नायक को मैं प्रणाम करता हूँ।',
        shlokaTranslationEn:
          'I bow to the single-tusked, magnificent Lord who shines like molten gold, with large compassionate eyes, the Supreme Commander of all Ganas.',
        moralHi:
          'कर्तव्य और उत्तरदायित्व का पालन किसी भी परिस्थिति या प्रलोभन में डगमगाना नहीं चाहिए।',
        moralEn:
          'True integrity means standing firm in your righteous duty, regardless of who stands before you.',
      },
      {
        page: 3,
        sourceHi: 'दिव्य महायुद्ध और माता पार्वती का महाक्रोध',
        sourceEn: "The Cosmic Confrontation & Parvati's Wrath",
        image: imagePath.rebirthOfGanesha,
        contentHi: `दिव्य महायुद्ध और माता पार्वती का महाक्रोध: 🌩️⚡

जब गणों द्वारा बालक को नहीं हटाया जा सका, तो देवताओं और बालक के बीच भीषण संघर्ष छिड़ गया। बालक आदि-शक्ति का ही अंश था, अतः उसे कोई भी साधारण शक्ति परास्त नहीं कर सकी। 🏹

उसी समय, एक परम अलौकिक और गूढ़ लीला के अंतर्गत, भगवान शिव के त्रिशूल से बालक का मस्तक धड़ से अलग हो गया। ⚡🥀

जब माता पार्वती स्नान समाप्त कर बाहर आईं, तो उन्होंने अपने प्यारे बालक को निष्प्राण भूमि पर पड़ा देखा। अपने पुत्र की यह दशा देखकर माता का हृदय हाहाकार कर उठा। 💔

उनका वात्सल्य महाक्रोध में परिवर्तित हो गया। माता पार्वती ने अपना आदि-शक्ति दुर्गा-काली का संहारक रूप धारण कर लिया। 🔱🔥

क्रोधित माता ने गर्जना की:

"जिस संसार में मेरे निष्पाप पुत्र की रक्षा नहीं हो सकी, उस सृष्टि का विनाश ही अब निश्चित है!" 🌩️

माता के क्रोध की अग्नि से तीनों लोक कांपने लगे। सूर्य का तेज मंद पड़ने लगा और प्रकृति स्तब्ध हो गई। 🌌 भयभीत होकर भगवान ब्रह्मा, भगवान विष्णु और सभी देवगण माता के चरणों में गिर पड़े और उनकी स्तुति कर उन्हें शांत करने लगे। 🙏

माता पार्वती ने आंसुओं से भरी आँखों से कहा:

"यदि मेरा पुत्र जीवित हो जाए और उसे देवताओं में सर्वोच्च सम्मान प्राप्त हो, तभी यह ब्रह्मांड सुरक्षित रह सकता है!" 👑`,
        contentEn: `The Cosmic Confrontation & Parvati's Wrath:

As the confrontation escalated, neither the army of ganas nor heavenly beings could overcome the boy, who was imbued with the invincible power of Adi Shakti.

In a climactic moment of cosmic destiny, Shiva released his divine Trishula, and the boy's head was severed from his body.

When Goddess Parvati emerged from her chambers and saw her beloved son lifeless on the ground, she was overwhelmed with immense grief.

Her grief instantly transformed into cosmic fury. Assuming her primordial form as Adi Shakti, she prepared to dissolve the entire universe.

The enraged Mother declared:

"If my innocent child cannot be protected, then this creation shall exist no longer!"

The three worlds trembled at her anger, and the cosmos teetered on the brink of dissolution. In terror, Brahma, Vishnu, and all the devas bowed at her feet, singing hymns to pacify the Supreme Mother.

With tearful determination, Mother Parvati stated her terms:

"Only if my son is restored to life and granted the highest honor among all gods will the universe be spared!"`,
        shloka: `प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्।
भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥`,
        shlokaTranslationHi:
          'माता गौरी के पुत्र, भक्तों के आश्रयदाता भगवान विनायक को सिर झुकाकर प्रणाम करें। दीर्घायु, उत्तम स्वास्थ्य, धर्म, अर्थ और काम की सिद्धि के लिए उनका नित्य स्मरण करें।',
        shlokaTranslationEn:
          'Bowing head with deepest reverence to Vinayaka, the divine son of Gauri, let one remember him daily to attain longevity, prosperity, and fulfillment of all noble desires.',
        moralHi:
          'मातृ-स्नेह संसार की सबसे प्रबल शक्ति है, जो ब्रह्मांड के नियमों को भी परिवर्तित करने का सामर्थ्य रखती है।',
        moralEn:
          'A mother’s love is the most powerful cosmic force, capable of shifting the balance of the entire universe.',
      },
      {
        page: 4,
        sourceHi: "गजमुख का प्रतिष्ठापन एवं 'गणपति' नामकरण",
        sourceEn: 'The Elephant Head & The Bestowal of Ganapati',
        image: imagePath.rebirthOfGanesha,
        contentHi: `गजमुख का प्रतिष्ठापन एवं 'गणपति' नामकरण: 🐘✨

माता पार्वती के वचनों को सुनकर, देवाधिदेव महादेव शिव ने तुरंत देवताओं को आदेश दिया: 🔱

"उत्तर दिशा की ओर प्रस्थान करो। जो भी पहला जीव मिले जिसका मुख उत्तर की ओर हो, उसका शीश आदरपूर्वक ले आओ।" 🧭

देवता उत्तर दिशा में गए, जहाँ उन्हें एक दिव्य, तेजस्वी हाथी (गज) मिला। देवताओं ने उस दिव्य गज का मस्तक प्राप्त किया और कैलाश लौट आए। 🐘

भगवान शिव ने उस दिव्य गजमुख को बालक के धड़ पर स्थापित किया। 💫

महादेव ने वेद-मंत्रों का उच्चारण करते हुए उस पर पवित्र जल छिड़का। तत्क्षण बालक की देह में चेतना लौट आई! वह तेजस्वी बालक दिव्य गजमुख रूप में मुस्कुराता हुआ उठ बैठा। 🪷

माता पार्वती ने भाव-विभोर होकर अपने पुत्र को छाती से लगा लिया और उनका हृदय परमानंद से भर गया। 💖

भगवान शिव ने बालक के शीश पर हाथ रखकर आशीष दिया और उद्घोष किया:

"आज से तुम मेरे समस्त गणों के अधिपति और स्वामी होगे। इसलिए आज से तुम्हारा नाम 'गणपति' और 'गणेश' होगा!" 👑🕉️`,
        contentEn: `The Elephant Head & The Bestowal of Ganapati:

Hearing Mother Parvati's decree, Lord Shiva immediately commanded the celestial attendants:

"Travel toward the north, the direction of wisdom and purity. Bring forth the head of the first living creature facing north."

The devas journeyed north and encountered a majestic, serene elephant. With divine consent, they brought the noble elephant head back to Kailash.

Lord Shiva gently placed the elephant head onto the boy's shoulders.

Chanting sacred Vedic mantras, Shiva sprinkled holy water upon the form. Instantly, life breathed back into the body! The radiant boy arose with a gentle, wise elephant face, smiling divinely.

Overjoyed with bliss, Mother Parvati embraced her revived child to her heart.

Lord Shiva placed his hand upon the boy's head and proclaimed to all the worlds:

"From this day forth, you shall be the commander and supreme master of all my ganas. Thus, your eternal names shall be 'Ganapati' and 'Ganesha'!"`,
        shloka: `सर्वपूज्यः पुरोभाव्यो गणनाथो भविष्यति।
सर्वेषां कर्मणां चादौ पूज्योऽयं विघ्ननाशकः॥`,
        shlokaTranslationHi:
          'शिव पुराण के अनुसार महादेव ने वरदान दिया: यह मेरा पुत्र सभी में सबसे पहले पूजनीय होगा और समस्त गणों का स्वामी कहलाएगा। किसी भी कार्य के आरंभ में इसकी पूजा से सभी विघ्नों का नाश होगा।',
        shlokaTranslationEn:
          'According to Shiva Purana, Lord Shiva granted the boon: He shall be the first to be worshipped before all others, the Lord of all Ganas. Honoring him at the start of any work shall banish all obstacles.',
        moralHi:
          'सच्ची महानता और सौंदर्य बाहरी स्वरूप में नहीं, बल्कि मन की विशालता, ज्ञान और संयम में निहित है।',
        moralEn:
          'True nobility is not found in outward appearance, but in wisdom, vast intellect, and compassion.',
      },
      {
        page: 5,
        sourceHi: 'प्रथम पूज्य एवं विघ्नहर्ता का वरदान',
        sourceEn: 'The Boon of Prathama Pujya & Vighnaharta',
        image: imagePath.ganeshaBlessing,
        contentHi: `प्रथम पूज्य एवं विघ्नहर्ता का वरदान: 🪔👑

भगवान गणेश के पुनर्जीवन पर संपूर्ण कैलाश और तीनों लोकों में उत्सव मनाया जाने लगा। आकाश से देवताओं ने पुष्पों की वर्षा की। 🌸✨

भगवान ब्रह्मा, भगवान विष्णु और भगवान शिव ने मिलकर गणपति को दिव्य वरदानों से विभूषित किया: 🌟

भगवान विष्णु ने कहा:

"हे गणेश! तुम बुद्धि, विवेक और रिद्धि-सिद्धि के स्वामी होगे।" 📜

भगवान शिव ने सर्वोच्च वरदान दिया:

"तीनों लोकों में कोई भी शुभ कार्य—चाहे वह विवाह हो, गृह-प्रवेश हो, यज्ञ हो या कोई नया उद्यम—जब तक सर्वप्रथम श्री गणेश का स्मरण और पूजन नहीं होगा, तब तक वह कार्य निर्विघ्न संपन्न नहीं हो सकेगा!" 🪔🙏

माता पार्वती ने उन्हें 'विघ्नहर्ता' की पदवी दी—जो भी श्रद्धा से भगवान गणेश का ध्यान करेगा, उसके समस्त संकट और बाधाएं दूर हो जाएंगी। 🛡️

देवताओं ने उन्हें मोदक का भोग लगाया और मूषक (चूहे) को उनका प्रिय वाहन बनाया गया। 🐁🥮

तभी से भगवान श्री गणेश 'प्रथम पूज्य' और 'विघ्नहर्ता' के रूप में प्रत्येक भारतीय घर, मंदिर और आराधना में सबसे पहले पूजे जाते हैं। बोलो गणपति बप्पा मोरया! 🕉️🚩`,
        contentEn: `The Boon of Prathama Pujya & Vighnaharta:

The rebirth of Lord Ganesha was celebrated across all three realms. Heavenly drums resounded, and celestial flowers showered from the skies upon Mount Kailash.

The holy Trinity—Brahma, Vishnu, and Shiva—stepped forward to bestow supreme cosmic boons upon Ganapati:

Lord Vishnu granted:

"O Ganesha, you shall be the master of intellect, discernment, and the embodiments of prosperity, Riddhi and Siddhi."

Lord Shiva conferred the highest decree:

"In all the three worlds, no sacred ceremony, marriage, new enterprise, or spiritual ritual shall commence without first offering worship to Ganesha. Without your invocation, no undertaking shall bear complete fruit!"

Mother Parvati blessed him as 'Vighnaharta'—the eternal remover of every hurdle and fear for all sincere souls.

The deities offered him delicious modakas, and the humble mouse (Mushaka) became his chosen vehicle, symbolizing control over worldly desires.

Ever since that sacred day, Lord Ganesha has been revered as 'Prathama Pujya'—worshipped first across every home and altar across the universe. Hail Ganapati Bappa Morya!`,
        shloka: `अगजानन पद्मार्कं गजाननमहर्निशम्।
अनेकदन्तं भक्तानामेकदन्तमुपास्महे॥`,
        shlokaTranslationHi:
          'जो पार्वती जी के मुख-कमल को विकसित करने के लिए सूर्य के समान हैं, जो हाथी के मुख वाले हैं, और जो अपने भक्तों के लिए अनेक वरदान देने वाले एकदन्त हैं—हम उन भगवान गणेश की दिन-रात उपासना करते हैं।',
        shlokaTranslationEn:
          'Just as the morning sun awakens the lotus, he brings joy to Mother Parvati’s face. To the elephant-faced Lord who grants countless blessings to his devotees, we meditate upon him day and night.',
        moralHi:
          'विनम्रता, माता-पिता का आदर और बुद्धि का सदुपयोग करने वाले को संसार में सर्वोच्च स्थान और सम्मान प्राप्त होता है।',
        moralEn:
          'Those who honor their parents with humility and apply their intellect selflessly achieve the highest respect in the world.',
      },
    ],
  },
  {
    id: 'TextBook_PrahladaNarasimha',
    type: 'text',
    titleEn: 'Bhakt Prahlada and Lord Narasimha',
    titleHi: 'परम भक्त प्रह्लाद और भगवान नृसिंह',
    subtitleEn: 'Unshakable Faith and Divine Protection',
    subtitleHi: 'अटूट भक्ति और अधर्म के संहार की अमर गाथा',
    descriptionEn:
      'The timeless Vedic narrative from Srimad Bhagavata Mahapurana: Young Prahlada’s steadfast devotion to Lord Narayana, the downfall of tyrant Hiranyakashipu, and the miraculous manifestation of Lord Narasimha.',
    descriptionHi:
      'श्रीमद्भागवत महापुराण से भक्त प्रह्लाद की पावन कथा: दैत्यराज हिरण्यकशिपु के अत्याचार, होलिका दहन, खंभे से भगवान नृसिंह का प्राकट्य और अधर्म का समूल विनाश।',
    categoryEn: 'Bhagavata Purana',
    categoryHi: 'श्रीमद्भागवत कथा',
    image: imagePath.narasimhaSlaying,
    readingTimeMin: 18,
    sourceEn: 'Srimad Bhagavata Mahapurana (Canto 7) & Vishnu Purana',
    sourceHi: 'श्रीमद्भागवत महापुराण (सप्तम स्कन्ध) एवं विष्णु पुराण',
    keywords:
      'prahlada, narasimha, hiranyakashipu, holika, vishnu, narayana, bhagavata purana, narsingh, प्रह्लाद, नृसिंह, हिरण्यकशिपु, होलिका, भागवत',
    pages: [
      {
        page: 1,
        sourceHi: 'हिरण्यकशिपु का वरदान और प्रह्लाद का जन्म',
        sourceEn: "Hiranyakashipu's Boon & Prahlada's Birth",
        image: imagePath.prahladaDevotion,
        contentHi: `हिरण्यकशिपु का वरदान और प्रह्लाद का जन्म: 🧘‍♂️✨

दैत्यराज हिरण्यकशिपु अपने भाई हिरण्याक्ष के वध का प्रतिशोध लेने के लिए मंदराचल पर्वत पर घोर तपस्या में लीन हो गया। उसकी कठिन तपस्या से प्रसन्न होकर सृष्टि के रचयिता भगवान ब्रह्मा प्रकट हुए। 🌟

हिरण्यकशिपु ने अमरता की इच्छा से एक अत्यंत जटिल वरदान मांगा:

"हे प्रभु! न मैं दिन में मरूँ, न रात में। न घर के भीतर मरूँ, न बाहर। न भूमि पर मरूँ, न आकाश में। न मनुष्य से मरूँ, न पशु से। और न ही किसी अस्त्र-शस्त्र से मेरी मृत्यु हो!" 🛡️

ब्रह्मा जी ने 'तथास्तु' कह दिया। इस वरदान को पाकर हिरण्यकशिपु स्वयं को अजेय समझकर तीनों लोकों पर अत्याचार करने लगा। ⚡

जब हिरण्यकशिपु तपस्या कर रहा था, तब देवर्षि नारद ने उसकी गर्भवती पत्नी कयाधु को अपने आश्रम में आश्रय दिया। 🌿 आश्रम में नारद जी नित्य भगवान श्री हरि नारायण की कथाएं सुनाते थे।

माता के गर्भ में रहते हुए ही बालक प्रह्लाद ने वह संपूर्ण ज्ञान और भगवद-भक्ति आत्मसात कर ली। जब प्रह्लाद का जन्म हुआ, तो वह बचपन से ही सांसारिक मोह त्यागकर अहर्निश भगवान विष्णु के ध्यान में लीन रहने लगा। 🙏🕉️`,
        contentEn: `Hiranyakashipu's Boon & Prahlada's Birth:

To avenge the death of his brother Hiranyaksha, the demon king Hiranyakashipu performed fierce penances upon Mount Mandara. Pleased by his austerity, Lord Brahma manifested before him.

Seeking immortality, Hiranyakashipu asked for an elaborate boon:

"Grant me that I may not die indoors or outdoors, neither by day nor by night, neither on earth nor in the sky, neither by man nor beast, nor by any weapon created by living or non-living beings!"

Lord Brahma granted the boon. Empowered with this shield, Hiranyakashipu conquered the three realms and declared himself the supreme god.

While the demon king was away, Sage Narada protected his pregnant queen Kayadhu at his hermitage. Narada chanted the divine glories of Lord Narayana daily.

Within the womb, the unborn child Prahlada absorbed the sacred wisdom and love for God. Born as a pure devotee, Prahlada spent his childhood meditating on Lord Vishnu.`,
        shloka: `श्रवणं कीर्तनं विष्णोः स्मरणं पादसेवनम्।
अर्चनं वन्दनं दास्यं सख्यमात्मनिवेदनम्॥`,
        shlokaTranslationHi:
          'श्रीमद्भागवत के अनुसार नवधा भक्ति के नौ अंग हैं: भगवान के नामों और लीलाओं का श्रवण, कीर्तन, स्मरण, चरण-सेवा, पूजन, वंदन, दास्य, सख्य और आत्म-समर्पण।',
        shlokaTranslationEn:
          'According to Srimad Bhagavatam, the nine limbs of devotion are: hearing, chanting, remembering, serving the lotus feet, worshipping, offering homage, servitude, friendship, and complete self-surrender.',
        moralHi:
          'सच्चे संस्कार और ईश्वर-भक्ति अंतःकरण से उत्पन्न होती है; अहंकार ज्ञान को नष्ट करता है जबकि विनम्र भक्ति अमर बनाती है।',
        moralEn:
          'True spiritual wisdom originates from a pure heart; ego destroys virtue, while humble devotion leads to immortality.',
      },
      {
        page: 2,
        sourceHi: 'प्रह्लाद की कठिन परीक्षा और होलिका का दहन',
        sourceEn: 'The Trials of Prahlada & The Burning of Holika',
        image: imagePath.prahladaDevotion,
        contentHi: `प्रह्लाद की कठिन परीक्षा और होलिका का दहन: 🔥🕊️

हिरण्यकशिपु ने प्रह्लाद को राजनीति और असुर-धर्म सिखाने के लिए गुरु शंड और अमर्क के पास भेजा। परंतु प्रह्लाद पाठशाला में अपने सहपाठियों को भी भगवान विष्णु की भक्ति सिखाने लगे। 📖

जब हिरण्यकशिपु ने अपने पुत्र से पूछा:

"पुत्र! तुमने अब तक क्या सर्वश्रेष्ठ सीखा?"

तो प्रह्लाद ने मुस्कुराकर उत्तर दिया:

"पिताजी! समस्त संसार के स्वामी केवल भगवान श्री हरि नारायण हैं, उनकी शरण में जाना ही जीवन का सर्वश्रेष्ठ सत्य है।" 🌸

क्रोध से पागल होकर हिरण्यकशिपु ने प्रह्लाद को मृत्युदंड देने के अनेक प्रयास किए: ⚡

उसने प्रह्लाद को ऊंचे पर्वतों से नीचे फिंकवाया, विष पिलाया, मतवाले हाथियों के पैरों तले कुचलवाने का प्रयास किया और विषैले सर्पों की कोठरी में बंद करवाया। 🐍 परन्तु प्रह्लाद के मुख से केवल "ॐ नमो भगवते वासुदेवाय" की ध्वनि निकलती रही और भगवान की कृपा से विष अमृत बन गया, सर्प पुष्पों की माला बन गए और हाथी नतमस्तक हो गए। 🪷

अंत में, हिरण्यकशिपु की बहन होलिका (जिसे अग्नि से न जलने का दिव्य वस्त्र प्राप्त था) प्रह्लाद को गोद में लेकर धधकती चिता में बैठ गई। 💥

परंतु ईश्वर का चमत्कार हुआ! तेज पवन के झोंके से वह सुरक्षा वस्त्र होलिका के शरीर से उड़कर बालक प्रह्लाद पर आ गया। 🌪️ अधर्मी होलिका चिता में भस्म हो गई, और भक्त प्रह्लाद अग्नि के बीच से बिना किसी आंच के मुस्कुराते हुए सकुशल बाहर निकल आए। 🕊️✨`,
        contentEn: `The Trials of Prahlada & The Burning of Holika:

Hiranyakashipu sent Prahlada to the teachers Shanda and Amarka to learn demonic statecraft. Instead, Prahlada began teaching his classmates pure devotion to Lord Vishnu.

When Hiranyakashipu asked:

"My son, what is the best thing you have learned?"

Prahlada replied with calm devotion:

"Father! Lord Hari alone is the eternal refuge and master of this entire creation. Surrendering unto Him is the highest truth."

Infuriated, Hiranyakashipu ordered horrific punishments for his own child:

He threw Prahlada off towering cliffs, fed him deadly poison, had him trampled by mad rogue elephants, and locked him in pits filled with venomous serpents. Yet through unwavering faith in Narayana, the poison turned to sweet nectar, serpents coiled harmlessly, and elephants bowed in reverence.

Finally, Hiranyakashipu's sister Holika—who possessed a divine shawl granting immunity to fire—sat upon a blazing pyre with Prahlada on her lap.

Through divine providence, a sudden gust of wind swept the protective shawl off Holika and enveloped Prahlada. Wicked Holika was reduced to ashes, while Prahlada emerged unharmed from the roaring flames.`,
        shloka: `मा शुचः संपदं दैवीमभिजातोऽसि पाण्डव।
अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते॥`,
        shlokaTranslationHi:
          'भगवान श्रीकृष्ण कहते हैं: जो अनन्य भाव से मेरा स्मरण और भजन करते हैं, उनके योग और क्षेम (सुरक्षा और भलाई) का दायित्व मैं स्वयं वहन करता हूँ।',
        shlokaTranslationEn:
          'Lord Krishna declares: To those who constantly meditate upon Me with undistracted devotion, I personally provide what they need and protect what they possess.',
        moralHi:
          'दूसरों का अहित करने के लिए प्रयोग की गई शक्तियां स्वयं का विनाश करती हैं; ईश्वर अपने निष्काम भक्तों की रक्षा सदैव करते हैं।',
        moralEn:
          'Power misused to harm innocents invariably destroys the perpetrator; divine grace eternally protects the righteous.',
      },
      {
        page: 3,
        sourceHi: 'खंभे से भगवान नृसिंह का प्राकट्य',
        sourceEn: 'Manifestation of Lord Narasimha From The Pillar',
        image: imagePath.hiranyakashipuPillar,
        contentHi: `खंभे से भगवान नृसिंह का प्राकट्य: 🦁⚡

होलिका के अंत के बाद, हिरण्यकशिपु का धैर्य टूट गया। उसने प्रह्लाद को अपनी राजसभा में बुलाया और अपनी तलवार खींचकर गर्जना की: 🗡️

"अधम बालक! तू किसके बल पर मेरे सामने सिर उठाकर बात करता है? कहाँ है तेरा वह विष्णु?"

प्रह्लाद ने हाथ जोड़कर शांत स्वर में कहा:

"पिताजी! वे केवल मेरे ही नहीं, आपके और संपूर्ण ब्रह्मांड के स्वामी हैं। वे सर्वव्यापी हैं, जल, थल, अग्नि और वायु के कण-कण में विद्यमान हैं।" 🌌

हिरण्यकशिपु ने राजसभा के एक विशाल पाषाण-स्तंभ (खंभे) की ओर संकेत करते हुए उपहास उड़ाया:

"क्या तेरा विष्णु इस खंभे में भी है? यदि वह इसमें नहीं है, तो आज मैं स्वयं तेरी गर्दन धड़ से अलग कर दूंगा!" 💥

प्रह्लाद ने अविचल विश्वास से कहा:

"हाँ पिताजी, मेरे प्रभु इस खंभे में भी पूर्ण सत्य के साथ उपस्थित हैं।" 🙏

क्रोध में अंधे होकर हिरण्यकशिपु ने अपनी भारी गदा से उस पत्थर के खंभे पर भीषण प्रहार किया। 🛞

तत्क्षण एक ऐसा भयंकर प्रलयंकारी नाद गूंजा जिससे संपूर्ण ब्रह्मांड दहल उठा! वह विशाल पाषाण खंभा बीच से फट गया, और उसमें से भगवान नृसिंह का अलौकिक रूप प्रकट हुआ! 🦁⚡

उनका शरीर मानव का था और मुख तथा पंजे एक अत्यंत तेजस्वी, गर्जना करते हुए सिंह के समान थे। उनकी आँखें प्रज्वलित अग्नि के समान चमक रही थीं और उनके दिव्य तेज से सभा में उपस्थित सभी दैत्य थर-थर कांपने लगे! 🌟🔱`,
        contentEn: `Manifestation of Lord Narasimha From The Pillar:

Following Holika's demise, Hiranyakashipu's fury reached its zenith. Summoning Prahlada to the royal assembly, the tyrant drew his sword and roared:

"Insolent boy! By whose power do you defy me? Where is your Vishnu hiding?"

Prahlada replied with serene tranquility:

"Father! He is the source of all strength—mine, yours, and the entire cosmos. He is omnipresent, dwelling in earth, water, fire, and sky."

Pointing arrogantly to a massive stone pillar, the king sneered:

"Is your Vishnu in this pillar? If he is not here, I will sever your head with my sword this very moment!"

Prahlada answered with steadfast faith:

"Yes, my father, my Lord is present within this pillar as well."

In a blinding rage, Hiranyakashipu struck the solid stone column with his heavy iron mace.

Instantly, a thunderous roar shattered the air! The stone column fractured apart, and from its core burst forth Lord Narasimha—a magnificent, terrifying manifestation, neither animal nor human, possessing the body of a man with the blazing golden head and claws of a lion!`,
        shloka: `सत्यं विधातुं निजभृत्यभाषितं व्याप्तिं च भूतेष्वखिलेषु चात्मनः।
अदृश्यतात्यद्भुतरूपमुद्वहन् स्तम्भे सभायां न मृगं न मानुषम्॥`,
        shlokaTranslationHi:
          'श्रीमद्भागवत (७.८.१७): अपने निष्ठावान सेवक प्रह्लाद के वचनों को सत्य सिद्ध करने और समस्त चराचर में अपनी सर्वव्यापकता प्रमाणित करने के लिए भगवान ने खंभे से वह अद्भुत नृसिंह रूप धारण किया जो न पूर्ण पशु था और न पूर्ण मनुष्य।',
        shlokaTranslationEn:
          'Srimad Bhagavatam (7.8.17): To prove the words of His beloved servant Prahlada and to demonstrate His omnipresence in all matter, the Supreme Lord manifested from the pillar in a wondrous form that was neither beast nor human.',
        moralHi:
          'ईश्वर सर्वव्यापी हैं; अपने सच्चे भक्त के एक-एक वचन की रक्षा करने के लिए वे पाषाण से भी प्रकट हो जाते हैं।',
        moralEn:
          'God is omnipresent; to uphold the word of a pure devotee, the Divine will shatter stone and transcend all natural bounds.',
      },
      {
        page: 4,
        sourceHi: 'अधर्म का अंत एवं वरदानों की पूर्ति',
        sourceEn: 'Destruction of the Tyrant & Fulfillment of Boons',
        image: imagePath.narasimhaSlaying,
        contentHi: `अधर्म का अंत एवं वरदानों की पूर्ति: ⚔️🌅

भगवान नृसिंह को देखकर हिरण्यकशिपु ने अपनी गदा उठाकर युद्ध करने का दुस्साहस किया। परंतु भगवान ने खेल-खेल में ही उस दैत्य को पकड़ लिया, जैसे गरुड़ किसी सर्प को पकड़ लेता है। 🦅

ब्रह्मा जी के दिए गए वरदान के एक-एक शब्द का पूर्ण सम्मान करते हुए, भगवान नृसिंह ने अत्यंत सूक्ष्म न्याय किया: ⚖️

१. न घर के भीतर, न बाहर: भगवान हिरण्यकशिपु को महल की चौखट (द्वार-देहली) पर ले आए। 🚪
२. न दिन में, न रात में: यह समय सूर्यास्त का था—गोधूलि वेला, जो न दिन था और न रात। 🌅
३. न भूमि पर, न आकाश में: भगवान ने दैत्य को उठाकर अपनी जांघों (गोद) पर लिटा लिया। 🧘‍♂️
४. न मनुष्य से, न पशु से: भगवान का स्वरूप आधा मानव और आधा सिंह (नृ-सिंह) था। 🦁
५. न किसी अस्त्र से, न शस्त्र से: भगवान ने अपने तीखे, दिव्य नखों (नाखूनों) से अत्याचारी के वक्षस्थल को विदीर्ण कर दिया। 💥

इस प्रकार ब्रह्मा जी के वरदान की मर्यादा रखते हुए, तीनों लोकों को भयभीत करने वाले महाक्रूर हिरण्यकशिपु का अंत हुआ। 🥀

आकाश से देवताओं ने दुंदुभियां बजाईं और भगवान के नृसिंह अवतार की जय-जयकार की। 🌸✨`,
        contentEn: `Destruction of the Tyrant & Fulfillment of Boons:

Seeing Lord Narasimha, Hiranyakashipu charged with his weapon, but the Lord seized him as effortlessly as Garuda captures a serpent.

With flawless cosmic precision, Lord Narasimha honored every condition of Brahma's boon:

1. Neither indoors nor outdoors: He placed the tyrant on the doorway threshold.
2. Neither by day nor by night: It was twilight, the exact transition of sunset.
3. Neither on the ground nor in the sky: He rested the demon across His divine thighs.
4. Neither by man nor beast: The Lord appeared as half-man, half-lion.
5. Neither by weapons alive or lifeless: The Lord opened the demon's chest using His sharp divine claws.

Thus, without violating a single word of Brahma's promise, the tyrant who had terrorized the cosmos met his end. The heavens showered flowers and rejoiced in the triumph of righteousness.`,
        shloka: `तव करकमलवरे नखमद्भुतशृङ्गं दलितहिरण्यकशिपुतनुभृङ्गम्।
केशव धृतनरहरिरूप जय जगदीश हरे॥`,
        shlokaTranslationHi:
          'हे केशव! हे नरहरि रूप धारण करने वाले प्रभु! आपके कर-कमलों के अद्भुत तीखे नखों ने हिरण्यकशिपु के शरीर रूपी भ्रमर को विदीर्ण कर दिया। हे जगदीश हरे, आपकी जय हो!',
        shlokaTranslationEn:
          'O Keshava! In the form of the half-man, half-lion, your wondrous sharp fingernails tore apart the wasp-like body of Hiranyakashipu. Victory to Lord Hari!',
        moralHi:
          'कोई कितना भी शक्तिशाली और चतुर क्यों न हो, धर्म और सत्य के आगे अहंकार और अधर्म का पराजय निश्चित है।',
        moralEn:
          'No matter how powerful or clever a tyrant may be, ego and unrighteousness inevitably collapse before supreme cosmic truth.',
      },
      {
        page: 5,
        sourceHi: 'प्रह्लाद की स्तुति और भगवान का परमाश्रय',
        sourceEn: "Prahlada's Prayers & Divine Refuge",
        image: imagePath.narasimhaAvatar,
        contentHi: `प्रह्लाद की स्तुति और भगवान का परमाश्रय: 💖👑

हिरण्यकशिपु के संहार के पश्चात भी भगवान नृसिंह का क्रोध शांत नहीं हो रहा था। उनकी दहाड़ से दिशाएं कांप रही थीं। भगवान ब्रह्मा, शिव, इंद्र और स्वयं माता लक्ष्मी भी उनके समीप जाने का साहस नहीं कर सके। 🌌

तब ब्रह्मा जी ने बालक प्रह्लाद से कहा:

"वत्स! तुम ही भगवान के प्रिय भक्त हो, केवल तुम्हारी भक्ति ही इस महाक्रोध को शांत कर सकती है।"

निडर और विनीत बालक प्रह्लाद ने हाथ जोड़े और भगवान नृसिंह के चरणों में साष्टांग प्रणाम किया। 🙏

बालक ने अत्यंत प्रेम और विनम्रता से स्तुति की:

"हे दीनानाथ! हे शरणागतवत्सल! आपका क्रोध शांत हो। आपके भक्तों को आपका कभी भय नहीं होता।" 🌸

अपने प्रिय भक्त के कोमल स्पर्श और प्रेमपूर्ण वचनों से भगवान नृसिंह का भयंकर रूप तत्काल परम वात्सल्य और करुणा में परिवर्तित हो गया। 💖 उन्होंने बालक प्रह्लाद को अपनी गोद में उठा लिया और अपने कमलनयनों से स्नेह बहाते हुए उसके शीश पर अपना वरद-हस्त रखा। 🪷

भगवान ने वरदान दिया:

"हे प्रह्लाद! तुम्हारी जैसी निष्काम भक्ति के कारण तुम्हारी इक्कीस पीढ़ियां तर गईं। तुम चिरकाल तक धर्मपूर्वक राज्य करोगे और अंत में मेरे परम धाम को प्राप्त होगे।" 👑🕉️

तभी से भक्त प्रह्लाद का नाम ईश्वर-भक्ति और अडिग विश्वास का अमर प्रतीक बन गया। बोलो भक्त-वत्सल भगवान नृसिंह देव की जय! 🚩✨`,
        contentEn: `Prahlada's Prayers & Divine Refuge:

Even after slaying the tyrant, Lord Narasimha’s blazing wrath did not subside. Brahma, Shiva, Indra, and even Goddess Lakshmi hesitated to approach the roaring deity.

Lord Brahma pleaded with Prahlada:

"Child, you alone are His dear devotee. Only your pure love can pacify His fierce heart."

Without fear, young Prahlada stepped forward and prostrated with total surrender at the Lord’s lotus feet.

With tears of love, Prahlada prayed:

"O Lord of the helpless! O protector of those who seek refuge! Let Your anger cease. A true devotee never fears Your divine form."

Hearing the pure prayers of the boy, the terrifying roar melted into tender paternal affection. Lord Narasimha lifted Prahlada into His lap, wiped the boy's tears, and gently rested His divine lotus hand upon Prahlada's head.

The Lord blessed him:

"Dear Prahlada, because of your pure, unmotivated devotion, twenty-one generations of your ancestors are liberated. Rule your kingdom with righteousness, and ultimately you shall attain My supreme abode."

Ever since, the name of Bhakt Prahlada shines as the eternal beacon of absolute faith in God. Victory to Lord Narasimha!`,
        shloka: `उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्।
नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥`,
        shlokaTranslationHi:
          'नृसिंह महामंत्र: जो परम पराक्रमी, महाविष्णु, सर्वत्र दीप्तिमान, भयानक होते हुए भी अपने भक्तों के लिए परम कल्याणकारी और मृत्यु की भी मृत्यु हैं—उन भगवान नृसिंह को मैं बारंबार प्रणाम करता हूँ।',
        shlokaTranslationEn:
          'Narasimha Maha-Mantra: I bow to the ferocious and heroic Lord Narasimha, who radiates cosmic fire from all directions, who is terrifying to the wicked yet the bestower of supreme good to his devotees, the death of death itself.',
        moralHi:
          'ईश्वर का भय केवल अधर्मियों के लिए है; निष्कपट प्रेम, विनम्रता और समर्पण से भगवान के उग्र रूप को भी वात्सल्य में बदला जा सकता है।',
        moralEn:
          'God is fierce only toward tyranny; humble love and pure surrender can instantly transform cosmic fury into boundless grace.',
      },
    ],
  },
  {
    id: 'TextBook_HanumanRamSetu',
    type: 'text',
    titleEn: 'Hanuman and the Divine Ram Setu',
    titleHi: 'महावीर हनुमान और पावन राम सेतु का निर्माण',
    subtitleEn: 'The Miracle of Devotion and Floating Stones',
    subtitleHi: 'अगाध भक्ति, वानर सेना और समुद्र पर तैरते पाषाण',
    descriptionEn:
      'The authentic narrative from Valmiki Ramayana and Ramcharitmanas: Lord Rama’s penance at the ocean, the boon of Nala and Nila, the legendary devotion of the little squirrel, and the miraculous completion of the 100-Yojana bridge in five days.',
    descriptionHi:
      'वाल्मीकि रामायण एवं श्रीरामचरितमानस से पावन गाथा: समुद्र तट पर प्रभु श्रीराम की साधना, नल-नील का वरदान, तैरते हुए पाषाण, नन्हीं गिलहरी का अतुल्य समर्पण और पांच दिनों में १०० योजन सेतु का निर्माण।',
    categoryEn: 'Ramayana Legends',
    categoryHi: 'रामायण गाथाएं',
    image: imagePath.ramSetuBuilding,
    readingTimeMin: 18,
    sourceEn: 'Valmiki Ramayana (Yuddha Kanda) & Sri Ramcharitmanas',
    sourceHi:
      'वाल्मीकि रामायण (युद्ध काण्ड) एवं श्रीरामचरितमानस (सुंदरकाण्ड / लंकाकाण्ड)',
    keywords:
      'ram setu, hanuman, rama, lakshmana, nala, nila, squirrel, rameshwaram, vanara, valmiki ramayana, राम सेतु, हनुमान, राम, नल नील, गिलहरी, रामेश्वरम',
    pages: [
      {
        page: 1,
        sourceHi: 'समुद्र तट पर प्रार्थना और समुद्र देव का प्राकट्य',
        sourceEn: "Prayers at the Ocean & Varuna's Manifestation",
        image: imagePath.vanaraRamSetu,
        contentHi: `समुद्र तट पर प्रार्थना और समुद्र देव का प्राकट्य: 🌊🏹

माता सीता को रावण के चंगुल से मुक्त कराने के लिए प्रभु श्रीराम, लक्ष्मण, सुग्रीव, महाबली हनुमान, अंगद और विशाल वानर सेना के साथ दक्षिण समुद्र के तट पर पहुंचे। 🌊

सामने १०० योजन (लगभग ८०० मील) चौड़ा, अगाध और गर्जना करता हुआ महासागर लहरा रहा था। प्रभु श्रीराम ने समुद्र को अपने पूर्वज (राजा सगर के वंशज) मानकर सम्मान दिया। उन्होंने समुद्र तट पर कुश का आसन बिछाया और तीन दिनों तक मौन व्रत धारण कर समुद्र से मार्ग देने की प्रार्थना की। 🧘‍♂️🙏

परंतु समुद्र ने प्रभु की विनम्रता को दुर्बलता समझ लिया और तीन दिन बीत जाने पर भी कोई उत्तर नहीं दिया। तब मर्यादा पुरुषोत्तम भगवान राम ने जगत को यह सिखाया कि अधर्म और हठ के आगे शक्ति का प्रदर्शन भी आवश्यक होता है।

प्रभु राम ने अपने भाई लक्ष्मण से कहा:

"लक्ष्मण! मेरा कोदण्ड धनुष और ब्रह्मास्त्र लाओ। विनय और दया का सम्मान केवल सुपात्र करते हैं, जड़ समुद्र भय के बिना मार्ग नहीं देगा!" 🏹⚡

जैसे ही प्रभु श्रीराम ने धनुष पर बाण चढ़ाया, समुद्र का जल खौलने लगा, जलचर तड़पने लगे और दिशाओं में त्राहि-त्राहि मच गई। 🌩️

भयभीत होकर समुद्र देव (वरुण) दिव्य रत्नों की थाली लेकर हाथ जोड़े प्रकट हुए और प्रभु के चरणों में गिर पड़े:

"हे रघुपति! क्षमा करें। यह जल मेरा स्वभाव है, जिसे आपने ही रचा है। परंतु मैं आपको सेना सहित लंका पहुंचने का उपाय बताता हूँ!" 💎🌊`,
        contentEn: `Prayers at the Ocean & Varuna's Manifestation:

To rescue Mother Sita from Ravana's captivity, Lord Rama arrived at the shore of the southern ocean with Lakshmana, Sugriva, Hanuman, Angada, and the vast Vanara army.

Before them stretched a roaring, unfathomable ocean spanning 100 Yojanas (approx. 800 miles). Honoring the ocean as ancestral water (from the lineage of King Sagara), Rama sat in solemn penance upon sacred grass for three days, praying for safe passage.

When the ocean did not respond, Lord Rama demonstrated that righteousness must sometimes wield resolute strength.

Rama addressed Lakshmana:

"Bring forth my Kodanda bow and blazing arrow. Humility is cherished by the noble, but without righteous strength, the stubborn ocean will not yield!"

As Rama placed the cosmic arrow on his bow, the waters boiled, waves surged skyward, and the sea creatures trembled.

Terrified, the Ocean God (Samudra Deva) arose from the depths holding platters of pearls and gems, prostrating before Rama:

"Forgive me, O Lord of Raghus! The waters follow the cosmic laws ordained by You, yet I reveal the path for your army to cross!"`,
        shloka: `विनय न मानत जलधि जड़ गए तीन दिन बीति।
बोले राम सकोप तब भय बिनु होइ न प्रीति॥`,
        shlokaTranslationHi:
          'श्रीरामचरितमानस: तीन दिन बीत जाने पर भी जब जड़ समुद्र ने विनय नहीं मानी, तब भगवान राम ने कहा कि बिना सामर्थ्य और भय के हठी लोगों में प्रीति और सम्मान उत्पन्न नहीं होता।',
        shlokaTranslationEn:
          'Ramcharitmanas: When three days passed and the ocean did not yield to prayer, Lord Rama declared that without demonstrating righteous power, the obstinate will never show true respect.',
        moralHi:
          'धैर्य और विनम्रता सद्गुण हैं, परंतु अधर्म और अहंकार के सम्मुख दृढ़ता और आत्मबल दिखाना भी धर्म का अंग है।',
        moralEn:
          'Patience and humility are virtues, yet standing firm with strength against obstinacy is an essential duty of righteousness.',
      },
      {
        page: 2,
        sourceHi: 'नल-नील का वरदान और तैरते हुए पाषाण',
        sourceEn: 'The Boon of Nala-Nila & Floating Stones',
        image: imagePath.ramSetuBuilding,
        contentHi: `नल-नील का वरदान और तैरते हुए पाषाण: 🪨✨

समुद्र देव ने दोनों हाथ जोड़कर प्रभु श्रीराम को सेतु निर्माण का गूढ़ रहस्य बताया: 🌊

"हे प्रभु! आपकी सेना में विश्वकर्मा के अंश से उत्पन्न दो वानर वीर हैं—'नल' और 'नील'। बाल्यावस्था में उन्हें एक ऋषि का वरदान प्राप्त हुआ था कि उनके स्पर्श से भारी से भारी पत्थर और काष्ठ भी जल में डूबेंगे नहीं, बल्कि तैरने लगेंगे!" 🌟

समुद्र देव ने आगे कहा:

"नल सेतु निर्माण की विद्या में पारंगत हैं। आप उनसे सेतु बंधवाएं, मैं उस सेतु को अपनी छाती पर धारण करूंगा।" 🤝

प्रभु श्रीराम की आज्ञा मिलते ही चारों ओर "जय श्री राम" का जयघोष गूंज उठा! महाबली हनुमान, सुग्रीव, अंगद, जामवंत और लाखों वानर-भालू उत्साह से उछल पड़े। 🐒🌳

वे पर्वतों की ओर दौड़े और विशालकाय शिलाओं, शिखरों और विशाल वृक्षों को उखाड़-उखाड़कर समुद्र तट पर लाने लगे। 🏔️

महावीर हनुमान जी ने एक दिव्य युक्ति निकाली: उन्होंने प्रत्येक शिला पर प्रभु का पावन नाम **"श्री राम"** अंकित करना आरंभ कर दिया। 📜

जब नल और नील उन शिलाओं को छूकर समुद्र के अथाह जल में डालते, तो एक अद्भुत चमत्कार होता—वे भारी-भरकम पत्थर जल में डूबने के बजाय नाव की तरह तैरने लगते! 🪨🌊✨`,
        contentEn: `The Boon of Nala-Nila & Floating Stones:

Samudra Deva revealed the divine key to building the causeway:

"Lord! In your vanara army are two extraordinary brothers, Nala and Nila, born from the grace of the divine architect Vishwakarma. In their youth, they received a sage's blessing that any stone or wood they touch shall never sink, but float like a boat!"

Samudra Deva pledged:

"Nala is a master architect. Under his design, let the bridge be built, and I shall hold it upon my chest without sinking."

Upon Lord Rama's word, shouts of "Jai Sri Rama" echoed to the skies! Hanuman, Sugriva, Angada, and millions of Vanaras bounded toward the mountains.

They quarried massive boulders, mountain cliffs, and giant Sal trees, carrying them to the shore.

Lord Hanuman inscribed the holy two syllables: **"श्री राम"** on every boulder.

When Nala and Nila placed these boulders into the ocean, a divine miracle occurred—the massive rocks floated effortlessly like leaves upon the waves!`,
        shloka: `नल नील वानर बड़ भागी। लरिकाईं रिषि आसिष लागी॥
छूवत सेतु शिला सब तारी। जल पर उतराहिं सुखारी॥`,
        shlokaTranslationHi:
          'नल और नील बड़े भाग्यशाली वानर थे, जिन्हें बाल्यकाल में ऋषि का आशीष मिला था। उनके छूते ही शिलाएं जल पर तैरने लगीं और सब सुखपूर्वक तैरते रहे।',
        shlokaTranslationEn:
          'Nala and Nila were blessed Vanaras who received the blessing of a sage in childhood; by their divine touch, heavy stones floated upon the deep waters effortlessly.',
        moralHi:
          'जब कार्य में ईश्वर का नाम और सेवा का भाव जुड़ जाता है, तो सबसे कठिन और भारी बाधाएं भी तैरने लगती हैं।',
        moralEn:
          'When an endeavor is sanctified by the Divine name and dedicated service, even the heaviest obstacles float away.',
      },
      {
        page: 3,
        sourceHi: 'नन्हीं गिलहरी का अतुल्य समर्पण',
        sourceEn: "The Little Squirrel's Boundless Devotion",
        image: imagePath.buildingSetuLanka,
        contentHi: `नन्हीं गिलहरी का अतुल्य समर्पण: 🐿️💖

जब विशालकाय वानर-भालू बड़े-बड़े पर्वत उठाकर ला रहे थे, तभी एक नन्हीं सी गिलहरी (चिकारी) भी समुद्र तट पर आई। 🌊

उसने विचार किया: "यह मेरे प्रभु श्रीराम का कार्य है, मुझे भी इसमें अपना योगदान देना चाहिए।" 🌸

वह नन्हीं गिलहरी समुद्र के जल में डुबकी लगाती, फिर बालू-रेत पर लोटती जिससे रेत उसके शरीर से चिपक जाती। इसके बाद वह सेतु की शिलाओं के बीच जाकर जोर-जोर से अपने शरीर को हिलाती, ताकि वह बालू शिलाओं की दरारों में भर जाए और सेतु सुदृढ़ बन सके। 🏖️

एक वानर ने उसे देखा और हंसते हुए कहा:

"अरे नन्हीं जीव! हट जा यहाँ से, कहीं हमारे पैरों तले कुचल न जाए!" 🐒

गिलहरी की आँखों में आँसू आ गए, पर वह नहीं रुकी और बोली:

"मेरा शरीर छोटा है, पर मेरा हृदय प्रभु राम के प्रेम से भरा है। मैं अपनी सामर्थ्य के अनुसार प्रभु की सेवा अवश्य करूंगी।" 🐿️

प्रभु श्रीराम दूर से यह सब देख रहे थे। उनका हृदय वात्सल्य से भर गया। प्रभु ने आगे बढ़कर उस नन्हीं गिलहरी को अपनी हथेलियों पर बड़े आदर और प्रेम से उठा लिया। 💖

भगवान राम ने वानर सेना से कहा:

"किसी के योगदान को उसके आकार या बल से मत आंको! इस नन्हीं गिलहरी की निष्ठा और प्रेम तुम्हारे पर्वतों से भी अधिक भारी है।" 🌟

प्रभु ने बड़े स्नेह से अपनी तीन उंगलियां उस गिलहरी की पीठ पर फेरीं। प्रभु के कोमल स्पर्श से गिलहरी की पीठ पर तीन सुंदर श्वेत रेखाएं बन गईं, जो आज भी प्रत्येक गिलहरी की पीठ पर प्रभु के प्रेम के प्रतीक रूप में सुशोभित हैं। 🐿️✨`,
        contentEn: `The Little Squirrel's Boundless Devotion:

While mighty Vanaras carried massive boulders upon their shoulders, a tiny squirrel scurried along the shoreline.

She thought in her heart: "This is the work of my Lord Rama; I too must offer whatever service I can."

The little squirrel dipped herself into the sea, rolled upon the beach sand until grains clung to her fur, ran across the floating stones, and shook herself vigorously to fill the cracks between the boulders.

A Vanara noticed her and laughed:

"Get away, tiny creature, lest you be crushed under our heavy feet!"

With tears in her eyes, the squirrel continued her labor:

"My body is small, but my heart is filled with love for Lord Rama. I will serve according to the strength God gave me."

Lord Rama observed this with tears of compassion. Stepping forward, He tenderly scooped the tiny squirrel into His warm palms.

Rama addressed the entire army:

"Never measure service by physical size or strength! This little squirrel’s selfless devotion weighs heavier in My heart than the grandest mountains you carry."

With boundless love, Rama stroked the squirrel’s back with three fingers. From that sacred touch, three divine white stripes appeared upon her back—remaining upon squirrels to this very day as the eternal seal of God’s love.`,
        shloka: `कपि करहिं हँसि उपहास। राम निरखि हिय हरषे तास॥
अति सनेहं प्रभु कर फिरावा। तीनि रेख लखि रूप सुहावा॥`,
        shlokaTranslationHi:
          'वानरों ने उपहास किया, किंतु प्रभु राम ने जब गिलहरी की निष्ठा देखी तो उनका हृदय आनंदित हो गया। प्रभु ने अत्यंत स्नेह से उस पर हाथ फेरा और तीन दिव्य रेखाएं सुशोभित हो गईं।',
        shlokaTranslationEn:
          'The Vanaras laughed in jest, but Lord Rama’s heart rejoiced upon seeing the squirrel’s devotion. With deepest love He caressed her back, blessing her with three divine stripes.',
        moralHi:
          'सेवा का मूल्य साधन या शक्ति से नहीं, बल्कि भावना की पवित्रता और निस्वार्थ समर्पण से आंका जाता है।',
        moralEn:
          'The worth of seva is never measured by size or resources, but by the purity of love and sincere dedication.',
      },
      {
        page: 4,
        sourceHi: 'पांच दिनों में १०० योजन सेतु का निर्माण',
        sourceEn: 'Completion of the 100-Yojana Bridge in 5 Days',
        image: imagePath.ramSetuBuilding,
        contentHi: `पांच दिनों में १०० योजन सेतु का निर्माण: 🌅🏗️

महावीर हनुमान जी के नेतृत्व और नल-नील के कुशल वास्तुशिल्प से वानर सेना ने दिन-रात एक कर दिया। चारों ओर पत्थरों, पेड़ों और 'जय श्री राम' के उद्घोषों का अपूर्व संगम था। 🪨🌿

वाल्मीकि रामायण (युद्ध काण्ड, सर्ग २२) के अनुसार, यह सेतु केवल पांच दिनों में पूर्ण हुआ: 📜

- प्रथम दिन: १४ योजन सेतु बनाया गया। 🚩
- द्वितीय दिन: २० योजन सेतु का विस्तार हुआ। 🚩
- तृतीय दिन: २१ योजन सेतु जल पर स्थापित हुआ। 🚩
- चतुर्थ दिन: २२ योजन सेतु आगे बढ़ा। 🚩
- पंचम दिन: २३ योजन सेतु पूरा कर लंका के सुवेल पर्वत तक जोड़ दिया गया। 🚩

इस प्रकार १०० योजन लंबा और १० योजन चौड़ा यह दिव्य सेतु समुद्र के वक्षस्थल पर ऐसा प्रतीत हो रहा था, मानो आकाशगंगा धरती पर उतर आई हो, या समुद्र के केशों के बीच सुहाग की मांग सज गई हो! 🌌✨

सेतु इतना चौड़ा और मजबूत था कि उस पर हाथी, घोड़े, रथ और करोड़ों की सेना सुगमता से चल सकती थी। आकाश से देवताओं, गंधर्वों और ऋषियों ने इस मानव-वानर निर्मित आश्चर्य को देखकर पुष्पों की वर्षा की। 🌸🕉️`,
        contentEn: `Completion of the 100-Yojana Bridge in 5 Days:

Led by Hanuman's tireless vigor and Nala-Nila’s architectural mastery, the Vanara army worked in seamless unity day and night.

As documented in the sacred Valmiki Ramayana (Yuddha Kanda, Sarga 22), the monumental causeway was completed in just five days:

- Day 1: 14 Yojanas constructed.
- Day 2: 20 Yojanas laid.
- Day 3: 21 Yojanas established.
- Day 4: 22 Yojanas extended.
- Day 5: 23 Yojanas completed, reaching Mount Suvela in Lanka!

Spanning 100 Yojanas (approx. 800 miles) in length and 10 Yojanas in width, the golden causeway appeared upon the ocean like the Milky Way descending to earth.

The bridge was so firm and wide that chariots, elephants, and vast legions could march safely across. From the heavens, celestials marveled at this wonder and showered blossoms of praise.`,
        shloka: `दशयोजनविस्तीर्णं शतयोजनमायतम्।
ददृशुर्देवगन्धर्वा नलसेतुं सुदुष्करम्॥`,
        shlokaTranslationHi:
          'वाल्मीकि रामायण (युद्ध काण्ड २२.७५): दस योजन चौड़े और सौ योजन लंबे उस अत्यंत दुष्कर नल-सेतु को देखकर देवता और गंधर्व विस्मयचकित होकर देखने लगे।',
        shlokaTranslationEn:
          'Valmiki Ramayana (Yuddha Kanda 22.75): Ten Yojanas wide and one hundred Yojanas long, the gods and gandharvas gazed in awe at the monumental bridge built by Nala.',
        moralHi:
          'एकता, सामूहिक शक्ति और ईश्वर पर अटूट विश्वास से असंभव से असंभव लक्ष्य भी न्यूनतम समय में सिद्ध हो जाता है।',
        moralEn:
          'Unity, focused teamwork, and unshakeable trust in the Divine can achieve the impossible in record time.',
      },
      {
        page: 5,
        sourceHi: 'रामेश्वरम ज्योतिर्लिंग की स्थापना एवं विजय प्रयाण',
        sourceEn: 'Consecration of Rameshwaram & March to Victory',
        image: imagePath.vanaraRamSetu,
        contentHi: `रामेश्वरम ज्योतिर्लिंग की स्थापना एवं विजय प्रयाण: 🔱🚩

लंका की ओर प्रस्थान करने से पूर्व, मर्यादा पुरुषोत्तम भगवान श्रीराम ने विचार किया कि धर्म-युद्ध में विजय के लिए देवाधिदेव महादेव भगवान शिव का आशीर्वाद प्राप्त करना आवश्यक है। 🕉️

प्रभु श्रीराम ने गंधमादन पर्वत के तट पर अपने हाथों से समुद्र की पावन बालू से शिवलिंग की रचना की। 🏖️

भगवान राम ने वेद-मंत्रों से भगवान शिव की पूजा की और स्तुति की:

"शिव द्रोही मम दास कहावा। सो नर मोहि सपनेहुँ नहिं भावा॥"

प्रभु की अनन्य भक्ति से प्रसन्न होकर देवाधिदेव महादेव साक्षात ज्योतिर्मय रूप में प्रकट हुए और श्रीराम को आशीर्वाद दिया:

"हे रघुनंदन! आपका यह सेतु संसार में आपकी कीर्ति का अमर ध्वज होगा। जो भी मनुष्य इस सेतु-बंध और रामेश्वरम लिंग का दर्शन करेगा, वह समस्त पापों से मुक्त हो जाएगा। आपकी विजय निश्चित है!" 🔱🌟

तभी से यह पावन धाम द्वादश ज्योतिर्लिंगों में से एक **'श्री रामेश्वरम'** कहलाया। 🪔

इसके पश्चात, महावीर हनुमान जी ने गगनभेदी गर्जना की: **"पवनसुत हनुमान की जय! सियावर रामचंद्र की जय!"** 🚩

करोड़ों की वानर सेना ने राम सेतु पर कदम रखा और धर्म की जय तथा अधर्म के विनाश के लिए समुद्र पार कर लंका की धरती पर पदार्पण किया। बोलो मर्यादा पुरुषोत्तम श्रीराम की जय! 🏹🕉️✨`,
        contentEn: `Consecration of Rameshwaram & March to Victory:

Before marching across the Setu, Lord Rama declared that seeking the blessings of Lord Shiva (Mahadeva) was essential for the victory of Dharma.

Upon the sacred sands of the shore, Lord Rama personally fashioned a Shiva Linga from the consecrated earth.

Rama worshipped Lord Shiva with Vedic hymns and profound devotion, affirming that devotion to Shiva and Vishnu are one and inseparable.

Pleased by Rama’s pure love, Lord Shiva manifested in radiant splendour and proclaimed:

"O Rama! This sacred Setu shall stand as the eternal banner of your glory across the ages. Whoever visits this Setu and worships Rameshwaram Lingam shall be liberated from all sins. Your victory over evil is assured!"

Thus was consecrated the holy shrine of **Sri Rameshwaram**, one of the twelve sacred Jyotirlingas.

Hanuman raised a thunderous battle cry: **"Pawan-sut Hanuman ki Jai! Siyavar Ramchandra ki Jai!"**

Led by Rama, Lakshmana, Hanuman, and Sugriva, the heroic army marched across the Ram Setu toward Lanka for the triumphant establishment of Dharma. Victory to Lord Rama!`,
        shloka: `जे रामेश्वर दरसनु करिहहिं। ते तनु तजि मम लोकहिं परिहहिं॥
जो गंगाजलु आनि चढ़ाइहि। सो साजुज्य मुकति नर पाइहि॥`,
        shlokaTranslationHi:
          'श्रीरामचरितमानस: जो मनुष्य रामेश्वरम जी का दर्शन करेंगे, वे देह त्यागकर मेरे परम धाम को प्राप्त होंगे। जो गंगाजल लाकर यहाँ अर्पण करेंगे, वे सायुज्य मुक्ति प्राप्त करेंगे।',
        shlokaTranslationEn:
          'Ramcharitmanas: Those who gaze upon and worship Rameshwaram shall attain the supreme spiritual abode; offering the sacred waters of the Ganga here brings divine liberation.',
        moralHi:
          'विजय और शक्ति का सच्चा उपयोग धर्म, मर्यादा और ईश्वर के प्रति कृतज्ञता में है; धर्म के मार्ग पर चलने वाले की विजय तीनों लोकों में निश्चित है।',
        moralEn:
          'The true purpose of strength is to uphold Dharma, humility, and gratitude; those who walk the path of truth are eternally victorious.',
      },
    ],
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
