module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.ios.ts',
          '.ios.jsx',
          '.ios.tsx',
          '.android.js',
          '.android.ts',
          '.android.jsx',
          '.android.tsx',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.png',
        ],
        root: ['.'],
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@': './src',
        },
      },
    ],
  ],
};
