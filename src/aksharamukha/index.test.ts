import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { loadPyodide } from 'pyodide';

import Aksharamukha, { ProcessParams } from '.';

describe('Aksharamukha', () => {
	describe('Basic structure and initialization', () => {
		let instance: Aksharamukha;

		beforeAll(async () => {
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

		it('should initialize without error', async () => {
			instance = await Aksharamukha.new();
			expect(instance).toBeInstanceOf(Aksharamukha);
			await instance.test();
		});

		it('should initialize with provided Pyodide instance', async () => {
			const pyodide = await loadPyodide({
				indexURL: './node_modules/pyodide',
				packageCacheDir: './node_modules/pyodide'
			});
			instance = await Aksharamukha.new({ pyodide });
			expect(instance).toBeInstanceOf(Aksharamukha);
			await instance.test();
		});
	});

	describe('Transliteration methods', () => {
		let instance: Aksharamukha;

		beforeAll(async () => {
			Aksharamukha._isTestEnv = true;
			instance = await Aksharamukha.new();
		});

		afterAll(() => {
			Aksharamukha._isTestEnv = false;
		});

		describe('Basic transliteration tests', () => {

			const basicTests = [
				{
					description: 'should transliterate ITRANS to Telugu',
					src: 'itrans',
					tgt: 'telugu', 
					txt: 'rAma ##( test )## rAma',
					expected: 'రామ ( test ) రామ'
				},
				{
					description: 'should transliterate Harvard-Kyoto to Siddham',
					src: 'hk',
					tgt: 'siddham',
					txt: 'buddhaH',
					expected: '𑖤𑖲𑖟𑖿𑖠𑖾'
				},
				{
					description: 'should transliterate Devanagari to Granthapandya',
					src: 'devanagari',
					tgt: 'granthapandya',
					txt: 'धर्म',
					expected: 'ധര്മ'
				},
				{
					description: 'should transliterate ITRANS to Tamil',
					src: 'itrans',
					tgt: 'tamil',
					txt: 'vaNakkam',
					expected: 'வணக்கம்'
				},
				{
					description: 'should transliterate ITRANS to Tamil',
					src: 'tamil',
					tgt: 'urdu',
					txt: 'வணக்கம்',
					expected: 'وَنَکَّمْ'
				}
			];

			it.each(basicTests)(
				'$description',
				({ src, tgt, txt, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: true,
						param: ProcessParams.default,
						preOptions: [],
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with nativize=false', () => {
			const nativizeTests = [
				{
					description: 'should transliterate HK to Tamil with nativize=false',
					src: 'HK',
					tgt: 'Tamil',
					txt: 'maMgaLa',
					expected: 'மம்ʼக³ள'
				}
			];

			it.each(nativizeTests)(
				'$description',
				({ src, tgt, txt, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: false,
						param: ProcessParams.default,
						preOptions: [],
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with post-processing options', () => {
			const postOptionsTests = [
				{
					description: 'should transliterate HK to Tamil with TamilSubScript and TamilRemoveApostrophe',
					src: 'HK',
					tgt: 'Tamil',
					txt: 'bRhaspati gaMgA',
					postOptions: ['TamilSubScript', 'TamilRemoveApostrophe'],
					expected: 'ப்₃ருஹஸ்பதி க₃ம்கா₃'
				}
			];

			it.each(postOptionsTests)(
				'$description',
				({ src, tgt, txt, postOptions, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: false,
						param: ProcessParams.default,
						preOptions: [],
						postOptions
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with pre-processing options', () => {
			const preOptionsTests = [
				{
					description: 'should transliterate Thai to Devanagari with ThaiOrthography',
					src: 'Thai',
					tgt: 'Devanagari',
					txt: 'พุทธัง สะระณัง คัจฉามิ',
					preOptions: ['ThaiOrthography'],
					expected: 'बुद्धङ् सरणङ् गच्छामि'
				},
				{
					description: 'should transliterate Devanagari to IAST with RemoveSchwaHindi',
					src: 'Devanagari',
					tgt: 'IAST',
					txt: 'धर्म भारत की श्रमण परम्परा से निकला धर्म और दर्शन है',
					preOptions: ['RemoveSchwaHindi'],
					expected: 'dharm bhārat kī śramaṇ paramparā se niklā dharm aur darśan hai'
				}
			];

			it.each(preOptionsTests)(
				'$description',
				({ src, tgt, txt, preOptions, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: true,
						param: ProcessParams.default,
						preOptions,
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with script_code parameter', () => {
			const scriptCodeTests = [
				{
					description: 'should transliterate Deva to Tamil with script_code',
					src: 'deva',
					tgt: 'taml',
					txt: 'धर्म भारत की ',
					expected: 'த⁴ர்ம பா⁴ரத கீ '
				},
				{
					description: 'should transliterate Deva to Arabic with script_code',
					src: 'deva',
					tgt: 'arab',
					txt: 'धर्म भारत की ',
					expected: 'دَرْمَ بَارَتَ كِي '
				},
				{
					description: 'should transliterate Hindi Devanagari to Cyrillic with script_code',
					src: 'hi-Deva',
					tgt: 'cyrl',
					txt: 'धर्म भारत की ',
					expected: 'дхарма бха̄рата кӣ '
				}
			];

			it.each(scriptCodeTests)(
				'$description',
				({ src, tgt, txt, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: true,
						param: ProcessParams.scriptCode,
						preOptions: [],
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with lang_code parameter', () => {
			const langCodeTests = [
				{
					description: 'should transliterate Hindi to Urdu with lang_code',
					src: 'hi',
					tgt: 'ur',
					txt: 'धर्म भारत की ',
					expected: 'دھَرْمَ بھَارَتَ کِی '
				},
				{
					description: 'should transliterate Hindi to Punjabi with lang_code',
					src: 'hi',
					tgt: 'pa',
					txt: 'धर्म भारत की ',
					expected: 'دھَرْمَ بھَارَتَ کِی '
				},
				{
					description: 'should transliterate Latin HK to Punjabi Gurmukhi with lang_code',
					src: 'la-hK',
					tgt: 'pa-guru',
					txt: 'namo buddhAya',
					expected: 'ਨਮੋ ਬੁੱਧਾਯ'
				},
				{
					description: 'should transliterate Hindi Devanagari to Hindi Kaithi with lang_code',
					src: 'hi-Deva',
					tgt: 'hi-kthi',
					txt: 'धर्म भारत की ',
					expected: '𑂡𑂩𑂹𑂧⸱𑂦𑂰𑂩𑂞⸱𑂍𑂲⸱'
				},
				{
					description: 'should transliterate Hindi Devanagari to Makasar with lang_code',
					src: 'hi-Deva',
					tgt: 'mak',
					txt: 'धर्म भारत की ',
					expected: '𑻧𑻭𑻥 𑻤𑻭𑻦 𑻠𑻳 '
				},
				{
					description: 'should transliterate Sanskrit Devanagari to Russian with lang_code',
					src: 'sa-Deva',
					tgt: 'ru',
					txt: 'धर्म भारत की ',
					expected: 'дхарма бха̄рата кӣ '
				}
			];

			it.each(langCodeTests)(
				'$description',
				({ src, tgt, txt, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: true,
						param: ProcessParams.langCode,
						preOptions: [],
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});

		describe('Tests with lang_name parameter', () => {
			const langNameTests = [
				{
					description: 'should transliterate Sanskrit to Telugu with lang_name',
					src: 'sanskrit',
					tgt: 'telugu',
					txt: 'धर्म भारत की ',
					expected: 'ధర్మ భారత కీ '
				},
				{
					description: 'should transliterate Hindi to Kannada with lang_name',
					src: 'hindi',
					tgt: 'kannada',
					txt: 'धर्म भारत की ',
					expected: 'ಧರ್ಮ ಭಾರತ ಕೀ '
				},
				{
					description: 'should transliterate English to Bengali with lang_name',
					src: 'english',
					tgt: 'bengali',
					txt: 'namaste',
					expected: 'নমস্তে'
				},
				{
					description: 'should transliterate Bengali to Telugu with lang_name',
					src: 'bengali',
					tgt: 'telugu',
					txt: 'নমস্তে',
					expected: 'నమస్తే'
				}
			];

			it.each(langNameTests)(
				'$description',
				({ src, tgt, txt, expected }) => {
					const result = instance.process(src, tgt, txt, {
						nativize: true,
						param: ProcessParams.langName,
						preOptions: [],
						postOptions: []
					});
					expect(result).toBe(expected);
				}
			);
		});
	});

	describe('Auto-detection', () => {
		let instance: Aksharamukha;

		beforeAll(async () => {
			Aksharamukha._isTestEnv = true;
			instance = await Aksharamukha.new();
		});

		afterAll(() => {
			Aksharamukha._isTestEnv = false;
		});

		describe('Basic auto-detection tests', () => {
			const autoDetectTests = [
				{
					description: 'should auto-detect Harvard-Kyoto',
					txt: 'hello',
					expected: 'HK'
				},
				{
					description: 'should auto-detect Devanagari',
					txt: 'नमस्कार',
					expected: 'Devanagari'
				},
				{
					description: 'should auto-detect Devanagari',
					txt: 'дхарма бха̄рата кӣ',
					expected: 'RussianCyrillic'
				},
				{
					description: 'should auto-detect Arabic',
					txt: 'وَنَکَّمْ',
					expected: 'Arab'
				}
			];

			it.each(autoDetectTests)(
				'$description',
				({ txt, expected }) => {
					const result = instance.autoDetect(txt, false);
					expect(result).toBe(expected);
				}
			);
		});
	});
});