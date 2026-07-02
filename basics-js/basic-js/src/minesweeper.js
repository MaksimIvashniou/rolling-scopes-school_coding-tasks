/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  function sliceArea(array, index) {
    const start = index && index - 1;
    return array.slice(start, index + 2);
  }

  return matrix.map((row, rowIndex) => {
    const lines = sliceArea(matrix, rowIndex);

    return row.map((isMine, columnIndex) => {
      const filterArea = lines.flatMap((line) => sliceArea(line, columnIndex));

      return filterArea.filter(Boolean).length - isMine;
    });
  });
}

module.exports = {
  minesweeper,
};
