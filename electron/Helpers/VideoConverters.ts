import path from "node:path";

import { SanitizeFileName } from "./SanitizeFileName";
import { getFFMPEG } from "./GetFFMPEG";

import { ConvertStatus } from "@/type/ConvertStatus";

function SendProgress(progress) {
  console.log("Video Progress : " + progress?.percent);
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

export async function ToMP4(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "mp4", "mp4");
}

export async function ToAVI(outDir: string, inPath: string, name: string) {
  return await convertImage(outDir, inPath, name, "avi", "avi");
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
