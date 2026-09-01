const { resolve } = require('path');
const { copyDir } = require('./copyDir');

const config = {
  src: resolve(__dirname, 'files'),
  dest: resolve(__dirname, 'files-copy'),
};

copyDir(config.src, config.dest);
