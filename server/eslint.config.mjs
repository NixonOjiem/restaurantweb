import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    // This tells ESLint how to parse your actual project files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Keep this since your server uses require()
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  // ADD THIS SECTION BELOW to specifically handle .mjs files
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
