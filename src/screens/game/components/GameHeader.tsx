import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { CardGradient } from '@components';
import { useAppLanguage } from '@hooks';

interface GameHeaderProps {
  totalGames: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ totalGames }) => {
  const { isHindi } = useAppLanguage();

  return (
    <View style={styles.container}>
      {/* Title & Tagline */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>
          {isHindi ? 'ज्ञान एवं लीला मंच' : 'Vedic Game Arena'}
        </Text>
        <Text style={styles.tagline}>
          {isHindi
            ? 'खेल-खेल में धर्म, दर्शन और सनातन ज्ञान की साधना'
            : 'Explore Dharma, Wisdom & Epics through Mindful Play'}
        </Text>
      </View>

      {/* Stats Summary Card */}
      <View style={styles.statsCard}>
        <CardGradient borderRadius={scale(16)} />
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🎮</Text>
            <Text style={styles.statValue}>{totalGames}</Text>
            <Text style={styles.statLabel}>
              {isHindi ? 'कुल खेल' : 'Total Games'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>
              {isHindi ? 'दिन स्ट्रीक' : 'Day Streak'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statValue}>1,240</Text>
            <Text style={styles.statLabel}>
              {isHindi ? 'पुण्य अंक' : 'Sacred Pts'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(6),
  },
  titleSection: {
    marginBottom: scale(12),
  },
  mainTitle: {
    fontSize: fs(24),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginTop: scale(2),
    lineHeight: fs(18),
  },
  statsCard: {
    backgroundColor: 'transparent',
    borderRadius: scale(16),
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
    borderWidth: 1,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statEmoji: {
    fontSize: fs(16),
    marginBottom: scale(2),
  },
  statValue: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  statLabel: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginTop: scale(1),
  },
  divider: {
    width: 1,
    height: scale(28),
    backgroundColor: colors.borderSubtle,
  },
});

export default React.memo(GameHeader);
