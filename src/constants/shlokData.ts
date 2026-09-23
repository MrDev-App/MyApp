import { Translation } from '@i18n/language';

export interface ShlokaCategory {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  path: string;
}

export interface ShlokaCategorySection {
  id: string;
  title: string;
  subtitle: string;
  type: 'occasion' | 'deity' | 'text-type';
  categories: ShlokaCategory[];
}

export const SHLOKA_CATEGORY_SECTIONS: ShlokaCategorySection[] = [
  {
    id: 'section-occasions',
    title: Translation.SHLOK_SECTION_OCCASIONS_TITLE,
    subtitle: Translation.SHLOK_SECTION_OCCASIONS_SUBTITLE,
    type: 'occasion',
    categories: [
      {
        id: 'occasion-through-the-day',
        slug: 'through-the-day',
        title: Translation.SHLOK_CAT_THROUGH_THE_DAY,
        imageUrl: 'https://shlokam.org/assets/domains/through-the-day.jpg',
        path: '/shloka/prayers/through-the-day.htm',
      },
      {
        id: 'occasion-health-protection',
        slug: 'health-and-protection',
        title: Translation.SHLOK_CAT_HEALTH_PROTECTION,
        imageUrl: 'https://shlokam.org/assets/domains/health-protection.jpg',
        path: '/shloka/prayers/health-and-protection.htm',
      },
      {
        id: 'occasion-work-money',
        slug: 'money-work-studies',
        title: Translation.SHLOK_CAT_WORK_MONEY,
        imageUrl: 'https://shlokam.org/assets/domains/work-money.jpeg',
        path: '/shloka/prayers/money-work-studies.htm',
      },
      {
        id: 'occasion-study-success',
        slug: 'study-success',
        title: Translation.SHLOK_CAT_STUDY_SUCCESS,
        imageUrl: 'https://shlokam.org/assets/domains/studies-success.jpeg',
        path: '/shloka/prayers/study-success.htm',
      },
      {
        id: 'occasion-home-family',
        slug: 'home-and-family',
        title: Translation.SHLOK_CAT_HOME_FAMILY,
        imageUrl: 'https://shlokam.org/assets/domains/home-family.jpg',
        path: '/shloka/prayers/home-and-family.htm',
      },
      {
        id: 'occasion-children',
        slug: 'children',
        title: Translation.SHLOK_CAT_CHILDREN,
        imageUrl: 'https://shlokam.org/assets/domains/for-children.jpeg',
        path: '/shloka/prayers/children.htm',
      },
      {
        id: 'occasion-mind-heart',
        slug: 'mind-and-heart',
        title: Translation.SHLOK_CAT_MIND_HEART,
        imageUrl: 'https://shlokam.org/assets/domains/mind-heart.jpg',
        path: '/shloka/prayers/mind-and-heart.htm',
      },
      {
        id: 'occasion-spiritual-path',
        slug: 'spiritual-path',
        title: Translation.SHLOK_CAT_SPIRITUAL_PATH,
        imageUrl: 'https://shlokam.org/assets/domains/spiritual-path.jpeg',
        path: '/shloka/prayers/spiritual-path.htm',
      },
    ],
  },
];

/** Flat lookup map: category id -> category. Built once at import time. */
export const SHLOKA_CATEGORY_BY_ID: Record<string, ShlokaCategory> =
  SHLOKA_CATEGORY_SECTIONS.reduce((acc, section) => {
    section.categories.forEach(category => {
      acc[category.id] = category;
    });
    return acc;
  }, {} as Record<string, ShlokaCategory>);

/** Convenience getter — returns undefined if the id doesn't exist. */
export function getShlokaCategoryById(id: string): ShlokaCategory | undefined {
  return SHLOKA_CATEGORY_BY_ID[id];
}

/** Backward-compatibility export */
export const shlokData: any[] = [];
