import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import AnimatedButton from '@components/AnimatedButton';

interface AartiScreenProps {
  items: any[];
  registerItemRef: (id: string) => (ref: any) => void;
  onItemPress: (id: string, item: any) => void;
}

const AartiScreen: React.FC<AartiScreenProps> = ({
  items,
  registerItemRef,
  onItemPress,
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

export default AartiScreen;

const styles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.04,
    shadowRadius: scale(4),
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
});
