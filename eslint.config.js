import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Artefactos generados (ver CLAUDE.md): ESLint no lee .gitignore
  globalIgnores(["dist", "coverage", "ds-bundle", ".design-sync"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      // Preset flat: el de la raíz de configs es estilo eslintrc y ESLint 9 lo rechaza
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // Sin eslint-plugin-react, no-unused-vars no ve usos en JSX (<Componente />, <motion.div>):
      // se ignoran los PascalCase y `motion` de framer-motion para evitar falsos positivos.
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(?:[A-Z_]|motion$)", argsIgnorePattern: "^_" },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-param-reassign": ["error", { props: false }],
    },
  },
  {
    // Tests y setup corren en Node (jsdom): usan `global` para stubs como fetch
    files: ["src/test/**/*.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
