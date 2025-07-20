import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { SanitizeFileName } from './SanitizeFileName';
import {get7ZIP} from "./Get7ZIP";

function run7zCommand(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const sevenZipPath = get7ZIP();
        const process = spawn(sevenZipPath, args);

        process.on('error', reject);
        process.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`7z process failed with exit code ${code}`));
        });
    });
}

export async function To7Z(outDir: string, inPath: string, name: string) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.7z`);
    const tempFolder = path.join(outDir, 'TempFolder');

    fs.mkdirSync(tempFolder, { recursive: true });

    try {
        await run7zCommand(['x', inPath, `-o${tempFolder}`]);

        await run7zCommand(['a', finalPath, `${tempFolder}\\*`]);
    } catch (error) {
        console.error('Error during 7z compression:', error);
    } finally {
        fs.rmSync(tempFolder, { recursive: true, force: true });
    }
}