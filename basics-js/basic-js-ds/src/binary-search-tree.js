const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  #root = null;

  #length = 0;

  get #engine() {
    return this.#length > 5000 ? BSTUtilsIterative : BSTUtilsRecursive;
  }

  root() {
    return this.#root;
  }

  add(data) {
    if (this.has(data)) return;

    this.#root = this.#engine.addTo(this.#root, data);

    this.#length++;
  }

  find(data) {
    return this.#engine.findFrom(this.#root, null, data);
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    if (!this.has(data)) return;

    this.#root =
      this.#engine.findFrom(
        this.#root,
        null,
        data,
        this.#engine.removeFrom.bind(this.#engine),
      ) ?? this.#root;

    this.#length--;
  }

  min() {
    if (!this.#root) return null;

    return this.#engine.findExtremeFrom(this.#root, null).data;
  }

  max() {
    if (!this.#root) return null;

    return this.#engine.findExtremeFrom(this.#root, null, false).data;
  }
}

class BinarySearchTreeUtils {
  constructor() {
    if (new.target === BinarySearchTreeUtils) {
      throw new TypeError('Cannot instantiate abstract class directly.');
    }
  }

  static addTo(node, data) {
    throw new Error("Method 'addTo()' must be implemented.");
  }

  static findExtremeFrom(node, parent, isMin, cbFunc) {
    throw new Error("Method 'findExtremeFrom()' must be implemented.");
  }

  static findFrom(node, parent, data, cbFunc) {
    throw new Error("Method 'findFrom()' must be implemented.");
  }

  static removeFrom(node, parent, data) {
    let subtree = node.right || node.left;

    if (node.left && node.right) {
      let successor = this.findExtremeFrom(
        subtree,
        node,
        true,
        this.removeFrom,
      );

      node.data = successor.data;

      return;
    }

    if (!parent) return subtree;

    parent.left === node ? (parent.left = subtree) : (parent.right = subtree);
  }
}

class BSTUtilsRecursive extends BinarySearchTreeUtils {
  static addTo(node, data) {
    if (!node) return new Node(data);

    if (node.data === data) return node;

    node.data > data
      ? (node.left = this.addTo(node.left, data))
      : (node.right = this.addTo(node.right, data));

    return node;
  }

  static findExtremeFrom(node, parent, isMin = true, cbFunc = (x) => x) {
    const next = isMin ? node.left : node.right;

    if (!next) {
      cbFunc(node, parent, node.data);

      return node;
    }

    return this.findExtremeFrom(next, node, isMin, cbFunc);
  }

  static findFrom(node, parent, data, cbFunc = (x) => x) {
    if (!node) return null;

    if (node.data === data) {
      return cbFunc(node, parent, data);
    }

    const next = node.data < data ? node.right : node.left;

    return this.findFrom(next, node, data, cbFunc);
  }
}

class BSTUtilsIterative extends BinarySearchTreeUtils {
  static addTo(node, data) {
    const leaf = new Node(data);

    if (!node) return leaf;

    let current = node;

    while (current) {
      const next = current.data > data ? current.left : current.right;

      if (!next) {
        current.data > data ? (current.left = leaf) : (current.right = leaf);
        break;
      }

      current = next;
    }

    return node;
  }

  static findExtremeFrom(node, parent, isMin = true, cbFunc = (x) => x) {
    let prev = parent;
    let current = node;

    while (current) {
      const next = isMin ? current.left : current.right;

      if (!next) {
        cbFunc(current, prev, current.data);
        break;
      }

      prev = current;
      current = next;
    }

    return current;
  }

  static findFrom(node, parent, data, cbFunc = (x) => x) {
    if (!node) return null;

    let prev = parent;
    let current = node;

    while (current.data !== data) {
      prev = current;
      current = current.data > data ? current.left : current.right;

      if (!current) return null;
    }

    return cbFunc(current, prev, data);
  }
}

module.exports = {
  BinarySearchTree,
};
