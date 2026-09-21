import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import BlurBackdrop from '@components/BlurBackdrop';
import { fs, scale, verticalScale } from '@theme/sizes';
import fonts from '@theme/fonts';
import colors from '@theme/colors';

interface UnlockAdModalProps {
  visible: boolean;
  bookTitle: string;
  isAdLoading?: boolean;
  onCancel: () => void;
  onWatchAd: () => void;
}

const UnlockAdModal: React.FC<UnlockAdModalProps> = ({
  visible,
  bookTitle,
  isAdLoading = false,
  onCancel,
  onWatchAd,
}) => {
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setTimedOut(false);
      const timer = setTimeout(() => {
        setTimedOut(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const showLoading = isAdLoading && !timedOut;

  return (
    <View style={styles.fullscreenOverlay} pointerEvents="auto">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={StyleSheet.absoluteFill}>
          <BlurBackdrop />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={2}>
          Unlock "{bookTitle}"
        </Text>
        <Text style={styles.subtitle}>
          Watch a short ad to unlock this book for today.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.watchBtn, showLoading && styles.watchBtnDisabled]}
            onPress={onWatchAd}
            disabled={showLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.watchText}>
              {showLoading ? 'Loading ad...' : 'Watch Ad'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(18),
    padding: scale(20),
    borderWidth: 1,
    borderColor: colors.accentOrangeMedium,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: scale(6) },
    shadowOpacity: 0.2,
    shadowRadius: scale(12),
    elevation: 8,
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: verticalScale(6),
  },
  subtitle: {
    fontSize: fs(13),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
    marginBottom: verticalScale(18),
    lineHeight: fs(18),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(10),
  },
  cancelBtn: {
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(16),
    borderRadius: scale(10),
    backgroundColor: colors.borderSubtle2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
    fontSize: fs(13),
  },
  watchBtn: {
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(18),
    backgroundColor: colors.ring,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchBtnDisabled: {
    opacity: 0.6,
  },
  watchText: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
    fontSize: fs(13),
    fontWeight: '600',
  },
});

export default UnlockAdModal;
