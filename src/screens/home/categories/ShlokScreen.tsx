import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';

interface ShlokScreenProps {
  items: any[];
}

const ShlokScreen: React.FC<ShlokScreenProps> = ({ items }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <View style={styles.shlokList}>
      {items.map(item => {
        const name = currentLanguage === 'hi' ? item.nameHi : item.nameEn;
        const text = currentLanguage === 'hi' ? item.textHi : item.textEn;
        const splitSeparator =
          currentLanguage === 'hi' ? '\n\nअनुवाद:\n' : '\n\nTranslation:\n';
        const parts = text.split(splitSeparator);
        const sanskritText = parts[0];
        const translationText = parts[1];
        return (
          <View key={item.id} style={styles.shlokCard}>
            <Text style={styles.shlokName}>{name}</Text>

            <View style={styles.shlokContent}>
              <Text style={styles.shlokTextHi}>{sanskritText}</Text>
              {translationText && (
                <>
                  <View style={styles.shlokDivider} />
                  <Text style={styles.shlokTextEn}>{translationText}</Text>
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ShlokScreen;

const styles = StyleSheet.create({
  shlokList: {
    width: '100%',
  },
  shlokCard: {
    backgroundColor: 'rgba(252, 224, 180, 0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    borderWidth: 2,
    borderColor: 'rgba(251, 148, 55, 0.15)',
    borderStyle: 'dashed',
  },
  shlokName: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginBottom: scale(8),
  },
  shlokContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(12),
    padding: scale(14),
  },
  shlokTextHi: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(24),
  },
  shlokDivider: {
    height: 1,
    backgroundColor: 'rgba(251, 148, 55, 0.15)',
    marginVertical: scale(10),
  },
  shlokTextEn: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: fs(18),
  },
});
