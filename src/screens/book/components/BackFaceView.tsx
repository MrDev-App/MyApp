import React from 'react';
import { View, Text } from 'react-native';

import colors from '@theme/colors';
import { BackFaceViewProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { getStrings } from './FlipBookCover.strings';

export const BackFaceView: React.FC<BackFaceViewProps> = React.memo(
  ({ isCoverBack, theme, source, currentLang = 'hi' }) => {
    const strings = getStrings(currentLang);
    const isDark =
      theme.bg === '#121215' ||
      theme.bg === colors.black ||
      theme.statusBar === 'light-content';

    return (
      <View
        style={[
          styles.coverFaceBack,
          {
            backgroundColor: isDark ? '#161922' : '#FBF8F2',
          },
        ]}
      >
        <View
          style={[
            styles.backFaceInnerBorder,
            {
              borderColor: isDark
                ? 'rgba(218, 165, 32, 0.3)'
                : 'rgba(218, 165, 32, 0.45)',
            },
          ]}
        >
          <Text style={styles.backFaceOm}>ॐ</Text>
          <Text style={[styles.backFaceMantra, { color: theme.accent }]}>
            {strings.dedicationMantra}
          </Text>

          <View style={styles.backFaceDivider} />

          <Text style={[styles.backFaceDedicationTitle, { color: theme.text }]}>
            {strings.dedicationTitle}
          </Text>
          <Text
            style={[
              styles.backFaceDedicationBody,
              { color: theme.textSecondary },
            ]}
            numberOfLines={4}
          >
            {isCoverBack
              ? strings.dedicationBodyCover
              : strings.dedicationBodyPage}
          </Text>

          <View style={styles.backFaceDivider} />

          {source ? (
            <Text
              style={[
                styles.backFaceSourceNote,
                { color: theme.textSecondary },
              ]}
            >
              {source}
            </Text>
          ) : null}
        </View>
      </View>
    );
  },
);

export default BackFaceView;
