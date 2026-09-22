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
  titleHi: string;
  titleEn: string;
  type: 'lottie' | 'image';
  icon: any;
  route: 'AllArtiScreen' | 'ShlokScreen' | 'TempleScreen';
}

const FEATURED_ITEMS: FeaturedCategoryItem[] = [
  {
    id: 'aarti',
    titleHi: 'आरती संग्रह',
    titleEn: 'Aarti Sangrah',
    type: 'lottie',
    icon: imagePath.lampLottie,
    route: 'AllArtiScreen',
  },
  {
    id: 'shlok',
    titleHi: 'श्लोक संग्रह',
    titleEn: 'Sacred Shlokas',
    type: 'image',
    icon: imagePath.shlok,
    route: 'ShlokScreen',
  },
  {
    id: 'temples',
    titleHi: 'प्रमुख मंदिर',
    titleEn: "India's Temples",
    type: 'image',
    icon: imagePath.temples,
    route: 'TempleScreen',
  },
];

const FeaturedCategories = () => {
  const { t, currentLanguage } = useAppLanguage();
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
          const title = currentLanguage === 'hi' ? item.titleHi : item.titleEn;

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
    paddingVertical: scale(10),
  },
  card: {
    width: scale(155),
    backgroundColor: 'transparent',
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
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
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
  },
});
