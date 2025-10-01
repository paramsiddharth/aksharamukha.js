import { loadPyodide, type PyodideInterface } from 'pyodide';
import fs from 'fs';

import { wheels } from '../constants';

type processProps = {
	src: string,
	tgt: string,
	txt: string,
	props: transliterateProps
};

type transliterateProps = {
	nativize: boolean;
	param: transliterateParam;
	preOptions: string[];
	postOptions: string[];
};

export const enum transliterateParam {
	default = 'default',
	scriptCode = 'script_code',
	langCode = 'lang_code',
	langName = 'lang_name'
}

export default class Aksharamukha {
	static _isTestEnv: boolean = false;
	pyodide: PyodideInterface;

	private constructor(pyodide: PyodideInterface) {
		this.pyodide = pyodide;
	}

	public static async new(): Promise<Aksharamukha> {
		var pyodide: PyodideInterface;
		if (this._isTestEnv) {
			pyodide = await loadTestPyodide();
		} else {
			pyodide = await loadPyodide();
		}

		await pyodide.loadPackage('micropip');
		const micropip = pyodide.pyimport('micropip');

		for (const wheel of wheels) {
			const wheelPath = `${__dirname}/../../downloads/${wheel}`;
			const wheelData = fs.readFileSync(wheelPath);
			pyodide.FS.writeFile(`/tmp/${wheel}`, wheelData);
			await micropip.install(`emfs:/tmp/${wheel}`, { keep_going: true });
			pyodide.FS.unlink(`/tmp/${wheel}`);
		}

		pyodide.runPython(`from aksharamukha import *`); // Pre-import to speed up further calls
		return new Aksharamukha(pyodide);
	}

	public async test() {
		const result = await this.pyodide.runPythonAsync(`1 + 1`);
		if (result !== 2) {
			throw new Error('Pyodide not functioning correctly.');
		}
	}

	public transliterate(
		src: string,
		tgt: string,
		txt: string,
		{
			nativize = true,
			param = transliterateParam.default,
			preOptions = [],
			postOptions = []
		}: transliterateProps
	) {
		const cmd = buildCMD({
			src,
			tgt,
			txt,
			props: {
				nativize,
				param,
				preOptions,
				postOptions
			}
		});
		return this.pyodide.runPython(cmd);
	}

	public async transliterateAsync(
		src: string,
		tgt: string,
		txt: string,
		{
			nativize = true,
			param = transliterateParam.default,
			preOptions = [],
			postOptions = []
		}: transliterateProps
	) {
		const cmd = buildCMD({
			src,
			tgt,
			txt,
			props: {
				nativize,
				param,
				preOptions,
				postOptions
			}
		});
		return await this.pyodide.runPythonAsync(cmd);
	}
}

async function loadTestPyodide(): Promise<PyodideInterface> {
	return await loadPyodide({
		indexURL: './node_modules/pyodide',
		packageCacheDir: './node_modules/pyodide'
	})
}

function buildCMD(props: processProps) {
	return 	`
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