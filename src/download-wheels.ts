import axios from 'axios';
import fs from 'fs-extra';
import { wheelBaseURL, wheels } from './constants';

async function downloadWheels() {
    // Ensure downloads directory exists
    await fs.ensureDir('./downloads');

    // Download all wheels in parallel
    await Promise.all(
        wheels.map(async (wheel) => {
            const filePath = `./downloads/${wheel}`;

            // Skip download if file already exists
            if (await fs.pathExists(filePath)) {
                console.log(`${wheel} already exists. Skipping download.`);
                return;
            }

            const url = `${wheelBaseURL}/${wheel}`;
            console.log(`Downloading ${wheel} from ${url}...`);

            try {
                const resp = await axios.get(url, { responseType: 'stream' });
                const writer = fs.createWriteStream(filePath);

                resp.data.pipe(writer);

                await new Promise<void>((resolve, reject) => {
                    writer.on('finish', () => resolve());
                    writer.on('error', (err) => reject(err));
                });

                console.log(`Downloaded ${wheel} to ${filePath}.`);
            } catch (e) {
                console.error(`Failed to download ${wheel}:`, e);
                process.exit(1);
            }
        })
    );

    console.log('All wheels downloaded successfully.');
}

// Run the download function
downloadWheels().catch((err) => {
    console.error('Unexpected error during wheel download:', err);
    process.exit(1);
});
