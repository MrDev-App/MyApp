import React from 'react';
import { View, Text } from 'react-native';

import { BackFaceViewProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { useAppLanguage } from '@hooks';
import { Translation } from '@i18n/language';

export const BackFaceView: React.FC<BackFaceViewProps> = React.memo(
  ({ isCoverBack, source }) => {
    const { t } = useAppLanguage();

    return (
      <View style={styles.coverFaceBack}>
        <View style={styles.backFaceInnerBorder}>
          <Text style={styles.backFaceOm}>ॐ</Text>
          <Text style={styles.backFaceMantra}>
            {t(Translation.BOOK_DEDICATION_MANTRA)}
          </Text>

          <View style={styles.backFaceDivider} />

          <Text style={styles.backFaceDedicationTitle}>
            {t(Translation.BOOK_DEDICATION_TITLE)}
          </Text>
          <Text style={styles.backFaceDedicationBody} numberOfLines={4}>
            {isCoverBack
              ? t(Translation.BOOK_DEDICATION_BODY_COVER)
              : t(Translation.BOOK_DEDICATION_BODY_PAGE)}
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
