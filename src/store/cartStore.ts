import { action, computed, makeObservable, observable } from "mobx"
import { RootStore } from "./rootStore"
import { TProductCart } from "@/types/TProductCart";
import { TOrder } from "@/types/TOrder";
import localStorageStore from "@/utils/localStorageStore";
import { TProduct } from "@/types/TProduct";
import getDateTransform from "@/utils/getDateTransform";

class CartStore {
  rootStore: RootStore;

  productsCart: TProductCart[] = []

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      productsCart: observable,
      addProductToCart: action,
      getProductsCart: action,
      deleteProductToCart: action,
      clearCart: action,
      addOrderLocal: action,
      fullSum: computed,
      amountProducts: computed,
      fullSumWithDiscount: computed,

    })
    this.getProductsCart()
  }

  addProductToCart = (product: TProductCart) => {
    if (this.productsCart.some(productCart => productCart.idDocument === product.idDocument)) {

      this.productsCart = this.productsCart.map(productCart => {
        if (productCart.idDocument === product.idDocument) {
          return {
            ...productCart,
            amount: productCart.amount + 1
          }
        }

        return productCart
      })

    } else {
      this.productsCart.push(product)
    }

    localStorageStore.safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  getProductsCart = () => {
    const productsJson = localStorageStore.safeLocalStorageGet("productCart")
    const products = productsJson ? JSON.parse(productsJson) : []

    this.productsCart = products
  }

  deleteProductToCart = (id: string) => {
    this.productsCart = this.productsCart.filter(el => el.idDocument !== id)

    localStorageStore.safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  clearCart = () => {
    this.productsCart = []

    localStorageStore.safeLocalStorageSet("productCart", JSON.stringify(this.productsCart))
  }

  get fullSum () {
    const sum = this.productsCart.reduce((fullPrice, {price, amount}) => fullPrice + price * amount, 0)

    return sum
  }

  get amountProducts () {
    const amount = this.productsCart.reduce((acc, {amount}) => acc + amount, 0)

    return amount
  }

  get fullSumWithDiscount () {
    const sum = this.productsCart.reduce((fullSum, {price, discount, amount}) => fullSum + price * (1 - discount / 100) * amount, 0)
    
    return sum
  }

  amountProduct (id: string) {
    const product = this.productsCart.find(prod => prod.idDocument === id)

    if (product) return product.amount

    return 0
  }

  transformProductToCart (product: TProduct) {
    const productCart: TProductCart = {
      idDocument: product.documentId,
      id: product.id,
      title: product.title,
      price: product.price,
      type: product.productCategory.title,
      amount: 1,
      discount: product.discountPercent,
      images: {
        large: product.images[0].formats.large.url,
        medium: product.images[0].formats.medium.url,
        small: product.images[0].formats.small.url,
        thumbnail: product.images[0].formats.thumbnail.url
      }
    }

    return productCart
  }

  addOrderLocal = () => {
    const ordersJSON = localStorageStore.safeLocalStorageGet("orders")
    const lastOrderJSON = localStorageStore.safeLocalStorageGet("last_order")
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
      price: this.fullSumWithDiscount,
    })

    localStorageStore.safeLocalStorageSet("orders", JSON.stringify(orders))
    localStorageStore.safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
  }
} 

export default CartStore