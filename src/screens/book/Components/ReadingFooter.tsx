import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Back, Forward } from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';

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
  isDarkMode = true,
}: ReadingFooterProps) => {
  const { t } = useTranslation();
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages;

  const pageLabel = isFirst
    ? t(Translation.BOOK_COVER_PAGE)
    : t(Translation.BOOK_PAGE_NUMBER, { currentPage, totalPages });

  return (
    <View
      style={[
        styles.footerRow,
        {
          borderTopColor: isDarkMode
            ? colors.readerDarkBorder
            : colors.borderSubtle,
        },
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
                  ? colors.readerDarkDisabled
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
            borderColor: isDarkMode
              ? colors.readerDarkPillBorder
              : colors.borderSubtle,
            backgroundColor: isDarkMode
              ? colors.readerDarkPillBg
              : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles.pageNumberText,
            { color: isDarkMode ? colors.readerDarkText : colors.secondary },
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
                  ? colors.readerDarkDisabled
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
    borderTopColor: colors.borderSubtle,
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
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumberText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
});
