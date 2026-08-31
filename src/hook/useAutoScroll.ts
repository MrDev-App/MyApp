// hook/useAutoScroll.ts
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

export function useAutoScroll(
  listRef: React.RefObject<FlatList<any> | null>,
  contentWidth: number,
  containerWidth: number,
  speed: number = 40, // pixels per second
  isPaused: React.MutableRefObject<boolean>,
) {
  const offsetRef = useRef(0);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (contentWidth <= containerWidth) return; // scroll karne layak content hi nahi

    const maxOffset = contentWidth - containerWidth;

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = timestamp;

      if (isPaused.current) {
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }

      offsetRef.current += directionRef.current * speed * delta;

      // Bounds check — direction flip karo
      if (offsetRef.current >= maxOffset) {
        offsetRef.current = maxOffset;
        directionRef.current = -1;
      } else if (offsetRef.current <= 0) {
        offsetRef.current = 0;
        directionRef.current = 1;
      }

      listRef.current?.scrollToOffset({
        offset: offsetRef.current,
        animated: false, // hum khud animate kar rahe hain frame-by-frame
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [contentWidth, containerWidth, speed, isPaused, listRef]);

  return {
    syncOffset: (newOffset: number) => {
      offsetRef.current = newOffset;
    },
  };
}
