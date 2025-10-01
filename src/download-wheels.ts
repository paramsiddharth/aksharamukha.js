import axios from 'axios';
import fs from 'fs-extra';

import { wheelBaseURL, wheels } from './constants';

fs.ensureDirSync('./downloads');
for (const wheel of wheels) {
	const url = `${wheelBaseURL}/${wheel}`;
	const options = { directory: './downloads', filename: wheel };
	console.log(`Downloading ${wheel}...`);
	try {
		await new Promise((resolve, reject) => {
			axios.get(url, { responseType: 'stream' }).then((resp) => {
				const downloadStream = fs.createWriteStream(`./downloads/${options.filename}`);
				resp.data.pipe(downloadStream);

				downloadStream.on('error', (error: unknown) => reject(error));
				downloadStream.on('finish', () => resolve(null));
			}).catch((err) => reject(err));
		});
	} catch (e) {
		console.error(`Failed to download ${wheel}:`, e);
		process.exit(1);
	}
	console.log(`Downloaded ${wheel} to ${options.directory}/${options.filename}.`);
}