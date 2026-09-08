import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { JapLevel } from '@constants/japLevels';
import { triggerHaptic } from '@helper/helper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NODE_SIZE = scale(68);
const ROW_HEIGHT = scale(120);

// Serpentine X-coordinates pattern (percentages of usable width)
// e.g. center -> right -> center -> left -> center...
const X_OFFSETS = [0.5, 0.76, 0.5, 0.24, 0.5, 0.76, 0.5, 0.24, 0.5, 0.5];

interface PathJourneyProps {
  levels: JapLevel[];
  currentLevel: JapLevel;
  totalMalas: number;
  currentLanguage: 'en' | 'hi';
  onSelectLevel: (level: JapLevel) => void;
}

interface NodeProps {
  level: JapLevel;
  index: number;
  cx: number;
  cy: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  currentLanguage: 'en' | 'hi';
  onPress: () => void;
}

const JourneyNode: React.FC<NodeProps> = ({
  level,
  cx,
  cy,
  isCompleted,
  isCurrent,
  isLocked,
  currentLanguage,
  onPress,
}) => {
  // Pulsing animation for current level
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (isCurrent) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.2, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.7, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [isCurrent, pulseScale, pulseOpacity]);

  const animatedHaloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const animatedNodeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const handlePress = () => {
    if (isLocked) {
      triggerHaptic('week');
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withSpring(0),
      );
    } else {
      triggerHaptic('week');
    }
    onPress();
  };

  const name = currentLanguage === 'hi' ? level.nameHi : level.nameEn;

  return (
    <View
      style={[
        styles.nodeWrapper,
        {
          left: cx - NODE_SIZE / 2,
          top: cy - NODE_SIZE / 2,
        },
      ]}
    >
      {/* Animated Glowing Halo for Current Level */}
      {isCurrent && (
        <Animated.View
          style={[
            styles.pulseHalo,
            { backgroundColor: colors.goldAura, borderColor: colors.pathActiveLine },
            animatedHaloStyle,
          ]}
        />
      )}

      {/* Main Interactive Button */}
      <Animated.View style={animatedNodeStyle}>
        <TouchableOpacity
          style={[
            styles.nodeButton,
            isCompleted && styles.nodeCompleted,
            isCurrent && styles.nodeCurrent,
            isLocked && styles.nodeLocked,
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          {/* Level Icon or Lock */}
          <Text style={styles.nodeIcon}>{level.icon}</Text>

          {/* Status Badge */}
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.badgeText}>✓</Text>
            </View>
          )}

          {isCurrent && (
            <View style={styles.currentBadge}>
              <Text style={styles.badgeStar}>★</Text>
            </View>
          )}

          {isLocked && (
            <View style={styles.lockBadge}>
              <Text style={styles.lockText}>🔒</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Level Label */}
      <View style={styles.nodeLabelContainer}>
        <Text
          style={[
            styles.nodeName,
            isCurrent && styles.nodeNameCurrent,
            isLocked && styles.nodeNameLocked,
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text style={styles.nodeMalas}>
          {level.requiredMalas === 0
            ? currentLanguage === 'hi'
              ? 'शुरुआत'
              : 'Start'
            : `${level.requiredMalas} ${currentLanguage === 'hi' ? 'माला' : 'Malas'}`}
        </Text>
      </View>
    </View>
  );
};

export const PathJourney: React.FC<PathJourneyProps> = ({
  levels,
  currentLevel,
  currentLanguage,
  onSelectLevel,
}) => {
  const contentWidth = SCREEN_WIDTH;
  const paddingX = scale(32);
  const usableWidth = contentWidth - paddingX * 2;

  // Calculate coordinates for all nodes
  const nodePositions = levels.map((lvl, index) => {
    const ratio = X_OFFSETS[index % X_OFFSETS.length];
    const cx = paddingX + usableWidth * ratio;
    const cy = scale(40) + index * ROW_HEIGHT + ROW_HEIGHT / 2;
    return { level: lvl, cx, cy, index };
  });

  const totalHeight = nodePositions[nodePositions.length - 1].cy + scale(80);

  // Generate SVG path connecting points sequentially
  let pathD = '';
  if (nodePositions.length > 0) {
    pathD = `M ${nodePositions[0].cx} ${nodePositions[0].cy}`;
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[i + 1];
      const midY = (p1.cy + p2.cy) / 2;
      pathD += ` C ${p1.cx} ${midY}, ${p2.cx} ${midY}, ${p2.cx} ${p2.cy}`;
    }
  }

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      {/* SVG Connecting Curves */}
      <Svg width={contentWidth} height={totalHeight} style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={colors.goldBeadActive} />
            <Stop offset="50%" stopColor={colors.pathActiveLine} />
            <Stop offset="100%" stopColor={colors.secondary} />
          </SvgGradient>
        </Defs>

        {/* Glow Path Line */}
        <Path
          d={pathD}
          stroke={colors.pathGlow}
          strokeWidth={scale(10)}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Core Connecting Path Line */}
        <Path
          d={pathD}
          stroke="url(#pathGradient)"
          strokeWidth={scale(5)}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      {/* Nodes Rendered over the Path */}
      {nodePositions.map(({ level, cx, cy, index }) => {
        const isCompleted = level.level < currentLevel.level;
        const isCurrent = level.level === currentLevel.level;
        const isLocked = level.level > currentLevel.level;

        return (
          <JourneyNode
            key={level.level}
            level={level}
            index={index}
            cx={cx}
            cy={cy}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            isLocked={isLocked}
            currentLanguage={currentLanguage}
            onPress={() => onSelectLevel(level)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  nodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: NODE_SIZE,
    height: NODE_SIZE,
  },
  pulseHalo: {
    position: 'absolute',
    width: NODE_SIZE + scale(24),
    height: NODE_SIZE + scale(24),
    borderRadius: (NODE_SIZE + scale(24)) / 2,
    borderWidth: 2,
  },
  nodeButton: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  nodeCompleted: {
    backgroundColor: colors.levelCompletedBg,
    borderWidth: 2.5,
    borderColor: colors.goldBeadActive,
  },
  nodeCurrent: {
    backgroundColor: colors.pathActiveLine,
    borderWidth: 3.5,
    borderColor: colors.goldBeadActive,
  },
  nodeLocked: {
    backgroundColor: colors.levelLockedBg,
    borderWidth: 1.5,
    borderColor: colors.levelLockedBorder,
    opacity: 0.75,
  },
  nodeIcon: {
    fontSize: fs(28),
  },
  completedBadge: {
    position: 'absolute',
    top: -scale(4),
    right: -scale(4),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: colors.goldBeadActive,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  badgeText: {
    color: colors.primary,
    fontSize: fs(11),
    fontFamily: fonts.PoppinsBold,
  },
  currentBadge: {
    position: 'absolute',
    top: -scale(6),
    right: -scale(6),
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: colors.goldBeadActive,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  badgeStar: {
    color: colors.primary,
    fontSize: fs(12),
    fontFamily: fonts.PoppinsBold,
  },
  lockBadge: {
    position: 'absolute',
    bottom: -scale(2),
    right: -scale(2),
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockText: {
    fontSize: fs(9),
  },
  nodeLabelContainer: {
    position: 'absolute',
    top: NODE_SIZE + scale(4),
    width: scale(110),
    alignItems: 'center',
  },
  nodeName: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsBold,
    color: colors.primary,
    textAlign: 'center',
  },
  nodeNameCurrent: {
    color: colors.goldBeadGlow,
    fontFamily: fonts.PoppinsBold,
    fontSize: fs(13),
  },
  nodeNameLocked: {
    color: colors.warmTaupe,
    fontFamily: fonts.PoppinsMedium,
  },
  nodeMalas: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: scale(1),
  },
});

export default React.memo(PathJourney);
