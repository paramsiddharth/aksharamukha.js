import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['{src,test}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'dist/',
				'**/*.config.*',
				'**/*.test.*',
				'**/*.spec.*'
			]
		},
		testTimeout: 60000,
		setupFiles: ['./setup-tests.ts'],
	},
	// Might be needed later.
	/* server: {
		fs: {
			allow: ['..']
		}
	} */
});