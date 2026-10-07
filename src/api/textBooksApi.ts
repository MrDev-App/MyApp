import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  limit,
  startAfter,
} from '@react-native-firebase/firestore';
import imagePath from '@assets/index';
import { Story, StoryPage, BookType } from './types';

export type { Story, StoryPage, BookType };

// In-memory runtime cache of loaded books from Firestore
let memoryLoadedBooks: Story[] = [];

export let TextBooks: Story[] = [];
export let AllBooks: Story[] = [];

export const setLoadedBooks = (books: Story[]) => {
  memoryLoadedBooks = books;
  TextBooks = books;
  AllBooks = books;
};

export const getLoadedBooks = (): Story[] => {
  return memoryLoadedBooks;
};

export const findStoryById = (id: string): Story | undefined => {
  return (
    memoryLoadedBooks.find((s: Story) => s.id === id) ||
    AllBooks.find((s: Story) => s.id === id)
  );
};

export const FIRESTORE_TEXT_BOOKS_COLLECTION = 'textBooks';

/**
 * Convert any image reference to a string representation for Firestore.
 */
export const resolveStoryImageToString = (img: any): any => {
  if (!img) return '';
  if (typeof img === 'string') return img.trim();

  if (Array.isArray(img)) {
    return img.map(resolveStoryImageToString).filter(Boolean);
  }

  return '';
};

/**
 * Resolve an image value read from Firestore (remote URL or string key)
 * into a valid React Native Image source.
 */
export const resolveStoryImageFromFirestore = (val: any): any => {
  if (!val) return imagePath.fallBackImage;

  if (Array.isArray(val)) {
    return val.map(resolveStoryImageFromFirestore);
  }

  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return { uri: trimmed };
    }
    if ((imagePath as any)[trimmed]) {
      return (imagePath as any)[trimmed];
    }
    return imagePath.fallBackImage;
  }

  if (typeof val === 'number' || (val && typeof val === 'object' && val.uri)) {
    return val;
  }

  return imagePath.fallBackImage;
};

/**
 * Maps a Firestore document data to a Story object.
 */
export const mapFirestoreDocToStory = (id: string, data: any): Story => {
  const coverUrl =
    typeof data.CoverPage === 'string' && data.CoverPage.trim().length > 0
      ? data.CoverPage.trim()
      : typeof data.coverPage === 'string' && data.coverPage.trim().length > 0
      ? data.coverPage.trim()
      : '';

  return {
    id: data.id || id,
    type: data.type || 'text',
    titleEn: data.titleEn || '',
    titleHi: data.titleHi || '',
    subtitleEn: data.subtitleEn || '',
    subtitleHi: data.subtitleHi || '',
    descriptionEn: data.descriptionEn || '',
    descriptionHi: data.descriptionHi || '',
    categoryEn: data.categoryEn || '',
    categoryHi: data.categoryHi || '',
    CoverPage: coverUrl || undefined,
    coverPage: coverUrl || undefined,
    image: resolveStoryImageFromFirestore(coverUrl || data.image),
    readingTimeMin: data.readingTimeMin || 15,
    sourceEn: data.sourceEn || '',
    sourceHi: data.sourceHi || '',
    difficultyEn: data.difficultyEn || '',
    difficultyHi: data.difficultyHi || '',
    moralEn: data.moralEn || '',
    moralHi: data.moralHi || '',
    shloka: data.shloka || '',
    shlokaTranslationEn: data.shlokaTranslationEn || '',
    shlokaTranslationHi: data.shlokaTranslationHi || '',
    keywords: data.keywords || '',
    pages: (data.pages || []).map((p: any) => ({
      page: p.page || 0,
      sourceEn: p.sourceEn || '',
      sourceHi: p.sourceHi || '',
      titleEn: p.titleEn || '',
      titleHi: p.titleHi || '',
      contentEn: p.contentEn || '',
      contentHi: p.contentHi || '',
      shloka: p.shloka || '',
      shlokaTranslationEn: p.shlokaTranslationEn || '',
      shlokaTranslationHi: p.shlokaTranslationHi || '',
      moralEn: p.moralEn || '',
      moralHi: p.moralHi || '',
      image: resolveStoryImageFromFirestore(p.image),
    })),
  };
};

