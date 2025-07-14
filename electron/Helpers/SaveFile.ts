import fs from 'node:fs'

export async function SaveFileToTemp(TempFolderPath: string,ImagePath:string,ImageName:string) {
    fs.copyFile(ImagePath, TempFolderPath+"/"+ImageName, (err) => {
        if (err) {
            console.error('Error copying file:', err);
            return;
        }
    })
}