/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */

function getCommonCharacterCount(s1, s2) {
  const mapper = {};
  let counter = 0;

  for (let i = 0; i < s1.length; i += 1) {
    const char = s1[i];

    mapper[char] = (mapper[char] || 0) + 1;
  }

  for (let i = 0; i < s2.length; i += 1) {
    const char = s2[i];

    if (mapper[char] > 0) {
      mapper[char]--;
      counter++;
    }
  }

  return counter;
}

module.exports = {
  getCommonCharacterCount,
};
