const { resolve } = require('path');
const { mkdir } = require('fs/promises');
const { copyDir } = require('../04-copy-directory/copyDir');
const { mergeStyles } = require('../05-merge-styles/mergeStyles');
const { buildPage } = require('./buildPage');

const bundlePath = resolve(__dirname, 'project-dist');

const assets = {
  src: resolve(__dirname, 'assets'),
  dest: resolve(bundlePath, 'assets'),
};

const styles = {
  src: resolve(__dirname, 'styles'),
  dest: resolve(bundlePath, 'style.css'),
};

const page = {
  src: resolve(__dirname, 'template.html'),
  srcComponents: resolve(__dirname, 'components'),
  dest: resolve(bundlePath, 'index.html'),
};

async function compileBundle(path) {
  await mkdir(path, { recursive: true });

  await Promise.all([
    copyDir(assets.src, assets.dest),
    mergeStyles(styles.src, styles.dest),
    buildPage(page.src, page.srcComponents, page.dest),
  ]);
}

compileBundle(bundlePath);
