import { makeAutoObservable } from "mobx";
import { GlobalStore } from "./globalStore";
import CartStore from "./cartStore";
import ModalStore from "./modalStore";

export class RootStore {
  globalStore: GlobalStore;
  cartStore: CartStore
  modalStore: ModalStore

  constructor () {
    makeAutoObservable(this)

    this.globalStore = new GlobalStore(this)
    this.cartStore = new CartStore(this)
    this.modalStore = new ModalStore(this)
  }
}