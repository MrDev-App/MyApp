import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Video from 'react-native-video';
import Skeleton from '../../../components/Skeleton';
import GradientOverlay from '../../../components/GradientOverlay';
import imagePath from '../../../assets';
import colors from '../../../utile/colors';

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
  const [videoError, setVideoError] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {/* Fallback/Background image is always rendered underneath the video player */}
      <Image
        source={imagePath.greeting}
        style={styles.greetingImage}
        resizeMode="cover"
        onLoad={onImageLoad}
      />

      {!videoError && (
        <Video
          source={imagePath.bhaktiVideo}
          style={[styles.greetingImage, styles.absoluteVideo]}
          resizeMode="cover"
          repeat={true}
          muted={true}
          paused={false}
          disableFocus={true}
          mixWithOthers="mix"
          ignoreSilentSwitch="ignore"
          selectedAudioTrack={{ type: 'disabled' as any }}
          onLoad={onVideoLoad}
          onError={e => {
            console.log(
              '[Video] Error loading background video, falling back to image:',
              e,
            );
            setVideoError(true);
            onVideoError();
          }}
        />
      )}

      {loading && (
        <Skeleton
          width="100%"
          height={310}
          baseColor={colors.foreground}
          highlightColor="rgba(255, 255, 255, 0.45)"
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
    height: 310,
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
