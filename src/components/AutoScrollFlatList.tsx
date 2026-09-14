import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import {
  FlatList,
  Pressable,
  GestureResponderEvent,
  FlatListProps,
  StyleProp,
  ViewStyle,
  AppState,
  AppStateStatus,
  ListRenderItemInfo,
  PressableProps,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useAutoScroll } from '@hooks/useAutoScroll';

interface AutoScrollContextType {
  isPaused: React.MutableRefObject<boolean>;
  isDragging: React.MutableRefObject<boolean>;
  restartAutoScrollAfterDelay: (delayMs?: number) => void;
}

const AutoScrollContext = createContext<AutoScrollContextType | null>(null);

export const useAutoScrollContext = () => {
  const ctx = useContext(AutoScrollContext);
  if (!ctx) {
    throw new Error('AutoScrollItem must be used within an AutoScrollFlatList');
  }
  return ctx;
};

export interface AutoScrollItemProps
  extends Omit<PressableProps, 'style' | 'children'> {
  onPress?: () => void;
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  children?: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
}

/**
 * Clickable item/wrapper to be used inside an AutoScrollFlatList.
 * Handles drag vs. tap disambiguation and ensures clicks register smoothly
 * even when the list is in motion.
 */
export const AutoScrollItem: React.FC<AutoScrollItemProps> = ({
  onPress,
  style,
  children,
  ...rest
}) => {
  const { isPaused, isDragging, restartAutoScrollAfterDelay } =
    useAutoScrollContext();
  const touchDownInfo = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const lastPressTime = useRef(0);

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPressTime.current < 350) return;
    lastPressTime.current = now;
    onPress?.();
  };

  return (
    <Pressable
      {...rest}
      style={style}
      onTouchStart={(e: GestureResponderEvent) => {
        touchDownInfo.current = {
          x: e.nativeEvent.pageX,
          y: e.nativeEvent.pageY,
          time: Date.now(),
        };
        isPaused.current = true;
      }}
      onTouchMove={(e: GestureResponderEvent) => {
        if (touchDownInfo.current) {
          const dx = Math.abs(e.nativeEvent.pageX - touchDownInfo.current.x);
          const dy = Math.abs(e.nativeEvent.pageY - touchDownInfo.current.y);
          if (dx > 10 || dy > 10) {
            touchDownInfo.current = null;
          }
        }
      }}
      onTouchEnd={(e: GestureResponderEvent) => {
        if (touchDownInfo.current && !isDragging.current) {
          const dx = Math.abs(e.nativeEvent.pageX - touchDownInfo.current.x);
          const dy = Math.abs(e.nativeEvent.pageY - touchDownInfo.current.y);
          const dt = Date.now() - touchDownInfo.current.time;
          if (dx < 12 && dy < 12 && dt < 400) {
            handlePress();
          }
        }
        touchDownInfo.current = null;
        if (!isDragging.current) {
          restartAutoScrollAfterDelay(1500);
        }
      }}
      onTouchCancel={() => {
        touchDownInfo.current = null;
        if (!isDragging.current) {
          restartAutoScrollAfterDelay(1500);
        }
      }}
      onPress={() => {
        if (!isDragging.current) {
          handlePress();
        }
        if (!isDragging.current) {
          restartAutoScrollAfterDelay(1500);
        }
      }}
    >
      {typeof children === 'function' ? children : children}
    </Pressable>
  );
};

export interface AutoScrollFlatListProps<T>
  extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[] | null | undefined;
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  speed?: number;
  resumeDelayMs?: number;
  pauseAtEnds?: number;
  isExternalPaused?: boolean;
}

/**
 * Reusable Auto-Scrolling FlatList component.
 * Features:
 * 1. Continuous smooth auto-scrolling back and forth across list items.
 * 2. Completely pauses when user manually drags/scrolls with native physics.
 * 3. Automatically resumes 1.5s after user stops scrolling.
 * 4. Allows instant click/tap on items even while moving (use AutoScrollItem).
 * 5. Pauses when screen is blurred (useIsFocused) or app goes to background (AppState).
 * 6. Clean unmount with zero memory leaks.
 */
