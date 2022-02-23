class myMathObject {
    total;
    tail;
    head;
    count;
    constructor() {
        this.tail = null;
        this.head = null;
        this.total = null;
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

    Calculate(selectedOperation, numX) {
        if(this.total == null ){
            this.total = 0;
        }
        if (selectedOperation == "Multiply") {
            this.total = this.Multiply(numX);
        }
        if (selectedOperation == "Divide") {
            this.total = this.Divide(numX);
        }
        if (selectedOperation == "Add") {
            this.total = this.Add(numX);
        }
        if (selectedOperation == "Subtract") {
            this.total = this.Subtract(numX);
        }
        this.insertLast(total, selectedOperation);
        console.log(this);
    }
    Multiply(numX){
        this.total = this.total * numX;
    }
    Divide(numX){
        this.total = this.total / numX;
    }
    Add(numX){
        this.total = this.total + numX
    }
    Subtract(numX){
        this.total = this.total + numX;
    }
    Inverse(){
        this.total = this.total * -1;
    }
    InPercent(){
        Divide(this.total);
    }
    get returnTotal(){
        return this.total;
    }
    set setTotal(newTotal){
        this.total = newTotal;
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
    set setNextNode(newNode) {
        this.Previous = newNode;
    }
    get getNextNode() {
        return this.Next;
    }
    get getData() {
        return this.data;
    }
    get selectedOperation() {
        return this.selectedOperation;
    }
}