module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true,

  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
