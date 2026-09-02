import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

export const useAutoScroll = (
  listRef: React.RefObject<FlatList<any> | null>,
  contentWidth: number,
  containerWidth: number,
  speed = 30, // Pixels per second
  isPausedRef?: React.MutableRefObject<boolean>,
) => {
  const scrollOffsetRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Expose sync offset for manual scrolling/touch events
  const syncOffset = (offset: number) => {
    scrollOffsetRef.current = offset;
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
          scrollOffsetRef.current += speed * delta;

          // Seamless reset when hitting the edge
          if (scrollOffsetRef.current >= maxScroll) {
            scrollOffsetRef.current = 0;
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
  }, [contentWidth, containerWidth, speed, listRef, isPausedRef]);

  return { syncOffset };
};

export default useAutoScroll;
