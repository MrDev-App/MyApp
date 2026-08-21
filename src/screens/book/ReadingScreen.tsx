import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GradientBackground from '../../components/GradientBackground';
import Globalstyles from '../../utile/GlobalStyle';
import ReadingHeader from './Components/ReadingHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReadingFooter from './Components/ReadingFooter';

import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';

const ReadingScreen = () => {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  return (
    <GradientBackground style={Globalstyles.containerFull}>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top', 'bottom']}>
        <ReadingHeader />

        {/* Content area — measures itself at runtime */}
        <View
          style={styles.contentArea}
          onLayout={e => {
            const { width, height } = e.nativeEvent.layout;
            setContentSize({
              width: Math.round(width),
              height: Math.round(height),
            });
            console.log(
              `[ContentArea] width=${Math.round(width)}  height=${Math.round(
                height,
              )}`,
            );
          }}
        >
          {/* Dimension overlay — remove once you have the numbers */}
          {contentSize.width > 0 && (
            <View style={styles.dimensionBadge}>
              <Text style={styles.dimensionText}>
                {contentSize.width} × {contentSize.height} px
              </Text>
            </View>
          )}
        </View>

        <ReadingFooter
          currentPage={1}
          totalPages={10}
          onPrev={() => {}}
          onNext={() => {}}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ReadingScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.ring,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimensionBadge: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.ring,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  dimensionText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    letterSpacing: 0.5,
  },
});
