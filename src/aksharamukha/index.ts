import { wheelBaseURL, wheels } from '../constants';
import { createAksharamukha } from './core';

const installWheelsInBrowser = async ({ micropip, currentScript }: {
	micropip: {
		install: (packages: string[], options?: { keep_going?: boolean }) => Promise<void>;
	};
	currentScript?: HTMLScriptElement;
}) => {
	try {
		const scriptPath = currentScript?.src;
		if (!scriptPath) {
			throw new Error('Current script is unavailable.');
		}
		const parentPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
		await micropip.install(wheels.map(wheel => `${parentPath}/${wheel}`), { keep_going: true });
	} catch {
		await micropip.install(wheels.map(wheel => `${wheelBaseURL}/${wheel}`), { keep_going: true });
	}
};

const Aksharamukha = createAksharamukha(installWheelsInBrowser);

export default Aksharamukha;
export * from './core';