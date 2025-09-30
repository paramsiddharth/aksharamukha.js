import { loadPyodide, type PyodideInterface } from 'pyodide';

export default class Aksharamukha {
	pyodide: PyodideInterface;

	private constructor(pyodide: PyodideInterface) {
		this.pyodide = pyodide;
	}

	public static async new(): Promise<Aksharamukha> {
		const pyodide = await loadPyodide();

		const result = await pyodide.runPythonAsync(`
			print('Hello!');
		`);
		
		if (result !== 'Hello!') {
			throw new Error('Failed to initialize Pyodide!');
		}

		return new Aksharamukha(pyodide);
	}
}