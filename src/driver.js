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
    const array = this.randomArray(0, 5000, this.randomNumberRange(7, 25));
    this.tree.root = this.tree.buildTree(array);
    
  }
}
