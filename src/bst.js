class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
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

    buildTreeLoop(array) {
        const uniqueArr = [...new Set(array)].sort((a, b) => a - b);
        const n = uniqueArr.length;
        const mid = Math.floor((n - 0) / 2);
        const root = new Node(uniqueArr[mid]);
        const queue = [{node : root, range: [0, n - 1]}];
        let queueFront = 0;

        while(queue.length > queueFront) {
            const currentNode = queue[queueFront].node;
            const [start, end] = [...queue[queueFront].range];
            const midOfRange = start + Math.floor((end - start) / 2);

            if(midOfRange > start) {
                const leftMid = start + Math.floor((midOfRange - 1 - start) / 2);
                const leftNode = new Node(uniqueArr[leftMid]);
                currentNode.left = leftNode;
                queue.push({node : leftNode, range: [start, midOfRange - 1]});
            }

            if(midOfRange < end) {
                const rightMid = midOfRange + 1 + Math.floor((end - midOfRange - 1) / 2);
                const rightNode = new Node(uniqueArr[rightMid]);
                currentNode.right = rightNode;
                queue.push({node : rightNode, range: [midOfRange + 1, end]});
            }
            queueFront++;
        }

        return root;
    }

    insert(value) {
        
        const recursiveInsert = (node) => {

            if(node === null) {
                return new Node(value);
            }

            if(value > node.data) {
                node.right = recursiveInsert(node.right);
            } else if (value < node.data) {
                node.left = recursiveInsert(node.left);
            }

            return node;
        }

        this.root = recursiveInsert(this.root)
    }

    delete(value) {
        let previousNode = null;
        let targetNode = null;
        let branch = null;

        const deleteRecursive = (node) => {

            if(node === null) {
                return;
            }
            console.log(node.data);
            if(node.data === value) {
                targetNode = node;
                return;
            }

            if(value > node.data) {
                previousNode = node;
                branch = "right";
                deleteRecursive(node.right)
            } else if(value < node.data) {
                previousNode = node;
                branch = "left";
                deleteRecursive(node.left)
            }

            if(targetNode === null) return;
            if(targetNode.left === null && targetNode.right === null) {
                previousNode[branch] = null;
            }

        }

        deleteRecursive(this.root);
    }
}