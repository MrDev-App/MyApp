import React, { useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { AnimatedListItem } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { CopyIcon, ShareIcon } from '@components/icons/SvgIcons';
import { ShlokaVerse } from '@services/firebaseServices/shlokaService';

export interface ShlokaVerseCardProps {
  item: ShlokaVerse;
  index: number;
  onCopy: (verse: ShlokaVerse) => void;
  onShare: (verse: ShlokaVerse) => void;
}

export const ShlokaVerseCard: React.FC<ShlokaVerseCardProps> = ({
  item,
  index,
  onCopy,
  onShare,
}) => {
  const { t, isHindi } = useAppLanguage();

  const verseTitle = useMemo(
    () => (isHindi ? item.titleHi || item.title : item.title),
    [isHindi, item.titleHi, item.title],
  );

  const translation = useMemo(
    () =>
      isHindi
        ? item.translationHi || item.meaningHi
        : item.translationEn || item.meaningEn,
    [
      isHindi,
      item.translationHi,
      item.meaningHi,
      item.translationEn,
      item.meaningEn,
    ],
  );

  const handleCopy = useCallback(() => {
    onCopy(item);
  }, [onCopy, item]);

  const handleShare = useCallback(() => {
    onShare(item);
  }, [onShare, item]);

  return (
    <AnimatedListItem index={index} delayStep={45}>
      <View style={styles.verseCard}>
        {/* Card Header with Verse Index & Title */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.indexBadge}>
            <Text style={styles.indexBadgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.verseTitle} numberOfLines={2}>
            {verseTitle}
          </Text>
        </View>

        {/* Sanskrit Devanagari Verses Box */}
        <View style={styles.sanskritBox}>
          <Text style={styles.sanskritText}>{item.sanskrit}</Text>
        </View>

        {/* Transliteration Box (if available) */}
        {item.transliteration ? (
          <View style={styles.transliterationBox}>
            <Text style={styles.transliterationLabel}>Transliteration</Text>
            <Text style={styles.transliterationText}>
              {item.transliteration}
            </Text>
          </View>
        ) : null}

        {/* Translation / Meaning Box */}
        {translation ? (
          <View style={styles.translationBox}>
            <View style={styles.translationBadge}>
              <Text style={styles.translationBadgeText}>
                {t(Translation.SHLOK_MEANING_LABEL)}
              </Text>
            </View>
            <Text style={styles.translationText}>{translation}</Text>
          </View>
        ) : null}

        {/* Action Buttons: Copy & Share */}
        <View style={styles.cardActionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel={t(Translation.SHLOK_COPY_ACTION)}
          >
            <CopyIcon size={scale(15)} color={colors.ring} />
            <Text style={styles.actionBtnText}>
              {t(Translation.SHLOK_COPY_ACTION)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.shareBtn]}
            activeOpacity={0.8}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel={t(Translation.SHLOK_SHARE_ACTION)}
          >
            <ShareIcon size={scale(15)} color={colors.white} />
            <Text style={[styles.actionBtnText, styles.shareBtnText]}>
              {t(Translation.SHLOK_SHARE_ACTION)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedListItem>
  );
};

export default React.memo(ShlokaVerseCard);

const styles = StyleSheet.create({
  verseCard: {
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.1,
    shadowRadius: scale(6),

    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
    gap: scale(10),
  },
  indexBadge: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: colors.accentOrangeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexBadgeText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.ring,
  },
  verseTitle: {
    flex: 1,
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
    lineHeight: fs(22),
  },
  sanskritBox: {
    backgroundColor: colors.accentOrangeLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.ring,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(12),
  },
  sanskritText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(24),
    fontWeight: '600',
    textAlign: 'left',
  },
  transliterationBox: {
    backgroundColor: colors.borderLightTransparent,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    marginBottom: scale(12),
  },
  transliterationLabel: {
    fontSize: fs(10.5),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.warmTaupe,
    marginBottom: scale(4),
    textTransform: 'uppercase',
  },
  transliterationText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(18),
    fontStyle: 'italic',
  },
  translationBox: {
    backgroundColor: colors.primary,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  translationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bannerTagBg,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(6),
    marginBottom: scale(6),
  },
  translationBadgeText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  translationText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(19),
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingTop: scale(4),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(38),
    borderRadius: scale(19),
    borderWidth: 1.5,
    borderColor: colors.ring,
    backgroundColor: colors.white,
    gap: scale(6),
  },
  shareBtn: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  actionBtnText: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '600',
    color: colors.ring,
  },
  shareBtnText: {
    color: colors.white,
  },
});
