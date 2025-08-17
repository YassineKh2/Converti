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
import { GetLogger } from "../Helpers/GetLogger";

import { UploadedFile as UploadedFileType } from "@/type/UploadedFile";
import { ConvertStatus } from "@/type/ConvertStatus";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tmpDir = path.join(app.getPath("userData"), "temp_files");
const logDir = path.join(app.getPath("userData"), "Logs");

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
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
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
  const LogFile = new Date().toDateString() + ".log";

  const finalPath = path.join(logDir, LogFile);
  const logger = GetLogger(finalPath);

  logger.info(`Converting file : ${uploadedFile.name}`);

  let Status: ConvertStatus;

  switch (selectedFormat.toUpperCase()) {
    case "JPG":
      Status = await ToJPG(tmpDir, FilePath, FileName);
      break;
    case "JPEG":
      Status = await ToJPEG(tmpDir, FilePath, FileName);
      break;
    case "PNG":
      Status = await ToPNG(tmpDir, FilePath, FileName);
      break;
    case "WEBP":
      Status = await ToWEBP(tmpDir, FilePath, FileName);
      break;
    case "GIF":
      Status = await ToGIF(tmpDir, FilePath, FileName);
      break;
    case "AVIF":
      Status = await ToAVIF(tmpDir, FilePath, FileName);
      break;
    case "SVG":
      Status = await ToSVG(tmpDir, FilePath, FileName);
      break;
    case "BMP":
      Status = await ToBMP(tmpDir, FilePath, FileName);
      break;
    case "TIFF":
      Status = await ToTIFF(tmpDir, FilePath, FileName);
      break;
    case "ICO":
      Status = await ToICO(tmpDir, FilePath, FileName);
      break;

    // Video formats
    case "MP4":
      Status = await ToMP4(tmpDir, FilePath, FileName);
      break;
    case "AVI":
      Status = await ToAVI(tmpDir, FilePath, FileName);
      break;
    case "MOV":
      Status = await ToMOV(tmpDir, FilePath, FileName);
      break;
    case "WMV":
      Status = await ToWMV(tmpDir, FilePath, FileName);
      break;
    case "FLV":
      Status = await ToFLV(tmpDir, FilePath, FileName);
      break;
    case "MKV":
      Status = await ToMKV(tmpDir, FilePath, FileName);
      break;
    case "WEBM":
      Status = await ToWEBM(tmpDir, FilePath, FileName);
      break;
    case "M4V":
      Status = await ToM4V(tmpDir, FilePath, FileName);
      break;

    // Audio formats
    case "MP3":
      Status = await ToMP3(tmpDir, FilePath, FileName);
      break;
    case "WAV":
      Status = await ToWAV(tmpDir, FilePath, FileName);
      break;
    case "FLAC":
      Status = await ToFLAC(tmpDir, FilePath, FileName);
      break;
    case "AAC":
      Status = await ToAAC(tmpDir, FilePath, FileName);
      break;
    case "OGG":
      Status = await ToOGG(tmpDir, FilePath, FileName);
      break;
    case "M4A":
      Status = await ToM4A(tmpDir, FilePath, FileName);
      break;
    case "WMA":
      Status = await ToWMA(tmpDir, FilePath, FileName);
      break;

    // Document formats
    case "PDF":
      Status = await ToPDF(tmpDir, FilePath, FileName);
      break;
    case "DOCX":
      Status = await ToDOCX(tmpDir, FilePath, FileName);
      break;
    case "TXT":
      Status = await ToTXT(tmpDir, FilePath, FileName);
      break;
    case "RTF":
      Status = await ToRTF(tmpDir, FilePath, FileName);
      break;
    case "ODT":
      Status = await ToODT(tmpDir, FilePath, FileName);
      break;
    case "HTML":
      Status = await ToHTML(tmpDir, FilePath, FileName);
      break;
    case "EPUB":
      Status = await ToEPUB(tmpDir, FilePath, FileName);
      break;

    // Archive formats
    case "ZIP":
      Status = await ToZIP(tmpDir, FilePath, FileName, Extension);
      break;
    case "RAR":
      Status = await ToRAR(tmpDir, FilePath, FileName, Extension);
      break;
    case "7Z":
      Status = await To7Z(tmpDir, FilePath, FileName, Extension);
      break;
    case "TAR":
      Status = await ToTAR(tmpDir, FilePath, FileName, Extension);
      break;
    case "GZ":
      Status = await ToGZ(tmpDir, FilePath, FileName, Extension);
      break;
    case "BZ2":
      Status = await ToBZ2(tmpDir, FilePath, FileName, Extension);
      break;

    // Other formats
    case "JSON":
    case "CSV":
    case "XML":
      break;
  }

  if (Status.status === "completed") {
    logger.info(Status.Logs.join(" "));
    logger.info("Placed File in " + Status.path);
  } else {
    logger.error(Status.Logs.join(" "));
  }

  logger.info("End at :" + new Date().toISOString());
  logger.info("-----------------------------------\n");

  return Status;
});

ipcMain.handle("saveFile", async (_, arg) => {
  const { path, name }: { path: string; name: string } = arg;

  return await SaveFileToTemp(tmpDir, path, name);
});
