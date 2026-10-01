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
  /** English title of the book */
  title?: string;
  /** Hindi title of the book */
  titleHi?: string;
  /** Scripture / source text (e.g. "Bhagavat Purana") */
  source?: string;
  currentLang?: 'hi' | 'en';
}

/**
 * BookEndPage — A reusable "The End" page that can be placed at the back
 * of any book in the app. Styled identically to a regular StoryPageView page.
 *
 * Shows:
 *  - Book title (in the current language)
 *  - "The End" / "समाप्त" as the main headline
 *  - Decorative Sanskrit colophon
 *  - Scripture source (if available)
 */
export const BookEndPage: React.FC<BookEndPageProps> = React.memo(
  ({ title, titleHi, source, currentLang = 'hi' }) => {
    const isHi = currentLang === 'hi';

    // Display the title in the user's language, fall back to whichever exists
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
            {/* Ornament top rule */}
            {/* <View style={styles.ornamentRow}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentDot}>✦</Text>
              <View style={styles.ornamentLine} />
            </View> */}

            {/* OM symbol */}
            <Text style={styles.omText}>ॐ</Text>

            {/* Thin gold rule */}
            <View style={styles.thinRule} />

            {/* Book name label */}
            <Text style={styles.bookLabel}>
              {isHi ? 'पुस्तक का नाम' : 'Book Name'}
            </Text>

            {/* Book title — primary display */}
            {displayTitle ? (
              <Text style={styles.bookTitle} numberOfLines={3}>
                {displayTitle}
              </Text>
            ) : null}

            {/* Thick gold rule separating title from "The End" */}
            {/* <View style={styles.thickRule} /> */}

            {/* THE END — main message */}
            {/* <Text style={styles.theEndLabel}>
              {isHi ? 'समाप्त' : 'The End'}
            </Text>
            <Text style={styles.theEndSub}>
              {isHi ? '— इस कथा का अंत —' : '— End of this story —'}
            </Text> */}

            {/* Sanskrit colophon */}
            {/* <View style={styles.colophonBox}>
              <Text style={styles.colophonText}>
                {isHi
                  ? 'इति श्रीमद् कथायाः समाप्तिः'
                  : 'Iti Shrimad Kathāyāḥ Samāptiḥ'}
              </Text>
            </View> */}

            {/* Scripture source (if any) */}
            {/* {displaySource ? (
              <Text style={styles.sourceText}>{displaySource}</Text>
            ) : null} */}

            {/* Closing blessing */}
            {/* <Text style={styles.blessingText}>
              {isHi ? 'हरि ॐ तत् सत्' : 'Hari OM Tat Sat'}
            </Text> */}

            {/* Ornament bottom rule */}
            {/* <View style={[styles.ornamentRow, { marginTop: scale(8) }]}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentDot}>✦</Text>
              <View style={styles.ornamentLine} />
            </View> */}
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
    paddingHorizontal: scale(10),
    gap: scale(6),
  },

  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: scale(6),
  },
  ornamentLine: {
    flex: 1,
    height: 0.8,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.5,
  },
  ornamentDot: {
    fontSize: fs(10),
    color: GOLD_ACCENT,
    opacity: 0.8,
  },

  omText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(36),
    color: GOLD_ACCENT,
    textAlign: 'center',
    lineHeight: fs(44),
    textShadowColor: 'rgba(218, 165, 32, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },

  thinRule: {
    width: scale(60),
    height: 0.8,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.4,
  },

  // Book name section
  bookLabel: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(8),
    color: colors.secondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.65,
  },
  bookTitle: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(16),
    color: '#3D2A0A',
    textAlign: 'center',
    lineHeight: fs(23),
    letterSpacing: 0.3,
    paddingHorizontal: scale(8),
  },

  thickRule: {
    width: '70%',
    height: 1.5,
    backgroundColor: GOLD_ACCENT,
    opacity: 0.55,
    borderRadius: 2,
  },

  // "The End" headline
  theEndLabel: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(24),
    color: colors.ring,
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: fs(30),
  },
  theEndSub: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(9.5),
    color: colors.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.75,
    letterSpacing: 0.5,
  },

  // Sanskrit colophon pill
  colophonBox: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderWidth: 1,
    borderColor: `${GOLD_ACCENT}50`,
    borderRadius: scale(6),
    backgroundColor: 'rgba(218,165,32,0.06)',
  },
  colophonText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(9),
    color: '#7A5020',
    textAlign: 'center',
    letterSpacing: 0.6,
    fontStyle: 'italic',
  },

  sourceText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(8.5),
    color: colors.secondary,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },

  blessingText: {
    fontFamily: fonts.TiroHindiRegular,
    fontSize: fs(11),
    color: GOLD_ACCENT,
    textAlign: 'center',
    letterSpacing: 1,
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
