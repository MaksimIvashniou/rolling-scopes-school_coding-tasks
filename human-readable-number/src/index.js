const wordDictionary = {
  zero: 'zero',
  digits: [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ],
  teenNumbers: [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ],
  decimals: [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ],
  hundred: 'hundred',
  classes: ['', 'thousand', 'million', 'billion', 'trillion'],
};

function splitNumberByClasses(number) {
  const length = 3;
  const result = [];
  const digits = [...`${number}`].reverse();

  for (let start = 0; start < digits.length; start += length) {
    result.push(digits.slice(start, start + length));
  }

  return result;
}

module.exports = function toReadable(number) {
  if (!number) return wordDictionary.zero;

  const splittedClasses = splitNumberByClasses(number);

  return splittedClasses
    .reduceRight((acc, digits, classValue) => {
      const result = [];
      const [digit, decimal, hundred] = digits.map((v) => +v);

      if (hundred) {
        result.push(
          `${wordDictionary.digits[hundred]} ${wordDictionary.hundred}`
        );
      }

      if (decimal === 1) {
        result.push(wordDictionary.teenNumbers[digit]);
      } else {
        if (decimal) result.push(wordDictionary.decimals[decimal]);

        if (digit) result.push(wordDictionary.digits[digit]);
      }

      if (classValue) result.push(wordDictionary.classes[classValue]);

      return acc + (result.length ? ` ${result.join(' ')}` : '');
    }, '')
    .trim();
};
