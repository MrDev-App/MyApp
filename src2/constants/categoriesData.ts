import imagePath from '../assets';

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  textEn: string;
  textHi: string;
  image: any;
}

export interface Category {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
  coverImage: any;
  descriptionEn: string;
  descriptionHi: string;
  items: CategoryItem[];
}

export const categoriesData: Category[] = [
  {
    id: 'aarti',
    titleEn: 'Aarti',
    titleHi: 'आरती',
    icon: '🪔',
    coverImage: imagePath.Ganesha,
    descriptionEn:
      'Devotional prayers sung in praise of deities to invoke their blessings.',
    descriptionHi:
      'देवी-देवताओं की स्तुति और आशीर्वाद प्राप्त करने के लिए गाई जाने वाली प्रार्थनाएं।',
    items: [
      {
        id: 'ganesha_aarti',
        nameEn: 'Ganesha Aarti',
        nameHi: 'गणेश आरती',
        subtitleEn: 'Jai Ganesh Deva',
        subtitleHi: 'जय गणेश देवा',
        textEn: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva,\nMata jaki Parvati, Pita Mahadeva.\n\nEk dant, daya want, char bhuja dhari,\nMathe par tilak sohe, muse ki sawari.\n\nPan chadhe, phool chadhe, aur chadhe meva,\nLadduan ka bhog lage, sant karein seva.\n\nAndhan ko aankh det, kodhin ko kaya,\nBanjhan ko putra det, nirdhan ko maya.\n\nJai Ganesh, Jai Ganesh, Jai Ganesh Deva,\nMata jaki Parvati, Pita Mahadeva.',
        textHi: 'जय गणेश, जय गणेश, जय गणेश देवा,\nमाता जाकी पार्वती, पिता महादेवा॥\n\nएक दन्त, दयावन्त, चार भुजाधारी,\nमाथे पर तिलक सोहे, मूसे की सवारी॥\n\nपान चढ़े, फूल चढ़े, और चढ़े मेवा,\nलड्डुअन का भोग लगे, सन्त करें सेवा॥\n\nअन्धन को आँख देत, कोढ़िन को काया,\nबांझन को पुत्र देत, निर्धन को माया॥\n\nजय गणेश, जय गणेश, जय गणेश देवा,\nमाता जाकी पार्वती, पिता महादेवा।',
        image: imagePath.Ganesha,
      },
      {
        id: 'shiva_aarti',
        nameEn: 'Shiva Aarti',
        nameHi: 'शिव आरती',
        subtitleEn: 'Om Jai Shiv Omkara',
        subtitleHi: 'ॐ जय शिव ओंकारा',
        textEn: 'Om Jai Shiv Omkara, Swami Har Shiv Omkara,\nBrahma, Vishnu, Sadashiv, Ardhangi Dhara.\n\nEkanan, Chaturanan, Panchanan Raje,\nHansanan, Garudasan, Vrishbahan Saje.\n\nDo Bhuj, Char Chaturbhuj, Das Bhuj Te Sohe,\nTeenon Roop Nirakhta, Tribhuvan Jan Mohe.\n\nAkshamala, Vanamala, Rundamala Dhari,\nChandan, Mrigmad Sohe, Bhale Shashi Dhari.\n\nOm Jai Shiv Omkara, Swami Har Shiv Omkara.',
        textHi: 'ॐ जय शिव ओंकारा, स्वामी हर शिव ओंकारा,\nब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥\n\nएकानन, चतुरानन, पञ्चानन राजे,\nहंसासन, गरुड़ासन, वृषवाहन साजे॥\n\nदो भुज, चार चतुर्भुज, दस भुज अति सोहे,\nतीनों रूप निरखता, त्रिभुवन जन मोहे॥\n\nअक्षमाला, वनमाला, रुण्डमाला धारी,\nचन्दन, मृगमद सोहे, भाले शशिधारी॥\n\nॐ जय शिव ओंकारा, स्वामी हर शिव ओंकारा।',
        image: imagePath.Bholenath,
      },
      {
        id: 'laxmi_aarti',
        nameEn: 'Lakshmi Aarti',
        nameHi: 'लक्ष्मी आरती',
        subtitleEn: 'Om Jai Lakshmi Mata',
        subtitleHi: 'ॐ जय लक्ष्मी माता',
        textEn: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata,\nTumko Nishdin Sevat, Har Vishnu Vidhata.\n\nUma Rama Brahmani, Tum Hi Jag Mata,\nSurya Chandrama Dhyavat, Naarad Rishi Gata.\n\nDurga Roop Niranjani, Sukh Sampatti Data,\nJo Koi Tumko Dhyata, Riddhi Siddhi Pata.\n\nTum Patal Nivasini, Tum Hi Shubh Data,\nKarma Prabhav Prakashini, Bhav Nidhi Ki Trata.\n\nOm Jai Lakshmi Mata, Maiya Jai Lakshmi Mata.',
        textHi: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता,\nतुमको निशदिन सेवत, हर विष्णु विधाता॥\n\nउमा, रमा, ब्रह्माणी, तुम ही जग-माता,\nसूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥\n\nदुर्गा रूप निरंजनी, सुख सम्पत्ति दाता,\nजो कोई तुमको ध्याता, ऋद्धि-सिद्धि पाता॥\n\nतुम पाताल-निवासिनि, तुम ही शुभ दाता,\nकर्म-प्रभाव-प्रकाशिनि, भव-निधि की त्राता॥\n\nॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।',
        image: imagePath.Laxmi,
      },
      {
        id: 'hanuman_aarti',
        nameEn: 'Hanuman Aarti',
        nameHi: 'हनुमान आरती',
        subtitleEn: 'Aarti Kije Hanuman Lala Ki',
        subtitleHi: 'आरती कीजै हनुमान लला की',
        textEn: 'Aarti Kije Hanuman Lala Ki, Dusht Dalan Raghunath Kala Ki...\n\nJake Bal Se Girivar Kanpe, Rog Dosh Jake Nikat Na Jhanke...\n\nLal Deh Lali Lase Aru Dhar Lal Langoor, Vajra Deh Danav Dalan Jai Jai Jai Kapi Soor...',
        textHi: 'आरती कीजै हनुमान लला की, दुष्ट दलन रघुनाथ कला की...\n\nजाके बल से गिरिवर कांपे, रोग दोष जाके निकट न झांके...\n\nलाल देह लाली लसे अरु धरि लाल लंगूर, वज्र देह दानव दलन जय जय जय कपि सूर...',
        image: imagePath.Hanuman,
      },
      {
        id: 'rama_aarti',
        nameEn: 'Rama Aarti',
        nameHi: 'राम आरती',
        subtitleEn: 'Aarti Kije Ramchandra Ki',
        subtitleHi: 'आरती कीजै रामचन्द्र की',
        textEn: 'Aarti Kije Ramchandra Ki, Jagmag Jyoti Awadh Mandir Ki...\n\nKanchan Thaal Virajman Sohe, Dev Muni Nar Kautuk Sab Mohe...\n\nJanakdulaari Sita Pyari, Raghubar Sang Sobhit Chhavi Nyari...',
        textHi: 'आरती कीजै रामचन्द्र की, जगमग ज्योति अवध मन्दिर की...\n\nकंचन थाल विराजमान सोहे, देव मुनि नर कौतुक सब मोहे...\n\nजनकदुलारी सीता प्यारी, रघुबर संग सोभित छवि न्यारी...',
        image: imagePath.Rama,
      },
      {
        id: 'durga_aarti',
        nameEn: 'Durga Aarti',
        nameHi: 'दुर्गा आरती',
        subtitleEn: 'Jai Ambe Gauri',
        subtitleHi: 'जय अम्बे गौरी',
        textEn: 'Jai Ambe Gauri, Maiya Jai Shyama Gauri,\nTumko Nishdin Dhyavat, Hari Brahma Shivari.\n\nMang Sindoor Virajit, Teeko Mrigmad Ko,\nUjjawal Se Dou Naina, Chandravadan Neeko.\n\nKanak Saman Kalevar, Raktambar Rajey,\nRaktapushp Gal Mala, Kanthan Par Sajey.',
        textHi: 'जय अम्बे गौरी, मैया जय श्यामा गौरी,\nतुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥\n\nमांग सिन्दूर विराजित, टीको मृगमद को,\nउज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥\n\nकनक समान कलेवर, रक्ताम्बर राजै,\nरक्तपुष्प गल माला, कण्ठन पर साजै॥',
        image: imagePath.Durga,
      },
      {
        id: 'vishnu_aarti',
        nameEn: 'Vishnu Aarti',
        nameHi: 'विष्णु आरती',
        subtitleEn: 'Om Jai Jagdish Hare',
        subtitleHi: 'ॐ जय जगदीश हरे',
        textEn: 'Om Jai Jagdish Hare, Swami Jai Jagdish Hare,\nBhakt Janon Ke Sankat, Kshan Mein Door Kare.\n\nJo Dhyave Phal Pave, Dukh Binse Man Ka,\nSwami Dukh Binse Man Ka,\nSukh Sampati Ghar Aave, Kasht Mite Tan Ka.',
        textHi: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे,\nभक्त जनों के संकट, क्षण में दूर करे॥\n\nजो ध्यावे फल पावे, दुःख बिनसे मन का,\nस्वामी दुःख बिनसे मन का,\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥',
        image: imagePath.Vishnu,
      },
      {
        id: 'saraswati_aarti',
        nameEn: 'Saraswati Aarti',
        nameHi: 'सरस्वती आरती',
        subtitleEn: 'Om Jai Saraswati Mata',
        subtitleHi: 'ॐ जय सरस्वती माता',
        textEn: 'Om Jai Saraswati Mata, Maiya Jai Saraswati Mata,\nSadgun Gyan Anekdayini, Haran Moha Jata.\n\nJanak Janani Pad Pujit, Vidya Buddhi Pradayini,\nShwet Vastra Dharini, Veena Vaadini.',
        textHi: 'ॐ जय सरस्वती माता, मैया जय सरस्वती माता,\nसद्गुण ज्ञान अनेकदायिनी, हरण मोह जाता॥\n\nजनक जननी पद पूजित, विद्या बुद्धि प्रदायिनी,\nश्वेत वस्त्र धारिणी, वीणा वादिनी॥',
        image: imagePath.Saraswati,
      },
      {
        id: 'santoshi_aarti',
        nameEn: 'Santoshi Mata Aarti',
        nameHi: 'संतोषी माता आरती',
        subtitleEn: 'Jai Santoshi Mata',
        subtitleHi: 'जय संतोषी माता',
        textEn: 'Jai Santoshi Mata, Maiya Jai Santoshi Mata,\nApne Sharan Lagave, Sukh Sampati Data.\n\nShukrawar Vrat Seva, Jo Nar Nari Karein,\nManवांछित Phal Pavein, Sankat Door Harein.',
        textHi: 'जय संतोषी माता, मैया जय संतोषी माता,\nअपने शरण लगावे, सुख सम्पत्ति दाता॥\n\nशुक्रवार व्रत सेवा, जो नर नारी करें,\nमनवांछित फल पावें, संकट दूर हरें॥',
        image: imagePath.Laxmi,
      },
      {
        id: 'ganga_aarti',
        nameEn: 'Ganga Aarti',
        nameHi: 'गंगा आरती',
        subtitleEn: 'Jai Gange Mata',
        subtitleHi: 'जय गंगे माता',
        textEn: 'Jai Gange Mata, Maiya Jai Gange Mata,\nJo Nar Tumko Dhyata, Manवांछित Phal Pata.\n\nHar Har Gange Maiya, Patit Pavani Ganga,\nSiddha Muni Sevita, Shashi Mukhi Parama Sanga.',
        textHi: 'जय गंगे माता, मैया जय गंगे माता,\nजो नर तुमको ध्याता, मनवांछित फल पाता॥\n\nहर हर गंगे मैया, पतित पावनी गंगा,\nसिद्ध मुनि सेविता, शशि मुखी परमा संगा॥',
        image: imagePath.Saraswati,
      },
      {
        id: 'bankey_bihari_aarti',
        nameEn: 'Bankey Bihari Aarti',
        nameHi: 'बांके बिहारी आरती',
        subtitleEn: 'Aarti Shri Bankey Bihari Ki',
        subtitleHi: 'आरती श्री बांके बिहारी की',
        textEn: 'Shri Bankey Bihari Teri Aarti Gaun,\nHey Girdhar Teri Aarti Gaun.\n\nMor Mukut Pyara, Kanan Kundal Shobhit,\nShri Charan Kamal Pe Balihari Jaun.',
        textHi: 'श्री बांके बिहारी तेरी आरती गाऊं,\nहे गिरधर तेरी आरती गाऊं॥\n\nमोर मुकुट प्यारा, कानन कुण्डल शोभित,\nश्री चरण कमल पे बलिहारी जाऊं॥',
        image: imagePath.Krishna,
      },
      {
        id: 'kubera_aarti',
        nameEn: 'Kubera Aarti',
        nameHi: 'कुबेर आरती',
        subtitleEn: 'Aarti Shri Kuber Ji Ki',
        subtitleHi: 'आरती श्री कुबेर जी की',
        textEn: 'Aarti Shri Kuber Ji Ki, Dhan-Dhanya Adhipati Ki,\nYaksha Raj Maharaj Shrestha, Daridrata Nivaran Ki.\n\nShri Kuber Dev Daya Kije, Apni Bhakti Hamein Dije,\nRiddhi-Siddhi Kripa Karke, Sukh Sampati Bhar Dije.',
        textHi: 'आरती श्री कुबेर जी की, धन-धान्य अधिपति की,\nयक्ष राज महाराज श्रेष्ठ, दरिद्रता निवारण की॥\n\nश्री कुबेर देव दया कीजे, अपनी भक्ति हमें दीजे,\nऋद्धि-सिद्धि कृपा करके, सुख सम्पत्ति भर दीजे॥',
        image: imagePath.Kubera,
      },
      {
        id: 'vishwakarma_aarti',
        nameEn: 'Vishwakarma Aarti',
        nameHi: 'विश्वकर्मा आरती',
        subtitleEn: 'Aarti Shri Vishwakarma Ji Ki',
        subtitleHi: 'आरती श्री विश्वकर्मा जी की',
        textEn: 'Jai Shri Vishwakarma, Prabhu Jai Shri Vishwakarma,\nSakal Srishti Ke Karta, Param Jyoti Dhama.\n\nShilp Kala Ke Swami, Gyan Vidya Data,\nBhakt Janon Ke Sankat, Pal Mein Door Karta.',
        textHi: 'जय श्री विश्वकर्मा, प्रभु जय श्री विश्वकर्मा,\nसकल सृष्टि के कर्ता, परम ज्योति धामा॥\n\nशिल्प कला के स्वामी, ज्ञान विद्या दाता,\nभक्त जनों के संकट, पल में दूर करता॥',
        image: imagePath.Brahma,
      },
      {
        id: 'kali_aarti',
        nameEn: 'Kali Ma Aarti',
        nameHi: 'काली मां आरती',
        subtitleEn: 'Mangal Ki Seva Sun Meri Deva',
        subtitleHi: 'मंगल की सेवा सुन मेरी देवा',
        textEn: 'Mangal Ki Seva Sun Meri Deva, Haath Jodh Tere Dwar Khadhe...\n\nPaan Supari Dhwaj Nariyal, Bhent Dharein Tera Dwar Khadhe...\n\nKali Maiya, Jagadamba Maiya, Dukhiyon Ke Dukh Door Kare.',
        textHi: 'मंगल की सेवा सुन मेरी देवा, हाथ जोड़ तेरे द्वार खड़े...\n\nपान सुपारी ध्वज नारियल, भेंट धरें तेरा द्वार खड़े...\n\nकाली मैया, जगदम्बा मैया, दुखियों के दुख दूर करे।',
        image: imagePath.Durga,
      },
    ],
  },
  {
    id: 'shlok',
    titleEn: 'Shlok',
    titleHi: 'श्लोक',
    icon: '📜',
    coverImage: imagePath.Krishna,
    descriptionEn:
      'Sacred Sanskrit verses holding spiritual wisdom and divine vibrations.',
    descriptionHi:
      'आध्यात्मिक ज्ञान और दिव्य ऊर्जा से ओत-प्रोत पवित्र संस्कृत श्लोक।',
    items: [
      {
        id: 'ganesha_shlok',
        nameEn: 'Ganesha Shlok',
        nameHi: 'गणेश श्लोक',
        subtitleEn: 'Vakratunda Mahakaya',
        subtitleHi: 'वक्रतुण्ड महाकाय',
        textEn: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nTranslation:\nO Lord Ganesha, of curved trunk and massive body, whose splendor is equal to a million suns, please make all my undertakings free of obstacles, always.',
        textHi: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nअनुवाद:\nहे मुड़े हुए सूंड वाले, विशाल शरीर और करोड़ों सूर्यों के समान तेज वाले श्री गणेश जी! मेरे सभी कार्यों को बिना किसी बाधा के सदा पूर्ण करें।',
        image: imagePath.Ganesha,
      },
      {
        id: 'guru_shlok',
        nameEn: 'Guru Shlok',
        nameHi: 'गुरु श्लोक',
        subtitleEn: 'Guru Brahma Guru Vishnu',
        subtitleHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः',
        textEn: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥\n\nTranslation:\nThe Guru is Brahma, the Guru is Vishnu, the Guru is Shiva. The Guru is supreme absolute truth itself. Salutations to that revered Guru.',
        textHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥\n\nअनुवाद:\nगुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं, और गुरु ही देव महेश्वर (शिव) हैं। गुरु ही साक्षात परम ब्रह्म हैं, ऐसे आदरणीय गुरुदेव को मेरा सादर प्रणाम है।',
        image: imagePath.Brahma,
      },
      {
        id: 'gayatri_mantra',
        nameEn: 'Gayatri Mantra',
        nameHi: 'गायत्री मंत्र',
        subtitleEn: 'Om Bhur Bhuva Swaha',
        subtitleHi: 'ॐ भूर्भुवः स्वः',
        textEn: 'ॐ भूर्भुवः स्वः।\nतत्सवितुर्वरेण्यं।\nभर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥\n\nTranslation:\nWe meditate on the glorious splendor of the divine Vivifier (Sun). May He illuminate and inspire our minds and intellect.',
        textHi: 'ॐ भूर्भुवः स्वः।\nतत्सवितुर्वरेण्यं।\nभर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥\n\nअनुवाद:\nहम उस दिव्य और परम पूज्य सविता (सूर्य देव) के तेज का ध्यान करते हैं। वे परमात्मा हमारी बुद्धि को सदा सत्कर्मों की ओर प्रेरित करें।',
        image: imagePath.Surya,
      },
    ],
  },
  {
    id: 'stories',
    titleEn: 'Stories',
    titleHi: 'कहानियां',
    icon: '📖',
    coverImage: imagePath.Rama,
    descriptionEn:
      'Inspiring mythological tales and moral stories from sacred scriptures.',
    descriptionHi:
      'पवित्र ग्रंथों से ली गई प्रेरणादायक पौराणिक कथाएं और नैतिक कहानियां।',
    items: [
      {
        id: 'ganesha_wisdom',
        nameEn: "Ganesha's Wisdom",
        nameHi: 'गणेश जी की बुद्धि',
        subtitleEn: 'The Cosmic Race',
        subtitleHi: 'ब्रह्मांडीय दौड़',
        textEn: 'Once, Shiva and Parvati challenged Ganesha and Kartikeya to a race: whoever circled the universe three times first would win a divine fruit.\n\nKartikeya immediately sped away on his peacock. Ganesha, knowing his heavy body and slow vehicle (the mouse) could not compete, paused and thought.\n\nHe then walked around his parents Shiva and Parvati three times. When asked why, Ganesha replied that his parents represent the entire universe to him. Pleased with his devotion and intellect, they awarded him the fruit.',
        textHi: 'एक बार, शिव और पार्वती ने गणेश और कार्तिकेय के सामने एक चुनौती रखी: जो कोई भी ब्रह्मांड की तीन बार परिक्रमा सबसे पहले पूरी करेगा, उसे एक दिव्य फल प्राप्त होगा।\n\nकार्तिकेय तुरंत अपने मोर पर सवार होकर तेजी से उड़ गए। गणेश जी ने अपने भारी शरीर और धीमे वाहन (मूषक) को देखकर थोड़ा विचार किया।\n\nफिर वे अपने माता-पिता शिव और पार्वती के चारों ओर श्रद्धापूर्वक तीन बार घूम लिए। जब उनसे पूछा गया कि उन्होंने ऐसा क्यों किया, तो गणेश जी ने उत्तर दिया कि उनके माता-पिता ही उनके लिए संपूर्ण ब्रह्मांड का प्रतिनिधित्व करते हैं। उनकी इस परम भक्ति और तीव्र बुद्धि से प्रसन्न होकर, माता-पिता ने उन्हें वह दिव्य फल प्रदान किया।',
        image: imagePath.Ganesha,
      },
      {
        id: 'ramayana_story',
        nameEn: 'The Story of Rama',
        nameHi: 'श्री राम की कहानी',
        subtitleEn: 'The Victory of Dharma',
        subtitleHi: 'धर्म की विजय',
        textEn: 'Lord Rama, the prince of Ayodhya, was exiled to the forest for 14 years. Accompanied by his wife Sita and brother Lakshmana, he faced many hardships.\n\nDuring exile, the demon king Ravana abducted Sita. Rama mobilized an army of vanaras, crossed the ocean, defeated Ravana, and rescued Sita. His return to Ayodhya is celebrated as Diwali, symbolizing the victory of light over darkness and dharma over adharma.',
        textHi: 'अयोध्या के राजकुमार भगवान राम को १४ वर्षों के लिए वनवास भेज दिया गया था। अपनी धर्मपत्नी सीता और भाई लक्ष्मण के साथ उन्होंने वन में अनेक कठिनाइयों का सामना किया।\n\nवनवास के दौरान लंकापति रावण ने सीता का हरण कर लिया। श्री राम ने वानर सेना का संगठन किया, समुद्र पर सेतु का निर्माण किया, रावण का वध कर सीता जी को मुक्त कराया। उनकी अयोध्या वापसी की खुशी में दिवाली का त्योहार मनाया जाता है, जो अंधकार पर प्रकाश और अधर्म पर धर्म की विजय का प्रतीक है।',
        image: imagePath.Rama,
      },
      {
        id: 'gita_story',
        nameEn: 'Bhagavad Gita Wisdom',
        nameHi: 'श्रीमद्भगवद्गीता ज्ञान',
        subtitleEn: 'Arjuna & Krishna',
        subtitleHi: 'अर्जुन और श्री कृष्ण',
        textEn: 'On the battlefield of Kurukshetra, prince Arjuna was overwhelmed with grief and doubt about fighting his own kin.\n\nLord Krishna, acting as his charioteer, delivered the spiritual discourse of the Bhagavad Gita. He taught Arjuna about karma yoga (duty without attachment), the eternal nature of the soul, and faith in the supreme. Guided by this wisdom, Arjuna performed his righteous duty.',
        textHi: 'कुरुक्षेत्र के युद्ध मैदान में, अपने ही संबंधियों से लड़ने की बात सोचकर राजकुमार अर्जुन शोक और संशय से घिर गए थे।\n\nउनके सारथी भगवान श्री कृष्ण ने उन्हें श्रीमद्भगवद्गीता का दिव्य उपदेश दिया। उन्होंने अर्जुन को कर्म योग (फल की इच्छा के बिना कर्तव्य करना), आत्मा की अमरता और परमात्मा में पूर्ण विश्वास की शिक्षा दी। इस ज्ञान से प्रेरित होकर, अर्जुन ने अपने धर्मानुकूल कर्तव्य का पालन किया।',
        image: imagePath.Krishna,
      },
    ],
  },
  {
    id: 'temples',
    titleEn: 'Temples',
    titleHi: 'मंदिर दर्शन',
    icon: '🛕',
    coverImage: imagePath.Bholenath,
    descriptionEn:
      'Renowned pilgrimage sites and historically rich temples across India.',
    descriptionHi:
      'भारत के प्रसिद्ध धार्मिक तीर्थ स्थल और ऐतिहासिक दृष्टिकोण से समृद्ध मंदिर।',
    items: [
      {
        id: 'kedarnath',
        nameEn: 'Kedarnath Temple',
        nameHi: 'केदारनाथ मंदिर',
        subtitleEn: 'Garhwal Himalayas, Uttarakhand',
        subtitleHi: 'गढ़वाल हिमालय, उत्तराखंड',
        textEn: 'Located at 11,755 ft near Mandakini river, Kedarnath is one of the most sacred Shiva temples and part of Chhota Char Dham.\n\nBelieved to be originally built by the Pandavas, the current structure is attributed to Adi Shankara. It stands strong against extreme weather, representing absolute resilience and faith.',
        textHi: 'मंदाकिनी नदी के समीप ११,७५५ फीट की ऊंचाई पर स्थित, केदारनाथ मंदिर सबसे पवित्र शिव धामों में से एक है और छोटा चार धाम यात्रा का मुख्य हिस्सा है।\n\nमाना जाता है कि मूल रूप से इसका निर्माण पांडवों द्वारा किया गया था, और बाद में आदि शंकराचार्य ने इसका पुनरुद्धार किया। यह मंदिर भारी प्राकृतिक आपदाओं और कठोर मौसम के बावजूद अडिग खड़ा है, जो परम शक्ति और अटूट आस्था को दर्शाता है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'somnath',
        nameEn: 'Somnath Temple',
        nameHi: 'सोमनाथ मंदिर',
        subtitleEn: 'Prabhas Patan, Gujarat',
        subtitleHi: 'प्रभास पाटन, गुजरात',
        textEn: 'Somnath is the first of the twelve sacred Jyotirlinga shrines of Lord Shiva.\n\nReconstructed several times in history, the modern temple is built in Chalukya style. It symbolizes the eternal triumph of creation over destruction.',
        textHi: 'सोमनाथ मंदिर भगवान शिव के बारह ज्योतिर्लिंगों में सबसे पहला और अत्यंत महत्वपूर्ण ज्योतिर्लिंग माना जाता है।\n\nइतिहास में कई बार पुनर्निर्मित किए जाने के बाद, आधुनिक मंदिर का निर्माण चालुक्य शैली में किया गया था। यह विनाश पर सृजन की शाश्वत विजय का प्रतीक है।',
        image: imagePath.Vishnu,
      },
      {
        id: 'bankey_bihari',
        nameEn: 'Bankey Bihari Temple',
        nameHi: 'बांके बिहारी मंदिर',
        subtitleEn: 'Vrindavan, Uttar Pradesh',
        subtitleHi: 'वृंदावन, उत्तर प्रदेश',
        textEn: 'Dedicated to Lord Krishna (Bankey Bihari), this temple is one of the most famous shrines in Vrindavan.\n\nThe deity here was worshiped by the saint-musician Swami Haridas. The unique style of worship includes frequent curtain pulls so that devotees do not gaze continuously, preserving a loving, playful connection.',
        textHi: 'भगवान श्री कृष्ण (बांके बिहारी) को समर्पित, यह मंदिर वृंदावन के सबसे प्रसिद्ध और पूजनीय मंदिरों में से एक है।\n\nयहाँ की मूर्ति की पूजा संगीत सम्राट स्वामी हरिदास द्वारा की जाती थी। यहाँ पूजा की अनोखी शैली में गर्भगृह के सामने बार-बार पर्दा खींचा जाता है ताकि भक्त लगातार मूर्ति को न निहारें, जो एक प्यारे और चंचल सम्बन्ध का प्रतीक है।',
        image: imagePath.SriRadha,
      },
    ],
  },
];
