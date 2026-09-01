const { resolve } = require('path');
const { readdir, mkdir, rm, copyFile, stat } = require('fs/promises');

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });

  const [srcInfo, destInfo] = await Promise.all([
    readdir(src, { withFileTypes: true }),
    readdir(dest, { withFileTypes: true }),
  ]);

  const destInfoMapper = new Map(
    destInfo.map((dirent) => [dirent.name, dirent]),
  );

  const promiseChain = srcInfo.map(async (dirent) => {
    const { name } = dirent;
    const [srcPath, copyPath] = [resolve(src, name), resolve(dest, name)];

    const copy = destInfoMapper.get(name);

    if (!copy) {
      if (dirent.isDirectory()) {
        await copyDir(srcPath, copyPath);
      } else {
        await copyFile(srcPath, copyPath);
      }

      return;
    }

    if (dirent.isDirectory()) {
      if (!copy.isDirectory()) {
        await rm(copyPath, { force: true, recursive: true });
      }

      await copyDir(srcPath, copyPath);

      destInfoMapper.delete(name);

      return;
    }

    if (copy.isDirectory()) {
      await rm(copyPath, { force: true, recursive: true });
    }

    const [srcStat, copyStat] = await Promise.all([
      stat(srcPath),
      stat(copyPath),
    ]);

    if (
      srcStat.size !== copyStat.size ||
      srcStat.mtimeMs !== copyStat.mtimeMs
    ) {
      await copyFile(srcPath, copyPath);
    }

    destInfoMapper.delete(name);
  });

  await Promise.all(promiseChain);

  const deleteRestPromises = [...destInfoMapper.keys()].map((name) => {
    return rm(resolve(dest, name), { force: true, recursive: true });
  });

  await Promise.all(deleteRestPromises);
}

module.exports = { copyDir };
