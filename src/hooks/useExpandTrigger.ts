import { useRef } from 'react';
import { ExpandableCardHandle } from '@components/ExpandableCard';

export function useExpandTrigger<T>(
  cardRef: React.RefObject<ExpandableCardHandle | null>,
) {
  const refs = useRef<Record<string, any>>({});

  const registerRef = (id: string) => (el: any) => {
    refs.current[id] = el;
  };

  const trigger = (id: string, data: T) => {
    const node = refs.current[id];
    let called = false;

    if (node && typeof node.measureInWindow === 'function') {
      try {
        node.measureInWindow(
          (x: number, y: number, width: number, height: number) => {
            if (called) return;
            called = true;
            if (width > 0 && height > 0 && !isNaN(x) && !isNaN(y)) {
              cardRef.current?.open({ x, y, width, height }, data);
            } else {
              cardRef.current?.open(
                { x: 0, y: 0, width: 85, height: 85 },
                data,
              );
            }
          },
        );

        // Safety fallback timeout in case native measure callback drops on iOS
        setTimeout(() => {
          if (!called) {
            called = true;
            cardRef.current?.open({ x: 0, y: 0, width: 85, height: 85 }, data);
          }
        }, 150);
        return;
      } catch {
        // Fallback to direct open below
      }
    }

    cardRef.current?.open({ x: 0, y: 0, width: 85, height: 85 }, data);
  };

  return { registerRef, trigger };
}

export default useExpandTrigger;
