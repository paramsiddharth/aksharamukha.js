import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import Aksharamukha from '.';

describe('Aksharamukha', () => {
	beforeAll(() => {
		// Indicate that we are in a test environment
		Aksharamukha._isTestEnv = true;
	});

	afterAll(() => {
		Aksharamukha._isTestEnv = false;
	});

	it('should export Aksharamukha as default', () => {
		expect(Aksharamukha).toBeDefined();
		expect(typeof Aksharamukha).toBe('function');
	});

	it('should be a class constructor', () => {
		expect(Aksharamukha.prototype).toBeDefined();
		expect(Aksharamukha.prototype.constructor).toBe(Aksharamukha);
	});

	it('should have a static new method', () => {
		expect(typeof Aksharamukha.new).toBe('function');
		expect(Aksharamukha.new).toBeDefined();
	});

	it('should initialize without error', () => {
		expect(async () => {
			const instance = await Aksharamukha.new();
			expect(instance).toBeInstanceOf(Aksharamukha);
		}).not.toThrowError();
	});

	it('should run test method correctly', () => {
		expect(async () => {
			const instance = await Aksharamukha.new();
			await instance.test();
		}).not.toThrowError();
	});
});