import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import OverlayModal, { OverlayModalHandle } from '@components/OverlayModal';
import profileStyles from '../styles/profileStyles';

interface ComingSoonModalProps {
  modalRef: React.RefObject<OverlayModalHandle | null>;
  onClose?: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  modalRef,
  onClose,
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    modalRef.current?.close();
    onClose?.();
  };

  return (
    <OverlayModal ref={modalRef} closeOnBackdropPress={true}>
      <View style={profileStyles.modalCenterContainer}>
        <View style={profileStyles.modalCard}>
          <Text style={profileStyles.modalIcon}>✨</Text>
          <Text style={profileStyles.modalTitle}>
            {t(Translation.PROFILE_COMING_SOON)}
          </Text>
          <Text style={profileStyles.modalMessage}>
            {t(Translation.PROFILE_COMING_SOON_DESC)}
          </Text>
          <TouchableOpacity
            style={profileStyles.modalButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={profileStyles.modalButtonText}>
              {t(Translation.PROFILE_OKAY)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </OverlayModal>
  );
};

export default ComingSoonModal;
