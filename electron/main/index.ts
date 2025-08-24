import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

import { dialog } from "electron";
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
import { defaultSettings } from "../Helpers/getDefaultSettings";

import { UploadedFile as UploadedFileType } from "@/type/UploadedFile";
import { ConvertStatus } from "@/type/ConvertStatus";
import { AppSettings } from "@/type/AppSettings";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appData = app.getPath("userData");
const tmpDir = path.join(appData, "temp_files");
const logDir = path.join(appData, "Logs");
const settingsPath = path.join(appData, "settings.json");

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
    win.loadURL(VITE_DEV_SERVER_URL);
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

  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings));
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
  const {
    uploadedFile,
    nbFiles,
    SuccessfulConverts,
  }: {
    uploadedFile: UploadedFileType;
    nbFiles: number;
    SuccessfulConverts?: number;
  } = arg;

  const { path: FilePath, selectedFormat } = uploadedFile;
  const lastDotIndex = uploadedFile.name.lastIndexOf(".");
  let FileName = uploadedFile.name.slice(0, lastDotIndex);
  const Extension = path.extname(uploadedFile.name);
  let Status: ConvertStatus;

  const LogFile = new Date().toDateString() + ".log";
  const logFilePath = path.join(logDir, LogFile);
  const logger = GetLogger(logFilePath);

  logger.info(
    `Converting file ${uploadedFile.order} from ${nbFiles} file${nbFiles > 1 && "s"}`,
  );
  logger.info(`Converting file : ${uploadedFile.name}`);

  const settingsRaw = await readFile(settingsPath, "utf8");
  const settings: AppSettings = JSON.parse(settingsRaw);

  let OutPath = "";

  switch (settings.saveLocation) {
    case "original":
      OutPath = path.dirname(FilePath);
      break;

    case "custom":
      OutPath = settings.customSaveLocation;
      break;

    case "ask": {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        logger.error("User canceled file selection !");
        logger.info("End at :" + new Date().toISOString());
        logger.info("-----------------------------------\n");

        let Status: ConvertStatus = {
          progress: 0,
          status: "error",
          Logs: ["User canceled file selection !"],
        };

        return Status;
      }

      OutPath = result.filePaths[0];
      break;
    }

    case "askOnce": {
      console.log(nbFiles);
      console.log(uploadedFile.order);
      if (uploadedFile.OutPath) {
        OutPath = uploadedFile.OutPath;
        break;
      }
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        logger.error("User canceled file selection !");
        logger.info("End at :" + new Date().toISOString());
        logger.info("-----------------------------------\n");

        let Status: ConvertStatus = {
          progress: 0,
          status: "error",
          Logs: ["User canceled file selection !"],
        };

        return Status;
      }

      OutPath = result.filePaths[0];

      break;
    }
  }

  switch (settings.namingConvention) {
    case "prefix":
      FileName = settings.namingPrefix + FileName;
      break;
    case "suffix":
      FileName = FileName + settings.namingSuffix;
      break;
    case "both":
      FileName = settings.namingPrefix + FileName + settings.namingSuffix;
      break;
  }

  switch (selectedFormat.toUpperCase()) {
    case "JPG":
      Status = await ToJPG(OutPath, FilePath, FileName);
      break;
    case "JPEG":
      Status = await ToJPEG(OutPath, FilePath, FileName);
      break;
    case "PNG":
      Status = await ToPNG(OutPath, FilePath, FileName);
      break;
    case "WEBP":
      Status = await ToWEBP(OutPath, FilePath, FileName);
      break;
    case "GIF":
      Status = await ToGIF(OutPath, FilePath, FileName);
      break;
    case "AVIF":
      Status = await ToAVIF(OutPath, FilePath, FileName);
      break;
    case "SVG":
      Status = await ToSVG(OutPath, FilePath, FileName);
      break;
    case "BMP":
      Status = await ToBMP(OutPath, FilePath, FileName);
      break;
    case "TIFF":
      Status = await ToTIFF(OutPath, FilePath, FileName);
      break;
    case "ICO":
      Status = await ToICO(OutPath, FilePath, FileName);
      break;

    // Video formats
    case "MP4":
      Status = await ToMP4(OutPath, FilePath, FileName);
      break;
    case "AVI":
      Status = await ToAVI(OutPath, FilePath, FileName);
      break;
    case "MOV":
      Status = await ToMOV(OutPath, FilePath, FileName);
      break;
    case "WMV":
      Status = await ToWMV(OutPath, FilePath, FileName);
      break;
    case "FLV":
      Status = await ToFLV(OutPath, FilePath, FileName);
      break;
    case "MKV":
      Status = await ToMKV(OutPath, FilePath, FileName);
      break;
    case "WEBM":
      Status = await ToWEBM(OutPath, FilePath, FileName);
      break;
    case "M4V":
      Status = await ToM4V(OutPath, FilePath, FileName);
      break;

    // Audio formats
    case "MP3":
      Status = await ToMP3(OutPath, FilePath, FileName);
      break;
    case "WAV":
      Status = await ToWAV(OutPath, FilePath, FileName);
      break;
    case "FLAC":
      Status = await ToFLAC(OutPath, FilePath, FileName);
      break;
    case "AAC":
      Status = await ToAAC(OutPath, FilePath, FileName);
      break;
    case "OGG":
      Status = await ToOGG(OutPath, FilePath, FileName);
      break;
    case "M4A":
      Status = await ToM4A(OutPath, FilePath, FileName);
      break;
    case "WMA":
      Status = await ToWMA(OutPath, FilePath, FileName);
      break;

    // Document formats
    case "PDF":
      Status = await ToPDF(OutPath, FilePath, FileName);
      break;
    case "DOCX":
      Status = await ToDOCX(OutPath, FilePath, FileName);
      break;
    case "TXT":
      Status = await ToTXT(OutPath, FilePath, FileName);
      break;
    case "RTF":
      Status = await ToRTF(OutPath, FilePath, FileName);
      break;
    case "ODT":
      Status = await ToODT(OutPath, FilePath, FileName);
      break;
    case "HTML":
      Status = await ToHTML(OutPath, FilePath, FileName);
      break;
    case "EPUB":
      Status = await ToEPUB(OutPath, FilePath, FileName);
      break;

    // Archive formats
    case "ZIP":
      Status = await ToZIP(OutPath, FilePath, FileName, Extension);
      break;
    case "RAR":
      Status = await ToRAR(OutPath, FilePath, FileName, Extension);
      break;
    case "7Z":
      Status = await To7Z(OutPath, FilePath, FileName, Extension);
      break;
    case "TAR":
      Status = await ToTAR(OutPath, FilePath, FileName, Extension);
      break;
    case "GZ":
      Status = await ToGZ(OutPath, FilePath, FileName, Extension);
      break;
    case "BZ2":
      Status = await ToBZ2(OutPath, FilePath, FileName, Extension);
      break;

    // Other formats
    case "JSON":
    case "CSV":
    case "XML":
      break;
  }

  if (Status.status === "completed") {
    logger.info(Status.Logs.join(" "));
    logger.info("Placed File in " + OutPath);
  } else {
    logger.error(Status.Logs.join(" "));
  }

  logger.info("End at :" + new Date().toISOString());
  logger.info("-----------------------------------\n");

  Status.path = OutPath;

  if (!settings.autoOpenFolder) return Status;

  // For Multiple files
  if (uploadedFile.order === nbFiles && SuccessfulConverts > 0) {
    await shell.openPath(OutPath);
  }

  if (uploadedFile.status !== "completed") return Status;

  // For single files
  if (nbFiles === 1) {
    await shell.openPath(OutPath);
  }

  return Status;
});

