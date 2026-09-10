import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '@theme/colors';
import { CoverFrontViewProps } from './FlipBookCover.types';
import { styles } from './FlipBookCover.styles';
import { getStrings } from './FlipBookCover.strings';

export const CoverFrontView: React.FC<CoverFrontViewProps> = React.memo(
  ({ story, title, subtitle, category, currentLang = 'hi', onOpenBook }) => {
    const strings = getStrings(currentLang);
    const coverImageSource = story?.image
      ? Array.isArray(story.image)
        ? story.image[0]
        : story.image
      : null;

    return (
      <TouchableOpacity
        style={styles.coverFaceContainer}
        activeOpacity={0.96}
        onPress={onOpenBook}
      >
        {coverImageSource ? (
          <Image
            source={coverImageSource}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[styles.coverPlaceholder, { backgroundColor: colors.ring }]}
          />
        )}

        {/* Rich Vignette Gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
          style={styles.coverGradient}
        >
          {/* Top Category Badge */}
          <View style={styles.topBadgeRow}>
            {category ? (
              <View style={styles.categoryGlassBadge}>
                <Text style={styles.categoryGlassBadgeText}>{category}</Text>
              </View>
            ) : (
              <View />
            )}
          </View>

          {/* Bottom Cover Title & Open Prompt */}
          <View style={styles.coverBottomInfo}>
            <Text style={styles.coverTitleText} numberOfLines={2}>
              {title}
            </Text>

            {subtitle ? (
              <Text style={styles.coverSubtitleText} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </LinearGradient>

        {/* Golden Ribbon Bookmark */}
        <View style={styles.ribbonBookmark}>
          <View style={styles.ribbonTail} />
        </View>
      </TouchableOpacity>
    );
  },
);

export default CoverFrontView;
