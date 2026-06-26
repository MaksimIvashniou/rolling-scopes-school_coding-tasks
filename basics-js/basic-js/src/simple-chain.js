const { decorateObject } = require('../lib');
const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  list: [],

  getLength() {
    return this.list.length;
  },
  addLink(value) {
    this.list.push(typeof value === 'undefined' ? '( )' : `( ${value} )`);

    return this;
  },
  removeLink(position) {
    if (
      !Number.isInteger(position) ||
      position <= 0 ||
      position >= this.getLength()
    ) {
      this.list.length = 0;
      throw new Error("You can't remove incorrect link!");
    }

    this.list.splice(position - 1, 1);

    return this;
  },
  reverseChain() {
    this.list.reverse();

    return this;
  },
  finishChain() {
    const copy = [...this.list];

    this.list.length = 0;

    return copy.join('~~');
  },
};

module.exports = {
  chainMaker,
};
