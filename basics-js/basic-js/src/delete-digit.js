/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const str = `${n}`;

  return [...str].reduce((max, _, i) => {
    const number = +`${str.slice(0, i)}${str.slice(i + 1)}`;
    return Math.max(max, number);
  }, 0);
}

module.exports = {
  deleteDigit,
};
