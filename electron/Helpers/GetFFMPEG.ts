import path from "node:path";

import { app } from "electron";
import ffmpeg from "fluent-ffmpeg";

export function getFFMPEG() {
  const platform = process.platform;
  const isDev = !app.isPackaged;

  // Use process.cwd() as base dir in dev, resourcesPath in prod
  const baseDir = isDev ? process.cwd() : process.resourcesPath;

  const ffmpegBinary = platform === "win32" ? "ffmpeg.exe" : "ffmpeg";

  const ffmpegPath = path.join(
    baseDir,
    "assets",
    "bin",
    platform,
    ffmpegBinary,
  );

  ffmpeg.setFfmpegPath(ffmpegPath);

  return ffmpeg;
}
