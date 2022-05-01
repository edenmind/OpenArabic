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
  plugins: ['import', 'prettier', 'unicorn', 'security'],
  rules: {
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
