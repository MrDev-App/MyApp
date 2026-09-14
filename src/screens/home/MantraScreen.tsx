import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  GestureResponderEvent,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Back } from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { God, GodMantra } from '@services/godService';
import { useAutoScroll } from '@hooks/useAutoScroll';

const MantraScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isHindi = currentLanguage.startsWith('hi');

  const initialGod: God | undefined = route.params?.god;
  const allGods: God[] =
    route.params?.allGods || (initialGod ? [initialGod] : []);

  const [selectedGod, setSelectedGod] = useState<God | undefined>(
    initialGod || allGods[0],
  );
  const [selectedMantra, setSelectedMantra] = useState<GodMantra | null>(null);

  const deityListRef = useRef<FlatList<God>>(null);
  const [deityContainerWidth, setDeityContainerWidth] = useState(0);
  const [deityContentWidth, setDeityContentWidth] = useState(0);
  const isPaused = useRef(false);
  const isDraggingList = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchDownInfo = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const lastSelectedGodId = useRef<string | null>(null);
  const lastSelectTime = useRef<number>(0);

  const restartAutoScrollAfterDelay = (delayMs = 1500) => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
    resumeTimer.current = setTimeout(() => {
      if (selectedMantra === null && !isDraggingList.current) {
        isPaused.current = false;
      }
    }, delayMs);
  };

  const { syncOffset } = useAutoScroll(
    deityListRef,
    deityContentWidth,
    deityContainerWidth,
    32,
    isPaused,
    1500,
  );

  const handleSelectGod = (item: God) => {
    const now = Date.now();
    if (
      lastSelectedGodId.current === item.id &&
      now - lastSelectTime.current < 400
    ) {
      return;
    }
    lastSelectedGodId.current = item.id;
    lastSelectTime.current = now;
    setSelectedGod(item);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedMantra !== null) {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
      isPaused.current = true;
    } else {
      restartAutoScrollAfterDelay(1500);
    }
  }, [selectedMantra]);

  const currentGod = selectedGod || initialGod || allGods[0];

  const mantras: GodMantra[] = useMemo(() => {
    if (!currentGod) return [];
    if (currentGod.mantras && currentGod.mantras.length > 0) {
      return currentGod.mantras;
    }
    return [
      {
        nameHi: currentGod.hindiName,
        nameEn: currentGod.englishName,
        mantra: currentGod.mantra,
      },
    ];
  }, [currentGod]);

  const godName = currentGod
    ? isHindi
      ? currentGod.hindiName
      : currentGod.englishName
    : '';

  const handleStartJap = (_mantraItem: GodMantra) => {
    setSelectedMantra(null);
    navigation.navigate('BottomTabs', { screen: 'Jap' });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Back width={scale(14)} height={scale(14)} stroke={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {godName
              ? `${godName} ${isHindi ? 'मंत्र' : 'Mantras'}`
              : isHindi
              ? 'मंत्र संग्रह'
              : 'Sacred Mantras'}
          </Text>
          <View style={{ width: scale(34) }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(24) },
          ]}
        >
          {/* Deity Showcase Card with large clear image */}
          {currentGod && (
            <View style={styles.showcaseCard}>
              <View style={styles.avatarGlowContainer}>
                <View style={styles.avatarBorder}>
                  <Image
                    source={currentGod.image}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.showcaseTitle}>{godName}</Text>
              {currentGod.mantra ? (
                <Text style={styles.showcaseMoolMantra}>
                  {`॥ ${currentGod.mantra} ॥`}
                </Text>
              ) : null}
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {`${mantras.length} ${
                    isHindi ? 'पवित्र मंत्र' : 'Sacred Mantras'
                  }`}
                </Text>
              </View>
            </View>
          )}

          {/* Horizontal Deity Selector */}
          {allGods.length > 1 && (
            <View style={styles.deitiesSelectorSection}>
              <Text style={styles.sectionSubtitle}>
                {isHindi ? 'अन्य देवी-देवता चुनें' : 'Select Deity'}
              </Text>
              <FlatList
                ref={deityListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={allGods}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.deitiesListContent}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
                onLayout={e =>
                  setDeityContainerWidth(e.nativeEvent.layout.width)
                }
                onContentSizeChange={w => setDeityContentWidth(w)}
                onScrollBeginDrag={() => {
                  isDraggingList.current = true;
                  // Flow Case 1: When user scrolls, autoscrolling completely stops
                  isPaused.current = true;
                  if (resumeTimer.current) {
                    clearTimeout(resumeTimer.current);
                    resumeTimer.current = null;
                  }
                }}
                onScrollEndDrag={e => {
                  const vx = e.nativeEvent.velocity?.x ?? 0;
                  const direction = vx > 0.1 ? 1 : vx < -0.1 ? -1 : undefined;
                  syncOffset(e.nativeEvent.contentOffset.x, direction);
                  if (Math.abs(vx) < 0.05) {
                    isDraggingList.current = false;
                    // Flow Case 2: Start autoscrolling after 1 to 2 seconds if user does not scroll again
                    restartAutoScrollAfterDelay(1500);
                  } else {
                    restartAutoScrollAfterDelay(2200);
                  }
                }}
                onMomentumScrollEnd={e => {
                  syncOffset(e.nativeEvent.contentOffset.x);
                  isDraggingList.current = false;
                  // Flow Case 2: After momentum scroll ends, resume after 1.5s
                  restartAutoScrollAfterDelay(1500);
                }}
                renderItem={({ item }) => {
                  const isSelected = item.id === currentGod?.id;
                  const name = isHindi ? item.hindiName : item.englishName;
                  return (
                    <Pressable
                      style={({ pressed }) => [
                        styles.deityChip,
                        isSelected && styles.deityChipActive,
                        pressed && { opacity: 0.75 },
                      ]}
                      onTouchStart={(e: GestureResponderEvent) => {
                        touchDownInfo.current = {
                          x: e.nativeEvent.pageX,
                          y: e.nativeEvent.pageY,
                          time: Date.now(),
                        };
                        isPaused.current = true;
                        if (resumeTimer.current) {
                          clearTimeout(resumeTimer.current);
                          resumeTimer.current = null;
                        }
                      }}
                      onTouchMove={(e: GestureResponderEvent) => {
                        if (touchDownInfo.current) {
                          const dx = Math.abs(
                            e.nativeEvent.pageX - touchDownInfo.current.x,
                          );
                          const dy = Math.abs(
                            e.nativeEvent.pageY - touchDownInfo.current.y,
                          );
                          if (dx > 10 || dy > 10) {
                            touchDownInfo.current = null;
                          }
                        }
                      }}
                      onTouchEnd={(e: GestureResponderEvent) => {
                        if (touchDownInfo.current && !isDraggingList.current) {
                          const dx = Math.abs(
                            e.nativeEvent.pageX - touchDownInfo.current.x,
                          );
                          const dy = Math.abs(
                            e.nativeEvent.pageY - touchDownInfo.current.y,
                          );
                          const dt = Date.now() - touchDownInfo.current.time;
                          if (dx < 12 && dy < 12 && dt < 400) {
                            // Flow: User click changes the data (whether stopped or during autoscroll)
                            handleSelectGod(item);
                          }
                        }
                        touchDownInfo.current = null;
                        if (
                          !isDraggingList.current &&
                          selectedMantra === null
                        ) {
                          restartAutoScrollAfterDelay(1500);
                        }
                      }}
                      onTouchCancel={() => {
                        touchDownInfo.current = null;
                        if (
                          !isDraggingList.current &&
                          selectedMantra === null
                        ) {
                          restartAutoScrollAfterDelay(1500);
                        }
                      }}
                      onPress={() => {
                        if (!isDraggingList.current) {
                          // Flow: User click changes the data
                          handleSelectGod(item);
                        }
                        if (
                          !isDraggingList.current &&
                          selectedMantra === null
                        ) {
                          restartAutoScrollAfterDelay(1500);
                        }
                      }}
                    >
                      <Image
                        source={item.image}
                        style={styles.deityChipImage}
                        resizeMode="cover"
                      />
                      <Text
                        style={[
                          styles.deityChipName,
                          isSelected && styles.deityChipNameActive,
                        ]}
                        numberOfLines={1}
                      >
                        {name}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>
          )}

          {/* Mantras Section Header */}
          <View style={styles.mantrasHeaderRow}>
            <Text style={styles.mantrasSectionTitle}>
              {isHindi ? 'मंत्र सूची' : 'Mantra Collection'}
            </Text>
            <Text style={styles.mantrasCountText}>
              {isHindi
                ? 'पढ़ने के लिए कार्ड पर टैप करें'
                : 'Tap to read & chant'}
            </Text>
          </View>

          {/* Mantras List */}
          {mantras.map((m, index) => {
            const title = isHindi && m.nameHi ? m.nameHi : m.nameEn || m.nameHi;
            return (
              <TouchableOpacity
                key={index}
                style={styles.mantraCard}
                activeOpacity={0.8}
                onPress={() => setSelectedMantra(m)}
              >
                <View style={styles.mantraCardTop}>
                  <View style={styles.mantraIndexBadge}>
                    <Text style={styles.mantraIndexText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.mantraCardTitle} numberOfLines={1}>
                    {title}
                  </Text>
                </View>

                <Text style={styles.mantraCardText} numberOfLines={2}>
                  {m.mantra}
                </Text>

                <TouchableOpacity
                  style={styles.mantraCardFooter}
                  activeOpacity={0.7}
                  onPress={() => setSelectedMantra(m)}
                >
                  <Text style={styles.viewMoreText}>
                    {isHindi ? 'पूर्ण मंत्र देखें →' : 'View Full Mantra →'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Single Top-Level Mantra Detail Modal (Hardware Accelerated & Smooth Blur Backdrop) */}
      <Modal
        visible={selectedMantra !== null}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => setSelectedMantra(null)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={12}
            blurRadius={8}
            overlayColor="rgba(0, 0, 0, 0.45)"
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.65)"
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setSelectedMantra(null)}
          />
          <View
            style={[
              styles.modalBackdrop,
              {
                paddingTop: insets.top + scale(18),
                paddingBottom: insets.bottom + scale(18),
              },
            ]}
            pointerEvents="box-none"
          >
            {selectedMantra && (
              <View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                  {/* Modal Header */}
                  <View style={styles.modalHeaderRow}>
                    {currentGod?.image && (
                      <Image
                        source={currentGod.image}
                        style={styles.modalAvatar}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.modalHeaderInfo}>
                      <Text style={styles.modalTitle} numberOfLines={1}>
                        {isHindi && selectedMantra.nameHi
                          ? selectedMantra.nameHi
                          : selectedMantra.nameEn || selectedMantra.nameHi}
                      </Text>
                      <Text style={styles.modalSubtitle} numberOfLines={1}>
                        {godName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={() => setSelectedMantra(null)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.modalCloseText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Mantra Box */}
                  <ScrollView
                    style={styles.modalScrollView}
                    contentContainerStyle={styles.modalScrollInner}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.mantraBox}>
                      <Text style={styles.mantraBoxSymbol}>ॐ</Text>
                      <Text style={styles.mantraBoxText}>
                        {selectedMantra.mantra}
                      </Text>
                    </View>
                  </ScrollView>

                  {/* Actions */}
                  <View style={styles.modalActionsRow}>
                    <TouchableOpacity
                      style={styles.startJapBtn}
                      activeOpacity={0.8}
                      onPress={() => handleStartJap(selectedMantra)}
                    >
                      <Text style={styles.startJapBtnText}>
                        {isHindi
                          ? '📿 इस मंत्र से जाप करें'
                          : '📿 Start Jap with this Mantra'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dismissBtn}
                      activeOpacity={0.7}
                      onPress={() => setSelectedMantra(null)}
                    >
                      <Text style={styles.dismissBtnText}>
                        {isHindi ? 'बंद करें' : 'Close'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MantraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(8),
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
  },
  showcaseCard: {
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(20),
    alignItems: 'center',
    marginBottom: scale(20),
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(12),
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  avatarGlowContainer: {
    padding: scale(4),
    borderRadius: scale(75),
    backgroundColor: colors.primary,
    marginBottom: scale(12),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarBorder: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(65),
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: colors.ring,
    backgroundColor: colors.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  showcaseTitle: {
    fontSize: fs(24),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: scale(6),
  },
  showcaseMoolMantra: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    lineHeight: fs(22),
    marginBottom: scale(12),
    paddingHorizontal: scale(10),
  },
  badgeContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
  },
  badgeText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '600',
  },
  deitiesSelectorSection: {
    marginBottom: scale(20),
  },
  sectionSubtitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: scale(10),
    paddingHorizontal: scale(2),
  },
  deitiesListContent: {
    paddingVertical: scale(2),
    paddingHorizontal: scale(2),
  },
  deityChip: {
    alignItems: 'center',
    marginRight: scale(12),
    width: scale(68),
    padding: scale(6),
    borderRadius: scale(12),
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
  },
  deityChipActive: {
    borderColor: colors.ring,
    backgroundColor: colors.primary,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deityChipImage: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    marginBottom: scale(4),
  },
  deityChipName: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    width: '100%',
  },
  deityChipNameActive: {
    color: colors.ring,
    fontWeight: '700',
  },
  mantrasHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
    paddingHorizontal: scale(2),
  },
  mantrasSectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  mantrasCountText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
  },
  mantraCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mantraCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  mantraIndexBadge: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: colors.ring,
  },
  mantraIndexText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '700',
  },
  mantraCardTitle: {
    fontSize: fs(15),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    fontWeight: '600',
  },
  mantraCardText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    lineHeight: fs(21),
    marginBottom: scale(10),
    opacity: 0.9,
  },
  mantraCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: colors.borderSubtle,
    paddingTop: scale(8),
  },
  viewMoreText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  modalContainer: {
    width: '100%',
    maxHeight: '85%',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: scale(24),
    padding: scale(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  modalAvatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 1.5,
    borderColor: colors.ring,
    marginRight: scale(12),
  },
  modalHeaderInfo: {
    flex: 1,
  },
  modalTitle: {
    fontSize: fs(17),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginTop: scale(2),
  },
  modalCloseButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalCloseText: {
    fontSize: fs(14),
    color: colors.secondary,
    fontWeight: '600',
  },
  modalScrollView: {
    maxHeight: scale(320),
  },
  modalScrollInner: {
    paddingVertical: scale(6),
  },
  mantraBox: {
    backgroundColor: colors.primary,
    borderRadius: scale(18),
    padding: scale(20),
    borderWidth: 1.5,
    borderColor: colors.accentOrangeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mantraBoxSymbol: {
    fontSize: fs(28),
    color: colors.ring,
    marginBottom: scale(8),
    fontFamily: fonts.TiroHindiRegular,
  },
  mantraBoxText: {
    fontSize: fs(19),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(30),
  },
  modalActionsRow: {
    marginTop: scale(16),
    gap: scale(10),
  },
  startJapBtn: {
    backgroundColor: colors.ring,
    borderRadius: scale(14),
    paddingVertical: scale(13),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  startJapBtnText: {
    fontSize: fs(14),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    fontWeight: '700',
  },
  dismissBtn: {
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissBtnText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.mutedForeground,
  },
});
