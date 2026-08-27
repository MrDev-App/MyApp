import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';
import profileStyles from '../styles/profileStyles';

interface StatsCardProps {
  totalCount: number;
  totalMala: number;
  todayCount: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ totalCount, totalMala, todayCount }) => {
  const { t } = useTranslation();

  return (
    <View style={profileStyles.sectionCard}>
      <Text style={profileStyles.sectionTitle}>{t(Translation.PROFILE_TOTAL_STATS)}</Text>
      <View style={profileStyles.statsGrid}>
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>{totalCount.toLocaleString()}</Text>
          <Text style={profileStyles.statLabel}>{t(Translation.PROFILE_TOTAL_CHANTS)}</Text>
        </View>
        <View style={profileStyles.statDivider} />
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>{totalMala}</Text>
          <Text style={profileStyles.statLabel}>{t(Translation.PROFILE_MALAS_DONE)}</Text>
        </View>
        <View style={profileStyles.statDivider} />
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statValue}>{todayCount}</Text>
          <Text style={profileStyles.statLabel}>{t(Translation.PROFILE_TODAY_JAP)}</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(StatsCard);
