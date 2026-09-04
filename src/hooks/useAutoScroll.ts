import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

export const useAutoScroll = (
  listRef: React.RefObject<FlatList<any> | null>,
  contentWidth: number,
  containerWidth: number,
  speed = 40, // Pixels per second
  isPausedRef?: React.MutableRefObject<boolean>,
  pauseAtEnds = 1000, // Milliseconds to pause at ends before reversing
) => {
  const scrollOffsetRef = useRef(0);
  const directionRef = useRef<1 | -1>(1); // 1 = forward (right to left), -1 = backward (left to right)
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const edgePauseUntilRef = useRef<number | null>(null);

  // Expose sync offset for manual scrolling/touch events
  const syncOffset = (offset: number, direction?: 1 | -1) => {
    const maxScroll = Math.max(0, contentWidth - containerWidth);
    scrollOffsetRef.current = Math.max(0, Math.min(offset, maxScroll));
    edgePauseUntilRef.current = null;

    if (direction !== undefined) {
      directionRef.current = direction;
    } else if (scrollOffsetRef.current >= maxScroll) {
      directionRef.current = -1;
    } else if (scrollOffsetRef.current <= 0) {
      directionRef.current = 1;
    }
  };

  useEffect(() => {
    // Start auto scroll only if content exceeds the container
    if (contentWidth <= containerWidth || containerWidth === 0) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const maxScroll = contentWidth - containerWidth;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;

        // Advance scroll offset if not paused by touch or active modal
        if (!isPausedRef?.current) {
          // Check if currently resting at an edge
          if (edgePauseUntilRef.current !== null) {
            if (time < edgePauseUntilRef.current) {
              lastTimeRef.current = time;
              animationFrameId.current = requestAnimationFrame(animate);
              return;
            }
            edgePauseUntilRef.current = null;
          }

          const nextOffset =
            scrollOffsetRef.current + directionRef.current * speed * delta;

          // Reached end -> reverse direction to scroll back (left to right)
          if (nextOffset >= maxScroll) {
            scrollOffsetRef.current = maxScroll;
            directionRef.current = -1;
            if (pauseAtEnds > 0) {
              edgePauseUntilRef.current = time + pauseAtEnds;
            }
          } else if (nextOffset <= 0) {
            // Reached beginning -> reverse direction to scroll forward (right to left)
            scrollOffsetRef.current = 0;
            directionRef.current = 1;
            if (pauseAtEnds > 0) {
              edgePauseUntilRef.current = time + pauseAtEnds;
            }
          } else {
            scrollOffsetRef.current = nextOffset;
          }

          listRef.current?.scrollToOffset({
            offset: scrollOffsetRef.current,
            animated: false,
          });
        }
      }

      lastTimeRef.current = time;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      lastTimeRef.current = null;
    };
  }, [contentWidth, containerWidth, speed, listRef, isPausedRef, pauseAtEnds]);

  return { syncOffset, directionRef };
};

export default useAutoScroll;
