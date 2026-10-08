import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import GradientBackground from '@components/GradientBackground';
import globalStyles from '@theme/globalStyles';
import { scale } from '@theme/sizes';
import colors from '@theme/colors';

// Sub-components
import HomeHeaderMedia from './components/HomeHeaderMedia';
import HomeGreetingHeader from './components/HomeGreetingHeader';
import HomeSkeleton from './components/HomeSkeleton';
import JapCard from './components/JapCard';
import MantrasCard from './components/MantrasCard';
import ChallengeCard from './components/ChallengeCard';
import FeaturedCategories from './components/FeaturedCategories';
import FestivalHighlights from './components/FestivalHighlights';
import HinduCalendarBanner from './components/HinduCalendarBanner';
import GradientOverlay from '@components/GradientOverlay';
import { BannerAdComponent } from '@admob';
import { FestivalVideoEntry } from '../../types/festivalVideo';
import { Festival } from '@api/festivalApi';
import {
  getHomeScreenFestivals,
  getCachedFestivalData,
} from '@api/festivalApi';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [activeFestival, setActiveFestival] =
    useState<FestivalVideoEntry | null>(null);

  // H1: Lift festival state here — eliminates duplicate API calls from children
  const [festivals, setFestivals] = useState<Festival[]>(
    () => getCachedFestivalData() || [],
  );

  const imageLoadedRef = useRef(false);
  const videoErrorRef = useRef(false);

  // Safety fallback: ensure screen is visible quickly even if video decoder buffers or lags
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // H1: Single festival fetch, result shared with HomeGreetingHeader & FestivalHighlights
  useEffect(() => {
    getHomeScreenFestivals(10)
      .then(data => {
        if (data && data.length > 0) {
          setFestivals(data);
        }
      })
      .catch(() => {
        // silent fail — cached data already shown
      });
  }, []);

  const handleVideoLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    imageLoadedRef.current = true;
    setLoading(false);
  }, []);

  const handleVideoError = useCallback(() => {
    videoErrorRef.current = true;
    setLoading(false);
  }, []);

  return (
    <GradientBackground style={globalStyles.containerFull}>
      {/* Background Header Image, Video, and Shimmer Overlay */}
      <HomeHeaderMedia
        loading={loading}
        onVideoLoad={handleVideoLoad}
        onImageLoad={handleImageLoad}
        onVideoError={handleVideoError}
        onFestivalActiveChange={setActiveFestival}
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

      <SafeAreaView style={globalStyles.containerMargin20} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(80) },
          ]}
        >
          {/* Greeting Banner */}
          <HomeGreetingHeader
            loading={loading}
            activeFestival={activeFestival}
            festivals={festivals}
          />

          {/* Loading Skeleton OR Cards List */}
          {loading ? (
            <HomeSkeleton />
          ) : (
            <>
              <JapCard />
              <MantrasCard />
              <HinduCalendarBanner />
              <ChallengeCard />
              <BannerAdComponent unitId="ca-app-pub-7403088686757883/4289481752" />
              <FeaturedCategories />
              <FestivalHighlights festivals={festivals} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    // M7: paddingBottom removed — handled dynamically via insets above
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
