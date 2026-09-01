import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import { SearchIcon } from '../../../utile/customSVG';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';

interface SelectedDayBreakdownCardProps {
  selectedDate: string;
  selectedDayRecord: any;
  getMantraName: (id: string) => string;
  currentLanguage: 'en' | 'hi';
}

const SelectedDayBreakdownCard: React.FC<SelectedDayBreakdownCardProps> = ({
  selectedDate,
  selectedDayRecord,
  getMantraName,
  currentLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.sectionCard}>
      <View style={styles.titleRow}>
        <SearchIcon size={scale(18)} color={colors.ring} />
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          {new Date(selectedDate).toLocaleDateString(
            currentLanguage === 'hi' ? 'hi-IN' : 'en-US',
            {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          )}
        </Text>
      </View>

      {selectedDayRecord ? (
        <View style={styles.selectedDayDetails}>
          <Text style={styles.breakdownLabel}>
            {t(Translation.PROFILE_MANTRA_BREAKDOWN)}
          </Text>

          {Object.keys(selectedDayRecord.mantras).length === 0 ? (
            <Text style={styles.noBreakdownText}>
              {t(Translation.PROFILE_NO_BREAKDOWN)}
            </Text>
          ) : (
            Object.keys(selectedDayRecord.mantras).map(mantraId => {
              const record = selectedDayRecord.mantras[mantraId];
              return (
                <View key={mantraId} style={styles.breakdownRow}>
                  <View style={styles.breakdownMantraInfo}>
                    <View style={styles.breakdownMantraIndicator} />
                    <Text style={styles.breakdownMantraName}>
                      {getMantraName(mantraId)}
                    </Text>
                  </View>
                  <Text style={styles.breakdownMantraValue}>
                    {record.count.toLocaleString()} ({record.mala}{' '}
                    {record.mala === 1
                      ? t(Translation.PROFILE_MALA)
                      : t(Translation.PROFILE_MALAS)}
                    )
                  </Text>
                </View>
              );
            })
          )}
        </View>
      ) : (
        <View style={styles.emptyDayBreakdown}>
          <Text style={styles.emptyDayBreakdownText}>
            {t(Translation.PROFILE_NO_CHANTS_RECORDED)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(18),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(6) },
    shadowOpacity: 0.04,
    shadowRadius: scale(12),
    elevation: 0,
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(14),
  },
  sectionTitle: {
    fontSize: fs(14),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
  },
  selectedDayDetails: {
    marginTop: scale(4),
  },
  breakdownLabel: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(8),
  },
  noBreakdownText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    fontStyle: 'italic',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderVerySubtle,
  },
  breakdownMantraInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  breakdownMantraIndicator: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: colors.ring,
  },
  breakdownMantraName: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  breakdownMantraValue: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
  },
  emptyDayBreakdown: {
    paddingVertical: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    borderRadius: scale(10),
  },
  emptyDayBreakdownText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
  },
});

export default React.memo(SelectedDayBreakdownCard);
