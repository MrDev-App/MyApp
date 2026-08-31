import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Vibration,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';

import colors from '../../utile/colors';
import fonts from '../../utile/fonts';
import { fs, scale } from '../../utile/sizes';
import { Back } from '../../assets';
import GradientBackground from '../../components/GradientBackground';
import { Translation } from '../../i18n/language';
import {
  NotificationStorage,
  AppNotification,
} from '../../utile/notificationStorage';

const triggerHaptic = (type: string = 'selection') => {
  if (Platform.OS === 'android') {
    try {
      Vibration.vibrate(30);
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

type FilterType = 'all' | 'sadhana' | 'festival' | 'wisdom';

const NotificationScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en').substring(0, 2) as
    | 'en'
    | 'hi';

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  useEffect(() => {
    const list = NotificationStorage.getNotifications();
    setNotifications(list);
  }, []);

  const handleMarkAllAsRead = () => {
    triggerHaptic('impactLight');
    const updated = NotificationStorage.markAllAsRead();
    setNotifications(updated);
  };

  const handleClearAll = () => {
    triggerHaptic('impactHeavy');
    const updated = NotificationStorage.clearAll();
    setNotifications(updated);
  };

  const handleNotificationPress = (item: AppNotification) => {
    triggerHaptic('impactLight');
    // Mark as read
    const updated = NotificationStorage.markAsRead(item.id);
    setNotifications(updated);

    // Deep-link navigation if actionRoute is defined
    if (item.actionRoute) {
      if (item.actionRoute === 'Jap') {
        navigation.navigate('BottomTabs', { screen: 'Jap' });
      } else if (item.actionRoute === 'Book') {
        navigation.navigate('BottomTabs', { screen: 'Book' });
      } else if (item.actionRoute === 'AllFestivals') {
        navigation.navigate('AllFestivals');
      } else if (item.actionRoute === 'BottomTabs') {
        navigation.navigate('BottomTabs', { screen: 'Home' });
      }
    }
  };

  const handleDeleteNotification = (id: string) => {
    triggerHaptic('selection');
    const updated = NotificationStorage.deleteNotification(id);
    setNotifications(updated);
  };

  const filteredNotifications = useMemo(() => {
    if (selectedFilter === 'all') return notifications;
    if (selectedFilter === 'sadhana') {
      return notifications.filter(
        n => n.type === 'sadhana' || n.type === 'milestone',
      );
    }
    return notifications.filter(n => n.type === selectedFilter);
  }, [notifications, selectedFilter]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diffMin = Math.floor((now - timestamp) / (1000 * 60));
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) {
      return currentLanguage === 'hi' ? 'अभी' : 'Just now';
    }
    if (diffMin < 60) {
      return currentLanguage === 'hi'
        ? `${diffMin} मि. पहले`
        : `${diffMin}m ago`;
    }
    if (diffHours < 24) {
      return currentLanguage === 'hi'
        ? `${diffHours} घंटे पहले`
        : `${diffHours}h ago`;
    }
    if (diffDays === 1) {
      return currentLanguage === 'hi' ? 'कल' : 'Yesterday';
    }
    return currentLanguage === 'hi'
      ? `${diffDays} दिन पहले`
      : `${diffDays}d ago`;
  };

  const getTypeIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'sadhana':
        return '⚡';
      case 'festival':
        return '🪔';
      case 'milestone':
        return '🏆';
      case 'wisdom':
        return '📜';
      default:
        return '🔔';
    }
  };

  const getTypeBadgeBg = (type: AppNotification['type']) => {
    switch (type) {
      case 'sadhana':
        return 'rgba(251, 148, 55, 0.14)';
      case 'festival':
        return 'rgba(230, 81, 0, 0.12)';
      case 'milestone':
        return 'rgba(255, 179, 0, 0.14)';
      case 'wisdom':
        return 'rgba(141, 110, 99, 0.14)';
      default:
        return colors.borderSubtle2;
    }
  };

  const renderFilterPill = (key: FilterType, label: string, icon: string) => {
    const isActive = selectedFilter === key;
    return (
      <TouchableOpacity
        key={key}
        style={[styles.filterPill, isActive && styles.filterPillActive]}
        onPress={() => {
          triggerHaptic('selection');
          setSelectedFilter(key);
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.filterIcon}>{icon}</Text>
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* ── Header Row ─────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              triggerHaptic('selection');
              navigation.goBack();
            }}
            activeOpacity={0.8}
          >
            <Back width={scale(12)} height={scale(12)} stroke={colors.white} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {t(Translation.NOTIFICATIONS_TITLE)}
            </Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>

          {notifications.length > 0 ? (
            <TouchableOpacity
              style={styles.clearAllBtn}
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Text style={styles.clearAllText}>
                {t(Translation.NOTIFICATIONS_CLEAR_ALL)}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: scale(40) }} />
          )}
        </View>

        {/* ── Filter Pills ───────────────────────────────────── */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {renderFilterPill(
              'all',
              t(Translation.NOTIFICATIONS_FILTER_ALL),
              '✨',
            )}
            {renderFilterPill(
              'sadhana',
              t(Translation.NOTIFICATIONS_FILTER_SADHANA),
              '⚡',
            )}
            {renderFilterPill(
              'festival',
              t(Translation.NOTIFICATIONS_FILTER_FESTIVALS),
              '🪔',
            )}
            {renderFilterPill(
              'wisdom',
              t(Translation.NOTIFICATIONS_FILTER_WISDOM),
              '📜',
            )}
          </ScrollView>
        </View>

        {/* ── Mark All Read Sub-Bar ──────────────────────────── */}
        {unreadCount > 0 && (
          <View style={styles.markReadRow}>
            <Text style={styles.unreadSubText}>
              {currentLanguage === 'hi'
                ? `${unreadCount} बिना पढ़ी सूचनाएं`
                : `${unreadCount} unread alerts`}
            </Text>
            <TouchableOpacity onPress={handleMarkAllAsRead} activeOpacity={0.7}>
              <Text style={styles.markReadText}>
                ✓ {t(Translation.NOTIFICATIONS_MARK_READ)}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Notifications List ─────────────────────────────── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(30) },
          ]}
        >
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Text style={styles.emptyIconText}>🪔</Text>
              </View>
              <Text style={styles.emptyTitle}>
                {t(Translation.NOTIFICATIONS_EMPTY_TITLE)}
              </Text>
              <Text style={styles.emptyDesc}>
                {t(Translation.NOTIFICATIONS_EMPTY_DESC)}
              </Text>
            </View>
          ) : (
            filteredNotifications.map((item, index) => {
              const title =
                currentLanguage === 'hi' ? item.titleHi : item.titleEn;
              const message =
                currentLanguage === 'hi' ? item.messageHi : item.messageEn;
              const icon = getTypeIcon(item.type);
              const badgeBg = getTypeBadgeBg(item.type);

              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 45).springify()}
                  layout={Layout.springify()}
                >
                  <TouchableOpacity
                    style={[styles.card, !item.isRead && styles.cardUnread]}
                    onPress={() => handleNotificationPress(item)}
                    activeOpacity={0.8}
                  >
                    {/* Icon Badge */}
                    <View
                      style={[styles.iconBadge, { backgroundColor: badgeBg }]}
                    >
                      <Text style={styles.typeIconText}>{icon}</Text>
                    </View>

                    {/* Content */}
                    <View style={styles.cardContent}>
                      <View style={styles.cardHeaderRow}>
                        <Text
                          style={[
                            styles.cardTitle,
                            !item.isRead && styles.cardTitleUnread,
                          ]}
                          numberOfLines={1}
                        >
                          {title}
                        </Text>
                        <Text style={styles.timeText}>
                          {formatTimestamp(item.timestamp)}
                        </Text>
                      </View>

                      <Text style={styles.cardMessage} numberOfLines={3}>
                        {message}
                      </Text>

                      {/* Action Pill / Indicator */}
                      {item.actionRoute && (
                        <View style={styles.actionRow}>
                          <Text style={styles.actionLinkText}>
                            {currentLanguage === 'hi' ? 'देखें' : 'View'} →
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Unread Indicator & Delete Button */}
                    <View style={styles.cardRightActions}>
                      {!item.isRead && <View style={styles.unreadDot} />}
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDeleteNotification(item.id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Text style={styles.deleteBtnText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(183, 168, 151, 0.15)',
  },
  backButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ring,
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.15,
    shadowRadius: scale(4),
    elevation: 2,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerTitle: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
  },
  unreadBadge: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  clearAllBtn: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
  },
  clearAllText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  filterContainer: {
    paddingVertical: scale(10),
  },
  filterScroll: {
    paddingHorizontal: scale(16),
    gap: scale(8),
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: scale(6),
  },
  filterPillActive: {
    backgroundColor: colors.ring,
    borderColor: colors.ring,
  },
  filterIcon: {
    fontSize: fs(12),
  },
  filterText: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  markReadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(8),
  },
  unreadSubText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
  },
  markReadText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
    gap: scale(10),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(16),
    padding: scale(14),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    // shadowColor: colors.ring,
    // shadowOffset: { width: 0, height: scale(4) },
    // shadowOpacity: 0.05,
    // shadowRadius: scale(8),
    // elevation: 2,
    alignItems: 'flex-start',
  },
  cardUnread: {
    backgroundColor: '#FFFAF3',
    borderColor: 'rgba(251, 148, 55, 0.35)',
  },
  iconBadge: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  typeIconText: {
    fontSize: fs(16),
  },
  cardContent: {
    flex: 1,
    paddingRight: scale(8),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(3),
  },
  cardTitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.secondary,
    flex: 1,
    marginRight: scale(8),
  },
  cardTitleUnread: {
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.secondary,
  },
  timeText: {
    fontSize: fs(10),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
  },
  cardMessage: {
    fontSize: fs(11.5),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    lineHeight: fs(17),
  },
  actionRow: {
    marginTop: scale(6),
  },
  actionLinkText: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.ring,
  },
  cardRightActions: {
    alignItems: 'center',
    gap: scale(10),
  },
  unreadDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.ring,
  },
  deleteBtn: {
    padding: scale(2),
  },
  deleteBtnText: {
    fontSize: fs(11),
    color: colors.neutralDisabled,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(80),
    paddingHorizontal: scale(24),
  },
  emptyIconCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(251, 148, 55, 0.25)',
  },
  emptyIconText: {
    fontSize: fs(30),
  },
  emptyTitle: {
    fontSize: fs(16),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    marginBottom: scale(6),
  },
  emptyDesc: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.neutralDisabled,
    textAlign: 'center',
    lineHeight: fs(18),
  },
});
