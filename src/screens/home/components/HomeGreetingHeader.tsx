import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import Skeleton from '@components/Skeleton';
import { Translation } from '@i18n/language';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Bell } from '@assets/index';
import { NotificationStorage } from '@services/notificationService';
import {
  getFestivalData,
  getCachedFestivalData,
  Festival,
} from '@services/firebaseServices/getFestivalData';
import { getMonthShortName } from '@constants/calendarData';
import { FestivalVideoEntry } from '../../../types/festivalVideo';

interface HomeGreetingHeaderProps {
  loading: boolean;
  activeFestival?: FestivalVideoEntry | null;
}

interface EkadashiDisplayItem {
  id: string;
  name: string;
  nameHi: string;
  date: string;
  day: number;
  month: number;
  shortMonth: string;
  shortMonthHi: string;
  dayOfWeek: string;
  dayOfWeekHi: string;
  paksha: string;
  pakshaHi: string;
}

const isToday = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const todayStr = new Date().toISOString().split('T')[0];
  return dateStr === todayStr;
};

const HomeGreetingHeader: React.FC<HomeGreetingHeaderProps> = ({
  loading: parentLoading,
  activeFestival = null,
}) => {
  const { t, isHindi: isHi } = useAppLanguage();
  const navigation = useNavigation<any>();
  const [unreadCount, setUnreadCount] = useState(0);

  const [festivals, setFestivals] = useState<Festival[]>(() => {
    return getCachedFestivalData() || [];
  });
  const [festivalsLoading, setFestivalsLoading] = useState<boolean>(
    festivals.length === 0,
  );

  useEffect(() => {
    getFestivalData()
      .then(data => {
        if (data && data.length > 0) {
          setFestivals(data);
        }
        setFestivalsLoading(false);
      })
      .catch(() => {
        setFestivalsLoading(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setUnreadCount(NotificationStorage.getUnreadCount());
    }, []),
  );

  const ekadashis: EkadashiDisplayItem[] = React.useMemo(() => {
    const currentMonthNumber = new Date().getMonth() + 1;
    const allEkadashis = (festivals || []).filter(
      (f: Festival) =>
        f.id.toLowerCase().includes('ekadashi') ||
        f.englishName.toLowerCase().includes('ekadashi') ||
        (f.category || '').toLowerCase().includes('ekadashi'),
    );

    let thisMonth = allEkadashis.filter(
      (f: Festival) => f.month === currentMonthNumber,
    );
    if (thisMonth.length === 0 && allEkadashis.length > 0) {
      thisMonth = allEkadashis.slice(0, 2);
    }

    return thisMonth.map(
      (f: Festival): EkadashiDisplayItem => ({
        id: f.id,
        name: f.englishName || f.name,
        nameHi: f.hindiName || f.nameHi || f.name,
        date: f.date,
        day: f.day,
        month: f.month,
        shortMonth: getMonthShortName(f.month, 'en'),
        shortMonthHi: getMonthShortName(f.month, 'hi'),
        dayOfWeek: f.dayOfWeek,
        dayOfWeekHi: f.dayOfWeekHi || f.dayOfWeek,
        paksha: f.tithi || 'Ekadashi',
        pakshaHi: f.tithiHi || 'एकादशी',
      }),
    );
  }, [festivals]);

  const handlePressBell = useCallback(() => {
    navigation.navigate('Notification');
  }, [navigation]);

  const isLoading =
    (festivalsLoading && ekadashis.length === 0) || parentLoading;

  return (
    <View style={styles.mainView}>
      <View style={styles.greetingMainView}>
        {parentLoading ? (
          <>
            <View style={styles.greetingSkeletonContainer}>
              <Skeleton width={100} height={12} borderRadius={3} />
              <Skeleton width={180} height={28} borderRadius={6} />
            </View>
            <Skeleton circle width={36} height={36} />
          </>
        ) : (
          <>
            <View>
              {!activeFestival?.wishText && (
                <Text style={styles.greetingTime}>
                  {t(Translation.SHUBH_PRABHAT)}
                </Text>
              )}

              <Text style={styles.greetingText}>
                {activeFestival?.wishText || t(Translation.RADHE_RADHE)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bellIconView}
              onPress={handlePressBell}
              activeOpacity={0.7}
              delayPressIn={0}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Bell width={scale(18)} height={scale(18)} />
              {unreadCount > 0 && (
                <View style={styles.badgeView} pointerEvents="none">
                  <Text style={styles.badgeText}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.vratsHeaderRow}>
        {isLoading ? (
          <Skeleton width={200} height={16} borderRadius={4} />
        ) : (
          <Text style={styles.sectionTitle}>
            {t(Translation.EKADASHI_VRAT)}
          </Text>
        )}
      </View>

      {isLoading ? (
        <View style={styles.vratsVerticalContainer}>
          <Skeleton width="100%" height={scale(62)} borderRadius={scale(14)} />
          <Skeleton width="100%" height={scale(62)} borderRadius={scale(14)} />
        </View>
      ) : (
        ekadashis.length > 0 && (
          <View style={styles.vratsVerticalContainer}>
            {ekadashis.map((item, index) => {
              const activeToday = isToday(item.date);
              const displayName = isHi ? item.nameHi : item.name;
              const displayPaksha = isHi ? item.pakshaHi : item.paksha;
              const displayDayOfWeek = isHi ? item.dayOfWeekHi : item.dayOfWeek;
              const displayMonth = isHi
                ? item.shortMonthHi || item.shortMonth
                : item.shortMonth;

              return (
                <Animated.View
                  key={item.id || item.date || index}
                  entering={FadeInUp.delay(index * 100).duration(400)}
                  style={[
                    styles.vratCard,
                    activeToday && styles.vratCardActive,
                  ]}
                >
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateDayText}>{item.day}</Text>
                    <Text style={styles.dateMonthText}>{displayMonth}</Text>
                  </View>

                  <View style={styles.infoBlock}>
                    <View style={styles.topInfoRow}>
                      <Text
                        style={styles.vratName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {displayName}
                      </Text>
                      {activeToday && (
                        <View style={styles.todayBadge}>
                          <Text style={styles.todayBadgeText}>
                            {t(Translation.TODAY)}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.detailsRow}>
                      <View style={styles.pakshaPill}>
                        <Text style={styles.pakshaText} numberOfLines={1}>
                          {displayPaksha}
                        </Text>
                      </View>
                      <Text style={styles.dayOfWeekText}>
                        • {displayDayOfWeek}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginBottom: scale(20),
  },
  greetingMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingSkeletonContainer: {
    gap: scale(6),
  },
  greetingTime: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    letterSpacing: 4,
  },
  greetingText: {
    fontSize: fs(24),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.primary2,
    letterSpacing: 1,
  },
  bellIconView: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ring,
  },
  badgeView: {
    position: 'absolute',
    top: scale(-1),
    right: scale(-1),
    width: scale(15),
    height: scale(15),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: fs(10),
  },
  vratsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  sectionTitle: {
    color: colors.black,
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    letterSpacing: 0.3,
  },
  vratsVerticalContainer: {
    gap: scale(10),
  },
  vratCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    gap: scale(10),
  },
  vratCardActive: {
    borderColor: colors.ring,
    backgroundColor: colors.goldHighlightBg,
  },
  dateBlock: {
    marginTop: scale(7),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(34),
    borderRadius: scale(6),
    backgroundColor: colors.overlayWhite50,
  },
  dateDayText: {
    color: colors.black,
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    // lineHeight: fs(22),
  },
  dateMonthText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  topInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(4),
  },
  vratName: {
    flex: 1,
    color: colors.black,
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
  },
  todayBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(6),
    paddingVertical: scale(1),
    borderRadius: scale(6),
  },
  todayBadgeText: {
    color: colors.black,
    fontSize: fs(8),
    fontFamily: fonts.TiroHindiRegular,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginTop: scale(3),
  },
  pakshaPill: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(1),
    borderRadius: scale(3),
    backgroundColor: colors.overlayWhite50,
  },
  pakshaText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  dayOfWeekText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
  },
  emptyContainer: {
    paddingVertical: scale(12),
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textWhite70,
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
  },
});

export default React.memo(HomeGreetingHeader);
