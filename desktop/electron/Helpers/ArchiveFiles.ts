import { spawn } from "node:child_process";
import path from "node:path";

import { get7ZIP } from "./Get7ZIP";
import { SanitizeFileName } from "./SanitizeFileName";

import { ConvertStatus } from "@/type/ConvertStatus";

function run7zCommand(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const sevenZipPath = get7ZIP();
    const process = spawn(sevenZipPath, args);

    process.on("error", reject);
    process.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`7z process failed with exit code ${code}`));
    });
  });
}

async function ArchiveFile(
  outDir: string,
  inPath: string,
  name: string,
  format: "7z" | "zip" | "tar" | "rar" | "gz" | "bz2",
): Promise<ConvertStatus> {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.${format}`);

  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    await run7zCommand(["a", finalPath, inPath]);
  } catch (error: any) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = ["Error during 7z compression:", error.message];

    return Status;
  }

  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(`Successfully archived "${name}"`);

  return Status;
}

export async function Make7ZArchive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "7z");
}

export async function MakeZIPArchive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "zip");
}

export async function MakeTARArchive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "tar");
}

export async function MakeRARArchive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "rar");
}

export async function MakeGZArchive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "gz");
}

export async function MakeBZ2Archive(
  outDir: string,
  inPath: string,
  name: string,
) {
  return await ArchiveFile(outDir, inPath, name, "bz2");
}
