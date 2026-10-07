import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  GOLD_ACCENT,
  GOLD_BORDER,
  BOOK_WIDTH,
  BOOK_HEIGHT,
} from './FlipBookCover.constants';
import imagePath from '@assets/index';

interface BookEndPageProps {
  title?: string;

  titleHi?: string;

  source?: string;
  currentLang?: 'hi' | 'en';
}

export const BookEndPage: React.FC<BookEndPageProps> = React.memo(
  ({ title, titleHi, source, currentLang = 'hi' }) => {
    const isHi = currentLang === 'hi';

    const displayTitle = isHi ? titleHi || title || '' : title || titleHi || '';
    const displaySource = source || '';

    return (
      <View style={styles.insidePageContainer}>
        {/* Same gold ornate border frame as every story page */}
        <View style={[styles.ornateBorder, { borderColor: GOLD_BORDER }]}>
          {/* ── Top Header Bar (same as StoryPageView) ──────────────────── */}
          <View style={styles.insideHeaderBar}>
            <View
              style={[styles.pageSourceBadge, { backgroundColor: colors.ring }]}
            >
              <Image
                source={imagePath.lotus}
                style={[styles.headerBadgeIcon, { tintColor: colors.white }]}
                resizeMode="contain"
              />
              <Text
                style={[styles.pageSourceText, { color: colors.white }]}
                numberOfLines={1}
              >
                {displaySource || (isHi ? 'समाप्ति' : 'Conclusion')}
              </Text>
            </View>
          </View>

          {/* ── Main Body ────────────────────────────────────────────────── */}
          <View style={styles.endBody}>
            {/* Top Ornate Flourish & OM */}
            <View style={styles.ornamentRow}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentDot}>✦</Text>
              <View style={styles.ornamentLine} />
            </View>

            {/* OM Symbol */}
            <Text style={styles.omText}>ॐ</Text>

            {/* Thin gold rule */}
            <View style={styles.thinRule} />

            {/* Book Title with Ornate Framing */}
            {displayTitle ? (
              <View style={styles.titleContainer}>
                <Text style={styles.titlePrefix}>
                  {isHi ? '॥ पावन कथा ॥' : '॥ Sacred Tale ॥'}
                </Text>
                <Text style={styles.bookTitle} numberOfLines={4}>
                  {displayTitle}
                </Text>
              </View>
            ) : null}

            {/* Thick gold rule */}
            <View style={styles.thickRule} />

            {/* Sanskrit colophon / Conclusion Blessing */}
            <View style={styles.colophonBox}>
              <Text style={styles.colophonText}>
                {isHi ? '॥ इति कथा सम्पूर्णा ॥' : '॥ Iti Kathā Sampūrṇā ॥'}
              </Text>
              <Text style={styles.blessingText}>
                {isHi ? 'हरि ॐ तत् सत्' : 'Hari OM Tat Sat'}
              </Text>
            </View>

            {/* Bottom Ornate Flourish */}
            <View style={[styles.ornamentRow, { marginTop: scale(4) }]}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentDot}>✦</Text>
              <View style={styles.ornamentLine} />
            </View>
          </View>

          {/* ── Footer (same as StoryPageView) ───────────────────────────── */}
          <View style={styles.insideFooterRow}>
            <Text style={[styles.footerText, { color: colors.secondary }]}>
              {isHi ? '— समाप्त —' : '— The End —'}
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  // ── Identical to StoryPageView's insidePageContainer ───────────────────────
  insidePageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    borderRadius: scale(14),
    borderWidth: 1.5,
    backgroundColor: colors.primary,
    borderColor: colors.borderLight,
    padding: scale(10),
    paddingLeft: scale(14),
    zIndex: 2,
    overflow: 'hidden',
  },

  // ── Identical to StoryPageView's ornateBorder ───────────────────────────────
  ornateBorder: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(8),
    justifyContent: 'space-between',
    position: 'relative',
  },

  // ── Identical to StoryPageView's insideHeaderBar ───────────────────────────
  insideHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(6),
    paddingHorizontal: scale(4),
  },
  pageSourceBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2.5),
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  headerBadgeIcon: {
    width: scale(11),
    height: scale(11),
  },
  pageSourceText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(9),
  },

  // ── End page body ──────────────────────────────────────────────────────────
  endBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(8),
    gap: scale(8),
  },

  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: scale(6),
  },
  ornamentLine: {
    flex: 1,
    height: 0.8,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.45,
  },
  ornamentDot: {
    fontSize: fs(10),
    color: GOLD_ACCENT,
    opacity: 0.8,
  },

  omText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(38),
    color: GOLD_ACCENT,
    textAlign: 'center',
    lineHeight: fs(46),
    textShadowColor: 'rgba(218, 165, 32, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },

  thinRule: {
    width: scale(70),
    height: 0.8,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.4,
  },

  // Book title section
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(6),
    marginVertical: scale(2),
  },
  titlePrefix: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(9),
    color: colors.ring,
    letterSpacing: 1.2,
    marginBottom: scale(4),
  },
  bookTitle: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(16.5),
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(24),
    letterSpacing: 0.2,
    paddingHorizontal: scale(4),
  },

  thickRule: {
    width: scale(90),
    height: 1.2,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.5,
    borderRadius: 2,
    marginVertical: scale(2),
  },

  // Sanskrit colophon pill
  colophonBox: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(7),
    borderWidth: 1,
    borderColor: `${GOLD_ACCENT}55`,
    borderRadius: scale(8),
    backgroundColor: 'rgba(218,165,32,0.07)',
    alignItems: 'center',
    gap: scale(3),
  },
  colophonText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(11),
    color: colors.secondary,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: fs(16),
  },
  blessingText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(10),
    color: colors.ring,
    textAlign: 'center',
    letterSpacing: 0.8,
  },

  // ── Identical to StoryPageView's insideFooterRow ───────────────────────────
  insideFooterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(4),
    paddingHorizontal: scale(4),
  },
  footerText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(8.5),
    letterSpacing: 1.5,
  },
});

export default BookEndPage;