export function AutoScrollFlatList<T>({
  data,
  renderItem,
  speed = 32,
  resumeDelayMs = 1500,
  pauseAtEnds = 1500,
  isExternalPaused = false,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onLayout,
  onContentSizeChange,
  ...flatListProps
}: AutoScrollFlatListProps<T>) {
  const isFocused = useIsFocused();
  const listRef = useRef<FlatList<T>>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const restartAutoScrollAfterDelay = (delayMs = resumeDelayMs) => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
    resumeTimer.current = setTimeout(() => {
      if (!isExternalPaused && !isDragging.current && isFocused) {
        isPaused.current = false;
      }
    }, delayMs);
  };

  const { syncOffset } = useAutoScroll(
    listRef,
    contentWidth,
    containerWidth,
    speed,
    isPaused,
    pauseAtEnds,
    isExternalPaused || !isFocused,
  );

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, []);

  // Screen focus management (pauses when user navigates away)
  useEffect(() => {
    if (!isFocused) {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = null;
      }
      isPaused.current = true;
    } else if (!isExternalPaused) {
      restartAutoScrollAfterDelay(1000);
    }
  }, [isFocused, isExternalPaused]);

  // AppState background/foreground management
  useEffect(() => {
    const sub = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState !== 'active') {
          if (resumeTimer.current) {
            clearTimeout(resumeTimer.current);
            resumeTimer.current = null;
          }
          isPaused.current = true;
        } else if (isFocused && !isExternalPaused) {
          restartAutoScrollAfterDelay(1000);
        }
      },
    );
    return () => sub.remove();
  }, [isFocused, isExternalPaused]);

  // External pause management (e.g. modals open/close)
  useEffect(() => {
    if (isExternalPaused) {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
      isPaused.current = true;
    } else if (isFocused) {
      restartAutoScrollAfterDelay(resumeDelayMs);
    }
  }, [isExternalPaused]);

  const contextValue = useMemo(
    () => ({
      isPaused,
      isDragging,
      restartAutoScrollAfterDelay,
    }),
    [resumeDelayMs],
  );

  return (
    <AutoScrollContext.Provider value={contextValue}>
      <FlatList
        ref={listRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        onTouchStart={e => {
          isPaused.current = true;
          if (resumeTimer.current) {
            clearTimeout(resumeTimer.current);
            resumeTimer.current = null;
          }
          flatListProps.onTouchStart?.(e);
        }}
        onTouchEnd={e => {
          if (!isDragging.current) {
            restartAutoScrollAfterDelay(resumeDelayMs);
          }
          flatListProps.onTouchEnd?.(e);
        }}
        onTouchCancel={e => {
          if (!isDragging.current) {
            restartAutoScrollAfterDelay(resumeDelayMs);
          }
          flatListProps.onTouchCancel?.(e);
        }}
        {...flatListProps}
        data={data}
        renderItem={renderItem}
        onLayout={e => {
          setContainerWidth(e.nativeEvent.layout.width);
          onLayout?.(e);
        }}
        onContentSizeChange={(w, h) => {
          setContentWidth(w);
          onContentSizeChange?.(w, h);
        }}
        onScrollBeginDrag={e => {
          isDragging.current = true;
          isPaused.current = true;
          if (resumeTimer.current) {
            clearTimeout(resumeTimer.current);
            resumeTimer.current = null;
          }
          onScrollBeginDrag?.(e);
        }}
        onScrollEndDrag={e => {
          const vx = e.nativeEvent.velocity?.x ?? 0;
          const direction = vx > 0.1 ? 1 : vx < -0.1 ? -1 : undefined;
          syncOffset(e.nativeEvent.contentOffset.x, direction);

          if (Math.abs(vx) < 0.05) {
            isDragging.current = false;
            restartAutoScrollAfterDelay(resumeDelayMs);
          } else {
            restartAutoScrollAfterDelay(resumeDelayMs + 700);
          }
          onScrollEndDrag?.(e);
        }}
        onMomentumScrollEnd={e => {
          syncOffset(e.nativeEvent.contentOffset.x);
          isDragging.current = false;
          restartAutoScrollAfterDelay(resumeDelayMs);
          onMomentumScrollEnd?.(e);
        }}
      />
    </AutoScrollContext.Provider>
  );
}

export default AutoScrollFlatList;
