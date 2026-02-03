import js from "@eslint/js";
import typescript from "typescript-eslint";
import globals from "globals";

export default [
	js.configs.recommended,
	...typescript.configs.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"no-console": "off",
		},
	},
	{
		ignores: [
			"**/.next/**",
			"**/.open-next/**",
			"**/.wrangler/**",
			"**/node_modules/**",
			"**/out/**",
			"**/build/**",
			"**/dist/**",
			"**/*.config.{js,mjs,ts}",
			"**/coverage/**",
		],
	},
];
