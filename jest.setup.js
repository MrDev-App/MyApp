/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-worklets and react-native-reanimated
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));
jest.mock('react-native-reanimated', () => {
  const reanimated = require('react-native-reanimated/mock');
  return {
    ...reanimated,
    useFrameCallback: jest.fn(() => ({
      setActive: jest.fn(),
      isActive: true,
    })),
    scrollTo: jest.fn(),
  };
});

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  const store = new Map();
  const mockMMKV = {
    set: jest.fn((key, value) => {
      store.set(key, value);
    }),
    getString: jest.fn(key => {
      const val = store.get(key);
      return typeof val === 'string' ? val : undefined;
    }),
    getNumber: jest.fn(key => {
      const val = store.get(key);
      return typeof val === 'number' ? val : undefined;
    }),
    getBoolean: jest.fn(key => {
      const val = store.get(key);
      return typeof val === 'boolean' ? val : undefined;
    }),
    delete: jest.fn(key => {
      store.delete(key);
    }),
    remove: jest.fn(key => {
      store.delete(key);
    }),
    contains: jest.fn(key => store.has(key)),
    getAllKeys: jest.fn(() => Array.from(store.keys())),
    clearAll: jest.fn(() => {
      store.clear();
    }),
  };
  return {
    createMMKV: jest.fn(() => mockMMKV),
    MMKV: jest.fn(() => mockMMKV),
  };
});

// Mock @react-native-community/blur
jest.mock('@react-native-community/blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BlurView: props => React.createElement(View, props),
  };
});

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props);
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// Mock lottie-react-native
jest.mock('lottie-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props);
});

// Mock react-native-video
jest.mock('react-native-video', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props);
});

// Mock react-native-google-mobile-ads
jest.mock('react-native-google-mobile-ads', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BannerAd: props => React.createElement(View, props),
    BannerAdSize: {
      ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
      BANNER: 'BANNER',
    },
    TestIds: {
      BANNER: 'ca-app-pub-3940256099942544/6300978111',
      REWARDED: 'ca-app-pub-3940256099942544/5224354917',
      APP_OPEN: 'ca-app-pub-3940256099942544/9257395921',
      ADAPTIVE_BANNER: 'ca-app-pub-3940256099942544/6300978111',
    },
    RewardedAd: {
      createForAdRequest: jest.fn(() => ({
        load: jest.fn(),
        show: jest.fn(),
        addAdEventListener: jest.fn(() => jest.fn()),
        loaded: false,
      })),
    },
    AppOpenAd: {
      createForAdRequest: jest.fn(() => ({
        load: jest.fn(),
        show: jest.fn(),
        addAdEventListener: jest.fn(() => jest.fn()),
        loaded: false,
      })),
    },
    RewardedAdEventType: {
      LOADED: 'loaded',
      EARNED_REWARD: 'earned_reward',
    },
    AdEventType: {
      CLOSED: 'closed',
      ERROR: 'error',
      LOADED: 'loaded',
    },
    default: jest.fn(() => ({
      initialize: jest.fn(() => Promise.resolve([])),
    })),
  };
});

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => ({
  displayNotification: jest.fn(),
  createChannel: jest.fn(),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  onForegroundEvent: jest.fn(() => jest.fn()),
  onBackgroundEvent: jest.fn(),
  EventType: {
    PRESS: 1,
    DELIVERED: 3,
  },
  AndroidImportance: {
    HIGH: 4,
    DEFAULT: 3,
  },
}));

// Mock @react-native-firebase
jest.mock('@react-native-firebase/app', () => ({
  default: () => ({}),
}));
jest.mock('@react-native-firebase/firestore', () => ({
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: false, data: () => ({}) })),
        set: jest.fn(() => Promise.resolve()),
      })),
    })),
  }),
}));
jest.mock('@react-native-firebase/messaging', () => ({
  default: () => ({
    requestPermission: jest.fn(() => Promise.resolve(1)),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    onMessage: jest.fn(() => jest.fn()),
    setBackgroundMessageHandler: jest.fn(),
  }),
}));
jest.mock('@react-native-firebase/storage', () => ({
  default: () => ({
    ref: jest.fn(() => ({
      getDownloadURL: jest.fn(() => Promise.resolve('https://mock-url.com')),
    })),
  }),
}));

// Mock react-native-config
jest.mock('react-native-config', () => ({
  default: {},
}));
