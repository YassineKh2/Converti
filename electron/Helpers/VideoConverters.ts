import path from "node:path";

import { SanitizeFileName } from "./SanitizeFileName";
import { getFFMPEG } from "./GetFFMPEG";

import { ConvertStatus } from "@/type/ConvertStatus";

function HandleStart() {
  console.log("Started Conversion !");
}

function SendProgress(progress) {
  console.log(progress.percent);
}

function HandleFinish() {
  console.log("Finished !");
}

function HandleError(err) {
  console.log("Error !", err.message);
}

async function convertImage(
  outDir: string,
  inputPath: string,
  outputName: string,
  format: "mp4" | "avi" | "mov" | "wmv" | "flv" | "mkv" | "webm" | "m4v",
  extension: string,
): Promise<ConvertStatus> {
  const safeName = SanitizeFileName(outputName);
  const finalPath = path.join(outDir, `${safeName}.${extension}`);

  const ffmpeg = getFFMPEG();

  let Status: ConvertStatus = {
    status: "completed",
    Logs: ["Finished !"],
    progress: 0,
  };

  ffmpeg(inputPath)
    .output(finalPath)
    .on("start", HandleStart)
    .on("progress", SendProgress)
    .on("end", HandleFinish)
    .on("error", HandleError)
    .run();

  return Status;
}

export async function ToMP4(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "mp4", "mp4");
}

export async function ToAVI(outDir: string, inPath: string, name: string) {
  await convertImage(outDir, inPath, name, "avi", "avi");
}

export async function ToMOV(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "mov", "mov");
}

export async function ToWMV(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "wmv", "wmv");
}

export async function ToFLV(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "flv", "flv");
}

export async function ToMKV(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "mkv", "mkv");
}

export async function ToWEBM(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "webm", "webm");
}

export async function ToM4V(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "m4v", "m4v");
}
