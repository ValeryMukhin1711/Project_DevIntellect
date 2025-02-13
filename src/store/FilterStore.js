import { makeAutoObservable } from "mobx";

class FilterStore {
  filterItem = {
    products:[],
    maxPrice:-1,
    minPrice:0,
    sortField: 'default',
    discontCheck:false
  }

  constructor() {
    makeAutoObservable(this)
  }

  setProducts(value) {
    this.filterItem.products = value
  }

   setMaxPrice(value) {
    this.filterItem.maxPrice = value
   }

   setMinPrice(value) {
    this.filterItem.minPrice = value
   }

   setDiscontCheck(value) {
    this.filterItem.minPrice = value
   }
  }








const filterStore = new FilterStore();
export default filterStore;