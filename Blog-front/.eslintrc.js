module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2022: true,
    'jest/globals': true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports',
  ],
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:aspida/recommended',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'arrow-body-style': ['off'],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'react/prop-types': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/require-default-props': [
      0,
      {
        forbidDefaultForRequired: false,
        ignoreFunctionalComponents: true,
      },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/no-unsafe-return': ['warn'],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    'testing-library/no-node-access': 'off',
    'testing-library/no-container': 'off',
  },
};