ipcMain.handle("saveFile", async (_, arg) => {
  const { path, name }: { path: string; name: string } = arg;

  return await SaveFileToTemp(tmpDir, path, name);
});

ipcMain.handle("settings", async (_, arg) => {
  const settings: AppSettings = arg;

  if (!settings) {
    const settingsRaw = await readFile(settingsPath, "utf8");

    return JSON.parse(settingsRaw);
  }
  const response = {
    success: true,
    reason: "",
  };

  try {
    await writeFile(settingsPath, JSON.stringify(settings));
  } catch (e) {
    response.success = false;
    response.reason = e.message;

    return response;
  }

  return response;
});

ipcMain.handle("getFolderPath", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  } else {
    return null;
  }
});

ipcMain.handle("archive", async (_, arg) => {
  const {
    uploadedFile,
    nbFiles,
    SuccessfulArchives,
  }: {
    uploadedFile: UploadedFileType;
    nbFiles: number;
    SuccessfulArchives?: number;
  } = arg;

  const { path: FilePath, selectedFormat } = uploadedFile;
  const lastDotIndex = uploadedFile.name.lastIndexOf(".");
  let FileName = uploadedFile.name.slice(0, lastDotIndex);
  const Extension = path.extname(uploadedFile.name);
  let Status: ConvertStatus;

  const LogFile = new Date().toDateString() + ".log";
  const logFilePath = path.join(logDir, LogFile);
  const logger = GetLogger(logFilePath);

  logger.info(
    `Converting file ${uploadedFile.order} from ${nbFiles} file${nbFiles > 1 && "s"}`,
  );
  logger.info(`Converting file : ${uploadedFile.name}`);

  const settingsRaw = await readFile(settingsPath, "utf8");
  const settings: AppSettings = JSON.parse(settingsRaw);

  let OutPath = "";

  // TODO Change these to functions
  switch (settings.saveLocation) {
    case "original":
      OutPath = path.dirname(FilePath);
      break;

    case "custom":
      OutPath = settings.customSaveLocation;
      break;

    case "ask": {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        logger.error("User canceled file selection !");
        logger.info("End at :" + new Date().toISOString());
        logger.info("-----------------------------------\n");

        let Status: ConvertStatus = {
          progress: 0,
          status: "error",
          Logs: ["User canceled file selection !"],
        };

        return Status;
      }

      OutPath = result.filePaths[0];
      break;
    }

    case "askOnce": {
      if (uploadedFile.OutPath) {
        OutPath = uploadedFile.OutPath;
        break;
      }
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        logger.error("User canceled file selection !");
        logger.info("End at :" + new Date().toISOString());
        logger.info("-----------------------------------\n");

        let Status: ConvertStatus = {
          progress: 0,
          status: "error",
          Logs: ["User canceled file selection !"],
        };

        return Status;
      }

      OutPath = result.filePaths[0];

      break;
    }
  }

  switch (settings.namingConvention) {
    case "prefix":
      FileName = settings.namingPrefix + FileName;
      break;
    case "suffix":
      FileName = FileName + settings.namingSuffix;
      break;
    case "both":
      FileName = settings.namingPrefix + FileName + settings.namingSuffix;
      break;
  }

  switch (selectedFormat.toUpperCase()) {
    // Archive formats
    case "ZIP":
      Status = await ToZIP(OutPath, FilePath, FileName, Extension);
      break;
    case "RAR":
      Status = await ToRAR(OutPath, FilePath, FileName, Extension);
      break;
    case "7Z":
      Status = await To7Z(OutPath, FilePath, FileName, Extension);
      break;
    case "TAR":
      Status = await ToTAR(OutPath, FilePath, FileName, Extension);
      break;
    case "GZ":
      Status = await ToGZ(OutPath, FilePath, FileName, Extension);
      break;
    case "BZ2":
      Status = await ToBZ2(OutPath, FilePath, FileName, Extension);
      break;
  }

  if (Status.status === "completed") {
    logger.info(Status.Logs.join(" "));
    logger.info("Placed File in " + OutPath);
  } else {
    logger.error(Status.Logs.join(" "));
  }

  logger.info("End at :" + new Date().toISOString());
  logger.info("-----------------------------------\n");

  Status.path = OutPath;

  if (!settings.autoOpenFolder) return Status;

  // For Multiple files
  if (uploadedFile.order === nbFiles && SuccessfulArchives > 0) {
    await shell.openPath(OutPath);
  }

  if (uploadedFile.status !== "completed") return Status;

  // For single files
  if (nbFiles === 1) {
    await shell.openPath(OutPath);
  }

  return Status;
});
