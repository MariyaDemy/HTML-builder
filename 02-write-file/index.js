const fs = require('fs');
const path = require('path');
const {stdout, stdin, stderr} = process;

let outputPath = path.join(__dirname, 'word.txt');

fs.writeFile(
    outputPath,
    '',
    (err) => {
        if (err) return console.error(err.message);
    }
);

stdout.write(`Hey! What's the first word that comes to your mind?\n`);

stdin.on('data', data => {
    const word = data.toString()
    const trimmedWord = word.trim(); // to remove \n in the string

    if(trimmedWord !== 'exit'){
      fs.appendFile(
        outputPath,
        word,
        err => {
          if (err) throw err;
        }
      );
    } else {
        process.exit();
    }

});

process.on('exit', (exitCode)=> {
    if (exitCode === 0) {
        stdout.write('Have a great day!');
    } else {
        stderr.write(`Something went wrong because of code ${exitCode}`);
    }
})

process.on("SIGINT", () =>{
    process.exit(0);
})