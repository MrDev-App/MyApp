import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import { godData } from '../../../constants/godData';
import ExpandableCard, {
  ExpandableCardHandle,
} from '../../../components/ExpandableCard';
import { useExpandTrigger } from '../../../hook/useExpandTrigger';

const MantrasCard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  // Main Deity Modal
  const cardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef, trigger } = useExpandTrigger(cardRef);

  // Nested Mantra Detail Modal
  const detailCardRef = useRef<ExpandableCardHandle>(null);
  const { registerRef: registerItemRef, trigger: triggerItem } =
    useExpandTrigger(detailCardRef);

  const pairedGods = React.useMemo(() => {
    const pairs = [];
    for (let i = 0; i < godData.length; i += 2) {
      pairs.push([godData[i], godData[i + 1]].filter(Boolean));
    }
    return pairs;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(Translation.MANTRAS_BY_DEITIES)}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={pairedGods}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map(god => {
              const name =
                currentLanguage === 'hi' ? god.hindiName : god.englishName;
              return (
                <TouchableOpacity
                  key={god.id}
                  style={styles.godContainer}
                  activeOpacity={0.7}
                  onPress={() => trigger(god.id, god)}
                >
                  <View
                    ref={registerRef(god.id)}
                    collapsable={false}
                    style={styles.avatarContainer}
                  >
                    <Image source={god.image} style={styles.avatarImage} />
                  </View>
                  <Text
                    style={styles.godName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />

      {/* Main Deity Modal showing list of mantras */}
      <ExpandableCard
        ref={cardRef}
        imageMargin={scale(16)}
        getImage={(god: any) => god.image}
        renderContent={(god: any, close) => (
          <>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.expandedName}>
                {currentLanguage === 'hi' ? god.hindiName : god.englishName}
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
            >
              {god.mantras && god.mantras.length > 0 ? (
                god.mantras.map((m: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    ref={registerItemRef(String(index))}
                    style={styles.mantraItemCard}
                    activeOpacity={0.8}
                    onPress={() => {
                      triggerItem(String(index), {
                        image: god.image,
                        deityName:
                          currentLanguage === 'hi'
                            ? god.hindiName
                            : god.englishName,
                        name:
                          currentLanguage === 'hi' && m.nameHi
                            ? m.nameHi
                            : m.name,
                        mantraHi: m.mantraHi,
                        mantraEn: m.mantraEn,
                      });
                    }}
                  >
                    <View style={styles.mantraCardHeader}>
                      <Text style={styles.mantraName}>
                        {currentLanguage === 'hi' && m.nameHi
                          ? m.nameHi
                          : m.name}
                      </Text>
                    </View>
                    <Text style={styles.mantraTextHi}>{m.mantraHi}</Text>
                    {m.mantraEn && (
                      <Text style={styles.mantraTextEn}>{m.mantraEn}</Text>
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity
                  ref={registerItemRef('single')}
                  style={styles.mantraItemCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    triggerItem('single', {
                      image: god.image,
                      deityName:
                        currentLanguage === 'hi'
                          ? god.hindiName
                          : god.englishName,
                      name: currentLanguage === 'hi' ? 'मंत्र' : 'Mantra',
                      mantraHi: god.mantraHi,
                      mantraEn: god.mantraEn,
                    });
                  }}
                >
                  <View style={styles.mantraCardHeader}>
                    <Text style={styles.mantraName}>
                      {currentLanguage === 'hi' ? 'मंत्र' : 'Mantra'}
                    </Text>
                  </View>
                  <Text style={styles.mantraTextHi}>{god.mantraHi}</Text>
                  {god.mantraEn && (
                    <Text style={styles.mantraTextEn}>{god.mantraEn}</Text>
                  )}
                </TouchableOpacity>
              )}
            </ScrollView>
          </>
        )}
      />

      {/* Nested Mantra Detail Modal */}
      <ExpandableCard<any>
        ref={detailCardRef}
        imageMargin={scale(20)}
        getImage={(item: any) => item.image}
        renderContent={(item, close) => (
          <>
            <View style={styles.modalHeaderRow}>
              <View style={styles.modalHeaderTitleCol}>
                <Text style={styles.expandedName}>{item.name}</Text>
                {item.deityName && (
                  <Text style={styles.modalSubtitle}>{item.deityName}</Text>
                )}
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.mantraDetailCard}>
                <Text style={styles.mantraDetailHi}>{item.mantraHi}</Text>
                {item.mantraEn && (
                  <Text style={styles.mantraDetailEn}>{item.mantraEn}</Text>
                )}
              </View>
            </ScrollView>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: scale(16) },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(14),
    paddingHorizontal: scale(4),
  },
  listContent: { paddingHorizontal: scale(4) },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: scale(10),
  },
  godContainer: {
    alignItems: 'center',
    width: scale(100),
    borderRadius: scale(4),
    marginBottom: scale(15),
  },
  avatarContainer: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(50),
    overflow: 'hidden',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  godName: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    marginTop: scale(4),
    textAlign: 'center',
    width: '100%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
  },
  topLeftBackButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(251, 148, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  topLeftBackButtonText: {
    color: colors.ring,
    fontSize: fs(20),
    lineHeight: fs(22),
  },
  expandedName: {
    fontSize: fs(22),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  modalHeaderTitleCol: {
    flex: 1,
  },
  modalSubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.ring,
    marginTop: scale(2),
  },

  modalContent: {
    flex: 1,
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {},
  mantraItemCard: {
    // backgroundColor: 'rgba(252, 224, 180, 0.2)',
    borderRadius: scale(16),
    padding: scale(14),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.15)',
  },
  mantraCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  mantraName: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    flex: 1,
    marginRight: scale(10),
  },
  mantraTextHi: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    lineHeight: fs(22),
  },
  mantraTextEn: {
    fontSize: fs(12.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    marginTop: scale(4),
    fontStyle: 'italic',
  },

  // Detail Modal Content
  mantraDetailCard: {
    backgroundColor: 'rgba(252, 224, 180, 0.15)',
    borderRadius: scale(20),
    padding: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.12)',
    alignItems: 'center',
  },
  mantraDetailHi: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(28),
    marginBottom: scale(16),
  },
  mantraDetailEn: {
    fontSize: fs(13.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(22),
    fontStyle: 'italic',
  },
});

export default MantrasCard;
