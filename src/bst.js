class Node {
    constructor(data) {
        this.data = data;
        this.left;
        this.right;
    }
}

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTreeStructure(array, start, end) {
        if(start > end) return null;

        const mid = start + Math.floor((end - start) / 2);
        const newNode = new Node(array[mid]);
        newNode.left = this.buildTreeStructure(array, start, mid - 1);
        newNode.right = this.buildTreeStructure(array, mid + 1, end);
        return newNode;
    }

    buildTree(array) {
        const uniqueArr = [...new Set(array)].sort((a, b) => a - b);
        return this.buildTreeStructure(uniqueArr, 0, uniqueArr.length - 1);
    }
}