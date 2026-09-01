import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Vibration,
} from 'react-native';
import { Back, Forward } from '../../../assets';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';

const triggerHaptic = (_type?: string) => {
  try {
    Vibration.vibrate(30);
  } catch {}
};

interface ReadingFooterProps {
  currentPage: number; // 0 = cover, 1..n = comic pages
  totalPages: number; // total comic pages (excluding cover)
  onPrev: () => void;
  onNext: () => void;
  currentLang?: 'en' | 'hi';
  isDarkMode?: boolean;
}

const ReadingFooter = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  currentLang = 'en',
  isDarkMode = true,
}: ReadingFooterProps) => {
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages;

  const pageLabel = isFirst
    ? currentLang === 'hi'
      ? 'कवर पेज'
      : 'Cover Page'
    : currentLang === 'hi'
    ? `पृष्ठ ${currentPage} / ${totalPages}`
    : `Page ${currentPage} / ${totalPages}`;

  return (
    <View
      style={[
        styles.footerRow,
        { borderTopColor: isDarkMode ? '#2C2A29' : colors.borderMedium },
      ]}
    >
      {/* Back / Prev button */}
      {!isFirst && (
        <TouchableOpacity
          style={[styles.navButton, isFirst && styles.navButtonDisabled]}
          onPress={() => {
            triggerHaptic();
            onPrev();
          }}
          disabled={isFirst}
          activeOpacity={0.7}
        >
          <Back
            width={scale(14)}
            height={scale(14)}
            stroke={
              isFirst
                ? isDarkMode
                  ? '#555'
                  : colors.neutralDisabled
                : colors.ring
            }
          />
        </TouchableOpacity>
      )}

      {/* Page number pill */}
      <View
        style={[
          styles.pageNumberPill,
          {
            borderColor: isDarkMode ? '#333' : colors.borderMedium,
            backgroundColor: isDarkMode
              ? 'rgba(255,255,255,0.05)'
              : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles.pageNumberText,
            { color: isDarkMode ? '#F5EFE6' : colors.secondary },
          ]}
        >
          {pageLabel}
        </Text>
      </View>

      {/* Forward / Next button */}
      {!isLast && (
        <TouchableOpacity
          style={[styles.navButton, isLast && styles.navButtonDisabled]}
          onPress={() => {
            triggerHaptic();
            onNext();
          }}
          disabled={isLast}
          activeOpacity={0.7}
        >
          <Forward
            width={scale(14)}
            height={scale(14)}
            stroke={
              isLast
                ? isDarkMode
                  ? '#555'
                  : colors.neutralDisabled
                : colors.ring
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadingFooter;

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderTopWidth: 1,
    borderTopColor: colors.borderMedium,
    width: '100%',
  },
  navButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(19),
    borderWidth: 1,
    borderColor: colors.ring,
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonDisabled: {
    borderColor: colors.neutralDisabled,
    // backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  pageNumberPill: {
    flex: 1,
    marginHorizontal: scale(12),
    paddingVertical: scale(6),
    paddingHorizontal: scale(14),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumberText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
});
