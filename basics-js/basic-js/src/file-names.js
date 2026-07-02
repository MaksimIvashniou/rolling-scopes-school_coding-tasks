/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const stats = {};

  return names.map(function rename(name) {
    const isUnique = !stats[name];

    if (isUnique) {
      stats[name] = 1;
      return name;
    }

    let counter = stats[name];
    let uniqueName = '';

    do {
      uniqueName = `${name}(${counter++})`;
    } while (stats[uniqueName]);

    stats[name] = counter;

    return rename(uniqueName);
  });
}

module.exports = {
  renameFiles,
};
