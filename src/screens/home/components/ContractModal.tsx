import React, { useCallback, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import BlurBackdrop from '@components/BlurBackdrop';
import imagePath from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';

const { width: SCREEN_W } = Dimensions.get('window');

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

interface ContractModalProps {
  visible: boolean;
  onClose: () => void;
  onStartChallenge?: () => void;
}

interface VowLineProps {
  text: string;
}

// ── Vow Line Component ───────────────────────────────────────────────────────
const VowLine: React.FC<VowLineProps> = ({ text }) => (
  <View style={styles.vowTextContainer}>
    <Text style={styles.vowText}>{text}</Text>
  </View>
);

const ContractModal: React.FC<ContractModalProps> = ({
  visible,
  onClose,
  onStartChallenge,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Entrance animation values ──────────────────────────────────────────────
  const cardScale = useSharedValue(0.82);
  const cardOpacity = useSharedValue(0);
  const sealScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      cardOpacity.value = withTiming(1, {
        duration: 320,
        easing: Easing.out(Easing.cubic),
      });
      cardScale.value = withSpring(1, { damping: 18, stiffness: 180 });
      sealScale.value = withDelay(
        260,
        withSpring(1, { damping: 12, stiffness: 200 }),
      );
    } else {
      cardOpacity.value = withTiming(0, { duration: 180 });
      cardScale.value = withTiming(0.88, { duration: 180 });
      sealScale.value = withTiming(0, { duration: 140 });
    }
  }, [visible, cardOpacity, cardScale, sealScale]);

  useEffect(() => {
    return () => {
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const sealStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sealScale.value }],
  }));

  const handleNavigateToJap = useCallback(() => {
    onStartChallenge?.();
    onClose();
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }
    navTimerRef.current = setTimeout(() => {
      try {
        navigation.navigate('BottomTabs', { screen: 'Jap' });
      } catch {
        navigation.navigate('Jap');
      }
    }, 220); // allow modal exit transition to complete
  }, [navigation, onClose, onStartChallenge]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ── Blurred backdrop ─────────────────────────────────────── */}
      <View style={styles.overlay}>
        <BlurBackdrop blurType="light" blurAmount={40} blurRadius={20} />

        <AnimatedImageBackground
          source={imagePath.letter}
          style={[styles.letterCard, cardStyle]}
          imageStyle={styles.letterImageStyle}
          resizeMode="stretch"
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.ornamentTop}>❧</Text>
            <Text style={styles.cardTitleSmall}>
              {t(Translation.CONTRACT_INVOCATION)}
            </Text>
            <Text style={styles.cardTitle}>
              {t(Translation.CONTRACT_TITLE)}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerDot}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sacred Vow Text */}
          <View style={styles.vowContainer}>
            <VowLine text={t(Translation.CONTRACT_VOW_TEXT)} />
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerDot}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Lotus Seal */}
          {/* <Animated.View style={[styles.sealContainer, sealStyle]}>
            <Image
              source={imagePath.lotus}
              style={styles.sealImage}
              resizeMode="contain"
            />
          </Animated.View> */}
        </AnimatedImageBackground>

        {/* ── CTA Button ───────────────────────────────────────────── */}
        <Animated.View style={[styles.ctaContainer, cardStyle]}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={handleNavigateToJap}
            activeOpacity={0.82}
          >
            <Text style={styles.ctaBtnEmoji}>📿</Text>
            <Text style={styles.ctaBtnText}>
              {t(Translation.CONTRACT_CTA_START_JAP)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={styles.dismissLink}
            hitSlop={{ top: scale(16), bottom: scale(16), left: scale(24), right: scale(24) }}
          >
            <Text style={styles.dismissText}>
              {t(Translation.CONTRACT_DISMISS_LATER)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.contractBackdrop,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
  },

  // ── Letter Image Card ───────────────────────────────────────────────────────
  letterCard: {
    width: SCREEN_W * 0.94,
    height: scale(400),
    paddingHorizontal: scale(70),
    paddingTop: scale(40),
    paddingBottom: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterImageStyle: {
    resizeMode: 'stretch',
  },

  cardHeader: {
    alignItems: 'center',
    marginBottom: scale(2),
  },
  ornamentTop: {
    fontSize: fs(14),
    color: colors.contractOrnament,
    marginBottom: scale(2),
  },
  cardTitleSmall: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.contractOrnament,
    letterSpacing: 1.5,
    marginBottom: scale(2),
  },
  cardTitle: {
    fontSize: fs(21),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.contractParchmentBrown,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(6),
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.contractDivider,
  },
  dividerDot: {
    fontSize: fs(8),
    color: colors.contractOrnament,
    marginHorizontal: scale(6),
    opacity: 0.8,
  },

  // ── Vow Content ────────────────────────────────────────────────────────────
  vowContainer: {
    width: '100%',
    paddingVertical: scale(2),
  },
  vowTextContainer: {
    width: '100%',
  },
  vowText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.contractParchmentBrown,
    lineHeight: fs(19),
    textAlign: 'center',
  },

  // ── Seal ───────────────────────────────────────────────────────────────────
  sealContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(4),
  },
  sealImage: {
    width: scale(32),
    height: scale(32),
  },

  // ── CTA ────────────────────────────────────────────────────────────────────
  ctaContainer: {
    width: SCREEN_W * 0.84,
    marginTop: scale(16),
    alignItems: 'center',
    gap: scale(10),
  },
  ctaBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ring,
    borderRadius: scale(12),
    paddingVertical: scale(14),
    paddingHorizontal: scale(20),
    gap: scale(8),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaBtnEmoji: {
    fontSize: fs(16),
  },
  ctaBtnText: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    letterSpacing: 0.3,
  },
  dismissLink: {
    paddingVertical: scale(4),
  },
  dismissText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.contractDismissText,
    letterSpacing: 0.5,
  },
});

export default ContractModal;
