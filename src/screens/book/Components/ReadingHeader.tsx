import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HapticFeedback from 'react-native-haptic-feedback';

import colors from '../../../utile/colors';
import fonts from '../../../utile/fonts';
import { fs, scale } from '../../../utile/sizes';
import {
  HeartIcon,
  SunIcon,
  MoonIcon,
  BackIcon as Back,
} from '../../../utile/customSVG';
import { Storage } from '../../../utile/storage';
import { MahaBharatStories } from '../../../constants/storiesData';
import AnimatedButton from '../../../components/AnimatedButton';

const triggerHaptic = (type: string = 'impactLight') => {
  if (Platform.OS === 'android') {
    try {
      Vibration.vibrate(40);
    } catch {}
  } else {
    try {
      HapticFeedback.trigger(type as any, {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    } catch {
      Vibration.vibrate(30);
    }
  }
};

interface ReadingHeaderProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const ReadingHeader = ({
  isDarkMode = true,
  onToggleTheme,
}: ReadingHeaderProps) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'hi' ? 'hi' : 'en') as 'en' | 'hi';

  const { storyId } = route.params || {};
  const story = MahaBharatStories.find(s => s.id === storyId);

  const [isFav, setIsFav] = useState(false);

  // Load saved bookmark status on mount
  useEffect(() => {
    if (!storyId) {
      return;
    }
    try {
      const raw = Storage.getString('STORY_BOOKMARKS', '[]');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        setIsFav(list.includes(storyId));
      }
    } catch {}
  }, [storyId]);

  // Toggle bookmark in MMKV storage
  const toggleBookmark = () => {
    if (!storyId) {
      return;
    }
    triggerHaptic('impactMedium');
    try {
      const raw = Storage.getString('STORY_BOOKMARKS', '[]');
      let list: string[] = JSON.parse(raw);
      if (!Array.isArray(list)) {
        list = [];
      }

      if (list.includes(storyId)) {
        list = list.filter(id => id !== storyId);
        setIsFav(false);
      } else {
        list.push(storyId);
        setIsFav(true);
      }
      Storage.set('STORY_BOOKMARKS', JSON.stringify(list));
    } catch {}
  };

  const title = story
    ? currentLang === 'hi'
      ? story.titleHi
      : story.titleEn
    : '';

  return (
    <View style={styles.headerRow}>
      {/* ← Back button with ring border */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.ringButton}
          onPress={() => {
            if (storyId) {
              try {
                const rawProgress = Storage.getString('STORY_PROGRESS', '{}');
                const progressMap = JSON.parse(rawProgress) || {};
                if (progressMap[storyId] !== undefined) {
                  delete progressMap[storyId];
                  Storage.set('STORY_PROGRESS', JSON.stringify(progressMap));
                }
              } catch {}
            }
            navigation.goBack();
          }}
          activeOpacity={0.8}
        >
          <Back width={scale(12)} height={scale(12)} stroke={colors.ring} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.headerTitle,
              { color: isDarkMode ? '#F5EFE6' : colors.secondary },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </View>
      {/* Action Buttons: Theme toggle & Heart bookmark */}
      <View style={styles.actionRow}>
        {onToggleTheme && (
          <AnimatedButton
            style={[styles.ringButton, styles.themeToggleBtn]}
            onPress={onToggleTheme}
          >
            {isDarkMode ? (
              <SunIcon size={scale(16)} color={colors.white} />
            ) : (
              <MoonIcon size={scale(16)} color={colors.black} />
            )}
          </AnimatedButton>
        )}

        <View
          style={styles.ringButton}

          // activeOpacity={0.8}
        >
          <AnimatedButton
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={toggleBookmark}
          >
            <HeartIcon
              size={scale(16)}
              color={
                isFav ? colors.ring : isDarkMode ? colors.white : colors.black
              }
              filled={isFav}
            />
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
};

export default ReadingHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    width: '100%',
  },
  ringButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(19),
    borderWidth: 1.5,
    borderColor: colors.ring,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    // flex: 1,
    marginHorizontal: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fs(15),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggleBtn: {
    marginRight: scale(8),
  },
  actionIcon: {
    fontSize: fs(14),
  },
});
