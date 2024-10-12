module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 0,
    camelcase: 0,
    'func-names': 0,
    'no-console': 0,
    'max-len': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
};
