import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Skeleton from '../../../components/Skeleton';
import { Translation } from '../../../i18n/language';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Bell } from '../../../assets';
import { NotificationStorage } from '../../../utile/notificationStorage';
import {
  getEkadashiMonthsData,
  EkadashiItem,
} from '../../../utile/ekadashiDataCache';

interface HomeGreetingHeaderProps {
  loading: boolean;
}

const SHORT_MONTHS = [
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
] as const;

/** Check if a date string (YYYY-MM-DD) is today */
const isToday = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const todayStr = new Date().toISOString().split('T')[0];
  return dateStr === todayStr;
};

/** Parse a date string (YYYY-MM-DD) into { day, month } for display */
const getFormattedDate = (dateStr?: string, dayNum?: number) => {
  if (dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return {
        day: parseInt(parts[2], 10),
        month: SHORT_MONTHS[parseInt(parts[1], 10) - 1] || '',
      };
    }
  }
  return { day: dayNum || '', month: '' };
};

const HomeGreetingHeader: React.FC<HomeGreetingHeaderProps> = ({
  loading: parentLoading,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [unreadCount, setUnreadCount] = useState(0);

  const [ekadashis, setEkadashis] = useState<EkadashiItem[]>([]);
  const [vratsLoading, setVratsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setUnreadCount(NotificationStorage.getUnreadCount());
    }, []),
  );

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentMonthVrats = async () => {
      try {
        const currentMonthNumber = new Date().getMonth() + 1;
        const monthsData = await getEkadashiMonthsData();

        let targetMonth = monthsData.find(m => m.month === currentMonthNumber);

        // Fallback to first available month if current month is not found
        if (!targetMonth?.ekadashis?.length) {
          targetMonth = monthsData[0];
        }

        if (isMounted && targetMonth) {
          setEkadashis(targetMonth.ekadashis || []);
        }
      } catch (error) {
        console.error(
          'Error loading month vrats in HomeGreetingHeader:',
          error,
        );
      } finally {
        if (isMounted) {
          setVratsLoading(false);
        }
      }
    };

    fetchCurrentMonthVrats();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePressBell = useCallback(() => {
    try {
      Vibration.vibrate(30);
    } catch {}
    navigation.navigate('Notification');
  }, [navigation]);

  const isLoading = vratsLoading || parentLoading;

  return (
    <View style={styles.mainView}>
      {/* Top Greeting & Notification Bar */}
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
              <Text style={styles.greetingTime}>
                {t(Translation.SHUBH_PRABHAT)}
              </Text>
              <Text style={styles.greetingText}>Radhe Radhe</Text>
            </View>
            <TouchableOpacity
              style={styles.bellIconView}
              onPress={handlePressBell}
              activeOpacity={0.7}
            >
              <Bell width={scale(18)} height={scale(18)} />
              {unreadCount > 0 && (
                <View style={styles.badgeView}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Section Title */}
      <View style={styles.vratsHeaderRow}>
        {isLoading ? (
          <Skeleton width={200} height={16} borderRadius={4} />
        ) : (
          <Text style={styles.sectionTitle}>This Month's Ekadash Vrats</Text>
        )}
      </View>

      {/* Ekadashi Vrats Cards */}
      {isLoading ? (
        <View style={styles.vratsVerticalContainer}>
          <Skeleton width="100%" height={scale(62)} borderRadius={scale(14)} />
          <Skeleton width="100%" height={scale(62)} borderRadius={scale(14)} />
        </View>
      ) : ekadashis.length > 0 ? (
        <View style={styles.vratsVerticalContainer}>
          {ekadashis.map((item, index) => {
            const { day, month } = getFormattedDate(item.date, item.day);
            const activeToday = isToday(item.date);

            return (
              <Animated.View
                key={item.id || item.date || index}
                entering={FadeInUp.delay(index * 100).duration(400)}
                style={[styles.vratCard, activeToday && styles.vratCardActive]}
              >
                {/* Left Date Block */}
                <View style={styles.dateBlock}>
                  <Text style={styles.dateDayText}>{day}</Text>
                  <Text style={styles.dateMonthText}>{month}</Text>
                </View>

                {/* Right Info Block */}
                <View style={styles.infoBlock}>
                  <View style={styles.topInfoRow}>
                    <Text
                      style={styles.vratName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    {activeToday && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>TODAY</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.detailsRow}>
                    <View style={styles.pakshaPill}>
                      <Text style={styles.pakshaText} numberOfLines={1}>
                        {item.paksha}
                      </Text>
                    </View>
                    <Text style={styles.dayOfWeekText}>• {item.dayOfWeek}</Text>
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No special vrats this month</Text>
        </View>
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
    fontSize: fs(10),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
    letterSpacing: 4,
  },
  greetingText: {
    fontSize: fs(26),
    fontFamily: fonts.PoppinsBold,
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
    fontSize: fs(15),
    fontFamily: fonts.PoppinsRegular,
    letterSpacing: 0.3,
  },
  vratsVerticalContainer: {
    gap: scale(10),
  },
  vratCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vratCardActive: {
    borderColor: colors.ring,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  dateBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(36),
  },
  dateDayText: {
    color: colors.ring,
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    lineHeight: fs(22),
  },
  dateMonthText: {
    color: colors.ring,
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsSemiBold,
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
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
  },
  todayBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(6),
    paddingVertical: scale(1.5),
    borderRadius: scale(6),
  },
  todayBadgeText: {
    color: colors.black,
    fontSize: fs(8),
    fontFamily: fonts.PoppinsBold,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(3),
  },
  pakshaPill: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(1.5),
    borderRadius: scale(6),
    backgroundColor: 'rgba(255, 255, 255, .50)',
  },
  pakshaText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsRegular,
  },
  dayOfWeekText: {
    color: colors.black,
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsRegular,
  },
  emptyContainer: {
    paddingVertical: scale(12),
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
  },
});

export default React.memo(HomeGreetingHeader);
