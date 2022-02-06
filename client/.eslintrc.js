module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/react-in-jsx-scope': ['off'],
    'react/prop-types': ['off'],
    'import/no-unresolved': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
