'use strict'

/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */

module.exports = {
  env: {
    browser: false,
    es2023: true,
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module'
  },
  plugins: ['import', 'prettier', 'security', 'putout'],
  rules: {
    'comma-dangle': 0,
    indent: 0,
    semi: 0,
    'import/named': 2,
    'multiple-properties-destructuring': 0,
    'object-curly-spacing': 0,
    'promises/remove-useless-async': 0,
    'putout/align-spaces': 0,
    'putout/comma-dangle': 0,
    'security/detect-object-injection': 0,
    'putout/multiple-properties-destructuring': 0,
    'putout/objects-braces-inside-array': 0,
    'putout/long-properties-destructuring': 0,
    'putout/padding-line-between-statements': 0,
    'putout/remove-useless-async-await': 0,
    'putout/remove-useless-async': 0,
    'putout/keyword-spacing': 0,
    'putout/semi': 0,
    'security/detect-possible-timing-attacks': 0,
    'space-before-function-paren': 0,
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
  ]
}
