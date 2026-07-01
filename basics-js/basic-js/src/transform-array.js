const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const sequenceEnum = {
    discardNext: '--discard-next',
    discardPrev: '--discard-prev',
    doubleNext: '--double-next',
    doublePrev: '--double-prev',
  };

  const copy = [];

  let index = 0;

  while (index < arr.length) {
    const value = arr[index];

    switch (value) {
      case sequenceEnum.discardNext: {
        if (index < arr.length - 1) index += 1;
        break;
      }

      case sequenceEnum.doubleNext: {
        if (index < arr.length - 1) copy.push(arr[index + 1]);
        break;
      }

      case sequenceEnum.discardPrev:
      case sequenceEnum.doublePrev: {
        if (!index || arr[index - 2] === sequenceEnum.discardNext) break;

        if (value === sequenceEnum.discardPrev) {
          copy.pop();
        } else {
          copy.push(arr[index - 1]);
        }
        break;
      }

      default: {
        copy.push(value);
        break;
      }
    }

    index += 1;
  }

  return copy;
}

module.exports = {
  transform,
};
