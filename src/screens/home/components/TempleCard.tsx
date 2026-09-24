import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { AnimatedListItem } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import { LocationIcon } from '@components/icons/SvgIcons';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { TempleItem } from '@constants/templesData';

interface TempleAvatarProps {
  source: any;
}

const TempleAvatar: React.FC<TempleAvatarProps> = React.memo(({ source }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.avatarWrapper}>
      {imageLoading && (
        <View style={styles.avatarLoaderWrapper}>
          <LottieView
            source={imagePath.loading}
            autoPlay
            loop
            style={styles.avatarLottie}
          />
        </View>
      )}
      <Image
        source={typeof source === 'string' ? { uri: source } : source}
        style={styles.avatarImage}
        resizeMode="cover"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
    </View>
  );
});

TempleAvatar.displayName = 'TempleAvatar';

export interface TempleCardProps {
  item: TempleItem;
  index: number;
  onPress: (temple: TempleItem) => void;
}

export const TempleCard: React.FC<TempleCardProps> = ({
  item,
  index,
  onPress,
}) => {
  const { t, isHindi } = useAppLanguage();

  const name = isHindi ? item.nameHi : item.nameEn;
  const location = isHindi ? item.locationHi : item.locationEn;
  const deity = isHindi ? item.deityHi : item.deityEn;
  const significance = isHindi ? item.significanceHi : item.significanceEn;

  const handlePress = () => {
    triggerHaptic();
    onPress(item);
  };

  return (
    <AnimatedListItem index={index} delayStep={40}>
      <TouchableOpacity
        style={styles.templeCard}
        activeOpacity={0.88}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        <View style={styles.cardHeaderRow}>
          {item.image && <TempleAvatar source={item.image} />}

          <View style={styles.headerTextCol}>
            <Text style={styles.templeName} numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.locationBadgeRow}>
              <LocationIcon size={scale(12)} color={colors.ring} />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.deityTagRow}>
          <Text style={styles.deityTagText}>
            {t(Translation.TEMPLE_DEITY_LABEL)}
            <Text style={styles.deityNameText}>
              {deity}
            </Text>
          </Text>
        </View>

        <View style={styles.significanceBox}>
          <Text style={styles.significanceText} numberOfLines={2}>
            {significance}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>
            {t(Translation.TEMPLE_VIEW_DETAILS_ACTION)}
          </Text>
        </View>
      </TouchableOpacity>
    </AnimatedListItem>
  );
};

export default React.memo(TempleCard);

const styles = StyleSheet.create({
  templeCard: {
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(16),
    marginBottom: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  avatarWrapper: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: colors.accentOrangeLight,
    borderWidth: 1.5,
    borderColor: colors.ring,
    overflow: 'hidden',
    marginRight: scale(12),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLoaderWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentOrangeLight,
    zIndex: 1,
  },
  avatarLottie: {
    width: scale(36),
    height: scale(36),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTextCol: {
    flex: 1,
  },
  templeName: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    fontWeight: '700',
    color: colors.secondary,
  },
  locationBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(3),
    gap: scale(4),
  },
  locationText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.warmTaupe,
  },
  deityTagRow: {
    backgroundColor: colors.accentOrangeLight,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    alignSelf: 'flex-start',
    marginBottom: scale(8),
  },
  deityTagText: {
    fontSize: fs(11.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  deityNameText: {
    color: colors.secondary,
    fontWeight: '700',
  },
  significanceBox: {
    marginBottom: scale(10),
  },
  significanceText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(19),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  cardFooterText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '600',
  },
});
