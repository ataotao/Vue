// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  'globals': {
        'Velocity': true,
        'axios': true,
        'TDAPP': true
  },
  env: {
    browser: true,
    es6: true,
    'commonjs': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['warn', 4],
    'no-console': ['off'],
    'quotes': ['warn', 'single'],
    'semi': ['error', 'always']
  }
}
