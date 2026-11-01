import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"];

const eslintConfig = defineConfig([
  {
    files: sourceFiles,
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended,
  {
    files: sourceFiles,
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: nextPlugin.configs["core-web-vitals"].rules,
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
