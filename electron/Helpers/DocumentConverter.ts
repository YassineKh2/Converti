import path from 'node:path';
import {SanitizeFileName} from './SanitizeFileName';
import {getPANDOC} from "./GetPANDOC";
import {spawn} from "node:child_process";

async function convertFileWithPandoc(pandocPath, inPath, finalPath) {
    return new Promise((resolve, reject) => {
        let stderrOutput = '';

        const pandocProcess = spawn(pandocPath, ['-s', '--pdf-engine=wkhtmltopdf', inPath, '-o', finalPath]);

        pandocProcess.stderr.on('data', (data) => {
            stderrOutput += data.toString();
        });

        pandocProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`Successfully converted "${inPath}" to "${finalPath}"`);
                resolve(finalPath);
            } else {
                const errorMessage = `Pandoc conversion failed with exit code ${code}. Stderr: ${stderrOutput || 'No stderr output.'}`;
                console.error(errorMessage);
                reject(new Error(errorMessage));
            }
        });
        pandocProcess.on('error', (err) => {
            const errorMessage = `Failed to start Pandoc process: ${err.message}. Ensure Pandoc is correctly bundled at ${pandocPath}.`;
            console.error(errorMessage);
            reject(new Error(errorMessage));
        });
    });
}

export async function ToPDF(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.pdf`);

    const pandocPath = getPANDOC()
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToRTF(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.rtf`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToTXT(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.txt`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToDOCX(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.docx`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToHTML(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.html`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToEPUB(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.epub`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}

export async function ToODT(outDir, inPath, name) {
    const safeName = SanitizeFileName(name);
    const finalPath = path.join(outDir, `${safeName}.odt`);

    const pandocPath = getPANDOC();
    return await convertFileWithPandoc(pandocPath,inPath,finalPath)

}
