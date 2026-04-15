const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

const MORSE_BINARY_CODE = {
  10: '.',
  11: '-',
  '**********': ' ',
};

function decode(expr) {
  return expr
    .match(/.{10}/g)
    .map((chunk) => {
      const zeroTrimmed = chunk.replace(/^[0]+/g, '');

      return Object.entries(MORSE_BINARY_CODE).reduce(
        (result, [key, code]) => result.replaceAll(key, code),
        zeroTrimmed,
      );
    })
    .map((code) => MORSE_TABLE[code] ?? code)
    .join('');
}

module.exports = {
  decode,
};
