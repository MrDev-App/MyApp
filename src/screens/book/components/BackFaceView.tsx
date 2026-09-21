import React from 'react';
import { View, Text } from 'react-native';

import { BackFaceViewProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { getStrings } from './FlipBookCover.strings';

export const BackFaceView: React.FC<BackFaceViewProps> = React.memo(
  ({ isCoverBack, source, currentLang = 'hi' }) => {
    const strings = getStrings(currentLang);

    return (
      <View style={styles.coverFaceBack}>
        <View style={styles.backFaceInnerBorder}>
          <Text style={styles.backFaceOm}>ॐ</Text>
          <Text style={styles.backFaceMantra}>{strings.dedicationMantra}</Text>

          <View style={styles.backFaceDivider} />

          <Text style={styles.backFaceDedicationTitle}>
            {strings.dedicationTitle}
          </Text>
          <Text style={styles.backFaceDedicationBody} numberOfLines={4}>
            {isCoverBack
              ? strings.dedicationBodyCover
              : strings.dedicationBodyPage}
          </Text>

          <View style={styles.backFaceDivider} />

          {source ? (
            <Text style={styles.backFaceSourceNote}>{source}</Text>
          ) : null}
        </View>
      </View>
    );
  },
);

export default BackFaceView;
