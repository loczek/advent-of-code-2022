import { getLines } from "../utils.ts";

class MaxHeap {
  storage: number[][];
  size: number;

  constructor() {
    this.storage = [];
    this.size = 0;
  }

  getLeftChildIndex(index: number) {
    return 2 * index + 1;
  }

  getRightChildIndex(index: number) {
    return 2 * index + 2;
  }

  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.size;
  }

  hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.size;
  }

  hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index: number) {
    return this.storage[this.getLeftChildIndex(index)][0];
  }

  rightChild(index: number) {
    return this.storage[this.getRightChildIndex(index)][0];
  }

  parent(index: number) {
    return this.storage[this.getParentIndex(index)][0];
  }

  getMax() {
    return this.storage[0];
  }

  swap(index1: number, index2: number) {
    const temp = this.storage[index1];
    this.storage[index1] = this.storage[index2];
    this.storage[index2] = temp;
  }

  removeMax() {
    if (this.size == 0) throw new Error("Empty Heap");
    const data = this.storage[0];
    this.storage[0] = this.storage[this.size - 1];
    this.size -= 1;
    this.heapifyDown(0);
    return data;
  }

  heapifyDown(index: number) {
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.storage[smallest][0] < this.leftChild(index)
    ) {
      smallest = this.getLeftChildIndex(index);
    }
    if (
      this.hasRightChild(index) &&
      this.storage[smallest][0] < this.rightChild(index)
    ) {
      smallest = this.getRightChildIndex(index);
    }
    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(data: number[]) {
    this.storage[this.size] = data;
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  heapifyUp(index: number) {
    if (this.hasParent(index) && this.parent(index) < this.storage[index][0]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

async function main() {
  const lines = await getLines(1);

  let index = 0;
  let sum = 0;

  const heap = new MaxHeap();

  for (const line of lines) {
    if (line === "") {
      heap.insert([sum, index]);
      index = 0;
      sum = 0;
    } else {
      index += 1;
      sum += Number(line);
    }
  }

  console.log(heap.getMax()[0]);
}
main();
