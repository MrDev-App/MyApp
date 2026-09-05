import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import AnimatedButton from '@components/AnimatedButton';
import { fs, scale } from '@theme/sizes';
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
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>
            Unlock "{bookTitle}"
          </Text>
          <Text style={styles.subtitle}>
            Watch a short ad to unlock this book for today.
          </Text>
          <View style={styles.buttonRow}>
            <AnimatedButton style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </AnimatedButton>
            <AnimatedButton
              style={[styles.watchBtn, isAdLoading && styles.watchBtnDisabled]}
              onPress={onWatchAd}
              disabled={isAdLoading}
            >
              <Text style={styles.watchText}>
                {isAdLoading ? 'Loading ad...' : 'Watch Ad'}
              </Text>
            </AnimatedButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(20),
  },
  title: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(8),
  },
  subtitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
    marginBottom: scale(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
  cancelText: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.neutralDisabled,
    fontSize: fs(13),
  },
  watchBtn: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    backgroundColor: colors.ring,
    borderRadius: scale(10),
    marginLeft: scale(12),
  },
  watchBtnDisabled: {
    opacity: 0.6,
  },
  watchText: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
    fontSize: fs(13),
  },
});

export default UnlockAdModal;
