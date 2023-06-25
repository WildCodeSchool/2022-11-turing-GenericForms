/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ['@typescript-eslint'],
   rules: {
       '@typescript-eslint/no-misused-promises': "off",
       '@typescript-eslint/no-unsafe-assignment': 'off',
   },
  root: true,
};
