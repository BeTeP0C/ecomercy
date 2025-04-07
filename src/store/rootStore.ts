import { makeAutoObservable } from "mobx";
import { GlobalStore } from "./globalStore";

export class RootStore {
  globalStore: GlobalStore

  constructor () {
    makeAutoObservable(this)

    this.globalStore = new GlobalStore(this)
  }
}