import { loadPyodide, type PyodideInterface } from 'pyodide';

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

		return new Aksharamukha(pyodide);
	}

	public async test() {
		const result = await this.pyodide.runPythonAsync(`1 + 1`);
		if (result !== 2) {
			throw new Error('Pyodide not functioning correctly.');
		}
	}
}

async function loadTestPyodide(): Promise<PyodideInterface> {
	return await loadPyodide({
		indexURL: './node_modules/pyodide',
		packageCacheDir: './node_modules/pyodide'
	})
}