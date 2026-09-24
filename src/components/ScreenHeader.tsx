import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Back } from '@assets/index';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';

export interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  backIconStroke?: string;
  numberOfLines?: number;
}

/**
 * Standardized ScreenHeader component across GuruVani child screens.
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  showBack = true,
  rightElement,
  containerStyle,
  titleStyle,
  backIconStroke = colors.white,
  numberOfLines = 1,
}) => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, containerStyle]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Back width={scale(14)} height={scale(14)} stroke={backIconStroke} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}

      {title ? (
        <Text
          style={[styles.headerTitle, titleStyle]}
          numberOfLines={numberOfLines}
        >
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {rightElement ? (
        <View style={styles.rightContainer}>{rightElement}</View>
      ) : showBack ? (
        <View style={styles.backButtonPlaceholder} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    minHeight: scale(48),
  },
  backButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(18),
    backgroundColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: scale(36),
    height: scale(36),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fs(18),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.black,
    marginHorizontal: scale(8),
  },
  rightContainer: {
    minWidth: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenHeader;
