import { makeAutoObservable } from "mobx";
import { GlobalStore } from "./globalStore";
import CartStore from "./cartStore";

export class RootStore {
  globalStore: GlobalStore;
  cartStore: CartStore

  constructor () {
    makeAutoObservable(this)

    this.globalStore = new GlobalStore(this)
    this.cartStore = new CartStore(this)
  }
}