import { GlobalStore } from "@/store/globalStore";
import { TOrder } from "@/types/TOrder";
import localStorageStore from "@/utils/localStorageStore";
import { action, makeObservable, observable } from "mobx";

class ProfilePageStore {
  globalStore: GlobalStore;
  orders: TOrder[] = []
  isLoading: boolean = false

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      isLoading: observable,
      orders: observable,
      setOrders: action,
      deleteOrders: action,
      addOrders: action,
    })

    this.setOrders()
  }

  setOrders () {
    this.orders = this.getOrders()
  }

  deleteOrders = (id: number) => {
    this.orders = this.orders.filter(order => order.id !== id)

    localStorageStore.safeLocalStorageSet("orders", JSON.stringify(this.orders))
  }

  getOrders = () => {
    const ordersJSON = localStorageStore.safeLocalStorageGet("orders")

    if (ordersJSON) {
      const orders: TOrder[] = JSON.parse(ordersJSON)

      return orders
    }

    return []
  }

  addOrders (order: TOrder) {
    this.orders = [...this.orders, order]

    localStorageStore.safeLocalStorageSet("orders", JSON.stringify(this.orders))
  }
}

export default ProfilePageStore