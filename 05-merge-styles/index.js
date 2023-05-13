const path = require('path');
const {readdir, readFile, appendFile, rm} = require('fs/promises');

const distFolderPath = path.join(__dirname, 'project-dist');
const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(distFolderPath, 'bundle.css');

async function mergeStyles(){
    try {
    await rm(bundleFilePath, {force: true});
    const files = await readdir(stylesFolderPath, {withFileTypes: true});
    for (const file of files){
        if(file.isFile() && /\.css$/.test(file.name)){
            const fileContents = await readFile(path.join(stylesFolderPath, file.name), { encoding: 'utf8' });
            await appendFile(bundleFilePath, fileContents);
        }
    }
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();

