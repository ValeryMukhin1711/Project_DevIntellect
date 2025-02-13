import { makeAutoObservable } from "mobx";

class Basket {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.items.push({ ...item });
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  increaseItemCount(id) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      this.items.push({ ...item }); // Добавляем ещё один экземпляр
    }
  }

  decreaseItemCount(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1); // Удаляем один экземпляр
    }
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const basket = new Basket();
export default basket;