import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

import { GradientBackground } from '@components';
import globalStyles from '@theme/globalStyles';
import imagePath from '@assets/index';
import { scale } from '@theme/sizes';
import SvgPatternBackground from '@assets/svg/PatternBackground';
import { useTranslation } from 'react-i18next';
import { Translation } from '@i18n/language';

export type UpdateRequiredScreenProps = {
  message?: string;
  storeUrl?: string;
  latestVersion?: string;
};

// MARK: - Lock Icon
const LockIcon = () => (
  <Svg width={13} height={14} viewBox="0 0 14 16">
    <Rect x="1.5" y="6" width="11" height="9" rx="2" fill="#7D5C3E" />
    <Path
      d="M4 6 V4.2 C4 2.4 5.3 1 7 1 C8.7 1 10 2.4 10 4.2 V6"
      stroke="#7D5C3E"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <Circle cx="7" cy="10" r="1.2" fill="#FAF6EE" />
  </Svg>
);

export default function UpdateRequiredScreen({
  message,
  storeUrl,
  latestVersion = '2.0.0',
}: UpdateRequiredScreenProps) {
  const { t } = useTranslation();

  const onUpdate = () => {
    const defaultUrl =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com'
        : 'https://play.google.com';
    Linking.openURL(storeUrl || defaultUrl).catch(err => {
      console.warn('Failed to open store url:', err);
    });
  };

  return (
    <GradientBackground style={globalStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SvgPatternBackground>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
              source={imagePath.Omicon}
              style={styles.omEmblem}
              resizeMode="contain"
            />

            <View style={styles.flowRow}>
              <View style={[styles.flowBox, styles.flowBoxDark]} />
              <View style={styles.flowDot} />
              <View style={[styles.flowBox, styles.flowBoxLight]} />
              <Text style={styles.flowArrow}>→</Text>
              <View style={[styles.flowBox, styles.flowBoxOutline]} />
            </View>

            <Text style={styles.title}>{t(Translation.UPDATE_REQUIRED_TITLE)}</Text>

            <Text style={styles.message}>
              {message || t(Translation.UPDATE_REQUIRED_DESC)}
            </Text>

            {/* 5. Version Info */}
            <Text style={styles.version}>
              {t(Translation.UPDATE_VERSION_LABEL, { version: latestVersion })}
            </Text>

            {/* 6. Verified Store Badges */}
            <View style={styles.storeBadgeBox}>
              {/* Google Play */}
              <View style={styles.storeBadge}>
                <Image
                  source={imagePath.playstore}
                  style={styles.playStoreIcon}
                  resizeMode="contain"
                />
                <View style={styles.storeTextCol}>
                  <Text style={styles.storeName}>Google Play</Text>
                  <Text style={styles.storeStatus}>Verified</Text>
                </View>
              </View>

              {/* App Store */}
              <View style={styles.storeBadge}>
                <Image
                  source={imagePath.appstore}
                  style={styles.appStoreIcon}
                  resizeMode="contain"
                />
                <View style={styles.storeTextCol}>
                  <Text style={styles.storeName}>App Store</Text>
                  <Text style={styles.storeStatus}>Verified</Text>
                </View>
              </View>
            </View>

            {/* 7. Primary Action Button */}
            <TouchableOpacity
              style={styles.buttonOuterRing}
              onPress={onUpdate}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={['#3B1407', '#6B260F', '#A3491E']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{t(Translation.UPDATE_BUTTON_TEXT)}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* 8. Trust Footer */}
            <View style={styles.footerRow}>
              <LockIcon />
              <Text style={styles.footerText}>{t(Translation.UPDATE_SECURE_TRUST)}</Text>
            </View>
          </View>
        </View>
      </SvgPatternBackground>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(22),
  },
  card: {
    width: '100%',

    height: scale(650),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(26),
    paddingTop: scale(20),
    paddingBottom: scale(22),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: scale(20),
    elevation: 8,
  },
  omEmblem: {
    width: scale(210),
    height: scale(210),
    marginTop: scale(2),
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(18),
    marginBottom: scale(14),
  },
  flowBox: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(6),
  },
  flowBoxDark: {
    backgroundColor: '#9A7147',
  },
  flowDot: {
    width: scale(13),
    height: scale(13),
    borderRadius: scale(3),
    backgroundColor: '#B59169',
    marginHorizontal: scale(8),
  },
  flowBoxLight: {
    backgroundColor: '#C5A986',
  },
  flowArrow: {
    color: '#8E6A42',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: scale(10),
    marginTop: scale(-2),
  },
  flowBoxOutline: {
    borderWidth: 1.5,
    borderColor: '#A88256',
    backgroundColor: '#FAF7F2',
  },
  title: {
    fontSize: scale(22),
    fontWeight: '700',
    color: '#461405',
    textAlign: 'center',
    marginBottom: scale(10),
  },
  message: {
    fontSize: scale(14),
    color: '#262626',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 6,
    marginBottom: scale(12),
  },
  version: {
    fontSize: scale(13.5),
    color: '#9E7649',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scale(20),
  },
  storeBadgeBox: {
    width: '100%',
    backgroundColor: '#F7F8FA',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#E6E9EE',
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: scale(20),
  },
  storeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playStoreIcon: {
    width: scale(24),
    height: scale(24),
  },
  appStoreIcon: {
    width: scale(26),
    height: scale(26),
    // borderRadius: 5,
  },
  storeTextCol: {
    marginLeft: scale(10),
    // borderWidth: 1,
  },
  storeName: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 16,
  },
  storeStatus: {
    fontSize: scale(10),
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 14,
  },
  buttonOuterRing: {
    width: '100%',
    height: scale(54),
    borderRadius: scale(30),
    borderWidth: 1.5,
    borderColor: '#4A1708',
    padding: scale(2),
    backgroundColor: '#FFFFFF',
    marginVertical: scale(14),
  },
  buttonGradient: {
    flex: 1,
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  footerText: {
    fontSize: 12.5,
    color: '#7D5C3E',
    fontWeight: '500',
    marginLeft: 6,
  },
});
