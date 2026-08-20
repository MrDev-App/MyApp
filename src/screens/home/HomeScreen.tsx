import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import Globalstyles from '../../utile/GlobalStyle';
import { scale } from '../../utile/sizes';
import { OverlayModalHandle } from '../../components/OverlayModal';

// Sub-components
import HomeHeaderMedia from './component/HomeHeaderMedia';
import HomeGreetingHeader from './component/HomeGreetingHeader';
import HomeSkeleton from './component/HomeSkeleton';
import JapCard from './component/JapCard';
import MantrasCard from './component/MantrasCard';
import ChallengeCard from './component/ChallengeCard';
import FeaturedCategories from './component/FeaturedCategories';
import FestivalHighlights from './component/FestivalHighlights';
import GradientOverlay from '../../components/GradientOverlay';
import colors from '../../utile/colors';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef<OverlayModalHandle>(null);
  const buttonRef = useRef<View>(null);

  // Media load tracking refs to prevent race conditions
  const imageLoadedRef = useRef(false);
  const videoErrorRef = useRef(false);

  const handleVideoLoad = () => {
    // Video loaded successfully, we can safely hide the shimmer
    setLoading(false);
  };

  const handleImageLoad = () => {
    imageLoadedRef.current = true;
    // If video has already failed, switch to loaded view instantly
    if (videoErrorRef.current) {
      setLoading(false);
    }
  };

  const handleVideoError = () => {
    videoErrorRef.current = true;
    // If fallback image has already loaded, switch to loaded view
    if (imageLoadedRef.current) {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      overlayRef.current?.open({ x: x + width / 2, y: y + height / 2 });
    });
  };

  return (
    <GradientBackground style={Globalstyles.containerFull}>
      {/* Background Header Image, Video, and Shimmer Overlay */}
      <HomeHeaderMedia
        loading={loading}
        onVideoLoad={handleVideoLoad}
        onImageLoad={handleImageLoad}
        onVideoError={handleVideoError}
      />

      {/* Top status bar gradient overlay */}
      <GradientOverlay
        colors={[
          colors.gradientStart,
          colors.primary,
          colors.primary,

          'transparent',
        ]}
        direction="bottom-to-top"
        style={styles.topGradient}
      />

      <SafeAreaView style={Globalstyles.containerMargin20}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Greeting Banner */}
          <HomeGreetingHeader loading={loading} />

          {/* Loading Skeleton OR Cards List */}
          {loading ? (
            <HomeSkeleton />
          ) : (
            <>
              <JapCard />
              <MantrasCard />
              <ChallengeCard />
              <FeaturedCategories />
              <FestivalHighlights onPress={handleOpen} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: scale(70),
  },
  topGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 900,
  },
  bottomGradient: {
    top: 230,
    left: 0,
    right: 0,
    height: 80,
  },
});

export default HomeScreen;
