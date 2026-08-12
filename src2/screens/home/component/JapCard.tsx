import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { japLabels } from '../../../constants/japData';

const JapCard = () => {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en') as 'en' | 'hi';
  const labels = japLabels[currentLanguage] || japLabels.en;

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{labels.title}</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.label}>{labels.todaysCount}</Text>
            <Text style={styles.value}>108</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.label}>{labels.malaCompleted}</Text>
            <Text style={styles.value}>1</Text>
          </View>
        </View>

        {/* Start Chanting Button */}
        <TouchableOpacity
          style={styles.chantButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('BottomTabs', { screen: 'Jap' })}
        >
          <Text style={styles.chantButtonText}>📿 {labels.startChanting}</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.2)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: scale(16),
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
  },
  divider: {
    width: 1,
    height: scale(36),
    backgroundColor: 'rgba(183, 168, 151, 0.25)',
  },
  label: {
    fontSize: fs(8.5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    letterSpacing: 1,
    marginBottom: scale(4),
  },
  value: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  chantButton: {
    backgroundColor: colors.ring,
    borderRadius: scale(20),
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  chantButtonText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
});

export default JapCard;
