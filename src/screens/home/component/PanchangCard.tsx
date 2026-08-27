import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { Translation } from '../../../i18n/language';

interface PanchangItemProps {
  label: string;
  value: string;
}

const PanchangItem: React.FC<PanchangItemProps> = ({ label, value }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const PanchangCard = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{t(Translation.TODAYS_PANCHANG)}</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Row 1: TITHI & NAKSHATRA */}
        <View style={styles.row}>
          <PanchangItem label={t(Translation.TITHI)} value="Shukla Saptami" />
          <PanchangItem label={t(Translation.NAKSHATRA)} value="Rohini" />
        </View>

        {/* Row 2: YOGA & SUNRISE */}
        <View style={styles.row}>
          <PanchangItem label={t(Translation.YOGA)} value="Siddhi" />
          <PanchangItem label={t(Translation.SUNRISE)} value="6:12 AM" />
        </View>

        {/* Row 3: SUNSET & RAHU KAAL */}
        <View style={styles.rowLast}>
          <PanchangItem label={t(Translation.SUNSET)} value="6:44 PM" />
          <PanchangItem
            label={t(Translation.RAHU_KAAL)}
            value="4:30 – 6:00 PM"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  fullText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.2)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(5),
  },
  rowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
  },
  label: {
    fontSize: fs(8),
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
    letterSpacing: 1,
  },
  value: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
});

export default PanchangCard;
