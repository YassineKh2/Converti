import path from "node:path";
import { spawn } from "node:child_process";

import { SanitizeFileName } from "./SanitizeFileName";
import { getPANDOC } from "./GetPANDOC";

import { ConvertStatus } from "@/type/ConvertStatus";

async function convertFileWithPandoc(pandocPath: string, inPath: string, finalPath: string) {
  return new Promise<ConvertStatus>((resolve, reject) => {
    let stderrOutput = "";
    let Status: ConvertStatus = {
      status: "pending",
      Logs: [],
      progress: 0,
    };
    const inExt = path.extname(inPath).toUpperCase();
    const outExt = path.extname(finalPath).toUpperCase();

    const pandocProcess = spawn(pandocPath, [
      "-s",
      "--pdf-engine=wkhtmltopdf",
      inPath,
      "-o",
      finalPath,
    ]);

    pandocProcess.stderr.on("data", (data) => {
      stderrOutput += data.toString();
    });

    pandocProcess.on("close", (code) => {
      if (code === 0) {
        Status.progress = 100;
        Status.status = "completed";
        Status.Logs.push("Finished !");
        Status.Logs.push(
          `Successfully converted from "${inExt}" to "${outExt}"`,
        );
        resolve(Status);
      } else {
        const errorMessage = `Pandoc conversion failed with exit code ${code}. Stderr: ${stderrOutput || "No stderr output."}`;

        Status.progress = 0;
        Status.status = "error";
        Status.Logs = [`Error: ${errorMessage}`];
        resolve(Status);
      }
    });
    pandocProcess.on("error", (err) => {
      const errorMessage = `Failed to start Pandoc process: ${err.message}. Ensure Pandoc is correctly bundled at ${pandocPath}.`;

      Status.progress = 0;
      Status.status = "error";
      Status.Logs = [`Error: ${errorMessage}`];
      resolve(Status);
    });
  });
}

export async function ToPDF(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.pdf`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToRTF(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.rtf`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToTXT(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.txt`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToDOCX(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.docx`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToHTML(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.html`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToEPUB(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.epub`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}

export async function ToODT(outDir:string, inPath:string, name:string) {
  const safeName = SanitizeFileName(name);
  const finalPath = path.join(outDir, `${safeName}.odt`);

  const pandocPath = getPANDOC();

  return await convertFileWithPandoc(pandocPath, inPath, finalPath);
}
