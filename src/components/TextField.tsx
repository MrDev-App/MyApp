import React, { forwardRef, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Keyboard,
  Platform,
  InputAccessoryView,
  TouchableOpacity,
} from 'react-native';
import colors from '@theme/colors';
import { scale, verticalScale, fs } from '@theme/sizes';
import fonts from '@theme/fonts';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
  reserveErrorSpace?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      isRequired = false,
      error,
      helperText,
      reserveErrorSpace = true,
      containerStyle,
      labelStyle,
      inputStyle,
      leftIcon,
      rightIcon,
      placeholderTextColor = colors.neutralDisabled,
      ...restProps
    },
    ref,
  ) => {
    const { t } = useAppLanguage();
    const defaultAccessoryIdRef = useRef(
      `input_accessory_${Math.random().toString(36).substring(2, 9)}`,
    );
    const accessoryId =
      restProps.inputAccessoryViewID || defaultAccessoryIdRef.current;

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <View style={styles.labelRow}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            {isRequired ? (
              <Text style={styles.requiredAsterisk}> *</Text>
            ) : null}
          </View>
        ) : null}

        <View
          style={[
            styles.inputWrapper,
            Boolean(error) && styles.inputWrapperError,
            restProps.multiline && styles.inputWrapperMultiline,
          ]}
        >
          {leftIcon ? (
            <View style={styles.leftIconContainer}>{leftIcon}</View>
          ) : null}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              restProps.multiline && styles.inputMultiline,
              inputStyle,
            ]}
            blurOnSubmit={true}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            inputAccessoryViewID={
              Platform.OS === 'ios' ? accessoryId : undefined
            }
            placeholderTextColor={placeholderTextColor}
            {...restProps}
          />

          {rightIcon ? (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          ) : null}
        </View>

        {Platform.OS === 'ios' ? (
          <InputAccessoryView nativeID={accessoryId}>
            <View style={styles.accessoryContainer}>
              <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                style={styles.accessoryDoneButton}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
              >
                <Text style={styles.accessoryDoneText}>
                  {t(Translation.DONE)}
                </Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        ) : null}

        {reserveErrorSpace || error || helperText ? (
          <View style={styles.errorContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : helperText ? (
              <Text style={styles.helperText}>{helperText}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  },
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: verticalScale(2),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  label: {
    fontSize: fs(12.5),
    fontWeight: '600',
    color: colors.secondary,
    fontFamily: fonts.TiroHindiRegular,
  },
  requiredAsterisk: {
    fontSize: fs(13),
    fontWeight: '700',
    color: colors.destructive,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentOrangeLight,
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: colors.accentOrangeMedium,
    paddingHorizontal: scale(12),
    minHeight: scale(42),
  },
  inputWrapperMultiline: {
    minHeight: verticalScale(60),
    alignItems: 'flex-start',
    paddingVertical: verticalScale(8),
  },
  inputWrapperError: {
    borderColor: colors.destructive,
  },
  input: {
    flex: 1,
    fontSize: fs(13),
    color: colors.black,
    paddingVertical: verticalScale(8),
    paddingHorizontal: 0,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingVertical: 0,
    minHeight: verticalScale(44),
  },
  leftIconContainer: {
    marginRight: scale(8),
  },
  rightIconContainer: {
    marginLeft: scale(8),
  },
  errorContainer: {
    minHeight: verticalScale(16),
    justifyContent: 'center',
  },
  errorText: {
    fontSize: fs(11),
    color: colors.destructive,
    marginLeft: scale(4),
    fontFamily: fonts.TiroHindiRegular,
  },
  helperText: {
    fontSize: fs(11),
    color: colors.neutralDisabled,
    marginLeft: scale(4),
    fontFamily: fonts.TiroHindiRegular,
  },
  accessoryContainer: {
    height: verticalScale(42),
    backgroundColor: colors.accessoryBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  accessoryDoneButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(8),
  },
  accessoryDoneText: {
    color: colors.ring,
    fontSize: fs(15),
    fontWeight: '600',
  },
});

export default TextField;
