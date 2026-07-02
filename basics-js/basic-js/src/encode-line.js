/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */

function encodeLine(str) {
  if (!str.length) return str;
  return str.match(/(.)\1*/g).reduce((acc, m) => {
    const { length: l } = m;
    return acc + `${l > 1 ? l : ''}${m.charAt()}`;
  }, '');
}

module.exports = {
  encodeLine,
};
