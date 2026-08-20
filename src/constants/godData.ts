import imagePath from '../assets';

export interface MantraItem {
  nameEn: string;
  nameHi?: string;
  mantra: string;
}

export interface God {
  id: string;
  englishName: string;
  hindiName: string;
  mantra: string;
  image: any;
  mantras?: MantraItem[];
}

export const godData: God[] = [
  // Pair 1 (Column 1 on screen)
  {
    id: 'shiva',
    englishName: 'Shiv ji',
    hindiName: 'शिव जी',
    mantra: 'ॐ नमः शिवाय॥',
    image: imagePath.Bholenath,
    mantras: [
      {
        nameEn: 'Shiva Mool Mantra',
        nameHi: 'शिव मूल मन्त्र',
        mantra: 'ॐ नमः शिवाय॥',
      },
      {
        nameEn: 'Maha Mrityunjaya Mantra',
        nameHi: 'महामृत्युञ्जय मन्त्र',
        mantra:
          'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
      },
      {
        nameEn: 'Rudra Gayatri Mantra',
        nameHi: 'रुद्र गायत्री मन्त्र',
        mantra:
          'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि\nतन्नो रुद्रः प्रचोदयात्॥',
      },
      {
        nameEn: 'Shiva Gayatri Mantra',
        nameHi: 'शिव गायत्री मन्त्र',
        mantra:
          'ॐ महादेवाय विद्महे रुद्रमूर्तये धीमहि\nतन्नः शिवः प्रचोदयात्॥',
      },
      {
        nameEn: 'Mrityunjaya Mahadeva Mantra',
        nameHi: 'मृत्युञ्जय महादेव मन्त्र',
        mantra:
          'ॐ मृत्युञ्जय महादेव त्राहि मां शरणागतम्।\nजन्म-मृत्यु-जरा-व्याधिपीडितं कर्मबन्धनैः॥',
      },
      {
        nameEn: 'Dakshinamurti Shiva Mantra',
        nameHi: 'दक्षिणामूर्ति शिव मन्त्र',
        mantra:
          'ॐ नमो भगवते दक्षिणामूर्तये।\nमह्यं मेधां प्रज्ञां प्रयच्छ स्वाहा॥',
      },
      {
        nameEn: 'Nilakantha Mahadeva Mantra',
        nameHi: 'नीलकण्ठ महादेव मन्त्र',
        mantra: 'ॐ नमो नीलकण्ठाय।',
      },
    ],
  },
  {
    id: 'vishnu',
    englishName: 'Vishnu ji',
    hindiName: 'विष्णु जी',
    mantra: 'ॐ नमोः भगवते वासुदेवाय॥',
    image: imagePath.Vishnu,
    mantras: [
      {
        nameEn: 'Vishnu Mool Mantra',
        nameHi: 'विष्णु मूल मन्त्र',
        mantra: 'ॐ नमोः नारायणाय॥',
      },
      {
        nameEn: 'Vishnu Bhagawate Vasudevaya Mantra',
        nameHi: 'विष्णु भगवते वासुदेवाय मन्त्र',
        mantra: 'ॐ नमोः भगवते वासुदेवाय॥',
      },
      {
        nameEn: 'Vishnu Gayatri Mantra',
        nameHi: 'विष्णु गायत्री मन्त्र',
        mantra:
          'ॐ श्री विष्णवे च विद्महे वासुदेवाय धीमहि।\nतन्नो विष्णुः प्रचोदयात्॥',
      },
      {
        nameEn: 'Vishnu Shantakaram Mantra',
        nameHi: 'विष्णु शान्ताकारम् मन्त्र',
        mantra:
          'शान्ताकारम् भुजगशयनम् पद्मनाभम् सुरेशम्\nविश्वाधारम् गगनसदृशम् मेघवर्णम् शुभाङ्गम्।\nलक्ष्मीकान्तम् कमलनयनम् योगिभिर्ध्यानगम्यम्\nवन्दे विष्णुम् भवभयहरम् सर्वलोकैकनाथम्॥',
      },
      {
        nameEn: 'Mangalam Bhagwan Vishnu Mantra',
        nameHi: 'मङ्गलम् भगवान विष्णु मन्त्र',
        mantra:
          'मङ्गलम् भगवान विष्णुः, मङ्गलम् गरुडध्वजः।\nमङ्गलम् पुण्डरी काक्षः, मङ्गलाय तनो हरिः॥',
      },
    ],
  },
  // Pair 2 (Column 2 on screen)
  {
    id: 'brahma',
    englishName: 'Brahma ji',
    hindiName: 'ब्रह्मा जी',
    mantra: 'ॐ ब्रह्मणे नमः',
    image: imagePath.Brahma,
    mantras: [
      {
        nameEn: 'Brahma Mool Mantra',
        nameHi: 'ब्रह्मा मूल मन्त्र',
        mantra: 'ॐ ब्रह्मणे नमः',
      },
      {
        nameEn: 'Brahma Gayatri Mantra',
        nameHi: 'ब्रह्मा गायत्री मन्त्र',
        mantra:
          'ॐ चतुर्मुखाय विद्महे कमण्डलुधराय धीमहि तन्नो ब्रह्मा प्रचोदयात्॥',
      },
    ],
  },
  {
    id: 'saraswati',
    englishName: 'Saraswati Mata',
    hindiName: 'सरस्वती माता',
    mantra: 'ॐ ऐं सरस्वत्यै नमः।',
    image: imagePath.Saraswati,
    mantras: [
      {
        nameEn: 'Saraswati Mool Mantra',
        nameHi: 'सरस्वती मूल मन्त्र',
        mantra: 'ॐ ऐं सरस्वत्यै नमः।',
      },
      {
        nameEn: 'Saraswati Puranokta Mantra',
        nameHi: 'सरस्वती पुराणोक्त मन्त्र',
        mantra:
          'या देवी सर्वभूतेषु विद्यारूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
      },
      {
        nameEn: 'Saraswati Gayatri Mantra',
        nameHi: 'सरस्वती गायत्री मन्त्र',
        mantra:
          'ॐ ऐं वाग्देव्यै विद्महे कामराजाय धीमहि।\nतन्नो देवी प्रचोदयात्॥',
      },
      {
        nameEn: 'Mahasaraswati Mantra',
        nameHi: 'महासरस्वती मन्त्र',
        mantra: 'ॐ ऐं महासरस्वत्यै नमः।',
      },
      {
        nameEn: 'Saraswati Dashakshari Mantra',
        nameHi: 'सरस्वती दशाक्षर मन्त्र',
        mantra: 'वद वद वाग्वादिनी स्वाहा।',
      },
      {
        nameEn: 'Saraswati Beej Mantra',
        nameHi: 'सरस्वती एकाक्षर/बीज मन्त्र',
        mantra: 'ऐं।',
      },
      {
        nameEn: 'Saraswati Dvyakshara Mantra',
        nameHi: 'सरस्वती द्व्यक्षर मन्त्र',
        mantra: 'ऐं लृं।',
      },
      {
        nameEn: 'Saraswati Tryakshara Mantra',
        nameHi: 'सरस्वती त्र्याक्षर मन्त्र',
        mantra: 'ऐं रुं स्वों।',
      },
      {
        nameEn: 'Saraswati Mantra 1',
        nameHi: 'सरस्वती मन्त्र',
        mantra: 'ॐ ऐं नमः।',
      },
      {
        nameEn: 'Saraswati Mantra 2',
        nameHi: 'सरस्वती मन्त्र',
        mantra: 'ॐ ऐं क्लीं सौः।',
      },
      {
        nameEn: 'Saraswati Mantra 3',
        nameHi: 'सरस्वती मन्त्र',
        mantra: 'ॐ ऐं ह्रीं श्रीं वाग्देव्यै सरस्वत्यै नमः।',
      },
      {
        nameEn: 'Saraswati Mantra 4',
        nameHi: 'सरस्वती मन्त्र',
        mantra:
          'ॐ अर्हं मुख कमल वासिनी पापात्म क्षयम्कारी\nवद वद वाग्वादिनी सरस्वती ऐं ह्रीं नमः स्वाहा।',
      },
    ],
  },
  // Pair 3 (Column 3 on screen)
  {
    id: 'lakshmi',
    englishName: 'Lakshmi Mata',
    hindiName: 'लक्ष्मी माता',
    mantra: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
    image: imagePath.Laxmi,
    mantras: [
      {
        nameEn: 'Lakshmi Beej Mantra',
        nameHi: 'लक्ष्मी बीज मन्त्र',
        mantra: 'ॐ ह्रीं श्रीं लक्ष्मीभयो नमः॥',
      },
      {
        nameEn: 'Mahalakshmi Mantra',
        nameHi: 'महालक्ष्मी मन्त्र',
        mantra:
          'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद\nॐ श्रीं ह्रीं श्रीं महालक्ष्मयै नमः॥',
      },
      {
        nameEn: 'Lakshmi Gayatri Mantra',
        nameHi: 'लक्ष्मी गायत्री मन्त्र',
        mantra:
          'ॐ श्री महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि,\nतन्नो लक्ष्मी प्रचोदयात् ॐ॥',
      },
    ],
  },
  {
    id: 'ram',
    englishName: 'Ram ji',
    hindiName: 'राम जी',
    mantra: 'ॐ श्री रामाय नमः॥',
    image: imagePath.Rama,
    mantras: [
      {
        nameEn: 'Rama Mool Mantra',
        nameHi: 'राम मूल मन्त्र',
        mantra: 'ॐ श्री रामाय नमः॥',
      },
      {
        nameEn: 'Rama Taraka Mantra',
        nameHi: 'राम तारक मन्त्र',
        mantra: 'श्री राम जय राम जय जय राम॥',
      },
      {
        nameEn: 'Rama Gayatri Mantra',
        nameHi: 'राम गायत्री मन्त्र',
        mantra:
          'ॐ दशरथये विद्महे सीतावल्लभाय धीमहि,\nतन्नो राम प्रचोदयात्॥',
      },
      {
        nameEn: 'Rama Meditation Mantra',
        nameHi: 'राम ध्यान मन्त्र',
        mantra:
          'ॐ आपदामपहर्तारम् दाताराम् सर्वसम्पदाम्।\nलोकाभिरामम् श्रीरामम् भूयो-भूयो नमाम्यहम्॥',
      },
      {
        nameEn: 'Kodanda Rama Mantra',
        nameHi: 'कोदण्ड राम मन्त्र',
        mantra: 'श्री राम जय राम कोदण्ड राम॥',
      },
    ],
  },
  // Pair 4 (Column 4 on screen)
  {
    id: 'krishna',
    englishName: 'Sri Krishna ji',
    hindiName: 'श्री कृष्ण जी',
    mantra: 'कृं कृष्णाय नमः।',
    image: imagePath.Krishna,
    mantras: [
      {
        nameEn: 'Krishna Mool Mantra',
        nameHi: 'कृष्ण मूल मन्त्र',
        mantra: 'कृं कृष्णाय नमः।',
      },
      {
        nameEn: 'Krishna Kashta Nashaka Mantra',
        nameHi: 'कृष्ण कष्ट नाशक मन्त्र',
        mantra:
          'ॐ कृष्णाय वासुदेवाय हरये परमात्मने।\nप्रणत क्लेशनाशाय गोविन्दाय नमो नमः॥',
      },
      {
        nameEn: 'Krishna Gayatri Mantra',
        nameHi: 'कृष्ण गायत्री मन्त्र',
        mantra:
          'ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि\nतन्नः कृष्णः प्रचोदयात्॥',
      },
      {
        nameEn: 'Krishna Ekakshari Mantra',
        nameHi: 'कृष्ण एकाक्षरी मन्त्र',
        mantra: 'क्लीं॥',
      },
      {
        nameEn: 'Krishna Ashtakshara Mantra',
        nameHi: 'कृष्ण अष्टाक्षर मन्त्र',
        mantra: 'श्रीकृष्णः शरणं मम।',
      },
      {
        nameEn: 'Krishna Dashakshara Mantra',
        nameHi: 'कृष्ण दशाक्षर मन्त्र',
        mantra: 'गोपीजन वल्लभाय स्वाहा।',
      },
      {
        nameEn: 'Krishna Ashtadashakshara Mantra',
        nameHi: 'कृष्ण अष्टादशाक्षर मन्त्र',
        mantra: 'क्लीं कृष्णाय गोविन्दाय गोपीजनवल्लभाय स्वाहा।',
      },
    ],
  },
  {
    id: 'ganesha',
    englishName: 'Ganesha ji',
    hindiName: 'गणेश जी',
    mantra: 'ॐ गं गणपतये नमः॥',
    image: imagePath.Ganesha,
    mantras: [
      {
        nameEn: 'Vakratunda Ganesha Mantra',
        nameHi: 'वक्रतुण्ड गणेश मन्त्र',
        mantra:
          'श्री वक्रतुण्ड महाकाय सूर्य कोटी समप्रभा।\nनिर्विघ्नं कुरु मे देव सर्व-कार्येशु सर्वदा॥',
      },
      {
        nameEn: 'Ganesha Shubh Labh Mantra',
        nameHi: 'गणेश शुभ-लाभ मन्त्र',
        mantra:
          'ॐ श्रीं गं सौभाग्य गणपतये।\nवर्वर्द सर्वजन्म में वषमान्य नमः॥',
      },
      {
        nameEn: 'Ganesha Gayatri Mantra',
        nameHi: 'गणेश गायत्री मन्त्र',
        mantra:
          'ॐ एकदन्ताय विद्महे, वक्रतुण्डाय धीमहि,\nतन्नो दन्ति प्रचोदयात्॥',
      },
      {
        nameEn: 'Maha Ganapati Mool Mantra',
        nameHi: 'श्री महागणपति मूल मन्त्र',
        mantra:
          'ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये\nवर वरद सर्वजनं मे वशमानय स्वाहा॥',
      },
      {
        nameEn: 'Rinaharta Ganapati Mantra',
        nameHi: 'ऋणहर्ता गणपति मन्त्र',
        mantra: 'ॐ गणेश ऋणं छिन्धि वरेण्यं हुं नमः फट्॥',
      },
      {
        nameEn: 'Haridra Ganapati Mantra',
        nameHi: 'हरिद्रा गणपति मन्त्र',
        mantra:
          'ॐ हुं गं ग्लौं हरिद्रा गणपतये वर वरद\nसर्व जन हृदयं स्तम्भय-स्तम्भय स्वाहा॥',
      },
      {
        nameEn: 'Heramba Ganapati Mantra',
        nameHi: 'हेरम्ब गणपति मन्त्र',
        mantra:
          'ॐ नमो हेरम्ब मदमोहित\nमम सङ्कटान् निवारय निवारय स्वाहा॥',
      },
      {
        nameEn: 'Ganesha Ekakshari Mantra',
        nameHi: 'गणेश एकाक्षरी मन्त्र',
        mantra: 'गं॥',
      },
      {
        nameEn: 'Ganesha Shadakshara Mantra',
        nameHi: 'गणेश षडाक्षर मन्त्र',
        mantra: 'ॐ वक्रतुण्डाय हुम्॥',
      },
      {
        nameEn: 'Ganesha Ashtakshara Mantra',
        nameHi: 'गणेश अष्टाक्षर मन्त्र',
        mantra: 'ॐ गं गणपतये नमः॥',
      },
      {
        nameEn: 'Kshipra Prasada Ganapati Mantra',
        nameHi: 'क्षिप्र प्रसाद गणपति मन्त्र',
        mantra: 'गं क्षिप्रप्रसादनाय नमः॥',
      },
    ],
  },
  // Pair 5 (Column 5 on screen)
  {
    id: 'hanuman',
    englishName: 'Hanuman ji',
    hindiName: 'हनुमान जी',
    mantra: 'ॐ श्री हनुमते नमः॥',
    image: imagePath.Hanuman,
    mantras: [
      {
        nameEn: 'Hanuman Mool Mantra',
        nameHi: 'हनुमान मूल मन्त्र',
        mantra: 'ॐ श्री हनुमते नमः॥',
      },
      {
        nameEn: 'Hanuman Gayatri Mantra',
        nameHi: 'हनुमान गायत्री मन्त्र',
        mantra:
          'ॐ आञ्जनेयाय विद्महे वायुपुत्राय धीमहि।\nतन्नो हनुमत् प्रचोदयात्॥',
      },
      {
        nameEn: 'Manojavam Marutatulyavegam Mantra',
        nameHi: 'मनोजवम् मारुततुल्यवेगम् मन्त्र',
        mantra:
          'मनोजवम् मारुततुल्यवेगम् जितेन्द्रियम् बुद्धिमताम् वरिष्ठम्।\nवातात्मजम् वानरयूथमुख्यम् श्रीरामदूतम् शरणम् प्रपद्ये॥',
      },
    ],
  },
  {
    id: 'surya',
    englishName: 'Surya Dev',
    hindiName: 'सूर्य देव',
    mantra: 'ॐ घृणिसूर्याय नमः।',
    image: imagePath.Surya,
    mantras: [
      {
        nameEn: 'Surya Mool Mantra',
        nameHi: 'सूर्यदेव मूल मन्त्र',
        mantra: 'ॐ घृणिसूर्याय नमः।',
      },
      {
        nameEn: 'Surya Beej Mantra',
        nameHi: 'सूर्य बीज मन्त्र',
        mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः।',
      },
      {
        nameEn: 'Surya Gayatri Mantra',
        nameHi: 'सूर्य गायत्री मन्त्र',
        mantra:
          'ॐ आदित्याय विद्महे प्रभाकराय धीमहि\nतन्नः सूर्यः प्रचोदयात्॥',
      },
      {
        nameEn: 'Surya Arogya Mantra',
        nameHi: 'सूर्य आरोग्य मन्त्र',
        mantra:
          'ॐ नमः सूर्याय शान्ताय सर्वरोगनिवारिणे।\nआयुरारोग्यमैश्वर्यं देहि देव जगत्पते॥',
      },
      {
        nameEn: 'Surya Narayana Mantra',
        nameHi: 'श्री सूर्यनारायण मन्त्र',
        mantra: 'ॐ सूर्यनारायणायः नमः।',
      },
      {
        nameEn: 'Surya Pranam Mantra',
        nameHi: 'सूर्य प्रणाम मन्त्र',
        mantra:
          'ॐ जपाकुसुमसङ्काशं काश्यपेयं महद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
      },
      {
        nameEn: 'Surya Pratah Smarana Shloka',
        nameHi: 'सूर्य प्रातः स्मरण श्लोक',
        mantra:
          'प्रातः स्मरामि खलु तत्सवितुर्वरेण्यं\nरूपं हि मण्डलमृचोऽथ तनुर्यजूंषि।\nसामानि यस्य किरणाः प्रभवादिहेतुं\nब्रह्माहरात्मकमलक्ष्यमचिन्त्यरूपम्॥',
      },
      {
        nameEn: 'Surya Ekakshari Mantra',
        nameHi: 'सूर्य एकाक्षरी मन्त्र',
        mantra: 'ह्रां॥',
      },
      {
        nameEn: 'Surya Panchakshara Mantra',
        nameHi: 'सूर्य पञ्चाक्षर मन्त्र',
        mantra: 'ॐ सूर्याय नमः।',
      },
      {
        nameEn: 'Surya Shatrunashaka Mantra',
        nameHi: 'सूर्य शत्रुनाशक मन्त्र',
        mantra:
          'उदसौ सूर्यो अगादुदिदं मामकं वचः।\nयथाहं शत्रुहोऽसान्यसपत्नः सपत्नहा॥\nसपत्नक्षयणो वृषाभिराष्ट्रो विष सहिः।\nयथाहभेषां वीराणां विराजानि जनस्य च॥',
      },
      {
        nameEn: 'Surya Kamanapoorti Mantra',
        nameHi: 'सूर्य कामनापूर्ति मन्त्र',
        mantra:
          'ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणराय\nमनोवांछित फलम् देहि देहि स्वाहा॥',
      },
      {
        nameEn: 'Surya Namaskara Mantra',
        nameHi: 'सूर्य नमस्कार मन्त्र',
        mantra:
          '1. ॐ मित्राय नमः।\n2. ॐ रवये नमः।\n3. ॐ सूर्याय नमः।\n4. ॐ भानवे नमः।\n5. ॐ खगाय नमः।\n6. ॐ पूष्णे नमः।\n7. ॐ हिरण्यगर्भाय नमः।\n8. ॐ मरीचये नमः।\n9. ॐ आदित्याय नमः।\n10. ॐ सवित्रे नमः।\n11. ॐ अर्काय नमः।\n12. ॐ भास्कराय नमः।\n13. ॐ सवितृसूर्यनारायणाय नमः।',
      },
    ],
  },
  // Pair 6 (Column 6 on screen)
  {
    id: 'durga',
    englishName: 'Durga Mata',
    hindiName: 'दुर्गा माता',
    mantra: 'ॐ दुं दुर्गायै नमः।',
    image: imagePath.Durga,
    mantras: [
      {
        nameEn: 'Durga Beej Mantra',
        nameHi: 'दुर्गा बीज मन्त्र',
        mantra: 'ॐ दुं दुर्गायै नमः।',
      },
      {
        nameEn: 'Durga Navarna Mantra',
        nameHi: 'दुर्गा नवार्ण मन्त्र',
        mantra: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे।',
      },
      {
        nameEn: 'Durga Gayatri Mantra',
        nameHi: 'दुर्गा गायत्री मन्त्र',
        mantra:
          'ॐ गिरिजायै च विद्महे शिवप्रियायै च धीमहि।\nतन्नो दुर्गा प्रचोदयात्॥',
      },
      {
        nameEn: 'Durga Stuti Mantra',
        nameHi: 'दुर्गा स्तुति मन्त्र',
        mantra:
          'ॐ सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तुते॥\n\nॐ सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तुते॥',
      },
      {
        nameEn: 'Durga Dhyan Mantra',
        nameHi: 'दुर्गा ध्यान मन्त्र',
        mantra:
          'ॐ जटा-जूट-समायुक्तमर्धेन्दु-कृत-लक्षणाम्।\nलोचनत्रय-संयुक्तां पद्मेन्दुसद्यशाननाम्॥',
      },
      {
        nameEn: 'Durga Ekakshari Mantra',
        nameHi: 'दुर्गा एकाक्षरी मन्त्र',
        mantra: 'दुं॥',
      },
      {
        nameEn: 'Durga Ashtakshara Mantra',
        nameHi: 'दुर्गा अष्टाक्षर मन्त्र',
        mantra: 'ॐ ह्रीं दुं दुर्गायै नमः',
      },
    ],
  },
  {
    id: 'kubera',
    englishName: 'Kuber ji',
    hindiName: 'कुबेर जी',
    mantra:
      'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये\nधनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
    image: imagePath.Kubera,
    mantras: [
      {
        nameEn: 'Kubera Mantra',
        nameHi: 'कुबेर मन्त्र',
        mantra:
          'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये\nधनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
      },
      {
        nameEn: 'Kubera Dhana Prapti Mantra',
        nameHi: 'कुबेर धन प्राप्ति मन्त्र',
        mantra: 'ॐ श्रीं ह्रीं क्लीं श्रीं क्लीं वित्तेश्वराय नमः॥',
      },
      {
        nameEn: 'Kubera Ashta Lakshmi Mantra',
        nameHi: 'कुबेर अष्टलक्ष्मी मन्त्र',
        mantra:
          'ॐ ह्रीं श्रीं क्रीं श्रीं कुबेराय अष्ट-लक्ष्मी मम गृहे धनं पुरय पुरय नमः॥',
      },
    ],
  },
  // Pair 7 (Column 7 on screen)
  {
    id: 'shani',
    englishName: 'Shani Dev',
    hindiName: 'शनि देव',
    mantra: 'ॐ शं शनैश्चराय नमः।',
    image: imagePath.ShaniDev,
    mantras: [
      {
        nameEn: 'Shani Mool Mantra',
        nameHi: 'शनि मूल मन्त्र',
        mantra: 'ॐ शं शनैश्चराय नमः।',
      },
      {
        nameEn: 'Shani Beej Mantra',
        nameHi: 'शनि बीज मन्त्र',
        mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः।',
      },
      {
        nameEn: 'Shani Gayatri Mantra',
        nameHi: 'शनि गायत्री मन्त्र',
        mantra:
          'ॐ सूर्यात्मजाय विद्महे मृत्युरूपाय धीमहि\nतन्नः सौरिः प्रचोदयात्॥',
      },
      {
        nameEn: 'Shani Pranam Mantra',
        nameHi: 'शनि प्रणाम मन्त्र',
        mantra:
          'ॐ नीलांजन समाभासं रविपुत्रं यमाग्रजम्।\nछाया मार्तण्डसंभूतं तं नमामि शनैश्चरम्॥',
      },
      {
        nameEn: 'Shani Vedic Mantra',
        nameHi: 'शनि वैदिक मन्त्र',
        mantra:
          'ॐ शन्नोदेवीर भिष्टयऽआपो भवन्तु पीतये शंय्योरभिस्त्रवन्तुनः।',
      },
      {
        nameEn: 'Shani Ekakshari Mantra',
        nameHi: 'शनि एकाक्षरी मन्त्र',
        mantra: 'शं॥',
      },
    ],
  },
  {
    id: 'radha',
    englishName: 'Sri Radha ji',
    hindiName: 'श्री राधा जी',
    mantra: 'राधे राधे',
    image: imagePath.SriRadha,
    mantras: [
      {
        nameEn: 'Radha Samanya Mantra',
        nameHi: 'सामान्य मन्त्र',
        mantra: 'श्री राधायै स्वाहा।',
      },
      {
        nameEn: 'Radha Beej Mantra',
        nameHi: 'बीज मन्त्र',
        mantra: 'ॐ ह्रीं श्रीराधिकायै नमः।',
      },
      {
        nameEn: 'Radha Gayatri Mantra',
        nameHi: 'श्री राधा गायत्री मन्त्र',
        mantra:
          'ॐ वृषभानुजाय विद्महे कृष्णप्रियाय धीमहि।\nतन्नो राधा प्रचोदयात्॥',
      },
      {
        nameEn: 'Radha Rani Stuti by Lord Narayana',
        nameHi: 'भगवान नारायण द्वारा श्रीराधा रानी की स्तुति',
        mantra:
          'नमस्ते परमेशानि रासमण्डलवासिनी।\nरासेश्वरि नमस्तेऽस्तु कृष्ण प्राणाधिकप्रिये॥',
      },
      {
        nameEn: 'Radha Kirtan Mantra',
        nameHi: 'राधा कीर्तन मन्त्र',
        mantra: 'राधे राधे',
      },
    ],
  },
];
