import imagePath from '../assets';

export interface Story {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  contentEn: string;
  contentHi: string;
  categoryEn: string;
  categoryHi: string;
  image: any;
  readingTimeMin: number;
  sourceEn: string;
  sourceHi: string;
  difficultyEn: string;
  difficultyHi: string;
  moralEn: string;
  moralHi: string;
  shloka?: string;
  shlokaTranslationEn?: string;
  shlokaTranslationHi?: string;
  keywords?: string; // Comma-separated bilingual search terms (gods, places, alternative spellings)
}

export const mythologyStories: Story[] = [
  {
    id: 'ganesha_wisdom',
    titleEn: "Ganesha's Sacred Wisdom",
    titleHi: 'श्री गणेश की परम बुद्धि',
    subtitleEn: 'The Race Around the Cosmos',
    subtitleHi: 'ब्रह्मांड की परिक्रमा की कथा',
    descriptionEn: 'Discover how Lord Ganesha defined the true meaning of the universe through love and respect for parents.',
    descriptionHi: 'जानिए कैसे भगवान गणेश ने माता-पिता के प्रति प्रेम और आदर के माध्यम से ब्रह्मांड का वास्तविक अर्थ समझाया।',
    contentEn: `Once, a divine dispute arose in Mount Kailash between Lord Ganesha and his brother, Lord Kartikeya, over who was the elder and wiser. To settle the dispute, Lord Shiva and Goddess Parvati declared a challenge: "Whoever circles the entire universe and returns first will receive the sacred fruit of supreme wisdom."

Upon hearing this, Kartikeya immediately mounted his swift peacock vehicle and soared into the sky, determined to fly across the vast expanses of the cosmos. He visited every holy river, planet, and galaxy, pushing himself to the absolute limit.

Meanwhile, Ganesha looked at his slow mount, the little mouse, and smiled. He understood that he could not win a physical race across the cosmos on a mouse. Using his sharp wisdom, he asked his parents, Shiva and Parvati, to sit side-by-side. Ganesha then walked around them three times with absolute devotion and bowed before their feet.

When Shiva asked why he wasn't racing, Ganesha replied, "For a child, parents are the source of all existence. My parents represent the entire universe. By circling you, I have circled the cosmos."

Touched by his supreme devotion and wisdom, Shiva and Parvati declared Ganesha the winner and awarded him the fruit of wisdom. Kartikeya, upon returning, acknowledged his brother's spiritual depth and bowed to him.`,
    contentHi: `एक बार कैलाश पर्वत पर भगवान गणेश और उनके भाई कार्तिकेय के बीच इस बात को लेकर विवाद छिड़ गया कि दोनों में से कौन श्रेष्ठ और बुद्धिमान है। विवाद सुलझाने के लिए भगवान शिव और माता पार्वती ने एक चुनौती रखी: "जो कोई भी पूरे ब्रह्मांड का चक्कर लगाकर सबसे पहले वापस लौटेगा, उसे परम बुद्धि का दिव्य फल प्राप्त होगा।"

यह सुनते ही, कार्तिकेय तुरंत अपने तीव्र गति वाले वाहन मयूर (मोर) पर सवार हो गए और ब्रह्मांड की परिक्रमा के लिए आकाश में उड़ गए। उन्होंने सभी पवित्र नदियों, नक्षत्रों और लोकों का भ्रमण किया और अपनी पूरी शक्ति लगा दी।

दूसरी ओर, गणेश जी ने अपने धीमे वाहन मूषक (चूहे) को देखा और मुस्कुराए। वे जानते थे कि मूषक पर बैठकर भौतिक रूप से कार्तिकेय से जीतना असंभव था। उन्होंने अपनी तीक्ष्ण बुद्धि का उपयोग करते हुए अपने माता-पिता, शिव और पार्वती को एक साथ बैठने का अनुरोध किया। इसके बाद, गणेश जी ने परम श्रद्धा और भक्ति के साथ उनके चारों ओर तीन बार परिक्रमा की और उनके चरणों में प्रणाम किया।

जब शिव जी ने पूछा कि उन्होंने परिक्रमा क्यों नहीं की, तो गणेश जी ने उत्तर दिया, "एक संतान के लिए माता-पिता ही सृष्टि का मूल हैं। मेरे लिए मेरे माता-पिता ही संपूर्ण ब्रह्मांड हैं। आपकी परिक्रमा करके मैंने पूरे ब्रह्मांड की परिक्रमा पूरी कर ली है।"

गणेश की इस अनुपम भक्ति और बुद्धि से गद्गद होकर, शिव-पार्वती ने उन्हें विजेता घोषित किया और ज्ञान का दिव्य फल प्रदान किया। जब कार्तिकेय लौटे, तो उन्होंने अपने भाई की इस आध्यात्मिक समझ को सहर्ष स्वीकार किया और उन्हें नमन किया।`,
    categoryEn: 'Ganesha',
    categoryHi: 'गणेश',
    image: imagePath.Ganesha,
    readingTimeMin: 4,
    sourceEn: 'Shiva Purana',
    sourceHi: 'शिव पुराण',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    moralEn: 'Devotion, respect, and love for one\'s parents is the highest form of worship and spiritual wisdom.',
    moralHi: 'माता-पिता की सेवा और उनका आदर ही सबसे बड़ी पूजा और आध्यात्मिक ज्ञान है।',
    shloka: 'पितृदेवो भव, मातृदेवो भव।',
    shlokaTranslationEn: 'Treat your father as God, treat your mother as God.',
    shlokaTranslationHi: 'पिता को भगवान की तरह पूजें, माता को भगवान की तरह पूजें।',
    keywords: 'ganesha, ganesh, ganpati, kartikeya, kartikya, kailash, kailas, shiva, shiv, parvati, parvatiji, cosmos, universe, race, wisdom, parents, mouse, mushak, gold fruit, ganes, ganesa, गणेश, कार्तिकेय, शिव, पार्वती, कैलाश, ब्रह्मांड, परिक्रमा, मूषक, चूहा, बुद्धि, माता पिता'
  },
  {
    id: 'story_of_rama',
    titleEn: 'The Righteous Exile of Rama',
    titleHi: 'श्री राम का धर्मपथ और वनवास',
    subtitleEn: 'The Triumph of Maryada and Dharma',
    subtitleHi: 'मर्यादा पुरुषोत्तम की पावन गाथा',
    descriptionEn: 'The inspiring journey of Lord Rama, who sacrificed his crown to uphold his father\'s word and protect Dharma.',
    descriptionHi: 'भगवान राम की प्रेरणादायक यात्रा, जिन्होंने अपने पिता के वचन की रक्षा और धर्म की स्थापना के लिए राजपाट त्याग दिया।',
    contentEn: `In the prosperous kingdom of Ayodhya, King Dasharatha prepared to crown his eldest son, Rama, as the prince regent. Rama was loved by all for his compassion, righteousness, and humility. However, Queen Kaikeyi, influenced by her wicked maid Manthara, demanded two boons Dasharatha had promised her years ago: that her son Bharata be crowned king, and Rama be exiled to the Dandaka forest for fourteen years.

Bound by his honor, a heartbroken Dasharatha had to yield. When Rama learned of this, he showed no anger or sorrow. He accepted the exile immediately to ensure his father's word remained unbroken, saying, "Dharma is established on truth and fulfilling one's vows."

Rama's devoted wife Sita and his loyal brother Lakshmana refused to leave his side and accompanied him into the wilderness. Throughout the fourteen years, Rama faced countess hardships. The ultimate test came when the demon king Ravana abducted Sita through deception. 

With the help of a monkey army led by Sugriva and the legendary devotee Hanuman, Rama built a bridge across the ocean to Lanka. A fierce war ensued. Rama defeated Ravana, rescuing Sita and proving that truth and righteousness will always vanquish ego and evil. Upon his return, Ayodhya celebrated by lighting rows of clay lamps, marking the origin of Diwali.`,
    contentHi: `अयोध्या के समृद्ध राज्य में, राजा दशरथ अपने ज्येष्ठ पुत्र राम को युवराज के रूप में राज्याभिषेक करने की तैयारी कर रहे थे। राम को उनके करुणा, न्यायप्रियता और विनम्रता के कारण सभी बहुत प्यार करते थे। हालांकि, रानी कैकेयी ने अपनी दासी मंथरा के बहकावे में आकर दशरथ से दो वरदान मांगे, जो राजा ने वर्षों पहले उन्हें देने का वचन दिया था: पहला कि उनके पुत्र भरत को राजा बनाया जाए, और दूसरा कि राम को चौदह वर्ष के लिए दंडकारण्य वन में निर्वासित कर दिया जाए।

वचनबद्धता के कारण टूटे दिल से दशरथ को झुकना पड़ा। जब राम को इस बात का पता चला, तो उन्होंने तनिक भी क्रोध या दुख प्रकट नहीं किया। उन्होंने अपने पिता के वचनों की रक्षा के लिए तुरंत वनवास स्वीकार कर लिया, यह कहते हुए कि "सत्य और वचन का पालन ही धर्म का आधार है।"

राम की धर्मपत्नी सीता और उनके निष्ठावान भाई लक्ष्मण ने उनका साथ छोड़ने से मना कर दिया और उनके साथ वन चले गए। चौदह वर्षों के दौरान, राम ने अनेक कठिनाइयों का सामना किया। सबसे कठिन परीक्षा तब आई जब राक्षसराज रावण ने छल से सीता का हरण कर लिया।

सुग्रीव के नेतृत्व में वानर सेना और परम भक्त हनुमान की सहायता से, राम ने समुद्र पर सेतु का निर्माण किया और लंका पहुंचे। भीषण युद्ध के बाद राम ने रावण का वध कर सीता को मुक्त कराया और यह सिद्ध किया कि अहंकार और अधर्म पर हमेशा सत्य और धर्म की विजय होती है। उनके लौटने पर अयोध्यावासियों ने घी के दीये जलाकर उनका स्वागत किया, जिससे दीपावली का शुभारंभ हुआ।`,
    categoryEn: 'Ramayana',
    categoryHi: 'रामायण',
    image: imagePath.Rama,
    readingTimeMin: 6,
    sourceEn: 'Valmiki Ramayana',
    sourceHi: 'वाल्मीकि रामायण',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    moralEn: 'Uphold righteousness (Dharma) and truth even in the face of the greatest personal sacrifices.',
    moralHi: 'घोर व्यक्तिगत संकट और त्याग के समय भी सत्य और धर्म के मार्ग पर अडिग रहें।',
    shloka: 'रामो विग्रहवान् धर्मः।',
    shlokaTranslationEn: 'Rama is the very embodiment of Righteousness.',
    shlokaTranslationHi: 'राम धर्म के साक्षात स्वरूप हैं।',
    keywords: 'rama, ram, ramji, ramacandra, sita, seeta, lakshmana, lakshman, lachman, hanuman, ayodhya, ravana, ravan, lanka, exile, forest, diwali, bow, dandaka, vanvas, bharat, dasharatha, kaikeyi, manthara, ramayan, राम, सीता, लक्ष्मण, हनुमान, अयोध्या, रावण, लंका, वनवास, दीपावली, धनुष, दंडकारण्य, दशरथ, कैकेयी, मंथरा, भरत, रामायण'
  },
  {
    id: 'shiva_boon',
    titleEn: "Lord Shiva's Compassion and Mohini",
    titleHi: 'शिव जी का वरदान और मोहिनी रूप',
    subtitleEn: 'The Saving Grace of Lord Vishnu',
    subtitleHi: 'भस्मासुर और भगवान विष्णु की लीला',
    descriptionEn: 'The tale of Bhasmasura, whose lethal powers turned against him, resolved by Vishnu\'s elegant intervention.',
    descriptionHi: 'भस्मासुर की कथा, जिसे शिव जी से मिले वरदान ने ही संकट में डाल दिया, और कैसे विष्णु जी ने मोहिनी रूप लेकर रक्षा की।',
    contentEn: `The demon Bhasmasura performed severe penance to please Lord Shiva. Satisfied with his devotion, Shiva appeared and offered him a boon. Bhasmasura, filled with devious ambitions, requested: "Grant me the power that on whomever's head I place my hand, they shall instantly burn to ashes."

Lord Shiva, known as Ashutosh (easily pleased), granted the boon. Filled with arrogance and evil intent, Bhasmasura immediately decided to test the power on Shiva himself to claim Goddess Parvati and control Kailash.

Shiva fled, pursued by the terrifying demon. Lord Vishnu saw the distress of Shiva and intervened. He transformed Himself into Mohini, an extraordinarily beautiful dancer.

Seeing Mohini, Bhasmasura was completely enchanted. He forgot all about Shiva and begged her to marry him. Mohini agreed, but on one condition: "I will only marry a man who can match my dance steps perfectly."

Bhasmasura eagerly agreed. Mohini began a captivating dance, and Bhasmasura closely mirrored every gesture. During the climax of the dance, Mohini gracefully placed her hand on her own head. Entranced by her beauty and lost in the rhythm, Bhasmasura placed his hand on his own head, instantly reducing himself to ashes. Shiva and the heavens rejoiced at the clever deliverance.`,
    contentHi: `दैत्य भस्मासुर ने भगवान शिव को प्रसन्न करने के लिए घोर तपस्या की। उसकी तपस्या से प्रसन्न होकर शिव जी प्रकट हुए और उसे वरदान मांगने को कहा। कुटिल महत्वाकांक्षा से भरे भस्मासुर ने वरदान मांगा: "प्रभु, मुझे ऐसा वरदान दें कि मैं जिसके सिर पर भी अपना हाथ रखूं, वह तुरंत जलकर भस्म हो जाए।"

भोलेनाथ ने बिना किसी संकोच के "तथास्तु" कह दिया। वरदान पाते ही अहंकार से चूर भस्मासुर ने सबसे पहले शिव जी पर ही इसका परीक्षण करने का निश्चय किया ताकि वह माता पार्वती को पा सके और कैलाश पर अधिकार कर सके।

भगवान शिव आगे भागे और उनके पीछे भस्मासुर दौड़ पड़ा। सृष्टि पर आए संकट को देखकर भगवान विष्णु ने हस्तक्षेप किया। उन्होंने एक अत्यंत रूपवती नर्तकी "मोहिनी" का रूप धारण किया और भस्मासुर के मार्ग में आ गए।

मोहिनी को देखकर भस्मासुर मोहित हो गया। वह शिव जी को भूल गया और मोहिनी से विवाह का प्रस्ताव रखा। मोहिनी ने एक शर्त रखी: "मैं केवल उसी से विवाह करूंगी जो मेरे नृत्य के समान नृत्य कर सके।"

भस्मासुर तुरंत मान गया। मोहिनी ने अद्भुत नृत्य आरंभ किया, और भस्मासुर ने भी उसकी नकल करना शुरू कर दिया। नृत्य के अंत में, मोहिनी ने चतुराई से अपना हाथ अपने सिर पर रखा। सौंदर्य के मद में चूर भस्मासुर ने बिना सोचे-समझे अपना हाथ अपने ही सिर पर रख लिया और वह उसी क्षण भस्म हो गया। इस प्रकार विष्णु जी की लीला से शिव जी और समस्त संसार की रक्षा हुई।`,
    categoryEn: 'Shiva Purana',
    categoryHi: 'शिव पुराण',
    image: imagePath.Bholenath,
    readingTimeMin: 5,
    sourceEn: 'Bhagavata Purana',
    sourceHi: 'भागवत पुराण',
    difficultyEn: 'Intermediate',
    difficultyHi: 'मध्यम',
    moralEn: 'Blind ambition, arrogance, and misuse of power ultimately lead to self-destruction.',
    moralHi: 'अंधा अहंकार, स्वार्थ और शक्ति का दुरुपयोग अंततः स्वयं के विनाश का कारण बनता है।',
    shloka: 'विनाशकाले विपरीत बुद्धिः।',
    shlokaTranslationEn: 'When the time of destruction approaches, one\'s intellect acts against their own interest.',
    shlokaTranslationHi: 'विनाश के समय मनुष्य की बुद्धि भ्रष्ट हो जाती है।',
    keywords: 'shiva, shiv, mahadev, bholenath, shankar, vishnu, mohini, bhasmasura, bhasmasur, kailash, parvati, boon, dance, ash, ashes, siva, bhagavatam, ashutosh, शिव, विष्णु, मोहिनी, भस्मासुर, कैलाश, पार्वती, वरदान, नृत्य, भस्म, राख, महादेव, शंकर, भोलेनाथ'
  },
  {
    id: 'krishna_leela',
    titleEn: 'Sri Krishna and the Govardhan Hill',
    titleHi: 'श्री कृष्ण और गोवर्धन लीला',
    subtitleEn: 'The Protection of Vrindavan',
    subtitleHi: 'इन्द्र के अभिमान का मर्दन',
    descriptionEn: 'How young Krishna lifted a mountain on his pinky finger to shelter the villagers from Indra\'s torrential storm.',
    descriptionHi: 'कैसे बाल कृष्ण ने अपनी कनिष्ठिका उंगली पर विशाल पर्वत उठाकर गोकुलवासियों को इन्द्र के कोप से बचाया।',
    contentEn: `Every year, the people of Vrindavan prepared a grand sacrifice to appease Lord Indra, the god of rain and storms, thanking him for water. One year, seven-year-old Krishna questioned this tradition, telling the cowherds, "It is Mount Govardhan and our cows that sustain our lives, not Indra. We should offer our prayers and gratitude to Govardhan Hill."

Convinced by Krishna\'s logic, the villagers worshipped the hill instead. This deeply angered Indra, who felt insulted by a young child. In retaliation, Indra sent destructive cloudbursts and torrential rains to flood Vrindavan.

Fierce winds and thunder shook the land, and the terrified villagers ran to Krishna for protection. Smiling, Krishna walked to Mount Govardhan, lifted the entire mountain on the little finger of his left hand, and held it aloft like a giant umbrella.

He called all the villagers, children, and animals to shelter beneath the mountain. For seven days and nights, Krishna held the mountain without moving, while Indra poured down his heaviest rains. 

Realizing that this young boy was none other than the Supreme Lord, Indra stopped the storms, withdrew the clouds, and fell at Krishna\'s feet in apology. The pride of Indra was shattered, and the villagers rejoiced in Krishna's divine protection.`,
    contentHi: `हर साल गोकुल और वृंदावन के लोग वर्षा के देवता इंद्र देव को प्रसन्न करने के लिए एक विशाल यज्ञ की तैयारी करते थे। एक वर्ष, सात वर्षीय कृष्ण ने इस परंपरा पर प्रश्न उठाते हुए ग्वालों से कहा, "हमें वर्षा के लिए इंद्र की नहीं, बल्कि हमारे गोवर्धन पर्वत और गऊओं की पूजा करनी चाहिए जो हमारा भरण-पोषण करते हैं।"

कृष्ण की बात मानकर ग्रामीणों ने इंद्र के स्थान पर गोवर्धन पर्वत की पूजा की। इससे क्रोधित होकर इंद्र ने इसे अपना अपमान समझा और वृंदावन को नष्ट करने के लिए मूसलाधार बारिश और भयंकर तूफान भेज दिया।

चारों ओर बाढ़ आ गई और हाहाकार मच गया। डरे हुए ग्रामीण रक्षा के लिए कृष्ण के पास दौड़े। कृष्ण ने मुस्कुराते हुए गोवर्धन पर्वत को अपनी बाएं हाथ की छोटी उंगली (कनिष्ठिका) पर उठा लिया और उसे एक विशाल छाते की तरह थामे रखा।

उन्होंने सभी ग्रामीणों, गायों और बच्चों को पर्वत के नीचे शरण लेने को कहा। लगातार सात दिन और सात रात तक कृष्ण ने पर्वत को उठाए रखा, जबकि इंद्र ने अपनी पूरी शक्ति से वर्षा की। 

अंततः इंद्र को समझ आ गया कि यह साधारण बालक कोई और नहीं बल्कि साक्षात परमेश्वर हैं। उन्होंने वर्षा रोक दी और कृष्ण के चरणों में गिरकर क्षमा याचना की। इंद्र का अहंकार टूट गया और गोकुलवासी कृष्ण की जय-जयकार करने लगे।`,
    categoryEn: 'Krishna Leela',
    categoryHi: 'कृष्ण लीला',
    image: imagePath.Krishna,
    readingTimeMin: 5,
    sourceEn: 'Bhagavata Purana',
    sourceHi: 'भागवत पुराण',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    moralEn: 'True worship lies in expressing gratitude to nature and those who sustain us, and God always protects the faithful.',
    moralHi: 'सच्ची पूजा प्रकृति और जीवन का पोषण करने वालों के प्रति आभार व्यक्त करने में है, और भगवान सदैव भक्तों की रक्षा करते हैं।',
    shloka: 'योगक्षेमं वहाम्यहम्।',
    shlokaTranslationEn: 'I carry the burden of the welfare and security of my devotees.',
    shlokaTranslationHi: 'मैं अपने भक्तों के योग और क्षेम (कल्याण) का वहन करता हूँ।',
    keywords: 'krishna, krisna, kishan, kanha, indra, govardhan, vrindavan, gokul, storm, mountain, hill, rain, cowherd, cows, finger, umbrella, pride, child, krsna, lila, कृष्ण, इंद्र, गोवर्धन, वृंदावन, गोकुल, तूफान, पर्वत, पहाड़, वर्षा, बारिश, ग्वाले, गाय, कान्हा, गिरधारी, कनिष्ठिका'
  },
  {
    id: 'durga_victory',
    titleEn: "Durga Mata's Cosmic Battle",
    titleHi: 'दुर्गा मां और महिषासुर वध',
    subtitleEn: 'The Descent of the Divine Mother',
    subtitleHi: 'बुराई पर शक्ति की परम विजय',
    descriptionEn: 'The manifestation of Goddess Durga to defeat the invincible buffalo demon Mahishasura.',
    descriptionHi: 'महिषासुर के अत्याचारों का अंत करने के लिए सभी देवताओं के तेज से प्रकट हुईं माँ दुर्गा की शौर्य गाथा।',
    contentEn: `The buffalo demon Mahishasura performed intense penance and received a boon from Lord Brahma that no man or god could defeat him. Armed with this invincibility, Mahishasura conquered the heavens, driving out the Devas and declaring himself king of the universe.

Powerless to defeat him due to the boon, the Trinity—Brahma, Vishnu, and Shiva—focused their collective energies. From this blinding light emerged Goddess Durga, the divine mother, possessing ten arms equipped with the most powerful weapons of all deities.

Riding a majestic lion, Durga marched towards the demon's capital. A fierce battle erupted that shook the three worlds. Mahishasura shifted forms—from a buffalo to an elephant, a lion, and a warrior. 

On the tenth day of the battle, as the demon took the buffalo form again, Durga pinned him down with her foot and pierced his chest with her trident (Trishul). The victory of Durga restored cosmic balance and earned her the name Mahishasura Mardini, celebrated globally as Navratri and Durga Puja.`,
    contentHi: `राक्षस महिषासुर ने कठोर तपस्या करके ब्रह्मा जी से वरदान प्राप्त किया था कि कोई भी पुरुष या देवता उसे पराजित नहीं कर सकेगा। इस अमरता के अहंकार में महिषासुर ने स्वर्ग पर आक्रमण कर दिया और देवताओं को वहां से खदेड़कर तीनों लोकों पर अपना अधिकार कर लिया।

वरदान की मर्यादा के कारण जब कोई देवता उसे हरा नहीं सका, तब ब्रह्मा, विष्णु और शिव ने अपने तेज को एकत्रित किया। उस दिव्य तेजपुंज से माँ दुर्गा प्रकट हुईं, जिनकी दस भुजाएं थीं और वे सभी देवताओं के श्रेष्ठ अस्त्र-शस्त्रों से सुसज्जित थीं।

सिंह पर सवार होकर माँ दुर्गा ने महिषासुर की सेना पर धावा बोल दिया। नौ दिनों तक भीषण युद्ध चला जिसने तीनों लोकों को हिलाकर रख दिया। महिषासुर ने अनेक रूप बदले—भैंसा, हाथी, सिंह और अंत में योद्धा।

युद्ध के दसवें दिन, जब राक्षस ने पुनः भैंसे का रूप लिया, माँ दुर्गा ने उसे अपने त्रिशूल से भेद दिया और उसका वध कर दिया। इस प्रकार देवी ने सृष्टि को अत्याचार से मुक्त कराया, जिसके उपलक्ष्य में नवरात्रि और विजयदशमी का त्योहार मनाया जाता है।`,
    categoryEn: 'Devi Mahatmya',
    categoryHi: 'देवी महात्म्य',
    image: imagePath.Durga,
    readingTimeMin: 6,
    sourceEn: 'Markandeya Purana',
    sourceHi: 'मार्कण्डेय पुराण',
    difficultyEn: 'Intermediate',
    difficultyHi: 'मध्यम',
    moralEn: 'Good will always triumph over evil, and feminine cosmic energy (Shakti) is essential for preserving cosmic order.',
    moralHi: 'बुराई पर अच्छाई की विजय निश्चित है, और सृष्टि के संतुलन के लिए नारी शक्ति (आदिशक्ति) का सम्मान अनिवार्य है।',
    shloka: 'या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता।',
    shlokaTranslationEn: 'To the Goddess who resides in all beings in the form of Power, salutations to Her.',
    shlokaTranslationHi: 'जो देवी सभी प्राणियों में शक्ति के रूप में स्थित हैं, उन्हें बारंबार प्रणाम।',
    keywords: 'durga, durgama, mahishasura, mahishasur, devi, shakti, lion, trident, trishul, navratri, puja, gods, brahma, vishnu, shiva, war, victory, mardini, adishakti, दुर्गा, महिषासुर, देवी, शक्ति, शेर, सिंह, त्रिशूल, नवरात्रि, पूजा, देव, ब्रह्मा, विष्णु, शिव, महिषासुर मर्दिनी, आदिशक्ति'
  },
  {
    id: 'hanuman_devotion',
    titleEn: "Hanuman's Ultimate Proof of Love",
    titleHi: 'हनुमान जी की अनन्य राम भक्ति',
    subtitleEn: 'Rama and Sita in the Heart',
    subtitleHi: 'हृदय में बसे हैं सिया-राम',
    descriptionEn: 'The legendary event when Hanuman ripped open his chest to reveal the true seat of his devotion.',
    descriptionHi: 'वह पावन प्रसंग जब हनुमान जी ने अपना सीना चीरकर दिखाया कि उनके हृदय में केवल प्रभु श्री राम और माता सीता बसते हैं।',
    contentEn: `Following the defeat of Ravana, Lord Rama returned to Ayodhya and was crowned king. During the grand coronation, gifts were distributed to all friends and allies. Queen Sita presented Hanuman with a priceless pearl necklace in appreciation of his heroic deeds.

Hanuman accepted the necklace with reverence, but then began examining each pearl closely, biting into them and throwing them away one by one. The assembly was shocked by this seemingly disrespectful behavior.

A courtier mockingly asked, "Hanuman, why are you destroying such precious pearls? Do you not understand their value?"

Hanuman replied humbly, "I am looking to see if any of these pearls contain the name of my Lord Rama. If they do not have Rama in them, they are useless and without value to me."

The courtier laughed and challenged, "If that is so, then does your own body contain Rama? Show us!"

Without a second thought, Hanuman stood up. With his bare hands, he ripped open his chest. To the absolute wonder and tears of the entire assembly, inside his heart sat the glowing forms of Lord Rama and Goddess Sita, with every fiber of his heart vibrating with the name of Rama. Rama embraced Hanuman, declaring him the greatest devotee.`,
    contentHi: `रावण पर विजय पाने के बाद भगवान राम अयोध्या लौटे और उनका राज्याभिषेक हुआ। इस अवसर पर सभी सहयोगियों को मूल्यवान उपहार दिए गए। माता सीता ने हनुमान जी को उनकी वीरता और सेवा से प्रसन्न होकर एक बहुमूल्य मोतियों की माला भेंट की।

हनुमान जी ने माला को सिर झुकाकर स्वीकार किया, लेकिन फिर वे एक-एक मोती को दांतों से चबाकर देखने लगे और अनुपयोगी मानकर फेंकने लगे। सभा में उपस्थित सभी लोग इस व्यवहार से आश्चर्यचकित और कुछ क्रुद्ध हो गए।

एक दरबारी ने उपहास करते हुए पूछा, "हे हनुमान, आप इन अमूल्य मोतियों को क्यों नष्ट कर रहे हैं? क्या आप इनका मूल्य नहीं जानते?"

हनुमान जी ने विनम्रतापूर्वक उत्तर दिया, "मैं देख रहा हूँ कि क्या इन मोतियों में मेरे प्रभु राम का नाम अंकित है। जिस वस्तु में राम नाम न हो, वह मेरे लिए मूल्यहीन और व्यर्थ है।"

दरबारी ने चुनौती दी, "यदि ऐसा है, तो क्या तुम्हारे इस शरीर में भी राम बसते हैं? हमें दिखाओ!"

बिना किसी संकोच के हनुमान जी ने सीने के मध्य भाग को अपने हाथों से चीर दिया। पूरी सभा यह देखकर स्तब्ध रह गई और सभी की आँखों में आँसू आ गए—हनुमान जी के हृदय में साक्षात श्री राम और माता सीता की छवि विराजमान थी, और उनके रोम-रोम से राम नाम की ध्वनि गूंज रही थी। भगवान राम ने गद्गद होकर हनुमान जी को गले लगा लिया।`,
    categoryEn: 'Ramayana',
    categoryHi: 'रामायण',
    image: imagePath.Hanuman,
    readingTimeMin: 4,
    sourceEn: 'Ramacharitamanas',
    sourceHi: 'रामचरितमानस',
    difficultyEn: 'All Ages',
    difficultyHi: 'सभी के लिए',
    moralEn: 'True devotion is not external; it is written inside the heart and shines through selfless service.',
    moralHi: 'सच्ची भक्ति बाहरी दिखावे में नहीं, बल्कि अंतःकरण में होती है और निस्वार्थ सेवा से प्रकट होती है।',
    shloka: 'राम काज करिबे को आतुर।',
    shlokaTranslationEn: 'Always eager and ready to do the work of Lord Rama.',
    shlokaTranslationHi: 'प्रभु श्री राम के कार्यों को करने के लिए सदैव तत्पर रहने वाले।',
    keywords: 'hanuman, hanumanji, bajrangbali, rama, ram, ramji, sita, heart, chest, pearl, necklace, devotion, ayodhya, love, servant, pawanputra, anjani, हनुमान, राम, सीता, हृदय, सीना, छाती, मोती, माला, भक्ति, अयोध्या, प्रेम, बजरंगबली, पवनपुत्र, अंजनीपुत्र'
  }
];
