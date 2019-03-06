const extentions = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json', '.node'];

module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    serviceworker: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    useJSXTextNode: true,
    extraFileExtensions: extentions,
  },
  settings: {
    node: {
      tryExtensions: extentions,
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    camelcase: 'off',
    '@typescript-eslint/camelcase': 'error',

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'node/no-missing-import': [
      'error',
      {
        allowModules: [],
        resolvePaths: ['./src'],
        tryExtensions: extentions,
      },
    ],
    'node/no-unsupported-features/es-syntax': 'off',
  },
};
