const path = require('path');
const {mkdir, copyFile, readdir, rm} = require('fs/promises');

let copyFolderPath = path.join(__dirname, 'files-copy');
let srcFolderPath = path.join(__dirname, 'files');

async function copyDir(){
    try {
        await rm(copyFolderPath, { recursive: true, force: true}); //remove folder first, if there is no one to delete ignore the command (via force: true)
        await mkdir(copyFolderPath, { recursive: true });
        const files = await readdir(srcFolderPath);
        for (const file of files){
            await copyFile(srcFolderPath + "\\" + file, copyFolderPath + "\\" + file);
        }
    } catch (err) {
        console.error(err.message);
    }
}
copyDir();