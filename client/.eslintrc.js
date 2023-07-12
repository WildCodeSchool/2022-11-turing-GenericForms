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
       '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        "@typescript-eslint/no-empty-function": "off",
   },
  root: true,
  ignorePatterns: [".eslintrc.js", "jest.config.js", "", "**/build/**", "**/drafts/**"],
};
