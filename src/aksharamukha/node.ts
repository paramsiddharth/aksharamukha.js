import { wheels } from '../constants';
import { createAksharamukha, type WheelInstallerArgs } from './core';

const installWheelsInNode = async ({ pyodide, micropip }: WheelInstallerArgs) => {
	const fs = await import('fs');

	for (const wheel of wheels) {
		const currentDir = getCurrentDir();
		let wheelData;

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
		(pyodide.FS as unknown as { unlink: (path: string) => void }).unlink(`/tmp/${wheel}`);
	}
};

const Aksharamukha = createAksharamukha(installWheelsInNode);

export default Aksharamukha;
export * from './core';

function getCurrentDir(): string {
	try {
		return __dirname;
	} catch {
		return import.meta.dirname;
	}
}