import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import HapticFeedback from 'react-native-haptic-feedback';
import Skeleton from '../../../components/Skeleton';
import { Translation } from '../../../i18n/language';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale, verticalScale } from '../../../utile/sizes';
import { Bell } from '../../../assets';
import { NotificationStorage } from '../../../utile/notificationStorage';

interface HomeGreetingHeaderProps {
  loading: boolean;
}

export const HomeGreetingHeader: React.FC<HomeGreetingHeaderProps> = ({
  loading,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [unreadCount, setUnreadCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const count = NotificationStorage.getUnreadCount();
      setUnreadCount(count);
    }, []),
  );

  const handlePressBell = () => {
    if (Platform.OS === 'android') {
      try {
        Vibration.vibrate(30);
      } catch {}
    } else {
      try {
        HapticFeedback.trigger('selection', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: true,
        });
      } catch {
        Vibration.vibrate(30);
      }
    }
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.greetingMainView}>
        {loading ? (
          <>
            <View style={styles.greetingSkeletonContainer}>
              <Skeleton width={100} height={12} borderRadius={3} />
              <Skeleton width={180} height={28} borderRadius={6} />
            </View>
            <Skeleton circle width={36} height={36} />
          </>
        ) : (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.greetingTime}>
                {t(Translation.SHUBH_PRABHAT)}
              </Text>
              <Text style={styles.greetingText}>
                {t(Translation.RADHE_RADHE)}
              </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginBottom: verticalScale(150),
  },
  greetingMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  greetingSkeletonContainer: {
    gap: scale(6),
  },
  greetingTime: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    letterSpacing: 4,
  },
  greetingText: {
    fontSize: fs(26),
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    letterSpacing: 1,
  },
  bellIconView: {
    width: scale(36),
    height: scale(36),
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
});

export default React.memo(HomeGreetingHeader);
