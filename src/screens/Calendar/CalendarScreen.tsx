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
import { useAppLanguage } from '@hooks';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import GradientBackground from '@components/GradientBackground';
import {
  getFestivalData,
  getLocalFestivalsFallback,
  Festival,
} from '@services/festivalService';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Back } from '@assets/index';
import AnimatedButton from '@components/AnimatedButton';
import imagePath from '@assets/index';
import FestivalModal from '@components/FestivalModal';
import {
  getMonthName,
  monthsHi,
  weekdaysHi,
  dayNamesHi,
  monthsEn,
  weekdaysEn,
  dayNamesEn,
} from '@constants/calendarData';

LocaleConfig.locales.hi = {
  monthNames: monthsHi,
  monthNamesShort: monthsHi,
  dayNames: dayNamesHi,
  dayNamesShort: weekdaysHi,
  today: 'आज',
};

LocaleConfig.locales.en = {
  monthNames: monthsEn,
  monthNamesShort: monthsEn,
  dayNames: dayNamesEn,
  dayNamesShort: weekdaysEn,
  today: 'Today',
};

const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { currentLanguage } = useAppLanguage();

  // Synchronously update the calendar locale configuration during the render phase
  LocaleConfig.defaultLocale = currentLanguage;

  // Initialize immediately with local CALENDAR_2026 data so cards are visible with 0ms delay
  const [festivals, setFestivals] = React.useState<Festival[]>(() =>
    getLocalFestivalsFallback(),
  );
  const [_loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const fetchFestivals = async () => {
      try {
        const data = await getFestivalData();
        if (isMounted && data.length > 0) {
          setFestivals(data);
        }
      } catch (error) {
        console.error('Error fetching festivals in CalendarScreen:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFestivals();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const currentYearNum = React.useMemo(() => {
    const parts = currentMonthDate.split('-');
    return parseInt(parts[0], 10) || 2026;
  }, [currentMonthDate]);

  const currentMonthNum = React.useMemo(() => {
    const parts = currentMonthDate.split('-');
    return parseInt(parts[1], 10) || 1;
  }, [currentMonthDate]);

  const currentMonthName = React.useMemo(() => {
    return (
      getMonthName(currentMonthNum, currentLanguage) + '  ' + currentYearNum
    );
  }, [currentMonthNum, currentYearNum, currentLanguage]);

  const monthOnlyName = React.useMemo(() => {
    return currentLanguage === 'hi'
      ? monthsHi[currentMonthNum - 1] || 'महीने'
      : monthsEn[currentMonthNum - 1] || 'Month';
  }, [currentMonthNum, currentLanguage]);

  // Festivals for the active month sorted by day
  const monthFestivals = React.useMemo(() => {
    return festivals
      .filter(f => f.month === currentMonthNum)
      .sort((a, b) => a.day - b.day);
  }, [festivals, currentMonthNum]);

  // Festivals on the specifically selected day (if any)
  const selectedDayFestivals = React.useMemo(() => {
    if (!selectedDate) return [];
    const parts = selectedDate.split('-');
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    if (m !== currentMonthNum) return [];
    return monthFestivals.filter(f => f.day === d);
  }, [selectedDate, currentMonthNum, monthFestivals]);

  // Compute marked dates for the calendar
  const calendarMarkedDates = React.useMemo(() => {
    const marks: { [date: string]: any } = {};

    festivals.forEach(fest => {
      const mm = String(fest.month).padStart(2, '0');
      const dd = String(fest.day).padStart(2, '0');
      const dateString = `${currentYearNum}-${mm}-${dd}`;

      marks[dateString] = {
        marked: true,
        dotColor: colors.ring,
      };
    });

    if (selectedDate) {
      marks[selectedDate] = {
        ...(marks[selectedDate] || {}),
        selected: true,
        selectedColor: colors.ring,
        selectedTextColor: colors.white,
      };
    }

    return marks;
  }, [festivals, selectedDate, currentYearNum]);

  const renderFestivalCard = (item: Festival) => {
    const name = currentLanguage === 'hi' ? item.hindiName : item.englishName;
    const dateStr = currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;
    const tithi =
      currentLanguage === 'hi'
        ? item.tithiHi || item.tithi
        : item.tithi || item.tithiHi;
    const category =
      currentLanguage === 'hi'
        ? item.categoryHi || item.category
        : item.category || item.categoryHi;

    return (
      <View key={item.id} style={styles.festivalCardWrapper}>
        <AnimatedButton
          style={styles.festivalCardContainer}
          activeOpacity={0.85}
          onPress={() => setDetailFestival(item)}
        >
          <ImageBackground
            source={item.image || imagePath.greeting}
            style={styles.cardBgImage}
            imageStyle={styles.cardBgImageStyle}
            fadeDuration={0}
          >
            <View style={styles.cardTintOverlay} pointerEvents="none">
              {/* Top Row: Date capsule & Category Badge */}
              <View style={styles.cardTopRow}>
                <View style={styles.dateCapsule}>
                  <Text style={styles.dateCapsuleText}>{dateStr}</Text>
                </View>
                {category ? (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText} numberOfLines={1}>
                      {category}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Bottom Row: Festival Name & Sub-details */}
              <View style={styles.cardBottomRow}>
                <Text style={styles.cardFestivalName} numberOfLines={1}>
                  {name}
                </Text>
                {tithi ? (
                  <View style={styles.tithiRow}>
                    <Image
                      source={imagePath.lotus}
                      style={styles.sakuraIcon}
                    />
                    <Text style={styles.cardFestivalTithi} numberOfLines={1}>
                      {tithi}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </ImageBackground>
        </AnimatedButton>
      </View>
    );
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Premium Header: Back button on far-left */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentMonthName}</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
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

          {/* Selected Date Festival(s) if user tapped a date with festival */}
          {selectedDayFestivals.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>
                  {currentLanguage === 'hi'
                    ? `चयनित तिथि के विशेष पर्व (${selectedDayFestivals.length})`
                    : `Selected Date Festivals (${selectedDayFestivals.length})`}
                </Text>
              </View>
              {selectedDayFestivals.map(renderFestivalCard)}
            </View>
          )}

          {/* Month's Full Festivals Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {currentLanguage === 'hi'
                  ? `${monthOnlyName} के समस्त त्यौहार (${monthFestivals.length})`
                  : `All Festivals in ${monthOnlyName} (${monthFestivals.length})`}
              </Text>
            </View>
            {monthFestivals.length === 0 ? (
              <Text style={styles.noDataText}>
                {currentLanguage === 'hi'
                  ? 'इस महीने कोई त्योहार नहीं है'
                  : 'No festivals this month'}
              </Text>
            ) : (
              monthFestivals.map(renderFestivalCard)
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
    fontFamily: fonts.TiroHindiRegular,
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
    fontFamily: fonts.TiroHindiRegular,
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
    backgroundColor: colors.overlayModalBackdrop,
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
    fontFamily: fonts.TiroHindiRegular,
  },

  infoIconText: {
    color: colors.white,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
  },
  cardBottomRow: {
    gap: scale(2),
  },
  cardFestivalName: {
    color: colors.white,
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
  },
  cardFestivalTithi: {
    color: colors.textWhiteMuted,
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
  },
  noDataText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
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
  festivalCardWrapper: {
    marginBottom: scale(12),
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(10),
    maxWidth: '55%',
  },
  categoryBadgeText: {
    color: colors.white,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
});

export default CalendarScreen;
