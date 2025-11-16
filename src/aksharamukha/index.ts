import { loadPyodide, type PyodideInterface } from 'pyodide';
import { wheelBaseURL, wheels } from '../constants';

const isNode = typeof window === 'undefined' || (typeof process !== 'undefined' && process.versions?.node);

export type ProcessArgs = {
	src: string,
	tgt: string,
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
	preOptions: string[];
	postOptions: string[];
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
	static _isTestEnv: boolean = false;
	static _currentScript: HTMLScriptElement;
	pyodide: PyodideInterface;

	private constructor(pyodide: PyodideInterface) {
		this.pyodide = pyodide;
	}

	public static _setCurrentScript(script: HTMLScriptElement) {
		this._currentScript = script;
	}

	public static async new(opts?: AksharamukhaInitOptions): Promise<Aksharamukha> {
		let pyodide = opts?.pyodide;
		if (pyodide == null) {
			if (this._isTestEnv) {
				pyodide = await loadTestPyodide();
			} else {
				pyodide = await loadPyodide();
			}
		}

		await pyodide.loadPackage('micropip');
		const micropip = pyodide.pyimport('micropip');

		if (isNode) {
			const fs = await import('fs');

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
				const scriptPath = this._currentScript.src;
				const parentPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
				await micropip.install(wheels.map(wheel => `${parentPath}/${wheel}`), { keep_going: true })
			} catch {
				await micropip.install(wheels.map(wheel => `${wheelBaseURL}/${wheel}`), { keep_going: true })
			}
		}

		// Pre-import to speed up further calls
		pyodide.runPython(`from aksharamukha import *`);
		const instance = new Aksharamukha(pyodide);

		// Pre-heat by doing the first process call
		instance.process('autodetect', 'Devanagari', 'praNAm');
		return instance;
	}

	public async test() {
		const result = await this.pyodide.runPythonAsync(`1 + 1`);
		if (result !== 2) {
			throw new Error('Pyodide not functioning correctly.');
		}
	}

	public process(
		src: string,
		tgt: string,
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
		src: string,
		tgt: string,
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

async function loadTestPyodide(): Promise<PyodideInterface> {
	return await loadPyodide({
		indexURL: './node_modules/pyodide',
		packageCacheDir: './node_modules/pyodide'
	})
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
			post_options=${JSON.stringify(props.props.postOptions)}
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