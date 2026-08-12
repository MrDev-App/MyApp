import { useRef } from 'react';
import { ExpandableCardHandle } from '../components/ExpandableCard';

export function useExpandTrigger<T>(
  cardRef: React.RefObject<ExpandableCardHandle | null>,
) {
  const refs = useRef<Record<string, any>>({});

  const registerRef = (id: string) => (el: any) => {
    refs.current[id] = el;
  };

  const trigger = (id: string, data: T) => {
    const node = refs.current[id];
    node?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        cardRef.current?.open({ x, y, width, height }, data);
      },
    );
  };

  return { registerRef, trigger };
}
