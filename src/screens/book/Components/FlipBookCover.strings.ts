export const STRINGS = {
  hi: {
    pleaseWait: 'कृपया प्रतीक्षा करें...',
    flippingPages: (q: number) => `पृष्ठ पलट रहे हैं (+${q})...`,
    cover: 'मुख',
    dedicationMantra: 'ॐ नमो भगवते वासुदेवाय नमः',
    dedicationTitle: '॥ पावन समर्पण एवं ज्ञान ॥',
    dedicationBodyCover:
      'यह दिव्य गाथा आत्म-ज्ञान, धर्म और सत्य के मार्ग को प्रकाशित करती है।',
    dedicationBodyPage:
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — कर्तव्य ही पूजा है।',
    moralHeader: 'प्रेरणा एवं शिक्षा',
    shlokaTranslationHeader: 'भावार्थ',
    openBook: 'पुस्तक खोलें',
    pageOf: (current: number, total: number) => `पृष्ठ ${current} / ${total}`,
  },
  en: {
    pleaseWait: 'Please wait...',
    flippingPages: (q: number) => `Flipping pages (+${q})...`,
    cover: 'Cover',
    dedicationMantra: 'Om Namo Bhagavate Vasudevaya',
    dedicationTitle: 'Sacred Dedication & Wisdom',
    dedicationBodyCover:
      'This sacred tale illuminates the eternal path of righteousness, devotion, and inner peace.',
    dedicationBodyPage:
      'Karmanye Vadhikaraste Ma Phaleshu Kadachana — Duty is worship.',
    moralHeader: 'Moral & Teaching',
    shlokaTranslationHeader: 'Meaning',
    openBook: 'Open Book',
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
  },
} as const;

export type SupportedLanguage = 'en' | 'hi';

export const getStrings = (lang: SupportedLanguage = 'hi') => {
  return STRINGS[lang] || STRINGS.hi;
};
