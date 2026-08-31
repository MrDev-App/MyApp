import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';

type AddCustomMantraModalProps = {
  visible: boolean;
  currentLanguage: 'en' | 'hi';
  onClose: () => void;
  onSave: (mantra: {
    nameEn: string;
    nameHi: string;
    textEn: string;
    textHi: string;
  }) => void;
};

const AddCustomMantraModal = ({
  visible,
  currentLanguage,
  onClose,
  onSave,
}: AddCustomMantraModalProps) => {
  const insets = useSafeAreaInsets();
  const [nameEn, setNameEn] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [textEn, setTextEn] = useState('');
  const [textHi, setTextHi] = useState('');

  const scaleValue = useSharedValue(0.9);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scaleValue.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
      opacityValue.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      scaleValue.value = 0.9;
      opacityValue.value = 0;
    }
  }, [visible, scaleValue, opacityValue]);

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  });

  const handleSave = () => {
    // Basic validation
    if (!nameEn.trim() && !nameHi.trim()) {
      Alert.alert(
        currentLanguage === 'hi' ? 'त्रुटि' : 'Error',
        currentLanguage === 'hi'
          ? 'कृपया कम से कम एक भाषा में नाम दर्ज करें।'
          : 'Please enter at least one name.',
      );
      return;
    }

    onSave({
      nameEn: nameEn.trim(),
      nameHi: nameHi.trim(),
      textEn: textEn.trim(),
      textHi: textHi.trim(),
    });
    // Clear inputs after save
    setNameEn('');
    setNameHi('');
    setTextEn('');
    setTextHi('');
  };

  const handleCancel = () => {
    setNameEn('');
    setNameHi('');
    setTextEn('');
    setTextHi('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={[styles.modalOverlay, animatedOverlayStyle]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.customMantraModalCard,
                  { marginBottom: insets.bottom + scale(16) },
                ]}
              >
                <Text style={styles.modalTitle}>
                  {currentLanguage === 'hi'
                    ? 'नया कस्टम मंत्र जोड़ें'
                    : 'Add Custom Mantra'}
                </Text>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
                >
                  <Text style={styles.inputLabel}>
                    {currentLanguage === 'hi'
                      ? 'मंत्र का नाम (English):'
                      : 'Mantra Name (English):'}
                  </Text>
                  <TextInput
                    style={styles.modalInput}
                    value={nameEn}
                    onChangeText={setNameEn}
                    placeholder="e.g. Ram Mantra"
                    placeholderTextColor={colors.neutralDisabled}
                  />

                  <Text style={styles.inputLabel}>
                    {currentLanguage === 'hi'
                      ? 'मंत्र का नाम (हिन्दी):'
                      : 'Mantra Name (Hindi):'}
                  </Text>
                  <TextInput
                    style={styles.modalInput}
                    value={nameHi}
                    onChangeText={setNameHi}
                    placeholder="उदा. राम मंत्र"
                    placeholderTextColor={colors.neutralDisabled}
                  />

                  <Text style={styles.inputLabel}>
                    {currentLanguage === 'hi'
                      ? 'मंत्र का पाठ (English):'
                      : 'Mantra Text (English):'}
                  </Text>
                  <TextInput
                    style={[styles.modalInput, styles.multilineInput]}
                    value={textEn}
                    onChangeText={setTextEn}
                    placeholder="e.g. Om Ram Ramaya Namaha"
                    multiline
                    placeholderTextColor={colors.neutralDisabled}
                  />

                  <Text style={styles.inputLabel}>
                    {currentLanguage === 'hi'
                      ? 'मंत्र का पाठ (हिन्दी):'
                      : 'Mantra Text (Hindi):'}
                  </Text>
                  <TextInput
                    style={[styles.modalInput, styles.multilineInput]}
                    value={textHi}
                    onChangeText={setTextHi}
                    placeholder="उदा. ॐ राम रामाय नमः"
                    multiline
                    placeholderTextColor={colors.neutralDisabled}
                  />
                </ScrollView>

                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    style={[styles.modalBtn, styles.modalCancelBtn]}
                    onPress={handleCancel}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.modalCancelText}>
                      {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalBtn, styles.modalSaveBtn]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.modalSaveText}>
                      {currentLanguage === 'hi' ? 'सहेजें' : 'Save'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  customMantraModalCard: {
    width: '100%',
    maxHeight: '85%',
    flexShrink: 1,
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(-4) },
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 5,
    marginBottom: scale(16),
  },
  modalTitle: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
    marginBottom: scale(16),
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingBottom: scale(10),
  },
  inputLabel: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.mutedForeground,
    marginBottom: scale(4),
    marginTop: scale(8),
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    backgroundColor: colors.borderSubtle2,
    marginBottom: scale(8),
  },
  multilineInput: {
    minHeight: scale(50),
    textAlignVertical: 'top',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(12),
    marginTop: scale(20),
  },
  modalBtn: {
    paddingHorizontal: scale(18),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelBtn: {
    backgroundColor: colors.borderSubtle2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  modalSaveBtn: {
    backgroundColor: colors.ring,
  },
  modalCancelText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  modalSaveText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
});

export default AddCustomMantraModal;
