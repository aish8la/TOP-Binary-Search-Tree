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

    #inOrderIterative(node, callbackFn) {

        const stack = [];
        let currentNode = node;


        while(currentNode || stack.length > 0) {

            while(currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }

            currentNode = stack.pop();
            callbackFn(currentNode.data);

            currentNode = currentNode.right;
        }
    }


    inOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }

        // this.#inOrderIterative(this.root,callbackFn);
        this.#inOrderRecursive(this.root, callbackFn);
    }

    #preOrderRecursive(node, callbackFn) {

        if(node === null) return;
        callbackFn(node.data);
        this.#preOrderRecursive(node.left, callbackFn);
        this.#preOrderRecursive(node.right, callbackFn);
    }

    #preOrderIterative(node, callbackFn) {
        const stack = [node];
        let currentNode;

        while(stack.length > 0) {
            currentNode = stack.pop();
            callbackFn(currentNode.data);

            if(currentNode.right) stack.push(currentNode.right);
            if(currentNode.left) stack.push(currentNode.left);
        }
    }

    preOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }
        // this.#preOrderIterative(this.root, callbackFn);
        this.#preOrderRecursive(this.root, callbackFn);
    }

    #postOrderRecursive(node, callbackFn) {

        if(node === null) return;
        this.#postOrderRecursive(node.left, callbackFn);
        this.#postOrderRecursive(node.right, callbackFn);
        callbackFn(node.data);
    }

    #postOrderIterative(node, callbackFn) {
        const stack1 = [node];
        const stack2 = [];
        let currentNode;

        while(stack1.length > 0) {
            currentNode = stack1.pop();
            stack2.push(currentNode);
            if(currentNode.left) stack1.push(currentNode.left);
            if(currentNode.right) stack1.push(currentNode.right);
        }

        while(stack2.length > 0) {
            currentNode = stack2.pop();
            callbackFn(currentNode.data);
        }
    }

    postOrder(callbackFn) {
        try {
            if(typeof callbackFn !== "function") throw new Error("Callback Function Required");
        } catch(e) {
            console.error(e);
            return;
        }
        // this.#postOrderIterative(this.root, callbackFn);
        this.#postOrderRecursive(this.root, callbackFn);
    }

    #heightRecursive(node) {
        if(node === null) return -1;

        return 1 + Math.max(this.#heightRecursive(node.left), this.#heightRecursive(node.right));
    }

    height() {
        return this.#heightRecursive(this.root);
    }

    #depthRecusive(value, node) {
        if(node === null) {
            return NaN;
        }
        if(node.data === value) return 0;

        if(node.data > value) {
            return 1 + this.#depthRecusive(value, node.left);
        } else {
            return 1 + this.#depthRecusive(value, node.right);
        }
    }

    depth(value) {
        return this.#depthRecusive(value, this.root);
    }

    #isBalancedRecursive(node) {
        if(node === null) return 0;

        let left = this.#isBalancedRecursive(node.left);
        let right = this.#isBalancedRecursive(node.right);
        if(left === -1 || right === - 1) return - 1;
        if(Math.abs(left - right) > 1) return - 1;

        return Math.max(left, right) + 1;
    }

    isBalanced() {
        return this.#isBalancedRecursive(this.root) !== -1;
    }

    rebalance() {
        const array = [];
        this.inOrder(node => array.push(node));
        this.root = this.#buildTreeStructure(array, 0, array.length - 1);
    }
}