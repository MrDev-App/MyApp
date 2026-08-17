import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { RootStackParamList } from '../../../navigation/type';
import { festivalData, Festival } from './festivalData';
import imagePath from '../../../assets';
import AnimatedButton from '../../../components/AnimatedButton';
import OverlayModal, {
  OverlayModalHandle,
} from '../../../components/OverlayModal';
import GradientOverlay from '../../../components/GradientOverlay';

const FestivalHighlights = ({ onPress }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const overlayModalRef = useRef<OverlayModalHandle>(null);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null,
  );

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  // Filter festivals from the current month to the end of the year, sorted chronologically
  const filteredFestivals = festivalData
    .filter(item => item.month >= currentMonth)
    .sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.day - b.day;
    });

  const calculateDaysRemaining = (month: number, day: number) => {
    const currentYear = today.getFullYear();
    let festivalDate = new Date(currentYear, month - 1, day);

    // If the festival has passed this year, roll it over to next year
    if (festivalDate.getTime() < today.getTime()) {
      festivalDate = new Date(currentYear + 1, month - 1, day);
    }

    const diffTime = festivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.FESTIVAL_HIGHLIGHTS)}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AllFestivals')}
        >
          <Text style={styles.allText}>{t(Translation.ALL)}</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal FlatList */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredFestivals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const daysLeft = calculateDaysRemaining(item.month, item.day);
          const name =
            currentLanguage === 'hi' ? item.hindiName : item.englishName;
          const dateStr =
            currentLanguage === 'hi' ? item.dateStrHi : item.dateStrEn;
          const iconPrefix = item.icon ? `${item.icon} ` : '';
          const countdownText =
            currentLanguage === 'hi'
              ? `${daysLeft} दिनों में`
              : `in ${daysLeft} days `;

          // Select background image based on festival id, using greeting as fallback
          const bgImage = item.image || imagePath.greeting;

          return (
            <AnimatedButton
              style={styles.cardContainer}
              onPress={(event: GestureResponderEvent) => {
                const { pageX, pageY } = event.nativeEvent;
                setSelectedFestival(item);
                overlayModalRef.current?.open({ x: pageX, y: pageY });
                if (onPress) onPress(item);
              }}
            >
              <ImageBackground
                source={bgImage}
                style={styles.card}
                imageStyle={styles.cardImageStyle}
                fadeDuration={0}
              >
                <View style={styles.cardOverlay}>
                  <Text style={styles.name}>{name}</Text>

                  <View style={{}}>
                    <Text style={styles.date}>{dateStr}</Text>
                    <Text style={styles.countdown}>{countdownText}</Text>
                  </View>
                </View>
              </ImageBackground>
            </AnimatedButton>
          );
        }}
      />

      {/* Festival Detail Modal */}
      <OverlayModal
        ref={overlayModalRef}
        closeOnBackdropPress={true}
        onClose={() => setSelectedFestival(null)}
      >
        {selectedFestival && (
          <View style={styles.modalContainer}>
            <ImageBackground
              source={selectedFestival.image || imagePath.greeting}
              style={styles.modalBg}
              imageStyle={styles.modalBgImage}
              fadeDuration={0}
            >
              <GradientOverlay
                colors={[
                  colors.overlayStart,
                  colors.overlayMid,
                  colors.overlayEnd,
                ]}
                direction="bottom-to-top"
              />
              <SafeAreaView style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => overlayModalRef.current?.close()}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {selectedFestival.category}
                  </Text>
                </View>
              </SafeAreaView>

              <View style={styles.modalHero}>
                <Text style={styles.modalTitleText}>
                  {currentLanguage === 'hi'
                    ? selectedFestival.hindiName
                    : selectedFestival.englishName}
                </Text>
                <Text style={styles.modalDateText}>
                  {currentLanguage === 'hi'
                    ? selectedFestival.dateStrHi
                    : selectedFestival.dateStrEn}
                </Text>
              </View>
            </ImageBackground>

            <ScrollView
              style={styles.modalDetailsScroll}
              contentContainerStyle={styles.modalDetailsContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.detailRow}>
                <View style={styles.detailCard}>
                  <Text style={styles.detailLabel}>
                    {t(Translation.TITHI_TIME_LABEL)}
                  </Text>
                  <Text style={styles.detailValue}>
                    {selectedFestival.tithi}
                  </Text>
                </View>

                <View style={[styles.detailCard]}>
                  <Text style={styles.detailLabel}>
                    {t(Translation.COUNTDOWN_LABEL)}
                  </Text>
                  <Text
                    style={[
                      styles.detailValue,
                      { color: colors.ring, fontFamily: fonts.PoppinsSemiBold },
                    ]}
                  >
                    {t(Translation.DAYS_LEFT_LABEL, {
                      count: calculateDaysRemaining(
                        selectedFestival.month,
                        selectedFestival.day,
                      ),
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>
                  {t(Translation.ASSOCIATED_DEITY_LABEL)}
                </Text>
                <View style={styles.chipsContainer}>
                  {selectedFestival.deity.map((d, i) => (
                    <View key={i} style={styles.chip}>
                      <Text style={styles.chipText}>{d}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {selectedFestival.regions &&
                selectedFestival.regions.length > 0 && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>
                      {t(Translation.KEY_REGIONS_LABEL)}
                    </Text>
                    <View style={styles.chipsContainer}>
                      {selectedFestival.regions.map((r, i) => (
                        <View
                          key={i}
                          style={[
                            styles.chip,
                            { backgroundColor: colors.chipBg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              { color: colors.chipText },
                            ]}
                          >
                            {r}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

              <View style={styles.descriptionCard}>
                <Text style={styles.descriptionTitle}>
                  {t(Translation.SIGNIFICANCE_HISTORY_LABEL)}
                </Text>
                <Text style={styles.descriptionText}>
                  {selectedFestival.description}
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </OverlayModal>
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
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  allText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: scale(4),
    paddingBottom: scale(10),
  },
  cardContainer: {
    marginRight: scale(12),
    width: scale(124),
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.15)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    height: '100%',
    justifyContent: 'space-between',
    minHeight: scale(105),
  },
  name: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
  date: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsRegular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  countdown: {
    fontSize: fs(9.5),
    fontFamily: fonts.PoppinsMedium,
    color: '#FFE0B2', // Soft premium gold color
  },
  icon: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: '#FFE0B2',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  modalBg: {
    width: '100%',
    height: scale(260),
    justifyContent: 'space-between',
  },
  modalBgImage: {
    resizeMode: 'cover',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginTop: scale(10),
  },
  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: colors.white,
    fontSize: fs(16),
    fontWeight: 'bold',
  },
  categoryBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
  },
  categoryBadgeText: {
    color: colors.white,
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
    textTransform: 'uppercase',
  },
  modalHero: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
    zIndex: 10,
  },
  modalTitleText: {
    fontSize: fs(28),
    fontFamily: fonts.Marcellus,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  modalDateText: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: '#FFE0B2',
    marginTop: scale(4),
  },
  modalDetailsScroll: {
    flex: 1,
    marginTop: scale(-15),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    backgroundColor: '#FAFAF9',
  },
  modalDetailsContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(24),
    paddingBottom: scale(40),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(24),
  },
  detailCard: {
    width: '48%',
    // backgroundColor: colors.white,
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    // borderWidth: 1,
    // borderColor: 'rgba(183, 168, 151, 0.12)',
    // shadowColor: colors.ring,
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.04,
    // shadowRadius: 6,
    // elevation: 2,
  },
  detailLabel: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    marginBottom: scale(4),
  },
  detailValue: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  infoSection: {
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(10),
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: 'rgba(251, 148, 55, 0.08)',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginRight: scale(8),
    marginBottom: scale(8),
  },
  chipText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  descriptionCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.12)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginTop: scale(8),
  },
  descriptionTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(8),
  },
  descriptionText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(18),
  },
});

export default FestivalHighlights;
