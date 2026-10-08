import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppLanguage } from '@hooks';
import colors, { cardGradients } from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import { RootStackParamList } from '@navigation/types';
import { Festival } from '@api/festivalApi';
import imagePath from '@assets/index';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedButton from '@components/AnimatedButton';
import FestivalModal from '@components/FestivalModal';
import Skeleton from '@components/Skeleton';

// M4: Extracted helper to avoid duplicated image resolution logic
const resolveImageSource = (rawImage: any) => {
  if (typeof rawImage === 'string' && rawImage.trim().length > 0)
    return { uri: rawImage.trim() };
  if (
    typeof rawImage === 'number' ||
    (rawImage && typeof rawImage === 'object' && (rawImage as any).uri)
  )
    return rawImage;
  return imagePath.fallBackImage;
};

// L4: Proper component prop types
interface FestivalHighlightCardProps {
  item: Festival;
  onPress: (item: Festival) => void;
}

const FestivalHighlightCard: React.FC<FestivalHighlightCardProps> = React.memo(
  ({ item, onPress }) => {
    const { select } = useAppLanguage();
    const name = select(item.hindiName, item.englishName);
    const dateStr = select(item.dateStrHi, item.dateStrEn);

    // M4: Use extracted helper — no duplication between useState init and useEffect
    const [imgSrc, setImgSrc] = React.useState(() =>
      resolveImageSource(item.image),
    );

    React.useEffect(() => {
      setImgSrc(resolveImageSource(item.image));
    }, [item.image]);

    return (
      <AnimatedButton
        style={styles.cardContainer}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
      >
        <ImageBackground
          source={imgSrc || imagePath.fallBackImage}
          style={styles.card}
          imageStyle={styles.cardImageStyle}
          resizeMode="cover"
          fadeDuration={0}
          onError={() => setImgSrc(imagePath.fallBackImage)}
        >
          {/* Gradient overlay pinned to bottom */}
          <LinearGradient
            colors={cardGradients.festivalCard}
            style={styles.cardOverlay}
          >
            <View style={styles.contentWrapper}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {name}
              </Text>
              {dateStr ? (
                <Text
                  style={styles.date}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dateStr}
                </Text>
              ) : null}
            </View>
          </LinearGradient>
        </ImageBackground>
      </AnimatedButton>
    );
  },
);

FestivalHighlightCard.displayName = 'FestivalHighlightCard';

// L4: Typed prop interface for FestivalHighlights
interface FestivalHighlightsProps {
  festivals?: Festival[];
  onPress?: (festival: Festival) => void;
}

const FestivalHighlights: React.FC<FestivalHighlightsProps> = ({
  festivals = [],
  onPress,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, select } = useAppLanguage();

  // H1: festivals now received as prop from HomeScreen — no local fetch needed
  const loading = festivals.length === 0;

  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null,
  );

  const { today, todayStart } = useMemo(() => {
    const tDate = new Date();
    const ts = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());
    return { today: tDate, todayStart: ts };
  }, []);

  const filteredFestivals = useMemo(() => {
    const todayNum = todayStart.getTime();

    const toDate = (item: Festival) =>
      new Date(today.getFullYear(), item.month - 1, item.day).getTime();

    // 1. Upcoming festivals from today onwards (sorted chronologically)
    const upcoming = (festivals || [])
      .filter((item: Festival) => toDate(item) >= todayNum)
      .sort((a, b) =>
        a.month !== b.month ? a.month - b.month : a.day - b.day,
      );

    if (upcoming.length >= 10) {
      return upcoming.slice(0, 10);
    }

    // 2. Wrap-around earlier festivals in the year to ensure 10 items if available
    const earlier = (festivals || [])
      .filter((item: Festival) => toDate(item) < todayNum)
      .sort((a, b) =>
        a.month !== b.month ? a.month - b.month : a.day - b.day,
      );

    return [...upcoming, ...earlier].slice(0, 10);
  }, [festivals, today, todayStart]);

  // Already sliced to 10 in filteredFestivals — direct display
  const paginatedFestivals = filteredFestivals;

  // H4: Single typed navigation call — no triple try/catch
  const handlePressAll = () => {
    navigation.navigate('BottomTabs', { screen: 'Calendar' });
  };

  // L3: renderFooter removed — always returned null and was unused

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map(item => (
        <View key={item} style={styles.skeletonCard}>
          <Skeleton
            width={scale(130)}
            height={scale(120)}
            borderRadius={scale(15)}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.FESTIVAL_HIGHLIGHTS)}</Text>
        <Pressable
          hitSlop={{ top: 16, bottom: 16, left: 24, right: 24 }}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={handlePressAll}
        >
          <Text style={styles.allText}>{t(Translation.ALL)}</Text>
        </Pressable>
      </View>

      {loading || !festivals || festivals.length === 0 ? (
        renderSkeleton()
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          data={paginatedFestivals}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({ item }) => (
            <FestivalHighlightCard
              item={item}
              onPress={selected => {
                setSelectedFestival(selected);
                if (onPress) onPress(selected);
              }}
            />
          )}
        />
      )}

      <FestivalModal
        visible={selectedFestival !== null}
        festival={selectedFestival}
        onClose={() => setSelectedFestival(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
    paddingHorizontal: scale(4),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  allText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    letterSpacing: 1,
  },
  listContent: {
    // L3: removed — FlatList had no contentContainerStyle using this
  },
  skeletonContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(4),
    paddingBottom: scale(10),
  },
  skeletonCard: {
    marginRight: scale(12),
  },
  // L3: footerSkeleton removed — unused style
  cardContainer: {
    marginRight: scale(12),
    width: scale(130),
    height: scale(120),
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
    elevation: 3,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: scale(14),
  },
  cardOverlay: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    padding: scale(10),
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
  date: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    opacity: 0.88,
    marginTop: scale(2),
  },
  countdown: {
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.accentPeach,
  },
  icon: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.accentPeach,
  },
});

export default React.memo(FestivalHighlights);
