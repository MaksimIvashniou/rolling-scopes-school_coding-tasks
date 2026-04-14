module.exports = function towelSort(matrix) {
    return (
        matrix?.flatMap((arr, index) => (index % 2 ? arr.reverse() : arr)) ?? []
    );
};
