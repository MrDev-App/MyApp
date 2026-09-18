import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppLanguage } from '@hooks';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';
import { RootStackParamList } from '@navigation/types';
import { navigate } from '@navigation/navigationRef';
import {
  useAppDispatch,
  useAppSelector,
  fetchFestivals,
  RootState,
  Festival,
} from '../../../redux';
import imagePath from '@assets/index';
import AnimatedButton from '@components/AnimatedButton';
import FestivalModal from '@components/FestivalModal';
import Skeleton from '@components/Skeleton';

const FestivalHighlights = ({ onPress }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, select } = useAppLanguage();
  const dispatch = useAppDispatch();

  // Read festivals and loading state from Redux
  const { festivals, loading } = useAppSelector(
    (state: RootState) => state.festival,
  );

  console.log('fetivalssssssASk :', festivals);

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

  console.log('paginatedFestivals', paginatedFestivals);

  const handlePressAll = () => {
    try {
      (navigation as any).navigate('Calendar');
    } catch {}
    try {
      (navigation as any).navigate('BottomTabs', { screen: 'Calendar' });
    } catch {}
    try {
      navigate('BottomTabs', { screen: 'Calendar' });
    } catch {}
  };

  const renderFooter = () => {
    // Hard cap at 10 on home screen — no load-more footer needed
    return null;
  };

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map(item => (
        <View key={item} style={styles.skeletonCard}>
          <Skeleton
            width={scale(124)}
            height={scale(105)}
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
          removeClippedSubviews={Platform.OS === 'android'}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const name = select(item.hindiName, item.englishName);
            const dateStr = select(item.dateStrHi, item.dateStrEn);

            const bgImage = item.image || imagePath.greeting;

            // 🔍 COMPARISON: Firestore url / imageUrl vs what's actually being rendered
            const rawFirestoreUrl = item.url || item.imageUrl || '';
            console.log(
              `\n📸 [FestivalHighlights] ===== ${item.englishName} =====`,
            );
            console.log(`   💾 Firestore url      : ${item.url || '(none)'}`);
            console.log(
              `   💾 Firestore imageUrl : ${item.imageUrl || '(none)'}`,
            );
            console.log(
              `   🎨 Resolved image    : ${
                typeof bgImage === 'number'
                  ? '✅ local-require (' + bgImage + ')'
                  : bgImage && bgImage.uri
                  ? `🌐 uri: ${bgImage.uri}`
                  : JSON.stringify(bgImage)
              }`,
            );
            console.log(
              `   ${
                rawFirestoreUrl &&
                bgImage &&
                bgImage.uri &&
                bgImage.uri === rawFirestoreUrl
                  ? '✅ MATCH (using Firestore url)'
                  : typeof bgImage === 'number'
                  ? '🟡 Using local bundled image'
                  : '❌ MISMATCH or missing url'
              }`,
            );

            return (
              <AnimatedButton
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedFestival(item);
                  if (onPress) onPress(item);
                }}
              >
                <ImageBackground
                  source={bgImage}
                  style={styles.card}
                  imageStyle={styles.cardImageStyle}
                  fadeDuration={0}
                >
                  {/* Gradient overlay pinned to bottom */}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.78)']}
                    style={styles.cardOverlay}
                  >
                    <Text style={styles.name} numberOfLines={1}>
                      {name}
                    </Text>
                    <Text style={styles.date}>{dateStr}</Text>
                  </LinearGradient>
                </ImageBackground>
              </AnimatedButton>
            );
          }}
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
    paddingHorizontal: scale(4),
    paddingBottom: scale(10),
  },
  skeletonContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(4),
    paddingBottom: scale(10),
  },
  skeletonCard: {
    marginRight: scale(12),
  },
  footerSkeleton: {
    marginRight: scale(12),
  },
  cardContainer: {
    marginRight: scale(12),
    width: scale(124),
    height: scale(105),
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(10),
    paddingTop: scale(18),
    paddingBottom: scale(10),
    borderBottomLeftRadius: scale(14),
    borderBottomRightRadius: scale(14),
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
  date: {
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    opacity: 0.85,
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
