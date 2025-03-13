export class Driver {
  constructor(treeObject) {
    this.tree = treeObject;
  }

  randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomNumberUpto(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  randomArray(min, max, n = 1) {
    return Array.from({ length: n }, () => this.randomNumberRange(min, max));
  }

  initializeTree() {
    const array = this.randomArray(0, 100, this.randomNumberRange(7, 25));
    this.tree.root = this.tree.buildTree(array);
  }

  printIsTreeBalanced() {
    const isBalanced = this.tree.isBalanced();
    if (isBalanced) {
      console.log("Tree is balanced");
    } else {
      console.log("Tree is NOT balanced");
    }
  }

  printElements() {
    const levelOrder = [];
    const preOrder = [];
    const postOrder = [];
    const inOrder = [];

    const populateLevel = (node) => {
      levelOrder.push(node);
    };

    const populatePre = (node) => {
      preOrder.push(node);
    };

    const populatePost = (node) => {
      postOrder.push(node);
    };

    const populateInorder = (node) => {
      inOrder.push(node);
    };

    this.tree.levelOrder(populateLevel);
    this.tree.preOrder(populatePre);
    this.tree.postOrder(populatePost);
    this.tree.inOrder(populateInorder);

    console.log("Level Order:", levelOrder);
    console.log("Pre Order:", preOrder);
    console.log("Post Order:", postOrder);
    console.log("In Order:", inOrder);
  }

  insertRandom() {
    const array = this.randomArray(101, 200, this.randomNumberRange(3, 8));
    array.forEach(e => this.tree.insert(e));
  }

  driver() {
    console.log("\n------Initialize Tree--------\n");
    this.initializeTree();
    console.log("\n------Check If Tree is Balanced--------\n");
    this.printIsTreeBalanced();
    console.log("\n------Print Tree Elements--------\n");
    this.printElements();
    console.log("\n------Insert Random Elements--------\n");
    this.insertRandom();
    console.log("\n------Check If Tree is Balanced After Inserts--------\n");
    this.printIsTreeBalanced();
    console.log("\n------Rebalance Tree--------\n");
    this.tree.rebalance();
    console.log("\n------Confirm If Tree is Balanced Properly--------\n");
    this.printIsTreeBalanced();
    console.log("\n------Print Tree Elements--------\n");
    this.printElements();
  }
}
