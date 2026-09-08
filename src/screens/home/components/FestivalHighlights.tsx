import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import { RootStackParamList } from '@navigation/types';
import { getFestivalData, Festival } from '@services/festivalService';
import imagePath from '@assets/index';
import AnimatedButton from '@components/AnimatedButton';
import FestivalModal from '@components/FestivalModal';

const FestivalHighlights = ({ onPress }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await getFestivalData();
        if (isMounted) {
          setFestivals(data);
        }
      } catch (error) {
        console.error('Error fetching festivals in FestivalHighlights:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const { today, todayStart } = useMemo(() => {
    const tDate = new Date();
    const ts = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());
    return { today: tDate, todayStart: ts };
  }, []);

  const filteredFestivals = useMemo(() => {
    return festivals
      .filter(item => {
        const festivalDateThisYear = new Date(
          today.getFullYear(),
          item.month - 1,
          item.day,
        );
        return festivalDateThisYear.getTime() >= todayStart.getTime();
      })
      .sort((a, b) => {
        if (a.month !== b.month) {
          return a.month - b.month;
        }
        return a.day - b.day;
      });
  }, [festivals, today, todayStart]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.FESTIVAL_HIGHLIGHTS)}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AllFestivals')}
        >
          <Text style={styles.allText}>{t(Translation.ALL)}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.ring} />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredFestivals}
          keyExtractor={item => item.id}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={3}
          removeClippedSubviews={Platform.OS === 'android'}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const name =
              currentLanguage === 'hi' ? item.hindiName : item.englishName;
            const dateStr =
              currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;

            const bgImage = item.image || imagePath.greeting;

            return (
              <AnimatedButton
                style={styles.cardContainer}
                onPress={() => {
                  setSelectedFestival(item);
                  if (onPress) onPress(item);
                }}
              >
                <ImageBackground
                  source={bgImage}
                  style={styles.card}
                  imageStyle={styles.cardImageStyle}
                  fadeDuration={0}
                >
                  <View style={styles.cardOverlay}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{dateStr}</Text>
                  </View>
                </ImageBackground>
              </AnimatedButton>
            );
          }}
        />
      )}

      <FestivalModal
        visible={selectedFestival !== null}
        festival={selectedFestival}
        onClose={() => setSelectedFestival(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
    paddingHorizontal: scale(4),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  allText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: scale(4),
    paddingBottom: scale(10),
  },
  loaderContainer: {
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginRight: scale(12),
    width: scale(124),
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
    elevation: 3,
    backgroundColor: colors.white,
  },
  card: {
    flex: 1,
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  cardImageStyle: {
    borderRadius: scale(14),
  },
  cardOverlay: {
    backgroundColor: colors.cardOverlayDark,
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    height: '100%',
    minHeight: scale(105),
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
  date: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.textWhiteMuted,
  },
  countdown: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.accentPeach,
  },
  icon: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: colors.accentPeach,
  },
});

export default React.memo(FestivalHighlights);
