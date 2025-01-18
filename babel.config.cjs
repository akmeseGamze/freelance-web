module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['module:metro-react-native-babel-preset',{ "useTransformReactJSXExperimental": true }]],
    plugins: ['react-native-reanimated/plugin'],
  };
};