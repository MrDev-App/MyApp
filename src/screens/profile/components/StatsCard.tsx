import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';
import profileStyles from '../styles/profileStyles';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import AnimatedButton from '../../../components/AnimatedButton';

interface StatsCardProps {
  totalCount: number;
  totalMala: number;
  todayCount: number;
  showHistory: boolean;
  onHistoryPress: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  totalCount,
  totalMala,
  todayCount,
  showHistory,
  onHistoryPress,
}) => {
  const { t } = useTranslation();

  return (
    <View style={profileStyles.sectionCard}>
      {/* Title row with History button on the right */}
      <View style={styles.titleRow}>
        <Text style={[profileStyles.sectionTitle, { marginBottom: 0 }]}>
          {t(Translation.PROFILE_TOTAL_STATS)}
        </Text>
        <AnimatedButton
          style={[styles.historyBtn, showHistory && styles.historyBtnActive]}
          onPress={onHistoryPress}
        >
          <Text style={styles.historyBtnIcon}>📅</Text>
          <Text
            style={[
              styles.historyBtnText,
              showHistory && styles.historyBtnTextActive,
            ]}
          >
            History
          </Text>
        </AnimatedButton>
      </View>

      <View style={profileStyles.statsGrid}>
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>{todayCount}</Text>
          <Text style={profileStyles.statLabel}>
            {t(Translation.PROFILE_TODAY_JAP)}
          </Text>
        </View>

        <View style={profileStyles.statDivider} />

        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>{totalMala}</Text>
          <Text style={profileStyles.statLabel}>
            {t(Translation.PROFILE_MALAS_DONE)}
          </Text>
        </View>

        <View style={profileStyles.statDivider} />

        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>
            {totalCount.toLocaleString()}
          </Text>
          <Text style={profileStyles.statLabel}>
            {t(Translation.PROFILE_TOTAL_CHANTS)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(14),
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: colors.accentBorderSubtle,
    backgroundColor: colors.accentLightBg,
  },
  historyBtnActive: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  historyBtnIcon: {
    fontSize: fs(11),
  },
  historyBtnText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  historyBtnTextActive: {
    color: colors.white,
  },
});

export default React.memo(StatsCard);
