import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import { Story } from '@constants/storiesData';
import profileStyles from '../styles/profileStyles';

interface FavoriteStoriesSectionProps {
  stories: Story[];
  currentLanguage: 'en' | 'hi';
  onRemove: (storyId: string) => void;
  onPress: (storyId: string) => void;
}

const FavoriteStoriesSection: React.FC<FavoriteStoriesSectionProps> = ({
  stories,
  currentLanguage,
  onRemove,
  onPress,
}) => {
  const { t } = useTranslation();

  if (stories.length === 0) { return null; }

  return (
    <View style={profileStyles.sectionContainer}>
      <Text style={profileStyles.rowTitle}>{t(Translation.PROFILE_FAV_STORIES)}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={profileStyles.favStoriesScroll}
      >
        {stories.map(story => {
          const title = currentLanguage === 'hi' ? story.titleHi : story.titleEn;
          const category = currentLanguage === 'hi' ? story.categoryHi : story.categoryEn;
          return (
            <TouchableOpacity
              key={story.id}
              style={profileStyles.storyBookCard}
              onPress={() => onPress(story.id)}
              activeOpacity={0.85}
            >
              <View style={profileStyles.bookCoverContainer}>
                <TouchableOpacity
                  style={profileStyles.removeFavoriteBadge}
                  onPress={() => onRemove(story.id)}
                  activeOpacity={0.8}
                >
                  <Text style={profileStyles.removeFavoriteText}>×</Text>
                </TouchableOpacity>
                <Image source={story.image} style={profileStyles.bookCoverImage} />
                <View style={profileStyles.categoryBadge}>
                  <Text style={profileStyles.categoryBadgeText}>{category}</Text>
                </View>
              </View>
              <Text style={profileStyles.storyBookTitle} numberOfLines={1}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(FavoriteStoriesSection);
