import { loadPyodide, type PyodideInterface } from 'pyodide';
import { wheelBaseURL, wheels } from '../constants';

const isNode =
  typeof window === 'undefined' ||
  (typeof process !== 'undefined' && process.versions?.node);

export type ProcessArgs = {
  src: string;
  tgt: string;
  txt: string;
  props: ProcessProps;
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
  langName: 'lang_name',
} as const;

export type ProcessParam = typeof ProcessParams[keyof typeof ProcessParams];

export const defaultProcessProps: ProcessProps = {
  nativize: true,
  param: ProcessParams.default,
  preOptions: [],
  postOptions: [],
};

export type AksharamukhaInitOptions = {
  pyodide?: PyodideInterface;
};

export default class Aksharamukha {
  private pyodide: PyodideInterface;
  private static _isTestEnv = false;
  private static _currentScript: HTMLScriptElement | null = null;
  private static _packagesInstalled = false;

  private static _nextPyodidePromise: Promise<PyodideInterface> | null = null;

  private constructor(pyodide: PyodideInterface) {
    this.pyodide = pyodide;
  }

  public static _setCurrentScript(script: HTMLScriptElement): void {
    this._currentScript = script;
  }

  private static async loadPyodideInstance(): Promise<PyodideInterface> {
    let pyodide: PyodideInterface;
    if (this._isTestEnv) {
      pyodide = await loadTestPyodide();
    } else {
      pyodide = await loadPyodide();
    }

    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');

    if (isNode) {
      const fs = await import('fs');
      const currentDir = getCurrentDir();
      for (const wheel of wheels) {
        let wheelData: Buffer;
        try {
          wheelData = fs.readFileSync(`${currentDir}/${wheel}`);
        } catch {
          wheelData = fs.readFileSync(`${currentDir}/../../downloads/${wheel}`);
        }
        pyodide.FS.writeFile(`/tmp/${wheel}`, wheelData);
      }

      if (!this._packagesInstalled) {
        await micropip.install(
          wheels.map((wheel) => `emfs:/tmp/${wheel}`),
          { keep_going: true }
        );
        this._packagesInstalled = true;
      }

      for (const wheel of wheels) {
        pyodide.FS.unlink(`/tmp/${wheel}`);
      }
    } else {
      if (!this._packagesInstalled) {
        try {
          const scriptPath = this._currentScript?.src ?? '';
          const parentPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
          await micropip.install(
            wheels.map((wheel) => `${parentPath}/${wheel}`),
            { keep_going: true }
          );
        } catch {
          await micropip.install(
            wheels.map((wheel) => `${wheelBaseURL}/${wheel}`),
            { keep_going: true }
          );
        }
        this._packagesInstalled = true;
      }
    }

    await pyodide.runPython(
      `from aksharamukha import transliterate\n_process = transliterate.process`
    );
    await pyodide.runPythonAsync(`1 + 1`);
    return pyodide;
  }

  public static async new(
    opts?: AksharamukhaInitOptions
  ): Promise<Aksharamukha> {
    const pyodide = opts?.pyodide ?? (await this.getNextPyodideInstance());
    return new Aksharamukha(pyodide);
  }

  private static async getNextPyodideInstance(): Promise<PyodideInterface> {
    const instance = this._nextPyodidePromise ?? this.loadPyodideInstance();
    this._nextPyodidePromise = this.loadPyodideInstance();
    return instance;
  }

  public async test(): Promise<void> {
    const result = await this.pyodide.runPythonAsync(`1 + 1`);
    if (result !== 2) {
      throw new Error('Pyodide not functioning correctly.');
    }
  }

  public process(
    src: string,
    tgt: string,
    txt: string,
    props: ProcessProps = defaultProcessProps
  ) {
    const cmd = buildCMD({ src, tgt, txt, props });
    return this.pyodide.runPython(cmd);
  }

  public async processAsync(
    src: string,
    tgt: string,
    txt: string,
    props: ProcessProps = defaultProcessProps
  ) {
    const cmd = buildCMD({ src, tgt, txt, props });
    return await this.pyodide.runPythonAsync(cmd);
  }
}

async function loadTestPyodide(): Promise<PyodideInterface> {
  return await loadPyodide({
    indexURL: './node_modules/pyodide',
    packageCacheDir: './node_modules/pyodide',
  });
}

function buildCMD(props: ProcessArgs): string {
  return `
    _process(
      ${JSON.stringify(props.src)},
      ${JSON.stringify(props.tgt)},
      ${JSON.stringify(props.txt)},
      nativize=${props.props.nativize ? 'True' : 'False'},
      param=${JSON.stringify(props.props.param)},
      pre_options=${JSON.stringify(props.props.preOptions)},
      post_options=${JSON.stringify(props.props.postOptions)}
    )
  `;
}

function getCurrentDir(): string {
  if (!isNode) throw new Error('getCurrentDir is only supported in Node.js environment.');
  try {
    return __dirname;
  } catch {
    return import.meta?.dirname ?? '.';
  }
}
