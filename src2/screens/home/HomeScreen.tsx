import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientBackground from '../../components/GradientBackground';
import GradientOverlay from '../../components/GradientOverlay';
import Globalstyles from '../../utile/GlobalStyle';
import { Translation } from '../../i18n/language';
import imagePath from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fs, scale } from '../../utile/sizes';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import PanchangCard from './component/PanchangCard';
import FestivalHighlights from './component/FestivalHighlights';
import MantrasCard from './component/MantrasCard';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <GradientBackground style={Globalstyles.containerFull}>
      <View style={styles.imageContainer}>
        <Image source={imagePath.greeting} style={styles.greetingImage} />
        <GradientOverlay
          colors={['rgba(255, 254, 254, 0)', colors.primary]}
          direction="bottom-to-top"
        />
      </View>
      <SafeAreaView style={Globalstyles.containerMargin20}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainView}>
            <View style={styles.greetingMainView}>
              <View>
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
            </View>
            <Text style={styles.dailyPravacnaText}>
              {t(Translation.DAILY_PRAVACHAN)}
            </Text>
          </View>

          <PanchangCard />
          <FestivalHighlights />
          <MantrasCard />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainView: {
    marginBottom: 150,
  },
  imageContainer: {
    width: '100%',
    position: 'absolute',
  },
  greetingMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bellIconView: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ring,
    // backgroundColor: colors.cardForeground,
  },
  bellIconText: {
    fontSize: fs(16),
    borderColor: colors.ring,
  },
  badgeView: {
    position: 'absolute',
    top: scale(-2),
    right: scale(-2),
    width: scale(16),
    height: scale(16),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: fs(10),
  },
  greetingImage: {
    width: '100%',
    height: 310,
    resizeMode: 'cover',
  },
  greetingTime: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    letterSpacing: 4,
  },
  greetingText: {
    fontSize: fs(26),
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
    letterSpacing: 1,
  },
  dailyPravacnaText: {
    fontSize: fs(12),
    fontFamily: fonts.Marcellus,
    color: colors.accent,
    letterSpacing: 2,
  },
  DailyPravachanView: {
    marginTop: 200,
    borderWidth: 1,
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: scale(40),
  },
});
