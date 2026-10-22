import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { CardGradient } from '@components';
import { useAppLanguage } from '@hooks';
import { GameItem } from '../types';

interface GameCardProps {
  item: GameItem;
  onPress: (item: GameItem) => void;
  style?: StyleProp<ViewStyle>;
}

const GameCard: React.FC<GameCardProps> = ({ item, onPress, style }) => {
  const { isHindi } = useAppLanguage();
  const scaleAnim = useSharedValue(1);

  const title = isHindi ? item.titleHi : item.titleEn;
  const subtitle = isHindi ? item.subtitleHi : item.subtitleEn;
  const description = isHindi ? item.descriptionHi : item.descriptionEn;
  const categoryLabel = isHindi ? item.categoryLabelHi : item.categoryLabelEn;
  const players = isHindi ? item.playersHi : item.playersEn;
  const difficulty = isHindi ? item.difficultyHi : item.difficultyEn;
  const badge = isHindi ? item.badgeHi : item.badgeEn;
  const isAvailable = item.status === 'available';

  const handlePressIn = useCallback(() => {
    scaleAnim.value = withSpring(0.97, { damping: 15, stiffness: 220 });
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    scaleAnim.value = withSpring(1, { damping: 15, stiffness: 220 });
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const getEmojiIcon = (type: GameItem['iconType']) => {
    switch (type) {
      case 'dice':
        return '🎲';
      case 'quiz':
        return '📜';
      case 'cards':
        return '🃏';
      case 'puzzle':
        return '🧩';
      case 'lotus':
        return '🪷';
      case 'om':
        return '🕉️';
      default:
        return '✨';
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.card}
      >
        <CardGradient borderRadius={scale(20)} />

        {/* Top Meta Header */}
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>{getEmojiIcon(item.iconType)}</Text>
          </View>

          <View style={styles.badgeGroup}>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{categoryLabel}</Text>
            </View>
            {badge ? (
              <View
                style={[
                  styles.highlightBadge,
                  !isAvailable && styles.comingSoonBadge,
                ]}
              >
                <Text
                  style={[
                    styles.highlightBadgeText,
                    !isAvailable && styles.comingSoonText,
                  ]}
                >
                  {isAvailable ? badge : isHindi ? 'शीघ्र आ रहा है' : 'Coming Soon'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Title and Subtitle */}
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Information Meta Bar */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaEmoji}>👥</Text>
            <Text style={styles.metaLabel} numberOfLines={1}>
              {players}
            </Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaEmoji}>⚡</Text>
            <Text style={styles.metaLabel} numberOfLines={1}>
              {difficulty}
            </Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaEmoji}>⭐</Text>
            <Text style={styles.metaLabel}>
              {item.rating} ({item.playedCount})
            </Text>
          </View>
        </View>

        {/* Action Button Row */}
        <View style={styles.actionRow}>
          <View style={styles.timeTag}>
            <Text style={styles.timeTagText}>
              ⏱️ ~{item.estimatedMinutes} {isHindi ? 'मिनट' : 'mins'}
            </Text>
          </View>

          <View
            style={[
              styles.playButton,
              !isAvailable && styles.playButtonDisabled,
            ]}
          >
            <Text style={styles.playButtonText}>
              {isAvailable
                ? isHindi
                  ? 'खेलें ▶'
                  : 'Play Now ▶'
                : isHindi
                ? 'प्रतीक्षा करें'
                : 'Preview'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scale(8),
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: scale(20),
    padding: scale(16),
    borderWidth: 1.5,
    borderColor: colors.accentOrangeBg,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  iconCircle: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  iconEmoji: {
    fontSize: fs(24),
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  categoryChip: {
    backgroundColor: 'rgba(57, 38, 27, 0.08)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  categoryText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  highlightBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  highlightBadgeText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(57, 38, 27, 0.4)',
  },
  comingSoonText: {
    color: colors.white,
  },
  body: {
    marginBottom: scale(12),
  },
  title: {
    fontSize: fs(18),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
    marginBottom: scale(2),
  },
  subtitle: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginBottom: scale(6),
  },
  description: {
    fontSize: fs(12.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    opacity: 0.88,
    lineHeight: fs(18),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: scale(12),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    marginBottom: scale(14),
    borderWidth: 0.5,
    borderColor: colors.borderSubtle,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    flex: 1,
    justifyContent: 'center',
  },
  metaEmoji: {
    fontSize: fs(12),
  },
  metaLabel: {
    fontSize: fs(10.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
  },
  metaDivider: {
    width: 1,
    height: scale(14),
    backgroundColor: colors.borderSubtle,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(10),
  },
  timeTagText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  playButton: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(18),
    paddingVertical: scale(8),
    borderRadius: scale(12),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(4),
    elevation: 3,
  },
  playButtonDisabled: {
    backgroundColor: colors.neutralDisabled || '#b0a498',
    shadowOpacity: 0,
    elevation: 0,
  },
  playButtonText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
});

export default React.memo(GameCard);
