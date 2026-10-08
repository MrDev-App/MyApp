import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import AutoScrollFlatList from '@components/AutoScrollFlatList';
import { getGodData, getCachedGodData, God } from '@api/godMantrasApi';
import imagePath from '@assets';

const GodItem = React.memo(
  ({
    god,
    currentLanguage,
    onPress,
  }: {
    god: God;
    currentLanguage: string;
    onPress: (god: God) => void;
  }) => {
    // L6: typed image source instead of any
    const [imageSource, setImageSource] = useState<
      { uri: string } | number
    >(() => {
      const rawUrl = (god?.imageUrl || (god as any)?.url || '').toString().trim();
      if (rawUrl.startsWith('http')) {
        return { uri: rawUrl };
      }
      return god?.image || imagePath.fallBackImage;
    });

    useEffect(() => {
      const rawUrl = (god?.imageUrl || (god as any)?.url || '').toString().trim();
      if (rawUrl.startsWith('http')) {
        setImageSource({ uri: rawUrl });
      } else {
        setImageSource(god?.image || imagePath.fallBackImage);
      }
    }, [god?.imageUrl, god?.image]);

    const name = currentLanguage === 'hi' ? god.hindiName : god.englishName;

    return (
      <TouchableOpacity
        style={styles.godContainer}
        onPress={() => onPress(god)}
        activeOpacity={0.8}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={imageSource || imagePath.fallBackImage}
            style={styles.avatarImage}
            onError={() => {
              setImageSource(imagePath.fallBackImage);
            }}
          />
        </View>
        <Text style={styles.godName} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </TouchableOpacity>
    );
  },
);

const MantrasCard = () => {
  const { t, currentLanguage } = useAppLanguage();
  const navigation = useNavigation<any>();

  const [gods, setGods] = useState<God[]>(() => {
    return getCachedGodData() || [];
  });

  useEffect(() => {
    getGodData()
      .then(data => {
        if (data && data.length > 0) {
          setGods(data);
        }
      })
      .catch(() => {
        // M2: silent fail — cached data already shown from getCachedGodData()
      });
  }, []);

  const pairedGods = React.useMemo(() => {
    const pairs = [];
    const list = gods || [];
    for (let i = 0; i < list.length; i += 2) {
      pairs.push([list[i], list[i + 1]].filter(Boolean));
    }
    return pairs;
  }, [gods]);

  const handleDeityPress = useCallback(
    (god: God) => {
      triggerHaptic();
      navigation.navigate('MantraScreen', {
        god,
        allGods: gods || [],
      });
    },
    [navigation, gods],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.MANTRAS_BY_DEITIES)}</Text>

      <AutoScrollFlatList
        data={pairedGods}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews={Platform.OS === 'android'}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map((god: any) => (
              <GodItem
                key={god.id}
                god={god}
                currentLanguage={currentLanguage}
                onPress={handleDeityPress}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(MantrasCard);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
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
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: colors.ring,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  godName: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginTop: scale(4),
    textAlign: 'center',
    width: '100%',
  },
});
