import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import { Back } from '@assets';
import { GradientBackground, AnimatedListItem } from '@components';
import { useAppLanguage } from '@hooks';
import { Translation, en, hi } from '@i18n/language';
import {
  NotificationStorage,
  AppNotification,
  handleNotificationNavigation,
} from '@services/notificationService';
import {
  getNotificationIcon,
  getNotificationBadgeBg,
} from '@utils/notificationHelpers';
import { RootNavigationProp } from '@navigation/types';
import { Storage } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';

type FilterType = 'all' | 'sadhana' | 'festival' | 'wisdom';

const NotificationScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const insets = useSafeAreaInsets();
  const { t, currentLanguage, select } = useAppLanguage();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  useFocusEffect(
    useCallback(() => {
      // Automatically load and mark all notifications as read once user opens the notification screen
      const list = NotificationStorage.getNotifications();
      let hadFixes = false;
      const rawReminders = Storage.getString(
        STORAGE_KEYS.DAILY_REMINDERS_LIST,
        '[]',
      );
      let parsedReminders: any[] = [];
      try {
        parsedReminders = JSON.parse(rawReminders);
      } catch {}

      const fixedList = list.map(item => {
        let messageEn = (item.messageEn || '').trim();
        let messageHi = (item.messageHi || '').trim();

        // If notification has empty message, restore from scheduledTime or reminder title
        if (!messageEn && !messageHi) {
          const titleKey = (item.titleEn || item.titleHi || '')
            .toLowerCase()
            .trim();
          const matched = Array.isArray(parsedReminders)
            ? parsedReminders.find(
                (r: any) =>
                  r.id === item.id ||
                  (r.title && r.title.toLowerCase().trim() === titleKey),
              )
            : null;

          let resolvedTime = item.actionParams?.scheduledTime;
          if (!resolvedTime && matched && typeof matched.hour === 'number') {
            const h12 = matched.hour % 12 || 12;
            resolvedTime = `${String(h12).padStart(2, '0')}:${String(
              matched.minute,
            ).padStart(2, '0')} ${matched.isPm ? 'PM' : 'AM'}`;
          }

          const fallbackText =
            resolvedTime ||
            item.actionParams?.subtitle ||
            en.NOTIFICATIONS_DAILY_SADHANA_TIME;
          const fallbackTextHi =
            resolvedTime ||
            item.actionParams?.subtitle ||
            hi.NOTIFICATIONS_DAILY_SADHANA_TIME;

          hadFixes = true;
          return {
            ...item,
            messageEn: fallbackText,
            messageHi: fallbackTextHi,
            isRead: true,
          };
        }
        return {
          ...item,
          isRead: true,
        };
      });

      if (hadFixes) {
        NotificationStorage.saveNotifications(fixedList);
      } else {
        NotificationStorage.markAllAsRead();
      }
      setNotifications(fixedList);
    }, []),
  );

  // Map of reminder title / id -> formatted scheduled time
  const remindersMap = useMemo(() => {
    try {
      const raw = Storage.getString(STORAGE_KEYS.DAILY_REMINDERS_LIST, '[]');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        const map = new Map<string, string>();
        list.forEach((r: any) => {
          if (r && typeof r.hour === 'number' && typeof r.minute === 'number') {
            const h12 = r.hour % 12 || 12;
            const timeStr = `${String(h12).padStart(2, '0')}:${String(
              r.minute,
            ).padStart(2, '0')} ${r.isPm ? 'PM' : 'AM'}`;
            if (r.id) map.set(r.id, timeStr);
            if (r.title) map.set(r.title.toLowerCase().trim(), timeStr);
          }
        });
        return map;
      }
    } catch {}
    return new Map<string, string>();
  }, [notifications]);

  const handleMarkAllAsRead = () => {
    const updated = NotificationStorage.markAllAsRead();
    setNotifications(updated);
  };

  const handleClearAll = () => {
    const updated = NotificationStorage.clearAll();
    setNotifications(updated);
  };

  const handleNotificationPress = useCallback((item: AppNotification) => {
    const updated = NotificationStorage.markAsRead(item.id);
    setNotifications(updated);

    handleNotificationNavigation(
      item.actionRoute,
      item.actionParams,
      item.titleEn || item.titleHi,
      item.messageEn || item.messageHi,
    );
  }, []);

  const handleDeleteNotification = useCallback((id: string) => {
    const updated = NotificationStorage.deleteNotification(id);
    setNotifications(updated);
  }, []);

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

  const formatTimestamp = useCallback(
    (timestamp: number) => {
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
    },
    [currentLanguage],
  );

  const notifKeyExtractor = useCallback((item: AppNotification) => item.id, []);

  const renderNotificationItem = useCallback(
    ({ item, index }: { item: AppNotification; index: number }) => {
      const title =
        select(item.titleHi, item.titleEn) || select('स्मरण', 'Reminder');
      let message = (select(item.messageHi, item.messageEn) || '').trim();
      const icon = getNotificationIcon(item.type);
      const badgeBg = getNotificationBadgeBg(item.type);

      // Resolve scheduled time from actionParams or reminders lookup
      const titleKey = (item.titleEn || item.titleHi || '')
        .toLowerCase()
        .trim();
      const scheduledTime =
        item.actionParams?.scheduledTime ||
        (item.id ? remindersMap.get(item.id) : undefined) ||
        (titleKey ? remindersMap.get(titleKey) : undefined);

      if (!message) {
        if (scheduledTime) {
          message = scheduledTime;
        } else if (item.actionParams?.subtitle) {
          message = item.actionParams.subtitle;
        } else {
          message = t(Translation.NOTIFICATIONS_DAILY_SADHANA_TIME);
        }
      } else if (scheduledTime && !message.includes(scheduledTime)) {
        message = `${message} (${scheduledTime})`;
      }

      return (
        <AnimatedListItem index={index} delayStep={45}>
          <TouchableOpacity
            style={[styles.card, !item.isRead && styles.cardUnread]}
            onPress={() => handleNotificationPress(item)}
            activeOpacity={0.8}
          >
            {/* Icon Badge */}
            <View style={[styles.iconBadge, { backgroundColor: badgeBg }]}>
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

              {item.actionRoute && (
                <View style={styles.actionRow}>
                  <Text style={styles.actionLinkText}>
                    {select('देखें →', 'View →')}
                  </Text>
                </View>
              )}
            </View>

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
        </AnimatedListItem>
      );
    },
    [
      select,
      formatTimestamp,
      handleNotificationPress,
      handleDeleteNotification,
    ],
  );

  const renderFilterPill = (key: FilterType, label: string, icon: string) => {
    const isActive = selectedFilter === key;
    return (
      <TouchableOpacity
        key={key}
        style={[styles.filterPill, isActive && styles.filterPillActive]}
        onPress={() => {
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
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
              {select(
                `${unreadCount} बिना पढ़ी सूचनाएं`,
                `${unreadCount} unread alerts`,
              )}
            </Text>
            <TouchableOpacity onPress={handleMarkAllAsRead} activeOpacity={0.7}>
              <Text style={styles.markReadText}>
                ✓ {t(Translation.NOTIFICATIONS_MARK_READ)}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Notifications List ─────────────────────────────── */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={notifKeyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + scale(30) },
          ]}
          initialNumToRender={10}
          maxToRenderPerBatch={8}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
          renderItem={renderNotificationItem}
          ListEmptyComponent={
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
          }
        />
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
    borderBottomColor: colors.borderSubtle,
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
    fontFamily: fonts.TiroHindiRegular,
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
    fontFamily: fonts.TiroHindiRegular,
    color: colors.white,
  },
  clearAllBtn: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
  },
  clearAllText: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
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
    fontFamily: fonts.TiroHindiRegular,
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
    fontFamily: fonts.TiroHindiRegular,
    color: colors.mutedForeground,
  },
  markReadText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
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
    backgroundColor: colors.notificationUnreadBg,
    borderColor: colors.accentBorderMedium,
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
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    flex: 1,
    marginRight: scale(8),
  },
  cardTitleUnread: {
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
  },
  timeText: {
    fontSize: fs(10),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
  },
  cardMessage: {
    fontSize: fs(11.5),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.mutedForeground,
    lineHeight: fs(17),
  },
  actionRow: {
    marginTop: scale(6),
  },
  actionLinkText: {
    fontSize: fs(11),
    fontFamily: fonts.TiroHindiRegular,
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
    backgroundColor: colors.accentOrangeSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.accentOrangeMedium,
  },
  emptyIconText: {
    fontSize: fs(30),
  },
  emptyTitle: {
    fontSize: fs(16),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.secondary,
    marginBottom: scale(6),
  },
  emptyDesc: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.neutralDisabled,
    textAlign: 'center',
    lineHeight: fs(18),
  },
});
