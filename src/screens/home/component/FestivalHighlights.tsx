import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { RootStackParamList } from '../../../navigation/type';
import { festivalData, Festival } from '../../../constants/festivalData';
import imagePath from '../../../assets';
import AnimatedButton from '../../../components/AnimatedButton';
import FestivalModal from '../../../components/FestivalModal';

const FestivalHighlights = ({ onPress }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null,
  );

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const filteredFestivals = festivalData
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

  const calculateDaysRemaining = (month: number, day: number) => {
    const currentYear = today.getFullYear();
    let festivalDate = new Date(currentYear, month - 1, day);

    // If the festival has passed this year, roll it over to next year
    if (festivalDate.getTime() < today.getTime()) {
      festivalDate = new Date(currentYear + 1, month - 1, day);
    }

    const diffTime = festivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.FESTIVAL_HIGHLIGHTS)}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AllFestivals')}
        >
          <Text style={styles.allText}>{t(Translation.ALL)}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredFestivals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const daysLeft = calculateDaysRemaining(item.month, item.day);
          const name =
            currentLanguage === 'hi' ? item.hindiName : item.englishName;
          const dateStr =
            currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;

          const countdownText =
            daysLeft === 0
              ? currentLanguage === 'hi'
                ? 'आज'
                : 'Today'
              : currentLanguage === 'hi'
              ? `${daysLeft} दिनों में`
              : `in ${daysLeft} days`;

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

                  <View style={{}}>
                    <Text style={styles.date}>{dateStr}</Text>
                    <Text style={styles.countdown}>{countdownText}</Text>
                  </View>
                </View>
              </ImageBackground>
            </AnimatedButton>
          );
        }}
      />

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
  cardContainer: {
    marginRight: scale(12),
    width: scale(124),
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.15)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    height: '100%',
    justifyContent: 'space-between',
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
    color: 'rgba(255, 255, 255, 0.8)',
  },
  countdown: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsMedium,
    color: '#FFE0B2',
  },
  icon: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: '#FFE0B2',
  },
});

export default FestivalHighlights;
