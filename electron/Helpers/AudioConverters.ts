import path from "node:path";

import { SanitizeFileName } from "./SanitizeFileName";
import { getFFMPEG } from "./GetFFMPEG";

async function convertImage(
  outDir: string,
  inputPath: string,
  outputName: string,
  format: "mp3" | "wav" | "flac" | "aac" | "ogg" | "m4a" | "wma",
  extension: string,
): Promise<string> {
  const safeName = SanitizeFileName(outputName);
  const finalPath = path.join(outDir, `${safeName}.${extension}`);

  const ffmpeg = getFFMPEG();

  ffmpeg(inputPath).output(finalPath).run();
}

export async function ToMP3(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "mp3", "mp3");
}

export async function ToWAV(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "wav", "wav");
}

export async function ToFLAC(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "flac", "flac");
}

export async function ToAAC(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "aac", "aac");
}

export async function ToOGG(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "ogg", "ogg");
}

export async function ToM4A(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "m4a", "m4a");
}

export async function ToWMA(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "wma", "wma");
}
