module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'prettier',
    'unused-imports',
    'perfectionist',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    // add
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    // "@typescript-eslint/no-unsafe-return": "error",
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    // 'no-console': 'error',
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': [2, { endOfLine: 'auto', semi: false }],
    'no-unused-vars': ['error', { vars: 'all' }],
  },
}
