'use strict'

/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prefer-module */

module.exports = {
  env: {
    browser: true,
    es2022: true,
    'react-native/react-native': true,
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
    'react-native',
    'react-hooks',
    'prettier',
    'react-redux',
    'putout',
    'unicorn',
    'security'
  ],
  rules: {
    quotes: ['error', 'single'],
    'comma-dangle': 0,
    indent: 0,
    semi: 0,
    'object-curly-spacing': 0,
    'import/namespace': 0,
    'putout/keyword-spacing': 0,
    'security/detect-object-injection': 0,
    'putout/objects-braces-inside-array': 0,
    'react-native/no-inline-styles': 0,
    'multiple-properties-destructuring': 0,
    'putout/padding-line-between-statements': 0,
    'putout/add-newlines-between-specifiers': 0,
    'putout/nonblock-statement-body-newline': 0,
    'putout/semi': 0,
    'putout/putout': 0,
    'no-extra-parens': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prevent-abbreviations': 0,
    'react/react-in-jsx-scope': 0,
    'putout/remove-useless-async-await': 0,
    'putout/remove-useless-async': 0,
    'putout/multiple-properties-destructuring': 0,
    'putout/align-spaces': 0,
    'putout/comma-dangle': 0,
    'space-before-function-paren': 0,
    'unicorn/prefer-module': 0,
    'react-native/no-raw-text': 0,
    'react/no-unescaped-entities': 0,
    'prettier/prettier': [
      'warn',
      {
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
    'plugin:putout/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:react-redux/recommended',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
