import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  SunriseIcon,
  ShieldCrossIcon,
  CoinsIcon,
  BookStudyIcon,
  HomeFamilyIcon,
  ChildrenIcon,
  HeartIcon,
  OmIcon,
} from '@components/icons/SvgIcons';

export interface ShlokaCategoryBannerProps {
  slug?: string;
  description?: string;
}

export const ShlokaCategoryBanner: React.FC<ShlokaCategoryBannerProps> = ({
  slug = 'through-the-day',
  description,
}) => {
  const cleanSlug = useMemo(
    () => slug.replace('occasion-', ''),
    [slug],
  );

  const categoryIcon = useMemo(() => {
    const iconSize = scale(24);

    switch (cleanSlug) {
      case 'through-the-day':
        return <SunriseIcon size={iconSize} color={colors.categoryAmber} />;
      case 'health-and-protection':
        return <ShieldCrossIcon size={iconSize} color={colors.categoryEmerald} />;
      case 'money-work-studies':
        return <CoinsIcon size={iconSize} color={colors.categoryBronze} />;
      case 'study-success':
        return <BookStudyIcon size={iconSize} color={colors.categoryBlue} />;
      case 'home-and-family':
        return <HomeFamilyIcon size={iconSize} color={colors.categoryEmerald} />;
      case 'children':
        return <ChildrenIcon size={iconSize} color={colors.categoryBrown} />;
      case 'mind-and-heart':
        return <HeartIcon size={iconSize} color={colors.categoryRed} />;
      case 'spiritual-path':
        return <OmIcon size={iconSize} color={colors.categoryBronze} />;
      default:
        return <SunriseIcon size={iconSize} color={colors.categoryAmber} />;
    }
  }, [cleanSlug]);

  return (
    <View style={styles.headerBanner}>
      <View style={styles.bannerTitleRow}>{categoryIcon}</View>
      {description ? (
        <Text style={styles.bannerDesc}>{description}</Text>
      ) : null}
    </View>
  );
};

export default React.memo(ShlokaCategoryBanner);

const styles = StyleSheet.create({
  headerBanner: {
    paddingVertical: scale(12),
    marginBottom: scale(14),
  },
  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(6),
  },
  bannerDesc: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
    lineHeight: fs(18),
  },
});
