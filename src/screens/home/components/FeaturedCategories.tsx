import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppLanguage } from '@hooks';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import AnimatedButton from '@components/AnimatedButton';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import { RootNavigationProp } from '@navigation/types';

interface FeaturedCategoryItem {
  id: string;
  titleKey: string;
  type: 'lottie' | 'image';
  icon: any;
  route: 'AllArtiScreen' | 'ShlokScreen' | 'TempleScreen';
}

const FEATURED_ITEMS: FeaturedCategoryItem[] = [
  {
    id: 'aarti',
    titleKey: Translation.FEATURED_AARTI_TITLE,
    type: 'lottie',
    icon: imagePath.lampLottie,
    route: 'AllArtiScreen',
  },
  {
    id: 'shlok',
    titleKey: Translation.FEATURED_SHLOK_TITLE,
    type: 'image',
    icon: imagePath.shlok,
    route: 'ShlokScreen',
  },
  {
    id: 'temples',
    titleKey: Translation.FEATURED_TEMPLES_TITLE,
    type: 'image',
    icon: imagePath.temples,
    route: 'TempleScreen',
  },
];

const FeaturedCategories = () => {
  const { t } = useAppLanguage();
  const navigation = useNavigation<RootNavigationProp>();

  const handleCardPress = (item: FeaturedCategoryItem) => {
    navigation.navigate(item.route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.FEATURED_CATEGORIES)}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FEATURED_ITEMS.map(item => {
          const title = t(item.titleKey);

          return (
            <AnimatedButton
              activeOpacity={0.8}
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item)}
            >
              <View style={styles.iconContainer} pointerEvents="none">
                {item.type === 'lottie' ? (
                  <LottieView
                    source={item.icon}
                    autoPlay
                    loop
                    resizeMode="contain"
                    style={{ height: scale(65), width: scale(65) }}
                  />
                ) : (
                  <Image
                    source={item.icon}
                    style={{ height: scale(60), width: scale(60) }}
                    resizeMode="contain"
                  />
                )}
              </View>

              <Text
                style={styles.cardTitle}
                numberOfLines={1}
                pointerEvents="none"
              >
                {title}
              </Text>
            </AnimatedButton>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(FeaturedCategories);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  title: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: scale(16),
    paddingHorizontal: scale(4),
  },
  scrollContent: {
    paddingHorizontal: scale(4),
    paddingRight: scale(16),
    paddingVertical: scale(6),
    gap: scale(10),
  },
  card: {
    width: scale(108),
    backgroundColor: 'transparent',
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(4),
  },
  iconContainer: {
    width: scale(56),
    height: scale(65),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(5),
  },
  cardTitle: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
  },
});
