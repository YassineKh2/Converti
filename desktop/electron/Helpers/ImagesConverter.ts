import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

import sharp from "sharp";
import * as potrace from "potrace";
import * as bmp from "sharp-bmp";
import * as ico from "sharp-ico";
import { Jimp } from "jimp";

import { SanitizeFileName } from "./SanitizeFileName";

import { ConvertStatus } from "@/type/ConvertStatus";

// Makes sure we can read the bmp images so that the converters can treat them
async function loadSharpInstance(filePath: string): Promise<sharp.Sharp> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".bmp") {
    const buffer = await readFile(filePath);
    const bitmap = bmp.decode(buffer);

    return sharp(bitmap.data, {
      raw: {
        width: bitmap.width,
        height: bitmap.height,
        channels: 4,
      },
    });
  }

  return sharp(filePath);
}

async function convertImage(
  outDir: string,
  inputPath: string,
  outputName: string,
  format: "jpeg" | "png" | "webp" | "avif" | "gif",
  extension: string,
): Promise<ConvertStatus> {
  const safeName = SanitizeFileName(outputName);
  const finalPath = path.join(outDir, `${safeName}.${extension}`);

  const instance = await loadSharpInstance(inputPath);

  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    switch (format) {
      case "jpeg":
        await instance.jpeg({ mozjpeg: true }).toFile(finalPath);
        break;
      case "png":
        await instance.png().toFile(finalPath);
        break;
      case "webp":
        await instance.webp().toFile(finalPath);
        break;
      case "avif":
        await instance.avif().toFile(finalPath);
        break;
      case "gif":
        await instance.gif().toFile(finalPath);
        break;
      default:
        Status.progress = 0;
        Status.status = "error";
        Status.Logs = [`Unsupported format: ${format} or file is corrupted`];

        return Status;
    }
  } catch (e) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = [`Error : ${e.message}`];

    return Status;
  } finally {
    instance.destroy();
  }

  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(
    `Converted from ${extension.toUpperCase()} to ${format.toUpperCase()}!`,
  );

  return Status;
}

export const ToJPEG = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "jpeg", "jpeg");

export const ToJPG = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "jpeg", "jpg");

export const ToPNG = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "png", "png");

export const ToWEBP = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "webp", "webp");

export const ToAVIF = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "avif", "avif");

export const ToGIF = (out: string, inPath: string, name: string) =>
  convertImage(out, inPath, name, "gif", "gif");

export async function ToSVG(outDir: string, inPath: string, name: string) {
  const safeName = SanitizeFileName(name);
  const Extension = path.extname(inPath);

  const finalPath = path.join(outDir, `${safeName}.svg`);
  const svg = await new Promise<string>((res, rej) =>
    potrace.trace(inPath, (err, svg) => (err ? rej(err) : res(svg))),
  );
  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    await writeFile(finalPath, svg);
  } catch (e) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = [`Error: ${e.message}`];

    return Status;
  }

  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(`Converted from ${Extension.toUpperCase()} to SVG!`);

  return Status;
}

export async function ToBMP(outDir: string, inPath: string, name: string) {
  const image = await loadSharpInstance(inPath);
  const safeName = SanitizeFileName(name);
  const Extension = path.extname(inPath);

  const finalPath = path.join(outDir, `${safeName}.bmp`);
  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    await bmp.sharpToBmp(image, finalPath);
  } catch (e) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = [`Error: ${e.message}`];

    return Status;
  }
  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(`Converted from ${Extension.toUpperCase()} to BMP!`);

  return Status;
}

export async function ToTIFF(outDir: string, inPath: string, name: string) {
  const image = await Jimp.read(inPath);
  const Extension = path.extname(inPath);
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.tiff`);
  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    await image.write(finalPath as never, undefined);
  } catch (e) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = [`Error: ${e.message}`];

    return Status;
  }
  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(`Converted from ${Extension.toUpperCase()} to TIFF!`);

  return Status;
}

export async function ToICO(outDir: string, inPath: string, name: string) {
  const image = await loadSharpInstance(inPath);
  const safeName = SanitizeFileName(name);
  const Extension = path.extname(name);
  const finalPath = path.join(outDir, `${safeName}.ico`);
  let Status: ConvertStatus = {
    status: "pending",
    Logs: [],
    progress: 0,
  };

  try {
    await ico.sharpsToIco([image], finalPath);
  } catch (e) {
    Status.progress = 0;
    Status.status = "error";
    Status.Logs = [`Error: `, e];

    return Status;
  }
  Status.progress = 100;
  Status.status = "completed";
  Status.Logs.push("Finished !");
  Status.Logs.push(`Converted from ${Extension.toUpperCase()} to ICO!`);

  return Status;
}
