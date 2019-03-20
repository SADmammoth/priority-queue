class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.right = null;
        this.left = null;
    }

    appendChild(node) {
        if (node === null) {
            return false;
        }
        if (this.left === null) {
            this.left = node;
        } else if (this.right === null) {
            this.right = node;
        } else {
            return false;
        }
        node.parent = this;
        return true;
    }

    removeChild(node) {
        if (node === null) {
            return null;
        }
        if (node === this.left) {
            this.left.parent = null;
            this.left = null;
            return node;
        } else if (node === this.right) {
            this.right.parent = null;
            this.right = null;
            return node;
        } else {
            throw "Node has no child nodes";
        }
    }

    remove() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (this.parent !== null) {
            let parent = this.parent;
            let parentOfParent = this.parent.parent;

            if (this === parent.left) {

                this.remove();
                if (parentOfParent) {

                    if (parent === parentOfParent.left) {
                        parentOfParent.removeChild(parent);
                        parentOfParent.appendChild(this);
                    } else {
                        parentOfParent.removeChild(parent);
                        parentOfParent.right = this;
                        this.parent = parentOfParent;
                    }
                }

                parent.appendChild(this.removeChild(this.left));
                let buf = this.right;
                this.right = parent.right;
                if (parent.right) {
                    parent.right.parent = this;
                }
                parent.right = buf;
                if (buf) {
                    buf.parent = parent;
                }
                this.appendChild(parent);
            } else {
                this.remove();
                if (parentOfParent) {

                    if (parent === parentOfParent.left) {
                        parentOfParent.removeChild(parent);
                        parentOfParent.appendChild(this);
                    } else {
                        parentOfParent.removeChild(parent);
                        parentOfParent.right = this;
                        this.parent = parentOfParent;
                    }
                }

                parent.right = this.right;
                if (this.right) {
                    this.right.parent = parent;
                }
                this.right = parent;
                parent.parent = this;

                let buf = this.left;
                this.removeChild(this.left);
                this.appendChild(parent.removeChild(parent.left));
                parent.appendChild(buf);
            }
        }
    }


};

module.exports = Node;