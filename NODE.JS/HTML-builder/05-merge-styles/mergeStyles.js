const { resolve, extname } = require('path');
const { readdir, readFile, writeFile } = require('fs/promises');

async function mergeStyles(src, dest) {
  const dirents = await readdir(src, { withFileTypes: true });

  const promiseChaining = dirents.map(async (dirent) => {
    const { name } = dirent;

    const path = resolve(src, name);

    if (!dirent.isFile() || extname(path) !== '.css') return;

    const content = await readFile(path, { encoding: 'utf-8' });

    return `/* ${name} */\n${content}`;
  });

  const styles = await Promise.all(promiseChaining);

  const content = styles.filter(Boolean).join('\n');

  await writeFile(dest, content);
}

module.exports = { mergeStyles };
