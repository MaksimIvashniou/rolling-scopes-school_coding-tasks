const { readdir, stat } = require('fs/promises');
const { resolve, parse } = require('path');
const { stdout } = require('process');

const config = {
  src: resolve(__dirname, 'secret-folder'),
};

async function displayFilesInfo(src) {
  const dirents = await readdir(src, { withFileTypes: true });

  const promises = dirents
    .filter((dirent) => dirent.isFile())
    .map(async (file) => {
      const filePath = resolve(src, file.name);

      const { name, ext } = parse(filePath);
      const size = await stat(filePath)
        .then(({ size }) => (size / 1024).toFixed(3))
        .then((value) => `${value}kB`);

      stdout.write(`${name} - ${ext.slice(1) || 'none'} - ${size}\n`);
    });

  await Promise.all(promises);
}

displayFilesInfo(config.src);
