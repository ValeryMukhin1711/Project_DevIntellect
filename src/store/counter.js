import { makeAutoObservable } from "mobx";



class Counter {
  count = 0;

  constructor() {
    makeAutoObservable(this)
  }

  increment() {

    this.count++
  }

  decrement() {
    this.count--
  }
}

const counter = new Counter();

export default counter;