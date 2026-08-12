import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { RootStackParamList } from '../../../navigation/type';
import { festivalData } from './festivalData';

const FestivalHighlights = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  // Filter festivals from the current month to the end of the year, sorted chronologically
  const filteredFestivals = festivalData
    .filter(item => item.month >= currentMonth)
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

      {/* Horizontal FlatList */}
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
          const iconPrefix = item.icon ? `${item.icon} ` : '';
          const countdownText =
            currentLanguage === 'hi'
              ? `${daysLeft} दिनों में`
              : `in ${daysLeft} days `;

          return (
            <View style={styles.card}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {name}
              </Text>
              <Text style={styles.date}>{dateStr}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.countdown}>{countdownText}</Text>
                <Text style={styles.icon}>{iconPrefix}</Text>
              </View>
            </View>
          );
        }}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(15),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginRight: scale(12),
    width: scale(124),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.15)',
    // Subtle premium shadow
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    marginBottom: scale(2),
  },
  date: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    marginBottom: scale(8),
  },
  countdown: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  icon: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
});

export default FestivalHighlights;
