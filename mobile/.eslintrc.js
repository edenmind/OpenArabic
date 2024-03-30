'use strict'

/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prefer-module */

module.exports = {
  env: {
    browser: true,
    es6: true,
    es2023: true,
    jest: true,
    node: true,
    'react-native/react-native': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:react-redux/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 14,
    sourceType: 'module'
  },
  plugins: ['import', 'react', 'react-native', 'react-hooks', 'prettier', 'react-redux', 'unicorn', 'security'],
  rules: {
    'comma-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'import/namespace': 0,
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    indent: 0,
    'multiple-properties-destructuring': 0,
    'no-extra-parens': 0,
    'no-unused-vars': ['error'],
    'object-curly-spacing': 0,
    'operator-linebreak': 0,
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        'space-before-function-paren': ['error', 'always'],
        trailingComma: 'none'
      }
    ],
    'putout/add-newlines-between-specifiers': 0,
    'putout/keyword-spacing': 0,
    'putout/nonblock-statement-body-newline': 0,
    'putout/objects-braces-inside-array': 0,
    'putout/padding-line-between-statements': 0,
    'putout/semi': 0,
    quotes: ['error', 'single'],
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-raw-text': 0,
    'security/detect-object-injection': 0,
    semi: 0,
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: true
      }
    ],
    'space-before-function-paren': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
