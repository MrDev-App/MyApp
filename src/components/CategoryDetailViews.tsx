import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../utile/colors';
import fonts from '../utile/fonts';
import { fs, scale } from '../utile/sizes';
import AnimatedButton from './AnimatedButton';

export const AartiView = ({
  items,
  registerItemRef,
  onItemPress,
}: {
  items: any[];
  registerItemRef: (id: string) => (ref: any) => void;
  onItemPress: (id: string, item: any) => void;
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <View style={styles.itemsGrid}>
      {items.map(item => {
        const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
        const subtitle =
          currentLanguage === 'hi' ? item.subtitleHi : item.subtitleEn;
        return (
          <AnimatedButton
            key={item.id}
            style={styles.aartiGridCard}
            onPress={() => onItemPress(item.id, item)}
          >
            <View
              ref={registerItemRef(item.id)}
              collapsable={false}
              style={styles.aartiGridImageContainer}
            >
              <Image source={item.image} style={styles.aartiGridImage} />
            </View>
            <Text style={styles.aartiGridName}>{name}</Text>
            {subtitle && (
              <Text style={styles.aartiGridSubtitle}>{subtitle}</Text>
            )}
          </AnimatedButton>
        );
      })}
    </View>
  );
};

export const ShlokView = ({ items }: { items: any[] }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <View style={styles.shlokList}>
      {items.map(item => {
        const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
        const text = currentLanguage === 'hi' ? item.textHi : item.textEn;
        const splitSeparator =
          currentLanguage === 'hi' ? '\n\nअनुवाद:\n' : '\n\nTranslation:\n';
        const parts = text.split(splitSeparator);
        const sanskritText = parts[0];
        const translationText = parts[1];
        return (
          <View key={item.id} style={styles.shlokCard}>
            <Text style={styles.shlokName}>{name}</Text>

            <View style={styles.shlokContent}>
              <Text style={styles.shlokTextHi}>{sanskritText}</Text>
              {translationText && (
                <>
                  <View style={styles.shlokDivider} />
                  <Text style={styles.shlokTextEn}>{translationText}</Text>
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

// 3. Specific View for Stories Category (Book cover and narrative layout)
export const StoriesView = ({ items }: { items: any[] }) => {
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

export const TemplesView = ({ items }: { items: any[] }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <View style={styles.templesList}>
      {items.map(item => {
        const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
        const subtitle =
          currentLanguage === 'hi' ? item.subtitleHi : item.subtitleEn;
        const text = currentLanguage === 'hi' ? item.textHi : item.textEn;
        return (
          <View key={item.id} style={styles.templeCard}>
            <Image source={item.image} style={styles.templeImage} />
            <View style={styles.templeContent}>
              <Text style={styles.templeName}>{name}</Text>
              {subtitle && (
                <Text style={styles.templeSubtitle}>📍 {subtitle}</Text>
              )}
              <Text style={styles.templeText}>{text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  // 1. Aarti Grid Layout
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aartiGridCard: {
    width: '48%',
    padding: scale(14),
    marginBottom: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  aartiGridImageContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    marginBottom: scale(8),
    overflow: 'hidden',
  },
  aartiGridImage: {
    width: '100%',
    height: '100%',
    borderRadius: scale(50),
    borderWidth: 1.5,
    borderColor: colors.ring,
  },
  aartiGridName: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
  },
  aartiGridSubtitle: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    textAlign: 'center',
    marginTop: scale(2),
  },

  // 2. Shlok Layout
  shlokList: {
    width: '100%',
  },
  shlokCard: {
    backgroundColor: 'rgba(252, 224, 180, 0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    borderWidth: 2,
    // borderColor: 'rgba(251, 148, 55, 0.15)',
    borderStyle: 'dashed',
  },
  shlokName: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  shlokSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,

    marginTop: scale(2),
    marginBottom: scale(10),
  },
  shlokContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(12),
    padding: scale(14),
  },
  shlokTextHi: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(24),
  },
  shlokDivider: {
    height: 1,
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    marginVertical: scale(10),
  },
  shlokTextEn: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: fs(18),
  },

  // 3. Stories Layout
  storiesList: {
    width: '100%',
  },
  storyCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    overflow: 'hidden',
    marginBottom: scale(16),
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
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

  // 4. Temples Layout
  templesList: {
    width: '100%',
  },
  templeCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(12),
    marginBottom: scale(16),
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  templeImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(12),
    marginRight: scale(12),
  },
  templeContent: {
    flex: 1,
    justifyContent: 'center',
  },
  templeName: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  templeSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(2),
    marginBottom: scale(6),
  },
  templeText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(17),
    opacity: 0.95,
  },
});
