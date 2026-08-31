import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Back } from '../../assets';
import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';

const TempleScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const { width: windowWidth } = useWindowDimensions();

  const [selectedTemple, setSelectedTemple] = useState<any>(null);

  const items = route.params?.items || [];

  // Calculate item width for a 2-column grid with padding
  const padding = scale(16);
  const gap = scale(12);
  const cardWidth = (windowWidth - padding * 2 - gap) / 2;

  const renderItem = ({ item }: { item: any }) => {
    const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
    const subtitle =
      currentLanguage === 'hi' ? item.subtitleHi : item.subtitleEn;

    return (
      <TouchableOpacity
        style={[styles.templeCard, { width: cardWidth }]}
        activeOpacity={0.8}
        onPress={() => setSelectedTemple(item)}
      >
        <Image source={item.image} style={styles.templeImage} />
        <View style={styles.templeContent}>
          <Text style={styles.templeName} numberOfLines={1}>
            {name}
          </Text>
          {subtitle && (
            <Text style={styles.templeSubtitle} numberOfLines={1}>
              📍 {subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.ringButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentLanguage === 'hi' ? 'प्रसिद्ध मंदिर' : 'Famous Temples'}
        </Text>
        <View style={{ width: scale(32) }} />
      </View>

      {/* Grid Content using FlatList */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noDataText}>
            {currentLanguage === 'hi'
              ? 'कोई डेटा नहीं मिला'
              : 'No Temples Found'}
          </Text>
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={5}
            removeClippedSubviews={Platform.OS === 'android'}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Detail Modal */}
      <Modal
        visible={selectedTemple !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedTemple(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalDismissArea}
            activeOpacity={1}
            onPress={() => setSelectedTemple(null)}
          />
          <View style={styles.modalSheet}>
            {selectedTemple && (
              <>
                <Image
                  source={selectedTemple.image}
                  style={styles.modalImage}
                />
                <View
                  style={[
                    styles.modalContent,
                    { paddingBottom: insets.bottom + scale(16) },
                  ]}
                >
                  <Text style={styles.modalTempleName}>
                    {currentLanguage === 'hi'
                      ? selectedTemple.nameHi
                      : selectedTemple.nameEn}
                  </Text>
                  {selectedTemple.subtitleHi && (
                    <Text style={styles.modalTempleSubtitle}>
                      📍{' '}
                      {currentLanguage === 'hi'
                        ? selectedTemple.subtitleHi
                        : selectedTemple.subtitleEn}
                    </Text>
                  )}
                  <ScrollView
                    style={styles.modalTextScroll}
                    showsVerticalScrollIndicator={false}
                  >
                    <Text style={styles.modalTempleText}>
                      {currentLanguage === 'hi'
                        ? selectedTemple.textHi
                        : selectedTemple.textEn}
                    </Text>
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedTemple(null)}
                  >
                    <Text style={styles.closeButtonText}>
                      {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TempleScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  ringButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ring,
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  contentWrapper: {
    flex: 1,
  },
  flatListContent: {
    padding: scale(16),
    paddingBottom: scale(32),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  templeCard: {
    backgroundColor: colors.white,
    borderRadius: scale(16),
    overflow: 'hidden',
    shadowColor: '#39261b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  templeImage: {
    width: '100%',
    height: scale(120),
  },
  templeContent: {
    padding: scale(10),
  },
  templeName: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  templeSubtitle: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(2),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: scale(200),
  },
  modalContent: {
    padding: scale(20),
    paddingBottom: scale(32),
  },
  modalTempleName: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  modalTempleSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(4),
    marginBottom: scale(16),
  },
  modalTextScroll: {
    maxHeight: scale(200),
    marginBottom: scale(20),
  },
  modalTempleText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(19),
    opacity: 0.9,
  },
  closeButton: {
    backgroundColor: colors.ring,
    borderRadius: scale(12),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
  },
});
