import path from "node:path";

import { SanitizeFileName } from "./SanitizeFileName";
import { getFFMPEG } from "./GetFFMPEG";

import { ConvertStatus } from "@/type/ConvertStatus";

function SendProgress(progress) {
  console.log("Audio Progress : " + progress?.percent);
}
async function convertImage(
  outDir: string,
  inputPath: string,
  outputName: string,
  format: "mp3" | "wav" | "flac" | "aac" | "ogg" | "m4a" | "wma",
  extension: string,
): Promise<ConvertStatus> {
  const safeName = SanitizeFileName(outputName);
  const finalPath = path.join(outDir, `${safeName}.${extension}`);

  const ffmpeg = getFFMPEG();

  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(finalPath)
      .on("start", () => {
        Status.Logs.push("Started");
      })
      .on("progress", SendProgress)
      .on("end", () => {
        Status.progress = 100;
        Status.status = "completed";
        Status.Logs.push("Finished !");
        resolve(Status);
      })
      .on("error", (err) => {
        Status.progress = 0;
        Status.status = "error";
        Status.Logs = [
          err.name,
          err.message,
          err.cause as string,
          err.stack as string,
        ];
        resolve(Status);
      })
      .run();
  });
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
