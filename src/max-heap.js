const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (this.length !== 0) {
            let detached = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detached);
            this.shiftNodeDown(this.root);
            if (detached === null) {
                return null;
            }

            return detached.data;
        }
    }

    detachRoot() {

        if (this.parentNodes.includes(this.root)) {
            this.parentNodes.shift();
        }
        let root = this.root;
        this.root = null;
        this.length--;
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (detached === null || detached.left === undefined) {
            return;
        }
        if (this.parentNodes.length === 0) {
            return;
        }

        let node = this.parentNodes.pop();
        if (this.parentNodes.length === 0) {
            this.root = node;
            return;
        }
        if (this.parentNodes.length < 2) {
            this.parentNodes.unshift(node);
        }
        if (node.parent) {
            if (node.parent !== detached && node.parent.right === node) {
                this.parentNodes.unshift(node.parent);
            }
            this.root = node;
            node.appendChild(detached.left);
            node.appendChild(detached.right);
            node.parent.removeChild(node);
        }
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    insertNode(node) {
        if (this.length === 0) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            this.parentNodes[0].appendChild(node);
            if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
                this.parentNodes.shift();
            }
            this.parentNodes.push(node);
        }
        this.length++;
    }

    shiftNodeUp(node) {

        if (node.parent && node.priority > node.parent.priority) {
            let i = this.parentNodes.indexOf(node);
            let j = this.parentNodes.indexOf(node.parent);
            this.parentNodes[i] = node.parent;
            if (j !== -1) {
                this.parentNodes[j] = node;
            }
            node.swapWithParent();

            this.shiftNodeUp(node);

        }

        if (node.parent === null) {
            this.root = node;
        }
    }

    shiftNodeDown(node) {

        if (node === null) {
            return;
        }
        if (node.left && node.left.priority > node.priority && (!node.right || node.left.priority > node.right.priority)) {
            if (node === this.root) {
                this.root = node.left;
            }
            node.left.swapWithParent();
            let i = this.parentNodes.indexOf(node);
            let j = this.parentNodes.indexOf(node.parent);
            this.parentNodes[j] = node;
            if (j != -1) {
                this.parentNodes[j] = node;
            }
            if (i !== -1) {
                this.parentNodes[i] = node.parent;
            }
            this.shiftNodeDown(node);
        }
        if (node.right && node.right.priority > node.priority && (!node.left || node.right.priority > node.left.priority)) {
            if (node === this.root) {
                this.root = node.right;
            }
            node.right.swapWithParent();
            let i = this.parentNodes.indexOf(node);
            let j = this.parentNodes.indexOf(node.parent);
            this.parentNodes[j] = node;
            if (j != -1) {
                this.parentNodes[j] = node;
            }
            if (i !== -1) {
                this.parentNodes[i] = node.parent;
            }
            this.shiftNodeDown(node);
        }

    }
}

module.exports = MaxHeap;