import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Skeleton from '@components/Skeleton';
import imagePath from '@assets/index';
import colors from '@theme/colors';
import { verticalScale } from '@theme/sizes';
import {
  getHomeScreenVideoConfig,
  subscribeHomeScreenVideoConfig,
} from '@services/remoteConfigService';
import {
  resolveFestivalVideoSource,
  selectActiveFestivalVideo,
} from '../../../utils/selectFestivalVideo';
import { FestivalVideoEntry } from '../../../types/festivalVideo';

interface HomeHeaderMediaProps {
  loading: boolean;
  onVideoLoad: () => void;
  onImageLoad: () => void;
  onVideoError: () => void;
  onFestivalActiveChange?: (festival: FestivalVideoEntry | null) => void;
}

export const HomeHeaderMedia: React.FC<HomeHeaderMediaProps> = ({
  loading,
  onVideoLoad,
  onImageLoad,
  onVideoError,
  onFestivalActiveChange,
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [videoError, setVideoError] = useState(false);
  const [isAppActive, setIsAppActive] = useState(
    AppState.currentState !== 'background',
  );
  const [isReady, setIsReady] = useState(false);
  const [activeFestival, setActiveFestival] =
    useState<FestivalVideoEntry | null>(() => {
      const config = getHomeScreenVideoConfig();
      return selectActiveFestivalVideo(config);
    });
  const [videoSource, setVideoSource] = useState(() => {
    const config = getHomeScreenVideoConfig();
    return resolveFestivalVideoSource(config);
  });
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);
  const videoRef = useRef<any>(null);

  // Sync video source dynamically whenever Remote Config is fetched or updated
  useEffect(() => {
    const unsubscribe = subscribeHomeScreenVideoConfig(config => {
      const active = selectActiveFestivalVideo(config);
      const source = resolveFestivalVideoSource(config);
      setActiveFestival(active);
      if (!active) {
        onFestivalActiveChange?.(null);
      }
      setVideoSource(source);
      setVideoError(false);
    });
    return unsubscribe;
  }, [onFestivalActiveChange]);

  // AppState check: Only allow video to mount/play when app is not in background
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        setIsAppActive(nextAppState !== 'background');
      },
    );

    return () => {
      subscription.remove();
      videoRef.current = null;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Screen transition cleanup: unmount video when screen is removed/left
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      videoRef.current = null;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // Initial delay (100ms) to ensure Android Activity is attached before ExoPlayer initializes
  useEffect(() => {
    if (isReady || videoError) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isAppActive) {
      timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isAppActive, isReady, videoError]);

  const handleVideoError = (e: any) => {
    const errorMsg =
      e?.error?.errorException || e?.error?.message || e?.errorString || '';

    console.log('[Video] Error loading video:', errorMsg || e);

    // If Activity is null (race condition during launch/transition), retry mounting after Activity attaches
    if (
      (typeof errorMsg === 'string' && errorMsg.includes('Activity is null')) ||
      e?.errorCode === '1001'
    ) {
      if (retryCountRef.current < 3) {
        retryCountRef.current += 1;
        console.log(
          `[Video] Activity not ready yet (attempt ${retryCountRef.current}/3), retrying in 300ms...`,
        );
        setIsReady(false);
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        retryTimeoutRef.current = setTimeout(() => {
          setIsReady(true);
        }, 300);
        return;
      }
    }

    // If remote festival video failed, fallback to local default video
    if (typeof videoSource === 'object' && videoSource?.uri) {
      console.log(
        '[Video] Remote video failed, falling back to local default video',
      );
      setVideoSource(imagePath.bhaktiVideo);
      setActiveFestival(null);
      onFestivalActiveChange?.(null);
      return;
    }

    setVideoError(true);
    setActiveFestival(null);
    onFestivalActiveChange?.(null);
    onVideoError();
  };

  // Keep Video mounted once initialized; pause/resume smoothly without reloading
  const shouldRenderVideo = isReady && !videoError;
  const videoKey =
    typeof videoSource === 'object' && videoSource?.uri
      ? videoSource.uri
      : String(videoSource);

  return (
    <View style={styles.imageContainer} pointerEvents="none">
      <Image
        source={imagePath.greeting}
        style={styles.greetingImage}
        resizeMode="cover"
        onLoad={onImageLoad}
      />

      {shouldRenderVideo && (
        <Video
          key={videoKey}
          ref={videoRef}
          source={videoSource}
          style={[styles.greetingImage, styles.absoluteVideo]}
          resizeMode="cover"
          repeat={true}
          muted={true}
          paused={!isFocused || !isAppActive}
          playInBackground={false}
          playWhenInactive={false}
          disableFocus={true}
          mixWithOthers="mix"
          ignoreSilentSwitch="ignore"
          shutterColor="transparent"
          preventsDisplaySleepDuringVideoPlayback={false}
          onLoad={() => {
            retryCountRef.current = 0;
            onVideoLoad();
            if (activeFestival) {
              onFestivalActiveChange?.(activeFestival);
            }
          }}
          onError={handleVideoError}
        />
      )}

      {loading && (
        <Skeleton
          width="100%"
          height={verticalScale(310)}
          baseColor={colors.foreground}
          highlightColor={colors.skeletonHighlight}
          style={styles.absoluteSkeleton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  greetingImage: {
    width: '100%',
    height: verticalScale(310),
    resizeMode: 'cover',
  },
  absoluteVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  absoluteSkeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(HomeHeaderMedia);
