import { makeAutoObservable } from "mobx";

class SelectedCategory {

  selectedCategory = null;




  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.selectedCategory = item;
  }

}

const selectedсategory = new SelectedCategory();
export default selectedсategory;