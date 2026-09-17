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
  getFestivalData,
  getLocalFestivalsFallback,
  Festival,
} from '@services/festivalService';
import imagePath from '@assets/index';
import AnimatedButton from '@components/AnimatedButton';
import FestivalModal from '@components/FestivalModal';
import Skeleton from '@components/Skeleton';

const FestivalHighlights = ({ onPress }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, select } = useAppLanguage();

  const [festivals, setFestivals] = useState<Festival[]>(() =>
    getLocalFestivalsFallback(),
  );
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await getFestivalData();
        if (isMounted && data.length > 0) {
          setFestivals(data);
        }
      } catch (error) {
        console.error('Error fetching festivals in FestivalHighlights:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [festivals]);

  const { today, todayStart } = useMemo(() => {
    const tDate = new Date();
    const ts = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());
    return { today: tDate, todayStart: ts };
  }, []);

  const filteredFestivals = useMemo(() => {
    const upcoming = festivals
      .filter(item => {
        const festivalDateThisYear = new Date(
          today.getFullYear(),
          item.month - 1,
          item.day,
        );
        return festivalDateThisYear.getTime() >= todayStart.getTime();
      })
      .sort((a, b) => {
        if (a.month !== b.month) {
          return a.month - b.month;
        }
        return a.day - b.day;
      });

    if (upcoming.length > 0) {
      return upcoming;
    }

    // Fallback if no upcoming festivals left in current year: wrap around
    return [...festivals].sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });
  }, [festivals, today, todayStart]);

  const paginatedFestivals = useMemo(() => {
    return filteredFestivals.slice(0, page * PAGE_SIZE);
  }, [filteredFestivals, page]);

  const handleEndReached = () => {
    if (paginatedFestivals.length < filteredFestivals.length) {
      setPage(prev => prev + 1);
    }
  };

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
    if (paginatedFestivals.length >= filteredFestivals.length) {
      return null;
    }
    return (
      <View style={styles.footerSkeleton}>
        <Skeleton
          width={scale(124)}
          height={scale(105)}
          borderRadius={scale(15)}
        />
      </View>
    );
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
          <Text style={styles.allText} pointerEvents="none">
            {t(Translation.ALL)}
          </Text>
        </Pressable>
      </View>

      {loading ? (
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
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => {
            const name = select(item.hindiName, item.englishName);
            const dateStr = select(item.dateStrHi, item.dateStrEn);

            const bgImage = item.image || imagePath.greeting;

            return (
              <AnimatedButton
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedFestival(item);
                  if (onPress) onPress(item);
                }}
              >
                <View style={{ flex: 1 }}>
                  <ImageBackground
                    source={bgImage}
                    style={styles.card}
                    imageStyle={styles.cardImageStyle}
                    fadeDuration={0}
                  >
                    <View style={styles.cardOverlay}>
                      <Text style={styles.name}>{name}</Text>
                      <Text style={styles.date}>{dateStr}</Text>
                    </View>
                  </ImageBackground>
                </View>
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
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
    elevation: 3,
    backgroundColor: colors.white,
  },
  card: {
    flex: 1,
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  cardImageStyle: {
    borderRadius: scale(14),
  },
  cardOverlay: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    height: '100%',
    minHeight: scale(105),
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
  },
  date: {
    fontSize: fs(9.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
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
