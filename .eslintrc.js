module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },

  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: 'off',
    quotes: [2, 'single', 'avoid-escape'],
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'ignore', ':': 'ignore' } },
    ],
  },
};
