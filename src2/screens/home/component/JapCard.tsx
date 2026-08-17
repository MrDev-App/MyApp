import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';
import AnimatedButton from '../../../components/AnimatedButton';
import { Storage, STORAGE_KEYS } from '../../../utile/storage';

const JapCard = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const [todayCount, setTodayCount] = useState(() =>
    Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0),
  );
  const [todayMala, setTodayMala] = useState(() =>
    Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA, 0),
  );

  useEffect(() => {
    if (isFocused) {
      Storage.checkAndResetTodayStats();
      setTodayCount(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_COUNT, 0));
      setTodayMala(Storage.getNumber(STORAGE_KEYS.JAP_TODAY_MALA, 0));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.JAP_TITLE)}</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.label}>{t(Translation.JAP_TODAYS_COUNT)}</Text>
            <Text style={styles.value}>{todayCount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.label}>
              {t(Translation.JAP_MALA_COMPLETED)}
            </Text>
            <Text style={styles.value}>{todayMala}</Text>
          </View>
        </View>

        {/* Start Chanting Button */}
        <AnimatedButton
          style={styles.chantButton}
          onPress={() => navigation.navigate('BottomTabs', { screen: 'Jap' })}
        >
          <View style={{ flexDirection: 'row', gap: scale(8) }}>
            <Text>📿</Text>
            <Text style={styles.chantButtonText}>
              {t(Translation.JAP_START_CHANTING)}
            </Text>
          </View>
        </AnimatedButton>
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
    borderRadius: scale(10),

    height: scale(48),

    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  chantButtonText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
});

export default JapCard;
