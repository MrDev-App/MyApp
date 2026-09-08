export interface JapLevel {
  level: number;
  nameEn: string;
  nameHi: string;
  titleEn: string;
  titleHi: string;
  requiredMalas: number;
  requiredChants: number;
  icon: string;
  badgeColor: string;
  blessingEn: string;
  blessingHi: string;
}

export const JAP_LEVELS: JapLevel[] = [
  {
    level: 1,
    nameEn: 'Aarambh',
    nameHi: 'आरंभ',
    titleEn: 'The Sacred Beginning',
    titleHi: 'पवित्र शुरुआत',
    requiredMalas: 0,
    requiredChants: 0,
    icon: '🌱',
    badgeColor: '#4CAF50',
    blessingEn: 'Every great spiritual journey begins with a single sacred chant.',
    blessingHi: 'हर महान साधना की शुरुआत एक पवित्र जाप से होती है।',
  },
  {
    level: 2,
    nameEn: 'Sadhak',
    nameHi: 'साधक',
    titleEn: 'Dedicated Seeker',
    titleHi: 'समर्पित साधक',
    requiredMalas: 1,
    requiredChants: 108,
    icon: '📿',
    badgeColor: '#00BCD4',
    blessingEn: 'You completed your first full Mala. The divine frequency begins to resonate.',
    blessingHi: 'आपने अपनी पहली पूर्ण माला की। दिव्य ऊर्जा आपके भीतर जागृत हो रही है।',
  },
  {
    level: 3,
    nameEn: 'Niyami',
    nameHi: 'नियमित',
    titleEn: 'Consistent Practitioner',
    titleHi: 'नियमित अभ्यासी',
    requiredMalas: 5,
    requiredChants: 540,
    icon: '🌿',
    badgeColor: '#8BC34A',
    blessingEn: 'Consistency brings purity of thought and tranquility of heart.',
    blessingHi: 'नियमितता से विचारों में पवित्रता और मन में शांति आती है।',
  },
  {
    level: 4,
    nameEn: 'Abhyasi',
    nameHi: 'अभ्यासी',
    titleEn: 'Focused Practitioner',
    titleHi: 'एकाग्र अभ्यासी',
    requiredMalas: 11,
    requiredChants: 1188,
    icon: '🕉️',
    badgeColor: '#FF9800',
    blessingEn: 'Your concentration deepens with every sacred bead.',
    blessingHi: 'हर मनके के साथ आपकी एकाग्रता और गहरी होती जा रही है।',
  },
  {
    level: 5,
    nameEn: 'Dhyani',
    nameHi: 'ध्यानी',
    titleEn: 'Deep Meditator',
    titleHi: 'गहन ध्यानी',
    requiredMalas: 21,
    requiredChants: 2268,
    icon: '🪷',
    badgeColor: '#E91E63',
    blessingEn: 'Mantra and consciousness merge into stillness and inner joy.',
    blessingHi: 'मंत्र और चेतना अब आंतरिक शांति और आनंद में लीन हो रहे हैं।',
  },
  {
    level: 6,
    nameEn: 'Upasaka',
    nameHi: 'उपासक',
    titleEn: 'Devoted Soul',
    titleHi: 'समर्पित उपासक',
    requiredMalas: 51,
    requiredChants: 5508,
    icon: '☀️',
    badgeColor: '#FFC107',
    blessingEn: 'Your devotion radiates warmth and positive aura around you.',
    blessingHi: 'आपकी भक्ति और साधना से चारों ओर सकारात्मक ऊर्जा फैल रही है।',
  },
  {
    level: 7,
    nameEn: 'Tapasvi',
    nameHi: 'तपस्वी',
    titleEn: 'Austerity Achiever',
    titleHi: 'तपस्वी साधक',
    requiredMalas: 108,
    requiredChants: 11664,
    icon: '⚡',
    badgeColor: '#9C27B0',
    blessingEn: 'A century of Malas! Your determination dissolves negative karma.',
    blessingHi: '108 मालाओं का संकल्प! आपका तप नकारात्मक कर्मों को नष्ट कर रहा है।',
  },
  {
    level: 8,
    nameEn: 'Siddha',
    nameHi: 'सिद्ध',
    titleEn: 'Accomplished Seeker',
    titleHi: 'सिद्ध साधक',
    requiredMalas: 216,
    requiredChants: 23328,
    icon: '👑',
    badgeColor: '#3F51B5',
    blessingEn: 'Divine vibrations flow effortlessly through your spirit.',
    blessingHi: 'दिव्य स्पंदन अब आपकी आत्मा में सहज रूप से प्रवाहित हो रहे हैं।',
  },
  {
    level: 9,
    nameEn: 'Mahasadhak',
    nameHi: 'महासाधक',
    titleEn: 'Master of Sadhana',
    titleHi: 'साधना के शिखर',
    requiredMalas: 500,
    requiredChants: 54000,
    icon: '🔱',
    badgeColor: '#673AB7',
    blessingEn: 'Immense spiritual light surrounds your being. You inspire seekers.',
    blessingHi: 'असीम आध्यात्मिक प्रकाश आपके चारों ओर है। आप साधकों के प्रेरणास्रोत हैं।',
  },
  {
    level: 10,
    nameEn: 'Moksha Seeker',
    nameHi: 'मोक्षगामी',
    titleEn: 'Divine Attainment',
    titleHi: 'परम मोक्षगामी',
    requiredMalas: 1008,
    requiredChants: 108864,
    icon: '🌌',
    badgeColor: '#FFD700',
    blessingEn: 'Surpassed 1008 Malas! Supreme devotion and divine communion achieved.',
    blessingHi: '1008 मालाओं का महाअनुष्ठान पूर्ण! परम भक्ति और परमात्मा से एकाकार।',
  },
];

export const getUserLevel = (totalMalas: number): {
  currentLevel: JapLevel;
  nextLevel: JapLevel | null;
  progressPercent: number;
  malasToNext: number;
} => {
  let currentIndex = 0;

  for (let i = 0; i < JAP_LEVELS.length; i++) {
    if (totalMalas >= JAP_LEVELS[i].requiredMalas) {
      currentIndex = i;
    } else {
      break;
    }
  }

  const currentLevel = JAP_LEVELS[currentIndex];
  const nextLevel =
    currentIndex < JAP_LEVELS.length - 1 ? JAP_LEVELS[currentIndex + 1] : null;

  let progressPercent = 100;
  let malasToNext = 0;

  if (nextLevel) {
    const malasInCurrentTier = totalMalas - currentLevel.requiredMalas;
    const malasNeededForTier =
      nextLevel.requiredMalas - currentLevel.requiredMalas;
    progressPercent = Math.min(
      100,
      Math.max(0, (malasInCurrentTier / malasNeededForTier) * 100),
    );
    malasToNext = Math.max(0, nextLevel.requiredMalas - totalMalas);
  }

  return {
    currentLevel,
    nextLevel,
    progressPercent,
    malasToNext,
  };
};
