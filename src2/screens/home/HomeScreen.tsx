import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import GradientBackground from '../../components/GradientBackground';
import GradientOverlay from '../../components/GradientOverlay';
import Globalstyles from '../../utile/GlobalStyle';
import { Translation } from '../../i18n/language';
import imagePath from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fs, scale } from '../../utile/sizes';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import FestivalHighlights from './component/FestivalHighlights';
import MantrasCard from './component/MantrasCard';
import FeaturedCategories from './component/FeaturedCategories';
import JapCard from './component/JapCard';
import { OverlayModalHandle } from '../../components/OverlayModal';

const HomeScreen = () => {
  const { t } = useTranslation();
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const overlayRef = useRef<OverlayModalHandle>(null);
  const buttonRef = useRef<View>(null);

  const handleOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      overlayRef.current?.open({ x: x + width / 2, y: y + height / 2 });
    });
  };

  return (
    <GradientBackground style={Globalstyles.containerFull}>
      <View style={styles.imageContainer}>
        {(!videoLoaded || videoError) && (
          <Image
            source={imagePath.greeting}
            style={styles.greetingImage}
            resizeMode="cover"
          />
        )}

        {!videoError && (
          <Video
            source={imagePath.bhaktiVideo}
            style={[styles.greetingImage, !videoLoaded && styles.videoHidden]}
            resizeMode="cover"
            repeat={true}
            muted={true}
            paused={false}
            onLoad={() => setVideoLoaded(true)}
            onError={e => {
              console.log(
                '[Video] Error loading background video, falling back to image:',
                e,
              );
              setVideoError(true);
            }}
          />
        )}

        <GradientOverlay
          colors={[colors.gradientStart, colors.primary]}
          direction="top-to-bottom"
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
          </View>

          <JapCard />
          <MantrasCard />
          <FeaturedCategories />
          <FestivalHighlights onPress={handleOpen} />
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
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ring,
    // backgroundColor: colors.cardForeground,
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
  greetingImage: {
    width: '100%',
    height: 310,
    resizeMode: 'cover',
  },
  videoHidden: {
    position: 'absolute',
    opacity: 0,
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
    paddingBottom: scale(70),
  },
});
