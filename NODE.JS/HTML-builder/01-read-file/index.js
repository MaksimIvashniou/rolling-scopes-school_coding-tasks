const { resolve } = require('path');
const { createReadStream } = require('fs');

const config = {
  src: resolve(__dirname, 'text.txt'),
};

function readFile(filePath) {
  const readStream = createReadStream(filePath);

  readStream.pipe(process.stdout);
}

readFile(config.src);
