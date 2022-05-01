/* eslint-disable unicorn/prefer-module */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    'prettier',
    'react-redux',
    'mui-unused-classes',
    'react-redux',
    'unicorn',
    'react-redux-smell'
  ],
  rules: {
    'import/named': 2,
    quotes: [2, 'single', { avoidEscape: true }],
    'prettier/prettier': [
      'warn',
      {
        jsxBracketSameLine: true,
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        printWidth: 120,
        'space-before-function-paren': ['error', 'always']
      }
    ]
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:mui-unused-classes/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
    'plugin:react-redux/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:unicorn/all'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
