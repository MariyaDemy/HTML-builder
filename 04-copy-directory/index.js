const path = require('path');
const {mkdir, copyFile, readdir, rm} = require('fs/promises');

let copyFolderPath = path.join(__dirname, 'files-copy');
let srcFolderPath = path.join(__dirname, 'files');

async function copyDir(sourceFolder, targetFolder){
    try {
        //remove folder first, if there is no one to delete ignore the command (via force: true)
        await rm(targetFolder, { recursive: true, force: true});
        await mkdir(targetFolder, { recursive: true });
        const contents = await readdir(sourceFolder, {withFileTypes: true});
          for (const content of contents){
          if(content.isFile()){
              await copyFile(sourceFolder + `\\${content.name}`, targetFolder + `\\${content.name}`);
          } else {
              copyDir(sourceFolder + `\\${content.name}`, targetFolder + `\\${content.name}`)
          }
        }
    } catch (err) {
        console.error(err.message);
    }
}

copyDir(srcFolderPath, copyFolderPath);