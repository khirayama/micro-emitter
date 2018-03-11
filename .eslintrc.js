module.exports = {
  extends: [
    'eslint-config-xo-space/esnext',
  ],
  env: {
    node: true,
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  }
};
