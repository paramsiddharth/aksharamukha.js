import { type PyodideInterface } from 'pyodide';
import { aksharamukhaCDNIndexURL, wheels } from '../constants';
import { fixPostOptions, PostOption, PreOption, Script, Scripts } from '../enums';

const isNode =
	typeof globalThis !== 'undefined' &&
	typeof (globalThis as { process?: unknown }).process === 'object' &&
	typeof (globalThis as { process?: { versions?: { node?: unknown } } }).process?.versions?.node === 'string';

export type ProcessArgs = {
	src: Script,
	tgt: Script,
	txt: string,
	props: ProcessProps
};

export type AutoDetectArgs = {
	txt: string,
	plugin: boolean
};

export type ProcessProps = {
	nativize: boolean;
	param: ProcessParam;
	preOptions: PreOption[];
	postOptions: PostOption[];
};

export const ProcessParams = {
	default: 'default',
	scriptCode: 'script_code',
	langCode: 'lang_code',
	langName: 'lang_name'
} as const;

export type ProcessParam = typeof ProcessParams[keyof typeof ProcessParams];

export const defaultProcessProps: ProcessProps = {
	nativize: true,
	param: ProcessParams.default,
	preOptions: [],
	postOptions: []
};

export type AksharamukhaInitOptions = {
	pyodide?: PyodideInterface;
};

export default class Aksharamukha {
	static _loadPyodideRef: typeof import('pyodide')['loadPyodide'] | undefined;
	static _currentScript: HTMLScriptElement;
	pyodide: PyodideInterface;

	static _isTestEnv: boolean = false;
	static _testLoadPyodide: typeof import('pyodide')['loadPyodide'];
	static _testFS: typeof import('fs');

	private constructor(pyodide: PyodideInterface) {
		this.pyodide = pyodide;
	}

	public static _setCurrentScript(script: HTMLScriptElement) {
		this._currentScript = script;
	}

	private static getCurrentScriptPath(): string {
		if (this._currentScript) {
			const scriptPath = this._currentScript.src;
			const parentPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
			return parentPath;
		}

		throw new Error('Could not determine script path for browser environment. Ensure that the script is properly included in the HTML with a src attribute.');
	}

	private static async getLoadPyodide() {
		if (this._loadPyodideRef == null) {
			const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<typeof import('pyodide')>;
			// const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<{ loadPyodide: typeof import('pyodide')['loadPyodide'] }>;

			let pyodideModule: typeof import('pyodide');
			if (isNode) {
				pyodideModule = await dynamicImport('pyodide');
			} else {
				try {
					const parentPath = this.getCurrentScriptPath();
					pyodideModule = await dynamicImport(`${parentPath}/pyodide.mjs`);
				} catch {
					pyodideModule = await dynamicImport(`${aksharamukhaCDNIndexURL}/pyodide.mjs`);
				}
			}
			this._loadPyodideRef = pyodideModule.loadPyodide;
		}

		return this._loadPyodideRef;
	}

	public static async new(opts?: AksharamukhaInitOptions): Promise<Aksharamukha> {
		let pyodide = opts?.pyodide;
		if (pyodide == null) {
			if (this._isTestEnv) {
				if (this._testLoadPyodide == null) {
					throw new Error('Test Pyodide instance not set. Please set Aksharamukha._testLoadPyodide before running tests.');
				}
				pyodide = await this._testLoadPyodide();
			} else {
				const loadPyodide = await this.getLoadPyodide();
				try {
					pyodide = await loadPyodide({ indexURL: this.getCurrentScriptPath() });
				} catch {
					try {
						pyodide = await loadPyodide();
					} catch {
						pyodide = await loadPyodide({ indexURL: aksharamukhaCDNIndexURL });
					}
				}
			}
		}

		const micropip = await ensureMicropip(pyodide);

		if (isNode) {
			let fs: typeof import('fs');
			if (this._isTestEnv) {
				if (this._testFS == null) {
					throw new Error('Test fs module not set. Please set Aksharamukha._testFS before running tests.');
				}
				fs = this._testFS;
			} else {
				// Keep import target non-literal so browser bundlers don't object to the import of "fs" in this Node-only block.
				fs = await (new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<typeof import('fs')>)('fs');
			}

			for (const wheel of wheels) {
				let wheelData: Buffer<ArrayBuffer>;
				const currentDir = getCurrentDir()

				try {
					const wheelPath = `${currentDir}/${wheel}`;
					wheelData = fs.readFileSync(wheelPath);
				} catch (e) {
					console.warn(`Wheel file missing in script directory, trying ../../downloads: ${e}`);
					const wheelPath = `${currentDir}/../../downloads/${wheel}`;
					wheelData = fs.readFileSync(wheelPath);
				}

				pyodide.FS.writeFile(`/tmp/${wheel}`, wheelData);
			}

			await micropip.install(wheels.map(wheel => `emfs:/tmp/${wheel}`), { keep_going: true });

			for (const wheel of wheels) {
				pyodide.FS.unlink(`/tmp/${wheel}`);
			}
		} else {
			try {
				const parentPath = this.getCurrentScriptPath();
				await micropip.install(wheels.map(wheel => `${parentPath}/${wheel}`), { keep_going: true })
			} catch {
				await micropip.install(wheels.map(wheel => `${aksharamukhaCDNIndexURL}/${wheel}`), { keep_going: true })
			}
		}

		// Pre-import to speed up further calls
		pyodide.runPython(`from aksharamukha import *`);
		const instance = new Aksharamukha(pyodide);

		// Pre-heat by doing the first process call
		instance.process(Scripts.AutoDetect, Scripts.Devanagari, 'praNAm');
		return instance;
	}

