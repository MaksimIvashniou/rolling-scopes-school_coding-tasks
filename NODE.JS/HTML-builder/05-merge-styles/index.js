const { resolve } = require('path');
const { mergeStyles } = require('./mergeStyles');

const config = {
  src: resolve(__dirname, 'styles'),
  dest: resolve(__dirname, 'project-dist', 'bundle.css'),
};

mergeStyles(config.src, config.dest);
