import path from 'node:path';
import {app} from 'electron';

export function getPANDOC() {
    const platform = process.platform;
    const isDev = !app.isPackaged;
    const baseDir = isDev ? process.cwd() : process.resourcesPath;

    const pandocBinary = platform === 'win32' ? 'pandoc.exe' : 'pandoc';
    return path.join(baseDir, 'assets', 'bin', platform, pandocBinary);
}
