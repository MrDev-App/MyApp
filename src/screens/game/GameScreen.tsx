import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  ListRenderItemInfo,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import { fs, scale } from '@theme/sizes';
import {
  GradientBackground,
  AnimatedListItem,
  SearchIcon,
  CloseIcon,
} from '@components';
import { useAppLanguage } from '@hooks';
import { GameCategoryType, GameItem } from './types';
import { GAME_CATEGORIES, GAMES_DATA } from './data/gamesData';
import GameCard from './components/GameCard';
import GameFilterTabs from './components/GameFilterTabs';
import GameDetailModal from './components/GameDetailModal';
import GameHeader from './components/GameHeader';

const GameScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isHindi } = useAppLanguage();

  const [selectedCategory, setSelectedCategory] =
    useState<GameCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Filter games with useMemo for high performance
  const filteredGames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GAMES_DATA.filter(game => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || game.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search query match
      if (!q) return true;

      const titleHi = game.titleHi.toLowerCase();
      const titleEn = game.titleEn.toLowerCase();
      const subHi = game.subtitleHi.toLowerCase();
      const subEn = game.subtitleEn.toLowerCase();
      const catHi = game.categoryLabelHi.toLowerCase();
      const catEn = game.categoryLabelEn.toLowerCase();

      return (
        titleHi.includes(q) ||
        titleEn.includes(q) ||
        subHi.includes(q) ||
        subEn.includes(q) ||
        catHi.includes(q) ||
        catEn.includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectGame = useCallback((game: GameItem) => {
    setSelectedGame(game);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSelectCategory = useCallback((id: GameCategoryType) => {
    setSelectedCategory(id);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }, []);

  // Optimized key extractor
  const keyExtractor = useCallback((item: GameItem) => item.id, []);

  // Render item with AnimatedListItem for smooth entrance
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<GameItem>) => {
      return (
        <AnimatedListItem index={index} delayStep={45}>
          <GameCard item={item} onPress={handleSelectGame} />
        </AnimatedListItem>
      );
    },
    [handleSelectGame],
  );

  // List Empty Component
  const renderEmptyComponent = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🔍</Text>
        <Text style={styles.emptyTitle}>
          {isHindi ? 'कोई खेल नहीं मिला' : 'No Games Found'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {isHindi
            ? 'कृपया अन्य श्रेणी चुनें या खोज शब्द बदलें'
            : 'Try selecting another category or clear your search query'}
        </Text>
      </View>
    );
  }, [isHindi]);

  // List Header Component
  const listHeader = useMemo(() => {
    return (
      <View>
        <GameHeader totalGames={GAMES_DATA.length} />

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <SearchIcon size={scale(18)} color={colors.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder={
                isHindi
                  ? 'खेल, पहेली या प्रश्नोत्तरी खोजें...'
                  : 'Search games, quizzes, or puzzles...'
              }
              placeholderTextColor="rgba(57, 38, 27, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={handleClearSearch}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CloseIcon size={scale(16)} color={colors.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories Tab Selector */}
        <GameFilterTabs
          categories={GAME_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Section Title */}
        <View style={styles.listSectionHeader}>
          <Text style={styles.listSectionTitle}>
            {isHindi ? 'उपलब्ध खेल श्रृंखला' : 'Featured Game Library'}
          </Text>
          <Text style={styles.listSectionCount}>
            {filteredGames.length} {isHindi ? 'खेल' : 'games'}
          </Text>
        </View>
      </View>
    );
  }, [
    isHindi,
    searchQuery,
    selectedCategory,
    filteredGames.length,
    handleClearSearch,
    handleSelectCategory,
  ]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FlatList
          data={filteredGames}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + scale(85) },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.ring]}
              tintColor={colors.ring}
            />
          }
          removeClippedSubviews
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
        />

        {/* Game Detail Modal */}
        <GameDetailModal
          game={selectedGame}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(16),
  },
  searchSection: {
    paddingHorizontal: scale(16),
    marginVertical: scale(8),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    height: scale(44),
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: fs(13),
    fontFamily: fonts.PoppinsRegular,
    color: colors.secondary,
    paddingVertical: 0,
  },
  listSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(12),
    marginBottom: scale(4),
  },
  listSectionTitle: {
    fontSize: fs(15),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  listSectionCount: {
    fontSize: fs(11),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
  },
  emptyEmoji: {
    fontSize: fs(36),
    marginBottom: scale(8),
  },
  emptyTitle: {
    fontSize: fs(16),
    fontFamily: fonts.PoppinsBold,
    color: colors.secondary,
  },
  emptySubtitle: {
    fontSize: fs(12),
    fontFamily: fonts.TiroHindiRegular,
    color: colors.ring,
    textAlign: 'center',
    marginTop: scale(4),
    paddingHorizontal: scale(20),
  },
});

export default React.memo(GameScreen);
