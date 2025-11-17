const { Tree, prettyPrint } = require('./tree');

function randomArray(size = 15, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * max));
  return arr;
}

// Driver
const initial = randomArray(15, 100);
console.log('Initial array:', initial);

const tree = new Tree(initial);
console.log('\nTree built (balanced by buildTree?). isBalanced ->', tree.isBalanced());
console.log('\nPretty print:');
prettyPrint(tree.root);

console.log('\nLevel order:', tree.levelOrder());
console.log('In order:', tree.inOrder());
console.log('Pre order:', tree.preOrder());
console.log('Post order:', tree.postOrder());

// Insert several large numbers to unbalance
const extras = [150, 160, 170, 180, 190, 200];
console.log('\nInserting extras to unbalance:', extras);
extras.forEach(n => tree.insert(n));
console.log('After inserts isBalanced ->', tree.isBalanced());

console.log('\nPretty print (unbalanced):');
prettyPrint(tree.root);

// rebalance
console.log('\nRebalancing...');
tree.rebalance();
console.log('After rebalance isBalanced ->', tree.isBalanced());
console.log('\nPretty print (rebalanced):');
prettyPrint(tree.root);

console.log('\nTraversals after rebalance:');
console.log('Level order:', tree.levelOrder());
console.log('In order:', tree.inOrder());
console.log('Pre order:', tree.preOrder());
console.log('Post order:', tree.postOrder());

// Test delete
console.log('\nTesting delete operations:');
const toDelete = tree.inOrder().slice(0, 3);
console.log('Deleting first three in-order values:', toDelete);
toDelete.forEach(v => {
  const existed = tree.delete(v);
  console.log(`delete ${v} -> ${existed}`);
});
console.log('In order after deletes:', tree.inOrder());

// test height/depth
const sampleVal = tree.root ? tree.root.value : null;
console.log('\nSample root value:', sampleVal);
console.log('height(root):', sampleVal !== null ? tree.height(sampleVal) : null);
console.log('depth(root):', sampleVal !== null ? tree.depth(sampleVal) : null);

console.log('\nDone.');
