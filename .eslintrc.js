module.exports = {
  extends: 'jnmorse',
  env: {
    mocha: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9
  },
  rules: {
    'import/no-unused-modules': 'off'
  }
};
