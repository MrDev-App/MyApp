import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import GradientBackground from '../../components/GradientBackground';
import { festivalData, Festival } from '../../constants/festivalData';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Back } from '../../assets';
import AnimatedButton from '../../components/AnimatedButton';
import imagePath from '../../assets';
import FestivalModal from '../../components/FestivalModal';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  getMonthName,
  monthsHi,
  weekdaysHi,
  dayNamesHi,
  monthsEn,
  weekdaysEn,
  dayNamesEn,
} from '../../constants/calendarData';

LocaleConfig.locales['hi'] = {
  monthNames: monthsHi,
  monthNamesShort: monthsHi,
  dayNames: dayNamesHi,
  dayNamesShort: weekdaysHi,
  today: 'आज',
};

LocaleConfig.locales['en'] = {
  monthNames: monthsEn,
  monthNamesShort: monthsEn,
  dayNames: dayNamesEn,
  dayNamesShort: weekdaysEn,
  today: 'Today',
};



const AllFestivalsScreen = () => {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en').substring(0, 2);

  // Synchronously update the calendar locale configuration during the render phase
  LocaleConfig.defaultLocale = currentLanguage;

  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = React.useState(getTodayString());
  const [currentMonthDate, setCurrentMonthDate] = React.useState<string>(
    getTodayString(),
  );
  const [detailFestival, setDetailFestival] = React.useState<Festival | null>(
    null,
  );

  const currentMonthName = React.useMemo(() => {
    const d = new Date(currentMonthDate);
    const monthNum = d.getMonth() + 1;
    return getMonthName(monthNum, currentLanguage) + '  ' + d.getFullYear();
  }, [currentMonthDate, currentLanguage]);

  const currentMonthNum = React.useMemo(() => {
    return new Date(currentMonthDate).getMonth() + 1;
  }, [currentMonthDate]);


  // Filter other festivals for the active month (excluding selected day's festivals)
  const otherMonthFestivals = React.useMemo(() => {
    return festivalData.filter(f => f.month === currentMonthNum);
  }, [currentMonthNum]);

  // Compute marked dates for the calendar, showing a light primary color background on every day that has a festival
  const calendarMarkedDates = React.useMemo(() => {
    const marks: { [date: string]: any } = {};

    // 1. Extract current year from currentMonthDate
    const currentYear = new Date(currentMonthDate).getFullYear();

    // 2. Mark all festivals of the year with a light primary color background
    festivalData.forEach(fest => {
      const mm = String(fest.month).padStart(2, '0');
      const dd = String(fest.day).padStart(2, '0');
      const dateString = `${currentYear}-${mm}-${dd}`;

      marks[dateString] = {
        selected: true,
        selectedColor: colors.white, // light primary bg
        selectedTextColor: colors.background, // preserve readable text color
      };
    });

    // 3. Mark the currently selected date (with a highlighted circle/background)
    marks[selectedDate] = {
      ...marks[selectedDate],
      selected: true,
      selectedColor: colors.ring, // primary color bg for selection
      selectedTextColor: colors.white, // white text color for selection
    };

    return marks;
  }, [selectedDate, currentMonthDate]);

  const renderFestivalCard = (item: Festival) => {
    const name = currentLanguage === 'hi' ? item.hindiName : item.englishName;
    const dateStr = currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;
    const tithi = item.tithi;

    return (
      <Animated.View key={item.id} entering={FadeInDown.duration(500)}>
        <AnimatedButton
          style={styles.festivalCardContainer}
          onPress={() => setDetailFestival(item)}
        >
          <ImageBackground
            source={item.image || imagePath.greeting}
            style={styles.cardBgImage}
            imageStyle={styles.cardBgImageStyle}
            fadeDuration={0}
          >
            <View style={styles.cardTintOverlay}>
              {/* Top Row: Date capsule & Info marker */}
              <View style={styles.cardTopRow}>
                <View style={styles.dateCapsule}>
                  <Text style={styles.dateCapsuleText}>{dateStr}</Text>
                </View>
              </View>

              {/* Bottom Row: Festival Name & Sub-details */}
              <View style={styles.cardBottomRow}>
                <Text style={styles.cardFestivalName} numberOfLines={1}>
                  {name}
                </Text>
                {tithi && (
                  <View style={styles.tithiRow}>
                    <Image
                      source={imagePath.sakura}
                      style={styles.sakuraIcon}
                    />
                    <Text style={styles.cardFestivalTithi} numberOfLines={1}>
                      {tithi}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </AnimatedButton>
      </Animated.View>
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Premium Header: Back button on far-left */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentMonthName}</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Calendar Calendar view */}
          <Calendar
            key={`${currentLanguage}-${currentMonthDate.substring(0, 7)}`}
            current={currentMonthDate}
            onDayPress={day => {
              setSelectedDate(day.dateString);
              setCurrentMonthDate(day.dateString);
            }}
            hideArrows={false}
            renderHeader={() => null}
            onMonthChange={month => {
              setCurrentMonthDate(month.dateString);
            }}
            markedDates={calendarMarkedDates}
            theme={{
              calendarBackground: 'transparent',
              textDisabledColor: colors.neutralDisabled,
              textSectionTitleColor: colors.ring,
              textDayFontSize: fs(14),
              textMonthFontSize: fs(20),
              textDayHeaderFontSize: fs(12),
              monthTextColor: colors.secondary,
              todayTextColor: colors.ring,
              dayTextColor: colors.secondary,
              selectedDayBackgroundColor: colors.ring,
              selectedDayTextColor: colors.white,
              textDayFontFamily: 'CormorantGaramond_700Bold',
              textMonthFontFamily: 'CormorantGaramond_700Bold',
              textDayHeaderFontFamily: 'CormorantGaramond_700Bold',
              arrowColor: colors.ring,
            }}
          />

          {/* Month's Other Festivals Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'hi'
                ? `${currentMonthName.split(' ')[0]} के त्योहार`
                : `Festivals in ${currentMonthName.split(' ')[0]}`}
            </Text>
            {otherMonthFestivals.length === 0 ? (
              <Text style={styles.noDataText}>
                {currentLanguage === 'hi'
                  ? 'इस महीने कोई त्योहार नहीं है'
                  : 'No festivals this month'}
              </Text>
            ) : (
              otherMonthFestivals.map(renderFestivalCard)
            )}
          </View>
        </ScrollView>

        <FestivalModal
          visible={detailFestival !== null}
          festival={detailFestival}
          onClose={() => setDetailFestival(null)}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
    paddingHorizontal: scale(16),
    height: scale(56),
  },
  backButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ring,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    textAlign: 'center',
  },
  calendarNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
    marginBottom: scale(8),
  },
  navArrowButton: {
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ring,
    padding: scale(4),
  },
  scrollContent: {
    paddingBottom: scale(32),
  },
  sectionContainer: {
    paddingHorizontal: scale(16),
    marginTop: scale(16),
  },
  sectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(12),
  },
  festivalCardContainer: {
    height: scale(120),
    borderRadius: scale(16),
    overflow: 'hidden',
    marginBottom: scale(12),
  },
  cardBgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardBgImageStyle: {
    borderRadius: scale(16),
  },
  cardTintOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: scale(12),
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateCapsule: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: colors.ring,
  },
  dateCapsuleText: {
    color: colors.white,
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
  },

  infoIconText: {
    color: colors.white,
    fontSize: fs(11),
    fontFamily: fonts.PoppinsBold,
  },
  cardBottomRow: {
    gap: scale(2),
  },
  cardFestivalName: {
    color: colors.white,
    fontSize: fs(16),
    fontFamily: fonts.PoppinsBold,
  },
  cardFestivalTithi: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
  },
  noDataText: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
    textAlign: 'center',
    marginTop: scale(20),
  },
  tithiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  sakuraIcon: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
  },
});

export default AllFestivalsScreen;
