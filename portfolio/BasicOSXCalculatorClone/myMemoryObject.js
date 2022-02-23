class MyMemoryObject {
    tail;
    count;
    constructor() {
        this.tail = null;
        this.count = 0;
    }
    insertLast(data, selectedOperation) {
        var newNode = new Node(data, selectedOperation);
        if (this.count == 0) {
            this.tail = newNode;
            this.count = this.count + 1;
        } else {
            newNode.setPreviousNode = this.tail;
            this.tail = newNode;
            this.tail.getPrevious.Next = this.tail;
            this.count = this.count + 1;
        }
    }
    getThenSetPreviousState() {
        this.tail = this.tail.getPrevious;
        this.count = this.count - 1;
    }
    get getMemorydata() {
        return this.tail.getData;
    }
    get getSelectedOperation() {
        return this.tail.Next.selectedOperation;
    }
    get getCount() {
        return this.count;
    }
}

class Node {
    Previous;
    Next;
    data;
    selectedOperation;
    constructor(data, selectedOperation) {
        this.Previous = null;
        this.Next = null;

        this.data = data;
        this.selectedOperation = selectedOperation;
    }
    set setPreviousNode(newNode) {
        this.Previous = newNode;
    }
    get getPrevious() {
        return this.Previous;
    }
    get getData() {
        return this.data;
    }
    get selectedOperation() {
        return this.selectedOperation;
    }
}