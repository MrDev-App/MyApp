import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../i18n/language';
import OverlayModal, { OverlayModalHandle } from '../../../components/OverlayModal';
import colors from '../../../utile/colors';
import profileStyles from '../styles/profileStyles';

interface ResetModalProps {
  modalRef: React.RefObject<OverlayModalHandle | null>;
  checkedChants: boolean;
  setCheckedChants: (v: boolean) => void;
  checkedChallenge: boolean;
  setCheckedChallenge: (v: boolean) => void;
  resetCode: string;
  setResetCode: (v: string) => void;
  isResetEnabled: boolean;
  onClose: () => void;
  onExecute: () => void;
}

const ResetModal: React.FC<ResetModalProps> = ({
  modalRef,
  checkedChants,
  setCheckedChants,
  checkedChallenge,
  setCheckedChallenge,
  resetCode,
  setResetCode,
  isResetEnabled,
  onClose,
  onExecute,
}) => {
  const { t } = useTranslation();

  return (
    <OverlayModal ref={modalRef} closeOnBackdropPress={true}>
      <View style={profileStyles.modalCenterContainer}>
        <View style={profileStyles.modalCard}>
          <TouchableOpacity
            style={profileStyles.modalCloseBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={profileStyles.modalCloseBtnText}>✕</Text>
          </TouchableOpacity>

          <Text style={profileStyles.modalTitleDestructive}>
            ⚠️ {t(Translation.RESET_MODAL_TITLE)}
          </Text>

          <Text style={profileStyles.modalDescription}>
            {t(Translation.RESET_MODAL_DESC)}
          </Text>

          {/* Checkbox 1 – Chants */}
          <TouchableOpacity
            style={profileStyles.checkboxRow}
            onPress={() => setCheckedChants(!checkedChants)}
            activeOpacity={0.8}
          >
            <View style={[profileStyles.checkbox, checkedChants && profileStyles.checkboxActive]}>
              {checkedChants && <Text style={profileStyles.checkboxTick}>✓</Text>}
            </View>
            <Text style={profileStyles.checkboxLabel}>{t(Translation.RESET_CONFIRM_LBL1)}</Text>
          </TouchableOpacity>

          {/* Checkbox 2 – Challenge */}
          <TouchableOpacity
            style={profileStyles.checkboxRow}
            onPress={() => setCheckedChallenge(!checkedChallenge)}
            activeOpacity={0.8}
          >
            <View style={[profileStyles.checkbox, checkedChallenge && profileStyles.checkboxActive]}>
              {checkedChallenge && <Text style={profileStyles.checkboxTick}>✓</Text>}
            </View>
            <Text style={profileStyles.checkboxLabel}>{t(Translation.RESET_CONFIRM_LBL2)}</Text>
          </TouchableOpacity>

          {/* Confirmation code input */}
          <Text style={profileStyles.resetConfirmLabel}>
            {t(Translation.RESET_CONFIRM_TYPE)}
          </Text>
          <TextInput
            style={profileStyles.resetTextInput}
            value={resetCode}
            onChangeText={setResetCode}
            placeholder="RESET"
            placeholderTextColor={colors.neutralDisabled}
            autoCapitalize="characters"
          />

          {/* Action buttons */}
          <View style={profileStyles.resetActionRow}>
            <TouchableOpacity
              style={profileStyles.resetCancelBtn}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={profileStyles.resetCancelText}>
                {t(Translation.RESET_CANCEL_BTN)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                profileStyles.resetConfirmBtn,
                !isResetEnabled && profileStyles.resetConfirmBtnDisabled,
              ]}
              onPress={onExecute}
              disabled={!isResetEnabled}
              activeOpacity={0.8}
            >
              <Text style={profileStyles.resetConfirmText}>
                {t(Translation.RESET_CONFIRM_BTN)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </OverlayModal>
  );
};

export default React.memo(ResetModal);
