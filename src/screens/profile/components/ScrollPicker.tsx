import React, { useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { ITEM_HEIGHT } from '@constants/notificationData';
import { triggerHaptic } from '@helper/helper';

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
  const isUserInteractingRef = useRef(false);
  const lastSelectedRef = useRef(selectedValue);

  const scrollToIndex = useCallback(
    (index: number, animated: boolean = true) => {
      if (index >= 1 && index < items.length - 1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: (index - 1) * ITEM_HEIGHT,
          animated,
        });
      }
    },
    [items.length],
  );

  // Sync scroll position when selectedValue changes externally
  useEffect(() => {
    lastSelectedRef.current = selectedValue;
    if (isUserInteractingRef.current) return;

    const targetIdx = items.indexOf(selectedValue);
    if (targetIdx !== -1) {
      const timer = setTimeout(() => {
        scrollToIndex(targetIdx, false);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [selectedValue, items, scrollToIndex]);

  const handleScrollEnd = (offsetY: number) => {
    isUserInteractingRef.current = false;
    const centerIndex = Math.round(offsetY / ITEM_HEIGHT) + 1;
    const clampedIndex = Math.max(1, Math.min(items.length - 2, centerIndex));
    const value = items[clampedIndex];

    if (value && value !== '' && value !== lastSelectedRef.current) {
      lastSelectedRef.current = value;
      triggerHaptic('selection');
      onValueChange(value);
    }
  };

  const handleItemPress = (idx: number, item: string) => {
    if (!item || idx === 0 || idx === items.length - 1) return;
    triggerHaptic('selection');
    lastSelectedRef.current = item;
    onValueChange(item);
    scrollToIndex(idx, true);
  };

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.indicatorOverlay} pointerEvents="none" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate={Platform.OS === 'ios' ? 'normal' : 'fast'}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={() => {
          isUserInteractingRef.current = true;
        }}
        onMomentumScrollBegin={() => {
          isUserInteractingRef.current = true;
        }}
        onMomentumScrollEnd={e => {
          handleScrollEnd(e.nativeEvent.contentOffset.y);
        }}
        onScrollEndDrag={e => {
          handleScrollEnd(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        {items.map((item, idx) => {
          const isSelected = item === selectedValue && item !== '';
          return (
            <TouchableOpacity
              key={`picker_${idx}`}
              style={styles.pickerItem}
              activeOpacity={item ? 0.7 : 1}
              onPress={() => handleItemPress(idx, item)}
              disabled={!item}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  isSelected && styles.pickerItemTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  indicatorOverlay: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    width: '100%',
    borderColor: colors.ring,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    top: ITEM_HEIGHT,
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    borderRadius: scale(8),
    zIndex: 1,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pickerItemText: {
    fontSize: fs(20),
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
    opacity: 0.35,
  },
  pickerItemTextActive: {
    color: colors.secondary,
    fontSize: fs(24),
    fontWeight: 'bold',
    opacity: 1,
  },
});
