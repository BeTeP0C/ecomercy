import { makeAutoObservable } from "mobx"
import { RootStore } from "./rootStore"
import { TProductCart } from "@/types/TProductCart";
import { safeLocalStorageGet, safeLocalStorageSet } from "./globalStore";

class CartStore {
  rootStore: RootStore;

  productsCart: TProductCart[] = []

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this)
  }

  addProductToCart = (product: TProductCart) => {
    this.productsCart.push(product)

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  getProductsCart = () => {
    const productsJson = safeLocalStorageGet("productCart")
    const products = productsJson ? JSON.parse(productsJson) : []

    this.productsCart = products
  }

  deleteProductToCart = (id: string) => {
    this.productsCart = this.productsCart.filter(el => el.id !== id)

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  clearCart = () => {
    this.productsCart = []

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  getFullSum = () => {
    let sum = 0

    for (const product of this.productsCart) {
      sum += product.price
    }

    return sum
  }

  getFullSumWithDiscount = () => {
    let sum = 0

    for (const product of this.productsCart) {
      sum += product.price * (1 - product.discount / 100)
    }

    return sum
  }
} 

export default CartStore