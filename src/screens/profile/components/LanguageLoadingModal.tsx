import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import BlurBackdrop from '@components/BlurBackdrop';
import LottieView from 'lottie-react-native';
import imagePath from '@assets/index';
import colors from '@theme/colors';
import { scale } from '@theme/sizes';

interface LanguageLoadingModalProps {
  visible: boolean;
}

const LanguageLoadingModal: React.FC<LanguageLoadingModalProps> = ({
  visible,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <BlurBackdrop
          blurType="dark"
          blurAmount={8}
          overlayColor={colors.overlayBackdrop}
          fallbackColor={colors.overlayBackdrop}
        />
        <LottieView
          source={imagePath.loading}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: scale(70),
    height: scale(70),
  },
});

export default LanguageLoadingModal;
