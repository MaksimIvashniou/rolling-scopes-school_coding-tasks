const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  #isReverse;

  static #Direction = {
    ENCRYPT: 1,
    DECRYPT: -1,
  };

  constructor(isDirect = true) {
    this.#isReverse = !isDirect;
  }

  encrypt(message, key) {
    VigenereCipheringMachine.#validateMissedArguments(message, key);

    return VigenereCipheringMachine.#transformMessage(
      message.toUpperCase(),
      key.toUpperCase(),
      this.#isReverse,
      VigenereCipheringMachine.#Direction.ENCRYPT,
    );
  }

  decrypt(message, key) {
    VigenereCipheringMachine.#validateMissedArguments(message, key);

    return VigenereCipheringMachine.#transformMessage(
      message.toUpperCase(),
      key.toUpperCase(),
      this.#isReverse,
      VigenereCipheringMachine.#Direction.DECRYPT,
    );
  }

  static #validateMissedArguments(...args) {
    args.forEach((arg) => {
      if (arg === undefined) throw new Error('Incorrect arguments!');
    });
  }

  static #transformMessage(message, key, isReverse, direction) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let keyIterator = 0;

    const result = [...message].map((char) => {
      if (/[^A-Z]/.test(char)) return char;

      const [charIndex, keyCharIndex] = [
        ALPHABET.indexOf(char),
        ALPHABET.indexOf(key[keyIterator]),
      ];

      keyIterator = (keyIterator + 1) % key.length;

      const index = (charIndex + keyCharIndex * direction) % ALPHABET.length;

      return ALPHABET.at(index);
    });

    if (isReverse) result.reverse();

    return result.join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
