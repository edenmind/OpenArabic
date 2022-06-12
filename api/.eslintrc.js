'use strict'

/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prefer-module */

module.exports = {
  env: {
    browser: true,
    es2022: true,
    es6: true,
    node: true,
    jest: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['import', 'prettier', 'unicorn', 'security', 'putout'],
  rules: {
    'comma-dangle': 0,
    indent: 0,
    semi: 0,
    'object-curly-spacing': 0,
    'multiple-properties-destructuring': 0,
    'putout/padding-line-between-statements': 0,
    'putout/semi': 0,
    'putout/remove-useless-async-await': 0,
    'promises/remove-useless-async': 0,
    'putout/remove-useless-async': 0,
    'putout/multiple-properties-destructuring': 0,
    'putout/align-spaces': 0,
    'putout/comma-dangle': 0,
    'space-before-function-paren': 0,
    'import/named': 2,
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
    'plugin:putout/recommended',
    'plugin:import/errors',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:unicorn/recommended',
    'plugin:security/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
