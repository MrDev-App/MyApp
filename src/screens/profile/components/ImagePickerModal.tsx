import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';
import OverlayModal, { OverlayModalHandle } from '@components/OverlayModal';
import { CameraIcon, ImageIcon, TrashIcon } from '@components/icons/SvgIcons';
import { requestCameraPermission } from '@services/permissionService';
import { suppressNextAppOpenAd } from '@admob/useAppOpenAd';
import { triggerHaptic } from '@utils/haptics';
import colors from '@theme/colors';
import { scale } from '@theme/sizes';
import profileStyles from '../styles/profileStyles';

interface ImagePickerModalProps {
  modalRef: React.RefObject<OverlayModalHandle | null>;
  hasExistingImage?: boolean;
  onImageSelected: (uri: string) => void;
  onRemoveImage?: () => void;
}

const cameraOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 600,
  maxWidth: 600,
  quality: 0.8,
  cameraType: 'front',
  saveToPhotos: false,
};

const libraryOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 600,
  maxWidth: 600,
  quality: 0.8,
  selectionLimit: 1,
};

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  modalRef,
  hasExistingImage = false,
  onImageSelected,
  onRemoveImage,
}) => {
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    triggerHaptic('light');
    modalRef.current?.close();
  }, [modalRef]);

  const handleTakePhoto = useCallback(async () => {
    handleClose();
    triggerHaptic('light');

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    suppressNextAppOpenAd(60000);

    launchCamera(cameraOptions, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unable to open camera');
        return;
      }
      const selectedUri = response.assets?.[0]?.uri;
      if (selectedUri) {
        onImageSelected(selectedUri);
      }
    });
  }, [handleClose, onImageSelected]);

  const handleChooseFromGallery = useCallback(() => {
    handleClose();
    triggerHaptic('light');

    suppressNextAppOpenAd(60000);

    launchImageLibrary(libraryOptions, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unable to open gallery');
        return;
      }
      const selectedUri = response.assets?.[0]?.uri;
      if (selectedUri) {
        onImageSelected(selectedUri);
      }
    });
  }, [handleClose, onImageSelected]);

  const handleRemove = useCallback(() => {
    handleClose();
    triggerHaptic('medium');
    onRemoveImage?.();
  }, [handleClose, onRemoveImage]);

  return (
    <OverlayModal ref={modalRef} closeOnBackdropPress={true}>
      <View style={profileStyles.modalCenterContainer}>
        <View style={profileStyles.modalCard}>
          <Text style={profileStyles.modalTitle}>
            {t(Translation.PROFILE_IMAGE_MODAL_TITLE)}
          </Text>
          <Text style={profileStyles.modalMessage}>
            {t(Translation.PROFILE_IMAGE_MODAL_DESC)}
          </Text>

          <View style={profileStyles.imagePickerOptionsContainer}>
            {/* Take Photo Option */}
            <TouchableOpacity
              style={profileStyles.imagePickerOptionRow}
              onPress={handleTakePhoto}
              activeOpacity={0.7}
            >
              <View style={profileStyles.imagePickerOptionIconContainer}>
                <CameraIcon size={scale(18)} color={colors.white} />
              </View>
              <Text style={profileStyles.imagePickerOptionText}>
                {t(Translation.PROFILE_IMAGE_CAMERA)}
              </Text>
            </TouchableOpacity>

            {/* Choose from Gallery Option */}
            <TouchableOpacity
              style={profileStyles.imagePickerOptionRow}
              onPress={handleChooseFromGallery}
              activeOpacity={0.7}
            >
              <View style={profileStyles.imagePickerOptionIconContainer}>
                <ImageIcon size={scale(18)} color={colors.white} />
              </View>
              <Text style={profileStyles.imagePickerOptionText}>
                {t(Translation.PROFILE_IMAGE_GALLERY)}
              </Text>
            </TouchableOpacity>

            {/* Remove Photo Option (if exists) */}
            {hasExistingImage && (
              <TouchableOpacity
                style={profileStyles.imagePickerOptionRow}
                onPress={handleRemove}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    profileStyles.imagePickerOptionIconContainer,
                    profileStyles.imagePickerOptionIconContainerDanger,
                  ]}
                >
                  <TrashIcon size={scale(18)} color={colors.danger} />
                </View>
                <Text
                  style={[
                    profileStyles.imagePickerOptionText,
                    profileStyles.imagePickerOptionTextDanger,
                  ]}
                >
                  {t(Translation.PROFILE_IMAGE_REMOVE)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            style={profileStyles.imagePickerCancelBtn}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={profileStyles.imagePickerCancelText}>
              {t(Translation.CANCEL_LABEL)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </OverlayModal>
  );
};

export default React.memo(ImagePickerModal);
