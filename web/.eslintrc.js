'use strict'

/* eslint-disable quote-props */
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
    'putout',
    'security',
    'sonarjs',
    'array-func'
  ],
  rules: {
    'comma-dangle': 0,
    indent: 0,
    semi: 0,
    'object-curly-spacing': 0,
    'multiple-properties-destructuring': 0,
    'putout/padding-line-between-statements': 0,
    'putout/semi': 0,
    'putout/putout': 0,
    'no-extra-parens': 0,
    'unicorn/prevent-abbreviations': 0,
    'react/react-in-jsx-scope': 0,
    'putout/remove-useless-async-await': 0,
    'putout/remove-useless-async': 0,
    'putout/multiple-properties-destructuring': 0,
    'putout/align-spaces': 0,
    'putout/comma-dangle': 0,
    'space-before-function-paren': 0,
    'unicorn/prefer-module': 0,
    quotes: [2, 'single', { avoidEscape: true }],
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
    'plugin:import/errors',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:mui-unused-classes/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
    'plugin:react-redux/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:unicorn/all',
    'plugin:security/recommended',
    'plugin:putout/recommended',
    'plugin:sonarjs/recommended',
    'plugin:array-func/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
