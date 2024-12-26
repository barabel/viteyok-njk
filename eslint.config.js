import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "comma-dangle": "off",
      "@/comma-dangle": ["error", "always-multiline"],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "space-before-function-paren": "off",
      "@/space-before-function-paren": ["error", "never"],
      "@/strict-boolean-expressions": 'off',
      "no-new": "off",
      "react-hooks/exhaustive-deps": 'off',
      "@typescript-eslint/no-explicit-any": "off",
      "no-empty": "off",
      "prefer-rest-params": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-irregular-whitespace": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    ignores: [
      "src/views/shared/lib/gsap-bonus/**/*",
      "page-builder/**/*",
      "commands/**/*",
    ],
  },
];
