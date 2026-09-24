import React, { useMemo, useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import imagePath, { FoldedHands } from '@assets/index';
import { TagIcon, LocationIcon, PinIcon } from '@components/icons/SvgIcons';
import { ScreenHeader, GradientBackground } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';
import { triggerHaptic } from '@helper/helper';
import LottieView from 'lottie-react-native';

type TempleDetailRouteProp = RouteProp<
  RootStackParamList,
  'TempleDetailScreen'
>;

export const TempleDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<TempleDetailRouteProp>();
  const navigation = useNavigation<any>();
  const { t, isHindi } = useAppLanguage();
  const [imageLoading, setImageLoading] = useState(true);

  const temple = route.params?.temple;

  const handleBack = useCallback(() => {
    triggerHaptic();
    navigation.goBack();
  }, [navigation]);

  const templeData = useMemo(() => {
    if (!temple) return null;

    return {
      name: isHindi ? temple.nameHi : temple.nameEn,
      location: isHindi ? temple.locationHi : temple.locationEn,
      state: isHindi ? temple.stateHi : temple.stateEn,
      deity: isHindi ? temple.deityHi : temple.deityEn,
      significance: isHindi ? temple.significanceHi : temple.significanceEn,
      timing: isHindi ? temple.timingHi : temple.timingEn,
      description: isHindi ? temple.descriptionHi : temple.descriptionEn,
      nearbyAttractions: isHindi
        ? temple.nearbyAttractionsHi
        : temple.nearbyAttractionsEn,
      yuga: isHindi ? temple.yugaHi : temple.yugaEn,
      direction: isHindi ? temple.directionHi : temple.directionEn,
    };
  }, [temple, isHindi]);

  const imageSource = useMemo(() => {
    if (!temple) return imagePath.greeting;
    if (temple.image) {
      return typeof temple.image === 'string'
        ? { uri: temple.image }
        : temple.image;
    }
    if (temple.imageUrl) {
      return { uri: temple.imageUrl };
    }
    return imagePath.greeting;
  }, [temple]);

  if (!temple || !templeData) {
    return (
      <GradientBackground>
        <SafeAreaView
          style={[styles.container, styles.center]}
          edges={['top', 'bottom']}
        >
          <Text style={styles.errorText}>
            {t(Translation.TEMPLE_NOT_FOUND)}
          </Text>
          <TouchableOpacity
            style={styles.backBtnFallback}
            onPress={handleBack}
            activeOpacity={0.85}
          >
            <Text style={styles.backBtnFallbackText}>
              {t(Translation.COMMON_GO_BACK)}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  const {
    name,
    location,
    state,
    deity,
    significance,
    timing,
    description,
    nearbyAttractions,
    yuga,
    direction,
  } = templeData;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Top Header with Back Button & Temple Name */}
        <ScreenHeader title={name} onBack={handleBack} />

        {/* Content Scroll View */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(32) },
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
        >
          {/* Hero Image */}
          <View style={styles.heroImageContainer}>
            {imageLoading && (
              <View style={styles.imageLoader}>
                <LottieView
                  source={imagePath.loading}
                  autoPlay
                  loop
                  style={styles.lottieLoader}
                />
              </View>
            )}
            <Image
              source={imageSource}
              style={styles.templeImage}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </View>

          <View style={styles.detailsBody}>
            {/* Meta Badges Row */}
            <View style={styles.metaRow}>
              {yuga ? (
                <View style={styles.metaBadge}>
                  <TagIcon size={scale(11)} color={colors.ring} />
                  <Text style={styles.metaBadgeText}>{yuga}</Text>
                </View>
              ) : null}

              {direction ? (
                <View style={styles.metaBadge}>
                  <PinIcon size={scale(11)} color={colors.ring} />
                  <Text style={styles.metaBadgeText}>{direction}</Text>
                </View>
              ) : null}

              {temple.isCharDham ? (
                <View style={[styles.metaBadge, styles.highlightBadge]}>
                  <Text style={styles.highlightBadgeText}>
                    {t(Translation.TEMPLE_BADGE_CHARDHAM)}
                  </Text>
                </View>
              ) : null}

              {temple.isJyotirlinga ? (
                <View style={[styles.metaBadge, styles.highlightBadge]}>
                  <Text style={styles.highlightBadgeText}>
                    {t(Translation.TEMPLE_BADGE_JYOTIRLINGA)}
                  </Text>
                </View>
              ) : null}

              {temple.isShaktipeeth ? (
                <View style={[styles.metaBadge, styles.highlightBadge]}>
                  <Text style={styles.highlightBadgeText}>
                    {t(Translation.TEMPLE_BADGE_SHAKTIPEETH)}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Location Row */}
            <View style={styles.sectionRow}>
              <LocationIcon size={scale(15)} color={colors.ring} />
              <Text style={styles.sectionLabel}>
                {t(Translation.TEMPLE_LOCATION_LABEL)}:{' '}
                <Text style={styles.sectionValue}>
                  {location}
                  {state && !location.includes(state) ? `, ${state}` : ''}
                </Text>
              </Text>
            </View>

            {/* Presiding Deity Row */}
            <View style={styles.sectionRow}>
              <FoldedHands width={scale(15)} height={scale(15)} />
              <Text style={styles.sectionLabel}>
                {t(Translation.TEMPLE_PRESIDING_DEITY_LABEL)}:{' '}
                <Text style={styles.sectionValue}>{deity}</Text>
              </Text>
            </View>

            {/* Darshan Timings Row */}
            {timing ? (
              <View style={styles.sectionRow}>
                <Image
                  source={imagePath.calendar}
                  style={styles.timingIcon}
                  resizeMode="contain"
                />
                <Text style={styles.sectionLabel}>
                  {t(Translation.TEMPLE_DARSHAN_TIMINGS_LABEL)}:{' '}
                  <Text style={styles.sectionValue}>{timing}</Text>
                </Text>
              </View>
            ) : null}

            {/* Significance Section */}
            {significance ? (
              <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>
                  {t(Translation.TEMPLE_SIGNIFICANCE_LABEL)}
                </Text>
                <Text style={styles.infoCardText}>{significance}</Text>
              </View>
            ) : null}

            {/* Detailed History & Puranic Story */}
            {description ? (
              <View style={styles.storyContainer}>
                <Text style={styles.storySectionTitle}>
                  {t(Translation.TEMPLE_ABOUT_HISTORY_LABEL)}
                </Text>
                <Text style={styles.storyText}>{description}</Text>
              </View>
            ) : null}

            {/* Nearby Attractions */}
            {nearbyAttractions ? (
              <View style={styles.nearbyContainer}>
                <View style={styles.nearbyHeaderRow}>
                  <PinIcon size={scale(14)} color={colors.ring} />
                  <Text style={styles.nearbyTitle}>
                    {t(Translation.TEMPLE_NEARBY_PLACES_LABEL)}
                  </Text>
                </View>
                <Text style={styles.nearbyText}>{nearbyAttractions}</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default React.memo(TempleDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  errorText: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: scale(16),
  },
  backBtnFallback: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },
  backBtnFallbackText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
  heroImageContainer: {
    width: '100%',
    height: scale(250),
    backgroundColor: colors.accentOrangeLight,
    position: 'relative',
    overflow: 'hidden',
  },
  imageLoader: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentOrangeLight,
    zIndex: 1,
  },
  lottieLoader: {
    width: scale(60),
    height: scale(60),
  },
  templeImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: scale(4),
  },
  detailsBody: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginBottom: scale(14),
  },
  metaBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 1,
  },
  highlightBadge: {
    backgroundColor: colors.accentOrangeSubtle,
    borderWidth: 1,
    borderColor: colors.ring,
  },
  highlightBadgeText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  metaBadgeText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    marginBottom: scale(11),
  },
  timingIcon: {
    width: scale(14),
    height: scale(14),
    tintColor: colors.ring,
    marginTop: scale(2),
  },
  sectionLabel: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    flex: 1,
    lineHeight: fs(19),
    fontWeight: '600',
  },
  sectionValue: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '400',
  },
  infoCard: {
    marginTop: scale(10),
    padding: scale(14),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(4),
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginBottom: scale(6),
    fontWeight: '700',
  },
  infoCardText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.charcoal,
    lineHeight: fs(20),
  },
  storyContainer: {
    marginTop: scale(14),
    padding: scale(14),
    backgroundColor: colors.white,
    borderRadius: scale(14),
    borderLeftWidth: 4,
    borderLeftColor: colors.ring,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.cardOverlay,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(4),
    elevation: 2,
  },
  storySectionTitle: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginBottom: scale(8),
    fontWeight: '700',
  },
  storyText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(21),
  },
  nearbyContainer: {
    marginTop: scale(14),
    padding: scale(14),
    backgroundColor: colors.accentOrangeLight,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: colors.bannerBorderOrangeLight,
  },
  nearbyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: scale(6),
  },
  nearbyTitle: {
    fontSize: fs(13.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  nearbyText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(20),
  },
});
