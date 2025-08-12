import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

import { app, BrowserWindow, ipcMain, shell } from "electron";

import { SaveFileToTemp } from "../Helpers/SaveFile";
import {
  ToAVIF,
  ToBMP,
  ToGIF,
  ToICO,
  ToJPEG,
  ToJPG,
  ToPNG,
  ToSVG,
  ToTIFF,
  ToWEBP,
} from "../Helpers/ImagesConverter";
import {
  ToAVI,
  ToFLV,
  ToM4V,
  ToMKV,
  ToMOV,
  ToMP4,
  ToWEBM,
  ToWMV,
} from "../Helpers/VideoConverters";
import {
  ToAAC,
  ToFLAC,
  ToM4A,
  ToMP3,
  ToOGG,
  ToWAV,
  ToWMA,
} from "../Helpers/AudioConverters";
import {
  To7Z,
  ToBZ2,
  ToGZ,
  ToRAR,
  ToTAR,
  ToZIP,
} from "../Helpers/ArchiveCoverters";
import {
  ToDOCX,
  ToEPUB,
  ToHTML,
  ToODT,
  ToPDF,
  ToRTF,
  ToTXT,
} from "../Helpers/DocumentConverter";

import { UploadedFile as UploadedFileType } from "@/type/UploadedFile";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tmpDir = path.join(app.getPath("userData"), "temp_files");

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
process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = path.join(__dirname, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
    },
    height: 700,
    width: 900,
  });

  if (VITE_DEV_SERVER_URL) {
    // #298
    win.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);

    return { action: "deny" };
  });

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();

  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win32", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

// Functions

ipcMain.handle("get-temp-folder", () => {
  return tmpDir;
});

ipcMain.handle("convert", async (_, arg) => {
  const { uploadedFile }: { uploadedFile: UploadedFileType } = arg;

  const { path: FilePath, selectedFormat } = uploadedFile;
  const lastDotIndex = uploadedFile.name.lastIndexOf(".");
  const FileName = uploadedFile.name.slice(0, lastDotIndex);
  const Extension = path.extname(uploadedFile.name);

  switch (selectedFormat.toUpperCase()) {
    case "JPG":
      return await ToJPG(tmpDir, FilePath, FileName);
    case "JPEG":
      return await ToJPEG(tmpDir, FilePath, FileName);
    case "PNG":
      return await ToPNG(tmpDir, FilePath, FileName);
    case "WEBP":
      return await ToWEBP(tmpDir, FilePath, FileName);
    case "GIF":
      return await ToGIF(tmpDir, FilePath, FileName);
    case "AVIF":
      return await ToAVIF(tmpDir, FilePath, FileName);
    case "SVG":
      return await ToSVG(tmpDir, FilePath, FileName);
    case "BMP":
      return await ToBMP(tmpDir, FilePath, FileName);
    case "TIFF":
      return await ToTIFF(tmpDir, FilePath, FileName);
    case "ICO":
      return await ToICO(tmpDir, FilePath, FileName);
    // Video formats
    case "MP4":
      return await ToMP4(tmpDir, FilePath, FileName);
    case "AVI":
      return await ToAVI(tmpDir, FilePath, FileName);
    case "MOV":
      return await ToMOV(tmpDir, FilePath, FileName);
    case "WMV":
      return await ToWMV(tmpDir, FilePath, FileName);
    case "FLV":
      return await ToFLV(tmpDir, FilePath, FileName);
    case "MKV":
      return await ToMKV(tmpDir, FilePath, FileName);
    case "WEBM":
      return await ToWEBM(tmpDir, FilePath, FileName);
    case "M4V":
      return await ToM4V(tmpDir, FilePath, FileName);
    // Audio formats
    case "MP3":
      return await ToMP3(tmpDir, FilePath, FileName);
    case "WAV":
      return await ToWAV(tmpDir, FilePath, FileName);
    case "FLAC":
      return await ToFLAC(tmpDir, FilePath, FileName);
    case "AAC":
      return await ToAAC(tmpDir, FilePath, FileName);
    case "OGG":
      return await ToOGG(tmpDir, FilePath, FileName);
    case "M4A":
      return await ToM4A(tmpDir, FilePath, FileName);
    case "WMA":
      return await ToWMA(tmpDir, FilePath, FileName);
    // Document formats
    case "PDF":
      return await ToPDF(tmpDir, FilePath, FileName);
    case "DOCX":
      return await ToDOCX(tmpDir, FilePath, FileName);
    case "TXT":
      return await ToTXT(tmpDir, FilePath, FileName);
    case "RTF":
      return await ToRTF(tmpDir, FilePath, FileName);
    case "ODT":
      return await ToODT(tmpDir, FilePath, FileName);
    case "HTML":
      return await ToHTML(tmpDir, FilePath, FileName);
    case "EPUB":
      return await ToEPUB(tmpDir, FilePath, FileName);
    // Archive formats
    case "ZIP":
      return await ToZIP(tmpDir, FilePath, FileName, Extension);
    case "RAR":
      return await ToRAR(tmpDir, FilePath, FileName, Extension);
    case "7Z":
      return await To7Z(tmpDir, FilePath, FileName, Extension);
    case "TAR":
      return await ToTAR(tmpDir, FilePath, FileName, Extension);
    case "GZ":
      return await ToGZ(tmpDir, FilePath, FileName, Extension);
    case "BZ2":
      return await ToBZ2(tmpDir, FilePath, FileName, Extension);
    // Other formats
    case "JSON":
    case "CSV":
    case "XML":
  }
});

ipcMain.handle("saveFile", async (_, arg) => {
  const { path, name }: { path: string; name: string } = arg;

  return await SaveFileToTemp(tmpDir, path, name);
});
