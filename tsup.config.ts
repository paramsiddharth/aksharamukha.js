import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm', 'iife'],  // CommonJS, ES Modules, and Browser IIFE
	globalName: 'Aksharamukha',      // For browsers (window.Aksharamukha)
	dts: true,                       // Generate .d.ts types
	sourcemap: true,
	minify: true,
	clean: true
});