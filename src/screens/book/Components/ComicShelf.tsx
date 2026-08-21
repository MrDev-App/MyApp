import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Story } from '../../../constants/storiesData';
import { fs, scale } from '../../../utile/sizes';
import fonts from '../../../utile/fonts';
import colors from '../../../utile/colors';

interface ComicShelfProps {
  title: string;
  data: Story[];
  onPressBook: (story: Story) => void;
  progressMap?: Record<string, number>;
  bookmarks?: string[];
  currentLang?: 'en' | 'hi';
  recentProgressLabel?: string;
}

export const ComicShelf: React.FC<ComicShelfProps> = ({
  title,
  data,
  onPressBook,
  progressMap = {},
  bookmarks = [],
  currentLang = 'en',
  recentProgressLabel = '{{progress}}% Read',
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.comicsSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.comicsScroll}
      >
        {data.map(story => {
          const progress = progressMap[story.id] || 0;
          const isFav = bookmarks.includes(story.id);
          return (
            <TouchableOpacity
              key={story.id}
              style={styles.comicCard}
              onPress={() => onPressBook(story)}
              activeOpacity={0.8}
            >
              <View style={styles.comicImageContainer}>
                <Animated.Image
                  source={story.image}
                  style={styles.comicImage}
                  sharedTransitionTag={`story_image_${story.id}`}
                />
              </View>
              <Text style={styles.comicCardTitle} numberOfLines={1}>
                {currentLang === 'hi' ? story.titleHi : story.titleEn}
              </Text>
              <Text style={styles.comicCardMeta}>
                {currentLang === 'hi' ? story.sourceHi : story.sourceEn}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  comicsSection: {
    width: '100%',
    marginTop: scale(8),
  },
  sectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    paddingHorizontal: scale(20),
    marginBottom: scale(4),
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
    borderColor: colors.borderMedium,
    backgroundColor: colors.white,
    position: 'relative',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: scale(6),
  },
  comicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  comicBookmarkBadge: {
    position: 'absolute',
    top: scale(6),
    right: scale(6),
    backgroundColor: colors.overlayStrong,
    borderRadius: scale(20),
    width: scale(22),
    height: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  comicBookmarkBadgeText: {
    fontSize: fs(11),
  },
  comicProgressOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayDarkMedium,
    paddingVertical: scale(2),
    alignItems: 'center',
  },
  comicProgressOverlayText: {
    color: colors.white,
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
  },
  comicCardTitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginTop: scale(2),
  },
  comicCardMeta: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
});
export default ComicShelf;
