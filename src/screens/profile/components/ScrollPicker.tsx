import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { ITEM_HEIGHT } from '@constants/notificationData';

interface ScrollPickerProps {
  items: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const ScrollPicker = ({
  items,
  selectedValue,
  onValueChange,
}: ScrollPickerProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (isScrollingRef.current) {
      return;
    }
    const selectedIndex = items.indexOf(selectedValue);
    if (selectedIndex !== -1 && scrollViewRef.current) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: (selectedIndex - 1) * ITEM_HEIGHT,
          animated: false,
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedValue, items]);

  const onScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const value = items[index + 1];
    if (value && value !== selectedValue) {
      onValueChange(value);
    }
  };

  const handleScrollBegin = () => {
    isScrollingRef.current = true;
  };

  const handleScrollEnd = (event: any) => {
    isScrollingRef.current = false;
    onScroll(event);
  };

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.indicatorOverlay} pointerEvents="none" />
      <ScrollView
        ref={scrollViewRef}
        style={{ width: '100%', height: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollBegin={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {items.map((item, idx) => (
          <View key={`picker_${idx}`} style={styles.pickerItem}>
            <Text
              style={[
                styles.pickerItemText,
                item === selectedValue && styles.pickerItemTextActive,
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    height: ITEM_HEIGHT * 3,
    width: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  indicatorOverlay: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    width: '100%',
    borderColor: colors.ring,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    top: ITEM_HEIGHT,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pickerItemText: {
    fontSize: fs(22),
    color: colors.black,
    fontFamily: fonts.Marcellus,
    opacity: 0.4,
  },
  pickerItemTextActive: {
    color: colors.black,
    fontSize: fs(24),
    fontWeight: 'bold',
    opacity: 1,
  },
});
