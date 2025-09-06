import fs from "node:fs";
import path from "node:path";

export async function SaveFileToTemp(
  TempFolderPath: string,
  FilePath: string,
  FileName: string,
) {
  const finalPath = path.join(TempFolderPath, FileName);
  fs.copyFile(FilePath, finalPath, (err) => {
    if (err) {
      console.error("Error copying file:", err);
      return;
    }
  });
  return FilePath;
}
