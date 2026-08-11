import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { HeartIcon } from '../constant/data';
import Images from '../assets';
import { runOnJS } from 'react-native-worklets';

const { height } = Dimensions.get('window');

export interface Comment {
  id: string;
  username: string;
  avatarInitials: string;
  avatarBg: string;
  timeAgo: string;
  text: string;
  likes?: number;
  replies?: Comment[];
}

export interface AnimatedCommentModalProps<T> {
  /** Determine modal visibility state */
  visible: boolean;
  /** Triggered when the back button is clicked or modal requests to close */
  onClose: () => void;
  /** The post item data to show at the top of the comment feed */
  post: T | null;
  /** The measured vertical Y offset of the clicked card relative to the window */
  originY: number;
  /** The measured height of the clicked card */
  originHeight: number;
  /** List of comments for the active post */
  comments: Comment[];
  /** Record of comment IDs that have been liked e.g. { 'c1': true } */
  likedComments: Record<string, boolean>;
  /** Callback triggered when a comment's like button is clicked */
  onCommentLike: (commentId: string) => void;
  /** Render prop to customize how the post card is rendered at the top of the list */
  renderPostContent: (post: T) => React.ReactNode;
  /** Callback triggered when a new comment is posted */
  onAddComment?: (text: string) => void;
}

