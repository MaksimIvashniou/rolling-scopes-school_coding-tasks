module.exports = function check(str, bracketsConfig) {
  const bracketsConfigObj = Object.fromEntries(bracketsConfig);
  const stack = [];

  for (let i = 0; i < str.length; i += 1) {
    const bracket = str[i];

    if (bracket === stack[stack.length - 1]) {
      stack.pop();
    } else if (bracket in bracketsConfigObj) {
      stack.push(bracketsConfigObj[bracket]);
    } else {
      return false;
    }
  }

  return !stack.length;
};
