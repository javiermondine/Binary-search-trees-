const assert = require('assert');
const { Tree } = require('./tree');

function testBuildAndTraversals() {
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree(arr);

  // buildTree removes duplicates and sorts
  const inorder = tree.inOrder();
  const dedupSorted = Array.from(new Set(arr)).sort((a, b) => a - b);
  assert.deepStrictEqual(inorder, dedupSorted, 'inOrder should be sorted unique');

  // traversals lengths
  assert.strictEqual(tree.levelOrder().length, inorder.length);
  assert.strictEqual(tree.preOrder().length, inorder.length);
  assert.strictEqual(tree.postOrder().length, inorder.length);

  console.log('build and traversals OK');
}

function testInsertFindDelete() {
  const tree = new Tree([10, 5, 15]);
  tree.insert(3);
  tree.insert(7);
  tree.insert(12);
  tree.insert(18);

  assert.ok(tree.find(7));
  assert.strictEqual(tree.find(7).value, 7);

  // delete leaf
  assert.strictEqual(tree.delete(3), true);
  assert.strictEqual(tree.find(3), null);

  // delete node with one child
  tree.insert(2);
  tree.insert(1);
  assert.strictEqual(tree.delete(2), true);
  assert.strictEqual(tree.find(2), null);

  // delete node with two children
  tree.insert(6);
  tree.insert(4);
  assert.strictEqual(tree.delete(5), true);
  assert.strictEqual(tree.find(5), null);

  console.log('insert/find/delete OK');
}

function testHeightDepthBalance() {
  const values = [50, 30, 70, 20, 40, 60, 80];
  const tree = new Tree(values);
  assert.strictEqual(tree.isBalanced(), true);

  // height of root
  const h = tree.height(tree.root);
  assert.ok(typeof h === 'number');

  // depth of a leaf
  const leafVal = 20;
  const d = tree.depth(leafVal);
  assert.strictEqual(d, 2);

  // unbalance by inserting large values
  [150, 160, 170, 180].forEach(v => tree.insert(v));
  assert.strictEqual(tree.isBalanced(), false);

  tree.rebalance();
  assert.strictEqual(tree.isBalanced(), true);

  console.log('height/depth/balance OK');
}

try {
  testBuildAndTraversals();
  testInsertFindDelete();
  testHeightDepthBalance();
  console.log('\nAll BST tests passed ✅');
  process.exit(0);
} catch (err) {
  console.error('Test failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
