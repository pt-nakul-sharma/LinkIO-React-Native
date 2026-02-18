module.exports = {
  presets: [
    '@react-native/babel-preset',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
  ],
};
