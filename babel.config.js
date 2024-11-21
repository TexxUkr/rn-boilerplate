module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './app',
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
        root: ['./app'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
