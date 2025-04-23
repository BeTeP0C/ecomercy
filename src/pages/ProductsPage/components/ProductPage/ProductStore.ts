import { action, makeObservable, observable, runInAction } from "mobx"
import { TProduct } from "@/types/TProduct"
import { GlobalStore } from "@/store/globalStore"
import qs from "qs"
import axios from "axios"
import API_ENDPOINTS from "@/config/apiEndpoints"
import localStorageStore from "@/utils/localStorageStore"
import { TOrder } from "@/types/TOrder"
import getDateTransform from "@/utils/getDateTransform"

export type TImage = {
  small: string,
  medium: string,
}

class ProductStore {
  globalStore: GlobalStore
  product: TProduct | null = null
  relatedProducts: TProduct[] = []
  images: TImage[] = []
  isLoading: boolean = false

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      product: observable,
      relatedProducts: observable,
      images: observable,
      isLoading: observable,
      setProduct: action,
      setRelatedProducts: action,
      setImages: action,
      loadProductData: action,
      addImages: action
    })
  }

  setProduct(product: TProduct) {
    this.product = product
  }

  setRelatedProducts(products: TProduct[]) {
    this.relatedProducts = products
  }

  setImages(images: TImage[]) {
    this.images = images
  }

  getProduct = async (id: string): Promise<TProduct | undefined> => {
    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    try {
      const resp = await axios.get(`${this.globalStore.endpoint}${API_ENDPOINTS.PRODUCTS}/${id}?${queryParams}`, {
        headers: {
          "Authorization": `Bearer ${this.globalStore.token}`
        }
      })

      const product: TProduct = resp.data.data

      return product
    } catch (error) {
      console.log(error)
    }
  }

  getProductsFilter = async (filters: {}): Promise<TProduct[]> => {
    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    const resp = await axios.get(`${this.globalStore.endpoint}${API_ENDPOINTS.PRODUCTS}?${qs.stringify({filters})}&${queryParams}`, {
      headers: {
        "Authorization": `Bearer ${this.globalStore.token}`
      }
    })

    const data: TProduct[] = resp.data.data

    return data
  }

  async loadProductData(id: string) {
    runInAction(() => {
      this.isLoading = true
    })

    try {
      const currentProduct: TProduct | undefined = await this.getProduct(id)
      const filter = {
        productCategory: {
          "title": currentProduct?.productCategory.title
        }
      }
      const relatedProducts = await this.getProductsFilter(filter)

      if (currentProduct) {
        this.setProduct(currentProduct)
        this.setRelatedProducts(relatedProducts)
        this.addImages(currentProduct)
      }
    } catch (error) {
      console.error(error)
      return false
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  addImages(currentProduct: TProduct) {
    const currentImages = currentProduct.images.map(image => {
      return {
        small: image.formats.small.url,
        medium: image.formats.medium.url
      }
    })

    this.setImages(currentImages)
  }

  addOrderLocal = (product: TProduct) => {
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
      products: [{
        imgUrl: product.images[0].url,
        title: product.title,
        id: product.id,
        fullPrice: product.price * (1 - product.discountPercent / 100),
        amount: 1,
        priceOne: product.price * (1 - product.discountPercent / 100),
        type: product.productCategory.title,
        isGuarantee: true,
        isPopular: Math.random() > 0.5
      }],
      price: product.price * (1 - product.discountPercent / 100),
    })

    localStorageStore.safeLocalStorageSet("orders", JSON.stringify(orders))
    localStorageStore.safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
  }
}

export default ProductStore