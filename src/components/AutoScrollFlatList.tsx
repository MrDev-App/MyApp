import React, { useState, createContext, useContext, useMemo } from 'react';
import {
  View,
  Pressable,
  FlatListProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ListRenderItemInfo,
  PressableProps,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useAutoScroll } from '@hooks/useAutoScroll';

interface AutoScrollContextType {
  restartAutoScrollAfterDelay: (delayMs?: number) => void;
}

const AutoScrollContext = createContext<AutoScrollContextType | null>(null);

export const useAutoScrollContext = () => {
  const ctx = useContext(AutoScrollContext);
  return (
    ctx ?? {
      restartAutoScrollAfterDelay: () => {},
    }
  );
};

export interface AutoScrollItemProps
  extends Omit<PressableProps, 'style' | 'children'> {
  onPress?: () => void;
  style?:
    | StyleProp<ViewStyle>
    | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  children?:
    | React.ReactNode
    | ((state: { pressed: boolean }) => React.ReactNode);
}

/**
 * Clickable item/wrapper to be used inside AutoScrollFlatList.
 * Handles tap/press cleanly with instant registration.
 */
export const AutoScrollItem: React.FC<AutoScrollItemProps> = ({
  onPress,
  style,
  children,
  ...rest
}) => {
  return (
    <Pressable
      {...rest}
      style={style}
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      {typeof children === 'function' ? children : children}
    </Pressable>
  );
};

export interface AutoScrollFlatListProps<T>
  extends Omit<FlatListProps<T>, 'renderItem'> {
  data: readonly T[] | T[] | null | undefined;
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  speed?: number; // Pixels per second (default 32)
  resumeDelayMs?: number; // Milliseconds to wait before resuming after user drag (default 1500)
  pauseAtEnds?: number; // Milliseconds to pause at ends (default 1500)
  isExternalPaused?: boolean;
}

/**
 * Non-blocking, smooth UI-Thread Auto-Scrolling List component.
 *
 * Solves the iOS UIKit touch-blocking issue:
 * - By animating `translateX` via Reanimated instead of changing native `UIScrollView.contentOffset`,
 *   iOS UIKit never enters scroll-tracking mode.
 * - Taps on all buttons (modals, cards, bottom tabs, headers) register instantly on the first touch.
 * - Uses PanGesture with withDecay for full 120Hz native momentum fling and rubber-band physics.
 */
export function AutoScrollFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  contentContainerStyle,
  style,
  speed = 32,
  resumeDelayMs = 1500,
  pauseAtEnds = 1500,
  isExternalPaused = false,
}: AutoScrollFlatListProps<T>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const { animatedStyle, panGesture, restartAutoScrollAfterDelay } =
    useAutoScroll({
      contentWidth,
      containerWidth,
      speed,
      pauseAtEnds,
      resumeDelayMs,
      isExternalPaused,
    });

  const items = data ?? [];

  const contextValue = useMemo(
    () => ({
      restartAutoScrollAfterDelay,
    }),
    [restartAutoScrollAfterDelay],
  );

  return (
    <AutoScrollContext.Provider value={contextValue}>
      <View
        style={[styles.outerContainer, style]}
        onLayout={e => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.contentContainer,
              contentContainerStyle,
              animatedStyle,
            ]}
            onLayout={e => {
              setContentWidth(e.nativeEvent.layout.width);
            }}
          >
            {ListHeaderComponent ? (
              React.isValidElement(ListHeaderComponent) ? (
                ListHeaderComponent
              ) : (
                <ListHeaderComponent />
              )
            ) : null}

            {items.length === 0 && ListEmptyComponent ? (
              React.isValidElement(ListEmptyComponent) ? (
                ListEmptyComponent
              ) : (
                <ListEmptyComponent />
              )
            ) : null}

            {items.map((item, index) => {
              const key = keyExtractor
                ? keyExtractor(item, index)
                : (item as any)?.id ?? String(index);

              const renderedItem = renderItem({
                item,
                index,
                separators: {
                  highlight: () => {},
                  unhighlight: () => {},
                  updateProps: () => {},
                },
              });

              return (
                <React.Fragment key={key}>
                  {renderedItem}
                  {index < items.length - 1 && ItemSeparatorComponent
                    ? React.isValidElement(ItemSeparatorComponent)
                      ? ItemSeparatorComponent
                      : React.createElement(
                          ItemSeparatorComponent as React.ComponentType,
                        )
                    : null}
                </React.Fragment>
              );
            })}

            {ListFooterComponent ? (
              React.isValidElement(ListFooterComponent) ? (
                ListFooterComponent
              ) : (
                <ListFooterComponent />
              )
            ) : null}
          </Animated.View>
        </GestureDetector>
      </View>
    </AutoScrollContext.Provider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});

export default AutoScrollFlatList;
