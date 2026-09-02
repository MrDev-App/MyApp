import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale, verticalScale } from '@theme/sizes';
import imagePath from '@assets/index';

type SwitchMantraModalProps = {
  visible: boolean;
  targetMantraName: string;
  onCancel: () => void;
  onConfirm: () => void;
  currentLanguage?: 'en' | 'hi';
};

const SwitchMantraModal = ({
  visible,
  targetMantraName,
  onCancel,
  onConfirm,
  currentLanguage = 'en',
}: SwitchMantraModalProps) => {
  if (!visible) return null;

  const isHi = currentLanguage === 'hi';

  const title = isHi ? 'मंत्र बदलें?' : 'Switch Mantra?';
  const description = isHi
    ? `"${targetMantraName}" पर स्विच करने से आपका वर्तमान जाप काउंटर रीसेट हो जाएगा। क्या आप आगे बढ़ना चाहते हैं?`
    : `Switching to "${targetMantraName}" will reset your current count progress. Do you want to continue?`;
  const cancelText = isHi ? 'रद्द करें' : 'Cancel';
  const confirmText = isHi ? 'बदलें और रीसेट करें' : 'Switch & Reset';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <View style={styles.iconContainer}>
                <Image source={imagePath.mala} style={styles.malaIcon} />
              </View>

              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.descriptionText}>{description}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelBtnText}>{cancelText}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmBtnText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.2)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(8) },
    shadowOpacity: 0.15,
    shadowRadius: scale(16),
    elevation: 8,
  },
  iconContainer: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
  },
  malaIcon: {
    width: scale(25),
    height: scale(25),
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  descriptionText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: fs(20),
    marginBottom: verticalScale(20),
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: scale(10),
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: verticalScale(11),
    borderRadius: scale(12),
    backgroundColor: 'rgba(183, 168, 151, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.25)',
  },
  cancelBtnText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  confirmBtn: {
    flex: 1.2,
    paddingVertical: verticalScale(11),
    borderRadius: scale(12),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.2,
    shadowRadius: scale(6),
    elevation: 3,
  },
  confirmBtnText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
});

export default SwitchMantraModal;
