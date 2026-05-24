import type { PyodideInterface } from 'pyodide';
import { fixPostOptions, PostOption, PreOption, Script, Scripts } from '../enums';

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

export type WheelInstallerArgs = {
	pyodide: PyodideInterface;
	micropip: {
		install: (packages: string[], options?: { keep_going?: boolean }) => Promise<void>;
	};
	currentScript?: HTMLScriptElement;
};

export type WheelInstaller = (args: WheelInstallerArgs) => Promise<void>;

let loadPyodideRef: typeof import('pyodide')['loadPyodide'] | undefined;

async function getLoadPyodide() {
	if (loadPyodideRef == null) {
		// Keep import target non-literal so browser bundlers don't eagerly crawl pyodide's node:* branches.
		const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<typeof import('pyodide')>;
		const pyodideModule = await dynamicImport('pyodide');
		loadPyodideRef = pyodideModule.loadPyodide;
	}

	return loadPyodideRef;
}

export function createAksharamukha(installWheels: WheelInstaller) {
	return class Aksharamukha {
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
				const loadPyodide = await getLoadPyodide();
				if (this._isTestEnv) {
					pyodide = await loadTestPyodide();
				} else {
					pyodide = await loadPyodide();
				}
			}

			await pyodide.loadPackage('micropip');
			const micropip = pyodide.pyimport('micropip');
			await installWheels({
				pyodide,
				micropip,
				currentScript: this._currentScript
			});

			// Pre-import to speed up further calls
			pyodide.runPython('from aksharamukha import *');
			const instance = new Aksharamukha(pyodide);

			// Pre-heat by doing the first process call
			instance.process(Scripts.AutoDetect, Scripts.Devanagari, 'praNAm');
			return instance;
		}

		public async test() {
			const result = await this.pyodide.runPythonAsync('1 + 1');
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
	};
}

async function loadTestPyodide(): Promise<PyodideInterface> {
	const loadPyodide = await getLoadPyodide();
	return await loadPyodide({
		indexURL: './node_modules/pyodide',
		packageCacheDir: './node_modules/pyodide'
	});
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
	`;
}

function buildAutoDetectCMD(props: AutoDetectArgs) {
	return `
		from aksharamukha import transliterate
		transliterate.auto_detect(
			${JSON.stringify(props.txt)},
			${props.plugin ? 'True' : 'False'}
		)
	`;
}