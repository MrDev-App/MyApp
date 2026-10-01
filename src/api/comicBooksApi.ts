import {
  getFirestore,
  collection,
  getDocsFromServer,
  query,
} from '@react-native-firebase/firestore';

export const FIRESTORE_COMIC_BOOKS_COLLECTION = 'comicBooks';

export interface ComicBookItem {
  id: string;
  type: string;
  titleEn: string;
  titleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  categoryEn?: string;
  categoryHi?: string;
  image: string;
  imagePages: string[];
  readingTimeMin?: number;
  sourceEn?: string;
  sourceHi?: string;
  difficultyEn?: string;
  difficultyHi?: string;
  keywords?: string;
  updatedAt?: string;
}

let memoryComicBooksCache: ComicBookItem[] | null = null;

/**
 * Fetch comic books strictly from Firestore server over network.
 * If offline or no internet connection, it will reject and return an empty array []
 * so that the skeleton shimmer is displayed instead of loading stale SQLite data.
 */
export const fetchComicBooksFromFirestore = async (
  forceRefresh: boolean = false,
): Promise<ComicBookItem[]> => {
  if (
    !forceRefresh &&
    memoryComicBooksCache &&
    memoryComicBooksCache.length > 0
  ) {
    return memoryComicBooksCache;
  }

  try {
    const db = getFirestore();
    const booksRef = collection(db, FIRESTORE_COMIC_BOOKS_COLLECTION);

    // Strictly fetch from the remote server (never reads from offline disk/SQLite cache)
    const snapshot = await getDocsFromServer(query(booksRef));

    if (snapshot && !snapshot.empty) {
      const items: ComicBookItem[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: data.id || docSnap.id,
          type: data.type || 'comic',
          titleEn: data.titleEn || '',
          titleHi: data.titleHi || '',
          subtitleEn: data.subtitleEn || '',
          subtitleHi: data.subtitleHi || '',
          descriptionEn: data.descriptionEn || '',
          descriptionHi: data.descriptionHi || '',
          categoryEn: data.categoryEn || '',
          categoryHi: data.categoryHi || '',
          image: data.image || '',
          imagePages: Array.isArray(data.imagePages) ? data.imagePages : [],
          readingTimeMin: Number(data.readingTimeMin) || 4,
          sourceEn: data.sourceEn || '',
          sourceHi: data.sourceHi || '',
          difficultyEn: data.difficultyEn || '',
          difficultyHi: data.difficultyHi || '',
          keywords: data.keywords || '',
          updatedAt: data.updatedAt,
        };
      });

      memoryComicBooksCache = items;
      return items;
    }
  } catch (error) {
    console.warn(
      `⚠️ [comicBooksApi] Offline/Server error fetching from '${FIRESTORE_COMIC_BOOKS_COLLECTION}':`,
      error,
    );
    memoryComicBooksCache = null;
  }

  return [];
};
