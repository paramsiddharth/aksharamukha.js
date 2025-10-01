import { afterAll, vi } from 'vitest';

afterAll(() => {
	vi.restoreAllMocks();
});

vi.setConfig({ testTimeout: 60000 });