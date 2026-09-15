module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-navigation|react-native-reanimated|react-native-worklets|react-native-gesture-handler|react-native-screens|react-native-svg|react-native-mmkv|react-native-linear-gradient|@react-native-community|@notifee|@react-native-firebase)/)',
  ],
};
