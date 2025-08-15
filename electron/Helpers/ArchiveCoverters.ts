import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

import * as unzipper from "unzipper";
import { app } from "electron";
import { createExtractorFromFile } from "node-unrar-js/esm";
import { UnrarError } from "node-unrar-js";

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

async function ExtractZIP(inPath: string, tempFolder: string) {
  const directory = await unzipper.Open.file(inPath);

  return await directory.extract({ path: tempFolder });
}

async function ExtractRAR(inPath: string, tempFolder: string) {
  const result = {
    status: "extracting",
    message: "",
  };

  try {
    const isDev = !app.isPackaged;
    const baseDir = isDev ? process.cwd() : process.resourcesPath;

    const wasmPath = path.join(
      baseDir,
      "node_modules/node-unrar-js/esm/js/unrar.wasm",
    );
    const wasmBinary = fs.readFileSync(wasmPath);

    const options = {
      wasmBinary: wasmBinary,
      filepath: inPath,
      targetPath: tempFolder,
    };
    //@ts-ignore
    const extractor = await createExtractorFromFile(options);

    const extracted = extractor.extract({}); // Extract all files

    const files = [...extracted.files];

    console.log(
      `Extraction complete. ${files.length} entries processed for archive: ${inPath}`,
    );

    for (const file of files) {
      console.log(`Processed: ${file.fileHeader.name}`);
    }

    console.log(`All files have been extracted to ${tempFolder}`);
    result.status = "completed";

    return result;
  } catch (error) {
    console.error("Error during extraction:", error);
    if (error instanceof UnrarError) {
      result.message = error.reason;
      result.status = "error";

      console.error(`Unrar-specific error: ${error.reason}`);

      return result;
    }
  }
}

async function ArchiveFile(
  outDir: string,
  inPath: string,
  name: string,
  format: "7z" | "zip" | "tar" | "rar" | "gz" | "bz2",
  extension: string,
): Promise<ConvertStatus> {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.${format}`);
  const tempFolder = path.join(outDir, "TempFolder" + name);

  fs.mkdirSync(tempFolder, { recursive: true });
  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    if (extension === ".zip") await ExtractZIP(inPath, tempFolder);
    else if (extension === ".rar") {
      const result = await ExtractRAR(inPath, tempFolder);

      if (result.status === "error") {
        Status.progress = 0;
        Status.status = "error";
        Status.Logs = ["Error during 7z compression:", result.message];
      }
    } else await run7zCommand(["x", inPath, `-o${tempFolder}`]);

    await run7zCommand(["a", finalPath, `${tempFolder}\\*`]);
  } catch (error) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = ["Error during 7z compression:", error.message];

    return Status;
  }

  fs.rmSync(tempFolder, { recursive: true, force: true });
  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(
    `Successfully converted from "${extension.toUpperCase()}" to "${format.toUpperCase()}"`,
  );

  return Status;
}

export async function To7Z(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "7z", extension);
}

export async function ToZIP(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "zip", extension);
}

export async function ToTAR(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "tar", extension);
}

export async function ToRAR(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "rar", extension);
}

export async function ToGZ(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "gz", extension);
}

export async function ToBZ2(
  outDir: string,
  inPath: string,
  name: string,
  extension: string,
) {
  return await ArchiveFile(outDir, inPath, name, "bz2", extension);
}
