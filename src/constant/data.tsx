import React from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { ImageSourcePropType } from 'react-native';

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  illustration: () => React.JSX.Element;
}

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

export interface Post {
  id: string;
  username: string;
  avatarInitials: string;
  avatarBg: string;
  timeAgo: string;
  text: string;
  images?: ImageSourcePropType[];
  likes: number;
  comments: number;
  shares: number;
  type?: 'post' | 'video' | 'product';
  // video fields
  videoTitle?: string;
  views?: string;
  // product fields
  price?: string;
  brand?: string;
  rating?: number;
}

export const categories = [
  'All',
  'Alcantara',
  'Beige',
  'Carbon Fiber',
  'Disk Brakes',
];

export const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to MyApp',
    subtitle:
      'Discover amazing feeds, news, and connect with people from around the globe.',
    color: '#2C8358',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#2C8358" opacity="0.1" />
        <Rect x="25" y="25" width="50" height="50" rx="10" fill="#2C8358" />
        <Circle cx="50" cy="50" r="12" fill="#ffffff" />
      </Svg>
    ),
  },
  {
    id: '2',
    title: 'Safe & Secure',
    subtitle:
      'We protect your data and logs with industry standard encryption.',
    color: '#1A535C',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#1A535C" opacity="0.1" />
        <Path
          d="M50,22 L78,32 L78,58 C78,74 50,85 50,85 C50,85 22,74 22,58 L22,32 Z"
          fill="#1A535C"
        />
        <Path d="M45,60 L35,50 L40,45 L45,50 L60,35 L65,40 Z" fill="#ffffff" />
      </Svg>
    ),
  },
  {
    id: '3',
    title: 'Personalized View',
    subtitle:
      'Customize your system preferences, themes, and navigation parameters instantly.',
    color: '#495867',
    illustration: () => (
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#495867" opacity="0.1" />
        <Rect x="30" y="30" width="40" height="40" rx="8" fill="#495867" />
        <Circle cx="40" cy="50" r="4" fill="#ffffff" />
        <Circle cx="50" cy="50" r="4" fill="#ffffff" />
        <Circle cx="60" cy="50" r="4" fill="#ffffff" />
      </Svg>
    ),
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    username: 'Alex_Carbon',
    avatarInitials: 'AC',
    avatarBg: '#EF4444',
    timeAgo: '2 hours ago',
    text: 'Finally got the new dry carbon fiber splitter installed today! Fitment is absolutely 10/10. What do we think? Worth the wait? 🏎️🔥',
    images: [
      require('../assets/images/splitter.png'),
      require('../assets/images/steering_wheel.png'),
      require('../assets/images/brakes.png'),
      require('../assets/images/steering_wheel.png'),
      require('../assets/images/brakes.png'),
      require('../assets/images/cars_coffee.png'),
      require('../assets/images/splitter.png'),
      require('../assets/images/brakes.png'),
      require('../assets/images/splitter.png'),
    ],
    likes: 42,
    comments: 18,
    shares: 3,
    type: 'post',
  },
  {
    id: '2',
    username: 'Jake_King',
    avatarInitials: 'JK',
    avatarBg: '#F59E0B',
    timeAgo: '2 hours ago',
    text: "Who's heading to the Saturday morning Cars & Coffee meet in Brooklyn? Weather looks like it's going to be absolute perfection. Let's roll out in a group! ☕🚗",
    images: [
      require('../assets/images/cars_coffee.png'),
      require('../assets/images/splitter.png'),
      require('../assets/images/brakes.png'),
    ],
    likes: 42,
    comments: 18,
    shares: 3,
    type: 'post',
  },
  {
    id: '3',
    username: 'Sophia_Alcantara',
    avatarInitials: 'SA',
    avatarBg: '#EC4899',
    timeAgo: '4 hours ago',
    text: 'Just finished wrapping the dashboard trim with OEM Alcantara. The feel is incredible and matches the steering wheel perfectly! Watch the full process here. 🛠️🖤',
    images: [
      require('../assets/images/steering_wheel.png'),
      require('../assets/images/brakes.png'),
    ],
    likes: 28,
    comments: 7,
    shares: 1,
    type: 'post',
    videoTitle: 'Dashboard Alcantara Wrap Tutorial',
    views: '1.2K',
  },
  {
    id: '4',
    username: 'Marcus_Brembo',
    avatarInitials: 'MB',
    avatarBg: '#10B981',
    timeAgo: '5 hours ago',
    text: 'Upgraded to carbon ceramic brake discs today. The weight saving on unsprung mass alone is massive, not to mention the braking performance. Absolutely next level! 🛑💥',
    images: [require('../assets/images/brakes.png')],
    likes: 64,
    comments: 25,
    shares: 9,
    type: 'post',
    videoTitle: 'Brembo Carbon Ceramic Disc (Front Pair)',
    brand: 'Brembo Performance',
    price: '$3,899.99',
    rating: 4.8,
  },
  {
    id: '5',
    username: 'Carbon_Fiber_Fanatic',
    avatarInitials: 'CF',
    avatarBg: '#3B82F6',
    timeAgo: '1 day ago',
    text: 'Testing the new carbon fiber gloss weave under direct sunlight. The pattern alignment on the hood is flawless. Real craftsmanship takes time but the results speak for themselves. ✨🚘',
    images: [],
    likes: 89,
    comments: 34,
    shares: 12,
    type: 'post',
  },
  {
    id: '6',
    username: 'Beige_Interior_King',
    avatarInitials: 'BI',
    avatarBg: '#84CC16',
    timeAgo: '2 days ago',
    text: 'Just detailed this rare beige leather interior on a classic 911. The leather cleaner worked wonders. What color interior is your favorite? 🧼💼',
    images: [],
    likes: 19,
    comments: 4,
    shares: 0,
    type: 'post',
  },
];

