import { makeAutoObservable, toJS } from "mobx"
import { RootStore } from "./rootStore"
import { TProductCart } from "@/types/TProductCart";
import { safeLocalStorageGet, safeLocalStorageSet } from "./globalStore";
import { TOrder } from "@/types/TOrder";
import { getDateTransform } from "@/utils/getDateTransform";

class CartStore {
  rootStore: RootStore;

  productsCart: TProductCart[] = []

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this)
  }

  addProductToCart = (product: TProductCart) => {
    console.log (toJS(this.productsCart), product)
    if (this.productsCart.some(productCart => productCart.idDocument === product.idDocument)) {
      console.log (this.productsCart.some(productCart => productCart.idDocument === product.idDocument))
      this.productsCart = this.productsCart.map(productCart => {
        if (productCart.idDocument === product.idDocument) {
          return {
            ...productCart,
            amount: productCart.amount + 1
          }
        }

        return productCart
      })

      console.log (toJS(this.productsCart), 2)
    } else {
      this.productsCart.push(product)
    }

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  getProductsCart = () => {
    const productsJson = safeLocalStorageGet("productCart")
    const products = productsJson ? JSON.parse(productsJson) : []

    this.productsCart = products
  }

  deleteProductToCart = (id: string) => {
    this.productsCart = this.productsCart.filter(el => el.idDocument !== id)

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  clearCart = () => {
    this.productsCart = []

    safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  getFullSum = () => {
    let sum = 0

    for (const product of this.productsCart) {
      sum += product.price * product.amount
    }

    return sum
  }

  get amountProducts () {
    let amount = 0
    this.productsCart.map(product => amount += product.amount)

    return amount
  }

  getFullSumWithDiscount = () => {
    let sum = 0

    for (const product of this.productsCart) {
      sum += product.price * (1 - product.discount / 100) * product.amount
    }

    return sum
  }

  amountProduct (id: string) {
    for (const product of this.productsCart) {
      if (product.idDocument === id) {
        return product.amount
      }
    }

    return 0
  }

  addOrderLocal = () => {
    const ordersJSON = safeLocalStorageGet("orders")
    const lastOrderJSON = safeLocalStorageGet("last_order")
    const lastOrder = lastOrderJSON ? JSON.parse(lastOrderJSON) + 1 : 1
    const orders: TOrder[] = []

    if (ordersJSON) {
      const ordersParse: TOrder[] = JSON.parse(ordersJSON)

      orders.push(...ordersParse)
    }

    orders.push({
      id: lastOrder,
      dataCreate: getDateTransform(),
      isPaid: true,
      products: this.productsCart.map(product => {
        return {
          imgUrl: product.images.medium,
          title: product.title,
          id: product.id,
          fullPrice: product.amount * product.price * (1 - product.discount / 100),
          amount: product.amount,
          priceOne: product.price * (1 - product.discount / 100),
          type: product.type,
          isGuarantee: true,
          isPopular: Math.random() > 0.5
        }
      }),
      price: this.getFullSumWithDiscount(),
    })

    safeLocalStorageSet("orders", JSON.stringify(orders))
    safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
  }
} 

export default CartStore