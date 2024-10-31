import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          trailingComma: "none",
          tabWidth: 2,
          useTabs: false,
          printWidth: 120,
          endOfLine: "auto"
        }
      ]
    },
    ignores: ["**/node_modules/", "**/dist/"]
  }
];
