const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        if (arguments.length === 1 && maxSize === maxSize) {
            this.maxSize = maxSize;
        } else {
            this.maxSize = 30;
        }
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.maxSize === this.heap.size()) {
            throw "Queue reached maximum size";
        }
        this.heap.push(data, priority);
    }

    shift() {
        if (this.isEmpty()) {
            throw "Queue is empty";
        }
        let detached = this.heap.pop();
        return detached;
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;