/**
 * Formats a Story object for Firestore, eliminating undefined values.
 */
export const formatStoryForFirestore = (story: Story) => {
  const coverUrl = story.CoverPage || story.coverPage || '';
  return {
    id: story.id,
    type: story.type || 'text',
    titleEn: story.titleEn || '',
    titleHi: story.titleHi || '',
    subtitleEn: story.subtitleEn || '',
    subtitleHi: story.subtitleHi || '',
    descriptionEn: story.descriptionEn || '',
    descriptionHi: story.descriptionHi || '',
    categoryEn: story.categoryEn || '',
    categoryHi: story.categoryHi || '',
    CoverPage: coverUrl,
    coverPage: coverUrl,
    image: resolveStoryImageToString(story.image) || '',
    readingTimeMin: story.readingTimeMin || 15,
    sourceEn: story.sourceEn || '',
    sourceHi: story.sourceHi || '',
    difficultyEn: story.difficultyEn || '',
    difficultyHi: story.difficultyHi || '',
    moralEn: story.moralEn || '',
    moralHi: story.moralHi || '',
    shloka: story.shloka || '',
    shlokaTranslationEn: story.shlokaTranslationEn || '',
    shlokaTranslationHi: story.shlokaTranslationHi || '',
    keywords: story.keywords || '',
    pages: (story.pages || []).map((p: StoryPage) => ({
      page: p.page || 0,
      sourceEn: p.sourceEn || '',
      sourceHi: p.sourceHi || '',
      titleEn: p.titleEn || '',
      titleHi: p.titleHi || '',
      contentEn: p.contentEn || '',
      contentHi: p.contentHi || '',
      shloka: p.shloka || '',
      shlokaTranslationEn: p.shlokaTranslationEn || '',
      shlokaTranslationHi: p.shlokaTranslationHi || '',
      moralEn: p.moralEn || '',
      moralHi: p.moralHi || '',
      image: resolveStoryImageToString(p.image),
    })),
    updatedAt: new Date().toISOString(),
  };
};

export interface FetchTextBooksOptions {
  limitCount?: number;
  lastDoc?: any;
}

export interface FetchTextBooksResult {
  items: Story[];
  lastDoc: any | null;
  hasMore: boolean;
}

/**
 * Fetch TextBooks from Firestore 'textBooks' collection with limit (default 10).
 * Uses Firestore limit() and startAfter() cursor pagination.
 */
export const fetchTextBooksFromFirestore = async (
  options: FetchTextBooksOptions = {},
): Promise<FetchTextBooksResult> => {
  const { limitCount = 10, lastDoc = null } = options;

  console.log('🔍 [textBooksApi] fetchTextBooks called:', {
    limitCount,
    isPaginating: !!lastDoc,
    startAfterId: lastDoc?.id || null,
  });

  try {
    const db = getFirestore();
    const colRef = collection(db, FIRESTORE_TEXT_BOOKS_COLLECTION);

    const constraints: any[] = [];
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    constraints.push(limit(limitCount));

    const snap = await getDocs(query(colRef, ...constraints));

    if (!snap || snap.empty) {
      console.log('ℹ️ [textBooksApi] No textbooks returned.');
      return {
        items: [],
        lastDoc: null,
        hasMore: false,
      };
    }

    const docs = snap.docs;
    const newLastDoc = docs[docs.length - 1] || null;
    const hasMore = docs.length === limitCount;

    const books: Story[] = docs.map(docSnap =>
      mapFirestoreDocToStory(docSnap.id, docSnap.data()),
    );

    console.log(
      `📦 [textBooksApi] Fetched ${books.length} textbooks from Firestore (hasMore: ${hasMore})`,
    );

    // Merge into memoryLoadedBooks
    const currentMemory = getLoadedBooks();
    const existingIds = new Set(currentMemory.map(b => b.id));
    const merged = [
      ...currentMemory,
      ...books.filter(b => !existingIds.has(b.id)),
    ];
    setLoadedBooks(merged);

    return {
      items: books,
      lastDoc: newLastDoc,
      hasMore,
    };
  } catch (error) {
    console.error(
      `❌ [textBooksApi] Error fetching from '${FIRESTORE_TEXT_BOOKS_COLLECTION}':`,
      error,
    );
    return {
      items: [],
      lastDoc: null,
      hasMore: false,
    };
  }
};

