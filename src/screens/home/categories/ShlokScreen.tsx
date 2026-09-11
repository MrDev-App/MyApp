import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Translation } from '@i18n/language';

interface ShlokScreenProps {
  items: any[];
}

const ShlokScreen: React.FC<ShlokScreenProps> = ({ items }) => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith('hi');

  return (
    <View style={styles.shlokList}>
      {items.map(item => {
        const name = isHindi ? item.nameHi : item.nameEn;
        const text = isHindi ? item.textHi : item.textEn;
        const splitSeparator = t(Translation.SHLOK_TRANSLATION_SEPARATOR);
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
    backgroundColor: colors.accentLightBgSubtle,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    borderWidth: 2,
    borderColor: colors.accentOrangeBg,
    borderStyle: 'dashed',
  },
  shlokName: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    marginBottom: scale(8),
  },
  shlokContent: {
    backgroundColor: colors.cardWhiteMedium,
    borderRadius: scale(12),
    padding: scale(14),
  },
  shlokTextHi: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: fs(24),
  },
  shlokDivider: {
    height: 1,
    backgroundColor: colors.accentOrangeBg,
    marginVertical: scale(10),
  },
  shlokTextEn: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: fs(18),
  },
});
