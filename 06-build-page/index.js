const path = require('path');
const {mkdir, readFile, readdir, writeFile, rm, appendFile, copyFile} = require('fs/promises');

const distFolderPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');
const stylesFolderPath = path.join(__dirname, 'styles');
const distHtmlFilePath = distFolderPath + "\\index.html";
const distCsslFilePath = distFolderPath + "\\style.css";
const distAssetsFolderPath = distFolderPath + "\\assets";
const copyFolderPath = path.join(__dirname, 'assets');

async function mergeStyles(){
    try {
    await rm(distCsslFilePath, {force: true});
    const files = await readdir(stylesFolderPath, {withFileTypes: true});
    for (const file of files){
        if(file.isFile() && /\.css$/.test(file.name)){
            const fileContents = await readFile(`${stylesFolderPath}\\${file.name}`, { encoding: 'utf8' });
            await appendFile(distCsslFilePath, fileContents);
        }
    }
  } catch (err) {
    console.error(err);
  }
}

async function copyDir(sourceFolder, targetFolder){
  try {
      await rm(targetFolder, { recursive: true, force: true}); //remove folder first, if there is no one to delete ignore the command (via force: true)
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

async function buildPage(){
    try {
        await rm(distFolderPath, { recursive: true, force: true});

        let template = await readFile(templatePath, { encoding: 'utf8' });
        const templateTags = template.match(/{{[\s\S]+?}}/g).map((tag)=>tag.slice(2,tag.length-2));
        //regex /{{[\s\S]+?}}/g - all symbols between {{}}
        const files = await readdir(componentsFolderPath, {withFileTypes: true});

        for (const file of files){
            if(file.isFile() && /\.html$/.test(file.name)){
                const fileName = file.name.slice(0, file.name.lastIndexOf("."));
                if(templateTags.includes(fileName)){
                    const componentContents = await readFile(`${componentsFolderPath}\\${file.name}`, { encoding: 'utf8' });
                    template = template.replace(`{{${fileName}}}`, componentContents);
                }
            }
        }

        await mkdir(distFolderPath);
        await writeFile(distHtmlFilePath, template);

        await mergeStyles();
        await copyDir(copyFolderPath, distAssetsFolderPath);

  } catch (err) {
    console.error(err);
  }
}

buildPage ();