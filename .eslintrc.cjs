// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "unicorn"],
  rules: {
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "lines-between-class-members": ["error", "always"],
    "no-param-reassign": ["warn", { props: true, ignorePropertyModificationsFor: ["draft"] }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    // Typescript
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-shadow": ["error", { allow: ["_"] }],
    // Unicorn
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-null": "off",
  },
};
