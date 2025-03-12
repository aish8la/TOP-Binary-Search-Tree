import { Tree } from "./bst.js";

const arr = [1];
const tree = new Tree(arr);

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

// tree.insert(5000);
prettyPrint(tree.root);
// tree.delete(67);
// tree.delete(5)
tree.delete(1)
console.log("find",tree.find(8))

prettyPrint(tree.root);
