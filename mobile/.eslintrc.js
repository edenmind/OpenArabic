module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  extends: [
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
