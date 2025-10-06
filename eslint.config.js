import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
	{
		ignores: ["dist/", "node_modules/", "docs/"],
	},
	js.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx", "/*.js", "/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules,

			// Style rules
			quotes: ["error", "single", { allowTemplateLiterals: true }], // enforce single quotes
			indent: ["error", "tab"], // use tabs, not spaces
			"eol-last": ["error", "never"], // forbid newline at EOF

			// TS-specific
			"@typescript-eslint/no-unused-vars": ["warn"],
			"no-console": "off",
		},
	},
];
