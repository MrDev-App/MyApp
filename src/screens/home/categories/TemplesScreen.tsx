import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';

interface TemplesScreenProps {
  items: any[];
}

const TemplesScreen: React.FC<TemplesScreenProps> = ({ items }) => {
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

export default TemplesScreen;

const styles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.05,
    shadowRadius: scale(6),
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
