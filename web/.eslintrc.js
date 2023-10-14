'use strict'

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
    // 'react',
    'react-hooks',
    'prettier',
    'react-redux',
    'react-redux',
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
    'putout/nonblock-statement-body-newline': 0,
    'putout/putout': 0,
    'security/detect-object-injection': 0,
    'quote-props': 0,
    'putout/long-properties-destructuring': 0,
    'putout/objects-braces-inside-array': 0,
    'no-extra-parens': 0,
    'react/react-in-jsx-scope': 0,
    'putout/remove-useless-async-await': 0,
    'putout/remove-useless-async': 0,
    'putout/multiple-properties-destructuring': 0,
    'putout/align-spaces': 0,
    'putout/comma-dangle': 0,
    'space-before-function-paren': 0,
    'putout/remove-empty-newline-after-import': 0,
    'putout/remove-empty-newline-between-declarations': 0,
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
    // 'plugin:mui-unused-classes/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
    'plugin:react-redux/recommended',
    // 'plugin:react/jsx-runtime',
    // 'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:array-func/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
