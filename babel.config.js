module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  };
};
