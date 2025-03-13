import { Tree } from "./bst.js";
import { Driver } from "./driver.js";

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// const tree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// tree.insert(5001);
// prettyPrint(tree.root);
// console.log("is Balanced ?",tree.isBalanced());
// tree.rebalance();
// prettyPrint(tree.root);
// console.log("is Balanced ?",tree.isBalanced());

const driver = new Driver(new Tree);
driver.initializeTree();
driver.printElements();