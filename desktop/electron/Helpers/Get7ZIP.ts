import path from 'node:path';
import {app} from 'electron';

export function get7ZIP () {
    const platform = process.platform;
    const isDev = !app.isPackaged;

    const baseDir = isDev ? process.cwd() : process.resourcesPath;

    const sevenZipBinary = platform === 'win32' ? '7zip.exe' : '7zip';

    // Construct the full path
    return path.join(baseDir, 'assets', 'bin', platform, sevenZipBinary);
}
