import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Story } from '@api/types';
import { ComicBookItem } from '@api/comicBooksApi';
import { fs, scale } from '@theme/sizes';
import fonts from '@theme/fonts';
import colors from '@theme/colors';
import AnimatedButton from '@components/AnimatedButton';
import Loader from '@components/Loader';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { ChevronRight } from '@assets/SvgIcons';

interface ComicShelfProps {
  title: string;
  data: (Story | ComicBookItem)[];
  onPressBook: (story: Story | ComicBookItem) => void;
  onPressSeeAll?: () => void;
  currentLang?: 'en' | 'hi';
  loadingStoryId?: string | null;
  isLoading?: boolean;
  maxDisplayCount?: number;
}

export const ComicShelf: React.FC<ComicShelfProps> = ({
  title,
  data,
  onPressBook,
  onPressSeeAll,
  loadingStoryId,
  isLoading = false,
  maxDisplayCount = 10,
}) => {
  const { t, select } = useAppLanguage();

  if (isLoading || !data || data.length === 0) {
    return (
      <View style={styles.comicsSection}>
        <View style={styles.shelfHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.comicsScroll}
        >
          <View style={styles.horizontalRow}>
            {[1, 2, 3].map(item => (
              <View
                key={`skel_book_2_${item}`}
                style={styles.comicCardSkeleton}
              >
                <Skeleton
                  width={scale(130)}
                  height={scale(180)}
                  borderRadius={scale(14)}
                  baseColor={colors.skeletonBase}
                  highlightColor={colors.skeletonHighlight}
                  style={styles.bookCoverSkeleton}
                />
                <Skeleton
                  width={scale(110)}
                  height={fs(12)}
                  borderRadius={scale(3)}
                  baseColor={colors.skeletonBase}
                  highlightColor={colors.skeletonHighlight}
                  style={styles.mt4}
                />
                <Skeleton
                  width={scale(70)}
                  height={fs(10)}
                  borderRadius={scale(3)}
                  baseColor={colors.skeletonAccentBase}
                  highlightColor={colors.skeletonHighlight}
                  style={styles.mt4}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  const displayBooks = data.slice(0, maxDisplayCount);

  return (
    <View style={styles.comicsSection}>
      <View style={styles.shelfHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onPressSeeAll ? (
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={onPressSeeAll}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
          >
            <Text style={styles.seeAllText}>{t(Translation.SEE_ALL)}</Text>
            <ChevronRight
              size={scale(12)}
              color={colors.ring}
              strokeWidth={2.4}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.comicsScroll}
      >
        {displayBooks.map(story => {
          const isLoadingThis = loadingStoryId === story.id;
          const rawStoryImage =
            (story as any).CoverPage || (story as any).coverPage || story.image;
          const imageSource =
            typeof rawStoryImage === 'string' && rawStoryImage.trim().length > 0
              ? rawStoryImage.trim().startsWith('http://') ||
                rawStoryImage.trim().startsWith('https://')
                ? { uri: rawStoryImage.trim() }
                : (imagePath as any)[rawStoryImage.trim()] ||
                  imagePath.fallBackImage
              : typeof rawStoryImage === 'number' ||
                (rawStoryImage &&
                  typeof rawStoryImage === 'object' &&
                  rawStoryImage.uri)
              ? rawStoryImage
              : imagePath.fallBackImage;

          return (
            <AnimatedButton
              key={story.id}
              style={styles.comicCard}
              onPress={() => {
                if (loadingStoryId) return;
                onPressBook(story);
              }}
            >
              <View style={styles.comicImageContainer}>
                <Animated.Image
                  source={imageSource}
                  style={styles.comicImage}
                  sharedTransitionTag={`story_image_${story.id}`}
                />

                <Loader visible={isLoadingThis} />
              </View>
              <Text style={styles.comicCardTitle} numberOfLines={1}>
                {select(story.titleHi, story.titleEn)}
              </Text>
              <Text style={styles.comicCardMeta} numberOfLines={1}>
                {select(story.sourceHi, story.sourceEn)}
              </Text>
            </AnimatedButton>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  comicsSection: {
    width: '100%',
    marginTop: scale(10),
  },
  shelfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginBottom: scale(6),
  },
  sectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    paddingVertical: scale(2),
    paddingHorizontal: scale(4),
  },
  seeAllText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  comicsScroll: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  comicCard: {
    width: scale(130),
    marginRight: scale(16),
  },
  comicImageContainer: {
    width: '100%',
    height: scale(180),
    borderRadius: scale(14),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.white,
    position: 'relative',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: scale(4),
  },
  horizontalRow: {
    flexDirection: 'row',
    gap: scale(16),
  },
  comicCardSkeleton: {
    width: scale(130),
  },
  bookCoverSkeleton: {
    borderWidth: 1,
    borderColor: colors.skeletonBase,
  },
  mt4: {
    marginTop: scale(4),
  },
  comicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  comicCardTitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  comicCardMeta: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
  },
  typeBadge: {
    position: 'absolute',
    bottom: scale(6),
    left: scale(6),
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(6),
  },
  typeBadgeText: {
    color: colors.white,
    fontSize: fs(9),
    fontFamily: fonts.TiroHindiRegular,
  },
});

export default ComicShelf;
