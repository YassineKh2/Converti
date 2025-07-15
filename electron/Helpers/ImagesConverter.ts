import sharp from "sharp";
import path from "node:path";
import { readFile, writeFile } from 'node:fs/promises';
import * as potrace from 'potrace';

function sanitizeFileName(name: string): string {
    return name.replace(/[:\\/*?"<>|]/g, "_");
}

// Base converter with format-specific logic
async function convertImage(
    DefaultPath: string,
    ImagePath: string,
    ImageName: string,
    format: "jpeg" | "png" | "webp" | "avif" | "gif",
    extension: string
): Promise<string> {
    const safeName = sanitizeFileName(ImageName);
    const finalPath = path.join(DefaultPath, `${safeName}.${extension}`);
    const instance = sharp(ImagePath);

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
                throw new Error(`Unsupported format: ${format}`);
        }
        return finalPath;
    } finally {
        instance.destroy();
    }
}

// Format-specific wrappers for convenience
export async function ToJPEG(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "jpeg", "jpeg");
}

export async function ToJPG(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "jpeg", "jpg");
}

export async function ToPNG(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "png", "png");
}

export async function ToWEBP(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "webp", "webp");
}

export async function ToAVIF(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "avif", "avif");
}

export async function ToGIF(DefaultPath: string, ImagePath: string, ImageName: string) {
    return convertImage(DefaultPath, ImagePath, ImageName, "gif", "gif");
}

export async function ToSVG(DefaultPath: string, ImagePath: string, ImageName: string) {
    potrace.trace(ImagePath, function(err, svg) {
        if (err) throw err;
        const safeName = sanitizeFileName(ImageName);
        const finalPath = path.join(DefaultPath, `${safeName}.svg`);
        return writeFile(finalPath,svg)
    });
}