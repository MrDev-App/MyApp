import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';

interface StoriesScreenProps {
  items: any[];
}

const StoriesScreen: React.FC<StoriesScreenProps> = ({ items }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <View style={styles.storiesList}>
      {items.map(item => {
        const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
        const subtitle =
          currentLanguage === 'hi' ? item.subtitleHi : item.subtitleEn;
        const text = currentLanguage === 'hi' ? item.textHi : item.textEn;
        return (
          <View key={item.id} style={styles.storyCard}>
            <Image source={item.image} style={styles.storyCoverImage} />
            <View style={styles.storyContent}>
              <Text style={styles.storyName}>{name}</Text>
              {subtitle && <Text style={styles.storySubtitle}>{subtitle}</Text>}
              <View style={styles.storyDivider} />
              <Text style={styles.storyText}>{text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default StoriesScreen;

const styles = StyleSheet.create({
  storiesList: {
    width: '100%',
  },
  storyCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    overflow: 'hidden',
    marginBottom: scale(16),
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.06,
    shadowRadius: scale(8),
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  storyCoverImage: {
    width: '100%',
    height: scale(150),
    resizeMode: 'cover',
  },
  storyContent: {
    padding: scale(16),
  },
  storyName: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  storySubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(2),
  },
  storyDivider: {
    height: 1,
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    marginVertical: scale(10),
  },
  storyText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(20),
  },
});
