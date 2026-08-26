import imagePath from '../assets';

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  textEn?: string;
  textHi: string;
  image: any;
  headerTitleEn?: string;
  headerTitleHi?: string;
  isJyotirlinga?: boolean;
}

export interface Category {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: any;
  coverImage?: any;
  descriptionEn: string;
  descriptionHi: string;
  items: CategoryItem[];
}

export const categoriesData: Category[] = [
  {
    id: 'aarti',
    titleEn: 'Aarti',
    titleHi: 'आरती',
    icon: imagePath.lamp,
    coverImage: imagePath.Ganesha,
    descriptionEn:
      'Devotional prayers sung in praise of deities to invoke their blessings.',
    descriptionHi:
      'देवी-देवताओं की स्तुति और आशीर्वाद प्राप्त करने के लिए गाई जाने वाली प्रार्थनाएं।',
    items: [
      {
        id: 'ganesha_aarti',
        nameEn: 'Ganesha Aarti',
        nameHi: 'श्री गणेश जी आरती',
        subtitleEn: 'Jai Ganesh Deva',
        subtitleHi: 'जय गणेश देवा',
        textHi:
          "जय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥\n\nएकदन्त दयावन्त, चार भुजाधारी।\nमाथे पर तिलक सोहे, मूसे की सवारी॥\n(माथे पर सिन्दूर सोहे, मूसे की सवारी॥)\n\nपान चढ़े फूल चढ़े, और चढ़े मेवा।\n(हार चढ़े, फूल चढ़े, और चढ़े मेवा।)\nलड्डुअन का भोग लगे, सन्त करें सेवा॥\n\nजय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥\n\nअँधे को आँख देत, कोढ़िन को काया।\nबाँझन को पुत्र देत, निर्धन को माया॥\n\n'सूर' श्याम शरण आए, सफल कीजे सेवा।\nमाता जाकी पार्वती, पिता महादेवा॥\n\nदीनन की लाज राखो, शम्भु सुतवारी।\nकामना को पूर्ण करो, जग बलिहारी॥\n\nजय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
        image: imagePath.Ganesha,
        headerTitleEn: '॥ Shri Ganesha Aarti ॥',
        headerTitleHi: '॥ श्री गणेशजी की आरती ॥',
      },
      {
        id: 'shiva_aarti',
        nameEn: 'Shiva Aarti',
        nameHi: 'शिव जी आरती',
        subtitleEn: 'Om Jai Shiv Omkara',
        subtitleHi: 'ॐ जय शिव ओंकारा',
        textHi:
          'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।\nब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥\nॐ जय शिव ओंकारा॥\n\nएकानन चतुरानन पञ्चानन राजे।\nहंसासन गरूड़ासन वृषवाहन साजे॥\nॐ जय शिव ओंकारा॥\n\nदो भुज चार चतुर्भुज दसभुज अति सोहे।\nत्रिगुण रूप निरखते त्रिभुवन जन मोहे॥\nॐ जय शिव ओंकारा॥\n\nअक्षमाला वनमाला मुण्डमाला धारी।\nत्रिपुरारी कंसारी कर माला धारी॥\nॐ जय शिव ओंकारा॥\n\nश्वेताम्बर पीताम्बर बाघम्बर अंगे।\nसनकादिक गरुणादिक भूतादिक संगे॥\nॐ जय शिव ओंकारा॥\n\nकर के मध्य कमण्डलु चक्र त्रिशूलधारी।\nसुखकारी दुखहारी जगपालन कारी॥\nॐ जय शिव ओंकारा॥\n\nब्रह्मा विष्णु सदाशिव जानत अविवेका।\nप्रणवाक्षर मध्ये ये तीनों एका॥\nॐ जय शिव ओंकारा॥\n\nलक्ष्मी व सावित्री पार्वती संगा।\nपार्वती अर्द्धांगी, शिवलहरी गंगा॥\nॐ जय शिव ओंकारा॥\n\nपर्वत सोहैं पार्वती, शंकर कैलासा।\nभांग धतूर का भोजन, भस्मी में वासा॥\nॐ जय शिव ओंकारा॥\n\nजटा में गंगा बहत है, गल मुण्डन माला।\nशेष नाग लिपटावत, ओढ़त मृगछाला॥\nॐ जय शिव ओंकारा॥\n\nकाशी में विराजे विश्वनाथ, नन्दी ब्रह्मचारी।\nनित उठ दर्शन पावत, महिमा अति भारी॥\nॐ जय शिव ओंकारा॥\n\nत्रिगुणस्वामी जी की आरती जो कोइ नर गावे।\nकहत शिवानन्द स्वामी, मनवान्छित फल पावे॥\nॐ जय शिव ओंकारा॥',
        image: imagePath.Bholenath,
        headerTitleEn: '॥ Shri Shiva Aarti ॥',
        headerTitleHi: '॥ शिवजी की आरती ॥',
      },
      {
        id: 'laxmi_aarti',
        nameEn: 'Lakshmi Aarti',
        nameHi: 'लक्ष्मी जी आरती',
        subtitleEn: 'om Jai Lakshmi Mata',
        subtitleHi: 'ॐ जय लक्ष्मी माता',
        textHi:
          'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निशिदिन सेवत, हरि विष्णु विधाता॥\nॐ जय लक्ष्मी माता॥\n\nउमा, रमा, ब्रह्माणी, तुम ही जग-माता।\nसूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥\nॐ जय लक्ष्मी माता॥\n\nदुर्गा रुप निरंजनी, सुख सम्पत्ति दाता।\nजो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥\nॐ जय लक्ष्मी माता॥\n\nतुम पाताल-निवासिनि, तुम ही शुभदाता।\nकर्म-प्रभाव-प्रकाशिनी, भवनिधि की त्राता॥\nॐ जय लक्ष्मी माता॥\n\nजिस घर में तुम रहतीं, सब सद्गुण आता।\nसब सम्भव हो जाता, मन नहीं घबराता॥\nॐ जय लक्ष्मी माता॥\n\nतुम बिन यज्ञ न होते, वस्त्र न कोई पाता।\nखान-पान का वैभव, सब तुमसे आता॥\nॐ जय लक्ष्मी माता॥\n\nशुभ-गुण मन्दिर सुन्दर, क्षीरोदधि-जाता।\nरत्न चतुर्दश तुम बिन, कोई नहीं पाता॥\nॐ जय लक्ष्मी माता॥\n\nमहालक्ष्मीजी की आरती, जो कोई जन गाता।\nउर आनन्द समाता, पाप उतर जाता॥\nॐ जय लक्ष्मी माता॥',
        image: imagePath.Laxmi,
        headerTitleEn: '॥ Shri Lakshmi Aarti ॥',
        headerTitleHi: '॥ श्री लक्ष्मीजी की आरती ॥',
      },
      {
        id: 'hanuman_aarti',
        nameEn: 'Hanuman Aarti',
        nameHi: 'हनुमान आरती',
        subtitleEn: 'Aarti Kije Hanuman Lala Ki',
        subtitleHi: 'आरती कीजै हनुमान लला की',
        textHi:
          'आरती कीजै हनुमान लला की।\nदुष्ट दलन रघुनाथ कला की॥\n\nजाके बल से गिरिवर कांपे।\nरोग दोष जाके निकट न झांके॥\n\nअंजनि पुत्र महा बलदाई।\nसन्तन के प्रभु सदा सहाई॥\n\nदे बीरा रघुनाथ पठाए।\nलंका जारि सिया सुधि लाए॥\n\nलंका सो कोट समुद्र-सी खाई।\nजात पवनसुत बार न लाई॥\n\nलंका जारि असुर संहारे।\nसियारामजी के काज सवारे॥\n\nलक्ष्मण मूर्छित पड़े सकारे।\nआनि संजीवन प्राण उबारे॥\n\nपैठि पाताल तोरि जम-कारे।\nअहिरावण की भुजा उखारे॥\n\nबाएं भुजा असुरदल मारे।\nदाहिने भुजा संतजन तारे॥\n\nसुर नर मुनि आरती उतारें।\nजय जय जय हनुमान उचारें॥\n\nकंचन थार कपूर लौ छाई।\nआरती करत अंजना माई॥\n\nजो हनुमानजी की आरती गावे।\nबसि बैकुण्ठ परम पद पावे॥',
        image: imagePath.Hanuman,
        headerTitleEn: '॥ Shri Hanuman Aarti ॥',
        headerTitleHi: '॥ हनुमानजी की आरती ॥',
      },
      {
        id: 'rama_aarti',
        nameEn: 'Rama Aarti',
        nameHi: 'राम आरती',
        subtitleEn: 'Shri Ramachandra Kripalu',
        subtitleHi: 'श्री रामचन्द्र कृपालु भजु मन',
        textHi:
          'श्री रामचन्द्र कृपालु भजु मन, हरण भवभय दारुणम्।\n\nनव कंज लोचन, कंज मुख करकंज पद कंजारुणम्॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nकन्दर्प अगणित अमित छवि, नव नील नीरद सुन्दरम्।\n\nपट पीत मानहुं तड़ित रूचि-शुचि नौमि जनक सुतावरम्॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nभजु दीनबंधु दिनेश दानव दैत्य वंश निकन्दनम्।\n\nरघुनन्द आनन्द कन्द कौशलचन्द्र दशरथ नन्द्नम्॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nसिर मुकुट कुंडल तिलक चारू उदारु अंग विभूषणम्।\n\nआजानुभुज शर चाप-धर, संग्राम जित खरदूषणम्॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nइति वदति तुलसीदास, शंकर शेष मुनि मन रंजनम्।\n\nमम हृदय कंज निवास कुरु, कामादि खल दल गंजनम्॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nमन जाहि राचेऊ मिलहि सो वर सहज सुन्दर सांवरो।\n\nकरुणा निधान सुजान शील सनेह जानत रावरो॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥\n\nएहि भाँति गौरी असीस सुन सिय हित हिय हरषित अली।\n\nतुलसी भवानिहि पूजी पुनि-पुनि मुदित मन मन्दिर चली॥\n\nश्री रामचन्द्र कृपालु भजु मन...॥',
        image: imagePath.Rama,
        headerTitleEn: '॥ Shri Rama Aarti ॥',
        headerTitleHi: '॥ श्री रामचंद्रजी की आरती ॥',
      },
      {
        id: 'durga_aarti',
        nameEn: 'Durga Aarti',
        nameHi: 'दुर्गा आरती',
        subtitleEn: 'Jai Ambe Gauri',
        subtitleHi: 'जय अम्बे गौरी',
        textHi:
          'जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥\nजय अम्बे गौरी॥\n\nमाँग सिन्दूर विराजत, टीको मृगमद को।\nउज्जवल से दोउ नैना, चन्द्रवदन नीको॥\nजय अम्बे गौरी॥\n\nकनक समान कलेवर, रक्ताम्बर राजै।\nरक्तपुष्प गल माला, कण्ठन पर साजै॥\nजय अम्बे गौरी॥\n\nकेहरि वाहन राजत, खड्ग खप्परधारी।\nसुर-नर-मुनि-जन सेवत, तिनके दुखहारी॥\nजय अम्बे गौरी॥\n\nकानन कुण्डल शोभित, नासाग्रे मोती।\nकोटिक चन्द्र दिवाकर, सम राजत ज्योति॥\nजय अम्बे गौरी॥\n\nशुम्भ-निशुम्भ बिदारे, महिषासुर घाती।\nधूम्र विलोचन नैना, निशिदिन मदमाती॥\nजय अम्बे गौरी॥\n\nचण्ड-मुण्ड संहारे, शोणित बीज हरे।\nमधु-कैटभ दोउ मारे, सुर भयहीन करे॥\nजय अम्बे गौरी॥\n\nब्रहमाणी रुद्राणी तुम कमला रानी।\nआगम-निगम-बखानी, तुम शिव पटरानी॥\nजय अम्बे गौरी॥\n\nचौंसठ योगिनी मंगल गावत, नृत्य करत भैरूँ।\nबाजत ताल मृदंगा, अरु बाजत डमरु॥\nजय अम्बे गौरी॥\n\nतुम ही जग की माता, तुम ही हो भरता।\nभक्तन की दुःख हरता, सुख सम्पत्ति करता॥\nजय अम्बे गौरी॥\n\nभुजा चार अति शोभित, वर-मुद्रा धारी।\nमनवान्छित फल पावत, सेवत नर-नारी॥\nजय अम्बे गौरी॥\n\nकन्चन थाल विराजत, अगर कपूर बाती।\nश्रीमालकेतु में राजत, कोटि रतन ज्योति॥\nजय अम्बे गौरी॥\n\nश्री अम्बेजी की आरती, जो कोई नर गावै।\nकहत शिवानन्द स्वामी, सुख सम्पत्ति पावै॥\nजय अम्बे गौरी॥',
        image: imagePath.Durga,
        headerTitleEn: '॥ Shri Durga Aarti ॥',
        headerTitleHi: '॥ दुर्गाजी की आरती ॥',
      },
      {
        id: 'vishnu_aarti',
        nameEn: 'Vishnu Aarti',
        nameHi: 'विष्णु आरती',
        subtitleEn: 'Om Jai Jagdish Hare',
        subtitleHi: 'ॐ जय जगदीश हरे',
        textHi:
          'ॐ जय जगदीश हरे, स्वामी ! जय जगदीश हरे।\nभक्त जनों के संकट, क्षण में दूर करे॥\nॐ जय जगदीश हरे॥\n\nजो ध्यावे फल पावे, दुःख विनसे मन का।\nस्वामी दुःख विनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥\nॐ जय जगदीश हरे॥\n\nमात-पिता तुम मेरे, शरण गहूँ मैं किसकी।\nस्वामी शरण गहूँ मैं किसकी।\nतुम बिन और न दूजा, आस करूँ जिसकी॥\nॐ जय जगदीश हरे॥\n\nतुम पूरण परमात्मा, तुम अन्तर्यामी।\nस्वामी तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी॥\nॐ जय जगदीश हरे॥\n\nतुम करुणा के सागर, तुम पालन-कर्ता।\nस्वामी तुम पालन-कर्ता।\nमैं मूरख खल कामी, कृपा करो भर्ता॥\nॐ जय जगदीश हरे॥\n\nतुम हो एक अगोचर, सबके प्राणपति।\nस्वामी सबके प्राणपति।\nकिस विधि मिलूँ दयामय, तुमको मैं कुमति॥\nॐ जय जगदीश हरे॥\n\nदीनबन्धु दुखहर्ता, तुम ठाकुर मेरे।\nस्वामी तुम ठाकुर मेरे।\nअपने हाथ उठाओ, द्वार पड़ा तेरे॥\nॐ जय जगदीश हरे॥\n\nविषय-विकार मिटाओ, पाप हरो देवा।\nस्वामी पाप हरो देवा।\nश्रद्धा-भक्ति बढ़ाओ, सन्तन की सेवा॥\nॐ जय जगदीश हरे॥\n\nश्री जगदीशजी की आरती, जो कोई नर गावे।\nस्वामी जो कोई नर गावे।\nकहत शिवानन्द स्वामी, सुख संपत्ति पावे॥\nॐ जय जगदीश हरे॥',
        image: imagePath.Vishnu,
        headerTitleEn: '॥ Shri Vishnu Aarti ॥',
        headerTitleHi: '॥ विष्णुजी की आरती ॥',
      },
      {
        id: 'saraswati_aarti',
        nameEn: 'Saraswati Aarti',
        nameHi: 'सरस्वती आरती',
        subtitleEn: 'Om Jai Saraswati Mata',
        subtitleHi: 'ॐ जय सरस्वती माता',
        textHi:
          'जय सरस्वती माता, मैया जय सरस्वती माता।\nसदगुण वैभव शालिनी, त्रिभुवन विख्याता॥\nजय सरस्वती माता॥\n\nचन्द्रवदनि पद्मासिनि, द्युति मंगलकारी।\nसोहे शुभ हंस सवारी, अतुल तेजधारी॥\nजय सरस्वती माता॥\n\nबाएं कर में वीणा, दाएं कर माला।\nशीश मुकुट मणि सोहे, गल मोतियन माला॥\nजय सरस्वती माता॥\n\nदेवी शरण जो आए, उनका उद्धार किया।\nपैठी मंथरा दासी, रावण संहार किया॥\nजय सरस्वती माता॥\n\nविद्या ज्ञान प्रदायिनि, ज्ञान प्रकाश भरो।\nमोह अज्ञान और तिमिर का, जग से नाश करो॥\nजय सरस्वती माता॥\n\nधूप दीप फल मेवा, माँ स्वीकार करो।\nज्ञानचक्षु दे माता, जग निस्तार करो॥\nजय सरस्वती माता॥\n\nमाँ सरस्वती की आरती, जो कोई जन गावे।\nहितकारी सुखकारी ज्ञान भक्ति पावे॥\nजय सरस्वती माता॥\n\nजय सरस्वती माता, जय जय सरस्वती माता।\nसदगुण वैभव शालिनी, त्रिभुवन विख्याता॥\nजय सरस्वती माता॥',
        image: imagePath.Saraswati,
        headerTitleEn: '॥ Shri Saraswati Aarti ॥',
        headerTitleHi: '॥ सरस्वतीजी की आरती ॥',
      },
      {
        id: 'santoshi_aarti',
        nameEn: 'Santoshi Mata Aarti',
        nameHi: 'संतोषी माता आरती',
        subtitleEn: 'Jai Santoshi Mata',
        subtitleHi: 'जय सन्तोषी माता',
        textHi:
          'जय सन्तोषी माता, मैया जय सन्तोषी माता।\nअपने सेवक जन को, सुख सम्पत्ति दाता॥\nजय सन्तोषी माता॥\n\nसुन्दर चीर सुनहरी माँ धारण कीन्हों।\nहीरा पन्ना दमके, तन श्रृंगार कीन्हों॥\nजय सन्तोषी माता॥\n\nगेरू लाल छटा छवि, बदन कमल सोहे।\nमन्द हंसत करुणामयी, त्रिभुवन मन मोहे॥\nजय सन्तोषी माता॥\n\nस्वर्ण सिंहासन बैठी, चंवर ढुरें प्यारे।\nधूप दीप मधुमेवा, भोग धरें न्यारे॥\nजय सन्तोषी माता॥\n\nगुड़ अरु चना परमप्रिय, तामे संतोष कियो।\nसन्तोषी कहलाई, भक्तन वैभव दियो॥\nजय सन्तोषी माता॥\n\nशुक्रवार प्रिय मानत, आज दिवस सोही।\nभक्त मण्डली छाई, कथा सुनत मोही॥\nजय सन्तोषी माता॥\n\nमन्दिर जगमग ज्योति, मंगल ध्वनि छाई।\nविनय करें हम बालक, चरनन सिर नाई॥\nजय सन्तोषी माता॥\n\nभक्ति भावमय पूजा, अंगीकृत कीजै।\nजो मन बसै हमारे, इच्छा फल दीजै॥\nजय सन्तोषी माता॥\n\nदुखी दरिद्री, रोग, संकट मुक्त किये।\nबहु धन-धान्य भरे घर, सुख सौभाग्य दिये॥\nजय सन्तोषी माता॥\n\nध्यान धर्यो जिस जन ने, मनवांछित फल पायो।\nपूजा कथा श्रवण कर, घर आनन्द आयो॥\nजय सन्तोषी माता॥\n\nशरण गहे की लज्जा, राखियो जगदम्बे।\nसंकट तू ही निवारे, दयामयी अम्बे॥\nजय सन्तोषी माता॥\n\nसन्तोषी माता की आरती, जो कोई जन गावे।\nऋद्धि-सिद्धि, सुख-सम्पत्ति, जी भरकर पावे॥\nजय सन्तोषी माता॥',
        image: imagePath.Laxmi,
        headerTitleEn: '॥ Shri Santoshi Mata Aarti ॥',
        headerTitleHi: '॥ संतोषी माता जी की आरती ॥',
      },
      {
        id: 'ganga_aarti',
        nameEn: 'Ganga Aarti',
        nameHi: 'गंगा आरती',
        subtitleEn: 'Jai Gange Mata',
        subtitleHi: 'ॐ जय गंगे माता',
        textHi:
          'ॐ जय गंगे माता, मैया जय गंगे माता।\nजो नर तुमको ध्याता, मनवांछित फल पाता॥\nॐ जय गंगे माता॥\n\nचन्द्र-सी ज्योति तुम्हारी, जल निर्मल आता।\nशरण पड़े जो तेरी, सो नर तर जाता॥\nॐ जय गंगे माता॥\n\nपुत्र सगर के तारे, सब जग को ज्ञाता।\nकृपा दृष्टि हो तुम्हारी, त्रिभुवन सुख दाता॥\nॐ जय गंगे माता॥\n\nएक बार जो प्राणी, शरण तेरी आता।\nयम की त्रास मिटाकर, परमगति पाता॥\nॐ जय गंगे माता॥\n\nआरती मातु तुम्हारी, जो नर नित गाता।\nसेवक वही सहज में, मुक्ति को पाता॥\nॐ जय गंगे माता॥',
        image: imagePath.Saraswati,
        headerTitleEn: '॥ Shri Ganga Aarti ॥',
        headerTitleHi: '॥ गंगाजी की आरती ॥',
      },
      {
        id: 'bankey_bihari_aarti',
        nameEn: 'Bankey Bihari Aarti',
        nameHi: 'बांके बिहारी आरती',
        subtitleEn: 'Aarti Shri Bankey Bihari Ki',
        subtitleHi: 'आरती श्री बाँकेबिहारी की',
        textHi:
          'श्री बाँकेबिहारी तेरी आरती गाऊँ।\nकुन्जबिहारी तेरी आरती गाऊँ।\nश्री श्यामसुन्दर तेरी आरती गाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥\n\nमोर मुकुट प्रभु शीश पे सोहे।\nप्यारी बंशी मेरो मन मोहे।\nदेखि छवि बलिहारी जाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥\n\nचरणों से निकली गंगा प्यारी।\nजिसने सारी दुनिया तारी।\nमैं उन चरणों के दर्शन पाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥\n\nदास अनाथ के नाथ आप हो।\nदुःख सुख जीवन प्यारे साथ हो।\nहरि चरणों में शीश नवाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥\n\nश्री हरि दास के प्यारे तुम हो।\nमेरे मोहन जीवन धन हो।\nदेखि युगल छवि बलि-बलि जाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥\n\nआरती गाऊँ प्यारे तुमको रिझाऊँ।\nहे गिरिधर तेरी आरती गाऊँ।\nश्री श्यामसुन्दर तेरी आरती गाऊँ।\nश्री बाँकेबिहारी तेरी आरती गाऊँ॥',
        image: imagePath.Krishna,
        headerTitleEn: '॥ Shri Bankey Bihari Aarti ॥',
        headerTitleHi: '॥ श्री बांके बिहारीजी की आरती ॥',
      },
      {
        id: 'kubera_aarti',
        nameEn: 'Kubera Aarti',
        nameHi: 'कुबेर आरती',
        subtitleEn: 'Om Jai Yaksha Kubera Hare',
        subtitleHi: 'ॐ जै यक्ष कुबेर हरे',
        textHi:
          'ॐ जै यक्ष कुबेर हरे, स्वामी जै यक्ष जै यक्ष कुबेर हरे।\nशरण पड़े भगतों के, भण्डार कुबेर भरे॥\nॐ जै यक्ष कुबेर हरे...॥\n\nशिव भक्तों में भक्त कुबेर बड़े, स्वामी भक्त कुबेर बड़े।\nदैत्य दानव मानव से, कई-कई युद्ध लड़े॥\nॐ जै यक्ष कुबेर हरे...॥\n\nस्वर्ण सिंहासन बैठे, सिर पर छत्र फिरे, स्वामी सिर पर छत्र फिरे।\nयोगिनी मंगल गावैं, सब जय जय कार करैं॥\nॐ जै यक्ष कुबेर हरे...॥\n\nगदा त्रिशूल हाथ में, शस्त्र बहुत धरे, स्वामी शस्त्र बहुत धरे।\nदुख भय संकट मोचन, धनुष टंकार करें॥\nॐ जै यक्ष कुबेर हरे...॥\n\nभाँति भाँति के व्यंजन बहुत बने, स्वामी व्यंजन बहुत बने।\nमोहन भोग लगावैं, साथ में उड़द चने॥\nॐ जै यक्ष कुबेर हरे...॥\n\nबल बुद्धि विद्या दाता, हम तेरी शरण पड़े, स्वामी हम तेरी शरण पड़े।\nअपने भक्त जनों के, सारे काम संवारे॥\nॐ जै यक्ष कुबेर हरे...॥\n\nमुकुट मणी की शोभा, मोतियन हार गले, स्वामी मोतियन हार गले।\nअगर कपूर की बाती, घी की जोत जले॥\nॐ जै यक्ष कुबेर हरे...॥\n\nयक्ष कुबेर जी की आरती, जो कोई नर गावे, स्वामी जो कोई नर गावे।\nकहत प्रेमपाल स्वामी, मनवांछित फल पावे॥\nॐ जै यक्ष कुबेर हरे...॥',
        image: imagePath.Kubera,
        headerTitleEn: '॥ Shri Kubera Aarti ॥',
        headerTitleHi: '॥ श्री कुबेरजी की आरती ॥',
      },
      {
        id: 'vishwakarma_aarti',
        nameEn: 'Vishwakarma Aarti',
        nameHi: 'विश्वकर्मा आरती',
        subtitleEn: 'Prabhu Shri Vishwakarma Ghar Aavo',
        subtitleHi: 'प्रभु श्री विश्वकर्मा घर आवो',
        textHi:
          'प्रभु श्री विश्वकर्मा घर आवो प्रभु विश्वकर्मा।\nसुदामा की विनय सुनी और कंचन महल बनाये।\nसकल पदारथ देकर प्रभु जी दुखियों के दुख टारे॥\nप्रभु श्री विश्वकर्मा घर आवो...॥\n\nविनय करी भगवान कृष्ण ने द्वारिकापुरी बनाओ।\nग्वाल बालों की रक्षा की प्रभु की लाज बचायो॥\nप्रभु श्री विश्वकर्मा घर आवो...॥\n\nरामचन्द्र ने पूजन की तब सेतु बांध रचि डारो।\nसब सेना को पार किया प्रभु लंका विजय करावो॥\nप्रभु श्री विश्वकर्मा घर आवो...॥\n\nश्री कृष्ण की विजय सुनो प्रभु आके दर्श दिखावो।\nशिल्प विद्या का दो प्रकाश मेरा जीवन सफल बनावो॥\nप्रभु श्री विश्वकर्मा घर आवो...॥',
        image: imagePath.Brahma,
        headerTitleEn: '॥ Shri Vishwakarma Aarti ॥',
        headerTitleHi: '॥ श्री विश्वकर्माजी की आरती ॥',
      },
      {
        id: 'kali_aarti',
        nameEn: 'Kali Ma Aarti',
        nameHi: 'काली मां आरती',
        subtitleEn: 'Ambe Tu Hai Jagdambe Kali',
        subtitleHi: 'अम्बे तू है जगदम्बे काली',
        textHi:
          'अम्बे तू है जगदम्बे काली, जय दुर्गे खप्पर वाली,\nतेरे ही गुण गावें भारती, ओ मैया हम सब उतारे तेरी आरती।\nओ मैया हम सब उतारे तेरी आरती॥\n\nतेरे भक्त जनो पर माता भीर पड़ी है भारी।\nदानव दल पर टूट पड़ो माँ करके सिंह सवारी॥\nसौ-सौ सिहों से बलशाली, है अष्ट भुजाओं वाली,\nदुष्टों को तू ही ललकारती।\nओ मैया हम सब उतारे तेरी आरती॥\n\nमाँ-बेटे का है इस जग में बड़ा ही निर्मल नाता।\nपूत-कपूत सुने है पर ना माता सुनी कुमाता॥\nसब पे करूणा दर्शाने वाली, अमृत बरसाने वाली,\nदुखियों के दुखड़े निवारती।\nओ मैया हम सब उतारे तेरी आरती॥\n\nनहीं मांगते धन और दौलत, न चांदी न सोना।\nहम तो मांगें तेरे चरणों में छोटा सा कोना॥\nसबकी बिगड़ी बनाने वाली, लाज बचाने वाली,\nसतियों के सत को संवारती।\nओ मैया हम सब उतारे तेरी आरती॥\n\nचरण शरण में खड़े तुम्हारी, ले पूजा की थाली।\nवरद हस्त सर पर रख दो माँ संकट हरने वाली॥\nमाँ भर दो भक्ति रस प्याली, अष्ट भुजाओं वाली,\nभक्तों के कारज तू ही सारती।\nओ मैया हम सब उतारे तेरी आरती॥',
        image: imagePath.Durga,
        headerTitleEn: '॥ Shri Kali Ma Aarti ॥',
        headerTitleHi: '॥ काली माता जी की आरती ॥',
      },
    ],
  },

  {
    id: 'shlok',
    titleEn: 'Shlok',
    titleHi: 'श्लोक',
    icon: imagePath.shlok,
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
        textEn:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nTranslation:\nO Lord Ganesha, of curved trunk and massive body, whose splendor is equal to a million suns, please make all my undertakings free of obstacles, always.',
        textHi:
          'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nअनुवाद:\nहे मुड़े हुए सूंड वाले, विशाल शरीर और करोड़ों सूर्यों के समान तेज वाले श्री गणेश जी! मेरे सभी कार्यों को बिना किसी बाधा के सदा पूर्ण करें।',
        image: imagePath.Ganesha,
      },
      {
        id: 'guru_shlok',
        nameEn: 'Guru Vandana',
        nameHi: 'गुरु वंदना',
        subtitleEn: 'Gurur Brahma Gurur Vishnu',
        subtitleHi: 'गुरुर्ब्रह्मा गुरुर्विष्णुः',
        textEn:
          'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥\n\nTranslation:\nThe Guru is Brahma, the Guru is Vishnu, the Guru is the Great Lord Shiva. The Guru is verily the supreme Absolute. Salutations to that revered Guru.',
        textHi:
          'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥\n\nअनुवाद:\nगुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही भगवान शंकर हैं। गुरु ही साक्षात् परब्रह्म हैं, ऐसे पूज्य गुरुदेव को मेरा नमस्कार है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'shanti_shlok',
        nameEn: 'Shanti Mantra',
        nameHi: 'शान्ति मन्त्र',
        subtitleEn: 'Om Sarve Bhavantu Sukhinah',
        subtitleHi: 'ॐ सर्वे भवन्तु सुखिनः',
        textEn:
          'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्॥\n\nTranslation:\nMay all beings be happy, may all beings be free from illness. May all see what is auspicious, may no one suffer.',
        textHi:
          'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्॥\n\nअनुवाद:\nसब सुखी हों, सब रोगमुक्त रहें, सब मंगलमय घटनाओं के साक्षी बनें और किसी को भी दुःख का भागी न बनना पड़े।',
        image: imagePath.Vishnu,
      },
    ],
  },
  {
    id: 'stories',
    titleEn: 'Mythology Stories',
    titleHi: 'पौराणिक कथाएं',
    icon: imagePath.books,
    coverImage: imagePath.Rama,
    descriptionEn:
      'Timeless tales of devotion, righteousness, and divine miracles from Indian scriptures.',
    descriptionHi:
      'भारतीय धर्मग्रंथों से भक्ति, धर्म और दिव्य चमत्कारों की अमर गाथाएं।',
    items: [
      {
        id: 'samudra_manthan',
        nameEn: 'Samudra Manthan',
        nameHi: 'समुद्र मंथन की कथा',
        subtitleEn: 'The Churning of the Ocean',
        subtitleHi: 'अमृत और विष की उत्पत्ति',
        textEn:
          'When the gods (Devas) and demons (Asuras) sought immortality, they joined hands to churn the great ocean of milk (Kshira Sagara) using Mount Mandara as the churning rod and serpent Vasuki as the rope.\n\nFrom the churning emerged many divine treasures, including Goddess Lakshmi, the wish-fulfilling cow Kamadhenu, and the Kalpavriksha tree. However, the deadly poison Halahala also arose, threatening to consume all creation.\n\nLord Shiva, the embodiment of compassion, consumed the lethal venom to save the universe, holding it in His throat, which turned blue, earning Him the name Neelakantha. Finally, Lord Dhanvantari appeared with the pot of Amrita (nectar of immortality), securing divine harmony.',
        textHi:
          'जब देवताओं और असुरों ने अमरत्व प्राप्त करने की इच्छा की, तो उन्होंने मंदराचल पर्वत को मथानी और नागराज वासुकि को नेती बनाकर क्षीरसागर का मंथन किया।\n\nमंथन से माँ लक्ष्मी, कामधेनु गाय, और कल्पवृक्ष सहित चौदह दिव्य रत्न निकले। इसी मंथन से हलाहल नामक भयंकर विष भी प्रकट हुआ, जिससे समस्त सृष्टि में हाहाकार मच गया।\n\nसृष्टि की रक्षा के लिए भगवान शिव ने उस विष को अपने कंठ में धारण कर लिया, जिससे उनका कंठ नीला पड़ गया और वे "नीलकंठ" कहलाए। अंत में भगवान धन्वंतरि अमृत कलश लेकर प्रकट हुए, जिससे धर्म और सत्य की विजय हुई।',
        image: imagePath.Bholenath,
      },
      {
        id: 'bhakt_prahlad',
        nameEn: 'Story of Bhakt Prahlad',
        nameHi: 'भक्त प्रह्लाद की कथा',
        subtitleEn: 'Unwavering Devotion & Narasimha Avatar',
        subtitleHi: 'अडिग भक्ति और नरसिंह अवतार',
        textEn:
          'Prahlad, the young prince born to the demon king Hiranyakashipu, was an ardent devotee of Lord Vishnu. Enraged by his son’s devotion, Hiranyakashipu subjected Prahlad to numerous torments, yet every attempt to harm him failed through divine grace.\n\nWhen Hiranyakashipu challenged Prahlad to show where his Lord resided and struck a pillar in anger, Lord Vishnu emerged in the fierce half-man, half-lion form of Narasimha Avatar at twilight, destroying the demon and protecting His beloved devotee.\n\nThis sacred tale stands as eternal testimony that pure faith and devotion conquer all arrogance and darkness.',
        textHi:
          'दैत्यराज हिरण्यकश्यप का पुत्र प्रह्लाद भगवान विष्णु का अनन्य भक्त था। अपने ही पुत्र की विष्णु भक्ति से क्रोधित होकर हिरण्यकश्यप ने प्रह्लाद को अनेक यातनाएं दीं, किंतु प्रभु कृपा से प्रह्लाद का बाल भी बांका न हुआ।\n\nजब अभिमानी हिरण्यकश्यप ने पूछा कि "तेरा भगवान कहाँ है?" और खंभे पर प्रहार किया, तो भगवान विष्णु ने संध्या के समय खंभे से "नृसिंह अवतार" (आधा सिंह, आधा मनुष्य) धारण कर प्रकट होकर हिरण्यकश्यप का वध किया और प्रह्लाद की रक्षा की।\n\nयह कथा सिखाती है कि सच्ची भक्ति और विश्वास के आगे अहंकार कभी टिक नहीं सकता।',
        image: imagePath.Vishnu,
      },
      {
        id: 'bhakt_prahlad',
        nameEn: 'Story of Bhakt Prahlad',
        nameHi: 'भक्त प्रह्लाद की कथा',
        subtitleEn: 'Unwavering Devotion & Narasimha Avatar',
        subtitleHi: 'अडिग भक्ति और नरसिंह अवतार',
        textEn:
          'Prahlad, the young prince born to the demon king Hiranyakashipu, was an ardent devotee of Lord Vishnu. Enraged by his son’s devotion, Hiranyakashipu subjected Prahlad to numerous torments, yet every attempt to harm him failed through divine grace.\n\nWhen Hiranyakashipu challenged Prahlad to show where his Lord resided and struck a pillar in anger, Lord Vishnu emerged in the fierce half-man, half-lion form of Narasimha Avatar at twilight, destroying the demon and protecting His beloved devotee.\n\nThis sacred tale stands as eternal testimony that pure faith and devotion conquer all arrogance and darkness.',
        textHi:
          'दैत्यराज हिरण्यकश्यप का पुत्र प्रह्लाद भगवान विष्णु का अनन्य भक्त था। अपने ही पुत्र की विष्णु भक्ति से क्रोधित होकर हिरण्यकश्यप ने प्रह्लाद को अनेक यातनाएं दीं, किंतु प्रभु कृपा से प्रह्लाद का बाल भी बांका न हुआ।\n\nजब अभिमानी हिरण्यकश्यप ने पूछा कि "तेरा भगवान कहाँ है?" और खंभे पर प्रहार किया, तो भगवान विष्णु ने संध्या के समय खंभे से "नृसिंह अवतार" (आधा सिंह, आधा मनुष्य) धारण कर प्रकट होकर हिरण्यकश्यप का वध किया और प्रह्लाद की रक्षा की।\n\nयह कथा सिखाती है कि सच्ची भक्ति और विश्वास के आगे अहंकार कभी टिक नहीं सकता।',
        image: imagePath.Vishnu,
      },
      {
        id: 'bhakt_prahlad',
        nameEn: 'Story of Bhakt Prahlad',
        nameHi: 'भक्त प्रह्लाद की कथा',
        subtitleEn: 'Unwavering Devotion & Narasimha Avatar',
        subtitleHi: 'अडिग भक्ति और नरसिंह अवतार',
        textEn:
          'Prahlad, the young prince born to the demon king Hiranyakashipu, was an ardent devotee of Lord Vishnu. Enraged by his son’s devotion, Hiranyakashipu subjected Prahlad to numerous torments, yet every attempt to harm him failed through divine grace.\n\nWhen Hiranyakashipu challenged Prahlad to show where his Lord resided and struck a pillar in anger, Lord Vishnu emerged in the fierce half-man, half-lion form of Narasimha Avatar at twilight, destroying the demon and protecting His beloved devotee.\n\nThis sacred tale stands as eternal testimony that pure faith and devotion conquer all arrogance and darkness.',
        textHi:
          'दैत्यराज हिरण्यकश्यप का पुत्र प्रह्लाद भगवान विष्णु का अनन्य भक्त था। अपने ही पुत्र की विष्णु भक्ति से क्रोधित होकर हिरण्यकश्यप ने प्रह्लाद को अनेक यातनाएं दीं, किंतु प्रभु कृपा से प्रह्लाद का बाल भी बांका न हुआ।\n\nजब अभिमानी हिरण्यकश्यप ने पूछा कि "तेरा भगवान कहाँ है?" और खंभे पर प्रहार किया, तो भगवान विष्णु ने संध्या के समय खंभे से "नृसिंह अवतार" (आधा सिंह, आधा मनुष्य) धारण कर प्रकट होकर हिरण्यकश्यप का वध किया और प्रह्लाद की रक्षा की।\n\nयह कथा सिखाती है कि सच्ची भक्ति और विश्वास के आगे अहंकार कभी टिक नहीं सकता।',
        image: imagePath.Vishnu,
      },
      {
        id: 'bhakt_prahlad',
        nameEn: 'Story of Bhakt Prahlad',
        nameHi: 'भक्त प्रह्लाद की कथा',
        subtitleEn: 'Unwavering Devotion & Narasimha Avatar',
        subtitleHi: 'अडिग भक्ति और नरसिंह अवतार',
        textEn:
          'Prahlad, the young prince born to the demon king Hiranyakashipu, was an ardent devotee of Lord Vishnu. Enraged by his son’s devotion, Hiranyakashipu subjected Prahlad to numerous torments, yet every attempt to harm him failed through divine grace.\n\nWhen Hiranyakashipu challenged Prahlad to show where his Lord resided and struck a pillar in anger, Lord Vishnu emerged in the fierce half-man, half-lion form of Narasimha Avatar at twilight, destroying the demon and protecting His beloved devotee.\n\nThis sacred tale stands as eternal testimony that pure faith and devotion conquer all arrogance and darkness.',
        textHi:
          'दैत्यराज हिरण्यकश्यप का पुत्र प्रह्लाद भगवान विष्णु का अनन्य भक्त था। अपने ही पुत्र की विष्णु भक्ति से क्रोधित होकर हिरण्यकश्यप ने प्रह्लाद को अनेक यातनाएं दीं, किंतु प्रभु कृपा से प्रह्लाद का बाल भी बांका न हुआ।\n\nजब अभिमानी हिरण्यकश्यप ने पूछा कि "तेरा भगवान कहाँ है?" और खंभे पर प्रहार किया, तो भगवान विष्णु ने संध्या के समय खंभे से "नृसिंह अवतार" (आधा सिंह, आधा मनुष्य) धारण कर प्रकट होकर हिरण्यकश्यप का वध किया और प्रह्लाद की रक्षा की।\n\nयह कथा सिखाती है कि सच्ची भक्ति और विश्वास के आगे अहंकार कभी टिक नहीं सकता।',
        image: imagePath.Vishnu,
      },
    ],
  },
  {
    id: 'temples',
    titleEn: 'Famous Temples',
    titleHi: 'प्रसिद्ध मंदिर',
    icon: imagePath.temples,
    // coverImage: imagePath.Rama,
    descriptionEn:
      'Architectural marvels and sacred pilgrimage destinations of rich heritage.',
    descriptionHi:
      'भारतीय संस्कृति और आध्यात्मिक धरोहर के अद्वितीय वास्तुकला और पावन तीर्थ स्थल।',
    items: [
      {
        id: 'somnath',
        nameEn: 'Somnath Temple',
        nameHi: 'सोमनाथ मंदिर',
        subtitleEn: 'Veraval, Gujarat',
        subtitleHi: 'वेरावल, गुजरात',
        textEn:
          'Located in Gujarat, it is traditionally considered the first of the twelve Jyotirlinga shrines of Shiva. It has risen resiliently over history as a symbol of eternal faith.',
        textHi:
          'गुजरात के वेरावल में स्थित सोमनाथ मंदिर को 12 ज्योतिर्लिंगों में सर्वप्रथम माना जाता है। इतिहास के झंझावातों से उबरकर यह मंदिर आज भी सनातन आस्था का भव्य प्रतीक है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'mallikarjuna',
        nameEn: 'Mallikarjuna Temple',
        nameHi: 'मल्लिकार्जुन ज्योतिर्लिंग',
        subtitleEn: 'Srisailam, Andhra Pradesh',
        subtitleHi: 'श्रीशैलम, आंध्र प्रदेश',
        textEn:
          'Perched on the Srisailam hills, it is a unique temple where both a Jyotirlinga (Shiva) and a Shakti Peetha (Parvati) coexist, bringing divine energy together.',
        textHi:
          'आंध्र प्रदेश के श्रीशैलम पर्वत पर स्थित मल्लिकार्जुन ज्योतिर्लिंग शिव और शक्ति (पार्वती) दोनों का पावन संगम स्थल है, जो अद्वितीय आध्यात्मिक ऊर्जा प्रदान करता है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'mahakaleshwar',
        nameEn: 'Mahakaleshwar Temple',
        nameHi: 'महाकालेश्वर ज्योतिर्लिंग',
        subtitleEn: 'Ujjain, Madhya Pradesh',
        subtitleHi: 'उज्जैन, मध्य प्रदेश',
        textEn:
          'Famous for its unique "Bhasma Aarti" and south-facing deity (Dakshinamurti), it stands on the banks of Shipra river in the ancient city of Ujjain.',
        textHi:
          'उज्जैन में क्षिप्रा नदी के तट पर स्थित महाकालेश्वर ज्योतिर्लिंग अपने दक्षिणमुखी स्वरूप और भस्म आरती के लिए विश्वभर में प्रसिद्ध है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'omkareshwar',
        nameEn: 'Omkareshwar Temple',
        nameHi: 'ओंकारेश्वर ज्योतिर्लिंग',
        subtitleEn: 'Khandwa, Madhya Pradesh',
        subtitleHi: 'खण्डवा, मध्य प्रदेश',
        textEn:
          'Situated on Mandhata island in the Narmada river, the shape of the island naturally resembles the sacred symbol "OM", offering deep peace.',
        textHi:
          'नर्मदा नदी के मध्य मान्धाता द्वीप पर स्थित ओंकारेश्वर मंदिर का प्राकृतिक स्वरूप पवित्र "ॐ" आकृति के समान दिखाई देता है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'kedarnath',
        nameEn: 'Kedarnath Temple',
        nameHi: 'केदारनाथ धाम',
        subtitleEn: 'Rudraprayag, Uttarakhand',
        subtitleHi: 'रुद्रप्रयाग, उत्तराखण्ड',
        textEn:
          'Located in the Himalayas near the Mandakini River, Kedarnath is one of the twelve Jyotirlingas of Lord Shiva and the most prominent among the Panch Kedar.',
        textHi:
          'उत्तराखण्ड के रुद्रप्रयाग जिले में मंदाकिनी नदी के तट पर हिमालय की गोद में स्थित श्री केदारनाथ मंदिर भगवान शिव के बारह ज्योतिर्लिंगों में से एक प्रमुख धाम है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'bhimashankar',
        nameEn: 'Bhimashankar Temple',
        nameHi: 'भीमाशंकर ज्योतिर्लिंग',
        subtitleEn: 'Pune, Maharashtra',
        subtitleHi: 'पुणे, महाराष्ट्र',
        textEn:
          'Located in the Sahyadri hills near Pune, it is the source of Bhima river, set amidst lush green forests that are home to the giant squirrel.',
        textHi:
          'पुणे के निकट सह्याद्रि पहाड़ियों में स्थित भीमाशंकर ज्योतिर्लिंग भीमा नदी का उद्गम स्थल भी है और प्रकृति की सुंदर वादियों में बसा है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'kashi_vishwanath',
        nameEn: 'Kashi Vishwanath',
        nameHi: 'काशी विश्वनाथ मंदिर',
        subtitleEn: 'Varanasi, Uttar Pradesh',
        subtitleHi: 'वाराणसी, उत्तर प्रदेश',
        textEn:
          'Situated on the western bank of the holy river Ganga in Varanasi, Kashi Vishwanath is one of the most revered Shiva temples in the world.',
        textHi:
          'पवित्र गंगा नदी के पावन तट पर स्थित वाराणसी का श्री काशी विश्वनाथ मंदिर विश्वभर के शिव भक्तों के लिए परम पावन तीर्थ है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'trimbakeshwar',
        nameEn: 'Trimbakeshwar Temple',
        nameHi: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
        subtitleEn: 'Nashik, Maharashtra',
        subtitleHi: 'नाशिक, महाराष्ट्र',
        textEn:
          'Located in Nashik, it houses a unique three-faced lingam representing Brahma, Vishnu, and Shiva, and is close to the Godavari river source.',
        textHi:
          'नाशिक में गोदावरी के उद्गम के पास स्थित इस मंदिर का ज्योतिर्लिंग अनूठा है, जिसमें ब्रह्मा, विष्णु और महेश के प्रतीक तीन मुख हैं।',
        image: imagePath.Bholenath,
      },
      {
        id: 'baidyanath',
        nameEn: 'Baidyanath Dham',
        nameHi: 'वैद्यनाथ धाम',
        subtitleEn: 'Deoghar, Jharkhand',
        subtitleHi: 'देवघर, झारखण्ड',
        textEn:
          'Known as Baba Dham in Deoghar, it is famous for the annual Shravani Mela where millions carry holy Ganga water from Sultanganj to worship.',
        textHi:
          'झारखण्ड के देवघर में स्थित बाबा धाम शिव भक्तों के लिए विशेष है, जहाँ सावन के महीने में कांवड़िए गंगाजल लाकर जलाभिषेक करते हैं।',
        image: imagePath.Bholenath,
      },
      {
        id: 'nageshwar',
        nameEn: 'Nageshwar Jyotirlinga',
        nameHi: 'नागेश्वर ज्योतिर्लिंग',
        subtitleEn: 'Dwarka, Gujarat',
        subtitleHi: 'द्वारका, गुजरात',
        textEn:
          'Located near Dwarka in Gujarat, it signifies the Lord of Serpents and is believed to protect devotees from all poisons and negative energy.',
        textHi:
          'गुजरात में द्वारका के निकट स्थित नागेश्वर ज्योतिर्लिंग भगवान शिव को "नागों का ईश्वर" दर्शाता है। यह भक्तों को नकारात्मक ऊर्जा से बचाता है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'rameshwaram',
        nameEn: 'Ramanathaswamy Temple',
        nameHi: 'रामेश्वरम मंदिर',
        subtitleEn: 'Rameswaram, Tamil Nadu',
        subtitleHi: 'रामेश्वरम, तमिलनाडु',
        textEn:
          'Located in Tamil Nadu, this Jyotirlinga was established by Lord Rama. It features the longest temple corridor in the world.',
        textHi:
          'तमिलनाडु में स्थित इस पावन ज्योतिर्लिंग की स्थापना स्वयं भगवान श्रीराम ने की थी। इस मंदिर का गलियारा विश्व में सबसे लंबा है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'grishneshwar',
        nameEn: 'Grishneshwar Temple',
        nameHi: 'घृष्णेश्वर ज्योतिर्लिंग',
        subtitleEn: 'Aurangabad, Maharashtra',
        subtitleHi: 'औरंगाबाद, महाराष्ट्र',
        textEn:
          'Located near the ancient Ellora caves, it is the last of the twelve Jyotirlingas, built with beautiful red rocks and carvings.',
        textHi:
          'महाराष्ट्र में एलोरा की गुफाओं के पास लाल पत्थरों से निर्मित घृष्णेश्वर ज्योतिर्लिंग 12 ज्योतिर्लिंगों में अंतिम माना जाता है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'jageshwar',
        nameEn: 'Jageshwar Dham',
        nameHi: 'जागेश्वर धाम',
        subtitleEn: 'Almora, Uttarakhand',
        subtitleHi: 'अल्मोड़ा, उत्तराखण्ड',
        textEn:
          'A valley temple complex of 124 stone temples, it is considered a heritage site showcasing exquisite early medieval architecture.',
        textHi:
          'अल्मोड़ा की देवदार वादियों में स्थित 124 छोटे-बड़े पत्थरों के मंदिरों का समूह जागेश्वर धाम स्थापत्य कला का बेजोड़ खजाना है।',
        image: imagePath.Bholenath,
      },
      {
        id: 'neelkanth',
        nameEn: 'Neelkanth Mahadev',
        nameHi: 'नीलकंठ महादेव मंदिर',
        subtitleEn: 'Rishikesh, Uttarakhand',
        subtitleHi: 'ऋषिकेश, उत्तराखण्ड',
        textEn:
          'Situated at Rishikesh amidst dense forests, it marks the sacred spot where Lord Shiva consumed the poison from the Samudra Manthan.',
        textHi:
          'ऋषिकेश की घनी पहाड़ियों के बीच स्थित नीलकंठ महादेव मंदिर वह स्थान है जहाँ शिव ने समुद्र मंथन का विषपान कर सृष्टि की रक्षा की थी।',
        image: imagePath.Bholenath,
      },
      {
        id: 'badrinath',
        nameEn: 'Badrinath Temple',
        nameHi: 'बद्रीनाथ धाम',
        subtitleEn: 'Chamoli, Uttarakhand',
        subtitleHi: 'चमोली, उत्तराखण्ड',
        textEn:
          'Part of the Char Dham pilgrimage, it is dedicated to Lord Vishnu and is set in the lap of the Nar and Narayana mountain ranges.',
        textHi:
          'उत्तराखण्ड के चमोली में अलकनंदा तट पर स्थित बद्रीनाथ धाम भगवान विष्णु को समर्पित प्रमुख चार धाम तीर्थों में से एक है।',
        image: imagePath.Vishnu,
      },
      {
        id: 'vaishnodevi',
        nameEn: 'Vaishno Devi Temple',
        nameHi: 'वैष्णो देवी मंदिर',
        subtitleEn: 'Katra, Jammu & Kashmir',
        subtitleHi: 'कटड़ा, जम्मू और कश्मीर',
        textEn:
          'Perched on the Trikuta Hills in Jammu, this holy cave shrine attracts millions of devotees seeking blessings from Mother Vaishno Devi.',
        textHi:
          'जम्मू के त्रिकुटा पर्वत पर स्थित वैष्णो देवी गुफा मंदिर में शक्ति स्वरूपा माता वैष्णो देवी वास करती हैं, जहाँ प्रतिवर्ष लाखों भक्त आते हैं।',
        image: imagePath.Durga,
      },
      {
        id: 'goldentemple',
        nameEn: 'Golden Temple',
        nameHi: 'स्वर्ण मंदिर',
        subtitleEn: 'Amritsar, Punjab',
        subtitleHi: 'अमृतसर, पंजाब',
        textEn:
          'Also known as Harmandir Sahib, it is the preeminent spiritual site of Sikhism, representing open doors to all humanity.',
        textHi:
          'अमृतसर का हरमंदिर साहिब (स्वर्ण मंदिर) सिख धर्म का परम पवित्र स्थल है, जिसके चारों द्वार सर्वमानव समानता के प्रतीक हैं।',
        image: imagePath.lotus,
      },
    ],
  },
];
