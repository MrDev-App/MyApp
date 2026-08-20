import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Skeleton from '../../../components/Skeleton';
import { Translation } from '../../../i18n/language';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale, verticalScale } from '../../../utile/sizes';

interface HomeGreetingHeaderProps {
  loading: boolean;
}

export const HomeGreetingHeader: React.FC<HomeGreetingHeaderProps> = ({
  loading,
}) => {
  const { t } = useTranslation();

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
            <View style={styles.bellIconView}>
              <Text style={styles.bellIconText}>🔔︎</Text>
              <View style={styles.badgeView}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
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
  bellIconText: {
    fontSize: fs(15),
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