export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1_1',
      username: 'Alex_Carbon',
      avatarInitials: 'AC',
      avatarBg: '#EF4444',
      timeAgo: '1h ago',
      text: 'The fitment looks perfect! Did you have to trim any of the undertray?',
      likes: 15,
    },
    {
      id: 'c1_2',
      username: 'Mike_K',
      avatarInitials: 'MK',
      avatarBg: '#3B82F6',
      timeAgo: '30m ago',
      text: "I've been waiting for this splitter for months. Worth every penny.",
      likes: 8,
    },
    {
      id: 'c1_3',
      username: 'Sarah_J',
      avatarInitials: 'SJ',
      avatarBg: '#10B981',
      timeAgo: '2h ago',
      text: "It looks great, but how's the weight difference compared to the OEM piece?",
      likes: 15,
      replies: [
        {
          id: 'c1_3_r1',
          username: 'Alrbon',
          avatarInitials: 'AC',
          avatarBg: '#EF4444',
          timeAgo: '45m ago',
          text: 'It shaved about 3.2lbs off the front end.',
          likes: 4,
        },
        {
          id: 'c1_3_r2',
          username: 'Mike_K',
          avatarInitials: 'MK',
          avatarBg: '#3B82F6',
          timeAgo: '20m ago',
          text: "Nice! That's a noticeable drop. Did you dyno it after install?",
          likes: 4,
        },
      ],
    },
    {
      id: 'c1_4',
      username: 'David_R',
      avatarInitials: 'DR',
      avatarBg: '#8B5CF6',
      timeAgo: '5m ago',
      text: 'The carbon weave looks incredible. What finish did you go with?',
      likes: 4,
    },
  ],
  '2': [
    {
      id: 'c2_1',
      username: 'Alex_Carbon',
      avatarInitials: 'AC',
      avatarBg: '#EF4444',
      timeAgo: '1h ago',
      text: 'Count me in! What time is everyone meeting up?',
      likes: 5,
    },
    {
      id: 'c2_2',
      username: 'Marcus_Brembo',
      avatarInitials: 'MB',
      avatarBg: '#10B981',
      timeAgo: '45m ago',
      text: "I'll join with my new brakes. Brooklyn is a nice drive.",
      likes: 3,
    },
  ],
  '3': [
    {
      id: 'c3_1',
      username: 'Jake_King',
      avatarInitials: 'JK',
      avatarBg: '#F59E0B',
      timeAgo: '2h ago',
      text: 'Alcantara looks so clean. Did you wrap it yourself or buy a pre-wrapped kit?',
      likes: 6,
    },
    {
      id: 'c3_2',
      username: 'Sophia_Alcantara',
      avatarInitials: 'SA',
      avatarBg: '#EC4899',
      timeAgo: '1h ago',
      text: 'Wrapped it myself! Took about 3 hours of patient stretching.',
      likes: 2,
    },
  ],
  '4': [
    {
      id: 'c4_1',
      username: 'Alex_Carbon',
      avatarInitials: 'AC',
      avatarBg: '#EF4444',
      timeAgo: '3h ago',
      text: 'Carbon ceramics are the holy grail of braking. Pricey but unbeatable.',
      likes: 14,
    },
    {
      id: 'c4_2',
      username: 'Marcus_Brembo',
      avatarInitials: 'MB',
      avatarBg: '#10B981',
      timeAgo: '2h ago',
      text: 'Exactly! The lack of brake dust is another huge benefit.',
      likes: 5,
    },
  ],
  '5': [
    {
      id: 'c5_1',
      username: 'Sarah_J',
      avatarInitials: 'SJ',
      avatarBg: '#10B981',
      timeAgo: '10h ago',
      text: 'That carbon pattern alignment is perfect. Outstanding work.',
      likes: 8,
    },
  ],
  '6': [
    {
      id: 'c6_1',
      username: 'David_R',
      avatarInitials: 'DR',
      avatarBg: '#8B5CF6',
      timeAgo: '1d ago',
      text: 'Beige interior looks classy, but keeping it clean is a full-time job!',
      likes: 9,
    },
  ],
};

