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
    requiredMalas: 1100,
    requiredChants: 118800,
    icon: '🌱',
    badgeColor: '#4CAF50',
    blessingEn:
      'Every great spiritual journey begins with a single sacred chant.',
    blessingHi: 'हर महान साधना की शुरुआत एक पवित्र जाप से होती है।',
  },
  {
    level: 2,
    nameEn: 'Sadhak',
    nameHi: 'साधक',
    titleEn: 'Dedicated Seeker',
    titleHi: 'समर्पित साधक',
    requiredMalas: 2200,
    requiredChants: 237600,
    icon: '📿',
    badgeColor: '#00BCD4',
    blessingEn:
      'Your devotion deepens. The divine frequency resonates within you.',
    blessingHi:
      'आपकी भक्ति गहरी हो रही है। दिव्य ऊर्जा आपके भीतर जागृत हो रही है।',
  },
  {
    level: 3,
    nameEn: 'Niyami',
    nameHi: 'नियमित',
    titleEn: 'Consistent Practitioner',
    titleHi: 'नियमित अभ्यासी',
    requiredMalas: 3300,
    requiredChants: 356400,
    icon: '🌿',
    badgeColor: '#8BC34A',
    blessingEn:
      'Consistency brings purity of thought and tranquility of heart.',
    blessingHi: 'नियमितता से विचारों में पवित्रता और मन में शांति आती है।',
  },
  {
    level: 4,
    nameEn: 'Abhyasi',
    nameHi: 'अभ्यासी',
    titleEn: 'Focused Practitioner',
    titleHi: 'एकाग्र अभ्यासी',
    requiredMalas: 4400,
    requiredChants: 475200,
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
    requiredMalas: 5500,
    requiredChants: 594000,
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
    requiredMalas: 6600,
    requiredChants: 712800,
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
    requiredMalas: 7700,
    requiredChants: 831600,
    icon: '⚡',
    badgeColor: '#9C27B0',
    blessingEn: 'Your determination dissolves negative karma with every step.',
    blessingHi: 'आपका तप हर कदम पर नकारात्मक कर्मों को नष्ट कर रहा है।',
  },
  {
    level: 8,
    nameEn: 'Siddha',
    nameHi: 'सिद्ध',
    titleEn: 'Accomplished Seeker',
    titleHi: 'सिद्ध साधक',
    requiredMalas: 8800,
    requiredChants: 950400,
    icon: '👑',
    badgeColor: '#3F51B5',
    blessingEn: 'Divine vibrations flow effortlessly through your spirit.',
    blessingHi:
      'दिव्य स्पंदन अब आपकी आत्मा में सहज रूप से प्रवाहित हो रहे हैं।',
  },
  {
    level: 9,
    nameEn: 'Mahasadhak',
    nameHi: 'महासाधक',
    titleEn: 'Master of Sadhana',
    titleHi: 'साधना के शिखर',
    requiredMalas: 9900,
    requiredChants: 1069200,
    icon: '🔱',
    badgeColor: '#673AB7',
    blessingEn:
      'Immense spiritual light surrounds your being. You inspire seekers.',
    blessingHi:
      'असीम आध्यात्मिक प्रकाश आपके चारों ओर है। आप साधकों के प्रेरणास्रोत हैं।',
  },
  {
    level: 10,
    nameEn: 'Moksha Seeker',
    nameHi: 'मोक्षगामी',
    titleEn: 'Divine Attainment',
    titleHi: 'परम मोक्षगामी',
    requiredMalas: 11000,
    requiredChants: 1188000,
    icon: '🌌',
    badgeColor: '#FFD700',
    blessingEn: 'Supreme devotion and divine communion achieved.',
    blessingHi: 'परम भक्ति और परमात्मा से एकाकार प्राप्त हुआ।',
  },
];

export const getUserLevel = (
  totalMalas: number,
  levelsList: JapLevel[] = JAP_LEVELS,
): {
  currentLevel: JapLevel;
  nextLevel: JapLevel | null;
  progressPercent: number;
  malasToNext: number;
} => {
  const levels = levelsList && levelsList.length > 0 ? levelsList : JAP_LEVELS;
  let currentIndex = 0;

  for (let i = 0; i < levels.length; i++) {
    if (totalMalas >= levels[i].requiredMalas) {
      currentIndex = i;
    } else {
      break;
    }
  }

  const currentLevel = levels[currentIndex] || levels[0];
  const nextLevel =
    currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

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
