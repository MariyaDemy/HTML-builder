const fs = require('fs');
const path = require('path');
let filePath = path.join(__dirname, 'text.txt');

const input = fs.createReadStream(filePath, 'utf-8');

input.on('data', (chunk) => {
    console.log(chunk);
    }
);