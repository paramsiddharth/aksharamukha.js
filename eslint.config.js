import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		ignores: ["dist/", "node_modules/"],
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
