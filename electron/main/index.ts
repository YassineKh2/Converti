import {app, BrowserWindow, ipcMain, shell} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'
import {UploadedFile as UploadedFileType} from "@/type/UploadedFile";
import {SaveFileToTemp} from "../Helpers/SaveFile";
import {ToAVIF, ToBMP, ToGIF, ToICO, ToJPEG, ToJPG, ToPNG, ToSVG, ToTIFF, ToWEBP} from "../Helpers/ImagesConverter";
import {getFFMPEG} from "../Helpers/GetFFMPEG";
import { execFile } from 'child_process';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.join(app.getPath('userData'), 'temp_files');


// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload,
            contextIsolation: true,
            nodeIntegration: false,
        },
        height: 700,
        width: 900
    })

    if (VITE_DEV_SERVER_URL) { // #298
        win.loadURL(VITE_DEV_SERVER_URL)
        // Open devTool if the app is not packaged
        win.webContents.openDevTools()
    } else {
        win.loadFile(indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })

    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, {recursive: true});
    }
    win = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

// New window example arg: new windows url
ipcMain.handle('open-win32', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
    } else {
        childWindow.loadFile(indexHtml, {hash: arg})
    }
})


// Functions

ipcMain.handle('get-temp-folder', () => {
    return tmpDir;
});

ipcMain.on('receive', async (_, arg) => {
    const {uploadedFile, selectedFormat}: { uploadedFile: UploadedFileType; selectedFormat: string } = arg;
    const FilePath = await SaveFileToTemp(tmpDir, uploadedFile.path, uploadedFile.name)
    const lastDotIndex = uploadedFile.name.lastIndexOf('.');
    const FileName = uploadedFile.name.slice(0, lastDotIndex);

    switch (selectedFormat.toUpperCase()) {
        case "JPG":
            await ToJPG(tmpDir,FilePath,FileName)
            break;
        case "JPEG":
            await ToJPEG(tmpDir,FilePath,FileName)
            break;
        case "PNG":
            await ToPNG(tmpDir,FilePath,FileName)
            break;
        case "WEBP":
            await ToWEBP(tmpDir,FilePath,FileName)
            break;
        case "GIF":
            await ToGIF(tmpDir,FilePath,FileName)
            break;
        case "AVIF":
            await ToAVIF(tmpDir,FilePath,FileName)
            break;
        case "SVG":
            await ToSVG(tmpDir,FilePath,FileName)
            break;
        case "BMP":
            await ToBMP(tmpDir,FilePath,FileName)
            break;
        case "TIFF":
            await ToTIFF(tmpDir,FilePath,FileName)
            break;
        case "ICO":
            const response = await ToICO(tmpDir,FilePath,FileName)
            console.log(response)
            break;

        // Video formats
        case "MP4":
        case "AVI":
        case "MOV":
        case "WMV":
        case "FLV":
        case "MKV":
        case "WEBM":
        case "M4V":

        // Audio formats
        case "MP3":
        case "WAV":
        case "FLAC":
        case "AAC":
        case "OGG":
        case "M4A":
        case "WMA":

        // Document formats
        case "PDF":
        case "DOCX":
        case "TXT":  // Also in "other"
        case "RTF":
        case "ODT":
        case "HTML":
        case "EPUB":

        // Archive formats
        case "ZIP":
        case "RAR":
        case "7Z":
        case "TAR":
        case "GZ":
        case "BZ2":

        // Other formats
        case "JSON":
        case "CSV":
        case "XML":

    }
})