	public async test() {
		const result = await this.pyodide.runPythonAsync(`1 + 1`);
		if (result !== 2) {
			throw new Error('Pyodide not functioning correctly.');
		}
	}

	public process(
		src: Script,
		tgt: Script,
		txt: string,
		{
			nativize,
			param,
			preOptions,
			postOptions
		}: ProcessProps = defaultProcessProps
	): string {
		const cmd = buildProcessCMD({
			src,
			tgt,
			txt,
			props: {
				nativize: nativize ?? defaultProcessProps.nativize,
				param: param ?? defaultProcessProps.param,
				preOptions: preOptions ?? defaultProcessProps.preOptions,
				postOptions: postOptions ?? defaultProcessProps.postOptions
			}
		});
		return this.pyodide.runPython(cmd);
	}

	public async processAsync(
		src: Script,
		tgt: Script,
		txt: string,
		{
			nativize,
			param,
			preOptions,
			postOptions
		}: ProcessProps = defaultProcessProps
	): Promise<string> {
		const cmd = buildProcessCMD({
			src,
			tgt,
			txt,
			props: {
				nativize: nativize ?? defaultProcessProps.nativize,
				param: param ?? defaultProcessProps.param,
				preOptions: preOptions ?? defaultProcessProps.preOptions,
				postOptions: postOptions ?? defaultProcessProps.postOptions
			}
		});
		return await this.pyodide.runPythonAsync(cmd);
	}

	public autoDetect(
		txt: string,
		plugin: boolean = false
	): string {
		const cmd = buildAutoDetectCMD({ txt, plugin });
		return this.pyodide.runPython(cmd);
	}

	public autoDetectAsync(
		txt: string,
		plugin: boolean = false
	): Promise<string> {
		const cmd = buildAutoDetectCMD({ txt, plugin });
		return this.pyodide.runPythonAsync(cmd);
	}
}

async function ensureMicropip(pyodide: PyodideInterface) {
	await pyodide.loadPackage('micropip');
	try {
		await pyodide.runPythonAsync('import micropip');
		return pyodide.pyimport('micropip');
	} catch (error) {
		throw new Error(`Failed to initialize micropip in Pyodide. ${String(error)}`);
	}
}

function buildProcessCMD(props: ProcessArgs) {
	return `
		from aksharamukha import transliterate
		transliterate.process(
			${JSON.stringify(props.src)},
			${JSON.stringify(props.tgt)},
			${JSON.stringify(props.txt)},
			nativize=${props.props.nativize ? 'True' : 'False'},
			param=${JSON.stringify(props.props.param)},
			pre_options=${JSON.stringify(props.props.preOptions)},
			post_options=${JSON.stringify(fixPostOptions(props.props.postOptions))}
		)
	`
}

function buildAutoDetectCMD(props: AutoDetectArgs) {
	return `
		from aksharamukha import transliterate
		transliterate.auto_detect(
			${JSON.stringify(props.txt)},
			${props.plugin ? 'True' : 'False'}
		)
	`
}

function getCurrentDir(): string {
	if (!isNode) {
		throw new Error('getCurrentDir is only supported in Node.js environment.');
	}

	try {
		return __dirname;
	} catch {
		return import.meta.dirname;
	}
}