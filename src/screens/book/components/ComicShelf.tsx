import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { Story } from '@constants/storiesData';
import { fs, scale } from '@theme/sizes';
import fonts from '@theme/fonts';
import colors from '@theme/colors';
import AnimatedButton from '@components/AnimatedButton';
import Loader from '@components/Loader';
import { useAppLanguage } from '@hooks';

interface ComicShelfProps {
  title: string;
  data: Story[];
  onPressBook: (story: Story) => void;
  currentLang?: 'en' | 'hi';
  loadingStoryId?: string | null;
}

export const ComicShelf: React.FC<ComicShelfProps> = ({
  title,
  data,
  onPressBook,
  loadingStoryId,
}) => {
  const { select } = useAppLanguage();
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
          const isLoadingThis = loadingStoryId === story.id;
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
                  source={story.image}
                  style={styles.comicImage}
                  sharedTransitionTag={`story_image_${story.id}`}
                />

                <Loader visible={isLoadingThis} />
              </View>
              <Text style={styles.comicCardTitle} numberOfLines={1}>
                {select(story.titleHi, story.titleEn)}
              </Text>
              <Text style={styles.comicCardMeta}>
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
    marginTop: scale(8),
  },
  sectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
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
