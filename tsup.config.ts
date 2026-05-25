import { defineConfig } from 'tsup';

// // @ts-expect-error Runtime Node import; this TS setup doesn't resolve built-in module types here.
// import { readFileSync } from 'fs';

const pyodideDependencies = [
	'pyodide-lock.json',
	'pyodide.asm.wasm',
	'pyodide.asm.js',
	'pyodide.mjs',
];

/* const packageJson = JSON.parse(readFileSync('./package.json', 'utf8')) as {
	dependencies?: Record<string, string>;
};
const pyodideVersionFromDependency = packageJson.dependencies?.pyodide?.match(/\d+\.\d+\.\d+/)?.[0]; */

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm', 'iife'],  // CommonJS, ES Modules, and Browser IIFE
	globalName: 'Aksharamukha',      // For browsers (window.Aksharamukha)
	dts: true,                       // Generate .d.ts types
	sourcemap: true,
	minify: true,
	clean: true,
	/* define: {
		__PYODIDE_VERSION__: JSON.stringify(pyodideVersionFromDependency),
	}, */
	esbuildOptions: options => {
		if (options.format !== 'esm') {
			options.logOverride = {
				'empty-import-meta': 'silent'
			};
		}
		
		if (options.format === 'iife') {
			// Keep default class as global while preserving named exports (enums/helpers) on it.
			options.footer = {
				js: `
					(function () {
						var ns = window.${options.globalName};
						var main = ns && ns.default ? ns.default : ns;
						if (main && ns) {
							Object.assign(main, ns);
						}
						window.${options.globalName} = main;
						if (window.${options.globalName} && typeof document !== 'undefined') {
							window.${options.globalName}._setCurrentScript(document.currentScript);
						}
					})();
				`
			};
		}
	},
	onSuccess: async () => {
		// Copy everything from downloads to dist
		// @ts-expect-error Runtime Node import; this TS setup doesn't resolve built-in module types here.
		const fs = await import('fs');
		const files = fs.lstatSync('./downloads', { throwIfNoEntry: true });
		if (!files.isDirectory()) {
			throw new Error('./downloads is not a directory.');
		}

		fs.cpSync('./downloads', './dist', { recursive: true });
		const pyodideFiles = fs.readdirSync('./node_modules/pyodide');
		for (const file of pyodideFiles) {
			if (file.endsWith('.whl') || file.endsWith('.zip') || pyodideDependencies.includes(file)) {
				fs.cpSync(`./node_modules/pyodide/${file}`, `./dist/${file}`);
			}
		}
	}
});