import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  categories,
  Comment,
  HeartIcon,
  mockComments,
  mockPosts,
  Post,
} from '../../constant/data';
import Images from '../../assets';
import { AnimatedCommentModal } from '../../components/AnimatedCommentModal';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedDot = ({
  isActive,
  distance,
}: {
  isActive: boolean;
  distance: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    // Determine target scale and opacity based on distance from active index
    let scale = 1;
    let opacity = 1;

    if (isActive) {
      scale = 1.25;
      opacity = 1;
    } else if (distance <= 2) {
      scale = 1.0;
      opacity = 0.8;
    } else if (distance === 3) {
      scale = 0.7;
      opacity = 0.5;
    } else {
      scale = 0.45;
      opacity = 0.25;
    }

    return {
      width: withTiming(isActive ? 5 : 4, { duration: 150 }),
      height: withTiming(isActive ? 5 : 4, { duration: 150 }),
      borderRadius: withTiming(isActive ? 4 : 3, { duration: 150 }),
      backgroundColor: withTiming(
        isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
        { duration: 150 },
      ),
      transform: [
        {
          scale: withSpring(scale, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
      opacity: withTiming(opacity, { duration: 150 }),
    };
  }, [isActive, distance]);

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

interface InstagramDotsIndicatorProps {
  total: number;
  currentIndex: number;
  resetIndex?: any;
}

const InstagramDotsIndicator = ({
  total,
  currentIndex,
}: InstagramDotsIndicatorProps) => {
  const DOT_SIZE = 8;
  const DOT_GAP = 6;
  const VISIBLE_DOTS = 7;
  const visibleCount = Math.min(total, VISIBLE_DOTS);
  const containerWidth =
    visibleCount * DOT_SIZE + (visibleCount - 1) * DOT_GAP + 4;

  const translationX = useSharedValue(0);

  React.useEffect(() => {
    const halfVisible = Math.floor(VISIBLE_DOTS / 2);
    let targetX = 0;

    if (total > VISIBLE_DOTS) {
      if (currentIndex >= halfVisible) {
        const maxTranslate = (total - VISIBLE_DOTS) * (DOT_SIZE + DOT_GAP);
        const calculatedTranslate =
          (currentIndex - halfVisible) * (DOT_SIZE + DOT_GAP);
        targetX = -Math.min(calculatedTranslate, maxTranslate);
      }
    }
    translationX.value = withTiming(targetX, { duration: 200 });
  }, [currentIndex, total]);

  const animatedRowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });

  return (
    <View style={[styles.dotsContainer, { width: containerWidth }]}>
      <Animated.View style={[styles.dotsInner, animatedRowStyle]}>
        {Array.from({ length: total }).map((_, dotIndex) => {
          const distance = Math.abs(dotIndex - currentIndex);
          return (
            <AnimatedDot
              key={dotIndex}
              isActive={dotIndex === currentIndex}
              distance={distance}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {},
  );
  const [activeImageIndex, setActiveImageIndex] = useState<
    Record<string, number>
  >({});

  // States to hold the active lists dynamically
  const [postsList, setPostsList] = useState<Post[]>(mockPosts);
  const [commentsMap, setCommentsMap] =
    useState<Record<string, Comment[]>>(mockComments);

  // States for reusable modal transitions
  const cardRefs = useRef<Record<string, View | null>>({});
  const flatListRefs = useRef<Record<string, FlatList | null>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [originY, setOriginY] = useState(0);
  const [originHeight, setOriginHeight] = useState(0);

  const handleLike = (id: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCommentLike = (id: string) => {
    setLikedComments(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCommentPress = (item: Post) => {
    const cardRef = cardRefs.current[item.id];
    if (cardRef) {
      cardRef.measure((x, y, w, h, px, py) => {
        const measuredY = py !== undefined ? py : 150;
        const measuredHeight = h !== undefined ? h : 300;

        // Reset active image index back to 0th
        setActiveImageIndex(prev => ({
          ...prev,
          [item.id]: 0,
        }));

        const flatRef = flatListRefs.current[item.id];
        if (flatRef) {
          try {
            flatRef.scrollToOffset({ offset: 0, animated: false });
          } catch (e) {}
        }

        setOriginY(measuredY);
        setOriginHeight(measuredHeight);
        setSelectedPost(item);
        setModalVisible(true);
      });
    }
  };

  const handleAddComment = (text: string) => {
    if (!selectedPost) return;

    const newComment = {
      id: `c_${selectedPost.id}_${Date.now()}`,
      username: 'You',
      avatarInitials: 'U',
      avatarBg: '#000000',
      timeAgo: 'Just now',
      text: text,
      likes: 0,
    };

    setCommentsMap(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment],
    }));

    setPostsList(prev =>
      prev.map(post => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            comments: post.comments + 1,
          };
        }
        return post;
      }),
    );

    // Sync selectedPost's comment count for the modal header immediately
    setSelectedPost(prev => {
      if (prev) {
        return {
          ...prev,
          comments: prev.comments + 1,
        };
      }
      return null;
    });
  };

  //category filter and search filter
  const filteredPosts = postsList.filter(post => {
    const matchesSearch = searchQuery
      ? post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    let matchesCategory = true;
    if (activeCategory === 'Alcantara') {
      matchesCategory = post.text.toLowerCase().includes('alcantara');
    } else if (activeCategory === 'Beige') {
      matchesCategory = post.text.toLowerCase().includes('beige');
    } else if (activeCategory === 'Carbon Fiber') {
      matchesCategory = post.text.toLowerCase().includes('carbon fiber');
    } else if (activeCategory === 'Disk Brakes') {
      matchesCategory =
        post.text.toLowerCase().includes('brake') ||
        post.text.toLowerCase().includes('brembo');
    }

    return matchesSearch && matchesCategory;
  });

  const renderPostCardContent = (item: Post, isDetail: boolean = false) => {
    const isLiked = !!likedPosts[item.id];
    const likesCount = isLiked ? item.likes + 1 : item.likes;
    const imagesList = item.images || [];
    console.log('Images', imagesList);

    return (
      <>
        {/* Post Header   UserName, Avatar Time ThreeDots  */}
        <View style={styles.postHeader}>
          <View style={styles.avatarContainer}>
            <View
              style={[styles.avatarCircle, { backgroundColor: item.avatarBg }]}
            >
              <Text style={styles.avatarText}>{item.avatarInitials}</Text>
            </View>
            <View>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.optionsButton} activeOpacity={0.6}>
            <Images.svgThreeDots width={16} height={16} />
          </TouchableOpacity>
        </View>

        {/* Post Text */}
        <Text style={styles.postBodyText}>{item.text}</Text>

        {/* Post Image */}
        {item.images && item.images.length > 0 && (
          <View style={{ position: 'relative' }}>
            {item.images.length === 1 ? (
              <Image
                source={item.images[0]}
                style={[styles.postImage, { width: width - 40 }]}
                resizeMode="cover"
              />
            ) : (
              <FlatList
                ref={el => {
                  flatListRefs.current[item.id] = el;
                }}
                data={item.images}
                keyExtractor={(_, index) => `${item.id}_img_${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ height: 230 }}
                onMomentumScrollEnd={e => {
                  // 👈 ADD
                  const slideIndex = Math.round(
                    e.nativeEvent.contentOffset.x / (width - 40),
                  );
                  setActiveImageIndex(prev => ({
                    ...prev,
                    [item.id]: slideIndex,
                  }));
                }}
                renderItem={({ item: imgSource }) => (
                  <Image
                    source={imgSource}
                    style={[styles.postImage, { width: width - 40 }]}
                    resizeMode="cover"
                  />
                )}
              />
            )}

            {imagesList.length > 1 && (
              <View style={styles.dotsWrapper} pointerEvents="none">
                <InstagramDotsIndicator
                  total={imagesList.length}
                  currentIndex={activeImageIndex[item.id] || 0}
                />
              </View>
            )}
          </View>
        )}

        {/* Post Footer / Actions  Heart - Comments - Share */}
        <View style={styles.postFooter}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
            activeOpacity={0.7}
            hitSlop={10}
          >
            <HeartIcon filled={isLiked} />

            <Text style={[styles.actionCountText, isLiked && styles.likedText]}>
              {likesCount}
            </Text>
          </TouchableOpacity>

          {!isDetail && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                if (!isDetail) {
                  handleCommentPress(item);
                }
              }}
              activeOpacity={0.7}
              hitSlop={12}
              disabled={isDetail}
            >
              <Images.svgCommentIcon width={16} height={16} />
              <Text style={styles.actionCountText}>{item.comments}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => {
              Share.share({
                message: item.text,
              });
            }}
          >
            <Images.svgShareIcon width={16} height={16} />
            <Text style={styles.actionCountText}>{item.shares}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderPostItem = ({ item }: { item: Post }) => {
    return (
      <View
        ref={el => {
          if (el) cardRefs.current[item.id] = el;
        }}
        style={styles.postCard}
      >
        {renderPostCardContent(item, false)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Search Area */}
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Anything"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.searchIconContainer}>
            <Images.svgSearchIcon width={16} height={16} />
          </View>
        </View>
      </View>

      {/* Categories Horizontal Pills List */}
      <View style={styles.categoriesOuterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContentStyle}
        >
          {categories.map(category => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryPill,
                  isActive && styles.categoryPillActive,
                ]}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Posts Feed */}
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.feedContentStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No posts found matching the criteria.
            </Text>
          </View>
        }
      />
      {/* Shared Animation Comment Modal */}
      <AnimatedCommentModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        originY={originY}
        originHeight={originHeight}
        comments={selectedPost ? commentsMap[selectedPost.id] || [] : []}
        likedComments={likedComments}
        onCommentLike={handleCommentLike}
        renderPostContent={post => renderPostCardContent(post, true)}
        onAddComment={handleAddComment}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  searchHeaderContainer: {
    backgroundColor: '#F5F6F8',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#Fff',
    borderRadius: 47,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  categoriesOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoriesContentStyle: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    alignItems: 'center',
  },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  categoryPillActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Poppins-Medium',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  feedContentStyle: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  usernameText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  timeAgoText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  optionsButton: {
    padding: 4,
  },
  postBodyText: {
    fontSize: 15,
    color: '#111',
    lineHeight: 22,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  postImage: {
    width: '100%',
    height: 230,
    borderRadius: 10,
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  dotsContainer: {
    height: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    overflow: 'hidden',
  },
  dotsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  actionCountText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  likedText: {
    color: '#000000',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  feedPlayButtonWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    paddingLeft: 3,
  },
  feedPriceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(249, 115, 22, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  feedPriceText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
});
