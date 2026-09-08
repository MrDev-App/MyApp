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

interface HomeHeaderMediaProps {
  loading: boolean;
  onVideoLoad: () => void;
  onImageLoad: () => void;
  onVideoError: () => void;
}

export const HomeHeaderMedia: React.FC<HomeHeaderMediaProps> = ({
  loading,
  onVideoLoad,
  onImageLoad,
  onVideoError,
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [videoError, setVideoError] = useState(false);
  const [isAppActive, setIsAppActive] = useState(
    AppState.currentState !== 'background',
  );
  const [isReady, setIsReady] = useState(false);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);
  const videoRef = useRef<any>(null);

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

    console.log(
      '[Video] Error loading background video, falling back to image:',
      e,
    );
    setVideoError(true);
    onVideoError();
  };

  // Keep Video mounted once initialized; pause/resume smoothly without reloading
  const shouldRenderVideo = isReady && !videoError;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={imagePath.greeting}
        style={styles.greetingImage}
        resizeMode="cover"
        onLoad={onImageLoad}
      />

      {shouldRenderVideo && (
        <Video
          ref={videoRef}
          source={imagePath.bhaktiVideo}
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
          selectedAudioTrack={{ type: 'disabled' as any }}
          onLoad={() => {
            retryCountRef.current = 0;
            onVideoLoad();
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
