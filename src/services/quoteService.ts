import { Storage, STORAGE_KEYS } from './storageService';
import { setSharedItem } from './widgetService';

export interface DailyQuote {
  id: number;
  textHi: string;
  textEn: string;
  authorHi: string;
  authorEn: string;
}

export const DAILY_QUOTES: DailyQuote[] = [
  {
    id: 1,
    textHi:
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    textEn:
      'You have a right to perform your prescribed duty, but never to the fruits thereof.',
    authorHi: 'श्रीमद्भगवद्गीता २.४७',
    authorEn: 'Bhagavad Gita 2.47',
  },
  {
    id: 2,
    textHi: 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः।',
    textEn:
      'The mind alone is the cause of both bondage and liberation for human beings.',
    authorHi: 'अमृतबिन्दु उपनिषद्',
    authorEn: 'Amritabindu Upanishad',
  },
  {
    id: 3,
    textHi:
      'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
    textEn:
      'Perform your duties established in yoga, renouncing attachment and staying balanced in success and failure.',
    authorHi: 'श्रीमद्भगवद्गीता २.४८',
    authorEn: 'Bhagavad Gita 2.48',
  },
  {
    id: 4,
    textHi:
      'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥',
    textEn:
      'Reading books alone never made anyone wise; one who understands love is truly learned.',
    authorHi: 'संत कबीर दास',
    authorEn: 'Sant Kabir Das',
  },
  {
    id: 5,
    textHi:
      'जाकी रही भावना जैसी, प्रभु मूरत देखी तिन तैसी।, जाकी रही भावना जैसी, प्रभु मूरत देखी तिन तैसी।, जाकी रही भावना जैसी, प्रभु मूरत देखी तिन तैसी।, जाकी रही भावना जैसी, प्रभु मूरत देखी तिन तैसी।',
    textEn:
      'As is the purity and intent of one’s heart, so is the divine form one perceives.',
    authorHi: 'गोस्वामी तुलसीदास',
    authorEn: 'Goswami Tulsidas',
  },
  {
    id: 6,
    textHi:
      'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    textEn:
      'To those who are constantly devoted to Me with undivided mind, I provide what they need and protect what they have.',
    authorHi: 'श्रीमद्भगवद्गीता ९.२२',
    authorEn: 'Bhagavad Gita 9.22',
  },
  {
    id: 7,
    textHi: 'सत्यं ब्रूयात् प्रियं ब्रूयात् न ब्रूयात् सत्यमप्रियम्।',
    textEn:
      'Speak the truth and speak what is pleasant; never speak an unpleasant truth.',
    authorHi: 'मनुस्मृति ४.१३८',
    authorEn: 'Manusmriti 4.138',
  },
  {
    id: 8,
    textHi:
      'दया धर्म का मूल है, पाप मूल अभिमान। तुलसी दया न छांड़िए, जब लग घट में प्रान॥',
    textEn:
      'Compassion is the root of dharma, while ego is the root of sin. Never abandon compassion as long as you breathe.',
    authorHi: 'गोस्वामी तुलसीदास',
    authorEn: 'Goswami Tulsidas',
  },
  {
    id: 9,
    textHi:
      'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    textEn:
      'Elevate yourself through the power of your mind; do not degrade yourself. The mind is your friend as well as your enemy.',
    authorHi: 'श्रीमद्भगवद्गीता ६.५',
    authorEn: 'Bhagavad Gita 6.5',
  },
  {
    id: 10,
    textHi: 'हरि व्यापक सर्वत्र समाना, प्रेम ते प्रगट होहिं मैं जाना।',
    textEn:
      'The Divine is present everywhere equally; it reveals itself only through genuine devotion and love.',
    authorHi: 'श्रीरामचरितमानस',
    authorEn: 'Ramcharitmanas',
  },
  {
    id: 11,
    textHi: 'ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति।',
    textEn: 'The Supreme Divine resides within the heart of all living beings.',
    authorHi: 'श्रीमद्भगवद्गीता १८.६१',
    authorEn: 'Bhagavad Gita 18.61',
  },
  {
    id: 12,
    textHi: 'मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव। अतिथिदेवो भव।',
    textEn: 'Honor your mother, father, teacher, and guest as divine.',
    authorHi: 'तैत्तिरीय उपनिषद्',
    authorEn: 'Taittiriya Upanishad',
  },
  {
    id: 13,
    textHi: 'यतो धर्मस्ततो जयः।',
    textEn: 'Where there is righteousness (Dharma), there is victory.',
    authorHi: 'महाभारत',
    authorEn: 'Mahabharata',
  },
  {
    id: 14,
    textHi: 'चिन्ता छोड़ो, चिन्तन करो। हरि नाम ही सत्य है।',
    textEn:
      'Let go of worry and engage in contemplation. The name of the Divine alone is eternal truth.',
    authorHi: 'संत वचन',
    authorEn: 'Saint Teaching',
  },
  {
    id: 15,
    textHi:
      'श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः। ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥',
    textEn:
      'A faithful person with self-control attains supreme knowledge and swiftly achieves everlasting peace.',
    authorHi: 'श्रीमद्भगवद्गीता ४.३९',
    authorEn: 'Bhagavad Gita 4.39',
  },
];

/**
 * Returns today's quote based on current day of the year and specified language.
 */
export const getTodayQuote = (
  lang?: string,
): { text: string; author: string } => {
  const language = (
    lang ||
    Storage.getString(STORAGE_KEYS.APP_LANGUAGE, 'hi') ||
    'hi'
  ).toLowerCase();
  const isHi = language.startsWith('hi');

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const quote = DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];

  return {
    text: isHi ? quote.textHi : quote.textEn,
    author: isHi ? quote.authorHi : quote.authorEn,
  };
};

/**
 * Synchronizes the daily spiritual quote and author to the iOS widget shared storage.
 */
export const syncDailyQuoteToWidget = async (
  lang?: string,
  customQuote?: { text: string; author?: string },
): Promise<void> => {
  try {
    const quote = customQuote || getTodayQuote(lang);
    await setSharedItem('dailyQuote', quote.text);
    if (quote.author) {
      await setSharedItem('dailyQuoteAuthor', quote.author);
    }
  } catch (err) {
    console.warn('[QuoteService] Failed to sync quote to widget:', err);
  }
};
