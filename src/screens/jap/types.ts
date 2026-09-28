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

export const DEFAULT_LEVEL: JapLevel = {
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
};

export const getUserLevel = (
  totalMalas: number,
  levelsList: JapLevel[] = [],
): {
  currentLevel: JapLevel;
  nextLevel: JapLevel | null;
  progressPercent: number;
  malasToNext: number;
} => {
  if (!levelsList || levelsList.length === 0) {
    return {
      currentLevel: DEFAULT_LEVEL,
      nextLevel: null,
      progressPercent: 0,
      malasToNext: 0,
    };
  }
  let currentIndex = 0;
  for (let i = 0; i < levelsList.length; i++) {
    if (totalMalas >= levelsList[i].requiredMalas) {
      currentIndex = i;
    } else {
      break;
    }
  }
  const currentLevel =
    levelsList[currentIndex] || levelsList[0] || DEFAULT_LEVEL;
  const nextLevel =
    currentIndex < levelsList.length - 1 ? levelsList[currentIndex + 1] : null;
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
  return { currentLevel, nextLevel, progressPercent, malasToNext };
};

