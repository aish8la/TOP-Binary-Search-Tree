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

    #buildTreeStructure(array, start, end) {
        if(start > end) return null;

        const mid = start + Math.floor((end - start) / 2);
        const newNode = new Node(array[mid]);
        newNode.left = this.#buildTreeStructure(array, start, mid - 1);
        newNode.right = this.#buildTreeStructure(array, mid + 1, end);
        return newNode;
    }

    buildTree(array) {
        const uniqueArr = [...new Set(array)].sort((a, b) => a - b);
        return this.#buildTreeStructure(uniqueArr, 0, uniqueArr.length - 1);
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

    #recursiveInsert (node, nodeValue) {

        if(node === null) {
            return new Node(nodeValue);
        }

        if(nodeValue > node.data) {
            node.right = this.#recursiveInsert(node.right, nodeValue);
        } else if (nodeValue < node.data) {
            node.left = this.#recursiveInsert(node.left, nodeValue);
        }

        return node;
    }

    insert(value) {

        this.root = this.#recursiveInsert(this.root, value);
    }

    #deleteRecursive (node, nodeValue) {
        if(node === null) return null;

        if(nodeValue < node.data) {
            node.left = this.#deleteRecursive(node.left, nodeValue); 
        } else if(nodeValue > node.data) {
            node.right = this.#deleteRecursive(node.right, nodeValue);
        } else {
            if(node.right === null && node.left === null) {
                return null;
            }

            if(node.right === null) return node.left;
            if(node.left === null) return node.right;

            let successor = node.right;

            while(successor.left) {
                successor = successor.left;
            }

            node.right = this.#deleteRecursive(node.right, successor.data);

            node.data = successor.data;
            
        }
        return node;
    }

    delete(value) {

        this.root = this.#deleteRecursive(this.root, value);
        
    }

    #findRecursive(node, nodeValue) {

        if(node === null) return null;
        if(node.data === nodeValue) return node;

        if(nodeValue < node.data) {
            return this.#findRecursive(node.left, nodeValue);
        } else {
            return this.#findRecursive(node.right, nodeValue);
        }
    }

    find(value) {
        return this.#findRecursive(this.root, value);
    }

    //Recursive Level order traversal implementation that takes an array of current level nodes
    #levelOrderRecursive(queue, callbackFn) {
    
        if(queue.length === 0) return;

        const nextQueue = [];
        for (const node of queue) {
            callbackFn(node.data);
            if(node.left) nextQueue.push(node.left);
            if(node.right) nextQueue.push(node.right);
        }
        this.#levelOrderRecursive(nextQueue, callbackFn);
    }

    #levelOrderIterative(root, callbackFn) {

        if(!root) return null;

        const queue = [root];
        let queueFront = 0;
        let currentNode;
        while(queue.length > queueFront) {
            currentNode = queue[queueFront];
            callbackFn(currentNode.data);
            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);
            queueFront++;
        }
    }

    levelOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }

        this.#levelOrderIterative(this.root, callbackFn);

        //Recursive Function
        // this.#levelOrderRecursive([this.root], callbackFn);
    }

    #inOrderRecursive(node, callbackFn) {

        if(node === null) return;
        this.#inOrderRecursive(node.left, callbackFn);
        callbackFn(node.data);
        this.#inOrderRecursive(node.right, callbackFn);
    }

    inOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }

        this.#inOrderRecursive(this.root, callbackFn);
    }

    #preOrderRecursive(node, callbackFn) {

        if(node === null) return;
        callbackFn(node.data);
        this.#preOrderRecursive(node.left, callbackFn);
        this.#preOrderRecursive(node.right, callbackFn);
    }

    preOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }

        this.#preOrderRecursive(this.root, callbackFn);
    }

    #postOrderRecursive(node, callbackFn) {

        if(node === null) return;
        this.#postOrderRecursive(node.left, callbackFn);
        this.#postOrderRecursive(node.right, callbackFn);
        callbackFn(node.data);
    }

    postOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }

        this.#postOrderRecursive(this.root, callbackFn);
    }
}