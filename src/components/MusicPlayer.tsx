import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  RepeatIcon,
  ShuffleIcon,
} from '@components/icons/SvgIcons';
import { triggerHaptic } from '@helper/helper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import Video from 'react-native-video';
import imagePath from '@assets';

export interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  duration?: number; // in seconds
  currentTime?: number;
  onSeek?: (seconds: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  isLooping?: boolean;
  onToggleLoop: () => void;
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  showTimers?: boolean;
  audioUrl?: string;
}

const STATIC_BAR_HEIGHTS = [
  4, 8, 14, 8, 18, 22, 16, 10, 20, 24, 18, 12, 8, 14, 20, 22, 16, 10, 15, 20,
  14, 8, 12, 18, 22, 14, 8, 12, 18, 16, 10, 6, 15, 20, 16, 12, 8, 14, 18, 10,
];

const BAR_COUNT = 40;
const BAR_INDICES = Array.from({ length: BAR_COUNT }, (_, i) => i);
const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const formatTime = (secs: number) => {
  const s = Math.max(0, Math.floor(secs));
  const mins = Math.floor(s / 60);
  const remainder = s % 60;
  return `${mins.toString().padStart(2, '0')}:${remainder
    .toString()
    .padStart(2, '0')}`;
};

const WaveBar = React.memo(
  ({ index, isPlaying }: { index: number; isPlaying: boolean }) => {
    const staticHeight =
      STATIC_BAR_HEIGHTS[index % STATIC_BAR_HEIGHTS.length] || 6;
    const height = useSharedValue(staticHeight);

    useEffect(() => {
      if (isPlaying) {
        const peak1 = Math.max(6, 8 + ((index * 7) % 18));
        const peak2 = Math.max(4, 5 + (((index + 3) * 11) % 21));
        const dur1 = 280 + ((index * 31) % 180);
        const dur2 = 300 + (((index + 2) * 37) % 180);
        const delay = (index % 12) * 30;

        height.value = withDelay(
          delay,
          withRepeat(
            withSequence(
              withTiming(peak1, {
                duration: dur1,
                easing: Easing.inOut(Easing.quad),
              }),
              withTiming(peak2, {
                duration: dur2,
                easing: Easing.inOut(Easing.quad),
              }),
              withTiming(4, {
                duration: 260,
                easing: Easing.inOut(Easing.quad),
              }),
            ),
            -1,
            true,
          ),
        );
      } else {
        cancelAnimation(height);
        height.value = withTiming(staticHeight, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
      }
    }, [isPlaying, staticHeight, index]);

    const animatedStyle = useAnimatedStyle(() => ({
      height: height.value,
    }));

    return <Animated.View style={[styles.bar, animatedStyle]} />;
  },
);

const ControlButton = React.memo(
  ({
    onPress,
    isActive,
    children,
  }: {
    onPress?: () => void;
    isActive?: boolean;
    children: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.iconButton, isActive && styles.iconButtonActive]}
      onPress={() => {
        triggerHaptic();
        onPress?.();
      }}
      activeOpacity={0.7}
      hitSlop={HIT_SLOP}
    >
      {children}
    </TouchableOpacity>
  ),
);

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  duration = 240,
  onPrevious,
  onNext,
  isShuffle = false,
  onToggleShuffle,
  isLooping = false,
  onToggleLoop,
  title,
  subtitle,
  style,
  showTimers = true,
  audioUrl,
}) => {
  const videoRef = useRef<any>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);

  const formattedCurrent = useMemo(
    () => formatTime(currentProgress),
    [currentProgress],
  );
  const formattedDuration = useMemo(
    () => formatTime(totalDuration),
    [totalDuration],
  );

  const handleRewind15 = () => {
    triggerHaptic();
    const newTime = Math.max(0, currentProgress - 15);
    videoRef.current?.seek(newTime);
    setCurrentProgress(newTime);
    onPrevious?.();
  };

  const handleForward15 = () => {
    triggerHaptic();
    const newTime = Math.min(totalDuration, currentProgress + 15);
    videoRef.current?.seek(newTime);
    setCurrentProgress(newTime);
    onNext?.();
  };

  return (
    <View style={[styles.playerContainer, style]}>
      {/* Optional Track Info Header */}
      {(title || subtitle) && (
        <View style={styles.trackInfo}>
          {title ? (
            <Text style={styles.trackTitle} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text style={styles.trackSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      )}

      {/* Visual Equalizer Waveform & Live Timers */}
      <View style={styles.waveformWrapper}>
        <View style={styles.timeRow}>
          {showTimers && (
            <Text style={styles.timeText}>{formattedCurrent}</Text>
          )}
        </View>

        <View style={styles.container}>
          {BAR_INDICES.map(i => (
            <WaveBar key={i} index={i} isPlaying={isPlaying} />
          ))}
        </View>

        <View style={styles.timeRow}>
          {showTimers && (
            <Text style={styles.timeText}>{formattedDuration}</Text>
          )}
        </View>
      </View>

      <Video
        ref={videoRef}
        source={
          audioUrl
            ? {
                uri: audioUrl.startsWith('file://')
                  ? audioUrl
                  : `file://${audioUrl}`,
              }
            : imagePath.artiDemo
        }
        paused={!isPlaying}
        repeat={isLooping}
        onProgress={data => {
          setCurrentProgress(data.currentTime);
        }}
        onLoad={data => {
          if (data.duration && data.duration > 0) {
            setTotalDuration(data.duration);
          }
        }}
        onEnd={() => {
          if (!isLooping) {
            onTogglePlay();
            setCurrentProgress(0);
            videoRef.current?.seek(0);
          }
        }}
        style={styles.hiddenVideo}
        ignoreSilentSwitch="ignore"
        playInBackground={true}
        playWhenInactive={true}
      />

      {/* 5-Button Audio Controls Row: Shuffle | 15s Rewind | Play/Pause | 15s Forward | Repeat */}
      <View style={styles.controlsRow}>
        <ControlButton onPress={onToggleShuffle} isActive={isShuffle}>
          <ShuffleIcon
            size={scale(20)}
            color={isShuffle ? colors.ring : colors.secondary}
            strokeWidth={1.5}
          />
        </ControlButton>

        {/* 15s Rewind */}
        <ControlButton onPress={handleRewind15}>
          <Rewind15Icon
            size={scale(22)}
            color={colors.secondary}
            strokeWidth={1.5}
          />
        </ControlButton>

        {/* Hero Play / Pause Button */}
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={() => {
            triggerHaptic();
            onTogglePlay();
          }}
          activeOpacity={0.85}
        >
          <View style={styles.playPauseInner}>
            {isPlaying ? (
              <PauseIcon size={scale(22)} color={colors.white} />
            ) : (
              <View style={styles.playIconOffset}>
                <PlayIcon size={scale(22)} color={colors.white} />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* 15s Forward */}
        <ControlButton onPress={handleForward15}>
          <Forward15Icon
            size={scale(22)}
            color={colors.secondary}
            strokeWidth={1.5}
          />
        </ControlButton>

        {/* Repeat / Loop */}
        <ControlButton onPress={onToggleLoop} isActive={isLooping}>
          <RepeatIcon
            size={scale(20)}
            color={isLooping ? colors.ring : colors.secondary}
            strokeWidth={1.5}
          />
        </ControlButton>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  playerContainer: {
    paddingHorizontal: scale(20),
  },
  trackInfo: {
    alignItems: 'center',
  },
  trackTitle: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
  },
  trackSubtitle: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  waveformWrapper: {
    height: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(4),
  },
  timeRow: {
    width: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.neutralDisabled,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    marginTop: scale(4),
  },
  iconButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
  },
  playPauseButton: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  playPauseInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconOffset: {
    marginLeft: scale(3),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(28),
    backgroundColor: 'transparent',
    gap: scale(2),
    paddingHorizontal: scale(6),
  },
  bar: {
    width: scale(2.2),
    backgroundColor: colors.ring,
    borderRadius: scale(1.1),
  },
  hiddenVideo: {
    width: 0,
    height: 0,
    position: 'absolute',
    opacity: 0,
  },
});