export const HeartIcon = ({
  filled,
  size = 18,
}: {
  filled: boolean;
  size?: number;
}) => {
  const scale = useSharedValue(1);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (filled) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 110, easing: Easing.out(Easing.ease) }),
        withSpring(1, { damping: 50, stiffness: 300 }),
      );
    } else {
      scale.value = withSequence(
        withTiming(1.3, { duration: 110, easing: Easing.out(Easing.ease) }),
        withSpring(1, { damping: 50, stiffness: 300 }),
      );
    }
  }, [filled]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 14 12"
        fill={filled ? '#000000' : 'none'}
        stroke={filled ? '#000000' : '#757575'}
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <Path d="M1.56479 2.39991C1.19694 2.93478 1.00001 3.56865 1 4.21779C1 5.55947 1.87507 6.55114 2.75013 7.42615L5.96338 10.5365C6.07366 10.66 6.20894 10.7585 6.36025 10.8257C6.51155 10.8928 6.67542 10.927 6.84095 10.926C7.00649 10.9249 7.1699 10.8887 7.32035 10.8196C7.47079 10.7506 7.60481 10.6503 7.71352 10.5254L10.9174 7.42615C11.7925 6.55114 12.6676 5.55363 12.6676 4.21779C12.6707 3.56722 12.4755 2.93115 12.1082 2.39421C11.7408 1.85728 11.2186 1.44496 10.6111 1.21212C10.0036 0.979291 9.33953 0.936993 8.70738 1.09086C8.07522 1.24472 7.50492 1.58745 7.07238 2.07343C7.04182 2.10611 7.00487 2.13216 6.96383 2.14997C6.92279 2.16778 6.87852 2.17697 6.83378 2.17697C6.78904 2.17697 6.74478 2.16778 6.70373 2.14997C6.66269 2.13216 6.62574 2.10611 6.59518 2.07343C6.16128 1.59059 5.59111 1.25072 4.95998 1.0987C4.32885 0.946681 3.66645 0.989671 3.06026 1.22199C2.45408 1.45431 1.93263 1.86503 1.56479 2.39991Z" />
      </Svg>
    </Animated.View>
  );
};

