import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
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
import { Calendar } from 'react-native-calendars';
import { Back, Forward } from '../../assets';
import AnimatedButton from '../../components/AnimatedButton';
import imagePath from '../../assets';
import FestivalModal from '../../components/FestivalModal';

const { width } = Dimensions.get('window');

const getMonthName = (monthNum: number, currentLanguage: string) => {
  const monthsEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthsHi = [
    'जनवरी',
    'फरवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ];
  return currentLanguage === 'hi'
    ? monthsHi[monthNum - 1]
    : monthsEn[monthNum - 1];
};

const AllFestivalsScreen = () => {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = React.useState(getTodayString());
  const [currentMonthDate, setCurrentMonthDate] = React.useState(
    getTodayString(),
  );
  const [detailFestival, setDetailFestival] = React.useState<Festival | null>(
    null,
  );

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePrevMonth = () => {
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonthDate(formatDate(d));
  };

  const handleNextMonth = () => {
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonthDate(formatDate(d));
  };

  const currentMonthName = React.useMemo(() => {
    const d = new Date(currentMonthDate);
    const monthNum = d.getMonth() + 1;
    return getMonthName(monthNum, currentLanguage) + '  ' + d.getFullYear();
  }, [currentMonthDate, currentLanguage]);

  const currentMonthNum = React.useMemo(() => {
    return new Date(currentMonthDate).getMonth() + 1;
  }, [currentMonthDate]);

  const selectedDateObj = React.useMemo(() => {
    return new Date(selectedDate);
  }, [selectedDate]);

  const selectedDay = selectedDateObj.getDate();
  const selectedMonth = selectedDateObj.getMonth() + 1;

  // Filter other festivals for the active month (excluding selected day's festivals)
  const otherMonthFestivals = React.useMemo(() => {
    return festivalData.filter(f => f.month === currentMonthNum);
  }, [currentMonthNum, selectedMonth]);

  const renderFestivalCard = (item: Festival) => {
    const name = currentLanguage === 'hi' ? item.hindiName : item.englishName;
    const dateStr = currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;
    const tithi = item.tithi;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.festivalCardContainer}
        activeOpacity={0.9}
        onPress={() => setDetailFestival(item)}
      >
        <ImageBackground
          source={item.image || imagePath.greeting}
          style={styles.cardBgImage}
          imageStyle={styles.cardBgImageStyle}
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
                  <Image source={imagePath.sakura} style={styles.sakuraIcon} />
                  <Text style={styles.cardFestivalTithi} numberOfLines={1}>
                    {tithi}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
        </View>

        {/* Month Navigation Row */}
        <View style={styles.calendarNavContainer}>
          <AnimatedButton
            onPress={handlePrevMonth}
            style={styles.navArrowButton}
          >
            <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
          </AnimatedButton>

          <Text style={styles.headerTitle}>{currentMonthName}</Text>

          <AnimatedButton
            onPress={handleNextMonth}
            style={styles.navArrowButton}
          >
            <Forward
              width={scale(12)}
              height={scale(12)}
              stroke={colors.white}
            />
          </AnimatedButton>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Calendar Calendar view */}
          <Calendar
            key={currentMonthDate.substring(0, 7)}
            current={currentMonthDate}
            onDayPress={day => {
              setSelectedDate(day.dateString);
              setCurrentMonthDate(day.dateString);
            }}
            hideArrows={true}
            renderHeader={() => null}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: colors.ring,
                selectedTextColor: colors.white,
              },
            }}
            theme={{
              calendarBackground: 'transparent',
              textDisabledColor: colors.neutralDisabled,
              textSectionTitleColor: colors.ring,
              textDayFontSize: fs(18),
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
            }}
          />

          {/* Selected Day's Festival Section */}
          {/* {selectedDayFestivals.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {currentLanguage === 'hi'
                  ? 'चयनित दिन का त्योहार'
                  : "Selected Day's Festival"}
              </Text>
              {selectedDayFestivals.map(renderFestivalCard)}
            </View>
          )} */}

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
    justifyContent: 'space-between',
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
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
  infoIconCircle: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
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
