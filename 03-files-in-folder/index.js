const {readdir, stat} = require('fs/promises');
const path = require('path');

let folderPath = path.join(__dirname, 'secret-folder');

async function readDir(){
    try {

    let fileInfoArr = [];

    const files = await readdir(folderPath, {withFileTypes: true});

    for (const file of files){

        if(file.isFile()){ //so that image.jpg folder does not count

          const stats = await stat(`${folderPath}\\${file.name}`, (err, stats) => {});

          const fileSize = stats.size / 1024 + 'kb'; // to convert bytes to kilobytes
          const fileName = file.name.slice(0, file.name.lastIndexOf(".")); // to get proper file name if file has . in name
          const fileExtension = path.extname(file.name).slice(1); // to get proper extension if file has . in name
          fileInfoArr.push([fileName, fileExtension, fileSize])
        }
    }

    fileInfoArr.map(file => console.log(file.join(" - ")));

  } catch (err) {
    console.error(err);
  }
}
readDir();
