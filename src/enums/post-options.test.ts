import { describe, expect, it } from 'vitest';
import { fixPostOptions, PostOption } from './post-options';

describe('Post Options', () => {
	describe('Fix Post Options', () => {
		it('should keep only the latest option inside mutually exclusive groups', () => {
			const result = fixPostOptions([
				PostOption.MalayalamLineVirama,
				PostOption.MalayalamCircVirama,
				PostOption.UseAlternateI1,
				PostOption.UseAlternateI2,
			]);

			expect(result).toEqual([
				PostOption.MalayalamCircVirama,
				PostOption.UseAlternateI2,
			]);
		});

		it('should preserve latest-order semantics with duplicates and grouped options', () => {
			const result = fixPostOptions([
				PostOption.RemoveDiacritics,
				PostOption.RemoveDiacritics,
				PostOption.ThaiTranscription,
				PostOption.ThaiNativeConsonants,
				PostOption.RemoveMajliyana,
				PostOption.RemoveDiacritics,
			]);

			expect(result).toEqual([
				PostOption.ThaiNativeConsonants,
				PostOption.RemoveMajliyana,
				PostOption.RemoveDiacritics,
			]);
		});
	});
});