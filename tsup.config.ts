import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm', 'iife'],  // CommonJS, ES Modules, and Browser IIFE
	globalName: 'Aksharamukha',      // For browsers (window.Aksharamukha)
	dts: true,                       // Generate .d.ts types
	sourcemap: true,
	minify: true,
	clean: true,
	esbuildOptions: options => {
		if (options.format !== 'esm') {
			options.logOverride = {
				'empty-import-meta': 'silent'
			};
		}
		
		if (options.format === 'iife') {
			// Add currentScript reference and window.Aksharamukha point to the default export
			options.footer = {
				js: `
					Object.assign(window, { ${options.globalName}: ${options.globalName}.default });
					window.${options.globalName}._setCurrentScript(document.currentScript);
				`
			};
		}
	},
	onSuccess: async () => {
		// Copy everything from downloads to dist
		const fs = await import('fs');
		const files = fs.lstatSync('./downloads', { throwIfNoEntry: true });
		if (files.isDirectory()) {
			fs.cpSync('./downloads', './dist', { recursive: true });
		}
	}
});