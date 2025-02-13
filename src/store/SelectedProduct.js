import { makeAutoObservable } from "mobx";

class SelectedProduct {

  selectedProduct = null;

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.selectedProduct = item;
  }

}

const selectedproduct = new SelectedProduct();
export default selectedproduct;