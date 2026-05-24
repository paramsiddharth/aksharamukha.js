import { defineConfig } from 'tsup';

const pyodideDependencies = [
	'pyodide-lock.json',
	'pyodide.asm.wasm',
	'pyodide.asm.js',
];

export default defineConfig([
	{
		entry: {
			index: 'src/index.ts',
			'index.node': 'src/index.node.ts'
		},
		format: ['cjs', 'esm'],
		dts: true,
		sourcemap: true,
		minify: true,
		clean: true,
		esbuildOptions: options => {
			if (options.format !== 'esm') {
				options.logOverride = {
					'empty-import-meta': 'silent'
				};
			}
		},
		onSuccess: async () => {
			// Copy runtime wheels and pyodide assets into dist for browser consumption.
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
	},
	{
		entry: ['src/index.ts'],
		format: ['iife'],
		globalName: 'Aksharamukha',
		sourcemap: true,
		minify: true,
		clean: false,
		esbuildOptions: options => {
			options.logOverride = {
				'empty-import-meta': 'silent'
			};

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
	}
]);