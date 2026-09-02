import React, { useRef, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '@components/GradientBackground';
import globalStyles from '@theme/globalStyles';
import { scale } from '@theme/sizes';
import colors from '@theme/colors';
import { OverlayModalHandle } from '@components/OverlayModal';

// Sub-components
import HomeHeaderMedia from './components/HomeHeaderMedia';
import HomeGreetingHeader from './components/HomeGreetingHeader';
import HomeSkeleton from './components/HomeSkeleton';
import JapCard from './components/JapCard';
import MantrasCard from './components/MantrasCard';
import ChallengeCard from './components/ChallengeCard';
import FeaturedCategories from './components/FeaturedCategories';
import FestivalHighlights from './components/FestivalHighlights';
import GradientOverlay from '@components/GradientOverlay';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef<OverlayModalHandle>(null);
  const buttonRef = useRef<View>(null);

  // Media load tracking refs to prevent race conditions
  const imageLoadedRef = useRef(false);
  const videoErrorRef = useRef(false);

  const handleVideoLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    imageLoadedRef.current = true;
    if (videoErrorRef.current) {
      setLoading(false);
    }
  }, []);

  const handleVideoError = useCallback(() => {
    videoErrorRef.current = true;
    if (imageLoadedRef.current) {
      setLoading(false);
    }
  }, []);

  const handleOpen = useCallback(() => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      overlayRef.current?.open({ x: x + width / 2, y: y + height / 2 });
    });
  }, []);

  return (
    <GradientBackground style={globalStyles.containerFull}>
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

      <SafeAreaView
        style={globalStyles.containerMargin20}
        edges={['top', 'bottom']}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
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
    paddingBottom: scale(16),
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
