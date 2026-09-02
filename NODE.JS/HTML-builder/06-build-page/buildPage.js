const { readFile, readdir, writeFile } = require('fs/promises');
const { resolve, parse, extname } = require('path');

async function buildPage(src, srcComponents, dest) {
  const extName = '.html';

  const [page, components] = await Promise.all([
    readFile(src, { encoding: 'utf-8' }),
    readdir(srcComponents, { withFileTypes: true }),
  ]);

  const promiseChain = components
    .filter((dirent) => dirent.isFile() && extname(dirent.name) === extName)
    .map(async (dirent) => {
      const path = resolve(srcComponents, dirent.name);
      const { name } = parse(dirent.name);

      const content = await readFile(path, {
        encoding: 'utf-8',
      });

      return { name, content };
    });

  const loadedComponents = await Promise.all(promiseChain);

  const bundle = loadedComponents.reduce(
    (accPage, { name, content }) => accPage.replaceAll(`{{${name}}}`, content),
    page,
  );

  await writeFile(dest, bundle);
}

module.exports = { buildPage };
