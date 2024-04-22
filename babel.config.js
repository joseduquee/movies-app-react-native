// api.cache(false)
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        "allowUndefined": true
      },
    ],

    //si uso reanimated siempre es el ultimo
  ],
};
