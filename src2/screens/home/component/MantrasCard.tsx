import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { godData } from '../../../constants/godData';
import imagePath from '../../../assets';

const MantrasCard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  // Group gods into vertical pairs (columns of size 2) for the horizontal list
  const pairedGods = React.useMemo(() => {
    const pairs = [];
    for (let i = 0; i < godData.length; i += 2) {
      pairs.push([godData[i], godData[i + 1]].filter(Boolean));
    }
    return pairs;
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Label */}
      <Text style={styles.title}>{t(Translation.MANTRAS_BY_DEITIES)}</Text>

      {/* Horizontal List of Columns */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={pairedGods}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map(god => {
              const name =
                currentLanguage === 'hi' ? god.hindiName : god.englishName;
              return (
                <TouchableOpacity
                  key={god.id}
                  style={styles.godContainer}
                  activeOpacity={0.7}
                >
                  <View style={styles.avatarContainer}>
                    <Image source={god.image} style={styles.avatarImage} />
                  </View>
                  <Text
                    style={styles.godName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(14),
    paddingHorizontal: scale(4),
  },
  listContent: {
    paddingHorizontal: scale(4),
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: scale(10),
  },
  godContainer: {
    alignItems: 'center',
    width: scale(100),

    borderRadius: scale(4),
    marginBottom: scale(15),
  },
  avatarContainer: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(50),
    overflow: 'hidden',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  godName: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    marginTop: scale(4),
    textAlign: 'center',
    width: '100%',
  },
});

export default MantrasCard;
