import React, { useEffect, useState } from 'react';
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
import { getNaamJapData, God } from '@services/godService';
import { triggerHaptic } from '@helper/helper';
import AutoScrollFlatList from '@components/AutoScrollFlatList';

const MantrasCard = () => {
  const { t, currentLanguage } = useAppLanguage();
  const navigation = useNavigation<any>();

  const [naamJapData, setNaamJapData] = useState<God[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchNaamJapData = async () => {
      try {
        const data = await getNaamJapData();
        if (isMounted) {
          setNaamJapData(data);
        }
      } catch (error) {
        console.error('Error fetching naamJapData in MantrasCard:', error);
      }
    };

    fetchNaamJapData();
    return () => {
      isMounted = false;
    };
  }, []);

  const pairedGods = React.useMemo(() => {
    const pairs = [];
    for (let i = 0; i < naamJapData.length; i += 2) {
      pairs.push([naamJapData[i], naamJapData[i + 1]].filter(Boolean));
    }
    return pairs;
  }, [naamJapData]);

  const handleDeityPress = (god: God) => {
    triggerHaptic();
    navigation.navigate('MantraScreen', {
      god,
      allGods: naamJapData,
    });
  };

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
            {item.map((god: any) => {
              const name =
                currentLanguage === 'hi' ? god.hindiName : god.englishName;
              return (
                <TouchableOpacity
                  key={god.id}
                  style={styles.godContainer}
                  onPress={() => handleDeityPress(god)}
                  activeOpacity={0.8}
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
    backgroundColor: colors.white,
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
