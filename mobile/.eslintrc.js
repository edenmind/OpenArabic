module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
    'react-native',
    'react-hooks',
    'prettier',
    'react-redux',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:react-redux/recommended',
    'plugin:import/warnings',
    'plugin:import/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
