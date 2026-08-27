import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';

export type OverlayOrigin = { x: number; y: number };

export type OverlayModalHandle = {
  open: (origin?: OverlayOrigin) => void;
  close: () => void;
};

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  closeOnBackdropPress?: boolean;
  onClose?: () => void;
};

const OverlayModal = forwardRef<OverlayModalHandle, Props>(
  (
    {
      children,
      backgroundColor = 'rgba(0, 0, 0, 0.55)',
      closeOnBackdropPress = false,
      onClose,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close: handleClose,
    }));

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={StyleSheet.absoluteFill}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />

          {closeOnBackdropPress && (
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={handleClose}
            />
          )}

          {/* Modal Content */}
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {children}
          </View>
        </View>
      </Modal>
    );
  },
);

export default OverlayModal;
