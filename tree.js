class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = []) {
    // build a balanced BST from array
    this.root = this.buildTree(array);
  }

  // helper: remove duplicates and sort
  _prepareArray(array) {
    const unique = Array.from(new Set(array));
    unique.sort((a, b) => a - b);
    return unique;
  }

  buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    const sorted = this._prepareArray(array);

    function build(arr, start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);
      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);
      return node;
    }

    return build(sorted, 0, sorted.length - 1);
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    function insertNode(node, val) {
      if (node === null) return new Node(val);
      if (val === node.value) return node; // ignore duplicates
      if (val < node.value) {
        node.left = insertNode(node.left, val);
      } else {
        node.right = insertNode(node.right, val);
      }
      return node;
    }

    this.root = insertNode(this.root, value);
    return this.find(value);
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  delete(value) {
    function removeNode(node, val) {
      if (!node) return null;
      if (val < node.value) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.value) {
        node.right = removeNode(node.right, val);
        return node;
      }
      // node.value === val -> remove this node
      // case 1: no child
      if (!node.left && !node.right) return null;
      // case 2: one child
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // case 3: two children -> find inorder successor (smallest in right subtree)
      let successorParent = node;
      let successor = node.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      node.value = successor.value;
      // remove successor
      if (successorParent !== node) {
        successorParent.left = removeNode(successorParent.left, successor.value);
      } else {
        successorParent.right = removeNode(successorParent.right, successor.value);
      }
      return node;
    }

    this.root = removeNode(this.root, value);
    return this.find(value) === null;
  }

  // Traversals returning arrays of values
  levelOrder() {
    const result = [];
    if (!this.root) return result;
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  inOrder() {
    const res = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      res.push(node.value);
      traverse(node.right);
    }
    traverse(this.root);
    return res;
  }

  preOrder() {
    const res = [];
    function traverse(node) {
      if (!node) return;
      res.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return res;
  }

  postOrder() {
    const res = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      res.push(node.value);
    }
    traverse(this.root);
    return res;
  }

  // forEach variants that accept callbacks and throw if missing
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('callback required');
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('callback required');
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('callback required');
    function traverse(node) {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('callback required');
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }
    traverse(this.root);
  }

  // height: number of edges in longest path from node to leaf
  height(nodeOrValue) {
    let node = null;
    if (nodeOrValue instanceof Node) node = nodeOrValue;
    else node = this.find(nodeOrValue);
    if (!node) return null;

    function h(n) {
      if (!n) return -1; // by edges definition, leaf has height 0 => children -1
      return 1 + Math.max(h(n.left), h(n.right));
    }
    return h(node);
  }

  // depth: number of edges from node to root
  depth(nodeOrValue) {
    let nodeValue = null;
    if (nodeOrValue instanceof Node) nodeValue = nodeOrValue.value;
    else nodeValue = nodeOrValue;
    let current = this.root;
    let depth = 0;
    while (current) {
      if (nodeValue === current.value) return depth;
      if (nodeValue < current.value) current = current.left;
      else current = current.right;
      depth++;
    }
    return null;
  }

  // check balanced for every node
  isBalanced() {
    let balanced = true;

    function check(node) {
      if (!node) return -1; // height
      const leftH = check(node.left);
      const rightH = check(node.right);
      if (Math.abs(leftH - rightH) > 1) balanced = false;
      return 1 + Math.max(leftH, rightH);
    }

    check(this.root);
    return balanced;
  }

  rebalance() {
    const nodes = this.inOrder();
    this.root = this.buildTree(nodes);
    return this.root;
  }
}

// prettyPrint utility for visualization
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

module.exports = { Node, Tree, prettyPrint };
