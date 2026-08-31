import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import imagePath from '../../../assets';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';

interface SadhanaCalendarCardProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  markedDates: any;
  currentLanguage: 'en' | 'hi';
}

const SadhanaCalendarCard: React.FC<SadhanaCalendarCardProps> = ({
  selectedDate,
  onSelectDate,
  markedDates,
  currentLanguage: _currentLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.sectionCard}>
      <View style={styles.titleRow}>
        <Image source={imagePath.calendar} style={styles.titleIcon} />
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          {t(Translation.PROFILE_SADHANA_CALENDAR)}
        </Text>
      </View>

      <View style={styles.calendarWrapper}>
        <Calendar
          current={selectedDate}
          onDayPress={day => {
            onSelectDate(day.dateString);
          }}
          markedDates={markedDates}
          theme={{
            textSectionTitleColor: colors.secondary,
            selectedDayBackgroundColor: colors.ring,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.ring,
            dayTextColor: colors.secondary,
            textDisabledColor: colors.neutralDisabled,
            dotColor: colors.ring,
            selectedDotColor: colors.white,
            arrowColor: colors.ring,
            disabledArrowColor: colors.neutralDisabled,
            monthTextColor: colors.secondary,
            indicatorColor: colors.ring,
            textDayFontFamily: fonts.PoppinsRegular,
            textMonthFontFamily: fonts.Marcellus,
            textDayHeaderFontFamily: fonts.PoppinsMedium,
            textDayFontSize: fs(12),
            textMonthFontSize: fs(15),
            textDayHeaderFontSize: fs(11),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(18),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(6) },
    shadowOpacity: 0.04,
    shadowRadius: scale(12),
    elevation: 3,
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(14),
  },
  titleIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
  },
  calendarWrapper: {},
});

export default React.memo(SadhanaCalendarCard);