export function AnimatedCommentModal<T>({
  visible,
  onClose,
  post,
  originY,
  originHeight,
  comments,
  likedComments,
  onCommentLike,
  renderPostContent,
  onAddComment,
}: AnimatedCommentModalProps<T>) {
  const insets = useSafeAreaInsets();
  const overlayProgress = useSharedValue(0);
  const [commentText, setCommentText] = useState('');

  // Trigger animations based on visibility
  useEffect(() => {
    if (visible) {
      overlayProgress.value = 0;
      overlayProgress.value = withTiming(1, {
        duration: 500,
        // easing: Easing.bezier(0.25, 1, 0.5, 1),
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [visible]);

  const handleClose = () => {
    overlayProgress.value = withTiming(
      0,
      {
        duration: 500,
        // easing: Easing.bezier(0.25, 1, 0.5, 1),
        easing: Easing.out(Easing.cubic),
      },
      finished => {
        if (finished) {
          runOnJS(onClose)();
        }
      },
    );
    runOnJS(setCommentText)('');
  };

  const handlePostComment = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  // Animated styles for Modal transition elements
  const animOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayProgress.value,
  }));

  const animHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(overlayProgress.value, [0, 0.4, 1], [0, 0, 1]);
    const translateY = interpolate(overlayProgress.value, [0, 1], [-20, 0]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const animCardStyle = useAnimatedStyle(() => {
    const startY = originY - 60;
    const translateY = interpolate(overlayProgress.value, [0, 1], [startY, 0]);
    const scale = interpolate(overlayProgress.value, [0, 1], [0.96, 1]);
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const animCommentsStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      overlayProgress.value,
      [0, 1],
      [height - 150, 0],
    );
    const opacity = interpolate(overlayProgress.value, [0, 0.5, 1], [0, 0, 1]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const isCommentLiked = !!likedComments[comment.id];
    const likesCount = isCommentLiked
      ? (comment.likes || 0) + 1
      : comment.likes || 0;

    const commentId = comment?.id || '';
    const userName = comment?.username || '';
    const avatarInitials = comment?.avatarInitials || '';
    const avatarBg = comment?.avatarBg || '';
    const timeAgo = comment?.timeAgo || '';
    const text = comment?.text || '';
    const replies = comment?.replies || [];

    const handleCommentReply = (commentId: string, userName: string) => {
      if (commentId) {
        setCommentText(userName + ' ');
      }
    };

    return (
      <View
        key={comment.id}
        style={isReply ? styles.replyItem : styles.commentItem}
      >
        <View style={styles.commentRow}>
          <View
            style={[
              isReply ? styles.replyAvatarCircle : styles.commentAvatarCircle,
              { backgroundColor: comment.avatarBg },
            ]}
          >
            <Text
              style={
                isReply ? styles.replyAvatarText : styles.commentAvatarText
              }
            >
              {comment.avatarInitials}
            </Text>
          </View>
          <View style={styles.commentContentContainer}>
            {/* Header row: Username, time, and heart icon on the far right */}
            <View style={styles.commentUserHeader}>
              <View style={styles.commentUserMeta}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentTimeAgo}>{comment.timeAgo}</Text>
              </View>

              <TouchableOpacity
                style={styles.commentLikeButton}
                onPress={() => onCommentLike(comment.id)}
                activeOpacity={0.6}
              >
                <HeartIcon filled={isCommentLiked} size={14} />
                {likesCount > 0 && (
                  <Text
                    style={[
                      styles.commentLikeCount,
                      isCommentLiked && styles.likedText,
                    ]}
                  >
                    {likesCount}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.commentBodyText}>{comment.text}</Text>

            {!isReply && (
              <View style={styles.commentActionsRow}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleCommentReply(commentId, userName)}
                >
                  <Text style={styles.commentActionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Render nested replies */}
            {comment.replies && comment.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                {comment.replies.map(reply => renderComment(reply, true))}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (!post) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.overlayContainer, animOverlayStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: insets.top,
            }}
          >
            {/* Header */}
            <Animated.View style={[styles.overlayHeader, animHeaderStyle]}>
              <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                <Images.svgBackIcon width={20} height={20} />
              </TouchableOpacity>
              <Text style={styles.overlayTitle}>COMMENTS</Text>
              <View style={{ width: 40 }} />
            </Animated.View>

            {/* Scrollable Feed */}
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Zoom & Translate Post Card */}
              <Animated.View
                style={[styles.postCard, animCardStyle, { marginBottom: 0 }]}
              >
                {renderPostContent(post)}
              </Animated.View>

              {/* Comments List */}
              <Animated.View
                style={[styles.commentSectionContainer, animCommentsStyle]}
              >
                <Text style={styles.commentsCountTitle}>
                  {comments.length} Comments
                </Text>

                {comments.length > 0 ? (
                  comments.map(comment => renderComment(comment))
                ) : (
                  <Text style={styles.emptyText}>No comments yet.</Text>
                )}
              </Animated.View>
            </ScrollView>

            {/* Comment Input Bar */}
            <View
              style={[
                styles.inputBarContainer,
                { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 12 },
              ]}
            >
              <View style={styles.inputPillContainer}>
                {/* User Avatar */}
                <View style={styles.inputAvatarCircle}>
                  <Text style={styles.inputAvatarText}>ME</Text>
                </View>

                {/* Text Input */}
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a comment..."
                  placeholderTextColor="#999"
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />

                {/* Post Action Button (Inside the pill capsule) */}
                <TouchableOpacity
                  onPress={handlePostComment}
                  disabled={!commentText.trim()}
                  style={styles.postButtonWrapper}
                >
                  <Text
                    style={[
                      styles.postButtonText,
                      !commentText.trim() && styles.postButtonDisabled,
                    ]}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F2F2F7',
    zIndex: 1000,
  },
  overlayHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#F2F2F7',
  },
  overlayTitle: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    padding: 8,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  commentSectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#F2F2F7',
  },
  commentsCountTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  commentItem: {
    marginBottom: 20,
  },
  commentRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal: -5,
    borderBottomWidth: 0.9,
    borderBottomColor: '#DFDFE3',
  },
  commentAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
  commentContentContainer: {
    flex: 1,
  },
  commentUserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUserMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUsername: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  commentTimeAgo: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Poppins-Regular',
  },
  commentBodyText: {
    fontSize: 13,
    color: '#222222',
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
  commentActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  commentActionText: {
    fontSize: 12,
    color: '#757575',
    marginRight: 16,
    fontFamily: 'Poppins-Medium',
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeCount: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
    fontFamily: 'Poppins-Medium',
  },
  likedText: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  repliesContainer: {
    marginLeft: 16,
    marginTop: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: 16,
  },
  replyItem: {
    marginBottom: 12,
  },
  replyAvatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  replyAvatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  inputBarContainer: {
    paddingHorizontal: 16,
    borderColor: '#DFDFE3',
    backgroundColor: '#F2F2F7',
    marginBottom: -20,
  },
  inputPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 8,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  inputAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    paddingVertical: 8,
    maxHeight: 100,
    fontFamily: 'Poppins-Regular',
  },
  postButtonWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  postButtonDisabled: {
    color: '#fff',
  },
});
