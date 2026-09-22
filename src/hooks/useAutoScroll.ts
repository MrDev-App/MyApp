import { useRef, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  withDecay,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

export interface UseAutoScrollOptions {
  contentWidth: number;
  containerWidth: number;
  speed?: number; // Pixels per second (default 32)
  pauseAtEnds?: number; // Milliseconds to pause at ends (default 1500)
  resumeDelayMs?: number; // Milliseconds to wait before resuming after drag (default 1500)
  isExternalPaused?: boolean;
}

export const useAutoScroll = ({
  contentWidth,
  containerWidth,
  speed = 32,
  pauseAtEnds = 1500,
  resumeDelayMs = 1500,
  isExternalPaused = false,
}: UseAutoScrollOptions) => {
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(isFocused);
  isFocusedRef.current = isFocused;

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shared values on the UI thread
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const direction = useSharedValue<1 | -1>(1); // 1 = forward (decreasing translateX), -1 = backward (increasing translateX)
  const edgePauseUntil = useSharedValue(0);
  const maxScroll = useSharedValue(0);
  const speedShared = useSharedValue(speed);
  const pauseAtEndsShared = useSharedValue(pauseAtEnds);
  const isPaused = useSharedValue(false);
  const isDragging = useSharedValue(false);
  const isDecaying = useSharedValue(false);
  const isExternalPausedShared = useSharedValue(isExternalPaused);

  // Sync props to shared values
  const maxScrollCalculated = Math.max(0, contentWidth - containerWidth);
  useEffect(() => {
    maxScroll.value = maxScrollCalculated;
  }, [maxScrollCalculated, maxScroll]);

  useEffect(() => {
    speedShared.value = speed;
  }, [speed, speedShared]);

  useEffect(() => {
    pauseAtEndsShared.value = pauseAtEnds;
  }, [pauseAtEnds, pauseAtEndsShared]);

  useEffect(() => {
    isExternalPausedShared.value = isExternalPaused;
  }, [isExternalPaused, isExternalPausedShared]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const restartAutoScrollAfterDelay = useCallback(
    (delayMs = resumeDelayMs) => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }

      resumeTimerRef.current = setTimeout(() => {
        if (
          isFocusedRef.current &&
          !isExternalPausedShared.value &&
          maxScroll.value > 0
        ) {
          isPaused.value = false;
          isDragging.value = false;
          isDecaying.value = false;
        }
      }, delayMs);
    },
    [
      isDecaying,
      isDragging,
      isExternalPausedShared,
      isPaused,
      maxScroll,
      resumeDelayMs,
    ],
  );

  // Frame callback for continuous auto-scrolling
  useFrameCallback(frameInfo => {
    'worklet';
    if (
      isExternalPausedShared.value ||
      isPaused.value ||
      isDragging.value ||
      isDecaying.value ||
      maxScroll.value <= 0
    ) {
      return;
    }

    const dtMs = frameInfo.timeSincePreviousFrame;
    if (dtMs === null || dtMs === undefined || dtMs <= 0) {
      return;
    }

    const delta = Math.min(dtMs / 1000, 0.1);
    const currentTime = frameInfo.timestamp;

    // Handle edge pause
    if (edgePauseUntil.value > 0) {
      if (currentTime < edgePauseUntil.value) {
        return;
      }
      edgePauseUntil.value = 0;
    }

    const max = maxScroll.value;
    let next = translateX.value - direction.value * speedShared.value * delta;

    if (next <= -max) {
      next = -max;
      translateX.value = -max;
      direction.value = -1; // reverse towards 0
      if (pauseAtEndsShared.value > 0) {
        edgePauseUntil.value = currentTime + pauseAtEndsShared.value;
      }
    } else if (next >= 0) {
      next = 0;
      translateX.value = 0;
      direction.value = 1; // reverse towards -max
      if (pauseAtEndsShared.value > 0) {
        edgePauseUntil.value = currentTime + pauseAtEndsShared.value;
      }
    } else {
      translateX.value = next;
    }
  });

  // Pan gesture for finger dragging with native momentum physics
  const panGesture = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-12, 12])
    .onBegin(() => {
      'worklet';
      isDragging.value = true;
      isDecaying.value = false;
      cancelAnimation(translateX);
      startX.value = translateX.value;
    })
    .onUpdate(e => {
      'worklet';
      const max = maxScroll.value;
      let newX = startX.value + e.translationX;
      if (newX > 0) {
        newX = newX * 0.25;
      } else if (newX < -max) {
        newX = -max + (newX - -max) * 0.25;
      }
      translateX.value = newX;
    })
    .onEnd(e => {
      'worklet';
      isDragging.value = false;
      const max = maxScroll.value;

      isDecaying.value = true;
      translateX.value = withDecay(
        {
          velocity: e.velocityX,
          clamp: [-max, 0],
          rubberBandEffect: true,
        },
        finished => {
          'worklet';
          if (finished) {
            isDecaying.value = false;
            if (e.velocityX < -50) {
              direction.value = 1;
            } else if (e.velocityX > 50) {
              direction.value = -1;
            }
            runOnJS(restartAutoScrollAfterDelay)(resumeDelayMs);
          }
        },
      );
    });

  // Focus management
  useEffect(() => {
    if (!isFocused) {
      isPaused.value = true;
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    } else if (!isExternalPaused && maxScroll.value > 0) {
      restartAutoScrollAfterDelay(800);
    }
  }, [
    isFocused,
    isExternalPaused,
    isPaused,
    maxScroll,
    restartAutoScrollAfterDelay,
  ]);

  // AppState management
  useEffect(() => {
    const sub = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState !== 'active') {
          isPaused.value = true;
          if (resumeTimerRef.current) {
            clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = null;
          }
        } else if (
          isFocusedRef.current &&
          !isExternalPausedShared.value &&
          maxScroll.value > 0
        ) {
          restartAutoScrollAfterDelay(800);
        }
      },
    );
    return () => sub.remove();
  }, [
    isExternalPausedShared,
    isPaused,
    maxScroll,
    restartAutoScrollAfterDelay,
  ]);

  return {
    translateX,
    animatedStyle,
    panGesture,
    restartAutoScrollAfterDelay,
  };
};

export default useAutoScroll;
