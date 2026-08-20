import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import { Translation } from '../../i18n/language';
import { RootStackParamList } from '../../navigation/type';
import GradientBackground from '../../components/GradientBackground';
import { festivalData, Festival } from '../../constants/festivalData';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
    'फ़रवरी',
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

const getMonthAbbrev = (monthNum: number, currentLanguage: string) => {
  const abbrevEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const abbrevHi = [
    'जन',
    'फ़र',
    'मार्च',
    'अप्रै',
    'मई',
    'जून',
    'जुला',
    'अग',
    'सित',
    'अक्तू',
    'नव',
    'दिस',
  ];
  return currentLanguage === 'hi'
    ? abbrevHi[monthNum - 1]
    : abbrevEn[monthNum - 1];
};

const AllFestivalsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
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
  const today = new Date();

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

  const sections = React.useMemo(() => {
    // Group festivals by month
    const groups: { [key: number]: Festival[] } = {};
    festivalData.forEach(item => {
      if (!groups[item.month]) {
        groups[item.month] = [];
      }
      groups[item.month].push(item);
    });

    // Sort items inside each month chronologically by day
    Object.keys(groups).forEach(m => {
      groups[Number(m)].sort((a, b) => a.day - b.day);
    });

    // Convert into SectionList section structure
    return Object.keys(groups)
      .map(m => {
        const monthNum = Number(m);
        return {
          title: getMonthName(monthNum, currentLanguage),
          month: monthNum,
          data: groups[monthNum],
        };
      })
      .sort((a, b) => a.month - b.month);
  }, [currentLanguage]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Premium Header: Back button on far-left, Month navigation in center */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={styles.calendarNavContainer}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              activeOpacity={0.7}
              style={styles.navArrowButton}
            >
              <Text style={styles.calendarArrow}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{currentMonthName}</Text>

            <TouchableOpacity
              onPress={handleNextMonth}
              activeOpacity={0.7}
              style={styles.navArrowButton}
            >
              <Text style={styles.calendarArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        <Calendar
          current={currentMonthDate}
          onDayPress={day => {
            console.log('selected day', day);
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
          }}
        />
      </SafeAreaView>
    </GradientBackground>
  );
  // return (
  //   <GradientBackground>
  //     <SafeAreaView style={styles.container}>
  //       {/* Premium Header */}
  //       {/* <View style={styles.header}>
  //         <TouchableOpacity
  //           style={styles.backButton}
  //           onPress={() => navigation.goBack()}
  //           activeOpacity={0.7}
  //         >
  //           <Text style={styles.backArrow}>←</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.headerTitle}>{t(Translation.ALL_FESTIVALS)}</Text>
  //         <View style={styles.headerPlaceholder} />
  //       </View> */}

  //       {/* Section List for Grouped Festivals */}
  //       <SectionList
  //         sections={sections}
  //         keyExtractor={item => item.id}
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={styles.listContent}
  //         renderSectionHeader={({ section: { title } }) => (
  //           <View style={styles.sectionHeaderContainer}>
  //             <Text style={styles.sectionHeaderText}>{title}</Text>
  //           </View>
  //         )}
  //         renderItem={({ item }) => {
  //           const daysLeft = calculateDaysRemaining(item.month, item.day);
  //           const name =
  //             currentLanguage === 'hi' ? item.hindiName : item.englishName;
  //           const monthAbbrev = getMonthAbbrev(item.month, currentLanguage);
  //           const countdownText = t(Translation.DAYS_COUNT_LABEL, {
  //             count: daysLeft,
  //           });

  //           return (
  //             <View style={styles.card}>
  //               {/* Left side: Date Badge */}
  //               <View style={styles.dateBadge}>
  //                 <Text style={styles.dateDay}>{item.day}</Text>
  //                 <Text style={styles.dateMonth}>{monthAbbrev}</Text>
  //               </View>

  //               {/* Middle details */}
  //               <View style={styles.detailsContainer}>
  //                 <Text
  //                   style={styles.festivalName}
  //                   numberOfLines={1}
  //                   ellipsizeMode="tail"
  //                 >
  //                   {name}
  //                 </Text>
  //                 <Text style={styles.festivalCategory}>{item.category}</Text>
  //                 {item.tithi && (
  //                   <Text style={styles.festivalTithi} numberOfLines={1}>
  //                     {item.tithi}
  //                   </Text>
  //                 )}
  //               </View>
  //             </View>
  //           );
  //         }}
  //       />
  //     </SafeAreaView>
  //   </GradientBackground>
  // );
};

//   selectedDayBackgroundColor: '#b6a897',
//   selectedDayTextColor: '#0000',
//   todayTextColor: '#b6a897',
//   // dayTextColor: '#ffffff',
//   textDisabledColor: '#444444',
//   dotColor: '#b6a897',
//   // selectedDotColor: '#ffffff',
//   // arrowColor: '#b6a897',
//   // monthTextColor: '#b6a897',
//   textDayFontFamily: 'CormorantGaramond_700Bold',
//   textMonthFontFamily: 'CormorantGaramond_700Bold',
//   textDayHeaderFontFamily: 'CormorantGaramond_700Bold',

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
    borderBottomWidth: 1,
    borderBottomColor: colors.borderVerySubtle,
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ring,
  },
  backArrow: {
    fontSize: fs(20),
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: scale(36),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(24),
  },
  sectionHeaderContainer: {
    marginTop: scale(20),
    marginBottom: scale(8),
    paddingVertical: scale(4),
    paddingHorizontal: scale(4),
  },
  sectionHeaderText: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 0.5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  dateBadge: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(8),
    backgroundColor: colors.borderVerySubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  dateDay: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsBold,
    color: colors.ring,
    lineHeight: scale(18),
  },
  dateMonth: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flex: 1,
    marginRight: scale(8),
  },
  festivalName: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    marginBottom: scale(1),
  },
  festivalCategory: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.accent,
    marginBottom: scale(1),
  },
  festivalTithi: {
    fontSize: fs(9),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
  },
  countdownContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  countdownDays: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  calendarArrow: {
    fontSize: fs(28),
    color: colors.ring,
    fontFamily: fonts.PoppinsSemiBold,
  },
  calendarNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  navArrowButton: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllFestivalsScreen;