/**
 * Fetch a single TextBook by its ID from Firestore.
 */
export const fetchTextBookById = async (id: string): Promise<Story | null> => {
  const cached = getLoadedBooks().find(b => b.id === id);
  if (cached) return cached;

  try {
    const db = getFirestore();
    const docRef = doc(db, FIRESTORE_TEXT_BOOKS_COLLECTION, id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const book = mapFirestoreDocToStory(snap.id, snap.data());
      const current = getLoadedBooks();
      setLoadedBooks([...current.filter(b => b.id !== id), book]);
      return book;
    }
  } catch (err) {
    console.warn(`[textBooksApi] Error fetching book by ID (${id}):`, err);
  }

  return null;
};

/**
 * Fetches textbooks from Firestore on screen open (up to 100 books for all shelves).
 */
export const syncTextBooksOnBookScreenOpen = async (): Promise<Story[]> => {
  try {
    const res = await fetchTextBooksFromFirestore({ limitCount: 100 });
    return res.items;
  } catch (err) {
    console.warn('⚠️ [textBooksApi] syncTextBooksOnBookScreenOpen error:', err);
    return [];
  }
};

const KRISHNA_KEYWORDS = [
  'krishna',
  'कृष्ण',
  'kanha',
  'कान्हा',
  'radha',
  'राधा',
  'gokul',
  'गोकुल',
  'mathura',
  'मथुरा',
  'dwarka',
  'द्वारका',
  'vrindavan',
  'वृन्दावन',
  'वृंदावन',
  'bhagavad',
  'gita',
  'गीता',
  'yashoda',
  'यशोदा',
  'makhan',
  'माखन',
  'govind',
  'गोविंद',
  'gopal',
  'गोपाल',
  'madhav',
  'माधव',
  'kansa',
  'कंस',
];

const HANUMAN_KEYWORDS = [
  'hanuman',
  'हनुमान',
  'bajrang',
  'बजरंग',
  'maruti',
  'मारुति',
  'pavanputra',
  'पवनपुत्र',
  'sundarkand',
  'सुंदरकांड',
  'सुंदरकाण्ड',
  'surasa',
  'सुरसा',
  'sanjivani',
  'संजीवनी',
  'keshari',
  'केसरी',
  'anjani',
  'अंजनी',
  'sita search',
  'lanka',
  'लंका',
  'ramayana',
  'रामायण',
  'sugriva',
  'सुग्रीव',
];

/**
 * Checks if a story is related to Lord Krishna.
 */
export const isKrishnaStory = (story: Story | any): boolean => {
  if (!story) return false;
  const textToSearch = [
    story.titleEn,
    story.titleHi,
    story.subtitleEn,
    story.subtitleHi,
    story.descriptionEn,
    story.descriptionHi,
    story.categoryEn,
    story.categoryHi,
    story.sourceEn,
    story.sourceHi,
    story.keywords,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return KRISHNA_KEYWORDS.some(kw => textToSearch.includes(kw.toLowerCase()));
};

/**
 * Checks if a story is related to Lord Hanuman.
 */
export const isHanumanStory = (story: Story | any): boolean => {
  if (!story) return false;
  const textToSearch = [
    story.titleEn,
    story.titleHi,
    story.subtitleEn,
    story.subtitleHi,
    story.descriptionEn,
    story.descriptionHi,
    story.categoryEn,
    story.categoryHi,
    story.sourceEn,
    story.sourceHi,
    story.keywords,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return HANUMAN_KEYWORDS.some(kw => textToSearch.includes(kw.toLowerCase()));
};

/**
 * Filter Krishna stories from a list of books.
 */
export const filterKrishnaStories = (books: (Story | any)[]): Story[] => {
  return (books as Story[]).filter(isKrishnaStory);
};

/**
 * Filter Hanuman stories from a list of books.
 */
export const filterHanumanStories = (books: (Story | any)[]): Story[] => {
  return (books as Story[]).filter(isHanumanStory);
};
